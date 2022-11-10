import { useState, useCallback, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { NativeModules, Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { PERMISSIONS } from 'react-native-permissions';
import { runOnJS } from 'react-native-reanimated';
import { useFrameProcessor } from 'react-native-vision-camera';
import { BarcodeFormat, scanBarcodes } from 'vision-camera-code-scanner';

import { MODAL_TYPES } from '@@components/Modals/GlobalModal';
import globalModalStore from '@@store/globalModal/globalModalStore';
import { requestPermission, getNotGrantedList, openSettingAlert } from '@@utils/permissions/permissions';
import { TRequestPermissionResultType } from '@@utils/permissions/permissions.type';

const useQR = (targetToken?: string) => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const { openModal } = globalModalStore();
  const { t } = useTranslation();

  useEffect(() => {
    goSendPage(scanResult);
  }, [scanResult]);

  const goSendPage = useCallback((scanResult: string | null) => {
    if (!scanResult) return;
    if (!scanResult.includes('token') || !scanResult.includes('address') || !scanResult.includes('amount')) {
      openModal(MODAL_TYPES.TITLE_ONLY, t('dialog_wrong_qr_code_title'));
      return;
    }
    const parsedData = JSON.parse(scanResult);
    //TODO: navigation 작업
  }, []);

  const getQRFromGallery = useCallback(async () => {
    try {
      const permissionResult = await requestPermission({
        ios: [PERMISSIONS.IOS.PHOTO_LIBRARY],
        android: [PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE],
      });

      const isIOS = Platform.OS === 'ios';
      const { DENIED, BLOCKED } = getNotGrantedList(permissionResult as TRequestPermissionResultType);
      if (BLOCKED.length !== 0) {
        openSettingAlert({
          title: isIOS ? t('msg_photos_denied_msg') : t('msg_file_and_media_denied_msg'),
          content: isIOS ? t('msg_Photos_denied_msg') : t('android_msg_file_and_media_denied_message'),
        });
        return;
      }

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
  }, []);

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE], { checkInverted: true });
    if (!detectedBarcodes) return;
    //Scan area limit to inside overlay area
    // if (!detectedBarcodes || !detectedBarcodes[0] || !detectedBarcodes[0].cornerPoints) return;
    // const [topL, bottomL, bottomR, topR] = detectedBarcodes[0].cornerPoints;
    // if (topL.x < frame.width * 0.1 || topL.y < frame.height * 0.12 || bottomR.x > frame.width * 0.9 || bottomR.y > frame.width * 0.6) return;
    runOnJS(setScanResult)(detectedBarcodes[0].content.data.toString());
  }, []);

  return {
    getQRFromGallery,
    frameProcessor,
  };
};

export default useQR;
