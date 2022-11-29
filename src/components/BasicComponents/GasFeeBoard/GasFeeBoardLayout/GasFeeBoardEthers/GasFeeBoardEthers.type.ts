import { IGasFeeBoardProps, TOnConfirmEthers } from '../../GasFeeBoard.type';

export interface IGasFeeBoardEthersProps extends IGasFeeBoardProps {
  onConfirm: TOnConfirmEthers;
}
