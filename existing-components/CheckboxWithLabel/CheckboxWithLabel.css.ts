import { vars } from '@/design-system/styles/vars';
import { RecipeVariants, recipe } from '@/design-system/utils/recipes';

export const checkboxWithLabel = recipe(({ tokens }) => ({
  base: [
    {
      flexDirection: 'row',
      gap: vars.spacing[2],
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

export type CheckboxWithLabelVariants = RecipeVariants<typeof checkboxWithLabel>;

export const checkbox = recipe({
  base: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  variants: {},
  defaultVariants: {},
});

export type CheckboxVariants = RecipeVariants<typeof checkbox>;
