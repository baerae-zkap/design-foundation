/**
 * Border Radius Tokens
 * Generated from radius-tokens.json
 * Base unit: 4px (all values are multiples of 4)
 */

export const radius = {
  primitive: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
    full: 9999,
  },

  component: {
    button: {
      sm: 8,
      md: 8,
      lg: 12,
      pill: 9999,
    },
    card: {
      sm: 12,
      md: 16,
      lg: 20,
    },
    input: {
      default: 8,
      search: 9999,
    },
    chip: {
      default: 8,
      pill: 9999,
    },
    badge: {
      default: 4,
      pill: 9999,
    },
    avatar: {
      circle: 9999,
      square: 12,
    },
    image: {
      sm: 8,
      md: 12,
      lg: 16,
    },
    modal: {
      default: 24,
    },
    bottomSheet: {
      default: 20,
    },
    toast: {
      default: 12,
    },
    tooltip: {
      default: 8,
    },
    skeleton: {
      text: 4,
      image: 12,
    },
    segmentedControl: {
      container: 8,           // primitive.sm - 컨테이너 borderRadius
      segment: 6,             // container - padding(3) ≈ 내부 세그먼트
    },
  },
} as const;

export type RadiusToken = typeof radius;
