import { TransactionRequest, TransactionResponse } from '@ethersproject/abstract-provider';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TransferParams, WalletOperation } from '@taquito/taquito';

import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import { getNetworkConfig, getNetworkByBase, NETWORK_ID } from '@@constants/network.constant';
import { PIN_LAYOUT, PIN_MODE } from '@@constants/pin.constant';
import { getTransactionType } from '@@domain/transaction/transactionHistoryRepository/TransactionHistoryRepository.type';
import { useDi } from '@@hooks/useDi';
import { ROOT_STACK_ROUTE } from '@@navigation/RootStack/RootStack.type';
import gasStore from '@@store/gas/gasStore';
import globalModalStore from '@@store/globalModal/globalModalStore';
import { pinStore } from '@@store/pin/pinStore';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

import { TTransactionResultRootStackProps } from '../WalletTransactionResult/WalletTransactionResult.type';

import { TTokenSendRouteProps } from './WalletTokenSend.type';

const useSetSendFunction = () => {
  const transactionServiceTezos = useDi('TransactionServiceTezos');
  const transactionServiceEthers = useDi('TransactionServiceEthers');
  const transactionHistoryRepository = useDi('TransactionHistoryRepository');
  const walletService = useDi('WalletService');

  const { params } = useRoute<TTokenSendRouteProps>();
  const tokenDto = params.tokenDto;

  const { openModal, closeModal } = globalModalStore();
  const { setState: pinSet } = pinStore();
  const { to, data, value, resetBody, toValid, valueValid, tokenValue } = transactionRequestStore();
  const { resetTotal } = gasStore();

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

  const sendToBlockChain = async (params: TransactionRequest | TransferParams) => {
    try {
      switch (network.networkId) {
        case NETWORK_ID.XTZ:
          return await transactionServiceTezos.sendTransaction(selectedNetwork, selectedWalletIndex[selectedNetwork], params);

        default:
          if (tokenDto.contractAddress) {
            return await transactionServiceEthers.sendTransaction(selectedNetwork, selectedWalletIndex[selectedNetwork], {
              ...params,
              to: tokenDto.contractAddress,
            });
          } else {
            return await transactionServiceEthers.sendTransaction(selectedNetwork, selectedWalletIndex[selectedNetwork], params);
          }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const registerHistoryToServer = async (txHash: string, nonce: number) => {
    try {
      if (!tokenDto.contractAddress && !to) return;
      if (tokenDto.contractAddress && !tokenValue) return;
      if (!tokenDto.contractAddress && !value) return;
      const wallet = await walletService.getWalletInfo({ index: selectedWalletIndex[selectedNetwork], network: selectedNetwork });
      const transactionType = getTransactionType(network.networkId, !!tokenDto.contractAddress, tokenDto.symbol === 'BTCB', false);
      const serverRes = await transactionHistoryRepository.registerHistory({
        network: network.networkId,
        from: wallet.address,
        to: tokenDto.contractAddress ?? to!,
        //TODO: 테조스데이터는 뭘 넣어야하지?
        data,
        hash: txHash,
        type: transactionType,
        nonce,
        value: tokenDto.contractAddress ? tokenValue!.toString(10) : value!.toString(10),
      });
      if (!serverRes) {
        throw new Error('fail register history');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const send = async (param: TransactionRequest | TransferParams) => {
    try {
      if (!toValid || !valueValid) return;
      //close confirm tx modal
      closeModal();
      await checkPin();
      const transaction = await sendToBlockChain(param);
      if (!transaction) {
        throw new Error('fail send to blockChain');
      }
      //TODO: nonce조회를 일시적으로 하지 못하는 경우 0으로 해줌
      let hash;
      let nonce;
      switch (network.networkId) {
        case NETWORK_ID.XTZ:
          hash = (transaction as WalletOperation).opHash;
          nonce = 0;
          break;
        default:
          hash = (transaction as TransactionResponse).hash;
          nonce = (transaction as TransactionResponse).nonce;
          break;
      }
      await registerHistoryToServer(hash, nonce);
      resetBody();
      navigation.navigate(ROOT_STACK_ROUTE.WALLET_TRANSACTION_RESULT);
      resetTotal();
      closeModal();
    } catch (err) {
      console.log(err);
    }
  };

  return { send };
};

export default useSetSendFunction;
