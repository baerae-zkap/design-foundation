"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform, highlightCode } from "@/components/PlatformTabs";
import { Card, typography, spacing, radius } from '@baerae-zkap/design-system';
import { Section, Subsection, InlineCode } from "@/components/docs/Section";
import { PropsTable } from "@/components/docs/PropsTable";
import { PrincipleCard, VariantCard, DoCard, DontCard } from "@/components/docs/Cards";
import { RadioGroup, CopyButton } from "@/components/docs/Playground";

// Types
type CardVariant = "filled" | "elevated" | "outlined";
type CardPadding = "small" | "medium" | "large";

export default function CardPage() {
  return (
    <div style={{ maxWidth: 840 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Contents" },
          { label: "Card" },
        ]}
      />

      {/* Header */}
      <h1 style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold, marginBottom: spacing.primitive[2], color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
        Card
      </h1>
      <p style={{ fontSize: typography.fontSize.md, color: "var(--text-secondary)", marginBottom: spacing.primitive[8], lineHeight: 1.7 }}>
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
  const [variant, setVariant] = useState<CardVariant>("filled");
  const [padding, setPadding] = useState<CardPadding>("medium");
  const [mode, setMode] = useState<"children" | "slot">("children");

  const generateCode = () => {
    const props = [];
    if (variant !== "filled") props.push(`variant="${variant}"`);
    if (padding !== "medium") props.push(`padding="${padding}"`);
    props.push("onClick={() => {}}");

    if (mode === "slot") {
      props.push(`thumbnail={<img src="/photo.jpg" alt="..." style={{ width: '100%', height: 160, objectFit: 'cover' }} />}`);
      props.push(`heading="Card Title"`);
      props.push(`caption="Card content goes here"`);
      const propsStr = `\n  ${props.join("\n  ")}\n`;
      return `<Card${propsStr}/>`;
    }

    const propsStr = props.length > 0 ? `\n  ${props.join("\n  ")}\n` : "";

    return `<Card${propsStr}>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>`;
  };

  return (
    <div style={{ marginBottom: spacing.primitive[8] }}>
      <div
        style={{
          borderRadius: radius.primitive.xl,
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
            {mode === "slot" ? (
              <CardDemo
                variant={variant}
                padding={padding}
                onClick={() => {}}
                thumbnail={<div style={{ width: '100%', height: 160, backgroundColor: 'var(--surface-base-container)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ color: 'var(--content-base-neutral)', fontSize: typography.fontSize.compact }}>Image Placeholder</span></div>}
                heading="Card Title"
                caption="Card content goes here"
              />
            ) : (
              <CardDemo
                variant={variant}
                padding={padding}
                onClick={() => {}}
              >
                <p style={{ margin: 0, fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.md, color: "var(--content-base-strong)", marginBottom: spacing.primitive[2] }}>
                  Card Title
                </p>
                <p style={{ margin: 0, fontSize: typography.fontSize.sm, color: "var(--content-base-secondary)", lineHeight: 1.7 }}>
                  This is the card content. It can contain any elements.
                </p>
              </CardDemo>
            )}
          </div>

          {/* Control Panel */}
          <div
            style={{
              backgroundColor: "var(--surface-base-alternative)",
              display: "flex",
              flexDirection: "column",
              padding: spacing.primitive[4],
              overflow: "hidden",
              height: "100%",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                flex: 1,
                minHeight: 0,
                padding: spacing.primitive[6],
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: spacing.primitive[7],
                backgroundColor: "var(--surface-base-default)",
                borderRadius: radius.primitive.lg,
              }}
            >
              {/* Mode */}
              <RadioGroup
                label="Mode"
                options={[
                  { value: "children", label: "Children" },
                  { value: "slot", label: "Slot" },
                ]}
                value={mode}
                onChange={(v) => setMode(v as "children" | "slot")}
              />

              {/* Variant */}
              <RadioGroup
                label="Variant"
                options={[
                  { value: "filled", label: "Filled" },
                  { value: "elevated", label: "Elevated" },
                  { value: "outlined", label: "Outlined" },
                ]}
                value={variant}
                onChange={(v) => setVariant(v as CardVariant)}
              />

              {/* Padding */}
              <RadioGroup
                label="Padding"
                options={[
                  { value: "small", label: "Small" },
                  { value: "medium", label: "Medium" },
                  { value: "large", label: "Large" },
                ]}
                value={padding}
                onChange={(v) => setPadding(v as CardPadding)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Generated Code */}
      <div style={{ marginTop: spacing.primitive[4], borderRadius: radius.primitive.md, overflow: "hidden" }}>
        <div
          style={{
            padding: `${spacing.primitive[2]}px ${spacing.primitive[4]}px`,
            backgroundColor: "var(--docs-code-surface)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: spacing.primitive[2] }}>
            <span style={{
              fontSize: typography.fontSize.compact,
              fontWeight: typography.fontWeight.semibold,
              padding: `${spacing.primitive[1]}px ${spacing.primitive[3]}px`,
              borderRadius: radius.primitive.sm,
              color: "var(--content-base-onColor)",
              backgroundColor: "var(--docs-code-active-bg)",
            }}>Web</span>
          </div>
          <CopyButton text={generateCode()} />
        </div>
        <pre
          style={{
            margin: 0,
            padding: spacing.primitive[4],
            fontSize: typography.fontSize.compact,
            lineHeight: 1.7,
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
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>
      {/* Overview */}
      <Section title="Overview">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: spacing.primitive[4] }}>
          <InlineCode>Card</InlineCode> 컴포넌트는 관련 정보를 하나의 시각적 단위로 그룹화하는 컨테이너예요.
          <InlineCode>thumbnail</InlineCode>, <InlineCode>heading</InlineCode>, <InlineCode>caption</InlineCode> slot props로 구조화된 카드를 만들거나, <InlineCode>children</InlineCode>으로 자유롭게 구성할 수 있어요.
        </p>
      </Section>

      {/* Anatomy */}
      <Section title="Anatomy">
        <div style={{
          backgroundColor: "var(--surface-base-alternative)",
          borderRadius: radius.primitive.lg,
          padding: `${spacing.primitive[12]}px ${spacing.primitive[10]}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <svg width="400" height="240" viewBox="0 0 400 240">
            {/* Card Container */}
            <rect x="100" y="10" width="200" height="200" rx="12" fill="white" stroke="var(--border-base-default)" strokeWidth="1.5" filter="url(#cardShadow)" />

            {/* Shadow definition */}
            <defs>
              <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.08"/>
              </filter>
            </defs>

            {/* Thumbnail area */}
            <rect x="100" y="10" width="200" height="90" rx="12" fill="var(--surface-base-alternative)" />
            <rect x="100" y="88" width="200" height="12" fill="var(--surface-base-alternative)" />
            <text x="200" y="60" textAnchor="middle" fill="var(--content-base-neutral)" fontSize="11">Thumbnail</text>

            {/* Heading placeholder */}
            <rect x="120" y="116" width="140" height="12" rx="4" fill="var(--border-base-default)" />

            {/* Caption placeholder */}
            <rect x="120" y="140" width="120" height="8" rx="4" fill="var(--surface-base-alternative)" />
            <rect x="120" y="156" width="100" height="8" rx="4" fill="var(--surface-base-alternative)" />

            {/* Lines to labels */}
            <line x1="50" y1="110" x2="100" y2="110" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="100" cy="110" r="3" fill="var(--content-base-default)" />

            <line x1="50" y1="55" x2="100" y2="55" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="100" cy="55" r="3" fill="var(--content-base-default)" />

            <line x1="200" y1="210" x2="200" y2="230" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="200" cy="210" r="3" fill="var(--content-base-default)" />

            {/* Numbered circles */}
            <circle cx="35" cy="110" r="14" fill="var(--content-base-default)" />
            <text x="35" y="115" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">1</text>

            <circle cx="35" cy="55" r="14" fill="var(--content-base-default)" />
            <text x="35" y="60" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">2</text>

            <circle cx="200" cy="230" r="14" fill="var(--content-base-default)" />
            <text x="200" y="235" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">3</text>
          </svg>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: spacing.primitive[6],
          marginTop: spacing.primitive[5],
          fontSize: typography.fontSize.sm,
          fontWeight: typography.fontWeight.medium,
          color: "var(--text-primary)",
        }}>
          <div>1. Container (border-radius, shadow/border)</div>
          <div style={{ textAlign: "center" }}>2. Thumbnail Area (edge-to-edge)</div>
          <div style={{ textAlign: "right" }}>3. Content Area (heading + caption)</div>
        </div>
      </Section>

      {/* Variants */}
      <Section title="Variants">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: spacing.primitive[4] }}>
          <VariantCard name="Filled" description="기본 스타일. 흰색 배경">
            <CardDemo variant="filled" padding="small" onClick={() => {}}>
              <p style={{ margin: 0, fontSize: typography.fontSize.xs, color: "var(--content-base-secondary)" }}>Default</p>
            </CardDemo>
          </VariantCard>
          <VariantCard name="Elevated" description="그림자로 깊이감 표현">
            <CardDemo variant="elevated" padding="small" onClick={() => {}}>
              <p style={{ margin: 0, fontSize: typography.fontSize.xs, color: "var(--content-base-secondary)" }}>Shadow</p>
            </CardDemo>
          </VariantCard>
          <VariantCard name="Outlined" description="테두리로 영역 구분">
            <CardDemo variant="outlined" padding="small" onClick={() => {}}>
              <p style={{ margin: 0, fontSize: typography.fontSize.xs, color: "var(--content-base-secondary)" }}>Border</p>
            </CardDemo>
          </VariantCard>
        </div>
      </Section>

      {/* Rendering Modes */}
      <Section title="Rendering Modes">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
          <PrincipleCard number={1} title="Slot Mode" desc="thumbnail, heading, caption props를 사용한 구조화된 레이아웃. 일관된 카드 디자인을 빠르게 만들 수 있어요." />
          <PrincipleCard number={2} title="Children Mode" desc="children prop으로 완전히 자유로운 레이아웃. children이 있으면 slot props는 무시돼요." />
        </div>
      </Section>

      {/* Padding */}
      <Section title="Padding">
        <PreviewBox>
          <div style={{ display: "flex", gap: spacing.primitive[4], flexWrap: "wrap", justifyContent: "center" }}>
            <div style={{ textAlign: "center" }}>
              <CardDemo variant="outlined" padding="small" onClick={() => {}}>
                <div style={{ width: 60, height: 40, backgroundColor: "var(--border-base-default)", borderRadius: radius.primitive.xs }} />
              </CardDemo>
              <p style={{ fontSize: typography.fontSize.xs, color: "var(--content-base-secondary)", marginTop: spacing.primitive[2] }}>Small (12)</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <CardDemo variant="outlined" padding="medium" onClick={() => {}}>
                <div style={{ width: 60, height: 40, backgroundColor: "var(--border-base-default)", borderRadius: radius.primitive.xs }} />
              </CardDemo>
              <p style={{ fontSize: typography.fontSize.xs, color: "var(--content-base-secondary)", marginTop: spacing.primitive[2] }}>Medium (20)</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <CardDemo variant="outlined" padding="large" onClick={() => {}}>
                <div style={{ width: 60, height: 40, backgroundColor: "var(--border-base-default)", borderRadius: radius.primitive.xs }} />
              </CardDemo>
              <p style={{ fontSize: typography.fontSize.xs, color: "var(--content-base-secondary)", marginTop: spacing.primitive[2] }}>Large (24)</p>
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* Colors */}
      <Section title="Colors">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[5], lineHeight: 1.7 }}>
          Card의 배경색과 테두리는 variant에 따라 결정됩니다. 각 variant는 서로 다른 시각적 계층을 제공합니다.
        </p>

        <div style={{ marginBottom: spacing.primitive[6], overflow: "auto", borderRadius: radius.primitive.md }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Variant</th>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>배경색</th>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>테두리/그림자</th>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>용도</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>filled</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>white (var(--surface-base-default))</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>없음</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>기본값. 깨끗한 흰색 카드</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>elevated</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>white</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>box-shadow</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>깊이감 있는 카드</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>outlined</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>white</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>1px solid var(--border-base-default)</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>플랫한 디자인. 리스트 내 카드</td>
              </tr>
            </tbody>
          </table>
        </div>

        <PreviewBox>
          <div style={{ display: "flex", gap: spacing.primitive[4], padding: spacing.primitive[6] }}>
            <div style={{ textAlign: "center" }}>
              <CardDemo variant="filled" padding="medium" onClick={() => {}}>
                <p style={{ margin: 0, fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.semibold, color: "var(--content-base-strong)" }}>Filled</p>
                <p style={{ margin: 0, fontSize: typography.fontSize.xs, color: "var(--content-base-secondary)", marginTop: spacing.primitive[1] }}>white, no shadow</p>
              </CardDemo>
            </div>
            <div style={{ textAlign: "center" }}>
              <CardDemo variant="elevated" padding="medium" onClick={() => {}}>
                <p style={{ margin: 0, fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.semibold, color: "var(--content-base-strong)" }}>Elevated</p>
                <p style={{ margin: 0, fontSize: typography.fontSize.xs, color: "var(--content-base-secondary)", marginTop: spacing.primitive[1] }}>white + shadow</p>
              </CardDemo>
            </div>
            <div style={{ textAlign: "center" }}>
              <CardDemo variant="outlined" padding="medium" onClick={() => {}}>
                <p style={{ margin: 0, fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.semibold, color: "var(--content-base-strong)" }}>Outlined</p>
                <p style={{ margin: 0, fontSize: typography.fontSize.xs, color: "var(--content-base-secondary)", marginTop: spacing.primitive[1] }}>white + border</p>
              </CardDemo>
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* States */}
      <Section title="States">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: spacing.primitive[4] }}>
          모든 카드는 클릭 가능하며, 사용자 상호작용에 따라 시각적 피드백을 제공합니다.
        </p>
        <PreviewBox>
          <div style={{ display: "flex", gap: spacing.primitive[6], alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <CardDemo variant="filled" padding="medium" onClick={() => {}}>
                <p style={{ margin: 0, fontSize: typography.fontSize.xs, color: "var(--content-base-secondary)" }}>Hover me</p>
              </CardDemo>
              <p style={{ fontSize: typography.fontSize.xs, color: "var(--content-base-secondary)", marginTop: spacing.primitive[2] }}>Hover</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <CardDemo variant="filled" padding="medium" onClick={() => {}}>
                <p style={{ margin: 0, fontSize: typography.fontSize.xs, color: "var(--content-base-secondary)" }}>Press me</p>
              </CardDemo>
              <p style={{ fontSize: typography.fontSize.xs, color: "var(--content-base-secondary)", marginTop: spacing.primitive[2] }}>Press</p>
            </div>
          </div>
        </PreviewBox>

        <Subsection title="Interaction States">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: spacing.primitive[6] }}>
            모든 Card는 클릭 가능하며, 각 상태는 그림자와 배경색 변화로 구분됩니다.
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: spacing.primitive[4],
            padding: spacing.primitive[6],
            backgroundColor: "var(--surface-base-alternative)",
            borderRadius: radius.primitive.lg,
          }}>
            <StateCard label="Default" sublabel="기본 상태">
              <div style={{ width: 100, height: 64, borderRadius: radius.primitive.md, backgroundColor: "var(--surface-base-default)", boxShadow: "var(--shadow-semantic-card-default)" }} />
            </StateCard>
            <StateCard label="Hover" sublabel="그림자 증가">
              <div style={{ width: 100, height: 64, borderRadius: radius.primitive.md, backgroundColor: "var(--surface-base-default)", boxShadow: "var(--shadow-semantic-card-elevated)" }} />
            </StateCard>
            <StateCard label="Pressed" sublabel="눌림 상태">
              <div style={{ width: 100, height: 64, borderRadius: radius.primitive.md, backgroundColor: "var(--surface-base-default)", boxShadow: "var(--shadow-primitive-xs)", transform: "scale(0.98)", transition: "transform 0.1s" }} />
            </StateCard>
            <StateCard label="Focused" sublabel="키보드 포커스">
              <div style={{ width: 100, height: 64, borderRadius: radius.primitive.md, backgroundColor: "var(--surface-base-default)", boxShadow: "var(--shadow-semantic-card-default)", outline: "2px solid var(--content-brand-default)", outlineOffset: 2 }} />
            </StateCard>
          </div>
        </Subsection>
      </Section>

      {/* Usage Guidelines */}
      <Section title="Usage Guidelines">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[6], lineHeight: 1.7 }}>
          일관된 UX를 위해 아래 권고 조합을 따르세요. <strong style={{ color: "var(--text-primary)" }}>권장 패턴</strong>을 사용하면 사용자가 예측 가능한 경험을 할 수 있습니다.
        </p>

        <Subsection title="Recommended Combinations">
          <div style={{ display: "grid", gap: spacing.primitive[3] }}>
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
          <div style={{ display: "grid", gap: spacing.primitive[4] }}>
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
          </div>
        </Subsection>

        <Subsection title="Best Practices">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
            <DoCard>
              <div style={{ display: "flex", gap: spacing.primitive[3], alignItems: "center" }}>
                <CardDemo variant="elevated" padding="medium" onClick={() => {}}>
                  <p style={{ margin: 0, fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.semibold, color: "var(--content-base-strong)" }}>제목</p>
                  <p style={{ margin: 0, fontSize: typography.fontSize.xs, color: "var(--content-base-secondary)", marginTop: spacing.primitive[1] }}>설명 텍스트</p>
                </CardDemo>
              </div>
            </DoCard>
            <DontCard>
              <div style={{ display: "flex", gap: spacing.primitive[3], alignItems: "center" }}>
                <CardDemo variant="elevated" padding="small" onClick={() => {}}>
                  <div style={{ padding: `${spacing.primitive[5]}px ${spacing.primitive[3]}px ${spacing.primitive[2]}px` }}>
                    <p style={{ margin: 0, fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.semibold, color: "var(--content-base-strong)" }}>제목</p>
                    <p style={{ margin: 0, fontSize: typography.fontSize.xs, color: "var(--content-base-secondary)", marginTop: spacing.primitive[1] }}>내부 패딩 불일치</p>
                  </div>
                </CardDemo>
              </div>
            </DontCard>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
            <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", display: "flex", alignItems: "flex-start", gap: spacing.primitive[2], margin: 0 }}>
              <span style={{ fontWeight: typography.fontWeight.bold, flexShrink: 0 }}>Do</span>
              <span style={{ color: "var(--text-secondary)" }}>일관된 padding 값을 사용합니다.</span>
            </p>
            <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", display: "flex", alignItems: "flex-start", gap: spacing.primitive[2], margin: 0 }}>
              <span style={{ fontWeight: typography.fontWeight.bold, flexShrink: 0 }}>Don&apos;t</span>
              <span style={{ color: "var(--text-secondary)", fontStyle: "italic" }}>카드 내부에서 padding을 임의로 조절하지 마세요.</span>
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[4] }}>
            <DoCard>
              <div style={{ display: "flex", gap: spacing.primitive[2], alignItems: "center" }}>
                <CardDemo variant="elevated" padding="small" onClick={() => {}}>
                  <p style={{ margin: 0, fontSize: typography.fontSize.xs, color: "var(--content-base-secondary)" }}>Elevated</p>
                </CardDemo>
                <CardDemo variant="outlined" padding="small" onClick={() => {}}>
                  <p style={{ margin: 0, fontSize: typography.fontSize.xs, color: "var(--content-base-secondary)" }}>Outlined</p>
                </CardDemo>
              </div>
            </DoCard>
            <DontCard>
              <div style={{ display: "flex", gap: spacing.primitive[2], alignItems: "center" }}>
                <CardDemo variant="elevated" padding="small" onClick={() => {}}>
                  <p style={{ margin: 0, fontSize: typography.fontSize.xs, color: "var(--content-base-secondary)" }}>Elevated</p>
                </CardDemo>
                <div style={{ padding: spacing.primitive[3], backgroundColor: "var(--surface-base-default)", borderRadius: radius.primitive.md, boxShadow: "0 1px 3px var(--shadow-primitive-xs)", border: "1px solid var(--border-base-default)" }}>
                  <p style={{ margin: 0, fontSize: typography.fontSize.xs, color: "var(--content-base-secondary)" }}>Mixed</p>
                </div>
              </div>
            </DontCard>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
            <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", display: "flex", alignItems: "flex-start", gap: spacing.primitive[2], margin: 0 }}>
              <span style={{ fontWeight: typography.fontWeight.bold, flexShrink: 0 }}>Do</span>
              <span style={{ color: "var(--text-secondary)" }}>같은 맥락에서 variant를 통일합니다.</span>
            </p>
            <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", display: "flex", alignItems: "flex-start", gap: spacing.primitive[2], margin: 0 }}>
              <span style={{ fontWeight: typography.fontWeight.bold, flexShrink: 0 }}>Don&apos;t</span>
              <span style={{ color: "var(--text-secondary)", fontStyle: "italic" }}>같은 영역에서 elevated와 outlined을 혼용하지 마세요.</span>
            </p>
          </div>
        </Subsection>
      </Section>

      {/* Design Tokens */}
      <Section title="Design Tokens">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[5], lineHeight: 1.7 }}>
          Card 컴포넌트에 적용된 Foundation 기반 디자인 토큰입니다.
        </p>
        <div style={{ overflowX: "auto", borderRadius: radius.primitive.md, border: "1px solid var(--divider)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.compact }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Property</th>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Foundation Token</th>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}>Border Radius</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>radius.component.card.sm</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>12px</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}>Shadow (elevated)</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>cssVarShadow.semantic.card.elevated</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>var(--shadow-semantic-card-elevated)</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}>Border (outlined)</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>border.base.default</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>var(--border-base-default) (palette.grey.95)</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}>Background (filled)</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>surface.base.default</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>var(--surface-base-default)</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}>Background (pressed)</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>surface.base.alternative</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>var(--surface-base-alternative)</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}>Padding small</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>spacing.primitive[3]</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>12px</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}>Padding medium</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>spacing.semantic.inset.md</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>20px</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}>Padding large</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>spacing.semantic.inset.lg</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>24px</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}>Border Width (outlined)</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>borderWidth.default</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>1px</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}>Transition</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>transitions.all</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>background-color, color, border-color 150ms ease</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}>Heading Font</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>typography.fontSize.md + fontWeight.semibold</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>16px / 600</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}>Caption Font</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>typography.fontSize.sm</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>14px</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}>Heading Color</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>content.base.strong</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>var(--content-base-strong)</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}>Caption Color</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>content.base.secondary</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>var(--content-base-secondary)</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}>Content Gap</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>spacing.primitive[1]</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>4px</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* Accessibility */}
      <Section title="Accessibility">
        <div style={{ display: "grid", gap: spacing.primitive[3] }}>
          <PrincipleCard number={1} title="Semantic Role" desc="모든 카드는 role='button'을 가집니다. 항상 클릭 가능한 인터랙티브 요소입니다." />
          <PrincipleCard number={2} title="Keyboard Navigation" desc="tabIndex={0}으로 포커스 가능하며, Enter/Space 키로 활성화됩니다." />
          <PrincipleCard number={3} title="Focus Indicator" desc="키보드 포커스 시 브라우저 기본 outline이 표시됩니다." />
        </div>
      </Section>

      {/* Related Components */}
      <Section title="Related Components">
        <div style={{ overflowX: "auto", borderRadius: radius.primitive.md, border: "1px solid var(--divider)" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: typography.fontSize.sm,
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={{ textAlign: "left", padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>컴포넌트</th>
                <th style={{ textAlign: "left", padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>용도</th>
                <th style={{ textAlign: "left", padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>차이점</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>ListCell</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>콘텐츠 표시</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>ListCell은 단일 행, Card는 자유 레이아웃 컨테이너</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>ActionArea</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>터치 가능한 영역</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>ActionArea는 Card 내부에서 인터랙션 영역 지정</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>ContentBadge</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>정보 라벨</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>ContentBadge는 Card 내부 상태 표시에 사용</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}

const GITHUB_BASE = "https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system/src";
const CARD_SOURCE = `${GITHUB_BASE}/components/Card/Card.tsx`;

function WebContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>
      {/* Source Code */}
      <Section title="Source Code">
        <div style={{ padding: spacing.primitive[4], backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.md, marginBottom: spacing.primitive[6], display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)", margin: 0 }}>Card Component</p>
            <p style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", margin: `${spacing.primitive[1]}px 0 0 0` }}>실제 컴포넌트 소스 코드를 GitHub에서 확인하세요.</p>
          </div>
          <a
            href={CARD_SOURCE}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: spacing.primitive[1],
              padding: `${spacing.primitive[2]}px ${spacing.primitive[4]}px`,
              fontSize: typography.fontSize.compact,
              fontWeight: typography.fontWeight.medium,
              color: "var(--content-base-onColor)",
              backgroundColor: "var(--docs-code-surface)",
              borderRadius: radius.primitive.md,
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
          <div style={{ padding: spacing.primitive[6] }}>
            <CardDemo variant="filled" padding="medium" onClick={() => {}}>
              <p style={{ margin: 0, fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.md, color: "var(--content-base-strong)", marginBottom: spacing.primitive[2] }}>
                Card Title
              </p>
              <p style={{ margin: 0, fontSize: typography.fontSize.sm, color: "var(--content-base-secondary)" }}>
                Card content goes here.
              </p>
            </CardDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<Card onClick={() => {}}>
  <h3>Card Title</h3>
  <p>Card content goes here.</p>
</Card>`} />
      </Section>

      {/* Slot Mode */}
      <Section title="Slot Mode">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: spacing.primitive[4] }}>
          <InlineCode>thumbnail</InlineCode>, <InlineCode>heading</InlineCode>, <InlineCode>caption</InlineCode> props를 사용하면 구조화된 카드를 쉽게 만들 수 있어요.
          <InlineCode>children</InlineCode>이 있으면 slot props는 무시돼요.
        </p>
        <PreviewBox>
          <div style={{ padding: spacing.primitive[6], display: "flex", gap: spacing.primitive[4] }}>
            {/* Card with all 3 slots */}
            <div style={{ width: 240 }}>
              <CardDemo
                variant="elevated"
                onClick={() => {}}
                thumbnail={<div style={{ width: '100%', height: 140, backgroundColor: 'var(--surface-base-container)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: typography.fontSize.compact, color: 'var(--content-base-neutral)' }}>Image</span></div>}
                heading="Card Title"
                caption="Description text goes here"
              />
            </div>
            {/* Card with heading + caption only */}
            <div style={{ width: 240 }}>
              <CardDemo
                variant="outlined"
                onClick={() => {}}
                heading="Heading Only"
                caption="No thumbnail, just text content"
              />
            </div>
          </div>
        </PreviewBox>
        <CodeBlock code={`// With thumbnail
<Card
  variant="elevated"
  onClick={() => {}}
  thumbnail={<img src="/photo.jpg" alt="..." style={{ width: '100%', height: 140, objectFit: 'cover' }} />}
  heading="Card Title"
  caption="Description text goes here"
/>

// Without thumbnail
<Card
  variant="outlined"
  onClick={() => {}}
  heading="Heading Only"
  caption="No thumbnail, just text content"
/>`} />
      </Section>

      {/* Variants */}
      <Section title="Variants">
        <PreviewBox>
          <div style={{ display: "flex", gap: spacing.primitive[4], padding: spacing.primitive[6] }}>
            <CardDemo variant="filled" padding="medium" onClick={() => {}}>
              <p style={{ margin: 0, fontSize: typography.fontSize.xs }}>Filled</p>
            </CardDemo>
            <CardDemo variant="elevated" padding="medium" onClick={() => {}}>
              <p style={{ margin: 0, fontSize: typography.fontSize.xs }}>Elevated</p>
            </CardDemo>
            <CardDemo variant="outlined" padding="medium" onClick={() => {}}>
              <p style={{ margin: 0, fontSize: typography.fontSize.xs }}>Outlined</p>
            </CardDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<Card onClick={() => {}}>Filled (default)</Card>
<Card variant="elevated" onClick={() => {}}>Elevated</Card>
<Card variant="outlined" onClick={() => {}}>Outlined</Card>`} />
      </Section>

      {/* API Reference */}
      <Section title="API Reference">
        <PropsTable
          props={[
            { name: "variant", type: '"filled" | "elevated" | "outlined"', required: false, defaultVal: '"filled"', description: "카드 스타일" },
            { name: "padding", type: '"small" | "medium" | "large"', required: false, defaultVal: '"medium"', description: "내부 여백" },
            { name: "onClick", type: "() => void", required: true, description: "클릭 핸들러" },
            { name: "children", type: "ReactNode", required: false, description: "카드 콘텐츠 (사용 시 slot props 무시)" },
            { name: "thumbnail", type: "ReactNode", required: false, description: "썸네일 영역 (이미지 등)" },
            { name: "heading", type: "ReactNode", required: false, description: "카드 제목" },
            { name: "caption", type: "ReactNode", required: false, description: "카드 설명 텍스트" },
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
      gap: spacing.primitive[4],
      padding: spacing.primitive[4],
      backgroundColor: "var(--surface-base-default)",
      borderRadius: radius.primitive.md,
      border: "1px solid var(--divider)",
      alignItems: "center",
    }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: spacing.primitive[2], marginBottom: spacing.primitive[1] }}>
          <span style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>{situation}</span>
          <span style={{
            fontSize: typography.fontSize.xs,
            padding: "2px 6px",
            backgroundColor: "var(--surface-brand-secondary)",
            color: "var(--surface-brand-defaultPressed)",
            borderRadius: radius.primitive.xs,
            fontWeight: typography.fontWeight.medium,
          }}>
            {recommendation}
          </span>
        </div>
        <p style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", margin: 0, marginBottom: spacing.primitive[1] }}>{description}</p>
        <p style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", margin: 0 }}>
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
  variant = "filled",
  padding = "medium",
  onClick,
  children,
  thumbnail,
  heading,
  caption,
}: {
  variant?: CardVariant;
  padding?: CardPadding;
  onClick: () => void;
  children?: React.ReactNode;
  thumbnail?: React.ReactNode;
  heading?: React.ReactNode;
  caption?: React.ReactNode;
}) {
  return (
    <Card
      variant={variant}
      padding={padding}
      onClick={onClick}
      thumbnail={thumbnail}
      heading={heading}
      caption={caption}
    >
      {children}
    </Card>
  );
}

function StateCard({ label, sublabel, children }: {
  label: string; sublabel: string; children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[3], padding: spacing.primitive[4] }}>
      {children}
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>{label}</div>
        <div style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", marginTop: 2 }}>{sublabel}</div>
      </div>
    </div>
  );
}
