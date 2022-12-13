import { useEffect, useCallback } from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';
import { BigNumber } from 'ethers';
import { BackHandler } from 'react-native';

import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import { getNetworkConfig, getNetworkName } from '@@constants/network.constant';
import { PIN_LAYOUT, PIN_MODE } from '@@constants/pin.constant';
import { IGasFeeInfo } from '@@domain/gas/GasService.type';
import { getTransactionType } from '@@domain/transaction/TransactionService.type';
import { useDi } from '@@hooks/useDi';
import { ROOT_STACK_ROUTE } from '@@navigation/RootStack/RootStack.type';
import globalModalStore from '@@store/globalModal/globalModalStore';
import { pinStore } from '@@store/pin/pinStore';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

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
    // TODO: 향후 토큰디테일 페이지에서 qr을 스캔하는것이 아니라, 월렛 메인에서 불러올 경우에 네트워크 선택은 어떻게 할 것인지에 따라서
    // 어마운트 입력이 달라짐. 테조스는 decimal 6이고 이더는 18이니까..
    // if (params.parsedData.amount) {
    //   setBody({ value: params.parsedData.amount.toString() });
    // }
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
  const confirm = async (gasFeeInfo: IGasFeeInfo) => {
    if (!to || !value) return;
    openModal(MODAL_TYPES.CONFIRM_SEND, {
      recipientAddress: to,
      amount: value,
      fee: gasFeeInfo.total.toString(),
      tokenDto,
      onConfirm: send(gasFeeInfo),
    });
  };

  //send transaction
  const send = (gasFeeInfo: IGasFeeInfo) => {
    if (!to || !value) {
      throw new Error('to address and value is required');
    }
    closeModal();
    return async () => {
      try {
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
          gasFeeInfo,
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
          value: value.toString(),
        });
        if (!serverRes) {
          throw new Error('fail register history');
        }
        resetBody();
        navigation.navigate(ROOT_STACK_ROUTE.WALLET_TRANSACTION_RESULT);
      } catch (err) {
        console.log(err);
      }
    };
  };
  return { amount: value, setAmount, address: to, setAddress, confirm };
};
export default useTokenSend;
