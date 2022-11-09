import styled from 'styled-components/native';

import { width } from '@@utils/ui';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.color.whiteBlack};
`;

export const Seperator = styled.View`
  border-bottom-color: ${({ theme }) => theme.color.grey100Grey900};
  border-bottom-width: ${width * 1}px;
`;
