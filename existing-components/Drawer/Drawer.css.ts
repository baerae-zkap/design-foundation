import { vars } from '@/design-system/styles/vars';
import { recipe, RecipeVariants } from '@/design-system/utils/recipes';

export const content = recipe(({ tokens }) => ({
  base: {
    flex: 1,
    backgroundColor: tokens?.surface.base.default,
    overflow: 'hidden',
  },
  variants: {
    borderRadius: {
      m: {
        borderTopLeftRadius: vars.radius.m,
        borderTopRightRadius: vars.radius.m,
      },
      xl: {
        borderTopLeftRadius: vars.radius.xl,
        borderTopRightRadius: vars.radius.xl,
      },
    },
  },
}));

export type ContentVariants = RecipeVariants<typeof content>;

export const handle = recipe({
  base: {
    display: 'flex',
    paddingTop: vars.spacing[2],
    paddingRight: vars.spacing[3],
    paddingBottom: vars.spacing[4],
    paddingLeft: vars.spacing[3],
  },
  variants: {
    isHideHandle: {
      true: {
        display: 'none',
      },
    },
  },
});

export type HandleVariants = RecipeVariants<typeof handle>;

export const indicator = recipe(({ tokens }) => ({
  base: {
    display: 'flex',
    width: 44,
    height: 4,
    borderRadius: vars.radius.xxs,
    backgroundColor: tokens?.content.base.secondary,
  },
  variants: {
    isHideHandle: {
      true: {
        display: 'none',
      },
    },
  },
}));

export type IndicatorVariants = RecipeVariants<typeof indicator>;
