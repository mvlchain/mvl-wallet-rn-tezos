/* eslint-disable max-lines */
import React, { useCallback, useEffect, useState, useMemo } from 'react';

import { GAS_ESTIMATE_TYPES } from '@metamask/controllers';
import { BigNumber } from 'bignumber.js';
import BN from 'bn.js';
import { toChecksumAddress } from 'ethereumjs-util';
import { useTranslation } from 'react-i18next';
import { Alert, Pressable } from 'react-native';

import { ChevronRightBlackIcon, ChevronRightLightIcon } from '@@assets/image';
import useEVMEstimate from '@@components/BasicComponents/GasFeeBoard/EVMLegacy/hooks/useEVMEstimate';
import useEVMTotal from '@@components/BasicComponents/GasFeeBoard/EVMLegacy/hooks/useEVMTotal';
import { ModalLayout } from '@@components/BasicComponents/Modals/BaseModal/ModalLayout';
import { KEYSTONE_TX_CANCELED } from '@@components/BasicComponents/Modals/RPCMethodsModal/RootRPCMethodsUI';
import rpcMethodsUiStore from '@@components/BasicComponents/Modals/RPCMethodsModal/RootRPCMethodsUIStore';
import { controllerManager } from '@@components/BasicComponents/Modals/RPCMethodsModal/controllerManager';
import { GAS_LEVEL, TGasLevel } from '@@constants/gas.constant';
import { getNetworkByBase } from '@@constants/network.constant';
import { useDi } from '@@hooks/useDi';
import { useAssetFromTheme } from '@@hooks/useTheme';
import gasStore from '@@store/gas/gasStore';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { mmLightColors } from '@@style/colors';
import { BnToEtherBn } from '@@utils/formatBigNumber';
import { addHexPrefix, BNToHex } from '@@utils/number';

import * as S from './ApprovalModal.style';

const REVIEW = 'review';

export function safeToChecksumAddress(address: string) {
  if (!address) return undefined;
  return toChecksumAddress(address);
}
/**
 * PureComponent that manages transaction approval from the dapp browser
 */
const Approval = ({ isVisible }: { isVisible: boolean }) => {
  const { t } = useTranslation();
  const strings = t;
  const [state, setState] = useState<any>({
    mode: REVIEW,
    transactionHandled: false,
    transactionConfirmed: false,
  });
  const transactionService = useDi('TransactionServiceEthers');
  const { selectedWalletIndex, selectedNetwork } = walletPersistStore();

  const { transaction, toggleDappTransactionModal, dappTransactionModalVisible } = rpcMethodsUiStore();
  const { to, value, data } = transactionRequestStore();

  const advanced = false;

  const [gasPrice, setGasPrice] = useState<BigNumber | null>(null);
  const [gasLimit, setGasLimit] = useState<BigNumber | null>(new BigNumber(21000));

  console.log(`transaction: ${JSON.stringify(transaction, null, 2)}`);

  const leveledGasPrice = useMemo(() => {
    return gasPrice ? gasPrice.multipliedBy('1.3') : new BigNumber(0);
  }, [gasPrice]);

  //가스프라이스와 가스리밋이 설정되었을때 토탈가스비용을 계산합니다.
  const total = useEVMTotal({ advanced, leveledGasPrice, gasLimit, userInputGasPrice: gasPrice, userInputGasLimit: gasLimit });
  //가스프라이스 조회와 가스사용량을 예측합니다.
  useEVMEstimate({ advanced, to, value, data, isValidInput: true, setGasLimit, setGasPrice });

  const updateNavBar = () => {
    // const colors = this.context.colors || mockTheme.colors;
    // const { navigation } = this.props;
    // navigation.setOptions(
    //   getTransactionOptionsTitle('approval.title', navigation, {}, colors),
    // );
  };

  // useEffect(() => {
  //   return () => {
  //     try {
  //       const { transactionHandled } = state;
  //       if (!transactionHandled) {
  //         const { transactionController: TransactionController } = controllerManager;
  //         TransactionController.cancelTransaction(transaction.id);
  //         TransactionController.hub.removeAllListeners(`${transaction.id}:finished`);
  //         clear();
  //       }
  //     } catch (e) {
  //       if (e) {
  //         throw e;
  //       }
  //     }
  //   };
  // }, [transaction]);

  useEffect(() => {
    updateNavBar();
    // navigation && navigation.setParams({ mode: REVIEW, dispatch: this.onModeChange });

    // AnalyticsV2.trackEvent(AnalyticsV2.ANALYTICS_EVENTS.DAPP_TRANSACTION_STARTED, this.getAnalyticsParams());
  }, []);

  const onCancel = useCallback(() => {
    console.log(`onCancel clicked, ${JSON.stringify(transaction, null, 2)}`);
    const { transactionController } = controllerManager;
    transactionController.cancelTransaction(transaction.id);

    toggleDappTransactionModal();
  }, [transaction]);

  /**
   * Callback on confirm transaction
   */
  const onConfirm = useCallback(
    ({ gasEstimateType, EIP1559GasData, gasSelected }: any) => {
      (async () => {
        // const { TransactionController, KeyringController } = Engine.context;
        const { transactionController } = controllerManager;
        const { assetType, selectedAsset } = transaction;
        console.log(`selectedAsset: ${JSON.stringify(selectedAsset, null, 2)}`);
        // const showCustomNonce = false;
        // const { nonce } = transaction;
        const { transactionConfirmed } = state;
        if (transactionConfirmed) return;
        // if (showCustomNonce && nonce) transaction.nonce = BNToHex(nonce);
        setState({ transactionConfirmed: true });
        try {
          let preparedTransaction: any;
          if (assetType === 'ETH') {
            preparedTransaction = prepareTransaction({
              transaction,
              gasEstimateType,
              EIP1559GasData,
            });
          } else {
            preparedTransaction = prepareAssetTransaction({
              transaction,
              selectedAsset,
              gasEstimateType,
              EIP1559GasData,
            });
          }
          console.log(`preparedTransaction: ${JSON.stringify(preparedTransaction, null, 2)}`);

          //preparedTransaction: {
          //   "id": "ced225c0-90c1-11ed-91cb-af1b1e3db6d3",
          //   "selectedAsset": {
          //     "symbol": "ERC20",
          //     "decimals": "12",
          //     "address": "0x1edfcce833bac99c278e2886210dbd9213bd139a"
          //   },
          //   "origin": "192.168.1.56",
          //   "from": "0xf2b8288ea9fc59447bfb88ea853849733d90d632",
          //   "data": "0xa9059cbb000000000000000000000000e3587f0a8da40fa3e
          //   33c4141dd4b08241222460f00000000000000000000000000000000000000000000043c33c1937564800000",
          //   "gas": "0xaf65",
          //   "to": "0x1edfcce833bac99c278e2886210dbd9213bd139a",
          //   "gasPrice": "0x14",
          //   "value": "0x0",
          //   "readableValue": "0"
          // }

          const { to, value, data } = preparedTransaction;
          console.log(`gasPrice: ${gasPrice}, gasLimit: ${gasLimit}, total: ${total}`);
          if (!to || !value || !gasPrice || !gasLimit || !total) {
            throw new Error('baseFee, gas, total ,to, value is required');
          }
          console.log(`selectedNetwork: ${selectedNetwork}, ${selectedWalletIndex[selectedNetwork]}`);
          const networkByBase = getNetworkByBase(selectedNetwork);
          await transactionController.approveTransaction(preparedTransaction.id, async () => {
            const tx = await transactionService.sendTransaction(networkByBase, selectedWalletIndex[selectedNetwork], {
              gasPrice: BnToEtherBn(gasPrice) ?? undefined,
              gasLimit: BnToEtherBn(gasLimit) ?? undefined,
              to: to,
              value: value,
              data: data ?? undefined,
            });
            if (!tx) {
              throw new Error('error: tx result is null');
            }
            return tx.hash;
          });
        } catch (error: any) {
          console.log(`error: ${error.message}`);
          if (!error?.message.startsWith(KEYSTONE_TX_CANCELED)) {
            Alert.alert(strings('transactions.transaction_error'), error && error.message, [{ text: strings('navigation.ok') }]);
            console.log(error, 'error while trying to send transaction (Approval)');
          } else {
            // AnalyticsV2.trackEvent(AnalyticsV2.ANALYTICS_EVENTS.QR_HARDWARE_TRANSACTION_CANCELED);
          }
          // setState({ transactionHandled: false });
        }
        // AnalyticsV2.trackEvent(AnalyticsV2.ANALYTICS_EVENTS.DAPP_TRANSACTION_COMPLETED, this.getAnalyticsParams({ gasEstimateType, gasSelected }));
        // setState({ transactionConfirmed: false });
      })();
    },
    [state, transaction, gasPrice, gasLimit, total]
  );

  /**
   * Returns transaction object with gas, gasPrice and value in hex format
   *
   * @param {object} transaction - Transaction object
   */
  const prepareTransaction = ({ transaction, gasEstimateType, EIP1559GasData }: any) => {
    const transactionToSend = {
      ...transaction,
      value: BNToHex(transaction.value),
      to: safeToChecksumAddress(transaction.to),
    };

    if (gasEstimateType === GAS_ESTIMATE_TYPES.FEE_MARKET) {
      transactionToSend.gas = EIP1559GasData.gasLimitHex;
      transactionToSend.maxFeePerGas = addHexPrefix(EIP1559GasData.suggestedMaxFeePerGasHex); //'0x2540be400'
      transactionToSend.maxPriorityFeePerGas = addHexPrefix(EIP1559GasData.suggestedMaxPriorityFeePerGasHex); //'0x3b9aca00';
      transactionToSend.to = safeToChecksumAddress(transaction.to);
      delete transactionToSend.gasPrice;
    } else {
      transactionToSend.gas = BNToHex(transaction.gas);
      transactionToSend.gasPrice = BNToHex(transaction.gasPrice);
    }

    return transactionToSend;
  };

  /**
   * Returns transaction object with gas and gasPrice in hex format, value set to 0 in hex format
   * and to set to selectedAsset address
   *
   * @param {object} transaction - Transaction object
   * @param {object} selectedAsset - Asset object
   */
  const prepareAssetTransaction = ({ transaction, selectedAsset, gasEstimateType, EIP1559GasData }: any) => {
    const transactionToSend = {
      ...transaction,
      value: '0x0',
      to: selectedAsset.address,
    };

    if (gasEstimateType === GAS_ESTIMATE_TYPES.FEE_MARKET) {
      transactionToSend.gas = EIP1559GasData.gasLimitHex;
      transactionToSend.maxFeePerGas = addHexPrefix(EIP1559GasData.suggestedMaxFeePerGasHex); //'0x2540be400'
      transactionToSend.maxPriorityFeePerGas = addHexPrefix(EIP1559GasData.suggestedMaxPriorityFeePerGasHex); //'0x3b9aca00';
      delete transactionToSend.gasPrice;
    } else {
      transactionToSend.gas = BNToHex(transaction.gas);
      // FIXME: gasPrice
      transactionToSend.gasPrice = BNToHex(transaction.gasPrice || new BN(20));
    }

    return transactionToSend;
  };

  const ArrowIcon = useAssetFromTheme(ChevronRightLightIcon, ChevronRightBlackIcon);
  return (
    <ModalLayout
      title={t('transaction_details')}
      modalPosition='bottom'
      isVisible={isVisible}
      onConfirm={() => {
        onConfirm({});
      }}
      confirmLabel={t('btn_confirm_payment')}
      onClose={onCancel}
    >
      {/* <S.Label>{label}</S.Label> */}
      <S.AmountText>100 MVL</S.AmountText>
      <S.ContentContainer>
        <S.GreyText>{t('payer')}</S.GreyText>
        <S.BlackText>0xE4de5635351F5fa0e1e8b856422423oi1</S.BlackText>
      </S.ContentContainer>
      <S.ContentContainer>
        <S.GreyText>{t('to')}</S.GreyText>
        <S.BlackText>0xE4de5635351F5fa0e1e8b856422423oi1</S.BlackText>
      </S.ContentContainer>
      <Pressable>
        <S.GasContainer>
          <S.BlackText>{t('gas')}</S.BlackText>
          <S.GasWrapper>
            <S.GasBalanceWrapper>
              <S.BlackText>0.03 ETH</S.BlackText>
              <S.GreyText>10.90 USD</S.GreyText>
            </S.GasBalanceWrapper>
            <ArrowIcon />
          </S.GasWrapper>
        </S.GasContainer>
      </Pressable>
    </ModalLayout>
  );
};

export default Approval;
