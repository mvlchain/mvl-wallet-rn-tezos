import styled from 'styled-components/native';

import { height, width } from '@@utils/ui';

export const Container = styled.View`
  flex: 1;
  overflow: hidden;
  border-radius: ${width * 16}px;
  margin-bottom: ${height * 24}px;
`;

export const Pressable = styled.Pressable`
  flex: 1;
`;

export const ImageContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  max-height: ${height * 60}%;
  overflow: hidden;
`;

export const ContentContainer = styled.View`
  padding: ${width * 16}px;
  border-bottom-left-radius: ${width * 16}px;
  border-bottom-right-radius: ${width * 16}px;
  border-width: ${width * 1}px;
  border-color: ${({ theme }) => theme.color.grey100};
`;

export const Title = styled.Text`
  ${({ theme }) => theme.font.Title.xs};
  ${({ theme }) => theme.color.blackWhite};
`;

export const Description = styled.Text`
  ${({ theme }) => theme.font.Paragraph.md};
  ${({ theme }) => theme.color.grey500};
`;
