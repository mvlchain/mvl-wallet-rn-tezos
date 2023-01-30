import React from 'react';

import { useTranslation } from 'react-i18next';

import { CopyIcon } from '@@assets/image';
import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import { TextButton } from '@@components/BasicComponents/Buttons/TextButton';
import HideContentSection from '@@components/BasicComponents/HideContentSection';
import Mnemonic from '@@components/BasicComponents/Mnemonic/Mnemonic';
import { height } from '@@utils/ui';

import * as S from '../Mnemonic.style';

import useSeedPhraseScreen from './useSeedPhraseScreen';

function SeedPhraseScreen() {
  const { t } = useTranslation();
  const { type, onlyCopy, onPressViewSeedPhrase, onPressCopyMnemonic, onPressNext } = useSeedPhraseScreen();
  return (
    <S.Container bounces={false}>
      <S.Description>{t('seed_phrase_lbl_description')}</S.Description>
      <HideContentSection
        isHide={type === 'hide'}
        onPress={onPressViewSeedPhrase}
        btnLabel={t('btn_view_seed_phrase')}
        description={t('seed_phrase_lbl_hint')}
      >
        <Mnemonic />
      </HideContentSection>
      {type === 'show' && (
        <>
          {/* TODO: image text button 만들기 */}
          <TextButton
            label='Copy to Clipboard'
            onPress={onPressCopyMnemonic}
            disabled={false}
            wrapperStyle={{ marginTop: height * 30, marginBottom: height * 18 }}
            Icon={CopyIcon}
          />
          {!onlyCopy && <PrimaryButton label='Next' onPress={onPressNext} disabled={false} wrapperStyle={{ marginBottom: height * 30 }} />}
        </>
      )}
    </S.Container>
  );
}

export default SeedPhraseScreen;
