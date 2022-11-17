import React from 'react';

import { ArrangeIcon } from '@@assets/image';
import * as TokenIcon from '@@assets/image/token';
import Toggle from '@@components/Form/Toggle';
import { useToggle } from '@@hooks/common/useToggle';

import * as S from './EditTokenListItem.style';
import { IEditTokenListItemProps } from './EditTokenListItem.type';
function EditTokenListItem({ tokenName }: IEditTokenListItemProps) {
  const TokenImage = TokenIcon[tokenName ?? 'Mvl'];

  const [testValue, toggle] = useToggle();
  return (
    <S.ItemContainer>
      <ArrangeIcon />
      <S.TokenContainer>
        <TokenImage />
        <S.TokenName>{tokenName}</S.TokenName>
      </S.TokenContainer>
      <Toggle checked={testValue} onPress={toggle} />
    </S.ItemContainer>
  );
}

export default EditTokenListItem;
