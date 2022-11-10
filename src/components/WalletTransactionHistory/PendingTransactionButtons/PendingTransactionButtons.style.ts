import styled from 'styled-components/native';

import { height, width } from '@@utils/ui';

export const Container = styled.View`
  flex-direction: row;
  padding: ${height * 24}px;
`;
export const Gap = styled.View`
  width: ${width * 16}px;
`;
