import styled from 'styled-components/native';

import { width, height } from '@@utils/ui';

export interface ImageFrame {
  width?: number;
  height?: number;
}

export const ImageFrame = styled.Image<ImageFrame>`
  width: ${(props) => props.width ?? width * 40}px;
  height: ${(props) => props.height ?? height * 40}px;
`;
