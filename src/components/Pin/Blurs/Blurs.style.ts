import styled from 'styled-components/native';

import { height } from '@@utils/ui';

export const BlursContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
`;

export const BlurGreyCircle = styled.View`
  width: ${height * 12}px;
  height: ${height * 12}px;
  border-radius: ${height * 6}px;
  margin: ${height * 4}px;
  background-color: ${({ theme }) => theme.color.grey200Grey800};
`;

export const BlurPrimaryCircle = styled(BlurGreyCircle)`
  background-color: ${({ theme }) => theme.color.primary};
`;
