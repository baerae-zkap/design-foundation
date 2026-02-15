/**
 * General Design Tokens
 * Opacity, border-width, and other foundational values
 */

export const opacity = {
  disabled: 0.5,
  dimmed: 0.4,
  overlay: {
    light: 0.08,
    medium: 0.16,
    heavy: 0.32,
  },
} as const;

export const borderWidth = {
  hairline: 1,
  default: 1,
  strong: 2,
} as const;

export type OpacityToken = typeof opacity;
export type BorderWidthToken = typeof borderWidth;
