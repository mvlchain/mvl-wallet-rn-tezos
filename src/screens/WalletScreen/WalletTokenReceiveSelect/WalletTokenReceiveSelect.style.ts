import styled, { css } from 'styled-components/native';

import { height, SCREEN_HEIGHT, width } from '@@utils/ui';

export const Container = styled.View`
  flex: 1;
`;

export const ListContainer = styled.View`
  flex: 1;
  padding: 0 ${width * 24}px;
  border-bottom-width: ${height * 8}px;
  border-bottom-color: ${({ theme }) => theme.color.grey100Grey900};
`;

export const Title = styled.Text<{ isPaddingBottom?: boolean }>`
  padding-top: ${width * 24}px;
  ${({ isPaddingBottom }) =>
    isPaddingBottom &&
    css`
      padding-bottom: ${width * 24}px;
    `}
  ${({ theme }) => theme.font.Title.sm};
  color: ${({ theme }) => theme.color.blackWhite};
`;

export const RecentContainer = styled.View`
  min-height: ${SCREEN_HEIGHT * 0.25}px;
  padding: 0 ${width * 24}px;
`;

export const RecentEmptyTextWrapper = styled.View`
  flex: 1;
  justify-content: center;
`;

export const RecentEmptyText = styled.Text`
  align-self: center;
  ${({ theme }) => theme.font.Label.md};
  color: ${({ theme }) => theme.color.grey500};
`;
