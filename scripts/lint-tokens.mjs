import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");

// ===== HSLA to RGB Conversion =====
function hslaToRgb(h, s, l) {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => {
    const k = (n + h / 30) % 12;
    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  };
  return [f(0), f(8), f(4)]; // 0-1 range
}

function relativeLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map((c) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  );
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(l1, l2) {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function parseHsla(hslaString) {
  // Parse "hsla(221, 43%, 11%, 1)" format
  const match = hslaString.match(/hsla?\(([^,]+),\s*([^,]+),\s*([^,)]+)/);
  if (!match) return null;
  const h = parseFloat(match[1]);
  const s = parseFloat(match[2]);
  const l = parseFloat(match[3]);
  return { h, s, l };
}

// ===== Token Flattening =====
function flattenTokens(obj, prefix = "") {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key === "_description" || key.endsWith("_comment")) continue;
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      Object.assign(result, flattenTokens(value, path));
    } else {
      result[path] = value;
    }
  }
  return result;
}

// ===== Palette Reference Resolution =====
function resolvePaletteRef(tokenValue, palette) {
  // Resolve "{palette.grey.15}" to actual HSLA string
  const match = tokenValue.match(/^\{palette\.([^}]+)\}$/);
  if (!match) return tokenValue; // Not a palette ref

  const path = match[1].split(".");
  let value = palette;
  for (const key of path) {
    if (!value || typeof value !== "object") return null;
    value = value[key];
  }
  return value;
}

// ===== Parity Check =====
function checkParity(semanticTokens) {
  const lightTokens = flattenTokens(semanticTokens.light);
  const darkTokens = flattenTokens(semanticTokens.dark);

  const lightKeys = new Set(Object.keys(lightTokens));
  const darkKeys = new Set(Object.keys(darkTokens));

  const missingInDark = [...lightKeys].filter((k) => !darkKeys.has(k));
  const missingInLight = [...darkKeys].filter((k) => !lightKeys.has(k));

  const passed = missingInDark.length === 0 && missingInLight.length === 0;

  return {
    passed,
    lightCount: lightKeys.size,
    darkCount: darkKeys.size,
    missingInDark,
    missingInLight,
  };
}

// ===== Contrast Check =====
const CONTRAST_PAIRS = {
  light: [
    {
      text: "content.warning.onSolid",
      textColor: "grey.15",
      surface: "surface.warning.solid",
      surfaceColor: "orange.50",
      minRatio: 4.5,
      level: "AA normal",
    },
    {
      text: "content.info.onSolid",
      textColor: "white",
      surface: "surface.info.solid",
      surfaceColor: "teal.50",
      minRatio: 4.5,
      level: "AA normal",
    },
    {
      text: "content.error.onSolid",
      textColor: "white",
      surface: "surface.error.solid",
      surfaceColor: "red.50",
      minRatio: 4.5,
      level: "AA normal",
    },
    {
      text: "content.success.onSolid",
      textColor: "white",
      surface: "surface.success.solid",
      surfaceColor: "green.50",
      minRatio: 4.5,
      level: "AA normal",
    },
    {
      text: "content.info.default",
      textColor: "teal.50",
      surface: "surface.info.default",
      surfaceColor: "teal.95",
      minRatio: 4.5,
      level: "AA normal",
    },
    {
      text: "content.warning.default",
      textColor: "orange.50",
      surface: "surface.warning.default",
      surfaceColor: "orange.95",
      minRatio: 3.0,
      level: "AA large",
    },
    {
      text: "content.success.default",
      textColor: "green.50",
      surface: "surface.success.default",
      surfaceColor: "green.95",
      minRatio: 4.5,
      level: "AA normal",
    },
    {
      text: "content.error.default",
      textColor: "red.50",
      surface: "surface.error.default",
      surfaceColor: "red.95",
      minRatio: 4.5,
      level: "AA normal",
    },
    {
      text: "content.warning.strong",
      textColor: "orange.30",
      surface: "surface.base.default",
      surfaceColor: "white",
      minRatio: 4.5,
      level: "AA normal",
    },
    {
      text: "content.success.strong",
      textColor: "green.30",
      surface: "surface.base.default",
      surfaceColor: "white",
      minRatio: 4.5,
      level: "AA normal",
    },
    {
      text: "content.info.strong",
      textColor: "teal.30",
      surface: "surface.base.default",
      surfaceColor: "white",
      minRatio: 4.5,
      level: "AA normal",
    },
    {
      text: "component.button.content.primary",
      textColor: "white",
      surface: "component.button.surface.primary",
      surfaceColor: "blue.50",
      minRatio: 4.5,
      level: "AA normal",
    },
  ],
  dark: [
    {
      text: "content.warning.onSolid",
      textColor: "white",
      surface: "surface.warning.solid",
      surfaceColor: "orange.60",
      minRatio: 4.5,
      level: "AA normal",
    },
    {
      text: "content.info.onSolid",
      textColor: "white",
      surface: "surface.info.solid",
      surfaceColor: "teal.60",
      minRatio: 4.5,
      level: "AA normal",
    },
    {
      text: "content.error.onSolid",
      textColor: "white",
      surface: "surface.error.solid",
      surfaceColor: "red.60",
      minRatio: 4.5,
      level: "AA normal",
    },
    {
      text: "content.success.onSolid",
      textColor: "white",
      surface: "surface.success.solid",
      surfaceColor: "green.60",
      minRatio: 4.5,
      level: "AA normal",
    },
    {
      text: "content.info.default",
      textColor: "teal.60",
      surface: "surface.info.default",
      surfaceColor: "teal.20",
      minRatio: 4.5,
      level: "AA normal",
    },
    {
      text: "content.warning.default",
      textColor: "orange.60",
      surface: "surface.warning.default",
      surfaceColor: "orange.20",
      minRatio: 3.0,
      level: "AA large",
    },
    {
      text: "content.success.default",
      textColor: "green.60",
      surface: "surface.success.default",
      surfaceColor: "green.20",
      minRatio: 4.5,
      level: "AA normal",
    },
    {
      text: "content.error.default",
      textColor: "red.60",
      surface: "surface.error.default",
      surfaceColor: "red.20",
      minRatio: 4.5,
      level: "AA normal",
    },
    {
      text: "content.warning.strong",
      textColor: "orange.80",
      surface: "surface.base.default",
      surfaceColor: "grey.15",
      minRatio: 4.5,
      level: "AA normal",
    },
    {
      text: "content.success.strong",
      textColor: "green.80",
      surface: "surface.base.default",
      surfaceColor: "grey.15",
      minRatio: 4.5,
      level: "AA normal",
    },
    {
      text: "content.info.strong",
      textColor: "teal.80",
      surface: "surface.base.default",
      surfaceColor: "grey.15",
      minRatio: 4.5,
      level: "AA normal",
    },
    {
      text: "component.button.content.primary",
      textColor: "white",
      surface: "component.button.surface.primary",
      surfaceColor: "blue.55",
      minRatio: 4.5,
      level: "AA normal",
    },
  ],
};

function getPaletteColor(colorRef, palette) {
  // Handle "white" / "black" special cases
  if (colorRef === "white") return palette.static.white;
  if (colorRef === "black") return palette.static.black;

  // Handle "grey.15", "orange.50", etc.
  const [family, shade] = colorRef.split(".");
  return palette[family]?.[shade];
}

function checkContrast(palette) {
  const results = { light: [], dark: [] };

  for (const [theme, pairs] of Object.entries(CONTRAST_PAIRS)) {
    for (const pair of pairs) {
      const textHsla = getPaletteColor(pair.textColor, palette);
      const surfaceHsla = getPaletteColor(pair.surfaceColor, palette);

      if (!textHsla || !surfaceHsla) {
        results[theme].push({
          ...pair,
          passed: false,
          ratio: null,
          error: "Color not found in palette",
        });
        continue;
      }

      const textParsed = parseHsla(textHsla);
      const surfaceParsed = parseHsla(surfaceHsla);

      if (!textParsed || !surfaceParsed) {
        results[theme].push({
          ...pair,
          passed: false,
          ratio: null,
          error: "Invalid HSLA format",
        });
        continue;
      }

      const [tr, tg, tb] = hslaToRgb(textParsed.h, textParsed.s, textParsed.l);
      const [sr, sg, sb] = hslaToRgb(
        surfaceParsed.h,
        surfaceParsed.s,
        surfaceParsed.l
      );

      const textLum = relativeLuminance(tr, tg, tb);
      const surfaceLum = relativeLuminance(sr, sg, sb);
      const ratio = contrastRatio(textLum, surfaceLum);

      const passed = ratio >= pair.minRatio;

      results[theme].push({
        ...pair,
        passed,
        ratio,
      });
    }
  }

  return results;
}

// ===== Main =====
function main() {
  const semanticPath = resolve(rootDir, "public/semantic-tokens.json");
  const palettePath = resolve(rootDir, "public/palette.json");

  const semanticTokens = JSON.parse(readFileSync(semanticPath, "utf8"));
  const palette = JSON.parse(readFileSync(palettePath, "utf8"));

  // 1. Parity Check
  console.log("=== Token Parity Check ===");
  const parityResult = checkParity(semanticTokens);
  console.log(`Light tokens: ${parityResult.lightCount}`);
  console.log(`Dark tokens: ${parityResult.darkCount}`);

  if (parityResult.passed) {
    console.log("Status: PASS ✓\n");
  } else {
    console.log("Status: FAIL ✗");
    if (parityResult.missingInDark.length > 0) {
      console.log("\nMissing in dark:");
      parityResult.missingInDark.forEach((k) => console.log(`  - ${k}`));
    }
    if (parityResult.missingInLight.length > 0) {
      console.log("\nMissing in light:");
      parityResult.missingInLight.forEach((k) => console.log(`  - ${k}`));
    }
    console.log();
  }

  // 2. Contrast Check
  console.log("=== WCAG AA Contrast Check ===");
  const contrastResults = checkContrast(palette);

  let totalPass = 0;
  let totalFail = 0;

  for (const [theme, results] of Object.entries(contrastResults)) {
    console.log(`\n${theme.toUpperCase()} MODE:`);
    for (const result of results) {
      if (result.error) {
        console.log(
          `  ✗ ${result.text} on ${result.surface} — ERROR: ${result.error}`
        );
        totalFail++;
      } else if (result.passed) {
        console.log(
          `  ✓ ${result.text} on ${result.surface} — ${result.ratio.toFixed(1)}:1 (${result.level} PASS)`
        );
        totalPass++;
      } else {
        console.log(
          `  ✗ ${result.text} on ${result.surface} — ${result.ratio.toFixed(1)}:1 (${result.level} FAIL, need ${result.minRatio}:1)`
        );
        totalFail++;
      }
    }
  }

  // 3. Summary
  console.log("\n=== Summary ===");
  console.log(`Parity: ${parityResult.passed ? "PASS" : "FAIL"}`);
  console.log(
    `Contrast: ${totalPass}/${totalPass + totalFail} PASS, ${totalFail} WARN`
  );

  // Parity failures are blocking (exit 1)
  // Contrast failures are warnings only (design decisions that need manual review)
  if (!parityResult.passed) {
    console.log("\n❌ Parity check failed — light/dark tokens must match.");
    process.exit(1);
  }

  if (totalFail > 0) {
    console.log(
      `\n⚠️  ${totalFail} contrast pair(s) below WCAG AA threshold (non-blocking).`
    );
  } else {
    console.log("\n✅ All token checks passed!");
  }
}

main();
