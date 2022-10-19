import styled from 'styled-components/native';

import { height, width } from '@@utils/ui';

export const AppVersionContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 ${width * 24}px ${width * 24}px;
  background-color: ${({ theme }) => theme.color.whiteBlack};
`;

export const ClutchImageContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ClutchButtonContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: ${height * 24}px 0;
`;

export const AppText = styled.Text`
  margin-top: ${height * 24}px;
  ${({ theme }) => theme.font.Paragraph.md};
  color: ${({ theme }) => theme.color.grey500};
`;
