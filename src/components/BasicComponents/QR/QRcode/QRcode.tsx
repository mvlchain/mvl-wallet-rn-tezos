import React from 'react';

import QRCode from 'react-native-qrcode-svg';

import { SCREEN_WIDTH } from '@@utils/ui';

import * as S from './QRcode.style';
import { IQRcode } from './QRcode.type';

function QRcode({ qr }: IQRcode) {
  return (
    <S.QRcodeWrapper>
      <QRCode size={SCREEN_WIDTH * 0.6} value={qr} />
    </S.QRcodeWrapper>
  );
}

export default QRcode;
