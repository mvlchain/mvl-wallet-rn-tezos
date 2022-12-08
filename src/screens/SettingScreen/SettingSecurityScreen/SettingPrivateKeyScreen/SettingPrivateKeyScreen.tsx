import React from 'react';

import { useTranslation } from 'react-i18next';

import { TextButton } from '@@components/BasicComponents/Buttons/TextButton';
import Chip from '@@components/BasicComponents/Chip';
import HideContentSection from '@@components/BasicComponents/HideContentSection';
import { getNetworkConfig, getNetworkName } from '@@constants/network.constant';
import { height } from '@@utils/ui';

import * as S from './SettingPrivateKeyScreen.style';
import useSettingPrivateKeyScreen from './useSettingPrivateKeyScreen';

function SettingPrivateKeyScreen() {
  const { t } = useTranslation();

  const {
    type,
    pkey,
    wallet,
    pkeySelectedNetwork,
    pkeyWalletIndex,
    onPressSwitchNetwork,
    onPressViewPrivatekey,
    onPressCopyPrivateKey,
    onPressWalletList,
  } = useSettingPrivateKeyScreen();
  return (
    <S.Container bounces={false}>
      <S.Description>{t('private_key_lbl_description')}</S.Description>
      <Chip isMultiple={true} label={getNetworkConfig(getNetworkName(false, pkeySelectedNetwork)).name} onPress={onPressSwitchNetwork} />
      {wallet.length > 0 && (
        <Chip isMultiple={wallet?.length > 1} label={wallet[pkeyWalletIndex[pkeySelectedNetwork]].name} onPress={onPressWalletList} />
      )}
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
