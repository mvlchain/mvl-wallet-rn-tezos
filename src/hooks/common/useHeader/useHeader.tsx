import { StackNavigationOptions } from '@react-navigation/stack';

import BackButton from '@@components/BasicComponents/Header/BackButton';

import { IUseHeaderProps } from './useHeader.type';

const useHeader = () => {
  const handleStackHeaderOption = ({ title, onPressBack, isDisableBack }: IUseHeaderProps) => {
    const option: StackNavigationOptions = {
      headerLeft: () => <BackButton onPressBack={onPressBack} isDisableBack={isDisableBack} />,
      title,
    };
    return option;
  };

  return {
    handleStackHeaderOption,
  };
};

export default useHeader;
