import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import { height, width } from '@@utils/ui';

export const SettingMenuContainer = styled.View<{ isThickBorder?: boolean; isLast?: boolean }>`
  flex-direction: row;
  justify-content: space-between;
  padding: ${width * 24}px;
  border-bottom-width: ${({ isThickBorder, isLast }) => (isThickBorder ? 8 : isLast ? 0 : 1) * height}px;
  border-bottom-color: ${({ theme }) => theme.color.grey100Grey900};
`;

export const SettingSubTextContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const SettingMenuText = styled.Text<{ isSub?: boolean }>`
  ${({ theme }) => theme.font.Label.md};
  color: ${({ theme, isSub }) => (isSub ? theme.color.grey500 : theme.color.blackWhite)};
`;

export const inlineStyles = StyleSheet.create({
  marginProvider: { marginLeft: width * 17 },
});
