import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import { Color } from '@@style/colors';
import { width, height, fontSize } from '@@utils/ui';

import * as Type from './TextField.type';

//Base
export const BaseInput = styled.TextInput<Type.IBaseTextFieldProps>`
  flex: 9;
  padding: 0;
  ${({ theme }) => theme.font.Label.md}
  color: ${({ theme }) => theme.color.blackWhite};
  font-size: ${fontSize(16)}px;
  line-height: ${fontSize(20)}px;
`;
export const BaseTextFieldInputWrapper = styled.View<Type.ITextFieldContainerProps>`
  width: 100%;
  flex-direction: row;
  align-items: center;
  border-style: solid;
  border-width: ${width * 1}px;
  border-color: ${({ theme, lcColor }) => (lcColor ? lcColor : theme.color.grey100Grey900)};
  border-radius: ${width * 8}px;
  ${({ theme }) => theme.font.Paragraph.md};
  padding: ${height * 14}px ${width * 16}px;
  gap: ${width * 8}px;
  outline-color: ${({ theme }) => theme.color.primary};
  outline-style: solid;
  //TODO: 임의 설정 디자인 요청해야함
  background-color: ${({ theme, editable }) => (editable ? 'transparent' : theme.color.grey300Grey700)};
`;

export const Unit = styled.Text`
  color: ${({ theme }) => theme.color.grey300};
  line-height: ${height * 20}px;
  margin-left: ${width * 8}px;
`;

export const BaseTextFieldLabel = styled.Text`
  color: ${({ theme }) => theme.color.blackWhite};
  line-height: ${height * 20}px;
  margin-bottom: ${height * 8}px;
`;

export const BaseTextFieldHint = styled.Text`
  color: ${({ theme }) => theme.color.red};
  line-height: ${height * 20}px;
  margin-top: ${height * 8}px;
`;

export const GasHint = styled.Text<{ color: string }>`
  color: ${({ color }) => color};
  line-height: ${height * 20}px;
  margin-top: ${height * 8}px;
`;

export const BaseTextFieldContainer = styled.View``;

//TradeVolume
export const TradeVolumeContainer = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.color.white};
  border-style: solid;
  border-width: ${width * 1}px;
  border-color: ${({ theme }) => theme.color.grey100};
  border-radius: ${width * 8}px;
  padding: ${width * 16}px;
`;

export const TradeVolumeTop = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${height * 16}px;
`;
export const TradeVolumeMiddle = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

export const Label = styled.Text`
  ${({ theme }) => theme.font.Paragraph.md};
  color: ${({ theme }) => theme.color.grey500};
  line-height: ${fontSize(16)}px;
`;

export const Hint = styled.Text`
  ${({ theme }) => theme.font.Paragraph.md};
  color: ${({ theme }) => theme.color.red};
  line-height: ${height * 20}px;
  margin-top: ${height * 16}px;
`;

export const Balance = styled(Hint)`
  color: ${({ theme }) => theme.color.grey500};
`;

export const Token = styled.Text`
  ${({ theme }) => theme.font.Label.md};
  margin-left: ${width * 8}px;
  line-height: ${height * 20}px;
`;

export const TradeVolumeInputWrapper = styled.View`
  flex: 1.5;
  flex-direction: row;
  align-items: center;
  margin-right: ${width * 16}px;
`;
export const TradeVolumeInput = styled.TextInput`
  flex: 1;
  ${({ theme }) => theme.font.Label.md};
  line-height: ${height * 20}px;
`;
export const SymbolWrapper = styled.Pressable`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

//inline
export const inlineStyles = StyleSheet.create({
  marginProvider: { marginLeft: 8 },
});
