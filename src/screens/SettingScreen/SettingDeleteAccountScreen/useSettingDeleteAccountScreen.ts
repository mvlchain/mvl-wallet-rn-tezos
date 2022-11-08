import { useNavigation } from '@react-navigation/native';

import { useDi } from '@@hooks/common/useDi';
import { ROOT_STACK_ROUTE, TRootStackNavigationProps } from '@@navigation/RootStack/RootStack.type';
import authStore from '@@store/auth/authStore';

const useSettingDeleteAccountScreen = () => {
  type rootStackProps = TRootStackNavigationProps<'SETTING_DELETE_ACCOUNT'>;
  const rootNavigation = useNavigation<rootStackProps>();
  const auth = useDi('AuthService');
  const { resetAuthStore } = authStore();

  const resetState = () => {
    resetAuthStore();
  };

  const onPressDeleteButton = async () => {
    try {
      console.log('delete account start');
      await auth.deleteAccount();
      onSuccessDelete();
    } catch (error) {
      console.log('delete account Fail');
      console.error('error:  ', error);
    }
  };

  const onSuccessDelete = () => {
    resetState();
    rootNavigation.reset({
      index: 0,
      routes: [{ name: ROOT_STACK_ROUTE.AUTH }, { name: ROOT_STACK_ROUTE.SETTING_DELETE_ACCOUNT_SUCCESS }],
    });
  };

  return { onPressDeleteButton };
};

export default useSettingDeleteAccountScreen;
