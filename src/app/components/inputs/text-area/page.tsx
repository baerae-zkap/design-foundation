"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform, highlightCode } from "@/components/PlatformTabs";
import { typography, spacing, radius, TextArea } from '@baerae-zkap/design-system';
import { Section, Subsection, InlineCode } from "@/components/docs/Section";
import { PropsTable } from "@/components/docs/PropsTable";
import { DoCard, DontCard, PrincipleCard } from "@/components/docs/Cards";
import { RadioGroup, CopyButton } from "@/components/docs/Playground";

// ─── Page ─────────────────────────────────────────────────────────────

export default function TextAreaPage() {
  return (
    <div style={{ maxWidth: 840 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Inputs" },
          { label: "Text Area" },
        ]}
      />

      {/* Header */}
      <h1 style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold, marginBottom: spacing.primitive[2], color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
        Text Area
      </h1>
      <p style={{ fontSize: typography.fontSize.md, color: "var(--text-secondary)", marginBottom: spacing.primitive[8], lineHeight: 1.7 }}>
        여러 줄의 텍스트 입력에 사용합니다. 소개글, 코멘트, 피드백처럼 한 줄을 초과하는 내용에 적합합니다.
      </p>

      {/* Interactive Playground */}
      <TextAreaPlayground />

      {/* Platform Tabs */}
      <PlatformTabs>
        {(platform) => <PlatformContent platform={platform} />}
      </PlatformTabs>
    </div>
  );
}

// ─── Playground ──────────────────────────────────────────────────────

function TextAreaPlayground() {
  const [label, setLabel] = useState(true);
  const [placeholder, setPlaceholder] = useState(true);
  const [maxLength, setMaxLength] = useState(false);
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState("");

  const generateCode = () => {
    const props: string[] = [];
    if (label) props.push('label="소개"');
    if (placeholder) props.push('placeholder="자신을 소개해주세요."');
    if (maxLength) props.push("maxLength={200}");
    if (error) props.push('error="200자를 초과할 수 없습니다."');
    if (disabled) props.push("disabled");
    props.push("rows={4}");

    const propsStr = props.length > 0 ? `\n  ${props.join("\n  ")}\n` : " ";
    return `<TextArea${propsStr}/>`;
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
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", minHeight: 480 }}>
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
            <div style={{ width: "100%", maxWidth: 320 }}>
              <TextArea
                label={label ? "소개" : undefined}
                placeholder={placeholder ? "자신을 소개해주세요." : undefined}
                maxLength={maxLength ? 200 : undefined}
                error={error ? "200자를 초과할 수 없습니다." : undefined}
                disabled={disabled}
                value={value}
                onChange={setValue}
                rows={4}
              />
            </div>
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
              <RadioGroup
                label="Label"
                options={[
                  { value: "true", label: "Show" },
                  { value: "false", label: "Hide" },
                ]}
                value={label ? "true" : "false"}
                onChange={(v) => setLabel(v === "true")}
              />
              <RadioGroup
                label="Placeholder"
                options={[
                  { value: "true", label: "Show" },
                  { value: "false", label: "Hide" },
                ]}
                value={placeholder ? "true" : "false"}
                onChange={(v) => setPlaceholder(v === "true")}
              />
              <RadioGroup
                label="Max Length"
                options={[
                  { value: "false", label: "None" },
                  { value: "true", label: "200" },
                ]}
                value={maxLength ? "true" : "false"}
                onChange={(v) => setMaxLength(v === "true")}
              />
              <RadioGroup
                label="Error"
                options={[
                  { value: "false", label: "False" },
                  { value: "true", label: "True" },
                ]}
                value={error ? "true" : "false"}
                onChange={(v) => setError(v === "true")}
              />
              <RadioGroup
                label="Disabled"
                options={[
                  { value: "false", label: "False" },
                  { value: "true", label: "True" },
                ]}
                value={disabled ? "true" : "false"}
                onChange={(v) => setDisabled(v === "true")}
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
  if (platform === "design") return <DesignContent />;
  return <WebContent />;
}

// ─── Design Content ──────────────────────────────────────────────────

function DesignContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>
      {/* 1. Overview */}
      <Section title="Overview">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7 }}>
          <InlineCode>TextArea</InlineCode>는 여러 줄 텍스트 입력을 위한 컴포넌트입니다. 소개글, 댓글, 피드백처럼
          한 줄을 초과하는 자유형 텍스트에 사용합니다. 단일 행 입력에는 <InlineCode>TextField</InlineCode>를,
          검색에는 <InlineCode>SearchField</InlineCode>를 사용하세요.
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
          <svg width="480" height="180" viewBox="0 0 480 180">
            {/* Label */}
            <text x="120" y="28" fill="var(--content-base-default)" fontSize={13} fontWeight="500">소개</text>

            {/* Textarea container */}
            <rect x="120" y="40" width="240" height="96" rx="8" fill="var(--surface-base-default)" stroke="var(--border-base-default)" strokeWidth="1.5" />

            {/* Placeholder text */}
            <text x="136" y="66" fill="var(--content-base-placeholder)" fontSize={13}>자신을 소개해주세요.</text>

            {/* Resize handle indicator */}
            <line x1="344" y1="124" x2="356" y2="112" stroke="var(--border-base-default)" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="348" y1="130" x2="360" y2="118" stroke="var(--border-base-default)" strokeWidth="1.5" strokeLinecap="round" />

            {/* Helper text */}
            <text x="120" y="154" fill="var(--content-base-secondary)" fontSize={11}>최대 200자까지 입력할 수 있습니다.</text>

            {/* Character count */}
            <text x="320" y="154" fill="var(--content-base-secondary)" fontSize={11}>0/200</text>

            {/* Callout lines + numbers */}
            {/* 1 Label */}
            <line x1="75" y1="28" x2="118" y2="28" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="118" cy="28" r="3" fill="var(--content-base-default)" />
            <circle cx="60" cy="28" r="14" fill="var(--content-base-default)" />
            <text x="60" y="33" textAnchor="middle" fill="white" fontSize={11} fontWeight="600">1</text>

            {/* 2 Container */}
            <line x1="75" y1="88" x2="118" y2="88" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="118" cy="88" r="3" fill="var(--content-base-default)" />
            <circle cx="60" cy="88" r="14" fill="var(--content-base-default)" />
            <text x="60" y="93" textAnchor="middle" fill="white" fontSize={11} fontWeight="600">2</text>

            {/* 3 Placeholder */}
            <line x1="210" y1="66" x2="210" y2="20" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="210" cy="66" r="3" fill="var(--content-base-default)" />
            <circle cx="210" cy="14" r="14" fill="var(--content-base-default)" />
            <text x="210" y="19" textAnchor="middle" fill="white" fontSize={11} fontWeight="600">3</text>

            {/* 4 Resize handle */}
            <line x1="360" y1="120" x2="410" y2="100" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="358" cy="121" r="3" fill="var(--content-base-default)" />
            <circle cx="420" cy="96" r="14" fill="var(--content-base-default)" />
            <text x="420" y="101" textAnchor="middle" fill="white" fontSize={11} fontWeight="600">4</text>

            {/* 5 Helper text */}
            <line x1="200" y1="154" x2="200" y2="168" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="200" cy="154" r="3" fill="var(--content-base-default)" />
            <circle cx="200" cy="175" r="14" fill="var(--content-base-default)" />
            <text x="200" y="180" textAnchor="middle" fill="white" fontSize={11} fontWeight="600">5</text>

            {/* 6 Character count */}
            <line x1="338" y1="154" x2="338" y2="168" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="338" cy="154" r="3" fill="var(--content-base-default)" />
            <circle cx="338" cy="175" r="14" fill="var(--content-base-default)" />
            <text x="338" y="180" textAnchor="middle" fill="white" fontSize={11} fontWeight="600">6</text>
          </svg>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: spacing.primitive[3],
          marginTop: spacing.primitive[5],
          fontSize: typography.fontSize.sm,
          fontWeight: typography.fontWeight.medium,
          color: "var(--text-primary)",
        }}>
          <div>1. Label</div>
          <div style={{ textAlign: "center" }}>2. Textarea container</div>
          <div style={{ textAlign: "right" }}>3. Placeholder</div>
          <div>4. Resize handle</div>
          <div style={{ textAlign: "center" }}>5. Helper text</div>
          <div style={{ textAlign: "right" }}>6. Character count</div>
        </div>
      </Section>

      {/* 3. Variants */}
      <Section title="Variants">
        <Subsection title="Default">
          <PreviewBox>
            <div style={{ width: "100%", maxWidth: 360 }}>
              <TextArea label="소개" placeholder="자신을 소개해주세요." rows={3} />
            </div>
          </PreviewBox>
        </Subsection>

        <Subsection title="With Character Counter">
          <PreviewBox>
            <div style={{ width: "100%", maxWidth: 360 }}>
              <CharCounterDemo />
            </div>
          </PreviewBox>
        </Subsection>

        <Subsection title="Error">
          <PreviewBox>
            <div style={{ width: "100%", maxWidth: 360 }}>
              <TextArea
                label="피드백"
                value="아주 짧은"
                error="최소 20자 이상 입력해주세요."
                rows={3}
              />
            </div>
          </PreviewBox>
        </Subsection>

        <Subsection title="Disabled">
          <PreviewBox>
            <div style={{ width: "100%", maxWidth: 360 }}>
              <TextArea
                label="소개"
                value="편집할 수 없는 내용입니다."
                disabled
                rows={3}
              />
            </div>
          </PreviewBox>
        </Subsection>
      </Section>

      {/* 4. States */}
      <Section title="States">
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: spacing.primitive[4],
          padding: spacing.primitive[6],
          backgroundColor: "var(--surface-base-alternative)",
          borderRadius: radius.primitive.md,
        }}>
          <StatePreview label="Default" sublabel="기본 상태">
            <MiniTextArea borderColor="var(--border-base-default)" />
          </StatePreview>
          <StatePreview label="Focused" sublabel="입력 중">
            <MiniTextArea borderColor="var(--border-brand-default)" />
          </StatePreview>
          <StatePreview label="Filled" sublabel="입력 완료">
            <MiniTextArea borderColor="var(--border-base-default)" hasText />
          </StatePreview>
          <StatePreview label="Error" sublabel="유효성 오류">
            <MiniTextArea borderColor="var(--border-error-default)" hasText />
          </StatePreview>
          <StatePreview label="Disabled" sublabel="비활성화">
            <MiniTextArea borderColor="var(--border-base-default)" disabled />
          </StatePreview>
          <StatePreview label="Disabled (filled)" sublabel="비활성화+입력">
            <MiniTextArea borderColor="var(--border-base-default)" disabled hasText />
          </StatePreview>
        </div>

        <Subsection title="Interaction States">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: spacing.primitive[4] }}>
            TextArea는 포커스, 입력, 오류, 비활성화 등 다양한 상태를 보더 색상으로 구분합니다.
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: spacing.primitive[4],
            padding: spacing.primitive[6],
            backgroundColor: "var(--surface-base-alternative)",
            borderRadius: radius.primitive.md,
          }}>
            <InteractionCard label="Default" sublabel="기본" borderColor="var(--border-base-default)" bg="var(--surface-base-default)" />
            <InteractionCard label="Focused" sublabel="포커스" borderColor="var(--border-brand-default)" bg="var(--surface-base-default)" />
            <InteractionCard label="Error" sublabel="오류" borderColor="var(--border-error-default)" bg="var(--surface-base-default)" />
            <InteractionCard label="Disabled" sublabel="비활성화" borderColor="var(--border-base-default)" bg="var(--surface-base-alternative)" opacity={0.5} />
          </div>
        </Subsection>
      </Section>

      {/* 5. Usage Guidelines */}
      <Section title="Usage Guidelines">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          TextArea는 <strong style={{ color: "var(--text-primary)" }}>한 줄을 초과하는 자유형 텍스트 입력</strong>에 사용합니다.
          단일 행 입력이라면 TextField를 사용하세요.
        </p>

        <Subsection title="Best Practices">
          <div style={{ display: "grid", gap: spacing.primitive[5] }}>
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <DoCard>
                  <div style={{ fontSize: typography.fontSize.sm, color: "var(--content-base-default)" }}>
                    <p style={{ margin: 0, fontWeight: 500 }}>소개</p>
                    <div style={{ marginTop: 8, padding: "8px 12px", border: "1.5px solid var(--border-base-default)", borderRadius: 8, backgroundColor: "var(--surface-base-default)", fontSize: 13, color: "var(--content-base-placeholder)", minHeight: 56 }}>
                      자신을 소개해주세요.
                    </div>
                    <p style={{ margin: "4px 0 0", fontSize: 11, color: "var(--content-base-secondary)" }}>바이오, 설명, 피드백에 사용</p>
                  </div>
                </DoCard>
                <DontCard>
                  <div style={{ fontSize: typography.fontSize.sm, color: "var(--content-base-default)" }}>
                    <p style={{ margin: 0, fontWeight: 500 }}>이름</p>
                    <div style={{ marginTop: 8, padding: "8px 12px", border: "1.5px solid var(--border-base-default)", borderRadius: 8, backgroundColor: "var(--surface-base-default)", fontSize: 13, color: "var(--content-base-placeholder)", minHeight: 56 }}>
                      이름을 입력하세요.
                    </div>
                    <p style={{ margin: "4px 0 0", fontSize: 11, color: "var(--content-error-default)" }}>단일 행에는 TextField 사용</p>
                  </div>
                </DontCard>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> 여러 줄이 예상되는 자유형 입력에 사용합니다
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0, fontStyle: "italic" }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Don&apos;t</span> 이름·이메일 같은 단일 행 필드에 사용하지 않습니다
                </p>
              </div>
            </div>

            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <DoCard>
                  <div style={{ fontSize: typography.fontSize.sm }}>
                    <p style={{ margin: "0 0 8px", fontWeight: 500 }}>백엔드 제한 시 maxLength 제공</p>
                    <code style={{ fontSize: 12, color: "var(--content-brand-default)", backgroundColor: "var(--surface-brand-secondary)", padding: "2px 6px", borderRadius: 4 }}>maxLength={"{200}"}</code>
                  </div>
                </DoCard>
                <DontCard>
                  <div style={{ fontSize: typography.fontSize.sm }}>
                    <p style={{ margin: "0 0 8px", fontWeight: 500 }}>레이블 없이 사용</p>
                    <code style={{ fontSize: 12, color: "var(--content-error-default)", backgroundColor: "var(--surface-error-secondary)", padding: "2px 6px", borderRadius: 4 }}>{'<TextArea />'}</code>
                  </div>
                </DontCard>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> 글자 수 제한이 있으면 maxLength와 카운터를 표시합니다
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0, fontStyle: "italic" }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Don&apos;t</span> label 또는 aria-label 없이 사용하지 않습니다
                </p>
              </div>
            </div>
          </div>
        </Subsection>
      </Section>

      {/* 6. Design Tokens */}
      <Section title="Design Tokens">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          TextArea 컴포넌트에 적용된 Foundation 기반 디자인 토큰입니다.
        </p>

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
                <tr style={trBorder}><td style={tdStyle}>Default border</td><td style={tdStyle}><InlineCode>border.base.default</InlineCode></td><td style={tdMono}>var(--border-base-default)</td></tr>
                <tr style={trBorder}><td style={tdStyle}>Focused border</td><td style={tdStyle}><InlineCode>border.brand.default</InlineCode></td><td style={tdMono}>var(--border-brand-default)</td></tr>
                <tr style={trBorder}><td style={tdStyle}>Error border</td><td style={tdStyle}><InlineCode>border.error.default</InlineCode></td><td style={tdMono}>var(--border-error-default)</td></tr>
                <tr style={trBorder}><td style={tdStyle}>Background</td><td style={tdStyle}><InlineCode>surface.base.default</InlineCode></td><td style={tdMono}>var(--surface-base-default)</td></tr>
                <tr style={trBorder}><td style={tdStyle}>Disabled background</td><td style={tdStyle}><InlineCode>surface.base.alternative</InlineCode></td><td style={tdMono}>var(--surface-base-alternative)</td></tr>
                <tr style={trBorder}><td style={tdStyle}>Label / input text</td><td style={tdStyle}><InlineCode>content.base.default</InlineCode></td><td style={tdMono}>var(--content-base-default)</td></tr>
                <tr style={trBorder}><td style={tdStyle}>Placeholder text</td><td style={tdStyle}><InlineCode>content.base.placeholder</InlineCode></td><td style={tdMono}>var(--content-base-placeholder)</td></tr>
                <tr style={trBorder}><td style={tdStyle}>Helper text</td><td style={tdStyle}><InlineCode>content.base.secondary</InlineCode></td><td style={tdMono}>var(--content-base-secondary)</td></tr>
                <tr><td style={tdStyle}>Error message</td><td style={tdStyle}><InlineCode>content.error.default</InlineCode></td><td style={tdMono}>var(--content-error-default)</td></tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Spacing &amp; Shape">
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
                <tr style={trBorder}><td style={tdStyle}>Border radius</td><td style={tdStyle}><InlineCode>radius.component.input.default</InlineCode></td><td style={tdMono}>8px</td></tr>
                <tr style={trBorder}><td style={tdStyle}>Border width</td><td style={tdStyle}><InlineCode>borderWidth.medium</InlineCode></td><td style={tdMono}>1.5px</td></tr>
                <tr style={trBorder}><td style={tdStyle}>Horizontal padding</td><td style={tdStyle}><InlineCode>spacing.component.input.paddingX</InlineCode></td><td style={tdMono}>16px</td></tr>
                <tr style={trBorder}><td style={tdStyle}>Vertical padding</td><td style={tdStyle}><InlineCode>spacing.primitive[3]</InlineCode></td><td style={tdMono}>12px</td></tr>
                <tr style={trBorder}><td style={tdStyle}>Label gap</td><td style={tdStyle}><InlineCode>spacing.component.input.labelGap</InlineCode></td><td style={tdMono}>4px</td></tr>
                <tr><td style={tdStyle}>Transition</td><td style={tdStyle}><InlineCode>transitions.all</InlineCode></td><td style={tdMono}>border-color 200ms ease-out</td></tr>
              </tbody>
            </table>
          </div>
        </Subsection>
      </Section>

      {/* 7. Accessibility */}
      <Section title="Accessibility">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          TextArea는 네이티브 <InlineCode>&lt;textarea&gt;</InlineCode>를 기반으로 완전한 키보드 및 스크린 리더 접근성을 보장합니다.
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
              <tr style={trBorder}><td style={tdStyle}><InlineCode>label</InlineCode> or <InlineCode>aria-label</InlineCode></td><td style={tdMono}>텍스트 영역의 목적을 설명 (둘 중 하나 필수)</td></tr>
              <tr style={trBorder}><td style={tdStyle}><InlineCode>aria-describedby</InlineCode></td><td style={tdMono}>helper text 또는 error message를 연결</td></tr>
              <tr style={trBorder}><td style={tdStyle}><InlineCode>aria-invalid</InlineCode></td><td style={tdMono}>error 상태 시 스크린 리더에 오류 알림</td></tr>
              <tr style={trBorder}><td style={tdStyle}><InlineCode>aria-disabled</InlineCode></td><td style={tdMono}>disabled 상태 전달</td></tr>
              <tr><td style={tdStyle}><InlineCode>maxLength</InlineCode> + live region</td><td style={tdMono}>글자 수 카운터를 aria-live 영역으로 감싸 실시간 읽기</td></tr>
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
                <tr style={trBorder}><td style={tdStyle}><kbd style={kbdStyle}>Tab</kbd></td><td style={tdMono}>TextArea로 포커스 이동</td></tr>
                <tr style={trBorder}><td style={tdStyle}><kbd style={kbdStyle}>Enter</kbd></td><td style={tdMono}>줄 바꿈 삽입</td></tr>
                <tr><td style={tdStyle}><kbd style={kbdStyle}>Shift</kbd> + <kbd style={kbdStyle}>Tab</kbd></td><td style={tdMono}>이전 요소로 포커스 이동</td></tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Design Principles">
          <div style={{ display: "grid", gap: spacing.primitive[4] }}>
            <PrincipleCard
              number={1}
              title="레이블 필수"
              desc="모든 TextArea는 visible label 또는 aria-label을 가져야 합니다. 레이블이 없으면 스크린 리더 사용자가 필드의 목적을 알 수 없습니다."
            />
            <PrincipleCard
              number={2}
              title="글자 수 카운터 접근성"
              desc="maxLength 사용 시 글자 수 카운터를 aria-live 영역으로 감싸면 스크린 리더가 실시간으로 남은 글자 수를 읽어줍니다."
            />
            <PrincipleCard
              number={3}
              title="오류 메시지 연결"
              desc="error prop으로 표시되는 오류 메시지는 aria-describedby로 textarea에 연결되어야 합니다."
            />
          </div>
        </Subsection>
      </Section>

      {/* 8. Related Components */}
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
                <td style={{ ...tdStyle, fontWeight: typography.fontWeight.medium }}>TextField</td>
                <td style={{ ...tdStyle, color: "var(--text-secondary)" }}>단일 행 텍스트 입력</td>
                <td style={{ ...tdStyle, color: "var(--text-secondary)" }}>이름·이메일처럼 한 줄이면 TextField 사용</td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, fontWeight: typography.fontWeight.medium }}>SearchField</td>
                <td style={{ ...tdStyle, color: "var(--text-secondary)" }}>검색 전용 입력</td>
                <td style={{ ...tdStyle, color: "var(--text-secondary)" }}>내장 검색 아이콘과 지우기 버튼 포함</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}

// ─── Web Content ──────────────────────────────────────────────────────

function WebContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>
      {/* 1. Source Code */}
      <Section title="Source Code">
        <div style={{ padding: spacing.primitive[4], backgroundColor: "var(--surface-base-default)", borderLeft: "1px solid var(--border-solid-alternative)", borderRadius: radius.primitive.md, marginBottom: spacing.primitive[6], display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)", margin: 0 }}>TextArea Component</p>
            <p style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", margin: "4px 0 0 0" }}>실제 컴포넌트 소스 코드를 GitHub에서 확인하세요.</p>
          </div>
          <a
            href="https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system/src/components/TextArea/TextArea.tsx"
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
        <CodeBlock code={`import { TextArea } from '@baerae-zkap/design-system';`} />
      </Section>

      {/* 3. Basic Usage */}
      <Section title="Basic Usage">
        <PreviewBox>
          <div style={{ width: "100%", maxWidth: 360 }}>
            <TextArea label="소개" placeholder="자신을 소개해주세요." rows={4} />
          </div>
        </PreviewBox>
        <CodeBlock code={`<TextArea
  label="소개"
  placeholder="자신을 소개해주세요."
  rows={4}
/>`} />
      </Section>

      {/* 4. With Character Counter */}
      <Section title="With Character Counter">
        <PreviewBox>
          <div style={{ width: "100%", maxWidth: 360 }}>
            <CharCounterDemo />
          </div>
        </PreviewBox>
        <CodeBlock code={`const [bio, setBio] = useState("");

<TextArea
  label="바이오"
  value={bio}
  onChange={setBio}
  maxLength={200}
  helperText={\`\${bio.length}/200\`}
  rows={4}
/>`} />
      </Section>

      {/* 5. With Validation */}
      <Section title="With Validation">
        <PreviewBox>
          <div style={{ width: "100%", maxWidth: 360 }}>
            <ValidationDemo />
          </div>
        </PreviewBox>
        <CodeBlock code={`const [feedback, setFeedback] = useState("");
const error = feedback.length > 0 && feedback.length < 20
  ? "최소 20자 이상 입력해주세요."
  : undefined;

<TextArea
  label="피드백"
  value={feedback}
  onChange={setFeedback}
  error={error}
  rows={4}
/>`} />
      </Section>

      {/* 6. API Reference */}
      <Section title="API Reference">
        <PropsTable
          props={[
            { name: "label", type: "string", required: false, description: "textarea 위에 표시되는 레이블" },
            { name: "placeholder", type: "string", required: false, description: "비어있을 때 표시되는 안내 텍스트" },
            { name: "value", type: "string", required: false, description: "제어 모드 값" },
            { name: "onChange", type: "(value: string) => void", required: false, description: "값 변경 콜백" },
            { name: "rows", type: "number", required: false, defaultVal: "4", description: "표시되는 행 수 (높이)" },
            { name: "maxLength", type: "number", required: false, description: "최대 입력 글자 수" },
            { name: "showCount", type: "boolean", required: false, defaultVal: "false", description: "최대 글자 수 카운터 표시 (maxLength 필요)" },
            { name: "error", type: "string", required: false, description: "오류 메시지. 설정 시 오류 스타일 적용" },
            { name: "helperText", type: "string", required: false, description: "textarea 아래 안내 텍스트" },
            { name: "disabled", type: "boolean", required: false, defaultVal: "false", description: "비활성화" },
            { name: "required", type: "boolean", required: false, defaultVal: "false", description: "필수 입력 표시 (*)" },
            { name: "resize", type: "'none' | 'vertical' | 'both'", required: false, defaultVal: "'vertical'", description: "리사이즈 방향" },
            { name: "defaultValue", type: "string", required: false, description: "초기값 (비제어 모드)" },
            { name: "aria-label", type: "string", required: false, description: "label 없을 때 필수 접근성 레이블" },
          ]}
        />
      </Section>
    </div>
  );
}

// ─── Demo Components ──────────────────────────────────────────────────

function CharCounterDemo() {
  const [value, setValue] = useState("");
  return (
    <TextArea
      label="바이오"
      value={value}
      onChange={setValue}
      maxLength={200}
      helperText={`${value.length}/200`}
      rows={4}
    />
  );
}

function ValidationDemo() {
  const [value, setValue] = useState("");
  const error = value.length > 0 && value.length < 20 ? "최소 20자 이상 입력해주세요." : undefined;
  return (
    <TextArea
      label="피드백"
      value={value}
      onChange={setValue}
      error={error}
      rows={4}
    />
  );
}

// ─── UI Helpers ───────────────────────────────────────────────────────

function StatePreview({ label, sublabel, children }: { label: string; sublabel: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[3], padding: spacing.primitive[4] }}>
      <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 72 }}>
        {children}
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.medium, color: "var(--text-primary)" }}>{label}</div>
        <div style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", marginTop: 2 }}>{sublabel}</div>
      </div>
    </div>
  );
}

function MiniTextArea({ borderColor, disabled, hasText }: { borderColor: string; disabled?: boolean; hasText?: boolean }) {
  return (
    <div
      style={{
        width: "100%",
        border: `1.5px solid ${borderColor}`,
        borderRadius: 8,
        backgroundColor: disabled ? "var(--surface-base-alternative)" : "var(--surface-base-default)",
        padding: "6px 10px",
        minHeight: 48,
        opacity: disabled ? 0.5 : 1,
        fontSize: 12,
        color: hasText ? "var(--content-base-default)" : "var(--content-base-placeholder)",
        boxSizing: "border-box" as const,
      }}
    >
      {hasText ? "입력된 내용..." : "placeholder"}
    </div>
  );
}

function InteractionCard({ label, sublabel, borderColor, bg, opacity }: {
  label: string; sublabel: string; borderColor: string; bg: string; opacity?: number;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2], padding: spacing.primitive[3] }}>
      <div
        style={{
          width: "100%",
          height: 36,
          borderRadius: 8,
          border: `1.5px solid ${borderColor}`,
          backgroundColor: bg,
          opacity: opacity ?? 1,
        }}
      />
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.medium, color: "var(--text-primary)" }}>{label}</div>
        <div style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)" }}>{sublabel}</div>
      </div>
    </div>
  );
}

// ─── Shared Styles ────────────────────────────────────────────────────

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
