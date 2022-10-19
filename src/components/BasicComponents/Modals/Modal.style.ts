import { StyleSheet } from 'react-native';
import styled, { css } from 'styled-components/native';

import { width } from '@@utils/ui';

import * as Type from './Modal.type';

export const ModalTitle = styled.Text`
  ${({ theme }) => theme.font.Title.sm};
  color: ${({ theme }) => theme.color.blackWhite};
  font-family: ${({ theme }) => theme.fmBold};
  line-height: ${width * 32}px;
`;

export const ModalTopWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  height: ${width * 40}px;
  padding-top: ${width * 8}px;
`;

export const ButtonWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: ${width * 24}px 0;
`;

export const ContentWrapper = styled.View`
  color: ${({ theme }) => theme.color.blackWhite};
  padding: ${width * 24}px 0;
`;

export const Gap = styled.View`
  width: ${width * 16}px;
`;

export const ModalContainer = styled.View<Type.IModalTypeProps>`
  background-color: ${({ theme }) => theme.color.whiteBlack};
  ${({ modalPosition }) =>
    modalPosition === Type.Center
      ? css`
          border-radius: ${width * 24}px;
        `
      : css`
          border-top-left-radius: ${width * 24}px;
          border-top-right-radius: ${width * 24}px;
        `};
  padding: ${width * 24}px;
  padding-bottom: ${({ modalPosition }) => (modalPosition === Type.Center ? '0' : `${width * 34}px`)};
`;

export const inlineStyles = (modalPosition: Type.TModalPosition) =>
  StyleSheet.create({
    modal: {
      justifyContent: 'flex-end',
      margin: modalPosition === Type.Center ? 16 : 0,
    },
    halfbutton: { flex: 1 },
  });

export const BackdropColor = {
  light: undefined,
  dark: 'rgba(255,255,255,0.25)',
};

//image
export const ImageModalContainer = styled(ModalContainer)`
  border-radius: 0;
  padding-top: 0;
`;
export const ImageModalTopWrapper = styled(ModalTopWrapper)`
  position: absolute;
  width: 100%;
  top: ${width * 24}px;
  padding-left: ${width * 24}px;
  padding-right: ${width * 24}px;
`;
export const ImageModalTitle = styled(ModalTitle)`
  color: ${({ theme }) => theme.color.white};
`;
export const ImageWrapper = styled.View`
  border-top-left-radius: ${width * 24}px;
  border-top-right-radius: ${width * 24}px;
  overflow: hidden;
`;

//toast
export const ToastPopupContainer = styled.View`
  width: 100%;
  padding: 0 ${width * 16}px;
`;

export const ToastTextWrapper = styled.View`
  background-color: ${({ theme }) => theme.color.grey800Grey200};
  border-radius: ${width * 24}px;
  padding: ${width * 24}px;
  width: 100%;
`;

export const ToastText = styled.Text`
  ${({ theme }) => theme.font.Paragraph.md}
  color: ${({ theme }) => theme.color.whiteBlack};
`;
