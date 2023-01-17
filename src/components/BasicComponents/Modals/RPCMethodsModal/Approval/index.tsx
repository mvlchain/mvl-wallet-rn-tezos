/* eslint-disable max-lines */

import React, { useCallback, useEffect, useState } from 'react';

import { GAS_ESTIMATE_TYPES } from '@metamask/controllers';
import { useNavigation } from '@react-navigation/native';
import { BigNumber } from 'bignumber.js';
import BN from 'bn.js';
import { toChecksumAddress } from 'ethereumjs-util';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Alert, InteractionManager, Button } from 'react-native';
import Modal from 'react-native-modal';

import useEstimateGas from '@@components/BasicComponents/GasFeeBoard/hooks/useEstimateGas';
import useSetGasState from '@@components/BasicComponents/GasFeeBoard/hooks/useSetGasState';
import useSetInitial from '@@components/BasicComponents/GasFeeBoard/hooks/useSetInitial';
import useSetTotal from '@@components/BasicComponents/GasFeeBoard/hooks/useSetTotal';
import { KEYSTONE_TX_CANCELED } from '@@components/BasicComponents/Modals/RPCMethodsModal/RootRPCMethodsUI';
import rpcMethodsUiStore from '@@components/BasicComponents/Modals/RPCMethodsModal/RootRPCMethodsUIStore';
import { controllerManager } from '@@components/BasicComponents/Modals/RPCMethodsModal/controllerManager';
import { GAS_LEVEL } from '@@constants/gas.constant';
import { getNetworkByBase } from '@@constants/network.constant';
import { useDi } from '@@hooks/useDi';
import gasStore from '@@store/gas/gasStore';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { mmLightColors } from '@@style/colors';
import { addHexPrefix, BNToHex } from '@@utils/number';

const REVIEW = 'review';

const styles = StyleSheet.create({
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});
export function safeToChecksumAddress(address: string) {
  if (!address) return undefined;
  return toChecksumAddress(address);
}
/**
 * PureComponent that manages transaction approval from the dapp browser
 */
const Approval = () => {
  const { t } = useTranslation();
  const strings = t;
  const [state, setState] = useState<any>({
    mode: REVIEW,
    transactionHandled: false,
    transactionConfirmed: false,
  });
  const transactionService = useDi('TransactionService');
  const { selectedWalletIndex, selectedNetwork } = walletPersistStore();
  const { baseFee, tip, gas, total, setState: setGasStore } = gasStore();

  const { transaction, toggleDappTransactionModal, dappTransactionModalVisible } = rpcMethodsUiStore();
  const { to, value, data } = transactionRequestStore();

  const [enableTip, setEnableTip] = useState<boolean>(false);
  const [enableLimitCustom, setEnableLimitCustom] = useState<boolean>(true);

  const [blockBaseFee, setBlockBaseFee] = useState<BigNumber | null>(null);
  const [blockGas, setBlockGas] = useState<BigNumber | null>(null);
  // const [noBlockGas, setNoBlockGas] = useState<BigNumber | null>(null);

  console.log(`transaction: ${JSON.stringify(transaction, null, 2)}`);

  useSetTotal({ to: to, value, blockGas });
  useSetGasState({ blockBaseFee, blockGas, advanced: false });
  useEstimateGas({ isValidInput: true, tokenDto: undefined, to, value, data, setBlockBaseFee, setBlockGas });
  useSetInitial({
    setEnableTip,
    setEnableLimitCustom,
    setBlockBaseFee,
    setBlockGas,
    isValidInput: true,
  });

  useEffect(() => {
    setGasStore({ level: GAS_LEVEL.MID });
  }, []);
  console.log(`baseFee: ${baseFee}`);

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
    // TransactionController.cancelTransaction(transaction.id);
    // console.log(`TransactionController.cancelTransaction(transaction.id) called`);

    transactionController.hub.emit(`${transaction.id}:finished`, {
      status: 'rejected',
    });
    console.log(`hub.emit ${transaction.id}:finished status: rejected called`);

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
          console.log(`baseFee: ${baseFee}, blockGas: ${blockGas}, total: ${total}`);
          if (!to || !value || !baseFee || !blockGas || !total) {
            throw new Error('baseFee, gas, total ,to, value is required');
          }
          console.log(`selectedNetwork: ${selectedNetwork}, ${selectedWalletIndex[selectedNetwork]}`);
          const networkByBase = getNetworkByBase(selectedNetwork);
          const txHash = await transactionService.sendTransaction({
            selectedNetwork: networkByBase,
            selectedWalletIndex: selectedWalletIndex[selectedNetwork],
            gasFeeInfo: {
              baseFee,
              tip: tip ?? undefined,
              gas: blockGas,
              total,
            },
            to: to,
            value: value,
            data: data ?? undefined,
          });

          console.log(`txHash: ${txHash}, ${transactionController.hub}`);
          transactionController.hub.emit(`${preparedTransaction.id}:finished`, {
            status: 'submitted',
            transactionHash: txHash,
          });
          console.log(`hub.emit ${preparedTransaction.id}:finished called`);
          toggleDappTransactionModal();

          // TransactionController.hub.once(`${preparedTransaction.id}:finished`, (transactionMeta: any) => {
          //   if (transactionMeta.status === 'submitted') {
          //     setState({ transactionHandled: true });
          //     toggleDappTransactionModal();
          //     // NotificationManager.watchSubmittedTransaction({
          //     //   ...transactionMeta,
          //     //   assetType: transaction.assetType,
          //     // });
          //   } else {
          //     console.log(`transactionMeta on hub finished evt handler: ${transactionMeta}, ${JSON.stringify(transactionMeta, null, 2)}`);
          //     // throw transactionMeta.error;
          //   }
          // });
          //
          // const fullTx = transactions.find(({ id }: any) => id === preparedTransaction.id);
          // console.log(`fullTx: ${fullTx}, ${JSON.stringify(fullTx, null, 2)}`);
          // const updatedTx = { ...fullTx, transaction: preparedTransaction };
          // console.log(`updatedTx: ${updatedTx}, ${JSON.stringify(updatedTx, null, 2)}`);
          // // await TransactionController.updateTransaction(updatedTx);
          // console.log(`call TransactionController.approveTransaction(transaction.id), ${transaction.id}`);
          // await TransactionController.approveTransaction(transaction.id);
          // this.showWalletConnectNotification(true);
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
    [state, transaction, baseFee, blockGas, total]
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

  const colors = mmLightColors;

  return (
    <Modal isVisible={dappTransactionModalVisible} style={styles.bottomModal} backdropColor={colors.overlay.default} backdropOpacity={1}>
      <Button title={'Close'} onPress={onCancel} />
      <Button title={'Confirm'} onPress={onConfirm} />
    </Modal>
  );
};

export default Approval;
