import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { PERMISSIONS } from 'react-native-permissions';
import { useCameraDevices, Camera } from 'react-native-vision-camera';

import { QRScanOverlay } from '@@assets/image';
import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import useQR from '@@hooks/qr/useQR';
import { requestPermission, getNotGrantedList, openSettingAlert } from '@@utils/permissions/permissions';
import { TRequestPermissionResultType } from '@@utils/permissions/permissions.type';

import * as S from './QRScan.style';

function QRScan() {
  const { frameProcessor, getQRFromGallery } = useQR();
  const { t } = useTranslation();
  const devices = useCameraDevices();
  const device = devices.back;

  useEffect(() => {
    requestPermission({ ios: [PERMISSIONS.IOS.CAMERA], android: [PERMISSIONS.ANDROID.CAMERA] }).then(async (res) => {
      const { DENIED, BLOCKED } = getNotGrantedList(res as TRequestPermissionResultType);
      if (BLOCKED.length !== 0 || DENIED.length !== 0) {
        openSettingAlert({
          title: t('msg_camera_denied_msg'),
          content: t('ios_msg_camera_denied_message'),
        });
      }
    });
  }, []);

  return (
    <S.QRScanContainer>
      <S.QRScanTopContainer>
        <S.QRScanTopText>{t('scan_qr_lbl_description')}</S.QRScanTopText>
      </S.QRScanTopContainer>
      <S.QRScanOverlayWrapper>
        <QRScanOverlay />
      </S.QRScanOverlayWrapper>
      <S.QRScanCameraWrapper>
        {device && <Camera style={{ height: '100%' }} device={device} isActive={true} frameProcessor={frameProcessor} frameProcessorFps={5} />}
      </S.QRScanCameraWrapper>
      <S.QRScanGalleryButtonWrapper>
        <PrimaryButton label='Gallery' onPress={getQRFromGallery} />
      </S.QRScanGalleryButtonWrapper>
    </S.QRScanContainer>
  );
}

export default QRScan;
