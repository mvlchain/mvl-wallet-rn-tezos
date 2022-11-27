import { IEIP1559GasFeeInfo, IGasFeeInfo } from '@@domain/transaction/GasService.type';

export interface ISpeedOperationBoardProps {
  onConfirm: (gasFeeInfo: IGasFeeInfo | IEIP1559GasFeeInfo) => void;
}
