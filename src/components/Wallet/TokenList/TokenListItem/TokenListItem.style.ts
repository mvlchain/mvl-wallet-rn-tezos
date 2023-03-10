import styled from 'styled-components/native';

import { height, width } from '@@utils/ui';

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${height * 16}px 0;
`;

export const IconWrapper = styled.View`
  width: ${width * 36}px;
  height: ${width * 36}px;
`;

export const LabelContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Text = styled.Text`
  text-align: right;
  ${({ theme }) => theme.font.Label.md};
  color: ${({ theme }) => theme.color.blackWhite};
`;

export const ValueContainer = styled.View`
  flex: 1;
`;

export const Name = styled(Text)`
  margin-left: ${width * 18}px;
`;

export const AmountUSD = styled(Text)`
  color: ${({ theme }) => theme.color.grey500};
`;
