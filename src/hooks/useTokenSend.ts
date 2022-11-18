import { useState } from 'react';

import { useDi } from './common/useDi';

import 'reflect-metadata';
import { GestureResponderEvent } from 'react-native-modal';

const useTokenSend = () => {
  const ethersTransactionService = useDi('EtherTransactionService');
  const tezosTransactionService = useDi('TezosTransactionService');

  const [amount, setAmount] = useState('0');
  const [address, setAddress] = useState('');

  //TODO: wallet 기능 완성되면  새로붙임
  const privateKey = '0x8082bea335283b2ac437fb6a93530dcf8aea48db478f7b0df871568d17b0094e';
  const publicKey = '0x02651f62235846b48330c26bcbf20c85238b040f9b11cf5cfc335de66632309cdc';
  const myAddress = '0x1278699a3a2f9E9FDB969daaC0BCF23aB26fd82F';

  const confirmSend = async (a: any) => {
    try {
      const res = await ethersTransactionService.sendTransaction({
        networkInfo: { rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545', chainId: 97 },
        privateKey,
        gasFeeInfo: { gasPrice: '0.2' },
        from: myAddress,
        to: '0xAEa73293569cf1e4CA314d44b0DE3f648A76a173',
        value: amount,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return { amount, setAmount, address, setAddress, confirmSend };
};
export default useTokenSend;
