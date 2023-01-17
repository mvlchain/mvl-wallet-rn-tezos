import { useEffect, useState } from 'react';

import { useRoute } from '@react-navigation/native';
import { BigNumber } from 'bignumber.js';
import { BackHandler } from 'react-native';

import { getNetworkByBase } from '@@constants/network.constant';
import { useDi } from '@@hooks/useDi';
import gasStore from '@@store/gas/gasStore';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { tagLogger } from '@@utils/Logger';

import { TTokenSendRouteProps } from './WalletTokenSend.type';
const useSetSendData = () => {
  const transactionService = useDi('TransactionService');
  const qrPayLogger = tagLogger('QrPay');

  const { params } = useRoute<TTokenSendRouteProps>();
  const tokenDto = params.tokenDto;

  const { to, value, setState: setBody, resetBody, tokenTo, tokenValue } = transactionRequestStore();
  const { resetState: resetGas } = gasStore();

  const { selectedWalletIndex, selectedNetwork: pickNetwork } = walletPersistStore();
  const selectedNetwork = getNetworkByBase(pickNetwork);

  useEffect(() => {
    setInitialFromRouteProps();
  }, []);

  useEffect(() => {
    if (params.tokenDto.contractAddress) {
      if (!tokenTo || !tokenValue) return;
      setData(tokenTo, tokenValue);
    }
  }, [tokenTo, tokenValue]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', clearSendInput);
    return () => backHandler.remove();
  }, []);

  const setInitialFromRouteProps = () => {
    qrPayLogger.log(`initializing RouteProps: ${JSON.stringify(params?.scanData)} to TokenSender`);

    if (params?.scanData?.address) {
      setBody({ to: params.scanData.address });
    }
    if (params?.scanData?.amount) {
      const amount = new BigNumber(params.scanData.amount);
      qrPayLogger.log(`amount: ${amount.toString(10)}`);
      setBody({ value: amount });
    }
  };

  const clearSendInput = () => {
    resetBody();
    resetGas();
    return true;
  };

  const setAddress = (address: string) => {
    if (params.tokenDto.contractAddress) {
      setBody({ tokenTo: address, to: tokenDto.contractAddress });
    } else {
      setBody({ to: address });
    }
  };

  const setAmount = (amount: BigNumber | null) => {
    if (params.tokenDto.contractAddress) {
      setBody({ tokenValue: amount });
    } else {
      setBody({ value: amount });
    }
  };

  const setData = async (to: string, value: BigNumber) => {
    if (tokenDto.contractAddress) {
      const data = await transactionService.getTransferData({
        selectedNetwork: selectedNetwork,
        selectedWalletIndex: selectedWalletIndex[selectedNetwork],
        to,
        value,
        contractAddress: tokenDto.contractAddress,
        decimals: tokenDto.decimals,
      });
      setBody({
        data,
      });
    }
  };

  return {
    setAddress,
    setAmount,
  };
};

export default useSetSendData;
