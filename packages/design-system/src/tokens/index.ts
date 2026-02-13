/**
 * Design Tokens
 *
 * Foundation 토큰을 TypeScript로 export
 */

import { colors as colorsImport } from './colors';
import { typography as typographyImport } from './typography';
import { spacing as spacingImport } from './spacing';
import { radius as radiusImport } from './radius';

export { colors, palette, brandColors, errorColors, successColors, warningColors, infoColors, darkColors, darkPalette, darkBrandColors, darkErrorColors, darkSuccessColors, darkWarningColors, darkInfoColors } from './colors';
export type { ColorToken, PaletteToken, DarkColorToken, DarkPaletteToken } from './colors';

export { typography } from './typography';
export type { TypographyToken } from './typography';

export { spacing } from './spacing';
export type { SpacingToken } from './spacing';

export { radius } from './radius';
export type { RadiusToken } from './radius';

// Convenience re-exports
export const tokens = {
  colors: colorsImport,
  typography: typographyImport,
  spacing: spacingImport,
  radius: radiusImport,
};
