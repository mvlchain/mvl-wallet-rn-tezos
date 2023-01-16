import { useState } from 'react';

const useBrowserSearchScreen = () => {
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const data = [
    {
      title: 'test1',
      link: 'www.naver.com',
      onPress: () => console.log('open modal'),
      onPressDelete: () => console.log('deelte'),
      isFocused: isInputFocused,
    },
    {
      title: 'test2',
      link: 'www.google.com',
      onPress: () => console.log('open modal'),
      onPressDelete: () => console.log('deelte'),
      isFocused: isInputFocused,
    },
  ];
  return {
    data,
    isInputFocused,
    setIsInputFocused,
  };
};

export default useBrowserSearchScreen;
