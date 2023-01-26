/* eslint-disable max-lines */
import React, { useCallback, useEffect, useState, useMemo } from 'react';

import { TransactionRequest } from '@ethersproject/abstract-provider';
import { GAS_ESTIMATE_TYPES } from '@metamask/controllers';
import { BigNumber } from 'bignumber.js';
import BN from 'bn.js';
import { toChecksumAddress } from 'ethereumjs-util';
import { BigNumber as BigNumberEther } from 'ethers';
import { useTranslation } from 'react-i18next';
import { Alert, Pressable } from 'react-native';

import { ChevronRightBlackIcon, ChevronRightLightIcon } from '@@assets/image';
import useEVMGas from '@@components/BasicComponents/GasFeeBoard/EVMLegacy/useEVMGas';
import { IGasSettingInfo } from '@@components/BasicComponents/GasFeeBoard/GasFeeBoard.type';
import { ModalLayout } from '@@components/BasicComponents/Modals/BaseModal/ModalLayout';
import { KEYSTONE_TX_CANCELED } from '@@components/BasicComponents/Modals/RPCMethodsModal/RootRPCMethodsUI';
import rpcMethodsUiStore from '@@components/BasicComponents/Modals/RPCMethodsModal/RootRPCMethodsUIStore';
import { controllerManager } from '@@components/BasicComponents/Modals/RPCMethodsModal/controllerManager';
import { GAS_LEVEL } from '@@constants/gas.constant';
import { getNetworkByBase } from '@@constants/network.constant';
import useCoinDto from '@@hooks/useCoinDto';
import { useDi } from '@@hooks/useDi';
import useOneTokenPrice from '@@hooks/useOneTokenPrice';
import { useAssetFromTheme } from '@@hooks/useTheme';
import settingPersistStore from '@@store/setting/settingPersistStore';
import tokenPersistStore from '@@store/token/tokenPersistStore';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { tagLogger } from '@@utils/Logger';
import { formatBigNumber, BnToEtherBn, etherBNtoBN } from '@@utils/formatBigNumber';
import { addHexPrefix, BNToHex } from '@@utils/number';

import GasFeeModal from '../../GasFeeModal';

import * as S from './ApprovalModal.style';
const REVIEW = 'review';

export function safeToChecksumAddress(address: string) {
  if (!address) return undefined;
  return toChecksumAddress(address);
}

const logger = tagLogger('ApprovalModal');
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
  const { settedCurrency } = settingPersistStore();
  const [symbol, setSymbol] = useState<string>();
  const { tokenList } = tokenPersistStore();

  const { transaction, toggleDappTransactionModal, dappTransactionModalVisible } = rpcMethodsUiStore();
  logger.log(`transaction: ${JSON.stringify(transaction, null, 2)}`);
  const { to, value, data } = transactionRequestStore();
  const [isPaymentDisable, setIsPaymentDisable] = useState(true);
  const [showGasFeeModal, setShowGasFeeModal] = useState<boolean>(false);
  const onPressOpenGasFeeModal = () => {
    setAdvanced(true);
    setShowGasFeeModal(true);
  };
  const onPressCloseGasFeeModal = () => {
    setShowGasFeeModal(false);
  };
  //가스피모달내부의 상태와 별개의 가스 값들,
  //가스피모달을 오픈할때는 advanced 를 true로 해두어서 주기적인 estimategas를 방지한다.
  const {
    level,
    advanced,
    total,
    leveledGasPrice: gasPrice,
    gasLimit,
    userInputGasPrice,
    userInputGasLimit,
    setUserInputGasPrice,
    setUserInputGasLimit,
    setAdvanced,
    setLevel,
  } = useEVMGas({
    to,
    value,
    data,
    isValidInput: true,
    initialLevel: GAS_LEVEL.MID,
  });

  const onPressConfirmInGasFeeModal = (param: TransactionRequest, gasSettingInfo?: IGasSettingInfo) => {
    console.log('press confirm button at gas fee modal!', param.gasPrice?.toString(), param.gasLimit?.toString(), gasSettingInfo);
    switch (gasSettingInfo!.advanced) {
      case true:
        setUserInputGasPrice(etherBNtoBN(param.gasPrice as BigNumberEther));
        setUserInputGasLimit(etherBNtoBN(param.gasLimit as BigNumberEther));
        break;
      case false:
        setAdvanced(advanced);
        setLevel(gasSettingInfo!.level);
        break;
    }
    setShowGasFeeModal(false);
  };
  const { coinDto } = useCoinDto();
  const amountStr = useMemo(() => (total && formatBigNumber(total, coinDto.decimals)?.toFixed()) || '-', [total]);
  const { price: coinPrice } = useOneTokenPrice(coinDto, amountStr ?? '-');

  useEffect(() => {
    const coin = tokenList[selectedNetwork].find((token) => token.contractAddress === null);
    if (!coin) return;
    setSymbol(coin.symbol);
  }, []);

  const updateNavBar = () => {
    // const colors = this.context.colors || mockTheme.colors;
    // const { navigation } = this.props;
    // navigation.setOptions(
    //   getTransactionOptionsTitle('approval.title', navigation, {}, colors),
    // );
  };

  useEffect(() => {
    updateNavBar();
  }, []);

  const onCancel = useCallback(() => {
    logger.log(`onCancel clicked, ${JSON.stringify(transaction, null, 2)}`);
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
        setIsPaymentDisable(true);
        // const { TransactionController, KeyringController } = Engine.context;
        const { transactionController } = controllerManager;
        const { assetType, selectedAsset } = transaction;
        logger.log(`selectedAsset: ${JSON.stringify(selectedAsset, null, 2)}`);
        const { transactionConfirmed } = state;
        if (transactionConfirmed) return;
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
          logger.log(`preparedTransaction: ${JSON.stringify(preparedTransaction, null, 2)}`);

          const { to, value, data } = preparedTransaction;
          const finalGasPrice = advanced ? userInputGasPrice : gasPrice;
          const finalGasLimit = advanced ? userInputGasLimit : gasLimit;
          logger.log(`gasPrice: ${finalGasPrice}, gasLimit: ${finalGasLimit}, total: ${total}`);
          if (!to || !value || !gasPrice || !gasLimit || !total) {
            throw new Error('baseFee, gas, total ,to, value is required');
          }
          logger.log(`selectedNetwork: ${selectedNetwork}, ${selectedWalletIndex[selectedNetwork]}`);
          const networkByBase = getNetworkByBase(selectedNetwork);
          await transactionController.approveTransaction(preparedTransaction.id, async () => {
            const tx = await transactionService.sendTransaction(networkByBase, selectedWalletIndex[selectedNetwork], {
              gasPrice: BnToEtherBn(finalGasPrice) ?? undefined,
              gasLimit: BnToEtherBn(finalGasLimit) ?? undefined,
              to: to,
              value: value,
              data: data ?? undefined,
            });
            if (!tx) {
              throw new Error('error: tx result is null');
            }
            return tx.hash;
          });
          toggleDappTransactionModal();
        } catch (error: any) {
          logger.log(`error: ${error.message}`);
          if (!error?.message.startsWith(KEYSTONE_TX_CANCELED)) {
            Alert.alert(strings('transactions.transaction_error'), error && error.message, [{ text: strings('navigation.ok') }]);
            logger.log(error, 'error while trying to send transaction (Approval)');
          } else {
            // AnalyticsV2.trackEvent(AnalyticsV2.ANALYTICS_EVENTS.QR_HARDWARE_TRANSACTION_CANCELED);
          }
          // setState({ transactionHandled: false });
        }
        // AnalyticsV2.trackEvent(AnalyticsV2.ANALYTICS_EVENTS.DAPP_TRANSACTION_COMPLETED, this.getAnalyticsParams({ gasEstimateType, gasSelected }));
        // setState({ transactionConfirmed: false });
      })();
    },
    [state, transaction, gasPrice, gasLimit, total, advanced, userInputGasPrice, userInputGasLimit]
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

  useEffect(() => {
    if (gasPrice) {
      setIsPaymentDisable(false);
    }
  }, [gasPrice]);

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
  const totalStr = (total && formatBigNumber(total, coinDto.decimals).toFixed()) || '-';
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
      isConfirmDisabled={isPaymentDisable}
    >
      {/* <S.Label>{label}</S.Label> */}
      <S.AmountText>
        {value?.toFixed()} {transaction?.selectedAsset?.symbol}
      </S.AmountText>
      <S.ContentContainer>
        <S.GreyText>{t('payer')}</S.GreyText>
        <S.BlackText>{transaction?.from}</S.BlackText>
      </S.ContentContainer>
      <S.ContentContainer>
        <S.GreyText>{t('to')}</S.GreyText>
        <S.BlackText>{transaction?.to}</S.BlackText>
      </S.ContentContainer>
      <Pressable>
        <S.GasContainer>
          <S.BlackText>{t('gas')}</S.BlackText>
          <S.GasWrapper>
            <S.GasBalanceWrapper>
              <S.BlackText>
                {totalStr} {symbol}
              </S.BlackText>
              <S.GreyText>
                {coinPrice} {settedCurrency}
              </S.GreyText>
            </S.GasBalanceWrapper>
            <ArrowIcon onPress={onPressOpenGasFeeModal} />
          </S.GasWrapper>
        </S.GasContainer>
      </Pressable>
      <GasFeeModal
        onConfirm={onPressConfirmInGasFeeModal}
        onConfirmTitle={t('confirm')}
        to={to}
        value={value}
        data={data}
        isValidInput={true}
        isVisible={showGasFeeModal}
        onClose={onPressCloseGasFeeModal}
        initialLevel={level}
      />
    </ModalLayout>
  );
};

export default Approval;
