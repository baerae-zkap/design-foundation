import { vars } from '@/design-system/styles/vars';
import { recipe, RecipeVariants } from '@/design-system/utils/recipes';

export const cameraView = recipe({
  base: {
    flex: 1,
  },
  variants: {},
});

export type CameraViewVariants = RecipeVariants<typeof cameraView>;

export const loadingRoot = recipe({
  base: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  variants: {},
});

export type LoadingRootVariants = RecipeVariants<typeof loadingRoot>;

export const loadingOverlay = recipe(() => ({
  base: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  variants: {},
}));

export type LoadingOverlayVariants = RecipeVariants<typeof loadingOverlay>;

export const loadingIndicatorWrapper = recipe(({ tokens }) => ({
  base: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: vars.spacing[4],
    backgroundColor: tokens?.surface.base.default,
    borderRadius: vars.radius.l,
  },
  variants: {},
}));

export type LoadingIndicatorWrapperVariants = RecipeVariants<typeof loadingIndicatorWrapper>;
