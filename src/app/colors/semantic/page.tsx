"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { TokenDownload } from "@/components/TokenDownload";
import paletteJson from "../../../../public/palette.json";
import semanticJson from "../../../../public/semantic-tokens.json";

// Palette 참조 해석: "{palette.blue.500}" → "hsla(...)"
function resolveRef(ref: string): string {
  if (!ref.startsWith("{palette.")) return ref;
  const path = ref.slice(9, -1).split(".");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = paletteJson;
  for (const key of path) {
    value = value?.[key];
  }
  return typeof value === "string" ? value : ref;
}

// Semantic 카테고리 처리 (중첩 구조 flatten)
function processSemanticCategory(category: Record<string, unknown>): Array<{ name: string; value: string; description: string }> {
  const result: Array<{ name: string; value: string; description: string }> = [];

  for (const [key, val] of Object.entries(category)) {
    if (key.startsWith("_")) continue;
    if (key.endsWith("_comment")) continue;

    if (typeof val === "string") {
      const commentKey = `${key}_comment`;
      result.push({
        name: key,
        value: resolveRef(val),
        description: (category[commentKey] as string) || "",
      });
    } else if (typeof val === "object" && val !== null) {
      for (const [subKey, subVal] of Object.entries(val as Record<string, unknown>)) {
        if (subKey.startsWith("_")) continue;
        if (subKey.endsWith("_comment")) continue;

        if (typeof subVal === "string") {
          const commentKey = `${subKey}_comment`;
          result.push({
            name: `${key}.${subKey}`,
            value: resolveRef(subVal),
            description: ((val as Record<string, unknown>)[commentKey] as string) || "",
          });
        }
      }
    }
  }

  return result;
}

function ColorSwatch({ value, theme }: { value: string; theme: 'light' | 'dark' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        padding: '8px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        borderRadius: 'var(--radius-md)',
        transition: 'background-color 0.15s',
        minWidth: '80px',
      }}
      title={`Copy ${theme} value`}
    >
      <div
        style={{
          width: '48px',
          height: '48px',
          backgroundColor: value,
          borderRadius: 'var(--radius-md)',
          border: '1px solid rgba(128, 128, 128, 0.4)',
        }}
      />
      <span
        style={{
          fontSize: '10px',
          fontFamily: 'var(--font-mono)',
          color: copied ? 'var(--content-brand-default)' : 'var(--content-base-placeholder)',
          textAlign: 'center',
          wordBreak: 'break-all',
          maxWidth: '80px',
        }}
      >
        {copied ? 'Copied!' : theme}
      </span>
    </button>
  );
}

function SemanticColorRow({
  name,
  lightValue,
  darkValue,
  description
}: {
  name: string;
  lightValue: string;
  darkValue: string;
  description: string;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '12px 16px',
        gap: '16px',
      }}
    >
      {/* Token Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: '14px',
          fontWeight: 500,
          color: 'var(--content-base-strong)',
          marginBottom: '2px',
        }}>
          {name}
        </div>
        {description && (
          <div style={{
            fontSize: '12px',
            color: 'var(--content-base-secondary)',
            lineHeight: 1.4,
          }}>
            {description}
          </div>
        )}
      </div>

      {/* Color Swatches - Light & Dark */}
      <div style={{
        display: 'flex',
        gap: '8px',
        flexShrink: 0,
      }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '8px 12px',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <ColorSwatch value={lightValue} theme="light" />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '8px 12px',
            backgroundColor: '#1A1A1A',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <ColorSwatch value={darkValue} theme="dark" />
        </div>
      </div>
    </div>
  );
}

function SemanticSection({
  title,
  description,
  lightItems,
  darkItems,
  prefix
}: {
  title: string;
  description: string;
  lightItems: Array<{ name: string; value: string; description: string }>;
  darkItems: Array<{ name: string; value: string; description: string }>;
  prefix: string;
}) {
  // Merge light and dark items by name
  const mergedItems = lightItems.map((lightItem) => {
    const darkItem = darkItems.find(d => d.name === lightItem.name);
    return {
      name: lightItem.name,
      lightValue: lightItem.value,
      darkValue: darkItem?.value || lightItem.value,
      description: lightItem.description,
    };
  });

  return (
    <div style={{ marginBottom: 'var(--space-8)' }}>
      <div style={{ marginBottom: '12px' }}>
        <h3
          className="text-sm font-semibold uppercase tracking-wider"
          style={{ color: 'var(--content-base-strong)', marginBottom: '4px' }}
        >
          {title}
        </h3>
        <p className="text-xs" style={{ color: 'var(--content-base-secondary)' }}>
          {description}
        </p>
      </div>

      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '8px 16px',
          backgroundColor: 'var(--surface-base-container)',
          borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
          border: '1px solid var(--border-base-default)',
          borderBottom: 'none',
        }}
      >
        <div style={{ flex: 1, fontSize: '12px', fontWeight: 500, color: 'var(--content-base-secondary)' }}>
          Token
        </div>
        <div style={{
          display: 'flex',
          gap: '8px',
          flexShrink: 0,
        }}>
          <div style={{
            width: '104px',
            textAlign: 'center',
            fontSize: '12px',
            fontWeight: 500,
            color: 'var(--content-base-secondary)'
          }}>
            Light
          </div>
          <div style={{
            width: '104px',
            textAlign: 'center',
            fontSize: '12px',
            fontWeight: 500,
            color: 'var(--content-base-secondary)'
          }}>
            Dark
          </div>
        </div>
      </div>

      {/* Items */}
      <div
        style={{
          backgroundColor: 'var(--surface-base-default)',
          borderRadius: '0 0 var(--radius-lg) var(--radius-lg)',
          border: '1px solid var(--border-base-default)',
          overflow: 'hidden',
        }}
      >
        {mergedItems.map((item, i) => (
          <div
            key={item.name}
            style={{
              borderBottom: i < mergedItems.length - 1 ? '1px solid var(--border-base-default)' : 'none'
            }}
          >
            <SemanticColorRow
              name={`${prefix}.${item.name}`}
              lightValue={item.lightValue}
              darkValue={item.darkValue}
              description={item.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SemanticPage() {
  const lightData = semanticJson.light;
  const darkData = semanticJson.dark;

  return (
    <div>
      <Breadcrumb items={[{ label: "파운데이션", href: "/" }, { label: "Semantic" }]} />

      <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--content-base-strong)' }}>
        Semantic Colors
      </h1>
      <p className="mb-6 leading-relaxed" style={{ color: 'var(--content-base-default)' }}>
        용도에 따라 정의된 색상입니다. 컴포넌트 개발 시 <strong style={{ color: 'var(--content-base-strong)' }}>Semantic 토큰을 우선</strong> 사용해주세요.
        <br />
        <span style={{ fontSize: '14px', color: 'var(--content-base-secondary)' }}>
          각 색상을 클릭하면 값이 복사됩니다.
        </span>
      </p>
      <TokenDownload files={[
        { name: 'semantic-tokens.json', path: '/semantic-tokens.json' },
      ]} />

      {/* Surface */}
      <SemanticSection
        title="Surface"
        description="배경색/서피스 - 화면, 컨테이너, 컴포넌트 배경"
        lightItems={processSemanticCategory(lightData.surface)}
        darkItems={processSemanticCategory(darkData.surface)}
        prefix="surface"
      />

      {/* Content */}
      <SemanticSection
        title="Content"
        description="콘텐츠 컬러 - 텍스트, 아이콘 등"
        lightItems={processSemanticCategory(lightData.content)}
        darkItems={processSemanticCategory(darkData.content)}
        prefix="content"
      />

      {/* Border */}
      <SemanticSection
        title="Border"
        description="테두리/구분선 컬러"
        lightItems={processSemanticCategory(lightData.border)}
        darkItems={processSemanticCategory(darkData.border)}
        prefix="border"
      />

      {/* Visualization */}
      <SemanticSection
        title="Visualization"
        description="차트/그래프용 컬러"
        lightItems={processSemanticCategory(lightData.visualization)}
        darkItems={processSemanticCategory(darkData.visualization)}
        prefix="visualization"
      />

      {/* Icon */}
      <SemanticSection
        title="Icon"
        description="아이콘 전용 컬러"
        lightItems={processSemanticCategory(lightData.icon)}
        darkItems={processSemanticCategory(darkData.icon)}
        prefix="icon"
      />

      {/* Overlay */}
      <SemanticSection
        title="Overlay"
        description="오버레이/딤 배경"
        lightItems={processSemanticCategory(lightData.overlay)}
        darkItems={processSemanticCategory(darkData.overlay)}
        prefix="overlay"
      />
    </div>
  );
}
