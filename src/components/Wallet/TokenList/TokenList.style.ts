import styled from 'styled-components/native';

import { width } from '@@utils/ui';

export const Container = styled.View`
  padding: 0 ${width * 24}px;
`;

export const TitleContainer = styled.View`
  padding: ${width * 24}px 0;
`;

export const Title = styled.Text`
  ${({ theme }) => theme.font.Title.xs};
  color: ${({ theme }) => theme.color.blackWhite};
`;
