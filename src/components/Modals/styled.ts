import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import { Center, ModalTypeProps, ModalType } from './type';

export const ModalTitle = styled.Text`
  ${({ theme }) => theme.font.Title.sm};
  color: ${({ theme }) => theme.color.blackWhite};
  font-family: ${({ theme }) => theme.fmBold};
  line-height: 32px;
`;

export const ModalTopWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  height: 40px;
  padding-top: 8px;
`;

export const ButtonWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 24px 0;
`;

export const ContentWrapper = styled.View`
  color: ${({ theme }) => theme.color.blackWhite};
  padding: 24px 0;
`;

export const Gap = styled.View`
  width: 16px;
`;

export const ModalContainer = styled.View<ModalTypeProps>`
  background-color: ${({ theme }) => theme.color.whiteBlack};
  border-radius: 24px;
  padding: 24px;
  padding-bottom: ${({ type }) => (type === Center ? '0' : '34px')};
`;

export const ModalBackDrop = styled.View<ModalTypeProps>`
  flex: 1;
  justify-content: ${({ type }) => (type === Center ? 'center' : 'flex-end')};
  margin: 0;
`;

export const inlineStyles = (type: ModalType) =>
  StyleSheet.create({
    modal: {
      justifyContent: 'flex-end',
      margin: type === Center ? 16 : 0,
    },
    halfbutton: { flex: 1 },
  });

//image
export const ImageModalContainer = styled(ModalContainer)`
  border-radius: 0;
  padding-top: 0;
`;
export const ImageModalTopWrapper = styled(ModalTopWrapper)`
  position: absolute;
  width: 100%;
  top: 24px;
  padding-left: 24px;
  padding-right: 24px;
`;
export const ImageModalTitle = styled(ModalTitle)`
  color: ${({ theme }) => theme.color.white};
`;
export const ImageWrapper = styled.View`
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  overflow: hidden;
`;

//toast
export const ToastPopupContainer = styled.View`
  width: 100%;
`;

export const ToastTextWrapper = styled.View`
  background-color: ${({ theme }) => theme.color.grey800Grey200};
  border-radius: 24px;
  padding: 24px;
  width: 100%;
`;

export const ToastText = styled.Text`
  ${({ theme }) => theme.font.Paragraph.md}
  color: ${({ theme }) => theme.color.whiteBlack};
`;
