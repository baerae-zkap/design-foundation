/**
 * AUTO-GENERATED FILE. DO NOT EDIT DIRECTLY.
 * Source: public/effects-tokens.json + public/palette.json
 */

import { palette } from './colors';

/** Effects tokens (light) from public/effects-tokens.json */
export const effects = {
  alpha: {
    brand: {
      selection: "hsla(216, 100%, 47%, 0.15)",
    },
    fill: {
      normal: "hsla(216, 9%, 45%, 0.22)",
      strong: "hsla(216, 9%, 45%, 0.28)",
      alternative: "hsla(216, 9%, 45%, 0.12)",
    },
    overlay: {
      transparent: "hsla(222, 33%, 11%, 0)",
      dim: "hsla(222, 33%, 11%, 0.40)",
      heavy: "hsla(222, 33%, 11%, 0.85)",
    },
  },
  gradient: {
    brand: {
      primary: `linear-gradient(135deg, ${palette.blue["65"]} 0%, ${palette.blue["45"]} 100%)`,
      subtle: `linear-gradient(180deg, ${palette.blue["99"]} 0%, ${palette.blue["90"]} 100%)`,
    },
    surface: {
      elevated: `linear-gradient(180deg, ${palette.static.white} 0%, ${palette.grey["99"]} 100%)`,
      container: `linear-gradient(180deg, ${palette.grey["99"]} 0%, ${palette.grey["97"]} 100%)`,
    },
    overlay: {
      topScrim: `linear-gradient(0deg, hsla(222, 33%, 11%, 0.85) 0%, hsla(222, 33%, 11%, 0) 100%)`,
      bottomScrim: `linear-gradient(180deg, hsla(222, 33%, 11%, 0) 0%, hsla(222, 33%, 11%, 0.85) 100%)`,
    },
  },
} as const;

/** Effects tokens (dark) from public/effects-tokens.json */
export const darkEffects = {
  alpha: {
    brand: {
      selection: "hsla(220, 100%, 57%, 0.20)",
    },
    fill: {
      normal: "hsla(216, 9%, 77%, 0.22)",
      strong: "hsla(216, 9%, 77%, 0.28)",
      alternative: "hsla(216, 9%, 77%, 0.12)",
    },
    overlay: {
      transparent: "hsla(222, 33%, 11%, 0)",
      dim: "hsla(222, 33%, 11%, 0.72)",
      heavy: "hsla(222, 33%, 11%, 0.93)",
    },
  },
  gradient: {
    brand: {
      primary: `linear-gradient(135deg, ${palette.blue["70"]} 0%, ${palette.blue["50"]} 100%)`,
      subtle: `linear-gradient(180deg, ${palette.blue["30"]} 0%, ${palette.blue["20"]} 100%)`,
    },
    surface: {
      elevated: `linear-gradient(180deg, ${palette.grey["17"]} 0%, ${palette.grey["20"]} 100%)`,
      container: `linear-gradient(180deg, ${palette.grey["20"]} 0%, ${palette.grey["23"]} 100%)`,
    },
    overlay: {
      topScrim: `linear-gradient(0deg, hsla(222, 33%, 11%, 0.93) 0%, hsla(222, 33%, 11%, 0) 100%)`,
      bottomScrim: `linear-gradient(180deg, hsla(222, 33%, 11%, 0) 0%, hsla(222, 33%, 11%, 0.93) 100%)`,
    },
  },
} as const;

export type EffectToken = typeof effects;
export type DarkEffectToken = typeof darkEffects;
