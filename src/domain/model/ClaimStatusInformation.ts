import { EarnEventClaimCheckResponseDto, EarnEventGetClaimResponseDto } from '@@generated/generated-scheme';

export interface ClaimStatusInformation extends EarnEventClaimCheckResponseDto, EarnEventGetClaimResponseDto {
  isTxFeeVisible: boolean;
  isEventActionButtonEnabled: boolean;
}
