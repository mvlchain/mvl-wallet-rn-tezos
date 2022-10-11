import React, { useEffect, useState } from 'react';

import styled from 'styled-components/native';

import { height } from '@@utils/ui';

import SelectChip from './SelectChip';

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
  const [mnemonicArr, setMnemonicArr] = useState<string[]>([]);

  useEffect(() => {
    setMnemonicArr(mnemonic.split(' '));
  }, []);

  return (
    <SelectChipContainer>
      {mnemonicArr
        .sort(() => Math.random() - 0.5)
        .map((mnemonic) => (
          <SelectChip mnemonic={mnemonic} pressed={false} />
        ))}
    </SelectChipContainer>
  );
}

export default SelectMnemonic;
