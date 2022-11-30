//import qs from 'qs';
import { injectable } from 'tsyringe';

import { EarnEventDto } from '@@domain/model/EarnEventDto';
import { mockApi } from '@@utils/mockApi';
import { authRequest } from '@@utils/request';

/**
 * /v1/earn-event api service
 */
export interface EarnEventRepository {
  getEvents(): Promise<EarnEventDto[]>;
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
}
