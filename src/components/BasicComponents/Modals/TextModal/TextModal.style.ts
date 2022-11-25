import styled from 'styled-components/native';

import { width } from '@@utils/ui';

export const Label = styled.Text`
  padding: ${width * 24}px 0;
  ${({ theme }) => theme.font.Paragraph.lg}
  color: ${({ theme }) => theme.color.blackWhite}
`;
