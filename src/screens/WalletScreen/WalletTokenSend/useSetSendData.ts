import { useEffect, useState } from 'react';

import { useRoute } from '@react-navigation/native';
import { BigNumber } from 'bignumber.js';
import { BackHandler } from 'react-native';

import { getNetworkByBase } from '@@constants/network.constant';
import { useDi } from '@@hooks/useDi';
import gasStore from '@@store/gas/gasStore';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { qrPayLogger } from '@@utils/Log';

import { TTokenSendRouteProps } from './WalletTokenSend.type';
const useSetSendData = () => {
  const transactionService = useDi('TransactionService');

  const { params } = useRoute<TTokenSendRouteProps>();
  const tokenDto = params.tokenDto;

  const { to, value, setState: setBody, resetBody } = transactionRequestStore();
  const { resetState: resetGas } = gasStore();

  const { selectedWalletIndex, selectedNetwork: pickNetwork } = walletPersistStore();
  const selectedNetwork = getNetworkByBase(pickNetwork);

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
    qrPayLogger.log(
      `initializing RouteProps: ${JSON.stringify(params?.scanData)}, in bg: ${new BigNumber(params?.scanData?.amount ?? '0').toString(10)}`
    );

    if (params?.scanData?.address) {
      setBody({ to: params.scanData.address });
    }
    if (params?.scanData?.amount) {
      setBody({ value: new BigNumber(params.scanData.amount.toString()).shiftedBy(tokenDto.decimals) });
    }
  };

  const clearSendInput = () => {
    resetBody();
    resetGas();
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
