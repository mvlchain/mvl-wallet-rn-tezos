import React from 'react';

import { SvgUri } from 'react-native-svg';

import { isSvg } from '@@utils/strings';
import { height } from '@@utils/ui';

import * as S from './SymbolImage.style';
import { ISymbolImageProps } from './SymbolImage.type';

function SymbolImage({ symbolURI, size = 32 }: ISymbolImageProps) {
  return isSvg(symbolURI) ? (
    <SvgUri uri={symbolURI} width={height * size} height={height * size} />
  ) : (
    <S.Image source={{ uri: symbolURI }} size={size} />
  );
}

export default SymbolImage;
