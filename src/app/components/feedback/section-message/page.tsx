"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform, highlightCode } from "@/components/PlatformTabs";
import { SectionMessage, Button, TextButton, typography, spacing, radius } from "@baerae-zkap/design-system";
import type { SectionMessageVariant } from "@baerae-zkap/design-system";
import { Section, Subsection, InlineCode } from "@/components/docs/Section";
import { PropsTable } from "@/components/docs/PropsTable";
import { DoCard, DontCard } from "@/components/docs/Cards";
import { RadioGroup, CopyButton } from "@/components/docs/Playground";

export default function SectionMessagePage() {
  return (
    <div style={{ maxWidth: 840 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Feedback" },
          { label: "Section Message" },
        ]}
      />

      {/* Header */}
      <h1 style={{ fontSize: typography.fontSize["3xl"], fontWeight: 700, marginBottom: spacing.primitive[2], color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
        Section Message
      </h1>
      <p style={{ fontSize: typography.fontSize.md, color: "var(--text-secondary)", marginBottom: spacing.primitive[8], lineHeight: 1.7 }}>
        페이지 내 섹션 레벨에서 중요한 정보, 경고, 오류, 성공 상태를 인라인으로 표시하는 배너 컴포넌트입니다.
      </p>

      {/* Interactive Playground */}
      <SectionMessagePlayground />

      {/* Platform Tabs */}
      <PlatformTabs>
        {(platform) => <PlatformContent platform={platform} />}
      </PlatformTabs>
    </div>
  );
}

// ============================================
// Playground
// ============================================

function SectionMessagePlayground() {
  const [variant, setVariant] = useState<SectionMessageVariant>("info");
  const [hasHeading, setHasHeading] = useState<"yes" | "no">("yes");
  const [showClose, setShowClose] = useState<"yes" | "no">("no");
  const [showAction, setShowAction] = useState<"yes" | "no">("no");
  const [dismissed, setDismissed] = useState(false);

  const generateCode = () => {
    const lines: string[] = [];
    lines.push("<SectionMessage");
    if (variant !== "info") lines.push(`  variant="${variant}"`);
    if (hasHeading === "yes") lines.push(`  heading="${headingText(variant)}"`);
    lines.push(`  description="${descriptionText(variant)}"`);
    if (showAction === "yes") {
      lines.push(`  action={<TextButton color="primary">자세히 보기</TextButton>}`);
    }
    if (showClose === "yes") {
      lines.push("  onClose={() => setVisible(false)}");
    }
    lines.push("/>");
    return lines.join("\n");
  };

  function headingText(v: SectionMessageVariant): string {
    switch (v) {
      case "default": return "안내 메시지";
      case "info": return "업데이트 안내";
      case "success": return "저장이 완료되었습니다";
      case "warning": return "주의가 필요합니다";
      case "error": return "오류가 발생했습니다";
    }
  }

  function descriptionText(v: SectionMessageVariant): string {
    switch (v) {
      case "default": return "확인이 필요한 정보가 있습니다.";
      case "info": return "새로운 기능이 추가되었습니다. 지금 확인해보세요.";
      case "success": return "변경 사항이 성공적으로 저장되었습니다.";
      case "warning": return "이 작업은 되돌릴 수 없습니다. 진행 전에 확인해주세요.";
      case "error": return "요청을 처리하는 중에 문제가 발생했습니다. 다시 시도해주세요.";
    }
  }

  return (
    <div style={{ marginBottom: spacing.primitive[8] }}>
      <div
        style={{
          borderRadius: radius.primitive.xl,
          overflow: "hidden",
          backgroundColor: "var(--surface-base-alternative)",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", minHeight: 360 }}>
          {/* Preview Area */}
          <div
            style={{
              padding: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "var(--surface-base-alternative)",
            }}
          >
            <div style={{ width: "100%", maxWidth: 400 }}>
              {dismissed ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: spacing.primitive[3],
                    padding: spacing.primitive[6],
                    color: "var(--text-secondary)",
                    fontSize: typography.fontSize.sm,
                  }}
                >
                  <span>메시지가 닫혔습니다.</span>
                  <button
                    onClick={() => setDismissed(false)}
                    style={{
                      fontSize: typography.fontSize.sm,
                      color: "var(--content-brand-default)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    다시 표시
                  </button>
                </div>
              ) : (
                <SectionMessage
                  variant={variant}
                  heading={hasHeading === "yes" ? headingText(variant) : undefined}
                  description={descriptionText(variant)}
                  action={showAction === "yes" ? (
                    <TextButton color="primary">자세히 보기</TextButton>
                  ) : undefined}
                  onClose={showClose === "yes" ? () => setDismissed(true) : undefined}
                />
              )}
            </div>
          </div>

          {/* Control Panel */}
          <div
            style={{
              backgroundColor: "var(--surface-base-alternative)",
              display: "flex",
              flexDirection: "column",
              padding: spacing.primitive[4],
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
              <RadioGroup
                label="variant"
                options={[
                  { value: "default", label: "default" },
                  { value: "info", label: "info" },
                  { value: "success", label: "success" },
                  { value: "warning", label: "warning" },
                  { value: "error", label: "error" },
                ]}
                value={variant}
                onChange={(v) => {
                  setVariant(v as SectionMessageVariant);
                  setDismissed(false);
                }}
              />

              <RadioGroup
                label="heading"
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
                value={hasHeading}
                onChange={(v) => setHasHeading(v as "yes" | "no")}
              />

              <RadioGroup
                label="showClose"
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
                value={showClose}
                onChange={(v) => {
                  setShowClose(v as "yes" | "no");
                  setDismissed(false);
                }}
              />

              <RadioGroup
                label="showAction"
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
                value={showAction}
                onChange={(v) => setShowAction(v as "yes" | "no")}
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

// ============================================
// Design Tab
// ============================================

function DesignContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>

      {/* Overview */}
      <Section title="Overview">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7 }}>
          <InlineCode>SectionMessage</InlineCode>는 페이지 내 섹션 레벨에서 중요한 정보, 경고, 오류, 성공 상태를 인라인으로 표시하는 배너 컴포넌트입니다.
          페이지 전환 없이 현재 컨텍스트에서 사용자에게 피드백을 제공합니다.
        </p>
      </Section>

      {/* Anatomy */}
      <Section title="Anatomy">
        <div
          style={{
            backgroundColor: "var(--surface-base-alternative)",
            borderRadius: 12,
            padding: spacing.primitive[8],
            display: "flex",
            justifyContent: "center",
          }}
        >
          <svg width="560" height="120" viewBox="0 0 560 120" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="SectionMessage anatomy diagram">
            {/* Container */}
            <rect x="20" y="20" width="520" height="80" rx="16" fill="var(--surface-info-default)" />

            {/* Icon area */}
            <rect x="36" y="36" width="20" height="20" rx="10" fill="var(--content-info-default)" opacity="0.85" />
            {/* Icon annotation */}
            <line x1="46" y1="20" x2="46" y2="10" stroke="var(--content-base-assistive)" strokeWidth="1" strokeDasharray="2 2" />
            <text x="46" y="7" fill="var(--text-secondary)" fontSize="10" textAnchor="middle" fontFamily="system-ui">2</text>

            {/* Heading */}
            <rect x="68" y="36" width="140" height="8" rx="4" fill="var(--content-base-default)" opacity="0.7" />
            {/* Heading annotation */}
            <line x1="138" y1="36" x2="138" y2="10" stroke="var(--content-base-assistive)" strokeWidth="1" strokeDasharray="2 2" />
            <text x="138" y="7" fill="var(--text-secondary)" fontSize="10" textAnchor="middle" fontFamily="system-ui">3</text>

            {/* Description */}
            <rect x="68" y="52" width="220" height="6" rx="3" fill="var(--content-base-secondary)" opacity="0.5" />
            <rect x="68" y="62" width="160" height="6" rx="3" fill="var(--content-base-secondary)" opacity="0.5" />
            {/* Description annotation */}
            <line x1="178" y1="68" x2="178" y2="85" stroke="var(--content-base-assistive)" strokeWidth="1" strokeDasharray="2 2" />
            <text x="178" y="94" fill="var(--text-secondary)" fontSize="10" textAnchor="middle" fontFamily="system-ui">4</text>

            {/* Action */}
            <rect x="68" y="75" width="56" height="16" rx="8" fill="var(--surface-brand-secondary)" />
            <rect x="72" y="80" width="48" height="6" rx="3" fill="var(--content-brand-default)" opacity="0.6" />
            {/* Action annotation */}
            <line x1="96" y1="91" x2="96" y2="106" stroke="var(--content-base-assistive)" strokeWidth="1" strokeDasharray="2 2" />
            <text x="96" y="115" fill="var(--text-secondary)" fontSize="10" textAnchor="middle" fontFamily="system-ui">5</text>

            {/* Close button */}
            <rect x="500" y="28" width="24" height="24" rx="4" fill="var(--surface-base-alternative)" />
            <line x1="507" y1="35" x2="517" y2="45" stroke="var(--content-base-secondary)" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="517" y1="35" x2="507" y2="45" stroke="var(--content-base-secondary)" strokeWidth="1.5" strokeLinecap="round" />
            {/* Close annotation */}
            <line x1="512" y1="28" x2="512" y2="10" stroke="var(--content-base-assistive)" strokeWidth="1" strokeDasharray="2 2" />
            <text x="512" y="7" fill="var(--text-secondary)" fontSize="10" textAnchor="middle" fontFamily="system-ui">6</text>

            {/* Container annotation */}
            <line x1="20" y1="20" x2="10" y2="10" stroke="var(--content-base-assistive)" strokeWidth="1" strokeDasharray="2 2" />
            <text x="5" y="7" fill="var(--text-secondary)" fontSize="10" textAnchor="middle" fontFamily="system-ui">1</text>
          </svg>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[3], marginTop: spacing.primitive[4] }}>
          {[
            { n: 1, label: "Container", desc: "전체 너비, rounded corners, variant별 배경" },
            { n: 2, label: "Icon", desc: "Variant별 기본 아이콘 또는 커스텀 아이콘 (20×20)" },
            { n: 3, label: "Heading", desc: "굵은 제목 텍스트 (optional)" },
            { n: 4, label: "Description", desc: "본문 설명 텍스트 (optional)" },
            { n: 5, label: "Action", desc: "CTA 버튼 슬롯 (optional)" },
            { n: 6, label: "Close Button", desc: "onClose 제공 시 표시되는 X 버튼" },
          ].map(({ n, label, desc }) => (
            <div key={n} style={{ display: "flex", gap: spacing.primitive[2], alignItems: "flex-start" }}>
              <span style={{
                flexShrink: 0,
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor: "var(--surface-brand-secondary)",
                color: "var(--content-brand-default)",
                fontSize: 11,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>{n}</span>
              <div>
                <span style={{ fontSize: typography.fontSize.sm, fontWeight: 600, color: "var(--text-primary)" }}>{label}</span>
                <span style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginLeft: 6 }}>{desc}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Variants */}
      <Section title="Variants">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: spacing.primitive[4] }}>
          5가지 상태 variant로 맥락에 맞는 피드백을 제공합니다.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[3] }}>
          {(["default", "info", "success", "warning", "error"] as SectionMessageVariant[]).map((v) => (
            <div key={v} style={{ display: "flex", alignItems: "flex-start", gap: spacing.primitive[4] }}>
              <div style={{ flex: 1 }}>
                <SectionMessage
                  variant={v}
                  heading={variantHeading(v)}
                  description={variantDescription(v)}
                />
              </div>
              <div style={{ width: 120, flexShrink: 0, paddingTop: 14 }}>
                <p style={{ fontSize: typography.fontSize.sm, fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>{v}</p>
                <p style={{ fontSize: typography.fontSize.xs, color: "var(--text-secondary)", margin: "4px 0 0" }}>{variantUse(v)}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* States */}
      <Section title="States">
        <Subsection title="Interaction States">
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[4] }}>
            {/* With close */}
            <div>
              <p style={{ fontSize: typography.fontSize.sm, fontWeight: 600, color: "var(--text-primary)", marginBottom: spacing.primitive[2] }}>With Close Button</p>
              <SectionMessage
                variant="info"
                heading="업데이트가 있습니다"
                description="새로운 기능을 확인하려면 새로고침하세요."
                onClose={() => {}}
              />
            </div>
            {/* Without close */}
            <div>
              <p style={{ fontSize: typography.fontSize.sm, fontWeight: 600, color: "var(--text-primary)", marginBottom: spacing.primitive[2] }}>Without Close Button</p>
              <SectionMessage
                variant="warning"
                heading="주의사항"
                description="이 섹션의 변경 사항은 자동 저장되지 않습니다."
              />
            </div>
            {/* With action */}
            <div>
              <p style={{ fontSize: typography.fontSize.sm, fontWeight: 600, color: "var(--text-primary)", marginBottom: spacing.primitive[2] }}>With Action</p>
              <SectionMessage
                variant="error"
                heading="연결 오류"
                description="서버에 연결할 수 없습니다."
                action={<TextButton color="primary">다시 시도</TextButton>}
              />
            </div>
            {/* No heading */}
            <div>
              <p style={{ fontSize: typography.fontSize.sm, fontWeight: 600, color: "var(--text-primary)", marginBottom: spacing.primitive[2] }}>Description Only</p>
              <SectionMessage
                variant="success"
                description="변경 사항이 저장되었습니다."
              />
            </div>
          </div>
        </Subsection>
      </Section>

      {/* Usage Guidelines */}
      <Section title="Usage Guidelines">
        <Subsection title="Best Practices">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
            <DoCard>
              <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                폼 또는 페이지 섹션 내에서 컨텍스트에 맞는 피드백을 제공할 때 사용합니다.
              </p>
            </DoCard>
            <DontCard>
              <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                전역/시스템 알림에는 사용하지 마세요. AlertDialog를 사용하세요.
              </p>
            </DontCard>
            <DoCard>
              <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                제목과 함께 명확한 설명을 포함해 사용자가 상황을 이해할 수 있게 합니다.
              </p>
            </DoCard>
            <DontCard>
              <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                여러 SectionMessage를 간격 없이 연속으로 나열하지 마세요.
              </p>
            </DontCard>
          </div>
        </Subsection>
      </Section>

      {/* Design Tokens */}
      <Section title="Design Tokens">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--divider)" }}>
              {["Token", "Value", "Usage"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "8px 12px", fontWeight: 600, color: "var(--text-primary)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["surface.info.default", "grey.97 / grey.20", "info variant background"],
              ["surface.success.default", "green.95 / green.20", "success variant background"],
              ["surface.warning.default", "orange.95 / orange.20", "warning variant background"],
              ["surface.error.default", "red.95 / red.20", "error variant background"],
              ["surface.brand.secondary", "brand-95 / brand-20", "default variant background"],
              ["content.base.strong", "grey.15 / grey.99", "heading text"],
              ["content.base.secondary", "grey.50 / grey.80", "description text, close icon"],
              ["icon.info / icon.success / icon.warning / icon.error", "teal.50 / green.50 / orange.50 / red.50", "variant icon color"],
              ["radius.component.card.md", "16px", "container border radius"],
              ["spacing.primitive[4]", "16px", "container padding"],
              ["spacing.primitive[3]", "12px", "icon ↔ content gap"],
            ].map(([token, value, usage]) => (
              <tr key={token} style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "10px 12px" }}><InlineCode>{token}</InlineCode></td>
                <td style={{ padding: "10px 12px", color: "var(--text-secondary)" }}>{value}</td>
                <td style={{ padding: "10px 12px", color: "var(--text-secondary)" }}>{usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      {/* Accessibility */}
      <Section title="Accessibility">
        <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[3] }}>
          {[
            { prop: 'role="alert"', desc: 'error, warning variant에 자동 적용 — 스크린 리더가 즉시 읽음 (assertive)' },
            { prop: 'role="status"', desc: 'default, info, success variant에 자동 적용 — 현재 작업 완료 후 읽음 (polite)' },
            { prop: 'aria-live', desc: 'role에 따라 "assertive" 또는 "polite"로 자동 설정' },
            { prop: 'aria-label="닫기"', desc: '닫기 버튼에 자동 부여' },
          ].map(({ prop, desc }) => (
            <div key={prop} style={{ display: "flex", gap: spacing.primitive[3], alignItems: "flex-start" }}>
              <InlineCode>{prop}</InlineCode>
              <span style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.6 }}>{desc}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Related Components */}
      <Section title="Related Components">
        <div style={{ display: "flex", gap: spacing.primitive[3] }}>
          {[
            { name: "AlertDialog", href: "/components/feedback/alert-dialog", desc: "전역/시스템 수준의 중요 알림" },
            { name: "StateView", href: "/components/feedback/state-view", desc: "빈 상태, 오류 상태 전체 화면" },
          ].map(({ name, href, desc }) => (
            <a
              key={name}
              href={href}
              style={{
                flex: 1,
                padding: spacing.primitive[4],
                backgroundColor: "var(--surface-base-alternative)",
                borderRadius: 12,
                textDecoration: "none",
                display: "block",
              }}
            >
              <p style={{ fontSize: typography.fontSize.sm, fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>{name}</p>
              <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", margin: "4px 0 0" }}>{desc}</p>
            </a>
          ))}
        </div>
      </Section>
    </div>
  );
}

function variantHeading(v: SectionMessageVariant): string {
  switch (v) {
    case "default": return "안내 메시지";
    case "info": return "업데이트 안내";
    case "success": return "저장 완료";
    case "warning": return "주의가 필요합니다";
    case "error": return "오류가 발생했습니다";
  }
}

function variantDescription(v: SectionMessageVariant): string {
  switch (v) {
    case "default": return "확인이 필요한 일반 정보입니다.";
    case "info": return "새로운 기능이 추가되었습니다. 확인해보세요.";
    case "success": return "변경 사항이 성공적으로 저장되었습니다.";
    case "warning": return "이 작업은 되돌릴 수 없습니다. 신중하게 진행하세요.";
    case "error": return "요청을 처리하는 중 문제가 발생했습니다.";
  }
}

function variantUse(v: SectionMessageVariant): string {
  switch (v) {
    case "default": return "중립적 안내";
    case "info": return "정보성 메시지";
    case "success": return "성공/완료";
    case "warning": return "주의/경고";
    case "error": return "오류/실패";
  }
}

// ============================================
// Web Tab
// ============================================

function WebContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>

      {/* Source Code */}
      <Section title="Source Code">
        <CodeBlock
          code={`// packages/design-system/src/components/SectionMessage/SectionMessage.tsx`}
          language="tsx"
        />
      </Section>

      {/* Import */}
      <Section title="Import">
        <CodeBlock
          code={`import { SectionMessage } from "@baerae-zkap/design-system";
import type { SectionMessageVariant } from "@baerae-zkap/design-system";`}
          language="tsx"
        />
      </Section>

      {/* Basic Usage */}
      <Section title="Basic Usage">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: spacing.primitive[4] }}>
          <InlineCode>variant="info"</InlineCode>가 기본값입니다. <InlineCode>heading</InlineCode>과 <InlineCode>description</InlineCode> 중 하나 이상을 제공해야 합니다.
        </p>
        <PreviewBox>
          <div style={{ width: "100%", maxWidth: 480 }}>
            <SectionMessage
              heading="업데이트 안내"
              description="새로운 기능이 추가되었습니다. 지금 확인해보세요."
            />
          </div>
        </PreviewBox>
        <CodeBlock
          code={`<SectionMessage
  heading="업데이트 안내"
  description="새로운 기능이 추가되었습니다. 지금 확인해보세요."
/>`}
          language="tsx"
        />
      </Section>

      {/* With Action */}
      <Section title="With Action">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: spacing.primitive[4] }}>
          <InlineCode>action</InlineCode> prop으로 CTA 버튼을 추가할 수 있습니다. <InlineCode>TextButton</InlineCode> 또는 <InlineCode>Button</InlineCode>을 사용하세요.
        </p>
        <PreviewBox>
          <div style={{ width: "100%", maxWidth: 480 }}>
            <SectionMessage
              variant="warning"
              heading="미저장 변경 사항"
              description="페이지를 떠나면 변경 사항이 사라집니다."
              action={<TextButton color="primary">지금 저장하기</TextButton>}
            />
          </div>
        </PreviewBox>
        <CodeBlock
          code={`<SectionMessage
  variant="warning"
  heading="미저장 변경 사항"
  description="페이지를 떠나면 변경 사항이 사라집니다."
  action={<TextButton color="primary">지금 저장하기</TextButton>}
/>`}
          language="tsx"
        />
      </Section>

      {/* With Close Button */}
      <Section title="With Close Button">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: spacing.primitive[4] }}>
          <InlineCode>onClose</InlineCode> prop을 제공하면 우상단에 닫기 버튼이 나타납니다. 닫기 동작은 상위 컴포넌트에서 상태로 관리합니다.
        </p>
        <PreviewBox>
          <div style={{ width: "100%", maxWidth: 480 }}>
            <SectionMessage
              variant="success"
              heading="저장 완료"
              description="변경 사항이 성공적으로 저장되었습니다."
              onClose={() => {}}
            />
          </div>
        </PreviewBox>
        <CodeBlock
          code={`const [visible, setVisible] = useState(true);

{visible && (
  <SectionMessage
    variant="success"
    heading="저장 완료"
    description="변경 사항이 성공적으로 저장되었습니다."
    onClose={() => setVisible(false)}
  />
)}`}
          language="tsx"
        />
      </Section>

      {/* All Variants */}
      <Section title="All Variants">
        <PreviewBox>
          <div style={{ width: "100%", maxWidth: 480, display: "flex", flexDirection: "column", gap: spacing.primitive[3] }}>
            {(["default", "info", "success", "warning", "error"] as SectionMessageVariant[]).map((v) => (
              <SectionMessage
                key={v}
                variant={v}
                heading={variantHeading(v)}
                description={variantDescription(v)}
              />
            ))}
          </div>
        </PreviewBox>
        <CodeBlock
          code={`<SectionMessage variant="default" heading="안내 메시지" description="확인이 필요한 일반 정보입니다." />
<SectionMessage variant="info" heading="업데이트 안내" description="새로운 기능이 추가되었습니다." />
<SectionMessage variant="success" heading="저장 완료" description="변경 사항이 성공적으로 저장되었습니다." />
<SectionMessage variant="warning" heading="주의가 필요합니다" description="이 작업은 되돌릴 수 없습니다." />
<SectionMessage variant="error" heading="오류가 발생했습니다" description="요청 처리 중 문제가 발생했습니다." />`}
          language="tsx"
        />
      </Section>

      {/* API Reference */}
      <Section title="API Reference">
        <PropsTable
          props={[
            {
              name: "variant",
              type: '"default" | "info" | "success" | "warning" | "error"',
              required: false,
              defaultVal: '"info"',
              description: "상태 variant — 배경 색상과 기본 아이콘을 결정합니다.",
            },
            {
              name: "heading",
              type: "ReactNode",
              required: false,
              defaultVal: "—",
              description: "굵은 제목 텍스트. heading 또는 description 중 하나 이상 필요.",
            },
            {
              name: "description",
              type: "ReactNode",
              required: false,
              defaultVal: "—",
              description: "본문 설명 텍스트.",
            },
            {
              name: "icon",
              type: "ReactNode",
              required: false,
              defaultVal: "—",
              description: "커스텀 아이콘. 제공 시 variant 기본 아이콘을 대체합니다.",
            },
            {
              name: "action",
              type: "ReactNode",
              required: false,
              defaultVal: "—",
              description: "CTA 버튼 슬롯. TextButton 또는 Button 컴포넌트를 전달하세요.",
            },
            {
              name: "onClose",
              type: "() => void",
              required: false,
              defaultVal: "—",
              description: "제공 시 우상단에 닫기(X) 버튼이 렌더링됩니다.",
            },
          ]}
        />
      </Section>
    </div>
  );
}
