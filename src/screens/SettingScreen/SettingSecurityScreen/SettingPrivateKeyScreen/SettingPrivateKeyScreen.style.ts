import styled from 'styled-components/native';

import { width, height } from '@@utils/ui';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 0 ${width * 24}px;
  background-color: ${({ theme }) => theme.color.whiteBlack};
`;

export const Description = styled.Text`
  text-align: center;
  ${({ theme }) => theme.font.Paragraph.md}
  color: ${({ theme }) => theme.color.blackWhite};
`;

export const WalletContainer = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  align-items: baseline;
  justify-content: center;
  margin-top: ${height * 16}px;
`;

export const WalletWrapper = styled.View`
  // TODO: 여기 시안은 #CCE7FA색으로 primary Lightest로 적혀있는데 컬러코드가 다름. 다른 버튼과 확인 필요
  padding: ${height * 4}px ${width * 12}px;
  border-radius: ${width * 100}px;
  background-color: ${({ theme }) => theme.color.lightest};
`;

export const WalletText = styled.Text`
  ${({ theme }) => theme.font.Label.sm};
  color: ${({ theme }) => theme.color.primary};
`;

export const PKeyContainer = styled.View`
  width: ${width * 295}px;
  height: ${height * 256}px;
  background-color: ${({ theme }) => theme.color.white};
`;

export const PKeyText = styled.Text`
  padding: ${width * 8}px;
  ${({ theme }) => theme.font.Label.md};
`;
