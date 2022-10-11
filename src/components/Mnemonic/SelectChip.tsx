import React from 'react';

import styled from 'styled-components/native';

import { width } from '@@utils/ui';

interface ISelectChipProp {
  mnemonic: string;
  pressed: boolean;
  // onPress: () => void;
}

const SelectChipContainer = styled.Pressable``;

const SelectChipWrapper = styled.View<{ pressed: boolean }>`
  margin-right: 8px;
  margin-bottom: 8px;
  padding: ${width * 8}px ${width * 16}px;
  border-radius: ${width * 8}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.color.primary};
  background-color: ${({ theme, pressed }) => (pressed ? theme.color.primary : theme.color.white)};
`;

const ChipText = styled.Text<{ pressed: boolean }>`
  ${({ theme }) => theme.font.Label.md};
  color: ${({ theme, pressed }) => (pressed ? theme.color.white : theme.color.primary)};
  font-family: ${({ theme }) => theme.fmMedium};
`;

function SelectChip({ mnemonic, pressed }: ISelectChipProp) {
  return (
    <SelectChipContainer>
      <SelectChipWrapper pressed={pressed}>
        <ChipText pressed={pressed}>{mnemonic}</ChipText>
      </SelectChipWrapper>
    </SelectChipContainer>
  );
}

export default SelectChip;
