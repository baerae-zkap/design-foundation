"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  PlatformTabs,
  CodeBlock,
  PreviewBox,
  Platform,
  highlightCode,
} from "@/components/PlatformTabs";
import { TextField, typography, spacing, radius } from "@baerae-zkap/design-system";
import { Section, Subsection, InlineCode } from "@/components/docs/Section";
import { PropsTable } from "@/components/docs/PropsTable";
import { PrincipleCard, DoCard, DontCard } from "@/components/docs/Cards";
import { RadioGroup, CopyButton } from "@/components/docs/Playground";

// ─── Page ─────────────────────────────────────────────────────────────

export default function TextFieldPage() {
  return (
    <div style={{ maxWidth: 840 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Inputs" },
          { label: "Text Field" },
        ]}
      />

      <h1
        style={{
          fontSize: typography.fontSize["3xl"],
          fontWeight: typography.fontWeight.bold,
          marginBottom: spacing.primitive[2],
          color: "var(--text-primary)",
          letterSpacing: "-0.02em",
        }}
      >
        Text Field
      </h1>
      <p
        style={{
          fontSize: typography.fontSize.md,
          color: "var(--text-secondary)",
          marginBottom: spacing.primitive[8],
          lineHeight: 1.7,
        }}
      >
        단일 줄 텍스트 입력이 필요할 때 사용합니다. 레이블, 유효성 오류 메시지, 도움말 텍스트를 지원합니다.
      </p>

      {/* Interactive Playground */}
      <TextFieldPlayground />

      {/* Platform Tabs */}
      <PlatformTabs>
        {(platform) => <PlatformContent platform={platform} />}
      </PlatformTabs>
    </div>
  );
}

// ─── Playground ───────────────────────────────────────────────────────

function TextFieldPlayground() {
  const [label, setLabel] = useState("이메일");
  const [placeholder, setPlaceholder] = useState("example@email.com");
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState("");

  const generateCode = () => {
    const props: string[] = [];
    if (label) props.push(`label="${label}"`);
    if (placeholder) props.push(`placeholder="${placeholder}"`);
    if (error) props.push(`error="${error}"`);
    if (disabled) props.push("disabled");
    props.push('value={value}');
    props.push('onChange={setValue}');
    const propsStr = props.length > 0 ? `\n  ${props.join("\n  ")}\n` : " ";
    return `<TextField${propsStr}/>`;
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
            <div style={{ width: "100%", maxWidth: 320 }}>
              <TextField
                label={label || undefined}
                placeholder={placeholder || undefined}
                error={error || undefined}
                disabled={disabled}
                value={value}
                onChange={setValue}
              />
            </div>
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
              boxSizing: "border-box" as const,
            }}
          >
            <div
              style={{
                flex: 1,
                minHeight: 0,
                padding: spacing.primitive[6],
                overflowY: "auto" as const,
                display: "flex",
                flexDirection: "column" as const,
                gap: spacing.primitive[7],
                backgroundColor: "var(--surface-base-default)",
                borderRadius: radius.primitive.lg,
              }}
            >
              {/* Label */}
              <ControlInput
                label="Label"
                value={label}
                onChange={setLabel}
                placeholder="Label text"
              />

              {/* Placeholder */}
              <ControlInput
                label="Placeholder"
                value={placeholder}
                onChange={setPlaceholder}
                placeholder="Placeholder text"
              />

              {/* Error */}
              <ControlInput
                label="Error"
                value={error}
                onChange={setError}
                placeholder="Error message"
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
            </div>
          </div>
        </div>
      </div>

      {/* Generated Code */}
      <div
        style={{
          marginTop: spacing.primitive[4],
          borderRadius: radius.primitive.md,
          overflow: "hidden",
          border: "1px solid var(--divider)",
        }}
      >
        <div
          style={{
            padding: "10px 16px",
            backgroundColor: "var(--docs-code-surface)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontSize: typography.fontSize.compact,
              fontWeight: typography.fontWeight.medium,
              color: "var(--docs-code-active-text)",
            }}
          >
            Web
          </span>
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

// Small text input for playground controls
function ControlInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <div
        style={{
          fontSize: typography.fontSize.sm,
          fontWeight: typography.fontWeight.medium,
          color: "var(--content-base-assistive)",
          marginBottom: 10,
        }}
      >
        {label}
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "8px 10px",
          fontSize: typography.fontSize.compact,
          border: "1.5px solid var(--border-base-default)",
          borderRadius: radius.primitive.sm,
          backgroundColor: "var(--surface-base-alternative)",
          color: "var(--content-base-default)",
          outline: "none",
          fontFamily: "inherit",
          boxSizing: "border-box" as const,
        }}
      />
    </div>
  );
}

// ─── Platform Content ─────────────────────────────────────────────────

function PlatformContent({ platform }: { platform: Platform }) {
  if (platform === "design") return <DesignContent />;
  return <WebContent />;
}

// ─── Design Content ───────────────────────────────────────────────────

function DesignContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>

      {/* 1. Overview */}
      <Section title="Overview">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7 }}>
          <InlineCode>TextField</InlineCode>는 단일 줄 텍스트 입력 컴포넌트입니다.
          레이블, 플레이스홀더, 도움말 텍스트, 인라인 오류 메시지를 지원하며
          폼에서 이름·이메일·비밀번호 등 텍스트 입력에 사용합니다.
        </p>
      </Section>

      {/* 2. Anatomy */}
      <Section title="Anatomy">
        <div
          style={{
            backgroundColor: "var(--surface-base-alternative)",
            borderRadius: radius.primitive.md,
            padding: `${spacing.primitive[12]}px ${spacing.primitive[10]}px`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="460" height="160" viewBox="0 0 460 160">
            {/* Label */}
            <text x="100" y="28" fill="var(--content-base-secondary)" fontSize={typography.fontSize.compact} fontWeight={typography.fontWeight.medium}>이메일</text>

            {/* Input container */}
            <rect x="100" y="40" width="260" height="48" rx="8" fill="var(--surface-base-default)" stroke="var(--border-brand-default)" strokeWidth="1.5" />

            {/* Placeholder text */}
            <text x="116" y="70" fill="var(--content-base-placeholder)" fontSize={typography.fontSize.sm}>example@email.com</text>

            {/* Helper text */}
            <text x="100" y="106" fill="var(--content-base-secondary)" fontSize={typography.fontSize.compact}>올바른 이메일 형식으로 입력하세요.</text>

            {/* Callout line: Label (1) */}
            <line x1="60" y1="26" x2="100" y2="26" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="100" cy="26" r="3" fill="var(--content-base-default)" />
            <circle cx="44" cy="26" r="14" fill="var(--content-base-default)" />
            <text x="44" y="31" textAnchor="middle" fill="white" fontSize={typography.fontSize.xs} fontWeight={typography.fontWeight.semibold}>1</text>

            {/* Callout line: Input container (2) */}
            <line x1="390" y1="64" x2="360" y2="64" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="360" cy="64" r="3" fill="var(--content-base-default)" />
            <circle cx="406" cy="64" r="14" fill="var(--content-base-default)" />
            <text x="406" y="69" textAnchor="middle" fill="white" fontSize={typography.fontSize.xs} fontWeight={typography.fontWeight.semibold}>2</text>

            {/* Callout line: Placeholder (3) */}
            <line x1="230" y1="70" x2="230" y2="16" stroke="var(--content-base-default)" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="230" cy="16" r="14" fill="var(--content-base-default)" />
            <text x="230" y="21" textAnchor="middle" fill="white" fontSize={typography.fontSize.xs} fontWeight={typography.fontWeight.semibold}>3</text>

            {/* Callout line: Helper text (4) */}
            <line x1="60" y1="106" x2="100" y2="106" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="100" cy="106" r="3" fill="var(--content-base-default)" />
            <circle cx="44" cy="106" r="14" fill="var(--content-base-default)" />
            <text x="44" y="111" textAnchor="middle" fill="white" fontSize={typography.fontSize.xs} fontWeight={typography.fontWeight.semibold}>4</text>
          </svg>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: spacing.primitive[4],
            marginTop: spacing.primitive[5],
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.medium,
            color: "var(--text-primary)",
          }}
        >
          <div>1. Label</div>
          <div style={{ textAlign: "center" }}>2. Input Container</div>
          <div style={{ textAlign: "center" }}>3. Placeholder</div>
          <div style={{ textAlign: "right" }}>4. Helper / Error Text</div>
        </div>
      </Section>

      {/* 3. Variants */}
      <Section title="Variants">
        <Subsection title="Default">
          <PreviewBox>
            <div style={{ width: "100%", maxWidth: 360, display: "flex", flexDirection: "column", gap: spacing.primitive[4] }}>
              <TextField label="이름" placeholder="홍길동" value="" onChange={() => {}} />
              <TextField label="이메일" placeholder="example@email.com" value="user@email.com" onChange={() => {}} />
            </div>
          </PreviewBox>
        </Subsection>

        <Subsection title="With Leading / Trailing Icon">
          <PreviewBox>
            <div style={{ width: "100%", maxWidth: 360, display: "flex", flexDirection: "column", gap: spacing.primitive[4] }}>
              <TextField
                label="검색"
                placeholder="검색어를 입력하세요"
                value=""
                onChange={() => {}}
                leadingIcon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                  </svg>
                }
              />
              <TextField
                label="비밀번호"
                placeholder="비밀번호 입력"
                type="password"
                value="secret"
                onChange={() => {}}
                trailingIcon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                  </svg>
                }
              />
            </div>
          </PreviewBox>
        </Subsection>

        <Subsection title="Error State">
          <PreviewBox>
            <div style={{ width: "100%", maxWidth: 360 }}>
              <TextField
                label="이메일"
                placeholder="example@email.com"
                value="invalid-email"
                onChange={() => {}}
                error="올바른 이메일 형식이 아닙니다."
              />
            </div>
          </PreviewBox>
        </Subsection>

        <Subsection title="Disabled">
          <PreviewBox>
            <div style={{ width: "100%", maxWidth: 360, display: "flex", flexDirection: "column", gap: spacing.primitive[4] }}>
              <TextField label="비활성화 (비어있음)" placeholder="입력할 수 없어요" value="" onChange={() => {}} disabled />
              <TextField label="비활성화 (값 있음)" value="수정 불가 값" onChange={() => {}} disabled />
            </div>
          </PreviewBox>
        </Subsection>
      </Section>

      {/* 4. States */}
      <Section title="States">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          TextField의 모든 시각 상태를 확인할 수 있습니다.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: spacing.primitive[4],
            padding: spacing.primitive[6],
            backgroundColor: "var(--surface-base-alternative)",
            borderRadius: radius.primitive.md,
          }}
        >
          <StatePreview label="Default" sublabel="기본 상태">
            <MiniInput borderColor="var(--border-base-default)" />
          </StatePreview>
          <StatePreview label="Focused" sublabel="입력 중">
            <MiniInput borderColor="var(--border-brand-default)" />
          </StatePreview>
          <StatePreview label="Filled" sublabel="값 있음">
            <MiniInput borderColor="var(--border-base-default)" text="user@email.com" />
          </StatePreview>
          <StatePreview label="Error" sublabel="유효성 오류">
            <MiniInput borderColor="var(--border-error-default)" text="wrong@" errorDot />
          </StatePreview>
          <StatePreview label="Disabled" sublabel="비활성화">
            <MiniInput borderColor="var(--border-base-default)" opacity={0.4} />
          </StatePreview>
        </div>

        <Subsection title="Interaction States">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: spacing.primitive[4] }}>
            입력 필드에 직접 클릭하여 포커스 상태를 확인해보세요.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: spacing.primitive[4],
              padding: spacing.primitive[6],
              backgroundColor: "var(--surface-base-alternative)",
              borderRadius: radius.primitive.md,
            }}
          >
            <InteractionCard label="Default" sublabel="테두리 base" borderColor="var(--border-base-default)" />
            <InteractionCard label="Focused" sublabel="테두리 brand" borderColor="var(--border-brand-default)" highlight />
            <InteractionCard label="Error" sublabel="테두리 error" borderColor="var(--border-error-default)" />
            <InteractionCard label="Disabled" sublabel="opacity 0.5" borderColor="var(--border-base-default)" opacity={0.4} />
          </div>
        </Subsection>
      </Section>

      {/* 5. Usage Guidelines */}
      <Section title="Usage Guidelines">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          TextField는 <strong style={{ color: "var(--text-primary)" }}>단일 줄 텍스트 입력</strong>에 사용합니다.
          여러 줄이 필요하면 TextArea를, 검색에는 SearchField를 사용하세요.
        </p>

        <Subsection title="Best Practices">
          <div style={{ display: "grid", gap: spacing.primitive[5] }}>
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <DoCard>
                  <div style={{ width: "100%", maxWidth: 240 }}>
                    <TextField label="이메일" placeholder="example@email.com" value="" onChange={() => {}} />
                  </div>
                </DoCard>
                <DontCard>
                  <div style={{ width: "100%", maxWidth: 240 }}>
                    <div
                      style={{
                        padding: "10px 14px",
                        border: "1px solid var(--border-base-default)",
                        borderRadius: 6,
                        fontSize: typography.fontSize.sm,
                        color: "var(--content-base-placeholder)",
                        backgroundColor: "var(--surface-base-default)",
                      }}
                    >
                      이메일을 입력해주세요
                    </div>
                  </div>
                </DontCard>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> 시스템 TextField 컴포넌트를 사용합니다
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0, fontStyle: "italic" }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Don&apos;t</span> 네이티브 &lt;input&gt;을 직접 스타일링하지 않습니다
                </p>
              </div>
            </div>

            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <DoCard>
                  <div style={{ width: "100%", maxWidth: 240 }}>
                    <TextField label="이메일" placeholder="example@email.com" value="bad" onChange={() => {}} error="올바른 이메일 형식이 아닙니다." />
                  </div>
                </DoCard>
                <DontCard>
                  <div style={{ width: "100%", maxWidth: 240, display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
                    <TextField label="이메일" placeholder="example@email.com" value="" onChange={() => {}} error="이메일을 입력하세요" />
                    <p style={{ margin: 0, fontSize: typography.fontSize.xs, color: "var(--content-error-default)" }}>
                      * 아직 입력하지 않았는데 오류 표시
                    </p>
                  </div>
                </DontCard>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> 사용자가 입력 후 오류를 표시합니다 (blur 또는 submit 시)
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0, fontStyle: "italic" }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Don&apos;t</span> 아직 상호작용하지 않은 필드에 오류를 미리 표시합니다
                </p>
              </div>
            </div>
          </div>
        </Subsection>
      </Section>

      {/* 6. Design Tokens */}
      <Section title="Design Tokens">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          TextField 컴포넌트에 적용된 Foundation 기반 디자인 토큰입니다.
        </p>

        <Subsection title="Color 토큰">
          <div style={{ overflow: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.compact }}>
              <thead>
                <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                  <th style={thStyle}>State</th>
                  <th style={thStyle}>Token</th>
                  <th style={thStyle}>CSS Variable</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Default Border", "border.base.default", "var(--border-base-default)"],
                  ["Focused Border", "border.brand.default", "var(--border-brand-default)"],
                  ["Error Border", "border.error.default", "var(--border-error-default)"],
                  ["Input Background", "surface.base.default", "var(--surface-base-default)"],
                  ["Disabled Background", "surface.base.alternative", "var(--surface-base-alternative)"],
                  ["Input Text", "content.base.default", "var(--content-base-default)"],
                  ["Placeholder Text", "content.base.placeholder", "var(--content-base-placeholder)"],
                  ["Label (default)", "content.base.secondary", "var(--content-base-secondary)"],
                  ["Label (focused)", "content.brand.default", "var(--content-brand-default)"],
                  ["Label (error)", "content.error.default", "var(--content-error-default)"],
                  ["Helper Text", "content.base.secondary", "var(--content-base-secondary)"],
                  ["Error Text", "content.error.default", "var(--content-error-default)"],
                ].map(([state, token, cssVar], i, arr) => (
                  <tr key={state} style={i < arr.length - 1 ? trBorder : {}}>
                    <td style={tdStyle}>{state}</td>
                    <td style={tdStyle}><InlineCode>{token}</InlineCode></td>
                    <td style={tdMono}>{cssVar}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Spacing &amp; Shape 토큰">
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
                {[
                  ["Horizontal Padding", "spacing.primitive[4]", "16px"],
                  ["Vertical Padding", "spacing.primitive[3]", "12px"],
                  ["Label–Input Gap", "spacing.primitive[1]", "4px"],
                  ["Input–Helper Gap", "spacing.primitive[1]", "4px"],
                  ["Border Radius", "radius.component.input.default", "8px"],
                  ["Border Width", "borderWidth.medium", "1.5px"],
                  ["Transition", "transitions.all", "150ms ease"],
                ].map(([prop, token, value], i, arr) => (
                  <tr key={prop} style={i < arr.length - 1 ? trBorder : {}}>
                    <td style={tdStyle}>{prop}</td>
                    <td style={tdStyle}><InlineCode>{token}</InlineCode></td>
                    <td style={tdMono}>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Typography 토큰">
          <div style={{ overflow: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.compact }}>
              <thead>
                <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                  <th style={thStyle}>Element</th>
                  <th style={thStyle}>Token</th>
                  <th style={thStyle}>Value</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Label", "typography.fontSize.compact / fontWeight.medium", "12px / 500"],
                  ["Input Text", "typography.fontSize.md", "16px"],
                  ["Helper / Error Text", "typography.fontSize.compact", "12px"],
                ].map(([el, token, value], i, arr) => (
                  <tr key={el} style={i < arr.length - 1 ? trBorder : {}}>
                    <td style={tdStyle}>{el}</td>
                    <td style={tdStyle}><InlineCode>{token}</InlineCode></td>
                    <td style={tdMono}>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Subsection>
      </Section>

      {/* 7. Accessibility */}
      <Section title="Accessibility">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          TextField는 네이티브 <InlineCode>&lt;input&gt;</InlineCode>을 기반으로 하여 완전한 접근성을 보장합니다.
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
              {[
                ["<label htmlFor>", "label 요소와 input을 연결하여 스크린 리더 완벽 지원"],
                ["aria-invalid", "오류 상태를 보조 기술에 전달 (error prop 설정 시 자동)"],
                ["aria-describedby", "helper/error 텍스트를 input에 연결"],
                ["aria-disabled", "disabled 상태를 보조 기술에 전달"],
                ["aria-label", "label이 없는 경우 반드시 제공"],
                ["required", "폼 제출 전 필수 입력 여부 브라우저 검증"],
              ].map(([attr, desc], i, arr) => (
                <tr key={attr} style={i < arr.length - 1 ? trBorder : {}}>
                  <td style={{ ...tdStyle, borderBottom: i < arr.length - 1 ? "1px solid var(--divider)" : "none" }}>
                    <InlineCode>{attr}</InlineCode>
                  </td>
                  <td style={{ ...tdMono, borderBottom: i < arr.length - 1 ? "1px solid var(--divider)" : "none" }}>{desc}</td>
                </tr>
              ))}
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
                {[
                  ["Tab", "입력 필드로 포커스 이동"],
                  ["Shift + Tab", "이전 필드로 포커스 이동"],
                  ["Enter", "폼 제출 (form 내부에서)"],
                  ["Escape", "포커스 해제"],
                ].map(([key, action], i, arr) => (
                  <tr key={key} style={i < arr.length - 1 ? trBorder : {}}>
                    <td style={{ ...tdStyle, borderBottom: i < arr.length - 1 ? "1px solid var(--divider)" : "none" }}>
                      <kbd style={kbdStyle}>{key}</kbd>
                    </td>
                    <td style={{ ...tdMono, borderBottom: i < arr.length - 1 ? "1px solid var(--divider)" : "none" }}>{action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Design Principles">
          <div style={{ display: "grid", gap: spacing.primitive[4] }}>
            <PrincipleCard
              number={1}
              title="항상 레이블을 제공합니다"
              desc="시각적 레이블이 없으면 aria-label을 반드시 제공해야 합니다. placeholder만으로 레이블을 대체하지 마세요."
            />
            <PrincipleCard
              number={2}
              title="오류는 사용자 상호작용 후에 표시합니다"
              desc="blur 또는 form submit 이후에 오류를 표시합니다. 아직 입력하지 않은 필드에 미리 오류를 노출하면 혼란을 줍니다."
            />
            <PrincipleCard
              number={3}
              title="오류 메시지는 구체적으로 작성합니다"
              desc="'필수 항목입니다' 대신 '이메일 형식이 올바르지 않습니다'처럼 사용자가 수정할 수 있는 구체적인 안내를 제공합니다."
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
              {[
                ["TextArea", "여러 줄 텍스트 입력", "TextField는 1줄, TextArea는 여러 줄"],
                ["SearchField", "검색 입력 (지우기 버튼 내장)", "검색 전용 UI와 clear 버튼 포함"],
                ["Select", "드롭다운에서 선택", "TextField는 자유 입력, Select는 목록에서 선택"],
              ].map(([comp, use, diff], i, arr) => (
                <tr key={comp} style={i < arr.length - 1 ? trBorder : {}}>
                  <td style={{ ...tdStyle, fontWeight: typography.fontWeight.medium, borderBottom: i < arr.length - 1 ? "1px solid var(--divider)" : "none" }}>{comp}</td>
                  <td style={{ ...tdStyle, color: "var(--text-secondary)", borderBottom: i < arr.length - 1 ? "1px solid var(--divider)" : "none" }}>{use}</td>
                  <td style={{ ...tdStyle, color: "var(--text-secondary)", borderBottom: i < arr.length - 1 ? "1px solid var(--divider)" : "none" }}>{diff}</td>
                </tr>
              ))}
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
        <div
          style={{
            padding: spacing.primitive[4],
            backgroundColor: "var(--surface-base-alternative)",
            borderRadius: radius.primitive.md,
            marginBottom: spacing.primitive[6],
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)", margin: 0 }}>
              TextField Component
            </p>
            <p style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", margin: "4px 0 0 0" }}>
              실제 컴포넌트 소스 코드를 GitHub에서 확인하세요.
            </p>
          </div>
          <a
            href="https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system/src/components/TextField/TextField.tsx"
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
        <CodeBlock code={`import { TextField } from '@baerae-zkap/design-system';`} />
      </Section>

      {/* 3. Basic Usage */}
      <Section title="Basic Usage">
        <PreviewBox>
          <div style={{ width: "100%", maxWidth: 360 }}>
            <BasicUsageDemo />
          </div>
        </PreviewBox>
        <CodeBlock
          code={`const [name, setName] = useState('');

<TextField
  label="이름"
  placeholder="홍길동"
  value={name}
  onChange={setName}
/>`}
        />
      </Section>

      {/* 4. With Validation */}
      <Section title="With Validation">
        <PreviewBox>
          <div style={{ width: "100%", maxWidth: 360 }}>
            <ValidationDemo />
          </div>
        </PreviewBox>
        <CodeBlock
          code={`const [email, setEmail] = useState('');
const [error, setError] = useState('');

const validateEmail = (value: string) => {
  if (!value) {
    setError('이메일을 입력하세요.');
  } else if (!/^[^@]+@[^@]+\.[^@]+$/.test(value)) {
    setError('올바른 이메일 형식이 아닙니다.');
  } else {
    setError('');
  }
};

<TextField
  label="이메일"
  type="email"
  placeholder="example@email.com"
  value={email}
  onChange={setEmail}
  error={error}
  onBlur={() => validateEmail(email)}
/>`}
        />
      </Section>

      {/* 5. Form Example */}
      <Section title="Form Example">
        <PreviewBox>
          <div style={{ width: "100%", maxWidth: 360 }}>
            <FormDemo />
          </div>
        </PreviewBox>
        <CodeBlock
          code={`const [form, setForm] = useState({ name: '', email: '', password: '' });
const [errors, setErrors] = useState<Record<string, string>>({});

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  const newErrors: Record<string, string> = {};
  if (!form.name) newErrors.name = '이름을 입력하세요.';
  if (!form.email) newErrors.email = '이메일을 입력하세요.';
  if (!form.password || form.password.length < 8)
    newErrors.password = '비밀번호는 8자 이상이어야 합니다.';
  setErrors(newErrors);
  if (Object.keys(newErrors).length === 0) {
    // submit logic
  }
};

<form onSubmit={handleSubmit}>
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <TextField
      label="이름"
      placeholder="홍길동"
      value={form.name}
      onChange={(v) => setForm((p) => ({ ...p, name: v }))}
      error={errors.name}
      required
    />
    <TextField
      label="이메일"
      type="email"
      placeholder="example@email.com"
      value={form.email}
      onChange={(v) => setForm((p) => ({ ...p, email: v }))}
      error={errors.email}
      required
    />
    <TextField
      label="비밀번호"
      type="password"
      placeholder="8자 이상 입력"
      value={form.password}
      onChange={(v) => setForm((p) => ({ ...p, password: v }))}
      error={errors.password}
      helperText="영문, 숫자 포함 8자 이상"
      required
    />
    <button type="submit" style={{ marginTop: 8 }}>가입하기</button>
  </div>
</form>`}
        />
      </Section>

      {/* 6. API Reference */}
      <Section title="API Reference">
        <PropsTable
          props={[
            { name: "label", type: "string", required: false, description: "입력 필드 위에 표시되는 레이블" },
            { name: "placeholder", type: "string", required: false, description: "값이 없을 때 표시되는 안내 텍스트" },
            { name: "value", type: "string", required: false, description: "제어 모드 입력 값" },
            { name: "onChange", type: "(value: string) => void", required: false, description: "값 변경 콜백" },
            { name: "type", type: "string", required: false, defaultVal: '"text"', description: "input type (text, email, password, tel, url, number)" },
            { name: "error", type: "string", required: false, description: "오류 메시지. 설정 시 오류 스타일 적용" },
            { name: "helperText", type: "string", required: false, description: "입력 필드 아래 도움말 텍스트" },
            { name: "disabled", type: "boolean", required: false, defaultVal: "false", description: "비활성화" },
            { name: "required", type: "boolean", required: false, defaultVal: "false", description: "필수 입력 여부" },
            { name: "leadingIcon", type: "ReactNode", required: false, description: "입력 필드 왼쪽 아이콘" },
            { name: "trailingIcon", type: "ReactNode", required: false, description: "입력 필드 오른쪽 아이콘" },
            { name: "aria-label", type: "string", required: false, description: "label이 없을 때 필수 접근성 레이블" },
            { name: "id", type: "string", required: false, description: "input 요소의 id" },
          ]}
        />
      </Section>
    </div>
  );
}

// ─── Demo Components ──────────────────────────────────────────────────

function BasicUsageDemo() {
  const [name, setName] = useState("");
  return <TextField label="이름" placeholder="홍길동" value={name} onChange={setName} />;
}

function ValidationDemo() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validate = (val: string) => {
    if (!val) {
      setError("이메일을 입력하세요.");
    } else if (!/^[^@]+@[^@]+\.[^@]+$/.test(val)) {
      setError("올바른 이메일 형식이 아닙니다.");
    } else {
      setError("");
    }
  };

  return (
    <TextField
      label="이메일"
      type="email"
      placeholder="example@email.com"
      value={email}
      onChange={setEmail}
      error={error || undefined}
      onBlur={() => validate(email)}
    />
  );
}

function FormDemo() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!form.name) newErrors.name = "이름을 입력하세요.";
    if (!form.email) newErrors.email = "이메일을 입력하세요.";
    if (!form.password || form.password.length < 8)
      newErrors.password = "비밀번호는 8자 이상이어야 합니다.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: spacing.primitive[6] }}>
        <div style={{ fontSize: typography.fontSize.xl, marginBottom: spacing.primitive[2] }}>✓</div>
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--content-success-default)", margin: 0 }}>가입 완료!</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[4] }}>
        <TextField
          label="이름"
          placeholder="홍길동"
          value={form.name}
          onChange={(v) => setForm((p) => ({ ...p, name: v }))}
          error={errors.name}
          required
        />
        <TextField
          label="이메일"
          type="email"
          placeholder="example@email.com"
          value={form.email}
          onChange={(v) => setForm((p) => ({ ...p, email: v }))}
          error={errors.email}
          required
        />
        <TextField
          label="비밀번호"
          type="password"
          placeholder="8자 이상 입력"
          value={form.password}
          onChange={(v) => setForm((p) => ({ ...p, password: v }))}
          error={errors.password}
          helperText={!errors.password ? "영문, 숫자 포함 8자 이상" : undefined}
          required
        />
        <button
          type="submit"
          style={{
            marginTop: spacing.primitive[2],
            padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`,
            backgroundColor: "var(--surface-brand-default)",
            color: "var(--inverse-content-default)",
            border: "none",
            borderRadius: radius.component.button.md,
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.semibold,
            cursor: "pointer",
          }}
        >
          가입하기
        </button>
      </div>
    </form>
  );
}

// ─── UI Helpers ───────────────────────────────────────────────────────

function StatePreview({
  label,
  sublabel,
  children,
}: {
  label: string;
  sublabel: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: spacing.primitive[3],
        padding: spacing.primitive[4],
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: spacing.primitive[12],
        }}
      >
        {children}
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.medium, color: "var(--text-primary)" }}>
          {label}
        </div>
        <div style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", marginTop: 2 }}>
          {sublabel}
        </div>
      </div>
    </div>
  );
}

function MiniInput({
  borderColor,
  text,
  opacity: opacityVal,
  errorDot,
}: {
  borderColor: string;
  text?: string;
  opacity?: number;
  errorDot?: boolean;
}) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 80,
        height: 32,
        borderRadius: 6,
        border: `1.5px solid ${borderColor}`,
        backgroundColor: "var(--surface-base-default)",
        display: "flex",
        alignItems: "center",
        padding: "0 8px",
        opacity: opacityVal ?? 1,
        boxSizing: "border-box" as const,
        position: "relative" as const,
      }}
    >
      <span
        style={{
          fontSize: 10,
          color: text ? "var(--content-base-default)" : "var(--content-base-placeholder)",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap" as const,
        }}
      >
        {text ?? "placeholder"}
      </span>
      {errorDot && (
        <div
          style={{
            position: "absolute" as const,
            bottom: -14,
            left: 0,
            fontSize: 9,
            color: "var(--content-error-default)",
            whiteSpace: "nowrap" as const,
          }}
        >
          오류 메시지
        </div>
      )}
    </div>
  );
}

function InteractionCard({
  label,
  sublabel,
  borderColor,
  highlight,
  opacity: opacityVal,
}: {
  label: string;
  sublabel: string;
  borderColor: string;
  highlight?: boolean;
  opacity?: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: spacing.primitive[3],
        padding: spacing.primitive[4],
      }}
    >
      <div
        style={{
          width: "100%",
          height: 36,
          borderRadius: 8,
          border: `1.5px solid ${borderColor}`,
          backgroundColor: highlight ? "var(--surface-base-default)" : "var(--surface-base-default)",
          opacity: opacityVal ?? 1,
          boxShadow: highlight ? `0 0 0 3px var(--surface-brand-secondary)` : "none",
          boxSizing: "border-box" as const,
        }}
      />
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.medium, color: "var(--text-primary)" }}>
          {label}
        </div>
        <div style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", marginTop: 2 }}>
          {sublabel}
        </div>
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
