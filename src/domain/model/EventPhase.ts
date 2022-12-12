import { parseTimeDuration } from '@@utils/parseTimeDuration';

import { EarnEvent } from './EarnEvent';

export const EventPhase = {
  BeforeEvent: 'BeforeEvent',
  OnEvent: 'OnEvent',
  BeforeClaim: 'BeforeClaim',
  OnClaim: 'OnClaim',
  NotAvailable: 'NotAvailable',
};

export function getEventPhase(event: EarnEvent, current: Date = new Date()) {
  // BeforeEvent phase
  const eventStartAtDuration = parseTimeDuration(new Date(event.eventStartAt), current);
  if (eventStartAtDuration != null) {
    return EventPhase.BeforeClaim;
  }
  // OnEvent phase
  const eventEndAtDuration = parseTimeDuration(new Date(event.eventEndAt), current);
  if (eventEndAtDuration != null) {
    return EventPhase.OnClaim;
  }

  // BeforeClaim phase
  const claimStartAtDuration = parseTimeDuration(new Date(event.claimStartAt), current);
  if (claimStartAtDuration != null) {
    return EventPhase.BeforeClaim;
  }

  // OnClaim phase
  const claimEndAtDuration = parseTimeDuration(new Date(event.claimEndAt), current);
  if (claimEndAtDuration != null) {
    return EventPhase.OnClaim;
  }

  return EventPhase.NotAvailable;
}
