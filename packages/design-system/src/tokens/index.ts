/**
 * Design Tokens
 *
 * Foundation 토큰을 TypeScript로 export
 */

import { colors as colorsImport, darkColors as darkColorsImport, cssVarColors as cssVarColorsImport } from './colors';
import { effects as effectsImport, darkEffects as darkEffectsImport } from './effects';
import { shadow as shadowImport, darkShadow as darkShadowImport, cssVarShadow as cssVarShadowImport } from './shadow';
import { typography as typographyImport } from './typography';
import { spacing as spacingImport } from './spacing';
import { radius as radiusImport } from './radius';
import { opacity as opacityImport, borderWidth as borderWidthImport } from './general';

export { colors, palette, brandColors, errorColors, successColors, warningColors, infoColors, darkColors, darkPalette, darkBrandColors, darkErrorColors, darkSuccessColors, darkWarningColors, darkInfoColors, cssVarColors } from './colors';
export type { ColorToken, PaletteToken, DarkColorToken, DarkPaletteToken, CssVarColorToken } from './colors';

export { effects, darkEffects } from './effects';
export type { EffectToken, DarkEffectToken } from './effects';

export { shadow, darkShadow, cssVarShadow } from './shadow';
export type { ShadowToken, DarkShadowToken, CssVarShadowToken } from './shadow';

export { typography } from './typography';
export type { TypographyToken } from './typography';

export { spacing } from './spacing';
export type { SpacingToken } from './spacing';

export { radius } from './radius';
export type { RadiusToken } from './radius';

export { opacity, borderWidth } from './general';
export type { OpacityToken, BorderWidthToken } from './general';

// Convenience re-exports
export const tokens = {
  colors: colorsImport,
  darkColors: darkColorsImport,
  cssVarColors: cssVarColorsImport,
  effects: effectsImport,
  darkEffects: darkEffectsImport,
  shadow: shadowImport,
  darkShadow: darkShadowImport,
  cssVarShadow: cssVarShadowImport,
  typography: typographyImport,
  spacing: spacingImport,
  radius: radiusImport,
  opacity: opacityImport,
  borderWidth: borderWidthImport,
};
