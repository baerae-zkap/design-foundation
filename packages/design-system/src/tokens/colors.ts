/**
 * Color Tokens
 *
 * Foundation 토큰에서 추출한 resolved color values (HSLA → Hex 변환)
 *
 * 기반 파일:
 * - /Users/jaden/design-foundation/public/palette.json
 * - /Users/jaden/design-foundation/public/semantic-tokens.json
 */

/**
 * HSLA to Hex 변환 함수
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

/**
 * Palette Colors (Raw HSLA → Hex)
 */
export const palette = {
  grey: {
    99: hslaToHex(220, 14, 97, 1),    // #f7f8f9
    98: hslaToHex(220, 12, 96, 1),    // #f5f6f7
    97: hslaToHex(218, 11, 92, 1),    // #eaebed
    96: hslaToHex(216, 10, 89, 1),    // #e0e2e5
    95: hslaToHex(216, 10, 86, 1),    // #d6d9dd
    90: hslaToHex(216, 9, 77, 1),     // #bcc1c7
    80: hslaToHex(214, 8, 69, 1),     // #a7adb5
    70: hslaToHex(214, 7, 60, 1),     // #92999f
    60: hslaToHex(215, 8, 54, 1),     // #7d8590
    50: hslaToHex(216, 9, 45, 1),     // #68707a
    40: hslaToHex(217, 11, 36, 1),    // #525a65
    30: hslaToHex(218, 14, 28, 1),    // #3e4651
    25: hslaToHex(219, 17, 23, 1),    // #313842
    23: hslaToHex(220, 19, 21, 1),    // #2b3138
    22: hslaToHex(220, 21, 19, 1),    // #262d33
    20: hslaToHex(221, 24, 16, 1),    // #1f252b
    17: hslaToHex(221, 29, 14, 1),    // #1a2026
    15: hslaToHex(222, 33, 11, 1),    // #131a1f
    10: hslaToHex(222, 39, 9, 1),     // #0e1318
    7: hslaToHex(223, 43, 8, 1),      // #0c1014
    5: hslaToHex(224, 47, 6, 1),      // #080d0f
  },
  blue: {
    99: hslaToHex(220, 100, 98, 1),   // #f7f9ff
    98: hslaToHex(221, 100, 97, 1),   // #f0f5ff
    95: hslaToHex(222, 100, 94, 1),   // #e3ecff
    90: hslaToHex(224, 100, 87, 1),   // #c7dbff
    80: hslaToHex(226, 100, 77, 1),   // #99c0ff
    70: hslaToHex(224, 100, 67, 1),   // #66a3ff
    65: hslaToHex(222, 100, 62, 1),   // #4d94ff
    60: hslaToHex(220, 100, 57, 1),   // #3385ff
    55: hslaToHex(218, 100, 52, 1),   // #1a75ff
    50: hslaToHex(216, 100, 47, 1),   // #0066ff
    45: hslaToHex(218, 100, 43, 1),   // #005cd6
    40: hslaToHex(220, 100, 39, 1),   // #0052bd
    30: hslaToHex(222, 100, 31, 1),   // #00428f
    20: hslaToHex(224, 100, 21, 1),   // #002e61
    10: hslaToHex(226, 100, 13, 1),   // #001d3d
  },
  red: {
    99: hslaToHex(0, 86, 98, 1),      // #fef7f7
    98: hslaToHex(0, 85, 97, 1),      // #fef4f4
    95: hslaToHex(0, 84, 93, 1),      // #fce8e8
    90: hslaToHex(0, 80, 85, 1),      // #f8d1d1
    80: hslaToHex(0, 75, 73, 1),      // #f1a6a6
    70: hslaToHex(0, 72, 62, 1),      // #e87c7c
    60: hslaToHex(1, 78, 54, 1),      // #e35555
    50: hslaToHex(2, 85, 48, 1),      // #dc2f2f
    45: hslaToHex(2, 85, 44, 1),      // #ca2b2b
    40: hslaToHex(3, 85, 40, 1),      // #b92626
    30: hslaToHex(4, 85, 32, 1),      // #961e1e
    20: hslaToHex(5, 85, 22, 1),      // #681616
    10: hslaToHex(6, 85, 13, 1),      // #3d0d0d
  },
  orange: {
    99: hslaToHex(38, 100, 98, 1),    // #fffbf7
    95: hslaToHex(36, 100, 93, 1),    // #fff2e3
    90: hslaToHex(34, 100, 85, 1),    // #ffe5c7
    80: hslaToHex(32, 100, 73, 1),    // #ffd199
    70: hslaToHex(30, 100, 63, 1),    // #ffbe66
    60: hslaToHex(28, 100, 54, 1),    // #ffaa33
    50: hslaToHex(26, 100, 47, 1),    // #ff9900
    40: hslaToHex(24, 95, 40, 1),     // #d17d00
    30: hslaToHex(22, 90, 31, 1),     // #9e5e00
    20: hslaToHex(20, 85, 21, 1),     // #663d00
    10: hslaToHex(18, 80, 12, 1),     // #332000
  },
  yellow: {
    99: hslaToHex(50, 100, 97, 1),    // #fffef4
    95: hslaToHex(48, 100, 92, 1),    // #fffde1
    90: hslaToHex(47, 100, 84, 1),    // #fffac2
    80: hslaToHex(46, 100, 73, 1),    // #fff685
    70: hslaToHex(45, 100, 64, 1),    // #fff247
    60: hslaToHex(44, 100, 56, 1),    // #ffed0a
    50: hslaToHex(43, 100, 50, 1),    // #ffe600
    40: hslaToHex(42, 95, 43, 1),     // #d4bf00
    30: hslaToHex(40, 90, 34, 1),     // #9e8f00
    20: hslaToHex(38, 85, 23, 1),     // #665d00
    10: hslaToHex(36, 80, 14, 1),     // #332e00
  },
  green: {
    99: hslaToHex(145, 70, 97, 1),    // #f4fcf9
    98: hslaToHex(146, 69, 95, 1),    // #ecfaf4
    95: hslaToHex(147, 68, 91, 1),    // #dff8ef
    90: hslaToHex(149, 65, 81, 1),    // #b8f0da
    80: hslaToHex(150, 60, 68, 1),    // #7ee3ba
    70: hslaToHex(151, 58, 55, 1),    // #48d69a
    60: hslaToHex(152, 70, 44, 1),    // #1fc97b
    50: hslaToHex(153, 78, 37, 1),    // #14b66b
    45: hslaToHex(153, 79, 33, 1),    // #12a45f
    40: hslaToHex(154, 80, 30, 1),    // #109458
    30: hslaToHex(155, 82, 24, 1),    // #0d7447
    20: hslaToHex(156, 84, 16, 1),    // #094f31
    10: hslaToHex(158, 86, 10, 1),    // #052d1b
  },
  teal: {
    99: hslaToHex(175, 65, 97, 1),    // #f4fcfb
    95: hslaToHex(176, 62, 91, 1),    // #dff8f5
    90: hslaToHex(177, 58, 81, 1),    // #b8f0e9
    80: hslaToHex(178, 54, 67, 1),    // #7ee3d8
    70: hslaToHex(179, 55, 54, 1),    // #48d6c7
    60: hslaToHex(180, 70, 43, 1),    // #1fc9ba
    50: hslaToHex(180, 82, 35, 1),    // #14b6a8
    40: hslaToHex(181, 84, 29, 1),    // #109489
    30: hslaToHex(182, 86, 23, 1),    // #0d746b
    20: hslaToHex(183, 88, 16, 1),    // #094f49
    10: hslaToHex(184, 90, 10, 1),    // #052d2a
  },
  purple: {
    99: hslaToHex(275, 80, 98, 1),    // #fcf8ff
    95: hslaToHex(274, 75, 93, 1),    // #f3e8fe
    90: hslaToHex(273, 70, 85, 1),    // #e3ccfc
    80: hslaToHex(272, 65, 74, 1),    // #ca9ff8
    70: hslaToHex(271, 62, 63, 1),    // #b173f4
    60: hslaToHex(270, 65, 54, 1),    // #9a4def
    50: hslaToHex(269, 70, 47, 1),    // #8428e8
    40: hslaToHex(268, 72, 40, 1),    // #6d1ec3
    30: hslaToHex(267, 74, 32, 1),    // #57189b
    20: hslaToHex(266, 76, 22, 1),    // #3a1068
    10: hslaToHex(265, 78, 14, 1),    // #22093d
  },
  navy: {
    99: hslaToHex(205, 55, 97, 1),    // #f5f9fc
    95: hslaToHex(206, 52, 91, 1),    // #dfeaf5
    90: hslaToHex(207, 50, 81, 1),    // #b8d7ea
    80: hslaToHex(208, 47, 68, 1),    // #7eb9dc
    70: hslaToHex(209, 48, 56, 1),    // #499fce
    60: hslaToHex(210, 55, 47, 1),    // #2187be
    50: hslaToHex(211, 62, 40, 1),    // #1a6fa1
    40: hslaToHex(212, 68, 34, 1),    // #155b84
    30: hslaToHex(213, 73, 27, 1),    // #11486b
    20: hslaToHex(214, 78, 19, 1),    // #0c314a
    10: hslaToHex(215, 82, 12, 1),    // #071d2d
  },
  pink: {
    99: hslaToHex(340, 85, 98, 1),    // #fef7f9
    95: hslaToHex(338, 82, 93, 1),    // #fce8ef
    90: hslaToHex(336, 78, 86, 1),    // #f8ccdb
    80: hslaToHex(334, 74, 75, 1),    // #f19fbe
    70: hslaToHex(332, 72, 64, 1),    // #e873a1
    60: hslaToHex(330, 75, 55, 1),    // #e14d88
    50: hslaToHex(328, 80, 48, 1),    // #da2873
    40: hslaToHex(326, 82, 40, 1),    // #b61e5d
    30: hslaToHex(324, 84, 32, 1),    // #921849
    20: hslaToHex(322, 86, 22, 1),    // #641032
    10: hslaToHex(320, 88, 14, 1),    // #3a091d
  },
  cyan: {
    99: hslaToHex(188, 85, 97, 1),    // #f4fcfd
    95: hslaToHex(190, 82, 92, 1),    // #dff8fb
    90: hslaToHex(192, 78, 84, 1),    // #b8f0f7
    80: hslaToHex(194, 74, 72, 1),    // #7ee3ef
    70: hslaToHex(196, 72, 60, 1),    // #48d6e7
    60: hslaToHex(198, 78, 48, 1),    // #1fc9de
    50: hslaToHex(200, 85, 40, 1),    // #14b6ca
    40: hslaToHex(202, 88, 33, 1),    // #1094a5
    30: hslaToHex(204, 90, 26, 1),    // #0d7482
    20: hslaToHex(206, 92, 18, 1),    // #094f5a
    10: hslaToHex(208, 94, 11, 1),    // #052d35
  },
  lime: {
    99: hslaToHex(85, 75, 97, 1),     // #f9fcf4
    95: hslaToHex(87, 72, 91, 1),     // #eff8df
    90: hslaToHex(89, 68, 82, 1),     // #ddf0b8
    80: hslaToHex(91, 64, 69, 1),     // #c1e37e
    70: hslaToHex(93, 65, 55, 1),     // #a5d648
    60: hslaToHex(95, 75, 45, 1),     // #8dc91f
    50: hslaToHex(97, 82, 38, 1),     // #78b614
    40: hslaToHex(99, 84, 31, 1),     // #609410
    30: hslaToHex(101, 86, 24, 1),    // #4a740d
    20: hslaToHex(103, 88, 16, 1),    // #324f09
    10: hslaToHex(105, 90, 10, 1),    // #1c2d05
  },
  static: {
    white: '#ffffff',
    black: '#000000',
  },
  // 서비스 특화 색상
  kakao: {
    default: '#FEE500',
    pressed: '#D4BF00',
    text: '#191919',
    light: '#FFFDE6',
  },
  google: {
    border: '#dadce0',
    text: '#3c4043',
    pressed: '#f1f3f4',
    light: '#f8f9fa',
  },
} as const;

/**
 * Dark Palette Colors (v3.2)
 *
 * ZKAP reversed numbering: 99=darkest background, 5=lightest foreground
 * Grey hue: ~285° (cool blue-purple tint, matching Toss style)
 * Primary blue: #2c7aff (unchanged from light)
 */
export const darkPalette = {
  grey: {
    99: '#17171c',
    98: '#1c1c21',
    97: '#202027',
    96: '#25252e',
    95: '#2d2d37',
    90: '#34343d',
    80: '#3d3d48',
    70: '#4c4c58',
    60: '#62626e',
    50: '#7f7f89',
    40: '#a0a0a6',
    30: '#c2c2c5',
    25: '#d4d4d6',
    23: '#d7d7db',
    22: '#d8d8d9',
    20: '#e4e4e5',
    17: '#eeeeef',
    15: '#f0f0f1',
    10: '#f5f5f7',
    7: '#fafafb',
    5: '#fbfcfd',
  },
  blue: {
    99: '#0f192f',
    98: '#0f192f',
    95: '#101a32',
    90: '#141f3c',
    80: '#1f2c56',
    70: '#2f4378',
    65: '#39528c',
    60: '#43629f',
    55: '#2d6bdd',
    50: '#2c7aff',
    45: '#4d8aff',
    40: '#5799ff',
    30: '#84a8fc',
    20: '#b3c7fd',
    10: '#ced9fe',
    secondary: '#5f95f1',
  },
  red: {
    99: '#2d1111',
    98: '#2d1111',
    95: '#301313',
    90: '#3c1a1a',
    80: '#5b2d2d',
    70: '#804444',
    60: '#b93a35',
    50: '#e9483f',
    45: '#ff3e32',
    40: '#f36159',
    30: '#fc877f',
    20: '#fdb5ae',
    10: '#fed3ce',
  },
  orange: {
    99: '#2f230f',
    95: '#332510',
    90: '#412e16',
    80: '#634625',
    70: '#885f37',
    60: '#fb7500',
    50: '#ff7202',
    40: '#fc9550',
    30: '#fcb084',
    20: '#fdccb3',
    10: '#feded1',
  },
  yellow: {
    99: '#2f2a0f',
    95: '#342d11',
    90: '#433917',
    80: '#635525',
    70: '#847035',
    60: '#a38a46',
    50: '#ffbb0f',
    40: '#fdc032',
    30: '#fbce74',
    20: '#fddfaa',
    10: '#feeacb',
  },
  green: {
    99: '#142b1d',
    98: '#152c1f',
    95: '#173022',
    90: '#234232',
    80: '#3c6651',
    70: '#31be7a',
    60: '#32dd8d',
    50: '#6fefb5',
    45: '#7ef7c0',
    40: '#8bfaca',
    30: '#a6fdd9',
    20: '#c5fee7',
    10: '#d6feef',
  },
  teal: {
    99: '#142a28',
    95: '#182f2d',
    90: '#25403f',
    80: '#406866',
    70: '#37c4c2',
    60: '#3cdede',
    50: '#77f3f3',
    40: '#8efafc',
    30: '#aafafd',
    20: '#c5fbfe',
    10: '#d6fbfe',
  },
  purple: {
    99: '#21122c',
    95: '#23152e',
    90: '#2d1c3a',
    80: '#432e55',
    70: '#604678',
    60: '#7e2ad1',
    50: '#9a6ce5',
    40: '#a366e7',
    30: '#b886f4',
    20: '#d1b0fb',
    10: '#e0cbfe',
  },
  navy: {
    99: '#172327',
    95: '#1b282b',
    90: '#28383d',
    80: '#43585f',
    70: '#546e79',
    60: '#4499bd',
    50: '#76b8d6',
    40: '#8ac7e5',
    30: '#a4d6f0',
    20: '#bfe3f8',
    10: '#d4ecfa',
  },
  pink: {
    99: '#29151c',
    95: '#2b181f',
    90: '#351f28',
    80: '#4e303d',
    70: '#79405a',
    60: '#d31c78',
    50: '#e9328e',
    40: '#f05cb0',
    30: '#fb7fca',
    20: '#fdaee0',
    10: '#fecbed',
  },
  cyan: {
    99: '#11292d',
    95: '#142c31',
    90: '#1c373e',
    80: '#2f535e',
    70: '#497787',
    60: '#20aae6',
    50: '#59c0f3',
    40: '#79ccfc',
    30: '#9dd6fc',
    20: '#bee2fd',
    10: '#d3eafe',
  },
  lime: {
    99: '#212b13',
    95: '#253016',
    90: '#314021',
    80: '#4e6538',
    70: '#70c728',
    60: '#74e226',
    50: '#9cf167',
    40: '#aff987',
    30: '#c2faa8',
    20: '#d6fcc7',
    10: '#e0fdd7',
  },
  static: {
    white: '#ffffff',
    black: '#000000',
  },
} as const;

/**
 * Light Theme Semantic Colors
 */
export const colors = {
  surface: {
    base: {
      default: palette.static.white,           // hsla(0, 0%, 100%, 1)
      alternative: palette.grey[99],           // hsla(220, 14%, 97%, 1)
      container: palette.grey[97],             // hsla(218, 11%, 92%, 1)
      containerPressed: palette.grey[95],      // hsla(216, 10%, 86%, 1)
    },
    elevated: {
      default: palette.static.white,           // hsla(0, 0%, 100%, 1)
      alternative: palette.grey[99],           // hsla(220, 14%, 97%, 1)
    },
    brand: {
      default: palette.blue[50],               // hsla(216, 100%, 47%, 1) → #0066ff
      defaultPressed: palette.blue[45],        // hsla(218, 100%, 43%, 1) → #005cd6
      secondary: palette.blue[95],             // hsla(222, 100%, 94%, 1) → #e3ecff
      secondaryPressed: palette.blue[90],      // hsla(224, 100%, 87%, 1) → #c7dbff
    },
    error: {
      default: palette.red[95],                // hsla(0, 84%, 93%, 1) — light bg
      defaultPressed: palette.red[90],         // hsla(0, 80%, 85%, 1) — light bg pressed
      solid: palette.red[50],                  // hsla(2, 85%, 48%, 1) — filled button
      solidPressed: palette.red[45],           // filled button pressed
    },
    warning: {
      default: palette.orange[95],             // hsla(36, 100%, 93%, 1)
    },
    success: {
      default: palette.green[95],              // hsla(147, 68%, 91%, 1) — light bg
      defaultPressed: palette.green[90],       // hsla(149, 65%, 81%, 1) — light bg pressed
      solid: palette.green[50],                // hsla(153, 78%, 37%, 1) — filled button
      solidPressed: palette.green[45],         // filled button pressed
    },
    info: {
      default: palette.blue[99],               // hsla(220, 100%, 98%, 1) → #f7f9ff
    },
    disabled: {
      default: palette.grey[95],               // hsla(216, 10%, 86%, 1)
    },
    kakao: {
      default: '#FEE500',
      defaultPressed: '#D4BF00',
    },
    google: {
      default: palette.static.white,
      defaultPressed: '#f1f3f4',
    },
  },
  content: {
    base: {
      strong: palette.grey[15],                // hsla(222, 33%, 11%, 1)
      default: palette.grey[30],               // hsla(218, 14%, 28%, 1)
      secondary: palette.grey[50],             // hsla(216, 9%, 45%, 1)
      neutral: palette.grey[60],               // hsla(215, 8%, 54%, 1)
      alternative: palette.grey[70],           // hsla(214, 7%, 60%, 1)
      placeholder: palette.grey[70],           // hsla(214, 7%, 60%, 1)
      assistive: palette.grey[80],             // hsla(214, 8%, 69%, 1)
      disabled: palette.grey[80],              // hsla(214, 8%, 69%, 1)
      onColor: palette.static.white,           // hsla(0, 0%, 100%, 1)
    },
    brand: {
      default: palette.blue[50],               // hsla(216, 100%, 47%, 1) → #0066ff
    },
    error: {
      default: palette.red[50],                // hsla(2, 85%, 48%, 1)
    },
    warning: {
      default: palette.orange[50],             // hsla(26, 100%, 47%, 1)
      strong: palette.orange[30],              // hsla(22, 90%, 31%, 1)
    },
    success: {
      default: palette.green[50],              // hsla(153, 78%, 37%, 1)
      strong: palette.green[30],               // hsla(155, 82%, 24%, 1)
    },
    info: {
      default: palette.teal[50],               // hsla(180, 82%, 35%, 1)
      strong: palette.teal[30],                // hsla(182, 86%, 23%, 1)
    },
    profit: {
      default: palette.red[50],                // hsla(2, 85%, 48%, 1) - 한국 컨벤션
    },
    loss: {
      default: palette.blue[50],               // hsla(216, 100%, 47%, 1) - 한국 컨벤션
    },
    disabled: {
      default: palette.grey[80],               // hsla(214, 8%, 69%, 1)
    },
  },
  border: {
    base: {
      default: palette.grey[95],               // hsla(216, 10%, 86%, 1)
      defaultPressed: palette.grey[90],        // hsla(216, 9%, 77%, 1)
    },
    secondary: {
      default: palette.grey[90],               // hsla(216, 9%, 77%, 1)
      defaultPressed: palette.grey[80],        // hsla(214, 8%, 69%, 1)
    },
    solid: {
      default: palette.grey[90],               // hsla(216, 9%, 77%, 1)
      neutral: palette.grey[95],               // hsla(216, 10%, 86%, 1)
      alternative: palette.grey[97],           // hsla(218, 11%, 92%, 1)
    },
    brand: {
      default: palette.blue[50],               // hsla(216, 100%, 47%, 1) → #0066ff
      defaultPressed: palette.blue[45],        // hsla(218, 100%, 43%, 1) → #005cd6
    },
    disabled: {
      default: palette.grey[90],               // hsla(216, 9%, 77%, 1)
    },
    error: {
      default: palette.red[50],                // hsla(2, 85%, 48%, 1)
      defaultPressed: palette.red[40],         // hsla(3, 85%, 40%, 1)
    },
    success: {
      default: palette.green[50],              // hsla(153, 78%, 37%, 1)
      defaultPressed: palette.green[40],       // hsla(154, 80%, 30%, 1)
    },
  },
  fill: {
    normal: hslaToHex(216, 9, 45, 0.22),       // grey.50 + 22% opacity
    strong: hslaToHex(216, 9, 45, 0.28),       // grey.50 + 28% opacity
    alternative: hslaToHex(216, 9, 45, 0.12),  // grey.50 + 12% opacity
  },
  interaction: {
    inactive: palette.grey[70],                // hsla(214, 7%, 60%, 1)
    disabled: palette.grey[90],                // hsla(216, 9%, 77%, 1)
  },
  visualization: {
    categorical: {
      1: palette.blue[50],                     // hsla(216, 100%, 47%, 1)
      2: palette.blue[65],                     // hsla(222, 100%, 62%, 1)
      3: palette.blue[80],                     // hsla(226, 100%, 77%, 1)
      4: palette.teal[50],                     // hsla(180, 82%, 35%, 1)
      5: palette.green[50],                    // hsla(153, 78%, 37%, 1)
      6: palette.purple[50],                   // hsla(269, 70%, 47%, 1)
      7: palette.orange[50],                   // hsla(26, 100%, 47%, 1)
      8: palette.grey[50],                     // hsla(216, 9%, 45%, 1)
    },
  },
  icon: {
    default: palette.grey[50],                 // hsla(216, 9%, 45%, 1)
    secondary: palette.grey[60],               // hsla(215, 8%, 54%, 1)
    disabled: palette.grey[80],                // hsla(214, 8%, 69%, 1)
    brand: palette.blue[50],                   // hsla(216, 100%, 47%, 1)
  },
  overlay: {
    dim: hslaToHex(222, 33, 11, 0.40),         // grey.15 + 40% alpha
    heavy: hslaToHex(222, 33, 11, 0.85),       // grey.15 + 85% alpha
  },
} as const;

/**
 * Dark Theme Semantic Colors
 */
export const darkColors = {
  surface: {
    base: {
      default: darkPalette.grey[99],
      alternative: darkPalette.grey[98],
      container: darkPalette.grey[97],
      containerPressed: darkPalette.grey[96],
    },
    elevated: {
      default: darkPalette.grey[98],
      alternative: darkPalette.grey[97],
    },
    brand: {
      default: darkPalette.blue[50],
      defaultPressed: darkPalette.blue[45],
      secondary: darkPalette.blue[90],
      secondaryPressed: darkPalette.blue[80],
    },
    error: {
      default: darkPalette.red[90],
      defaultPressed: darkPalette.red[80],
      solid: darkPalette.red[50],
      solidPressed: darkPalette.red[45],
    },
    warning: {
      default: darkPalette.orange[90],
    },
    success: {
      default: darkPalette.green[90],
      defaultPressed: darkPalette.green[80],
      solid: darkPalette.green[50],
      solidPressed: darkPalette.green[45],
    },
    info: {
      default: darkPalette.blue[99],
    },
    disabled: {
      default: darkPalette.grey[97],
    },
    kakao: {
      default: '#FEE500',
      defaultPressed: '#D4BF00',
    },
    google: {
      default: darkPalette.grey[97],
      defaultPressed: darkPalette.grey[96],
    },
  },
  content: {
    base: {
      strong: darkPalette.grey[5],
      default: darkPalette.grey[15],
      secondary: darkPalette.grey[50],
      neutral: darkPalette.grey[60],
      alternative: darkPalette.grey[40],
      placeholder: darkPalette.grey[60],
      assistive: darkPalette.grey[70],
      disabled: darkPalette.grey[80],
      onColor: darkPalette.static.white,
    },
    brand: {
      default: darkPalette.blue[50],
    },
    error: {
      default: darkPalette.red[50],
    },
    warning: {
      default: darkPalette.orange[50],
    },
    success: {
      default: darkPalette.green[50],
    },
    info: {
      default: darkPalette.teal[50],
    },
    profit: {
      default: darkPalette.red[50],
    },
    loss: {
      default: darkPalette.blue[50],
    },
    disabled: {
      default: darkPalette.grey[70],
    },
  },
  border: {
    base: {
      default: darkPalette.grey[95],
      defaultPressed: darkPalette.grey[90],
    },
    secondary: {
      default: darkPalette.grey[90],
      defaultPressed: darkPalette.grey[80],
    },
    solid: {
      default: darkPalette.grey[90],
      neutral: darkPalette.grey[95],
      alternative: darkPalette.grey[97],
    },
    brand: {
      default: darkPalette.blue[50],
      defaultPressed: darkPalette.blue[45],
    },
    disabled: {
      default: darkPalette.grey[90],
    },
    error: {
      default: darkPalette.red[50],
      defaultPressed: darkPalette.red[40],
    },
    success: {
      default: darkPalette.green[50],
      defaultPressed: darkPalette.green[40],
    },
  },
  fill: {
    normal: '#7f7f8938',
    strong: '#7f7f8947',
    alternative: '#7f7f891f',
  },
  interaction: {
    inactive: darkPalette.grey[60],
    disabled: darkPalette.grey[80],
  },
  visualization: {
    categorical: {
      1: darkPalette.blue[50],
      2: darkPalette.blue[65],
      3: darkPalette.blue[80],
      4: darkPalette.teal[50],
      5: darkPalette.green[50],
      6: darkPalette.purple[50],
      7: darkPalette.orange[50],
      8: darkPalette.grey[50],
    },
  },
  icon: {
    default: darkPalette.grey[50],
    secondary: darkPalette.grey[60],
    disabled: darkPalette.grey[70],
    brand: darkPalette.blue[50],
  },
  overlay: {
    dim: '#17171c66',
    heavy: '#17171cd9',
  },
} as const;

/**
 * Convenience exports for common use cases
 */
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

/**
 * Type exports for better DX
 */
export type ColorToken = typeof colors;
export type DarkColorToken = typeof darkColors;
export type PaletteToken = typeof palette;
export type DarkPaletteToken = typeof darkPalette;
