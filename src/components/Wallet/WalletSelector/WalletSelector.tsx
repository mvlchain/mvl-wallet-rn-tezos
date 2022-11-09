import React from 'react';

import { Pressable } from 'react-native';

import { ChevronDownLightIcon, ChevronDownDarkIcon } from '@@assets/image';
import { useDi } from '@@hooks/common/useDi';
import { useAssetFromTheme } from '@@hooks/common/useTheme';
import walletPersistStore from '@@store/wallet/walletPersistStore';
import { walletStore } from '@@store/wallet/walletStore';

import * as S from './WalletSelector.style';
import { IWalletSelectorProps } from './WalletSelector.type';
import useWalletSelector from './useWalletSelector';

function WalletSelector(props: IWalletSelectorProps) {
  const keyClient = useDi('KeyClient');
  const postboxkey = keyClient.postboxKeyHolder?.postboxKey ?? 'default';
  const { onPressWalletList } = useWalletSelector();
  const { selectedWalletIndex } = walletPersistStore();
  const { walletData } = walletStore();
  const DownIcon = useAssetFromTheme(ChevronDownLightIcon, ChevronDownDarkIcon);
  return (
    <S.Container>
      <Pressable onPress={onPressWalletList}>
        {({ pressed }) => (
          <S.Wrapper pressed={pressed}>
            {<S.Label>{walletData[selectedWalletIndex[postboxkey]]?.name}</S.Label>}
            <DownIcon />
          </S.Wrapper>
        )}
      </Pressable>
    </S.Container>
  );
}

export default WalletSelector;
