import { StyleSheet } from 'react-native';
import Styled from 'styled-components/native';

import { Center, ModalTypeProps, ModalType } from './type';

export const ModalTitle = Styled.Text`
${({ theme }) => theme.font.Title.sm};
color: ${({ theme }) => theme.color.blackWhite};
fontFamily: ${({ theme }) => theme.fmBold};
lineHeight: 32px;
`;

export const ModalTopWrapper = Styled.View`
flexDirection: row;
justifyContent: space-between;
alignItems: flex-start;
height: 40px;
paddingTop: 8px;
`;

export const ButtonWrapper = Styled.View`
flexDirection: row;
justifyContent: space-between;
margin: 24px 0;
`;

export const ContentWrapper = Styled.View`
color: ${({ theme }) => theme.color.blackWhite};
padding: 24px 0;
`;

export const Gap = Styled.View`
width: 16px;
`;

export const ModalContainer = Styled.View<ModalTypeProps>`
backgroundColor: ${({ theme }) => theme.color.whiteBlack};
borderRadius: 24px;
padding: 24px;
paddingBottom:${({ type }) => (type === Center ? '0' : '34px')};
`;

export const ModalBackDrop = Styled.View<ModalTypeProps>`
flex: 1;
justifyContent:${({ type }) => (type === Center ? 'center' : 'flex-end')};
margin:0;
`;

export const inlineStyles = (type: ModalType) =>
  StyleSheet.create({
    modal: {
      justifyContent: 'flex-end',
      margin: type === Center ? 16 : 0,
    },
    halfbutton: { flex: 1 },
  });
