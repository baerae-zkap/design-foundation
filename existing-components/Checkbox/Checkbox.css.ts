import { vars } from '@/design-system/styles/vars';
import { recipe, RecipeVariants } from '@/design-system/utils/recipes';

export const root = recipe(({ tokens }) => ({
  base: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: tokens?.content.brand.default,
    borderRadius: vars.radius.max,
    cursor: 'pointer',
    flexShrink: 0,
  },
  variants: {
    disabled: {
      true: {
        cursor: 'not-allowed',
        borderColor: tokens?.content.disabled.default,
      },
    },
    checked: {
      false: {
        width: 16,
        height: 16,
        borderWidth: 1,
        borderColor: tokens?.content.base.secondary,
      },
    },
  },
  defaultVariants: {},
}));

export type RootVariants = RecipeVariants<typeof root>;

export const indicator = recipe({
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  variants: {},
  defaultVariants: {},
});
