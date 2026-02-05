import { vars } from '@/design-system/styles/vars';
import { RecipeVariants, recipe } from '@/design-system/utils/recipes';

export const root = recipe({
  base: {
    display: 'flex',
    flexShrink: 0,
  },
  variants: {},
});

export type RootVariants = RecipeVariants<typeof root>;

export const content = recipe(({ tokens }) => ({
  base: {
    display: 'flex',
  },
  variants: {
    size: {
      xSmall: {
        width: 16,
        height: 16,
      },
      small: {
        width: 24,
        height: 24,
      },
      medium: {
        width: 32,
        height: 32,
      },
      large: {
        width: 48,
        height: 48,
      },
      xLarge: {
        width: 64,
        height: 64,
      },
    },
    //TODO: @JeongEuiwang 4 미만의 spacing 값을 어떻게 관리할지 디자인팀과 논의 필요 (의견은 전달한 상태, 레퍼런스 찾아보자고 얘기.)
    padding: {
      1: {
        padding: 1,
      },
      2: {
        padding: 2,
      },
      3: {
        padding: 3,
      },
      4: {
        padding: vars.spacing[1],
      },
      8: {
        padding: vars.spacing[2],
      },
    },
    borderRadius: {
      xxSmall: {
        borderRadius: vars.radius.xxs,
      },
      xSmall: {
        borderRadius: vars.radius.xs,
      },
      small: {
        borderRadius: vars.radius.s,
      },
      medium: {
        borderRadius: vars.radius.m,
      },
      large: {
        borderRadius: vars.radius.l,
      },
      xLarge: {
        borderRadius: vars.radius.xl,
      },
      max: {
        borderRadius: vars.radius.max,
      },
    },
    border: {
      baseDefault: {
        borderWidth: 1,
        borderColor: tokens?.border.base.default,
      },
      brandDefault: {
        borderWidth: 1,
        borderColor: tokens?.border.brand.default,
      },
      secondaryDefault: {
        borderWidth: 1,
        borderColor: tokens?.border.secondary.default,
      },
    },
  },
}));

export type ContentVariants = RecipeVariants<typeof content>;

export const image = recipe({
  base: {
    width: '100%',
    height: '100%',
  },
  variants: {},
});

export type ImageVariants = RecipeVariants<typeof image>;
