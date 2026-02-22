"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform, highlightCode } from "@/components/PlatformTabs";
import { PushBadge, IconButton, typography, spacing, radius } from '@baerae-zkap/design-system';
import { Section, Subsection, InlineCode } from "@/components/docs/Section";
import { PropsTable } from "@/components/docs/PropsTable";
import { PrincipleCard, VariantCard, DoCard, DontCard } from "@/components/docs/Cards";
import { RadioGroup, CopyButton } from "@/components/docs/Playground";
import { DoLabel, DontLabel } from "@/components/docs/Labels";

// Bell icon used as IconButton child throughout the doc
function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

// Types
type PushBadgeVariant = "dot" | "number" | "new";
type PushBadgeSize = "default" | "small" | "tiny";
type PushBadgeColor = "error" | "primary" | "success" | "warning";

export default function PushBadgePage() {
  return (
    <div style={{ maxWidth: 840 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Contents" },
          { label: "Push Badge" },
        ]}
      />

      {/* Header */}
      <h1 style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold, marginBottom: spacing.primitive[2], color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
        Push Badge
      </h1>
      <p style={{ fontSize: typography.fontSize.md, color: "var(--text-secondary)", marginBottom: spacing.primitive[8], lineHeight: 1.7 }}>
        아이콘, 버튼, 아바타 등 UI 요소 위에 오버레이되어 알림 수 또는 상태를 표시하는 배지 컴포넌트입니다. <InlineCode>children</InlineCode>으로 감싸는 방식으로 사용합니다.
      </p>

      {/* Interactive Playground */}
      <PushBadgePlayground />

      {/* Platform Tabs */}
      <PlatformTabs>
        {(platform) => <PlatformContent platform={platform} />}
      </PlatformTabs>
    </div>
  );
}

function PushBadgePlayground() {
  const [variant, setVariant] = useState<PushBadgeVariant>("number");
  const [color, setColor] = useState<PushBadgeColor>("error");
  const [size, setSize] = useState<PushBadgeSize>("default");
  const [count, setCount] = useState<number>(3);
  const [hidden, setHidden] = useState<boolean>(false);

  const generateCode = () => {
    const props: string[] = [];
    if (variant !== "number") props.push(`variant="${variant}"`);
    if (color !== "error") props.push(`color="${color}"`);
    if (size !== "default") props.push(`size="${size}"`);
    if (variant === "number") props.push(`count={${count}}`);
    if (hidden) props.push(`hidden={true}`);

    const propsStr = props.length > 0 ? `\n  ${props.join("\n  ")}\n` : "";
    return `<PushBadge${propsStr ? propsStr : " "}>\n  <IconButton aria-label="알림"><BellIcon /></IconButton>\n</PushBadge>`;
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
              backgroundColor: "var(--surface-base-alternative)",
            }}
          >
            <PushBadge
              variant={variant}
              color={color}
              size={size}
              count={count}
              hidden={hidden}
            >
              <div
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: "var(--surface-base-alternative)",
                  borderRadius: `var(--radius-md)`,
                  border: "1px solid var(--divider)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--content-base-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </div>
            </PushBadge>
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
              {/* Variant */}
              <RadioGroup
                label="Variant"
                options={[
                  { value: "number", label: "Number" },
                  { value: "dot", label: "Dot" },
                  { value: "new", label: "New" },
                ]}
                value={variant}
                onChange={(v) => setVariant(v as PushBadgeVariant)}
              />

              {/* Color */}
              <RadioGroup
                label="Color"
                options={[
                  { value: "error", label: "Error" },
                  { value: "primary", label: "Primary" },
                  { value: "success", label: "Success" },
                  { value: "warning", label: "Warning" },
                ]}
                value={color}
                onChange={(v) => setColor(v as PushBadgeColor)}
              />

              {/* Size */}
              <RadioGroup
                label="Size"
                options={[
                  { value: "default", label: "Default" },
                  { value: "small", label: "Small" },
                  { value: "tiny", label: "Tiny" },
                ]}
                value={size}
                onChange={(v) => setSize(v as PushBadgeSize)}
              />

              {/* Count */}
              <RadioGroup
                label="Count"
                options={[
                  { value: "3", label: "3" },
                  { value: "12", label: "12" },
                  { value: "99", label: "99" },
                  { value: "120", label: "120" },
                ]}
                value={String(count)}
                onChange={(v) => setCount(Number(v))}
                disabled={variant === "dot"}
              />

              {/* Hidden */}
              <RadioGroup
                label="Hidden"
                options={[
                  { value: "no", label: "No" },
                  { value: "yes", label: "Yes" },
                ]}
                value={hidden ? "yes" : "no"}
                onChange={(v) => setHidden(v === "yes")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Generated Code */}
      <div style={{ marginTop: spacing.primitive[4], borderRadius: radius.primitive.md, overflow: "hidden", border: "1px solid var(--divider)" }}>
        <div
          style={{
            padding: "10px 16px",
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

// ============================================
// Design Tab
// ============================================

function DesignContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>

      {/* Overview */}
      <Section title="Overview">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: spacing.primitive[4] }}>
          <InlineCode>PushBadge</InlineCode>는 아이콘, 버튼, 아바타 등 다른 UI 요소 위에 오버레이되어 알림 수 또는 상태를 표시해요.
          래퍼(wrapper) 방식으로 동작하며, <InlineCode>children</InlineCode>으로 전달된 요소의 우측 상단에 배지를 자동으로 배치합니다.
        </p>
      </Section>

      {/* Anatomy */}
      <Section title="Anatomy">
        <div style={{
          backgroundColor: "var(--surface-base-alternative)",
          borderRadius: radius.primitive.lg,
          padding: "48px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 80,
        }}>
          {/* Number variant anatomy */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
            <svg width="180" height="160" viewBox="0 0 180 160">
              {/* Wrapper (relative container) */}
              <rect x="40" y="40" width="80" height="80" rx="12" fill="none" stroke="var(--content-base-placeholder)" strokeWidth="1.5" strokeDasharray="4 3" />
              <text x="80" y="88" textAnchor="middle" fill="var(--content-base-secondary)" fontSize="11">child</text>

              {/* Badge circle (number) */}
              <circle cx="116" cy="44" r="14" fill="var(--surface-error-solid)" />
              <text x="116" y="49" textAnchor="middle" fill="white" fontSize="10" fontWeight="700">3</text>

              {/* Labels */}
              {/* 1 → wrapper */}
              <line x1="20" y1="80" x2="40" y2="80" stroke="var(--content-base-default)" strokeWidth="1.5" />
              <circle cx="40" cy="80" r="3" fill="var(--content-base-default)" />
              <circle cx="12" cy="80" r="10" fill="var(--content-base-default)" />
              <text x="12" y="84" textAnchor="middle" fill="white" fontSize="10" fontWeight="700">1</text>

              {/* 2 → badge */}
              <line x1="116" y1="30" x2="116" y2="10" stroke="var(--content-base-default)" strokeWidth="1.5" />
              <circle cx="116" cy="30" r="3" fill="var(--content-base-default)" />
              <circle cx="116" cy="10" r="10" fill="var(--content-base-default)" />
              <text x="116" y="14" textAnchor="middle" fill="white" fontSize="10" fontWeight="700">2</text>

              {/* 3 → count text */}
              <line x1="130" y1="44" x2="155" y2="30" stroke="var(--content-base-default)" strokeWidth="1.5" />
              <circle cx="130" cy="44" r="3" fill="var(--content-base-default)" />
              <circle cx="163" cy="26" r="10" fill="var(--content-base-default)" />
              <text x="163" y="30" textAnchor="middle" fill="white" fontSize="10" fontWeight="700">3</text>
            </svg>
            <p style={{ fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)", margin: 0 }}>Number</p>
          </div>

          {/* Dot variant anatomy */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
            <svg width="180" height="160" viewBox="0 0 180 160">
              {/* Wrapper */}
              <rect x="40" y="40" width="80" height="80" rx="12" fill="none" stroke="var(--content-base-placeholder)" strokeWidth="1.5" strokeDasharray="4 3" />
              <text x="80" y="88" textAnchor="middle" fill="var(--content-base-secondary)" fontSize="11">child</text>

              {/* Dot badge */}
              <circle cx="116" cy="44" r="8" fill="var(--surface-error-solid)" />

              {/* Labels */}
              <line x1="20" y1="80" x2="40" y2="80" stroke="var(--content-base-default)" strokeWidth="1.5" />
              <circle cx="40" cy="80" r="3" fill="var(--content-base-default)" />
              <circle cx="12" cy="80" r="10" fill="var(--content-base-default)" />
              <text x="12" y="84" textAnchor="middle" fill="white" fontSize="10" fontWeight="700">1</text>

              <line x1="116" y1="36" x2="116" y2="10" stroke="var(--content-base-default)" strokeWidth="1.5" />
              <circle cx="116" cy="36" r="3" fill="var(--content-base-default)" />
              <circle cx="116" cy="10" r="10" fill="var(--content-base-default)" />
              <text x="116" y="14" textAnchor="middle" fill="white" fontSize="10" fontWeight="700">2</text>
            </svg>
            <p style={{ fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)", margin: 0 }}>Dot</p>
          </div>
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
          <div>1. Wrapper (relative)</div>
          <div style={{ textAlign: "center" }}>2. Badge (absolute, top-right)</div>
          <div style={{ textAlign: "right" }}>3. Count text (number only)</div>
        </div>
      </Section>

      {/* Variants */}
      <Section title="Variants">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
          <VariantCard name="Number" description="알림 수를 숫자로 표시합니다. count prop이 필요합니다.">
            <div style={{ display: "flex", gap: spacing.primitive[6], alignItems: "center" }}>
              <PushBadgeBox variant="number" color="error" count={3} />
              <PushBadgeBox variant="number" color="primary" count={12} />
            </div>
          </VariantCard>
          <VariantCard name="Dot" description="단순 점으로 새 알림의 존재만 알립니다. count 없이도 사용 가능합니다.">
            <div style={{ display: "flex", gap: spacing.primitive[6], alignItems: "center" }}>
              <PushBadgeBox variant="dot" color="error" />
              <PushBadgeBox variant="dot" color="primary" />
            </div>
          </VariantCard>
        </div>
      </Section>

      {/* Size */}
      <Section title="Size">
        <PreviewBox>
          <div style={{ display: "flex", gap: spacing.primitive[8], alignItems: "center", padding: spacing.primitive[6] }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[3] }}>
              <PushBadgeBox variant="number" color="error" size="default" count={3} />
              <p style={{ fontSize: typography.fontSize.xs, color: "var(--content-base-secondary)", margin: 0 }}>Default</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[3] }}>
              <PushBadgeBox variant="number" color="error" size="small" count={3} />
              <p style={{ fontSize: typography.fontSize.xs, color: "var(--content-base-secondary)", margin: 0 }}>Small</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[3] }}>
              <PushBadgeBox variant="dot" color="error" size="tiny" />
              <p style={{ fontSize: typography.fontSize.xs, color: "var(--content-base-secondary)", margin: 0 }}>Tiny</p>
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* Color */}
      <Section title="Color">
        <PreviewBox>
          <div style={{ display: "flex", gap: spacing.primitive[8], flexWrap: "wrap", padding: spacing.primitive[6], alignItems: "center" }}>
            {(["error", "primary", "success", "warning"] as PushBadgeColor[]).map((color) => (
              <div key={color} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[3] }}>
                <PushBadgeBox variant="number" color={color} count={3} />
                <p style={{ fontSize: typography.fontSize.xs, color: "var(--content-base-secondary)", margin: 0, textTransform: "capitalize" }}>{color}</p>
              </div>
            ))}
          </div>
        </PreviewBox>
      </Section>

      {/* Indicating Count */}
      <Section title="Indicating Count">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[5], lineHeight: 1.7 }}>
          <InlineCode>count</InlineCode> prop으로 숫자를 전달합니다. <InlineCode>max</InlineCode> 값(기본 99)을 초과하면 자동으로 <InlineCode>99+</InlineCode> 형식으로 표시됩니다.
        </p>
        <PreviewBox>
          <div style={{ display: "flex", gap: spacing.primitive[8], flexWrap: "wrap", padding: spacing.primitive[6], alignItems: "center" }}>
            {([3, 12, 99, 100] as number[]).map((n) => (
              <div key={n} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[3] }}>
                <PushBadgeBox variant="number" color="error" count={n} max={99} />
                <p style={{ fontSize: typography.fontSize.xs, color: "var(--content-base-secondary)", margin: 0 }}>
                  count={n}{n === 100 ? " → \"99+\"" : ""}
                </p>
              </div>
            ))}
          </div>
        </PreviewBox>
      </Section>

      {/* States */}
      <Section title="States">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[5], lineHeight: 1.7 }}>
          PushBadge는 비인터랙티브 요소로, 표시 여부와 내용에 따른 시각적 상태를 제공합니다.
        </p>

        <Subsection title="Interaction States">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: spacing.primitive[6] }}>
            PushBadge는 hover/pressed 상태가 없습니다. <InlineCode>hidden</InlineCode> prop으로 DOM에서 완전히 제거하거나, count가 0일 때 숨길 수 있습니다.
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: spacing.primitive[4],
            padding: spacing.primitive[6],
            backgroundColor: "var(--surface-base-alternative)",
            borderRadius: radius.primitive.lg,
          }}>
            <StateCard label="Visible" sublabel="기본 표시 상태">
              <PushBadgeBox variant="number" color="error" count={5} />
            </StateCard>
            <StateCard label="Hidden" sublabel="hidden={true}">
              <PushBadgeBox variant="number" color="error" count={5} hidden />
            </StateCard>
            <StateCard label="Zero count" sublabel="hidden={count === 0}">
              <PushBadgeBox variant="number" color="error" count={0} hidden={true} />
            </StateCard>
            <StateCard label="Dot" sublabel="알림 존재 표시">
              <PushBadgeBox variant="dot" color="error" />
            </StateCard>
          </div>
          <div style={{ marginTop: spacing.primitive[4], padding: spacing.primitive[4], backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.md, fontSize: typography.fontSize.compact }}>
            <p style={{ margin: 0, color: "var(--text-secondary)", lineHeight: 1.7 }}>
              <strong style={{ color: "var(--text-primary)" }}>hidden prop:</strong> true이면 배지가 DOM에서 완전히 제거됩니다. display:none이 아닌 완전한 제거입니다.<br />
              <strong style={{ color: "var(--text-primary)" }}>Zero count:</strong> count가 0이면 <InlineCode>hidden</InlineCode>={"{count === 0}"}으로 조건부 숨김 처리를 권장합니다.
            </p>
          </div>
        </Subsection>
      </Section>

      {/* Usage Guidelines */}
      <Section title="Usage Guidelines">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[6], lineHeight: 1.7 }}>
          일관된 UX를 위해 아래 권고 조합을 따르세요.
        </p>

        <Subsection title="Best Practices">
          <div style={{ display: "grid", gap: spacing.primitive[5] }}>
            {/* Do: error color for notifications */}
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <DoCard>
                  <PushBadgeBox variant="number" color="error" count={3} />
                </DoCard>
                <DontCard>
                  <PushBadgeBox variant="number" color="success" count={3} />
                </DontCard>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> <span style={{ color: "var(--text-secondary)" }}>알림 카운트에는 error 색상을 사용합니다.</span>
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Don&apos;t</span> <span style={{ color: "var(--text-secondary)", fontStyle: "italic" }}>알림을 success/warning 색상으로 표시하지 마세요.</span>
                </p>
              </div>
            </div>

            {/* Do: hide when count is 0 */}
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <DoCard>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
                    <PushBadgeBox variant="number" color="error" count={0} hidden={true} />
                    <p style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", margin: 0 }}>hidden={"{count === 0}"}</p>
                  </div>
                </DoCard>
                <DontCard>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
                    <PushBadgeBox variant="number" color="error" count={0} />
                    <p style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", margin: 0 }}>count=0 표시</p>
                  </div>
                </DontCard>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> <span style={{ color: "var(--text-secondary)" }}>count가 0이면 hidden으로 배지를 숨기세요.</span>
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Don&apos;t</span> <span style={{ color: "var(--text-secondary)", fontStyle: "italic" }}>0 카운트를 그대로 노출하지 마세요.</span>
                </p>
              </div>
            </div>

            {/* Don't: number variant without count */}
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <DoCard>
                  <PushBadgeBox variant="number" color="error" count={5} />
                </DoCard>
                <DontCard>
                  <PushBadge variant="number" color="error">
                    <div style={{ width: 44, height: 44, backgroundColor: "var(--surface-base-default)", borderRadius: radius.primitive.lg, border: "1px solid var(--divider)" }} />
                  </PushBadge>
                </DontCard>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> <span style={{ color: "var(--text-secondary)" }}>number variant에는 count를 반드시 전달하세요.</span>
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Don&apos;t</span> <span style={{ color: "var(--text-secondary)", fontStyle: "italic" }}>number variant에서 count를 생략하지 마세요.</span>
                </p>
              </div>
            </div>

            {/* Don't: non-interactive elements */}
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <DoCard>
                  <PushBadge variant="number" color="error" count={3}>
                    <IconButton aria-label="알림"><BellIcon /></IconButton>
                  </PushBadge>
                </DoCard>
                <DontCard>
                  <PushBadge variant="number" color="error" count={3}>
                    <p style={{ margin: 0, fontSize: typography.fontSize.sm, color: "var(--text-primary)" }}>알림</p>
                  </PushBadge>
                </DontCard>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> <span style={{ color: "var(--text-secondary)" }}>인터랙티브 요소(버튼, 아이콘 등)에 사용합니다.</span>
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Don&apos;t</span> <span style={{ color: "var(--text-secondary)", fontStyle: "italic" }}>텍스트 등 비인터랙티브 요소에 얹지 마세요.</span>
                </p>
              </div>
            </div>
          </div>
        </Subsection>
      </Section>

      {/* Design Tokens */}
      <Section title="Design Tokens">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[5], lineHeight: 1.7 }}>
          PushBadge 컴포넌트에 적용된 Foundation 기반 디자인 토큰입니다.
        </p>

        <Subsection title="Size">
          <div style={{ overflow: "auto", borderRadius: radius.primitive.md, border: "1px solid var(--divider)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
              <thead>
                <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Size</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Badge Diameter</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Dot Diameter</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><InlineCode>default</InlineCode></td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>18px</td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>10px</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><InlineCode>small</InlineCode></td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>14px</td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>8px</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px" }}><InlineCode>tiny</InlineCode></td>
                  <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>—</td>
                  <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>6px</td>
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
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Color</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Background Token</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Text Token</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { color: "error", bg: "--surface-error-solid", text: "--content-base-onColor" },
                  { color: "primary", bg: "--surface-brand-default", text: "--content-base-onColor" },
                  { color: "success", bg: "--surface-success-solid", text: "--content-base-onColor" },
                  { color: "warning", bg: "--surface-warning-solid", text: "--content-base-onColor" },
                ].map((row, i, arr) => (
                  <tr key={row.color}>
                    <td style={{ padding: "12px 16px", borderBottom: i < arr.length - 1 ? "1px solid var(--divider)" : "none" }}><InlineCode>{row.color}</InlineCode></td>
                    <td style={{ padding: "12px 16px", borderBottom: i < arr.length - 1 ? "1px solid var(--divider)" : "none", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>{row.bg}</td>
                    <td style={{ padding: "12px 16px", borderBottom: i < arr.length - 1 ? "1px solid var(--divider)" : "none", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>{row.text}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Typography">
          <div style={{ overflow: "auto", borderRadius: radius.primitive.md, border: "1px solid var(--divider)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
              <thead>
                <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Size</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Token</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><InlineCode>default</InlineCode></td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><InlineCode>fontSize.xs</InlineCode> + <InlineCode>fontWeight.bold</InlineCode></td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>12px / 700</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px" }}><InlineCode>small</InlineCode></td>
                  <td style={{ padding: "12px 16px" }}><InlineCode>fontSize.3xs</InlineCode> + <InlineCode>fontWeight.bold</InlineCode></td>
                  <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>10px / 700</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>
      </Section>

      {/* Accessibility */}
      <Section title="Accessibility">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[5], lineHeight: 1.7 }}>
          PushBadge는 시각적 알림 표시 요소로, 스크린 리더에서 카운트 변경을 인지할 수 있도록 적절한 ARIA 속성을 사용하세요.
        </p>

        <div style={{ overflow: "auto", marginBottom: spacing.primitive[6] }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>속성</th>
                <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid var(--divider)" }}><InlineCode>role=&quot;status&quot;</InlineCode></td>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>배지 값이 변경될 때 스크린 리더에 알림 (polite live region)</td>
              </tr>
              <tr>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid var(--divider)" }}><InlineCode>aria-live=&quot;polite&quot;</InlineCode></td>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>카운트가 동적으로 변할 때 스크린 리더 알림 활성화</td>
              </tr>
              <tr>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid var(--divider)" }}><InlineCode>aria-label</InlineCode></td>
                <td style={{ padding: "10px 12px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>숫자만으로 전달되지 않는 맥락을 스크린 리더에 보충. 예: &quot;3개의 새 알림&quot;</td>
              </tr>
              <tr>
                <td style={{ padding: "10px 12px" }}><InlineCode>aria-hidden</InlineCode></td>
                <td style={{ padding: "10px 12px", color: "var(--text-secondary)" }}>hidden=true 시 배지 DOM 제거로 스크린 리더에서도 자동으로 숨겨집니다</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Subsection title="Usage Examples">
          <CodeBlock code={`// 동적 카운트 — role="status"로 변경 시 스크린 리더 알림
<PushBadge
  variant="number"
  color="error"
  count={unreadCount}
  hidden={unreadCount === 0}
  role="status"
  aria-label={\`\${unreadCount}개의 새 알림\`}
>
  <IconButton aria-label="알림"><BellIcon /></IconButton>
</PushBadge>

// Dot — 단순 알림 존재 표시
<PushBadge
  variant="dot"
  color="error"
  aria-label="새 알림이 있습니다"
>
  <IconButton aria-label="메시지"><BellIcon /></IconButton>
</PushBadge>`} />
        </Subsection>

        <Subsection title="Design Principles">
          <div style={{ display: "grid", gap: spacing.primitive[4] }}>
            <PrincipleCard number={1} title="Wrapper Pattern" desc="PushBadge는 children을 감싸는 방식으로 동작합니다. children의 포커스 및 인터랙션은 그대로 유지되며 배지는 시각적 오버레이입니다." />
            <PrincipleCard number={2} title="Announce Count Changes" desc="알림 수가 실시간으로 변하는 경우 role='status'와 aria-label을 함께 사용해 스크린 리더가 변경을 감지할 수 있게 하세요." />
            <PrincipleCard number={3} title="Color Contrast" desc="모든 색상 조합이 WCAG 2.1 AA 기준을 충족합니다. 색상만으로 상태를 전달하지 말고 count/dot과 aria-label을 함께 제공하세요." />
          </div>
        </Subsection>
      </Section>

      {/* Related Components */}
      <Section title="Related Components">
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={{ textAlign: "left", padding: "10px 12px", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>컴포넌트</th>
                <th style={{ textAlign: "left", padding: "10px 12px", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>용도</th>
                <th style={{ textAlign: "left", padding: "10px 12px", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>차이점</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "10px 12px", fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>ContentBadge</td>
                <td style={{ padding: "10px 12px", color: "var(--text-secondary)" }}>인라인 상태/카테고리 라벨</td>
                <td style={{ padding: "10px 12px", color: "var(--text-secondary)" }}>ContentBadge는 콘텐츠 안에 인라인 배치, PushBadge는 다른 요소 위에 오버레이</td>
              </tr>
              <tr>
                <td style={{ padding: "10px 12px", fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>IconButton</td>
                <td style={{ padding: "10px 12px", color: "var(--text-secondary)" }}>아이콘 액션</td>
                <td style={{ padding: "10px 12px", color: "var(--text-secondary)" }}>PushBadge의 가장 흔한 children 대상. 알림 버튼 패턴에서 함께 사용</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}

// ============================================
// Web Tab
// ============================================

const GITHUB_BASE = "https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system/src";
const PUSH_BADGE_SOURCE = `${GITHUB_BASE}/components/PushBadge/PushBadge.tsx`;

function WebContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>

      {/* Source Code */}
      <Section title="Source Code">
        <div style={{ padding: spacing.primitive[4], backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.md, marginBottom: spacing.primitive[6], display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)", margin: 0 }}>PushBadge Component</p>
            <p style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", margin: `${spacing.primitive[1]}px 0 0 0` }}>실제 컴포넌트 소스 코드를 GitHub에서 확인하세요.</p>
          </div>
          <a
            href={PUSH_BADGE_SOURCE}
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
        <CodeBlock code={`import { PushBadge } from '@baerae-zkap/design-system';`} />
      </Section>

      {/* Basic Usage */}
      <Section title="Basic Usage">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          <InlineCode>PushBadge</InlineCode>로 대상 요소를 감싸고 <InlineCode>count</InlineCode>를 전달하면 우측 상단에 배지가 표시됩니다.
        </p>
        <PreviewBox>
          <div style={{ display: "flex", gap: spacing.primitive[8], alignItems: "center", padding: spacing.primitive[6] }}>
            <PushBadge variant="number" color="error" count={3}>
              <IconButton aria-label="알림"><BellIcon /></IconButton>
            </PushBadge>
            <PushBadge variant="number" color="primary" count={12}>
              <IconButton aria-label="메시지"><BellIcon /></IconButton>
            </PushBadge>
          </div>
        </PreviewBox>
        <CodeBlock code={`<PushBadge variant="number" color="error" count={3}>
  <IconButton aria-label="알림"><BellIcon /></IconButton>
</PushBadge>`} />
      </Section>

      {/* Dot Variant */}
      <Section title="Dot Variant">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          숫자 대신 단순 점으로 알림의 존재를 알릴 때 사용합니다. <InlineCode>count</InlineCode> 없이도 동작합니다.
        </p>
        <PreviewBox>
          <div style={{ display: "flex", gap: spacing.primitive[8], alignItems: "center", padding: spacing.primitive[6] }}>
            <PushBadge variant="dot" color="error">
              <IconButton aria-label="알림"><BellIcon /></IconButton>
            </PushBadge>
            <PushBadge variant="dot" color="primary" size="small">
              <IconButton aria-label="메시지"><BellIcon /></IconButton>
            </PushBadge>
            <PushBadge variant="dot" color="success" size="tiny">
              <IconButton aria-label="상태"><BellIcon /></IconButton>
            </PushBadge>
          </div>
        </PreviewBox>
        <CodeBlock code={`<PushBadge variant="dot" color="error">
  <IconButton aria-label="알림"><BellIcon /></IconButton>
</PushBadge>`} />
      </Section>

      {/* Max Count */}
      <Section title="Max Count">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          <InlineCode>max</InlineCode> prop으로 표시 최대값을 설정합니다. 기본값은 99이며, 초과 시 <InlineCode>99+</InlineCode>로 표시됩니다.
        </p>
        <PreviewBox>
          <div style={{ display: "flex", gap: spacing.primitive[8], alignItems: "center", padding: spacing.primitive[6] }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
              <PushBadge variant="number" color="error" count={99}>
                <IconButton aria-label="알림"><BellIcon /></IconButton>
              </PushBadge>
              <p style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", margin: 0 }}>count=99</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
              <PushBadge variant="number" color="error" count={100} max={99}>
                <IconButton aria-label="알림"><BellIcon /></IconButton>
              </PushBadge>
              <p style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", margin: 0 }}>count=100 → &quot;99+&quot;</p>
            </div>
          </div>
        </PreviewBox>
        <CodeBlock code={`// count가 max를 초과하면 "99+"로 표시됩니다
<PushBadge variant="number" color="error" count={120} max={99}>
  <IconButton aria-label="알림"><BellIcon /></IconButton>
</PushBadge>`} />
      </Section>

      {/* Conditional Hide */}
      <Section title="Conditional Hide">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          <InlineCode>hidden</InlineCode> prop이 <InlineCode>true</InlineCode>이면 배지가 DOM에서 완전히 제거됩니다. count가 0일 때 조건부로 숨기는 패턴을 사용하세요.
        </p>
        <PreviewBox>
          <div style={{ display: "flex", gap: spacing.primitive[8], alignItems: "center", padding: spacing.primitive[6] }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
              <PushBadge variant="number" color="error" count={5} hidden={false}>
                <IconButton aria-label="알림"><BellIcon /></IconButton>
              </PushBadge>
              <p style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", margin: 0 }}>hidden=false</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
              <PushBadge variant="number" color="error" count={0} hidden={true}>
                <IconButton aria-label="알림"><BellIcon /></IconButton>
              </PushBadge>
              <p style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", margin: 0 }}>hidden=true</p>
            </div>
          </div>
        </PreviewBox>
        <CodeBlock code={`// count가 0이면 배지를 숨기는 패턴
<PushBadge
  variant="number"
  color="error"
  count={unreadCount}
  hidden={unreadCount === 0}
>
  <IconButton aria-label="알림"><BellIcon /></IconButton>
</PushBadge>`} />
      </Section>

      {/* API Reference */}
      <Section title="API Reference">
        <PropsTable
          props={[
            { name: "children", type: "ReactNode", required: true, description: "배지를 오버레이할 대상 요소" },
            { name: "variant", type: '"dot" | "number" | "new"', required: false, defaultVal: '"number"', description: "배지 형태 — number(숫자), dot(점), new(N 텍스트)" },
            { name: "color", type: '"error" | "primary" | "success" | "warning"', required: false, defaultVal: '"error"', description: "배지 색상 테마" },
            { name: "size", type: '"default" | "small" | "tiny"', required: false, defaultVal: '"default"', description: "배지 크기" },
            { name: "count", type: "number", required: false, description: "number variant에서 표시할 숫자" },
            { name: "max", type: "number", required: false, defaultVal: "99", description: "count 표시 최대값. 초과 시 '99+' 형식으로 표시" },
            { name: "hidden", type: "boolean", required: false, defaultVal: "false", description: "true이면 배지를 DOM에서 완전히 제거" },
          ]}
        />
      </Section>
    </div>
  );
}

// ============================================
// Shared Helper Components
// ============================================

function PushBadgeBox({
  variant = "number",
  color = "error",
  size = "default",
  count,
  max,
  hidden,
}: {
  variant?: PushBadgeVariant;
  color?: PushBadgeColor;
  size?: PushBadgeSize;
  count?: number;
  max?: number;
  hidden?: boolean;
}) {
  return (
    <PushBadge variant={variant} color={color} size={size} count={count} max={max} hidden={hidden}>
      <div
        style={{
          width: 44,
          height: 44,
          backgroundColor: "var(--surface-base-default)",
          borderRadius: radius.primitive.lg,
          border: "1px solid var(--divider)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--content-base-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      </div>
    </PushBadge>
  );
}

function StateCard({ label, sublabel, children }: {
  label: string;
  sublabel: string;
  children: React.ReactNode;
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
