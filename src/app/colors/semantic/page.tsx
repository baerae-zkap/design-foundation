"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { TokenDownload } from "@/components/TokenDownload";
import paletteJson from "../../../../public/palette.json";
import semanticJson from "../../../../public/semantic-tokens.json";

type SemanticItem = {
  name: string;
  value: string;
  source: string;
  description: string;
};

// Palette 참조 해석: "{palette.blue.500}" → 실제 컬러값
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

function toPaletteLabel(source: string): string {
  const match = source.match(/^\{palette\.([^.}]+)\.([^.}]+)\}$/);
  if (!match) return source;
  return `palette.${match[1]}.${match[2]}`;
}

// Semantic 카테고리 처리 (중첩 구조 flatten)
function processSemanticCategory(category: Record<string, unknown>): SemanticItem[] {
  const result: SemanticItem[] = [];

  for (const [key, val] of Object.entries(category)) {
    if (key.startsWith("_")) continue;
    if (key.endsWith("_comment")) continue;

    if (typeof val === "string") {
      const commentKey = `${key}_comment`;
      result.push({
        name: key,
        value: resolveRef(val),
        source: val,
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
            source: subVal,
            description: ((val as Record<string, unknown>)[commentKey] as string) || "",
          });
        }
      }
    }
  }

  return result;
}

function ColorSwatch({ value, label }: { value: string; label: string }) {
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
        width: '80px',
        boxSizing: 'border-box',
      }}
      title="Copy color value"
    >
      <div
        style={{
          width: '48px',
          height: '48px',
          backgroundColor: value,
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-base-default)',
        }}
      />
      <span
        style={{
          fontSize: '10px',
          fontFamily: 'var(--font-mono)',
          color: copied ? 'var(--content-brand-default)' : 'var(--content-base-placeholder)',
          textAlign: 'center',
          width: '80px',
          minHeight: '24px',
          lineHeight: '12px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          wordBreak: 'break-word',
        }}
      >
        {copied ? 'Copied!' : label}
      </span>
    </button>
  );
}

function SemanticColorRow({
  name,
  lightValue,
  darkValue,
  lightSource,
  darkSource,
  description
}: {
  name: string;
  lightValue: string;
  darkValue: string;
  lightSource: string;
  darkSource: string;
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
            backgroundColor: 'var(--static-white)',
            borderRadius: 'var(--radius-md)',
            width: '104px',
            boxSizing: 'border-box',
          }}
        >
          <ColorSwatch value={lightValue} label={toPaletteLabel(lightSource)} />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '8px 12px',
            backgroundColor: 'var(--grey-15)',
            borderRadius: 'var(--radius-md)',
            width: '104px',
            boxSizing: 'border-box',
          }}
        >
          <ColorSwatch value={darkValue} label={toPaletteLabel(darkSource)} />
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
  lightItems: SemanticItem[];
  darkItems: SemanticItem[];
  prefix: string;
}) {
  // Merge light and dark items by name
  const mergedItems = lightItems.map((lightItem) => {
    const darkItem = darkItems.find(d => d.name === lightItem.name);
    return {
      name: lightItem.name,
      lightValue: lightItem.value,
      darkValue: darkItem?.value || lightItem.value,
      lightSource: lightItem.source,
      darkSource: darkItem?.source || lightItem.source,
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
              lightSource={item.lightSource}
              darkSource={item.darkSource}
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
    <div style={{ maxWidth: 720 }}>
      <Breadcrumb items={[{ label: "파운데이션", href: "/" }, { label: "Semantic" }]} />

      <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--content-base-strong)' }}>
        Semantic Colors
      </h1>
      <p className="mb-6 leading-relaxed" style={{ color: 'var(--content-base-default)' }}>
        용도에 따라 정의된 색상입니다. 컴포넌트 개발 시 <strong style={{ color: 'var(--content-base-strong)' }}>Semantic 토큰을 우선</strong> 사용해주세요.
        <br />
        <span style={{ fontSize: '14px', color: 'var(--content-base-secondary)' }}>
          각 색상을 클릭하면 값이 복사되며, 하단 라벨은 참조 중인 palette 토큰입니다.
        </span>
      </p>
      <TokenDownload files={[
        { name: 'semantic-tokens.json', path: '/semantic-tokens.json' },
      ]} />

      {[
        { key: "surface", title: "Surface", description: "배경색/서피스 - 화면, 컨테이너, 컴포넌트 배경" },
        { key: "content", title: "Content", description: "콘텐츠 컬러 - 텍스트, 아이콘 등" },
        { key: "border", title: "Border", description: "테두리/구분선 컬러" },
        { key: "fill", title: "Fill", description: "컴포넌트 채움 계열" },
        { key: "interaction", title: "Interaction", description: "인터랙션 상태 컬러" },
        { key: "visualization", title: "Visualization", description: "차트/그래프용 컬러" },
        { key: "icon", title: "Icon", description: "아이콘 전용 컬러" },
        { key: "overlay", title: "Overlay", description: "오버레이/딤 배경" },
        { key: "inverse", title: "Inverse", description: "반전 컨텍스트(테마 반전 UI)용 토큰" },
        { key: "status", title: "Status", description: "positive/cautionary/negative 상태 alias" },
        { key: "component", title: "Component Alias", description: "버튼/입력/칩 전용 시멘틱 alias" },
      ].map((section) => {
        const lightCategory = (lightData as Record<string, unknown>)[section.key] as Record<string, unknown> | undefined;
        const darkCategory = (darkData as Record<string, unknown>)[section.key] as Record<string, unknown> | undefined;

        if (!lightCategory || !darkCategory) return null;

        return (
          <SemanticSection
            key={section.key}
            title={section.title}
            description={section.description}
            lightItems={processSemanticCategory(lightCategory)}
            darkItems={processSemanticCategory(darkCategory)}
            prefix={section.key}
          />
        );
      })}
    </div>
  );
}
