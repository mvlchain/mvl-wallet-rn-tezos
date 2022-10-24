import { useNavigation } from '@react-navigation/native';

import { TRootStackNavigationProps, TRootStackParamList } from '@@navigation/RootStack/RootStack.type';

const useCommonSetting = () => {
  type rootStackProps = TRootStackNavigationProps<'MAIN'>;
  const rootNavigation = useNavigation<rootStackProps>();

  const onPressSettingMenu = (target: keyof TRootStackParamList) => {
    rootNavigation.navigate(target);
  };

  return { onPressSettingMenu };
};

export default useCommonSetting;
