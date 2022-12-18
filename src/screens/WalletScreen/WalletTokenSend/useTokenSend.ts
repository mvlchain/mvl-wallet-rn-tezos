import { useEffect } from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';
import { BigNumber } from 'bignumber.js';
import { BackHandler } from 'react-native';

import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import { getNetworkConfig, getNetworkName } from '@@constants/network.constant';
import { PIN_LAYOUT, PIN_MODE } from '@@constants/pin.constant';
import { IGasFeeInfo } from '@@domain/gas/GasService.type';
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

const useTokenSend = () => {
  const transactionService = useDi('TransactionService');
  const walletService = useDi('WalletService');

  const { params } = useRoute<TTokenSendRouteProps>();
  const tokenDto = params.tokenDto;

  const { openModal, closeModal } = globalModalStore();
  const { setState: pinSet } = pinStore();
  const { to, data, value, setBody, resetBody } = transactionRequestStore();
  const { baseFee, tip, gas, total } = gasStore();

  const { selectedWalletIndex, selectedNetwork: pickNetwork } = walletPersistStore();
  const selectedNetwork = getNetworkName(false, pickNetwork);

  const network = getNetworkConfig(selectedNetwork);
  const navigation = useNavigation<TTransactionResultRootStackProps>();

  useEffect(() => {
    setInitialFromRouteProps();
  }, []);

  useEffect(() => {
    setData();
  }, [to, value]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', clearSendInput);
    return () => backHandler.remove();
  }, []);

  const setInitialFromRouteProps = () => {
    if (params?.scanData?.address) {
      setBody({ to: params.scanData.address });
    }
    if (params?.scanData?.amount) {
      setBody({ value: new BigNumber(params.scanData.amount.toString()).shiftedBy(18) });
    }
  };

  const clearSendInput = () => {
    resetBody();
    return true;
  };

  const setAddress = (address: string) => {
    setBody({ to: address });
  };

  const setAmount = (amount: BigNumber) => {
    setBody({ value: amount });
  };

  const setData = async () => {
    if (!to || !value) return;
    if (tokenDto.contractAddress) {
      const data = await transactionService.getTransferData(selectedNetwork, selectedWalletIndex[selectedNetwork], to, value);
      setBody({
        data,
      });
    }
  };

  //show confirm modal
  const confirm = async () => {
    if (!to || !value || !total) return;
    openModal(MODAL_TYPES.CONFIRM_SEND, {
      recipientAddress: to,
      amount: value,
      fee: formatBigNumber(total, tokenDto.decimals).toString(10),
      tokenDto,
      onConfirm: send,
    });
  };

  const isValid = () => {
    return tokenDto.contractAddress ? !!to || !!value || !!data : !!to || !!value;
  };

  //send transaction
  const send = async () => {
    try {
      if (!to || !value) {
        throw new Error('address, value is required');
      }
      if (!baseFee || !gas || !total) {
        throw new Error('baseFee, gas, total is required');
      }
      closeModal();
      //pin mode setting
      let pinModalResolver, pinModalRejector;
      const pinModalObserver = new Promise((resolve, reject) => {
        pinModalResolver = resolve;
        pinModalRejector = reject;
      });
      pinSet({ pinMode: PIN_MODE.CONFIRM, layout: PIN_LAYOUT.MODAL, pinModalResolver, pinModalRejector });
      openModal('CONFIRM_TX_PIN', undefined);
      await pinModalObserver;
      closeModal();
      //send transaction
      const txHash = await transactionService.sendTransaction({
        selectedNetwork,
        selectedWalletIndex: selectedWalletIndex[selectedNetwork],
        gasFeeInfo: {
          baseFee,
          tip: tip ?? undefined,
          gas,
          total,
        },
        to: tokenDto.contractAddress ?? to,
        value: tokenDto.contractAddress ? undefined : value,
        data: data ?? undefined,
      });

      if (!txHash) {
        throw new Error('fail send transaction');
      }
      //send server
      const wallet = await walletService.getWalletInfo({ index: selectedWalletIndex[selectedNetwork], network: selectedNetwork });
      const transactionType = getTransactionType(network.networkId, !!tokenDto.contractAddress, tokenDto.symbol === 'BTCB', false);
      const serverRes = await transactionService.registerHistory({
        network: network.networkId,
        from: wallet.address,
        to: tokenDto.contractAddress ?? to,
        data,
        hash: txHash,
        type: transactionType,
        nonce: 0,
        value: formatBigNumber(value, tokenDto.decimals).toString(10),
      });
      if (!serverRes) {
        console.log('fail register history');
      }
      resetBody();
      navigation.navigate(ROOT_STACK_ROUTE.WALLET_TRANSACTION_RESULT);
    } catch (err) {
      console.log(err);
    }
  };
  return { amount: value, setAmount, address: to, setAddress, confirm, isValid };
};
export default useTokenSend;
