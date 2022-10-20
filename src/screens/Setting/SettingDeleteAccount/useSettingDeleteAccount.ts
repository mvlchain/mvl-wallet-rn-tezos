import { CommonActions, useNavigation } from '@react-navigation/native';

import { ROOT_STACK_ROUTE, TRootStackNavigationProps } from '@@navigation/RootStack/RootStack.type';

const useSettingDeleteAccount = () => {
  type rootStackProps = TRootStackNavigationProps<'SETTING_DELETE_ACCOUNT'>;
  const rootNavigation = useNavigation<rootStackProps>();
  const onPressDeleteButton = () => {
    // TODO: delete Account 기능 붙이기
    console.log('delete account');
    // delete 후에 success로 이동
    onSuccessDelete();
  };

  const onSuccessDelete = () => {
    rootNavigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: ROOT_STACK_ROUTE.SETTING_DELETE_ACCOUNT_SUCCESS }],
      })
    );
  };

  return { onPressDeleteButton };
};

export default useSettingDeleteAccount;
