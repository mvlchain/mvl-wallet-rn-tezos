import React from 'react';

import { Pressable } from 'react-native';

import { ChevronDownLightIcon, ChevronDownDarkIcon } from '@@assets/image';
import { useAssetFromTheme } from '@@hooks/useTheme';

import * as S from './WalletSelector.style';
import { IWalletSelectorProps } from './WalletSelector.type';
import useWalletSelector from './useWalletSelector';

function WalletSelector({ walletName }: IWalletSelectorProps) {
  const { onPressWalletList } = useWalletSelector();
  const DownIcon = useAssetFromTheme(ChevronDownLightIcon, ChevronDownDarkIcon);
  return (
    <S.Container>
      <Pressable onPress={onPressWalletList}>
        {({ pressed }) => (
          <S.Wrapper pressed={pressed}>
            <S.Label>{walletName}</S.Label>
            <DownIcon />
          </S.Wrapper>
        )}
      </Pressable>
    </S.Container>
  );
}

export default WalletSelector;
