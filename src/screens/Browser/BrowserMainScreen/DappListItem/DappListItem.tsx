import React from 'react';

import * as S from './DappListItem.style';
import { IDappListItemProps } from './DappListItem.type';

function DappListItem({ Image, title, description, onPress }: IDappListItemProps) {
  return (
    <S.Container>
      <S.Pressable onPress={onPress}>
        <S.ImageContainer>
          <Image />
        </S.ImageContainer>
        <S.ContentContainer>
          <S.Title>{title}</S.Title>
          <S.Description>{description}</S.Description>
        </S.ContentContainer>
      </S.Pressable>
    </S.Container>
  );
}

export default DappListItem;
