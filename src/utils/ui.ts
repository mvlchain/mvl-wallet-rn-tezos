import { Dimensions, PixelRatio, Platform } from 'react-native';

export const basicDimensions = {
  width: 375,
  height: 812,
};

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen');

/*
 * Resize figma size to fit screen size.
 *
 * ```
 * width * 10(from figma)
 * height * 10(from figma)
 * ```
 */
export const width = +(SCREEN_WIDTH * (1 / basicDimensions.width)).toFixed(2);
export const height = +(SCREEN_HEIGHT * (1 / basicDimensions.height)).toFixed(2);

const scale = SCREEN_WIDTH / basicDimensions.width;

// Resize figma size to fit screen size.
export const fontSize = (size: number) => {
  const newSize = size * scale;

  const normalized = Math.round(PixelRatio.roundToNearestPixel(newSize));

  return Platform.OS === 'ios' ? normalized : normalized - 2;
};
