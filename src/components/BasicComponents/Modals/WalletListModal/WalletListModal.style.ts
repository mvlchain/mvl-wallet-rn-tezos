import { FlatList } from 'react-native';
import styled from 'styled-components/native';

import { height } from '@@utils/ui';

export const Container = styled.View`
  height: 100%;
  justify-content: space-between;
`;

export const ModalWrapper = styled.FlatList`` as unknown as typeof FlatList;

export const ButtonContainer = styled.View`
  margin-top: ${height * 16}px;
`;
