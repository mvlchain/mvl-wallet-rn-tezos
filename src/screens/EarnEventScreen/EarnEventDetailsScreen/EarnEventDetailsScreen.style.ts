import styled from 'styled-components/native';

import { pixel } from '@@utils/ui';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.color.whiteBlack};
`;
