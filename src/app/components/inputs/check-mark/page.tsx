"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform, highlightCode } from "@/components/PlatformTabs";
import { CheckMark, typography, spacing, radius } from '@baerae-zkap/design-system';
import { Section, Subsection, InlineCode } from "@/components/docs/Section";
import { PropsTable } from "@/components/docs/PropsTable";
import { PrincipleCard, VariantCard, DoCard, DontCard } from "@/components/docs/Cards";
import { RadioGroup, CopyButton } from "@/components/docs/Playground";

// ─── Types ───────────────────────────────────────────────────────────
type CheckMarkSize = "small" | "medium";

export default function CheckMarkPage() {
  return (
    <div style={{ maxWidth: 840 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Inputs" },
          { label: "Check Mark" },
        ]}
      />

      {/* Header */}
      <h1 style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold, marginBottom: spacing.primitive[2], color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
        Check Mark
      </h1>
      <p style={{ fontSize: typography.fontSize.md, color: "var(--text-secondary)", marginBottom: spacing.primitive[8], lineHeight: 1.7 }}>
        약관 동의나 중요 정보 확인 등 읽음/확인/동의 상태를 나타냅니다.
      </p>

      {/* Interactive Playground */}
      <CheckMarkPlayground />

      {/* Platform Tabs */}
      <PlatformTabs>
        {(platform) => <PlatformContent platform={platform} />}
      </PlatformTabs>
    </div>
  );
}

// ─── Playground ──────────────────────────────────────────────────────

function CheckMarkPlayground() {
  const [size, setSize] = useState<CheckMarkSize>("medium");
  const [disabled, setDisabled] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [hasLabel, setHasLabel] = useState(true);
  const [hasDescription, setHasDescription] = useState(false);

  const generateCode = () => {
    const props = [];
    if (size !== "medium") props.push(`size="${size}"`);
    if (disabled) props.push("disabled");
    if (invalid) props.push("invalid");
    if (hasLabel) props.push('label="약관에 동의합니다"');
    if (hasDescription) props.push('description="서비스 이용약관 및 개인정보 처리방침에 동의합니다."');
    if (!hasLabel) props.push('aria-label="동의"');

    const propsStr = props.length > 0 ? `\n  ${props.join("\n  ")}\n` : " ";
    return `<CheckMark${propsStr.length > 1 ? propsStr : " "}/>`;
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
            <CheckMark
              size={size}
              disabled={disabled}
              invalid={invalid}
              label={hasLabel ? "약관에 동의합니다" : undefined}
              description={hasDescription ? "서비스 이용약관 및 개인정보 처리방침에 동의합니다." : undefined}
              aria-label={!hasLabel ? "동의" : undefined}
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
                onChange={(v) => setSize(v as CheckMarkSize)}
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
          <InlineCode>CheckMark</InlineCode> 컴포넌트는 약관 동의나 중요 정보 확인 등 읽음/확인/동의 상태를 나타낼 때 사용합니다.
          멀티셀렉트 목록 선택이 아닌 확인/동의 용도에 적합합니다.
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
            {/* Checkmark icon only — no box */}
            <path d="M92.5 50L97.5 55L107.5 44.5" stroke="var(--content-brand-default)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />

            {/* Label text */}
            <text x="126" y="47" fill="var(--content-base-default)" fontSize={typography.fontSize.sm} fontWeight={typography.fontWeight.regular}>약관에 동의합니다</text>

            {/* Description text */}
            <text x="126" y="63" fill="var(--content-base-secondary)" fontSize={typography.fontSize.xs}>서비스 이용약관에 동의합니다.</text>

            {/* Line to icon label */}
            <line x1="55" y1="50" x2="90" y2="50" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="90" cy="50" r="3" fill="var(--content-base-default)" />

            {/* Line to label text */}
            <line x1="195" y1="38" x2="195" y2="15" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="195" cy="38" r="3" fill="var(--content-base-default)" />

            {/* Line to description text */}
            <line x1="195" y1="62" x2="195" y2="85" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="195" cy="62" r="3" fill="var(--content-base-default)" />

            {/* Numbered circles */}
            <circle cx="40" cy="50" r="14" fill="var(--content-base-default)" />
            <text x="40" y="55" textAnchor="middle" fill="var(--content-base-onColor)" fontSize={typography.fontSize.xs} fontWeight={typography.fontWeight.semibold}>1</text>

            <circle cx="195" cy="15" r="14" fill="var(--content-base-default)" />
            <text x="195" y="20" textAnchor="middle" fill="var(--content-base-onColor)" fontSize={typography.fontSize.xs} fontWeight={typography.fontWeight.semibold}>2</text>

            <circle cx="195" cy="85" r="14" fill="var(--content-base-default)" />
            <text x="195" y="90" textAnchor="middle" fill="var(--content-base-onColor)" fontSize={typography.fontSize.xs} fontWeight={typography.fontWeight.semibold}>3</text>
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
        <Subsection title="Sizes">
          <PreviewBox>
            <div style={{ display: "flex", gap: spacing.primitive[8], alignItems: "center" }}>
              <div style={{ textAlign: "center" }}>
                <CheckMark size="small" label="Small" />
                <p style={{ fontSize: typography.fontSize["2xs"], color: "var(--content-base-secondary)", marginTop: spacing.primitive[2] }}>14×11</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <CheckMark size="medium" label="Medium" />
                <p style={{ fontSize: typography.fontSize["2xs"], color: "var(--content-base-secondary)", marginTop: spacing.primitive[2] }}>18×14</p>
              </div>
            </div>
          </PreviewBox>
        </Subsection>

        <Subsection title="Checked / Unchecked">
          <PreviewBox>
            <div style={{ display: "flex", gap: spacing.primitive[8], alignItems: "center" }}>
              <CheckMark label="Unchecked" />
              <CheckMark checked label="Checked" />
            </div>
          </PreviewBox>
        </Subsection>
      </Section>

      {/* 4. States */}
      <Section title="States">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          CheckMark의 다양한 상태를 확인할 수 있습니다.
        </p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: spacing.primitive[4],
          padding: spacing.primitive[6],
          backgroundColor: "var(--surface-base-alternative)",
          borderRadius: radius.primitive.md,
        }}>
          <StatePreview label="Inactive" sublabel="기본 상태">
            <CheckMark aria-label="inactive" />
          </StatePreview>
          <StatePreview label="Active" sublabel="선택됨">
            <CheckMark checked aria-label="active" />
          </StatePreview>
          <StatePreview label="Disabled (off)" sublabel="비활성화">
            <CheckMark disabled aria-label="disabled off" />
          </StatePreview>
          <StatePreview label="Disabled (on)" sublabel="비활성화+선택">
            <CheckMark checked disabled aria-label="disabled on" />
          </StatePreview>
        </div>

        <Subsection title="Interaction States">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: spacing.primitive[4] }}>
            CheckMark는 호버, 누름 등 인터랙션 상태를 시각적으로 구분합니다. 직접 마우스를 올려 확인해보세요.
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: spacing.primitive[4],
            padding: spacing.primitive[6],
            backgroundColor: "var(--surface-base-alternative)",
            borderRadius: radius.primitive.md,
          }}>
            <StatePreview label="Default" sublabel="기본 상태">
              <CheckMark aria-label="default" />
            </StatePreview>
            <StatePreview label="Hover" sublabel="마우스 오버">
              <CheckMark aria-label="hover" />
            </StatePreview>
            <StatePreview label="Checked" sublabel="선택됨">
              <CheckMark checked aria-label="checked" />
            </StatePreview>
            <StatePreview label="Invalid" sublabel="유효성 오류">
              <CheckMark invalid aria-label="invalid" />
            </StatePreview>
            <StatePreview label="Disabled" sublabel="비활성화">
              <CheckMark disabled aria-label="disabled" />
            </StatePreview>
          </div>
        </Subsection>
      </Section>

      {/* 5. Usage Guidelines */}
      <Section title="Usage Guidelines">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          CheckMark는 <strong style={{ color: "var(--text-primary)" }}>확인/동의</strong> 용도에 사용합니다. 다중 선택 목록에는 Checkbox를 사용하세요.
        </p>

        <Subsection title="Best Practices">
          <div style={{ display: "grid", gap: spacing.primitive[5] }}>
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <DoCard>
                  <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
                    <CheckMark checked label="이용약관에 동의합니다" />
                    <CheckMark label="개인정보 처리방침에 동의합니다" />
                  </div>
                </DoCard>
                <DontCard>
                  <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
                    <CheckMark checked label="사과" />
                    <CheckMark checked label="바나나" />
                    <CheckMark label="딸기" />
                  </div>
                </DontCard>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> 약관 동의, 확인 용도로 사용합니다
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0, fontStyle: "italic" }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Don&apos;t</span> 다중 선택 목록에는 Checkbox를 사용합니다
                </p>
              </div>
            </div>

            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <DoCard>
                  <CheckMark label="위 내용을 확인했습니다" description="결제 전 반드시 확인해주세요." />
                </DoCard>
                <DontCard>
                  <CheckMark label="위 내용을 확인했습니다. 결제 전 반드시 확인해주세요. 환불 규정도 숙지해주세요." />
                </DontCard>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> 라벨은 간결하게, 설명은 description으로 분리합니다
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0, fontStyle: "italic" }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Don&apos;t</span> 긴 문장을 라벨에 모두 넣지 않습니다
                </p>
              </div>
            </div>
          </div>
        </Subsection>
      </Section>

      {/* 6. Design Tokens */}
      <Section title="Design Tokens">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          CheckMark 컴포넌트에 적용된 Foundation 기반 디자인 토큰입니다.
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
                <tr>
                  <td style={tdStyle}>Icon Size</td>
                  <td style={tdMono}>14×11</td>
                  <td style={tdMono}>18×14</td>
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
                  <td style={tdStyle}>Unchecked icon color</td>
                  <td style={tdStyle}><InlineCode>content.base.secondary</InlineCode></td>
                  <td style={tdMono}>var(--content-base-secondary)</td>
                </tr>
                <tr style={trBorder}>
                  <td style={tdStyle}>Checked icon color</td>
                  <td style={tdStyle}><InlineCode>content.brand.default</InlineCode></td>
                  <td style={tdMono}>var(--content-brand-default)</td>
                </tr>
                <tr style={trBorder}>
                  <td style={tdStyle}>Error / Invalid color</td>
                  <td style={tdStyle}><InlineCode>content.error.default</InlineCode></td>
                  <td style={tdMono}>var(--content-error-default)</td>
                </tr>
                <tr style={trBorder}>
                  <td style={tdStyle}>Label color</td>
                  <td style={tdStyle}><InlineCode>content.base.default</InlineCode></td>
                  <td style={tdMono}>var(--content-base-default)</td>
                </tr>
                <tr style={trBorder}>
                  <td style={tdStyle}>Description color</td>
                  <td style={tdStyle}><InlineCode>content.base.secondary</InlineCode></td>
                  <td style={tdMono}>var(--content-base-secondary)</td>
                </tr>
                <tr>
                  <td style={tdStyle}>Disabled opacity</td>
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

      {/* 7. Accessibility */}
      <Section title="Accessibility">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          CheckMark은 네이티브 <InlineCode>&lt;input type=&quot;checkbox&quot;&gt;</InlineCode>를 사용하여 완전한 접근성을 보장합니다.
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
                  <td style={{ ...tdMono, borderBottom: "1px solid var(--divider)" }}>CheckMark로 포커스 이동</td>
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
                <td style={{ ...tdStyle, fontWeight: typography.fontWeight.medium }}>Checkbox</td>
                <td style={{ ...tdStyle, color: "var(--text-secondary)" }}>다중 선택 목록</td>
                <td style={{ ...tdStyle, color: "var(--text-secondary)" }}>CheckMark은 확인/동의용, Checkbox는 목록 선택용</td>
              </tr>
              <tr style={trBorder}>
                <td style={{ ...tdStyle, fontWeight: typography.fontWeight.medium }}>Switch</td>
                <td style={{ ...tdStyle, color: "var(--text-secondary)" }}>즉시 반영되는 On/Off 토글</td>
                <td style={{ ...tdStyle, color: "var(--text-secondary)" }}>CheckMark은 폼 제출, Switch는 즉시 효과</td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, fontWeight: typography.fontWeight.medium }}>Radio</td>
                <td style={{ ...tdStyle, color: "var(--text-secondary)" }}>그룹에서 하나 선택</td>
                <td style={{ ...tdStyle, color: "var(--text-secondary)" }}>CheckMark은 개별 확인, Radio는 배타적 선택</td>
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
            <p style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)", margin: 0 }}>CheckMark Component</p>
            <p style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", margin: "4px 0 0 0" }}>실제 컴포넌트 소스 코드를 GitHub에서 확인하세요.</p>
          </div>
          <a
            href="https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system/src/components/CheckMark/CheckMark.tsx"
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
        <CodeBlock code={`import { CheckMark } from '@baerae-zkap/design-system';`} />
      </Section>

      {/* 3. Basic Usage */}
      <Section title="Basic Usage">
        <PreviewBox>
          <CheckMark label="이용약관에 동의합니다" />
        </PreviewBox>
        <CodeBlock code={`<CheckMark label="이용약관에 동의합니다" />`} />
      </Section>

      {/* 4. Controlled */}
      <Section title="Controlled">
        <PreviewBox>
          <ControlledDemo />
        </PreviewBox>
        <CodeBlock code={`const [checked, setChecked] = useState(false);

<CheckMark
  checked={checked}
  onChange={setChecked}
  label="알림 수신에 동의합니다"
/>`} />
      </Section>

      {/* 5. With Description */}
      <Section title="With Description">
        <PreviewBox>
          <CheckMark
            label="개인정보 처리방침에 동의합니다"
            description="서비스 이용을 위해 개인정보 수집 및 이용에 동의해주세요."
          />
        </PreviewBox>
        <CodeBlock code={`<CheckMark
  label="개인정보 처리방침에 동의합니다"
  description="서비스 이용을 위해 개인정보 수집 및 이용에 동의해주세요."
/>`} />
      </Section>

      {/* 6. Agreement Form */}
      <Section title="Agreement Form Example">
        <PreviewBox>
          <AgreementFormDemo />
        </PreviewBox>
        <CodeBlock code={`const [terms, setTerms] = useState(false);
const [privacy, setPrivacy] = useState(false);
const [marketing, setMarketing] = useState(false);

const allAgreed = terms && privacy && marketing;

<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
  <CheckMark
    checked={allAgreed}
    onChange={(checked) => {
      setTerms(checked);
      setPrivacy(checked);
      setMarketing(checked);
    }}
    label="전체 동의"
  />
  <div style={{ borderTop: '1px solid var(--divider)', paddingTop: 8 }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingLeft: 32 }}>
      <CheckMark checked={terms} onChange={setTerms} label="이용약관 동의 (필수)" size="small" />
      <CheckMark checked={privacy} onChange={setPrivacy} label="개인정보 처리방침 동의 (필수)" size="small" />
      <CheckMark checked={marketing} onChange={setMarketing} label="마케팅 수신 동의 (선택)" size="small" />
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
            { name: "label", type: "ReactNode", required: false, description: "레이블 텍스트" },
            { name: "description", type: "ReactNode", required: false, description: "레이블 아래 설명 텍스트" },
            { name: "size", type: '"small" | "medium"', required: false, defaultVal: '"medium"', description: "크기" },
            { name: "disabled", type: "boolean", required: false, defaultVal: "false", description: "비활성화" },
            { name: "invalid", type: "boolean", required: false, defaultVal: "false", description: "유효성 오류 상태" },
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
    <CheckMark
      checked={checked}
      onChange={setChecked}
      label="알림 수신에 동의합니다"
    />
  );
}

function AgreementFormDemo() {
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [marketing, setMarketing] = useState(false);

  const allAgreed = terms && privacy && marketing;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.primitive[2] }}>
      <CheckMark
        checked={allAgreed}
        onChange={(checked) => {
          setTerms(checked);
          setPrivacy(checked);
          setMarketing(checked);
        }}
        label="전체 동의"
      />
      <div style={{ borderTop: '1px solid var(--divider)', paddingTop: spacing.primitive[2] }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.primitive[1], paddingLeft: spacing.primitive[8] }}>
          <CheckMark checked={terms} onChange={setTerms} label="이용약관 동의 (필수)" size="small" />
          <CheckMark checked={privacy} onChange={setPrivacy} label="개인정보 처리방침 동의 (필수)" size="small" />
          <CheckMark checked={marketing} onChange={setMarketing} label="마케팅 수신 동의 (선택)" size="small" />
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
