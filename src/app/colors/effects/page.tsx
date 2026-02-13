"use client";

import Link from "next/link";
import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { TokenDownload } from "@/components/TokenDownload";
import paletteJson from "../../../../public/palette.json";
import effectsJson from "../../../../public/effects-tokens.json";

type JsonMap = Record<string, unknown>;

type FlatToken = {
  name: string;
  value: string;
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
      results.push({
        name: nextPath.join("."),
        value: resolvePaletteRefs(rawValue),
      });
    }
  }

  return results;
}

function EffectSwatch({ value, theme }: { value: string; theme: "light" | "dark" }) {
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
        width: "108px",
        padding: "8px",
        border: "1px solid var(--border-base-default)",
        borderRadius: "var(--radius-md)",
        backgroundColor: theme === "light" ? "var(--static-white)" : "var(--grey-15)",
        cursor: "pointer",
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
        }}
      >
        {copied ? "Copied!" : theme}
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
  const darkMap = new Map(darkTokens.map((token) => [token.name, token.value]));

  return (
    <section style={{ marginBottom: "var(--space-8)" }}>
      <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--content-base-strong)" }}>
        {title}
      </h3>
      <p className="text-xs" style={{ color: "var(--content-base-secondary)", marginTop: "4px", marginBottom: "12px" }}>
        {description}
      </p>

      <div
        style={{
          border: "1px solid var(--border-base-default)",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          backgroundColor: "var(--surface-base-default)",
        }}
      >
        {lightTokens.map((lightToken, index) => {
          const darkValue = darkMap.get(lightToken.name) ?? lightToken.value;
          return (
            <div
              key={lightToken.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                borderBottom: index < lightTokens.length - 1 ? "1px solid var(--border-base-default)" : "none",
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--content-base-strong)", marginBottom: "3px" }}>
                  {`${prefix}.${lightToken.name}`}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    fontFamily: "var(--font-mono)",
                    color: "var(--content-base-secondary)",
                    wordBreak: "break-all",
                  }}
                >
                  {lightToken.value}
                </div>
              </div>

              <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                <EffectSwatch value={lightToken.value} theme="light" />
                <EffectSwatch value={darkValue} theme="dark" />
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
        Gradient와 Alpha 계열을 별도 레이어로 관리합니다. 컴포넌트에서는 의미 색상은 Semantic, 복합 표현은 Effects를 사용하세요.
      </p>

      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <Link
          href="/colors/palette"
          style={{
            padding: "6px 12px",
            borderRadius: "9999px",
            backgroundColor: "var(--surface-base-default)",
            color: "var(--content-base-secondary)",
            border: "1px solid var(--border-base-default)",
            fontSize: "12px",
            fontWeight: 500,
            textDecoration: "none",
          }}
        >
          Palette
        </Link>
        <Link
          href="/colors/semantic"
          style={{
            padding: "6px 12px",
            borderRadius: "9999px",
            backgroundColor: "var(--surface-base-default)",
            color: "var(--content-base-secondary)",
            border: "1px solid var(--border-base-default)",
            fontSize: "12px",
            fontWeight: 500,
            textDecoration: "none",
          }}
        >
          Semantic
        </Link>
        <Link
          href="/colors/effects"
          style={{
            padding: "6px 12px",
            borderRadius: "9999px",
            backgroundColor: "var(--surface-base-container)",
            color: "var(--content-base-strong)",
            fontSize: "12px",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Effects
        </Link>
      </div>

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
