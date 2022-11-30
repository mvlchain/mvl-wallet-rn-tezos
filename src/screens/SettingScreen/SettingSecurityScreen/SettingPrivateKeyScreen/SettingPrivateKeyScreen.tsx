import React from 'react';

import { useTranslation } from 'react-i18next';

import { TextButton } from '@@components/BasicComponents/Buttons/TextButton';
import Chip from '@@components/BasicComponents/Chip';
import HideContentSection from '@@components/BasicComponents/HideContentSection';
import { height } from '@@utils/ui';

import * as S from './SettingPrivateKeyScreen.style';
import useSettingPrivateKeyScreen from './useSettingPrivateKeyScreen';

function SettingPrivateKeyScreen() {
  const { t } = useTranslation();

  // TODO: 실제 데이터와 연동 필요
  const { type, pkey, wallet, onPressViewPrivatekey, onPressCopyPrivateKey, onPressWalletList } = useSettingPrivateKeyScreen();
  return (
    <S.Container bounces={false}>
      <S.Description>{t('private_key_lbl_description')}</S.Description>
      <Chip isMultiple={wallet?.length > 1} label='Ethereum Wallet' onPress={onPressWalletList} />
      <HideContentSection
        isHide={type === 'hide'}
        onPress={onPressViewPrivatekey}
        btnLabel={t('btn_view_seed_phrase')}
        description={t('seed_phrase_lbl_hint')}
      >
        <S.PKeyContainer>
          <S.PKeyText>{pkey}</S.PKeyText>
        </S.PKeyContainer>
      </HideContentSection>
      {type === 'show' && (
        <>
          {/* TODO: image text button 만들기 */}
          <TextButton
            label='Copy to Clipboard'
            onPress={onPressCopyPrivateKey}
            disabled={false}
            wrapperStyle={{ marginTop: height * 30, marginBottom: height * 18 }}
          />
        </>
      )}
    </S.Container>
  );
}

export default SettingPrivateKeyScreen;
