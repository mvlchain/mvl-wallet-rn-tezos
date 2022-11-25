import React from 'react';

import * as CS from '../Mnemonic.style';

import TypedChip from './TypedChip';
import * as S from './TypedMnemonic.style';
import useTypedMnemonic from './useTypedMnemonic';

function TypedMnemonic() {
  const { mnemonicList, focusedIndex, onPressTypedChip } = useTypedMnemonic();

  return (
    <CS.MnemonicContainer>
      <S.ChipContainer>
        <S.Column>
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
        </S.Column>
        <S.Column>
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
        </S.Column>
      </S.ChipContainer>
    </CS.MnemonicContainer>
  );
}

export default TypedMnemonic;
