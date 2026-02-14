/**
 * AUTO-GENERATED FILE. DO NOT EDIT DIRECTLY.
 * Source: public/palette.json + public/semantic-tokens.json
 */

/**
 * HSLA to Hex conversion utility
 */
function hslaToHex(h: number, s: number, l: number, a: number = 1): string {
  l /= 100;
  const saturation = s / 100;
  const chroma = (1 - Math.abs(2 * l - 1)) * saturation;
  const x = chroma * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - chroma / 2;
  let r = 0, g = 0, b = 0;

  if (h >= 0 && h < 60) {
    r = chroma; g = x; b = 0;
  } else if (h >= 60 && h < 120) {
    r = x; g = chroma; b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0; g = chroma; b = x;
  } else if (h >= 180 && h < 240) {
    r = 0; g = x; b = chroma;
  } else if (h >= 240 && h < 300) {
    r = x; g = 0; b = chroma;
  } else if (h >= 300 && h < 360) {
    r = chroma; g = 0; b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  const toHex = (n: number) => n.toString(16).padStart(2, '0');

  if (a < 1) {
    const alpha = Math.round(a * 255);
    return `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(alpha)}`;
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/** Primitive palette from public/palette.json */
export const palette = {
  grey: {
      "5": hslaToHex(224, 47, 6, 1),
      "7": hslaToHex(223, 43, 8, 1),
      "10": hslaToHex(222, 39, 9, 1),
      "15": hslaToHex(222, 33, 11, 1),
      "17": hslaToHex(221, 29, 14, 1),
      "20": hslaToHex(221, 24, 16, 1),
      "22": hslaToHex(220, 21, 19, 1),
      "23": hslaToHex(220, 19, 21, 1),
      "25": hslaToHex(219, 17, 23, 1),
      "30": hslaToHex(218, 14, 28, 1),
      "40": hslaToHex(217, 11, 36, 1),
      "50": hslaToHex(216, 9, 45, 1),
      "60": hslaToHex(215, 8, 54, 1),
      "70": hslaToHex(214, 7, 60, 1),
      "80": hslaToHex(214, 8, 69, 1),
      "90": hslaToHex(216, 9, 77, 1),
      "95": hslaToHex(216, 10, 86, 1),
      "96": hslaToHex(216, 10, 89, 1),
      "97": hslaToHex(218, 11, 92, 1),
      "98": hslaToHex(220, 12, 96, 1),
      "99": hslaToHex(220, 14, 97, 1),
    },
  blue: {
      "10": hslaToHex(226, 100, 13, 1),
      "20": hslaToHex(224, 100, 21, 1),
      "30": hslaToHex(222, 100, 31, 1),
      "40": hslaToHex(220, 100, 39, 1),
      "45": hslaToHex(218, 100, 43, 1),
      "50": hslaToHex(216, 100, 47, 1),
      "55": hslaToHex(218, 100, 52, 1),
      "60": hslaToHex(220, 100, 57, 1),
      "65": hslaToHex(222, 100, 62, 1),
      "70": hslaToHex(224, 100, 67, 1),
      "80": hslaToHex(226, 100, 77, 1),
      "90": hslaToHex(224, 100, 87, 1),
      "95": hslaToHex(222, 100, 94, 1),
      "99": hslaToHex(220, 100, 98, 1),
    },
  red: {
      "10": hslaToHex(6, 85, 13, 1),
      "20": hslaToHex(5, 85, 22, 1),
      "30": hslaToHex(4, 85, 32, 1),
      "40": hslaToHex(3, 85, 40, 1),
      "50": hslaToHex(2, 85, 48, 1),
      "60": hslaToHex(1, 78, 54, 1),
      "70": hslaToHex(0, 72, 62, 1),
      "80": hslaToHex(0, 75, 73, 1),
      "90": hslaToHex(0, 80, 85, 1),
      "95": hslaToHex(0, 84, 93, 1),
      "99": hslaToHex(0, 86, 98, 1),
    },
  orange: {
      "10": hslaToHex(18, 80, 12, 1),
      "20": hslaToHex(20, 85, 21, 1),
      "30": hslaToHex(22, 90, 31, 1),
      "40": hslaToHex(24, 95, 40, 1),
      "50": hslaToHex(26, 100, 47, 1),
      "60": hslaToHex(28, 100, 54, 1),
      "70": hslaToHex(30, 100, 63, 1),
      "80": hslaToHex(32, 100, 73, 1),
      "90": hslaToHex(34, 100, 85, 1),
      "95": hslaToHex(36, 100, 93, 1),
      "99": hslaToHex(38, 100, 98, 1),
    },
  yellow: {
      "10": hslaToHex(36, 80, 14, 1),
      "20": hslaToHex(38, 85, 23, 1),
      "30": hslaToHex(40, 90, 34, 1),
      "40": hslaToHex(42, 95, 43, 1),
      "50": hslaToHex(43, 100, 50, 1),
      "60": hslaToHex(44, 100, 56, 1),
      "70": hslaToHex(45, 100, 64, 1),
      "80": hslaToHex(46, 100, 73, 1),
      "90": hslaToHex(47, 100, 84, 1),
      "95": hslaToHex(48, 100, 92, 1),
      "99": hslaToHex(50, 100, 97, 1),
    },
  green: {
      "10": hslaToHex(158, 86, 10, 1),
      "20": hslaToHex(156, 84, 16, 1),
      "30": hslaToHex(155, 82, 24, 1),
      "40": hslaToHex(154, 80, 30, 1),
      "50": hslaToHex(153, 78, 37, 1),
      "60": hslaToHex(152, 70, 44, 1),
      "70": hslaToHex(151, 58, 55, 1),
      "80": hslaToHex(150, 60, 68, 1),
      "90": hslaToHex(149, 65, 81, 1),
      "95": hslaToHex(147, 68, 91, 1),
      "99": hslaToHex(145, 70, 97, 1),
    },
  teal: {
      "10": hslaToHex(184, 90, 10, 1),
      "20": hslaToHex(183, 88, 16, 1),
      "30": hslaToHex(182, 86, 23, 1),
      "40": hslaToHex(181, 84, 29, 1),
      "50": hslaToHex(180, 82, 35, 1),
      "60": hslaToHex(180, 70, 43, 1),
      "70": hslaToHex(179, 55, 54, 1),
      "80": hslaToHex(178, 54, 67, 1),
      "90": hslaToHex(177, 58, 81, 1),
      "95": hslaToHex(176, 62, 91, 1),
      "99": hslaToHex(175, 65, 97, 1),
    },
  purple: {
      "10": hslaToHex(265, 78, 14, 1),
      "20": hslaToHex(266, 76, 22, 1),
      "30": hslaToHex(267, 74, 32, 1),
      "40": hslaToHex(268, 72, 40, 1),
      "50": hslaToHex(269, 70, 47, 1),
      "60": hslaToHex(270, 65, 54, 1),
      "70": hslaToHex(271, 62, 63, 1),
      "80": hslaToHex(272, 65, 74, 1),
      "90": hslaToHex(273, 70, 85, 1),
      "95": hslaToHex(274, 75, 93, 1),
      "99": hslaToHex(275, 80, 98, 1),
    },
  navy: {
      "10": hslaToHex(215, 82, 12, 1),
      "20": hslaToHex(214, 78, 19, 1),
      "30": hslaToHex(213, 73, 27, 1),
      "40": hslaToHex(212, 68, 34, 1),
      "50": hslaToHex(211, 62, 40, 1),
      "60": hslaToHex(210, 55, 47, 1),
      "70": hslaToHex(209, 48, 56, 1),
      "80": hslaToHex(208, 47, 68, 1),
      "90": hslaToHex(207, 50, 81, 1),
      "95": hslaToHex(206, 52, 91, 1),
      "99": hslaToHex(205, 55, 97, 1),
    },
  pink: {
      "10": hslaToHex(320, 88, 14, 1),
      "20": hslaToHex(322, 86, 22, 1),
      "30": hslaToHex(324, 84, 32, 1),
      "40": hslaToHex(326, 82, 40, 1),
      "50": hslaToHex(328, 80, 48, 1),
      "60": hslaToHex(330, 75, 55, 1),
      "70": hslaToHex(332, 72, 64, 1),
      "80": hslaToHex(334, 74, 75, 1),
      "90": hslaToHex(336, 78, 86, 1),
      "95": hslaToHex(338, 82, 93, 1),
      "99": hslaToHex(340, 85, 98, 1),
    },
  cyan: {
      "10": hslaToHex(208, 94, 11, 1),
      "20": hslaToHex(206, 92, 18, 1),
      "30": hslaToHex(204, 90, 26, 1),
      "40": hslaToHex(202, 88, 33, 1),
      "50": hslaToHex(200, 85, 40, 1),
      "60": hslaToHex(198, 78, 48, 1),
      "70": hslaToHex(196, 72, 60, 1),
      "80": hslaToHex(194, 74, 72, 1),
      "90": hslaToHex(192, 78, 84, 1),
      "95": hslaToHex(190, 82, 92, 1),
      "99": hslaToHex(188, 85, 97, 1),
    },
  lime: {
      "10": hslaToHex(105, 90, 10, 1),
      "20": hslaToHex(103, 88, 16, 1),
      "30": hslaToHex(101, 86, 24, 1),
      "40": hslaToHex(99, 84, 31, 1),
      "50": hslaToHex(97, 82, 38, 1),
      "60": hslaToHex(95, 75, 45, 1),
      "70": hslaToHex(93, 65, 55, 1),
      "80": hslaToHex(91, 64, 69, 1),
      "90": hslaToHex(89, 68, 82, 1),
      "95": hslaToHex(87, 72, 91, 1),
      "99": hslaToHex(85, 75, 97, 1),
    },
  static: {
      white: hslaToHex(0, 0, 100, 1),
      black: hslaToHex(0, 0, 0, 1),
    },
  brandExternal: {
      kakao: "#FEE500",
      kakaoPressed: "#D4BF00",
      googlePressed: "#f1f3f4",
    },
  alphaComposite: {
      brandSelectionLight: hslaToHex(216, 100, 47, 0.15),
      brandSelectionDark: hslaToHex(220, 100, 57, 0.2),
      fillLightNormal: hslaToHex(216, 9, 45, 0.22),
      fillLightStrong: hslaToHex(216, 9, 45, 0.28),
      fillLightAlternative: hslaToHex(216, 9, 45, 0.12),
      fillDarkNormal: hslaToHex(216, 9, 77, 0.22),
      fillDarkStrong: hslaToHex(216, 9, 77, 0.28),
      fillDarkAlternative: hslaToHex(216, 9, 77, 0.12),
      overlayLightTransparent: hslaToHex(222, 33, 11, 0),
      overlayLightDim: hslaToHex(222, 33, 11, 0.4),
      overlayLightHeavy: hslaToHex(222, 33, 11, 0.85),
      overlayDarkTransparent: hslaToHex(222, 33, 11, 0),
      overlayDarkDim: hslaToHex(222, 33, 11, 0.72),
      overlayDarkHeavy: hslaToHex(222, 33, 11, 0.93),
    },
  opacity: {
      "5": 0.05,
      "8": 0.08,
      "12": 0.12,
      "16": 0.16,
      "22": 0.22,
      "28": 0.28,
      "35": 0.35,
      "43": 0.43,
      "52": 0.52,
      "61": 0.61,
      "74": 0.74,
      "88": 0.88,
      "97": 0.97,
    },
} as const;

/** Semantic color tokens (light) from public/semantic-tokens.json */
export const colors = {
  surface: {
    base: {
      default: palette.static.white,
      alternative: palette.grey["99"],
      container: palette.grey["97"],
      containerPressed: palette.grey["95"],
    },
    elevated: {
      default: palette.static.white,
      alternative: palette.grey["99"],
    },
    brand: {
      default: palette.blue["50"],
      defaultPressed: palette.blue["45"],
      secondary: palette.blue["95"],
      secondaryPressed: palette.blue["90"],
    },
    error: {
      default: palette.red["95"],
      defaultPressed: palette.red["90"],
      solid: palette.red["50"],
      solidPressed: palette.red["40"],
    },
    warning: {
      default: palette.orange["95"],
    },
    success: {
      default: palette.green["95"],
      defaultPressed: palette.green["90"],
      solid: palette.green["50"],
      solidPressed: palette.green["40"],
    },
    info: {
      default: palette.grey["97"],
    },
    disabled: {
      default: palette.grey["95"],
    },
    kakao: {
      default: palette.brandExternal.kakao,
      defaultPressed: palette.brandExternal.kakaoPressed,
    },
    google: {
      default: palette.static.white,
      defaultPressed: palette.brandExternal.googlePressed,
    },
  },
  content: {
    base: {
      strong: palette.grey["15"],
      default: palette.grey["30"],
      secondary: palette.grey["50"],
      neutral: palette.grey["60"],
      alternative: palette.grey["70"],
      placeholder: palette.grey["70"],
      assistive: palette.grey["80"],
      disabled: palette.grey["80"],
      onColor: palette.static.white,
    },
    brand: {
      default: palette.blue["50"],
    },
    error: {
      default: palette.red["50"],
    },
    warning: {
      default: palette.orange["50"],
      strong: palette.orange["30"],
    },
    success: {
      default: palette.green["50"],
      strong: palette.green["30"],
    },
    info: {
      default: palette.teal["50"],
      strong: palette.teal["30"],
    },
    profit: {
      default: palette.red["50"],
    },
    loss: {
      default: palette.blue["50"],
    },
    disabled: {
      default: palette.grey["80"],
    },
  },
  border: {
    base: {
      default: palette.grey["95"],
      defaultPressed: palette.grey["90"],
    },
    secondary: {
      default: palette.grey["90"],
      defaultPressed: palette.grey["80"],
    },
    solid: {
      default: palette.grey["90"],
      neutral: palette.grey["95"],
      alternative: palette.grey["97"],
    },
    brand: {
      default: palette.blue["50"],
      defaultPressed: palette.blue["45"],
    },
    disabled: {
      default: palette.grey["90"],
    },
    error: {
      default: palette.red["50"],
      defaultPressed: palette.red["40"],
    },
    success: {
      default: palette.green["50"],
      defaultPressed: palette.green["40"],
    },
  },
  fill: {
    normal: palette.alphaComposite.fillLightNormal,
    strong: palette.alphaComposite.fillLightStrong,
    alternative: palette.alphaComposite.fillLightAlternative,
  },
  interaction: {
    inactive: palette.grey["70"],
    disabled: palette.grey["90"],
  },
  visualization: {
    categorical: {
      "1": palette.blue["50"],
      "2": palette.blue["65"],
      "3": palette.blue["80"],
      "4": palette.teal["50"],
      "5": palette.green["50"],
      "6": palette.purple["50"],
      "7": palette.orange["50"],
      "8": palette.grey["50"],
    },
  },
  icon: {
    default: palette.grey["50"],
    secondary: palette.grey["60"],
    disabled: palette.grey["80"],
    brand: palette.blue["50"],
  },
  overlay: {
    dim: palette.alphaComposite.overlayLightDim,
    heavy: palette.alphaComposite.overlayLightHeavy,
  },
  inverse: {
    surface: {
      default: palette.grey["15"],
      alternative: palette.grey["20"],
    },
    content: {
      default: palette.grey["99"],
      secondary: palette.grey["95"],
    },
    border: {
      default: palette.grey["40"],
      secondary: palette.grey["50"],
    },
    icon: {
      default: palette.grey["95"],
    },
  },
  status: {
    positive: {
      surface: palette.green["95"],
      content: palette.green["50"],
      border: palette.green["50"],
    },
    cautionary: {
      surface: palette.orange["95"],
      content: palette.orange["50"],
      border: palette.orange["50"],
    },
    negative: {
      surface: palette.red["95"],
      content: palette.red["50"],
      border: palette.red["50"],
    },
  },
  component: {
    button: {
      primarySurface: palette.blue["50"],
      primarySurfacePressed: palette.blue["45"],
      primaryContent: palette.static.white,
      secondarySurface: palette.blue["95"],
      secondarySurfacePressed: palette.blue["90"],
      secondaryContent: palette.blue["50"],
      secondaryBorder: palette.blue["50"],
      destructiveSurface: palette.red["50"],
      destructiveSurfacePressed: palette.red["40"],
      destructiveContent: palette.static.white,
    },
    input: {
      surface: palette.static.white,
      border: palette.grey["95"],
      focusBorder: palette.blue["50"],
      content: palette.grey["30"],
      placeholder: palette.grey["70"],
      focusRing: palette.alphaComposite.brandSelectionLight,
    },
    chip: {
      neutralSurface: palette.alphaComposite.fillLightNormal,
      neutralContent: palette.grey["30"],
      neutralBorder: palette.grey["95"],
      selectedSurface: palette.blue["95"],
      selectedContent: palette.blue["50"],
    },
  },
} as const;

/** Semantic color tokens (dark) from public/semantic-tokens.json */
export const darkColors = {
  surface: {
    base: {
      default: palette.grey["15"],
      alternative: palette.grey["10"],
      container: palette.grey["20"],
      containerPressed: palette.grey["23"],
    },
    elevated: {
      default: palette.grey["17"],
      alternative: palette.grey["20"],
    },
    brand: {
      default: palette.blue["55"],
      defaultPressed: palette.blue["60"],
      secondary: palette.blue["20"],
      secondaryPressed: palette.blue["30"],
    },
    error: {
      default: palette.red["20"],
      defaultPressed: palette.red["30"],
      solid: palette.red["60"],
      solidPressed: palette.red["70"],
    },
    warning: {
      default: palette.orange["20"],
    },
    success: {
      default: palette.green["20"],
      defaultPressed: palette.green["30"],
      solid: palette.green["60"],
      solidPressed: palette.green["70"],
    },
    info: {
      default: palette.grey["20"],
    },
    disabled: {
      default: palette.grey["22"],
    },
    kakao: {
      default: palette.brandExternal.kakao,
      defaultPressed: palette.brandExternal.kakaoPressed,
    },
    google: {
      default: palette.grey["17"],
      defaultPressed: palette.grey["20"],
    },
  },
  content: {
    base: {
      strong: palette.grey["99"],
      default: palette.grey["95"],
      secondary: palette.grey["80"],
      neutral: palette.grey["70"],
      alternative: palette.grey["60"],
      placeholder: palette.grey["50"],
      assistive: palette.grey["40"],
      disabled: palette.grey["30"],
      onColor: palette.static.white,
    },
    brand: {
      default: palette.blue["60"],
    },
    error: {
      default: palette.red["60"],
    },
    warning: {
      default: palette.orange["60"],
      strong: palette.orange["80"],
    },
    success: {
      default: palette.green["60"],
      strong: palette.green["80"],
    },
    info: {
      default: palette.teal["60"],
      strong: palette.teal["80"],
    },
    profit: {
      default: palette.red["60"],
    },
    loss: {
      default: palette.blue["60"],
    },
    disabled: {
      default: palette.grey["40"],
    },
  },
  border: {
    base: {
      default: palette.grey["25"],
      defaultPressed: palette.grey["30"],
    },
    secondary: {
      default: palette.grey["30"],
      defaultPressed: palette.grey["40"],
    },
    solid: {
      default: palette.grey["25"],
      neutral: palette.grey["23"],
      alternative: palette.grey["22"],
    },
    brand: {
      default: palette.blue["55"],
      defaultPressed: palette.blue["60"],
    },
    disabled: {
      default: palette.grey["30"],
    },
    error: {
      default: palette.red["60"],
      defaultPressed: palette.red["70"],
    },
    success: {
      default: palette.green["60"],
      defaultPressed: palette.green["70"],
    },
  },
  fill: {
    normal: palette.alphaComposite.fillDarkNormal,
    strong: palette.alphaComposite.fillDarkStrong,
    alternative: palette.alphaComposite.fillDarkAlternative,
  },
  interaction: {
    inactive: palette.grey["40"],
    disabled: palette.grey["25"],
  },
  visualization: {
    categorical: {
      "1": palette.blue["60"],
      "2": palette.blue["70"],
      "3": palette.blue["80"],
      "4": palette.teal["60"],
      "5": palette.green["60"],
      "6": palette.purple["60"],
      "7": palette.orange["60"],
      "8": palette.grey["60"],
    },
  },
  icon: {
    default: palette.grey["80"],
    secondary: palette.grey["60"],
    disabled: palette.grey["40"],
    brand: palette.blue["60"],
  },
  overlay: {
    dim: palette.alphaComposite.overlayDarkDim,
    heavy: palette.alphaComposite.overlayDarkHeavy,
  },
  inverse: {
    surface: {
      default: palette.grey["99"],
      alternative: palette.grey["95"],
    },
    content: {
      default: palette.grey["15"],
      secondary: palette.grey["30"],
    },
    border: {
      default: palette.grey["80"],
      secondary: palette.grey["70"],
    },
    icon: {
      default: palette.grey["30"],
    },
  },
  status: {
    positive: {
      surface: palette.green["20"],
      content: palette.green["60"],
      border: palette.green["60"],
    },
    cautionary: {
      surface: palette.orange["20"],
      content: palette.orange["60"],
      border: palette.orange["60"],
    },
    negative: {
      surface: palette.red["20"],
      content: palette.red["60"],
      border: palette.red["60"],
    },
  },
  component: {
    button: {
      primarySurface: palette.blue["55"],
      primarySurfacePressed: palette.blue["60"],
      primaryContent: palette.static.white,
      secondarySurface: palette.blue["20"],
      secondarySurfacePressed: palette.blue["30"],
      secondaryContent: palette.blue["60"],
      secondaryBorder: palette.blue["55"],
      destructiveSurface: palette.red["60"],
      destructiveSurfacePressed: palette.red["70"],
      destructiveContent: palette.static.white,
    },
    input: {
      surface: palette.grey["20"],
      border: palette.grey["25"],
      focusBorder: palette.blue["55"],
      content: palette.grey["95"],
      placeholder: palette.grey["50"],
      focusRing: palette.alphaComposite.brandSelectionDark,
    },
    chip: {
      neutralSurface: palette.alphaComposite.fillDarkNormal,
      neutralContent: palette.grey["95"],
      neutralBorder: palette.grey["25"],
      selectedSurface: palette.blue["20"],
      selectedContent: palette.blue["60"],
    },
  },
} as const;

/**
 * @deprecated Legacy alias for compatibility. Use darkColors for theme mapping.
 */
export const darkPalette = palette;

export const brandColors = colors.surface.brand;
export const errorColors = colors.surface.error;
export const successColors = colors.surface.success;
export const warningColors = colors.surface.warning;
export const infoColors = colors.surface.info;

export const darkBrandColors = darkColors.surface.brand;
export const darkErrorColors = darkColors.surface.error;
export const darkSuccessColors = darkColors.surface.success;
export const darkWarningColors = darkColors.surface.warning;
export const darkInfoColors = darkColors.surface.info;

export type ColorToken = typeof colors;
export type DarkColorToken = typeof darkColors;
export type PaletteToken = typeof palette;
export type DarkPaletteToken = typeof darkPalette;
