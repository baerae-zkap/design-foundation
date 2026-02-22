"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform, highlightCode } from "@/components/PlatformTabs";
import { ContentBadge, typography, spacing, radius } from '@baerae-zkap/design-system';
import { Section, Subsection, InlineCode } from "@/components/docs/Section";
import { PropsTable } from "@/components/docs/PropsTable";
import { PrincipleCard, VariantCard, DoCard, DontCard } from "@/components/docs/Cards";
import { RadioGroup, CopyButton } from "@/components/docs/Playground";

// Types
type ContentBadgeVariant = "filled" | "weak";
type ContentBadgeColor = "primary" | "neutral" | "success" | "error" | "warning" | "info";
type ContentBadgeSize = "small" | "medium" | "large";

export default function ContentBadgePage() {
  return (
    <div style={{ maxWidth: 840 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Contents" },
          { label: "Content Badge" },
        ]}
      />

      {/* Header */}
      <h1 style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold, marginBottom: spacing.primitive[2], color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
        Content Badge
      </h1>
      <p style={{ fontSize: typography.fontSize.md, color: "var(--text-secondary)", marginBottom: spacing.primitive[8], lineHeight: 1.7 }}>
        상태, 카테고리, 수량 등 간결한 정보를 라벨 형태로 강조하여 표시하는 컴포넌트입니다.
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
  const [color, setColor] = useState<ContentBadgeColor>("primary");
  const [size, setSize] = useState<ContentBadgeSize>("medium");

  const generateCode = () => {
    const props = [];
    if (variant !== "filled") props.push(`variant="${variant}"`);
    if (color !== "neutral") props.push(`color="${color}"`);
    if (size !== "medium") props.push(`size="${size}"`);

    const propsStr = props.length > 0 ? ` ${props.join(" ")}` : "";
    return `<ContentBadge${propsStr}>NEW</ContentBadge>`;
  };

  return (
    <div style={{ marginBottom: spacing.primitive[8] }}>
      <div
        style={{
          borderRadius: radius.primitive.xl,
          overflow: "hidden",
          backgroundColor: "var(--surface-base-default)", border: "1px solid var(--border-solid-alternative)",
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
              backgroundColor: "var(--surface-base-default)",
            }}
          >
            <ContentBadgeDemo variant={variant} color={color} size={size}>
              NEW
            </ContentBadgeDemo>
          </div>

          {/* Control Panel */}
          <div
            style={{
              backgroundColor: "var(--surface-base-default)", borderLeft: "1px solid var(--border-solid-alternative)",
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
              {/* Variant */}
              <RadioGroup
                label="Variant"
                options={[
                  { value: "filled", label: "Filled" },
                  { value: "weak", label: "Weak" },
                ]}
                value={variant}
                onChange={(v) => setVariant(v as ContentBadgeVariant)}
              />

              {/* Color */}
              <RadioGroup
                label="Color"
                options={[
                  { value: "primary", label: "Primary" },
                  { value: "neutral", label: "Neutral" },
                  { value: "success", label: "Success" },
                  { value: "error", label: "Error" },
                  { value: "warning", label: "Warning" },
                  { value: "info", label: "Info" },
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

            </div>
          </div>
        </div>
      </div>

      {/* Generated Code */}
      <div style={{ marginTop: spacing.primitive[4], borderRadius: radius.primitive.md, overflow: "hidden", border: "1px solid var(--divider)" }}>
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
          <InlineCode>ContentBadge</InlineCode> 컴포넌트는 상태, 카테고리, 수량 등 간결한 정보를 라벨 형태로 강조 표시해요.
          텍스트 옆에 부가 정보를 시각적으로 전달할 때 사용해요.
        </p>
      </Section>

      {/* Anatomy */}
      <Section title="Anatomy">
        <div style={{
          backgroundColor: "var(--surface-base-default)",
          borderRadius: radius.primitive.lg,
          padding: `${spacing.primitive[12]}px ${spacing.primitive[10]}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <svg width="360" height="120" viewBox="0 0 360 120">
            {/* Badge Container */}
            <rect x="120" y="40" width="120" height="40" rx="4" fill="var(--content-brand-default)" />

            {/* Left Icon */}
            <rect x="132" y="52" width="16" height="16" rx="3" fill="white" opacity="0.8" />

            {/* Label text */}
            <text x="185" y="65" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">진행중</text>

            {/* Lines to labels */}
            <line x1="70" y1="60" x2="120" y2="60" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="120" cy="60" r="3" fill="var(--content-base-default)" />

            <line x1="140" y1="40" x2="140" y2="15" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="140" cy="40" r="3" fill="var(--content-base-default)" />

            <line x1="180" y1="80" x2="180" y2="105" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="180" cy="80" r="3" fill="var(--content-base-default)" />

            {/* Numbered circles */}
            <circle cx="55" cy="60" r="14" fill="var(--content-base-default)" />
            <text x="55" y="65" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">1</text>

            <circle cx="140" cy="15" r="14" fill="var(--content-base-default)" />
            <text x="140" y="20" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">2</text>

            <circle cx="180" cy="105" r="14" fill="var(--content-base-default)" />
            <text x="180" y="110" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">3</text>

            {/* Padding indicator */}
            <line x1="122" y1="42" x2="122" y2="52" stroke="var(--content-base-placeholder)" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="132" y1="42" x2="132" y2="52" stroke="var(--content-base-placeholder)" strokeWidth="1" strokeDasharray="2 2" />
            <text x="127" y="36" textAnchor="middle" fill="var(--content-base-placeholder)" fontSize="8">px</text>
          </svg>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: spacing.primitive[4],
          marginTop: spacing.primitive[5],
          fontSize: typography.fontSize.sm,
          fontWeight: typography.fontWeight.medium,
          color: "var(--text-primary)",
        }}>
          <div>1. Container</div>
          <div style={{ textAlign: "center" }}>2. Icon (optional)</div>
          <div style={{ textAlign: "right" }}>3. Label</div>
        </div>
      </Section>

      {/* Variants */}
      <Section title="Variants">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
          <VariantCard name="Filled" description="강조가 필요한 상태 표시">
            <ContentBadgeDemo variant="filled" color="primary" size="medium">NEW</ContentBadgeDemo>
          </VariantCard>
          <VariantCard name="Weak" description="보조적 정보·카테고리 표시">
            <ContentBadgeDemo variant="weak" color="primary" size="medium">Info</ContentBadgeDemo>
          </VariantCard>
        </div>
      </Section>

      {/* Sizes */}
      <Section title="Sizes">
        <PreviewBox>
          <div style={{ display: "flex", gap: spacing.primitive[4], alignItems: "center", padding: spacing.primitive[6] }}>
            <div style={{ textAlign: "center" }}>
              <ContentBadgeDemo variant="filled" color="primary" size="small">Small</ContentBadgeDemo>
              <p style={{ fontSize: typography.fontSize.xs, color: "var(--content-base-secondary)", marginTop: spacing.primitive[2] }}>18px</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <ContentBadgeDemo variant="filled" color="primary" size="medium">Medium</ContentBadgeDemo>
              <p style={{ fontSize: typography.fontSize.xs, color: "var(--content-base-secondary)", marginTop: spacing.primitive[2] }}>22px</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <ContentBadgeDemo variant="filled" color="primary" size="large">Large</ContentBadgeDemo>
              <p style={{ fontSize: typography.fontSize.xs, color: "var(--content-base-secondary)", marginTop: spacing.primitive[2] }}>26px</p>
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* Colors */}
      <Section title="Colors">
        <PreviewBox>
          <div style={{ display: "flex", gap: spacing.primitive[3], flexWrap: "wrap", padding: spacing.primitive[6] }}>
            <div style={{ textAlign: "center" }}>
              <ContentBadgeDemo variant="filled" color="primary" size="medium">Brand</ContentBadgeDemo>
              <p style={{ fontSize: typography.fontSize['3xs'], color: "var(--content-base-secondary)", marginTop: spacing.primitive[1] }}>프로모션</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <ContentBadgeDemo variant="filled" color="neutral" size="medium">Base</ContentBadgeDemo>
              <p style={{ fontSize: typography.fontSize['3xs'], color: "var(--content-base-secondary)", marginTop: spacing.primitive[1] }}>일반</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <ContentBadgeDemo variant="filled" color="success" size="medium">Success</ContentBadgeDemo>
              <p style={{ fontSize: typography.fontSize['3xs'], color: "var(--content-base-secondary)", marginTop: spacing.primitive[1] }}>완료</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <ContentBadgeDemo variant="filled" color="error" size="medium">Error</ContentBadgeDemo>
              <p style={{ fontSize: typography.fontSize['3xs'], color: "var(--content-base-secondary)", marginTop: spacing.primitive[1] }}>품절</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <ContentBadgeDemo variant="filled" color="warning" size="medium">Warning</ContentBadgeDemo>
              <p style={{ fontSize: typography.fontSize['3xs'], color: "var(--content-base-secondary)", marginTop: spacing.primitive[1] }}>주의</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <ContentBadgeDemo variant="filled" color="info" size="medium">Info</ContentBadgeDemo>
              <p style={{ fontSize: typography.fontSize['3xs'], color: "var(--content-base-secondary)", marginTop: spacing.primitive[1] }}>안내</p>
            </div>
          </div>
        </PreviewBox>
      </Section>


      {/* States */}
      <Section title="States">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[5], lineHeight: 1.7 }}>
          ContentBadge는 비인터랙티브 요소이므로 hover/pressed 상태가 없습니다. 표시 상태에 따른 시각적 구분만 제공합니다.
        </p>
        <PreviewBox>
          <div style={{ display: "flex", gap: spacing.primitive[6], alignItems: "center", padding: spacing.primitive[6] }}>
            <div style={{ textAlign: "center" }}>
              <ContentBadgeDemo variant="filled" color="primary" size="medium">Default</ContentBadgeDemo>
              <p style={{ fontSize: typography.fontSize.xs, color: "var(--content-base-secondary)", marginTop: spacing.primitive[2] }}>Default</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <ContentBadge variant="weak" color="neutral" size="medium">진행중</ContentBadge>
              <p style={{ fontSize: typography.fontSize.xs, color: "var(--content-base-secondary)", marginTop: spacing.primitive[2] }}>Muted (context)</p>
            </div>
          </div>
        </PreviewBox>
        <div style={{ marginTop: spacing.primitive[4], padding: spacing.primitive[4], backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.md, fontSize: typography.fontSize.compact }}>
          <p style={{ margin: 0, color: "var(--text-secondary)", lineHeight: 1.7 }}>
            <strong style={{ color: "var(--text-primary)" }}>Default:</strong> 기본 표시 상태<br />
            <strong style={{ color: "var(--text-primary)" }}>Muted:</strong> 주변 요소가 비활성화될 때 함께 흐려지는 컨텍스트 상태
          </p>
        </div>

        <Subsection title="Interaction States">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: spacing.primitive[6] }}>
            ContentBadge는 비인터랙티브 요소로 hover/pressed 상태가 없습니다. 대신 색상 variant를 통해 정보의 의미를 시각적으로 구분합니다.
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: spacing.primitive[4],
            padding: spacing.primitive[6],
            backgroundColor: "var(--surface-base-alternative)",
            borderRadius: radius.primitive.lg,
          }}>
            <StateCard label="Info" sublabel="안내 정보">
              <ContentBadge variant="weak" color="info" size="medium">안내</ContentBadge>
            </StateCard>
            <StateCard label="Success" sublabel="성공/완료">
              <ContentBadge variant="weak" color="success" size="medium">완료</ContentBadge>
            </StateCard>
            <StateCard label="Warning" sublabel="주의/경고">
              <ContentBadge variant="weak" color="warning" size="medium">주의</ContentBadge>
            </StateCard>
            <StateCard label="Error" sublabel="오류/품절">
              <ContentBadge variant="weak" color="error" size="medium">품절</ContentBadge>
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
              situation="상태 표시기"
              description="콘텐츠의 현재 상태를 시각적으로 전달합니다."
              recommendation="filled"
              examples={["온라인/오프라인", "판매중/품절", "진행중/완료"]}
            />
            <UsageCard
              situation="카테고리 라벨"
              description="콘텐츠의 분류나 유형을 표시합니다."
              recommendation="weak + neutral"
              examples={["공지", "이벤트", "뉴스", "업데이트"]}
            />
            <UsageCard
              situation="알림 카운트"
              description="읽지 않은 알림이나 새 항목 수를 표시합니다."
              recommendation="filled + error (small)"
              examples={["3", "99+", "N"]}
            />
            <UsageCard
              situation="프로모션 태그"
              description="특별 할인이나 신규 콘텐츠를 강조합니다."
              recommendation="filled + primary"
              examples={["NEW", "HOT", "SALE", "추천"]}
            />
            <UsageCard
              situation="경고/주의 표시"
              description="사용자의 주의가 필요한 상태를 알립니다."
              recommendation="filled + warning"
              examples={["주의", "곧 종료", "마감임박"]}
            />
          </div>
        </Subsection>

        <Subsection title="Color Usage Table">
          <div style={{ overflowX: "auto", marginBottom: spacing.primitive[6] }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.compact }}>
              <thead>
                <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                  <th style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>상황</th>
                  <th style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>권장 색상</th>
                  <th style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>예시</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-primary)" }}>새 콘텐츠/프로모션</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>primary</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>NEW, 추천</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-primary)" }}>일반 정보/카테고리</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>neutral</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>공지, 일반</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-primary)" }}>성공/완료/진행중</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>success</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>완료, 판매중</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-primary)" }}>오류/경고/품절</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>error</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>품절, 판매종료</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-primary)" }}>주의/알림</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>warning</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>주의, 곧 종료</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-primary)" }}>정보/안내</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>info</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>안내, 팁</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Design Principles">
          <div style={{ display: "grid", gap: spacing.primitive[4] }}>
            <PrincipleCard number={1} title="Non-interactive" desc="ContentBadge는 정보 표시용입니다. 클릭 가능한 요소가 필요하면 Chip을 사용하세요. Badge에 onClick/onPress를 추가하지 마세요." />
            <PrincipleCard number={2} title="Concise Labels" desc="1-2 단어의 짧은 텍스트를 사용하세요. 긴 설명은 다른 요소에 배치합니다. 텍스트가 길어지면 Badge의 의미가 희석됩니다." />
            <PrincipleCard number={3} title="Consistent Styling" desc="같은 영역 내에서는 동일한 variant와 size를 사용하여 일관성을 유지하세요. 리스트 내 Badge는 모두 같은 스타일이어야 합니다." />
          </div>
        </Subsection>

        <Subsection title="Best Practices">
          <div style={{ display: "grid", gap: spacing.primitive[5] }}>
            {/* Pair 1: Short labels */}
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <DoCard>
                  <div style={{ display: "flex", gap: spacing.primitive[2], alignItems: "center" }}>
                    <ContentBadgeDemo variant="filled" color="primary" size="medium">NEW</ContentBadgeDemo>
                    <ContentBadgeDemo variant="filled" color="success" size="medium">판매중</ContentBadgeDemo>
                  </div>
                </DoCard>
                <DontCard>
                  <div style={{ display: "flex", gap: spacing.primitive[2], alignItems: "center" }}>
                    <ContentBadgeDemo variant="filled" color="primary" size="large">이것은 너무 긴 텍스트입니다</ContentBadgeDemo>
                  </div>
                </DontCard>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> <span style={{ color: "var(--text-secondary)" }}>1-2 단어의 짧고 명확한 라벨을 사용합니다.</span>
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Don&apos;t</span> <span style={{ color: "var(--text-secondary)", fontStyle: "italic" }}>문장이나 긴 텍스트를 Badge에 넣지 마세요.</span>
                </p>
              </div>
            </div>

            {/* Pair 2: Consistent styling */}
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <DoCard>
                  <div style={{ display: "flex", gap: spacing.primitive[2], alignItems: "center" }}>
                    <ContentBadgeDemo variant="filled" color="success" size="medium">완료</ContentBadgeDemo>
                    <ContentBadgeDemo variant="filled" color="error" size="medium">품절</ContentBadgeDemo>
                    <ContentBadgeDemo variant="filled" color="warning" size="medium">주의</ContentBadgeDemo>
                  </div>
                </DoCard>
                <DontCard>
                  <div style={{ display: "flex", gap: spacing.primitive[2], alignItems: "center" }}>
                    <ContentBadgeDemo variant="filled" color="primary" size="small">A</ContentBadgeDemo>
                    <ContentBadgeDemo variant="weak" color="success" size="large">완료됨</ContentBadgeDemo>
                    <ContentBadgeDemo variant="weak" color="error" size="medium">경고</ContentBadgeDemo>
                  </div>
                </DontCard>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> <span style={{ color: "var(--text-secondary)" }}>같은 영역에서 동일한 variant와 size를 유지합니다.</span>
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Don&apos;t</span> <span style={{ color: "var(--text-secondary)", fontStyle: "italic" }}>같은 영역에서 variant와 size를 혼용하지 마세요.</span>
                </p>
              </div>
            </div>

            {/* Pair 3: UX Writing - concise labels */}
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <DoCard>
                  <ContentBadgeDemo variant="filled" color="primary" size="medium">신규</ContentBadgeDemo>
                </DoCard>
                <DontCard>
                  <ContentBadgeDemo variant="filled" color="primary" size="medium">새로운 항목입니다</ContentBadgeDemo>
                </DontCard>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> <span style={{ color: "var(--text-secondary)" }}>1-2 단어로 간결하게 표현합니다.</span>
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Don&apos;t</span> <span style={{ color: "var(--text-secondary)", fontStyle: "italic" }}>문장형 라벨은 Badge에 적합하지 않아요.</span>
                </p>
              </div>
            </div>

            {/* Pair 4: UX Writing - noun form */}
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <DoCard>
                  <ContentBadgeDemo variant="filled" color="success" size="medium">완료</ContentBadgeDemo>
                </DoCard>
                <DontCard>
                  <ContentBadgeDemo variant="filled" color="success" size="medium">완료됨</ContentBadgeDemo>
                </DontCard>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> <span style={{ color: "var(--text-secondary)" }}>명사형으로 상태를 표현하세요.</span>
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Don&apos;t</span> <span style={{ color: "var(--text-secondary)", fontStyle: "italic" }}>~됨 보다 명사형이 더 깔끔합니다.</span>
                </p>
              </div>
            </div>
          </div>
        </Subsection>
      </Section>

      {/* Design Tokens */}
      <Section title="Design Tokens">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[5], lineHeight: 1.7 }}>
          Content Badge 컴포넌트에 적용된 Foundation 기반 디자인 토큰입니다.
        </p>

        <Subsection title="Spacing & Layout">
          <div style={{ overflow: "auto", borderRadius: radius.primitive.md, border: "1px solid var(--divider)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
              <thead>
                <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Property</th>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Foundation Token</th>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Border Radius</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>radius.primitive.xs</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>4px</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Padding X (small)</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>spacing.component.badge.paddingX.sm</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>6px</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Padding X (medium)</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>spacing.component.badge.paddingX.md</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>8px</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Padding X (large)</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>spacing.component.badge.paddingX.lg</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>10px</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-primary)" }}>Icon-Text Gap</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>spacing.primitive[1]</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>4px</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Height (Size별)">
          <div style={{ overflow: "auto", borderRadius: radius.primitive.md, border: "1px solid var(--divider)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
              <thead>
                <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Size</th>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Foundation Token</th>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>small</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>spacing.component.badge.height.sm</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>18px</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>medium</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>spacing.component.badge.height.md</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>22px</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>large</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>spacing.component.badge.height.lg</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>26px</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Typography">
          <div style={{ overflow: "auto", borderRadius: radius.primitive.md, border: "1px solid var(--divider)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
              <thead>
                <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Size</th>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Token</th>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}>small / medium</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>fontSize.xs</InlineCode> + <InlineCode>fontWeight.semibold</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>12px / 600</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}>large</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>fontSize.sm</InlineCode> + <InlineCode>fontWeight.semibold</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>14px / 600</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Colors">
          <div style={{ overflow: "auto", borderRadius: radius.primitive.md, border: "1px solid var(--divider)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
              <thead>
                <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Color</th>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Filled BG</th>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Filled Text</th>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Weak BG</th>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Weak Text</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>primary</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--surface-brand-default</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--content-base-on-color</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--surface-brand-secondary</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--content-brand-default</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>neutral</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--content-base-secondary</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--content-base-on-color</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--surface-base-container</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--content-base-default</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>success</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--surface-success-solid</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--content-base-on-color</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--surface-success-default</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--content-success-strong</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>error</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--surface-error-solid</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--content-base-on-color</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--surface-error-default</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--content-error-default</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>warning</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--content-warning-default</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--content-base-on-color</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--surface-warning-default</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--content-warning-strong</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>info</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--content-info-default</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--content-base-on-color</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--surface-info-default</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--content-info-strong</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>
      </Section>

      {/* Accessibility */}
      <Section title="Accessibility">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[5], lineHeight: 1.7 }}>
          ContentBadge는 비인터랙티브 요소이므로 기본적으로 보조적 정보를 전달합니다.
        </p>

        <div style={{ overflow: "auto", marginBottom: spacing.primitive[6] }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>속성</th>
                <th style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>role=&quot;status&quot;</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>실시간 상태를 나타내는 Badge에 사용</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>aria-label</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>시각적으로만 전달되는 정보를 스크린 리더에 보충 설명</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}><InlineCode>aria-hidden</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>장식용 Badge(중복 정보)는 스크린 리더에서 숨김</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Subsection title="Usage Examples">
          <CodeBlock code={`// 색상이 핵심 의미를 전달할 때 — aria-label로 맥락 보충
<ContentBadge color="error" aria-label="재고 없음 — 품절 상태">품절</ContentBadge>

// 장식용 배지 (주변 텍스트와 중복) — 스크린 리더에서 숨김
<ContentBadge color="primary" aria-hidden="true">NEW</ContentBadge>

// 동적으로 변하는 상태 배지 — role="status"로 변경 알림
<ContentBadge color="success" role="status">판매중</ContentBadge>`} />
        </Subsection>

        <Subsection title="Keyboard Interaction">
          <div style={{ overflow: "auto", marginBottom: spacing.primitive[6] }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
              <thead>
                <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                  <th style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>키</th>
                  <th style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>동작</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, borderBottom: "1px solid var(--divider)" }}><kbd style={{ padding: "2px 6px", backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.xs, fontSize: typography.fontSize.xs }}>Tab</kbd></td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>Badge는 포커스를 받지 않음 (비인터랙티브)</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}>-</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>인터랙션이 필요하면 Chip 컴포넌트를 사용하세요</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Design Principles">
          <div style={{ display: "grid", gap: spacing.primitive[4] }}>
            <PrincipleCard number={1} title="Semantic Context" desc="Badge 자체는 보조적 정보이므로 주변 컨텍스트(텍스트, 이미지 등)와 함께 사용하여 의미를 전달하세요. 단독으로 사용하지 않습니다." />
            <PrincipleCard number={2} title="Color Contrast" desc="모든 색상 조합이 WCAG 2.1 AA 기준(4.5:1)을 충족합니다. filled variant는 배경색 위 흰 텍스트, weak variant는 연한 배경 위 진한 텍스트를 사용합니다." />
            <PrincipleCard number={3} title="Screen Reader Support" desc="색상만으로 전달되는 상태 정보는 aria-label로 보충합니다. 예: 빨간 Badge만으로 '품절'을 나타내면, aria-label='품절'을 추가하세요." />
          </div>
        </Subsection>
      </Section>

      {/* Related Components */}
      <Section title="Related Components">
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={{ textAlign: "left", padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>컴포넌트</th>
                <th style={{ textAlign: "left", padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>용도</th>
                <th style={{ textAlign: "left", padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>차이점</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>Chip</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>라벨 표시</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>Chip은 인터랙티브(선택/삭제), ContentBadge는 정보 표시만</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>Button</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>액션 실행</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>Button은 동작 트리거, ContentBadge는 상태 표시</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>IconButton</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>아이콘 액션</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>IconButton은 동작, ContentBadge는 정보</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}

const GITHUB_BASE = "https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system/src";
const CONTENT_BADGE_SOURCE = `${GITHUB_BASE}/components/ContentBadge/ContentBadge.tsx`;

function WebContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>
      {/* Source Code */}
      <Section title="Source Code">
        <div style={{ padding: spacing.primitive[4], backgroundColor: "var(--surface-base-default)", borderLeft: "1px solid var(--border-solid-alternative)", borderRadius: radius.primitive.md, marginBottom: spacing.primitive[6], display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)", margin: 0 }}>ContentBadge Component</p>
            <p style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", margin: `${spacing.primitive[1]}px 0 0 0` }}>실제 컴포넌트 소스 코드를 GitHub에서 확인하세요.</p>
          </div>
          <a
            href={CONTENT_BADGE_SOURCE}
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
        <CodeBlock code={`import { ContentBadge } from '@baerae-zkap/design-system';`} />
      </Section>

      {/* Basic Usage */}
      <Section title="Basic Usage">
        <PreviewBox>
          <div style={{ display: "flex", gap: spacing.primitive[3], padding: spacing.primitive[6] }}>
            <ContentBadgeDemo variant="filled" color="primary" size="medium">NEW</ContentBadgeDemo>
            <ContentBadgeDemo variant="filled" color="success" size="medium">판매중</ContentBadgeDemo>
            <ContentBadgeDemo variant="filled" color="error" size="medium">품절</ContentBadgeDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<ContentBadge color="primary">NEW</ContentBadge>
<ContentBadge color="success">판매중</ContentBadge>
<ContentBadge color="error">품절</ContentBadge>`} />
      </Section>

      {/* Variants */}
      <Section title="Variants">
        <PreviewBox>
          <div style={{ display: "flex", gap: spacing.primitive[3], padding: spacing.primitive[6] }}>
            <ContentBadgeDemo variant="filled" color="primary" size="medium">Filled</ContentBadgeDemo>
            <ContentBadgeDemo variant="weak" color="primary" size="medium">Weak</ContentBadgeDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<ContentBadge variant="filled" color="primary">Filled</ContentBadge>
<ContentBadge variant="weak" color="primary">Weak</ContentBadge>`} />
      </Section>


      {/* API Reference */}
      <Section title="API Reference">
        <PropsTable
          props={[
            { name: "variant", type: '"filled" | "weak"', required: false, defaultVal: '"filled"', description: "스타일 변형 — filled(채움), weak(연한 배경)" },
            { name: "color", type: '"primary" | "neutral" | "success" | "error" | "warning" | "info"', required: false, defaultVal: '"neutral"', description: "색상 테마" },
            { name: "size", type: '"small" | "medium" | "large"', required: false, defaultVal: '"medium"', description: "크기" },
            { name: "leftIcon", type: "ReactNode", required: false, description: "좌측 아이콘" },
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

function ContentBadgeDemo({
  variant = "filled",
  color = "neutral",
  size = "medium",
  children,
}: {
  variant?: ContentBadgeVariant;
  color?: ContentBadgeColor;
  size?: ContentBadgeSize;
  children: React.ReactNode;
}) {
  return (
    <ContentBadge
      variant={variant}
      color={color}
      size={size}
    >
      {children}
    </ContentBadge>
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
        <div style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", marginTop: spacing.primitive[0] }}>{sublabel}</div>
      </div>
    </div>
  );
}
