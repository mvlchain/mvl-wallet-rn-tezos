import usePin from '@@hooks/pin/usePin';

import * as S from './Blurs.style';

function Blurs() {
  const { length } = usePin();
  return (
    <S.BlursContainer>
      {Array.from({ length: 6 }, (v, i) => {
        const current = i + 1;
        return current < length ? <S.BlurPrimaryCircle /> : <S.BlurGreyCircle />;
      })}
    </S.BlursContainer>
  );
}

export default Blurs;
