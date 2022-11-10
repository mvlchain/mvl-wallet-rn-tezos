import styled from 'styled-components/native';

import { height, width } from '@@utils/ui';

export const Container = styled.View`
  padding: ${height * 24}px;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
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

export const BaseCurrency = styled(Value)`
  width: 100%;
  color: ${({ theme }) => theme.color.grey500};
`;
