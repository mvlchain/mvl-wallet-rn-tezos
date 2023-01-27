import styled from 'styled-components/native';

import { width } from '@@utils/ui';

export const ScrollContainer = styled.ScrollView`
  height: 70%;
`;

export const ContentContainer = styled.View`
  padding: ${width * 4}px ${width * 18}px;
`;

export const BasicText = styled.Text`
  ${({ theme }) => theme.font.Label.md};
`;

export const GreyText = styled(BasicText)`
  color: ${({ theme }) => theme.color.grey500};
`;

export const BlackText = styled(BasicText)`
  color: ${({ theme }) => theme.color.blackWhite};
`;
