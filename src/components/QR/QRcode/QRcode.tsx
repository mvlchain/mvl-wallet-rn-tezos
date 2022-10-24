import QRCode from 'react-qr-code';

import { width, height } from '@@utils/ui';

import * as S from './QRcode.style';
import { IQRcode } from './QRcode.type';

function QRcode(props: IQRcode) {
  return (
    <S.QRcodeWrapper>
      <QRCode size={224} style={{ height: `${height * 224}`, width: `${width * 224}` }} value={JSON.stringify(props)} viewBox={`0 0 224 224`} />
    </S.QRcodeWrapper>
  );
}

export default QRcode;
