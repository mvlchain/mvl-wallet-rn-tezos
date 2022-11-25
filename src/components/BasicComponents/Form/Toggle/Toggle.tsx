import React, { useEffect, useRef } from 'react';

import { Animated } from 'react-native';

import { usePrevious } from '@@hooks/usePrevious';
import settingPersistStore from '@@store/setting/settingPersistStore';
import { Theme, theme } from '@@style/theme';
import { width } from '@@utils/ui';

import { Base, BaseProps } from '../Base';

import * as S from './Toggle.style';

function Toggle({ checked, style, ...props }: BaseProps) {
  const checkAnim = useRef(new Animated.Value(0)).current;

  const prevChecked = usePrevious(checked);
  const { appTheme } = settingPersistStore();

  const myTheme: Theme = theme[appTheme.value];

  useEffect(() => {
    if (prevChecked !== checked) {
      Animated.timing(checkAnim, {
        toValue: checked ? width * 16 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [checked]);

  return (
    <Base {...props} style={[S.styles(myTheme).container, checked && S.styles(myTheme).checked, style]} checked={checked}>
      <S.Inner
        style={[
          {
            // checked animation
            transform: [{ translateX: checkAnim }],
          },
        ]}
      />
    </Base>
  );
}

export default Toggle;
