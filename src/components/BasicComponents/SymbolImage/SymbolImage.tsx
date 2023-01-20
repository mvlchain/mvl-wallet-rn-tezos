import React from 'react';

import { getWidth } from '@@utils/ui';

import Picture from '../Picture';

import * as S from './SymbolImage.style';
import { ISymbolImageProps } from './SymbolImage.type';

function SymbolImage({ symbolURI, size = 32 }: ISymbolImageProps) {
  return <Picture url={symbolURI} width={getWidth(size)} height={getWidth(size)} />;
}

export default SymbolImage;
