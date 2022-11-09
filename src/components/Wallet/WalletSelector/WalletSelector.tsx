import React from 'react';

import { Pressable } from 'react-native';

import { ChevronDownBlackIcon } from '@@assets/image';
import { useCurrentAccount } from '@@hooks/useAccount';
import walletPersistStore from '@@store/wallet/walletPersistStore';

import * as S from './WalletSelector.style';
import { IWalletSelectorProps } from './WalletSelector.type';
import useWalletSelector from './useWalletSelector';

function WalletSelector(props: IWalletSelectorProps) {
  const { onPressWalletList } = useWalletSelector();
  const { walletList, selectedWalletIndex } = walletPersistStore();
  return (
    <S.Container>
      <Pressable onPress={onPressWalletList}>
        {({ pressed }) => (
          <S.Wrapper pressed={pressed}>
            <S.Label>{walletList[selectedWalletIndex]?.name}</S.Label>
            <ChevronDownBlackIcon />
          </S.Wrapper>
        )}
      </Pressable>
    </S.Container>
  );
}

export default WalletSelector;
