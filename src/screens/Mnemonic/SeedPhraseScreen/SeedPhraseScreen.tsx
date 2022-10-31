import React from 'react';

import { useTranslation } from 'react-i18next';

import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import { TextButton } from '@@components/BasicComponents/Buttons/TextButton';
import Mnemonic from '@@components/Mnemonic/Mnemonic';
import { height } from '@@utils/ui';

import * as S from '../Mnemonic.style';

import useSeedPhraseScreen from './useSeedPhraseScreen';

function SeedPhraseScreen() {
  const { t } = useTranslation();
  const { type, onPressViewSeedPhrase, onPressCopymnemonic, onPressNext } = useSeedPhraseScreen();
  return (
    <S.Container bounces={false}>
      <S.Description>{t('seed_phrase_lbl_description')}</S.Description>
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
