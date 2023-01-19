import React from 'react';

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
          <S.Description numberOfLines={2} lineBreakMode='tail'>
            {description}
          </S.Description>
        </S.ContentContainer>
      </S.Pressable>
    </S.Container>
  );
}

export default DappListItem;
