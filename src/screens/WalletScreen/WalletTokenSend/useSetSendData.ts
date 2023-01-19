import { useEffect, useState } from 'react';

import { useRoute } from '@react-navigation/native';
import { BigNumber } from 'bignumber.js';
import { BackHandler } from 'react-native';

import { getNetworkByBase, getNetworkConfig, NETWORK_ID } from '@@constants/network.constant';
import { useDi } from '@@hooks/useDi';
import gasStore from '@@store/gas/gasStore';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { tagLogger } from '@@utils/Logger';

import { TTokenSendRouteProps } from './WalletTokenSend.type';

const useSetSendData = () => {
  const transactionServiceEthers = useDi('TransactionServiceEthers');
  const transactionServiceTezos = useDi('TransactionServiceTezos');
  const qrPayLogger = tagLogger('QrPay');

  const { params } = useRoute<TTokenSendRouteProps>();
  const tokenDto = params.tokenDto;

  const { setState: setBody, resetBody, tokenTo, tokenValue, to, value } = transactionRequestStore();
  const { resetTotal } = gasStore();

  const { selectedWalletIndex, selectedNetwork } = walletPersistStore();
  const network = getNetworkConfig(selectedNetwork);
  const testIncludeSelectedNetwork = getNetworkByBase(selectedNetwork);

  useEffect(() => {
    setInitialFromRouteProps();
  }, []);
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', clearSendInput);
    return () => backHandler.remove();
  }, []);

  const setInitialFromRouteProps = () => {
    qrPayLogger.log(`initializing RouteProps: ${JSON.stringify(params?.scanData)} to TokenSender`);

    if (params?.scanData?.address) {
      if (tokenDto.contractAddress) {
        setBody({ tokenTo: params.scanData.address, to: tokenDto.contractAddress });
      } else {
        setBody({ to: params.scanData.address });
      }
    }
    if (params?.scanData?.amount) {
      const amount = new BigNumber(params.scanData.amount);
      qrPayLogger.log(`amount: ${amount.toString(10)}`);
      if (tokenDto.contractAddress) {
        setBody({ tokenValue: amount });
      } else {
        setBody({ value: amount });
      }
    }
  };

  const clearSendInput = () => {
    resetBody();
    resetTotal();
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
    if (network.networkId === NETWORK_ID.XTZ) {
      const transferParam = await transactionServiceTezos.getTransferParam({
        selectedNetwork: testIncludeSelectedNetwork,
        selectedWalletIndex: selectedWalletIndex[testIncludeSelectedNetwork],
        to,
        amount: value.toNumber(),
        contractAddress: tokenDto.contractAddress!,
      });
      setBody({
        transferParam,
      });
    } else {
      const data = await transactionServiceEthers.encodeFunctionData('transfer', [to, value.toString(10)]);
      setBody({
        data,
      });
    }
  };

  useEffect(() => {
    if (!params.tokenDto.contractAddress) return;
    if (!tokenTo || !tokenValue) return;
    console.log('wallet token send Set data: ', 'tokenTo', tokenTo, 'tokenValue', tokenValue, 'to', to, 'value', value);
    setData(tokenTo, tokenValue);
  }, [tokenTo, tokenValue, params.tokenDto.contractAddress]);

  return {
    setAddress,
    setAmount,
  };
};

export default useSetSendData;
