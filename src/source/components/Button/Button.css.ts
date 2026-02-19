import { typography } from '@/design-system/components/Typography/Typography.css';
import { vars } from '@/design-system/styles/vars';
import { recipe, RecipeVariants } from '@/design-system/utils/recipes';

export const container = recipe({
  base: {
    position: 'relative',
  },
  variants: {},
});

export const contentContainer = recipe({
  base: {},
  variants: {
    isLoading: {
      true: {
        opacity: 0,
      },
      false: {
        opacity: 1,
      },
    },
  },
});

export const gridContainer = recipe({
  base: {
    position: 'relative',
    flex: 1,
  },
  variants: {},
});

export const gridContentContainer = recipe({
  base: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  variants: {
    isLoading: {
      true: {
        opacity: 0,
      },
      false: {
        opacity: 1,
      },
    },
  },
});

export const centerContent = recipe({
  base: {
    display: 'flex',
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  variants: {},
});

export const loadingContainer = recipe({
  base: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  variants: {},
});

export const animatedCircleContainer = recipe({
  base: {
    gap: 6,
  },
  variants: {},
});

export const animatedCircle = recipe(({ tokens }) => ({
  base: {
    width: '100%',
    height: '100%',
    borderRadius: vars.radius.max,
  },
  variants: {
    color: {
      brandDefault: {
        backgroundColor: tokens?.content.brand.default,
      },
      baseOnColor: {
        backgroundColor: tokens?.content.base.onColor,
      },
      baseDefault: {
        backgroundColor: tokens?.content.base.default,
      },
      baseStrong: {
        backgroundColor: tokens?.content.base.strong,
      },
      successDefault: {
        backgroundColor: tokens?.content.success.default,
      },
      errorDefault: {
        backgroundColor: tokens?.content.error.default,
      },
    },
  },
}));

export type AnimatedCircleVariants = RecipeVariants<typeof animatedCircle>;

export const button = recipe(({ tokens }) => ({
  base: [
    {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: vars.radius.s,
    },
  ],
  variants: {
    layout: {
      fillWidth: {
        flex: 1,
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
      small: {
        height: 36,
        paddingRight: vars.spacing[4],
        paddingLeft: vars.spacing[4],
      },
      medium: {
        height: 40,
        paddingRight: vars.spacing[4],
        paddingLeft: vars.spacing[4],
      },
      large: {
        height: 44,
        paddingRight: vars.spacing[4],
        paddingLeft: vars.spacing[4],
      },
      xLarge: {
        height: 48,
        paddingRight: vars.spacing[4],
        paddingLeft: vars.spacing[4],
      },
    },
    color: {
      primary: {},
      brandSecondary: {},
      neutral: {},
      success: {},
      error: {},
      kakao: {},
      google: {},
    },
    buttonType: {
      filled: {},
      weak: {
        borderWidth: 1,
      },
      plain: {
        backgroundColor: 'transparent',
      },
    },
    pressed: {
      true: {},
    },
    disabled: {
      true: {},
    },
  },
  compoundVariants: [
    {
      variants: {
        buttonType: 'filled',
        color: 'primary',
      },
      style: {
        backgroundColor: tokens?.surface.brand.default,
      },
    },
    {
      variants: {
        buttonType: 'filled',
        color: 'primary',
        pressed: true,
      },
      style: {
        backgroundColor: tokens?.surface.brand.defaultPressed,
      },
    },
    {
      variants: {
        buttonType: 'filled',
        color: 'primary',
        disabled: true,
      },
      style: {
        backgroundColor: tokens?.surface.disabled.default,
      },
    },
    {
      variants: {
        buttonType: 'filled',
        color: 'brandSecondary',
      },
      style: {
        backgroundColor: tokens?.surface.brand.secondary,
      },
    },
    {
      variants: {
        buttonType: 'filled',
        color: 'brandSecondary',
        pressed: true,
      },
      style: {
        backgroundColor: tokens?.surface.brand.secondaryPressed,
      },
    },
    {
      variants: {
        buttonType: 'filled',
        color: 'brandSecondary',
        disabled: true,
      },
      style: {
        backgroundColor: tokens?.surface.disabled.default,
      },
    },
    {
      variants: {
        buttonType: 'filled',
        color: 'neutral',
      },
      style: {
        backgroundColor: tokens?.surface.base.container,
      },
    },
    {
      variants: {
        buttonType: 'filled',
        color: 'neutral',
        pressed: true,
      },
      style: {
        backgroundColor: tokens?.surface.base.containerPressed,
      },
    },
    {
      variants: {
        buttonType: 'filled',
        color: 'neutral',
        disabled: true,
      },
      style: {
        backgroundColor: tokens?.surface.disabled.default,
      },
    },
    {
      variants: {
        buttonType: 'filled',
        color: 'success',
      },
      style: {
        backgroundColor: tokens?.surface.success.default,
      },
    },
    {
      variants: {
        buttonType: 'filled',
        color: 'success',
        pressed: true,
      },
      style: {
        backgroundColor: tokens?.surface.success.defaultPressed,
      },
    },
    {
      variants: {
        buttonType: 'filled',
        color: 'success',
        disabled: true,
      },
      style: {
        backgroundColor: tokens?.surface.disabled.default,
      },
    },
    {
      variants: {
        buttonType: 'filled',
        color: 'error',
      },
      style: {
        backgroundColor: tokens?.surface.error.default,
      },
    },
    {
      variants: {
        buttonType: 'filled',
        color: 'error',
        pressed: true,
      },
      style: {
        backgroundColor: tokens?.surface.error.defaultPressed,
      },
    },
    {
      variants: {
        buttonType: 'filled',
        color: 'error',
        disabled: true,
      },
      style: {
        backgroundColor: tokens?.surface.disabled.default,
      },
    },
    {
      variants: {
        buttonType: 'weak',
        color: 'primary',
      },
      style: {
        borderColor: tokens?.border.brand.default,
        backgroundColor: tokens?.surface.base.default,
      },
    },
    {
      variants: {
        buttonType: 'weak',
        color: 'primary',
        pressed: true,
      },
      style: {
        borderColor: tokens?.border.brand.defaultPressed,
        backgroundColor: tokens?.surface.base.defaultPressed,
      },
    },
    {
      variants: {
        buttonType: 'weak',
        color: 'primary',
        disabled: true,
      },
      style: {
        borderWidth: 0,
        backgroundColor: tokens?.surface.disabled.default,
      },
    },
    {
      variants: {
        buttonType: 'weak',
        color: 'brandSecondary',
      },
      style: {
        backgroundColor: tokens?.surface.base.default,
        borderColor: tokens?.border.secondary.default,
      },
    },
    {
      variants: {
        buttonType: 'weak',
        color: 'brandSecondary',
        pressed: true,
      },
      style: {
        backgroundColor: tokens?.surface.brand.secondaryPressed,
        borderColor: tokens?.border.secondary.defaultPressed,
      },
    },
    {
      variants: {
        buttonType: 'weak',
        color: 'brandSecondary',
        disabled: true,
      },
      style: {
        borderWidth: 0,
        backgroundColor: tokens?.surface.disabled.default,
      },
    },
    {
      variants: {
        buttonType: 'weak',
        color: 'neutral',
      },
      style: {
        backgroundColor: tokens?.surface.base.default,
        borderColor: tokens?.border.base.default,
      },
    },
    {
      variants: {
        buttonType: 'weak',
        color: 'neutral',
        pressed: true,
      },
      style: {
        backgroundColor: tokens?.surface.base.containerPressed,
        borderColor: tokens?.border.base.defaultPressed,
      },
    },
    {
      variants: {
        buttonType: 'weak',
        color: 'neutral',
        disabled: true,
      },
      style: {
        borderWidth: 0,
        backgroundColor: tokens?.surface.disabled.default,
      },
    },
    {
      variants: {
        buttonType: 'weak',
        color: 'success',
      },
      style: {
        backgroundColor: tokens?.surface.base.default,
        borderColor: tokens?.border.success.default,
      },
    },
    {
      variants: {
        buttonType: 'weak',
        color: 'success',
        pressed: true,
      },
      style: {
        backgroundColor: tokens?.surface.success.defaultPressed,
        borderColor: tokens?.border.success.defaultPressed,
      },
    },
    {
      variants: {
        buttonType: 'weak',
        color: 'success',
        disabled: true,
      },
      style: {
        borderWidth: 0,
        backgroundColor: tokens?.surface.disabled.default,
      },
    },
    {
      variants: {
        buttonType: 'weak',
        color: 'error',
      },
      style: {
        backgroundColor: tokens?.surface.base.default,
        borderColor: tokens?.border.error.default,
      },
    },
    {
      variants: {
        buttonType: 'weak',
        color: 'error',
        pressed: true,
      },
      style: {
        backgroundColor: tokens?.surface.error.defaultPressed,
        borderColor: tokens?.border.error.defaultPressed,
      },
    },
    {
      variants: {
        buttonType: 'weak',
        color: 'error',
        disabled: true,
      },
      style: {
        borderWidth: 0,
        backgroundColor: tokens?.surface.disabled.default,
      },
    },
    //TODO: @JeongEuiwang kakao 시멘틱 토큰으로 변경될 수 있음
    {
      variants: {
        buttonType: 'filled',
        color: 'kakao',
      },
      style: {
        backgroundColor: '#FEE500',
      },
    },
    {
      variants: {
        buttonType: 'filled',
        color: 'kakao',
        pressed: true,
      },
      style: {
        backgroundColor: '#E8D000',
      },
    },
    {
      variants: {
        buttonType: 'filled',
        color: 'kakao',
        disabled: true,
      },
      style: {
        backgroundColor: tokens?.surface.disabled.default,
      },
    },
    //TODO: @JeongEuiwang google 시멘틱 토큰으로 변경될 수 있음
    {
      variants: {
        buttonType: 'weak',
        color: 'google',
      },
      style: {
        borderColor: tokens?.border.base.defaultPressed,
        backgroundColor: tokens?.surface.base.default,
      },
    },
    {
      variants: {
        buttonType: 'weak',
        color: 'google',
        pressed: true,
      },
      style: {
        borderColor: tokens?.border.base.defaultPressed,
        backgroundColor: tokens?.surface.base.defaultPressed,
      },
    },
    {
      variants: {
        buttonType: 'weak',
        color: 'google',
        disabled: true,
      },
      style: {
        borderWidth: 0,
        backgroundColor: tokens?.surface.disabled.default,
      },
    },
  ],
}));

export type ButtonVariants = RecipeVariants<typeof button>;

export const text = recipe(({ tokens }) => ({
  base: {},
  variants: {
    size: {
      small: [
        typography({
          tokens,
          size: 'sm',
          typography: 'semibold',
        }),
      ],
      medium: [
        typography({
          tokens,
          size: 'sm',
          typography: 'semibold',
        }),
      ],
      large: [
        typography({
          tokens,
          size: 'sm',
          typography: 'semibold',
        }),
      ],
      xLarge: [
        typography({
          tokens,
          size: 'base',
          typography: 'semibold',
        }),
      ],
    },
    color: {
      primary: {},
      brandSecondary: {},
      neutral: {},
      success: {},
      error: {},
      kakao: {},
      google: {},
    },
    buttonType: {
      filled: {},
      outlined: {},
      plain: {},
    },
    disabled: {
      true: {},
    },
  },
  compoundVariants: [
    {
      variants: {
        buttonType: 'filled',
        color: 'primary',
      },
      style: {
        color: tokens?.content.base.onColor,
      },
    },
    {
      variants: {
        buttonType: 'filled',
        color: 'primary',
        disabled: true,
      },
      style: {
        color: tokens?.content.disabled.default,
      },
    },
    {
      variants: {
        buttonType: 'filled',
        color: 'brandSecondary',
      },
      style: {
        color: tokens?.content.brand.default,
      },
    },
    {
      variants: {
        buttonType: 'filled',
        color: 'brandSecondary',
        disabled: true,
      },
      style: {
        color: tokens?.content.disabled.default,
      },
    },
    {
      variants: {
        buttonType: 'filled',
        color: 'neutral',
      },
      style: {
        color: tokens?.content.base.default,
      },
    },
    {
      variants: {
        buttonType: 'filled',
        color: 'neutral',
        disabled: true,
      },
      style: {
        color: tokens?.content.disabled.default,
      },
    },
    {
      variants: {
        buttonType: 'filled',
        color: 'success',
      },
      style: {
        color: tokens?.content.success.default,
      },
    },
    {
      variants: {
        buttonType: 'filled',
        color: 'success',
        disabled: true,
      },
      style: {
        color: tokens?.content.disabled.default,
      },
    },
    {
      variants: {
        buttonType: 'filled',
        color: 'error',
      },
      style: {
        color: tokens?.content.error.default,
      },
    },
    {
      variants: {
        buttonType: 'filled',
        color: 'error',
        disabled: true,
      },
      style: {
        color: tokens?.content.disabled.default,
      },
    },
    {
      variants: {
        buttonType: 'weak',
        color: 'primary',
      },
      style: {
        color: tokens?.content.brand.default,
      },
    },
    {
      variants: {
        buttonType: 'weak',
        color: 'primary',
        disabled: true,
      },
      style: {
        color: tokens?.content.disabled.default,
      },
    },
    {
      variants: {
        buttonType: 'weak',
        color: 'brandSecondary',
      },
      style: {
        color: tokens?.content.brand.default,
      },
    },
    {
      variants: {
        buttonType: 'weak',
        color: 'brandSecondary',
        disabled: true,
      },
      style: {
        color: tokens?.content.disabled.default,
      },
    },
    {
      variants: {
        buttonType: 'weak',
        color: 'neutral',
      },
      style: {
        color: tokens?.content.base.default,
      },
    },
    {
      variants: {
        buttonType: 'weak',
        color: 'neutral',
        disabled: true,
      },
      style: {
        color: tokens?.content.disabled.default,
      },
    },
    {
      variants: {
        buttonType: 'weak',
        color: 'success',
      },
      style: {
        color: tokens?.content.success.default,
      },
    },
    {
      variants: {
        buttonType: 'weak',
        color: 'success',
        disabled: true,
      },
      style: {
        color: tokens?.content.disabled.default,
      },
    },
    {
      variants: {
        buttonType: 'weak',
        color: 'error',
      },
      style: {
        color: tokens?.content.error.default,
      },
    },
    {
      variants: {
        buttonType: 'weak',
        color: 'error',
        disabled: true,
      },
      style: {
        color: tokens?.content.disabled.default,
      },
    },
    {
      variants: {
        color: 'kakao',
      },
      style: {
        color: tokens?.content.base.strong,
      },
    },
    {
      variants: {
        color: 'kakao',
        disabled: true,
      },
      style: {
        color: tokens?.content.disabled.default,
      },
    },
    {
      variants: {
        color: 'google',
      },
      style: {
        color: tokens?.content.base.default,
      },
    },
    {
      variants: {
        color: 'google',
        disabled: true,
      },
      style: {
        color: tokens?.content.disabled.default,
      },
    },
  ],
}));

export type TextVariants = RecipeVariants<typeof text>;
