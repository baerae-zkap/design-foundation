"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform, highlightCode } from "@/components/PlatformTabs";
import { IconButton, typography, spacing, radius } from '@baerae-zkap/design-system';
import { Section, Subsection, InlineCode } from "@/components/docs/Section";
import { PropsTable } from "@/components/docs/PropsTable";
import { PrincipleCard, VariantCard, DoCard, DontCard } from "@/components/docs/Cards";
import { RadioGroup, CopyButton } from "@/components/docs/Playground";

// Types
type IconButtonVariant = "filled" | "ghost" | "weak";
type IconButtonColor = "primary" | "neutral" | "error";
type IconButtonSize = "small" | "medium" | "large";

// Size configurations
const sizeConfig: Record<IconButtonSize, { iconSize: number }> = {
  small: { iconSize: 18 },
  medium: { iconSize: 22 },
  large: { iconSize: 26 },
};

export default function IconButtonPage() {
  return (
    <div style={{ maxWidth: 720 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Actions" },
          { label: "Icon Button" },
        ]}
      />

      {/* Header */}
      <h1 style={{ fontSize: typography.fontSize['3xl'], fontWeight: 700, marginBottom: spacing.primitive[2], color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
        Icon Button
      </h1>
      <p style={{ fontSize: typography.fontSize.md, color: "var(--text-secondary)", marginBottom: spacing.primitive[8], lineHeight: 1.7 }}>
        아이콘만으로 의미를 전달하는 원형 버튼입니다. 닫기, 메뉴, 검색 등 보편적으로 인식되는 아이콘 액션에 사용하며, 공간이 제한된 툴바나 네비게이션 영역에 최적화되어 있습니다.
      </p>

      {/* Interactive Playground */}
      <IconButtonPlayground />

      {/* Platform Tabs */}
      <PlatformTabs>
        {(platform) => <PlatformContent platform={platform} />}
      </PlatformTabs>
    </div>
  );
}

function IconButtonPlayground() {
  const [variant, setVariant] = useState<IconButtonVariant>("ghost");
  const [color, setColor] = useState<IconButtonColor>("neutral");
  const [size, setSize] = useState<IconButtonSize>("medium");
  const [disabled, setDisabled] = useState(false);

  const generateCode = () => {
    const props = [];
    if (variant !== "ghost") props.push(`variant="${variant}"`);
    if (color !== "neutral") props.push(`color="${color}"`);
    if (size !== "medium") props.push(`size="${size}"`);
    if (disabled) props.push("disabled");

    const propsStr = props.length > 0 ? `\n  ${props.join("\n  ")}\n` : " ";

    return `<IconButton${propsStr.length > 1 ? propsStr : " "}onClick={() => {}}>
  <PlusIcon />
</IconButton>`;
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
            <IconButtonDemo
              variant={variant}
              color={color}
              size={size}
              disabled={disabled}
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
              {/* Variant */}
              <RadioGroup
                label="Variant"
                options={[
                  { value: "ghost", label: "Ghost" },
                  { value: "filled", label: "Filled" },
                  { value: "weak", label: "Weak" },
                ]}
                value={variant}
                onChange={(v) => setVariant(v as IconButtonVariant)}
              />

              {/* Color */}
              <RadioGroup
                label="Color"
                options={[
                  { value: "primary", label: "Brand" },
                  { value: "neutral", label: "Base" },
                  { value: "error", label: "Error" },
                ]}
                value={color}
                onChange={(v) => setColor(v as IconButtonColor)}
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
                onChange={(v) => setSize(v as IconButtonSize)}
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
          <span style={{ fontSize: typography.fontSize.compact, fontWeight: 500, color: "var(--docs-code-active-text)" }}>Web</span>
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
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>
          <InlineCode>IconButton</InlineCode> 컴포넌트는 아이콘만으로 의미가 전달되는 단일 액션을 위한 원형 버튼이에요.
          공간이 제한된 툴바, 헤더, 카드 액션 영역에서 사용해요.
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
        }}>
          <svg width="280" height="120" viewBox="0 0 280 120">
            {/* Container circle */}
            <circle cx="140" cy="60" r="28" fill="none" stroke="var(--content-brand-default)" strokeWidth="2" strokeDasharray="4 3" />

            {/* Icon inside */}
            <line x1="140" y1="48" x2="140" y2="72" stroke="var(--content-brand-default)" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="128" y1="60" x2="152" y2="60" stroke="var(--content-brand-default)" strokeWidth="2.5" strokeLinecap="round" />

            {/* Line from circle 1 to container */}
            <line x1="50" y1="60" x2="112" y2="60" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="112" cy="60" r="3" fill="var(--content-base-default)" />

            {/* Line from circle 2 to icon */}
            <line x1="140" y1="32" x2="140" y2="10" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="140" cy="32" r="3" fill="var(--content-base-default)" />

            {/* Numbered circles */}
            <circle cx="35" cy="60" r="14" fill="var(--content-base-default)" />
            <text x="35" y="65" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">1</text>

            <circle cx="140" cy="10" r="14" fill="var(--content-base-default)" />
            <text x="140" y="15" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">2</text>
          </svg>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: spacing.primitive[4],
          marginTop: spacing.primitive[5],
          fontSize: typography.fontSize.sm,
          fontWeight: 500,
          color: "var(--text-primary)",
        }}>
          <div>1. Container</div>
          <div style={{ textAlign: "right" }}>2. Icon</div>
        </div>
      </Section>

      {/* Variants */}
      <Section title="Variants">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: spacing.primitive[4] }}>
          <VariantCard name="Ghost" description="투명 배경, 기본 스타일">
            <IconButtonDemo variant="ghost" color="neutral" />
          </VariantCard>
          <VariantCard name="Filled" description="채워진 배경, 강조 액션">
            <IconButtonDemo variant="filled" color="primary" />
          </VariantCard>
          <VariantCard name="Weak" description="연한 배경 틴트">
            <IconButtonDemo variant="weak" color="neutral" />
          </VariantCard>
        </div>
      </Section>

      {/* Sizes */}
      <Section title="Sizes">
        <PreviewBox>
          <div style={{ display: "flex", gap: spacing.primitive[6], alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <IconButtonDemo size="small" />
              <p style={{ fontSize: typography.fontSize['2xs'], color: "var(--content-base-secondary)", marginTop: spacing.primitive[2] }}>32px</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <IconButtonDemo size="medium" />
              <p style={{ fontSize: typography.fontSize['2xs'], color: "var(--content-base-secondary)", marginTop: spacing.primitive[2] }}>40px</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <IconButtonDemo size="large" />
              <p style={{ fontSize: typography.fontSize['2xs'], color: "var(--content-base-secondary)", marginTop: spacing.primitive[2] }}>48px</p>
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* Colors */}
      <Section title="Colors">
        <Subsection title="Ghost">
          <PreviewBox>
            <div style={{ display: "flex", gap: spacing.primitive[4] }}>
              <IconButtonDemo variant="ghost" color="primary" />
              <IconButtonDemo variant="ghost" color="neutral" />
              <IconButtonDemo variant="ghost" color="error" />
            </div>
          </PreviewBox>
        </Subsection>
        <Subsection title="Filled">
          <PreviewBox>
            <div style={{ display: "flex", gap: spacing.primitive[4] }}>
              <IconButtonDemo variant="filled" color="primary" />
              <IconButtonDemo variant="filled" color="neutral" />
              <IconButtonDemo variant="filled" color="error" />
            </div>
          </PreviewBox>
        </Subsection>
        <Subsection title="Weak">
          <PreviewBox>
            <div style={{ display: "flex", gap: spacing.primitive[4] }}>
              <IconButtonDemo variant="weak" color="primary" />
              <IconButtonDemo variant="weak" color="neutral" />
              <IconButtonDemo variant="weak" color="error" />
            </div>
          </PreviewBox>
        </Subsection>
      </Section>

      {/* States */}
      <Section title="States">
        <PreviewBox>
          <div style={{ display: "flex", gap: spacing.primitive[6], alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <IconButtonDemo variant="ghost" color="neutral" />
              <p style={{ fontSize: typography.fontSize['2xs'], color: "var(--content-base-secondary)", marginTop: spacing.primitive[2] }}>Default</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <IconButtonDemo variant="ghost" color="neutral" disabled />
              <p style={{ fontSize: typography.fontSize['2xs'], color: "var(--content-base-secondary)", marginTop: spacing.primitive[2] }}>Disabled</p>
            </div>
          </div>
        </PreviewBox>

        <Subsection title="Interaction States">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: spacing.primitive[6] }}>
            IconButton은 원형 버튼으로 사용자 상호작용에 따라 배경색과 아이콘 색상이 변화합니다. 각 상태는 시각적으로 명확히 구분되어 터치/클릭 피드백을 제공합니다.
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: spacing.primitive[4],
            padding: spacing.primitive[6],
            backgroundColor: "var(--surface-base-alternative)",
            borderRadius: radius.primitive.lg,
          }}>
            <InteractionStateCard label="Default" sublabel="기본 상태" color="var(--content-base-default)" bgColor="transparent" />
            <InteractionStateCard label="Hover" sublabel="마우스 오버" color="var(--content-base-default)" bgColor="var(--effect-alpha-fill-alternative)" />
            <InteractionStateCard label="Pressed" sublabel="누름" color="var(--content-base-default)" bgColor="var(--effect-alpha-fill-normal)" />
            <InteractionStateCard label="Disabled" sublabel="비활성화" color="var(--content-disabled-default)" bgColor="transparent" opacity={0.5} />
            <InteractionStateCard label="Focused" sublabel="키보드 포커스" color="var(--content-base-default)" bgColor="transparent" showFocusRing />
          </div>
        </Subsection>
      </Section>

      {/* Usage Guidelines */}
      <Section title="Usage Guidelines">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[6], lineHeight: 1.7 }}>
          일관된 UX를 위해 아래 권고 조합을 따르세요. Icon Button은 <strong style={{ color: "var(--text-primary)" }}>원형 버튼이 필요하고 아이콘만으로 의미가 전달</strong>되어야 하는 상황에서 사용합니다. Button 컴포넌트도 icon-only 모드를 제공하나 직사각형 기반이며, IconButton은 원형 전용으로 시각적 일관성이 중요한 패턴에 적합합니다.
        </p>

        <Subsection title="Recommended Combinations">
          <div style={{ display: "grid", gap: spacing.primitive[3] }}>
            <UsageCard
              situation="Navigation Actions"
              desc="뒤로가기, 닫기, 메뉴 열기 등 네비게이션"
              variant="ghost"
              color="neutral"
              iconType="menu"
            />
            <UsageCard
              situation="Toolbar Buttons"
              desc="에디터, 뷰어 등의 툴바 액션"
              variant="ghost"
              color="neutral"
              iconType="edit"
            />
            <UsageCard
              situation="Close / Dismiss"
              desc="모달, 토스트, 패널 닫기"
              variant="ghost"
              color="neutral"
              iconType="close"
            />
            <UsageCard
              situation="Primary Action (Floating)"
              desc="FAB 등 화면에서 가장 중요한 액션"
              variant="filled"
              color="primary"
              iconType="plus"
            />
            <UsageCard
              situation="Emphasized Toolbar Action"
              desc="현재 활성화된 도구, 강조 보조 액션"
              variant="weak"
              color="primary"
              iconType="edit"
            />
            <UsageCard
              situation="Destructive Action"
              desc="삭제, 제거 등 위험한 액션"
              variant="ghost"
              color="error"
              iconType="close"
            />
          </div>
        </Subsection>

        <Subsection title="Design Principles">
          <div style={{ display: "grid", gap: spacing.primitive[4] }}>
            <PrincipleCard
              number={1}
              title="variant로 계층 구조 표현"
              desc="filled는 가장 강조된 액션(FAB), ghost는 보조 액션(툴바, 닫기), weak는 중간 강조(활성 도구)에 사용합니다. 화면당 filled Icon Button은 1-2개로 제한하세요."
            />
            <PrincipleCard
              number={2}
              title="색상의 의미를 지키세요"
              desc="primary는 핵심 브랜드 액션, neutral은 일반 보조 액션, error는 삭제/제거 등 위험한 액션에만 사용합니다."
            />
            <PrincipleCard
              number={3}
              title="모바일에서 터치 영역 확보"
              desc="모바일 환경에서는 medium(40px) 이상 사이즈를 사용하세요. small(32px)은 데스크톱 전용으로 권장합니다."
            />
          </div>
        </Subsection>

        <Subsection title="Best Practices">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <DoCard>
                <div style={{ display: "flex", gap: spacing.primitive[2] }}>
                  <IconButtonDemo variant="ghost" color="neutral" />
                  <IconButtonDemo variant="ghost" color="neutral" />
                </div>
              </DoCard>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <DontCard>
                <div style={{ display: "flex", gap: spacing.primitive[2] }}>
                  <IconButtonDemo variant="filled" color="primary" />
                  <IconButtonDemo variant="filled" color="error" />
                  <IconButtonDemo variant="filled" color="neutral" />
                </div>
              </DontCard>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
            <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0, lineHeight: 1.7 }}>
              <strong>Do</strong> 보조 액션에는 ghost variant를 사용합니다.
            </p>
            <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0, lineHeight: 1.7, fontStyle: "italic" }}>
              <strong>Don&apos;t</strong> 한 영역에 filled Icon Button을 과도하게 사용하지 않습니다.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[5] }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <DoCard>
                <IconButtonDemo variant="ghost" color="neutral" size="medium" />
              </DoCard>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <DontCard>
                <IconButtonDemo variant="ghost" color="neutral" size="small" />
              </DontCard>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
            <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0, lineHeight: 1.7 }}>
              <strong>Do</strong> 모바일에서는 medium 이상 사이즈를 사용하여 터치 영역을 확보합니다.
            </p>
            <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0, lineHeight: 1.7, fontStyle: "italic" }}>
              <strong>Don&apos;t</strong> 모바일에서 small 사이즈만 사용하면 터치 오류가 발생할 수 있습니다.
            </p>
          </div>
        </Subsection>
      </Section>

      {/* Design Tokens */}
      <Section title="Design Tokens">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[5], lineHeight: 1.7 }}>
          IconButton 컴포넌트에 적용된 Foundation 기반 디자인 토큰입니다.
        </p>

        <Subsection title="Size">
          <div style={{ overflow: "auto", borderRadius: radius.primitive.md }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
              <thead>
                <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Property</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Small</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Medium</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Large</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: "12px 16px", color: "var(--text-primary)" }}>Button Size</td>
                  <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>32px (<InlineCode>primitive.8</InlineCode>)</td>
                  <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>40px (<InlineCode>primitive.10</InlineCode>)</td>
                  <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>48px (<InlineCode>primitive.12</InlineCode>)</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: "12px 16px", color: "var(--text-primary)" }}>Icon Size</td>
                  <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>18px</td>
                  <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>22px</td>
                  <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>26px</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px", color: "var(--text-primary)" }}>Border Radius</td>
                  <td colSpan={3} style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>9999px (<InlineCode>primitive.full</InlineCode>)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Colors">
          {/* Filled */}
          <p style={{ fontSize: typography.fontSize.sm, fontWeight: 600, color: "var(--text-primary)", marginBottom: spacing.primitive[3] }}>Filled</p>
          <div style={{ overflow: "auto", borderRadius: radius.primitive.md, marginBottom: spacing.primitive[6] }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
              <thead>
                <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Color</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Background</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Bg Pressed</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Text Color</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: "12px 16px", color: "var(--text-primary)" }}>primary</td>
                  <td style={{ padding: "12px 16px" }}><InlineCode>surface.brand.default</InlineCode></td>
                  <td style={{ padding: "12px 16px" }}><InlineCode>surface.brand.defaultPressed</InlineCode></td>
                  <td style={{ padding: "12px 16px" }}><InlineCode>content.base.onColor</InlineCode></td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: "12px 16px", color: "var(--text-primary)" }}>neutral</td>
                  <td style={{ padding: "12px 16px" }}><InlineCode>content.base.default</InlineCode></td>
                  <td style={{ padding: "12px 16px" }}><InlineCode>inverse.surface.default</InlineCode></td>
                  <td style={{ padding: "12px 16px" }}><InlineCode>content.base.onColor</InlineCode></td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px", color: "var(--text-primary)" }}>error</td>
                  <td style={{ padding: "12px 16px" }}><InlineCode>surface.error.solid</InlineCode></td>
                  <td style={{ padding: "12px 16px" }}><InlineCode>surface.error.solidPressed</InlineCode></td>
                  <td style={{ padding: "12px 16px" }}><InlineCode>content.base.onColor</InlineCode></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Weak */}
          <p style={{ fontSize: typography.fontSize.sm, fontWeight: 600, color: "var(--text-primary)", marginBottom: spacing.primitive[3] }}>Weak</p>
          <div style={{ overflow: "auto", borderRadius: radius.primitive.md, marginBottom: spacing.primitive[6] }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
              <thead>
                <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Color</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Background</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Bg Pressed</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Text Color</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: "12px 16px", color: "var(--text-primary)" }}>primary</td>
                  <td style={{ padding: "12px 16px" }}><InlineCode>surface.brand.secondary</InlineCode></td>
                  <td style={{ padding: "12px 16px" }}><InlineCode>surface.brand.secondaryPressed</InlineCode></td>
                  <td style={{ padding: "12px 16px" }}><InlineCode>content.brand.default</InlineCode></td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: "12px 16px", color: "var(--text-primary)" }}>neutral</td>
                  <td style={{ padding: "12px 16px" }}><InlineCode>surface.base.container</InlineCode></td>
                  <td style={{ padding: "12px 16px" }}><InlineCode>surface.base.containerPressed</InlineCode></td>
                  <td style={{ padding: "12px 16px" }}><InlineCode>content.base.default</InlineCode></td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px", color: "var(--text-primary)" }}>error</td>
                  <td style={{ padding: "12px 16px" }}><InlineCode>surface.error.default</InlineCode></td>
                  <td style={{ padding: "12px 16px" }}><InlineCode>surface.error.defaultPressed</InlineCode></td>
                  <td style={{ padding: "12px 16px" }}><InlineCode>content.error.default</InlineCode></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Ghost */}
          <p style={{ fontSize: typography.fontSize.sm, fontWeight: 600, color: "var(--text-primary)", marginBottom: spacing.primitive[3] }}>Ghost</p>
          <div style={{ overflow: "auto", borderRadius: radius.primitive.md }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
              <thead>
                <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Color</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Background</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Bg Hover</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Bg Pressed</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Text</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Text Pressed</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: "12px 16px", color: "var(--text-primary)" }}>primary</td>
                  <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>transparent</td>
                  <td style={{ padding: "12px 16px" }}><InlineCode>fill.alternative</InlineCode></td>
                  <td style={{ padding: "12px 16px" }}><InlineCode>fill.normal</InlineCode></td>
                  <td style={{ padding: "12px 16px" }}><InlineCode>content.brand.default</InlineCode></td>
                  <td style={{ padding: "12px 16px" }}><InlineCode>surface.brand.defaultPressed</InlineCode></td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: "12px 16px", color: "var(--text-primary)" }}>neutral</td>
                  <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>transparent</td>
                  <td style={{ padding: "12px 16px" }}><InlineCode>fill.alternative</InlineCode></td>
                  <td style={{ padding: "12px 16px" }}><InlineCode>fill.normal</InlineCode></td>
                  <td style={{ padding: "12px 16px" }}><InlineCode>content.base.default</InlineCode></td>
                  <td style={{ padding: "12px 16px" }}><InlineCode>inverse.surface.default</InlineCode></td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px", color: "var(--text-primary)" }}>error</td>
                  <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>transparent</td>
                  <td style={{ padding: "12px 16px" }}><InlineCode>surface.error.default</InlineCode></td>
                  <td style={{ padding: "12px 16px" }}><InlineCode>surface.error.default</InlineCode></td>
                  <td style={{ padding: "12px 16px" }}><InlineCode>content.error.default</InlineCode></td>
                  <td style={{ padding: "12px 16px" }}><InlineCode>surface.error.solidPressed</InlineCode></td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Interaction">
          <div style={{ overflow: "auto", borderRadius: radius.primitive.md }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
              <thead>
                <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Property</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Value</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>설명</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: "12px 16px", color: "var(--text-primary)" }}>Disabled Opacity</td>
                  <td style={{ padding: "12px 16px" }}><InlineCode>opacity.disabled</InlineCode> (0.5)</td>
                  <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>비활성화 시 전체 투명도</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: "12px 16px", color: "var(--text-primary)" }}>Cursor (disabled)</td>
                  <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>not-allowed</td>
                  <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>비활성화 시 커서</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: "12px 16px", color: "var(--text-primary)" }}>Transition</td>
                  <td style={{ padding: "12px 16px" }}><InlineCode>transitions.all</InlineCode></td>
                  <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>모든 속성에 부드러운 전환</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: "12px 16px", color: "var(--text-primary)" }}>Border</td>
                  <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>none</td>
                  <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>모든 variant에서 테두리 없음</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px", color: "var(--text-primary)" }}>Border Radius</td>
                  <td style={{ padding: "12px 16px" }}><InlineCode>radius.full</InlineCode></td>
                  <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>원형</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>
      </Section>

      {/* Accessibility */}
      <Section title="Accessibility">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[5], lineHeight: 1.7 }}>
          Icon Button은 텍스트 레이블이 없으므로 접근성에 특별한 주의가 필요합니다.
        </p>

        <div style={{ overflow: "auto", borderRadius: radius.primitive.md, marginBottom: spacing.primitive[6] }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>속성</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><code style={{ backgroundColor: "var(--surface-base-alternative)", padding: "2px 6px", borderRadius: radius.primitive.xs, fontSize: typography.fontSize.xs }}>role=&quot;button&quot;</code></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>스크린 리더가 버튼으로 인식</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><code style={{ backgroundColor: "var(--surface-base-alternative)", padding: "2px 6px", borderRadius: radius.primitive.xs, fontSize: typography.fontSize.xs }}>aria-label</code> (필수)</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>아이콘의 목적을 설명하는 텍스트. Icon Button에서 필수</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><code style={{ backgroundColor: "var(--surface-base-alternative)", padding: "2px 6px", borderRadius: radius.primitive.xs, fontSize: typography.fontSize.xs }}>aria-disabled</code></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>비활성화 상태를 보조 기술에 전달</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Subsection title="Keyboard Interaction">
          <div style={{ overflow: "auto", borderRadius: radius.primitive.md }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
              <thead>
                <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>키</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>동작</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><kbd style={{ padding: "2px 6px", backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.xs, fontSize: typography.fontSize.xs }}>Tab</kbd></td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>버튼으로 포커스 이동</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><kbd style={{ padding: "2px 6px", backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.xs, fontSize: typography.fontSize.xs }}>Enter</kbd></td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>버튼 클릭 실행</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px" }}><kbd style={{ padding: "2px 6px", backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.xs, fontSize: typography.fontSize.xs }}>Space</kbd></td>
                  <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>버튼 클릭 실행</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Design Principles">
          <div style={{ display: "grid", gap: spacing.primitive[4] }}>
            <PrincipleCard
              number={1}
              title="Accessibility Label 필수"
              desc="텍스트 레이블이 없으므로 aria-label을 반드시 제공해야 합니다. 예: aria-label='메뉴 열기', aria-label='닫기'"
            />
            <PrincipleCard
              number={2}
              title="Minimum Touch Target"
              desc="모든 Icon Button은 최소 32px 터치 영역을 확보합니다. small 사이즈(32px)는 데스크톱 전용으로 권장하며, 모바일에서는 medium(40px) 이상을 사용하세요."
            />
            <PrincipleCard
              number={3}
              title="Focus Visible"
              desc="키보드 포커스 시 2px solid outline이 표시됩니다. 원형 버튼 외곽에 포커스 링이 표시되어 시인성을 확보합니다."
            />
            <PrincipleCard
              number={4}
              title="Color Contrast"
              desc="WCAG 2.1 AA 기준(3:1)을 충족하는 아이콘 대비를 유지합니다. disabled 상태에서도 비활성화 상태가 인지 가능해야 합니다."
            />
          </div>
        </Subsection>
      </Section>

      {/* Related Components */}
      <Section title="Related Components">
        <div style={{ overflow: "auto", borderRadius: radius.primitive.md }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>컴포넌트</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>용도</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>차이점</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px", fontWeight: 500 }}>Button</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>텍스트 레이블이 있는 주요/보조 액션</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>Button도 icon-only 지원하나 직사각형 기반. IconButton은 원형 전용으로 툴바/네비게이션에 최적화</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px", fontWeight: 500 }}>TextButton</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>텍스트 링크 스타일의 가벼운 액션</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>IconButton은 아이콘 전용, TextButton은 텍스트 중심의 최소한 버튼</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px", fontWeight: 500 }}>Chip</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>필터링/선택 인터랙션</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>Chip은 선택 상태 토글용, IconButton은 단일 액션 실행용</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", fontWeight: 500 }}>ContentBadge</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>읽기 전용 상태/라벨 표시</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>ContentBadge는 인터랙션 없음, IconButton은 클릭 가능한 액션 버튼</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}

const GITHUB_BASE = "https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system/src";
const ICONBUTTON_SOURCE = `${GITHUB_BASE}/components/IconButton/IconButton.tsx`;

function WebContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>
      {/* Source Code */}
      <Section title="Source Code">
        <div style={{ padding: spacing.primitive[4], backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.md, marginBottom: spacing.primitive[6], display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: typography.fontSize.sm, fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>IconButton Component</p>
            <p style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", margin: `${spacing.primitive[1]}px 0 0 0` }}>실제 컴포넌트 소스 코드를 GitHub에서 확인하세요.</p>
          </div>
          <a
            href={ICONBUTTON_SOURCE}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: `${spacing.primitive[2]}px ${spacing.primitive[4]}px`,
              fontSize: typography.fontSize.compact,
              fontWeight: 500,
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
        <CodeBlock code={`import { IconButton } from '@baerae-zkap/design-system';`} />
      </Section>

      {/* Basic Usage */}
      <Section title="Basic Usage">
        <PreviewBox>
          <div style={{ display: "flex", gap: spacing.primitive[4], alignItems: "center", padding: spacing.primitive[6] }}>
            <IconButtonDemo variant="ghost" color="neutral" />
          </div>
        </PreviewBox>
        <CodeBlock code={`<IconButton onClick={() => {}}>
  <PlusIcon />
</IconButton>`} />
      </Section>

      {/* Variants */}
      <Section title="Variants">
        <PreviewBox>
          <div style={{ display: "flex", gap: spacing.primitive[4], alignItems: "center", padding: spacing.primitive[6] }}>
            <IconButtonDemo variant="ghost" color="neutral" />
            <IconButtonDemo variant="filled" color="primary" />
            <IconButtonDemo variant="weak" color="neutral" />
          </div>
        </PreviewBox>
        <CodeBlock code={`<IconButton variant="ghost" onClick={() => {}}>
  <MenuIcon />
</IconButton>

<IconButton variant="filled" color="primary" onClick={() => {}}>
  <PlusIcon />
</IconButton>

<IconButton variant="weak" onClick={() => {}}>
  <SettingsIcon />
</IconButton>`} />
      </Section>

      {/* API Reference */}
      <Section title="API Reference">
        <PropsTable
          props={[
            { name: "variant", type: '"filled" | "ghost" | "weak"', required: false, defaultVal: '"ghost"', description: "버튼 스타일" },
            { name: "color", type: '"primary" | "neutral" | "error"', required: false, defaultVal: '"neutral"', description: "색상 테마" },
            { name: "size", type: '"small" | "medium" | "large"', required: false, defaultVal: '"medium"', description: "버튼 크기" },
            { name: "disabled", type: "boolean", required: false, defaultVal: "false", description: "비활성화 상태" },
            { name: "children", type: "ReactNode", required: true, description: "아이콘 콘텐츠" },
            { name: "onClick", type: "() => void", required: false, description: "클릭 핸들러" },
          ]}
        />
      </Section>
    </div>
  );
}

// ============================================
// Shared Components
// ============================================

function UsageCard({ situation, desc, variant, color, iconType }: {
  situation: string;
  desc: string;
  variant: IconButtonVariant;
  color: IconButtonColor;
  iconType: "plus" | "close" | "menu" | "edit";
}) {
  const iconPaths: Record<string, React.ReactNode> = {
    plus: (
      <>
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </>
    ),
    close: (
      <>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </>
    ),
    menu: (
      <>
        <line x1="4" y1="7" x2="20" y2="7" />
        <line x1="4" y1="12" x2="20" y2="12" />
        <line x1="4" y1="17" x2="20" y2="17" />
      </>
    ),
    edit: (
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" fill="none" />
    ),
  };

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
          <span style={{ fontSize: typography.fontSize.sm, fontWeight: 600, color: "var(--text-primary)" }}>{situation}</span>
          <span style={{
            fontSize: typography.fontSize['2xs'],
            padding: "2px 6px",
            backgroundColor: variant === "filled" ? "var(--surface-brand-secondary)" : "var(--surface-base-alternative)",
            color: variant === "filled" ? "var(--surface-brand-defaultPressed)" : "var(--content-base-secondary)",
            borderRadius: radius.primitive.xs,
            fontWeight: 500,
          }}>
            {variant} + {color}
          </span>
        </div>
        <p style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", margin: 0 }}>{desc}</p>
      </div>
      <IconButtonDemo variant={variant} color={color} size="small" />
    </div>
  );
}

// ============================================
// Demo Component
// ============================================

function InteractionStateCard({ label, sublabel, color, bgColor, opacity, showFocusRing }: {
  label: string; sublabel: string; color: string; bgColor: string; opacity?: number; showFocusRing?: boolean;
}) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[3], padding: spacing.primitive[4],
    }}>
      <div style={{
        width: "100%", height: 48, borderRadius: radius.primitive.md,
        backgroundColor: bgColor,
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: opacity ?? 1,
        outline: showFocusRing ? "2px solid var(--content-brand-default)" : "none",
        outlineOffset: showFocusRing ? 2 : 0,
        color: color, fontSize: typography.fontSize.compact, fontWeight: 500,
      }}>
        {label}
      </div>
      <span style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", textAlign: "center" }}>{sublabel}</span>
    </div>
  );
}

function IconButtonDemo({
  variant = "ghost",
  color = "neutral",
  size = "medium",
  disabled = false,
}: {
  variant?: IconButtonVariant;
  color?: IconButtonColor;
  size?: IconButtonSize;
  disabled?: boolean;
}) {
  const iconSize = sizeConfig[size].iconSize;

  return (
    <IconButton
      variant={variant}
      color={color}
      size={size}
      disabled={disabled}
    >
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    </IconButton>
  );
}
