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
      brandDefault: {},
      brandSecondary: {},
      baseContainer: {},
      successDefault: {},
      errorDefault: {},
      kakaoDefault: {},
      googleDefault: {},
    },
    buttonType: {
      filled: {},
      outlined: {
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
        color: 'brandDefault',
      },
      style: {
        backgroundColor: tokens?.surface.brand.default,
      },
    },
    {
      variants: {
        buttonType: 'filled',
        color: 'brandDefault',
        pressed: true,
      },
      style: {
        backgroundColor: tokens?.surface.brand.defaultPressed,
      },
    },
    {
      variants: {
        buttonType: 'filled',
        color: 'brandDefault',
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
        color: 'baseContainer',
      },
      style: {
        backgroundColor: tokens?.surface.base.container,
      },
    },
    {
      variants: {
        buttonType: 'filled',
        color: 'baseContainer',
        pressed: true,
      },
      style: {
        backgroundColor: tokens?.surface.base.containerPressed,
      },
    },
    {
      variants: {
        buttonType: 'filled',
        color: 'baseContainer',
        disabled: true,
      },
      style: {
        backgroundColor: tokens?.surface.disabled.default,
      },
    },
    {
      variants: {
        buttonType: 'filled',
        color: 'successDefault',
      },
      style: {
        backgroundColor: tokens?.surface.success.default,
      },
    },
    {
      variants: {
        buttonType: 'filled',
        color: 'successDefault',
        pressed: true,
      },
      style: {
        backgroundColor: tokens?.surface.success.defaultPressed,
      },
    },
    {
      variants: {
        buttonType: 'filled',
        color: 'successDefault',
        disabled: true,
      },
      style: {
        backgroundColor: tokens?.surface.disabled.default,
      },
    },
    {
      variants: {
        buttonType: 'filled',
        color: 'errorDefault',
      },
      style: {
        backgroundColor: tokens?.surface.error.default,
      },
    },
    {
      variants: {
        buttonType: 'filled',
        color: 'errorDefault',
        pressed: true,
      },
      style: {
        backgroundColor: tokens?.surface.error.defaultPressed,
      },
    },
    {
      variants: {
        buttonType: 'filled',
        color: 'errorDefault',
        disabled: true,
      },
      style: {
        backgroundColor: tokens?.surface.disabled.default,
      },
    },
    {
      variants: {
        buttonType: 'outlined',
        color: 'brandDefault',
      },
      style: {
        borderColor: tokens?.border.brand.default,
        backgroundColor: tokens?.surface.base.default,
      },
    },
    {
      variants: {
        buttonType: 'outlined',
        color: 'brandDefault',
        pressed: true,
      },
      style: {
        borderColor: tokens?.border.brand.defaultPressed,
        backgroundColor: tokens?.surface.base.defaultPressed,
      },
    },
    {
      variants: {
        buttonType: 'outlined',
        color: 'brandDefault',
        disabled: true,
      },
      style: {
        borderWidth: 0,
        backgroundColor: tokens?.surface.disabled.default,
      },
    },
    {
      variants: {
        buttonType: 'outlined',
        color: 'brandSecondary',
      },
      style: {
        backgroundColor: tokens?.surface.base.default,
        borderColor: tokens?.border.secondary.default,
      },
    },
    {
      variants: {
        buttonType: 'outlined',
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
        buttonType: 'outlined',
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
        buttonType: 'outlined',
        color: 'baseContainer',
      },
      style: {
        backgroundColor: tokens?.surface.base.default,
        borderColor: tokens?.border.base.default,
      },
    },
    {
      variants: {
        buttonType: 'outlined',
        color: 'baseContainer',
        pressed: true,
      },
      style: {
        backgroundColor: tokens?.surface.base.containerPressed,
        borderColor: tokens?.border.base.defaultPressed,
      },
    },
    {
      variants: {
        buttonType: 'outlined',
        color: 'baseContainer',
        disabled: true,
      },
      style: {
        borderWidth: 0,
        backgroundColor: tokens?.surface.disabled.default,
      },
    },
    {
      variants: {
        buttonType: 'outlined',
        color: 'successDefault',
      },
      style: {
        backgroundColor: tokens?.surface.base.default,
        borderColor: tokens?.border.success.default,
      },
    },
    {
      variants: {
        buttonType: 'outlined',
        color: 'successDefault',
        pressed: true,
      },
      style: {
        backgroundColor: tokens?.surface.success.defaultPressed,
        borderColor: tokens?.border.success.defaultPressed,
      },
    },
    {
      variants: {
        buttonType: 'outlined',
        color: 'successDefault',
        disabled: true,
      },
      style: {
        borderWidth: 0,
        backgroundColor: tokens?.surface.disabled.default,
      },
    },
    {
      variants: {
        buttonType: 'outlined',
        color: 'errorDefault',
      },
      style: {
        backgroundColor: tokens?.surface.base.default,
        borderColor: tokens?.border.error.default,
      },
    },
    {
      variants: {
        buttonType: 'outlined',
        color: 'errorDefault',
        pressed: true,
      },
      style: {
        backgroundColor: tokens?.surface.error.defaultPressed,
        borderColor: tokens?.border.error.defaultPressed,
      },
    },
    {
      variants: {
        buttonType: 'outlined',
        color: 'errorDefault',
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
        color: 'kakaoDefault',
      },
      style: {
        backgroundColor: '#FEE500',
      },
    },
    {
      variants: {
        buttonType: 'filled',
        color: 'kakaoDefault',
        pressed: true,
      },
      style: {
        backgroundColor: '#E8D000',
      },
    },
    {
      variants: {
        buttonType: 'filled',
        color: 'kakaoDefault',
        disabled: true,
      },
      style: {
        backgroundColor: tokens?.surface.disabled.default,
      },
    },
    //TODO: @JeongEuiwang google 시멘틱 토큰으로 변경될 수 있음
    {
      variants: {
        buttonType: 'outlined',
        color: 'googleDefault',
      },
      style: {
        borderColor: tokens?.border.base.defaultPressed,
        backgroundColor: tokens?.surface.base.default,
      },
    },
    {
      variants: {
        buttonType: 'outlined',
        color: 'googleDefault',
        pressed: true,
      },
      style: {
        borderColor: tokens?.border.base.defaultPressed,
        backgroundColor: tokens?.surface.base.defaultPressed,
      },
    },
    {
      variants: {
        buttonType: 'outlined',
        color: 'googleDefault',
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
      brandDefault: {},
      brandSecondary: {},
      baseContainer: {},
      successDefault: {},
      errorDefault: {},
      kakaoDefault: {},
      googleDefault: {},
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
        color: 'brandDefault',
      },
      style: {
        color: tokens?.content.base.onColor,
      },
    },
    {
      variants: {
        buttonType: 'filled',
        color: 'brandDefault',
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
        color: 'baseContainer',
      },
      style: {
        color: tokens?.content.base.default,
      },
    },
    {
      variants: {
        buttonType: 'filled',
        color: 'baseContainer',
        disabled: true,
      },
      style: {
        color: tokens?.content.disabled.default,
      },
    },
    {
      variants: {
        buttonType: 'filled',
        color: 'successDefault',
      },
      style: {
        color: tokens?.content.success.default,
      },
    },
    {
      variants: {
        buttonType: 'filled',
        color: 'successDefault',
        disabled: true,
      },
      style: {
        color: tokens?.content.disabled.default,
      },
    },
    {
      variants: {
        buttonType: 'filled',
        color: 'errorDefault',
      },
      style: {
        color: tokens?.content.error.default,
      },
    },
    {
      variants: {
        buttonType: 'filled',
        color: 'errorDefault',
        disabled: true,
      },
      style: {
        color: tokens?.content.disabled.default,
      },
    },
    {
      variants: {
        buttonType: 'outlined',
        color: 'brandDefault',
      },
      style: {
        color: tokens?.content.brand.default,
      },
    },
    {
      variants: {
        buttonType: 'outlined',
        color: 'brandDefault',
        disabled: true,
      },
      style: {
        color: tokens?.content.disabled.default,
      },
    },
    {
      variants: {
        buttonType: 'outlined',
        color: 'brandSecondary',
      },
      style: {
        color: tokens?.content.brand.default,
      },
    },
    {
      variants: {
        buttonType: 'outlined',
        color: 'brandSecondary',
        disabled: true,
      },
      style: {
        color: tokens?.content.disabled.default,
      },
    },
    {
      variants: {
        buttonType: 'outlined',
        color: 'baseContainer',
      },
      style: {
        color: tokens?.content.base.default,
      },
    },
    {
      variants: {
        buttonType: 'outlined',
        color: 'baseContainer',
        disabled: true,
      },
      style: {
        color: tokens?.content.disabled.default,
      },
    },
    {
      variants: {
        buttonType: 'outlined',
        color: 'successDefault',
      },
      style: {
        color: tokens?.content.success.default,
      },
    },
    {
      variants: {
        buttonType: 'outlined',
        color: 'successDefault',
        disabled: true,
      },
      style: {
        color: tokens?.content.disabled.default,
      },
    },
    {
      variants: {
        buttonType: 'outlined',
        color: 'errorDefault',
      },
      style: {
        color: tokens?.content.error.default,
      },
    },
    {
      variants: {
        buttonType: 'outlined',
        color: 'errorDefault',
        disabled: true,
      },
      style: {
        color: tokens?.content.disabled.default,
      },
    },
    {
      variants: {
        color: 'kakaoDefault',
      },
      style: {
        color: tokens?.content.base.strong,
      },
    },
    {
      variants: {
        color: 'kakaoDefault',
        disabled: true,
      },
      style: {
        color: tokens?.content.disabled.default,
      },
    },
    {
      variants: {
        color: 'googleDefault',
      },
      style: {
        color: tokens?.content.base.default,
      },
    },
    {
      variants: {
        color: 'googleDefault',
        disabled: true,
      },
      style: {
        color: tokens?.content.disabled.default,
      },
    },
  ],
}));

export type TextVariants = RecipeVariants<typeof text>;
