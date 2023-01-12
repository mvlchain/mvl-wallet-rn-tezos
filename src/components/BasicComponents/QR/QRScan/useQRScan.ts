import { useState, useCallback, useEffect } from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { NativeModules, Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { PERMISSIONS } from 'react-native-permissions';
import { runOnJS } from 'react-native-reanimated';
import { useFrameProcessor } from 'react-native-vision-camera';
import { Barcode, BarcodeFormat, scanBarcodes } from 'vision-camera-code-scanner';

import { MODAL_TYPES } from '@@components/BasicComponents/Modals/GlobalModal';
import { QrCodeLinkTransfer } from '@@domain/auth/QrCodeParser/QrCodeParser.type';
import { TQrCodeLink } from '@@domain/wallet/services/WalletBlockChainService.type';
import { useDi } from '@@hooks/useDi';
import { ROOT_STACK_ROUTE } from '@@navigation/RootStack/RootStack.type';
import { TScanQRRouteProps } from '@@screens/WalletScreen/WalletScanQR/WalletScanQR.type';
import { TTokenSendRootStackProps } from '@@screens/WalletScreen/WalletTokenSend/WalletTokenSend.type';
import globalModalStore from '@@store/globalModal/globalModalStore';
import { TokenDto } from '@@store/token/tokenPersistStore.type';
import { requestPermission, getNotGrantedList, openSettingAlert } from '@@utils/permissions/permissions';
import { TRequestPermissionResultType } from '@@utils/permissions/permissions.type';
import { isNotBlank } from '@@utils/strings';

const useQRScan = (targetToken?: string) => {
  const [isQrCodeDecoding, setIsQrCodeDecoding] = useState<boolean>(false);
  const { openModal } = globalModalStore();
  const { t } = useTranslation();
  const { params } = useRoute<TScanQRRouteProps>();
  const navigation = useNavigation<TTokenSendRootStackProps>();
  const blockChainService = useDi('WalletBlockChainService');

  useEffect(() => {
    requestPermission({ ios: [PERMISSIONS.IOS.CAMERA], android: [PERMISSIONS.ANDROID.CAMERA] }).then(async (res) => {
      const { DENIED, BLOCKED } = getNotGrantedList(res as TRequestPermissionResultType);
      if (BLOCKED.length !== 0) {
        openSettingAlert({
          title: t('msg_camera_denied_msg'),
          content: t('ios_msg_camera_denied_message'),
        });
      }
    });
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

      // Native module from react-native-qr-decode-image-camera library
      // Although this library provides a scan function, since it uses a deprecated library react-native-camera internally,
      // we only use function of reading qr from image
      const qrCode = await NativeModules.QRScanReader.readerQR(imgUri);
      const qrCodeLink = await parseQrCodeLink(qrCode);
      if (qrCodeLink) {
        const { qrCodeContents, token } = qrCodeLink;
        navigateToTokenSender(params?.tokenDto ?? token, qrCodeContents!);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const navigateToTokenSender = (token: TokenDto, qrCodeLink: QrCodeLinkTransfer) => {
    navigation.pop();
    navigation.navigate(ROOT_STACK_ROUTE.WALLET_TOKEN_SEND, {
      tokenDto: token,
      scanData: {
        address: qrCodeLink.address,
        amount: qrCodeLink.amount,
      },
    });
  };

  /**
   * parse QrCode
   * @param qrCode QrCode parsed from image
   * @returns object that has parsed from QrCode image.
   */
  const parseQrCodeLink = async (qrCode: string): Promise<TQrCodeLink | undefined> => {
    const qrCodeLink = await blockChainService.parseQrCodeLink(qrCode);
    if (!qrCodeLink) {
      if (isNotBlank(qrCode)) {
        openModal(MODAL_TYPES.TITLE_ONLY, { title: t('dialog_wrong_qr_code_title') });
      }
      return;
    }
    return qrCodeLink;
  };

  /**
   * Callback that will be called when the QrCode detected from camera
   */
  const onQrCodeDetected = useCallback(
    async (barcodes: Barcode[]) => {
      if (isQrCodeDecoding) {
        return;
      }
      setIsQrCodeDecoding(true);

      const qrCodes: string[] = barcodes.filter((item) => isNotBlank(item.displayValue)).map((item) => item.displayValue!);

      if (qrCodes.length > 0) {
        try {
          const qrCodeLink = await parseQrCodeLink(qrCodes[0]);
          if (qrCodeLink) {
            const { qrCodeContents, token } = qrCodeLink;
            navigateToTokenSender(params?.tokenDto ?? token, qrCodeContents!);
          }
        } catch (e) {
          console.error(e);
        } finally {
          setIsQrCodeDecoding(false);
        }
      }
    },
    [isQrCodeDecoding]
  );

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    const barcodes: Barcode[] = scanBarcodes(frame, [BarcodeFormat.QR_CODE], { checkInverted: true });
    if (barcodes.length > 0) {
      runOnJS(onQrCodeDetected)(barcodes);
    }
  }, []);

  return {
    getQRFromGallery,
    frameProcessor,
  };
};

export default useQRScan;
