import { useEffect } from 'react';

import { useRoute } from '@react-navigation/native';
import { BigNumber } from 'bignumber.js';
import { BackHandler } from 'react-native';

import { getNetworkName } from '@@constants/network.constant';
import { useDi } from '@@hooks/useDi';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

import { TTokenSendRouteProps } from './WalletTokenSend.type';
const useSetSendData = () => {
  const transactionService = useDi('TransactionService');

  const { params } = useRoute<TTokenSendRouteProps>();
  const tokenDto = params.tokenDto;

  const { to, value, setBody, resetBody } = transactionRequestStore();

  const { selectedWalletIndex, selectedNetwork: pickNetwork } = walletPersistStore();
  const selectedNetwork = getNetworkName(false, pickNetwork);

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
      setBody({ value: new BigNumber(params.scanData.amount.toString()).shiftedBy(tokenDto.decimals) });
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

  return {
    setAddress,
    setAmount,
  };
};

export default useSetSendData;
