import { IGasFeeInfo } from '@@domain/gas/repository/gasRepository/GasRepository.type';
import { IGasFeeInfoEip1559 } from '@@domain/gas/repository/gasRepositoryEip1559/GasRepositoryEip1559.type';
export interface IGasFeeBoardProps {
  isRevision: boolean;
  onConfirm: ((gasFeeInfo: IGasFeeInfo) => void) | ((gasFeeInfo: IGasFeeInfoEip1559) => void);
}
