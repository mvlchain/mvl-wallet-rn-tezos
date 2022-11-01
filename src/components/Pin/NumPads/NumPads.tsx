import { NUMPAD, NUMPAD_ROWS, PIN_MODE } from '@@constants/pin.constant';
import { pinStore } from '@@store/pin/pinStore';
import settingPersistStore from '@@store/setting/settingPersistStore';

import NumPad from '../NumPad/NumPad';
import { TNumPadType } from '../NumPad/NumPad.type';

import * as S from './Numpads.style';

function NumPads() {
  const { pinMode } = pinStore();
  const { settedBioAuth } = settingPersistStore();
  const showBio = pinMode === PIN_MODE.CONFIRM && settedBioAuth;

  return (
    <S.NumpadsContainer>
      {NUMPAD_ROWS.map((row, i) => (
        <S.NumpadsRow key={'row' + i}>
          {row.map((text, i) => (
            <NumPad type={NUMPAD.NUMBER} text={text} key={'number' + i} />
          ))}
        </S.NumpadsRow>
      ))}
      <S.NumpadsRow>
        {showBio ? <NumPad type={NUMPAD.BIO} /> : <S.EmptyPad />}
        <NumPad type={NUMPAD.NUMBER} text={0} />
        <NumPad type={NUMPAD.DELETE} />
      </S.NumpadsRow>
    </S.NumpadsContainer>
  );
}

export default NumPads;
