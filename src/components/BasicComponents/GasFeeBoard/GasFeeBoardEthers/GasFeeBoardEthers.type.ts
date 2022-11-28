import { IGasFeeInfo } from '@@domain/gas/repository/gasRepository/GasRepository.type';

export interface IGasFeeBoardEthersProps {
  isRevision: boolean;
  onConfirm: (gasFeeInfo: IGasFeeInfo) => void;
}
