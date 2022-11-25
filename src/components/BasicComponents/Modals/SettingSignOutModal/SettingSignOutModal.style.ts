import styled from 'styled-components/native';

import { height } from '@@utils/ui';

export const DiscriptionText = styled.Text`
  padding: ${height * 24}px 0;
  ${({ theme }) => theme.font.Paragraph.md};
  color: ${({ theme }) => theme.color.blackWhite};
`;

export const AgreeContainer = styled.View`
  padding-top: ${height * 24}px;
`;

export const AgreeText = styled.Text`
  flex: 1;
  ${({ theme }) => theme.font.Label.md};
  color: ${({ theme }) => theme.color.blackWhite};
`;
