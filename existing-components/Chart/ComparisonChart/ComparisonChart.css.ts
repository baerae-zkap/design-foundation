import { vars } from '@/design-system/styles/vars';
import { recipe, RecipeVariants } from '@/design-system/utils/recipes';

export const bar = recipe({
  base: {
    overflow: 'hidden',
  },
  variants: {
    gap: {
      small: { gap: 2 },
      medium: { gap: 3 },
      large: { gap: 4 },
    },
    borderRadius: {
      small: {
        borderRadius: vars.radius.s,
      },
      medium: {
        borderRadius: vars.radius.m,
      },
      max: {
        borderRadius: vars.radius.max,
      },
    },
  },
});

export type BarVariants = RecipeVariants<typeof bar>;

export const legendDot = recipe({
  base: {
    width: 8,
    height: 8,
    borderRadius: vars.radius.max,
  },
  variants: {},
});

export type LegendDotVariants = RecipeVariants<typeof legendDot>;

export const chartColors = recipe(({ tokens }) => ({
  variants: {
    color: {
      baseDefault: {
        backgroundColor: tokens?.surface.base.container,
      },
      baseContainer: {
        backgroundColor: tokens?.surface.base.container,
      },
      brandDefault: {
        backgroundColor: tokens?.surface.brand.default,
      },
      brandSecondary: {
        backgroundColor: tokens?.surface.brand.secondary,
      },
      errorDefault: {
        backgroundColor: tokens?.surface.error.default,
      },
      warningDefault: {
        backgroundColor: tokens?.surface.warning.default,
      },
      successDefault: {
        backgroundColor: tokens?.surface.success.default,
      },
      infoDefault: {
        backgroundColor: tokens?.surface.info.default,
      },
      disabledDefault: {
        backgroundColor: tokens?.surface.disabled.default,
      },
      baseSecondary: {
        backgroundColor: tokens?.content.base.secondary,
      },
      categorical1: {
        backgroundColor: tokens?.visualization.categorical[1],
      },
      categorical2: {
        backgroundColor: tokens?.visualization.categorical[2],
      },
      categorical3: {
        backgroundColor: tokens?.visualization.categorical[3],
      },
      categorical4: {
        backgroundColor: tokens?.visualization.categorical[4],
      },
    },
  },
}));

export type ChartColorsVariants = RecipeVariants<typeof chartColors>;
