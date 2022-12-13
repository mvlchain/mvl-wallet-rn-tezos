import { ClaimStatusInformation } from '@@domain/model/ClaimStatusInformation';
import { EarnEvent } from '@@domain/model/EarnEvent';
import { EventPhase } from '@@domain/model/EventPhase';
import { IEventThirdParty } from '@@hooks/event/useEventDetailsState';
import { valueOf } from '@@utils/types';
export interface EarnEventActionModalProps {
  phase: valueOf<typeof EventPhase>;
  event: EarnEvent;
  thirdParty: IEventThirdParty;
  claimStatusInfo: ClaimStatusInformation | undefined;
}
