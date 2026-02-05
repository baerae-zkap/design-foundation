import { typography } from '@/design-system/components/Typography/Typography.css';
import { vars } from '@/design-system/styles/vars';
import { recipe, RecipeVariants } from '@/design-system/utils/recipes';

export const badge = recipe(({ tokens }) => ({
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  variants: {
    layout: {
      fillWidth: {
        flex: 1,
      },
      fillWidthInParent: {
        width: '100%',
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
      small: [
        {
          paddingTop: vars.spacing[1],
          paddingRight: vars.spacing[2],
          paddingBottom: vars.spacing[1],
          paddingLeft: vars.spacing[2],
          gap: vars.spacing[1],
        },
      ],
      medium: [
        {
          paddingTop: vars.spacing[1],
          paddingRight: vars.spacing[3],
          paddingBottom: vars.spacing[1],
          paddingLeft: vars.spacing[3],
          gap: vars.spacing[1],
        },
      ],
    },
    shape: {
      square: {},
      round: {
        borderRadius: vars.radius.max,
      },
      dot: {
        borderRadius: vars.radius.max,
        padding: 0,
      },
    },
    color: {
      baseContainer: {},
      infoDefault: {},
      successDefault: {},
      errorDefault: {},
    },
    badgeType: {
      filled: {},
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderStyle: 'solid',
      },
    },
    align: {
      center: {
        justifyContent: 'center',
      },
      spaceBetween: {
        justifyContent: 'space-between',
      },
    },
  },
  compoundVariants: [
    {
      variants: {
        shape: 'dot',
        size: 'medium',
      },
      style: {
        width: 8,
        height: 8,
      },
    },
    {
      variants: {
        shape: 'square',
        size: 'small',
      },
      style: {
        borderRadius: vars.radius.xs,
      },
    },
    {
      variants: {
        shape: 'square',
        size: 'medium',
      },
      style: {
        borderRadius: vars.radius.s,
      },
    },
    {
      variants: {
        badgeType: 'filled',
        color: 'baseContainer',
      },
      style: {
        backgroundColor: tokens?.surface.base.container,
      },
    },
    {
      variants: {
        badgeType: 'filled',
        color: 'infoDefault',
      },
      style: {
        backgroundColor: tokens?.surface.info.default,
      },
    },
    {
      variants: {
        badgeType: 'filled',
        color: 'successDefault',
      },
      style: {
        backgroundColor: tokens?.surface.success.default,
      },
    },
    {
      variants: {
        badgeType: 'filled',
        color: 'errorDefault',
      },
      style: {
        backgroundColor: tokens?.surface.error.default,
      },
    },
    {
      variants: {
        badgeType: 'outline',
        color: 'successDefault',
      },
      style: {
        // TODO @jthcast border tokens not exist at Figma
        borderColor: tokens?.surface.success.default,
      },
    },
    {
      variants: {
        badgeType: 'outline',
        color: 'errorDefault',
      },
      style: {
        borderColor: tokens?.surface.error.default,
      },
    },
  ],
}));

export type BadgeVariants = RecipeVariants<typeof badge>;

export const text = recipe(({ tokens }) => ({
  base: {},
  variants: {
    size: {
      small: [
        typography({
          tokens,
          size: 'xs',
          typography: 'regular',
        }),
      ],
      medium: [
        typography({
          tokens,
          size: 'sm',
          typography: 'medium',
        }),
      ],
    },
    color: {
      baseContainer: {
        color: tokens?.content.base.secondary,
      },
      infoDefault: {
        color: tokens?.content.brand.default,
      },
      successDefault: {
        color: tokens?.content.success.default,
      },
      errorDefault: {
        color: tokens?.content.error.default,
      },
    },
  },
}));

export type TextVariants = RecipeVariants<typeof text>;
