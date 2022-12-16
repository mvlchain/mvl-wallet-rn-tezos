import styled from 'styled-components/native';

import { width } from '@@utils/ui';

export const MenuContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${width * 8}px 0;
`;

export const TextContainer = styled.View`
  flex: 1;
  margin-right: ${width * 8}px;
  margin-left: ${width * 16}px;
`;

export const MenuText = styled.Text`
  ${({ theme }) => theme.font.Label.md};
  color: ${({ theme }) => theme.color.blackWhite};
`;

export const AddressText = styled.Text`
  ${({ theme }) => theme.font.Label.md};
  color: ${({ theme }) => theme.color.grey500};
`;

export const SelectedContainer = styled.View`
  flex: 1;
  align-items: center;
`;
