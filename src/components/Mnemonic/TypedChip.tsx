import React from 'react';

import styled, { css } from 'styled-components/native';

import { width } from '@@utils/ui';

interface ITypedChipChipProp {
  mnemonic: number;
  index: number;
  typed: boolean;
  isFocused: boolean;
  // onPress: () => void;
}

const SelectChipContainer = styled.Pressable``;

const SelectChipWrapper = styled.View<{ typed: boolean; isFocused: boolean }>`
  margin-right: 8px;
  margin-bottom: 8px;
  padding: ${width * 8}px ${width * 16}px;
  border-radius: ${width * 8}px;
  border-width: 1px;
  ${({ theme, typed, isFocused }) => {
    if (typed) {
      return css`
        border-style: solid;
        border-color: ${theme.color.primary};
      `;
    }
    if (isFocused) {
      return css`
        border-style: dashed;
        border-color: ${theme.color.primary};
      `;
    } else {
      return css`
        border-style: solid;
        border-color: ${theme.color.whiteGrey800};
      `;
    }
  }};
  background-color: ${({ theme }) => theme.color.whiteGrey800};
`;

const ChipText = styled.Text`
  ${({ theme }) => theme.font.Label.md};
  font-family: ${({ theme }) => theme.fmMedium};
`;

function TypedChip({ mnemonic, index, typed, isFocused }: ITypedChipChipProp) {
  return (
    <SelectChipContainer>
      <SelectChipWrapper typed={typed} isFocused={isFocused}>
        <ChipText>
          {index}. {mnemonic}
        </ChipText>
      </SelectChipWrapper>
    </SelectChipContainer>
  );
}

export default TypedChip;
