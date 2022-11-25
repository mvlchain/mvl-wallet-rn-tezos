import styled from 'styled-components/native';

import { width, height } from '@@utils/ui';

export const NumpadsContainer = styled.View`
  width: ${height * 295}px;
  height: ${height * 360}px;
`;

export const NumpadsRow = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  height: ${height * 120}px;
`;

export const EmptyPad = styled.View`
  width: ${height * 72}px;
  height: ${height * 72}px;
`;
