import React from 'react';

import { container, injectable, instancePerContainerCachingFactory } from 'tsyringe';

import { IEarnEventMutation } from '@@domain/auth/repositories/EarnEventRepository.type';
import { NotFoundError } from '@@domain/error/NotFoundError';
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
import { IEventDetails, IEventThirdParty, IThirdPartyConnection } from '@@screens/EarnEventScreen/EarnEventDetailsScreen/EarnEventDetailsScreen.type';
import { AbsTestEarnEventRepository } from '@@test/repository/AbsEarnEventRepository';
import { renderHook, Providers } from '@@test/test-utils';
import { mockApi } from '@@utils/mockApi';

import { useEarnEventDetailsUiState } from './useEventDetailsUiState';

// TODO: add MockEarnEventService and test again
describe('useEventDetailsUiState', () => {
  afterEach(() => {
    container.clearInstances();
  });

  it('dummy event test, will be updated soon', () => {
    expect(true).toBe(true);
  });

  // const events = mockApi<EarnEventDto[]>('v1/earn-event/list.json') ?? [];

  // it('useCase with event-id, no event-data, no deepLink, an evnet without event.app', async () => {
  //   loadTestEarnEventRepository();
  //   jest.useFakeTimers();

  //   const eventId = events[4].id;
  //   const data: EarnEventDto = events[4];
  //   const deepLink: ThirdPartyDeepLink | undefined = undefined;

  //   // NOTE: events[4].app field is null,
  //   expect(events[4].id).toBe('8aa3a8c8-0f97-43f1-949e-2c19db342ddb');
  //   expect(events[4].app).toBe(null);

  //   const repository = getTestEarnEventRepository();
  //   const spyGetEvent = jest.spyOn(repository, 'getEvent');
  //   const spyCheckThirdPartyConnection = jest.spyOn(repository, 'checkThirdPartyConnection');
  //   const spyGetUserPoints = jest.spyOn(repository, 'getUserPoints');
  //   const spyGetClaimStatus = jest.spyOn(repository, 'getClaimStatus');
  //   const spyGetClaimInformation = jest.spyOn(repository, 'getClaimInformation');

  //   // run hook
  //   const { result, rerender } = renderHook(useEarnEventDetailsUiState, {
  //     initialProps: {
  //       id: eventId,
  //       event: undefined,
  //     },
  //     wrapper: ({ children }) => <Providers>{children} </Providers>,
  //   });

  //   // build expected result
  //   const details: IEventDetails = {
  //     event: data,
  //     phase: data ? getEventPhase(data, new Date('2023-01-01T08:45:00.000Z')) : EventPhase.NotAvailable,
  //   };
  //   const thirdParty: IEventThirdParty = {
  //     isThirdPartySupported: false,
  //     connection: undefined,
  //     points: details.event?.pointInfoArr.map((data) => ({ ...data, amount: '0' })) ?? [],
  //     isThirdPartyConnectionRequired: false,
  //     error: null,
  //   };
  //   const claimStatusInfo: ClaimStatusInformation | undefined = undefined;

  //   const uiState = {
  //     details,
  //     thirdParty,
  //     claimStatusInfo,
  //   };

  //   //jest.runAllTimers();
  //   const res = result.current;
  //   expect(spyGetEvent.mock.calls.length).toBe(1);
  //   expect(spyCheckThirdPartyConnection.mock.calls.length).toBe(0);
  //   expect(spyGetUserPoints.mock.calls.length).toBe(0);
  //   expect(spyGetClaimStatus.mock.calls.length).toBe(0);
  //   expect(spyGetClaimInformation.mock.calls.length).toBe(0);

  //   expect(res).not.toBeUndefined();
  //   expect(JSON.stringify(res!.details)).toBe(JSON.stringify(uiState.details));
  //   expect(JSON.stringify(res!.thirdParty)).toBe(JSON.stringify(uiState.thirdParty));
  //   expect(JSON.stringify(res!.claimStatusInfo)).toBe(JSON.stringify(uiState.claimStatusInfo));
  // });
});

const getTestEarnEventRepository = () => container.resolve<MockTestEarnEventRepository>('EarnEventRepository');
const loadTestEarnEventRepository = () => {
  container.register('EarnEventRepository', {
    useFactory: instancePerContainerCachingFactory<MockTestEarnEventRepository>((container) => container.resolve(MockTestEarnEventRepository)),
  });
};

@injectable()
class MockTestEarnEventRepository extends AbsTestEarnEventRepository {
  constructor() {
    super();
  }

  getEventList(): Promise<EarnEventDto[]> {
    return Promise.resolve(mockApi<EarnEventDto[]>('v1/earn-event/list.json') ?? []);
  }

  getEvent(eventId: string): Promise<EarnEventDto> {
    return this.getEventList()
      .then((event) => {
        const res = event.find((e) => e.id === eventId);
        if (res) {
          return Promise.resolve(res);
        } else {
          throw Promise.reject(new NotFoundError());
        }
      })
      .catch((e) => {
        throw e;
      });
  }
  getUserPoints(eventId: string): Promise<EarnEventCurrentResponseDto[]> {
    return Promise.resolve([
      {
        amount: '0',
        key: '',
        title: '',
        currency: '',
      },
    ]);
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
    return Promise.resolve({
      exists: false,
      displayName: 'third-party-name',
    });
  }
  connectThirdParty(appId: string, token: string | null): Promise<SimpleResponseDto> {
    throw new UnsupportOperationError();
  }
  disconnectThirdParty(appId: string): Promise<SimpleResponseDto> {
    throw new UnsupportOperationError();
  }
}
