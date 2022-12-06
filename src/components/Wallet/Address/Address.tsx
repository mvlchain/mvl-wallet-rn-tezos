import React from 'react';

import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';

import { CopyIcon } from '@@assets/image';

import * as S from './Address.style';
import { IAddressProps } from './Address.type';
import useAddress from './useAddress';

function Address({ address }: IAddressProps) {
  const { t } = useTranslation();
  const { onPressCopyAddress } = useAddress();

  return (
    <View>
      <S.Label>{t('address')}</S.Label>
      <S.AddressContainer>
        <S.AddressText>{address}</S.AddressText>
        <Pressable onPress={() => onPressCopyAddress(address)}>
          <CopyIcon style={S.styles.copyIcon} />
        </Pressable>
      </S.AddressContainer>
    </View>
  );
}

export default Address;
