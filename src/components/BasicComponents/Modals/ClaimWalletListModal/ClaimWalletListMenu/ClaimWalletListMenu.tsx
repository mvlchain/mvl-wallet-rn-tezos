import React from 'react';

import { t } from 'i18next';

import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import { BUTTON_SIZE } from '@@components/BasicComponents/Buttons/Button.type';
import Jdenticon from '@@components/BasicComponents/Jdenticon';

import * as S from './ClaimWalletListMenu.style';
import { IClaimWalletListMenuProps } from './ClaimWalletListMenu.type';

function ClaimWalletListMenu({ name, address, onPress }: IClaimWalletListMenuProps) {
  return (
    <S.MenuContainer>
      <Jdenticon value={address} />
      <S.TextContainer>
        <S.MenuText>{name}</S.MenuText>
        <S.AddressText numberOfLines={1} ellipsizeMode='middle'>
          {address}
        </S.AddressText>
      </S.TextContainer>
      <PrimaryButton onPress={onPress} label={t('claim')} size={BUTTON_SIZE.FIT} />
    </S.MenuContainer>
  );
}

export default ClaimWalletListMenu;
