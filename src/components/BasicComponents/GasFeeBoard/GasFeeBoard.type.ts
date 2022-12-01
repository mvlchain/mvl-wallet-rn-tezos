import { BigNumber } from 'ethers';

import { IGasFeeInfo } from '@@domain/gas/repository/gasRepository/GasRepository.type';
import { IGasFeeInfoEip1559 } from '@@domain/gas/repository/gasRepositoryEip1559/GasRepositoryEip1559.type';

export type TOnConfirmEthers = (gasFeeInfo: IGasFeeInfo, total: BigNumber) => void;
export type TOnConfirmEip1559 = (gasFeeInfo: IGasFeeInfoEip1559, total: BigNumber) => void;
export type TOnConfirmTezos = (fee: number, total: BigNumber) => void;
export interface IGasFeeBoardProps {
  isRevision: boolean;
  onConfirm: TOnConfirmEthers | TOnConfirmEip1559 | TOnConfirmTezos;
}
