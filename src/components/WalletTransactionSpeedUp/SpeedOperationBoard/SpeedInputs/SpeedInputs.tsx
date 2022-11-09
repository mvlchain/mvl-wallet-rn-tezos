import React, { useState } from 'react';

import { Text } from 'react-native';

import { BaseTextField } from '@@components/BasicComponents/TextFields/BaseTextField';
import { BaseInput } from '@@components/BasicComponents/TextFields/TextField.style';

import * as S from './SpeedInputs.style';

function SpeedInputs() {
  const [input, setInput] = useState('');
  return (
    <S.Container>
      <S.Label>{'Gas Price'}</S.Label>
      <BaseTextField type='gas' value={input} onChange={setInput} />
      <S.Label>{'Gas Limit'}</S.Label>
      <BaseTextField type='gas' value={input} onChange={setInput} />
    </S.Container>
  );
}

export default SpeedInputs;
