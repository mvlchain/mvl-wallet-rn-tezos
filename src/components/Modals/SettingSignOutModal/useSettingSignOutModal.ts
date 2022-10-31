import { CommonActions, useNavigation } from '@react-navigation/native';

import { useDi } from '@@hooks/common/useDi';
import { ROOT_STACK_ROUTE, TRootStackNavigationProps } from '@@navigation/RootStack/RootStack.type';
import globalModalStore from '@@store/globalModal/globalModalStore';

const useSettingSignOutModall = () => {
  type rootStackProps = TRootStackNavigationProps<'MAIN'>;
  const rootNavigation = useNavigation<rootStackProps>();
  const auth = useDi('AuthService');
  const { modalType, closeModal } = globalModalStore();

  // TODO: 로그아웃 기능 만들기
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

  const onSuccessSignOut = () => {
    rootNavigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: ROOT_STACK_ROUTE.AUTH }],
      })
    );
    closeModal();
  };

  return {
    modalType,
    closeModal,
    onPressSignOut,
  };
};

export default useSettingSignOutModall;
