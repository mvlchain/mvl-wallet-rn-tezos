import { PropsWithChildren } from 'react';

import { StyleSheet, View } from 'react-native';

import { CheckBoxIcon } from '@@assets/image';
import { width } from '@@utils/ui';

import { Base, BaseProps } from './Base';

function Check({ checked, style, children, ...props }: PropsWithChildren<BaseProps>) {
  return (
    <Base {...props} style={[styles.container, style]} checked={checked}>
      <View style={[styles.checkbox, checked && styles.checked]}>{checked && <CheckBoxIcon width={size * 0.6} height={size * 0.4} />}</View>
      {children}
    </Base>
  );
}

const size = width * 20;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: size,
    height: size,
    borderRadius: size * 0.2,
    borderWidth: size * 0.075,
    borderColor: '#000',
    overflow: 'hidden',
    marginRight: width * 18,
  },
  checked: {
    borderColor: '#FFC400',
    backgroundColor: '#FFC400',
  },
});

export default Check;
