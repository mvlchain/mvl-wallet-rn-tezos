import { CommonActions, useNavigation } from '@react-navigation/native';

import { ROOT_STACK_ROUTE, TRootStackNavigationProps } from '@@navigation/RootStack/RootStack.type';

const useSettingDeleteAccountSuccess = () => {
  type rootStackProps = TRootStackNavigationProps<'SETTING_DELETE_ACCOUNT_SUCCESS'>;
  const rootNavigation = useNavigation<rootStackProps>();
  const onPressConfirm = () => {
    rootNavigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: ROOT_STACK_ROUTE.AUTH }],
      })
    );
  };
  return {
    onPressConfirm,
  };
};

export default useSettingDeleteAccountSuccess;