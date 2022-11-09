import styled from 'styled-components/native';

import { height, width } from '@@utils/ui';

export const TransactionFeeBoardContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: ${height * 24}px;
`;

const Text = styled.Text`
  ${({ theme }) => theme.font.Label.md};
  font-family: ${({ theme }) => theme.fmRegular};
  line-height: ${height * 20}px;
  color: ${({ theme }) => theme.color.blackWhite};
`;

export const Label = styled(Text)`
  margin-right: ${width * 24}px;
`;

export const Value = styled(Text)`
  text-align: right;
`;
