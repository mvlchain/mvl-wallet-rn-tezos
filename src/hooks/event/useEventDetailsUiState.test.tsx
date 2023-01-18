import React from 'react';

import { container, injectable, instancePerContainerCachingFactory } from 'tsyringe';

import { IEarnEventMutation } from '@@domain/auth/repositories/EarnEventRepository.type';
import { UnsupportOperationError } from '@@domain/error/UnsupportOperationError';
import { ClaimStatusInformation } from '@@domain/model/ClaimStatusInformation';
import { EarnEventDto } from '@@domain/model/EarnEventDto';
import { EventPhase, getEventPhase } from '@@domain/model/EventPhase';
import { ThirdPartyDeepLink } from '@@domain/model/ThirdPartyDeepLink';
import {
  ThirdPartyConnectCheckDto,
  ThirdPartyConnectCheckResponseDto,
  EarnEventCurrentResponseDto,
  EarnEventClaimCheckResponseDto,
  EarnEventGetClaimResponseDto,
  SimpleResponseDto,
} from '@@generated/generated-scheme';
import { IEventDetails, IEventThirdParty, IThirdPartyConnection } from '@@screens/EarnEventScreen/EarnEventDetailsScreen/EarnEventDetailsScreentype';
import { AbsTestEarnEventRepository } from '@@test/repository/AbsEarnEventRepository';
import { renderHook, waitFor, Providers } from '@@test/test-utils';
import { mockApi } from '@@utils/mockApi';

import { useEarnEventDetailsUiState } from './useEventDetailsUiState';

@injectable()
class MockEarnEventRepository extends AbsTestEarnEventRepository {
  constructor() {
    super();
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
}

describe('useEventDetailsUiState', () => {
  beforeAll(() => {
    container.register('EarnEventRepository', {
      useFactory: instancePerContainerCachingFactory<MockEarnEventRepository>((container) => container.resolve(MockEarnEventRepository)),
    });
  });

  afterAll(() => {
    container.clearInstances();
  });

  const events = mockApi<EarnEventDto[]>('v1/earn-event/list.json') ?? [];

  it('useCase with event-id, no data, no deepLink', async () => {
    const eventId = events[4].id;
    const data: EarnEventDto | undefined = undefined;
    const deepLink: ThirdPartyDeepLink | undefined = undefined;

    // NOTE: events[4].app field is null,
    expect(events[4].id).toBe('8aa3a8c8-0f97-43f1-949e-2c19db342ddb');
    expect(events[4].app).toBe(null);

    const { result } = renderHook(useEarnEventDetailsUiState, {
      initialProps: {
        id: eventId,
        data,
        deepLink,
      },
      wrapper: ({ children }) => <Providers>{children} </Providers>,
    });

    const details: IEventDetails = {
      event: data,
      phase: data ? getEventPhase(data, new Date('2023-01-01T08:45:00.000Z')) : EventPhase.NotAvailable,
      deepLink: deepLink,
    };
    const thirdParty: IEventThirdParty = {
      isThirdPartySupported: false,
      connection: undefined,
      points: details.event?.pointInfoArr.map((data) => ({ ...data, amount: '0' })) ?? [],
      error: null,
    };
    const claimStatusInfo: ClaimStatusInformation | undefined = undefined;

    const uiState = {
      details,
      thirdParty,
      claimStatusInfo,
    };

    await waitFor(() => {
      const res = result.current;
      expect(JSON.stringify(res.details)).toBe(JSON.stringify(uiState.details));
      expect(JSON.stringify(res.thirdParty)).toBe(JSON.stringify(uiState.thirdParty));
      expect(JSON.stringify(res.claimStatusInfo)).toBe(JSON.stringify(uiState.claimStatusInfo));
    });
  });
});
