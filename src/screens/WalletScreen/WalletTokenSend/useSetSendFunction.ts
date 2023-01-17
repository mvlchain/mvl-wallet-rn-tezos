import { useState } from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';
import { BigNumber } from 'bignumber.js';

import { TGasConfirmButtonFunctionParam } from '@@components/BasicComponents/GasFeeBoard/GasFeeBoard.type';
import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import { getNetworkConfig, getNetworkByBase } from '@@constants/network.constant';
import { PIN_LAYOUT, PIN_MODE } from '@@constants/pin.constant';
import { getTransactionType } from '@@domain/transaction/TransactionService.type';
import { useDi } from '@@hooks/useDi';
import { ROOT_STACK_ROUTE } from '@@navigation/RootStack/RootStack.type';
import gasStore from '@@store/gas/gasStore';
import globalModalStore from '@@store/globalModal/globalModalStore';
import { pinStore } from '@@store/pin/pinStore';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { formatBigNumber } from '@@utils/formatBigNumber';

import { TTransactionResultRootStackProps } from '../WalletTransactionResult/WalletTransactionResult.type';

import { TTokenSendRouteProps } from './WalletTokenSend.type';

const useSetSendFunction = () => {
  const transactionService = useDi('TransactionService');
  const walletService = useDi('WalletService');

  const { params } = useRoute<TTokenSendRouteProps>();
  const tokenDto = params.tokenDto;

  const { openModal, closeModal } = globalModalStore();
  const { setState: pinSet } = pinStore();
  const { to, data, value, resetBody, toValid, valueValid, tokenValue } = transactionRequestStore();
  const { baseFee, tip, gas, total, resetState: resetGas } = gasStore();

  const { selectedWalletIndex, selectedNetwork: pickNetwork } = walletPersistStore();
  const selectedNetwork = getNetworkByBase(pickNetwork);

  const network = getNetworkConfig(selectedNetwork);
  const navigation = useNavigation<TTransactionResultRootStackProps>();

  const checkPin = async () => {
    try {
      let pinModalResolver, pinModalRejector;
      const pinModalObserver = new Promise((resolve, reject) => {
        pinModalResolver = resolve;
        pinModalRejector = reject;
      });
      pinSet({ pinMode: PIN_MODE.CONFIRM, layout: PIN_LAYOUT.MODAL, pinModalResolver, pinModalRejector });
      openModal(MODAL_TYPES.CONFIRM_TX_PIN, undefined);
      await pinModalObserver;
    } catch (err) {
      console.log(err);
    }
  };

  const sendToBlockChain = async (param: TGasConfirmButtonFunctionParam) => {
    try {
      let txHash;
      if (tokenDto.contractAddress) {
        txHash = await transactionService.sendTransaction({
          selectedNetwork,
          selectedWalletIndex: selectedWalletIndex[selectedNetwork],
          ...param,
          to: tokenDto.contractAddress,
        });
      } else {
        txHash = await transactionService.sendTransaction({
          selectedNetwork,
          selectedWalletIndex: selectedWalletIndex[selectedNetwork],
          ...param,
        });
      }

      return txHash;
    } catch (err) {
      console.log(err);
    }
  };

  const registerHistoryToServer = async (txHash: string, nonce: number) => {
    try {
      const wallet = await walletService.getWalletInfo({ index: selectedWalletIndex[selectedNetwork], network: selectedNetwork });
      const transactionType = getTransactionType(network.networkId, !!tokenDto.contractAddress, tokenDto.symbol === 'BTCB', false);
      const serverRes = await transactionService.registerHistory({
        network: network.networkId,
        from: wallet.address,
        to: tokenDto.contractAddress ?? to,
        data,
        hash: txHash,
        type: transactionType,
        nonce,
        value: tokenDto.contractAddress ? tokenValue.toString(10) : value.toString(10),
      });
      if (!serverRes) {
        throw new Error('fail register history');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const send = async (param: TGasConfirmButtonFunctionParam) => {
    try {
      if (!toValid || !valueValid) return;
      //close confirm tx modal
      closeModal();
      await checkPin();
      const hash = await sendToBlockChain(param);
      if (!hash) {
        throw new Error('fail send to blockChain');
      }
      //TODO: nonce조회를 일시적으로 하지 못하는 경우 어떤 값으로 처리해줄 것인가?
      const nonce = (await transactionService.getNonce(selectedNetwork, hash)) ?? 0;
      await registerHistoryToServer(hash, nonce);
      resetBody();
      resetGas();
      navigation.navigate(ROOT_STACK_ROUTE.WALLET_TRANSACTION_RESULT);
      closeModal();
    } catch (err) {
      console.log(err);
    }
  };

  return { send };
};

export default useSetSendFunction;
