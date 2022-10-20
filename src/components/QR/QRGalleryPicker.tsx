import * as React from 'react';
import { useState, useEffect } from 'react';

import { StyleSheet, Text, NativeModules, Button, View, ImageBackground, ImageSourcePropType, ImagePickerResult } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { ImagePickerResponse } from 'react-native-image-picker/src/types';

const QRreader = (fileUrl: string) => {
  var QRScanReader = NativeModules.QRScanReader;
  return QRScanReader.readerQR(fileUrl);
};

export default function QRGalleryPicker() {
  const [img, sestImg] = useState<ImageSourcePropType | null>(null);

  const openPhoto = async () => {
    console.log('ImagePicker');
    const result = await launchImageLibrary({ mediaType: 'photo' });

    if (!result || result.didCancel || !result.assets || !result.assets[0].uri) {
      return;
    }

    const img = result.assets[0];

    sestImg(img);
    console.log(result);

    // , (res: ImagePickerResponse) => {s
    //   console.log('Response = ', res);
    //   if (res.didCancel) {
    //     console.log('User cancelled image picker');
    //     //   } else if (res.error) {
    //     //     console.log('ImagePicker Error: ', res.error);
    //     //   } else if (res.customButton) {
    //     //     console.log('User tapped custom button: ', res.customButton);
    //   } else {
    //     // if (res.uri) {
    //     //   var path = res.path;
    //     //   if (!path) {
    //     //     path = res.uri;
    //     //   }
    //     //   QRreader(path)
    //     //     .then((data) => {
    //     //       this.setState({
    //     //         reader: {
    //     //           message: 'message',
    //     //           data: data,
    //     //         },
    //     //       });
    //     //       setTimeout(() => {
    //     //         this.setState({
    //     //           reader: {
    //     //             message: null,
    //     //             data: null,
    //     //           },
    //     //         });
    //     //       }, 10000);
    //     //     })
    //     //     .catch((err) => {
    //     //       this.setState({
    //     //         reader: {
    //     //           message: 'message',
    //     //           data: null,
    //     //         },
    //     //       });
    //     //     });
    //     // }
    //   }
    // });
  };

  return (
    <View style={{ flex: 1, padding: 30 }}>
      <Text>예에이~~큐알코드 페이지에용ㅇㅇ오어얼</Text>
      {img && <ImageBackground source={img} />}
      <Button title='Gallery' onPress={openPhoto} />
    </View>
  );
}
