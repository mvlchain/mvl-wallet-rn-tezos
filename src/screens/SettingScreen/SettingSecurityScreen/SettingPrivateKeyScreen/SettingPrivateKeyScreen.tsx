import React from 'react';

import { useTranslation } from 'react-i18next';

import { TextButton } from '@@components/BasicComponents/Buttons/TextButton';
import HideContentSection from '@@components/HideContentSection';
import { height } from '@@utils/ui';

import * as S from './SettingPrivateKeyScreen.style';
import useSettingPrivateKeyScreen from './useSettingPrivateKeyScreen';

function SettingPrivateKeyScreen() {
  const { t } = useTranslation();
  const { type, pkey, onPressViewPrivatekey, onPressCopyPrivateKey } = useSettingPrivateKeyScreen();

  return (
    <S.Container bounces={false}>
      <S.Description>{t('private_key_lbl_description')}</S.Description>
      <S.WalletContainer>
        <S.WalletWrapper>
          {/* TODO: wallet name과 연동 필요 */}
          <S.WalletText>Ethereum Wallet</S.WalletText>
        </S.WalletWrapper>
      </S.WalletContainer>
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
