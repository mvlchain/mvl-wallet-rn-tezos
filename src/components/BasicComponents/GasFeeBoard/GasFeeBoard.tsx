import React from 'react';

import { EIP_1559_SUPPORT_NETWORK, TEZOS_NETWORK } from '@@constants/network.constant';
import walletPersistStore from '@@store/wallet/walletPersistStore';

import { IGasFeeBoardProps, TOnConfirmEip1559, TOnConfirmEthers, TOnConfirmTezos } from './GasFeeBoard.type';
import GasFeeBoardEip1559 from './GasFeeBoardLayout/GasFeeBoardEip1559';
import GasFeeBoardEthers from './GasFeeBoardLayout/GasFeeBoardEthers';
import GasFeeBoardTezos from './GasFeeBoardLayout/GasFeeBoardTezos';

function GasFeeBoard({ isRevision, onConfirm }: IGasFeeBoardProps) {
  const { selectedNetwork } = walletPersistStore();

  const renderGasFeeBoard = () => {
    if (TEZOS_NETWORK.includes(selectedNetwork)) {
      return <GasFeeBoardTezos isRevision={isRevision} onConfirm={onConfirm as TOnConfirmTezos} />;
    } else if (EIP_1559_SUPPORT_NETWORK.includes(selectedNetwork)) {
      //TODO: onConfirm x타입 리팩토링
      return <GasFeeBoardEip1559 isRevision={isRevision} onConfirm={onConfirm as TOnConfirmEip1559} />;
    } else {
      //TODO: onConfirm x타입 리팩토링
      return <GasFeeBoardEthers isRevision={isRevision} onConfirm={onConfirm as TOnConfirmEthers} />;
    }
  };
  return <>{renderGasFeeBoard()}</>;
}

export default GasFeeBoard;
