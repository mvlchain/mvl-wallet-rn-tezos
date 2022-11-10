import React, { useEffect, useState } from 'react';

import { Pressable } from 'react-native';

import * as S from './CustomRadio.style';
import { ICustomRadioProps } from './CustomRadio.type';

function CustomRadio({ options, defaultIdx = 0 }: ICustomRadioProps) {
  const [selectedIdx, setSelectedIdx] = useState(defaultIdx);

  return (
    <S.ButtonWrapper>
      {options.map((v, i) => {
        return (
          <S.CustomRadioButtonWrapper
            onPress={() => {
              setSelectedIdx(i);
              v.onPress();
            }}
            key={'radio' + i}
          >
            <S.CustomButtonRadio checked={i === selectedIdx} isFirst={i === 0} isLast={i === options.length - 1}>
              <S.CustomRadioText checked={i === selectedIdx}>{v.label}</S.CustomRadioText>
            </S.CustomButtonRadio>
          </S.CustomRadioButtonWrapper>
        );
      })}
    </S.ButtonWrapper>
  );
}

export default CustomRadio;
