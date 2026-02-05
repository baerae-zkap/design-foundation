import { vars } from '@/design-system/styles/vars';
import { recipe, RecipeVariants } from '@/design-system/utils/recipes';

export const box = recipe(({ tokens, safeArea }) => ({
  base: {
    display: 'flex',
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
      scrollViewFill: {
        flexGrow: 1,
      },
    },
    orientation: {
      horizontal: {
        flexDirection: 'row',
      },
      vertical: {
        flexDirection: 'column',
      },
    },
    gap: {
      1: {
        gap: vars.spacing[1],
      },
      2: {
        gap: vars.spacing[2],
      },
      3: {
        gap: vars.spacing[3],
      },
      4: {
        gap: vars.spacing[4],
      },
      5: {
        gap: vars.spacing[5],
      },
      6: {
        gap: vars.spacing[6],
      },
      7: {
        gap: vars.spacing[7],
      },
      8: {
        gap: vars.spacing[8],
      },
      9: {
        gap: vars.spacing[9],
      },
      10: {
        gap: vars.spacing[10],
      },
      11: {
        gap: vars.spacing[11],
      },
      12: {
        gap: vars.spacing[12],
      },
      13: {
        gap: vars.spacing[13],
      },
      14: {
        gap: vars.spacing[14],
      },
      15: {
        gap: vars.spacing[15],
      },
      16: {
        gap: vars.spacing[16],
      },
      17: {
        gap: vars.spacing[17],
      },
      18: {
        gap: vars.spacing[18],
      },
      19: {
        gap: vars.spacing[19],
      },
      20: {
        gap: vars.spacing[20],
      },
    },
    sideGap: {
      1: {
        paddingLeft: vars.spacing[1],
        paddingRight: vars.spacing[1],
      },
      2: {
        paddingLeft: vars.spacing[2],
        paddingRight: vars.spacing[2],
      },
      3: {
        paddingLeft: vars.spacing[3],
        paddingRight: vars.spacing[3],
      },
      4: {
        paddingLeft: vars.spacing[4],
        paddingRight: vars.spacing[4],
      },
      5: {
        paddingLeft: vars.spacing[5],
        paddingRight: vars.spacing[5],
      },
      6: {
        paddingLeft: vars.spacing[6],
        paddingRight: vars.spacing[6],
      },
      8: {
        paddingLeft: vars.spacing[8],
        paddingRight: vars.spacing[8],
      },
      9: {
        paddingLeft: vars.spacing[9],
        paddingRight: vars.spacing[9],
      },
      10: {
        paddingLeft: vars.spacing[10],
        paddingRight: vars.spacing[10],
      },
    },
    paddingTop: {
      1: {
        paddingTop: vars.spacing[1],
      },
      2: {
        paddingTop: vars.spacing[2],
      },
      3: {
        paddingTop: vars.spacing[3],
      },
      4: {
        paddingTop: vars.spacing[4],
      },
      5: {
        paddingTop: vars.spacing[5],
      },
      6: {
        paddingTop: vars.spacing[6],
      },
      7: {
        paddingTop: vars.spacing[7],
      },
      8: {
        paddingTop: vars.spacing[8],
      },
      9: {
        paddingTop: vars.spacing[9],
      },
      10: {
        paddingTop: vars.spacing[10],
      },
      11: {
        paddingTop: vars.spacing[11],
      },
      12: {
        paddingTop: vars.spacing[12],
      },
      13: {
        paddingTop: vars.spacing[13],
      },
      14: {
        paddingTop: vars.spacing[14],
      },
      15: {
        paddingTop: vars.spacing[15],
      },
      16: {
        paddingTop: vars.spacing[16],
      },
      17: {
        paddingTop: vars.spacing[17],
      },
      18: {
        paddingTop: vars.spacing[18],
      },
      19: {
        paddingTop: vars.spacing[19],
      },
      20: {
        paddingTop: vars.spacing[20],
      },
    },
    paddingBottom: {
      safeArea: {
        paddingBottom: (safeArea?.bottom ?? 0) + vars.spacing[3],
      },
      1: {
        paddingBottom: vars.spacing[1],
      },
      2: {
        paddingBottom: vars.spacing[2],
      },
      3: {
        paddingBottom: vars.spacing[3],
      },
      4: {
        paddingBottom: vars.spacing[4],
      },
      5: {
        paddingBottom: vars.spacing[5],
      },
      6: {
        paddingBottom: vars.spacing[6],
      },
      7: {
        paddingBottom: vars.spacing[7],
      },
      8: {
        paddingBottom: vars.spacing[8],
      },
      9: {
        paddingBottom: vars.spacing[9],
      },
      10: {
        paddingBottom: vars.spacing[10],
      },
      11: {
        paddingBottom: vars.spacing[11],
      },
      12: {
        paddingBottom: vars.spacing[12],
      },
      13: {
        paddingBottom: vars.spacing[13],
      },
      14: {
        paddingBottom: vars.spacing[14],
      },
      15: {
        paddingBottom: vars.spacing[15],
      },
      16: {
        paddingBottom: vars.spacing[16],
      },
      17: {
        paddingBottom: vars.spacing[17],
      },
      18: {
        paddingBottom: vars.spacing[18],
      },
      19: {
        paddingBottom: vars.spacing[19],
      },
      20: {
        paddingBottom: vars.spacing[20],
      },
    },
    color: {
      transparent: {
        backgroundColor: 'transparent',
      },
      baseDefault: {
        backgroundColor: tokens?.surface.base.default,
      },
      baseContainer: {
        backgroundColor: tokens?.surface.base.container,
      },
      brandDefault: {
        backgroundColor: tokens?.surface.brand.default,
      },
      brandSecondary: {
        backgroundColor: tokens?.surface.brand.secondary,
      },
      errorDefault: {
        backgroundColor: tokens?.surface.error.default,
      },
      disabledDefault: {
        backgroundColor: tokens?.surface.disabled.default,
      },
      infoDefault: {
        backgroundColor: tokens?.surface.info.default,
      },
      successDefault: {
        backgroundColor: tokens?.surface.success.default,
      },
      warningDefault: {
        backgroundColor: tokens?.surface.warning.default,
      },
    },
    align: {
      start: {},
      startCenter: {},
      center: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      end: {},
      endCenter: {},
      spaceBetween: {},
      spaceBetweenCenter: {},
    },
    opacity: {
      disabled: {
        opacity: 0.2,
      },
    },
    border: {
      baseDefault: {
        borderWidth: 1,
        borderColor: tokens?.border.base.default,
      },
      brandDefault: {
        borderWidth: 1,
        borderColor: tokens?.border.brand.default,
      },
    },
    borderRadius: {
      xSmall: {
        borderRadius: vars.radius.xs,
      },
      small: {
        borderRadius: vars.radius.s,
      },
      medium: {
        borderRadius: vars.radius.m,
      },
      large: {
        borderRadius: vars.radius.l,
      },
      max: {
        borderRadius: vars.radius.max,
      },
    },
  },
  compoundVariants: [
    {
      variants: {
        orientation: 'horizontal',
        align: 'start',
      },
      style: {
        justifyContent: 'flex-start',
      },
    },
    {
      variants: {
        orientation: 'horizontal',
        align: 'startCenter',
      },
      style: {
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
    },
    {
      variants: {
        orientation: 'horizontal',
        align: 'end',
      },
      style: {
        justifyContent: 'flex-end',
      },
    },
    {
      variants: {
        orientation: 'horizontal',
        align: 'endCenter',
      },
      style: {
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
    },
    {
      variants: {
        orientation: 'horizontal',
        align: 'spaceBetween',
      },
      style: {
        justifyContent: 'space-between',
      },
    },
    {
      variants: {
        orientation: 'horizontal',
        align: 'spaceBetweenCenter',
      },
      style: {
        justifyContent: 'space-between',
        alignItems: 'center',
      },
    },
    {
      variants: {
        orientation: 'vertical',
        align: 'start',
      },
      style: {
        alignItems: 'flex-start',
      },
    },
    {
      variants: {
        orientation: 'vertical',
        align: 'startCenter',
      },
      style: {
        alignItems: 'flex-start',
        justifyContent: 'center',
      },
    },
    {
      variants: {
        orientation: 'vertical',
        align: 'end',
      },
      style: {
        justifyContent: 'flex-end',
      },
    },
    {
      variants: {
        orientation: 'vertical',
        align: 'endCenter',
      },
      style: {
        alignItems: 'flex-end',
        justifyContent: 'center',
      },
    },
    {
      variants: {
        orientation: 'vertical',
        align: 'spaceBetween',
      },
      style: {
        justifyContent: 'space-between',
      },
    },
    {
      variants: {
        orientation: 'vertical',
        align: 'center',
      },
      style: {
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
  ],
}));

export type BoxVariants = RecipeVariants<typeof box>;
