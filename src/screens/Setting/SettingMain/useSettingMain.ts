import { useNavigation } from '@react-navigation/native';

import { TSettingStackNavigationProps, TSettingStackParamList } from '@@navigation/SettingStack/SettingStack.type';

type StackProps = TSettingStackNavigationProps<'SETTING_MAIN'>;

const useSettingMain = () => {
  const navigation = useNavigation<StackProps>();

  const onPressSettingMenu = (target: keyof TSettingStackParamList) => {
    navigation.navigate(target);
  };
  return { onPressSettingMenu };
};

export default useSettingMain;
