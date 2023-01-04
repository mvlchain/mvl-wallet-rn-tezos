import styled from 'styled-components/native';

import { width } from '@@utils/ui';

export const MenuContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: ${width * 24}px 0;
`;

export const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const MenuText = styled.Text`
  ${({ theme }) => theme.font.Label.md};
  color: ${({ theme }) => theme.color.blackWhite};
`;
