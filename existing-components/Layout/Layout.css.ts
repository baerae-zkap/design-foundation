import { recipe, RecipeVariants } from '@/design-system/utils/recipes';

export const layout = recipe({
  base: {
    display: 'flex',
  },
  variants: {
    layout: {
      fillWidth: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        flexShrink: 1,
      },
      fillWidthInParent: {},
      fillHeight: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        flexShrink: 1,
      },
      fill: {
        flex: 1,
      },
      hug: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      },
    },
    position: {
      top: {
        position: 'absolute',
        top: 0,
        left: 0,
      },
      bottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
      },
    },
    pointerEvents: {
      none: {
        pointerEvents: 'none',
      },
    },
  },
});

export type LayoutVariants = RecipeVariants<typeof layout>;
