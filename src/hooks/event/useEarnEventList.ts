import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';

import { EarnEventRepository } from '@@domain/auth/repositories/EarnEventRepository';
import { EarnEvent } from '@@domain/model/EarnEvent';
import { EarnEventDto } from '@@domain/model/EarnEventDto';
import { useDi } from '@@hooks/useDi';
import { TimeDuration, TimeDurationUnit } from '@@utils/TimeDuration.type';
import { parseTimeDuration } from '@@utils/parseTimeDuration';

/**
 * A hook to get earn event list
 *
 * @returns a list of ear-events
 */
export const useEarnEventList = (): UseQueryResult<EarnEvent[], AxiosError> => {
  const { t } = useTranslation();
  const repository: EarnEventRepository = useDi('EarnEventRepository');

  return useQuery({
    queryKey: ['earn-events'],
    queryFn: () => UseCase(repository, t),
  });
};

/**
 * UseCase: GetEarnEventUseCase
 */
const UseCase = async (repository: EarnEventRepository, t: (key: string) => string): Promise<EarnEvent[]> => {
  const events = await repository.getEvents();
  return events.map((event): EarnEvent => {
    return {
      timeDescription: getEventTimeDescriptionByEventPhase(event, t),
      ...event,
    };
  });
};

/**
 * Event time duration dependes on event phase which has following order.
 *  1. eventStartAt (start)
 *  2. eventEndAt
 *  3. claimStartAt
 *  4. claimEndAt (finish)
 *
 * @returns a description string for the event remaining time.
 */
export const getEventTimeDescriptionByEventPhase = (event: EarnEventDto, t: (key: string) => string, current: Date = new Date()): string => {
  const { eventStartAt, eventEndAt, claimStartAt, claimEndAt } = event;

  // BeforeEvent phase
  const eventStartAtDuration = parseTimeDuration(new Date(eventStartAt), current);
  if (eventStartAtDuration != null) {
    const timeAmount = parseTimeAmount(eventStartAtDuration, t);
    return `${timeAmount} ${t('event_time_before_event')}`;
  }
  // OnEvent phase
  const eventEndAtDuration = parseTimeDuration(new Date(eventEndAt), current);
  if (eventEndAtDuration != null) {
    const timeAmount = parseTimeAmount(eventEndAtDuration, t);
    return `${timeAmount} ${t('event_time_on_event')}`;
  }

  // BeforeClaim phase
  const claimStartAtDuration = parseTimeDuration(new Date(claimStartAt), current);
  if (claimStartAtDuration != null) {
    const timeAmount = parseTimeAmount(claimStartAtDuration, t);
    return `${timeAmount} ${t('event_time_before_claim')}`;
  }

  // OnClaim phase
  const claimEndAtDuration = parseTimeDuration(new Date(claimEndAt), current);
  if (claimEndAtDuration != null) {
    const timeAmount = parseTimeAmount(claimEndAtDuration, t);
    return `${timeAmount} ${t('event_time_claim_end')}`;
  }

  return '';
};

const parseTimeAmount = (duration: TimeDuration, t: (key: string) => string) => {
  const isPlural = duration.amount > 1;
  const { amount } = duration;

  switch (duration.unit) {
    case TimeDurationUnit.Day:
      return isPlural ? `${amount} ${t('time_days').substring(2)}` : `${amount} ${t('time_day').substring(2)}`;
    case TimeDurationUnit.Hour:
      return isPlural ? `${amount} ${t('time_hours').substring(2)}` : `${amount} ${t('time_hour').substring(2)}`;
    case TimeDurationUnit.Minute:
      return isPlural ? `${amount} ${t('time_mins').substring(2)}` : `${amount} ${t('time_min').substring(2)}`;
    default:
      return '';
  }
};
