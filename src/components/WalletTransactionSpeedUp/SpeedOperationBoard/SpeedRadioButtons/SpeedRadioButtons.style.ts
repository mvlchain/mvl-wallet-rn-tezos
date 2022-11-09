import styled from 'styled-components/native';

import { height } from '@@utils/ui';

export const Button = styled.Button`
  flex: 1;
`;

export const Low = styled(Button)``;
export const Middle = styled(Button)``;
export const High = styled(Button)``;
export const ButtonWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: ${height * 8}px;
`;
