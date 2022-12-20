import { ClaimStatusInformation } from '@@domain/model/ClaimStatusInformation';
import { EarnEventDto } from '@@domain/model/EarnEventDto';
import { EventPhase } from '@@domain/model/EventPhase';
import { IEventThirdParty } from '@@screens/EarnEventScreen/EarnEventDetailsScreen/EarnEventDetailsScreentype';
import { valueOf } from '@@utils/types';
export interface EarnEventActionModalProps {
  phase: valueOf<typeof EventPhase>;
  event: EarnEventDto;
  thirdParty: IEventThirdParty;
  claimStatusInfo: ClaimStatusInformation | undefined;
}

export interface IActionControlAttrs {
  isSvgAvatar: boolean;
  avatarUrl: string;
  actionButtonTitle: string;
  isActionButtonEnabled: boolean;
  eventPointInfoList: IEventPointInfo[];
  isClaimCompleted?: boolean;
  onActionButtonPress?: Function;
}

export interface IEventPointInfo {
  title: string;
  amount: string;
  currency: string;
  subAmount?: string;
  subCurrency?: string;
}
