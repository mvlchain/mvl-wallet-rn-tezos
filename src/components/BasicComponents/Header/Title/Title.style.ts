import styled from 'styled-components/native';

export const Title = styled.Text`
  ${({ theme }) => theme.font.Title.xs};
  color: ${({ theme }) => theme.color.blackWhite};
`;
