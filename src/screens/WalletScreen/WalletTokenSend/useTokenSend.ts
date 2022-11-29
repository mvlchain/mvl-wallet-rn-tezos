import { useState } from 'react';

import { useDi } from '@@hooks/useDi';

import 'reflect-metadata';
import { BigNumber } from 'ethers';
import { GestureResponderEvent } from 'react-native-modal';

import { IGasFeeInfoEip1559 } from '@@domain/gas/repository/gasRepositoryEip1559/GasRepositoryEip1559.type';
import { IGasFeeInfo } from '@@domain/gas/repository/gasRepository/GasRepository.type';
import { ISendTransactionGasFee } from '@@domain/transaction/TransactionService.type';
import { transactionRequestStore } from '@@store/transaction/transactionRequestStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { NETWORK_INFO } from '@@components/BasicComponents/GasFeeBoard/testNetworkEnv';

const useTokenSend = () => {
  const ethersTransactionService = useDi('EtherTransactionService');
  const tezosTransactionService = useDi('TezosTransactionService');
  const { to, data, value, setBody, resetBody } = transactionRequestStore();
  const { selectedNetwork } = walletPersistStore();

  const [amount, setAmount] = useState<BigNumber | null>(null);
  const [address, setAddress] = useState<string | null>('');

  //TODO: TEST를 위해서 임시로 하드코딩해둠 테스트용 계정
  const privateKey = '0x2b27eaa12c946c41c523324a9c4a87e386e4f90cc61844aedc6edea18320002a';
  const publicKey = '0x033c908f4aab15a406b9128763b1757ed68a3ee9b09d70146fa4f042355e9d332f';
  const from = '0x5852d8Bc656562A27292df4cA2cbB14dE62b88f0';
  const networkInfo = NETWORK_INFO[selectedNetwork];

  const confirmSend = async (gasFeeInfo: IGasFeeInfo) => {
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
