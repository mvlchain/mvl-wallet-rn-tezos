import React from 'react';

import { View } from 'react-native';

import { getNetworkByBase, getNetworkConfig, NETWORK_FEE_TYPE } from '@@constants/network.constant';
import walletPersistStore from '@@store/wallet/walletPersistStore';

import EIP1559Gas from './EIP1559/EIP1559Gas';
import EVMLegacyGas from './EVMLegacy/EVMLegacyGas';
import { IGasComponentProps } from './GasFeeBoard.type';
import TezosGas from './Tezos/TezosGas';

const GasFeeBoard = ({ isRevision, onConfirm, onConfirmTitle, hideDivider, to, value, data, isValidInput, transferParam }: IGasComponentProps) => {
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

  return <View style={{ flex: 1 }}>{renderAlongWithNetwork()}</View>;
};
export default GasFeeBoard;
