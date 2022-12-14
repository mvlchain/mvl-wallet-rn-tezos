import styled from 'styled-components/native';

import { height } from '@@utils/ui';

export const Container = styled.SafeAreaView`
  flex: 1;
`;
export const Header = styled.View`
  justify-content: center;
  align-items: flex-start;
  padding-left: ${height * 24}px;
  width: 100%;
  height: ${height * 56}px;
  background-color: ${({ theme }) => theme.color.whiteBlack};
`;
