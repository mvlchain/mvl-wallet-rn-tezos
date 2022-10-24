import { useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { NativeModules } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { runOnJS, useDerivedValue } from 'react-native-reanimated';
import { Frame, useFrameProcessor } from 'react-native-vision-camera';
import { BarcodeFormat, scanBarcodes, Barcode } from 'vision-camera-code-scanner';

import { IQRcode } from '@@components/QR/QRcode/QRcode.type';
import globalModalStore from '@@store/globalModal/globalModalStore';

const useQR = (targetToken?: string) => {
  const [QRs, setQRs] = useState<Barcode[] | null>();
  const { openModal } = globalModalStore();
  const { t } = useTranslation();

  //TODO: figma 에는 작업되어 있지않은데 토큰을 선택하고 qr을 인식하는 경우에 기존 선택한 qr과 인식된 qr코드의 토큰이 다른경우에 유저한테 바꿀건지 다시 인식할건지 물어봐야함
  const isSameToken = (targetToken: string, token: string) => {
    if (targetToken !== token) {
      //confirm 모달
    }
  };

  const goSendPage = (scanResult: any) => {
    console.log(scanResult);

    if (!scanResult.hasOwnProperty('token') || !scanResult.hasOwnProperty('address') || !scanResult.hasOwnProperty('amount')) {
      openModal('TITLE_ONLY', t('dialog_wrong_qr_code_title'));
      return;
    }

    const parsedData = JSON.parse(scanResult);
    console.log(parsedData);
  };

  const getQRFromGallery = async () => {
    try {
      const result = await launchImageLibrary({ mediaType: 'photo' });
      if (!result || result.didCancel || !result.assets || !result.assets[0].uri) {
        return;
      }
      const imgUri = result.assets[0].uri;
      console.log('imgUri', imgUri);
      const scanResult = await NativeModules.QRScanReader.readerQR(imgUri);
      console.log('scanResult', scanResult);
      if (!scanResult.includes('token') || !scanResult.includes('address') || !scanResult.includes('amount')) {
        openModal('TITLE_ONLY', t('dialog_wrong_qr_code_title'));
        return;
      }
      goSendPage(scanResult);
    } catch (err) {
      return;
    }
  };

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE], { checkInverted: true });
    // scan area limit in overlay area
    if (!detectedBarcodes || !detectedBarcodes[0] || !detectedBarcodes[0].cornerPoints) return;
    const [topL, bottomL, bottomR, topR] = detectedBarcodes[0].cornerPoints;
    if (topL.x < frame.width * 0.1 || topL.y < frame.height * 0.12 || bottomR.x > frame.width * 0.9 || bottomR.y > frame.width * 0.6) return;

    runOnJS(goSendPage)(detectedBarcodes[0].content.data);
  }, []);

  return {
    getQRFromGallery,
    frameProcessor,
  };
};

export default useQR;
