import React from 'react';

import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import SelectMnemonic from '@@components/Mnemonic/SelectMnemonic';
import TypedMnemonic from '@@components/Mnemonic/TypedMnemonic/TypedMnemonic';
import { height } from '@@utils/ui';

import * as S from '../Mnemonic.style';

import useConfirmSeedPhraseScreen from './useConfirmSeedPhraseScreen';

function ConfirmSeedPhraseScreen() {
  const { disabled, onPressConfirmMnemonic } = useConfirmSeedPhraseScreen();
  return (
    <S.Container bounces={false}>
      <S.Description>{`Type each word in the order it was presented to you.`}</S.Description>
      <TypedMnemonic />
      <SelectMnemonic />
      <PrimaryButton label='Next' onPress={onPressConfirmMnemonic} disabled={disabled} wrapperStyle={{ marginBottom: height * 30 }} />
    </S.Container>
  );
}

export default ConfirmSeedPhraseScreen;
