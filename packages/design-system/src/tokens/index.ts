/**
 * Design Tokens
 *
 * Foundation 토큰을 TypeScript로 export
 */

import { colors as colorsImport, darkColors as darkColorsImport } from './colors';
import { effects as effectsImport, darkEffects as darkEffectsImport } from './effects';
import { shadow as shadowImport, darkShadow as darkShadowImport } from './shadow';
import { typography as typographyImport } from './typography';
import { spacing as spacingImport } from './spacing';
import { radius as radiusImport } from './radius';

export { colors, palette, brandColors, errorColors, successColors, warningColors, infoColors, darkColors, darkPalette, darkBrandColors, darkErrorColors, darkSuccessColors, darkWarningColors, darkInfoColors } from './colors';
export type { ColorToken, PaletteToken, DarkColorToken, DarkPaletteToken } from './colors';

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

// Convenience re-exports
export const tokens = {
  colors: colorsImport,
  darkColors: darkColorsImport,
  effects: effectsImport,
  darkEffects: darkEffectsImport,
  shadow: shadowImport,
  darkShadow: darkShadowImport,
  typography: typographyImport,
  spacing: spacingImport,
  radius: radiusImport,
};
