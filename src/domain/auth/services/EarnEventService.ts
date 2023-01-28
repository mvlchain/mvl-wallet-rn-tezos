import Url from 'url';

import Decimal from 'decimal.js';
import qs from 'qs';
import { inject, injectable } from 'tsyringe';

import { ApiError } from '@@domain/error';
import { InvalidThirdPartyDeepLinkConnectionError } from '@@domain/error/InvalidThirdPartyConnectionRequestError';
import { NotFoundError } from '@@domain/error/NotFoundError';
import { ClaimStatusInformation } from '@@domain/model/ClaimStatusInformation';
import { EarnEventDto } from '@@domain/model/EarnEventDto';
import { EventPhase, getEventPhase } from '@@domain/model/EventPhase';
import { ThirdPartyDeepLink } from '@@domain/model/ThirdPartyDeepLink';
import { ThirdPartyConnectCheckResponseDto, EarnEventGetClaimResponseDto } from '@@generated/generated-scheme';
import { TADA_DRIVER, TADA_RIDER } from '@@navigation/DeepLinkOptions';
import {
  IEventDetails,
  IValidEventDetails,
  IEventThirdParty,
  IThirdPartyConnection,
  IEventDetailsGroup,
} from '@@screens/EarnEventScreen/EarnEventDetailsScreen/EarnEventDetailsScreen.type';
import { tagLogger } from '@@utils/Logger';
import { assembleUrl, evaluateUrlScheme } from '@@utils/regex';
import { isNotBlank, format, isBlank } from '@@utils/strings';
import { valueOf } from '@@utils/types';

import { EarnEventRepository } from '../repositories/EarnEventRepository';

export interface EarnEventService {
  getEarnEventDetailsUiState(id: string, data?: EarnEventDto, deepLink?: ThirdPartyDeepLink): Promise<IEventDetailsGroup>;
  refreshThirdParty(details: IEventDetails, deepLink?: ThirdPartyDeepLink): Promise<IEventThirdParty>;
  getClaimStatusInformation(details: IEventDetails, thirdParty: IEventThirdParty): Promise<ClaimStatusInformation | undefined>;
}

@injectable()
export class EarnEventServiceImpl {
  constructor(@inject('EarnEventRepository') private repository: EarnEventRepository) {}

  private eventLogger = tagLogger('Event');

  async getEarnEventDetailsUiState(id: string, data?: EarnEventDto, deepLink?: ThirdPartyDeepLink): Promise<IEventDetailsGroup> {
    const event = await this.getEvent(id, data);
    if (!event) {
      // event not found, exit
      throw new NotFoundError('Event not found');
    }

    console.log(`Event> handling getEarnEventDetailsUiState(), with deeplink: ${JSON.stringify(deepLink)}`);

    // [details]
    const details: IValidEventDetails = {
      event,
      phase: event ? getEventPhase(event) : EventPhase.NotAvailable,
      deepLink: deepLink,
    };

    // [thirdParty]
    const thirdParty = await this.refreshThirdParty(details, deepLink);

    // [claimStatusInfo]
    const claimStatusInfo = await this.getClaimStatusInformation(details, thirdParty);

    return {
      details,
      thirdParty,
      claimStatusInfo,
    };
  }

  private async getEvent(id: string, data?: EarnEventDto): Promise<EarnEventDto | undefined> {
    if (!!data) {
      return data;
    }
    try {
      this.eventLogger.log(`id only, fetching event`);
      return await this.repository.getEvent(id);
    } catch (e) {
      if (e instanceof ApiError && e.status == 404) {
        return;
      } else {
        throw e;
      }
    }
  }

  async refreshThirdParty(details: IEventDetails, deepLink?: ThirdPartyDeepLink): Promise<IEventThirdParty> {
    const { event, phase } = details;

    const machine: IEventThirdParty = {
      isThirdPartySupported: false,
      connection: undefined,
      points: event?.pointInfoArr.map((data) => ({ ...data, amount: '0' })) ?? [],
      isThirdPartyConnectionRequired: false,
      error: null,
    };

    const thirdPartyApp = event?.app;
    if (!thirdPartyApp) {
      return machine;
    }
    this.eventLogger.log(`refreshThirdParty, details.deepLink: ${JSON.stringify(deepLink)}`);

    // UseCase: useThirdPartyConnection
    const { appId, token, error } = this.parseThirdPartyConnectionArgs(thirdPartyApp.id, deepLink);
    try {
      const connection = await this.repository.checkThirdPartyConnection(appId, token);
      const connectionDeepLink = this.getThirdPartyConnectionDeepLink(event, thirdPartyApp.connectionDeepLink);

      machine.isThirdPartySupported = true;
      machine.connection = {
        appId,
        token,
        exists: connection.exists,
        displayName: connection.displayName,
        connectionDeepLink,
      };
      machine.points = event.pointInfoArr.map((data) => ({ ...data, amount: '0' }));

      // ThirdPartyConnection modal
      if (!connection.exists && !!token) {
        machine.isThirdPartyConnectionRequired = true;
      }
    } catch (e) {
      console.error(e);
      return {
        ...machine,
        error: e,
      };
    }

    // UseCase: useUserPoints
    if (this.isPointInquiryAvailable(phase, machine.isThirdPartySupported)) {
      try {
        const res = await this.repository.getUserPoints(event.id);
        machine.points = res;
      } catch (e) {
        console.error(e);

        return {
          ...machine,
          points: event.pointInfoArr.map((data) => ({ ...data, amount: '0' })),
          error: e,
        };
      }
    }

    return machine;
  }

  /**
   * Parse third-party app arguments appId, token
   * @param appId third-party app id
   * @param deepLink optional deeplink that is given by third-party app
   */
  private parseThirdPartyConnectionArgs(appId: string, deepLink?: ThirdPartyDeepLink): ThirdPartyConnectionArgs {
    let token: string | null = null;

    let useCaseError: Error | unknown;

    if (isNotBlank(deepLink?.appId)) {
      if (appId == deepLink?.appId) {
        token = deepLink?.token;
      } else {
        useCaseError = new InvalidThirdPartyDeepLinkConnectionError();
      }
    }

    return {
      appId,
      token,
      error: useCaseError,
    };
  }

  /**
   * modify third-party connectionDeepLink according to clutch policy (fallback)
   * @param connectionDeepLink a link from event.app.connectionDeepLink field
   * @returns
   */
  private getThirdPartyConnectionDeepLink(event: EarnEventDto, connectionDeepLink: string | null): string | null {
    if (isBlank(connectionDeepLink)) {
      return null;
    }

    const scheme = evaluateUrlScheme(connectionDeepLink);
    switch (scheme) {
      case `${TADA_RIDER.scheme}:`:
      case `${TADA_DRIVER.scheme}:`:
        const url = Url.parse(connectionDeepLink ?? '', true);
        url.query.e = event.id;
        return assembleUrl(url.protocol, url.host, url.pathname, qs.stringify(url.query));
      default:
        return connectionDeepLink ?? null;
    }
  }

  /**
   * Check if it's avilable to make an inquiry about event points
   */
  private isPointInquiryAvailable(phase: valueOf<typeof EventPhase>, isThirdPartySupported: boolean): boolean {
    return (isThirdPartySupported && phase === EventPhase.BeforeEvent) || phase === EventPhase.OnEvent || phase === EventPhase.BeforeClaim;
  }

  async getClaimStatusInformation(details: IEventDetails, thirdParty: IEventThirdParty): Promise<ClaimStatusInformation | undefined> {
    const { event, phase } = details;

    const eventId = event?.id;
    if (!eventId) {
      return;
    }

    this.eventLogger.log(`getClaimStatusInformation, phase: ${phase}`);

    const thirdPartyConnection = thirdParty.connection;
    if (phase === EventPhase.OnClaim) {
      // get an OnClaim phase event id.
      const claimStatus = await this.repository.getClaimStatus(event.id);
      const claimInfo = await this.repository.getClaimInformation(event.id);
      const fee = new Decimal(claimInfo.fee);

      // isTxFeeVisible: 'transaction fee' component is visible when the claimInfo.fee is greater then zero.
      return {
        ...claimStatus,
        ...claimInfo,
        isTxFeeVisible: fee.toNumber() > 0,
        isEventActionButtonEnabled: this.isEventActionButtonEnabled(phase, thirdPartyConnection, claimInfo, thirdParty.isThirdPartySupported),
      };
    }
  }

  /**
   * is event action button enabled.
   */
  private isEventActionButtonEnabled(
    phase: valueOf<typeof EventPhase>,
    thirdPartyConnection: IThirdPartyConnection | undefined,
    claimInfo: EarnEventGetClaimResponseDto,
    isThirdPartySupported: boolean
  ): boolean {
    const isThirdPartyConnected = thirdPartyConnection?.exists === true;
    const isOnEvent = phase == EventPhase.OnEvent;
    const isAbleToClaim = phase == EventPhase.OnClaim && claimInfo.isClaimable;

    return (!isThirdPartySupported || isThirdPartyConnected) && (isOnEvent || isAbleToClaim);
  }
}

interface ThirdPartyConnectionArgs {
  appId: string;
  token: string | null;
  error: Error | unknown;
}
