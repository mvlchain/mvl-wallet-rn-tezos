import { useNavigation } from '@react-navigation/native';

import { ROOT_STACK_ROUTE, TRootStackNavigationProps } from '@@navigation/RootStack/RootStack.type';

const useBrowserMainScreen = () => {
  type rootStackProps = TRootStackNavigationProps<'MAIN'>;
  const rootNavigation = useNavigation<rootStackProps>();
  const onPressSearchBtn = () => {
    // TODO: move to search screen
    rootNavigation.navigate(ROOT_STACK_ROUTE.BROWSER_SEARCH);
  };
  return {
    onPressSearchBtn,
  };
};

export default useBrowserMainScreen;
