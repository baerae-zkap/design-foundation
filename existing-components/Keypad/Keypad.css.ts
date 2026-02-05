import { RecipeVariants, recipe } from '@/design-system/utils/recipes';
import { typography } from '@/design-system/components/Typography/Typography.css';
import { vars } from '@/design-system/styles/vars';

export const layout = recipe(() => ({
  base: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    flexShrink: 1,
  },
  variants: {},
}));

export type LayoutVariants = RecipeVariants<typeof layout>;

export const root = recipe(() => ({
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: vars.spacing[3],
    flex: 1,
  },
  variants: {},
}));

export type RootVariants = RecipeVariants<typeof root>;

export const row = recipe(() => ({
  base: {
    display: 'flex',
    flexDirection: 'row',
  },
  variants: {},
}));

export type RowVariants = RecipeVariants<typeof row>;

export const keyRoot = recipe(() => ({
  base: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: vars.spacing[1],
    paddingRight: vars.spacing[2],
    paddingBottom: vars.spacing[1],
    paddingLeft: vars.spacing[2],
  },
  variants: {},
}));

export type KeyRootVariants = RecipeVariants<typeof keyRoot>;

export const keyValue = recipe(({ tokens }) => ({
  base: [
    typography({ size: '3xl', typography: 'medium' }),
    {
      color: tokens?.content.base.default,
    },
  ],
  variants: {},
}));

export type KeyValueVariants = RecipeVariants<typeof keyValue>;

export const passwordIndicatorRoot = recipe(() => ({
  base: {
    flexDirection: 'row',
  },
  variants: {
    size: {
      small: {
        gap: vars.spacing[2],
      },
      medium: {
        gap: vars.spacing[4],
      },
    },
  },
}));

export type PasswordIndicatorRootVariants = RecipeVariants<typeof passwordIndicatorRoot>;

export const passwordIndicatorItem = recipe(({ tokens }) => ({
  base: {
    borderRadius: vars.radius.max,
    backgroundColor: tokens?.content.base.default,
  },
  variants: {
    isEmpty: {
      true: {
        backgroundColor: tokens?.surface.disabled.default,
      },
    },
    isVoid: {
      true: {
        backgroundColor: 'transparent',
      },
    },
    size: {
      small: {
        width: 12,
        height: 12,
      },
      medium: {
        width: 18,
        height: 18,
      },
    },
  },
}));

export type PasswordIndicatorItemVariants = RecipeVariants<typeof passwordIndicatorItem>;
