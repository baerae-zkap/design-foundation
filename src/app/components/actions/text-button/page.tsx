"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform, highlightCode } from "@/components/PlatformTabs";
import { TextButton } from '@baerae-zkap/design-system';
import { Section, Subsection, InlineCode } from "@/components/docs/Section";
import { PropsTable } from "@/components/docs/PropsTable";
import { PrincipleCard, VariantCard, DoCard, DontCard } from "@/components/docs/Cards";
import { RadioGroup, CopyButton } from "@/components/docs/Playground";
import { typography, spacing, radius } from '@baerae-zkap/design-system';

// Types
type TextButtonSize = "xSmall" | "small" | "medium" | "large" | "xLarge";
type TextButtonColor = "primary" | "neutral" | "muted" | "error";
type TextButtonVariant = "clear" | "underline" | "arrow";

export default function TextButtonPage() {
  return (
    <div style={{ maxWidth: 840 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Actions" },
          { label: "Text Button" },
        ]}
      />

      {/* Header */}
      <h1 style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold, marginBottom: spacing.primitive[2], color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
        Text Button
      </h1>
      <p style={{ fontSize: typography.fontSize.md, color: "var(--text-secondary)", marginBottom: spacing.primitive[8], lineHeight: 1.7 }}>
        배경 없이 텍스트만으로 액션을 표현하는 최소한의 버튼입니다. 회원가입, 건너뛰기, 더보기 등 보조 액션이나 네비게이션 링크에 사용하며, Filled Button과 함께 자연스러운 시각적 계층을 형성합니다.
      </p>

      {/* Interactive Playground */}
      <TextButtonPlayground />

      {/* Platform Tabs */}
      <PlatformTabs>
        {(platform) => <PlatformContent platform={platform} />}
      </PlatformTabs>
    </div>
  );
}

function TextButtonPlayground() {
  const [variant, setVariant] = useState<TextButtonVariant>("clear");
  const [color, setColor] = useState<TextButtonColor>("primary");
  const [size, setSize] = useState<TextButtonSize>("medium");
  const [disabled, setDisabled] = useState(false);

  const generateCode = () => {
    const props = [];
    if (variant !== "clear") props.push(`variant="${variant}"`);
    props.push(`color="${color}"`);
    props.push(`size="${size}"`);
    if (disabled) props.push("disabled");

    const propsStr = `\n  ${props.join("\n  ")}\n`;

    return `<TextButton${propsStr}onClick={() => {}}>
  Text Button
</TextButton>`;
  };

  const colorLabels: Record<TextButtonColor, string> = {
    primary: "Primary",
    neutral: "Neutral",
    muted: "Muted",
    error: "Error",
  };

  return (
    <div style={{ marginBottom: spacing.primitive[8] }}>
      {/* Main Playground Card */}
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
            <TextButtonDemo
              variant={variant}
              color={color}
              size={size}
              disabled={disabled}
            >
              Text Button
            </TextButtonDemo>
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
            {/* Inner Card */}
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
                  { value: "clear", label: "Clear" },
                  { value: "underline", label: "Underline" },
                  { value: "arrow", label: "Arrow" },
                ]}
                value={variant}
                onChange={(v) => setVariant(v as TextButtonVariant)}
              />

              {/* Color */}
              <RadioGroup
                label="Color"
                options={[
                  { value: "primary", label: colorLabels.primary },
                  { value: "neutral", label: colorLabels.neutral },
                  { value: "muted", label: colorLabels.muted },
                  { value: "error", label: colorLabels.error },
                ]}
                value={color}
                onChange={(v) => setColor(v as TextButtonColor)}
              />

              {/* Size */}
              <RadioGroup
                label="Size"
                options={[
                  { value: "xSmall", label: "XS" },
                  { value: "small", label: "S" },
                  { value: "medium", label: "M" },
                  { value: "large", label: "L" },
                  { value: "xLarge", label: "XL" },
                ]}
                value={size}
                onChange={(v) => setSize(v as TextButtonSize)}
              />

              {/* State */}
              <RadioGroup
                label="State"
                options={[
                  { value: "default", label: "Default" },
                  { value: "disabled", label: "Disabled" },
                ]}
                value={disabled ? "disabled" : "default"}
                onChange={(v) => setDisabled(v === "disabled")}
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

function PlatformContent({ platform }: { platform: Platform }) {
  if (platform === "design") {
    return <DesignContent />;
  }
  return <WebContent />;
}

function DesignContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>
      {/* 1. Overview */}
      <Section title="Overview">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>
          <InlineCode>TextButton</InlineCode> 컴포넌트는 배경 없이 텍스트만으로 액션을 표현하는 최소한의 버튼이에요.
          회원가입, 건너뛰기, 더보기 등 보조 액션이나 네비게이션 링크에서 사용해요.
        </p>
      </Section>

      {/* 2. Anatomy */}
      <Section title="Anatomy">
        <AnatomyDiagram />
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: spacing.primitive[4],
          marginTop: spacing.primitive[5],
          fontSize: typography.fontSize.sm,
          fontWeight: typography.fontWeight.medium,
          color: "var(--text-primary)",
        }}>
          <div>1. Label</div>
          <div>2. Trailing Icon</div>
          <div>3. Underline</div>
          <div>4. Touch Area</div>
        </div>
      </Section>

      {/* 3. Variants */}
      <Section title="Variants">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[5], lineHeight: 1.7 }}>
          <InlineCode>variant</InlineCode> prop을 통해 3가지 variant를 사용할 수 있습니다. 각 variant는 용도와 시각적 표현이 다릅니다.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: spacing.primitive[4] }}>
          <VariantCard
            name="Clear"
            description="기본 텍스트 버튼. 배경이나 장식 없이 텍스트만으로 액션을 표현합니다."
          >
            <TextButtonDemo variant="clear" color="primary" size="medium">텍스트 버튼</TextButtonDemo>
          </VariantCard>

          <VariantCard
            name="Underline"
            description="밑줄이 있는 텍스트 버튼. 링크처럼 보이면서 버튼 역할을 합니다."
          >
            <TextButtonDemo variant="underline" color="primary" size="medium">더 알아보기</TextButtonDemo>
          </VariantCard>

          <VariantCard
            name="Arrow"
            description="화살표 아이콘이 있는 네비게이션 버튼. 다음 페이지나 상세 화면으로 이동할 때 사용합니다."
          >
            <TextButtonDemo variant="arrow" color="primary" size="medium">더보기</TextButtonDemo>
          </VariantCard>

          <VariantCard
            name="Color Variants"
            description="상황에 맞는 색상을 선택할 수 있습니다. Primary, Neutral, Muted, Error 컬러를 지원합니다."
          >
            <div style={{ display: "flex", gap: spacing.primitive[5] }}>
              <TextButtonDemo variant="clear" color="primary" size="medium">Primary</TextButtonDemo>
              <TextButtonDemo variant="clear" color="neutral" size="medium">Neutral</TextButtonDemo>
              <TextButtonDemo variant="clear" color="muted" size="medium">Muted</TextButtonDemo>
              <TextButtonDemo variant="clear" color="error" size="medium">Error</TextButtonDemo>
            </div>
          </VariantCard>
        </div>
      </Section>

      {/* 4. Sizes */}
      <Section title="Sizes">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[5], lineHeight: 1.7 }}>
          <InlineCode>size</InlineCode> prop을 통해 5가지 크기를 사용할 수 있습니다. 주변 텍스트나 컴포넌트와의 조화를 고려하여 선택합니다.
        </p>

        <div style={{ marginBottom: spacing.primitive[6], overflow: "auto", borderRadius: radius.primitive.md }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Size</th>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Font Size</th>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>용도</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>xSmall</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>12px</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>캡션, 주석 내 링크</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>small</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>14px</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>리스트 내 액션, 카드 내부</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>medium</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>16px</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>기본값, 대부분의 상황</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>large</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>18px</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>강조가 필요한 보조 액션</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>xLarge</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>20px</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>시트/모달 하단 보조 링크</td>
              </tr>
            </tbody>
          </table>
        </div>

        <PreviewBox>
          <div style={{ display: "flex", gap: spacing.primitive[8], alignItems: "center", flexWrap: "wrap", padding: spacing.primitive[6] }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
              <TextButtonDemo variant="clear" color="primary" size="xSmall">XSmall</TextButtonDemo>
              <span style={{ fontSize: typography.fontSize['2xs'], color: "var(--text-tertiary)" }}>12px</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
              <TextButtonDemo variant="clear" color="primary" size="small">Small</TextButtonDemo>
              <span style={{ fontSize: typography.fontSize['2xs'], color: "var(--text-tertiary)" }}>14px</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
              <TextButtonDemo variant="clear" color="primary" size="medium">Medium</TextButtonDemo>
              <span style={{ fontSize: typography.fontSize['2xs'], color: "var(--text-tertiary)" }}>16px</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
              <TextButtonDemo variant="clear" color="primary" size="large">Large</TextButtonDemo>
              <span style={{ fontSize: typography.fontSize['2xs'], color: "var(--text-tertiary)" }}>18px</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
              <TextButtonDemo variant="clear" color="primary" size="xLarge">XLarge</TextButtonDemo>
              <span style={{ fontSize: typography.fontSize['2xs'], color: "var(--text-tertiary)" }}>20px</span>
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* 5. Colors */}
      <Section title="Colors">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[5], lineHeight: 1.7 }}>
          <InlineCode>color</InlineCode> prop을 통해 텍스트 버튼의 의미에 맞는 색상을 지정합니다.
        </p>

        <div style={{ marginBottom: spacing.primitive[6], overflow: "auto", borderRadius: radius.primitive.md }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Color</th>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>용도</th>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>예시</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>primary</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>브랜드 보조 액션, 링크</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-tertiary)", fontSize: typography.fontSize.compact }}>회원가입, 더보기</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>neutral</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>중립적 보조 액션, 네비게이션</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-tertiary)", fontSize: typography.fontSize.compact }}>전체보기, 건너뛰기</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>muted</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>저강도 보조 텍스트, 비활성 링크</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-tertiary)", fontSize: typography.fontSize.compact }}>설정, 약관 링크</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>error</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>위험/삭제 보조 액션</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-tertiary)", fontSize: typography.fontSize.compact }}>삭제, 초기화</td>
              </tr>
            </tbody>
          </table>
        </div>

        <PreviewBox>
          <div style={{ display: "flex", gap: spacing.primitive[8], alignItems: "center", padding: spacing.primitive[6] }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
              <TextButtonDemo variant="clear" color="primary" size="medium">Primary</TextButtonDemo>
              <span style={{ fontSize: typography.fontSize['2xs'], color: "var(--text-tertiary)" }}>Primary action</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
              <TextButtonDemo variant="clear" color="neutral" size="medium">Neutral</TextButtonDemo>
              <span style={{ fontSize: typography.fontSize['2xs'], color: "var(--text-tertiary)" }}>Neutral action</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
              <TextButtonDemo variant="clear" color="muted" size="medium">Muted</TextButtonDemo>
              <span style={{ fontSize: typography.fontSize['2xs'], color: "var(--text-tertiary)" }}>Muted action</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
              <TextButtonDemo variant="clear" color="error" size="medium">Error</TextButtonDemo>
              <span style={{ fontSize: typography.fontSize['2xs'], color: "var(--text-tertiary)" }}>Destructive action</span>
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* 6. States (+ Interaction States subsection) */}
      <Section title="States">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[5], lineHeight: 1.7 }}>
          TextButton은 사용자 상호작용에 따라 다양한 상태를 가집니다. 배경이 없어도 명확한 시각적 피드백을 제공합니다.
        </p>

        <Subsection title="Interactive States">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
            마우스/터치 상호작용에 따른 상태 변화입니다. 아래 버튼들을 직접 hover하고 클릭해보세요.
          </p>
          <PreviewBox>
            <div style={{ display: "flex", gap: spacing.primitive[8], alignItems: "center", padding: spacing.primitive[6] }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
                <TextButtonDemo variant="clear" color="primary" size="medium">Default</TextButtonDemo>
                <span style={{ fontSize: typography.fontSize['2xs'], color: "var(--text-tertiary)" }}>기본 상태</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
                <TextButtonDemo variant="clear" color="primary" size="medium" isHovered>Hovered</TextButtonDemo>
                <span style={{ fontSize: typography.fontSize['2xs'], color: "var(--text-tertiary)" }}>호버 상태</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
                <TextButtonDemo variant="clear" color="primary" size="medium" isPressed>Pressed</TextButtonDemo>
                <span style={{ fontSize: typography.fontSize['2xs'], color: "var(--text-tertiary)" }}>눌림 상태</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
                <TextButtonDemo variant="clear" color="primary" size="medium" disabled>Disabled</TextButtonDemo>
                <span style={{ fontSize: typography.fontSize['2xs'], color: "var(--text-tertiary)" }}>비활성화</span>
              </div>
            </div>
          </PreviewBox>
          <div style={{ marginTop: spacing.primitive[4], padding: spacing.primitive[4], backgroundColor: "var(--surface-base-default)", borderLeft: "1px solid var(--border-solid-alternative)", borderRadius: radius.primitive.md, fontSize: typography.fontSize.compact }}>
            <p style={{ margin: 0, color: "var(--text-secondary)", lineHeight: 1.8 }}>
              <strong style={{ color: "var(--text-primary)" }}>Default:</strong> 기본 텍스트 색상<br />
              <strong style={{ color: "var(--text-primary)" }}>Hover:</strong> 연한 배경색 표시 (rgba overlay)<br />
              <strong style={{ color: "var(--text-primary)" }}>Pressed:</strong> 더 진한 배경색 + 텍스트 색상 변화<br />
              <strong style={{ color: "var(--text-primary)" }}>Disabled:</strong> opacity 0.38 적용, 클릭 불가
            </p>
          </div>
        </Subsection>

        <Subsection title="Interaction States">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: spacing.primitive[6] }}>
            TextButton은 배경이 없지만, 사용자 입력에 따라 명확한 시각적 피드백을 제공합니다. 호버 시 연한 배경이 나타나고, 누름 시 더 진한 배경으로 전환됩니다.
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: spacing.primitive[4],
            padding: spacing.primitive[6],
            backgroundColor: "var(--surface-base-alternative)",
            borderRadius: radius.primitive.lg,
          }}>
            <InteractionStateCard label="Default" sublabel="기본 상태" color="var(--content-brand-default)" bgColor="transparent" />
            <InteractionStateCard label="Hover" sublabel="마우스 오버" color="var(--content-brand-default)" bgColor="var(--effect-alpha-brand-selection)" />
            <InteractionStateCard label="Pressed" sublabel="누름" color="var(--content-brand-default)" bgColor="var(--effect-alpha-fill-normal)" />
            <InteractionStateCard label="Disabled" sublabel="비활성화" color="var(--content-brand-default)" bgColor="transparent" opacity={0.38} />
            <InteractionStateCard label="Focused" sublabel="키보드 포커스" color="var(--content-brand-default)" bgColor="transparent" showFocusRing />
          </div>
        </Subsection>
      </Section>

      {/* 7. Usage Guidelines (+ Best Practices subsection) */}
      <Section title="Usage Guidelines">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[6], lineHeight: 1.7 }}>
          일관된 UX를 위해 아래 권고 패턴을 따르세요. TextButton은 <strong style={{ color: "var(--text-primary)" }}>보조 액션</strong>이나 <strong style={{ color: "var(--text-primary)" }}>네비게이션 링크</strong>에 적합합니다.
        </p>

        <Subsection title="Recommended Combinations">
          <div style={{ display: "grid", gap: spacing.primitive[3] }}>
            <UsageRecommendationCard
              situation="보조 액션 (Sub action)"
              desc="Filled Button 아래에서 보조 링크 역할"
              variant="clear"
              color="primary"
              examples={["회원가입", "건너뛰기", "나중에"]}
            />
            <UsageRecommendationCard
              situation="네비게이션 링크"
              desc="섹션 헤더 옆에서 상세 페이지로 이동"
              variant="arrow"
              color="neutral"
              examples={["더보기", "전체보기", "상세"]}
            />
            <UsageRecommendationCard
              situation="저강도 보조 링크"
              desc="약관, 설정, 부가 정보 등 눈에 띄지 않아도 되는 액션"
              variant="clear"
              color="muted"
              examples={["이용약관", "설정", "도움말"]}
            />
            <UsageRecommendationCard
              situation="인라인 액션"
              desc="문장 내에서 클릭 가능한 텍스트"
              variant="underline"
              color="primary"
              examples={["이용약관", "개인정보처리방침"]}
            />
            <UsageRecommendationCard
              situation="위험한 보조 액션"
              desc="삭제나 초기화 등 파괴적 보조 행동"
              variant="clear"
              color="error"
              examples={["삭제", "초기화", "탈퇴"]}
            />
          </div>
        </Subsection>

        <Subsection title="Design Principles">
          <div style={{ display: "grid", gap: spacing.primitive[4] }}>
            <PrincipleCard
              number={1}
              title="Minimal Visual Noise"
              desc="배경과 테두리가 없어 UI의 시각적 복잡도를 줄입니다. 보조 액션이나 반복적인 액션에 적합합니다."
            />
            <PrincipleCard
              number={2}
              title="Visual Hierarchy"
              desc="Filled Button과 함께 사용할 때 자연스러운 시각적 계층을 형성합니다. 주요 액션은 Filled, 보조 액션은 Text Button을 사용하세요."
            />
            <PrincipleCard
              number={3}
              title="Clear Interaction Feedback"
              desc="배경이 없어도 hover, pressed 상태에서 명확한 피드백을 제공합니다. 배경색 변화와 텍스트 색상 변화로 인터랙션 상태를 표현합니다."
            />
          </div>
        </Subsection>

        <Subsection title="Best Practices">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <DoCard>
                <div style={{ padding: spacing.primitive[5], display: "flex", flexDirection: "column", gap: spacing.primitive[3], alignItems: "center" }}>
                  <button style={{
                    width: "100%",
                    height: 48,
                    backgroundColor: "var(--content-brand-default)",
                    color: "var(--content-base-onColor)",
                    border: "none",
                    borderRadius: radius.primitive.md,
                    fontSize: typography.fontSize.md,
                    fontWeight: typography.fontWeight.semibold,
                  }}>
                    로그인
                  </button>
                  <TextButtonDemo variant="clear" color="primary" size="medium">
                    회원가입
                  </TextButtonDemo>
                </div>
              </DoCard>
              <p style={{ marginTop: spacing.primitive[2], fontSize: typography.fontSize.compact, lineHeight: 1.7, color: "var(--content-success-default)" }}>
                <strong>Do</strong> — Filled Button의 보조 액션으로 사용하여 시각적 계층을 형성합니다.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <DontCard>
                <div style={{ padding: spacing.primitive[5], display: "flex", flexDirection: "column", gap: spacing.primitive[3], alignItems: "center" }}>
                  <TextButtonDemo variant="clear" color="primary" size="large">
                    결제하기
                  </TextButtonDemo>
                </div>
              </DontCard>
              <p style={{ marginTop: spacing.primitive[2], fontSize: typography.fontSize.compact, lineHeight: 1.7, color: "var(--content-error-default)", fontStyle: "italic" }}>
                <strong>Don&apos;t</strong> — 주요 CTA에 Text Button을 사용하지 마세요. Filled Button을 사용합니다.
              </p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[5] }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <DoCard>
                <div style={{ padding: `${spacing.primitive[4]}px ${spacing.primitive[5]}px` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: typography.fontSize.md, fontWeight: typography.fontWeight.bold, color: "var(--text-primary)" }}>추천 상품</span>
                    <TextButtonDemo variant="arrow" color="neutral" size="small">
                      전체보기
                    </TextButtonDemo>
                  </div>
                </div>
              </DoCard>
              <p style={{ marginTop: spacing.primitive[2], fontSize: typography.fontSize.compact, lineHeight: 1.7, color: "var(--content-success-default)" }}>
                <strong>Do</strong> — Arrow variant를 네비게이션 링크로 사용하여 이동을 유도합니다.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <DontCard>
                <div style={{ padding: spacing.primitive[5], backgroundColor: "var(--content-brand-default)", borderRadius: radius.primitive.md, margin: spacing.primitive[3], textAlign: "center" as const }}>
                  <TextButtonDemo variant="clear" color="primary" size="medium">
                    가독성 낮음
                  </TextButtonDemo>
                </div>
              </DontCard>
              <p style={{ marginTop: spacing.primitive[2], fontSize: typography.fontSize.compact, lineHeight: 1.7, color: "var(--content-error-default)", fontStyle: "italic" }}>
                <strong>Don&apos;t</strong> — 배경색과 텍스트 색상의 대비가 부족하면 가독성이 떨어집니다.
              </p>
            </div>
          </div>
        </Subsection>
      </Section>

      {/* 8. Design Tokens (single merged instance) */}
      <Section title="Design Tokens">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[5], lineHeight: 1.7 }}>
          TextButton 컴포넌트에 적용된 Foundation 기반 디자인 토큰입니다.
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
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Padding Horizontal</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>primitive.2</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>8px</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Padding Vertical</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>primitive.1</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>4px</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Icon-Text Gap</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>primitive.1</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>4px</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-primary)" }}>Border Radius</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>primitive.sm</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>8px</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Typography (Size별)">
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
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>xSmall</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>spacing.component.textButton.fontSize.xs</InlineCode> + <InlineCode>fontWeight.medium</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>12px / 500</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>small</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>spacing.component.textButton.fontSize.sm</InlineCode> + <InlineCode>fontWeight.medium</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>14px / 500</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>medium</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>spacing.component.textButton.fontSize.md</InlineCode> + <InlineCode>fontWeight.medium</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>16px / 500</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>large</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>spacing.component.textButton.fontSize.lg</InlineCode> + <InlineCode>fontWeight.medium</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>18px / 500</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>xLarge</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>spacing.component.textButton.fontSize.xl</InlineCode> + <InlineCode>fontWeight.medium</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>20px / 500</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Interaction">
          <div style={{ overflow: "auto", borderRadius: radius.primitive.md, border: "1px solid var(--divider)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
              <thead>
                <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Property</th>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Value</th>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>설명</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Pressed Background</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>--fill-alternative</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>누름 시 배경 오버레이 (호버 시 배경 없음)</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Disabled Text Color</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>--content-disabled-default</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>비활성화 시 텍스트 색상 (투명도 대신 색상 변환)</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-primary)" }}>Transition</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>transitions.all</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>배경색 + 텍스트 색상 + 보더 전환 (150ms ease)</td>
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
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Text Color</th>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Pressed Text</th>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Pressed BG</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>primary</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--content-brand-default</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--surface-brand-default-pressed</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--fill-alternative</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>neutral</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--content-base-default</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--content-base-strong</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--fill-alternative</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>muted</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--content-base-neutral</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--content-base-default</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--fill-alternative</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>error</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--content-error-default</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--surface-error-solid-pressed</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--fill-alternative</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>
      </Section>

      {/* 9. Accessibility */}
      <Section title="Accessibility">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[5], lineHeight: 1.7 }}>
          TextButton 컴포넌트는 웹 접근성 표준을 준수합니다.
        </p>

        <div style={{ overflow: "auto", borderRadius: radius.primitive.md, marginBottom: spacing.primitive[6] }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>속성</th>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>role=&quot;button&quot;</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>스크린 리더가 버튼으로 인식</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>aria-disabled</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>비활성화 상태를 보조 기술에 전달</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>aria-label</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>텍스트가 불명확할 때 액션을 설명하는 레이블</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Subsection title="Keyboard Interaction">
          <div style={{ overflow: "auto", borderRadius: radius.primitive.md, border: "1px solid var(--divider)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
              <thead>
                <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>키</th>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>동작</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><kbd style={{ padding: "2px 6px", backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.xs, fontSize: typography.fontSize.xs }}>Tab</kbd></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>버튼으로 포커스 이동</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><kbd style={{ padding: "2px 6px", backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.xs, fontSize: typography.fontSize.xs }}>Enter</kbd></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>버튼 클릭 실행</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><kbd style={{ padding: "2px 6px", backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.xs, fontSize: typography.fontSize.xs }}>Space</kbd></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>버튼 클릭 실행</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Design Principles">
          <div style={{ display: "grid", gap: spacing.primitive[4] }}>
            <PrincipleCard
              number={1}
              title="Focus Visible"
              desc="키보드 포커스 시 2px solid outline이 표시됩니다. Tab 키로 접근 가능하며 시각적 피드백을 제공합니다."
            />
            <PrincipleCard
              number={2}
              title="Minimum Touch Target"
              desc="padding으로 최소 44x44px 터치 영역을 확보합니다. 모바일 환경에서 터치하기 쉬운 크기를 유지합니다."
            />
            <PrincipleCard
              number={3}
              title="Color Contrast"
              desc="WCAG 2.1 AA 기준(4.5:1)을 충족하는 색상 대비를 유지합니다. 저시력 사용자도 텍스트를 읽을 수 있습니다."
            />
            <PrincipleCard
              number={4}
              title="Underline Variant Distinction"
              desc="Underline variant는 일반 링크와 구분될 수 있도록 button 역할을 명시합니다. 페이지 이동이 아닌 인터랙션에 사용됩니다."
            />
          </div>
        </Subsection>
      </Section>

      {/* 10. Related Components */}
      <Section title="Related Components">
        <div style={{ overflow: "auto", borderRadius: radius.primitive.md, border: "1px solid var(--divider)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>컴포넌트</th>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>용도</th>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>차이점</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontWeight: typography.fontWeight.medium }}>Button</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>주요/보조 액션 트리거</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>Button은 배경(filled/weak)이 있어 시각적 무게감이 큼. TextButton은 텍스트만으로 최소한의 존재감</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontWeight: typography.fontWeight.medium }}>IconButton</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>아이콘 전용 원형 버튼</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>IconButton은 아이콘만, TextButton은 텍스트 중심. 공간이 극히 제한된 경우 IconButton 사용</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontWeight: typography.fontWeight.medium }}>Chip</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>필터링/선택 인터랙션</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>Chip은 선택 상태 토글용, TextButton은 단일 액션 실행/네비게이션용</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontWeight: typography.fontWeight.medium }}>ActionArea</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>하단 액션 영역 컨테이너</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>ActionArea 내에서 Button과 함께 TextButton을 보조 액션으로 배치하는 패턴이 일반적</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}

// Usage Recommendation Card for TextButton
function UsageRecommendationCard({ situation, desc, variant, color, examples }: {
  situation: string;
  desc: string;
  variant: string;
  color: TextButtonColor;
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
            fontSize: typography.fontSize['2xs'],
            padding: "2px 6px",
            backgroundColor: "var(--surface-base-alternative)",
            color: "var(--content-base-secondary)",
            borderRadius: radius.primitive.xs,
            fontWeight: typography.fontWeight.medium,
          }}>
            {variant} + {color}
          </span>
        </div>
        <p style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", margin: 0, marginBottom: spacing.primitive[2] }}>{desc}</p>
        <p style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", margin: 0 }}>
          예시: {examples.join(", ")}
        </p>
      </div>
      <TextButtonDemo variant={variant as TextButtonVariant} color={color} size="small">
        {examples[0]}
      </TextButtonDemo>
    </div>
  );
}

const GITHUB_BASE = "https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system/src";
const TEXTBUTTON_SOURCE = `${GITHUB_BASE}/components/TextButton/TextButton.tsx`;

function WebContent() {
  return (
    <div>
      {/* 1. Source Code */}
      <Section title="Source Code">
        <div style={{ padding: spacing.primitive[4], backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.md, marginBottom: spacing.primitive[6], display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)", margin: 0 }}>TextButton Component</p>
            <p style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", margin: "4px 0 0 0" }}>실제 컴포넌트 소스 코드를 GitHub에서 확인하세요.</p>
          </div>
          <a
            href={TEXTBUTTON_SOURCE}
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

      {/* 2. Import */}
      <Section title="Import">
        <CodeBlock code={`import { TextButton } from '@baerae-zkap/design-system';`} />
      </Section>

      {/* 3. Basic Usage */}
      <Section title="Basic Usage">
        <PreviewBox>
          <div style={{ display: "flex", gap: spacing.primitive[4], alignItems: "center", padding: spacing.primitive[6] }}>
            <TextButtonDemo variant="clear" color="primary" size="medium">Text Button</TextButtonDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<TextButton
  variant="clear"
  color="primary"
  size="medium"
  onClick={() => {}}
>
  Text Button
</TextButton>`} />
      </Section>

      {/* 4. Variants */}
      <Section title="Variants">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          세 가지 variant를 제공합니다: clear(기본), underline, arrow
        </p>
        <PreviewBox>
          <div style={{ display: "flex", gap: spacing.primitive[6], alignItems: "center", padding: spacing.primitive[6] }}>
            <TextButtonDemo variant="clear" color="primary" size="medium">Clear</TextButtonDemo>
            <TextButtonDemo variant="underline" color="primary" size="medium">Underline</TextButtonDemo>
            <TextButtonDemo variant="arrow" color="primary" size="medium">Arrow</TextButtonDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`{/* Clear (default) */}
<TextButton variant="clear" onClick={() => {}}>
  Clear
</TextButton>

{/* Underline */}
<TextButton variant="underline" onClick={() => {}}>
  Underline
</TextButton>

{/* Arrow - for navigation */}
<TextButton variant="arrow" onClick={() => {}}>
  Arrow
</TextButton>`} />
      </Section>

      {/* 5. Colors */}
      <Section title="Colors">
        <PreviewBox>
          <div style={{ display: "flex", gap: spacing.primitive[6], alignItems: "center", padding: spacing.primitive[6] }}>
            <TextButtonDemo variant="clear" color="primary" size="medium">Primary</TextButtonDemo>
            <TextButtonDemo variant="clear" color="neutral" size="medium">Neutral</TextButtonDemo>
            <TextButtonDemo variant="clear" color="muted" size="medium">Muted</TextButtonDemo>
            <TextButtonDemo variant="clear" color="error" size="medium">Error</TextButtonDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<TextButton color="primary" onClick={() => {}}>Primary</TextButton>
<TextButton color="neutral" onClick={() => {}}>Neutral</TextButton>
<TextButton color="muted" onClick={() => {}}>Muted</TextButton>
<TextButton color="error" onClick={() => {}}>Error</TextButton>`} />
      </Section>

      {/* 6. Sizes */}
      <Section title="Sizes">
        <PreviewBox>
          <div style={{ display: "flex", gap: spacing.primitive[6], alignItems: "center", padding: spacing.primitive[6] }}>
            <TextButtonDemo variant="clear" color="primary" size="xSmall">XSmall</TextButtonDemo>
            <TextButtonDemo variant="clear" color="primary" size="small">Small</TextButtonDemo>
            <TextButtonDemo variant="clear" color="primary" size="medium">Medium</TextButtonDemo>
            <TextButtonDemo variant="clear" color="primary" size="large">Large</TextButtonDemo>
            <TextButtonDemo variant="clear" color="primary" size="xLarge">XLarge</TextButtonDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<TextButton size="xSmall" onClick={() => {}}>XSmall</TextButton>
<TextButton size="small" onClick={() => {}}>Small</TextButton>
<TextButton size="medium" onClick={() => {}}>Medium</TextButton>
<TextButton size="large" onClick={() => {}}>Large</TextButton>
<TextButton size="xLarge" onClick={() => {}}>XLarge</TextButton>`} />
      </Section>

      {/* 7. With Action Area */}
      <Section title="With Action Area">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          Action Area에서 보조 액션으로 사용됩니다. 주요 버튼과 함께 시각적 계층을 형성합니다.
        </p>
        <PreviewBox>
          <div style={{ width: "100%", maxWidth: 320 }}>
            <ActionAreaWithTextButton />
          </div>
        </PreviewBox>
        <CodeBlock code={`<div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 20, alignItems: 'center' }}>
  <Button
    buttonType="filled"
    color="primary"
    size="xLarge"
    layout="fillWidth"
    onClick={() => {}}
  >
    로그인
  </Button>
  <TextButton
    color="primary"
    onClick={() => {}}
  >
    회원가입
  </TextButton>
</div>`} />
      </Section>

      {/* 8. States */}
      <Section title="States">
        <PreviewBox>
          <div style={{ display: "flex", gap: spacing.primitive[6], alignItems: "center", padding: spacing.primitive[6] }}>
            <TextButtonDemo variant="clear" color="primary" size="medium">Default</TextButtonDemo>
            <TextButtonDemo variant="clear" color="primary" size="medium" disabled>Disabled</TextButtonDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<TextButton color="primary" onClick={() => {}}>
  Default
</TextButton>

<TextButton color="primary" disabled onClick={() => {}}>
  Disabled
</TextButton>`} />
      </Section>

      {/* 9. API Reference */}
      <Section title="API Reference">
        <Subsection title="Common Props">
          <PropsTable
            props={[
              { name: "children", type: "ReactNode", required: false, description: "버튼 텍스트" },
              { name: "variant", type: '"clear" | "underline" | "arrow"', required: false, defaultVal: '"clear"', description: "버튼 스타일 변형" },
              { name: "color", type: '"primary" | "neutral" | "muted" | "error"', required: false, defaultVal: '"primary"', description: "텍스트 색상" },
              { name: "size", type: '"xSmall" | "small" | "medium" | "large" | "xLarge"', required: false, defaultVal: '"medium"', description: "텍스트 크기" },
              { name: "disabled", type: "boolean", required: false, defaultVal: "false", description: "비활성화 상태" },
            ]}
          />
        </Subsection>
        <Subsection title="Web-specific Props">
          <PropsTable
            props={[
              { name: "onClick", type: "() => void", required: false, description: "클릭 핸들러" },
              { name: "type", type: '"button" | "submit" | "reset"', required: false, defaultVal: '"button"', description: "HTML button type" },
              { name: "aria-label", type: "string", required: false, description: "스크린 리더용 레이블" },
              { name: "aria-disabled", type: "boolean", required: false, description: "비활성화 상태 접근성 전달" },
            ]}
          />
        </Subsection>
      </Section>
    </div>
  );
}

// Anatomy Diagram
function AnatomyDiagram() {
  return (
    <PreviewBox>
      <svg width="400" height="100" viewBox="0 0 400 100">
        {/* Background */}
        <rect x="120" y="30" width="160" height="40" fill="transparent" stroke="var(--border-base-default)" strokeWidth="1" strokeDasharray="4" rx="6" />

        {/* Text Label */}
        <text x="200" y="55" textAnchor="middle" fontSize={typography.fontSize.md} fontWeight={typography.fontWeight.medium} fill="var(--content-brand-default)">Text Button</text>

        {/* Arrow Icon (for arrow variant) */}
        <path d="M275 50 L285 50 M280 45 L285 50 L280 55" stroke="var(--content-brand-default)" strokeWidth="2" fill="none" />

        {/* Underline (for underline variant) */}
        <line x1="150" y1="62" x2="250" y2="62" stroke="var(--content-brand-default)" strokeWidth="1" strokeDasharray="4" opacity="0.5" />

        {/* Annotations */}
        {/* 1. Label */}
        <circle cx="200" cy="12" r="10" fill="var(--content-brand-default)" />
        <text x="200" y="16" textAnchor="middle" fontSize="11" fill="white" fontWeight={typography.fontWeight.semibold}>1</text>
        <line x1="200" y1="22" x2="200" y2="35" stroke="var(--content-brand-default)" strokeWidth="1" strokeDasharray="2" />

        {/* 2. Trailing Icon */}
        <circle cx="320" cy="50" r="10" fill="var(--content-brand-default)" />
        <text x="320" y="54" textAnchor="middle" fontSize="11" fill="white" fontWeight={typography.fontWeight.semibold}>2</text>
        <line x1="310" y1="50" x2="290" y2="50" stroke="var(--content-brand-default)" strokeWidth="1" strokeDasharray="2" />

        {/* 3. Underline */}
        <circle cx="200" cy="88" r="10" fill="var(--content-brand-default)" />
        <text x="200" y="92" textAnchor="middle" fontSize="11" fill="white" fontWeight={typography.fontWeight.semibold}>3</text>
        <line x1="200" y1="78" x2="200" y2="66" stroke="var(--content-brand-default)" strokeWidth="1" strokeDasharray="2" />

        {/* 4. Touch area */}
        <circle cx="80" cy="50" r="10" fill="var(--content-brand-default)" />
        <text x="80" y="54" textAnchor="middle" fontSize="11" fill="white" fontWeight={typography.fontWeight.semibold}>4</text>
        <line x1="90" y1="50" x2="118" y2="50" stroke="var(--content-brand-default)" strokeWidth="1" strokeDasharray="2" />
      </svg>
    </PreviewBox>
  );
}

// Action Area with Text Button Demo
function ActionAreaWithTextButton() {
  return (
    <div
      style={{
        borderLeft: "2px solid var(--border-base-default)",
        borderRight: "2px solid var(--border-base-default)",
        borderBottom: "2px solid var(--border-base-default)",
        borderRadius: `0 0 ${radius.primitive.md}px ${radius.primitive.md}px`,
        overflow: "hidden",
        backgroundColor: "var(--surface-base-default)",
      }}
    >
      <div style={{ padding: spacing.primitive[5], backgroundColor: "var(--surface-base-default)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[3], alignItems: "center" }}>
          {/* Main Button */}
          <button
            style={{
              width: "100%",
              height: 48,
              backgroundColor: "var(--content-brand-default)",
              color: "var(--content-base-onColor)",
              border: "none",
              borderRadius: radius.primitive.md,
              fontSize: typography.fontSize.md,
              fontWeight: typography.fontWeight.semibold,
              cursor: "pointer",
            }}
          >
            로그인
          </button>
          {/* Text Button */}
          <TextButtonDemo variant="clear" color="primary" size="medium">
            회원가입
          </TextButtonDemo>
        </div>
      </div>
      {/* Home indicator */}
      <div style={{ padding: `${spacing.primitive[2]}px 0 ${spacing.primitive[3]}px`, backgroundColor: "var(--surface-base-default)", display: "flex", justifyContent: "center" }}>
        <div style={{ width: 60, height: 4, backgroundColor: "var(--border-base-default)", borderRadius: 2 }} />
      </div>
    </div>
  );
}

// Text Button Demo Component
interface TextButtonDemoProps {
  variant: TextButtonVariant;
  color: TextButtonColor;
  size: TextButtonSize;
  disabled?: boolean;
  isHovered?: boolean;
  isPressed?: boolean;
  children: React.ReactNode;
}

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
        color: color, fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.medium,
      }}>
        {label}
      </div>
      <span style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", textAlign: "center" }}>{sublabel}</span>
    </div>
  );
}

function TextButtonDemo({ variant, color, size, disabled, isHovered, isPressed, children }: TextButtonDemoProps) {
  // For forced hover/pressed states (used in States section previews),
  // apply background overlay styles manually since the real component
  // manages its own hover/pressed states internally.
  const forcedStyle: React.CSSProperties = {};
  if (isPressed) {
    const pressedBgMap: Record<TextButtonColor, string> = {
      primary: "var(--effect-alpha-brand-selection)",
      neutral: "var(--effect-alpha-fill-normal)",
      muted: "var(--effect-alpha-fill-normal)",
      error: "var(--surface-error-default)",
    };
    forcedStyle.backgroundColor = pressedBgMap[color];
  } else if (isHovered) {
    const hoverBgMap: Record<TextButtonColor, string> = {
      primary: "var(--effect-alpha-brand-selection)",
      neutral: "var(--effect-alpha-fill-alternative)",
      muted: "var(--effect-alpha-fill-alternative)",
      error: "var(--surface-error-default)",
    };
    forcedStyle.backgroundColor = hoverBgMap[color];
  }

  return (
    <TextButton
      variant={variant}
      color={color}
      size={size}
      disabled={disabled}
      style={forcedStyle}
    >
      {children}
    </TextButton>
  );
}
