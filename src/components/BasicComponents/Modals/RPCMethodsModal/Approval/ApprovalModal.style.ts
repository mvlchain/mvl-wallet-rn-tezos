import styled from 'styled-components/native';

import { width } from '@@utils/ui';

export const ValueContainer = styled.View``;

export const AmountText = styled.Text`
  ${({ theme }) => theme.font.Title.lg};
  color: ${({ theme }) => theme.color.blackWhite};
  text-align: center;
  padding: ${width * 24}px 0;
`;

export const ContentContainer = styled.View`
  padding: ${width * 24}px;
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

export const GasContainer = styled(ContentContainer)`
  flex-direction: row;
  justify-content: space-between;
`;

export const GasWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const GasBalanceWrapper = styled.View`
  align-items: flex-end;
  margin-right: ${width * 8}px;
`;
