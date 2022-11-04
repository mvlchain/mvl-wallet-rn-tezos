import { pinStore } from '@@store/pin/pinStore';

import * as S from './Blurs.style';
import { IBlursProps } from './Blurs.type';

function Blurs({ current }: IBlursProps) {
  const { showError } = pinStore();

  return (
    <S.BlursContainer>
      {Array.from({ length: 6 }, (v, i) => {
        return <S.BlurCircle isBlue={current > i} key={'blur' + i} showError={showError} />;
      })}
    </S.BlursContainer>
  );
}

export default Blurs;
