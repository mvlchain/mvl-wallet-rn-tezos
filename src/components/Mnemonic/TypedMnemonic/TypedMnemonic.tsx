import React from 'react';

import styled from 'styled-components/native';

import * as S from '../Mnemonic.style';

import TypedChip from './TypedChip';
import useTypedMnemonic from './useTypedMnemonic';

const ChipContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const Column = styled.View`
  width: 47%;
`;

function TypedMnemonic() {
  const { mnemonicList, focusedIndex, onPressTypedChip } = useTypedMnemonic();

  return (
    <S.MnemonicContainer>
      <ChipContainer>
        <Column>
          {mnemonicList.length > 0 &&
            mnemonicList
              .slice(0, 5)
              .map((mnemonic) => (
                <TypedChip
                  key={mnemonic.index}
                  word={mnemonic.word}
                  index={mnemonic.index}
                  typed={mnemonic.word !== ''}
                  isFocused={focusedIndex === mnemonic.index}
                  onPress={() => onPressTypedChip(mnemonic.index)}
                />
              ))}
        </Column>
        <Column>
          {mnemonicList.length > 0 &&
            mnemonicList
              .slice(5, 10)
              .map((mnemonic) => (
                <TypedChip
                  key={mnemonic.index}
                  word={mnemonic.word}
                  index={mnemonic.index}
                  typed={mnemonic.word !== ''}
                  isFocused={focusedIndex === mnemonic.index}
                  onPress={() => onPressTypedChip(mnemonic.index)}
                />
              ))}
        </Column>
      </ChipContainer>
    </S.MnemonicContainer>
  );
}

export default TypedMnemonic;
