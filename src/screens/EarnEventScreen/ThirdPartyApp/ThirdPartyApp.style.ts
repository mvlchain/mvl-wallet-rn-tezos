import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import { width, height } from '@@utils/ui';

/**
 * inline style for ThirdPartyApp
 */
export const style = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.24,
    shadowRadius: 16,
  },
  connection: {
    flex: 1,
    marginLeft: width * 16,
  },
});

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  border-radius: ${width * 16}px;
  padding: ${height * 12}px ${width * 16}px;
  margin: ${height * 16}px ${width * 16}px;
  background-color: ${({ theme }) => theme.color.whiteBlack};
`;

export const ThirdPartyAvatar = styled.Image`
  width: ${width * 40}px;
  height: ${width * 40}px;
`;

export const ThirdPartyConnectionLayout = styled.View`
  flex: 1;
  flex-direction: column;
  margin-left: ${width * 16}px;
`;

export const ThirdPartyAccountState = styled.Text`
  ${({ theme }) => theme.font.Label.sm};
  line-height: ${height * 16}px;
  color: ${({ theme }) => theme.color.grey500};
`;

export const ThirdPartyDisplayName = styled.Text`
  ${({ theme }) => theme.font.Label.md};
  font-weight: 800;
  line-height: ${height * 20}px;
  margin-top: ${height * 4}px;
  color: ${({ theme }) => theme.color.blackWhite};
`;
