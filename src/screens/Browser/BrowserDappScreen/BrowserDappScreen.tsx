import React from 'react';

import { CloseBlackIconLight, CloseBlackIconDark, RefreshIconLight, RefreshIconDark } from '@@assets/image';
import { useAssetFromTheme } from '@@hooks/useTheme';

import Main from '../Main';

import * as S from './BrowserDappScreen.style';
import { IBrowserDappScreenProps } from './BrowserDappScreen.type';
import useBrowserDappScreen from './useBrowserDappScreen';

// TODO: Main(dapp)마무리 시 BrowserDappScreen로 코드 이사시키기(진과 작업이 꼬일까봐 일단 wrapper로 만들어뒀습니다)
function BrowserDappScreen(props: IBrowserDappScreenProps) {
  const CloseIcon = useAssetFromTheme(CloseBlackIconLight, CloseBlackIconDark);
  const RefreshIcon = useAssetFromTheme(RefreshIconLight, RefreshIconDark);
  const { webviewRef, onPressRefresh, onPressClose } = useBrowserDappScreen();
  return (
    <S.Container>
      <S.Header>
        <S.Pressable onPress={onPressClose}>
          <CloseIcon />
          <RefreshIcon onPress={onPressRefresh} />
        </S.Pressable>
      </S.Header>
      <Main webviewRef={webviewRef} />
    </S.Container>
  );
}

export default BrowserDappScreen;
