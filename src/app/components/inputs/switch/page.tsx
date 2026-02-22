"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform, highlightCode } from "@/components/PlatformTabs";
import { Switch, typography, spacing, radius } from '@baerae-zkap/design-system';
import { Section, Subsection, InlineCode } from "@/components/docs/Section";
import { PropsTable } from "@/components/docs/PropsTable";
import { PrincipleCard, DoCard, DontCard } from "@/components/docs/Cards";
import { RadioGroup, CopyButton } from "@/components/docs/Playground";

// ─── Types ───────────────────────────────────────────────────────────
type SwitchSize = "small" | "medium";

export default function SwitchPage() {
  return (
    <div style={{ maxWidth: 840 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Inputs" },
          { label: "Switch" },
        ]}
      />

      {/* Header */}
      <h1 style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold, marginBottom: spacing.primitive[2], color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
        Switch
      </h1>
      <p style={{ fontSize: typography.fontSize.md, color: "var(--text-secondary)", marginBottom: spacing.primitive[8], lineHeight: 1.7 }}>
        즉각적인 On/Off 상태 전환에 사용합니다. 폼 제출이 아닌 즉시 반영되는 설정에 적합합니다.
      </p>

      {/* Interactive Playground */}
      <SwitchPlayground />

      {/* Platform Tabs */}
      <PlatformTabs>
        {(platform) => <PlatformContent platform={platform} />}
      </PlatformTabs>
    </div>
  );
}

// ─── Playground ──────────────────────────────────────────────────────

function SwitchPlayground() {
  const [size, setSize] = useState<SwitchSize>("medium");
  const [checked, setChecked] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [hasLabel, setHasLabel] = useState(true);
  const [hasDescription, setHasDescription] = useState(false);

  const generateCode = () => {
    const props = [];
    props.push(`checked={${checked}}`);
    props.push('onChange={setChecked}');
    if (size !== "medium") props.push(`size="${size}"`);
    if (disabled) props.push("disabled");
    if (hasLabel) props.push('label="다크 모드"');
    if (hasDescription) props.push('description="어두운 테마로 전환합니다."');
    if (!hasLabel) props.push('aria-label="다크 모드"');

    const propsStr = props.length > 0 ? `\n  ${props.join("\n  ")}\n` : " ";
    return `<Switch${propsStr.length > 1 ? propsStr : " "}/>`;
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
            <Switch
              checked={checked}
              onChange={setChecked}
              size={size}
              disabled={disabled}
              label={hasLabel ? "다크 모드" : undefined}
              description={hasDescription ? "어두운 테마로 전환합니다." : undefined}
              aria-label={!hasLabel ? "다크 모드" : undefined}
            />
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
              {/* Size */}
              <RadioGroup
                label="Size"
                options={[
                  { value: "small", label: "Small" },
                  { value: "medium", label: "Medium" },
                ]}
                value={size}
                onChange={(v) => setSize(v as SwitchSize)}
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
          <InlineCode>Switch</InlineCode>는 즉각적인 On/Off 상태 전환에 사용합니다. 폼 제출이 아닌 즉시 반영되는 설정(알림, 다크모드 등)에 적합합니다.
          값을 저장 후 제출하는 용도에는 Checkbox를 사용하세요.
        </p>
      </Section>

      {/* 2. Anatomy */}
      <Section title="Anatomy">
        <div style={{
          backgroundColor: "var(--surface-base-alternative)",
          borderRadius: radius.primitive.md,
          padding: `${spacing.primitive[12]}px ${spacing.primitive[10]}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <svg width="420" height="110" viewBox="0 0 420 110">
            {/* Track (off state) */}
            <rect x="80" y="35" width="44" height="24" rx="12" fill="var(--fill-base-default)" />
            {/* Thumb */}
            <circle cx="92" cy="47" r="9" fill="white" />

            {/* Label text */}
            <text x="138" y="44" fill="var(--content-base-default)" fontSize={typography.fontSize.sm} fontWeight={typography.fontWeight.regular}>알림 수신</text>

            {/* Description text */}
            <text x="138" y="62" fill="var(--content-base-secondary)" fontSize={typography.fontSize.xs}>새 알림을 받습니다.</text>

            {/* Line to track label */}
            <line x1="50" y1="47" x2="79" y2="47" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="79" cy="47" r="3" fill="var(--content-base-default)" />

            {/* Line to thumb label */}
            <line x1="92" y1="37" x2="92" y2="18" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="92" cy="37" r="3" fill="var(--content-base-default)" />

            {/* Line to label text */}
            <line x1="175" y1="40" x2="175" y2="18" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="175" cy="40" r="3" fill="var(--content-base-default)" />

            {/* Line to description text */}
            <line x1="175" y1="62" x2="175" y2="88" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="175" cy="62" r="3" fill="var(--content-base-default)" />

            {/* Numbered circles */}
            <circle cx="35" cy="47" r="14" fill="var(--content-base-default)" />
            <text x="35" y="52" textAnchor="middle" fill="white" fontSize={typography.fontSize.xs} fontWeight={typography.fontWeight.semibold}>1</text>

            <circle cx="92" cy="12" r="14" fill="var(--content-base-default)" />
            <text x="92" y="17" textAnchor="middle" fill="white" fontSize={typography.fontSize.xs} fontWeight={typography.fontWeight.semibold}>2</text>

            <circle cx="175" cy="12" r="14" fill="var(--content-base-default)" />
            <text x="175" y="17" textAnchor="middle" fill="white" fontSize={typography.fontSize.xs} fontWeight={typography.fontWeight.semibold}>3</text>

            <circle cx="175" cy="96" r="14" fill="var(--content-base-default)" />
            <text x="175" y="101" textAnchor="middle" fill="white" fontSize={typography.fontSize.xs} fontWeight={typography.fontWeight.semibold}>4</text>
          </svg>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: spacing.primitive[4],
          marginTop: spacing.primitive[5],
          fontSize: typography.fontSize.sm,
          fontWeight: typography.fontWeight.medium,
          color: "var(--text-primary)",
        }}>
          <div>1. Track</div>
          <div style={{ textAlign: "center" }}>2. Thumb</div>
          <div style={{ textAlign: "center" }}>3. Label</div>
          <div style={{ textAlign: "right" }}>4. Description</div>
        </div>
      </Section>

      {/* 3. Variants */}
      <Section title="Variants">
        <Subsection title="Sizes">
          <PreviewBox>
            <div style={{ display: "flex", gap: spacing.primitive[10], alignItems: "center" }}>
              <div style={{ textAlign: "center" }}>
                <Switch size="small" label="Small" />
                <p style={{ fontSize: typography.fontSize["2xs"], color: "var(--content-base-secondary)", marginTop: spacing.primitive[2] }}>Track 36×20 / Thumb 14×14</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <Switch size="medium" label="Medium" />
                <p style={{ fontSize: typography.fontSize["2xs"], color: "var(--content-base-secondary)", marginTop: spacing.primitive[2] }}>Track 44×24 / Thumb 18×18</p>
              </div>
            </div>
          </PreviewBox>
        </Subsection>
      </Section>

      {/* 4. States */}
      <Section title="States">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          Switch의 다양한 상태를 확인할 수 있습니다.
        </p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: spacing.primitive[4],
          padding: spacing.primitive[6],
          backgroundColor: "var(--surface-base-alternative)",
          borderRadius: radius.primitive.md,
        }}>
          <StatePreview label="Off" sublabel="기본 상태">
            <Switch aria-label="off" />
          </StatePreview>
          <StatePreview label="On" sublabel="활성화">
            <Switch defaultChecked aria-label="on" />
          </StatePreview>
          <StatePreview label="Disabled (off)" sublabel="비활성화">
            <Switch disabled aria-label="disabled off" />
          </StatePreview>
          <StatePreview label="Disabled (on)" sublabel="비활성화+켜짐">
            <Switch defaultChecked disabled aria-label="disabled on" />
          </StatePreview>
        </div>

        <Subsection title="Interaction States">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: spacing.primitive[4] }}>
            Switch는 호버·누름 상태에 따라 Track 배경색이 변화합니다. 각 상태의 시각적 표현을 확인하세요.
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: spacing.primitive[2],
            padding: spacing.primitive[6],
            backgroundColor: "var(--surface-base-alternative)",
            borderRadius: radius.primitive.md,
          }}>
            <SwitchInteractionStateCard label="Default Off" sublabel="기본 / 꺼짐" trackColor="var(--fill-normal)" checked={false} />
            <SwitchInteractionStateCard label="Default On" sublabel="기본 / 켜짐" trackColor="var(--surface-brand-default)" checked />
            <SwitchInteractionStateCard label="Hover Off" sublabel="호버 / 꺼짐" trackColor="var(--surface-base-alternative)" checked={false} bordered />
            <SwitchInteractionStateCard label="Hover On" sublabel="호버 / 켜짐" trackColor="var(--surface-brand-defaultPressed)" checked />
            <SwitchInteractionStateCard label="Pressed Off" sublabel="누름 / 꺼짐" trackColor="var(--fill-base-default)" checked={false} />
            <SwitchInteractionStateCard label="Pressed On" sublabel="누름 / 켜짐" trackColor="var(--surface-brand-defaultPressed)" checked />
            <SwitchInteractionStateCard label="Disabled Off" sublabel="비활성 / 꺼짐" trackColor="var(--fill-normal)" checked={false} disabled />
            <SwitchInteractionStateCard label="Disabled On" sublabel="비활성 / 켜짐" trackColor="var(--surface-brand-default)" checked disabled />
          </div>
        </Subsection>
      </Section>

      {/* 5. Usage Guidelines */}
      <Section title="Usage Guidelines">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          Switch는 <strong style={{ color: "var(--text-primary)" }}>즉시 효과</strong>가 있는 설정에 사용합니다. 폼 제출 후 적용되는 값에는 Checkbox를 사용하세요.
        </p>

        <Subsection title="Best Practices">
          <div style={{ display: "grid", gap: spacing.primitive[5] }}>
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <DoCard>
                  <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[3] }}>
                    <Switch defaultChecked label="다크 모드" description="어두운 테마를 사용합니다." />
                    <Switch label="알림 수신" description="푸시 알림을 받습니다." />
                  </div>
                </DoCard>
                <DontCard>
                  <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[3] }}>
                    <Switch label="이용약관 동의" />
                    <Switch label="개인정보 처리방침 동의" />
                  </div>
                </DontCard>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> 즉시 반영되는 설정(다크모드, 알림 등)에 사용합니다
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0, fontStyle: "italic" }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Don&apos;t</span> 폼 제출로 저장되는 동의/선택에는 Checkbox를 사용합니다
                </p>
              </div>
            </div>

            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <DoCard>
                  <Switch label="알림 수신" description="새 메시지 도착 시 알림을 보냅니다." />
                </DoCard>
                <DontCard>
                  <Switch label="알림 수신. 새 메시지 도착 시 알림을 보냅니다. 방해 금지 시간 설정도 가능합니다." />
                </DontCard>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> 라벨은 간결하게, 부가 설명은 description으로 분리합니다
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
          Switch 컴포넌트에 적용된 Foundation 기반 디자인 토큰입니다.
        </p>

        <Subsection title="Track 크기 토큰">
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
                  <td style={tdStyle}>Track Width</td>
                  <td style={tdMono}>36px</td>
                  <td style={tdMono}>44px</td>
                </tr>
                <tr style={trBorder}>
                  <td style={tdStyle}>Track Height</td>
                  <td style={tdMono}>20px</td>
                  <td style={tdMono}>24px</td>
                </tr>
                <tr style={trBorder}>
                  <td style={tdStyle}>Thumb Size</td>
                  <td style={tdMono}>14×14px</td>
                  <td style={tdMono}>18×18px</td>
                </tr>
                <tr>
                  <td style={tdStyle}>Thumb Offset</td>
                  <td style={tdMono}>3px</td>
                  <td style={tdMono}>3px</td>
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
                  <th style={thStyle}>Element</th>
                  <th style={thStyle}>State</th>
                  <th style={thStyle}>Token</th>
                  <th style={thStyle}>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr style={trBorder}>
                  <td style={tdStyle}>Track</td>
                  <td style={tdStyle}>On</td>
                  <td style={tdStyle}><InlineCode>surface.brand.default</InlineCode></td>
                  <td style={tdMono}>var(--surface-brand-default)</td>
                </tr>
                <tr style={trBorder}>
                  <td style={tdStyle}>Track</td>
                  <td style={tdStyle}>Off</td>
                  <td style={tdStyle}><InlineCode>fill.normal</InlineCode></td>
                  <td style={tdMono}>var(--fill-normal)</td>
                </tr>
                <tr style={trBorder}>
                  <td style={tdStyle}>Thumb</td>
                  <td style={tdStyle}>Any</td>
                  <td style={tdStyle}><InlineCode>content.base.onColor</InlineCode></td>
                  <td style={tdMono}>var(--content-base-onColor)</td>
                </tr>
                <tr style={trBorder}>
                  <td style={tdStyle}>Label</td>
                  <td style={tdStyle}>Default</td>
                  <td style={tdStyle}><InlineCode>content.base.default</InlineCode></td>
                  <td style={tdMono}>var(--content-base-default)</td>
                </tr>
                <tr style={trBorder}>
                  <td style={tdStyle}>Description</td>
                  <td style={tdStyle}>Default</td>
                  <td style={tdStyle}><InlineCode>content.base.secondary</InlineCode></td>
                  <td style={tdMono}>var(--content-base-secondary)</td>
                </tr>
                <tr>
                  <td style={tdStyle}>Container</td>
                  <td style={tdStyle}>Disabled</td>
                  <td style={tdStyle}><InlineCode>opacity.disabled</InlineCode></td>
                  <td style={tdMono}>0.5</td>
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
                  <td style={tdStyle}>Track-Label Gap</td>
                  <td style={tdStyle}><InlineCode>spacing.primitive[3]</InlineCode></td>
                  <td style={tdMono}>12px</td>
                </tr>
                <tr style={trBorder}>
                  <td style={tdStyle}>Label-Description Gap</td>
                  <td style={tdStyle}><InlineCode>spacing.primitive[1]</InlineCode></td>
                  <td style={tdMono}>4px</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Motion">
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
                  <td style={tdStyle}>Track Color</td>
                  <td style={tdStyle}><InlineCode>transitions.all</InlineCode></td>
                  <td style={tdMono}>background-color 200ms ease-out</td>
                </tr>
                <tr>
                  <td style={tdStyle}>Thumb Slide</td>
                  <td style={tdStyle}><InlineCode>transitions.transform</InlineCode></td>
                  <td style={tdMono}>transform 300ms cubic-bezier(0.16, 1, 0.3, 1)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>
      </Section>

      {/* 7. Accessibility */}
      <Section title="Accessibility">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          Switch는 네이티브 <InlineCode>&lt;input type=&quot;checkbox&quot; role=&quot;switch&quot;&gt;</InlineCode>를 사용하여 완전한 접근성을 보장합니다.
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
                <td style={{ ...tdStyle, borderBottom: "1px solid var(--divider)" }}><InlineCode>role=&quot;switch&quot;</InlineCode></td>
                <td style={{ ...tdMono, borderBottom: "1px solid var(--divider)" }}>스크린 리더에 스위치 컨트롤임을 전달</td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, borderBottom: "1px solid var(--divider)" }}><InlineCode>aria-checked</InlineCode></td>
                <td style={{ ...tdMono, borderBottom: "1px solid var(--divider)" }}>현재 On/Off 상태를 보조 기술에 전달</td>
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
                  <td style={{ ...tdMono, borderBottom: "1px solid var(--divider)" }}>Switch로 포커스 이동</td>
                </tr>
                <tr>
                  <td style={tdStyle}>
                    <kbd style={kbdStyle}>Space</kbd>
                  </td>
                  <td style={tdMono}>On/Off 상태 토글</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Design Principles">
          <div style={{ display: "grid", gap: spacing.primitive[4] }}>
            <PrincipleCard
              number={1}
              title="네이티브 input 기반"
              desc="숨겨진 네이티브 input(role=switch)을 사용하여 스크린 리더, 키보드 네비게이션 등 모든 브라우저 접근성을 자동으로 지원합니다."
            />
            <PrincipleCard
              number={2}
              title="aria-label 필수"
              desc="label prop이 없는 경우 반드시 aria-label을 제공해야 합니다. 시각적으로 보이는 텍스트가 없으면 보조 기술이 컨트롤의 목적을 알 수 없습니다."
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
                <td style={{ ...tdStyle, color: "var(--text-secondary)" }}>폼 제출 값 선택</td>
                <td style={{ ...tdStyle, color: "var(--text-secondary)" }}>Switch는 즉시 효과, Checkbox는 폼 제출 후 적용</td>
              </tr>
              <tr style={trBorder}>
                <td style={{ ...tdStyle, fontWeight: typography.fontWeight.medium }}>CheckMark</td>
                <td style={{ ...tdStyle, color: "var(--text-secondary)" }}>약관 확인/동의</td>
                <td style={{ ...tdStyle, color: "var(--text-secondary)" }}>Switch는 설정 토글, CheckMark는 확인/동의 용도</td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, fontWeight: typography.fontWeight.medium }}>Radio</td>
                <td style={{ ...tdStyle, color: "var(--text-secondary)" }}>그룹에서 하나 선택</td>
                <td style={{ ...tdStyle, color: "var(--text-secondary)" }}>Switch는 단일 On/Off, Radio는 배타적 선택</td>
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
        <div style={{ padding: spacing.primitive[4], backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.md, marginBottom: spacing.primitive[6], display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)", margin: 0 }}>Switch Component</p>
            <p style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", margin: "4px 0 0 0" }}>실제 컴포넌트 소스 코드를 GitHub에서 확인하세요.</p>
          </div>
          <a
            href="https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system/src/components/Switch/Switch.tsx"
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
        <CodeBlock code={`import { Switch } from '@baerae-zkap/design-system';`} />
      </Section>

      {/* 3. Basic Usage */}
      <Section title="Basic Usage">
        <PreviewBox>
          <Switch label="다크 모드" />
        </PreviewBox>
        <CodeBlock code={`<Switch label="다크 모드" />`} />
      </Section>

      {/* 4. Controlled */}
      <Section title="Controlled">
        <PreviewBox>
          <ControlledDemo />
        </PreviewBox>
        <CodeBlock code={`const [enabled, setEnabled] = useState(false);

<Switch
  checked={enabled}
  onChange={setEnabled}
  label="알림 수신"
  description="새 메시지가 도착하면 알림을 보냅니다."
/>`} />
      </Section>

      {/* 5. Settings List Example */}
      <Section title="Settings List Example">
        <PreviewBox>
          <SettingsListDemo />
        </PreviewBox>
        <CodeBlock code={`const [darkMode, setDarkMode] = useState(false);
const [notifications, setNotifications] = useState(true);
const [sounds, setSounds] = useState(true);

<div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
  {/* Row 1 */}
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 0',
    borderBottom: '1px solid var(--divider)',
  }}>
    <div>
      <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>다크 모드</p>
      <p style={{ margin: '2px 0 0', fontSize: 13, color: 'var(--text-secondary)' }}>어두운 테마를 사용합니다</p>
    </div>
    <Switch checked={darkMode} onChange={setDarkMode} aria-label="다크 모드" />
  </div>

  {/* Row 2 */}
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 0',
    borderBottom: '1px solid var(--divider)',
  }}>
    <div>
      <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>알림 수신</p>
      <p style={{ margin: '2px 0 0', fontSize: 13, color: 'var(--text-secondary)' }}>푸시 알림을 받습니다</p>
    </div>
    <Switch checked={notifications} onChange={setNotifications} aria-label="알림 수신" />
  </div>

  {/* Row 3 */}
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 0',
  }}>
    <div>
      <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>소리 효과</p>
      <p style={{ margin: '2px 0 0', fontSize: 13, color: 'var(--text-secondary)' }}>알림 소리를 재생합니다</p>
    </div>
    <Switch checked={sounds} onChange={setSounds} aria-label="소리 효과" />
  </div>
</div>`} />
      </Section>

      {/* 6. API Reference */}
      <Section title="API Reference">
        <PropsTable
          props={[
            { name: "checked", type: "boolean", required: false, description: "On/Off 상태 (제어 모드)" },
            { name: "defaultChecked", type: "boolean", required: false, defaultVal: "false", description: "초기 상태 (비제어 모드)" },
            { name: "onChange", type: "(checked: boolean) => void", required: false, description: "상태 변경 콜백" },
            { name: "label", type: "ReactNode", required: false, description: "레이블 텍스트" },
            { name: "description", type: "ReactNode", required: false, description: "레이블 아래 설명 텍스트" },
            { name: "size", type: '"small" | "medium"', required: false, defaultVal: '"medium"', description: "크기" },
            { name: "disabled", type: "boolean", required: false, defaultVal: "false", description: "비활성화" },
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
  const [enabled, setEnabled] = useState(false);
  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      label="알림 수신"
      description="새 메시지가 도착하면 알림을 보냅니다."
    />
  );
}

function SettingsListDemo() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [sounds, setSounds] = useState(true);

  const rows = [
    { label: "다크 모드", desc: "어두운 테마를 사용합니다", checked: darkMode, onChange: setDarkMode, ariaLabel: "다크 모드" },
    { label: "알림 수신", desc: "푸시 알림을 받습니다", checked: notifications, onChange: setNotifications, ariaLabel: "알림 수신" },
    { label: "소리 효과", desc: "알림 소리를 재생합니다", checked: sounds, onChange: setSounds, ariaLabel: "소리 효과" },
  ];

  return (
    <div style={{ width: "100%", maxWidth: 400 }}>
      {rows.map((row, i) => (
        <div
          key={row.label}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: `${spacing.primitive[4]}px 0`,
            borderBottom: i < rows.length - 1 ? "1px solid var(--divider)" : "none",
          }}
        >
          <div>
            <p style={{ margin: 0, fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium, color: "var(--text-primary)" }}>{row.label}</p>
            <p style={{ margin: `${spacing.primitive[1] / 2}px 0 0`, fontSize: typography.fontSize.xs, color: "var(--text-secondary)" }}>{row.desc}</p>
          </div>
          <Switch
            checked={row.checked}
            onChange={row.onChange}
            aria-label={row.ariaLabel}
          />
        </div>
      ))}
    </div>
  );
}

// ─── UI Helpers ──────────────────────────────────────────────────────

function SwitchInteractionStateCard({
  label,
  sublabel,
  trackColor,
  checked,
  disabled,
  bordered,
}: {
  label: string;
  sublabel: string;
  trackColor: string;
  checked: boolean;
  disabled?: boolean;
  bordered?: boolean;
}) {
  // Medium size geometry: 44×24 track, 18×18 thumb, 3px offset, 20px travel
  const trackWidth = 44;
  const trackHeight = 24;
  const thumbSize = 18;
  const thumbOffset = 3;
  const thumbTravel = trackWidth - thumbSize - thumbOffset * 2;

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: spacing.primitive[3],
      padding: spacing.primitive[4],
    }}>
      <div
        style={{
          position: "relative",
          width: trackWidth,
          height: trackHeight,
          borderRadius: radius.primitive.full,
          backgroundColor: trackColor,
          border: bordered ? "1.5px solid var(--border-base-default)" : "none",
          boxSizing: "border-box",
          opacity: disabled ? 0.4 : 1,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: thumbOffset,
            left: thumbOffset + (checked ? thumbTravel : 0),
            width: thumbSize,
            height: thumbSize,
            borderRadius: radius.primitive.full,
            backgroundColor: "var(--content-base-onColor)",
          }}
        />
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.medium, color: "var(--text-primary)" }}>{label}</div>
        <div style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", marginTop: 2 }}>{sublabel}</div>
      </div>
    </div>
  );
}

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
