import { RecipeVariants, recipe } from '@/design-system/utils/recipes';
import { vars } from '@/design-system/styles/vars';
import { typography } from '@/design-system/components/Typography/Typography.css';

export const root = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  variants: {
    layout: {
      fillWidth: {
        flex: 1,
      },
      fillHeight: {
        flex: 1,
      },
      fill: {
        flex: 1,
      },
      hug: {
        flexGrow: 0,
      },
    },
  },
  compoundVariants: [],
  defaultVariants: {},
});

export type RootVariants = RecipeVariants<typeof root>;

export const item = recipe(({ tokens }) => ({
  base: [
    {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
  ],
  variants: {
    layout: {
      fillWidth: {
        flex: 1,
      },
      fillHeight: {
        flex: 1,
      },
      fill: {
        flex: 1,
      },
      hug: {
        flexGrow: 0,
      },
    },
    size: {
      small: {
        padding: vars.spacing[1],
        borderRadius: vars.radius.xs,
      },
    },
    isSelected: {
      true: {
        backgroundColor: tokens?.surface.base.container,
      },
    },
  },
  compoundVariants: [],
  defaultVariants: {},
}));

export type ItemVariants = RecipeVariants<typeof item>;

export const text = recipe(({ tokens }) => ({
  base: [
    typography({
      tokens,
      size: 'sm',
      typography: 'medium',
    }),
    {
      color: tokens?.content.base.default,
    },
  ],
  variants: {
    isSelected: {
      true: [
        typography({
          tokens,
          size: 'sm',
          typography: 'bold',
        }),
      ],
    },
  },
  compoundVariants: [],
  defaultVariants: {},
}));

export type TextVariants = RecipeVariants<typeof text>;
