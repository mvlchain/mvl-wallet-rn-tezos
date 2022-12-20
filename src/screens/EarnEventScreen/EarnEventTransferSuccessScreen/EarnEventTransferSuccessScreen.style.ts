import styled from 'styled-components/native';

import { width } from '@@utils/ui';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.color.whiteBlack};
`;

export const ContentContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const baseText = styled.Text`
  color: ${({ theme }) => theme.color.blackWhite};
`;

export const Title = styled(baseText)`
  margin-top: ${width * 24}px;
  ${({ theme }) => theme.font.Title.lg};
`;

export const Description = styled(baseText)`
  ${({ theme }) => theme.font.Paragraph.lg};
`;

export const ButtonWrapper = styled.View`
  margin: ${width * 24}px;
`;
