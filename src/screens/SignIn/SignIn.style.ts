import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import { fontSize, height, width } from '@@utils/ui';

export const SignInContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.color.whiteBlack};
  align-items: center;
  justify-content: space-between;
  padding-top: ${height * 68}px;
  padding-bottom: ${height * 58}px;
`;

export const SignInTitleWrapper = styled.View`
  align-items: center;
`;
export const SignInTitle = styled.Text`
  text-align: center;
  ${({ theme }) => theme.font.Title.md};
  color: ${({ theme }) => theme.color.blackWhite};
  line-height: ${fontSize(36)}px;
`;

export const SignInSubTitle = styled.Text`
  ${({ theme }) => theme.font.Paragraph.lg};
  color: ${({ theme }) => theme.color.blackWhite};
  line-height: ${fontSize(28)}px;
  margin-top: ${height * 8}px;
`;

export const SignInButtonWrapper = styled.View`
  padding: 0 ${width * 24}px;
  width: 100%;
`;

export const PrimaryButtonWrapper = styled(SignInButtonWrapper)`
  margin-top: ${width * 78}px;
`;

export const SignInInlineStyle = StyleSheet.create({
  marginTop: {
    marginTop: height * 16,
  },
});
