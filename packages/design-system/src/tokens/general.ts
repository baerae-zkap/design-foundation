/**
 * General Design Tokens
 * Opacity, border-width, and other foundational values
 */

export const opacity = {
  disabled: 0.5,
  dimmed: 0.6,
  overlay: 0.4,
  pressed: 0.8,
} as const;

export const borderWidth = {
  hairline: 0.5,
  default: 1,
  medium: 1.5,
  strong: 2,
} as const;

export const zIndex = {
  base: 0,
  sticky: 100,
  dropdown: 1000,
  modal: 1100,
  toast: 1200,
} as const;

export type OpacityToken = typeof opacity;
export type BorderWidthToken = typeof borderWidth;
export type ZIndexToken = typeof zIndex;
