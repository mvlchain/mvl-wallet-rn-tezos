import styled from 'styled-components/native';

import { height } from '@@utils/ui';

export const PinContainer = styled.View`
  flex: 1;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.color.whiteBlack};
`;

export const LayoutAssistant = styled.View`
  height: ${height * 64}px;
`;

export const PinPasswordMonitorContainer = styled.View`
  width: 100%;
  height: ${height * 168}px;
  padding: ${height * 24}px;
`;

export const PinNumpadContainer = styled.View`
  width: 100%;
  height: ${height * 434}px;
  align-items: center;
`;

export const PinMonitorInnerWrraper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
