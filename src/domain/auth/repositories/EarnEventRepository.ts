//import qs from 'qs';
import { AxiosResponse } from 'axios';
import { injectable } from 'tsyringe';

import { ApiError } from '@@domain/error';
import { ThirdPartyAlreadyConnectedError } from '@@domain/error/ThirdPartyAlreadyConnectedError';
import { EarnEventDto } from '@@domain/model/EarnEventDto';
import {
  ThirdPartyConnectCheckDto,
  ThirdPartyConnectCheckResponseDto,
  EarnEventCurrentResponseDto,
  EarnEventClaimCheckResponseDto,
  EarnEventGetClaimResponseDto,
  SimpleResponseDto,
  EarnEventClaimRequestDto,
} from '@@generated/generated-scheme';
import { authRequest, Response } from '@@utils/request';

import { IEarnEventMutation } from './EarnEventRepository.type';

/**
 * /v1/earn-event api service
 */
export interface EarnEventRepository {
  // earn-event
  getEventList(): Promise<EarnEventDto[]>;
  getEvent(eventId: string): Promise<EarnEventDto>;
  getUserPoints(eventId: string): Promise<EarnEventCurrentResponseDto[]>;
  requestClaim({ eventId, address }: IEarnEventMutation): Promise<SimpleResponseDto>;
  getClaimStatus(eventId: string): Promise<EarnEventClaimCheckResponseDto>;
  getClaimInformation(eventId: string): Promise<EarnEventGetClaimResponseDto>;
  // third-party
  checkThirdPartyConnection(appId: string, token: string | null): Promise<ThirdPartyConnectCheckResponseDto>;
  connectThirdParty(appId: string, token: string | null): Promise<SimpleResponseDto>;
  disconnectThirdParty(appId: string): Promise<SimpleResponseDto>;
}

@injectable()
export class EarnEventRepositoryImpl implements EarnEventRepository {
  /**
   * Get a list of earn-events
   *
   * mock api example
   * ```
   * const res = mockApi<EarnEventDto[]>('v1/earn-event/list.json');
   * return res ?? [];
   * ```
   */
  getEventList = async (): Promise<EarnEventDto[]> => {
    const endpoint = 'v1/earn-event/list';
    const res = await authRequest.post<EarnEventDto[]>(endpoint);
    return res.data;
  };

  /**
   * Get a specific event;
   * @param event an event id
   * @returns points
   */
  getEvent = async (eventId: string): Promise<EarnEventDto> => {
    const endpoint = `/v1/earn-event/${eventId}`;
    const res = await authRequest.post<EarnEventDto>(endpoint);

    if ([200, 201].includes(res.status)) {
      return res.data;
    } else {
      // TODO: define a general type of error.
      console.error(res);
      throw new ApiError('Api error', res.status);
    }
  };

  /**
   * Get amount of event point
   * @param event an event id
   * @returns points
   */
  getUserPoints = async (eventId: string): Promise<EarnEventCurrentResponseDto[]> => {
    const endpoint = `/v1/earn-event/${eventId}/participation/current`;
    const res = await authRequest.post<EarnEventCurrentResponseDto[]>(endpoint);

    if ([200, 201].includes(res.status)) {
      return res.data;
    } else if (res.status == 404) {
      throw new Error('Event not found');
    } else {
      // TODO define a generla type of error.
      console.error(res);
      throw new ApiError('Unexpected error', res.status);
    }
  };

  /**
   * Request Claim this event.
   * @param eventId an event id
   * @param address an address
   * @returns SimpleResponseDto
   */
  requestClaim = async ({ eventId, address }: IEarnEventMutation): Promise<SimpleResponseDto> => {
    const endpoint = `/v1/earn-event/${eventId}/claim/request`;
    const body: EarnEventClaimRequestDto = {
      address,
    };

    const res = await authRequest.post<SimpleResponseDto>(endpoint, {
      data: body,
    });

    if ([200, 201].includes(res.status)) {
      return res.data;
    } else {
      // TODO define a generla type of error.
      console.error(res);
      throw new ApiError('Unexpected error', res.status);
    }
  };

  /**
   * Request Claim this event.
   * @param eventId an event id
   */
  getClaimStatus = async (eventId: string): Promise<EarnEventClaimCheckResponseDto> => {
    const endpoint = `/v1/earn-event/${eventId}/claim/status`;
    const res = await authRequest.post<EarnEventClaimCheckResponseDto>(endpoint);

    if ([200, 201].includes(res.status)) {
      return res.data;
    } else {
      // TODO: define a general type of error.
      console.error(res);
      throw new ApiError('Api error', res.status);
    }
  };

  /**
   * Get claim information with regards to the event reward.
   * @param eventId an event id
   */
  getClaimInformation = async (eventId: string): Promise<EarnEventGetClaimResponseDto> => {
    const endpoint = `/v1/earn-event/${eventId}/claim/information`;
    const res = await authRequest.post<EarnEventGetClaimResponseDto>(endpoint);

    if ([200, 201].includes(res.status)) {
      return res.data;
    } else {
      // TODO: define a general type of error.
      console.error(res);
      throw new ApiError('Api error', res.status);
    }
  };

  /**
   * Check ThirdParty connections state
   * @param appId third party app id
   * @param token third party user token
   * @returns ThirdPartyConnection
   * @throws ThirdPartyAlreadyConnectedError if there's the account already connected to this app.
   */
  checkThirdPartyConnection = async (appId: string, token: string | null): Promise<ThirdPartyConnectCheckResponseDto> => {
    const endpoint = `/v1/third-party/${appId}/connect/check`;
    const body: ThirdPartyConnectCheckDto = {
      token: token,
    };

    const res = await authRequest.post<ThirdPartyConnectCheckResponseDto>(endpoint, {
      data: body,
    });

    switch (res.status) {
      case 409: {
        // TODO: warning_connect_account_description
        throw new ThirdPartyAlreadyConnectedError();
      }
      default: {
        return res.data;
      }
    }
  };

  /**
   * Connect a user with third-party
   * @param appId third party app id
   * @param token third party user token
   * @returns simple connecion status, 'ok' if succeeded.
   */
  connectThirdParty = async (appId: string, token: string | null): Promise<SimpleResponseDto> => {
    const endpoint = `/v1/third-party/${appId}/disconnect`;
    const body: ThirdPartyConnectCheckDto = {
      token: token,
    };
    const res = await authRequest.post<SimpleResponseDto>(endpoint, {
      data: body,
    });

    switch (res.status) {
      case 200:
      case 201:
        return res.data;
      case 400:
        // TODO: warning_connect_account_description
        throw new ThirdPartyAlreadyConnectedError(`appid: ${appId} is already connected by another third-party user.`);
      default:
        throw new ApiError('Api error', res.status);
    }
  };

  /**
   * Disconnect third-party from clutch
   * @param appId third party app id
   * @returns simple connecion status
   */
  disconnectThirdParty = async (appId: string): Promise<SimpleResponseDto> => {
    const endpoint = `/v1/third-party/${appId}/disconnect`;
    const res = await authRequest.post<SimpleResponseDto>(endpoint);

    if ([200, 201].includes(res.status)) {
      return res.data;
    } else {
      // TODO: define a general type of error.
      console.error(res);
      throw new ApiError('Api error', res.status);
    }
  };
}
