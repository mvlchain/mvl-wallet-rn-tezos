import React from 'react';

import styled from 'styled-components/native';

import { height } from '@@utils/ui';

import SelectChip from './SelectChip';
import useSelectMnemonic from './useSelectMnemonic';

interface ISelectMnemonicProps {
  mnemonic: string;
}

const SelectChipContainer = styled.View`
  flex: 1;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: baseline;
  margin-top: ${height * 24}px;
  margin-bottom: ${height * 32}px;
`;

function SelectMnemonic({ mnemonic }: ISelectMnemonicProps) {
  const { mnemonicList, mnemonicArr, onPressSelectChip } = useSelectMnemonic({ mnemonic });

  return (
    <SelectChipContainer>
      {mnemonicArr.map((mnemonic, index) => (
        <SelectChip
          key={`${mnemonic}_${index}`}
          mnemonic={mnemonic}
          pressed={mnemonicList.filter((mnemonic) => mnemonic.selectChipIndex === index).length !== 0}
          onPress={() => onPressSelectChip(mnemonic, index)}
        />
      ))}
    </SelectChipContainer>
  );
}

export default SelectMnemonic;
