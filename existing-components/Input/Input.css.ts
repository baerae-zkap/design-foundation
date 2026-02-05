import { typography } from '@/design-system/components/Typography/Typography.css';
import { vars } from '@/design-system/styles/vars';
import { RecipeVariants, recipe } from '@/design-system/utils/recipes';

export const root = recipe(({ tokens }) => ({
  base: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'transparent',
    backgroundColor: tokens?.surface.base.default,
  },
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
    inputType: {
      outline: {
        borderWidth: 1,
        borderRadius: vars.radius.s,
      },
      underline: {
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 1,
      },
    },
    isFocused: {
      true: {},
    },
    disabled: {
      true: {
        backgroundColor: tokens?.surface.disabled.default,
      },
    },
    isHidden: {
      true: {
        opacity: 0,
      },
    },
    color: {
      basePrimary: {
        borderColor: tokens?.border.secondary.default,
      },
      errorPrimary: {
        borderColor: tokens?.border.error.default,
      },
    },
    size: {
      small: {
        minHeight: 36,
        paddingLeft: vars.spacing[3],
        paddingRight: vars.spacing[3],
        gap: vars.spacing[2],
      },
      medium: {
        minHeight: 44,
        paddingLeft: vars.spacing[4],
        paddingRight: vars.spacing[3],
        gap: vars.spacing[3],
      },
      large: {
        minHeight: 56,
        paddingLeft: vars.spacing[5],
        paddingRight: vars.spacing[4],
        gap: vars.spacing[3],
      },
    },
  },
  compoundVariants: [
    {
      variants: {
        color: 'basePrimary',
        isFocused: true,
      },
      style: {
        borderColor: tokens?.border.brand.default,
      },
    },
    {
      variants: {
        color: 'errorPrimary',
        isFocused: true,
      },
      style: {
        borderColor: tokens?.border.error.default,
      },
    },
    {
      variants: {
        color: 'basePrimary',
        disabled: true,
      },
      style: {
        borderColor: 'transparent',
      },
    },
    {
      variants: {
        color: 'errorPrimary',
        disabled: true,
      },
      style: {
        borderColor: 'transparent',
      },
    },
  ],
}));

export type RootVariants = RecipeVariants<typeof root>;

export const centerContent = recipe({
  base: [
    {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      flexShrink: 1,
    },
  ],
  variants: {},
});

export type CenterContentVariants = RecipeVariants<typeof centerContent>;

export const input = recipe(({ tokens }) => ({
  base: [
    typography({
      tokens,
      size: 'base',
      typography: 'medium',
    }),
    {
      display: 'flex',
      backgroundColor: 'transparent',
      padding: 0,
      color: tokens?.content.base.default,
    },
  ],
  variants: {
    isHidden: {
      true: {
        opacity: 0,
      },
    },
    align: {
      left: {
        textAlign: 'left',
      },
      center: {
        textAlign: 'center',
      },
      right: {
        textAlign: 'right',
      },
    },
    disabled: {
      true: {
        color: tokens?.content.disabled.default,
      },
    },
  },
}));

export type InputVariants = RecipeVariants<typeof input>;

export const clearButton = recipe(() => ({
  base: [
    {
      width: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
  ],
  variants: {},
}));

export type ClearButtonVariants = RecipeVariants<typeof clearButton>;

export const clearIcon = recipe(({ tokens }) => ({
  base: [
    {
      width: 15,
      height: 15,
      color: tokens?.content.base.default,
    },
  ],
  variants: {},
}));

export type ClearIconVariants = RecipeVariants<typeof clearIcon>;

export const maxLength = recipe(({ tokens }) => ({
  base: [
    {
      color: tokens?.content.base.secondary,
    },
    typography({
      tokens,
      size: 'sm',
      typography: 'regular',
    }),
  ],
  variants: {},
}));

export type MaxLengthVariants = RecipeVariants<typeof maxLength>;
