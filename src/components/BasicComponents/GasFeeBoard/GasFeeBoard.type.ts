import { IGasFeeInfo } from '@@domain/gas/GasService.type';
import { TokenDto } from '@@generated/generated-scheme-clutch';

export interface IGasFeeBoardProps {
  isRevision: boolean;
  onConfirm: (param: IGasFeeInfo) => Promise<void>;
  tokenDto: TokenDto;
  isValid: () => boolean;
}
