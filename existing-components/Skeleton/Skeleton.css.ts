import { recipe, RecipeVariants } from '@/design-system/utils/recipes';
import { vars } from '@/design-system/styles/vars';

export const skeleton = recipe({
  base: {},
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
    shape: {
      rectangle: {
        borderRadius: vars.radius.xs,
      },
      circle: {
        borderRadius: vars.radius.max,
      },
    },
  },
});

export type SkeletonVariants = NonNullable<RecipeVariants<typeof skeleton>>;
