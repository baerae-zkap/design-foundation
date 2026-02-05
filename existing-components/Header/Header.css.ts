import { recipe, RecipeVariants } from '@/design-system/utils/recipes';

export const centerContent = recipe({
  base: {
    display: 'flex',
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  variants: {},
});

export const defaultSpace = recipe({
  base: {
    height: 44,
  },
  variants: {},
});

export type CenterContentVariants = RecipeVariants<typeof centerContent>;
