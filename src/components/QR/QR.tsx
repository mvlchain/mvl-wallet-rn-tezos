import * as React from 'react';
import { useState, useEffect } from 'react';

import { StyleSheet, Text } from 'react-native';
import { useSharedValue, runOnJS, useDerivedValue, useAnimatedReaction } from 'react-native-reanimated';
import { useCameraDevices, Camera, useFrameProcessor } from 'react-native-vision-camera';
import { useScanBarcodes, BarcodeFormat, scanBarcodes, Barcode } from 'vision-camera-code-scanner';

export default function QR() {
  const [hasPermission, setHasPermission] = useState(false);
  const [QRs, setQRs] = useState<Barcode[] | []>([]);
  const devices = useCameraDevices();
  const device = devices.back;

  // const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
  //   checkInverted: true,
  // });

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    console.log('frame', frame);
    const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE], { checkInverted: true });
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
    <>
      <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} frameProcessor={frameProcessor} frameProcessorFps={5} />
      {QRs.map((barcode, idx) => (
        <Text key={idx} style={styles.barcodeTextURL}>
          {barcode.displayValue}
        </Text>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  barcodeTextURL: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});
