import { useState } from 'react';

import { RouteProp, useRoute } from '@react-navigation/native';

import { getNetworkConfig } from '@@constants/network.constant';
import useTokenQuery from '@@hooks/queries/useTokenQuery';
import { TRootStackParamList } from '@@navigation/RootStack/RootStack.type';

import { ITokenReceiveListItem } from './WalletTokenReceiveSelect.type';

export const useWalletTokenReceiveSelect = () => {
  type SeedPhraseScreenRouteProp = RouteProp<TRootStackParamList, 'WALLET_TOKEN_RECEIVE_SELECT'>;
  const { params } = useRoute<SeedPhraseScreenRouteProp>();
  const [tokenList, setTokenList] = useState<ITokenReceiveListItem[]>([]);

  useTokenQuery(getNetworkConfig(params?.network).networkId, {
    onSuccess: (data) => {
      setTokenList(data.map((token) => ({ title: token.symbol, logoURI: token.logoURI })));
    },
  });

  const onPressReceivetoken = (token: string) => {
    console.log('open get balance modal with ', token);
  };

  return { tokenList, onPressReceivetoken };
};
