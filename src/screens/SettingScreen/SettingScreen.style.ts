import styled from 'styled-components/native';

import { width } from '@@utils/ui';

export const SettingContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.color.whiteBlack};
`;

export const SettingScrollView = styled.ScrollView``;

export const SettingHeaderText = styled.Text`
  padding: ${width * 24}px;
  ${({ theme }) => theme.font.Title.md}
  color: ${({ theme }) => theme.color.blackWhite}
`;
