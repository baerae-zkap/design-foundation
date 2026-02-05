import { typography } from '@/design-system/components/Typography/Typography.css';
import { vars } from '@/design-system/styles/vars';
import { recipe, RecipeVariants } from '@/design-system/utils/recipes';
import { Dimensions } from 'react-native';

const dimensions = Dimensions.get('window');

export const root = recipe(({ tokens }) => ({
  base: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: vars.spacing[4],
    width: dimensions.width - vars.spacing[4] * 2,
    backgroundColor: tokens?.surface.base.container,
    padding: vars.spacing[4],
    borderRadius: vars.radius.l,
  },
  variants: {
    backgroundColor: {
      baseDefault: {
        backgroundColor: tokens?.surface.base.default,
      },
      baseContainer: {
        backgroundColor: tokens?.surface.base.container,
      },
    },
  },
}));

export type RootVariants = RecipeVariants<typeof root>;

export const content = recipe({
  base: {
    flex: 1,
    flexDirection: 'column',
    gap: vars.spacing[1],
  },
  variants: {},
});

export type ContentVariants = RecipeVariants<typeof content>;

export const title = recipe(({ tokens }) => ({
  base: [
    typography({
      size: 'base',
      typography: 'regular',
    }),
    {
      color: tokens?.content.base.strong,
    },
  ],
  variants: {},
}));

export type TitleVariants = RecipeVariants<typeof title>;

export const description = recipe(({ tokens }) => ({
  base: [
    typography({
      size: 'base',
      typography: 'regular',
    }),
    {
      color: tokens?.content.base.secondary,
    },
  ],
  variants: {},
}));

export type DescriptionVariants = RecipeVariants<typeof description>;
