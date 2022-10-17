import { useNavigation } from '@react-navigation/native';

import { TSettingStackNavigationProps, TSettingStackParamList } from '@@navigation/SettingStack/SettingStack.type';

import { IUseCommonSettingProps } from './useCommonSetting.type';

const useCommonSetting = ({ routeName }: IUseCommonSettingProps) => {
  type StackProps = TSettingStackNavigationProps<typeof routeName>;

  const navigation = useNavigation<StackProps>();

  const onPressSettingMenu = (target: keyof TSettingStackParamList) => {
    navigation.navigate(target);
  };
  return { onPressSettingMenu };
};

export default useCommonSetting;
