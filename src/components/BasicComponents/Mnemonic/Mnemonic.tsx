import React from 'react';

import * as S from './Mnemonic.style';
import MnemonicChip from './MnemonicChip/MnemonicChip';
import useMnemonic from './useMnemonic';

function Mnemonic() {
  const { mnemonicArr } = useMnemonic();

  return (
    <S.ChipContainer>
      <S.Column>
        {mnemonicArr.length > 0 &&
          mnemonicArr.slice(0, 12).map((mnemonic, index) => <MnemonicChip key={`${mnemonic}_${index}`} label={mnemonic} index={index + 1} />)}
      </S.Column>
      <S.Column>
        {mnemonicArr.length > 0 &&
          mnemonicArr.slice(12, 24).map((mnemonic, index) => <MnemonicChip key={`${mnemonic}_${index + 12}`} label={mnemonic} index={index + 13} />)}
      </S.Column>
    </S.ChipContainer>
  );
}

export default Mnemonic;
