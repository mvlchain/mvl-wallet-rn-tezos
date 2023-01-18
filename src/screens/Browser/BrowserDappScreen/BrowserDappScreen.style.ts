import styled from 'styled-components/native';

import { width } from '@@utils/ui';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: ${width * 24}px;
`;

export const Pressable = styled.Pressable`
  flex: 1;
  justify-content: center;
`;
