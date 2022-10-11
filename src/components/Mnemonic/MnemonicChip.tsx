import React from 'react';

import styled from 'styled-components/native';

import { width } from '@@utils/ui';

interface IMnemomicChipProps {
  label: string;
  index: number;
}

const ChipContainer = styled.View`
  align-items: baseline;
`;

const LabelContainer = styled.View<{ isLast: boolean }>`
  padding: ${width * 8}px;
  margin-bottom: ${({ isLast }) => (isLast ? 0 : width * 8)}px;
  border-radius: ${width * 8}px;
  background-color: ${({ theme }) => theme.color.whiteGrey800};
`;

const LabelText = styled.Text`
  ${({ theme }) => theme.font.Paragraph.md}
`;

function MnemonicChip({ label, index }: IMnemomicChipProps) {
  return (
    <ChipContainer>
      <LabelContainer isLast={index % 12 === 0}>
        <LabelText>
          {index}. {label}
        </LabelText>
      </LabelContainer>
    </ChipContainer>
  );
}
export default MnemonicChip;
