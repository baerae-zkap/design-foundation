"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform, highlightCode } from "@/components/PlatformTabs";
import { Chip } from '@baerae-zkap/design-system';
import { Section, Subsection } from "@/components/docs/Section";
import { PropsTable } from "@/components/docs/PropsTable";
import { PrincipleCard, VariantCard, DoCard, DontCard } from "@/components/docs/Cards";
import { RadioGroup, CopyButton } from "@/components/docs/Playground";
import { DoLabel, DontLabel } from "@/components/docs/Labels";

// Types
type ChipVariant = "filled" | "outlined";
type ChipColor = "brandDefault" | "baseDefault" | "successDefault" | "errorDefault" | "warningDefault";
type ChipSize = "small" | "medium" | "large";

// Size configurations
const sizeConfig: Record<ChipSize, { height: number; fontSize: number; paddingX: number; iconSize: number }> = {
  small: { height: 24, fontSize: 12, paddingX: 8, iconSize: 14 },
  medium: { height: 32, fontSize: 14, paddingX: 12, iconSize: 18 },
  large: { height: 40, fontSize: 16, paddingX: 16, iconSize: 22 },
};

// Color configurations
const colorConfig: Record<ChipColor, {
  filled: { bg: string; bgPressed: string; bgSelected: string; text: string; textSelected: string };
  outlined: { bg: string; bgPressed: string; bgSelected: string; border: string; text: string; textSelected: string };
}> = {
  brandDefault: {
    filled: {
      bg: 'var(--surface-brand-secondary)',
      bgPressed: 'var(--surface-brand-secondaryPressed)',
      bgSelected: 'var(--content-brand-default)',
      text: 'var(--content-brand-default)',
      textSelected: 'var(--static-white)',
    },
    outlined: {
      bg: 'transparent',
      bgPressed: 'var(--effect-alpha-brand-selection)',
      bgSelected: 'var(--content-brand-default)',
      border: 'var(--content-brand-default)',
      text: 'var(--content-brand-default)',
      textSelected: 'var(--static-white)',
    },
  },
  baseDefault: {
    filled: {
      bg: 'var(--surface-base-alternative)',
      bgPressed: 'var(--border-base-default)',
      bgSelected: 'var(--content-base-strong)',
      text: 'var(--content-base-strong)',
      textSelected: 'var(--static-white)',
    },
    outlined: {
      bg: 'transparent',
      bgPressed: 'var(--effect-alpha-fill-alternative)',
      bgSelected: 'var(--content-base-strong)',
      border: 'var(--border-base-default)',
      text: 'var(--content-base-strong)',
      textSelected: 'var(--static-white)',
    },
  },
  successDefault: {
    filled: {
      bg: 'var(--status-positive-surface)',
      bgPressed: 'var(--surface-success-defaultPressed)',
      bgSelected: 'var(--status-positive-content)',
      text: 'var(--content-success-strong)',
      textSelected: 'var(--static-white)',
    },
    outlined: {
      bg: 'transparent',
      bgPressed: 'var(--status-positive-surface)',
      bgSelected: 'var(--status-positive-content)',
      border: 'var(--status-positive-content)',
      text: 'var(--content-success-strong)',
      textSelected: 'var(--static-white)',
    },
  },
  errorDefault: {
    filled: {
      bg: 'var(--status-negative-surface)',
      bgPressed: 'var(--surface-error-defaultPressed)',
      bgSelected: 'var(--status-negative-content)',
      text: 'var(--content-error-default)',
      textSelected: 'var(--static-white)',
    },
    outlined: {
      bg: 'transparent',
      bgPressed: 'var(--status-negative-surface)',
      bgSelected: 'var(--status-negative-content)',
      border: 'var(--status-negative-content)',
      text: 'var(--content-error-default)',
      textSelected: 'var(--static-white)',
    },
  },
  warningDefault: {
    filled: {
      bg: 'var(--status-cautionary-surface)',
      bgPressed: 'var(--status-cautionary-surface)',
      bgSelected: 'var(--status-cautionary-content)',
      text: 'var(--content-warning-strong)',
      textSelected: 'var(--static-white)',
    },
    outlined: {
      bg: 'transparent',
      bgPressed: 'var(--status-cautionary-surface)',
      bgSelected: 'var(--status-cautionary-content)',
      border: 'var(--status-cautionary-border)',
      text: 'var(--content-warning-strong)',
      textSelected: 'var(--static-white)',
    },
  },
};

export default function ChipPage() {
  return (
    <div style={{ maxWidth: 720 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Actions" },
          { label: "Chip" },
        ]}
      />

      {/* Header */}
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
        Chip
      </h1>
      <p style={{ fontSize: 15, color: "var(--text-secondary)", marginBottom: 32, lineHeight: 1.6 }}>
        사용자의 선택, 필터링, 입력값을 시각적으로 나타내는 컴팩트한 인터랙티브 요소입니다.
        짧은 텍스트로 상태를 표현하며, 선택/해제 토글이나 태그 제거 등의 인터랙션을 제공합니다.
      </p>

      {/* Interactive Playground */}
      <ChipPlayground />

      {/* Platform Tabs */}
      <PlatformTabs>
        {(platform) => <PlatformContent platform={platform} />}
      </PlatformTabs>
    </div>
  );
}

function ChipPlayground() {
  const [variant, setVariant] = useState<ChipVariant>("filled");
  const [color, setColor] = useState<ChipColor>("baseDefault");
  const [size, setSize] = useState<ChipSize>("medium");
  const [selected, setSelected] = useState(false);
  const [showClose, setShowClose] = useState(false);
  const generateCode = () => {
    const props = [];
    if (variant !== "filled") props.push(`variant="${variant}"`);
    if (color !== "baseDefault") props.push(`color="${color}"`);
    if (size !== "medium") props.push(`size="${size}"`);
    if (selected) props.push("selected");
    if (showClose) props.push("onClose={() => {}}");

    const propsStr = props.length > 0 ? `\n  ${props.join("\n  ")}\n` : " ";

    return `<Chip${propsStr.length > 1 ? propsStr : " "}onClick={() => {}}>
  태그
</Chip>`;
  };

  return (
    <div style={{ marginBottom: 32 }}>
      <div
        style={{
          borderRadius: 20,
          overflow: "hidden",
          backgroundColor: "var(--surface-base-alternative)",
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
              backgroundColor: "var(--surface-base-alternative)",
            }}
          >
            <ChipDemo
              variant={variant}
              color={color}
              size={size}
              selected={selected}
              onClose={showClose ? () => {} : undefined}
            >
              태그
            </ChipDemo>
          </div>

          {/* Control Panel */}
          <div
            style={{
              backgroundColor: "var(--surface-base-alternative)",
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
                backgroundColor: "var(--surface-base-default)",
                borderRadius: 16,
              }}
            >
              {/* Variant */}
              <RadioGroup
                label="Variant"
                options={[
                  { value: "filled", label: "Filled" },
                  { value: "outlined", label: "Outlined" },
                ]}
                value={variant}
                onChange={(v) => setVariant(v as ChipVariant)}
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
                ]}
                value={color}
                onChange={(v) => setColor(v as ChipColor)}
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
                onChange={(v) => setSize(v as ChipSize)}
              />

              {/* Selected */}
              <RadioGroup
                label="Selected"
                options={[
                  { value: "false", label: "False" },
                  { value: "true", label: "True" },
                ]}
                value={selected ? "true" : "false"}
                onChange={(v) => setSelected(v === "true")}
              />

              {/* Show Close */}
              <RadioGroup
                label="Show Close"
                options={[
                  { value: "false", label: "False" },
                  { value: "true", label: "True" },
                ]}
                value={showClose ? "true" : "false"}
                onChange={(v) => setShowClose(v === "true")}
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
            backgroundColor: "var(--docs-code-surface)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 500, color: "var(--docs-code-active-text)" }}>Web</span>
          <CopyButton text={generateCode()} />
        </div>
        <pre
          style={{
            margin: 0,
            padding: 16,
            fontSize: 13,
            lineHeight: 1.6,
            color: "var(--docs-code-text)",
            backgroundColor: "var(--docs-code-surface)",
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

function PlatformContent({ platform }: { platform: Platform }) {
  if (platform === "design") {
    return <DesignContent />;
  }
  return <WebContent />;
}

function DesignContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
      {/* Overview */}
      <Section title="Overview">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 24, lineHeight: 1.7 }}>
          Chip은 <strong style={{ color: "var(--text-primary)" }}>짧은 텍스트로 선택 상태, 카테고리, 속성을 나타내는 인터랙티브 요소</strong>입니다.
          Button보다 작고 가벼우며, Badge와 달리 사용자가 직접 조작할 수 있습니다.
          필터 선택/해제, 태그 입력/삭제 등 <strong style={{ color: "var(--text-primary)" }}>반복적이고 가역적인 선택 인터랙션</strong>에 적합합니다.
        </p>

        <Subsection title="When to use">
          <ul style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
            <li>카테고리 필터를 선택/해제할 때 (예: 상품 목록 필터링)</li>
            <li>여러 옵션 중 하나 또는 다수를 선택할 때 (예: 관심 분야 선택)</li>
            <li>사용자가 입력한 태그를 표시하고 삭제할 수 있을 때 (예: 검색 태그, 수신자)</li>
            <li>상태를 간결하게 표시하면서 인터랙션이 필요할 때 (예: 거래 상태 필터)</li>
          </ul>
        </Subsection>

        <Subsection title="When NOT to use">
          <ul style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
            <li><strong style={{ color: "var(--text-primary)" }}>주요 CTA 액션</strong>이 필요하면 → <code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>Button</code> 사용</li>
            <li><strong style={{ color: "var(--text-primary)" }}>읽기 전용 상태 표시</strong>만 필요하면 → <code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>ContentBadge</code> 사용</li>
            <li><strong style={{ color: "var(--text-primary)" }}>텍스트 링크 스타일</strong>의 보조 액션이면 → <code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>TextButton</code> 사용</li>
            <li><strong style={{ color: "var(--text-primary)" }}>긴 텍스트</strong>가 들어가야 하면 → Chip 대신 다른 컴포넌트 고려</li>
          </ul>
        </Subsection>
      </Section>

      {/* Anatomy */}
      <Section title="Anatomy">
        <div style={{
          backgroundColor: "var(--surface-base-alternative)",
          borderRadius: 16,
          padding: "48px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <svg width="420" height="120" viewBox="0 0 420 120">
            {/* Chip Container */}
            <rect x="120" y="40" width="180" height="40" rx="20" fill="var(--content-brand-default)" />

            {/* Check icon circle */}
            <circle cx="148" cy="60" r="10" fill="white" fillOpacity="0.2" />
            <path d="M144 60 L147 63 L153 57" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

            {/* Label text */}
            <text x="200" y="65" textAnchor="middle" fill="white" fontSize="14" fontWeight="500">Selected Tag</text>

            {/* Close button */}
            <circle cx="272" cy="60" r="10" fill="white" fillOpacity="0.2" />
            <path d="M268 56 L276 64 M276 56 L268 64" stroke="white" strokeWidth="1.5" strokeLinecap="round" />

            {/* Lines to labels */}
            <line x1="70" y1="60" x2="120" y2="60" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="120" cy="60" r="3" fill="var(--content-base-default)" />

            <line x1="148" y1="40" x2="148" y2="15" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="148" cy="40" r="3" fill="var(--content-base-default)" />

            <line x1="200" y1="80" x2="200" y2="105" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="200" cy="80" r="3" fill="var(--content-base-default)" />

            <line x1="272" y1="40" x2="272" y2="15" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="272" cy="40" r="3" fill="var(--content-base-default)" />

            {/* Numbered circles */}
            <circle cx="55" cy="60" r="14" fill="var(--content-base-default)" />
            <text x="55" y="65" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">1</text>

            <circle cx="148" cy="15" r="14" fill="var(--content-base-default)" />
            <text x="148" y="20" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">2</text>

            <circle cx="200" cy="105" r="14" fill="var(--content-base-default)" />
            <text x="200" y="110" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">3</text>

            <circle cx="272" cy="15" r="14" fill="var(--content-base-default)" />
            <text x="272" y="20" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">4</text>
          </svg>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: 16,
          marginTop: 20,
          fontSize: 14,
          fontWeight: 500,
          color: "var(--text-primary)",
        }}>
          <div>1. Container</div>
          <div style={{ textAlign: "center" }}>2. Icon</div>
          <div style={{ textAlign: "center" }}>3. Label</div>
          <div style={{ textAlign: "right" }}>4. Close</div>
        </div>
      </Section>

      {/* Interaction States */}
      <Section title="Interaction States">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 24 }}>
          Chip은 선택 상태를 포함하여 다양한 인터랙션 상태를 지원합니다. 선택/해제 토글과 호버, 누름 피드백이 시각적으로 명확히 구분됩니다.
        </p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: 16,
          padding: 24,
          backgroundColor: "var(--surface-base-alternative)",
          borderRadius: 16,
        }}>
          <InteractionStateCard label="Default" sublabel="기본 상태" color="var(--content-brand-default)" bgColor="var(--surface-brand-secondary)" />
          <InteractionStateCard label="Selected" sublabel="선택됨" color="var(--static-white)" bgColor="var(--content-brand-default)" />
          <InteractionStateCard label="Hover" sublabel="마우스 오버" color="var(--content-brand-default)" bgColor="var(--surface-brand-secondaryPressed)" />
          <InteractionStateCard label="Pressed" sublabel="누름" color="var(--content-brand-default)" bgColor="var(--surface-brand-secondaryPressed)" />
          <InteractionStateCard label="Disabled" sublabel="비활성화" color="var(--content-disabled-default)" bgColor="var(--surface-disabled-default)" opacity={0.4} />
          <InteractionStateCard label="Focused" sublabel="키보드 포커스" color="var(--content-brand-default)" bgColor="var(--surface-brand-secondary)" showFocusRing />
        </div>
      </Section>

      {/* Design Tokens (New) */}
      <Section title="Design Tokens">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 16 }}>
          컴포넌트에 적용된 디자인 토큰입니다. 커스터마이징 시 아래 토큰을 참조하세요.
        </p>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border-default)" }}>
                <th style={{ textAlign: "left", padding: "10px 12px", color: "var(--text-primary)", fontWeight: 600 }}>속성</th>
                <th style={{ textAlign: "left", padding: "10px 12px", color: "var(--text-primary)", fontWeight: 600 }}>토큰</th>
                <th style={{ textAlign: "left", padding: "10px 12px", color: "var(--text-primary)", fontWeight: 600 }}>값 (Light)</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
                <td style={{ padding: "10px 12px", color: "var(--text-primary)" }}>배경색 (filled)</td>
                <td style={{ padding: "10px 12px" }}>
                  <code style={{ fontSize: 12, padding: "2px 6px", borderRadius: 4, backgroundColor: "var(--surface-base-alternative)", color: "var(--content-brand-default)" }}>--surface-brand-secondary</code>
                </td>
                <td style={{ padding: "10px 12px", color: "var(--text-tertiary)" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: "var(--surface-brand-secondary)" }} />
                    Brand Light
                  </span>
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
                <td style={{ padding: "10px 12px", color: "var(--text-primary)" }}>텍스트 색상</td>
                <td style={{ padding: "10px 12px" }}>
                  <code style={{ fontSize: 12, padding: "2px 6px", borderRadius: 4, backgroundColor: "var(--surface-base-alternative)", color: "var(--content-brand-default)" }}>--content-brand-default</code>
                </td>
                <td style={{ padding: "10px 12px", color: "var(--text-tertiary)" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: "var(--content-brand-default)" }} />
                    Brand Blue
                  </span>
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
                <td style={{ padding: "10px 12px", color: "var(--text-primary)" }}>높이 (sm / md / lg)</td>
                <td style={{ padding: "10px 12px" }}>
                  <code style={{ fontSize: 12, padding: "2px 6px", borderRadius: 4, backgroundColor: "var(--surface-base-alternative)", color: "var(--content-brand-default)" }}>chip.height</code>
                </td>
                <td style={{ padding: "10px 12px", color: "var(--text-tertiary)" }}>24px / 32px / 40px</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
                <td style={{ padding: "10px 12px", color: "var(--text-primary)" }}>수평 패딩 (sm / md / lg)</td>
                <td style={{ padding: "10px 12px" }}>
                  <code style={{ fontSize: 12, padding: "2px 6px", borderRadius: 4, backgroundColor: "var(--surface-base-alternative)", color: "var(--content-brand-default)" }}>primitive.2 / 3 / 4</code>
                </td>
                <td style={{ padding: "10px 12px", color: "var(--text-tertiary)" }}>8px / 12px / 16px</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
                <td style={{ padding: "10px 12px", color: "var(--text-primary)" }}>모서리 반경</td>
                <td style={{ padding: "10px 12px" }}>
                  <code style={{ fontSize: 12, padding: "2px 6px", borderRadius: 4, backgroundColor: "var(--surface-base-alternative)", color: "var(--content-brand-default)" }}>height / 2</code>
                </td>
                <td style={{ padding: "10px 12px", color: "var(--text-tertiary)" }}>12px / 16px / 20px (완전 라운드)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* UX Writing */}
      <Section title="UX Writing">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 24 }}>
          사용자에게 명확한 경험을 전달하기 위한 텍스트 작성 가이드입니다.
        </p>
        <div style={{ display: "grid", gap: 12 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ padding: 16, borderRadius: 12, backgroundColor: "var(--surface-success-default)", border: "1px solid var(--border-success-default)" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--content-success-default)", marginBottom: 8 }}>DO</div>
              <code style={{ fontSize: 14, color: "var(--text-primary)" }}>&quot;최신순&quot;</code>
              <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: 0, marginTop: 4 }}>짧고 간결하게 표현합니다</p>
            </div>
            <div style={{ padding: 16, borderRadius: 12, backgroundColor: "var(--surface-error-default)", border: "1px solid var(--border-error-default)" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--content-error-default)", marginBottom: 8 }}>DON&apos;T</div>
              <code style={{ fontSize: 14, color: "var(--text-primary)" }}>&quot;최신순으로 정렬합니다&quot;</code>
              <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: 0, marginTop: 4 }}>Chip에는 문장을 넣지 않습니다</p>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ padding: 16, borderRadius: 12, backgroundColor: "var(--surface-success-default)", border: "1px solid var(--border-success-default)" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--content-success-default)", marginBottom: 8 }}>DO</div>
              <code style={{ fontSize: 14, color: "var(--text-primary)" }}>&quot;서울&quot;</code>
              <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: 0, marginTop: 4 }}>가능한 한 짧게 작성합니다</p>
            </div>
            <div style={{ padding: 16, borderRadius: 12, backgroundColor: "var(--surface-error-default)", border: "1px solid var(--border-error-default)" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--content-error-default)", marginBottom: 8 }}>DON&apos;T</div>
              <code style={{ fontSize: 14, color: "var(--text-primary)" }}>&quot;서울특별시&quot;</code>
              <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: 0, marginTop: 4 }}>공식 명칭보다 축약형을 사용합니다</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Behaviors */}
      <Section title="Behaviors">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <VariantCard name="Selectable (selected)" description="필터/카테고리 선택. selected=true 시 체크 아이콘 표시.">
            <div style={{ display: "flex", gap: 8 }}>
              <ChipDemo color="brandDefault">전체</ChipDemo>
              <ChipDemo color="brandDefault" selected>전자제품</ChipDemo>
            </div>
          </VariantCard>
          <VariantCard name="Removable (onClose)" description="태그 삭제. onClose 제공 시 X 버튼 표시.">
            <div style={{ display: "flex", gap: 8 }}>
              <ChipDemo onClose={() => {}}>React</ChipDemo>
              <ChipDemo onClose={() => {}}>TypeScript</ChipDemo>
            </div>
          </VariantCard>
        </div>
      </Section>

      {/* Variants */}
      <Section title="Variants">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <VariantCard name="Filled" description="배경색이 채워진 기본 스타일">
            <div style={{ display: "flex", gap: 8 }}>
              <ChipDemo variant="filled" color="brandDefault">Brand</ChipDemo>
              <ChipDemo variant="filled" color="baseDefault">Base</ChipDemo>
            </div>
          </VariantCard>
          <VariantCard name="Outlined" description="테두리만 있는 가벼운 스타일">
            <div style={{ display: "flex", gap: 8 }}>
              <ChipDemo variant="outlined" color="brandDefault">Brand</ChipDemo>
              <ChipDemo variant="outlined" color="baseDefault">Base</ChipDemo>
            </div>
          </VariantCard>
        </div>
      </Section>

      {/* Sizes */}
      <Section title="Sizes">
        <PreviewBox>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <ChipDemo size="small">Small</ChipDemo>
              <p style={{ fontSize: 11, color: "var(--content-base-secondary)", marginTop: 8 }}>24px</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <ChipDemo size="medium">Medium</ChipDemo>
              <p style={{ fontSize: 11, color: "var(--content-base-secondary)", marginTop: 8 }}>32px</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <ChipDemo size="large">Large</ChipDemo>
              <p style={{ fontSize: 11, color: "var(--content-base-secondary)", marginTop: 8 }}>40px</p>
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* Colors */}
      <Section title="Colors">
        <Subsection title="Filled">
          <PreviewBox>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <ChipDemo color="brandDefault">Brand</ChipDemo>
              <ChipDemo color="baseDefault">Base</ChipDemo>
              <ChipDemo color="successDefault">Success</ChipDemo>
              <ChipDemo color="errorDefault">Error</ChipDemo>
              <ChipDemo color="warningDefault">Warning</ChipDemo>
            </div>
          </PreviewBox>
        </Subsection>
        <Subsection title="Outlined">
          <PreviewBox>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <ChipDemo variant="outlined" color="brandDefault">Brand</ChipDemo>
              <ChipDemo variant="outlined" color="baseDefault">Base</ChipDemo>
              <ChipDemo variant="outlined" color="successDefault">Success</ChipDemo>
              <ChipDemo variant="outlined" color="errorDefault">Error</ChipDemo>
              <ChipDemo variant="outlined" color="warningDefault">Warning</ChipDemo>
            </div>
          </PreviewBox>
        </Subsection>
      </Section>

      {/* States */}
      <Section title="States">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          Chip의 다양한 상태를 확인할 수 있습니다. 직접 클릭해서 Pressed 상태를 확인해보세요.
        </p>
        <PreviewBox>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <ChipDemo color="brandDefault">Default</ChipDemo>
              <p style={{ fontSize: 11, color: "var(--content-base-secondary)", marginTop: 8 }}>기본</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <ChipDemo color="brandDefault" selected>Selected</ChipDemo>
              <p style={{ fontSize: 11, color: "var(--content-base-secondary)", marginTop: 8 }}>선택됨</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <ChipDemo color="brandDefault" disabled>Disabled</ChipDemo>
              <p style={{ fontSize: 11, color: "var(--content-base-secondary)", marginTop: 8 }}>비활성화</p>
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* Design Tokens */}
      <Section title="Design Tokens">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          Chip 컴포넌트에 적용된 Foundation 기반 디자인 토큰입니다.
        </p>

        <Subsection title="Size별 토큰">
          <div style={{ overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Property</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Small</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Medium</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Large</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: "12px 16px" }}>Height</td>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "var(--content-brand-default)" }}>24px</td>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "var(--content-brand-default)" }}>32px</td>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "var(--content-brand-default)" }}>40px</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: "12px 16px" }}>Padding X</td>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "var(--content-brand-default)" }}>8px (primitive.2)</td>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "var(--content-brand-default)" }}>12px (primitive.3)</td>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "var(--content-brand-default)" }}>16px (primitive.4)</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: "12px 16px" }}>Font Size</td>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "var(--content-brand-default)" }}>12px (xs)</td>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "var(--content-brand-default)" }}>14px (sm)</td>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "var(--content-brand-default)" }}>16px (base)</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: "12px 16px" }}>Icon Size</td>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "var(--content-brand-default)" }}>14px</td>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "var(--content-brand-default)" }}>18px</td>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "var(--content-brand-default)" }}>22px</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px" }}>Border Radius</td>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "var(--content-brand-default)" }}>12px (height/2)</td>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "var(--content-brand-default)" }}>16px (height/2)</td>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "var(--content-brand-default)" }}>20px (height/2)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Color 토큰">
          <div style={{ overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Property</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Foundation Token</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Value (brandDefault)</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: "12px 16px" }}>Background (filled)</td>
                  <td style={{ padding: "12px 16px" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>surface.brand.secondary</code></td>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "var(--content-brand-default)" }}>var(--surface-brand-secondary) (palette.blue.95)</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: "12px 16px" }}>Background (selected)</td>
                  <td style={{ padding: "12px 16px" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>surface.brand.default</code></td>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "var(--content-brand-default)" }}>var(--content-brand-default) (palette.blue.50)</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: "12px 16px" }}>Border (outlined)</td>
                  <td style={{ padding: "12px 16px" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>border.brand.default</code></td>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "var(--content-brand-default)" }}>var(--content-brand-default) (palette.blue.50)</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: "12px 16px" }}>Text (filled)</td>
                  <td style={{ padding: "12px 16px" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>content.brand.strong</code></td>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "var(--content-brand-default)" }}>var(--content-brand-default) (palette.blue.50)</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px" }}>Text (selected)</td>
                  <td style={{ padding: "12px 16px" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>content.base.onColor</code></td>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "var(--content-brand-default)" }}>var(--static-white) (palette.static.white)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>
      </Section>

      {/* Usage Guidelines */}
      <Section title="Usage Guidelines">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 24, lineHeight: 1.6 }}>
          일관된 UX를 위해 아래 권고 조합을 따르세요. Chip은 <strong style={{ color: "var(--text-primary)" }}>컴팩트한 정보 표현과 인터랙션</strong>이 필요한 상황에서 사용합니다.
        </p>

        <Subsection title="Recommended Combinations">
          <div style={{ display: "grid", gap: 12 }}>
            <UsageCard
              situation="Filter Chips"
              desc="카테고리, 태그 등 필터 선택/해제"
              variant="filled"
              color="brandDefault"
              chipLabel="전자제품"
              selected
            />
            <UsageCard
              situation="Selection Chips"
              desc="여러 옵션 중 하나 또는 다수 선택"
              variant="outlined"
              color="brandDefault"
              chipLabel="옵션 A"
            />
            <UsageCard
              situation="Input Chips"
              desc="태그 입력, 이메일 수신자 등 제거 가능한 항목"
              variant="filled"
              color="baseDefault"
              chipLabel="React"
              showClose
            />
            <UsageCard
              situation="Status Indicator"
              desc="상태 표시 (성공, 에러, 경고)"
              variant="filled"
              color="successDefault"
              chipLabel="완료"
            />
          </div>
        </Subsection>

        <Subsection title="Do / Don&apos;t">
          <div style={{ overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)", marginBottom: 16 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)", color: "var(--status-positive-content)" }}>Do</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)", color: "var(--status-negative-content)" }}>Don&apos;t</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>짧고 간결한 라벨을 사용하세요 (2-4글자)</td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>긴 문장을 Chip에 넣지 마세요</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>필터/선택 용도로 사용하세요</td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>주요 CTA 액션에 Chip을 사용하지 마세요</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>의미에 맞는 색상을 사용하세요</td>
                  <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>한 영역에 5개 이상의 색상을 혼용하지 마세요</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Design Principles">
          <div style={{ display: "grid", gap: 16 }}>
            <PrincipleCard
              number={1}
              title="컴팩트한 정보 전달"
              desc="Chip은 짧은 텍스트로 상태, 카테고리, 속성을 나타냅니다. 긴 텍스트가 필요하면 Button이나 Badge를 사용하세요."
            />
            <PrincipleCard
              number={2}
              title="선택 상태의 명확한 시각적 피드백"
              desc="selected 상태는 배경색 변화와 체크 아이콘으로 사용자에게 명확히 전달됩니다. 선택/해제가 즉시 반영되어야 합니다."
            />
            <PrincipleCard
              number={3}
              title="제거 가능한 Chip은 onClose 사용"
              desc="태그 입력 등 사용자가 제거할 수 있는 Chip에는 onClose를 제공하세요. X 버튼은 별도의 클릭 영역으로 접근 가능해야 합니다."
            />
          </div>
        </Subsection>
      </Section>

      {/* Best Practices */}
      <Section title="Best Practices">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <DoCard>
            <div style={{ display: "flex", gap: 8 }}>
              <ChipDemo color="brandDefault">전체</ChipDemo>
              <ChipDemo color="brandDefault" selected>전자제품</ChipDemo>
              <ChipDemo color="brandDefault">의류</ChipDemo>
            </div>
          </DoCard>
          <DontCard>
            <div style={{ display: "flex", gap: 8 }}>
              <ChipDemo color="brandDefault" selected>전자제품 카테고리 전체 보기</ChipDemo>
            </div>
          </DontCard>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 4 }}>
          <DoLabel>Chip 라벨은 간결하게 작성합니다.</DoLabel>
          <DontLabel>긴 텍스트를 Chip에 사용하지 않습니다.</DontLabel>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
          <DoCard>
            <div style={{ display: "flex", gap: 8 }}>
              <ChipDemo color="brandDefault" selected>React</ChipDemo>
              <ChipDemo color="brandDefault">TypeScript</ChipDemo>
            </div>
          </DoCard>
          <DontCard>
            <div style={{ display: "flex", gap: 8 }}>
              <ChipDemo color="brandDefault" selected>React</ChipDemo>
              <ChipDemo color="successDefault" selected>TypeScript</ChipDemo>
              <ChipDemo color="errorDefault" selected>Vue</ChipDemo>
            </div>
          </DontCard>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 4 }}>
          <DoLabel>같은 용도의 Chip 그룹에는 동일한 색상을 사용합니다.</DoLabel>
          <DontLabel>같은 그룹에서 여러 색상을 혼용하지 않습니다.</DontLabel>
        </div>
      </Section>

      {/* Accessibility */}
      <Section title="Accessibility">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          Chip 컴포넌트는 선택 상태와 제거 기능의 접근성을 보장합니다.
        </p>

        <div style={{ overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)", marginBottom: 24 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>속성</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>role=&quot;button&quot;</code></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>스크린 리더가 버튼으로 인식</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>aria-pressed</code></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>selected 상태를 보조 기술에 전달</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>aria-label</code> (Close)</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>닫기 버튼에 목적을 설명하는 레이블 제공</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>aria-disabled</code></td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>비활성화 상태를 보조 기술에 전달</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Subsection title="Keyboard Interaction">
          <div style={{ overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>키</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>동작</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><kbd style={{ padding: "2px 6px", backgroundColor: "var(--bg-secondary)", borderRadius: 4, fontSize: 12 }}>Tab</kbd></td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>Chip으로 포커스 이동</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><kbd style={{ padding: "2px 6px", backgroundColor: "var(--bg-secondary)", borderRadius: 4, fontSize: 12 }}>Enter</kbd> / <kbd style={{ padding: "2px 6px", backgroundColor: "var(--bg-secondary)", borderRadius: 4, fontSize: 12 }}>Space</kbd></td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>Chip 선택/해제 토글</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><kbd style={{ padding: "2px 6px", backgroundColor: "var(--bg-secondary)", borderRadius: 4, fontSize: 12 }}>Tab</kbd> (Close)</td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>닫기 버튼으로 포커스 이동 (별도 탭 타겟)</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px" }}><kbd style={{ padding: "2px 6px", backgroundColor: "var(--bg-secondary)", borderRadius: 4, fontSize: 12 }}>Delete</kbd> / <kbd style={{ padding: "2px 6px", backgroundColor: "var(--bg-secondary)", borderRadius: 4, fontSize: 12 }}>Backspace</kbd></td>
                  <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>onClose가 있는 Chip 제거</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Design Principles">
          <div style={{ display: "grid", gap: 16 }}>
            <PrincipleCard
              number={1}
              title="aria-pressed로 선택 상태 전달"
              desc="selected 상태는 aria-pressed 속성을 통해 스크린 리더에 전달됩니다. 사용자가 현재 선택 상태를 인지할 수 있어야 합니다."
            />
            <PrincipleCard
              number={2}
              title="Close Button 접근성"
              desc="닫기 버튼은 별도의 탭 타겟으로 접근 가능하며, Enter/Space 키로 제거할 수 있습니다. aria-label='삭제'를 제공합니다."
            />
            <PrincipleCard
              number={3}
              title="Color Contrast"
              desc="WCAG 2.1 AA 기준(4.5:1)을 충족하는 색상 대비를 유지합니다. selected 상태에서도 텍스트 가독성을 보장합니다."
            />
            <PrincipleCard
              number={4}
              title="Chip Group Navigation"
              desc="Chip 그룹 내에서 Tab 키로 순차 이동이 가능해야 합니다. 선택된 Chip의 상태가 스크린 리더에 즉시 반영됩니다."
            />
          </div>
        </Subsection>
      </Section>

      {/* Related Components */}
      <Section title="Related Components">
        <div style={{ overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>컴포넌트</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>용도</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>차이점</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px", fontWeight: 500 }}>Button</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>주요/보조 액션 트리거</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>Chip은 선택/필터용, Button은 액션 실행용</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px", fontWeight: 500 }}>ContentBadge</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>읽기 전용 상태/라벨 표시</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>Chip은 인터랙티브, Badge는 비인터랙티브</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px", fontWeight: 500 }}>TextButton</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>텍스트 링크 스타일 보조 액션</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>Chip은 선택 상태 표현, TextButton은 네비게이션/액션</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", fontWeight: 500 }}>IconButton</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>아이콘만으로 액션 표현</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>Chip은 텍스트 기반, IconButton은 아이콘 전용</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}

function WebContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
      {/* Source Code */}
      <Section title="Source Code">
        <div style={{ padding: 16, backgroundColor: "var(--bg-secondary)", borderRadius: 12, marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>Chip Component</p>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "4px 0 0 0" }}>실제 컴포넌트 소스 코드를 GitHub에서 확인하세요.</p>
          </div>
          <a
            href="https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system/src/components/Chip/Chip.tsx"
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
              backgroundColor: "var(--inverse-surface-default)",
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
        <CodeBlock code={`import { Chip } from '@baerae-zkap/design-system';`} />
      </Section>

      {/* Basic Usage */}
      <Section title="Basic Usage">
        <PreviewBox>
          <ChipDemo>기본 칩</ChipDemo>
        </PreviewBox>
        <CodeBlock code={`<Chip onClick={() => {}}>기본 칩</Chip>`} />
      </Section>

      {/* Filter Example */}
      <Section title="Filter Example">
        <PreviewBox>
          <FilterChipDemo />
        </PreviewBox>
        <CodeBlock code={`const [selected, setSelected] = useState(['전자제품']);

const toggle = (filter: string) => {
  setSelected(prev =>
    prev.includes(filter)
      ? prev.filter(f => f !== filter)
      : [...prev, filter]
  );
};

<div style={{ display: 'flex', gap: 8 }}>
  {['전자제품', '의류', '식품'].map(filter => (
    <Chip
      key={filter}
      color="brandDefault"
      selected={selected.includes(filter)}
      onClick={() => toggle(filter)}
    >
      {filter}
    </Chip>
  ))}
</div>`} />
      </Section>

      {/* Input Example */}
      <Section title="Input Example">
        <PreviewBox>
          <InputChipDemo />
        </PreviewBox>
        <CodeBlock code={`const [tags, setTags] = useState(['React', 'TypeScript']);

const remove = (tag: string) => {
  setTags(prev => prev.filter(t => t !== tag));
};

<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
  {tags.map(tag => (
    <Chip
      key={tag}
      onClose={() => remove(tag)}
    >
      {tag}
    </Chip>
  ))}
</div>`} />
      </Section>

      {/* API Reference */}
      <Section title="API Reference">
        <PropsTable
          props={[
            { name: "variant", type: '"filled" | "outlined"', required: false, defaultVal: '"filled"', description: "스타일 변형" },
            { name: "color", type: '"brandDefault" | "baseDefault" | "successDefault" | "errorDefault" | "warningDefault"', required: false, defaultVal: '"baseDefault"', description: "색상 테마" },
            { name: "size", type: '"small" | "medium" | "large"', required: false, defaultVal: '"medium"', description: "크기" },
            { name: "selected", type: "boolean", required: false, defaultVal: "false", description: "선택 상태" },
            { name: "disabled", type: "boolean", required: false, defaultVal: "false", description: "비활성화 상태" },
            { name: "leftIcon", type: "ReactNode", required: false, description: "좌측 아이콘" },
            { name: "onClose", type: "() => void", required: false, description: "닫기 버튼 핸들러" },
            { name: "onClick", type: "() => void", required: false, description: "클릭 핸들러" },
          ]}
        />
      </Section>
    </div>
  );
}

// ==================== Demo Components ====================

interface ChipDemoProps {
  variant?: ChipVariant;
  color?: ChipColor;
  size?: ChipSize;
  selected?: boolean;
  disabled?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

function ChipDemo({
  variant = "filled",
  color = "baseDefault",
  size = "medium",
  selected = false,
  disabled = false,
  onClose,
  children,
}: ChipDemoProps) {
  return (
    <Chip
      variant={variant}
      color={color}
      size={size}
      selected={selected}
      disabled={disabled}
      onClose={onClose}
    >
      {children}
    </Chip>
  );
}

function FilterChipDemo() {
  const [selected, setSelected] = useState(['전자제품']);
  const filters = ['전자제품', '의류', '식품'];

  const toggle = (filter: string) => {
    setSelected(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {filters.map(filter => (
        <ChipDemo
          key={filter}
          color="brandDefault"
          selected={selected.includes(filter)}
        >
          {filter}
        </ChipDemo>
      ))}
    </div>
  );
}

function InputChipDemo() {
  const [tags, setTags] = useState(['React', 'TypeScript', 'React Native']);

  const remove = (tag: string) => {
    setTags(prev => prev.filter(t => t !== tag));
  };

  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {tags.map(tag => (
        <ChipDemo
          key={tag}
          onClose={() => remove(tag)}
        >
          {tag}
        </ChipDemo>
      ))}
    </div>
  );
}

// ==================== UI Components ====================

function InteractionStateCard({ label, sublabel, color, bgColor, opacity, showFocusRing }: {
  label: string; sublabel: string; color: string; bgColor: string; opacity?: number; showFocusRing?: boolean;
}) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: 16,
    }}>
      <div style={{
        width: "100%", height: 48, borderRadius: 12,
        backgroundColor: bgColor,
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: opacity ?? 1,
        outline: showFocusRing ? "2px solid var(--content-brand-default)" : "none",
        outlineOffset: showFocusRing ? 2 : 0,
        color: color, fontSize: 13, fontWeight: 500,
      }}>
        {label}
      </div>
      <span style={{ fontSize: 12, color: "var(--text-tertiary)", textAlign: "center" }}>{sublabel}</span>
    </div>
  );
}

function UsageCard({ situation, desc, variant = "filled", color, chipLabel, selected = false, showClose = false }: {
  situation: string;
  desc: string;
  variant?: ChipVariant;
  color: ChipColor;
  chipLabel: string;
  selected?: boolean;
  showClose?: boolean;
}) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr auto",
      gap: 16,
      padding: 16,
      backgroundColor: "var(--surface-base-default)",
      borderRadius: 12,
      border: "1px solid var(--divider)",
      alignItems: "center",
    }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>{situation}</span>
          <span style={{
            fontSize: 11,
            padding: "2px 6px",
            backgroundColor: variant === "filled" ? "var(--surface-brand-secondary)" : "var(--surface-base-alternative)",
            color: variant === "filled" ? "var(--surface-brand-defaultPressed)" : "var(--content-base-secondary)",
            borderRadius: 4,
            fontWeight: 500,
          }}>
            {variant} + {color}
          </span>
        </div>
        <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0 }}>{desc}</p>
      </div>
      <ChipDemo
        variant={variant}
        color={color}
        size="small"
        selected={selected}
        onClose={showClose ? () => {} : undefined}
      >
        {chipLabel}
      </ChipDemo>
    </div>
  );
}
