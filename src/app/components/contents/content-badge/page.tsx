"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform, highlightCode } from "@/components/PlatformTabs";

// Types
type ContentBadgeVariant = "filled" | "outlined" | "subtle";
type ContentBadgeColor = "brandDefault" | "baseDefault" | "successDefault" | "errorDefault" | "warningDefault" | "infoDefault";
type ContentBadgeSize = "small" | "medium" | "large";

// Size configurations (from Foundation tokens)
const sizeConfig: Record<ContentBadgeSize, { height: number; fontSize: number; paddingX: number; dotSize: number; iconSize: number }> = {
  small: { height: 18, fontSize: 10, paddingX: 6, dotSize: 4, iconSize: 10 },
  medium: { height: 22, fontSize: 12, paddingX: 8, dotSize: 6, iconSize: 12 },
  large: { height: 26, fontSize: 14, paddingX: 10, dotSize: 6, iconSize: 14 },
};

// Color configurations
const colorConfig: Record<ContentBadgeColor, {
  filled: { bg: string; text: string };
  outlined: { bg: string; border: string; text: string };
  subtle: { bg: string; text: string };
}> = {
  brandDefault: {
    filled: { bg: '#2563eb', text: '#ffffff' },
    outlined: { bg: 'transparent', border: '#2563eb', text: '#2563eb' },
    subtle: { bg: '#dbeafe', text: '#1e40af' },
  },
  baseDefault: {
    filled: { bg: '#64748b', text: '#ffffff' },
    outlined: { bg: 'transparent', border: '#94a3b8', text: '#475569' },
    subtle: { bg: '#f1f5f9', text: '#334155' },
  },
  successDefault: {
    filled: { bg: '#16a34a', text: '#ffffff' },
    outlined: { bg: 'transparent', border: '#22c55e', text: '#16a34a' },
    subtle: { bg: '#dcfce7', text: '#166534' },
  },
  errorDefault: {
    filled: { bg: '#dc2626', text: '#ffffff' },
    outlined: { bg: 'transparent', border: '#ef4444', text: '#dc2626' },
    subtle: { bg: '#fee2e2', text: '#991b1b' },
  },
  warningDefault: {
    filled: { bg: '#d97706', text: '#ffffff' },
    outlined: { bg: 'transparent', border: '#f59e0b', text: '#d97706' },
    subtle: { bg: '#fef3c7', text: '#92400e' },
  },
  infoDefault: {
    filled: { bg: '#0891b2', text: '#ffffff' },
    outlined: { bg: 'transparent', border: '#06b6d4', text: '#0891b2' },
    subtle: { bg: '#cffafe', text: '#155e75' },
  },
};

export default function ContentBadgePage() {
  return (
    <div style={{ maxWidth: 720 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Contents" },
          { label: "Content Badge" },
        ]}
      />

      {/* Header */}
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
        Content Badge
      </h1>
      <p style={{ fontSize: 15, color: "var(--text-secondary)", marginBottom: 32, lineHeight: 1.6 }}>
        콘텐츠의 상태, 카테고리, 라벨을 표시하는 비인터랙티브 요소입니다.
      </p>

      {/* Interactive Playground */}
      <ContentBadgePlayground />

      {/* Platform Tabs */}
      <PlatformTabs>
        {(platform) => <PlatformContent platform={platform} />}
      </PlatformTabs>
    </div>
  );
}

function ContentBadgePlayground() {
  const [variant, setVariant] = useState<ContentBadgeVariant>("filled");
  const [color, setColor] = useState<ContentBadgeColor>("brandDefault");
  const [size, setSize] = useState<ContentBadgeSize>("medium");
  const [dot, setDot] = useState(false);
  const [codeType, setCodeType] = useState<"rn" | "web">("rn");

  const generateCode = () => {
    const props = [];
    if (variant !== "filled") props.push(`variant="${variant}"`);
    if (color !== "baseDefault") props.push(`color="${color}"`);
    if (size !== "medium") props.push(`size="${size}"`);
    if (dot) props.push("dot");

    const propsStr = props.length > 0 ? ` ${props.join(" ")}` : "";
    return `<ContentBadge${propsStr}>NEW</ContentBadge>`;
  };

  return (
    <div style={{ marginBottom: 32 }}>
      <div
        style={{
          borderRadius: 20,
          overflow: "hidden",
          backgroundColor: "#fafbfc",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", height: 480 }}>
          {/* Preview Area */}
          <div
            style={{
              padding: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fafbfc",
            }}
          >
            <ContentBadgeDemo variant={variant} color={color} size={size} dot={dot}>
              NEW
            </ContentBadgeDemo>
          </div>

          {/* Control Panel */}
          <div
            style={{
              backgroundColor: "#fafbfc",
              display: "flex",
              flexDirection: "column",
              padding: 16,
              overflow: "hidden",
              height: "100%",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                flex: 1,
                minHeight: 0,
                padding: 24,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 28,
                backgroundColor: "white",
                borderRadius: 16,
              }}
            >
              {/* Variant */}
              <RadioGroup
                label="Variant"
                options={[
                  { value: "filled", label: "Filled" },
                  { value: "outlined", label: "Outlined" },
                  { value: "subtle", label: "Subtle" },
                ]}
                value={variant}
                onChange={(v) => setVariant(v as ContentBadgeVariant)}
              />

              {/* Color */}
              <RadioGroup
                label="Color"
                options={[
                  { value: "brandDefault", label: "Brand" },
                  { value: "baseDefault", label: "Base" },
                  { value: "successDefault", label: "Success" },
                  { value: "errorDefault", label: "Error" },
                  { value: "warningDefault", label: "Warning" },
                  { value: "infoDefault", label: "Info" },
                ]}
                value={color}
                onChange={(v) => setColor(v as ContentBadgeColor)}
              />

              {/* Size */}
              <RadioGroup
                label="Size"
                options={[
                  { value: "small", label: "Small" },
                  { value: "medium", label: "Medium" },
                  { value: "large", label: "Large" },
                ]}
                value={size}
                onChange={(v) => setSize(v as ContentBadgeSize)}
              />

              {/* Dot */}
              <RadioGroup
                label="Dot"
                options={[
                  { value: "false", label: "False" },
                  { value: "true", label: "True" },
                ]}
                value={dot ? "true" : "false"}
                onChange={(v) => setDot(v === "true")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Generated Code */}
      <div style={{ marginTop: 16, borderRadius: 12, overflow: "hidden", border: "1px solid var(--divider)" }}>
        <div
          style={{
            padding: "10px 16px",
            backgroundColor: "#18181b",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: 8 }}>
            <CodeTypeTab active={codeType === "rn"} onClick={() => setCodeType("rn")}>React Native</CodeTypeTab>
            <CodeTypeTab active={codeType === "web"} onClick={() => setCodeType("web")}>Web</CodeTypeTab>
          </div>
          <CopyButton text={generateCode()} />
        </div>
        <pre
          style={{
            margin: 0,
            padding: 16,
            fontSize: 13,
            lineHeight: 1.6,
            color: "#e4e4e7",
            backgroundColor: "#18181b",
            fontFamily: "'SF Mono', 'Fira Code', monospace",
            overflow: "auto",
          }}
        >
          <code>{highlightCode(generateCode())}</code>
        </pre>
      </div>
    </div>
  );
}

function CodeTypeTab({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "4px 12px",
        fontSize: 12,
        fontWeight: 500,
        color: active ? "#e4e4e7" : "#71717a",
        backgroundColor: active ? "#27272a" : "transparent",
        border: "none",
        borderRadius: 4,
        cursor: "pointer",
        transition: "all 0.15s ease",
      }}
    >
      {children}
    </button>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      style={{
        padding: "4px 10px",
        fontSize: 11,
        fontWeight: 500,
        color: copied ? "#22c55e" : "#71717a",
        backgroundColor: "transparent",
        border: "1px solid #3f3f46",
        borderRadius: 4,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 4,
        transition: "all 0.15s ease",
      }}
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

function PlatformContent({ platform }: { platform: Platform }) {
  if (platform === "design") {
    return <DesignContent />;
  }
  if (platform === "web") {
    return <WebContent />;
  }
  return <RNContent />;
}

function DesignContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
      {/* Anatomy */}
      <Section title="Anatomy">
        <div style={{
          backgroundColor: "#f5f5f7",
          borderRadius: 16,
          padding: "48px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <svg width="360" height="120" viewBox="0 0 360 120">
            {/* Badge Container */}
            <rect x="120" y="40" width="120" height="40" rx="4" fill="#2563eb" />

            {/* Dot */}
            <circle cx="140" cy="60" r="4" fill="white" />

            {/* Label text */}
            <text x="180" y="65" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">진행중</text>

            {/* Lines to labels */}
            <line x1="70" y1="60" x2="120" y2="60" stroke="#374151" strokeWidth="1.5" />
            <circle cx="120" cy="60" r="3" fill="#374151" />

            <line x1="140" y1="40" x2="140" y2="15" stroke="#374151" strokeWidth="1.5" />
            <circle cx="140" cy="40" r="3" fill="#374151" />

            <line x1="180" y1="80" x2="180" y2="105" stroke="#374151" strokeWidth="1.5" />
            <circle cx="180" cy="80" r="3" fill="#374151" />

            {/* Numbered circles */}
            <circle cx="55" cy="60" r="14" fill="#374151" />
            <text x="55" y="65" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">1</text>

            <circle cx="140" cy="15" r="14" fill="#374151" />
            <text x="140" y="20" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">2</text>

            <circle cx="180" cy="105" r="14" fill="#374151" />
            <text x="180" y="110" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">3</text>

            {/* Padding indicator */}
            <line x1="122" y1="42" x2="122" y2="52" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="132" y1="42" x2="132" y2="52" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
            <text x="127" y="36" textAnchor="middle" fill="#94a3b8" fontSize="8">px</text>
          </svg>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 16,
          marginTop: 20,
          fontSize: 14,
          fontWeight: 500,
          color: "var(--text-primary)",
        }}>
          <div>1. Container</div>
          <div style={{ textAlign: "center" }}>2. Dot (optional)</div>
          <div style={{ textAlign: "right" }}>3. Label</div>
        </div>
      </Section>

      {/* Variants */}
      <Section title="Variants">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          <VariantCard name="Filled" description="강조가 필요한 상태 표시">
            <ContentBadgeDemo variant="filled" color="brandDefault" size="medium">NEW</ContentBadgeDemo>
          </VariantCard>
          <VariantCard name="Outlined" description="카테고리, 태그 구분">
            <ContentBadgeDemo variant="outlined" color="brandDefault" size="medium">Category</ContentBadgeDemo>
          </VariantCard>
          <VariantCard name="Subtle" description="보조적 정보 표시">
            <ContentBadgeDemo variant="subtle" color="brandDefault" size="medium">Info</ContentBadgeDemo>
          </VariantCard>
        </div>
      </Section>

      {/* Sizes */}
      <Section title="Sizes">
        <PreviewBox>
          <div style={{ display: "flex", gap: 16, alignItems: "center", padding: 24 }}>
            <div style={{ textAlign: "center" }}>
              <ContentBadgeDemo variant="filled" color="brandDefault" size="small">Small</ContentBadgeDemo>
              <p style={{ fontSize: 11, color: "#64748b", marginTop: 8 }}>18px</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <ContentBadgeDemo variant="filled" color="brandDefault" size="medium">Medium</ContentBadgeDemo>
              <p style={{ fontSize: 11, color: "#64748b", marginTop: 8 }}>22px</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <ContentBadgeDemo variant="filled" color="brandDefault" size="large">Large</ContentBadgeDemo>
              <p style={{ fontSize: 11, color: "#64748b", marginTop: 8 }}>26px</p>
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* Colors */}
      <Section title="Colors">
        <PreviewBox>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", padding: 24 }}>
            <div style={{ textAlign: "center" }}>
              <ContentBadgeDemo variant="filled" color="brandDefault" size="medium">Brand</ContentBadgeDemo>
              <p style={{ fontSize: 10, color: "#64748b", marginTop: 6 }}>프로모션</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <ContentBadgeDemo variant="filled" color="baseDefault" size="medium">Base</ContentBadgeDemo>
              <p style={{ fontSize: 10, color: "#64748b", marginTop: 6 }}>일반</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <ContentBadgeDemo variant="filled" color="successDefault" size="medium">Success</ContentBadgeDemo>
              <p style={{ fontSize: 10, color: "#64748b", marginTop: 6 }}>완료</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <ContentBadgeDemo variant="filled" color="errorDefault" size="medium">Error</ContentBadgeDemo>
              <p style={{ fontSize: 10, color: "#64748b", marginTop: 6 }}>품절</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <ContentBadgeDemo variant="filled" color="warningDefault" size="medium">Warning</ContentBadgeDemo>
              <p style={{ fontSize: 10, color: "#64748b", marginTop: 6 }}>주의</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <ContentBadgeDemo variant="filled" color="infoDefault" size="medium">Info</ContentBadgeDemo>
              <p style={{ fontSize: 10, color: "#64748b", marginTop: 6 }}>안내</p>
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* Dot Status */}
      <Section title="Dot Status">
        <PreviewBox>
          <div style={{ display: "flex", gap: 16, alignItems: "center", padding: 24 }}>
            <ContentBadgeDemo variant="filled" color="successDefault" size="medium" dot>온라인</ContentBadgeDemo>
            <ContentBadgeDemo variant="filled" color="errorDefault" size="medium" dot>오프라인</ContentBadgeDemo>
            <ContentBadgeDemo variant="filled" color="brandDefault" size="medium" dot>진행중</ContentBadgeDemo>
          </div>
        </PreviewBox>
      </Section>

      {/* Design Tokens */}
      <Section title="Design Tokens">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          Content Badge 컴포넌트에 적용된 Foundation 기반 디자인 토큰입니다.
        </p>
        <div style={{ overflowX: "auto", borderRadius: 12, border: "1px solid var(--divider)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Property</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Foundation Token</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px" }}>Border Radius</td>
                <td style={{ padding: "12px 16px" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>radius.primitive.xs</code></td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "#6366f1" }}>4px</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px" }}>Gap (dot/icon-text)</td>
                <td style={{ padding: "12px 16px" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>spacing.primitive.1</code></td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "#6366f1" }}>4px</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px" }}>Padding X (small)</td>
                <td style={{ padding: "12px 16px" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>spacing.primitive.1.5</code></td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "#6366f1" }}>6px</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px" }}>Padding X (medium)</td>
                <td style={{ padding: "12px 16px" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>spacing.primitive.2</code></td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "#6366f1" }}>8px</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px" }}>Padding X (large)</td>
                <td style={{ padding: "12px 16px" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>spacing.primitive.2.5</code></td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "#6366f1" }}>10px</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px" }}>Height (small)</td>
                <td style={{ padding: "12px 16px" }}>-</td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "#6366f1" }}>18px</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px" }}>Height (medium)</td>
                <td style={{ padding: "12px 16px" }}>-</td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "#6366f1" }}>22px</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px" }}>Height (large)</td>
                <td style={{ padding: "12px 16px" }}>-</td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "#6366f1" }}>26px</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* Usage Guidelines */}
      <Section title="Usage Guidelines">
        <div style={{ overflowX: "auto", borderRadius: 12, border: "1px solid var(--divider)", marginBottom: 24 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>상황</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>권장 색상</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>예시</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px" }}>새 콘텐츠/프로모션</td>
                <td style={{ padding: "12px 16px" }}>brandDefault</td>
                <td style={{ padding: "12px 16px" }}>NEW, 추천</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px" }}>일반 정보/카테고리</td>
                <td style={{ padding: "12px 16px" }}>baseDefault</td>
                <td style={{ padding: "12px 16px" }}>공지, 일반</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px" }}>성공/완료/진행중</td>
                <td style={{ padding: "12px 16px" }}>successDefault</td>
                <td style={{ padding: "12px 16px" }}>완료, 판매중</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px" }}>오류/경고/품절</td>
                <td style={{ padding: "12px 16px" }}>errorDefault</td>
                <td style={{ padding: "12px 16px" }}>품절, 판매종료</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px" }}>주의/알림</td>
                <td style={{ padding: "12px 16px" }}>warningDefault</td>
                <td style={{ padding: "12px 16px" }}>주의, 곧 종료</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px" }}>정보/안내</td>
                <td style={{ padding: "12px 16px" }}>infoDefault</td>
                <td style={{ padding: "12px 16px" }}>안내, 팁</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Subsection title="Design Principles">
          <div style={{ display: "grid", gap: 12 }}>
            <PrincipleCard number={1} title="Non-interactive" desc="ContentBadge는 정보 표시용입니다. 클릭 가능한 요소가 필요하면 Chip을 사용하세요." />
            <PrincipleCard number={2} title="Concise Labels" desc="1-2 단어의 짧은 텍스트를 사용하세요. 긴 설명은 다른 요소에 배치합니다." />
            <PrincipleCard number={3} title="Consistent Styling" desc="같은 영역 내에서는 동일한 variant와 size를 사용하여 일관성을 유지하세요." />
          </div>
        </Subsection>
      </Section>

      {/* Accessibility */}
      <Section title="Accessibility">
        <div style={{ display: "grid", gap: 12 }}>
          <PrincipleCard number={1} title="Semantic Context" desc="Badge 자체는 보조적 정보이므로 주변 컨텍스트와 함께 사용하세요." />
          <PrincipleCard number={2} title="Color Contrast" desc="모든 색상 조합이 WCAG AA 기준을 충족합니다." />
          <PrincipleCard number={3} title="Screen Readers" desc="필요시 aria-label을 추가하여 스크린 리더에 추가 정보를 제공하세요." />
        </div>
      </Section>
    </div>
  );
}

const GITHUB_BASE = "https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system/src";
const CONTENT_BADGE_SOURCE = `${GITHUB_BASE}/components/ContentBadge/ContentBadge.tsx`;
const CONTENT_BADGE_NATIVE_SOURCE = `${GITHUB_BASE}/native/ContentBadge.tsx`;

function WebContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
      {/* Source Code */}
      <Section title="Source Code">
        <div style={{ padding: 16, backgroundColor: "var(--bg-secondary)", borderRadius: 12, marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>ContentBadge Component</p>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "4px 0 0 0" }}>실제 컴포넌트 소스 코드를 GitHub에서 확인하세요.</p>
          </div>
          <a
            href={CONTENT_BADGE_SOURCE}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              fontSize: 13,
              fontWeight: 500,
              color: "white",
              backgroundColor: "#24292f",
              borderRadius: 12,
              textDecoration: "none",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View on GitHub
          </a>
        </div>
      </Section>

      {/* Import */}
      <Section title="Import">
        <CodeBlock code={`import { ContentBadge } from '@baerae-zkap/design-system';`} />
      </Section>

      {/* Basic Usage */}
      <Section title="Basic Usage">
        <PreviewBox>
          <div style={{ display: "flex", gap: 12, padding: 24 }}>
            <ContentBadgeDemo variant="filled" color="brandDefault" size="medium">NEW</ContentBadgeDemo>
            <ContentBadgeDemo variant="filled" color="successDefault" size="medium">판매중</ContentBadgeDemo>
            <ContentBadgeDemo variant="filled" color="errorDefault" size="medium">품절</ContentBadgeDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<ContentBadge color="brandDefault">NEW</ContentBadge>
<ContentBadge color="successDefault">판매중</ContentBadge>
<ContentBadge color="errorDefault">품절</ContentBadge>`} />
      </Section>

      {/* Variants */}
      <Section title="Variants">
        <PreviewBox>
          <div style={{ display: "flex", gap: 12, padding: 24 }}>
            <ContentBadgeDemo variant="filled" color="brandDefault" size="medium">Filled</ContentBadgeDemo>
            <ContentBadgeDemo variant="outlined" color="brandDefault" size="medium">Outlined</ContentBadgeDemo>
            <ContentBadgeDemo variant="subtle" color="brandDefault" size="medium">Subtle</ContentBadgeDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<ContentBadge variant="filled" color="brandDefault">Filled</ContentBadge>
<ContentBadge variant="outlined" color="brandDefault">Outlined</ContentBadge>
<ContentBadge variant="subtle" color="brandDefault">Subtle</ContentBadge>`} />
      </Section>

      {/* With Dot */}
      <Section title="With Dot">
        <PreviewBox>
          <div style={{ display: "flex", gap: 12, padding: 24 }}>
            <ContentBadgeDemo variant="filled" color="successDefault" size="medium" dot>온라인</ContentBadgeDemo>
            <ContentBadgeDemo variant="filled" color="errorDefault" size="medium" dot>오프라인</ContentBadgeDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<ContentBadge color="successDefault" dot>온라인</ContentBadge>
<ContentBadge color="errorDefault" dot>오프라인</ContentBadge>`} />
      </Section>

      {/* API Reference */}
      <Section title="API Reference">
        <PropsTable
          props={[
            { name: "variant", type: '"filled" | "outlined" | "subtle"', required: false, defaultVal: '"filled"', description: "스타일 변형" },
            { name: "color", type: '"brandDefault" | "baseDefault" | "successDefault" | "errorDefault" | "warningDefault" | "infoDefault"', required: false, defaultVal: '"baseDefault"', description: "색상 테마" },
            { name: "size", type: '"small" | "medium" | "large"', required: false, defaultVal: '"medium"', description: "크기" },
            { name: "dot", type: "boolean", required: false, defaultVal: "false", description: "상태 점 표시" },
            { name: "leftIcon", type: "ReactNode", required: false, description: "좌측 아이콘 (dot과 배타적)" },
            { name: "children", type: "ReactNode", required: false, description: "Badge 텍스트" },
          ]}
        />
      </Section>
    </div>
  );
}

function RNContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
      {/* Source Code */}
      <Section title="Source Code">
        <div style={{ padding: 16, backgroundColor: "var(--bg-secondary)", borderRadius: 12, marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>ContentBadge Component</p>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "4px 0 0 0" }}>실제 컴포넌트 소스 코드를 GitHub에서 확인하세요.</p>
          </div>
          <a
            href={CONTENT_BADGE_NATIVE_SOURCE}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              fontSize: 13,
              fontWeight: 500,
              color: "white",
              backgroundColor: "#24292f",
              borderRadius: 12,
              textDecoration: "none",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View on GitHub
          </a>
        </div>
      </Section>

      {/* Import */}
      <Section title="Import">
        <CodeBlock code={`import { ContentBadge } from '@baerae-zkap/design-system/native';`} />
      </Section>

      {/* Basic Usage */}
      <Section title="Basic Usage">
        <PreviewBox>
          <div style={{ display: "flex", gap: 12, padding: 24 }}>
            <ContentBadgeDemo variant="filled" color="brandDefault" size="medium">NEW</ContentBadgeDemo>
            <ContentBadgeDemo variant="filled" color="successDefault" size="medium">판매중</ContentBadgeDemo>
            <ContentBadgeDemo variant="filled" color="errorDefault" size="medium">품절</ContentBadgeDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<ContentBadge color="brandDefault">NEW</ContentBadge>
<ContentBadge color="successDefault">판매중</ContentBadge>
<ContentBadge color="errorDefault">품절</ContentBadge>`} />
      </Section>

      {/* Status with Dot */}
      <Section title="Status with Dot">
        <CodeBlock code={`<View style={{ flexDirection: 'row', gap: 8 }}>
  <ContentBadge color="successDefault" dot>온라인</ContentBadge>
  <ContentBadge color="errorDefault" dot>오프라인</ContentBadge>
  <ContentBadge color="brandDefault" dot>진행중</ContentBadge>
</View>`} />
      </Section>

      {/* API Reference */}
      <Section title="API Reference">
        <PropsTable
          props={[
            { name: "variant", type: '"filled" | "outlined" | "subtle"', required: false, defaultVal: '"filled"', description: "스타일 변형" },
            { name: "color", type: '"brandDefault" | "baseDefault" | "successDefault" | "errorDefault" | "warningDefault" | "infoDefault"', required: false, defaultVal: '"baseDefault"', description: "색상 테마" },
            { name: "size", type: '"small" | "medium" | "large"', required: false, defaultVal: '"medium"', description: "크기" },
            { name: "dot", type: "boolean", required: false, defaultVal: "false", description: "상태 점 표시" },
            { name: "leftIcon", type: "ReactNode", required: false, description: "좌측 아이콘 (dot과 배타적)" },
            { name: "children", type: "ReactNode", required: false, description: "Badge 텍스트" },
          ]}
        />
      </Section>
    </div>
  );
}

// ============================================
// Shared Components
// ============================================

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 0 }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Subsection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 0 }}>
      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: "var(--text-primary)" }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

function VariantCard({ name, description, children }: { name: string; description: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: 20, backgroundColor: "white", borderRadius: 12, border: "1px solid var(--divider)" }}>
      <div style={{ height: 60, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#fafbfc", borderRadius: 8, marginBottom: 16 }}>
        {children}
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>{name}</div>
      <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>{description}</p>
    </div>
  );
}

function PrincipleCard({ number, title, desc }: { number: number; title: string; desc: string }) {
  return (
    <div style={{ padding: 20, backgroundColor: "white", borderRadius: 12, border: "1px solid var(--divider)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <span style={{ width: 22, height: 22, borderRadius: "50%", backgroundColor: "#e5e7eb", color: "#6b7280", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600 }}>{number}</span>
        <span style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)" }}>{title}</span>
      </div>
      <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: 0, lineHeight: 1.6, paddingLeft: 34 }}>{desc}</p>
    </div>
  );
}

function RadioGroup({ label, options, value, onChange }: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <div style={{ fontSize: 14, fontWeight: 500, color: "#c4c4c4", marginBottom: 14 }}>
        {label}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {options.map(opt => {
          const isSelected = value === opt.value;
          return (
            <label
              key={opt.value}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                cursor: "pointer",
                fontSize: 15,
                fontWeight: 500,
                color: isSelected ? "var(--text-primary)" : "#9ca3af",
                transition: "color 0.15s ease",
              }}
              onClick={() => onChange(opt.value)}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  border: isSelected ? "2px solid #3b82f6" : "2px solid #e5e5e5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.15s ease",
                  backgroundColor: "white",
                }}
              >
                {isSelected && (
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      backgroundColor: "#3b82f6",
                    }}
                  />
                )}
              </div>
              {opt.label}
            </label>
          );
        })}
      </div>
    </div>
  );
}


function PropsTable({ props }: { props: { name: string; type: string; required: boolean; defaultVal?: string; description: string }[] }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>Prop</th>
            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>Type</th>
            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>Default</th>
            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name} style={{ borderBottom: "1px solid var(--divider)" }}>
              <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "#6366f1" }}>{prop.name}{prop.required && <span style={{ color: "#ef4444" }}>*</span>}</td>
              <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 12, color: "#64748b" }}>{prop.type}</td>
              <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 12 }}>{prop.defaultVal || "-"}</td>
              <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ============================================
// Demo Component
// ============================================

function ContentBadgeDemo({
  variant = "filled",
  color = "baseDefault",
  size = "medium",
  dot = false,
  children,
}: {
  variant?: ContentBadgeVariant;
  color?: ContentBadgeColor;
  size?: ContentBadgeSize;
  dot?: boolean;
  children: React.ReactNode;
}) {
  const sizeStyle = sizeConfig[size];
  const colorStyle = colorConfig[color][variant];

  const badgeStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4, // spacing.primitive.1 (4px)
    height: sizeStyle.height,
    padding: `0 ${sizeStyle.paddingX}px`,
    fontSize: sizeStyle.fontSize,
    fontWeight: 600,
    lineHeight: 1,
    color: colorStyle.text,
    backgroundColor: colorStyle.bg,
    border: variant === "outlined" ? `1px solid ${(colorStyle as { border: string }).border}` : "none",
    borderRadius: 4, // radius.primitive.xs (4px)
    whiteSpace: "nowrap",
  };

  const dotStyle: React.CSSProperties = {
    width: sizeStyle.dotSize,
    height: sizeStyle.dotSize,
    borderRadius: "50%",
    backgroundColor: colorStyle.text,
    flexShrink: 0,
  };

  return (
    <span style={badgeStyle}>
      {dot && <span style={dotStyle} />}
      {children}
    </span>
  );
}
