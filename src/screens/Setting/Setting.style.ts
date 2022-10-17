import styled from 'styled-components/native';

export const SettingContainer = styled.View`
  flex: 1;
`;

export const SettingScrollView = styled.ScrollView``;

export const SettingHeaderText = styled.Text`
  ${({ theme }) => theme.font.Title.md}
  color: ${({ theme }) => theme.color.blackWhite}
`;
