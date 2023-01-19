import React from 'react';

import { View } from 'react-native';

import { GasTextField } from '@@components/BasicComponents/TextFields/GasTextField/GasTextField';
import { height } from '@@utils/ui';

import * as S from './GasInputs.style';
import { IGasInputs } from './GasInputs.type';

function GasInputs({ inputs }: { inputs: Array<IGasInputs> }) {
  return (
    <S.Container>
      {inputs.map((v, i) => {
        return (
          <View key={i + v.label}>
            <S.Label style={{ marginTop: i === 0 ? 0 : height * 24 }}>{v.label}</S.Label>
            <S.InputWrapper>
              <GasTextField value={v.value} setValue={v.setValue} unit={v.unit} hint={v.hint} />
            </S.InputWrapper>
          </View>
        );
      })}
    </S.Container>
  );
}

export default GasInputs;
