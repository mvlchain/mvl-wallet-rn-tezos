import styled from 'styled-components/native';

import { height, width } from '@@utils/ui';

export const QRScanTopContainer = styled.View`
  height: ${height * 172}px;
  background-color: ${({ theme }) => theme.color.whiteBlack};
  padding-bottom: ${width * 24}px;
  justify-content: flex-end;
  align-items: center;
`;
export const QRScanTopText = styled.Text`
  ${({ theme }) => theme.font.Paragraph.md}
  line-height: ${height * 24}px;
`;

export const QRScanGalleryButtonWrapper = styled.View`
  position: absolute;
  width: 100%;
  bottom: ${height * 58}px;
  padding-right: ${width * 24}px;
  padding-left: ${width * 24}px;
  z-index: 4;
`;
export const QRScanCameraWrapper = styled.View`
  height: 100%;
`;

export const QRScanContainer = styled.View`
  flex: 1;
`;

export const QRScanOverlayWrapper = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  top: ${height * 172}px;
  z-index: 3;
`;
