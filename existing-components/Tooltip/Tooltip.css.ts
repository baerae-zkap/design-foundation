import { vars } from '@/design-system/styles/vars';
import { RecipeVariants, recipe } from '@/design-system/utils/recipes';
import { typography } from '@/design-system/components/Typography/Typography.css';

export const content = recipe(({ tokens }) => ({
  base: {
    paddingTop: vars.spacing[1],
    paddingRight: vars.spacing[3],
    paddingBottom: vars.spacing[1],
    paddingLeft: vars.spacing[3],
    borderRadius: vars.radius.xs,
    zIndex: 2,
  },
  variants: {
    color: {
      brandDefault: {
        backgroundColor: tokens?.surface.brand.default,
      },
      baseDefault: {
        backgroundColor: tokens?.surface.base.default,
      },
      errorDefault: {
        backgroundColor: tokens?.surface.error.default,
      },
    },
  },
}));

export type ContentVariants = RecipeVariants<typeof content>;

export const arrowWrapper = recipe({
  base: {
    position: 'absolute',
    zIndex: 1,
  },
  variants: {
    side: {
      top: {
        bottom: -5,
        left: '50%',
        transform: [{ translateX: -5 }],
      },
      bottom: {
        top: -5,
        left: '50%',
        transform: [{ translateX: -5 }],
      },
      left: {
        right: -5,
        top: '50%',
        transform: [{ translateY: -5 }],
      },
      right: {
        left: -5,
        top: '50%',
        transform: [{ translateY: -5 }],
      },
    },
  },
});

export type ArrowWrapperVariants = RecipeVariants<typeof arrowWrapper>;

export const arrow = recipe(({ tokens }) => ({
  base: {
    width: 10,
    height: 10,
    zIndex: 1,
    transform: [{ rotate: '45deg' }],
  },
  variants: {
    color: {
      brandDefault: {
        backgroundColor: tokens?.surface.brand.default,
      },
      baseDefault: {
        backgroundColor: tokens?.surface.base.default,
      },
      errorDefault: {
        backgroundColor: tokens?.surface.error.default,
      },
    },
  },
}));

export const text = recipe(({ tokens }) => ({
  base: [
    typography({
      tokens,
      size: 'xs',
      typography: 'bold',
    }),
  ],
  variants: {
    color: {
      brandDefault: {
        color: tokens?.content.base.onColor,
      },
      baseDefault: {
        color: tokens?.content.base.default,
      },
      errorDefault: {
        color: tokens?.content.error.default,
      },
    },
  },
}));

export type TextVariants = RecipeVariants<typeof text>;
