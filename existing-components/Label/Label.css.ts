import { RecipeVariants, recipe } from '@/design-system/utils/recipes';

export const label = recipe(({ tokens }) => ({
  base: [
    {
      cursor: 'pointer',
    },
  ],
  variants: {
    disabled: {
      true: {
        cursor: 'not-allowed',
        color: tokens?.content.disabled.default,
      },
    },
  },
}));

export type LabelVariants = RecipeVariants<typeof label>;
