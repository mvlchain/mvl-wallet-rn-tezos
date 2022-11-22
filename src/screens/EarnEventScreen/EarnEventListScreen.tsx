import React from 'react';

import { View } from 'react-native';
import styled from 'styled-components/native';

/**
 * EarnEventList screen
 *
 *  - get all the active events
 */
export const EarnEventListScreen = () => {
  return <Container />;
};

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.color.whiteBlack};
`;
