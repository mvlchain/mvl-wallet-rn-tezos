import { useEffect, useState } from 'react';

import { useDi } from '@@hooks/useDi';

import 'reflect-metadata';
import { BigNumber } from 'ethers';
import { GestureResponderEvent } from 'react-native-modal';

import { IGasFeeInfoEip1559 } from '@@domain/gas/repository/gasRepositoryEip1559/GasRepositoryEip1559.type';
import { IGasFeeInfo } from '@@domain/gas/repository/gasRepository/GasRepository.type';
import { ISendTransactionGasFee } from '@@domain/transaction/TransactionService.type';
import globalModalStore from '@@store/globalModal/globalModalStore';
import { pinStore } from '@@store/pin/pinStore';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { getNetworkConfig, Network, NETWORK } from '@@constants/network.constant';
import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import { BINANCE, ETHEREUM, TEZOS } from '@@domain/blockchain/BlockChain';
import { PIN_LAYOUT, PIN_MODE, PIN_STEP } from '@@constants/pin.constant';
import PinLayout from '@@components/BasicComponents/Pin/PinLayout';

const useTokenSend = () => {
  const ethersTransactionService = useDi('EtherTransactionService');
  const tezosTransactionService = useDi('TezosTransactionService');
  const walletService = useDi('WalletService');
  const { to, data, value, setBody, resetBody } = transactionRequestStore();
  const { selectedNetwork, selectedWalletIndex } = walletPersistStore();
  const { setState: pinSet } = pinStore;

  const network = getNetworkConfig(selectedNetwork);
  const { openModal, closeModal } = globalModalStore();

  //TODO: 뒤로가기할때 resetBody로 없애기

  const send = (params: any) => {
    closeModal();
    return async () => {
      //TODO: 코드 중복됨 합칠수 있는지 보자.
      let pinModalResolver, pinModalRejector;
      const pinModalObserver = new Promise((resolve, reject) => {
        pinModalResolver = resolve;
        pinModalRejector = reject;
      });
      pinSet({ pinMode: PIN_MODE.CONFIRM, layout: PIN_LAYOUT.MODAL, pinModalResolver, pinModalRejector });
      //TODO: 에러 나면 리셋바디 + 샌드화면으로 이동
      const password = await pinModalObserver;
      //TODO: 결과에따라 성공화면 실패화면
      const res = await ethersTransactionService.sendTransaction(params);
    };
  };

  const getChain = (network: Network) => {
    switch (network) {
      case NETWORK.ETH:
        return ETHEREUM;
      case NETWORK.GOERLI:
        return ETHEREUM;
      case NETWORK.BSC:
        return BINANCE;
      case NETWORK.BSC_TESTNET:
        return BINANCE;
      case NETWORK.TEZOS:
        return TEZOS;
      case NETWORK.TEZOS_GHOSTNET:
        return TEZOS;
      default:
        return null;
    }
  };

  const confirmSend = async (gasFeeInfo: IGasFeeInfo, total: BigNumber) => {
    if (!to || !value) return;

    const blockchain = getChain(selectedNetwork);
    if (!blockchain) return;
    const wallet = await walletService.getWalletInfo({ index: selectedWalletIndex, blockchain });
    const params = {
      networkInfo: { rpcUrl: network.rpcUrl, chainId: network.chainId },
      privateKey: wallet.privateKey,
      gasFeeInfo,
      to,
      from: wallet.address,
      value,
    };

    const res = await ethersTransactionService.approveTransaction(params);
    const recipientAddress = res;
    openModal(MODAL_TYPES.CONFIRM_SEND, { recipientAddress, amount: value, fee: total, onConfirm: send });
  };

  const setAddress = (address: string) => {
    setBody({ to: address });
  };

  const setAmount = (amount: BigNumber) => {
    setBody({ value: amount });
  };

  return { amount: value, setAmount, address: to, setAddress, confirmSend };
};
export default useTokenSend;
