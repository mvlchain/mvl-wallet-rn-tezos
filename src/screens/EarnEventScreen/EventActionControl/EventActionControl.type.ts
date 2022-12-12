import { ClaimStatusInformation } from '@@domain/model/ClaimStatusInformation';
import { EarnEventPoint } from '@@domain/model/EarnEventDto';
import { IEventPointAmount } from '@@hooks/event/useEventDetailsState';
export interface EarnEventActionModalProps {
  avatarUrl: string;
  points: IEventPointAmount[];
  claimStatusInfo: ClaimStatusInformation | undefined;
  isAllowParticipationInClaim: boolean;
  eventActionButtonTitle: string;
  eventActionScheme: string;
  receiptUrl?: string;
}
