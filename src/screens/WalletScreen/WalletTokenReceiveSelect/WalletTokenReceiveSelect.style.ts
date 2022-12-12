import styled from 'styled-components/native';

import { height, width } from '@@utils/ui';

export const Container = styled.View`
  flex: 1;
`;

export const ListContainer = styled.View`
  flex: 1;
  padding: 0 ${width * 24}px;
  border-bottom-width: ${height * 8}px;
  border-bottom-color: ${({ theme }) => theme.color.grey100Grey900};
`;

export const Title = styled.Text`
  padding: ${width * 24}px 0;
  ${({ theme }) => theme.font.Title.sm};
  color: ${({ theme }) => theme.color.blackWhite};
`;

export const RecentContainer = styled.View`
  padding: 0 ${width * 24}px;
`;

export const RecentEmptyText = styled.Text`
  align-self: center;
  padding: ${height * 24}px 0;
  ${({ theme }) => theme.font.Label.md};
  color: ${({ theme }) => theme.color.grey500};
`;
