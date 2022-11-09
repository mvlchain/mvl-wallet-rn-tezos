import React from 'react';

import { t } from 'i18next';
import { Pressable } from 'react-native';

import { MoreIcon, WhiteQrIcon, WhiteScanIcon } from '@@assets/image';
import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import { BUTTON_SIZE } from '@@components/BasicComponents/Buttons/Button.type';
import Chip from '@@components/Chip';
import Jdenticon from '@@components/Jdenticon';
import Address from '@@components/Wallet/Address';
import WalletSelector from '@@components/Wallet/WalletSelector';
import walletPersistStore from '@@store/wallet/walletPersistStore';

import * as S from './Account.style';
import { IAccountProps } from './Account.type';

function Account(props: IAccountProps) {
  return (
    <S.Container>
      <S.Header>
        <Jdenticon value='sample data' />
        <Pressable>
          <MoreIcon />
        </Pressable>
      </S.Header>
      <S.Section>
        <WalletSelector />
        {/* TODO: 실제 네트워크 데이터와 연동하기 */}
        <Chip label='Ethereum Mainnet' chipPosition='left' isMultiple={true} onPress={() => console.log('select network modal')} />
      </S.Section>
      <S.Section>
        <Address />
      </S.Section>
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
