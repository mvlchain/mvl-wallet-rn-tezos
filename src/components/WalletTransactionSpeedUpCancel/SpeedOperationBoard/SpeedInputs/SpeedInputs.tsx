import React, { useState } from 'react';

import { Text } from 'react-native';

import { BaseTextField } from '@@components/BasicComponents/TextFields/BaseTextField';
import { BaseInput } from '@@components/BasicComponents/TextFields/TextField.style';
import { height } from '@@utils/ui';

import * as S from './SpeedInputs.style';

function SpeedInputs() {
  const [input, setInput] = useState('');
  return (
    <S.Container>
      <S.Label>{'Gas Price'}</S.Label>
      <S.InputWrapper>
        <BaseTextField type='gas' value={input} onChange={setInput} unit={'GWEI'} placeholder={'0'} />
      </S.InputWrapper>

      <S.Label style={{ marginTop: height * 24 }}>{'Gas Limit'}</S.Label>
      <S.InputWrapper>
        <BaseTextField type='gas' value={input} onChange={setInput} unit={'GWEI'} placeholder={'0'} />
      </S.InputWrapper>
    </S.Container>
  );
}

export default SpeedInputs;
