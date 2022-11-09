import styled from 'styled-components/native';

import { height, width } from '@@utils/ui';

export const QRScanTopContainer = styled.View`
  justify-content: flex-end;
  align-items: center;
  height: ${height * 72}px;
  padding-bottom: ${width * 24}px;
  background-color: ${({ theme }) => theme.color.whiteBlack};
`;
export const QRScanTopText = styled.Text`
  ${({ theme }) => theme.font.Paragraph.md}
  line-height: ${height * 24}px;
  color: ${({ theme }) => theme.color.blackWhite};
`;

export const QRScanGalleryButtonWrapper = styled.View`
  position: absolute;
  bottom: ${height * 58}px;
  z-index: 4;
  width: 100%;
  padding-right: ${width * 24}px;
  padding-left: ${width * 24}px;
`;
export const QRScanCameraWrapper = styled.View`
  height: 100%;
`;

export const QRScanContainer = styled.View`
  flex: 1;
`;

export const QRScanOverlayWrapper = styled.View`
  position: absolute;
  top: ${height * 172}px;
  z-index: 3;
  width: 100%;
  height: 100%;
`;
