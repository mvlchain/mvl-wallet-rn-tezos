import styled from 'styled-components/native';

import { height } from '@@utils/ui';

export const SelectChipContainer = styled.View`
  flex: 1;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: baseline;
  margin-top: ${height * 24}px;
  margin-bottom: ${height * 32}px;
`;
