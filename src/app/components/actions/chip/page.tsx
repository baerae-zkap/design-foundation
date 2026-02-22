"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform, highlightCode } from "@/components/PlatformTabs";
import { Chip, typography, spacing, radius } from '@baerae-zkap/design-system';
import { Section, Subsection, InlineCode } from "@/components/docs/Section";
import { PropsTable } from "@/components/docs/PropsTable";
import { PrincipleCard, VariantCard, DoCard, DontCard } from "@/components/docs/Cards";
import { RadioGroup, CopyButton } from "@/components/docs/Playground";


// Types
type ChipVariant = "filled" | "weak";
type ChipColor = "primary" | "neutral" | "success" | "error" | "warning";
type ChipSize = "small" | "medium" | "large";

// Size configurations
const sizeConfig: Record<ChipSize, { height: number; fontSize: number; paddingX: number; iconSize: number }> = {
  small: { height: spacing.primitive[6], fontSize: typography.fontSize.xs, paddingX: spacing.primitive[2], iconSize: 14 },
  medium: { height: spacing.primitive[8], fontSize: typography.fontSize.sm, paddingX: spacing.primitive[3], iconSize: 18 },
  large: { height: spacing.primitive[10], fontSize: typography.fontSize.md, paddingX: spacing.primitive[4], iconSize: 22 },
};

// Color configurations
const colorConfig: Record<ChipColor, {
  filled: { bg: string; bgPressed: string; bgSelected: string; text: string; textSelected: string };
  weak: { bg: string; bgPressed: string; bgSelected: string; text: string; textSelected: string };
}> = {
  primary: {
    filled: {
      bg: 'var(--surface-brand-default)',
      bgPressed: 'var(--surface-brand-defaultPressed)',
      bgSelected: 'var(--surface-brand-default)',
      text: 'var(--content-base-onColor)',
      textSelected: 'var(--content-base-onColor)',
    },
    weak: {
      bg: 'var(--surface-brand-secondary)',
      bgPressed: 'var(--surface-brand-secondaryPressed)',
      bgSelected: 'var(--surface-brand-default)',
      text: 'var(--content-brand-default)',
      textSelected: 'var(--content-base-onColor)',
    },
  },
  neutral: {
    filled: {
      bg: 'var(--surface-base-container)',
      bgPressed: 'var(--surface-base-containerPressed)',
      bgSelected: 'var(--content-base-default)',
      text: 'var(--content-base-default)',
      textSelected: 'var(--content-base-onColor)',
    },
    weak: {
      bg: 'var(--fill-alternative)',
      bgPressed: 'var(--fill-normal)',
      bgSelected: 'var(--content-base-default)',
      text: 'var(--content-base-default)',
      textSelected: 'var(--content-base-onColor)',
    },
  },
  success: {
    filled: {
      bg: 'var(--surface-success-solid)',
      bgPressed: 'var(--surface-success-solidPressed)',
      bgSelected: 'var(--surface-success-solid)',
      text: 'var(--content-base-onColor)',
      textSelected: 'var(--content-base-onColor)',
    },
    weak: {
      bg: 'var(--surface-success-default)',
      bgPressed: 'var(--surface-success-defaultPressed)',
      bgSelected: 'var(--surface-success-solid)',
      text: 'var(--content-success-strong)',
      textSelected: 'var(--content-base-onColor)',
    },
  },
  error: {
    filled: {
      bg: 'var(--surface-error-solid)',
      bgPressed: 'var(--surface-error-solidPressed)',
      bgSelected: 'var(--surface-error-solid)',
      text: 'var(--content-base-onColor)',
      textSelected: 'var(--content-base-onColor)',
    },
    weak: {
      bg: 'var(--surface-error-default)',
      bgPressed: 'var(--surface-error-defaultPressed)',
      bgSelected: 'var(--surface-error-solid)',
      text: 'var(--content-error-default)',
      textSelected: 'var(--content-base-onColor)',
    },
  },
  warning: {
    filled: {
      bg: 'var(--surface-warning-solid)',
      bgPressed: 'var(--surface-warning-solidPressed)',
      bgSelected: 'var(--surface-warning-solid)',
      text: 'var(--content-base-onColor)',
      textSelected: 'var(--content-base-onColor)',
    },
    weak: {
      bg: 'var(--surface-warning-default)',
      bgPressed: 'var(--surface-warning-defaultPressed)',
      bgSelected: 'var(--surface-warning-solid)',
      text: 'var(--content-warning-strong)',
      textSelected: 'var(--content-base-onColor)',
    },
  },
};

export default function ChipPage() {
  return (
    <div style={{ maxWidth: 840 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Actions" },
          { label: "Chip" },
        ]}
      />

      {/* Header */}
      <h1 style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold, marginBottom: spacing.primitive[2], color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
        Chip
      </h1>
      <p style={{ fontSize: typography.fontSize.md, color: "var(--text-secondary)", marginBottom: spacing.primitive[8], lineHeight: 1.7 }}>
        사용자의 선택, 필터링, 입력값을 시각적으로 나타내는 컴팩트한 인터랙티브 요소입니다.
        짧은 텍스트로 상태를 표현하며, 선택/해제 토글이나 태그 제거 등의 인터랙션을 제공합니다.
      </p>

      {/* Interactive Playground */}
      <ChipPlayground />

      {/* Platform Tabs */}
      <PlatformTabs>
        {(platform) => <PlatformContent platform={platform} />}
      </PlatformTabs>
    </div>
  );
}

function ChipPlayground() {
  const [variant, setVariant] = useState<ChipVariant>("filled");
  const [color, setColor] = useState<ChipColor>("neutral");
  const [size, setSize] = useState<ChipSize>("medium");
  const [selected, setSelected] = useState(false);
  const [showClose, setShowClose] = useState(false);
  const generateCode = () => {
    const props = [];
    if (variant !== "filled") props.push(`variant="${variant}"`);
    if (color !== "neutral") props.push(`color="${color}"`);
    if (size !== "medium") props.push(`size="${size}"`);
    if (selected) props.push("selected");
    if (showClose) props.push("onClose={() => {}}");

    const propsStr = props.length > 0 ? `\n  ${props.join("\n  ")}\n` : " ";

    return `<Chip${propsStr.length > 1 ? propsStr : " "}onClick={() => {}}>
  태그
</Chip>`;
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
            <ChipDemo
              variant={variant}
              color={color}
              size={size}
              selected={selected}
              onClose={showClose ? () => {} : undefined}
            >
              태그
            </ChipDemo>
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
                  { value: "filled", label: "Filled" },
                  { value: "weak", label: "Weak" },
                ]}
                value={variant}
                onChange={(v) => setVariant(v as ChipVariant)}
              />

              {/* Color */}
              <RadioGroup
                label="Color"
                options={[
                  { value: "primary", label: "Primary" },
                  { value: "neutral", label: "Neutral" },
                  { value: "success", label: "Success" },
                  { value: "error", label: "Error" },
                  { value: "warning", label: "Warning" },
                ]}
                value={color}
                onChange={(v) => setColor(v as ChipColor)}
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
                onChange={(v) => setSize(v as ChipSize)}
              />

              {/* Selected */}
              <RadioGroup
                label="Selected"
                options={[
                  { value: "false", label: "False" },
                  { value: "true", label: "True" },
                ]}
                value={selected ? "true" : "false"}
                onChange={(v) => setSelected(v === "true")}
              />

              {/* Show Close */}
              <RadioGroup
                label="Show Close"
                options={[
                  { value: "false", label: "False" },
                  { value: "true", label: "True" },
                ]}
                value={showClose ? "true" : "false"}
                onChange={(v) => setShowClose(v === "true")}
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
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7 }}>
          <InlineCode>Chip</InlineCode> 컴포넌트는 필터, 태그, 선택 등을 나타내는 컴팩트한 인터랙티브 요소예요.
          카테고리 필터링, 태그 입력/삭제 등 반복적이고 가역적인 선택 인터랙션에 적합해요.
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
          <svg width="420" height="120" viewBox="0 0 420 120">
            {/* Chip Container */}
            <rect x="120" y="40" width="180" height="40" rx="20" fill="var(--content-brand-default)" />

            {/* Check icon circle */}
            <circle cx="148" cy="60" r="10" fill="white" fillOpacity="0.2" />
            <path d="M144 60 L147 63 L153 57" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

            {/* Label text */}
            <text x="200" y="65" textAnchor="middle" fill="white" fontSize={typography.fontSize.sm} fontWeight={typography.fontWeight.medium}>Selected Tag</text>

            {/* Close button */}
            <circle cx="272" cy="60" r="10" fill="white" fillOpacity="0.2" />
            <path d="M268 56 L276 64 M276 56 L268 64" stroke="white" strokeWidth="1.5" strokeLinecap="round" />

            {/* Lines to labels */}
            <line x1="70" y1="60" x2="120" y2="60" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="120" cy="60" r="3" fill="var(--content-base-default)" />

            <line x1="148" y1="40" x2="148" y2="15" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="148" cy="40" r="3" fill="var(--content-base-default)" />

            <line x1="200" y1="80" x2="200" y2="105" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="200" cy="80" r="3" fill="var(--content-base-default)" />

            <line x1="272" y1="40" x2="272" y2="15" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="272" cy="40" r="3" fill="var(--content-base-default)" />

            {/* Numbered circles */}
            <circle cx="55" cy="60" r="14" fill="var(--content-base-default)" />
            <text x="55" y="65" textAnchor="middle" fill="white" fontSize={typography.fontSize.xs} fontWeight={typography.fontWeight.semibold}>1</text>

            <circle cx="148" cy="15" r="14" fill="var(--content-base-default)" />
            <text x="148" y="20" textAnchor="middle" fill="white" fontSize={typography.fontSize.xs} fontWeight={typography.fontWeight.semibold}>2</text>

            <circle cx="200" cy="105" r="14" fill="var(--content-base-default)" />
            <text x="200" y="110" textAnchor="middle" fill="white" fontSize={typography.fontSize.xs} fontWeight={typography.fontWeight.semibold}>3</text>

            <circle cx="272" cy="15" r="14" fill="var(--content-base-default)" />
            <text x="272" y="20" textAnchor="middle" fill="white" fontSize={typography.fontSize.xs} fontWeight={typography.fontWeight.semibold}>4</text>
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
          <div>1. Container</div>
          <div style={{ textAlign: "center" }}>2. Icon</div>
          <div style={{ textAlign: "center" }}>3. Label</div>
          <div style={{ textAlign: "right" }}>4. Close</div>
        </div>
      </Section>

      {/* 3. Variants (+ Behaviors subsection) */}
      <Section title="Variants">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
          <VariantCard name="Filled" description="배경색이 채워진 기본 스타일">
            <div style={{ display: "flex", gap: spacing.primitive[2] }}>
              <ChipDemo variant="filled" color="primary">Primary</ChipDemo>
              <ChipDemo variant="filled" color="neutral">Neutral</ChipDemo>
            </div>
          </VariantCard>
          <VariantCard name="Weak" description="투명 배경의 가벼운 스타일. 보더 없이 텍스트 색상으로만 구분합니다.">
            <div style={{ display: "flex", gap: spacing.primitive[2] }}>
              <ChipDemo variant="weak" color="primary">Primary</ChipDemo>
              <ChipDemo variant="weak" color="neutral">Neutral</ChipDemo>
            </div>
          </VariantCard>
        </div>

        <Subsection title="Behaviors">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
            <VariantCard name="Selectable (selected)" description="필터/카테고리 선택. selected=true 시 체크 아이콘 표시.">
              <div style={{ display: "flex", gap: spacing.primitive[2] }}>
                <ChipDemo color="primary">전체</ChipDemo>
                <ChipDemo color="primary" selected>전자제품</ChipDemo>
              </div>
            </VariantCard>
            <VariantCard name="Removable (onClose)" description="태그 삭제. onClose 제공 시 X 버튼 표시.">
              <div style={{ display: "flex", gap: spacing.primitive[2] }}>
                <ChipDemo onClose={() => {}}>React</ChipDemo>
                <ChipDemo onClose={() => {}}>TypeScript</ChipDemo>
              </div>
            </VariantCard>
          </div>
        </Subsection>
      </Section>

      {/* 4. Sizes */}
      <Section title="Sizes">
        <PreviewBox>
          <div style={{ display: "flex", gap: spacing.primitive[4], alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <ChipDemo size="small">Small</ChipDemo>
              <p style={{ fontSize: typography.fontSize["2xs"], color: "var(--content-base-secondary)", marginTop: spacing.primitive[2] }}>24px</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <ChipDemo size="medium">Medium</ChipDemo>
              <p style={{ fontSize: typography.fontSize["2xs"], color: "var(--content-base-secondary)", marginTop: spacing.primitive[2] }}>32px</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <ChipDemo size="large">Large</ChipDemo>
              <p style={{ fontSize: typography.fontSize["2xs"], color: "var(--content-base-secondary)", marginTop: spacing.primitive[2] }}>40px</p>
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* 5. Colors */}
      <Section title="Colors">
        <Subsection title="Filled">
          <PreviewBox>
            <div style={{ display: "flex", gap: spacing.primitive[2], flexWrap: "wrap" }}>
              <ChipDemo color="primary">Primary</ChipDemo>
              <ChipDemo color="neutral">Neutral</ChipDemo>
              <ChipDemo color="success">Success</ChipDemo>
              <ChipDemo color="error">Error</ChipDemo>
              <ChipDemo color="warning">Warning</ChipDemo>
            </div>
          </PreviewBox>
        </Subsection>
        <Subsection title="Weak">
          <PreviewBox>
            <div style={{ display: "flex", gap: spacing.primitive[2], flexWrap: "wrap" }}>
              <ChipDemo variant="weak" color="primary">Primary</ChipDemo>
              <ChipDemo variant="weak" color="neutral">Neutral</ChipDemo>
              <ChipDemo variant="weak" color="success">Success</ChipDemo>
              <ChipDemo variant="weak" color="error">Error</ChipDemo>
              <ChipDemo variant="weak" color="warning">Warning</ChipDemo>
            </div>
          </PreviewBox>
        </Subsection>
      </Section>

      {/* 6. States (+ Interaction States subsection) */}
      <Section title="States">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          Chip의 다양한 상태를 확인할 수 있습니다. 직접 클릭해서 Pressed 상태를 확인해보세요.
        </p>
        <PreviewBox>
          <div style={{ display: "flex", gap: spacing.primitive[4], flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <ChipDemo color="primary">Default</ChipDemo>
              <p style={{ fontSize: typography.fontSize["2xs"], color: "var(--content-base-secondary)", marginTop: spacing.primitive[2] }}>기본</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <ChipDemo color="primary" selected>Selected</ChipDemo>
              <p style={{ fontSize: typography.fontSize["2xs"], color: "var(--content-base-secondary)", marginTop: spacing.primitive[2] }}>선택됨</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <ChipDemo color="primary" disabled>Disabled</ChipDemo>
              <p style={{ fontSize: typography.fontSize["2xs"], color: "var(--content-base-secondary)", marginTop: spacing.primitive[2] }}>비활성화</p>
            </div>
          </div>
        </PreviewBox>

        <Subsection title="Interaction States">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: spacing.primitive[4] }}>
            Chip은 선택 상태를 포함하여 다양한 인터랙션 상태를 지원합니다. 선택/해제 토글과 호버, 누름 피드백이 시각적으로 명확히 구분됩니다.
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: spacing.primitive[4],
            padding: spacing.primitive[6],
            backgroundColor: "var(--surface-base-alternative)",
            borderRadius: radius.primitive.md,
          }}>
            <InteractionStateCard label="Default" sublabel="기본 상태" color="var(--content-brand-default)" bgColor="var(--surface-brand-secondary)" />
            <InteractionStateCard label="Selected" sublabel="선택됨" color="var(--static-white)" bgColor="var(--content-brand-default)" />
            <InteractionStateCard label="Hover" sublabel="마우스 오버" color="var(--content-brand-default)" bgColor="var(--surface-brand-secondaryPressed)" />
            <InteractionStateCard label="Pressed" sublabel="누름" color="var(--content-brand-default)" bgColor="var(--surface-brand-secondaryPressed)" />
            <InteractionStateCard label="Disabled" sublabel="비활성화" color="var(--content-disabled-default)" bgColor="var(--surface-disabled-default)" opacity={0.5} />
            <InteractionStateCard label="Focused" sublabel="키보드 포커스" color="var(--content-brand-default)" bgColor="var(--surface-brand-secondary)" showFocusRing />
          </div>
        </Subsection>
      </Section>

      {/* 7. Usage Guidelines (+ Best Practices + UX Writing subsections) */}
      <Section title="Usage Guidelines">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          일관된 UX를 위해 아래 권고 조합을 따르세요. Chip은 <strong style={{ color: "var(--text-primary)" }}>컴팩트한 정보 표현과 인터랙션</strong>이 필요한 상황에서 사용합니다.
        </p>

        <Subsection title="Recommended Combinations">
          <div style={{ display: "grid", gap: spacing.primitive[3] }}>
            <UsageCard
              situation="Filter Chips"
              desc="카테고리, 태그 등 필터 선택/해제"
              variant="filled"
              color="primary"
              chipLabel="전자제품"
              selected
            />
            <UsageCard
              situation="Selection Chips"
              desc="여러 옵션 중 하나 또는 다수 선택"
              variant="weak"
              color="primary"
              chipLabel="옵션 A"
            />
            <UsageCard
              situation="Input Chips"
              desc="태그 입력, 이메일 수신자 등 제거 가능한 항목"
              variant="filled"
              color="neutral"
              chipLabel="React"
              showClose
            />
            <UsageCard
              situation="Status Indicator"
              desc="상태 표시 (성공, 에러, 경고)"
              variant="filled"
              color="success"
              chipLabel="완료"
            />
          </div>
        </Subsection>

        <Subsection title="Do / Don&apos;t">
          <PropsTable
            props={[
              { name: "Do", type: "", required: false, description: "짧고 간결한 라벨을 사용하세요 (2-4글자)" },
              { name: "Don't", type: "", required: false, description: "긴 문장을 Chip에 넣지 마세요" },
              { name: "Do", type: "", required: false, description: "필터/선택 용도로 사용하세요" },
              { name: "Don't", type: "", required: false, description: "주요 CTA 액션에 Chip을 사용하지 마세요" },
              { name: "Do", type: "", required: false, description: "의미에 맞는 색상을 사용하세요" },
              { name: "Don't", type: "", required: false, description: "한 영역에 5개 이상의 색상을 혼용하지 마세요" },
            ]}
          />
        </Subsection>

        <Subsection title="Design Principles">
          <div style={{ display: "grid", gap: spacing.primitive[4] }}>
            <PrincipleCard
              number={1}
              title="컴팩트한 정보 전달"
              desc="Chip은 짧은 텍스트로 상태, 카테고리, 속성을 나타냅니다. 긴 텍스트가 필요하면 Button이나 Badge를 사용하세요."
            />
            <PrincipleCard
              number={2}
              title="선택 상태의 명확한 시각적 피드백"
              desc="selected 상태는 배경색 변화와 체크 아이콘으로 사용자에게 명확히 전달됩니다. 선택/해제가 즉시 반영되어야 합니다."
            />
            <PrincipleCard
              number={3}
              title="제거 가능한 Chip은 onClose 사용"
              desc="태그 입력 등 사용자가 제거할 수 있는 Chip에는 onClose를 제공하세요. X 버튼은 별도의 클릭 영역으로 접근 가능해야 합니다."
            />
          </div>
        </Subsection>

        <Subsection title="Best Practices">
          <div style={{ display: "grid", gap: spacing.primitive[5] }}>
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <DoCard>
                    <div style={{ display: "flex", gap: spacing.primitive[2] }}>
                      <ChipDemo color="primary">전체</ChipDemo>
                      <ChipDemo color="primary" selected>전자제품</ChipDemo>
                      <ChipDemo color="primary">의류</ChipDemo>
                    </div>
                  </DoCard>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <DontCard>
                    <div style={{ display: "flex", gap: spacing.primitive[2] }}>
                      <ChipDemo color="primary" selected>전자제품 카테고리 전체 보기</ChipDemo>
                    </div>
                  </DontCard>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> Chip 라벨은 간결하게 작성합니다
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0, fontStyle: "italic" }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Don&apos;t</span> 긴 텍스트를 Chip에 사용하지 않습니다
                </p>
              </div>
            </div>

            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <DoCard>
                    <div style={{ display: "flex", gap: spacing.primitive[2] }}>
                      <ChipDemo color="primary" selected>React</ChipDemo>
                      <ChipDemo color="primary">TypeScript</ChipDemo>
                    </div>
                  </DoCard>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <DontCard>
                    <div style={{ display: "flex", gap: spacing.primitive[2] }}>
                      <ChipDemo color="primary" selected>React</ChipDemo>
                      <ChipDemo color="success" selected>TypeScript</ChipDemo>
                      <ChipDemo color="error" selected>Vue</ChipDemo>
                    </div>
                  </DontCard>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> 같은 용도의 Chip 그룹에는 동일한 색상을 사용합니다
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0, fontStyle: "italic" }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Don&apos;t</span> 같은 그룹에서 여러 색상을 혼용하지 않습니다
                </p>
              </div>
            </div>

            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <DoCard>
                  <div style={{ textAlign: "center" }}>
                    <InlineCode>&quot;최신순&quot;</InlineCode>
                    <p style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", margin: 0, marginTop: spacing.primitive[1] }}>짧고 간결하게 표현합니다</p>
                  </div>
                </DoCard>
                <DontCard>
                  <div style={{ textAlign: "center" }}>
                    <InlineCode>&quot;최신순으로 정렬합니다&quot;</InlineCode>
                    <p style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", margin: 0, marginTop: spacing.primitive[1] }}>Chip에는 문장을 넣지 않습니다</p>
                  </div>
                </DontCard>
              </div>
            </div>

            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <DoCard>
                  <div style={{ textAlign: "center" }}>
                    <InlineCode>&quot;서울&quot;</InlineCode>
                    <p style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", margin: 0, marginTop: spacing.primitive[1] }}>가능한 한 짧게 작성합니다</p>
                  </div>
                </DoCard>
                <DontCard>
                  <div style={{ textAlign: "center" }}>
                    <InlineCode>&quot;서울특별시&quot;</InlineCode>
                    <p style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", margin: 0, marginTop: spacing.primitive[1] }}>공식 명칭보다 축약형을 사용합니다</p>
                  </div>
                </DontCard>
              </div>
            </div>
          </div>
        </Subsection>
      </Section>

      {/* 8. Design Tokens (single merged instance) */}
      <Section title="Design Tokens">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          Chip 컴포넌트에 적용된 Foundation 기반 디자인 토큰입니다.
        </p>

        <Subsection title="Size별 토큰">
          <div style={{ overflow: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.compact }}>
              <thead>
                <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                  <th style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>Property</th>
                  <th style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>Small</th>
                  <th style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>Medium</th>
                  <th style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>Large</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}>Height</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>24px</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>32px</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>40px</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}>Padding X</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>8px (primitive.2)</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>12px (primitive.3)</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>16px (primitive.4)</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}>Font Size</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>12px (xs)</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>14px (sm)</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>16px (base)</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}>Icon Size</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>14px</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>18px</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>22px</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}>Border Radius</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>12px (height/2)</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>16px (height/2)</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>20px (height/2)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Color 토큰 (Filled Variant)">
          <div style={{ overflow: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.compact }}>
              <thead>
                <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                  <th style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>Property</th>
                  <th style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>Foundation Token</th>
                  <th style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>Value (primary)</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}>Background</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}><InlineCode>surface.brand.default</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>var(--surface-brand-default) (palette.blue.50)</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}>Background (pressed)</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}><InlineCode>surface.brand.defaultPressed</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>var(--surface-brand-defaultPressed) (palette.blue.45)</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}>Background (selected)</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}><InlineCode>surface.brand.default</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>var(--surface-brand-default) (palette.blue.50)</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}>Text</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}><InlineCode>content.base.onColor</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>var(--content-base-onColor) (palette.static.white)</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}>Text (selected)</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}><InlineCode>content.base.onColor</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>var(--content-base-onColor) (palette.static.white)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Color 토큰 (Weak Variant)">
          <div style={{ overflow: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.compact }}>
              <thead>
                <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                  <th style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>Property</th>
                  <th style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>Foundation Token</th>
                  <th style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>Value (primary)</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}>Background</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}><InlineCode>surface.brand.secondary</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>var(--surface-brand-secondary) (palette.blue.95)</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}>Background (pressed)</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}><InlineCode>surface.brand.secondaryPressed</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>var(--surface-brand-secondaryPressed) (palette.blue.90)</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}>Background (selected)</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}><InlineCode>surface.brand.default</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>var(--surface-brand-default) (palette.blue.50)</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}>Text</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}><InlineCode>content.brand.default</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>var(--content-brand-default) (palette.blue.50)</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}>Text (selected)</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}><InlineCode>content.base.onColor</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>var(--content-base-onColor) (palette.static.white)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Interaction">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[3], lineHeight: 1.7 }}>
            Chip은 비활성화 시 <InlineCode>opacity.disabled</InlineCode> (0.5) 감소와 텍스트 색상을 <InlineCode>content.disabled.default</InlineCode>로 교체를 모두 적용합니다.
          </p>
          <div style={{ overflow: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.compact }}>
              <thead>
                <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                  <th style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>속성</th>
                  <th style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>토큰</th>
                  <th style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>설명</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}>Disabled Opacity</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}><InlineCode>opacity.disabled</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>0.5 — 비활성화 시 전체 투명도</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}>Disabled Text</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}><InlineCode>content.disabled.default</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>var(--content-disabled-default) — 비활성화 텍스트 색상</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}>Gap</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}><InlineCode>spacing.component.chip.gap</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>4px — 아이콘/텍스트 간 간격</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}>Font Weight</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}><InlineCode>typography.fontWeight.medium</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>500 — 라벨 폰트 웨이트</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}>Transition</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}><InlineCode>transitions.all</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>background-color, color, border-color 150ms ease — 모든 속성에 부드러운 전환</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}>Cursor (disabled)</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}><InlineCode>not-allowed</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontFamily: "monospace", color: "var(--text-secondary)" }}>비활성화 시 커서</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>
      </Section>

      {/* 9. Accessibility */}
      <Section title="Accessibility">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          Chip 컴포넌트는 선택 상태와 제거 기능의 접근성을 보장합니다.
        </p>

        <div style={{ overflow: "auto", marginBottom: spacing.primitive[6] }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>속성</th>
                <th style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>role=&quot;button&quot;</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>스크린 리더가 버튼으로 인식</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>aria-pressed</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>selected 상태를 보조 기술에 전달</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>aria-label</InlineCode> (Close)</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>닫기 버튼에 목적을 설명하는 레이블 제공</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}><InlineCode>aria-disabled</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>비활성화 상태를 보조 기술에 전달</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Subsection title="Keyboard Interaction">
          <div style={{ overflow: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
              <thead>
                <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                  <th style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>키</th>
                  <th style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>동작</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, borderBottom: "1px solid var(--divider)" }}><kbd style={{ padding: "2px 6px", backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.xs, fontSize: typography.fontSize.xs }}>Tab</kbd></td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>Chip으로 포커스 이동</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, borderBottom: "1px solid var(--divider)" }}><kbd style={{ padding: "2px 6px", backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.xs, fontSize: typography.fontSize.xs }}>Enter</kbd> / <kbd style={{ padding: "2px 6px", backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.xs, fontSize: typography.fontSize.xs }}>Space</kbd></td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>Chip 선택/해제 토글</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, borderBottom: "1px solid var(--divider)" }}><kbd style={{ padding: "2px 6px", backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.xs, fontSize: typography.fontSize.xs }}>Tab</kbd> (Close)</td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>닫기 버튼으로 포커스 이동 (별도 탭 타겟)</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}><kbd style={{ padding: "2px 6px", backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.xs, fontSize: typography.fontSize.xs }}>Delete</kbd> / <kbd style={{ padding: "2px 6px", backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.xs, fontSize: typography.fontSize.xs }}>Backspace</kbd></td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>onClose가 있는 Chip 제거</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Design Principles">
          <div style={{ display: "grid", gap: spacing.primitive[4] }}>
            <PrincipleCard
              number={1}
              title="aria-pressed로 선택 상태 전달"
              desc="selected 상태는 aria-pressed 속성을 통해 스크린 리더에 전달됩니다. 사용자가 현재 선택 상태를 인지할 수 있어야 합니다."
            />
            <PrincipleCard
              number={2}
              title="Close Button 접근성"
              desc="닫기 버튼은 별도의 탭 타겟으로 접근 가능하며, Enter/Space 키로 제거할 수 있습니다. aria-label='삭제'를 제공합니다."
            />
            <PrincipleCard
              number={3}
              title="Color Contrast"
              desc="WCAG 2.1 AA 기준(4.5:1)을 충족하는 색상 대비를 유지합니다. selected 상태에서도 텍스트 가독성을 보장합니다."
            />
            <PrincipleCard
              number={4}
              title="Chip Group Navigation"
              desc="Chip 그룹 내에서 Tab 키로 순차 이동이 가능해야 합니다. 선택된 Chip의 상태가 스크린 리더에 즉시 반영됩니다."
            />
          </div>
        </Subsection>
      </Section>

      {/* 10. Related Components */}
      <Section title="Related Components">
        <div style={{ overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>컴포넌트</th>
                <th style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>용도</th>
                <th style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>차이점</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontWeight: typography.fontWeight.medium }}>Button</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>주요/보조 액션 트리거</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>Chip은 선택/필터용, Button은 액션 실행용</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontWeight: typography.fontWeight.medium }}>ContentBadge</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>읽기 전용 상태/라벨 표시</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>Chip은 인터랙티브, Badge는 비인터랙티브</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontWeight: typography.fontWeight.medium }}>TextButton</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>텍스트 링크 스타일 보조 액션</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>Chip은 선택 상태 표현, TextButton은 네비게이션/액션</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontWeight: typography.fontWeight.medium }}>IconButton</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>아이콘만으로 액션 표현</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>Chip은 텍스트 기반, IconButton은 아이콘 전용</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}

function WebContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>
      {/* 1. Source Code */}
      <Section title="Source Code">
        <div style={{ padding: spacing.primitive[4], backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.md, marginBottom: spacing.primitive[6], display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)", margin: 0 }}>Chip Component</p>
            <p style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", margin: "4px 0 0 0" }}>실제 컴포넌트 소스 코드를 GitHub에서 확인하세요.</p>
          </div>
          <a
            href="https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system/src/components/Chip/Chip.tsx"
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
        <CodeBlock code={`import { Chip } from '@baerae-zkap/design-system';`} />
      </Section>

      {/* 3. Basic Usage */}
      <Section title="Basic Usage">
        <PreviewBox>
          <ChipDemo>기본 칩</ChipDemo>
        </PreviewBox>
        <CodeBlock code={`<Chip onClick={() => {}}>기본 칩</Chip>`} />
      </Section>

      {/* 4. Filter Example */}
      <Section title="Filter Example">
        <PreviewBox>
          <FilterChipDemo />
        </PreviewBox>
        <CodeBlock code={`const [selected, setSelected] = useState(['전자제품']);

const toggle = (filter: string) => {
  setSelected(prev =>
    prev.includes(filter)
      ? prev.filter(f => f !== filter)
      : [...prev, filter]
  );
};

<div style={{ display: 'flex', gap: 8 }}>
  {['전자제품', '의류', '식품'].map(filter => (
    <Chip
      key={filter}
      color="primary"
      selected={selected.includes(filter)}
      onClick={() => toggle(filter)}
    >
      {filter}
    </Chip>
  ))}
</div>`} />
      </Section>

      {/* 5. Input Example */}
      <Section title="Input Example">
        <PreviewBox>
          <InputChipDemo />
        </PreviewBox>
        <CodeBlock code={`const [tags, setTags] = useState(['React', 'TypeScript']);

const remove = (tag: string) => {
  setTags(prev => prev.filter(t => t !== tag));
};

<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
  {tags.map(tag => (
    <Chip
      key={tag}
      onClose={() => remove(tag)}
    >
      {tag}
    </Chip>
  ))}
</div>`} />
      </Section>

      {/* 6. API Reference */}
      <Section title="API Reference">
        <PropsTable
          props={[
            { name: "children", type: "ReactNode", required: true, description: "칩 레이블 텍스트" },
            { name: "variant", type: '"filled" | "weak"', required: false, defaultVal: '"filled"', description: "스타일 변형 - filled(채움), weak(연한 배경)" },
            { name: "color", type: '"primary" | "neutral" | "success" | "error" | "warning"', required: false, defaultVal: '"neutral"', description: "색상 테마" },
            { name: "size", type: '"small" | "medium" | "large"', required: false, defaultVal: '"medium"', description: "크기" },
            { name: "selected", type: "boolean", required: false, defaultVal: "false", description: "선택 상태" },
            { name: "disabled", type: "boolean", required: false, defaultVal: "false", description: "비활성화 상태" },
            { name: "leftIcon", type: "ReactNode", required: false, description: "좌측 아이콘" },
            { name: "avatar", type: "ReactNode", required: false, description: "아바타 (leftIcon과 배타적)" },
            { name: "onClose", type: "() => void", required: false, description: "닫기 버튼 핸들러" },
            { name: "closeIcon", type: "ReactNode", required: false, description: "닫기 아이콘 커스텀" },
            { name: "onClick", type: "() => void", required: false, description: "클릭 핸들러" },
          ]}
        />
      </Section>
    </div>
  );
}

// ==================== Demo Components ====================

interface ChipDemoProps {
  variant?: ChipVariant;
  color?: ChipColor;
  size?: ChipSize;
  selected?: boolean;
  disabled?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

function ChipDemo({
  variant = "filled",
  color = "neutral",
  size = "medium",
  selected = false,
  disabled = false,
  onClose,
  children,
}: ChipDemoProps) {
  return (
    <Chip
      variant={variant}
      color={color}
      size={size}
      selected={selected}
      disabled={disabled}
      onClose={onClose}
    >
      {children}
    </Chip>
  );
}

function FilterChipDemo() {
  const [selected, setSelected] = useState(['전자제품']);
  const filters = ['전자제품', '의류', '식품'];

  const toggle = (filter: string) => {
    setSelected(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <div style={{ display: 'flex', gap: spacing.primitive[2] }}>
      {filters.map(filter => (
        <ChipDemo
          key={filter}
          color="primary"
          selected={selected.includes(filter)}
        >
          {filter}
        </ChipDemo>
      ))}
    </div>
  );
}

function InputChipDemo() {
  const [tags, setTags] = useState(['React', 'TypeScript', 'React Native']);

  const remove = (tag: string) => {
    setTags(prev => prev.filter(t => t !== tag));
  };

  return (
    <div style={{ display: 'flex', gap: spacing.primitive[2], flexWrap: 'wrap' }}>
      {tags.map(tag => (
        <ChipDemo
          key={tag}
          onClose={() => remove(tag)}
        >
          {tag}
        </ChipDemo>
      ))}
    </div>
  );
}

// ==================== UI Components ====================

function InteractionStateCard({ label, sublabel, color, bgColor, opacity, showFocusRing }: {
  label: string; sublabel: string; color: string; bgColor: string; opacity?: number; showFocusRing?: boolean;
}) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[3], padding: spacing.primitive[4],
    }}>
      <div style={{
        width: "100%", height: spacing.primitive[12], borderRadius: radius.primitive.md,
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

function UsageCard({ situation, desc, variant = "filled", color, chipLabel, selected = false, showClose = false }: {
  situation: string;
  desc: string;
  variant?: ChipVariant;
  color: ChipColor;
  chipLabel: string;
  selected?: boolean;
  showClose?: boolean;
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
            fontSize: typography.fontSize["2xs"],
            padding: "2px 6px",
            backgroundColor: variant === "filled" ? "var(--surface-brand-secondary)" : "var(--surface-base-alternative)",
            color: variant === "filled" ? "var(--surface-brand-defaultPressed)" : "var(--content-base-secondary)",
            borderRadius: radius.primitive.xs,
            fontWeight: typography.fontWeight.medium,
          }}>
            {variant} + {color}
          </span>
        </div>
        <p style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", margin: 0 }}>{desc}</p>
      </div>
      <ChipDemo
        variant={variant}
        color={color}
        size="small"
        selected={selected}
        onClose={showClose ? () => {} : undefined}
      >
        {chipLabel}
      </ChipDemo>
    </div>
  );
}
