import React from 'react';

import { t } from 'i18next';
import { View, Text } from 'react-native';

import { WhiteQrIcon, WhiteScanIcon } from '@@assets/image';
import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import { BUTTON_SIZE } from '@@components/BasicComponents/Buttons/Button.type';

import * as S from './Account.style';
import { IAccountProps } from './Account.type';

function Account(props: IAccountProps) {
  return (
    <S.Container>
      <S.Header>
        {/* Jdenticon */}
        {/* more icon */}
      </S.Header>
      <S.Section>
        {/* wallet Selector */}
        {/* Chip */}
      </S.Section>
      <S.Section>{/* adress */}</S.Section>
      <S.ButtonContainer>
        <PrimaryButton
          onPress={() => {
            console.log('receive!');
          }}
          label={t('receive')}
          Icon={WhiteQrIcon}
          size={BUTTON_SIZE.SMALL}
          wrapperStyle={S.ButtonWrapper.Button}
        />
        <PrimaryButton
          onPress={() => {
            console.log('send!');
          }}
          label={t('send')}
          Icon={WhiteScanIcon}
          size={BUTTON_SIZE.SMALL}
          wrapperStyle={S.ButtonWrapper.Button}
        />
      </S.ButtonContainer>
    </S.Container>
  );
}

export default Account;
