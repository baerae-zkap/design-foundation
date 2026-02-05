import { vars } from '@/design-system/styles/vars';
import { recipe, RecipeVariants } from '@/design-system/utils/recipes';
import { Dimensions } from 'react-native';

const dimensions = Dimensions.get('window');

export const triggerLayout = recipe({
  base: { justifyContent: 'flex-start', alignItems: 'flex-start' },
  variants: {},
});

export const triggerRoot = recipe({
  base: { flexGrow: 0, flexDirection: 'row' },
  variants: {},
});

export const overlay = recipe({
  base: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  variants: {
    isHideOverlay: {
      true: {
        backgroundColor: 'transparent',
      },
    },
  },
});

export type OverlayVariants = RecipeVariants<typeof overlay>;

export const content = recipe(({ tokens }) => ({
  base: {
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: tokens?.surface.base.default,
    borderRadius: vars.radius.l,
    overflowX: 'hidden',
    overflowY: 'auto',
    width: dimensions.width - vars.spacing[8] * 2,
    maxHeight: dimensions.height - vars.spacing[8] * 2,
  },
  variants: {
    size: {
      medium: {
        gap: vars.spacing[3],
      },
      large: {
        gap: vars.spacing[4],
      },
    },
  },
}));

export type ContentVariants = RecipeVariants<typeof content>;

export const header = recipe({
  base: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  variants: {
    size: {
      medium: {
        gap: vars.spacing[2],
        paddingTop: vars.spacing[4],
        paddingLeft: vars.spacing[4],
        paddingRight: vars.spacing[4],
      },
      large: {
        gap: vars.spacing[3],
        paddingTop: vars.spacing[6],
        paddingLeft: vars.spacing[6],
        paddingRight: vars.spacing[6],
      },
    },
  },
  defaultVariants: {},
});

export type HeaderVariants = RecipeVariants<typeof header>;

export const headerContent = recipe({
  base: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  variants: {},
  defaultVariants: {},
});

export type HeaderContentVariants = RecipeVariants<typeof headerContent>;

export const body = recipe({
  base: {},
  variants: {
    size: {
      medium: {
        paddingLeft: vars.spacing[4],
        paddingRight: vars.spacing[4],
      },
      large: {
        paddingLeft: vars.spacing[6],
        paddingRight: vars.spacing[6],
      },
    },
  },
  defaultVariants: {},
});

export type BodyVariants = RecipeVariants<typeof body>;

export const footer = recipe({
  base: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  variants: {
    size: {
      medium: {
        gap: vars.spacing[2],
        paddingLeft: vars.spacing[4],
        paddingRight: vars.spacing[4],
        paddingBottom: vars.spacing[4],
      },
      large: {
        gap: vars.spacing[3],
        paddingLeft: vars.spacing[6],
        paddingRight: vars.spacing[6],
        paddingBottom: vars.spacing[6],
      },
    },
  },
  defaultVariants: {},
});

export type FooterVariants = RecipeVariants<typeof footer>;

export const title = recipe({
  base: [],
  variants: {
    isHide: {
      true: {
        display: 'none',
      },
    },
  },
  defaultVariants: {},
});

export type TitleVariants = RecipeVariants<typeof title>;

export const description = recipe({
  base: [],
  variants: {
    isHide: {
      true: {
        display: 'none',
      },
    },
  },
  defaultVariants: {},
});

export type DescriptionVariants = RecipeVariants<typeof description>;
