import styled from 'styled-components/native';

import { height } from '@@utils/ui';

import { ICustomRadioStylelProps } from './CustomRadio.type';

export const CustomButtonRadio = styled.View<ICustomRadioStylelProps>`
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: ${height * 14}px 0;
  border-style: solid;
  border-width: ${height * 1}px;
  border-color: ${({ theme, checked }) => (checked ? theme.color.primary : theme.color.grey100)};
  background-color: ${({ theme, checked }) => (checked ? theme.color.primary : 'transparent')};
  border-top-left-radius: ${({ isFirst }) => (isFirst ? `${height * 8}px` : 0)};
  border-bottom-left-radius: ${({ isFirst }) => (isFirst ? `${height * 8}px` : 0)};
  border-top-right-radius: ${({ isLast }) => (isLast ? `${height * 8}px` : 0)};
  border-bottom-right-radius: ${({ isLast }) => (isLast ? `${height * 8}px` : 0)};
  border-left-width: ${({ isFirst }) => (isFirst ? `${height * 1}px` : `${height * 0.5}px`)};
  border-right-width: ${({ isLast }) => (isLast ? `${height * 1}px` : `${height * 0.5}px`)};
  ${({ theme }) => theme.font.Label.md};
`;

export const ButtonWrapper = styled.View`
  width: 100%;
  flex-direction: row;
`;
export const CustomRadioButtonWrapper = styled.Pressable`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const CustomRadioText = styled.Text<ICustomRadioStylelProps>`
  color: ${({ theme, checked }) => (checked ? theme.color.white : theme.color.grey300)};
`;
