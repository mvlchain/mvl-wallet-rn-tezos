import { IGasFeeInfo } from '@@domain/gas/repository/gasRepository/GasRepository.type';
import { IGasFeeInfoEip1559 } from '@@domain/gas/repository/gasRepositoryEip1559/GasRepositoryEip1559.type';

export type TOnConfirmEthers = (gasFeeInfo: IGasFeeInfo) => void;
export type TOnConfirmEip1559 = (gasFeeInfo: IGasFeeInfoEip1559) => void;
export type TOnConfirmTezos = (fee: number) => void;
export interface IGasFeeBoardProps {
  isRevision: boolean;
  onConfirm: TOnConfirmEthers | TOnConfirmEip1559 | TOnConfirmTezos;
}
