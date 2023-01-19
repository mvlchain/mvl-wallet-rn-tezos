import React from 'react';

import { View, Text, Pressable } from 'react-native';

import { DeleteIconLight, DeleteIconDark } from '@@assets/image';
import { useAssetFromTheme } from '@@hooks/useTheme';

import * as S from './BrowserSearchHistoryItem.style';
import { IBrowserSearchHistoryItemProps } from './BrowserSearchHistoryItem.type';
import useBrowserSearchHistoryItem from './useBrowserSearchHistoryItem';

function BrowserSearchHistoryItem({ title, link, isFocused, onPress, onPressDelete }: IBrowserSearchHistoryItemProps) {
  const CloseIcon = useAssetFromTheme(DeleteIconLight, DeleteIconDark);
  const { renderTitle } = useBrowserSearchHistoryItem({ title });
  return (
    <S.Container>
      <S.ContentContainer>
        <Pressable onPress={onPress}>
          {renderTitle()}
          <S.Link>{link}</S.Link>
        </Pressable>
        {!isFocused && (
          <Pressable onPress={onPressDelete}>
            <CloseIcon />
          </Pressable>
        )}
      </S.ContentContainer>
    </S.Container>
  );
}

export default BrowserSearchHistoryItem;
