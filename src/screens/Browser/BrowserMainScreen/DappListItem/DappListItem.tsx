import React, { useEffect } from 'react';

import * as S from './DappListItem.style';
import { IDappListItemProps } from './DappListItem.type';

function DappListItem({ Image, title, description, onPress }: IDappListItemProps) {
  const [imageHeight, setImageHeight] = React.useState(0);
  return (
    <S.Container>
      <S.Pressable onPress={onPress}>
        <S.ImageContainer imageHeight={imageHeight}>
          <Image
            onLayout={(e) => {
              setImageHeight(e.nativeEvent.layout.height);
            }}
          />
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
