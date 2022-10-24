import React from 'react';

import * as S from './Title.style';

function Title({ label }: { label: string }) {
  return <S.Title>{label}</S.Title>;
}

export default Title;
