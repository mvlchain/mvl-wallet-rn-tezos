import React, { useEffect, useState } from 'react';

import styled from 'styled-components/native';

import { HideLight } from '@@assets/image';
import { PrimaryButton } from '@@components/Buttons/BaseButton';
import { height } from '@@utils/ui';

import * as STC from './Mnemonic.style';
import MnemonicChip from './MnemonicChip';
import TypedChip from './TypedChip';

interface ITypedMnemonicProps {
  mnemonic: string;
}

const ShowMnemonicText = styled.Text`
  margin-top: ${height * 66}px;
  margin-bottom: ${height * 32}px;
  ${({ theme }) => theme.font.Label.md}
  font-family: ${({ theme }) => theme.fmMedium};
`;

const ChipContainer = styled.View`
  flex-direction: row;
  width: 100%;
`;

const Row = styled.View`
  width: 50%;
`;

function TypedMnemonic({ mnemonic }: ITypedMnemonicProps) {
  const [typedMnemonicArr, setTypedMnemonicArr] = useState<number[]>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

  useEffect(() => {}, []);

  return (
    <STC.MnemonicContainer>
      <ChipContainer>
        <Row>
          {typedMnemonicArr.length > 0 &&
            typedMnemonicArr.slice(0, 5).map((mnemonic, index) => <TypedChip mnemonic={mnemonic} index={index + 1} pressed={false} />)}
        </Row>
        <Row>
          {typedMnemonicArr.length > 0 &&
            typedMnemonicArr.slice(5, 10).map((mnemonic, index) => <TypedChip mnemonic={mnemonic} index={index + 13} pressed={false} />)}
        </Row>
      </ChipContainer>
    </STC.MnemonicContainer>
  );
}

export default TypedMnemonic;
