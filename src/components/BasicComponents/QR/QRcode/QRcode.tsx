import React from 'react';

import QRCode from 'react-qr-code';

import { width, height } from '@@utils/ui';

import * as S from './QRcode.style';
import { IQRcode } from './QRcode.type';

function QRcode({ qr }: IQRcode) {
  return (
    <S.QRcodeWrapper>
      <QRCode
        size={width * 224}
        style={{ height: `${height * 224}`, width: `${width * 224}` }}
        value={qr}
        viewBox={`0 0 ${width * 224} ${height * 224}`}
      />
    </S.QRcodeWrapper>
  );
}

export default QRcode;
