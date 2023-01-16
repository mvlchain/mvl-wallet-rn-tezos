import React from 'react';

import QRCode from 'react-native-qrcode-svg';

import settingPersistStore from '@@store/setting/settingPersistStore';
import { SCREEN_WIDTH } from '@@utils/ui';

import * as S from './QRcode.style';
import { IQRcode } from './QRcode.type';

function QRcode({ qr }: IQRcode) {
  const { appTheme } = settingPersistStore();
  return appTheme.value === 'light' ? (
    <S.QRcodeWrapper>
      <QRCode size={SCREEN_WIDTH * 0.6} value={qr} />
    </S.QRcodeWrapper>
  ) : (
    <S.QRcodeDarkThemeWrapper>
      <QRCode size={SCREEN_WIDTH * 0.6} value={qr} />
    </S.QRcodeDarkThemeWrapper>
  );
}

export default QRcode;
