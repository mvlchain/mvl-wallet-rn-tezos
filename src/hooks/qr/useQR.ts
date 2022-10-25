import { useState, useCallback, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { NativeModules } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { runOnJS } from 'react-native-reanimated';
import { useFrameProcessor } from 'react-native-vision-camera';
import { BarcodeFormat, scanBarcodes } from 'vision-camera-code-scanner';

import globalModalStore from '@@store/globalModal/globalModalStore';

const useQR = (targetToken?: string) => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const { openModal } = globalModalStore();
  const { t } = useTranslation();

  useEffect(() => {
    goSendPage(scanResult);
  }, [scanResult]);

  //TODO: figma 에는 작업되어 있지않은데 토큰을 선택하고 qr을 인식하는 경우에 기존 선택한 토큰과 인식된 qr코드의 토큰이 다른경우에 유저한테 바꿀건지 다시 인식할건지 물어봐야하지않나?
  const isSameToken = (targetToken: string, token: string) => {
    if (targetToken !== token) {
    }
  };

  const goSendPage = useCallback((scanResult: string | null) => {
    if (!scanResult) return;
    if (!scanResult.includes('token') || !scanResult.includes('address') || !scanResult.includes('amount')) {
      openModal('TITLE_ONLY', t('dialog_wrong_qr_code_title'));
      return;
    }
    const parsedData = JSON.parse(scanResult);
    //TODO: navigation 작업
  }, []);

  const getQRFromGallery = useCallback(async () => {
    try {
      const result = await launchImageLibrary({ mediaType: 'photo' });
      if (!result || result.didCancel || !result.assets || !result.assets[0].uri) {
        return;
      }
      const imgUri = result.assets[0].uri;
      //Native module from react-native-qr-decode-image-camera library
      //Although this library provides a scan function, since it uses a deprecated library react-native-camera internally,
      //we only use function of readind qr from image
      const scanResult = await NativeModules.QRScanReader.readerQR(imgUri);
      setScanResult(scanResult);
    } catch (err) {
      return;
    }
  }, [scanResult]);

  const frameProcessor = useFrameProcessor(
    (frame) => {
      'worklet';
      const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE], { checkInverted: true });
      //Scan area limit to inside overlay area
      if (!detectedBarcodes || !detectedBarcodes[0] || !detectedBarcodes[0].cornerPoints) return;
      const [topL, bottomL, bottomR, topR] = detectedBarcodes[0].cornerPoints;
      if (topL.x < frame.width * 0.1 || topL.y < frame.height * 0.12 || bottomR.x > frame.width * 0.9 || bottomR.y > frame.width * 0.6) return;
      runOnJS(setScanResult)(detectedBarcodes[0].content.data.toString());
    },
    [scanResult]
  );

  return {
    getQRFromGallery,
    frameProcessor,
  };
};

export default useQR;
