import { StackNavigationOptions } from '@react-navigation/stack';

import BackButton from '@@components/BasicComponents/Header/BackButton';

const useHeader = () => {
  const handleStackHeaderOption = (title: string) => {
    const option: StackNavigationOptions = {
      headerLeft: BackButton,
      title,
    };
    return option;
  };

  return {
    handleStackHeaderOption,
  };
};

export default useHeader;
