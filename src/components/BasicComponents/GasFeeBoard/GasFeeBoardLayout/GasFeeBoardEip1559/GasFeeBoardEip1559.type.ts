import { IGasFeeBoardProps, TOnConfirmEip1559 } from '../../GasFeeBoard.type';

export interface IGasFeeBoardEip1559Props extends IGasFeeBoardProps {
  onConfirm: TOnConfirmEip1559;
}
