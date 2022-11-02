import { pinStore } from '@@store/pin/pinStore';

import * as S from './Blurs.style';

function Blurs() {
  const { current } = pinStore();
  return (
    <S.BlursContainer>
      {Array.from({ length: 6 }, (v, i) => {
        return <S.BlurCircle isBlue={current > i} key={'blur' + i} />;
      })}
    </S.BlursContainer>
  );
}

export default Blurs;
