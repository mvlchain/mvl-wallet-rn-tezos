import React from 'react';

import { View } from 'react-native';
function Sample() {
  return <View />;
}
export default Sample;

// import { StyleSheet, Text, TextProps } from 'react-native';

// import { theme } from '../../style/theme';

// type ColorWithoutGrey = Exclude<keyof typeof theme['colors'], 'grey'>;
// type GreyKey = keyof typeof theme['colors']['grey'];
// type GreyColor = `grey.${GreyKey}`;

// interface TextBaseProps<T> extends TextProps {
//   size: keyof T;
//   color?: ColorWithoutGrey | GreyColor; // color or grey.[number]
//   center?: boolean;
// }

// const generator = <T extends any>(styles: T) =>
//   function TextBase({ size, color, style, center, ...props }: TextBaseProps<T>) {
//     return (
//       <Text
//         style={[
//           styles[size],
//           textStyle.font,
//           center && textStyle.center,
//           color && {
//             color: Object.keys(theme.colors).includes(color)
//               ? theme.colors[color as ColorWithoutGrey]
//               : theme.colors.grey[+color.slice(-3) as GreyKey],
//           },
//           style,
//         ]}
//         {...props}
//       />
//     );
//   };

// const textStyle = StyleSheet.create({
//   center: {
//     textAlign: 'center',
//   },
//   font: { fontFamily: 'AppleSDGothicNeo' },
// });

// export const Paragraph = generator(StyleSheet.create(theme.font.Paragraph));
// export const Label = generator(StyleSheet.create(theme.font.Label));
// export const Title = generator(StyleSheet.create(theme.font.Title));
