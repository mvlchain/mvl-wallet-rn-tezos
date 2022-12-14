import React, { PropsWithChildren, useEffect, useState } from 'react';

import { TouchableWithoutFeedback, Keyboard, View } from 'react-native';

const DismissKeyboardView = ({ children }: PropsWithChildren) => {
  const [showKeyboard, setShowKeyboard] = useState(false);

  useEffect(() => {
    const keyboardDidShow = Keyboard.addListener('keyboardDidShow', () => setShowKeyboard(true));
    const keyboardDidHide = Keyboard.addListener('keyboardDidHide', () => setShowKeyboard(false));

    return () => {
      keyboardDidShow.remove();
      keyboardDidHide.remove();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} disabled={!showKeyboard}>
      {children}
    </TouchableWithoutFeedback>
  );
};
export default DismissKeyboardView;
