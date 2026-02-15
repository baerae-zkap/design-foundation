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

/** CSS variable references for web components (mirrors shadow structure) */
const cssVarPrimitive = {
  none: "var(--shadow-primitive-none)" as const,
  xs: "var(--shadow-primitive-xs)" as const,
  sm: "var(--shadow-primitive-sm)" as const,
  md: "var(--shadow-primitive-md)" as const,
  lg: "var(--shadow-primitive-lg)" as const,
  xl: "var(--shadow-primitive-xl)" as const,
  "2xl": "var(--shadow-primitive-2xl)" as const,
} as const;
const cssVarSemantic = {
  card: {
      default: "var(--shadow-semantic-card-default)" as const,
      elevated: "var(--shadow-semantic-card-elevated)" as const,
      floating: "var(--shadow-semantic-card-floating)" as const,
    },
  button: {
      default: "var(--shadow-semantic-button-default)" as const,
      elevated: "var(--shadow-semantic-button-elevated)" as const,
      pressed: "var(--shadow-semantic-button-pressed)" as const,
    },
  dropdown: {
      default: "var(--shadow-semantic-dropdown-default)" as const,
    },
  popover: {
      default: "var(--shadow-semantic-popover-default)" as const,
    },
  modal: {
      default: "var(--shadow-semantic-modal-default)" as const,
    },
  bottomSheet: {
      default: "var(--shadow-semantic-bottom-sheet-default)" as const,
    },
  drawer: {
      default: "var(--shadow-semantic-drawer-default)" as const,
    },
  toast: {
      default: "var(--shadow-semantic-toast-default)" as const,
    },
  header: {
      default: "var(--shadow-semantic-header-default)" as const,
      scrolled: "var(--shadow-semantic-header-scrolled)" as const,
    },
  tabBar: {
      default: "var(--shadow-semantic-tab-bar-default)" as const,
      elevated: "var(--shadow-semantic-tab-bar-elevated)" as const,
    },
  input: {
      focus: "var(--shadow-semantic-input-focus)" as const,
      error: "var(--shadow-semantic-input-error)" as const,
    },
} as const;

export const cssVarShadow = {
  primitive: cssVarPrimitive,
  semantic: cssVarSemantic,
} as const;

export type CssVarShadowToken = typeof cssVarShadow;
