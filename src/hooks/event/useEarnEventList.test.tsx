/* eslint max-lines: off */
import React from 'react';

import { useTranslation } from 'react-i18next';
import { container, instancePerContainerCachingFactory, injectable } from 'tsyringe';

import { EarnEventDto } from '@@domain/model/EarnEventDto';
import {
  ThirdPartyConnectCheckDto,
  ThirdPartyConnectCheckResponseDto,
  EarnEventCurrentResponseDto,
  EarnEventClaimCheckResponseDto,
  EarnEventGetClaimResponseDto,
  SimpleResponseDto,
  DeferredAuthValidateDto,
} from '@@generated/generated-scheme';
import { getEventTimeDescriptionByEventPhase, useEarnEventList } from '@@hooks/event/useEarnEventList';
import { AbsTestEarnEventRepository } from '@@test/repository/AbsEarnEventRepository';
import { renderHook, waitFor, Providers } from '@@test/test-utils';
import { mockApi } from '@@utils/mockApi';

/**
 * MOCK useTranslation hook
 */
jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

/**
 * MOCK class EarnEventRepository
 */
@injectable()
class MockEarnEventRepository extends AbsTestEarnEventRepository {
  constructor() {
    super();
  }

  getEventList(): Promise<EarnEventDto[]> {
    const res = mockApi<EarnEventDto[]>('v1/earn-event/list.json');
    return Promise.resolve(res ?? []);
  }
}

describe('useEarnEventList', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    container.register('EarnEventRepository', {
      useFactory: instancePerContainerCachingFactory<MockEarnEventRepository>((container) => container.resolve(MockEarnEventRepository)),
    });
  });

  afterAll(() => {
    container.clearInstances();
  });

  /**
   * MOCK `mockApi(v1/earn-event/list.json)`
   */
  it('useCase', async () => {
    const { result } = renderHook(() => useEarnEventList(), {
      wrapper: ({ children }) => <Providers>{children}</Providers>,
    });

    await waitFor(() => expect(result.current.data?.length ?? 0).toBe(5));
  });

  /**
   * OnClaim phase
   * "claimEndAt": "2022-12-07T23:00:00.000Z",
   */
  it('TimeDescription singular day of on-claim phase', () => {
    const { t } = useTranslation();
    const events = mockApi<EarnEventDto[]>('v1/earn-event/list.json') ?? [];

    const description = getEventTimeDescriptionByEventPhase(events[0], t, new Date('2022-12-06T23:00:00.000Z'));
    expect(description).toBe('1 me_day event_time_claim_end');
  });

  it('TimeDescription plural days of on-claim phase', () => {
    const { t } = useTranslation();
    const events = mockApi<EarnEventDto[]>('v1/earn-event/list.json') ?? [];

    const description = getEventTimeDescriptionByEventPhase(events[0], t, new Date('2022-12-05T23:00:00.000Z'));
    expect(description).toBe('2 me_days event_time_claim_end');
  });

  it('TimeDescription singular hour of on-claim phase', () => {
    const { t } = useTranslation();
    const events = mockApi<EarnEventDto[]>('v1/earn-event/list.json') ?? [];

    const description = getEventTimeDescriptionByEventPhase(events[0], t, new Date('2022-12-07T22:00:00.000Z'));
    expect(description).toBe('1 me_hour event_time_claim_end');
  });

  it('TimeDescription plural days of on-claim phase', () => {
    const { t } = useTranslation();
    const events = mockApi<EarnEventDto[]>('v1/earn-event/list.json') ?? [];

    const description = getEventTimeDescriptionByEventPhase(events[0], t, new Date('2022-12-07T21:00:00.000Z'));
    expect(description).toBe('2 me_hours event_time_claim_end');
  });

  it('TimeDescription singular minute of on-claim phase', () => {
    const { t } = useTranslation();
    const events = mockApi<EarnEventDto[]>('v1/earn-event/list.json') ?? [];

    const description = getEventTimeDescriptionByEventPhase(events[0], t, new Date('2022-12-07T22:59:00.000Z'));
    expect(description).toBe('1 me_min event_time_claim_end');
  });

  it('TimeDescription plural minutes of on-claim phase', () => {
    const { t } = useTranslation();
    const events = mockApi<EarnEventDto[]>('v1/earn-event/list.json') ?? [];

    const description = getEventTimeDescriptionByEventPhase(events[0], t, new Date('2022-12-07T22:58:00.000Z'));
    expect(description).toBe('2 me_mins event_time_claim_end');
  });

  /**
   * BeforeClaim phase
   * "claimStartAt": "2022-11-14T23:00:00.000Z",
   */
  it('TimeDescription singular day of before-claim phase', () => {
    const { t } = useTranslation();
    const events = mockApi<EarnEventDto[]>('v1/earn-event/list.json') ?? [];

    const description = getEventTimeDescriptionByEventPhase(events[0], t, new Date('2022-11-13T23:00:00.000Z'));
    expect(description).toBe('1 me_day event_time_before_claim');
  });

  it('TimeDescription plural days of before-claim phase', () => {
    const { t } = useTranslation();
    const events = mockApi<EarnEventDto[]>('v1/earn-event/list.json') ?? [];

    const description = getEventTimeDescriptionByEventPhase(events[0], t, new Date('2022-11-12T23:00:00.000Z'));
    expect(description).toBe('2 me_days event_time_before_claim');
  });

  it('TimeDescription singular hour of before-claim phase', () => {
    const { t } = useTranslation();
    const events = mockApi<EarnEventDto[]>('v1/earn-event/list.json') ?? [];

    const description = getEventTimeDescriptionByEventPhase(events[0], t, new Date('2022-11-14T22:00:00.000Z'));
    expect(description).toBe('1 me_hour event_time_before_claim');
  });

  it('TimeDescription plural hours of before-claim phase', () => {
    const { t } = useTranslation();
    const events = mockApi<EarnEventDto[]>('v1/earn-event/list.json') ?? [];

    const description = getEventTimeDescriptionByEventPhase(events[0], t, new Date('2022-11-14T21:00:00.000Z'));
    expect(description).toBe('2 me_hours event_time_before_claim');
  });

  it('TimeDescription singular minute of before-claim phase', () => {
    const { t } = useTranslation();
    const events = mockApi<EarnEventDto[]>('v1/earn-event/list.json') ?? [];

    const description = getEventTimeDescriptionByEventPhase(events[0], t, new Date('2022-11-14T22:59:00.000Z'));
    expect(description).toBe('1 me_min event_time_before_claim');
  });

  it('TimeDescription plural minutes of before-claim phase', () => {
    const { t } = useTranslation();
    const events = mockApi<EarnEventDto[]>('v1/earn-event/list.json') ?? [];

    const description = getEventTimeDescriptionByEventPhase(events[0], t, new Date('2022-11-14T22:58:00.000Z'));
    expect(description).toBe('2 me_mins event_time_before_claim');
  });

  /**
   * OnEvent phase
   * "eventEndAt": "2022-11-11T23:00:00.000Z",
   */
  it('TimeDescription singular day of on-event phase', () => {
    const { t } = useTranslation();
    const events = mockApi<EarnEventDto[]>('v1/earn-event/list.json') ?? [];

    const description = getEventTimeDescriptionByEventPhase(events[0], t, new Date('2022-11-10T23:00:00.000Z'));
    expect(description).toBe('1 me_day event_time_on_event');
  });

  it('TimeDescription plural days of on-event phase', () => {
    const { t } = useTranslation();
    const events = mockApi<EarnEventDto[]>('v1/earn-event/list.json') ?? [];

    const description = getEventTimeDescriptionByEventPhase(events[0], t, new Date('2022-11-09T23:00:00.000Z'));
    expect(description).toBe('2 me_days event_time_on_event');
  });

  it('TimeDescription singular hour of on-event phase', () => {
    const { t } = useTranslation();
    const events = mockApi<EarnEventDto[]>('v1/earn-event/list.json') ?? [];

    const description = getEventTimeDescriptionByEventPhase(events[0], t, new Date('2022-11-11T22:00:00.000Z'));
    expect(description).toBe('1 me_hour event_time_on_event');
  });

  it('TimeDescription plural hours of on-event phase', () => {
    const { t } = useTranslation();
    const events = mockApi<EarnEventDto[]>('v1/earn-event/list.json') ?? [];

    const description = getEventTimeDescriptionByEventPhase(events[0], t, new Date('2022-11-11T21:00:00.000Z'));
    expect(description).toBe('2 me_hours event_time_on_event');
  });

  it('TimeDescription singular minute of on-event phase', () => {
    const { t } = useTranslation();
    const events = mockApi<EarnEventDto[]>('v1/earn-event/list.json') ?? [];

    const description = getEventTimeDescriptionByEventPhase(events[0], t, new Date('2022-11-11T22:59:00.000Z'));
    expect(description).toBe('1 me_min event_time_on_event');
  });

  it('TimeDescription plural minutes of on-event phase', () => {
    const { t } = useTranslation();
    const events = mockApi<EarnEventDto[]>('v1/earn-event/list.json') ?? [];

    const description = getEventTimeDescriptionByEventPhase(events[0], t, new Date('2022-11-11T22:58:00.000Z'));
    expect(description).toBe('2 me_mins event_time_on_event');
  });

  /**
   * BeforeEvent phase
   * "eventStartAt": "2022-11-07T23:00:00.000Z",
   */
  it('TimeDescription singular day of before-event phase', () => {
    const { t } = useTranslation();
    const events = mockApi<EarnEventDto[]>('v1/earn-event/list.json') ?? [];

    const description = getEventTimeDescriptionByEventPhase(events[0], t, new Date('2022-11-06T23:00:00.000Z'));
    expect(description).toBe('1 me_day event_time_before_event');
  });

  it('TimeDescription plural days of before-event phase', () => {
    const { t } = useTranslation();
    const events = mockApi<EarnEventDto[]>('v1/earn-event/list.json') ?? [];

    const description = getEventTimeDescriptionByEventPhase(events[0], t, new Date('2022-11-05T23:00:00.000Z'));
    expect(description).toBe('2 me_days event_time_before_event');
  });

  it('TimeDescription singular hour of before-event phase', () => {
    const { t } = useTranslation();
    const events = mockApi<EarnEventDto[]>('v1/earn-event/list.json') ?? [];

    const description = getEventTimeDescriptionByEventPhase(events[0], t, new Date('2022-11-07T22:00:00.000Z'));
    expect(description).toBe('1 me_hour event_time_before_event');
  });

  it('TimeDescription plural hours of before-event phase', () => {
    const { t } = useTranslation();
    const events = mockApi<EarnEventDto[]>('v1/earn-event/list.json') ?? [];

    const description = getEventTimeDescriptionByEventPhase(events[0], t, new Date('2022-11-07T21:00:00.000Z'));
    expect(description).toBe('2 me_hours event_time_before_event');
  });

  it('TimeDescription singular minute of before-event phase', () => {
    const { t } = useTranslation();
    const events = mockApi<EarnEventDto[]>('v1/earn-event/list.json') ?? [];

    const description = getEventTimeDescriptionByEventPhase(events[0], t, new Date('2022-11-07T22:59:00.000Z'));
    expect(description).toBe('1 me_min event_time_before_event');
  });

  it('TimeDescription plural minutes of before-event phase', () => {
    const { t } = useTranslation();
    const events = mockApi<EarnEventDto[]>('v1/earn-event/list.json') ?? [];

    const description = getEventTimeDescriptionByEventPhase(events[0], t, new Date('2022-11-07T22:58:00.000Z'));
    expect(description).toBe('2 me_mins event_time_before_event');
  });
});
