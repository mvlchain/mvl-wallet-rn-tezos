import styled from 'styled-components/native';

import { width, height } from '@@utils/ui';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 0 ${width * 24}px;
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
  padding-top: 0;
  border-radius: ${width * 16}px;
  background-color: ${({ theme }) => theme.color.grey100Grey900};
`;
