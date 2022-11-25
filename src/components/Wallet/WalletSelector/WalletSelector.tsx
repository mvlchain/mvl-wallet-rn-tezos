import React from 'react';

import { Pressable } from 'react-native';

import { ChevronDownLightIcon, ChevronDownDarkIcon } from '@@assets/image';
import { useAssetFromTheme } from '@@hooks/common/useTheme';

import * as S from './WalletSelector.style';
import { IWalletSelectorProps } from './WalletSelector.type';
import useWalletSelector from './useWalletSelector';

function WalletSelector(props: IWalletSelectorProps) {
  const { name, onPressWalletList } = useWalletSelector();
  const DownIcon = useAssetFromTheme(ChevronDownLightIcon, ChevronDownDarkIcon);
  return (
    <S.Container>
      <Pressable onPress={onPressWalletList}>
        {({ pressed }) => (
          <S.Wrapper pressed={pressed}>
            <S.Label>{name}</S.Label>
            <DownIcon />
          </S.Wrapper>
        )}
      </Pressable>
    </S.Container>
  );
}

export default WalletSelector;