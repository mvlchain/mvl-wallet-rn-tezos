import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import { height, width } from '@@utils/ui';

export const Text = styled.Text`
  ${({ theme }) => theme.font.Label.md};
`;

export const Label = styled(Text)`
  color: ${({ theme }) => theme.color.grey500};
`;

export const AddressText = styled(Text)`
  flex-shrink: 1;
  color: ${({ theme }) => theme.color.blackWhite};
`;

export const AddressContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${height * 4}px;
`;

export const styles = StyleSheet.create({
  copyIcon: { marginLeft: width * 24 },
});
