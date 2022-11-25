import styled from 'styled-components/native';

import { width, height } from '@@utils/ui';

export const Container = styled.View`
  flex: 1;
  margin: 0 ${width * 24}px;
`;

export const Description = styled.Text`
  text-align: center;
  ${({ theme }) => theme.font.Paragraph.md}
  color: ${({ theme }) => theme.color.blackWhite};
`;

export const MnemonicContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: ${height * 24}px;
  padding: ${width * 16}px;
  border-radius: ${width * 16}px;
  background-color: ${({ theme }) => theme.color.grey100Grey900};
`;

export const ShowMnemonicText = styled.Text`
  margin-top: ${height * 66}px;
  margin-bottom: ${height * 32}px;
  ${({ theme }) => theme.font.Label.md}
  font-family: ${({ theme }) => theme.fmMedium};
  color: ${({ theme }) => theme.color.blackWhite};
`;

export const ChipContainer = styled.View`
  flex-direction: row;
  width: 100%;
`;

export const Column = styled.View`
  width: 50%;
`;
