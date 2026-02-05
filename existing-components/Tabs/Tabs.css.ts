import { vars } from '@/design-system/styles/vars';
import { RecipeVariants, recipe } from '@/design-system/utils/recipes';

export const list = recipe({
  base: {
    display: 'none',
  },
  variants: {},
  defaultVariants: {},
});

export type ListVariants = RecipeVariants<typeof list>;

export const trigger = recipe(({ tokens }) => ({
  base: [
    {
      paddingTop: vars.spacing[2],
      paddingRight: vars.spacing[4],
      paddingBottom: vars.spacing[2],
      paddingLeft: vars.spacing[4],
      borderRadius: 9999,
    },
  ],
  variants: {
    isFocused: {
      true: {
        backgroundColor: tokens?.content.brand.default,
      },
    },
  },
  defaultVariants: {},
}));

export type TriggerVariants = RecipeVariants<typeof trigger>;

export const triggerText = recipe(({ tokens }) => ({
  base: [
    {
      color: tokens?.content.base.default,
    },
  ],
  variants: {
    isFocused: {
      true: {
        color: tokens?.content.base.onColor,
      },
    },
  },
  defaultVariants: {},
}));

export type TriggerTextVariants = RecipeVariants<typeof triggerText>;

export const content = recipe({
  base: {
    display: 'none',
  },
  variants: {},
  defaultVariants: {},
});

export type ContentVariants = RecipeVariants<typeof content>;

export const triggerWrapper = recipe(({ tokens }) => ({
  base: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: tokens?.surface.base.default,
    paddingTop: vars.spacing[3],
    paddingRight: vars.spacing[4],
    paddingBottom: vars.spacing[3],
    paddingLeft: vars.spacing[4],
  },
  variants: {},
  defaultVariants: {},
}));

export type TriggerWrapperVariants = RecipeVariants<typeof triggerWrapper>;
