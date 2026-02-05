import { vars } from '@/design-system/styles/vars';
import { RecipeVariants, recipe } from '@/design-system/utils/recipes';

export const list = recipe(({ tokens }) => ({
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

export type ListVariants = RecipeVariants<typeof list>;

export const trigger = recipe(({ tokens }) => ({
  base: [
    {
      paddingTop: vars.spacing[2],
      paddingRight: vars.spacing[4],
      paddingBottom: vars.spacing[2],
      paddingLeft: vars.spacing[4],
      borderRadius: vars.radius.max,
    },
  ],
  variants: {
    isFocused: {
      true: {
        backgroundColor: tokens?.content.brand.default,
      },
    },
  },
  defaultVariants: {
    isFocused: false,
  },
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
  defaultVariants: {
    isFocused: false,
  },
}));

export type TriggerTextVariants = RecipeVariants<typeof triggerText>;

export const content = recipe({
  base: {
    flex: 1,
  },
  variants: {},
  defaultVariants: {},
});

export type ContentVariants = RecipeVariants<typeof content>;

export const root = recipe({
  base: {
    flex: 1,
  },
  variants: {},
  defaultVariants: {},
});

export type RootVariants = RecipeVariants<typeof root>;

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
