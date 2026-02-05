import { recipe, RecipeVariants } from '@/design-system/utils/recipes';
import { TextStyle } from 'react-native';

type Size = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

type Typography = 'thin' | 'light' | 'regular' | 'medium' | 'semibold' | 'bold';

type Font =
  | 'Pretendard-Thin'
  | 'Pretendard-Light'
  | 'Pretendard-Medium'
  | 'Pretendard-Regular'
  | 'Pretendard-SemiBold'
  | 'Pretendard-Bold';

const dynamicTypeSizes = {
  xs: {
    thin: {
      fontFamily: 'Pretendard-Thin',
      fontWeight: 'thin',
      fontSize: 12,
      lineHeight: 18,
    },
    light: {
      fontFamily: 'Pretendard-Light',
      fontWeight: 'light',
      fontSize: 12,
      lineHeight: 18,
    },
    regular: {
      fontFamily: 'Pretendard-Regular',
      fontWeight: 'regular',
      fontSize: 12,
      lineHeight: 18,
    },
    medium: {
      fontFamily: 'Pretendard-Medium',
      fontWeight: 'medium',
      fontSize: 12,
      lineHeight: 18,
    },
    semibold: {
      fontFamily: 'Pretendard-SemiBold',
      fontWeight: 'semibold',
      fontSize: 12,
      lineHeight: 18,
    },
    bold: {
      fontFamily: 'Pretendard-Bold',
      fontWeight: 'bold',
      fontSize: 12,
      lineHeight: 18,
    },
  },
  sm: {
    thin: {
      fontFamily: 'Pretendard-Thin',
      fontWeight: 'thin',
      fontSize: 14,
      lineHeight: 22,
    },
    light: {
      fontFamily: 'Pretendard-Light',
      fontWeight: 'light',
      fontSize: 14,
      lineHeight: 22,
    },
    regular: {
      fontFamily: 'Pretendard-Regular',
      fontWeight: 'regular',
      fontSize: 14,
      lineHeight: 22,
    },
    medium: {
      fontFamily: 'Pretendard-Medium',
      fontWeight: 'medium',
      fontSize: 14,
      lineHeight: 22,
    },
    semibold: {
      fontFamily: 'Pretendard-SemiBold',
      fontWeight: 'semibold',
      fontSize: 14,
      lineHeight: 22,
    },
    bold: {
      fontFamily: 'Pretendard-Bold',
      fontWeight: 'bold',
      fontSize: 14,
      lineHeight: 22,
    },
  },
  base: {
    thin: {
      fontFamily: 'Pretendard-Thin',
      fontWeight: 'thin',
      fontSize: 16,
      lineHeight: 24,
    },
    light: {
      fontFamily: 'Pretendard-Light',
      fontWeight: 'light',
      fontSize: 16,
      lineHeight: 24,
    },
    regular: {
      fontFamily: 'Pretendard-Regular',
      fontWeight: 'regular',
      fontSize: 16,
      lineHeight: 24,
    },
    medium: {
      fontFamily: 'Pretendard-Medium',
      fontWeight: 'medium',
      fontSize: 16,
      lineHeight: 24,
    },
    semibold: {
      fontFamily: 'Pretendard-SemiBold',
      fontWeight: 'semibold',
      fontSize: 16,
      lineHeight: 24,
    },
    bold: {
      fontFamily: 'Pretendard-Bold',
      fontWeight: 'bold',
      fontSize: 16,
      lineHeight: 24,
    },
  },
  lg: {
    thin: {
      fontFamily: 'Pretendard-Thin',
      fontWeight: 'thin',
      fontSize: 18,
      lineHeight: 28,
    },
    light: {
      fontFamily: 'Pretendard-Light',
      fontWeight: 'light',
      fontSize: 18,
      lineHeight: 28,
    },
    regular: {
      fontFamily: 'Pretendard-Regular',
      fontWeight: 'regular',
      fontSize: 18,
      lineHeight: 28,
    },
    medium: {
      fontFamily: 'Pretendard-Medium',
      fontWeight: 'medium',
      fontSize: 18,
      lineHeight: 28,
    },
    semibold: {
      fontFamily: 'Pretendard-SemiBold',
      fontWeight: 'semibold',
      fontSize: 18,
      lineHeight: 28,
    },
    bold: {
      fontFamily: 'Pretendard-Bold',
      fontWeight: 'bold',
      fontSize: 18,
      lineHeight: 28,
    },
  },
  xl: {
    thin: {
      fontFamily: 'Pretendard-Thin',
      fontWeight: 'thin',
      fontSize: 20,
      lineHeight: 32,
    },
    light: {
      fontFamily: 'Pretendard-Light',
      fontWeight: 'light',
      fontSize: 20,
      lineHeight: 32,
    },
    regular: {
      fontFamily: 'Pretendard-Regular',
      fontWeight: 'regular',
      fontSize: 20,
      lineHeight: 32,
    },
    medium: {
      fontFamily: 'Pretendard-Medium',
      fontWeight: 'medium',
      fontSize: 20,
      lineHeight: 32,
    },
    semibold: {
      fontFamily: 'Pretendard-SemiBold',
      fontWeight: 'semibold',
      fontSize: 20,
      lineHeight: 32,
    },
    bold: {
      fontFamily: 'Pretendard-Bold',
      fontWeight: 'bold',
      fontSize: 20,
      lineHeight: 32,
    },
  },
  '2xl': {
    thin: {
      fontFamily: 'Pretendard-Thin',
      fontWeight: 'thin',
      fontSize: 24,
      lineHeight: 38,
    },
    light: {
      fontFamily: 'Pretendard-Light',
      fontWeight: 'light',
      fontSize: 24,
      lineHeight: 38,
    },
    regular: {
      fontFamily: 'Pretendard-Regular',
      fontWeight: 'regular',
      fontSize: 24,
      lineHeight: 38,
    },
    medium: {
      fontFamily: 'Pretendard-Medium',
      fontWeight: 'medium',
      fontSize: 24,
      lineHeight: 38,
    },
    semibold: {
      fontFamily: 'Pretendard-SemiBold',
      fontWeight: 'semibold',
      fontSize: 24,
      lineHeight: 38,
    },
    bold: {
      fontFamily: 'Pretendard-Bold',
      fontWeight: 'bold',
      fontSize: 24,
      lineHeight: 38,
    },
  },
  '3xl': {
    thin: {
      fontFamily: 'Pretendard-Thin',
      fontWeight: 'thin',
      fontSize: 30,
      lineHeight: 42,
    },
    light: {
      fontFamily: 'Pretendard-Light',
      fontWeight: 'light',
      fontSize: 30,
      lineHeight: 42,
    },
    regular: {
      fontFamily: 'Pretendard-Regular',
      fontWeight: 'regular',
      fontSize: 30,
      lineHeight: 42,
    },
    medium: {
      fontFamily: 'Pretendard-Medium',
      fontWeight: 'medium',
      fontSize: 30,
      lineHeight: 42,
    },
    semibold: {
      fontFamily: 'Pretendard-SemiBold',
      fontWeight: 'semibold',
      fontSize: 30,
      lineHeight: 42,
    },
    bold: {
      fontFamily: 'Pretendard-Bold',
      fontWeight: 'bold',
      fontSize: 30,
      lineHeight: 42,
    },
  },
  '4xl': {
    thin: {
      fontFamily: 'Pretendard-Thin',
      fontWeight: 'thin',
      fontSize: 36,
      lineHeight: 52,
    },
    light: {
      fontFamily: 'Pretendard-Light',
      fontWeight: 'light',
      fontSize: 36,
      lineHeight: 52,
    },
    regular: {
      fontFamily: 'Pretendard-Regular',
      fontWeight: 'regular',
      fontSize: 36,
      lineHeight: 52,
    },
    medium: {
      fontFamily: 'Pretendard-Medium',
      fontWeight: 'medium',
      fontSize: 36,
      lineHeight: 52,
    },
    semibold: {
      fontFamily: 'Pretendard-SemiBold',
      fontWeight: 'semibold',
      fontSize: 36,
      lineHeight: 52,
    },
    bold: {
      fontFamily: 'Pretendard-Bold',
      fontWeight: 'bold',
      fontSize: 36,
      lineHeight: 52,
    },
  },
} satisfies Record<Size, Record<Typography, TextStyle & { fontFamily: Font }>>;

const compoundVariants = Object.entries(dynamicTypeSizes).reduce<
  {
    variants: { size: Size; typography: Typography };
    style: TextStyle;
  }[]
>((acc, [size, typography]) => {
  Object.entries(typography).forEach(
    ([typographyKey, { fontFamily, fontSize, fontWeight, lineHeight }]) => {
      acc.push({
        variants: {
          size: size as Size,
          typography: typographyKey as Typography,
        },
        style: {
          fontFamily,
          fontSize,
          fontWeight,
          lineHeight,
        },
      });
    },
  );

  return acc;
}, []);

export const typography = recipe(({ tokens }) => ({
  base: {},
  variants: {
    layout: {
      fillWidth: {
        flex: 1,
      },
      fillWidthInParent: {
        width: '100%',
      },
      fillHeight: {
        flex: 1,
      },
      fill: {
        flex: 1,
      },
      hug: {
        flexGrow: 0,
      },
    },
    size: {
      xs: {},
      sm: {},
      base: {},
      lg: {},
      xl: {},
      '2xl': {},
      '3xl': {},
      '4xl': {},
    },
    typography: {
      thin: {},
      light: {},
      regular: {},
      medium: {},
      semibold: {},
      bold: {},
    },
    color: {
      transparent: {
        color: 'transparent',
      },
      baseDefault: {
        color: tokens?.content.base.default,
      },
      baseOnColor: {
        color: tokens?.content.base.onColor,
      },
      baseSecondary: {
        color: tokens?.content.base.secondary,
      },
      baseStrong: {
        color: tokens?.content.base.strong,
      },
      basePlaceholder: {
        color: tokens?.content.base.placeholder,
      },
      brandDefault: {
        color: tokens?.content.brand.default,
      },
      errorDefault: {
        color: tokens?.content.error.default,
      },
      disabledDefault: {
        color: tokens?.content.disabled.default,
      },
      infoDefault: {
        color: tokens?.content.info.default,
      },
      lossDefault: {
        color: tokens?.content.loss.default,
      },
      profitDefault: {
        color: tokens?.content.profit.default,
      },
      successDefault: {
        color: tokens?.content.success.default,
      },
      warningDefault: {
        color: tokens?.content.warning.default,
      },
    },
    isUnderline: {
      true: {
        textDecorationLine: 'underline',
      },
    },
    isStrikeThrough: {
      true: {
        textDecorationLine: 'line-through',
      },
    },
    textAlign: {
      center: {
        textAlign: 'center',
      },
      right: {
        textAlign: 'right',
      },
    },
  },
  compoundVariants,
}));

export type TypographyVariants = RecipeVariants<typeof typography>;
