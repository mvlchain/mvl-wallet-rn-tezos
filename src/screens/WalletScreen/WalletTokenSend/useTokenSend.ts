import { useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';
import { BigNumber } from 'ethers';
import { BackHandler } from 'react-native';

import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import { getNetworkConfig, NETWORK_FEE_TYPE, getNetworkName } from '@@constants/network.constant';
import { PIN_LAYOUT, PIN_MODE } from '@@constants/pin.constant';
import { IGasFeeInfo } from '@@domain/gas/GasService.type';
import { getTransactionType } from '@@domain/transaction/TransactionService.type';
import { TokenDto } from '@@generated/generated-scheme-clutch';
import { useDi } from '@@hooks/useDi';
import { ROOT_STACK_ROUTE } from '@@navigation/RootStack/RootStack.type';
import globalModalStore from '@@store/globalModal/globalModalStore';
import { pinStore } from '@@store/pin/pinStore';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

import { TTransactionResultRootStackProps } from '../WalletTransactionResult/WalletTransactionResult.type';

const useTokenSend = (tokenDto: TokenDto) => {
  const transactionService = useDi('TransactionService');
  const walletService = useDi('WalletService');
  const { to, data, value, setBody, resetBody } = transactionRequestStore();
  const { selectedWalletIndex, selectedNetwork: pickNetwork } = walletPersistStore();
  const selectedNetwork = getNetworkName(false, pickNetwork);
  const { openModal, closeModal } = globalModalStore();
  const { setState: pinSet } = pinStore();

  const network = getNetworkConfig(selectedNetwork);
  const navigation = useNavigation<TTransactionResultRootStackProps>();
  useEffect(() => {
    resetBody();
  }, []);

  useEffect(() => {
    setData();
  }, [to, value]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', clearSendInput);
    return () => backHandler.remove();
  }, []);

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
    if (!to || !value || network.networkFeeType === NETWORK_FEE_TYPE.TEZOS) return;
    if (tokenDto.contractAddress) {
      const walletIndex = selectedWalletIndex[selectedNetwork];
      const data = await transactionService.encodeTransferData(to, value);
      setBody({
        data,
      });
    }
  };

  //show confirm modal
  const confirm = async (gasFeeInfo: IGasFeeInfo, total: BigNumber) => {
    if (!to || !value) return;
    openModal(MODAL_TYPES.CONFIRM_SEND, { recipientAddress: to, amount: value, fee: total, tokenDto, onConfirm: send(gasFeeInfo) });
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
        let res;
        if (tokenDto.contractAddress) {
          res = await transactionService.sendTransaction({
            selectedNetwork,
            selectedWalletIndex: selectedWalletIndex[selectedNetwork],
            gasFeeInfo,
            contractAddress: tokenDto.contractAddress,
            data,
          });
        } else {
          res = await transactionService.sendTransaction({
            selectedNetwork,
            selectedWalletIndex: selectedWalletIndex[selectedNetwork],
            gasFeeInfo,
            to,
            value,
          });
        }

        if (!res) {
          throw new Error('fail send transaction');
        }
        //send server
        const wallet = await walletService.getWalletInfo({ index: selectedWalletIndex[selectedNetwork], network: selectedNetwork });
        const transactionType = getTransactionType(network.networkId, !!tokenDto.contractAddress, tokenDto.symbol === 'BTCB', false);
        if (!transactionType) {
          throw new Error('check transaction type');
        }
        const serverRes = await transactionService.registerHistory({
          network: network.networkId,
          from: wallet.address,
          to: tokenDto.contractAddress ?? to,
          data,
          hash: res,
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
        //TODO: 무슨 처리를 해줘야하지?
      }
    };
  };
  return { amount: value, setAmount, address: to, setAddress, confirm };
};
export default useTokenSend;
