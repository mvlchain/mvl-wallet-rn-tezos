import { Children, cloneElement, isValidElement, PropsWithChildren, useEffect } from 'react';

import { GestureResponderEvent, View, TouchableOpacity, TouchableOpacityProps, StyleSheet, ViewProps } from 'react-native';

import { Label } from '@@components/Typography';

interface ToggleButtonContainerProps<T = any> extends ViewProps {
  value: T;
  onChange: (v: T, e: GestureResponderEvent) => void;
}

interface ToggleButtonItemProps extends Omit<TouchableOpacityProps, 'onPress'> {
  value: string | number | boolean;
  isSelected?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  onChange?: (v: string | number | boolean, e: GestureResponderEvent) => void;
}

function ToggleButtonContainer({ children, value, onChange, style, ...props }: PropsWithChildren<ToggleButtonContainerProps>) {
  useEffect(() => {
    Children.forEach(children, (child) => {
      if ((child as JSX.Element).type.name !== ToggleButtonItem.name) {
        console.error('Only ToggleButtonItem components allowed as children.');
      }
    });
  }, [children]);

  return (
    <View {...props} style={[styles.container, style]}>
      {Children.map(children, (Child, idx) => {
        if (isValidElement(Child)) {
          return cloneElement(Child, {
            isSelected: value === Child.props.value,
            onChange,
            isLast: idx === Children.toArray(children).length - 1,
            isFirst: idx === 0,
          });
        }

        return Child;
      })}
    </View>
  );
}

function ToggleButtonItem({ value, isSelected, isFirst, isLast, onChange, children, ...props }: ToggleButtonItemProps) {
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={1}
      onPress={(e) => onChange?.(value, e)}
      style={[styles.item, isSelected && styles.selected, isFirst && styles.first, isLast && styles.last]}
    >
      {Children.map(children, (Child) => {
        if (typeof Child === 'string') {
          return (
            <Label size='md' color={isSelected ? 'white' : 'grey.300'}>
              {Child}
            </Label>
          );
        }

        return Child;
      })}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E6E6E6',
  },
  selected: {
    backgroundColor: '#0089E7',
    borderColor: '#0089E7',
  },
  first: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  last: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
});

export const ToggleButton = {
  Container: ToggleButtonContainer,
  Item: ToggleButtonItem,
};
