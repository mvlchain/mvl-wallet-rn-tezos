import React, { PropsWithChildren, useCallback } from 'react';

import { GestureResponderEvent, TouchableOpacity, TouchableOpacityProps } from 'react-native';

export interface BaseProps extends Omit<TouchableOpacityProps, 'onPress' | 'children'> {
  checked: boolean;
  onPress: (checked: boolean, e: GestureResponderEvent) => void;
}

export function Base({ children, checked, ...props }: PropsWithChildren<BaseProps>) {
  const onPress = useCallback((e: GestureResponderEvent) => props.onPress(!checked, e), [props.onPress, checked]);

  return (
    <TouchableOpacity {...props} activeOpacity={1} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
}
