import styled, { css } from 'styled-components/native';

import { width } from '@@utils/ui';

import { Center, IModalTypeProps } from '../BaseModal/Modal.type';

export const Container = styled.View<IModalTypeProps>`
  background-color: ${({ theme }) => theme.color.whiteBlack};
  ${({ modalPosition }) =>
    modalPosition === Center
      ? css`
          border-radius: ${width * 24}px;
        `
      : css`
          border-top-left-radius: ${width * 24}px;
          border-top-right-radius: ${width * 24}px;
        `};
  padding-bottom: ${({ modalPosition }) => (modalPosition === Center ? '0' : `${width * 34}px`)};
`;

export const ContentContainer = styled.View`
  background-color: ${({ theme }) => theme.color.whiteBlack};
`;

export const Description = styled.Text`
  padding: ${width * 24}px;
  ${({ theme }) => theme.font.Label.lg};
  color: ${({ theme }) => theme.color.blackWhite};
`;

export const ImageContainer = styled.View`
  width: 100%;
  background-color: red;
  align-items: center;
  border-top-left-radius: ${width * 24}px;
  border-top-right-radius: ${width * 24}px;
  overflow: hidden;
`;
