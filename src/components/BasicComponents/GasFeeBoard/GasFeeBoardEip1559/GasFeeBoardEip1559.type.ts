import { IGasFeeInfoEip1559 } from '@@domain/gas/repository/gasRepositoryEip1559/GasRepositoryEip1559.type';

export interface IGasFeeBoardEip1559Props {
  isRevision: boolean;
  onConfirm: (gasFeeInfo: IGasFeeInfoEip1559) => void;
}
