import React, { useEffect, useState } from 'react';

import styled from 'styled-components/native';

import { HideLight } from '@@assets/image';
import { PrimaryButton } from '@@components/Buttons/BaseButton';
import { height } from '@@utils/ui';

import * as S from './Mnemonic.style';
import MnemonicChip from './MnemonicChip';

interface IMnemonicProps {
  type: 'hide' | 'show';
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

function Mnemonic({ type, mnemonic }: IMnemonicProps) {
  const [mnemonicArr, setMnemonicArr] = useState<string[]>([]);

  useEffect(() => {
    setMnemonicArr(mnemonic.split(' '));
  }, []);

  return (
    <S.MnemonicContainer>
      {type === 'hide' ? (
        <>
          <ShowMnemonicText>Make sure no one is watching your screen.</ShowMnemonicText>
          <HideLight />
          <PrimaryButton
            label='View Seed Phrase'
            disabled={false}
            onPress={() => {
              console.log('hello');
            }}
            wrapperStyle={{ marginTop: height * 56 }}
          />
        </>
      ) : (
        <ChipContainer>
          <Row>
            {mnemonicArr.length > 0 &&
              mnemonicArr.slice(0, 12).map((mnemonic, index) => <MnemonicChip key={`${mnemonic}_${index}`} label={mnemonic} index={index + 1} />)}
          </Row>
          <Row>
            {mnemonicArr.length > 0 &&
              mnemonicArr
                .slice(12, 24)
                .map((mnemonic, index) => <MnemonicChip key={`${mnemonic}_${index + 12}`} label={mnemonic} index={index + 13} />)}
          </Row>
        </ChipContainer>
      )}
    </S.MnemonicContainer>
  );
}

export default Mnemonic;
