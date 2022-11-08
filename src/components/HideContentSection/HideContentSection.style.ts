import styled from 'styled-components/native';

import { width, height } from '@@utils/ui';

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: ${height * 24}px;
  padding: ${width * 16}px;
  border-radius: ${width * 16}px;
  background-color: ${({ theme }) => theme.color.grey100Grey900};
`;

export const Description = styled.Text`
  margin-top: ${height * 66}px;
  margin-bottom: ${height * 32}px;
  ${({ theme }) => theme.font.Label.md}
  font-family: ${({ theme }) => theme.fmMedium};
  color: ${({ theme }) => theme.color.blackWhite};
`;
