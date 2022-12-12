import { useState } from 'react';

import { RouteProp, useRoute } from '@react-navigation/native';
import { BigNumber } from 'bignumber.js';
import { useTranslation } from 'react-i18next';

import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import { getNetworkConfig } from '@@constants/network.constant';
import { TokenDto } from '@@generated/generated-scheme-clutch';
import useTokenQuery from '@@hooks/queries/useTokenQuery';
import { TRootStackParamList } from '@@navigation/RootStack/RootStack.type';
import globalModalStore from '@@store/globalModal/globalModalStore';
import { formatBigNumber } from '@@utils/formatBigNumber';

import { ITokenReceiveListItem } from './WalletTokenReceiveSelect.type';

export const useWalletTokenReceiveSelect = () => {
  type SeedPhraseScreenRouteProp = RouteProp<TRootStackParamList, 'WALLET_TOKEN_RECEIVE_SELECT'>;
  const { t } = useTranslation();
  const { params } = useRoute<SeedPhraseScreenRouteProp>();
  const { openModal } = globalModalStore();
  const [tokenList, setTokenList] = useState<ITokenReceiveListItem[]>([]);

  const { data } = useTokenQuery(getNetworkConfig(params?.network).networkId, {
    onSuccess: (data) => {
      setTokenList(data.map((token) => ({ title: token.symbol, logoURI: token.logoURI })));
    },
  });

  const onPressConfirm = (amount: string, decimals: number) => {
    const bigNumber = new BigNumber(amount);
    const formalize = formatBigNumber(bigNumber, decimals);
    console.log('amount:  ', formalize);
  };

  const onPressReceivetoken = (token: TokenDto) => {
    openModal(MODAL_TYPES.AMOUNT_INPUT, {
      title: t('qr_payment_amount_title'),
      tokenDto: token,
      onConfirm: onPressConfirm,
    }),
      console.log('open get balance modal with ', token);
  };

  return { data, tokenList, onPressReceivetoken };
};
