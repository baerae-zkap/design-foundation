import { vars } from '@/design-system/styles/vars';
import { recipe, RecipeVariants } from '@/design-system/utils/recipes';

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
