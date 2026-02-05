import { recipe, RecipeVariants } from '@/design-system/utils/recipes';

export const pressable = recipe({
  base: {
    flexShrink: 1,
  },
  variants: {},
});

export type PressableVariants = RecipeVariants<typeof pressable>;
