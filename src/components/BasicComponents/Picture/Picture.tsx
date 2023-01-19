import React from 'react';

import { View } from 'react-native';
import { Mask, Rect, Svg, SvgUri } from 'react-native-svg';

import { theme } from '@@style/theme';
import { isSvg } from '@@utils/strings';

import * as S from './Picture.style';
import { IPictureProps } from './Picture.type';

/**
 * SVG이미지와 다른 이미지들을 구분하여 선택적으로 보여 줄 수 있는 컴포넌트
 */
const Picture = ({ url, width, height }: IPictureProps) => {
  return isSvg(url) ? <SvgUri uri={url} width={width} height={height} /> : <S.ImageFrame source={{ uri: url }} width={width} height={height} />;
};

// cannot read AWS image with this approach. so it' not available at the moment.
// but this can be improved by adding Amplify lib
// const isSvgFromFile = async (imageUri: string): Promise<boolean> => {
//   try {
//     console.log(`isSvgFromFile> starts imageUri: ${imageUri}`)
//     const data = await RNFS.readFile(imageUri, 'utf8');
//     if (data.startsWith('<svg') || data.startsWith('<?xml')) {
//         return true;
//     }
//     return false;
//   } catch (error) {
//     console.log(`isSvgFromFile> error: ${error}`)
//     return false;
//   }
// }

export default Picture;
