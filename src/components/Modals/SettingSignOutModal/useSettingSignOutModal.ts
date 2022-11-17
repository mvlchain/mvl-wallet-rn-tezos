import { useNavigation } from '@react-navigation/native';

import { useDi } from '@@hooks/common/useDi';
import { ROOT_STACK_ROUTE, TRootStackNavigationProps } from '@@navigation/RootStack/RootStack.type';
import authStore from '@@store/auth/authStore';
import globalModalStore from '@@store/globalModal/globalModalStore';
import settingPersistStore from '@@store/setting/settingPersistStore';
import walletPersistStore from '@@store/wallet/walletPersistStore';

const useSettingSignOutModall = () => {
  type rootStackProps = TRootStackNavigationProps<'MAIN'>;
  const rootNavigation = useNavigation<rootStackProps>();
  const auth = useDi('AuthService');
  const { modalType, closeModal } = globalModalStore();
  const { resetAuthStore } = authStore();
  const { initWallet } = walletPersistStore();

  const onPressSignOut = async () => {
    try {
      console.log('SignOut start');
      await auth.signOut();
      onSuccessSignOut();
    } catch (error) {
      console.log('SignOut Fail');
      console.error('error:  ', error);
    }
  };

  const resetState = () => {
    resetAuthStore();
    initWallet();
  };

  const onSuccessSignOut = () => {
    resetState();
    rootNavigation.reset({
      index: 0,
      routes: [{ name: ROOT_STACK_ROUTE.AUTH }],
    });
    closeModal();
  };

  return {
    modalType,
    closeModal,
    onPressSignOut,
  };
};

export default useSettingSignOutModall;
