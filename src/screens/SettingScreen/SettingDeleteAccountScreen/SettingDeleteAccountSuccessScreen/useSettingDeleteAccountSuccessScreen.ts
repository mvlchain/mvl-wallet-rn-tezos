import { useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';

import { TRootStackNavigationProps } from '@@navigation/RootStack/RootStack.type';
import authStore from '@@store/auth/authStore';
import { AppScreen } from '@@store/auth/authStore.type';
import walletPersistStore from '@@store/wallet/walletPersistStore';

const useSettingDeleteAccountSuccessScreen = () => {
  type rootStackProps = TRootStackNavigationProps<'SETTING_DELETE_ACCOUNT_SUCCESS'>;
  const navigation = useNavigation<rootStackProps>();

  const { resetAuthStore } = authStore();
  const { initWallet } = walletPersistStore();

  const resetAuthState = (appScreen: AppScreen) => {
    resetAuthStore(appScreen);
    initWallet();
  };

  const onPressConfirm = () => {
    resetAuthState(AppScreen.Auth);
  };

  return {
    onPressConfirm,
  };
};

export default useSettingDeleteAccountSuccessScreen;
