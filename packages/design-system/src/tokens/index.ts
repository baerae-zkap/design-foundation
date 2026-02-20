/**
 * Design Tokens
 *
 * Foundation 토큰을 TypeScript로 export
 */

import { lightColors as lightColorsImport, darkColors as darkColorsImport } from './colors';
import { effects as effectsImport, darkEffects as darkEffectsImport } from './effects';
import { shadow as shadowImport, darkShadow as darkShadowImport } from './shadow';
import { typography as typographyImport } from './typography';
import { spacing as spacingImport } from './spacing';
import { radius as radiusImport } from './radius';
import { opacity as opacityImport, borderWidth as borderWidthImport, zIndex as zIndexImport } from './general';
import { duration as durationImport, easing as easingImport, transitions as transitionsImport } from './motion';

export { lightColors, colors, palette, brandColors, errorColors, successColors, warningColors, infoColors, darkColors, darkPalette, darkBrandColors, darkErrorColors, darkSuccessColors, darkWarningColors, darkInfoColors, cssVarColors } from './colors';
export type { LightColorToken, ColorToken, PaletteToken, DarkColorToken, DarkPaletteToken, CssVarColorToken } from './colors';

export { effects, darkEffects } from './effects';
export type { EffectToken, DarkEffectToken } from './effects';

export { shadow, darkShadow } from './shadow';
export type { ShadowToken, DarkShadowToken } from './shadow';

export { typography } from './typography';
export type { TypographyToken } from './typography';

export { spacing } from './spacing';
export type { SpacingToken } from './spacing';

export { radius } from './radius';
export type { RadiusToken } from './radius';

export { opacity, borderWidth, zIndex } from './general';
export type { OpacityToken, BorderWidthToken, ZIndexToken } from './general';

export { duration, easing, transitions } from './motion';
export type { DurationToken, EasingToken, TransitionsToken } from './motion';

// Convenience re-exports
export const tokens = {
  lightColors: lightColorsImport,
  darkColors: darkColorsImport,
  effects: effectsImport,
  darkEffects: darkEffectsImport,
  shadow: shadowImport,
  darkShadow: darkShadowImport,
  typography: typographyImport,
  spacing: spacingImport,
  radius: radiusImport,
  opacity: opacityImport,
  borderWidth: borderWidthImport,
  zIndex: zIndexImport,
  duration: durationImport,
  easing: easingImport,
  transitions: transitionsImport,
};
