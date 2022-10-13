import React, { useEffect, useState } from 'react';

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
`;

function SelectMnemonic({ mnemonic }: ISelectMnemonicProps) {
  const { mnemonicList, onPressSelectChip } = useSelectMnemonic();
  const [mnemonicArr, setMnemonicArr] = useState<string[]>([]);

  useEffect(() => {
    setMnemonicArr(mnemonic.split(' ').sort(() => Math.random() - 0.5));
  }, []);

  return (
    <SelectChipContainer>
      {mnemonicArr.map((mnemonic, index) => (
        <SelectChip
          mnemonic={mnemonic}
          pressed={mnemonicList.filter((mnemonic) => mnemonic.selectChipIndex === index).length !== 0}
          onPress={() => onPressSelectChip(mnemonic, index)}
        />
      ))}
    </SelectChipContainer>
  );
}

export default SelectMnemonic;
