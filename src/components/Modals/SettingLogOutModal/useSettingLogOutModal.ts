import { CommonActions, useNavigation } from '@react-navigation/native';

import { ROOT_STACK_ROUTE, TRootStackNavigationProps } from '@@navigation/RootStack/RootStack.type';
import globalModalStore from '@@store/globalModal/globalModalStore';

const useSettingLogOutModal = () => {
  type rootStackProps = TRootStackNavigationProps<'MAIN'>;
  const rootNavigation = useNavigation<rootStackProps>();
  const { modalType, closeModal } = globalModalStore();
  // TODO: 로그아웃 기능 만들기
  const onPressLogOut = () => {
    console.log('LogOut!');
    // LogOut 후에 SignIn으로 이동
    onSuccessLogOut();
  };

  const onSuccessLogOut = () => {
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
    onPressLogOut,
  };
};

export default useSettingLogOutModal;
