import { IGasFeeBoardProps, TOnConfirmTezos } from '../../GasFeeBoard.type';

export interface IGasFeeBoardTezosProps extends IGasFeeBoardProps {
  onConfirm: TOnConfirmTezos;
}
