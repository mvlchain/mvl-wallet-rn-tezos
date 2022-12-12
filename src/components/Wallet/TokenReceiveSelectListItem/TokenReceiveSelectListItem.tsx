import React from 'react';

import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { SvgUri } from 'react-native-svg';

import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import { width } from '@@utils/ui';

import * as S from './TokenReceiveSelectListItem.style';
import { ITokenReceiveSelectListItemProps } from './TokenReceiveSelectListItem.type';

function TokenReceiveSelectListItem({ tokenItem, onPress }: ITokenReceiveSelectListItemProps) {
  const { t } = useTranslation();
  return (
    <S.Container>
      <S.DataContainer>
        {tokenItem.logoURI && (
          <S.IconWrapper>
            <SvgUri uri={tokenItem.logoURI} width={`${width * 36}`} height={`${width * 36}`} />
          </S.IconWrapper>
        )}
        <S.Text>{tokenItem.symbol}</S.Text>
      </S.DataContainer>
      <PrimaryButton onPress={onPress} label={t('receive')} size={'fit'} />
    </S.Container>
  );
}

export default TokenReceiveSelectListItem;
