"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { TokenDownload } from "@/components/TokenDownload";
import paletteJson from "../../../../public/palette.json";
import effectsJson from "../../../../public/effects-tokens.json";

type JsonMap = Record<string, unknown>;

type FlatToken = {
  name: string;
  value: string;
  source: string;
  description: string;
};

const isSkippableKey = (key: string) => key.startsWith("_") || key.endsWith("_comment");
const toMap = (value: unknown): JsonMap =>
  value && typeof value === "object" && !Array.isArray(value) ? (value as JsonMap) : {};

function getPaletteTokenValue(group: string, token: string): string | undefined {
  const bucket = (paletteJson as JsonMap)[group];
  if (!bucket || typeof bucket !== "object") {
    return undefined;
  }

  const value = (bucket as JsonMap)[token];
  return typeof value === "string" || typeof value === "number" ? String(value) : undefined;
}

function resolvePaletteRefs(value: string): string {
  return value.replace(/\{palette\.([^.}]+)\.([^.}]+)\}/g, (_, group, token) => {
    return getPaletteTokenValue(group, token) ?? `{palette.${group}.${token}}`;
  });
}

function extractPaletteLabels(source: string): string[] {
  const refs = source.match(/\{palette\.([^.}]+\.[^.}]+)\}/g) ?? [];
  return refs.map((ref) => ref.slice(1, -1));
}

function toSourceLabel(source: string): string {
  const labels = extractPaletteLabels(source);
  if (labels.length === 0) return source;
  if (labels.length <= 2) return labels.join(" · ");
  return `${labels.slice(0, 2).join(" · ")} +${labels.length - 2}`;
}

function flattenTokens(input: JsonMap, path: string[] = []): FlatToken[] {
  const results: FlatToken[] = [];

  for (const [key, rawValue] of Object.entries(input)) {
    if (isSkippableKey(key)) {
      continue;
    }

    const nextPath = [...path, key];

    if (rawValue && typeof rawValue === "object" && !Array.isArray(rawValue)) {
      results.push(...flattenTokens(rawValue as JsonMap, nextPath));
      continue;
    }

    if (typeof rawValue === "string") {
      const commentKey = `${key}_comment`;
      const description = typeof input[commentKey] === "string" ? String(input[commentKey]) : "";
      results.push({
        name: nextPath.join("."),
        value: resolvePaletteRefs(rawValue),
        source: rawValue,
        description,
      });
    }
  }

  return results;
}

function EffectSwatch({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <button
      onClick={handleCopy}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "6px",
        padding: "8px",
        background: "none",
        border: "none",
        cursor: "pointer",
        borderRadius: "var(--radius-md)",
        minWidth: "80px",
      }}
      title="Copy token value"
    >
      <div
        style={{
          height: "44px",
          borderRadius: "8px",
          border: "1px solid var(--border-base-default)",
          background: value,
        }}
      />
      <div
        style={{
          marginTop: "6px",
          fontSize: "10px",
          fontFamily: "var(--font-mono)",
          color: copied ? "var(--content-brand-default)" : "var(--content-base-secondary)",
          textAlign: "center",
          wordBreak: "break-word",
        }}
      >
        {copied ? "Copied!" : label}
      </div>
    </button>
  );
}

function EffectSection({
  title,
  description,
  prefix,
  lightTokens,
  darkTokens,
}: {
  title: string;
  description: string;
  prefix: string;
  lightTokens: FlatToken[];
  darkTokens: FlatToken[];
}) {
  const darkMap = new Map(darkTokens.map((token) => [token.name, token]));

  return (
    <section style={{ marginBottom: "var(--space-8)" }}>
      <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--content-base-strong)", marginBottom: "4px" }}>
        {title}
      </h3>
      <p className="text-xs" style={{ color: "var(--content-base-secondary)", marginBottom: "12px" }}>
        {description}
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "8px 16px",
          backgroundColor: "var(--surface-base-container)",
          borderRadius: "var(--radius-lg) var(--radius-lg) 0 0",
          border: "1px solid var(--border-base-default)",
          borderBottom: "none",
        }}
      >
        <div style={{ flex: 1, fontSize: "12px", fontWeight: 500, color: "var(--content-base-secondary)" }}>Token</div>
        <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
          <div style={{ width: "104px", textAlign: "center", fontSize: "12px", fontWeight: 500, color: "var(--content-base-secondary)" }}>
            Light
          </div>
          <div style={{ width: "104px", textAlign: "center", fontSize: "12px", fontWeight: 500, color: "var(--content-base-secondary)" }}>
            Dark
          </div>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "var(--surface-base-default)",
          borderRadius: "0 0 var(--radius-lg) var(--radius-lg)",
          border: "1px solid var(--border-base-default)",
          overflow: "hidden",
        }}
      >
        {lightTokens.map((lightToken, index) => {
          const darkToken = darkMap.get(lightToken.name);
          const darkValue = darkToken?.value ?? lightToken.value;
          const darkSource = darkToken?.source ?? lightToken.source;
          const tokenDescription = lightToken.description || darkToken?.description || "";

          return (
            <div
              key={lightToken.name}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 16px",
                gap: "16px",
                borderBottom: index < lightTokens.length - 1 ? "1px solid var(--border-base-default)" : "none",
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--content-base-strong)", marginBottom: "2px" }}>
                  {`${prefix}.${lightToken.name}`}
                </div>
                {tokenDescription && (
                  <div style={{ fontSize: "12px", color: "var(--content-base-secondary)", lineHeight: 1.4 }}>{tokenDescription}</div>
                )}
              </div>

              <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "8px 12px",
                    backgroundColor: "var(--static-white)",
                    borderRadius: "var(--radius-md)",
                  }}
                >
                  <EffectSwatch value={lightToken.value} label={toSourceLabel(lightToken.source)} />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "8px 12px",
                    backgroundColor: "var(--grey-15)",
                    borderRadius: "var(--radius-md)",
                  }}
                >
                  <EffectSwatch value={darkValue} label={toSourceLabel(darkSource)} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function EffectsPage() {
  const light = toMap((effectsJson as JsonMap).light);
  const dark = toMap((effectsJson as JsonMap).dark);

  const lightAlphaFill = flattenTokens(toMap(toMap(light.alpha).fill));
  const darkAlphaFill = flattenTokens(toMap(toMap(dark.alpha).fill));
  const lightAlphaBrand = flattenTokens(toMap(toMap(light.alpha).brand));
  const darkAlphaBrand = flattenTokens(toMap(toMap(dark.alpha).brand));

  const lightAlphaOverlay = flattenTokens(toMap(toMap(light.alpha).overlay));
  const darkAlphaOverlay = flattenTokens(toMap(toMap(dark.alpha).overlay));

  const lightGradientBrand = flattenTokens(toMap(toMap(light.gradient).brand));
  const darkGradientBrand = flattenTokens(toMap(toMap(dark.gradient).brand));

  const lightGradientSurface = flattenTokens(toMap(toMap(light.gradient).surface));
  const darkGradientSurface = flattenTokens(toMap(toMap(dark.gradient).surface));

  const lightGradientOverlay = flattenTokens(toMap(toMap(light.gradient).overlay));
  const darkGradientOverlay = flattenTokens(toMap(toMap(dark.gradient).overlay));

  return (
    <div style={{ maxWidth: 760 }}>
      <Breadcrumb items={[{ label: "파운데이션", href: "/" }, { label: "Effects" }]} />

      <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--content-base-strong)" }}>
        Color Effects
      </h1>
      <p className="mb-6 leading-relaxed" style={{ color: "var(--content-base-default)" }}>
        Gradient와 Alpha 계열을 별도 레이어로 관리합니다. 각 토큰은 목적 설명과 함께 제공되며, 색상 카드를 클릭하면 값이 복사됩니다.
      </p>

      <TokenDownload files={[{ name: "effects-tokens.json", path: "/effects-tokens.json" }]} />

      <EffectSection
        title="Alpha Brand"
        description="브랜드 포커스/선택 하이라이트에 사용하는 알파 세트입니다."
        prefix="alpha.brand"
        lightTokens={lightAlphaBrand}
        darkTokens={darkAlphaBrand}
      />

      <EffectSection
        title="Alpha Fill"
        description="토스의 opacity 계층 아이디어를 참고해 fill 전용 알파 세트를 분리한 레이어입니다."
        prefix="alpha.fill"
        lightTokens={lightAlphaFill}
        darkTokens={darkAlphaFill}
      />

      <EffectSection
        title="Alpha Overlay"
        description="모달/시트 딤 처리용 알파 세트입니다."
        prefix="alpha.overlay"
        lightTokens={lightAlphaOverlay}
        darkTokens={darkAlphaOverlay}
      />

      <EffectSection
        title="Gradient Brand"
        description="브랜드 표현이 필요한 영역(히어로/CTA)에서 사용하는 그라디언트입니다."
        prefix="gradient.brand"
        lightTokens={lightGradientBrand}
        darkTokens={darkGradientBrand}
      />

      <EffectSection
        title="Gradient Surface"
        description="서피스 톤 변화를 위한 낮은 대비 그라디언트입니다."
        prefix="gradient.surface"
        lightTokens={lightGradientSurface}
        darkTokens={darkGradientSurface}
      />

      <EffectSection
        title="Gradient Overlay"
        description="콘텐츠 위 스크림(top/bottom) 처리용 그라디언트입니다."
        prefix="gradient.overlay"
        lightTokens={lightGradientOverlay}
        darkTokens={darkGradientOverlay}
      />
    </div>
  );
}
