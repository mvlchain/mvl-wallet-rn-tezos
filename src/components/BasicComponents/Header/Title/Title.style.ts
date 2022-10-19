import styled from 'styled-components/native';

export const TItleText = styled.Text`
  ${({ theme }) => theme.font.Title.xs};
  color: ${({ theme }) => theme.color.blackWhite};
`;
