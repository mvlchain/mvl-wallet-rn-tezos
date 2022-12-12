import React from 'react';

import { SvgUri } from 'react-native-svg';

import { width } from '@@utils/ui';

import * as S from './TokenReceiveSelectListItem.style';
import { ITokenReceiveSelectListItemProps } from './TokenReceiveSelectListItem.type';

function TokenReceiveSelectListItem({ tokenItem, onPress }: ITokenReceiveSelectListItemProps) {
  return (
    <S.Container>
      {tokenItem.logoURI && (
        <S.IconWrapper>
          <SvgUri uri={tokenItem.logoURI} width={`${width * 36}`} height={`${width * 36}`} />
        </S.IconWrapper>
      )}
      <S.Text>{tokenItem.title}</S.Text>
    </S.Container>
  );
}

export default TokenReceiveSelectListItem;
