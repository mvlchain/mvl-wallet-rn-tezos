import React from 'react';

import { FlashList } from '@shopify/flash-list';
import { useTranslation } from 'react-i18next';

import TokenReceiveSelectListItem from '@@components/Wallet/TokenReceiveSelectListItem';

import * as S from './WalletTokenReceiveSelect.style';
import { IRenderItem } from './WalletTokenReceiveSelect.type';
import { useWalletTokenReceiveSelect } from './useWalletTokenReceiveSelect';

const RenderItem = ({ data, onPress }: IRenderItem) => {
  return <TokenReceiveSelectListItem tokenItem={data.item} onPress={() => onPress(data.item.title)} />;
};

function WalletTokenReceiveSelect() {
  const { t } = useTranslation();
  const { tokenList, onPressReceivetoken } = useWalletTokenReceiveSelect();
  return (
    <S.Container>
      <S.ListContainer>
        <S.Title>{t('qr_payment_currency_chooser_title')}</S.Title>
        {tokenList.length !== 0 && (
          <FlashList
            data={tokenList}
            extraData={tokenList}
            renderItem={(data) => RenderItem({ data, onPress: onPressReceivetoken })}
            estimatedItemSize={tokenList?.length ?? 0}
            keyExtractor={(item) => item.title}
          />
        )}
      </S.ListContainer>
    </S.Container>
  );
}

export default WalletTokenReceiveSelect;
