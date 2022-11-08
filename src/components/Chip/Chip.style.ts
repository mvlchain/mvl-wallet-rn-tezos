import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import { width, height } from '@@utils/ui';

import { TChipPosition } from './Chip.type';

export const ChipContainer = styled.View<{ chipPosition: TChipPosition }>`
  flex-wrap: wrap;
  flex-direction: row;
  align-items: baseline;
  justify-content: ${({ chipPosition }) => (chipPosition === 'center' ? 'center' : chipPosition === 'left' ? 'flex-start' : 'flex-end')};
  margin-top: ${height * 16}px;
`;

export const ChipWrapper = styled.View<{ pressed: boolean; isPressable: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: ${height * 4}px ${width * 12}px;
  border-radius: ${width * 100}px;
  background-color: ${({ theme, pressed, isPressable }) => (isPressable && pressed ? theme.color.highlight : theme.color.lightest)};
`;

export const ChipText = styled.Text`
  ${({ theme }) => theme.font.Label.sm};
  color: ${({ theme }) => theme.color.primary};
`;

export const inlineStyles = StyleSheet.create({
  marginProvider: { marginLeft: width * 8 },
});
