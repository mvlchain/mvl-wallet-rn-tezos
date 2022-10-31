import React from 'react';

import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import { TextButton } from '@@components/BasicComponents/Buttons/TextButton';
import Mnemonic from '@@components/Mnemonic/Mnemonic';
import { height } from '@@utils/ui';

import * as S from '../Mnemonic.style';

import useSeedPhraseScreen from './useSeedPhraseScreen';

function SeedPhraseScreen() {
  const { type, onPressViewSeedPhrase, onPressCopymnemonic, onPressNext } = useSeedPhraseScreen();
  return (
    <S.Container bounces={false}>
      <S.Description>
        {`Keep this Seed Phrase in a safe and secret place.\n
        DO NOT reveal this phrase to other people!\n
        Clutch team never request you to share this Seed Phrase.`}
      </S.Description>
      <Mnemonic type={type} onPress={onPressViewSeedPhrase} />
      {type === 'show' && (
        <>
          {/* TODO: image text button 만들기 */}
          <TextButton
            label='Copy to Clipboard'
            onPress={onPressCopymnemonic}
            disabled={false}
            wrapperStyle={{ marginTop: height * 30, marginBottom: height * 18 }}
          />
          <PrimaryButton label='Next' onPress={onPressNext} disabled={false} wrapperStyle={{ marginBottom: height * 30 }} />
        </>
      )}
    </S.Container>
  );
}

export default SeedPhraseScreen;
