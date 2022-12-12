//import qs from 'qs';
import { AxiosResponse } from 'axios';
import { injectable } from 'tsyringe';

import { ThirdPartyAlreadyConnectedError } from '@@domain/error/ThirdPartyAlreadyConnectedError';
import { EarnEventDto } from '@@domain/model/EarnEventDto';
import { ThirdPartyConnectCheckDto, ThirdPartyConnectCheckResponseDto } from '@@generated/generated-scheme';
import { authRequest, Response } from '@@utils/request';

/**
 * /v1/earn-event api service
 */
export interface EarnEventRepository {
  getEvents(): Promise<EarnEventDto[]>;
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

    console.log(`EventDetails> starting api checkThirdPartyConnection: endpoin:${endpoint}`);

    const res = await authRequest.post<ThirdPartyConnectCheckResponseDto>(endpoint, {
      data: body,
    });

    console.log(`EventDetails> finished api checkThirdPartyConnection: ${res.data}`);

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
