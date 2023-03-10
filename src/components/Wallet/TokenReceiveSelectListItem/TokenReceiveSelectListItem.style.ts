import styled from 'styled-components/native';

import { height, width } from '@@utils/ui';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${height * 18}px ${width * 2}px;
`;

export const DataContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

export const IconWrapper = styled.View`
  width: ${width * 36}px;
  height: ${width * 36}px;
`;

export const Text = styled.Text`
  flex: 1;
  padding: 0 ${width * 24}px;
  ${({ theme }) => theme.font.Label.md};
  color: ${({ theme }) => theme.color.blackWhite};
`;
