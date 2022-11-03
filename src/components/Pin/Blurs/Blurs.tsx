import { useEffect, useMemo, useState } from 'react';

import { pinStore } from '@@store/pin/pinStore';

import * as S from './Blurs.style';
import { IBlursProps } from './Blurs.type';

function Blurs({ current }: IBlursProps) {
  const [a, b] = useState<boolean | null>(null);
  const { showError } = pinStore();
  useEffect(() => {
    b(showError);
  }, [showError]);

  useEffect(() => {
    console.log('a:   ', a);
  }, [a]);

  return (
    <S.BlursContainer>
      <S.BlursCircleWrapper>
        {Array.from({ length: 6 }, (v, i) => {
          return <S.BlurCircle isBlue={current > i} key={'blur' + i} showError={showError} />;
        })}
      </S.BlursCircleWrapper>
      {/* <S.ErrorCircleWrapper>
        {Array.from({ length: 6 }, (v, i) => {
          return <S.ErrorCircle isBlue={current > i} key={'error' + i} />;
        })}
      </S.ErrorCircleWrapper> */}
    </S.BlursContainer>
  );
}

export default Blurs;
