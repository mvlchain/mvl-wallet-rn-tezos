import React from 'react';

import SelectChip from './SelectChip';
import * as S from './SelectMnemonic.style';
import { ISelectMnemonicProps } from './SelectMnemonic.type';
import useSelectMnemonic from './useSelectMnemonic';

function SelectMnemonic({ mnemonic }: ISelectMnemonicProps) {
  const { mnemonicList, mnemonicArr, onPressSelectChip } = useSelectMnemonic({ mnemonic });

  return (
    <S.SelectChipContainer>
      {mnemonicArr.map((mnemonic, index) => (
        <SelectChip
          key={`${mnemonic}_${index}`}
          mnemonic={mnemonic}
          pressed={mnemonicList.filter((mnemonic) => mnemonic.selectChipIndex === index).length !== 0}
          onPress={() => onPressSelectChip(mnemonic, index)}
        />
      ))}
    </S.SelectChipContainer>
  );
}

export default SelectMnemonic;
