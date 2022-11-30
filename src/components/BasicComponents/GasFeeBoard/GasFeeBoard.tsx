import React from 'react';

import { NETWORK_FEE_TYPE, getNetworkConfig } from '@@constants/network.constant';
import walletPersistStore from '@@store/wallet/walletPersistStore';

import { IGasFeeBoardProps, TOnConfirmEip1559, TOnConfirmEthers, TOnConfirmTezos } from './GasFeeBoard.type';
import GasFeeBoardEip1559 from './GasFeeBoardLayout/GasFeeBoardEip1559';
import GasFeeBoardEthers from './GasFeeBoardLayout/GasFeeBoardEthers';
import GasFeeBoardTezos from './GasFeeBoardLayout/GasFeeBoardTezos';

function GasFeeBoard({ isRevision, onConfirm }: IGasFeeBoardProps) {
  const { selectedNetwork } = walletPersistStore();
  const network = getNetworkConfig(selectedNetwork);

  const renderGasFeeBoard = () => {
    switch (network.networkFeeType) {
      case NETWORK_FEE_TYPE.TEZOS:
        return <GasFeeBoardTezos isRevision={isRevision} onConfirm={onConfirm as TOnConfirmTezos} />;
      case NETWORK_FEE_TYPE.EIP1559:
        return <GasFeeBoardEip1559 isRevision={isRevision} onConfirm={onConfirm as TOnConfirmEip1559} />;
      default:
        return <GasFeeBoardEthers isRevision={isRevision} onConfirm={onConfirm as TOnConfirmEthers} />;
    }
  };
  return <>{renderGasFeeBoard()}</>;
}

export default GasFeeBoard;
