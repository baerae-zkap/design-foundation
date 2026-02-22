"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform, highlightCode } from "@/components/PlatformTabs";
import { Checkbox, typography, spacing, radius } from '@baerae-zkap/design-system';
import { Section, Subsection, InlineCode } from "@/components/docs/Section";
import { PropsTable } from "@/components/docs/PropsTable";
import { PrincipleCard, DoCard, DontCard } from "@/components/docs/Cards";
import { RadioGroup, CopyButton } from "@/components/docs/Playground";

// ─── Types ───────────────────────────────────────────────────────────
type CheckboxSize = "small" | "medium";

export default function CheckboxPage() {
  return (
    <div style={{ maxWidth: 840 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Inputs" },
          { label: "Checkbox" },
        ]}
      />

      {/* Header */}
      <h1 style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold, marginBottom: spacing.primitive[2], color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
        Checkbox
      </h1>
      <p style={{ fontSize: typography.fontSize.md, color: "var(--text-secondary)", marginBottom: spacing.primitive[8], lineHeight: 1.7 }}>
        여러 옵션 중 하나 이상을 선택하거나 해제할 때 사용합니다. 복수 선택이 가능하며, 상위-하위 계층 선택 구조를 표현할 수 있습니다.
      </p>

      {/* Interactive Playground */}
      <CheckboxPlayground />

      {/* Platform Tabs */}
      <PlatformTabs>
        {(platform) => <PlatformContent platform={platform} />}
      </PlatformTabs>
    </div>
  );
}

// ─── Playground ──────────────────────────────────────────────────────

function CheckboxPlayground() {
  const [size, setSize] = useState<CheckboxSize>("medium");
  const [disabled, setDisabled] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [hasLabel, setHasLabel] = useState(true);
  const [hasDescription, setHasDescription] = useState(false);

  const generateCode = () => {
    const props = [];
    if (size !== "medium") props.push(`size="${size}"`);
    if (disabled) props.push("disabled");
    if (invalid) props.push("invalid");
    if (indeterminate) props.push("indeterminate");
    if (hasLabel) props.push('label="이메일 수신 동의"');
    if (hasDescription) props.push('description="프로모션 및 이벤트 정보를 이메일로 받습니다."');
    if (!hasLabel) props.push('aria-label="선택"');

    const propsStr = props.length > 0 ? `\n  ${props.join("\n  ")}\n` : " ";
    return `<Checkbox${propsStr.length > 1 ? propsStr : " "}/>`;
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
            <Checkbox
              size={size}
              disabled={disabled}
              invalid={invalid}
              indeterminate={indeterminate}
              label={hasLabel ? "이메일 수신 동의" : undefined}
              description={hasDescription ? "프로모션 및 이벤트 정보를 이메일로 받습니다." : undefined}
              aria-label={!hasLabel ? "선택" : undefined}
            />
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
              {/* Size */}
              <RadioGroup
                label="Size"
                options={[
                  { value: "small", label: "Small" },
                  { value: "medium", label: "Medium" },
                ]}
                value={size}
                onChange={(v) => setSize(v as CheckboxSize)}
              />

              {/* Label */}
              <RadioGroup
                label="Label"
                options={[
                  { value: "true", label: "Show" },
                  { value: "false", label: "Hide" },
                ]}
                value={hasLabel ? "true" : "false"}
                onChange={(v) => setHasLabel(v === "true")}
              />

              {/* Description */}
              <RadioGroup
                label="Description"
                options={[
                  { value: "false", label: "Hide" },
                  { value: "true", label: "Show" },
                ]}
                value={hasDescription ? "true" : "false"}
                onChange={(v) => setHasDescription(v === "true")}
              />

              {/* Disabled */}
              <RadioGroup
                label="Disabled"
                options={[
                  { value: "false", label: "False" },
                  { value: "true", label: "True" },
                ]}
                value={disabled ? "true" : "false"}
                onChange={(v) => setDisabled(v === "true")}
              />

              {/* Invalid */}
              <RadioGroup
                label="Invalid"
                options={[
                  { value: "false", label: "False" },
                  { value: "true", label: "True" },
                ]}
                value={invalid ? "true" : "false"}
                onChange={(v) => setInvalid(v === "true")}
              />

              {/* Indeterminate */}
              <RadioGroup
                label="Indeterminate"
                options={[
                  { value: "false", label: "False" },
                  { value: "true", label: "True" },
                ]}
                value={indeterminate ? "true" : "false"}
                onChange={(v) => setIndeterminate(v === "true")}
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
          <span style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.medium, color: "var(--docs-code-active-text)" }}>Web</span>
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

// ─── Platform Content ────────────────────────────────────────────────

function PlatformContent({ platform }: { platform: Platform }) {
  if (platform === "design") {
    return <DesignContent />;
  }
  return <WebContent />;
}

// ─── Design Content ──────────────────────────────────────────────────

function DesignContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>
      {/* 1. Overview */}
      <Section title="Overview">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7 }}>
          <InlineCode>Checkbox</InlineCode> 컴포넌트는 여러 옵션 중 하나 이상을 선택하거나 해제할 때 사용합니다.
          복수 선택이 가능하며, 상위-하위 계층 선택 구조(전체 선택/부분 선택)를 표현할 수 있습니다.
        </p>
      </Section>

      {/* 2. Anatomy */}
      <Section title="Anatomy">
        <div style={{
          backgroundColor: "var(--surface-base-default)",
          borderRadius: radius.primitive.md,
          padding: `${spacing.primitive[12]}px ${spacing.primitive[10]}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <svg width="400" height="100" viewBox="0 0 400 100">
            {/* Control box */}
            <rect x="100" y="38" width="24" height="24" rx="6" fill="var(--surface-brand-default)" />
            <path d="M107 50L110.5 53.5L117 47" fill="none" stroke="var(--content-base-onColor)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />

            {/* Label text */}
            <text x="136" y="47" fill="var(--content-base-default)" fontSize={typography.fontSize.sm} fontWeight={typography.fontWeight.regular}>이메일 수신 동의</text>

            {/* Description text */}
            <text x="136" y="63" fill="var(--content-base-secondary)" fontSize={typography.fontSize.xs}>프로모션 및 이벤트 정보를 받습니다.</text>

            {/* Lines to labels */}
            <line x1="60" y1="50" x2="100" y2="50" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="100" cy="50" r="3" fill="var(--content-base-default)" />

            <line x1="200" y1="38" x2="200" y2="15" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="200" cy="38" r="3" fill="var(--content-base-default)" />

            <line x1="200" y1="62" x2="200" y2="85" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="200" cy="62" r="3" fill="var(--content-base-default)" />

            {/* Numbered circles */}
            <circle cx="45" cy="50" r="14" fill="var(--content-base-default)" />
            <text x="45" y="55" textAnchor="middle" fill="var(--content-base-onColor)" fontSize={typography.fontSize.xs} fontWeight={typography.fontWeight.semibold}>1</text>

            <circle cx="200" cy="15" r="14" fill="var(--content-base-default)" />
            <text x="200" y="20" textAnchor="middle" fill="var(--content-base-onColor)" fontSize={typography.fontSize.xs} fontWeight={typography.fontWeight.semibold}>2</text>

            <circle cx="200" cy="85" r="14" fill="var(--content-base-default)" />
            <text x="200" y="90" textAnchor="middle" fill="var(--content-base-onColor)" fontSize={typography.fontSize.xs} fontWeight={typography.fontWeight.semibold}>3</text>
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
          <div>1. Control</div>
          <div style={{ textAlign: "center" }}>2. Label</div>
          <div style={{ textAlign: "right" }}>3. Description</div>
        </div>
      </Section>

      {/* 3. Variants */}
      <Section title="Variants">
        <Subsection title="States">
          <PreviewBox>
            <div style={{ display: "flex", gap: spacing.primitive[8], alignItems: "center" }}>
              <Checkbox label="Unchecked" />
              <Checkbox checked label="Checked" />
              <Checkbox indeterminate label="Indeterminate" />
            </div>
          </PreviewBox>
        </Subsection>

        <Subsection title="Sizes">
          <PreviewBox>
            <div style={{ display: "flex", gap: spacing.primitive[8], alignItems: "center" }}>
              <div style={{ textAlign: "center" }}>
                <Checkbox size="small" label="Small" />
                <p style={{ fontSize: typography.fontSize["2xs"], color: "var(--content-base-secondary)", marginTop: spacing.primitive[2] }}>20px</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <Checkbox size="medium" label="Medium" />
                <p style={{ fontSize: typography.fontSize["2xs"], color: "var(--content-base-secondary)", marginTop: spacing.primitive[2] }}>24px</p>
              </div>
            </div>
          </PreviewBox>
        </Subsection>
      </Section>

      {/* 4. Hierarchy */}
      <Section title="Hierarchy">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: spacing.primitive[4] }}>
          상위-하위 계층 구조에서 <strong style={{ color: "var(--text-primary)" }}>Medium</strong>은 상위 계층(전체 선택),
          <strong style={{ color: "var(--text-primary)" }}> Small</strong>은 하위 계층(개별 옵션)으로 사용합니다.
        </p>
        <PreviewBox>
          <HierarchyDemo />
        </PreviewBox>
      </Section>

      {/* 5. States */}
      <Section title="States">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          Checkbox의 다양한 상태를 확인할 수 있습니다.
        </p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: spacing.primitive[4],
          padding: spacing.primitive[6],
          backgroundColor: "var(--surface-base-alternative)",
          borderRadius: radius.primitive.md,
        }}>
          <StatePreview label="Unchecked" sublabel="기본 상태">
            <Checkbox aria-label="unchecked" />
          </StatePreview>
          <StatePreview label="Checked" sublabel="선택됨">
            <Checkbox checked aria-label="checked" />
          </StatePreview>
          <StatePreview label="Indeterminate" sublabel="부분 선택">
            <Checkbox indeterminate aria-label="indeterminate" />
          </StatePreview>
          <StatePreview label="Invalid" sublabel="유효성 오류">
            <Checkbox invalid aria-label="invalid" />
          </StatePreview>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: spacing.primitive[4],
          padding: spacing.primitive[6],
          backgroundColor: "var(--surface-base-alternative)",
          borderRadius: radius.primitive.md,
          marginTop: spacing.primitive[2],
        }}>
          <StatePreview label="Disabled (off)" sublabel="비활성화">
            <Checkbox disabled aria-label="disabled off" />
          </StatePreview>
          <StatePreview label="Disabled (on)" sublabel="비활성화+선택">
            <Checkbox checked disabled aria-label="disabled on" />
          </StatePreview>
          <StatePreview label="Disabled (mixed)" sublabel="비활성화+부분">
            <Checkbox indeterminate disabled aria-label="disabled mixed" />
          </StatePreview>
          <StatePreview label="Invalid (checked)" sublabel="오류+선택">
            <Checkbox checked invalid aria-label="invalid checked" />
          </StatePreview>
        </div>

        <Subsection title="Interaction States">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: spacing.primitive[4] }}>
            Checkbox는 호버, 누름 등 인터랙션 상태를 시각적으로 구분합니다. 직접 마우스를 올려 확인해보세요.
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: spacing.primitive[4],
            padding: spacing.primitive[6],
            backgroundColor: "var(--surface-base-alternative)",
            borderRadius: radius.primitive.md,
          }}>
            <InteractionStateCard label="Default" sublabel="기본 상태" bgColor="var(--surface-base-default)" borderColor="var(--border-base-default)" />
            <InteractionStateCard label="Hover" sublabel="마우스 오버" bgColor="var(--surface-base-alternative)" borderColor="var(--border-base-default)" />
            <InteractionStateCard label="Checked" sublabel="선택됨" bgColor="var(--surface-brand-default)" borderColor="transparent" isChecked />
            <InteractionStateCard label="Indeterminate" sublabel="부분 선택" bgColor="var(--surface-brand-default)" borderColor="transparent" isIndeterminate />
            <InteractionStateCard label="Invalid" sublabel="유효성 오류" bgColor="var(--surface-base-default)" borderColor="var(--border-error-default)" />
            <InteractionStateCard label="Disabled" sublabel="비활성화" bgColor="var(--surface-base-default)" borderColor="var(--border-base-default)" opacity={0.4} />
          </div>
        </Subsection>
      </Section>

      {/* 6. Usage Guidelines */}
      <Section title="Usage Guidelines">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          Checkbox는 <strong style={{ color: "var(--text-primary)" }}>목록에서 다중 선택</strong> 패턴에 사용합니다.
          단일 확인/동의에는 CheckMark를 사용하세요.
        </p>

        <Subsection title="Best Practices">
          <div style={{ display: "grid", gap: spacing.primitive[5] }}>
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <DoCard>
                  <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
                    <Checkbox checked label="사과" />
                    <Checkbox checked label="바나나" />
                    <Checkbox label="딸기" />
                  </div>
                </DoCard>
                <DontCard>
                  <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
                    <Checkbox checked label="이용약관에 동의합니다" />
                    <Checkbox label="개인정보 처리방침에 동의합니다" />
                  </div>
                </DontCard>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> 목록에서 다중 선택 패턴으로 사용합니다
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0, fontStyle: "italic" }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Don&apos;t</span> 약관 동의에는 CheckMark를 사용합니다
                </p>
              </div>
            </div>

            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <DoCard>
                  <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
                    <Checkbox label="Control을 왼쪽에 배치" />
                  </div>
                </DoCard>
                <DontCard>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: typography.fontSize.md, color: "var(--content-base-default)" }}>Control을 오른쪽에 배치</span>
                    <Checkbox aria-label="오른쪽 배치" />
                  </div>
                </DontCard>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> Control은 항상 레이블 왼쪽에 배치합니다
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0, fontStyle: "italic" }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Don&apos;t</span> Control을 오른쪽에 배치하지 않습니다
                </p>
              </div>
            </div>
          </div>
        </Subsection>
      </Section>

      {/* 7. Design Tokens */}
      <Section title="Design Tokens">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          Checkbox 컴포넌트에 적용된 Foundation 기반 디자인 토큰입니다.
        </p>

        <Subsection title="Control 토큰">
          <div style={{ overflow: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.compact }}>
              <thead>
                <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                  <th style={thStyle}>Property</th>
                  <th style={thStyle}>Small</th>
                  <th style={thStyle}>Medium</th>
                </tr>
              </thead>
              <tbody>
                <tr style={trBorder}>
                  <td style={tdStyle}>Control Size</td>
                  <td style={tdMono}>20px</td>
                  <td style={tdMono}>24px</td>
                </tr>
                <tr style={trBorder}>
                  <td style={tdStyle}>Border Radius</td>
                  <td style={tdMono}>6px (segmentedControl.segment)</td>
                  <td style={tdMono}>6px (segmentedControl.segment)</td>
                </tr>
                <tr style={trBorder}>
                  <td style={tdStyle}>Border Width</td>
                  <td style={tdMono}>1.5px (borderWidth.medium)</td>
                  <td style={tdMono}>1.5px (borderWidth.medium)</td>
                </tr>
                <tr>
                  <td style={tdStyle}>Check Icon</td>
                  <td style={tdMono}>10x7</td>
                  <td style={tdMono}>12x9</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Color 토큰">
          <div style={{ overflow: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.compact }}>
              <thead>
                <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                  <th style={thStyle}>State</th>
                  <th style={thStyle}>Token</th>
                  <th style={thStyle}>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr style={trBorder}>
                  <td style={tdStyle}>Unchecked Background</td>
                  <td style={tdStyle}><InlineCode>surface.base.default</InlineCode></td>
                  <td style={tdMono}>var(--surface-base-default)</td>
                </tr>
                <tr style={trBorder}>
                  <td style={tdStyle}>Unchecked Border</td>
                  <td style={tdStyle}><InlineCode>border.base.default</InlineCode></td>
                  <td style={tdMono}>var(--border-base-default)</td>
                </tr>
                <tr style={trBorder}>
                  <td style={tdStyle}>Checked Background</td>
                  <td style={tdStyle}><InlineCode>surface.brand.default</InlineCode></td>
                  <td style={tdMono}>var(--surface-brand-default)</td>
                </tr>
                <tr style={trBorder}>
                  <td style={tdStyle}>Checkmark Color</td>
                  <td style={tdStyle}><InlineCode>inverse.content.default</InlineCode></td>
                  <td style={tdMono}>var(--inverse-content-default)</td>
                </tr>
                <tr style={trBorder}>
                  <td style={tdStyle}>Invalid Border</td>
                  <td style={tdStyle}><InlineCode>border.error.default</InlineCode></td>
                  <td style={tdMono}>var(--border-error-default)</td>
                </tr>
                <tr style={trBorder}>
                  <td style={tdStyle}>Label Color</td>
                  <td style={tdStyle}><InlineCode>content.base.default</InlineCode></td>
                  <td style={tdMono}>var(--content-base-default)</td>
                </tr>
                <tr style={trBorder}>
                  <td style={tdStyle}>Description Color</td>
                  <td style={tdStyle}><InlineCode>content.base.secondary</InlineCode></td>
                  <td style={tdMono}>var(--content-base-secondary)</td>
                </tr>
                <tr>
                  <td style={tdStyle}>Disabled Opacity</td>
                  <td style={tdStyle}><InlineCode>0.4</InlineCode></td>
                  <td style={tdMono}>opacity: 0.4</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Spacing">
          <div style={{ overflow: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.compact }}>
              <thead>
                <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                  <th style={thStyle}>Property</th>
                  <th style={thStyle}>Token</th>
                  <th style={thStyle}>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr style={trBorder}>
                  <td style={tdStyle}>Control-Label Gap</td>
                  <td style={tdStyle}><InlineCode>spacing.primitive[2]</InlineCode></td>
                  <td style={tdMono}>8px</td>
                </tr>
                <tr style={trBorder}>
                  <td style={tdStyle}>Label-Description Gap</td>
                  <td style={tdStyle}><InlineCode>spacing.primitive[1]</InlineCode></td>
                  <td style={tdMono}>4px</td>
                </tr>
                <tr>
                  <td style={tdStyle}>Transition</td>
                  <td style={tdStyle}><InlineCode>transitions.all</InlineCode></td>
                  <td style={tdMono}>background-color, color, border-color 200ms ease-out</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>
      </Section>

      {/* 8. Accessibility */}
      <Section title="Accessibility">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          Checkbox는 네이티브 <InlineCode>&lt;input type=&quot;checkbox&quot;&gt;</InlineCode>를 사용하여 완전한 접근성을 보장합니다.
        </p>

        <div style={{ overflow: "auto", marginBottom: spacing.primitive[6] }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={thStyle}>속성</th>
                <th style={thStyle}>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ ...tdStyle, borderBottom: "1px solid var(--divider)" }}><InlineCode>&lt;input type=&quot;checkbox&quot;&gt;</InlineCode></td>
                <td style={{ ...tdMono, borderBottom: "1px solid var(--divider)" }}>네이티브 체크박스로 스크린 리더 완벽 지원</td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, borderBottom: "1px solid var(--divider)" }}><InlineCode>aria-checked=&quot;mixed&quot;</InlineCode></td>
                <td style={{ ...tdMono, borderBottom: "1px solid var(--divider)" }}>indeterminate 상태를 보조 기술에 전달</td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, borderBottom: "1px solid var(--divider)" }}><InlineCode>aria-invalid</InlineCode></td>
                <td style={{ ...tdMono, borderBottom: "1px solid var(--divider)" }}>유효성 오류 상태를 보조 기술에 전달</td>
              </tr>
              <tr>
                <td style={tdStyle}><InlineCode>aria-label</InlineCode></td>
                <td style={tdMono}>label이 없는 경우 반드시 aria-label 제공</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Subsection title="Keyboard Interaction">
          <div style={{ overflow: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
              <thead>
                <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                  <th style={thStyle}>키</th>
                  <th style={thStyle}>동작</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ ...tdStyle, borderBottom: "1px solid var(--divider)" }}>
                    <kbd style={kbdStyle}>Tab</kbd>
                  </td>
                  <td style={{ ...tdMono, borderBottom: "1px solid var(--divider)" }}>Checkbox로 포커스 이동</td>
                </tr>
                <tr>
                  <td style={{ ...tdStyle, borderBottom: "1px solid var(--divider)" }}>
                    <kbd style={kbdStyle}>Space</kbd>
                  </td>
                  <td style={{ ...tdMono, borderBottom: "1px solid var(--divider)" }}>체크 상태 토글</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Design Principles">
          <div style={{ display: "grid", gap: spacing.primitive[4] }}>
            <PrincipleCard
              number={1}
              title="네이티브 체크박스 기반"
              desc="숨겨진 네이티브 input을 사용하여 스크린 리더, 키보드 네비게이션, 폼 제출 등 모든 브라우저 접근성을 자동으로 지원합니다."
            />
            <PrincipleCard
              number={2}
              title="Label 연결"
              desc="label 요소로 감싸서 텍스트 클릭으로도 체크 가능합니다. label이 없는 경우 aria-label을 반드시 제공해야 합니다."
            />
            <PrincipleCard
              number={3}
              title="Indeterminate 상태 전달"
              desc="aria-checked='mixed'를 통해 반결정 상태를 보조 기술에 정확히 전달합니다."
            />
          </div>
        </Subsection>
      </Section>

      {/* 9. Related Components */}
      <Section title="Related Components">
        <div style={{ overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={thStyle}>컴포넌트</th>
                <th style={thStyle}>용도</th>
                <th style={thStyle}>차이점</th>
              </tr>
            </thead>
            <tbody>
              <tr style={trBorder}>
                <td style={{ ...tdStyle, fontWeight: typography.fontWeight.medium }}>CheckMark</td>
                <td style={{ ...tdStyle, color: "var(--text-secondary)" }}>약관 동의/확인</td>
                <td style={{ ...tdStyle, color: "var(--text-secondary)" }}>CheckMark은 확인/동의용, Checkbox는 목록 선택용</td>
              </tr>
              <tr style={trBorder}>
                <td style={{ ...tdStyle, fontWeight: typography.fontWeight.medium }}>Switch</td>
                <td style={{ ...tdStyle, color: "var(--text-secondary)" }}>즉시 반영되는 On/Off 토글</td>
                <td style={{ ...tdStyle, color: "var(--text-secondary)" }}>Checkbox는 폼 제출, Switch는 즉시 효과</td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, fontWeight: typography.fontWeight.medium }}>Radio</td>
                <td style={{ ...tdStyle, color: "var(--text-secondary)" }}>그룹에서 하나 선택</td>
                <td style={{ ...tdStyle, color: "var(--text-secondary)" }}>Checkbox는 복수 선택, Radio는 배타적 단일 선택</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}

// ─── Web Content ─────────────────────────────────────────────────────

function WebContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>
      {/* 1. Source Code */}
      <Section title="Source Code">
        <div style={{ padding: spacing.primitive[4], backgroundColor: "var(--surface-base-default)", borderLeft: "1px solid var(--border-solid-alternative)", borderRadius: radius.primitive.md, marginBottom: spacing.primitive[6], display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)", margin: 0 }}>Checkbox Component</p>
            <p style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", margin: "4px 0 0 0" }}>실제 컴포넌트 소스 코드를 GitHub에서 확인하세요.</p>
          </div>
          <a
            href="https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system/src/components/Checkbox/Checkbox.tsx"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: spacing.primitive[1],
              padding: `${spacing.primitive[2]}px ${spacing.primitive[4]}px`,
              fontSize: typography.fontSize.compact,
              fontWeight: typography.fontWeight.medium,
              color: "white",
              backgroundColor: "var(--inverse-surface-default)",
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

      {/* 2. Import */}
      <Section title="Import">
        <CodeBlock code={`import { Checkbox } from '@baerae-zkap/design-system';`} />
      </Section>

      {/* 3. Basic Usage */}
      <Section title="Basic Usage">
        <PreviewBox>
          <Checkbox label="이메일 수신 동의" />
        </PreviewBox>
        <CodeBlock code={`<Checkbox label="이메일 수신 동의" />`} />
      </Section>

      {/* 4. Controlled */}
      <Section title="Controlled">
        <PreviewBox>
          <ControlledDemo />
        </PreviewBox>
        <CodeBlock code={`const [checked, setChecked] = useState(false);

<Checkbox
  checked={checked}
  onChange={setChecked}
  label="알림 수신 동의"
/>`} />
      </Section>

      {/* 5. With Description */}
      <Section title="With Description">
        <PreviewBox>
          <Checkbox
            label="마케팅 수신 동의"
            description="프로모션 및 이벤트 정보를 이메일로 받습니다."
          />
        </PreviewBox>
        <CodeBlock code={`<Checkbox
  label="마케팅 수신 동의"
  description="프로모션 및 이벤트 정보를 이메일로 받습니다."
/>`} />
      </Section>

      {/* 6. Multi-Select List */}
      <Section title="Multi-Select List Example">
        <PreviewBox>
          <MultiSelectDemo />
        </PreviewBox>
        <CodeBlock code={`const [items, setItems] = useState({
  apple: false,
  banana: false,
  strawberry: false,
});

const allChecked = Object.values(items).every(Boolean);
const someChecked = Object.values(items).some(Boolean);

const toggleAll = (checked: boolean) => {
  setItems({ apple: checked, banana: checked, strawberry: checked });
};

<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
  <Checkbox
    checked={allChecked}
    indeterminate={someChecked && !allChecked}
    onChange={toggleAll}
    label="전체 선택"
  />
  <div style={{ borderTop: '1px solid var(--divider)', paddingTop: 8 }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingLeft: 32 }}>
      <Checkbox checked={items.apple} onChange={(c) => setItems(p => ({...p, apple: c}))} label="사과" size="small" />
      <Checkbox checked={items.banana} onChange={(c) => setItems(p => ({...p, banana: c}))} label="바나나" size="small" />
      <Checkbox checked={items.strawberry} onChange={(c) => setItems(p => ({...p, strawberry: c}))} label="딸기" size="small" />
    </div>
  </div>
</div>`} />
      </Section>

      {/* 7. API Reference */}
      <Section title="API Reference">
        <PropsTable
          props={[
            { name: "checked", type: "boolean", required: false, description: "체크 상태 (제어 모드)" },
            { name: "defaultChecked", type: "boolean", required: false, defaultVal: "false", description: "초기 체크 상태 (비제어 모드)" },
            { name: "onChange", type: "(checked: boolean) => void", required: false, description: "상태 변경 콜백" },
            { name: "label", type: "ReactNode", required: false, description: "레이블" },
            { name: "description", type: "ReactNode", required: false, description: "레이블 아래 설명" },
            { name: "size", type: '"small" | "medium"', required: false, defaultVal: '"medium"', description: "크기" },
            { name: "disabled", type: "boolean", required: false, defaultVal: "false", description: "비활성화" },
            { name: "invalid", type: "boolean", required: false, defaultVal: "false", description: "유효성 오류 상태" },
            { name: "indeterminate", type: "boolean", required: false, defaultVal: "false", description: "반결정 상태 (부분 선택)" },
            { name: "indeterminateIcon", type: "ReactNode", required: false, description: "반결정 상태 커스텀 아이콘" },
            { name: "aria-label", type: "string", required: false, description: "접근성 레이블 (label 없을 때 필수)" },
            { name: "id", type: "string", required: false, description: "input 요소의 id" },
          ]}
        />
      </Section>
    </div>
  );
}

// ─── Demo Components ─────────────────────────────────────────────────

function ControlledDemo() {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      checked={checked}
      onChange={setChecked}
      label="알림 수신 동의"
    />
  );
}

function HierarchyDemo() {
  const [items, setItems] = useState({ apple: true, banana: false, strawberry: false });

  const allChecked = Object.values(items).every(Boolean);
  const someChecked = Object.values(items).some(Boolean);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.primitive[2] }}>
      <Checkbox
        checked={allChecked}
        indeterminate={someChecked && !allChecked}
        onChange={(checked) => {
          setItems({ apple: checked, banana: checked, strawberry: checked });
        }}
        label="전체 선택"
      />
      <div style={{ borderTop: '1px solid var(--divider)', paddingTop: spacing.primitive[2] }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.primitive[1], paddingLeft: spacing.primitive[8] }}>
          <Checkbox checked={items.apple} onChange={(c) => setItems(p => ({ ...p, apple: c }))} label="사과" size="small" />
          <Checkbox checked={items.banana} onChange={(c) => setItems(p => ({ ...p, banana: c }))} label="바나나" size="small" />
          <Checkbox checked={items.strawberry} onChange={(c) => setItems(p => ({ ...p, strawberry: c }))} label="딸기" size="small" />
        </div>
      </div>
    </div>
  );
}

function MultiSelectDemo() {
  const [items, setItems] = useState({ apple: false, banana: false, strawberry: false });

  const allChecked = Object.values(items).every(Boolean);
  const someChecked = Object.values(items).some(Boolean);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.primitive[2] }}>
      <Checkbox
        checked={allChecked}
        indeterminate={someChecked && !allChecked}
        onChange={(checked) => {
          setItems({ apple: checked, banana: checked, strawberry: checked });
        }}
        label="전체 선택"
      />
      <div style={{ borderTop: '1px solid var(--divider)', paddingTop: spacing.primitive[2] }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.primitive[1], paddingLeft: spacing.primitive[8] }}>
          <Checkbox checked={items.apple} onChange={(c) => setItems(p => ({ ...p, apple: c }))} label="사과" size="small" />
          <Checkbox checked={items.banana} onChange={(c) => setItems(p => ({ ...p, banana: c }))} label="바나나" size="small" />
          <Checkbox checked={items.strawberry} onChange={(c) => setItems(p => ({ ...p, strawberry: c }))} label="딸기" size="small" />
        </div>
      </div>
    </div>
  );
}

// ─── UI Helpers ──────────────────────────────────────────────────────

function StatePreview({ label, sublabel, children }: { label: string; sublabel: string; children: React.ReactNode }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: spacing.primitive[3],
      padding: spacing.primitive[4],
    }}>
      <div style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: spacing.primitive[12],
      }}>
        {children}
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.medium, color: "var(--text-primary)" }}>{label}</div>
        <div style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", marginTop: 2 }}>{sublabel}</div>
      </div>
    </div>
  );
}

function InteractionStateCard({ label, sublabel, bgColor, borderColor, isChecked, isIndeterminate, opacity: opacityVal }: {
  label: string; sublabel: string; bgColor: string; borderColor: string; isChecked?: boolean; isIndeterminate?: boolean; opacity?: number;
}) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[3], padding: spacing.primitive[4],
    }}>
      <div style={{
        width: 24,
        height: 24,
        borderRadius: 6,
        backgroundColor: bgColor,
        border: borderColor !== "transparent" ? `1.5px solid ${borderColor}` : "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: opacityVal ?? 1,
        boxSizing: "border-box" as const,
      }}>
        {isChecked && (
          <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
            <path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {isIndeterminate && (
          <svg width="10" height="2" viewBox="0 0 10 2" fill="none">
            <path d="M1 1H9" stroke="white" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
        )}
      </div>
      <span style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", textAlign: "center" }}>{sublabel}</span>
    </div>
  );
}

// ─── Shared Styles ───────────────────────────────────────────────────

const thStyle: React.CSSProperties = {
  padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`,
  textAlign: "left" as const,
  fontWeight: typography.fontWeight.semibold,
  fontSize: typography.fontSize.compact,
  borderBottom: "1px solid var(--divider)",
};

const tdStyle: React.CSSProperties = {
  padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`,
};

const tdMono: React.CSSProperties = {
  padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`,
  fontFamily: "monospace",
  color: "var(--text-secondary)",
};

const trBorder: React.CSSProperties = {
  borderBottom: "1px solid var(--divider)",
};

const kbdStyle: React.CSSProperties = {
  padding: "2px 6px",
  backgroundColor: "var(--surface-base-alternative)",
  borderRadius: radius.primitive.xs,
  fontSize: typography.fontSize.xs,
};
