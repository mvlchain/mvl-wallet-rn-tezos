import { getNetworkByBase, getNetworkConfig, NETWORK_FEE_TYPE } from '@@constants/network.constant';
import walletPersistStore from '@@store/wallet/walletPersistStore';

import EIP1559Gas from './EIP1559/EIP1559Gas';
import EVMLegacyGas from './EVMLegacy/EVMLegacyGas';
import { IGasComponentProps } from './GasFeeBoard.type';
import TezosGas from './Tezos/TezosGas';

const GasFeeBoard = ({
  isRevision,
  onConfirm,
  tokenDto,
  onConfirmTitle,
  hideDivider,
  to,
  value,
  data,
  isValidInput,
  transferParam,
}: IGasComponentProps) => {
  const { selectedNetwork } = walletPersistStore();
  const testIncludeSelectedNetwork = getNetworkByBase(selectedNetwork);
  const networkConfig = getNetworkConfig(testIncludeSelectedNetwork);

  const renderAlongWithNetwork = () => {
    switch (networkConfig.networkFeeType) {
      case NETWORK_FEE_TYPE.EIP1559:
        return (
          <EIP1559Gas
            isRevision={isRevision}
            onConfirm={onConfirm}
            tokenDto={tokenDto}
            onConfirmTitle={onConfirmTitle}
            hideDivider={hideDivider}
            to={to}
            value={value}
            data={data}
            isValidInput={isValidInput}
          />
        );
      case NETWORK_FEE_TYPE.EVM_LEGACY_GAS:
        return (
          <EVMLegacyGas
            isRevision={isRevision}
            onConfirm={onConfirm}
            tokenDto={tokenDto}
            onConfirmTitle={onConfirmTitle}
            hideDivider={hideDivider}
            to={to}
            value={value}
            data={data}
            isValidInput={isValidInput}
          />
        );
      case NETWORK_FEE_TYPE.TEZOS:
        return (
          <TezosGas
            isRevision={isRevision}
            onConfirm={onConfirm}
            tokenDto={tokenDto}
            onConfirmTitle={onConfirmTitle}
            hideDivider={hideDivider}
            to={to}
            value={value}
            transferParam={transferParam}
            isValidInput={isValidInput}
          />
        );
    }
  };

  return <>{renderAlongWithNetwork()}</>;
};
export default GasFeeBoard;
