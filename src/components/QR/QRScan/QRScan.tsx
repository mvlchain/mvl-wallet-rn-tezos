import * as React from 'react';
import { useState, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { useCameraDevices, Camera } from 'react-native-vision-camera';

import { QRScanOverlay } from '@@assets/image';
import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import useQR from '@@hooks/qr/useQR';

import * as S from './QRScan.style';

function QRScan() {
  const { t } = useTranslation();
  const [hasPermission, setHasPermission] = useState(false);
  const devices = useCameraDevices();
  const device = devices.back;
  const { frameProcessor, getQRFromGallery } = useQR();

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  if (!device || !hasPermission) {
    return <></>;
  }

  return (
    <S.QRScanContainer>
      <S.QRScanTopContainer>
        <S.QRScanTopText>{t('scan_qr_lbl_description')}</S.QRScanTopText>
      </S.QRScanTopContainer>
      <S.QRScanOverlayWrapper>
        <QRScanOverlay />
      </S.QRScanOverlayWrapper>
      <S.QRScanCameraWrapper>
        <Camera style={{ height: '100%' }} device={device} isActive={true} frameProcessor={frameProcessor} frameProcessorFps={5} />
      </S.QRScanCameraWrapper>
      <S.QRScanGalleryButtonWrapper>
        <PrimaryButton label='Gallery' onPress={getQRFromGallery} />
      </S.QRScanGalleryButtonWrapper>
    </S.QRScanContainer>
  );
}

export default QRScan;
