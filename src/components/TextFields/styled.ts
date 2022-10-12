import styled from 'styled-components/native';

import { fontSize } from '@@utils/ui';

import * as Type from './type';

//Base
//height를 어떻게 해야하지? 글씨크기를 상대적으로 할거면 모두다 그렇게 해야하는거 아닌가
const inputHeight = fontSize(48) + 'px';
export const BaseInput = styled.TextInput<Type.BaseTextFieldProps>`
  flex: 9;
`;
export const BaseTextFieldInputWrapper = styled.View<Type.ContainerProps>`
  width: 100%;
  flex-direction: row;
  border-style: solid;
  border-width: 1px;
  border-color: ${({ theme, lcColor }) => (lcColor ? lcColor : theme.color.grey100Grey900)};
  border-radius: 8px;
  ${({ theme }) => theme.font.Paragraph.md};
  height: ${inputHeight};
  padding: 14px 16px;
  gap: 8px;
  outline-color: ${({ theme }) => theme.color.primary};
  outline-style: solid;
`;

export const Unit = styled.Text`
  color: ${({ theme }) => theme.color.grey300};
  line-height: 20px;
  margin-left: 8px;
`;

export const BaseTextFieldLabel = styled.Text`
  color: ${({ theme }) => theme.color.blackWhite};
  line-height: 20px;
  margin-bottom: 8px;
`;

export const BaseTextFieldHint = styled.Text`
  color: ${({ theme }) => theme.color.grey500};
  line-height: 20px;
  margin-top: 8px;
`;

export const BaseTextFieldContainer = styled.View``;

//TradeVolume
export const TradeVolumeContainer = styled.View`
  width: 295px;
  background-color: ${({ theme }) => theme.color.white};
  border-style: solid;
  border-width: 1px;
  border-color: ${({ theme }) => theme.color.grey100};
  border-radius: 8px;
  padding: 16px;
`;

export const TradeVolumeTop = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
`;
export const TradeVolumeMiddle = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

export const From = styled.Text`
  ${({ theme }) => theme.font.Paragraph.md};
  color: ${({ theme }) => theme.color.grey500};
  line-height: 20px;
`;

export const Hint = styled.Text`
  ${({ theme }) => theme.font.Paragraph.md};
  color: ${({ theme }) => theme.color.grey500};
  line-height: 20px;
  margin-top: 16px;
`;
export const Token = styled.Text`
  ${({ theme }) => theme.font.Label.md};
  margin-left: 8px;
  line-height: 20px;
`;

export const TradeVolumeInputWrapper = styled.View`
  flex: 1.5;
  flex-direction: row;
  align-items: center;
  margin-right: 16px;
`;
export const TradeVolumeInput = styled.TextInput`
  flex: 1;
  ${({ theme }) => theme.font.Label.md};
  line-height: 20px;
`;
export const SymbolWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;
