import styled from 'styled-components/native';

import { height, width } from '@@utils/ui';

export const Container = styled.View`
  overflow: hidden;
  border-radius: ${width * 16}px;
  margin-bottom: ${height * 24}px;
`;

export const Pressable = styled.Pressable``;

export const ImageContainer = styled.View<{ imageHeight: number }>`
  align-items: center;
  justify-content: center;
  height: ${({ imageHeight }) => height * imageHeight * 0.6}px;
  overflow: hidden;
`;

export const ContentContainer = styled.View`
  padding: ${width * 16}px;
  border-bottom-left-radius: ${width * 16}px;
  border-bottom-right-radius: ${width * 16}px;
  border-width: ${width * 1}px;
  border-top-width: 0;
  border-color: ${({ theme }) => theme.color.grey100Grey900};
`;

export const Title = styled.Text`
  ${({ theme }) => theme.font.Title.xs};
  color: ${({ theme }) => theme.color.blackWhite};
`;

export const Description = styled.Text`
  ${({ theme }) => theme.font.Paragraph.md};
  color: ${({ theme }) => theme.color.grey500};
`;
