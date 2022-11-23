import styled from 'styled-components/native';

import { width } from '@@utils/ui';

export const Layout = styled.View`
  padding: ${width * 12}px 0px;
`;

export const RoundCornerGroup = styled.View`
  display: flex;
  padding: ${width * 16}px;
  border-style: solid;
  border-width: ${width * 1}px;
  border-color: ${({ theme }) => theme.color.grey100};
  border-radius: ${width * 16}px;
  background-color: #07777777;
`;

export const TimeLabelContainer = styled.View`
  align-self: flex-start;
  padding: ${width * 4}px ${width * 10}px;
  border-radius: ${width * 16}px;
  background-color: ${({ theme }) => theme.color.grey100};
`;

export const TimeLabel = styled.Text`
  ${({ theme }) => theme.font.Label.sm};
  line-height: ${width * 16}px;
  color: ${({ theme }) => theme.color.grey600};
`;

export const ContentsGroup = styled.View`
  flex-direction: row;
  padding-top: ${width * 16}px;
`;

export const Avatar = styled.Image`
  width: ${width * 40}px;
  height: ${width * 40}px;
`;

export const TextGroup = styled.View`
  flex: 1;
  flex-direction: column;
  padding-left: ${width * 16}px;
`;

export const TitleText = styled.Text`
  ${({ theme }) => theme.font.Label.md};
  font-weight: 800;
  line-height: ${width * 20}px;
  color: ${({ theme }) => theme.color.blackWhite};
  background-color: #f00;
`;

export const SubTitleText = styled.Text`
  padding-top: ${width * 4}px;
  ${({ theme }) => theme.font.Label.md};
  font-weight: 800;
  line-height: ${width * 20}px;
  color: ${({ theme }) => theme.color.primary};
  background-color: #00f;
`;
