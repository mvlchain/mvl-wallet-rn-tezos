import React from 'react';

import { useTranslation } from 'react-i18next';

import { EIP_1559_SUPPORT_NETWORK, TEZOS_NETWORK } from '@@constants/network.constant';
import { IGasFeeInfo } from '@@domain/gas/repository/gasRepository/GasRepository.type';
import { IGasFeeInfoEip1559 } from '@@domain/gas/repository/gasRepositoryEip1559/GasRepositoryEip1559.type';
import walletPersistStore from '@@store/wallet/walletPersistStore';

import { IGasFeeBoardProps } from './GasFeeBoard.type';
import GasFeeBoardEip1559 from './GasFeeBoardEip1559/GasFeeBoardEip1559';
import GasFeeBoardEthers from './GasFeeBoardEthers/GasFeeBoardEthers';
import * as S from './GasFeeBoardLayout/GasFeeBoardLayout.style';
import GasFeeBoardTezos from './GasFeeBoardTezos/GasFeeBoardTezos';

function GasFeeBoard({ isRevision, onConfirm }: IGasFeeBoardProps) {
  const { t } = useTranslation();
  const { selectedNetwork } = walletPersistStore();

  const renderGasFeeBoard = () => {
    if (TEZOS_NETWORK.includes(selectedNetwork)) {
      return <GasFeeBoardTezos />;
    } else if (EIP_1559_SUPPORT_NETWORK.includes(selectedNetwork)) {
      //TODO: onConfirm x타입 리팩토링
      return <GasFeeBoardEip1559 isRevision={isRevision} onConfirm={onConfirm as (gasFeeInfo: IGasFeeInfoEip1559) => void} />;
    } else {
      //TODO: onConfirm x타입 리팩토링
      return <GasFeeBoardEthers isRevision={isRevision} onConfirm={onConfirm as (gasFeeInfo: IGasFeeInfo) => void} />;
    }
  };
  return <>{renderGasFeeBoard()}</>;
}

export default GasFeeBoard;
