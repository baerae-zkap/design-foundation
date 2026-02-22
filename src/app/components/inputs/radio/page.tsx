"use client";

import React, { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform, highlightCode } from "@/components/PlatformTabs";
import { Radio, RadioGroup, typography, spacing, radius } from '@baerae-zkap/design-system';
import { Section, Subsection, InlineCode } from "@/components/docs/Section";
import { PropsTable } from "@/components/docs/PropsTable";
import { PrincipleCard, DoCard, DontCard } from "@/components/docs/Cards";
import { RadioGroup as PlaygroundRadioGroup, CopyButton } from "@/components/docs/Playground";

// ─── Types ───────────────────────────────────────────────────────────
type RadioSizeOption = "small" | "medium";
type OrientationOption = "vertical" | "horizontal";

export default function RadioPage() {
  return (
    <div style={{ maxWidth: 840 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Inputs" },
          { label: "Radio" },
        ]}
      />

      {/* Header */}
      <h1 style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold, marginBottom: spacing.primitive[2], color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
        Radio
      </h1>
      <p style={{ fontSize: typography.fontSize.md, color: "var(--text-secondary)", marginBottom: spacing.primitive[8], lineHeight: 1.7 }}>
        그룹 내에서 하나의 옵션만 선택할 수 있습니다. 동일한 그룹 내에서 오직 하나만 선택 가능하며, 선택하는 동작은 라디오 자체로 표현됩니다.
      </p>

      {/* Interactive Playground */}
      <RadioPlayground />

      {/* Platform Tabs */}
      <PlatformTabs>
        {(platform) => <PlatformContent platform={platform} />}
      </PlatformTabs>
    </div>
  );
}

// ─── Playground ──────────────────────────────────────────────────────

function RadioPlayground() {
  const [size, setSize] = useState<RadioSizeOption>("medium");
  const [orientation, setOrientation] = useState<OrientationOption>("vertical");
  const [disabled, setDisabled] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [hasDescription, setHasDescription] = useState(false);

  const generateCode = () => {
    const groupProps = [];
    if (orientation !== "vertical") groupProps.push(`orientation="${orientation}"`);
    if (disabled) groupProps.push("disabled");
    if (invalid) groupProps.push("invalid");
    groupProps.push('aria-label="과일 선택"');

    const radioProps: string[] = [];
    if (size !== "medium") radioProps.push(`size="${size}"`);

    const sizeAttr = radioProps.length > 0 ? ` ${radioProps.join(" ")}` : "";
    const descAttr = hasDescription ? `\n    description="설명 텍스트"` : "";

    return `<RadioGroup\n  ${groupProps.join("\n  ")}\n>\n  <Radio value="apple" label="사과"${sizeAttr}${descAttr} />\n  <Radio value="banana" label="바나나"${sizeAttr}${descAttr} />\n  <Radio value="strawberry" label="딸기"${sizeAttr}${descAttr} />\n</RadioGroup>`;
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
            <RadioGroup
              orientation={orientation}
              disabled={disabled}
              invalid={invalid}
              aria-label="과일 선택"
            >
              <Radio
                value="apple"
                label="사과"
                size={size}
                description={hasDescription ? "빨간색 과일입니다." : undefined}
              />
              <Radio
                value="banana"
                label="바나나"
                size={size}
                description={hasDescription ? "노란색 과일입니다." : undefined}
              />
              <Radio
                value="strawberry"
                label="딸기"
                size={size}
                description={hasDescription ? "작고 빨간 과일입니다." : undefined}
              />
            </RadioGroup>
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
              <PlaygroundRadioGroup
                label="Size"
                options={[
                  { value: "small", label: "Small" },
                  { value: "medium", label: "Medium" },
                ]}
                value={size}
                onChange={(v) => setSize(v as RadioSizeOption)}
              />

              {/* Orientation */}
              <PlaygroundRadioGroup
                label="Orientation"
                options={[
                  { value: "vertical", label: "Vertical" },
                  { value: "horizontal", label: "Horizontal" },
                ]}
                value={orientation}
                onChange={(v) => setOrientation(v as OrientationOption)}
              />

              {/* Description */}
              <PlaygroundRadioGroup
                label="Description"
                options={[
                  { value: "false", label: "Hide" },
                  { value: "true", label: "Show" },
                ]}
                value={hasDescription ? "true" : "false"}
                onChange={(v) => setHasDescription(v === "true")}
              />

              {/* Disabled */}
              <PlaygroundRadioGroup
                label="Disabled"
                options={[
                  { value: "false", label: "False" },
                  { value: "true", label: "True" },
                ]}
                value={disabled ? "true" : "false"}
                onChange={(v) => setDisabled(v === "true")}
              />

              {/* Invalid */}
              <PlaygroundRadioGroup
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
          <InlineCode>Radio</InlineCode> 컴포넌트는 그룹 내에서 하나의 옵션만 선택할 수 있는 입력 컨트롤입니다.
          <InlineCode>RadioGroup</InlineCode>으로 감싸서 사용하며, Checkbox와 달리 단일 선택만 가능합니다.
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
          <svg width="400" height="100" viewBox="0 0 400 100">
            {/* Control circle */}
            <circle cx="112" cy="50" r="12" fill="none" stroke="var(--surface-brand-default)" strokeWidth="1.5" />
            <circle cx="112" cy="50" r="5" fill="var(--surface-brand-default)" />

            {/* Label text */}
            <text x="136" y="47" fill="var(--content-base-default)" fontSize={typography.fontSize.sm} fontWeight={typography.fontWeight.regular}>옵션 레이블</text>

            {/* Description text */}
            <text x="136" y="63" fill="var(--content-base-secondary)" fontSize={typography.fontSize.xs}>옵션에 대한 설명 텍스트</text>

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
          <div>1. Control (Circle)</div>
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
                <RadioGroup aria-label="Small demo">
                  <Radio value="small-demo" label="Small" size="small" />
                </RadioGroup>
                <p style={{ fontSize: typography.fontSize["2xs"], color: "var(--content-base-secondary)", marginTop: spacing.primitive[2] }}>20px</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <RadioGroup aria-label="Medium demo">
                  <Radio value="medium-demo" label="Medium" size="medium" />
                </RadioGroup>
                <p style={{ fontSize: typography.fontSize["2xs"], color: "var(--content-base-secondary)", marginTop: spacing.primitive[2] }}>24px</p>
              </div>
            </div>
          </PreviewBox>
        </Subsection>

        <Subsection title="Orientation">
          <PreviewBox>
            <div style={{ display: "flex", gap: spacing.primitive[12], alignItems: "flex-start" }}>
              <div>
                <p style={{ fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.medium, color: "var(--text-secondary)", marginBottom: spacing.primitive[2] }}>Vertical</p>
                <RadioGroup orientation="vertical" defaultValue="a" aria-label="Vertical group">
                  <Radio value="a" label="Option A" />
                  <Radio value="b" label="Option B" />
                  <Radio value="c" label="Option C" />
                </RadioGroup>
              </div>
              <div>
                <p style={{ fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.medium, color: "var(--text-secondary)", marginBottom: spacing.primitive[2] }}>Horizontal</p>
                <RadioGroup orientation="horizontal" defaultValue="x" aria-label="Horizontal group">
                  <Radio value="x" label="Option X" />
                  <Radio value="y" label="Option Y" />
                  <Radio value="z" label="Option Z" />
                </RadioGroup>
              </div>
            </div>
          </PreviewBox>
        </Subsection>
      </Section>

      {/* 4. RadioGroup */}
      <Section title="RadioGroup">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: spacing.primitive[4] }}>
          <InlineCode>RadioGroup</InlineCode>은 Radio를 감싸서 그룹으로 관리합니다.
          <InlineCode>value</InlineCode>/<InlineCode>onChange</InlineCode>로 제어 모드,
          <InlineCode>defaultValue</InlineCode>로 비제어 모드를 지원합니다.
        </p>
        <PreviewBox>
          <RadioGroupDemo />
        </PreviewBox>
      </Section>

      {/* 5. States */}
      <Section title="States">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          Radio의 다양한 상태를 확인할 수 있습니다.
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
            <RadioGroup aria-label="unchecked">
              <Radio value="u" aria-label="unchecked" />
            </RadioGroup>
          </StatePreview>
          <StatePreview label="Checked" sublabel="선택됨">
            <RadioGroup value="c" aria-label="checked">
              <Radio value="c" aria-label="checked" />
            </RadioGroup>
          </StatePreview>
          <StatePreview label="Invalid" sublabel="유효성 오류">
            <RadioGroup invalid aria-label="invalid">
              <Radio value="i" aria-label="invalid" />
            </RadioGroup>
          </StatePreview>
          <StatePreview label="Disabled" sublabel="비활성화">
            <RadioGroup disabled aria-label="disabled">
              <Radio value="d" aria-label="disabled" />
            </RadioGroup>
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
          <StatePreview label="Disabled (checked)" sublabel="비활성+선택">
            <RadioGroup value="dc" disabled aria-label="disabled checked">
              <Radio value="dc" aria-label="disabled checked" />
            </RadioGroup>
          </StatePreview>
          <StatePreview label="Invalid (checked)" sublabel="오류+선택">
            <RadioGroup value="ic" invalid aria-label="invalid checked">
              <Radio value="ic" aria-label="invalid checked" />
            </RadioGroup>
          </StatePreview>
        </div>

        <Subsection title="Interaction States">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: spacing.primitive[4] }}>
            Radio는 호버, 누름 등 인터랙션 상태를 시각적으로 구분합니다. 직접 마우스를 올려 확인해보세요.
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: spacing.primitive[4],
            padding: spacing.primitive[6],
            backgroundColor: "var(--surface-base-alternative)",
            borderRadius: radius.primitive.md,
          }}>
            <InteractionStateCard label="Default" sublabel="기본 상태" borderColor="var(--border-base-default)" />
            <InteractionStateCard label="Hover" sublabel="마우스 오버" borderColor="var(--border-secondary-default)" />
            <InteractionStateCard label="Checked" sublabel="선택됨" borderColor="var(--surface-brand-default)" isChecked />
            <InteractionStateCard label="Invalid" sublabel="유효성 오류" borderColor="var(--border-error-default)" />
            <InteractionStateCard label="Disabled" sublabel="비활성화" borderColor="var(--border-base-default)" opacity={0.4} />
          </div>
        </Subsection>
      </Section>

      {/* 6. Usage Guidelines */}
      <Section title="Usage Guidelines">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          Radio는 <strong style={{ color: "var(--text-primary)" }}>상호 배타적 선택</strong> 패턴에 사용합니다.
          복수 선택이 필요하면 Checkbox를 사용하세요.
        </p>

        <Subsection title="Best Practices">
          <div style={{ display: "grid", gap: spacing.primitive[5] }}>
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <DoCard>
                  <RadioGroup defaultValue="card" aria-label="결제 수단 선택">
                    <Radio value="card" label="신용카드" />
                    <Radio value="bank" label="계좌이체" />
                    <Radio value="phone" label="휴대폰 결제" />
                  </RadioGroup>
                </DoCard>
                <DontCard>
                  <RadioGroup aria-label="잘못된 사용">
                    <Radio value="a" label="이용약관에 동의합니다" />
                    <Radio value="b" label="개인정보 처리방침에 동의합니다" />
                  </RadioGroup>
                </DontCard>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> 상호 배타적 선택에 사용합니다
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0, fontStyle: "italic" }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Don&apos;t</span> 약관 동의에는 Checkbox/CheckMark를 사용합니다
                </p>
              </div>
            </div>

            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <DoCard>
                  <RadioGroup aria-label="좌측 배치">
                    <Radio value="left" label="Control을 왼쪽에 배치" />
                  </RadioGroup>
                </DoCard>
                <DontCard>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: typography.fontSize.md, color: "var(--content-base-default)" }}>Control을 오른쪽에 배치</span>
                    <RadioGroup aria-label="우측 배치">
                      <Radio value="right" aria-label="오른쪽 배치" />
                    </RadioGroup>
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
          Radio 컴포넌트에 적용된 Foundation 기반 디자인 토큰입니다.
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
                  <td style={tdStyle}>Inner Dot Size</td>
                  <td style={tdMono}>8px</td>
                  <td style={tdMono}>10px</td>
                </tr>
                <tr style={trBorder}>
                  <td style={tdStyle}>Border Radius</td>
                  <td style={tdMono}>9999px (radius.primitive.full)</td>
                  <td style={tdMono}>9999px (radius.primitive.full)</td>
                </tr>
                <tr>
                  <td style={tdStyle}>Border Width</td>
                  <td style={tdMono}>1.5px (borderWidth.medium)</td>
                  <td style={tdMono}>1.5px (borderWidth.medium)</td>
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
                  <td style={tdStyle}>Background</td>
                  <td style={tdStyle}><InlineCode>surface.base.default</InlineCode></td>
                  <td style={tdMono}>var(--surface-base-default)</td>
                </tr>
                <tr style={trBorder}>
                  <td style={tdStyle}>Unchecked Border</td>
                  <td style={tdStyle}><InlineCode>border.base.default</InlineCode></td>
                  <td style={tdMono}>var(--border-base-default)</td>
                </tr>
                <tr style={trBorder}>
                  <td style={tdStyle}>Checked Border</td>
                  <td style={tdStyle}><InlineCode>surface.brand.default</InlineCode></td>
                  <td style={tdMono}>var(--surface-brand-default)</td>
                </tr>
                <tr style={trBorder}>
                  <td style={tdStyle}>Inner Dot</td>
                  <td style={tdStyle}><InlineCode>surface.brand.default</InlineCode></td>
                  <td style={tdMono}>var(--surface-brand-default)</td>
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
                <tr style={trBorder}>
                  <td style={tdStyle}>RadioGroup Item Gap</td>
                  <td style={tdStyle}><InlineCode>spacing.primitive[4]</InlineCode></td>
                  <td style={tdMono}>16px</td>
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
          Radio는 네이티브 <InlineCode>&lt;input type=&quot;radio&quot;&gt;</InlineCode>를 사용하여 완전한 접근성을 보장합니다.
          RadioGroup은 <InlineCode>role=&quot;radiogroup&quot;</InlineCode>으로 그룹을 표현합니다.
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
                <td style={{ ...tdStyle, borderBottom: "1px solid var(--divider)" }}><InlineCode>&lt;input type=&quot;radio&quot;&gt;</InlineCode></td>
                <td style={{ ...tdMono, borderBottom: "1px solid var(--divider)" }}>네이티브 라디오로 스크린 리더 완벽 지원</td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, borderBottom: "1px solid var(--divider)" }}><InlineCode>role=&quot;radiogroup&quot;</InlineCode></td>
                <td style={{ ...tdMono, borderBottom: "1px solid var(--divider)" }}>RadioGroup이 그룹 역할을 보조 기술에 전달</td>
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
                  <td style={{ ...tdMono, borderBottom: "1px solid var(--divider)" }}>Radio 그룹으로 포커스 이동</td>
                </tr>
                <tr>
                  <td style={{ ...tdStyle, borderBottom: "1px solid var(--divider)" }}>
                    <kbd style={kbdStyle}>Space</kbd>
                  </td>
                  <td style={{ ...tdMono, borderBottom: "1px solid var(--divider)" }}>현재 Radio 선택</td>
                </tr>
                <tr>
                  <td style={tdStyle}>
                    <kbd style={kbdStyle}>Arrow Keys</kbd>
                  </td>
                  <td style={tdMono}>그룹 내 Radio 간 이동 및 선택 (네이티브 동작)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Design Principles">
          <div style={{ display: "grid", gap: spacing.primitive[4] }}>
            <PrincipleCard
              number={1}
              title="네이티브 라디오 기반"
              desc="숨겨진 네이티브 input을 사용하여 스크린 리더, 키보드 네비게이션, 폼 제출 등 모든 브라우저 접근성을 자동으로 지원합니다."
            />
            <PrincipleCard
              number={2}
              title="Label 연결"
              desc="label 요소로 감싸서 텍스트 클릭으로도 선택 가능합니다. label이 없는 경우 aria-label을 반드시 제공해야 합니다."
            />
            <PrincipleCard
              number={3}
              title="RadioGroup 그룹화"
              desc="role='radiogroup'을 통해 라디오 버튼의 그룹 관계를 보조 기술에 정확히 전달합니다."
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
                <td style={{ ...tdStyle, fontWeight: typography.fontWeight.medium }}>Checkbox</td>
                <td style={{ ...tdStyle, color: "var(--text-secondary)" }}>목록에서 다중 선택</td>
                <td style={{ ...tdStyle, color: "var(--text-secondary)" }}>Checkbox는 복수 선택, Radio는 배타적 단일 선택</td>
              </tr>
              <tr style={trBorder}>
                <td style={{ ...tdStyle, fontWeight: typography.fontWeight.medium }}>Select</td>
                <td style={{ ...tdStyle, color: "var(--text-secondary)" }}>드롭다운 단일 선택</td>
                <td style={{ ...tdStyle, color: "var(--text-secondary)" }}>5개 이하 옵션은 Radio, 6개 이상이면 Select 사용</td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, fontWeight: typography.fontWeight.medium }}>SegmentedControl</td>
                <td style={{ ...tdStyle, color: "var(--text-secondary)" }}>뷰/모드 전환</td>
                <td style={{ ...tdStyle, color: "var(--text-secondary)" }}>SegmentedControl은 탭 전환, Radio는 폼 입력</td>
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
            <p style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)", margin: 0 }}>Radio Component</p>
            <p style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", margin: "4px 0 0 0" }}>실제 컴포넌트 소스 코드를 GitHub에서 확인하세요.</p>
          </div>
          <a
            href="https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system/src/components/Radio/Radio.tsx"
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
        <CodeBlock code={`import { Radio, RadioGroup } from '@baerae-zkap/design-system';`} />
      </Section>

      {/* 3. Basic Usage */}
      <Section title="Basic Usage">
        <PreviewBox>
          <RadioGroup defaultValue="apple" aria-label="과일 선택">
            <Radio value="apple" label="사과" />
            <Radio value="banana" label="바나나" />
            <Radio value="strawberry" label="딸기" />
          </RadioGroup>
        </PreviewBox>
        <CodeBlock code={`<RadioGroup defaultValue="apple" aria-label="과일 선택">
  <Radio value="apple" label="사과" />
  <Radio value="banana" label="바나나" />
  <Radio value="strawberry" label="딸기" />
</RadioGroup>`} />
      </Section>

      {/* 4. Controlled */}
      <Section title="Controlled">
        <PreviewBox>
          <ControlledDemo />
        </PreviewBox>
        <CodeBlock code={`const [value, setValue] = useState('card');

<RadioGroup value={value} onChange={setValue} aria-label="결제 수단">
  <Radio value="card" label="신용카드" />
  <Radio value="bank" label="계좌이체" />
  <Radio value="phone" label="휴대폰 결제" />
</RadioGroup>`} />
      </Section>

      {/* 5. With Description */}
      <Section title="With Description">
        <PreviewBox>
          <RadioGroup defaultValue="standard" aria-label="배송 방법">
            <Radio value="standard" label="일반 배송" description="3-5일 소요됩니다." />
            <Radio value="express" label="빠른 배송" description="1-2일 소요됩니다." />
            <Radio value="same" label="당일 배송" description="오늘 중 도착합니다." />
          </RadioGroup>
        </PreviewBox>
        <CodeBlock code={`<RadioGroup defaultValue="standard" aria-label="배송 방법">
  <Radio value="standard" label="일반 배송" description="3-5일 소요됩니다." />
  <Radio value="express" label="빠른 배송" description="1-2일 소요됩니다." />
  <Radio value="same" label="당일 배송" description="오늘 중 도착합니다." />
</RadioGroup>`} />
      </Section>

      {/* 6. Horizontal */}
      <Section title="Horizontal Orientation">
        <PreviewBox>
          <RadioGroup orientation="horizontal" defaultValue="male" aria-label="성별">
            <Radio value="male" label="남성" />
            <Radio value="female" label="여성" />
            <Radio value="other" label="기타" />
          </RadioGroup>
        </PreviewBox>
        <CodeBlock code={`<RadioGroup orientation="horizontal" defaultValue="male" aria-label="성별">
  <Radio value="male" label="남성" />
  <Radio value="female" label="여성" />
  <Radio value="other" label="기타" />
</RadioGroup>`} />
      </Section>

      {/* 7. API Reference */}
      <Section title="API Reference">
        <Subsection title="RadioGroup Props">
          <PropsTable
            props={[
              { name: "value", type: "string", required: false, description: "현재 선택된 값 (제어 모드)" },
              { name: "defaultValue", type: "string", required: false, description: "초기 선택값 (비제어 모드)" },
              { name: "onChange", type: "(value: string) => void", required: false, description: "값 변경 콜백" },
              { name: "children", type: "ReactNode", required: true, description: "Radio 컴포넌트들" },
              { name: "orientation", type: '"vertical" | "horizontal"', required: false, defaultVal: '"vertical"', description: "그룹 방향" },
              { name: "size", type: '"small" | "medium"', required: false, defaultVal: '"medium"', description: "그룹 전체 크기" },
              { name: "disabled", type: "boolean", required: false, defaultVal: "false", description: "전체 비활성화" },
              { name: "invalid", type: "boolean", required: false, defaultVal: "false", description: "전체 유효성 오류" },
              { name: "aria-label", type: "string", required: false, description: "그룹 접근성 레이블" },
              { name: "aria-labelledby", type: "string", required: false, description: "그룹 접근성 레이블 참조" },
            ]}
          />
        </Subsection>

        <Subsection title="Radio Props">
          <PropsTable
            props={[
              { name: "value", type: "string", required: true, description: "라디오 값" },
              { name: "label", type: "ReactNode", required: false, description: "레이블" },
              { name: "description", type: "ReactNode", required: false, description: "레이블 아래 설명" },
              { name: "size", type: '"small" | "medium"', required: false, defaultVal: '"medium"', description: "크기 (RadioGroup에서 상속 가능)" },
              { name: "disabled", type: "boolean", required: false, defaultVal: "false", description: "비활성화" },
              { name: "invalid", type: "boolean", required: false, defaultVal: "false", description: "유효성 오류 상태" },
              { name: "aria-label", type: "string", required: false, description: "접근성 레이블 (label 없을 때 필수)" },
              { name: "id", type: "string", required: false, description: "input 요소의 id" },
            ]}
          />
        </Subsection>
      </Section>
    </div>
  );
}

// ─── Demo Components ─────────────────────────────────────────────────

function ControlledDemo() {
  const [value, setValue] = useState("card");
  return (
    <RadioGroup value={value} onChange={setValue} aria-label="결제 수단">
      <Radio value="card" label="신용카드" />
      <Radio value="bank" label="계좌이체" />
      <Radio value="phone" label="휴대폰 결제" />
    </RadioGroup>
  );
}

function RadioGroupDemo() {
  const [value, setValue] = useState("a");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
      <RadioGroup value={value} onChange={setValue} aria-label="옵션 선택">
        <Radio value="a" label="옵션 A" />
        <Radio value="b" label="옵션 B" />
        <Radio value="c" label="옵션 C" />
      </RadioGroup>
      <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)", marginTop: spacing.primitive[2] }}>
        선택된 값: <strong style={{ color: "var(--content-brand-default)" }}>{value}</strong>
      </p>
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

function InteractionStateCard({ label, sublabel, borderColor, isChecked, opacity: opacityVal }: {
  label: string; sublabel: string; borderColor: string; isChecked?: boolean; opacity?: number;
}) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[3], padding: spacing.primitive[4],
    }}>
      <div style={{
        width: 24,
        height: 24,
        borderRadius: 9999,
        backgroundColor: "var(--surface-base-default)",
        border: `1.5px solid ${borderColor}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: opacityVal ?? 1,
        boxSizing: "border-box" as const,
      }}>
        {isChecked && (
          <div style={{
            width: 10,
            height: 10,
            borderRadius: 9999,
            backgroundColor: "var(--surface-brand-default)",
          }} />
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
