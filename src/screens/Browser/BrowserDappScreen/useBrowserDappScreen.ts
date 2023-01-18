import { useNavigation } from '@react-navigation/native';

import { TRootStackNavigationProps } from '@@navigation/RootStack/RootStack.type';

const useBrowserDappScreen = () => {
  type rootStackProps = TRootStackNavigationProps<'MAIN'>;
  const rootNavigation = useNavigation<rootStackProps>();
  const onPressClose = () => {
    rootNavigation.goBack();
  };

  return {
    onPressClose,
  };
};

export default useBrowserDappScreen;
