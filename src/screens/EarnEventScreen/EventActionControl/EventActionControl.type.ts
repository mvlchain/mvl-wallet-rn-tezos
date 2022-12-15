import { ClaimStatusInformation } from '@@domain/model/ClaimStatusInformation';
import { EarnEventDto } from '@@domain/model/EarnEventDto';
import { EventPhase } from '@@domain/model/EventPhase';
import { IEventThirdParty } from '@@hooks/event/useEventDetailsUiState';
import { valueOf } from '@@utils/types';
export interface EarnEventActionModalProps {
  phase: valueOf<typeof EventPhase>;
  event: EarnEventDto;
  thirdParty: IEventThirdParty;
  claimStatusInfo: ClaimStatusInformation | undefined;
}
