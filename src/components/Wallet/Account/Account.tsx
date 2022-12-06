import React from 'react';

import { t } from 'i18next';
import { Pressable } from 'react-native';

import { MoreIconLight, MoreIconDark, WhiteQrIcon, WhiteScanIcon } from '@@assets/image';
import { PrimaryButton } from '@@components/BasicComponents/Buttons/BaseButton';
import { BUTTON_SIZE } from '@@components/BasicComponents/Buttons/Button.type';
import Chip from '@@components/BasicComponents/Chip';
import Jdenticon from '@@components/BasicComponents/Jdenticon';
import Address from '@@components/Wallet/Address';
import WalletSelector from '@@components/Wallet/WalletSelector';
import { useAssetFromTheme } from '@@hooks/useTheme';

import * as S from './Account.style';
import useAccount from './useAccount';

function Account() {
  const { walletName, networkName, address, onPressSwitchNetwork, onPressMore } = useAccount();
  const MoreIcon = useAssetFromTheme(MoreIconLight, MoreIconDark);
  return (
    <S.Container>
      <S.Header>
        <Jdenticon value='sample data' />
        <Pressable onPress={onPressMore}>
          <MoreIcon />
        </Pressable>
      </S.Header>
      <S.Section>
        <WalletSelector walletName={walletName} />
        {/* TODO: 실제 네트워크 데이터와 연동하기 */}
        <Chip label={networkName} chipPosition='left' isMultiple={true} onPress={onPressSwitchNetwork} />
      </S.Section>
      <S.Section>
        <Address address={address} />
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
