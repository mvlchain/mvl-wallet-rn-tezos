import { StyleSheet } from 'react-native';
import styled, { css } from 'styled-components/native';

import * as Type from '@@components/BasicComponents/Modals/BaseModal/Modal.type';
import { width, height } from '@@utils/ui';

export const ModalContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.color.whiteBlack};
  border-radius: ${width * 24}px;
  padding: ${width * 24}px;
  padding-bottom: 0px;
`;

export const ContentWrapper = styled.View`
  flex: 1;
  color: ${({ theme }) => theme.color.blackWhite};
  margin: 0px -${width * 24}px;
`;

export const ButtonWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: ${width * 24}px 0;
`;

export const Gap = styled.View`
  width: ${width * 16}px;
`;

export const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-start',
    margin: width * 16,
  },
  halfbutton: { flex: 1 },
});

export const BackdropColor = {
  light: undefined,
  dark: 'rgba(255,255,255,0.25)',
};

export const Label = styled.Text`
  padding: ${width * 6}px 0;
  ${({ theme }) => theme.font.Paragraph.lg}
  color: ${({ theme }) => theme.color.blackWhite}
`;
