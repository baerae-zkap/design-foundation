/**
 * Spacing Tokens
 * Generated from spacing-tokens.json
 * Base unit: 4px (all values are multiples of 4)
 */

export const spacing = {
  primitive: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    10: 40,
    12: 48,
    14: 56,
    16: 64,
    20: 80,
  },

  semantic: {
    inset: {
      none: 0,
      '3xs': 4,
      '2xs': 8,
      xs: 12,
      sm: 16,
      md: 20,
      lg: 24,
      xl: 32,
    },
    vertical: {
      none: 0,
      '3xs': 4,
      '2xs': 8,
      xs: 12,
      sm: 16,
      md: 20,
      lg: 24,
      xl: 32,
      '2xl': 40,
      '3xl': 48,
    },
    horizontal: {
      none: 0,
      '3xs': 4,
      '2xs': 8,
      xs: 12,
      sm: 16,
      md: 20,
      lg: 24,
    },
    screen: {
      paddingX: 20,
      paddingXCompact: 16,
      paddingXWide: 24,
      paddingTop: 16,
      paddingBottom: 20,
      safeAreaBottom: 32,
    },
    minTouchTarget: 44,
  },

  component: {
    button: {
      gap: 8,
      paddingX: {
        xs: 12,
        sm: 16,
        md: 20,
        lg: 24,
      },
      paddingY: {
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
      },
    },
    card: {
      padding: {
        sm: 16,
        md: 20,
        lg: 24,
      },
      gap: 16,
    },
    input: {
      paddingX: 16,
      paddingY: 12,
      labelGap: 8,
      helperGap: 4,
      height: { sm: 36, md: 44, lg: 52 },
    },
    list: {
      itemPaddingX: 20,
      itemPaddingY: 16,
      itemGap: 0,
      sectionGap: 32,
    },
    modal: {
      padding: 24,
      headerGap: 16,
      footerGap: 20,
      buttonGap: 12,
    },
    bottomSheet: {
      padding: 20,
      handleGap: 16,
    },
    header: {
      height: 56,
      paddingX: 16,
    },
    tabBar: {
      height: 48,
      itemGap: 8,
    },
    divider: {
      marginY: 16,
    },
    segmentedControl: {
      containerPadding: 3,    // container 내부 패딩 (segment와 container 사이 gap)
      height: {
        sm: 32,
        md: 36,
        lg: 42,
      },
      paddingX: {
        sm: 12,               // inset.xs
        md: 16,               // inset.sm
        lg: 20,               // inset.md
      },
      iconGap: 8,             // 아이콘-텍스트 gap (primitive.2)
    },
    chip: {
      height: {
        sm: 24,
        md: 32,
        lg: 40,
      },
      paddingX: {
        sm: 8,
        md: 12,
        lg: 16,
      },
      gap: 4,
      iconSize: {
        sm: 14,
        md: 18,
        lg: 22,
      },
    },
    badge: {
      height: {
        sm: 18,
        md: 22,
        lg: 26,
      },
      paddingX: {
        sm: 6,
        md: 8,
        lg: 10,
      },
      dotSize: {
        sm: 4,
        md: 6,
        lg: 6,
      },
      iconSize: {
        sm: 10,
        md: 12,
        lg: 14,
      },
    },
    accordion: {
      height: {
        md: 48,
        lg: 56,
      },
      iconSize: 16,
    },
    table: {
      minHeight: {
        sm: 40,
        md: 44,
        lg: 48,
      },
      headCellPaddingY: {
        sm: 6,
        md: 8,
        lg: 10,
      },
    },
    iconButton: {
      size: {
        sm: 32,
        md: 40,
        lg: 48,
      },
      iconSize: {
        sm: 18,
        md: 22,
        lg: 26,
      },
    },
    thumbnail: {
      playIconSize: 48,
    },
    listCell: {
      minHeight: {
        sm: 44,
        md: 56,
        lg: 72,
      },
    },
    listCard: {
      thumbnailSize: {
        sm: 56,
        md: 80,
        lg: 100,
      },
    },
    textButton: {
      fontSize: {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 18,
        xl: 20,
      },
    },
  },
} as const;

export type SpacingToken = typeof spacing;
