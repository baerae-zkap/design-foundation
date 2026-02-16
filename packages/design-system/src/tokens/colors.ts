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
      defaultPressed: palette.orange["90"],
      solid: palette.orange["50"],
      solidPressed: palette.orange["40"],
    },
    success: {
      default: palette.green["95"],
      defaultPressed: palette.green["90"],
      solid: palette.green["50"],
      solidPressed: palette.green["40"],
    },
    info: {
      default: palette.grey["97"],
      defaultPressed: palette.grey["95"],
      solid: palette.teal["50"],
      solidPressed: palette.teal["40"],
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
      onSolid: palette.static.white,
    },
    warning: {
      default: palette.orange["50"],
      strong: palette.orange["30"],
      onSolid: palette.grey["15"],
    },
    success: {
      default: palette.green["50"],
      strong: palette.green["30"],
      onSolid: palette.static.white,
    },
    info: {
      default: palette.teal["50"],
      strong: palette.teal["30"],
      onSolid: palette.static.white,
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
    warning: {
      default: palette.orange["50"],
      defaultPressed: palette.orange["40"],
    },
    info: {
      default: palette.teal["50"],
      defaultPressed: palette.teal["40"],
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
    error: palette.red["50"],
    success: palette.green["50"],
    warning: palette.orange["50"],
    info: palette.teal["50"],
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
  component: {
    button: {
      surface: {
        primary: palette.blue["50"],
        primaryPressed: palette.blue["45"],
        secondary: palette.blue["95"],
        secondaryPressed: palette.blue["90"],
        destructive: palette.red["50"],
        destructivePressed: palette.red["40"],
      },
      content: {
        primary: palette.static.white,
        secondary: palette.blue["50"],
        destructive: palette.static.white,
      },
      border: {
        secondary: palette.blue["50"],
      },
    },
    input: {
      surface: palette.static.white,
      border: {
        default: palette.grey["95"],
        focus: palette.blue["50"],
      },
      content: palette.grey["30"],
      placeholder: palette.grey["70"],
      ring: {
        focus: palette.alphaComposite.brandSelectionLight,
      },
    },
    chip: {
      surface: {
        neutral: palette.alphaComposite.fillLightNormal,
        selected: palette.blue["95"],
      },
      content: {
        neutral: palette.grey["30"],
        selected: palette.blue["50"],
      },
      border: {
        neutral: palette.grey["95"],
      },
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
      defaultPressed: palette.orange["30"],
      solid: palette.orange["60"],
      solidPressed: palette.orange["70"],
    },
    success: {
      default: palette.green["20"],
      defaultPressed: palette.green["30"],
      solid: palette.green["60"],
      solidPressed: palette.green["70"],
    },
    info: {
      default: palette.grey["20"],
      defaultPressed: palette.grey["22"],
      solid: palette.teal["60"],
      solidPressed: palette.teal["70"],
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
      onSolid: palette.static.white,
    },
    warning: {
      default: palette.orange["60"],
      strong: palette.orange["80"],
      onSolid: palette.static.white,
    },
    success: {
      default: palette.green["60"],
      strong: palette.green["80"],
      onSolid: palette.static.white,
    },
    info: {
      default: palette.teal["60"],
      strong: palette.teal["80"],
      onSolid: palette.static.white,
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
    warning: {
      default: palette.orange["60"],
      defaultPressed: palette.orange["70"],
    },
    info: {
      default: palette.teal["60"],
      defaultPressed: palette.teal["70"],
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
    error: palette.red["60"],
    success: palette.green["60"],
    warning: palette.orange["60"],
    info: palette.teal["60"],
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
  component: {
    button: {
      surface: {
        primary: palette.blue["55"],
        primaryPressed: palette.blue["60"],
        secondary: palette.blue["20"],
        secondaryPressed: palette.blue["30"],
        destructive: palette.red["60"],
        destructivePressed: palette.red["70"],
      },
      content: {
        primary: palette.static.white,
        secondary: palette.blue["60"],
        destructive: palette.static.white,
      },
      border: {
        secondary: palette.blue["55"],
      },
    },
    input: {
      surface: palette.grey["20"],
      border: {
        default: palette.grey["25"],
        focus: palette.blue["55"],
      },
      content: palette.grey["95"],
      placeholder: palette.grey["50"],
      ring: {
        focus: palette.alphaComposite.brandSelectionDark,
      },
    },
    chip: {
      surface: {
        neutral: palette.alphaComposite.fillDarkNormal,
        selected: palette.blue["20"],
      },
      content: {
        neutral: palette.grey["95"],
        selected: palette.blue["60"],
      },
      border: {
        neutral: palette.grey["25"],
      },
    },
  },
} as const;

/**
 * CSS Variable reference map for web components.
 * Same shape as `colors` but values are CSS variable strings.
 * Use this instead of `colors` in web components for theme-aware rendering.
 */
export const cssVarColors = {
  surface: {
    base: {
      default: 'var(--surface-base-default)' as const,
      alternative: 'var(--surface-base-alternative)' as const,
      container: 'var(--surface-base-container)' as const,
      containerPressed: 'var(--surface-base-containerPressed)' as const,
    },
    elevated: {
      default: 'var(--surface-elevated-default)' as const,
      alternative: 'var(--surface-elevated-alternative)' as const,
    },
    brand: {
      default: 'var(--surface-brand-default)' as const,
      defaultPressed: 'var(--surface-brand-defaultPressed)' as const,
      secondary: 'var(--surface-brand-secondary)' as const,
      secondaryPressed: 'var(--surface-brand-secondaryPressed)' as const,
    },
    error: {
      default: 'var(--surface-error-default)' as const,
      defaultPressed: 'var(--surface-error-defaultPressed)' as const,
      solid: 'var(--surface-error-solid)' as const,
      solidPressed: 'var(--surface-error-solidPressed)' as const,
    },
    warning: {
      default: 'var(--surface-warning-default)' as const,
      defaultPressed: 'var(--surface-warning-defaultPressed)' as const,
      solid: 'var(--surface-warning-solid)' as const,
      solidPressed: 'var(--surface-warning-solidPressed)' as const,
    },
    success: {
      default: 'var(--surface-success-default)' as const,
      defaultPressed: 'var(--surface-success-defaultPressed)' as const,
      solid: 'var(--surface-success-solid)' as const,
      solidPressed: 'var(--surface-success-solidPressed)' as const,
    },
    info: {
      default: 'var(--surface-info-default)' as const,
      defaultPressed: 'var(--surface-info-defaultPressed)' as const,
      solid: 'var(--surface-info-solid)' as const,
      solidPressed: 'var(--surface-info-solidPressed)' as const,
    },
    disabled: {
      default: 'var(--surface-disabled-default)' as const,
    },
    kakao: {
      default: 'var(--surface-kakao-default)' as const,
      defaultPressed: 'var(--surface-kakao-defaultPressed)' as const,
    },
    google: {
      default: 'var(--surface-google-default)' as const,
      defaultPressed: 'var(--surface-google-defaultPressed)' as const,
    },
  },
  content: {
    base: {
      strong: 'var(--content-base-strong)' as const,
      default: 'var(--content-base-default)' as const,
      secondary: 'var(--content-base-secondary)' as const,
      neutral: 'var(--content-base-neutral)' as const,
      alternative: 'var(--content-base-alternative)' as const,
      placeholder: 'var(--content-base-placeholder)' as const,
      assistive: 'var(--content-base-assistive)' as const,
      disabled: 'var(--content-base-disabled)' as const,
      onColor: 'var(--content-base-onColor)' as const,
    },
    brand: {
      default: 'var(--content-brand-default)' as const,
    },
    error: {
      default: 'var(--content-error-default)' as const,
      onSolid: 'var(--content-error-onSolid)' as const,
    },
    warning: {
      default: 'var(--content-warning-default)' as const,
      strong: 'var(--content-warning-strong)' as const,
      onSolid: 'var(--content-warning-onSolid)' as const,
    },
    success: {
      default: 'var(--content-success-default)' as const,
      strong: 'var(--content-success-strong)' as const,
      onSolid: 'var(--content-success-onSolid)' as const,
    },
    info: {
      default: 'var(--content-info-default)' as const,
      strong: 'var(--content-info-strong)' as const,
      onSolid: 'var(--content-info-onSolid)' as const,
    },
    profit: {
      default: 'var(--content-profit-default)' as const,
    },
    loss: {
      default: 'var(--content-loss-default)' as const,
    },
    disabled: {
      default: 'var(--content-disabled-default)' as const,
    },
  },
  border: {
    base: {
      default: 'var(--border-base-default)' as const,
      defaultPressed: 'var(--border-base-defaultPressed)' as const,
    },
    secondary: {
      default: 'var(--border-secondary-default)' as const,
      defaultPressed: 'var(--border-secondary-defaultPressed)' as const,
    },
    solid: {
      default: 'var(--border-solid-default)' as const,
      neutral: 'var(--border-solid-neutral)' as const,
      alternative: 'var(--border-solid-alternative)' as const,
    },
    brand: {
      default: 'var(--border-brand-default)' as const,
      defaultPressed: 'var(--border-brand-defaultPressed)' as const,
    },
    disabled: {
      default: 'var(--border-disabled-default)' as const,
    },
    error: {
      default: 'var(--border-error-default)' as const,
      defaultPressed: 'var(--border-error-defaultPressed)' as const,
    },
    success: {
      default: 'var(--border-success-default)' as const,
      defaultPressed: 'var(--border-success-defaultPressed)' as const,
    },
    warning: {
      default: 'var(--border-warning-default)' as const,
      defaultPressed: 'var(--border-warning-defaultPressed)' as const,
    },
    info: {
      default: 'var(--border-info-default)' as const,
      defaultPressed: 'var(--border-info-defaultPressed)' as const,
    },
  },
  fill: {
    normal: 'var(--fill-normal)' as const,
    strong: 'var(--fill-strong)' as const,
    alternative: 'var(--fill-alternative)' as const,
  },
  interaction: {
    inactive: 'var(--interaction-inactive)' as const,
    disabled: 'var(--interaction-disabled)' as const,
  },
  visualization: {
    categorical: {
      "1": 'var(--visualization-categorical-1)' as const,
      "2": 'var(--visualization-categorical-2)' as const,
      "3": 'var(--visualization-categorical-3)' as const,
      "4": 'var(--visualization-categorical-4)' as const,
      "5": 'var(--visualization-categorical-5)' as const,
      "6": 'var(--visualization-categorical-6)' as const,
      "7": 'var(--visualization-categorical-7)' as const,
      "8": 'var(--visualization-categorical-8)' as const,
    },
  },
  icon: {
    default: 'var(--icon-default)' as const,
    secondary: 'var(--icon-secondary)' as const,
    disabled: 'var(--icon-disabled)' as const,
    brand: 'var(--icon-brand)' as const,
    error: 'var(--icon-error)' as const,
    success: 'var(--icon-success)' as const,
    warning: 'var(--icon-warning)' as const,
    info: 'var(--icon-info)' as const,
  },
  overlay: {
    dim: 'var(--overlay-dim)' as const,
    heavy: 'var(--overlay-heavy)' as const,
  },
  inverse: {
    surface: {
      default: 'var(--inverse-surface-default)' as const,
      alternative: 'var(--inverse-surface-alternative)' as const,
    },
    content: {
      default: 'var(--inverse-content-default)' as const,
      secondary: 'var(--inverse-content-secondary)' as const,
    },
    border: {
      default: 'var(--inverse-border-default)' as const,
      secondary: 'var(--inverse-border-secondary)' as const,
    },
    icon: {
      default: 'var(--inverse-icon-default)' as const,
    },
  },
  component: {
    button: {
      surface: {
        primary: 'var(--component-button-surface-primary)' as const,
        primaryPressed: 'var(--component-button-surface-primaryPressed)' as const,
        secondary: 'var(--component-button-surface-secondary)' as const,
        secondaryPressed: 'var(--component-button-surface-secondaryPressed)' as const,
        destructive: 'var(--component-button-surface-destructive)' as const,
        destructivePressed: 'var(--component-button-surface-destructivePressed)' as const,
      },
      content: {
        primary: 'var(--component-button-content-primary)' as const,
        secondary: 'var(--component-button-content-secondary)' as const,
        destructive: 'var(--component-button-content-destructive)' as const,
      },
      border: {
        secondary: 'var(--component-button-border-secondary)' as const,
      },
    },
    input: {
      surface: 'var(--component-input-surface)' as const,
      border: {
        default: 'var(--component-input-border-default)' as const,
        focus: 'var(--component-input-border-focus)' as const,
      },
      content: 'var(--component-input-content)' as const,
      placeholder: 'var(--component-input-placeholder)' as const,
      ring: {
        focus: 'var(--component-input-ring-focus)' as const,
      },
    },
    chip: {
      surface: {
        neutral: 'var(--component-chip-surface-neutral)' as const,
        selected: 'var(--component-chip-surface-selected)' as const,
      },
      content: {
        neutral: 'var(--component-chip-content-neutral)' as const,
        selected: 'var(--component-chip-content-selected)' as const,
      },
      border: {
        neutral: 'var(--component-chip-border-neutral)' as const,
      },
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
export type CssVarColorToken = typeof cssVarColors;
