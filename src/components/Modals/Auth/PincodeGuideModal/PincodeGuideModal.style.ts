import styled from 'styled-components/native';

import { fontSize, height, width } from '@@utils/ui';

export const PincodeContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.color.whiteBlack};
  align-items: center;
  justify-content: space-between;
  padding-top: ${height * 68}px;
  padding-bottom: ${height * 58}px;
`;

export const PincodeTitleWrapper = styled.View`
  align-items: center;
  width: 100%;
  padding: 0 ${width * 24}px;
`;
export const PincodeTitle = styled.Text`
  ${({ theme }) => theme.font.Title.md};
  color: ${({ theme }) => theme.color.blackWhite};
  line-height: ${fontSize(36)}px;
`;

export const PincodeSubTitle = styled.Text`
  ${({ theme }) => theme.font.Paragraph.lg};
  color: ${({ theme }) => theme.color.blackWhite};
  line-height: ${fontSize(28)}px;
  margin-top: ${height * 8}px;
`;

export const PincodeButtonWrapper = styled.View`
  padding: 0 ${width * 24}px;
  width: 100%;
`;

export const PrimaryButtonWrapper = styled(PincodeButtonWrapper)`
  margin-top: ${width * 78}px;
`;
