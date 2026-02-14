/**
 * AUTO-GENERATED FILE. DO NOT EDIT DIRECTLY.
 * Source: public/shadow-tokens.json
 */

const primitive = {
  none: "none",
  xs: "0px 1px 2px rgba(16, 23, 38, 0.06)",
  sm: "0px 2px 4px rgba(16, 23, 38, 0.08)",
  md: "0px 4px 8px rgba(16, 23, 38, 0.10)",
  lg: "0px 8px 16px rgba(16, 23, 38, 0.12)",
  xl: "0px 12px 24px rgba(16, 23, 38, 0.14)",
  "2xl": "0px 16px 32px rgba(16, 23, 38, 0.16)",
} as const;
const semantic = {
  card: {
      default: primitive.sm,
      elevated: primitive.md,
      floating: primitive.lg,
    },
  button: {
      default: primitive.none,
      elevated: primitive.sm,
      pressed: primitive.xs,
    },
  dropdown: {
      default: primitive.md,
    },
  popover: {
      default: primitive.md,
    },
  modal: {
      default: primitive.lg,
    },
  bottomSheet: {
      default: primitive.xl,
    },
  drawer: {
      default: primitive.xl,
    },
  toast: {
      default: primitive.md,
    },
  header: {
      default: primitive.none,
      scrolled: primitive.xs,
    },
  tabBar: {
      default: primitive.none,
      elevated: primitive.xs,
    },
  input: {
      focus: "0px 0px 0px 3px rgba(0, 79, 255, 0.15)",
      error: "0px 0px 0px 3px rgba(243, 59, 49, 0.15)",
    },
} as const;

const darkPrimitive = {
  none: "none",
  xs: "0px 1px 2px rgba(0, 0, 0, 0.20)",
  sm: "0px 2px 4px rgba(0, 0, 0, 0.25)",
  md: "0px 4px 8px rgba(0, 0, 0, 0.30)",
  lg: "0px 8px 16px rgba(0, 0, 0, 0.35)",
  xl: "0px 12px 24px rgba(0, 0, 0, 0.40)",
  "2xl": "0px 16px 32px rgba(0, 0, 0, 0.45)",
} as const;
const darkSemantic = {
  card: {
      default: darkPrimitive.sm,
      elevated: darkPrimitive.md,
      floating: darkPrimitive.lg,
    },
  button: {
      default: darkPrimitive.none,
      elevated: darkPrimitive.sm,
      pressed: darkPrimitive.xs,
    },
  dropdown: {
      default: darkPrimitive.md,
    },
  popover: {
      default: darkPrimitive.md,
    },
  modal: {
      default: darkPrimitive.lg,
    },
  bottomSheet: {
      default: darkPrimitive.xl,
    },
  drawer: {
      default: darkPrimitive.xl,
    },
  toast: {
      default: darkPrimitive.md,
    },
  header: {
      default: darkPrimitive.none,
      scrolled: darkPrimitive.xs,
    },
  tabBar: {
      default: darkPrimitive.none,
      elevated: darkPrimitive.xs,
    },
  input: {
      focus: "0px 0px 0px 3px rgba(0, 79, 255, 0.15)",
      error: "0px 0px 0px 3px rgba(243, 59, 49, 0.15)",
    },
} as const;
const darkBorder = {
  subtle: "0px 0px 0px 1px rgba(255, 255, 255, 0.06)",
  default: "0px 0px 0px 1px rgba(255, 255, 255, 0.10)",
} as const;

export const shadow = {
  primitive,
  semantic,
} as const;

export const darkShadow = {
  primitive: darkPrimitive,
  semantic: darkSemantic,
  border: darkBorder,
} as const;

export type ShadowToken = typeof shadow;
export type DarkShadowToken = typeof darkShadow;
