import React, { useMemo } from 'react';

import { NUMPAD, PIN_MODE } from '@@constants/pin.constant';
import { pinStore } from '@@store/pin/pinStore';
import settingPersistStore from '@@store/setting/settingPersistStore';

import NumPad from '../NumPad/NumPad';

import { INumPadsProps } from './NumPads.type';
import * as S from './Numpads.style';

function NumPads({ backSpace, bioAuth, setPassword }: INumPadsProps) {
  const { pinMode, step } = pinStore();
  const { settedBioAuth } = settingPersistStore();
  const showBio = pinMode === PIN_MODE.CONFIRM && settedBioAuth;

  const numpads = useMemo(() => {
    const numpads = Array.from({ length: 10 }, (v, i) => i.toString()).sort(() => Math.random() - 0.5);
    const randomNum = numpads.pop();
    return { rows: [numpads.slice(0, 3), numpads.slice(3, 6), numpads.slice(6)], leftOver: randomNum };
  }, [step]);

  return (
    <S.NumpadsContainer>
      {numpads.rows.map((row, i) => (
        <S.NumpadsRow key={'row' + i}>
          {row.map((text, i) => (
            <NumPad type={NUMPAD.NUMBER} text={text} key={'number' + i} setPassword={setPassword} />
          ))}
        </S.NumpadsRow>
      ))}
      <S.NumpadsRow>
        {showBio ? <NumPad type={NUMPAD.BIO} bioAuth={bioAuth} /> : <S.EmptyPad />}
        <NumPad type={NUMPAD.NUMBER} text={numpads.leftOver} setPassword={setPassword} />
        <NumPad type={NUMPAD.DELETE} backSpace={backSpace} />
      </S.NumpadsRow>
    </S.NumpadsContainer>
  );
}

export default NumPads;
