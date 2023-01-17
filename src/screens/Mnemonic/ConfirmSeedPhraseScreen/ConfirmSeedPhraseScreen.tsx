import React from 'react';

import ErrorBoundary from 'react-native-error-boundary';

import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import ErrorScreenInAuthStack from '@@components/BasicComponents/ErrorBoundary/ErrorScreenInAuthStack';
import SelectMnemonic from '@@components/BasicComponents/Mnemonic/SelectMnemonic';
import TypedMnemonic from '@@components/BasicComponents/Mnemonic/TypedMnemonic/TypedMnemonic';
import { height } from '@@utils/ui';

import * as S from '../Mnemonic.style';

import useConfirmSeedPhraseScreen from './useConfirmSeedPhraseScreen';

function ConfirmSeedPhraseScreen() {
  const { disabled, onPressConfirmMnemonic } = useConfirmSeedPhraseScreen();
  return (
    <ErrorBoundary FallbackComponent={ErrorScreenInAuthStack}>
      <S.Container bounces={false}>
        <S.Description>{`Type each word in the order it was presented to you.`}</S.Description>
        <TypedMnemonic />
        <SelectMnemonic />
        <PrimaryButton label='Next' onPress={onPressConfirmMnemonic} disabled={disabled} wrapperStyle={{ marginBottom: height * 30 }} />
      </S.Container>
    </ErrorBoundary>
  );
}

export default ConfirmSeedPhraseScreen;
