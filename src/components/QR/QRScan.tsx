import * as React from 'react';
import { useState, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Text, NativeModules } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { runOnJS } from 'react-native-reanimated';
import { useCameraDevices, Camera, useFrameProcessor } from 'react-native-vision-camera';
import { BarcodeFormat, scanBarcodes, Barcode } from 'vision-camera-code-scanner';

import { QRScanOverlay } from '@@assets/image';
import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';

import * as S from './QRScan.style';

function QRScan() {
  const { t } = useTranslation();
  const [hasPermission, setHasPermission] = useState(false);
  const [QRs, setQRs] = useState<Barcode[] | []>([]);
  const devices = useCameraDevices();
  const device = devices.back;

  const QRreader = (fileUrl: string) => {
    var QRScanReader = NativeModules.QRScanReader;
    return QRScanReader.readerQR(fileUrl);
  };

  //TODO: 추후 훅으로 뺄것
  const openPhoto = async () => {
    console.log('ImagePicker');
    const result = await launchImageLibrary({ mediaType: 'photo' });

    if (!result || result.didCancel || !result.assets || !result.assets[0].uri) {
      return;
    }
    const img = result.assets[0];
    console.log(result);
  };

  //TODO: 스캔한 데이터 처리 코드 완성
  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';

    console.log('frame', frame);

    const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE], { checkInverted: true });

    if (!detectedBarcodes || !detectedBarcodes[0]) return;

    console.log('detectedBarcodes', detectedBarcodes);
    // TODO: 스캔 제한영역 설정
    // const [topL, bottomL, bottomR, topR] = detectedBarcodes[0].cornerPoints;
    // if (topL.x < frame.width * 0.1 || topL.y < frame.height * 0.12 || bottomR.x > frame.width * 0.9 || bottomR.y > frame.width * 0.6) return;

    const scanResult = detectedBarcodes[0].content.data.toString();

    if (!scanResult.includes('token')) return;
    if (!scanResult.includes('address')) return;
    if (!scanResult.includes('amount')) return;

    //TODO: set이 아니라 페이지로 보내야함
    runOnJS(setQRs)(detectedBarcodes);
  }, []);

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
        {QRs.map((barcode, idx) => (
          <Text key={idx}>{barcode.displayValue}</Text>
        ))}
      </S.QRScanCameraWrapper>
      <S.QRScanGalleryButtonWrapper>
        <PrimaryButton label='Gallery' onPress={openPhoto} />
      </S.QRScanGalleryButtonWrapper>
    </S.QRScanContainer>
  );
}

export default QRScan;
