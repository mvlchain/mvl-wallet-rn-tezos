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
} from '@@generated/generated-scheme';
import { authRequest, Response } from '@@utils/request';

/**
 * /v1/earn-event api service
 */
export interface EarnEventRepository {
  getEvents(): Promise<EarnEventDto[]>;
  getCurrentUserPoints(eventId: string): Promise<EarnEventCurrentResponseDto[]>;
  getClaimStatus(eventId: string): Promise<EarnEventClaimCheckResponseDto>;
  getClaimInformation(eventId: string): Promise<EarnEventGetClaimResponseDto>;
  checkThirdPartyConnection(appId: string, token: string | null): Promise<ThirdPartyConnectCheckResponseDto>;
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
  getEvents = async (): Promise<EarnEventDto[]> => {
    const endpoint = 'v1/earn-event/list';
    const res = await authRequest.post<EarnEventDto[]>(endpoint);
    return res.data;
  };

  /**
   * Get amount of event point
   * @param event an event id
   * @returns points
   */
  getCurrentUserPoints = async (eventId: string): Promise<EarnEventCurrentResponseDto[]> => {
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
   * Get current event ongoing status from server side.
   * @param eventId an event id
   */
  getClaimStatus = async (eventId: string): Promise<EarnEventClaimCheckResponseDto> => {
    const endpoint = `/v1/earn-event/${eventId}/claim/status`;
    const res = await authRequest.post<EarnEventClaimCheckResponseDto>(endpoint);

    if ([200, 201].includes(res.status)) {
      return res.data;
    } else {
      // TODO define a generla type of error.
      console.error(res);
      throw new ApiError('Unexpected error', res.status);
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
      // TODO define a generla type of error.
      console.error(res);
      throw new ApiError('Unexpected error', res.status);
    }
  };

  /**
   * Check ThirdParty connections state
   * @param appId third party app id
   * @param token client token
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
        // warning_connect_account_description
        throw new ThirdPartyAlreadyConnectedError();
      }
      default: {
        return res.data;
      }
    }
  };
}
