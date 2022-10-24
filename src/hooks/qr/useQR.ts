import { useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { NativeModules } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { runOnJS } from 'react-native-reanimated';
import { Frame, useFrameProcessor } from 'react-native-vision-camera';
import { BarcodeFormat, scanBarcodes, Barcode } from 'vision-camera-code-scanner';

import globalModalStore from '@@store/globalModal/globalModalStore';

const useQR = (targetToken?: string) => {
  const [QRs, setQRs] = useState<Barcode[] | []>([]);
  const { openModal } = globalModalStore();
  const { navigation } = useNavigation<any>();

  const goSendPage = () => {
    navigation.navigate('send');
  };

  const openGallery = async () => {
    try {
      const result = await launchImageLibrary({ mediaType: 'photo' });

      if (result.didCancel) {
        //TODO: modal "user cancel"
        return;
      }
      if (!result || !result.assets || !result.assets[0].uri) {
        //TODO: setting과 합친 후 모달열기 "result.errormessage or error gallery"
        return;
      }
      const imgUri = result.assets[0].uri;
      return imgUri;
    } catch (err) {
      //TODO: setting과 합친 후 모달열기 err.message
      return;
    }
  };

  const QRreader = async (fileUrl: string) => {
    try {
      var QRScanReader = NativeModules.QRScanReader;
      return await QRScanReader.readerQR(fileUrl);
    } catch (err) {
      //TODO: setting과 합친 후 모달열기 err.message
      return;
    }
  };

  const isSameToken = (targetToken: string, token: string) => {
    if (targetToken !== token) {
      //confirm 모달
    }
  };

  const isValidQR = (readOrScanData: string) => {
    if (!readOrScanData.includes('token')) return false;
    if (!readOrScanData.includes('address')) return false;
    if (!readOrScanData.includes('amount')) return false;
    return true;
  };

  const getQRFromGallery = async () => {
    try {
      const imgUri = await openGallery();
      const scanResult = await QRreader(imgUri as string);
    } catch (err) {
      //TODO: setting과 합친 후 모달열기 err.message
      return;
    }
  };

  const isInSafeScanArea = (frame: Frame, barcodes: Barcode[]) => {
    if (!barcodes || !barcodes[0].cornerPoints) return;
    // TODO: 스캔 제한영역 설정
    const [topL, bottomL, bottomR, topR] = barcodes[0].cornerPoints;
    if (topL.x < frame.width * 0.1 || topL.y < frame.height * 0.12 || bottomR.x > frame.width * 0.9 || bottomR.y > frame.width * 0.6) return false;
    return true;
  };

  const scan = useFrameProcessor((frame) => {
    'worklet';
    const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE], { checkInverted: true });
    if (!isInSafeScanArea(frame, detectedBarcodes)) {
      return;
    }
    const scanResult = detectedBarcodes[0].content.data.toString();
    if (!isValidQR(scanResult)) {
      return;
    }
    //TODO: set이 아니라 페이지로 보내야함
    runOnJS(setQRs)(detectedBarcodes);
  }, []);

  return {
    getQRFromGallery,
    scan,
  };
};

export default useQR;
