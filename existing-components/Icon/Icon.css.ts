import { RecipeVariants, recipe } from '@/design-system/utils/recipes';

export const root = recipe({
  base: {
    display: 'flex',
    flexShrink: 0,
  },
  variants: {
    size: {
      xSmall: {
        padding: 0,
      },
      small: {
        padding: 0,
      },
      medium: {
        padding: 2,
      },
      large: {
        padding: 2,
      },
      xLarge: {
        padding: 4,
      },
      xxLarge: {
        padding: 4,
      },
      xxxLarge: {
        padding: 8,
      },
      xxxxLarge: {
        padding: 8,
      },
    },
  },
});

export type RootVariants = RecipeVariants<typeof root>;

export const content = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  variants: {
    size: {
      xSmall: {
        width: 12,
        height: 12,
      },
      small: {
        width: 16,
        height: 16,
      },
      medium: {
        width: 16,
        height: 16,
      },
      large: {
        width: 20,
        height: 20,
      },
      xLarge: {
        width: 20,
        height: 20,
      },
      xxLarge: {
        width: 24,
        height: 24,
      },
      xxxLarge: {
        width: 24,
        height: 24,
      },
      xxxxLarge: {
        width: 28,
        height: 28,
      },
    },
  },
});

export type ContentVariants = RecipeVariants<typeof content>;
