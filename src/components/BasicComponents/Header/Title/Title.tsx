import React from 'react';

import * as S from './Title.style';
import { ITitleProps } from './Title.type';

function Title({ title }: ITitleProps) {
  return <S.TItleText>{title}</S.TItleText>;
}

export default Title;
