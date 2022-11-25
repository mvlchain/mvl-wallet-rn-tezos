import React from 'react';

import SelectChip from './SelectChip';
import * as S from './SelectMnemonic.style';
import useSelectMnemonic from './useSelectMnemonic';

function SelectMnemonic() {
  const { mnemonicList, mnemonicArr, onPressSelectChip } = useSelectMnemonic();

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
