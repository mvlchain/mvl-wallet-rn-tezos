import { useEffect, useRef } from 'react';

import { Animated, StyleSheet } from 'react-native';

import { usePrevious } from '@@hooks/common/usePrevious';
import { width } from '@@utils/ui';

import { Base, BaseProps } from './Base';

function Toggle({ checked, style, ...props }: BaseProps) {
  const checkAnim = useRef(new Animated.Value(0)).current;

  const prevChecked = usePrevious(checked);

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
    <Base {...props} style={[styles.container, checked && styles.checked, style]} checked={checked}>
      <Animated.View
        style={[
          styles.inner,
          {
            // checked animation
            transform: [{ translateX: checkAnim }],
          },
        ]}
      />
    </Base>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width * 42,
    height: width * 26,
    padding: width * 4,
    borderRadius: width * 14,
    backgroundColor: '#E6E6E6',
    overflow: 'hidden',
  },
  checked: {
    backgroundColor: '#FFC400',
  },
  inner: {
    width: width * 18,
    height: width * 18,
    borderRadius: (width * 18) / 2,
    backgroundColor: '#fff',
  },
});

export default Toggle;
