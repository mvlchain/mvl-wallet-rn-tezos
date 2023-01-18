import { EarnEventRepository } from '@@domain/auth/repositories/EarnEventRepository';
import { IEarnEventMutation } from '@@domain/auth/repositories/EarnEventRepository.type';
import { UnsupportOperationError } from '@@domain/error/UnsupportOperationError';
import { EarnEventDto } from '@@domain/model/EarnEventDto';
import {
  ThirdPartyConnectCheckDto,
  ThirdPartyConnectCheckResponseDto,
  EarnEventCurrentResponseDto,
  EarnEventClaimCheckResponseDto,
  EarnEventGetClaimResponseDto,
  SimpleResponseDto,
} from '@@generated/generated-scheme';
import { mockApi } from '@@utils/mockApi';

/**
 * Abstract class for testing EarnEventRepository
 */
export class AbsTestEarnEventRepository implements EarnEventRepository {
  constructor() { }
  private events = mockApi<EarnEventDto[]>('v1/earn-event/list.json');

  getEventList(): Promise<EarnEventDto[]> {
    const res = mockApi<EarnEventDto[]>('v1/earn-event/list.json');
    return Promise.resolve(res ?? []);
  }
  getEvent(eventId: string): Promise<EarnEventDto> {
    throw new UnsupportOperationError();
  }
  getUserPoints(eventId: string): Promise<EarnEventCurrentResponseDto[]> {
    return Promise.resolve([]);
  }
  requestClaim({ eventId, address }: IEarnEventMutation): Promise<SimpleResponseDto> {
    throw new UnsupportOperationError();
  }
  getClaimStatus(eventId: string): Promise<EarnEventClaimCheckResponseDto> {
    throw new UnsupportOperationError();
  }
  getClaimInformation(eventId: string): Promise<EarnEventGetClaimResponseDto> {
    throw new UnsupportOperationError();
  }
  checkThirdPartyConnection(appId: string, token: string | null): Promise<ThirdPartyConnectCheckResponseDto> {
    throw new UnsupportOperationError();
  }
  connectThirdParty(appId: string, token: string | null): Promise<SimpleResponseDto> {
    throw new UnsupportOperationError();
  }
  disconnectThirdParty(appId: string): Promise<SimpleResponseDto> {
    throw new UnsupportOperationError();
  }
  deferAuthForInject(): Promise<{ type: 'PASSWORD' | 'FACEBOOK' | 'GOOGLE' | 'TWITTER' | 'DISCORD' | 'APPLE' | 'WEB3' | 'HMAC' | 'IN_MIGRATION'; code: string; }> {
    throw new UnsupportOperationError();
  }
}
