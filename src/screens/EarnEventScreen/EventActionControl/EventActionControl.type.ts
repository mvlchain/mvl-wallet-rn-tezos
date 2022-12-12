import { EarnEventPoint } from '@@domain/model/EarnEventDto';
import { IEventPointAmount } from '@@hooks/event/useEventDetailsState';
export interface EarnEventActionModalProps {
  avatarUrl: string;
  points: IEventPointAmount[];
  eventActionButtonTitle: string;
  eventActionScheme: string;
  receiptUrl?: string;
}
