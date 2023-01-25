import styled from 'styled-components/native';

import { width } from '@@utils/ui';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.color.whiteBlack};
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: ${width * 24}px;
`;

export const Pressable = styled.Pressable`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
