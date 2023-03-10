import styled from 'styled-components/native';

import { width } from '@@utils/ui';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.color.whiteBlack};
  border-bottom-width: ${width * 1}px;
  border-bottom-color: ${({ theme }) => theme.color.grey100};
`;

export const ContentContainer = styled.View`
  padding: ${width * 16}px ${width * 24}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.Text<{ isHighlight?: boolean }>`
  ${({ theme }) => theme.font.Label.md};
  color: ${({ theme, isHighlight }) => (isHighlight ? theme.color.primary : theme.color.blackWhite)};
  margin-bottom: ${width * 5}px;
`;

export const Link = styled(Title)`
  color: ${({ theme }) => theme.color.grey500};
`;
