import React from 'react';

import { Pressable } from 'react-native';

import { ChevronDownBlackIcon } from '@@assets/image';
import { useCurrentAccount } from '@@hooks/useAccount';

import * as S from './WalletSelector.style';
import { IWalletSelectorProps } from './WalletSelector.type';

function WalletSelector(props: IWalletSelectorProps) {
  const { name } = useCurrentAccount();

  return (
    <S.Container>
      <Pressable onPress={() => console.log('open wallet list modal')}>
        {({ pressed }) => (
          <S.Wrapper pressed={pressed}>
            <S.Label>{name}</S.Label>
            <ChevronDownBlackIcon />
          </S.Wrapper>
        )}
      </Pressable>
    </S.Container>
  );
}

export default WalletSelector;
