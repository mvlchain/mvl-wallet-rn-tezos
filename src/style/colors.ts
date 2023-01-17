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
  opacityWhite: 'rgba(255,255,255,0.25)',
  opacityBlack: 'rgba(0,0,0,0.25)',
} as const;

export const primary = {
  lightest: '#CCE7FA',
  primary: '#0089E7',
  darkest: '#001B2E',
  medium: '#0060A2',
  highlight: '#7AB6EB',
  // figma에 스타일가이드 텍스트는 #000E17이라고 쓰여있으나 실제로 찍어보면 이 색임
} as const;

export const solid = {
  red: '#FF3F3F',
  yellow: '#FFC400',
  navy: '#082E3D',
  green: '#00D254',
} as const;

const transparent = 'transparent';

const { white, grey100, grey200, grey300, grey400, grey500, grey600, grey700, grey800, grey900, black, opacityWhite, opacityBlack } = mono;
export const colorCombine = {
  whiteGrey300: [white, grey300],
  whiteGrey800: [white, grey800],
  whiteBlack: [white, black],
  opacityBlackWhite: [opacityBlack, opacityWhite],

  grey100Transparent: [grey100, transparent],
  grey100Grey900: [grey100, grey900],
  grey100Grey800: [grey100, grey800],
  grey200Grey800: [grey200, grey800],
  grey200Grey900: [grey200, grey900],
  grey800Grey200: [grey800, grey200],
  grey300White: [grey300, white],
  grey300Grey700: [grey300, grey700],
  grey300Grey800: [grey300, grey800],
  grey900White: [grey900, white],

  blackWhite: [black, white],
  blackGrey100: [black, grey100],

  lightestDarkest: [primary.lightest, primary.darkest],
  primaryDarkest: [primary.primary, primary.darkest],
};

export type ColorCombines = { [key in ColorCombineType]: Color[] };
export type ColorCombine = { [key in ColorCombineType]: Color };
export type ColorCombineType = keyof typeof colorCombine;
export type Color = keyof typeof commonColors;

const lightIndex = 0;
const darkIndex = 1;

const themeColorGenerator = (index: number) => {
  const obj: Record<string, unknown> = {};
  const keyArr = Object.keys(colorCombine) as unknown as ColorCombineType[];
  for (const key of keyArr) {
    obj[key] = colorCombine[key][index] as Color;
  }
  return obj as ColorCombine;
};

export const lightColors = themeColorGenerator(lightIndex);
export const darkColors = themeColorGenerator(darkIndex);

export const commonColors = {
  ...mono,
  ...primary,
  ...solid,
};

export const mmLightColors = {
  background: {
    default: '#FFFFFF',
    alternative: '#F2F4F6',
  },
  text: {
    default: '#24272A',
    alternative: '#535A61',
    muted: '#BBC0C5',
  },
  icon: {
    default: '#24272A',
    alternative: '#6A737D',
    muted: '#BBC0C5',
  },
  border: {
    default: '#BBC0C5',
    muted: '#D6D9DC',
  },
  overlay: {
    default: '#00000099',
    inverse: '#FCFCFC',
    alternative: '#000000CC',
  },
  shadow: {
    default: '#0000001A',
  },
  primary: {
    default: '#037DD6',
    alternative: '#0260A4',
    muted: '#037DD619',
    inverse: '#FCFCFC',
    disabled: '#037DD680',
    shadow: '#037DD633',
  },
  secondary: {
    default: '#F66A0A',
    alternative: '#C65507',
    muted: '#F66A0A19',
    inverse: '#FCFCFC',
    disabled: '#F66A0A80',
  },
  error: {
    default: '#D73A49',
    alternative: '#B92534',
    muted: '#D73A4919',
    inverse: '#FCFCFC',
    disabled: '#D73A4980',
    shadow: '#D73A4966',
  },
  warning: {
    default: '#F66A0A',
    alternative: '#FFC70A',
    muted: '#FFD33D19',
    inverse: '#FCFCFC',
    disabled: '#FFD33D80',
  },
  success: {
    default: '#28A745',
    alternative: '#1E7E34',
    muted: '#28A74519',
    inverse: '#FCFCFC',
    disabled: '#28A74580',
  },
  info: {
    default: '#037DD6',
    alternative: '#0260A4',
    muted: '#037DD619',
    inverse: '#FCFCFC',
    disabled: '#037DD680',
  },
};

export const mmShadows = {
  size: {
    xs: {
      shadowColor: mmLightColors.shadow.default,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 1,
      shadowRadius: 4,
    },
    sm: {
      shadowColor: mmLightColors.shadow.default,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 1,
      shadowRadius: 8,
    },
    md: {
      shadowColor: mmLightColors.shadow.default,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 1,
      shadowRadius: 16,
    },
    lg: {
      shadowColor: mmLightColors.shadow.default,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 1,
      shadowRadius: 40,
    },
  },
};
