import { PropsWithChildren } from 'react';

import { StyleSheet, View } from 'react-native';

import { width } from '@@utils/ui';

import { Base, BaseProps } from './Base';

function Radio({ checked, style, children, ...props }: PropsWithChildren<BaseProps>) {
  return (
    <Base {...props} style={[styles.container, style]} checked={checked}>
      <View style={[styles.radio, checked && styles.checked]}>
        <View style={[styles.inner, checked && styles.innerChecked]} />
      </View>
      {children}
    </Base>
  );
}

const size = width * 20;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  radio: {
    alignItems: 'center',
    justifyContent: 'center',
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: '#000',
    overflow: 'hidden',
  },
  checked: {
    backgroundColor: '#FFC400',
  },
  inner: {
    width: size * 0.925,
    height: size * 0.925,
    borderRadius: size / 2,
    backgroundColor: '#fff',
  },
  innerChecked: {
    width: size * 0.4,
    height: size * 0.4,
  },
});

export default Radio;
