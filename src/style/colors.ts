export const mono = {
  white: '#FFFFFF',
  grey100: '#E6E6E6',
  grey200: '#CCCCCC',
  grey300: '#B3B3B3',
  grey400: '#999999',
  grey500: '#808080',
  grey600: '#666666',
  grey700: '#4D4D4D',
  grey800: '#333333',
  grey900: '#1A1A1A',
  black: '#000000',
} as const;

export const primary = {
  lightest: '#E6F3FD',
  primary: '#0089E7',
  darkest: '#001B2E',
  // figma에 스타일가이드 텍스트는 #000E17이라고 쓰여있으나 실제로 찍어보면 이 색임
} as const;

export const solid = {
  red: '#FF3F3F',
  yellow: '#FFC400',
  navy: '#082E3D',
  green: '#00D254',
} as const;

const transparent = 'transparent';

const { white, grey100, grey200, grey300, grey400, grey500, grey600, grey700, grey800, grey900, black } = mono;
export const colorCombine = {
  whiteGrey300: [white, grey300],
  whiteBlack: [white, black],

  grey100Transparent: [grey100, transparent],
  grey100Grey900: [grey100, grey900],
  grey800Grey200: [grey800, grey200],
  grey900Whithe: [grey900, white],
  grey300White: [grey300, white],
  grey300Grey700: [grey300, grey700],
  grey300Grey800: [grey300, grey800],
  grey900White: [grey900, white],

  blackWhite: [black, white],
  blackGrey100: [black, grey100],

  lightestDarkest: [primary.lightest, primary.darkest],
  primaryDarkest: [primary.primary, primary.darkest],
} as const;

export type ColorCombines = { [key in ColorCombineType]: Color[] };
export type ColorCombine = { [key in ColorCombineType]: Color };
export type ColorCombineType = keyof typeof colorCombine;
export type Color = keyof typeof commonColors;
const lightIndex = 0;
const darkIndex = 1;

export const commonColors = {
  ...mono,
  ...primary,
  ...solid,
};

interface ProxeeHandler<T extends object, TOut extends object> {
  get?<K extends keyof TOut>(target: T, p: K, receiver: TOut): TOut[K];
  set?<K extends keyof TOut>(target: T, p: K, value: TOut[K], receiver: TOut): boolean;
}
interface ProxeeConstructor {
  new <T extends object, TOut extends object>(target: T, handler: ProxeeHandler<T, TOut>): TOut;
}
declare let Proxee: ProxeeConstructor;

export const lightColors: Record<ColorCombineType, Color> = new Proxee(colorCombine, {
  get(target, name) {
    return target[name][lightIndex] as Color;
  },
});

export const darkColors: Record<ColorCombineType, Color> = new Proxee(colorCombine, {
  get(target, name) {
    return target[name][darkIndex] as Color;
  },
});
