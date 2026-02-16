"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform, highlightCode } from "@/components/PlatformTabs";
import { Card } from '@baerae-zkap/design-system';
import { Section, Subsection } from "@/components/docs/Section";
import { PropsTable } from "@/components/docs/PropsTable";
import { PrincipleCard, VariantCard, DoCard, DontCard } from "@/components/docs/Cards";
import { RadioGroup, CopyButton } from "@/components/docs/Playground";

// Types
type CardVariant = "elevated" | "outlined" | "filled";
type CardPadding = "none" | "small" | "medium" | "large";

export default function CardPage() {
  return (
    <div style={{ maxWidth: 720 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Contents" },
          { label: "Card" },
        ]}
      />

      {/* Header */}
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
        Card
      </h1>
      <p style={{ fontSize: 15, color: "var(--text-secondary)", marginBottom: 32, lineHeight: 1.6 }}>
        관련 정보를 하나의 시각적 단위로 그룹화하는 컨테이너입니다. 콘텐츠 간 시각적 계층과 구조를 만듭니다.
      </p>

      {/* Interactive Playground */}
      <CardPlayground />

      {/* Platform Tabs */}
      <PlatformTabs>
        {(platform) => <PlatformContent platform={platform} />}
      </PlatformTabs>
    </div>
  );
}

function CardPlayground() {
  const [variant, setVariant] = useState<CardVariant>("elevated");
  const [padding, setPadding] = useState<CardPadding>("medium");
  const [clickable, setClickable] = useState(false);

  const generateCode = () => {
    const props = [];
    if (variant !== "elevated") props.push(`variant="${variant}"`);
    if (padding !== "medium") props.push(`padding="${padding}"`);
    if (clickable) props.push("onClick={() => {}}");

    const propsStr = props.length > 0 ? `\n  ${props.join("\n  ")}\n` : "";

    return `<Card${propsStr}>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>`;
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
              backgroundColor: variant === "filled" ? "var(--surface-base-default)" : "var(--surface-base-alternative)",
            }}
          >
            <CardDemo
              variant={variant}
              padding={padding}
              onClick={clickable ? () => {} : undefined}
            >
              <p style={{ margin: 0, fontWeight: 600, fontSize: 16, color: "var(--content-base-strong)", marginBottom: 8 }}>
                Card Title
              </p>
              <p style={{ margin: 0, fontSize: 14, color: "var(--content-base-secondary)", lineHeight: 1.6 }}>
                This is the card content. It can contain any elements.
              </p>
            </CardDemo>
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
                  { value: "elevated", label: "Elevated" },
                  { value: "outlined", label: "Outlined" },
                  { value: "filled", label: "Filled" },
                ]}
                value={variant}
                onChange={(v) => setVariant(v as CardVariant)}
              />

              {/* Padding */}
              <RadioGroup
                label="Padding"
                options={[
                  { value: "none", label: "None" },
                  { value: "small", label: "Small" },
                  { value: "medium", label: "Medium" },
                  { value: "large", label: "Large" },
                ]}
                value={padding}
                onChange={(v) => setPadding(v as CardPadding)}
              />

              {/* Clickable */}
              <RadioGroup
                label="Clickable"
                options={[
                  { value: "false", label: "False" },
                  { value: "true", label: "True" },
                ]}
                value={clickable ? "true" : "false"}
                onChange={(v) => setClickable(v === "true")}
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
          <div style={{ display: "flex", gap: 8 }}>
            <span style={{
              fontSize: 13,
              fontWeight: 600,
              padding: "4px 12px",
              borderRadius: 6,
              color: "var(--content-base-onColor)",
              backgroundColor: "var(--docs-code-active-bg)",
            }}>Web</span>
          </div>
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
      <div>
        <h2
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: "var(--text-primary)",
            marginBottom: 8,
          }}
        >
          개요
        </h2>
        <p
          style={{
            fontSize: 16,
            lineHeight: 1.6,
            color: "var(--text-secondary)",
            marginBottom: 24,
          }}
        >
          Card는 관련 정보를 하나의 시각적 단위로 그룹화하는 컨테이너 컴포넌트입니다. 콘텐츠를 구조화하고 시각적 계층을 만들어 사용자가 정보를 쉽게 탐색할 수 있게 합니다.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
          }}
        >
          <div
            style={{
              padding: 24,
              borderRadius: 12,
              backgroundColor: "var(--surface-success-default)",
              border: "1px solid var(--border-success-default)",
            }}
          >
            <h3
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "var(--content-success-default)",
                marginBottom: 12,
              }}
            >
              이런 경우 사용하세요
            </h3>
            <ul
              style={{
                fontSize: 14,
                lineHeight: 1.8,
                color: "var(--text-secondary)",
                paddingLeft: 20,
                margin: 0,
              }}
            >
              <li>관련 콘텐츠를 하나의 단위로 묶어 표시할 때</li>
              <li>그리드 레이아웃에서 반복 가능한 콘텐츠 단위가 필요할 때</li>
              <li>콘텐츠 간 시각적 구분이 필요할 때</li>
            </ul>
          </div>
          <div
            style={{
              padding: 24,
              borderRadius: 12,
              backgroundColor: "var(--surface-error-default)",
              border: "1px solid var(--border-error-default)",
            }}
          >
            <h3
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "var(--content-error-default)",
                marginBottom: 12,
              }}
            >
              이런 경우 사용하지 마세요
            </h3>
            <ul
              style={{
                fontSize: 14,
                lineHeight: 1.8,
                color: "var(--text-secondary)",
                paddingLeft: 20,
                margin: 0,
              }}
            >
              <li>단순 텍스트 나열에는 사용하지 마세요 — 불필요한 시각적 무게를 더합니다</li>
              <li>페이지 전체 레이아웃 컨테이너로 사용하지 마세요</li>
            </ul>
          </div>
        </div>
      </div>

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
          <svg width="400" height="180" viewBox="0 0 400 180">
            {/* Card Container */}
            <rect x="100" y="30" width="200" height="120" rx="12" fill="white" stroke="var(--border-base-default)" strokeWidth="1.5" filter="url(#cardShadow)" />

            {/* Shadow definition */}
            <defs>
              <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.08"/>
              </filter>
            </defs>

            {/* Content placeholders */}
            <rect x="120" y="50" width="160" height="12" rx="4" fill="var(--border-base-default)" />
            <rect x="120" y="70" width="120" height="8" rx="4" fill="var(--surface-base-alternative)" />
            <rect x="120" y="86" width="140" height="8" rx="4" fill="var(--surface-base-alternative)" />
            <rect x="120" y="110" width="80" height="24" rx="6" fill="var(--content-brand-default)" />
            <text x="160" y="126" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">Action</text>

            {/* Lines to labels */}
            <line x1="50" y1="90" x2="100" y2="90" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="100" cy="90" r="3" fill="var(--content-base-default)" />

            <line x1="200" y1="150" x2="200" y2="170" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="200" cy="150" r="3" fill="var(--content-base-default)" />

            {/* Numbered circles */}
            <circle cx="35" cy="90" r="14" fill="var(--content-base-default)" />
            <text x="35" y="95" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">1</text>

            <circle cx="200" cy="170" r="14" fill="var(--content-base-default)" />
            <text x="200" y="175" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">2</text>

            {/* Padding indicator */}
            <line x1="102" y1="32" x2="102" y2="48" stroke="var(--content-brand-default)" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="118" y1="32" x2="118" y2="48" stroke="var(--content-brand-default)" strokeWidth="1" strokeDasharray="2 2" />
            <text x="110" y="20" textAnchor="middle" fill="var(--content-brand-default)" fontSize="9">padding</text>
          </svg>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          marginTop: 20,
          fontSize: 14,
          fontWeight: 500,
          color: "var(--text-primary)",
        }}>
          <div>1. Container (border-radius, shadow/border)</div>
          <div style={{ textAlign: "right" }}>2. Content Area (padding 적용)</div>
        </div>
      </Section>

      {/* Variants */}
      <Section title="Variants">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          <VariantCard name="Elevated" description="그림자로 깊이감 표현">
            <CardDemo variant="elevated" padding="small">
              <p style={{ margin: 0, fontSize: 12, color: "var(--content-base-secondary)" }}>Shadow</p>
            </CardDemo>
          </VariantCard>
          <VariantCard name="Outlined" description="테두리로 영역 구분">
            <CardDemo variant="outlined" padding="small">
              <p style={{ margin: 0, fontSize: 12, color: "var(--content-base-secondary)" }}>Border</p>
            </CardDemo>
          </VariantCard>
          <VariantCard name="Filled" description="배경색으로 구분">
            <CardDemo variant="filled" padding="small">
              <p style={{ margin: 0, fontSize: 12, color: "var(--content-base-secondary)" }}>Background</p>
            </CardDemo>
          </VariantCard>
        </div>
      </Section>

      {/* Padding */}
      <Section title="Padding">
        <PreviewBox>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
            <div style={{ textAlign: "center" }}>
              <CardDemo variant="outlined" padding="none">
                <div style={{ width: 60, height: 40, backgroundColor: "var(--border-base-default)", borderRadius: 4 }} />
              </CardDemo>
              <p style={{ fontSize: 11, color: "var(--content-base-secondary)", marginTop: 8 }}>None (0)</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <CardDemo variant="outlined" padding="small">
                <div style={{ width: 60, height: 40, backgroundColor: "var(--border-base-default)", borderRadius: 4 }} />
              </CardDemo>
              <p style={{ fontSize: 11, color: "var(--content-base-secondary)", marginTop: 8 }}>Small (12)</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <CardDemo variant="outlined" padding="medium">
                <div style={{ width: 60, height: 40, backgroundColor: "var(--border-base-default)", borderRadius: 4 }} />
              </CardDemo>
              <p style={{ fontSize: 11, color: "var(--content-base-secondary)", marginTop: 8 }}>Medium (20)</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <CardDemo variant="outlined" padding="large">
                <div style={{ width: 60, height: 40, backgroundColor: "var(--border-base-default)", borderRadius: 4 }} />
              </CardDemo>
              <p style={{ fontSize: 11, color: "var(--content-base-secondary)", marginTop: 8 }}>Large (24)</p>
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* Colors */}
      <Section title="Colors">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          Card의 배경색과 테두리는 variant에 따라 결정됩니다. 각 variant는 서로 다른 시각적 계층을 제공합니다.
        </p>

        <div style={{ marginBottom: 24, overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Variant</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>배경색</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>테두리/그림자</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>용도</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 13, fontWeight: 500 }}>elevated</code></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>white</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>box-shadow</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>기본값. 깊이감 있는 카드</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 13, fontWeight: 500 }}>outlined</code></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>white</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>1px solid var(--border-base-default)</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>플랫한 디자인. 리스트 내 카드</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 13, fontWeight: 500 }}>filled</code></td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>var(--surface-base-alternative)</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>없음</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>배경 구분. 섹션 내 그룹화</td>
              </tr>
            </tbody>
          </table>
        </div>

        <PreviewBox>
          <div style={{ display: "flex", gap: 16, padding: 24 }}>
            <div style={{ textAlign: "center" }}>
              <CardDemo variant="elevated" padding="medium">
                <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: "var(--content-base-strong)" }}>Elevated</p>
                <p style={{ margin: 0, fontSize: 11, color: "var(--content-base-secondary)", marginTop: 4 }}>white + shadow</p>
              </CardDemo>
            </div>
            <div style={{ textAlign: "center" }}>
              <CardDemo variant="outlined" padding="medium">
                <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: "var(--content-base-strong)" }}>Outlined</p>
                <p style={{ margin: 0, fontSize: 11, color: "var(--content-base-secondary)", marginTop: 4 }}>white + border</p>
              </CardDemo>
            </div>
            <div style={{ textAlign: "center" }}>
              <CardDemo variant="filled" padding="medium">
                <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: "var(--content-base-strong)" }}>Filled</p>
                <p style={{ margin: 0, fontSize: 11, color: "var(--content-base-secondary)", marginTop: 4 }}>var(--surface-base-alternative) bg</p>
              </CardDemo>
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* States */}
      <Section title="States">
        <PreviewBox>
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <CardDemo variant="elevated" padding="medium">
                <p style={{ margin: 0, fontSize: 12, color: "var(--content-base-secondary)" }}>Default</p>
              </CardDemo>
              <p style={{ fontSize: 11, color: "var(--content-base-secondary)", marginTop: 8 }}>Default</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <CardDemo variant="elevated" padding="medium" onClick={() => {}}>
                <p style={{ margin: 0, fontSize: 12, color: "var(--content-base-secondary)" }}>Clickable</p>
              </CardDemo>
              <p style={{ fontSize: 11, color: "var(--content-base-secondary)", marginTop: 8 }}>Hover/Press</p>
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* Interaction States */}
      <Section title="Interaction States">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 24 }}>
          클릭 가능한 Card는 사용자 상호작용에 따라 시각적 피드백을 제공합니다. 각 상태는 그림자와 배경색 변화로 구분됩니다.
        </p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 16,
          padding: 24,
          backgroundColor: "var(--surface-base-alternative)",
          borderRadius: 16,
        }}>
          <StateCard label="Default" sublabel="기본 상태">
            <div style={{ width: 100, height: 64, borderRadius: 12, backgroundColor: "var(--surface-base-default)", boxShadow: "var(--shadow-semantic-card-default)" }} />
          </StateCard>
          <StateCard label="Hover" sublabel="그림자 증가">
            <div style={{ width: 100, height: 64, borderRadius: 12, backgroundColor: "var(--surface-base-default)", boxShadow: "var(--shadow-semantic-card-elevated)" }} />
          </StateCard>
          <StateCard label="Pressed" sublabel="눌림 상태">
            <div style={{ width: 100, height: 64, borderRadius: 12, backgroundColor: "var(--surface-base-default)", boxShadow: "var(--shadow-primitive-xs)", transform: "scale(0.98)", transition: "transform 0.1s" }} />
          </StateCard>
          <StateCard label="Focused" sublabel="키보드 포커스">
            <div style={{ width: 100, height: 64, borderRadius: 12, backgroundColor: "var(--surface-base-default)", boxShadow: "var(--shadow-semantic-card-default)", outline: "2px solid var(--content-brand-default)", outlineOffset: 2 }} />
          </StateCard>
        </div>
      </Section>

      {/* Design Tokens (Spec) */}
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
                <th style={{ textAlign: "left", padding: "10px 12px", color: "var(--text-primary)", fontWeight: 600 }}>값</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
                <td style={{ padding: "10px 12px", color: "var(--text-primary)" }}>배경색</td>
                <td style={{ padding: "10px 12px" }}>
                  <code style={{ fontSize: 12, padding: "2px 6px", borderRadius: 4, backgroundColor: "var(--surface-base-alternative)", color: "var(--content-brand-default)" }}>--surface-base-default</code>
                </td>
                <td style={{ padding: "10px 12px", color: "var(--text-tertiary)" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: "var(--surface-base-default)", border: "1px solid var(--border-default)" }} />
                    White / Dark Grey
                  </span>
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
                <td style={{ padding: "10px 12px", color: "var(--text-primary)" }}>테두리</td>
                <td style={{ padding: "10px 12px" }}>
                  <code style={{ fontSize: 12, padding: "2px 6px", borderRadius: 4, backgroundColor: "var(--surface-base-alternative)", color: "var(--content-brand-default)" }}>--border-default</code>
                </td>
                <td style={{ padding: "10px 12px", color: "var(--text-tertiary)" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: "var(--border-default)", border: "1px solid var(--border-default)" }} />
                    1px solid (outlined)
                  </span>
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
                <td style={{ padding: "10px 12px", color: "var(--text-primary)" }}>그림자</td>
                <td style={{ padding: "10px 12px" }}>
                  <code style={{ fontSize: 12, padding: "2px 6px", borderRadius: 4, backgroundColor: "var(--surface-base-alternative)", color: "var(--content-brand-default)" }}>elevation.low</code>
                </td>
                <td style={{ padding: "10px 12px", color: "var(--text-tertiary)" }}>0 1px 3px (elevated)</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
                <td style={{ padding: "10px 12px", color: "var(--text-primary)" }}>border-radius</td>
                <td style={{ padding: "10px 12px" }}>
                  <code style={{ fontSize: 12, padding: "2px 6px", borderRadius: 4, backgroundColor: "var(--surface-base-alternative)", color: "var(--content-brand-default)" }}>radius.semantic.card</code>
                </td>
                <td style={{ padding: "10px 12px", color: "var(--text-tertiary)" }}>16px</td>
              </tr>
              <tr>
                <td style={{ padding: "10px 12px", color: "var(--text-primary)" }}>패딩</td>
                <td style={{ padding: "10px 12px" }}>
                  <code style={{ fontSize: 12, padding: "2px 6px", borderRadius: 4, backgroundColor: "var(--surface-base-alternative)", color: "var(--content-brand-default)" }}>spacing.component.card.padding.md</code>
                </td>
                <td style={{ padding: "10px 12px", color: "var(--text-tertiary)" }}>20px</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* Usage Guidelines */}
      <Section title="Usage Guidelines">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 24, lineHeight: 1.6 }}>
          일관된 UX를 위해 아래 권고 조합을 따르세요. <strong style={{ color: "var(--text-primary)" }}>권장 패턴</strong>을 사용하면 사용자가 예측 가능한 경험을 할 수 있습니다.
        </p>

        <Subsection title="Recommended Combinations">
          <div style={{ display: "grid", gap: 12 }}>
            <UsageCard
              situation="콘텐츠 카드"
              description="제목, 설명, 이미지를 포함하는 일반 콘텐츠 카드"
              recommendation="elevated + medium padding"
              examples={["상품 카드", "뉴스 카드", "블로그 포스트"]}
            />
            <UsageCard
              situation="정보 카드"
              description="사용자 프로필, 통계 등 정보를 표시하는 카드"
              recommendation="outlined + medium padding"
              examples={["프로필 카드", "대시보드 통계", "설정 항목"]}
            />
            <UsageCard
              situation="리스트 아이템"
              description="리스트 내에서 반복되는 카드 형태"
              recommendation="outlined + small padding"
              examples={["알림 목록", "댓글 목록", "주문 내역"]}
            />
            <UsageCard
              situation="섹션 컨테이너"
              description="관련 콘텐츠를 그룹화하는 배경 영역"
              recommendation="filled + large padding"
              examples={["설정 그룹", "카테고리 영역", "하이라이트 섹션"]}
            />
          </div>
        </Subsection>

        <Subsection title="Design Principles">
          <div style={{ display: "grid", gap: 16 }}>
            <PrincipleCard
              number={1}
              title="시각적 계층을 유지하세요"
              desc="한 화면에서 elevated, outlined, filled를 적절히 조합하여 콘텐츠의 중요도를 시각적으로 표현합니다. 주요 콘텐츠에는 elevated를, 보조 콘텐츠에는 outlined 또는 filled를 사용합니다."
            />
            <PrincipleCard
              number={2}
              title="패딩을 일관되게 사용하세요"
              desc="같은 영역 내 카드들은 동일한 padding 값을 사용합니다. 밀도 높은 리스트에서는 small을, 독립적인 콘텐츠 카드에는 medium 또는 large를 사용합니다."
            />
            <PrincipleCard
              number={3}
              title="클릭 가능 여부를 명확히 하세요"
              desc="클릭 가능한 카드는 hover/press 상태 변화로 인터랙티브함을 시각적으로 표현합니다. 정보만 표시하는 카드에는 onClick을 사용하지 마세요."
            />
          </div>
        </Subsection>
      </Section>

      {/* Design Tokens */}
      <Section title="Design Tokens">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          Card 컴포넌트에 적용된 Foundation 기반 디자인 토큰입니다.
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
                <td style={{ padding: "12px 16px" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>radius.semantic.card.sm</code></td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "var(--content-brand-default)" }}>12px</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px" }}>Shadow (elevated)</td>
                <td style={{ padding: "12px 16px" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>shadow.sm</code></td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "var(--content-brand-default)" }}>0 1px 3px var(--shadow-primitive-xs)</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px" }}>Border (outlined)</td>
                <td style={{ padding: "12px 16px" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>border.base.default</code></td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "var(--content-brand-default)" }}>var(--border-base-default) (palette.grey.95)</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px" }}>Background (filled)</td>
                <td style={{ padding: "12px 16px" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>surface.base.alternative</code></td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "var(--content-brand-default)" }}>var(--surface-base-alternative) (palette.grey.99)</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px" }}>Padding none</td>
                <td style={{ padding: "12px 16px" }}>-</td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "var(--content-brand-default)" }}>0</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px" }}>Padding small</td>
                <td style={{ padding: "12px 16px" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>spacing.primitive.3</code></td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "var(--content-brand-default)" }}>12px</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px" }}>Padding medium</td>
                <td style={{ padding: "12px 16px" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>spacing.component.card.padding.md</code></td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "var(--content-brand-default)" }}>20px</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px" }}>Padding large</td>
                <td style={{ padding: "12px 16px" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>spacing.component.card.padding.lg</code></td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "var(--content-brand-default)" }}>24px</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* Accessibility */}
      <Section title="Accessibility">
        <div style={{ display: "grid", gap: 12 }}>
          <PrincipleCard number={1} title="Clickable Cards" desc="onClick/onPress가 있는 카드는 role='button'을 갖습니다." />
          <PrincipleCard number={2} title="Keyboard Support" desc="클릭 가능한 카드는 Enter/Space 키로 활성화됩니다." />
          <PrincipleCard number={3} title="Focus Indicator" desc="포커스 시 시각적 표시가 나타납니다." />
        </div>
      </Section>

      {/* Best Practices */}
      <Section title="Best Practices">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <DoCard>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <CardDemo variant="elevated" padding="medium">
                <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: "var(--content-base-strong)" }}>제목</p>
                <p style={{ margin: 0, fontSize: 11, color: "var(--content-base-secondary)", marginTop: 4 }}>설명 텍스트</p>
              </CardDemo>
            </div>
          </DoCard>
          <DontCard>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <CardDemo variant="elevated" padding="none">
                <div style={{ padding: "20px 12px 8px" }}>
                  <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: "var(--content-base-strong)" }}>제목</p>
                  <p style={{ margin: 0, fontSize: 11, color: "var(--content-base-secondary)", marginTop: 4 }}>내부 패딩 불일치</p>
                </div>
              </CardDemo>
            </div>
          </DontCard>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 8 }}>
          <p style={{ fontSize: 13, color: "var(--status-positive-content)", display: "flex", alignItems: "flex-start", gap: 8, margin: 0 }}>
            <span style={{ fontWeight: 700, flexShrink: 0 }}>Do</span>
            <span style={{ color: "var(--text-secondary)" }}>일관된 padding 값을 사용합니다.</span>
          </p>
          <p style={{ fontSize: 13, color: "var(--status-negative-content)", display: "flex", alignItems: "flex-start", gap: 8, margin: 0 }}>
            <span style={{ fontWeight: 700, flexShrink: 0 }}>Don&apos;t</span>
            <span style={{ color: "var(--text-secondary)" }}>padding을 none으로 두고 내부에서 임의로 조절하지 마세요.</span>
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
          <DoCard>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <CardDemo variant="elevated" padding="small">
                <p style={{ margin: 0, fontSize: 11, color: "var(--content-base-secondary)" }}>Elevated</p>
              </CardDemo>
              <CardDemo variant="outlined" padding="small">
                <p style={{ margin: 0, fontSize: 11, color: "var(--content-base-secondary)" }}>Outlined</p>
              </CardDemo>
            </div>
          </DoCard>
          <DontCard>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <CardDemo variant="elevated" padding="small">
                <p style={{ margin: 0, fontSize: 11, color: "var(--content-base-secondary)" }}>Elevated</p>
              </CardDemo>
              <div style={{ padding: 12, backgroundColor: "var(--surface-base-default)", borderRadius: 12, boxShadow: "0 1px 3px var(--shadow-primitive-xs)", border: "1px solid var(--border-base-default)" }}>
                <p style={{ margin: 0, fontSize: 11, color: "var(--content-base-secondary)" }}>Mixed</p>
              </div>
            </div>
          </DontCard>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 8 }}>
          <p style={{ fontSize: 13, color: "var(--status-positive-content)", display: "flex", alignItems: "flex-start", gap: 8, margin: 0 }}>
            <span style={{ fontWeight: 700, flexShrink: 0 }}>Do</span>
            <span style={{ color: "var(--text-secondary)" }}>같은 맥락에서 variant를 통일합니다.</span>
          </p>
          <p style={{ fontSize: 13, color: "var(--status-negative-content)", display: "flex", alignItems: "flex-start", gap: 8, margin: 0 }}>
            <span style={{ fontWeight: 700, flexShrink: 0 }}>Don&apos;t</span>
            <span style={{ color: "var(--text-secondary)" }}>같은 영역에서 elevated와 outlined을 혼용하지 마세요.</span>
          </p>
        </div>
      </Section>

      {/* Related Components */}
      <div>
        <h2
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: "var(--text-primary)",
            marginBottom: 16,
          }}
        >
          관련 컴포넌트
        </h2>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 14,
          }}
        >
          <thead>
            <tr
              style={{
                borderBottom: "2px solid var(--border-default)",
              }}
            >
              <th style={{ textAlign: "left", padding: "12px 16px", color: "var(--text-primary)" }}>컴포넌트</th>
              <th style={{ textAlign: "left", padding: "12px 16px", color: "var(--text-primary)" }}>용도</th>
              <th style={{ textAlign: "left", padding: "12px 16px", color: "var(--text-primary)" }}>차이점</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
              <td style={{ padding: "12px 16px", fontWeight: 600, color: "var(--text-primary)" }}>ListCell</td>
              <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>콘텐츠 표시</td>
              <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>ListCell은 단일 행, Card는 자유 레이아웃 컨테이너</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
              <td style={{ padding: "12px 16px", fontWeight: 600, color: "var(--text-primary)" }}>ActionArea</td>
              <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>터치 가능한 영역</td>
              <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>ActionArea는 Card 내부에서 인터랙션 영역 지정</td>
            </tr>
            <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
              <td style={{ padding: "12px 16px", fontWeight: 600, color: "var(--text-primary)" }}>ContentBadge</td>
              <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>정보 라벨</td>
              <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>ContentBadge는 Card 내부 상태 표시에 사용</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

const GITHUB_BASE = "https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system/src";
const CARD_SOURCE = `${GITHUB_BASE}/components/Card/Card.tsx`;

function WebContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
      {/* Source Code */}
      <Section title="Source Code">
        <div style={{ padding: 16, backgroundColor: "var(--bg-secondary)", borderRadius: 12, marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>Card Component</p>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "4px 0 0 0" }}>실제 컴포넌트 소스 코드를 GitHub에서 확인하세요.</p>
          </div>
          <a
            href={CARD_SOURCE}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              fontSize: 13,
              fontWeight: 500,
              color: "var(--content-base-onColor)",
              backgroundColor: "var(--docs-code-surface)",
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
        <CodeBlock code={`import { Card } from '@baerae-zkap/design-system';`} />
      </Section>

      {/* Basic Usage */}
      <Section title="Basic Usage">
        <PreviewBox>
          <div style={{ padding: 24 }}>
            <CardDemo variant="elevated" padding="medium">
              <p style={{ margin: 0, fontWeight: 600, fontSize: 16, color: "var(--content-base-strong)", marginBottom: 8 }}>
                Card Title
              </p>
              <p style={{ margin: 0, fontSize: 14, color: "var(--content-base-secondary)" }}>
                Card content goes here.
              </p>
            </CardDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<Card>
  <h3>Card Title</h3>
  <p>Card content goes here.</p>
</Card>`} />
      </Section>

      {/* Variants */}
      <Section title="Variants">
        <PreviewBox>
          <div style={{ display: "flex", gap: 16, padding: 24 }}>
            <CardDemo variant="elevated" padding="medium">
              <p style={{ margin: 0, fontSize: 12 }}>Elevated</p>
            </CardDemo>
            <CardDemo variant="outlined" padding="medium">
              <p style={{ margin: 0, fontSize: 12 }}>Outlined</p>
            </CardDemo>
            <CardDemo variant="filled" padding="medium">
              <p style={{ margin: 0, fontSize: 12 }}>Filled</p>
            </CardDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<Card variant="elevated">Elevated</Card>
<Card variant="outlined">Outlined</Card>
<Card variant="filled">Filled</Card>`} />
      </Section>

      {/* Clickable */}
      <Section title="Clickable Card">
        <PreviewBox>
          <div style={{ padding: 24 }}>
            <CardDemo variant="elevated" padding="medium" onClick={() => alert('Card clicked!')}>
              <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: "var(--content-base-strong)" }}>
                Click me
              </p>
              <p style={{ margin: 0, fontSize: 13, color: "var(--content-base-secondary)", marginTop: 4 }}>
                This card is interactive
              </p>
            </CardDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<Card onClick={() => console.log('clicked')}>
  <h3>Click me</h3>
  <p>This card is interactive</p>
</Card>`} />
      </Section>

      {/* API Reference */}
      <Section title="API Reference">
        <PropsTable
          props={[
            { name: "variant", type: '"elevated" | "outlined" | "filled"', required: false, defaultVal: '"elevated"', description: "카드 스타일" },
            { name: "padding", type: '"none" | "small" | "medium" | "large"', required: false, defaultVal: '"medium"', description: "내부 여백" },
            { name: "children", type: "ReactNode", required: true, description: "카드 콘텐츠" },
            { name: "onClick", type: "() => void", required: false, description: "클릭 핸들러 (클릭 가능한 카드)" },
            { name: "disabled", type: "boolean", required: false, defaultVal: "false", description: "비활성화 상태" },
          ]}
        />
      </Section>
    </div>
  );
}

// ============================================
// Shared Components
// ============================================

function UsageCard({ situation, description, recommendation, examples }: {
  situation: string;
  description: string;
  recommendation: string;
  examples: string[];
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
            backgroundColor: "var(--surface-brand-secondary)",
            color: "var(--surface-brand-defaultPressed)",
            borderRadius: 4,
            fontWeight: 500,
          }}>
            {recommendation}
          </span>
        </div>
        <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0, marginBottom: 6 }}>{description}</p>
        <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: 0 }}>
          예시: {examples.join(", ")}
        </p>
      </div>
    </div>
  );
}

// ============================================
// Demo Component
// ============================================

function CardDemo({
  variant = "elevated",
  padding = "medium",
  onClick,
  children,
}: {
  variant?: CardVariant;
  padding?: CardPadding;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <Card
      variant={variant}
      padding={padding}
      onClick={onClick}
    >
      {children}
    </Card>
  );
}

function StateCard({ label, sublabel, children }: {
  label: string; sublabel: string; children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: 16 }}>
      {children}
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{label}</div>
        <div style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 2 }}>{sublabel}</div>
      </div>
    </div>
  );
}
