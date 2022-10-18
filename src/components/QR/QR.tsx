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
    'worklet'; //UI Thread내의 독립된 context에서 동작하는 함수
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
          {/* <Svg style={StyleSheet.absoluteFill} viewBox={getViewBox()}>
            {barcodeResults.map((barcode, idx) => (
              <Polygon key={'poly-' + idx} points={getPointsData(barcode)} fill='lime' stroke='green' opacity='0.5' strokeWidth='1' />
            ))}
            {barcodeResults.map((barcode, idx) => (
              <SVGText
                key={'text-' + idx}
                fill='white'
                stroke='purple'
                fontSize={(getFrameSize()[0] / 400) * 20}
                fontWeight='bold'
                x={barcode.x1}
                y={barcode.y1}
              >
                {barcode.barcodeText}
              </SVGText>
            ))}
          </Svg> */}
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

// const getPointsData = (tr: TextResult) => {
//   var pointsData = tr.x1 + ',' + tr.y1 + ' ';
//   pointsData = pointsData + tr.x2 + ',' + tr.y2 + ' ';
//   pointsData = pointsData + tr.x3 + ',' + tr.y3 + ' ';
//   pointsData = pointsData + tr.x4 + ',' + tr.y4;
//   return pointsData;
// };

// const getViewBox = () => {
//   const frameSize = getFrameSize();
//   const viewBox = '0 0 ' + frameSize[0] + ' ' + frameSize[1];
//   return viewBox;
// };

// const getFrameSize = (): number[] => {
//   let width: number, height: number;
//   if (Platform.OS === 'android') {
//     if (frameWidth > frameHeight && Dimensions.get('window').width > Dimensions.get('window').height) {
//       width = frameWidth;
//       height = frameHeight;
//     } else {
//       console.log('Has rotation');
//       width = frameHeight;
//       height = frameWidth;
//     }
//   } else {
//     width = frameWidth;
//     height = frameHeight;
//   }
//   return [width, height];
// };
