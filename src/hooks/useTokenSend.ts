import { useState } from 'react';

import { useDi } from './common/useDi';

import 'reflect-metadata';
import { BigNumber } from 'ethers';
import { GestureResponderEvent } from 'react-native-modal';

import { IEIP1559GasFeeInfo, IGasFeeInfo } from '@@domain/transaction/GasService.type';
import { ISendTransactionGasFee } from '@@domain/transaction/TransactionService.type';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';

const useTokenSend = () => {
  const ethersTransactionService = useDi('EtherTransactionService');
  const tezosTransactionService = useDi('TezosTransactionService');
  const { to, data, value, setBody, resetBody } = transactionRequestStore();

  const [amount, setAmount] = useState<BigNumber | null>(null);
  const [address, setAddress] = useState<string | null>('');

  //TODO: TEST를 위해서 임시로 하드코딩해둠 테스트용 계정
  const privateKey = '0x8082bea335283b2ac437fb6a93530dcf8aea48db478f7b0df871568d17b0094e';
  const publicKey = '0x02651f62235846b48330c26bcbf20c85238b040f9b11cf5cfc335de66632309cdc';
  const from = '0x1278699a3a2f9E9FDB969daaC0BCF23aB26fd82F';
  const networkInfo = { rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545', chainId: 97 };

  const confirmSend = async (gasFeeInfo: IGasFeeInfo | ISendTransactionGasFee) => {
    if (!to || !value) return;
    try {
      const res = await ethersTransactionService.sendTransaction({
        networkInfo,
        privateKey,
        gasFeeInfo,
        to,
        from,
        value,
        //TODO: data null로 보내도 되는지 모르겠음 확인해보고 타입 수정 혹은 코드 수정
        //data
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return { amount, setAmount, address, setAddress, confirmSend };
};
export default useTokenSend;
