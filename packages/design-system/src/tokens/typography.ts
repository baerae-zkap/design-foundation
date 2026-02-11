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
    '3xs': 14,
    '2xs': 16,
    xs: 18,
    sm: 20,
    md: 24,
    lg: 26,
    xl: 28,
    '2xl': 32,
    '3xl': 38,
    '4xl': 42,
    '5xl': 48,
    '6xl': 52,
    '7xl': 60,
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
        lineHeight: 60,
        letterSpacing: -0.25,
      },
      lg: {
        fontFamily: 'Pretendard',
        fontWeight: '700' as const,
        fontSize: 40,
        lineHeight: 52,
        letterSpacing: -0.25,
      },
      md: {
        fontFamily: 'Pretendard',
        fontWeight: '700' as const,
        fontSize: 36,
        lineHeight: 48,
        letterSpacing: -0.25,
      },
      sm: {
        fontFamily: 'Pretendard',
        fontWeight: '700' as const,
        fontSize: 32,
        lineHeight: 42,
        letterSpacing: -0.25,
      },
    },
    headline: {
      lg: {
        fontFamily: 'Pretendard',
        fontWeight: '600' as const,
        fontSize: 28,
        lineHeight: 38,
        letterSpacing: -0.25,
      },
      md: {
        fontFamily: 'Pretendard',
        fontWeight: '600' as const,
        fontSize: 24,
        lineHeight: 32,
        letterSpacing: 0,
      },
      sm: {
        fontFamily: 'Pretendard',
        fontWeight: '600' as const,
        fontSize: 20,
        lineHeight: 28,
        letterSpacing: 0,
      },
    },
    title: {
      lg: {
        fontFamily: 'Pretendard',
        fontWeight: '700' as const,
        fontSize: 24,
        lineHeight: 32,
        letterSpacing: 0,
      },
      md: {
        fontFamily: 'Pretendard',
        fontWeight: '700' as const,
        fontSize: 20,
        lineHeight: 28,
        letterSpacing: 0,
      },
      sm: {
        fontFamily: 'Pretendard',
        fontWeight: '700' as const,
        fontSize: 18,
        lineHeight: 26,
        letterSpacing: 0,
      },
    },
    body: {
      lg: {
        fontFamily: 'Pretendard',
        fontWeight: '400' as const,
        fontSize: 18,
        lineHeight: 26,
        letterSpacing: 0,
      },
      md: {
        fontFamily: 'Pretendard',
        fontWeight: '400' as const,
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0,
      },
      sm: {
        fontFamily: 'Pretendard',
        fontWeight: '400' as const,
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0,
      },
    },
    label: {
      lg: {
        fontFamily: 'Pretendard',
        fontWeight: '500' as const,
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0,
      },
      md: {
        fontFamily: 'Pretendard',
        fontWeight: '500' as const,
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0,
      },
      sm: {
        fontFamily: 'Pretendard',
        fontWeight: '500' as const,
        fontSize: 12,
        lineHeight: 18,
        letterSpacing: 0,
      },
    },
    caption: {
      lg: {
        fontFamily: 'Pretendard',
        fontWeight: '400' as const,
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0,
      },
      md: {
        fontFamily: 'Pretendard',
        fontWeight: '400' as const,
        fontSize: 12,
        lineHeight: 18,
        letterSpacing: 0,
      },
      sm: {
        fontFamily: 'Pretendard',
        fontWeight: '400' as const,
        fontSize: 11,
        lineHeight: 16,
        letterSpacing: 0,
      },
    },
    numeric: {
      xl: {
        fontFamily: 'Spoqa Han Sans Neo',
        fontWeight: '700' as const,
        fontSize: 36,
        lineHeight: 48,
        letterSpacing: -0.25,
        fontVariantNumeric: 'tabular-nums' as const,
      },
      lg: {
        fontFamily: 'Spoqa Han Sans Neo',
        fontWeight: '700' as const,
        fontSize: 24,
        lineHeight: 32,
        letterSpacing: -0.25,
        fontVariantNumeric: 'tabular-nums' as const,
      },
      md: {
        fontFamily: 'Spoqa Han Sans Neo',
        fontWeight: '500' as const,
        fontSize: 18,
        lineHeight: 26,
        letterSpacing: -0.25,
        fontVariantNumeric: 'tabular-nums' as const,
      },
      sm: {
        fontFamily: 'Spoqa Han Sans Neo',
        fontWeight: '500' as const,
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: -0.25,
        fontVariantNumeric: 'tabular-nums' as const,
      },
      xs: {
        fontFamily: 'Spoqa Han Sans Neo',
        fontWeight: '400' as const,
        fontSize: 12,
        lineHeight: 18,
        letterSpacing: -0.25,
        fontVariantNumeric: 'tabular-nums' as const,
      },
    },
  },
} as const;

export type TypographyToken = typeof typography;
