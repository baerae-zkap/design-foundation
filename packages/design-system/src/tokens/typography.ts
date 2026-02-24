/**
 * Typography Tokens
 * Generated from typography-tokens.json
 */

export const typography = {
  fontFamily: {
    base: 'Pretendard',
    numeric: 'Spoqa Han Sans Neo',
    fallback: '-apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif',
  },

  fontWeight: {
    light: '300' as const,
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },

  fontSize: {
    '3xs': 10,
    '2xs': 11,
    xs: 12,
    compact: 13,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 36,
    '6xl': 40,
    '7xl': 48,
  },

  lineHeight: {
    '3xs': '14px',
    '2xs': '16px',
    xs: '18px',
    compact: '19px',
    sm: '20px',
    md: '24px',
    lg: '26px',
    xl: '28px',
    '2xl': '32px',
    '3xl': '38px',
    '4xl': '42px',
    '5xl': '48px',
    '6xl': '52px',
    '7xl': '60px',
  },

  letterSpacing: {
    tighter: -0.5,
    tight: -0.25,
    normal: 0,
    wide: 0.25,
    wider: 0.5,
  },

  // Semantic typography styles
  semantic: {
    display: {
      xl: {
        fontFamily: 'Pretendard',
        fontWeight: '700' as const,
        fontSize: 48,
        lineHeight: '60px',
        letterSpacing: -0.25,
      },
      lg: {
        fontFamily: 'Pretendard',
        fontWeight: '700' as const,
        fontSize: 40,
        lineHeight: '52px',
        letterSpacing: -0.25,
      },
      md: {
        fontFamily: 'Pretendard',
        fontWeight: '700' as const,
        fontSize: 36,
        lineHeight: '48px',
        letterSpacing: -0.25,
      },
      sm: {
        fontFamily: 'Pretendard',
        fontWeight: '700' as const,
        fontSize: 32,
        lineHeight: '42px',
        letterSpacing: -0.25,
      },
    },
    headline: {
      lg: {
        fontFamily: 'Pretendard',
        fontWeight: '600' as const,
        fontSize: 28,
        lineHeight: '38px',
        letterSpacing: -0.25,
      },
      md: {
        fontFamily: 'Pretendard',
        fontWeight: '600' as const,
        fontSize: 24,
        lineHeight: '32px',
        letterSpacing: 0,
      },
      sm: {
        fontFamily: 'Pretendard',
        fontWeight: '600' as const,
        fontSize: 20,
        lineHeight: '28px',
        letterSpacing: 0,
      },
    },
    title: {
      lg: {
        fontFamily: 'Pretendard',
        fontWeight: '700' as const,
        fontSize: 24,
        lineHeight: '32px',
        letterSpacing: 0,
      },
      md: {
        fontFamily: 'Pretendard',
        fontWeight: '700' as const,
        fontSize: 20,
        lineHeight: '28px',
        letterSpacing: 0,
      },
      sm: {
        fontFamily: 'Pretendard',
        fontWeight: '700' as const,
        fontSize: 18,
        lineHeight: '26px',
        letterSpacing: 0,
      },
    },
    body: {
      lg: {
        fontFamily: 'Pretendard',
        fontWeight: '400' as const,
        fontSize: 18,
        lineHeight: '26px',
        letterSpacing: 0,
      },
      md: {
        fontFamily: 'Pretendard',
        fontWeight: '400' as const,
        fontSize: 16,
        lineHeight: '24px',
        letterSpacing: 0,
      },
      sm: {
        fontFamily: 'Pretendard',
        fontWeight: '400' as const,
        fontSize: 14,
        lineHeight: '20px',
        letterSpacing: 0,
      },
    },
    label: {
      lg: {
        fontFamily: 'Pretendard',
        fontWeight: '500' as const,
        fontSize: 16,
        lineHeight: '24px',
        letterSpacing: 0,
      },
      md: {
        fontFamily: 'Pretendard',
        fontWeight: '500' as const,
        fontSize: 14,
        lineHeight: '20px',
        letterSpacing: 0,
      },
      sm: {
        fontFamily: 'Pretendard',
        fontWeight: '500' as const,
        fontSize: 12,
        lineHeight: '18px',
        letterSpacing: 0,
      },
    },
    caption: {
      lg: {
        fontFamily: 'Pretendard',
        fontWeight: '400' as const,
        fontSize: 14,
        lineHeight: '20px',
        letterSpacing: 0,
      },
      md: {
        fontFamily: 'Pretendard',
        fontWeight: '400' as const,
        fontSize: 12,
        lineHeight: '18px',
        letterSpacing: 0,
      },
      sm: {
        fontFamily: 'Pretendard',
        fontWeight: '400' as const,
        fontSize: 11,
        lineHeight: '16px',
        letterSpacing: 0,
      },
    },
    compact: {
      md: {
        fontFamily: 'Pretendard',
        fontWeight: '400' as const,
        fontSize: 13,
        lineHeight: '19px',
        letterSpacing: 0,
      },
      sm: {
        fontFamily: 'Pretendard',
        fontWeight: '500' as const,
        fontSize: 13,
        lineHeight: '19px',
        letterSpacing: 0,
      },
    },
    numeric: {
      xl: {
        fontFamily: 'Spoqa Han Sans Neo',
        fontWeight: '700' as const,
        fontSize: 36,
        lineHeight: '48px',
        letterSpacing: -0.25,
        fontVariantNumeric: 'tabular-nums' as const,
      },
      lg: {
        fontFamily: 'Spoqa Han Sans Neo',
        fontWeight: '700' as const,
        fontSize: 24,
        lineHeight: '32px',
        letterSpacing: -0.25,
        fontVariantNumeric: 'tabular-nums' as const,
      },
      md: {
        fontFamily: 'Spoqa Han Sans Neo',
        fontWeight: '500' as const,
        fontSize: 18,
        lineHeight: '26px',
        letterSpacing: -0.25,
        fontVariantNumeric: 'tabular-nums' as const,
      },
      sm: {
        fontFamily: 'Spoqa Han Sans Neo',
        fontWeight: '500' as const,
        fontSize: 14,
        lineHeight: '20px',
        letterSpacing: -0.25,
        fontVariantNumeric: 'tabular-nums' as const,
      },
      xs: {
        fontFamily: 'Spoqa Han Sans Neo',
        fontWeight: '400' as const,
        fontSize: 12,
        lineHeight: '18px',
        letterSpacing: -0.25,
        fontVariantNumeric: 'tabular-nums' as const,
      },
    },
  },
} as const;

export type TypographyToken = typeof typography;
