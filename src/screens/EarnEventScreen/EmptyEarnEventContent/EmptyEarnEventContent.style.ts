import styled from 'styled-components/native';

import { width } from '@@utils/ui';

export const Container = styled.View`
  display: flex;
  position: absolute;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0px ${width * 24}px;
  /* background-color: #0ff; */
`;

export const VerticalLayout = styled.View`
  display: flex;
  flex-direction: column;
  /* background-color: #fff; */
`;

export const EmptyEventLayout = styled.View``;

export const EmptyDescriptionText = styled.Text`
  ${({ theme }) => theme.font.Label.lg};
  line-height: ${width * 24}px;
  text-align: center;
  color: ${({ theme }) => theme.color.blackWhite};
`;
