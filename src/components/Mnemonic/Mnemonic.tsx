import React, { useEffect, useState } from 'react';

import styled from 'styled-components/native';

import { HideLight } from '@@assets/image';
import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import { height } from '@@utils/ui';

import * as S from './Mnemonic.style';
import { IMnemonicProps } from './Mnemonic.type';
import MnemonicChip from './MnemonicChip/MnemonicChip';
import useMnemonic from './useMnemonic';

function Mnemonic({ type, mnemonic }: IMnemonicProps) {
  const { mnemonicArr } = useMnemonic({ mnemonic });

  return (
    <S.MnemonicContainer>
      {type === 'hide' ? (
        <>
          <S.ShowMnemonicText>Make sure no one is watching your screen.</S.ShowMnemonicText>
          <HideLight />
          <PrimaryButton
            label='View Seed Phrase'
            disabled={false}
            onPress={() => {
              console.log('hello');
            }}
            wrapperStyle={{ marginTop: height * 56 }}
          />
        </>
      ) : (
        <S.ChipContainer>
          <S.Column>
            {mnemonicArr.length > 0 &&
              mnemonicArr.slice(0, 12).map((mnemonic, index) => <MnemonicChip key={`${mnemonic}_${index}`} label={mnemonic} index={index + 1} />)}
          </S.Column>
          <S.Column>
            {mnemonicArr.length > 0 &&
              mnemonicArr
                .slice(12, 24)
                .map((mnemonic, index) => <MnemonicChip key={`${mnemonic}_${index + 12}`} label={mnemonic} index={index + 13} />)}
          </S.Column>
        </S.ChipContainer>
      )}
    </S.MnemonicContainer>
  );
}

export default Mnemonic;
