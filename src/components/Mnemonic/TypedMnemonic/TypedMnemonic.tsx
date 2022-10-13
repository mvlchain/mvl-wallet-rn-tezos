import React from 'react';

import styled from 'styled-components/native';

import { height } from '@@utils/ui';

import * as STC from '../Mnemonic.style';

import TypedChip from './TypedChip';
import useTypedMnemonic from './useTypedMnemonic';

interface ITypedMnemonicProps {
  mnemonic: string;
}

const ChipContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const Row = styled.View`
  width: 47%;
`;

function TypedMnemonic({ mnemonic }: ITypedMnemonicProps) {
  const { mnemonicList, focusedIndex, onPressTypedChip } = useTypedMnemonic();

  return (
    <STC.MnemonicContainer>
      <ChipContainer>
        <Row>
          {mnemonicList.length > 0 &&
            mnemonicList
              .slice(0, 5)
              .map((mnemonic) => (
                <TypedChip
                  word={mnemonic.word}
                  index={mnemonic.index}
                  typed={mnemonic.word !== ''}
                  isFocused={focusedIndex === mnemonic.index}
                  onPress={() => onPressTypedChip(mnemonic.index)}
                />
              ))}
        </Row>
        <Row>
          {mnemonicList.length > 0 &&
            mnemonicList
              .slice(5, 10)
              .map((mnemonic) => (
                <TypedChip
                  word={mnemonic.word}
                  index={mnemonic.index}
                  typed={mnemonic.word !== ''}
                  isFocused={focusedIndex === mnemonic.index}
                  onPress={() => onPressTypedChip(mnemonic.index)}
                />
              ))}
        </Row>
      </ChipContainer>
    </STC.MnemonicContainer>
  );
}

export default TypedMnemonic;
