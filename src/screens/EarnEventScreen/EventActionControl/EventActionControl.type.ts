import { EarnEventPoint } from '@@domain/model/EarnEventDto';
export interface EarnEventActionModalProps {
  avatarUrl: string;
  points: EarnEventPoint[];
  eventActionButtonTitle: string;
  eventActionScheme: string;
  receiptUrl?: string;
}
