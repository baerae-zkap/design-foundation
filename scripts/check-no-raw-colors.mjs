import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(process.cwd());
const targets = [
  path.join(repoRoot, "src", "app"),
  path.join(repoRoot, "src", "components"),
];

const allowedFileNames = new Set([
  "generated-color-tokens.css",
  "generated-foundation-tokens.css",
]);

const fileExtensions = new Set([".ts", ".tsx", ".css"]);
const literalRegex = /#(?:[0-9a-fA-F]{3,8})\b|rgba?\(|hsla?\(/g;

const findings = [];

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }
    if (!fileExtensions.has(path.extname(entry.name))) continue;
    if (allowedFileNames.has(entry.name)) continue;

    const content = fs.readFileSync(fullPath, "utf8");
    const lines = content.split(/\r?\n/);

    lines.forEach((line, idx) => {
      const match = line.match(literalRegex);
      if (!match) return;
      findings.push({
        file: path.relative(repoRoot, fullPath),
        line: idx + 1,
        sample: match[0],
      });
    });
  }
}

for (const target of targets) {
  walk(target);
}

if (findings.length > 0) {
  console.error("Raw color literals detected in source files:");
  for (const finding of findings) {
    console.error(`- ${finding.file}:${finding.line} (${finding.sample})`);
  }
  process.exit(1);
}

console.log("No raw color literals found in src/app and src/components.");
