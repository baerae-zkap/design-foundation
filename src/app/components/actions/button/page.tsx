"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform, highlightCode } from "@/components/PlatformTabs";
import { Button, typography, spacing, radius } from '@baerae-zkap/design-system';
import { Section, Subsection, InlineCode } from "@/components/docs/Section";
import { PropsTable, ColorTableRow } from "@/components/docs/PropsTable";
import { PrincipleCard, DoCard, DontCard } from "@/components/docs/Cards";
import { RadioGroup, CopyButton } from "@/components/docs/Playground";
import { NumberBadge } from "@/components/docs/Labels";
import { BRAND_EXTERNAL_COLORS } from "@/tokens/brandExternal";

// GitHub source URLs (design-foundation repo)
const GITHUB_BASE = "https://github.com/baerae-zkap/design-foundation/tree/main/packages/design-system/src/components/Button";
const BUTTON_SOURCE = `${GITHUB_BASE}/Button.tsx`;

export default function ButtonPage() {
  return (
    <div style={{ maxWidth: 840 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Actions" },
          { label: "Button" },
        ]}
      />

      {/* Header */}
      <h1 style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold, marginBottom: spacing.primitive[2], color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
        Button
      </h1>
      <p style={{ fontSize: typography.fontSize.md, color: "var(--text-secondary)", marginBottom: spacing.primitive[8], lineHeight: 1.7 }}>
        폼 제출, 다이얼로그 확인/취소, CTA 등 주요 사용자 액션을 실행하는 핵심 버튼 컴포넌트입니다. Filled, Weak 스타일과 6가지 색상 조합으로 시각적 위계를 표현합니다.
      </p>

      {/* Interactive Playground */}
      <ButtonPlayground />

      {/* Platform Tabs */}
      <PlatformTabs>
        {(platform) => <PlatformContent platform={platform} />}
      </PlatformTabs>
    </div>
  );
}

function ButtonPlayground() {
  const [buttonType, setButtonType] = useState<ButtonType>("filled");
  const [color, setColor] = useState<ButtonColor>("primary");
  const [size, setSize] = useState<ButtonSize>("medium");
  const [leadingIcon, setLeadingIcon] = useState(false);
  const [trailingIcon, setTrailingIcon] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const generateCode = () => {
    const props = [];
    if (buttonType !== "filled") props.push(`buttonType="${buttonType}"`);
    if (color !== "primary") props.push(`color="${color}"`);
    if (size !== "medium") props.push(`size="${size}"`);
    if (leadingIcon) props.push(`leftContent={<Icon name="plus" />}`);
    if (trailingIcon) props.push(`rightContent={<Icon name="chevron-right" />}`);
    if (isLoading) props.push("isLoading");
    if (disabled) props.push("disabled");

    const propsStr = props.length > 0 ? `\n  ${props.join("\n  ")}\n` : " ";

    return `<Button${propsStr.length > 1 ? propsStr : " "}onClick={() => {}}>
  Button
</Button>`;
  };

  const colorLabels: Record<ButtonColor, string> = {
    primary: "Primary",
    neutral: "Neutral",
    success: "Success",
    error: "Error",
    kakao: "Kakao",
    google: "Google",
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
            <ButtonDemo
              buttonType={buttonType}
              color={color}
              size={size}
              isLoading={isLoading}
              disabled={disabled}
              leadingIcon={leadingIcon}
              trailingIcon={trailingIcon}
            >
              Button
            </ButtonDemo>
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
              {/* Type */}
              <RadioGroup
                label="Type"
                options={[
                  { value: "filled", label: "Filled" },
                  { value: "weak", label: "Weak" },
                ]}
                value={buttonType}
                onChange={(v) => setButtonType(v as ButtonType)}
              />

              {/* Color */}
              <RadioGroup
                label="Color"
                options={[
                  { value: "primary", label: colorLabels.primary },
                  { value: "neutral", label: colorLabels.neutral },
                  { value: "success", label: colorLabels.success },
                  { value: "error", label: colorLabels.error },
                ]}
                value={color}
                onChange={(v) => setColor(v as ButtonColor)}
              />

              {/* Size */}
              <RadioGroup
                label="Size"
                options={[
                  { value: "small", label: "Small" },
                  { value: "medium", label: "Medium" },
                  { value: "large", label: "Large" },
                  { value: "xLarge", label: "X-Large" },
                ]}
                value={size}
                onChange={(v) => setSize(v as ButtonSize)}
              />

              {/* Leading icon */}
              <RadioGroup
                label="Leading icon"
                options={[
                  { value: "false", label: "False" },
                  { value: "true", label: "True" },
                ]}
                value={leadingIcon ? "true" : "false"}
                onChange={(v) => setLeadingIcon(v === "true")}
              />

              {/* Trailing icon */}
              <RadioGroup
                label="Trailing icon"
                options={[
                  { value: "false", label: "False" },
                  { value: "true", label: "True" },
                ]}
                value={trailingIcon ? "true" : "false"}
                onChange={(v) => setTrailingIcon(v === "true")}
              />

              {/* States */}
              <RadioGroup
                label="State"
                options={[
                  { value: "default", label: "Default" },
                  { value: "loading", label: "Loading" },
                  { value: "disabled", label: "Disabled" },
                ]}
                value={isLoading ? "loading" : disabled ? "disabled" : "default"}
                onChange={(v) => {
                  setIsLoading(v === "loading");
                  setDisabled(v === "disabled");
                }}
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
          <span style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.semibold, color: "var(--docs-code-active-text)" }}>Web</span>
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
  switch (platform) {
    case "design":
      return <DesignContent />;
    case "web":
      return <WebContent />;
  }
}

// ============================================
// Design Tab Content
// ============================================
function DesignContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>
      {/* 1. Overview */}
      <Section title="Overview">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7 }}>
          <InlineCode>Button</InlineCode> 컴포넌트는 사용자가 어떤 액션을 트리거하거나 이벤트를 실행할 때 사용해요.
          폼 제출, 다이얼로그 열기, 작업 취소, 삭제와 같은 다양한 액션을 처리하는 데 사용해요.
        </p>
      </Section>

      {/* 2. Anatomy */}
      <Section title="Anatomy">
        <AnatomyDiagram />
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: spacing.primitive[6],
          marginTop: spacing.primitive[5],
          fontSize: typography.fontSize.sm,
          fontWeight: typography.fontWeight.medium,
          color: "var(--text-primary)",
        }}>
          <div>1. Leading Icon</div>
          <div style={{ textAlign: "center" }}>2. Label</div>
          <div style={{ textAlign: "right" }}>3. Trailing Icon</div>
        </div>
      </Section>

      {/* 3. Variants */}
      <Section title="Variants">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[5], lineHeight: 1.7 }}>
          <InlineCode>buttonType</InlineCode> prop을 통해 2가지 variant를 사용할 수 있습니다. 각 variant는 시각적 강조 수준이 다릅니다.
        </p>

        <Subsection title="Filled">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
            배경색이 채워진 버튼입니다. <strong style={{ color: "var(--text-primary)" }}>가장 높은 시각적 강조</strong>가 필요한 주요 액션에 사용합니다. 화면당 하나의 Primary filled 버튼만 사용하는 것을 권장합니다.
          </p>
          <PreviewBox>
            <div style={{ display: "flex", gap: spacing.primitive[4] }}>
              <ButtonDemo buttonType="filled" color="primary">Primary</ButtonDemo>
              <ButtonDemo buttonType="filled" color="neutral">Neutral</ButtonDemo>
            </div>
          </PreviewBox>
        </Subsection>

        <Subsection title="Weak">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
            연한 배경이 있는 버튼입니다. <strong style={{ color: "var(--text-primary)" }}>중간 수준의 강조</strong>가 필요한 보조 액션에 사용합니다. Filled 버튼과 함께 배치하여 계층을 표현합니다.
          </p>
          <PreviewBox>
            <div style={{ display: "flex", gap: spacing.primitive[4] }}>
              <ButtonDemo buttonType="weak" color="primary">Primary</ButtonDemo>
              <ButtonDemo buttonType="weak" color="neutral">Neutral</ButtonDemo>
            </div>
          </PreviewBox>
        </Subsection>
      </Section>

      {/* 4. Size */}
      <Section title="Size">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[5], lineHeight: 1.7 }}>
          너비는 자유롭게 커스터마이징할 수 있으나 <strong style={{ color: "var(--text-primary)" }}>높이는 고정</strong>하여 사용합니다. 일관된 터치 영역과 시각적 안정성을 위해 높이를 임의로 변경하지 않습니다.
        </p>

        <div style={{ marginBottom: spacing.primitive[6], overflow: "auto", borderRadius: radius.primitive.md, border: "1px solid var(--divider)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Size</th>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Height</th>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Font Size</th>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>용도</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>small</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>36px</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>14px (sm)</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>밀도 높은 UI, 테이블 내 액션</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>medium</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>40px</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>14px (sm)</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>기본값, 대부분의 상황</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>large</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>44px</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>14px (sm)</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>강조가 필요한 CTA</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>xLarge</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>48px</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>16px (base)</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>모달/시트 하단, 주요 CTA</td>
              </tr>
            </tbody>
          </table>
        </div>

        <PreviewBox>
          <div style={{ display: "flex", gap: spacing.primitive[3], alignItems: "flex-end" }}>
            <div style={{ textAlign: "center" }}>
              <ButtonDemo buttonType="filled" color="primary" size="small">Small</ButtonDemo>
              <p style={{ fontSize: typography.fontSize['2xs'], color: "var(--text-tertiary)", marginTop: spacing.primitive[2] }}>36px</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <ButtonDemo buttonType="filled" color="primary" size="medium">Medium</ButtonDemo>
              <p style={{ fontSize: typography.fontSize['2xs'], color: "var(--text-tertiary)", marginTop: spacing.primitive[2] }}>40px</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <ButtonDemo buttonType="filled" color="primary" size="large">Large</ButtonDemo>
              <p style={{ fontSize: typography.fontSize['2xs'], color: "var(--text-tertiary)", marginTop: spacing.primitive[2] }}>44px</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <ButtonDemo buttonType="filled" color="primary" size="xLarge">X-Large</ButtonDemo>
              <p style={{ fontSize: typography.fontSize['2xs'], color: "var(--text-tertiary)", marginTop: spacing.primitive[2] }}>48px</p>
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* 5. Color */}
      <Section title="Color">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[5], lineHeight: 1.7 }}>
          <InlineCode>color</InlineCode> prop을 통해 버튼의 의미와 목적에 맞는 색상을 지정합니다.
        </p>

        <div style={{ marginBottom: spacing.primitive[6], overflow: "auto", borderRadius: radius.primitive.md, border: "1px solid var(--divider)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Color</th>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>용도</th>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>예시</th>
              </tr>
            </thead>
            <tbody>
              <ColorTableRow color="primary" desc="브랜드 주요 색상. 가장 중요한 CTA에 사용" example="확인, 저장, 제출" />
              <ColorTableRow color="neutral" desc="중립적 색상. 취소, 닫기 등 보조 액션" example="취소, 닫기, 돌아가기" />
              <ColorTableRow color="success" desc="성공/긍정적 액션" example="완료, 승인" />
              <ColorTableRow color="error" desc="위험/삭제 액션 (Destructive)" example="삭제, 탈퇴" isLast />
            </tbody>
          </table>
        </div>

        <PreviewBox>
          <div style={{ display: "flex", gap: spacing.primitive[3], flexWrap: "wrap" }}>
            <ButtonDemo buttonType="filled" color="primary">Brand</ButtonDemo>
            <ButtonDemo buttonType="weak" color="primary">Weak</ButtonDemo>
            <ButtonDemo buttonType="filled" color="neutral">Base</ButtonDemo>
            <ButtonDemo buttonType="filled" color="success">Success</ButtonDemo>
            <ButtonDemo buttonType="filled" color="error">Error</ButtonDemo>
          </div>
        </PreviewBox>

        <Subsection title="Social Login Colors">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
            소셜 로그인 버튼을 위한 전용 색상입니다.
          </p>
          <PreviewBox>
            <div style={{ display: "flex", gap: spacing.primitive[3], flexDirection: "column", width: "100%", maxWidth: 280 }}>
              <ButtonDemo buttonType="filled" color="kakao" layout="fillWidth">
                <KakaoIcon />
                카카오로 시작하기
              </ButtonDemo>
              <ButtonDemo buttonType="weak" color="google" layout="fillWidth">
                <GoogleIcon />
                Google로 시작하기
              </ButtonDemo>
            </div>
          </PreviewBox>
        </Subsection>
      </Section>

      {/* 6. Layout */}
      <Section title="Layout">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[5], lineHeight: 1.7 }}>
          <InlineCode>layout</InlineCode> prop을 통해 버튼의 너비 동작을 제어합니다.
        </p>

        <div style={{ marginBottom: spacing.primitive[6], overflow: "auto", borderRadius: radius.primitive.md, border: "1px solid var(--divider)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Layout</th>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>동작</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>hug</InlineCode> (기본값)</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>콘텐츠 크기에 맞춤 (flex: 0)</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>fillWidth</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>부모의 전체 너비에 맞춤 (flex: 1)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <PreviewBox>
          <div style={{ width: "100%", maxWidth: 300, display: "flex", flexDirection: "column", gap: spacing.primitive[3] }}>
            <div>
              <p style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", marginBottom: spacing.primitive[2] }}>hug (default)</p>
              <ButtonDemo buttonType="filled" color="primary">Hug Content</ButtonDemo>
            </div>
            <div>
              <p style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", marginBottom: spacing.primitive[2] }}>fillWidth</p>
              <ButtonDemo buttonType="filled" color="primary" layout="fillWidth">Fill Width</ButtonDemo>
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* 7. Icon Options */}
      <Section title="Icon option">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[5], lineHeight: 1.7 }}>
          <InlineCode>leftContent</InlineCode>, <InlineCode>rightContent</InlineCode>를 사용하면 아이콘과 텍스트를 배치할 수 있습니다.
        </p>

        <Subsection title="Leading icon with label">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
            Label의 의미를 보조하거나 시각적 힌트를 제공할 때 사용합니다.
          </p>
          <PreviewBox>
            <div style={{ display: "flex", gap: spacing.primitive[3] }}>
              <ButtonDemo buttonType="filled" color="primary" leadingIcon>추가하기</ButtonDemo>
              <ButtonDemo buttonType="weak" color="primary" leadingIcon="download">다운로드</ButtonDemo>
            </div>
          </PreviewBox>
        </Subsection>

        <Subsection title="Trailing icon with label">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
            행동의 방향성을 강조하거나 다음 단계로의 이동을 유도할 때 사용합니다.
          </p>
          <PreviewBox>
            <div style={{ display: "flex", gap: spacing.primitive[3] }}>
              <ButtonDemo buttonType="filled" color="primary" trailingIcon>다음</ButtonDemo>
              <ButtonDemo buttonType="weak" color="primary" trailingIcon="external">외부 링크</ButtonDemo>
            </div>
          </PreviewBox>
        </Subsection>

        <Subsection title="Icon only">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
            공간이 제한되거나 아이콘만으로 의미 전달이 충분할 때 사용합니다. <strong style={{ color: "var(--text-primary)" }}>반드시 aria-label을 제공</strong>해야 합니다.
          </p>
          <PreviewBox>
            <div style={{ display: "flex", gap: spacing.primitive[3], alignItems: "center" }}>
              <ButtonDemo buttonType="filled" color="primary" iconOnly="plus" />
              <ButtonDemo buttonType="weak" color="primary" iconOnly="edit" />
              <ButtonDemo buttonType="filled" color="neutral" iconOnly="close" />
            </div>
          </PreviewBox>
        </Subsection>
      </Section>

      {/* 8. States (merged with Interaction States) */}
      <Section title="States">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[5], lineHeight: 1.7 }}>
          버튼은 사용자 상호작용에 따라 다양한 상태를 가집니다. 각 상태는 시각적으로 구분되어 사용자에게 피드백을 제공합니다.
        </p>

        <Subsection title="Interaction States">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: spacing.primitive[6] }}>
            Button은 사용자의 입력 방식과 컴포넌트 상태에 따라 시각적 피드백이 달라집니다. 각 상태는 명확히 구분되어 사용자가 현재 상호작용 가능 여부를 즉시 인지할 수 있습니다.
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: spacing.primitive[4],
            padding: spacing.primitive[6],
            backgroundColor: "var(--surface-base-alternative)",
            borderRadius: radius.primitive.lg,
          }}>
            <InteractionStateCard label="Default" sublabel="기본 상태" color="var(--content-base-onColor)" bgColor="var(--surface-brand-default)" />
            <InteractionStateCard label="Hover" sublabel="마우스 오버" color="var(--content-base-onColor)" bgColor="var(--surface-brand-defaultPressed)" />
            <InteractionStateCard label="Pressed" sublabel="누름" color="var(--content-base-onColor)" bgColor="var(--surface-brand-defaultPressed)" />
            <InteractionStateCard label="Disabled" sublabel="비활성화" color="var(--content-disabled-default)" bgColor="var(--surface-disabled-default)" opacity={0.5} />
            <InteractionStateCard label="Focused" sublabel="키보드 포커스" color="var(--content-base-onColor)" bgColor="var(--surface-brand-default)" showFocusRing />
            <InteractionStateCard label="Loading" sublabel="로딩 중" color="var(--content-base-onColor)" bgColor="var(--surface-brand-default)" />
          </div>
        </Subsection>

        <Subsection title="Interactive States">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
            마우스/터치 상호작용에 따른 상태 변화입니다. 아래 버튼들을 직접 hover하고 클릭해보세요.
          </p>
          <PreviewBox>
            <div style={{ display: "flex", gap: spacing.primitive[6], flexWrap: "wrap" }}>
              <StateDemo label="Default" state="default" />
              <StateDemo label="Hover" state="hover" />
              <StateDemo label="Pressed" state="pressed" />
              <StateDemo label="Disabled" state="disabled" />
            </div>
          </PreviewBox>
          <div style={{ marginTop: spacing.primitive[4], padding: spacing.primitive[4], backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.md, fontSize: typography.fontSize.compact }}>
            <p style={{ margin: 0, color: "var(--text-secondary)", lineHeight: 1.8 }}>
              <strong style={{ color: "var(--text-primary)" }}>Default:</strong> 기본 상태<br />
              <strong style={{ color: "var(--text-primary)" }}>Hover:</strong> 마우스 오버 시 배경색이 약간 어두워짐<br />
              <strong style={{ color: "var(--text-primary)" }}>Pressed:</strong> 클릭/터치 시 배경색이 더 어두워지고 scale(0.98) 적용<br />
              <strong style={{ color: "var(--text-primary)" }}>Disabled:</strong> 비활성화 시 opacity 감소, 클릭 불가
            </p>
          </div>
        </Subsection>

        <Subsection title="Loading State">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
            비동기 작업 중 로딩 상태를 표시합니다. 로딩 중에는 버튼 너비가 유지되며, 레이블 대신 로딩 인디케이터가 표시됩니다.
          </p>
          <PreviewBox>
            <div style={{ display: "flex", gap: spacing.primitive[4], alignItems: "center" }}>
              <LoadingButtonDemo />
              <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
                <ButtonDemo buttonType="filled" color="primary" isLoading>Loading</ButtonDemo>
                <p style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", margin: 0 }}>isLoading=true</p>
              </div>
            </div>
          </PreviewBox>
        </Subsection>

        <Subsection title="Loading + Disabled">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
            <InlineCode>isLoading</InlineCode>과 <InlineCode>disabled</InlineCode>가 동시에 적용되면, 로딩 UI가 표시되면서 상호작용이 차단됩니다.
          </p>
          <PreviewBox>
            <div style={{ display: "flex", gap: spacing.primitive[4] }}>
              <div style={{ textAlign: "center" }}>
                <ButtonDemo buttonType="filled" color="primary" isLoading disabled>Submit</ButtonDemo>
                <p style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", marginTop: spacing.primitive[2] }}>Loading + Disabled</p>
              </div>
            </div>
          </PreviewBox>
        </Subsection>
      </Section>

      {/* 9. Usage Guidelines (merged with Best Practices + UX Writing) */}
      <Section title="Usage Guidelines">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[6], lineHeight: 1.7 }}>
          일관된 UX를 위해 아래 권고 조합을 따르세요. 모든 조합이 가능하지만, <strong style={{ color: "var(--text-primary)" }}>권장 패턴</strong>을 사용하면 사용자가 예측 가능한 경험을 할 수 있습니다.
        </p>

        {/* Recommended Combinations */}
        <Subsection title="Recommended Combinations">
          <div style={{ display: "grid", gap: spacing.primitive[3] }}>
            <UsageCard
              situation="Primary CTA"
              desc="화면에서 가장 중요한 액션"
              buttonType="filled"
              color="primary"
              examples={["결제하기", "가입하기", "제출"]}
            />
            <UsageCard
              situation="Secondary CTA"
              desc="두 번째로 중요한 액션"
              buttonType="weak"
              color="primary"
              examples={["다음", "확인", "저장"]}
            />
            <UsageCard
              situation="Cancel / Dismiss"
              desc="취소, 닫기 등 보조 액션"
              buttonType="filled"
              color="neutral"
              examples={["취소", "닫기", "나중에"]}
            />
            <UsageCard
              situation="Destructive Action"
              desc="되돌릴 수 없는 위험한 액션"
              buttonType="filled"
              color="error"
              examples={["삭제", "탈퇴", "초기화"]}
            />
            <UsageCard
              situation="Success / Complete"
              desc="긍정적 완료 액션"
              buttonType="filled"
              color="success"
              examples={["완료", "승인", "확정"]}
            />
          </div>
        </Subsection>

        {/* Design Principles */}
        <Subsection title="Design Principles">
          <div style={{ display: "grid", gap: spacing.primitive[4] }}>
            <PrincipleCard
              number={1}
              title="화면당 Primary CTA는 1개"
              desc="primary + filled 조합은 화면당 1개만 사용하세요. 여러 액션이 있다면 나머지는 primary + weak를 사용합니다."
            />
            <PrincipleCard
              number={2}
              title="버튼 계층 구조 유지"
              desc="가장 중요한 액션에 가장 강조된 스타일을 사용하세요. 취소/닫기는 filled + neutral입니다. 강조도: primary filled > primary weak > neutral > TextButton"
            />
            <PrincipleCard
              number={3}
              title="색상의 의미를 지키세요"
              desc="error는 위험한 액션에만, success는 긍정적 완료에만 사용하세요. 일반 액션에 semantic 색상을 사용하지 마세요."
            />
          </div>
        </Subsection>

        {/* Button Placement */}
        <Subsection title="Button Placement">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
            다이얼로그나 폼에서 버튼 배치 순서:
          </p>
          <div style={{ display: "grid", gap: spacing.primitive[4] }}>
            <PlacementExample
              title="일반 다이얼로그"
              left={{ type: "filled", color: "neutral", label: "취소" }}
              right={{ type: "filled", color: "primary", label: "확인" }}
              note="확인(Primary)이 오른쪽"
            />
            <PlacementExample
              title="위험 액션 확인"
              left={{ type: "filled", color: "neutral", label: "취소" }}
              right={{ type: "filled", color: "error", label: "삭제" }}
              note="위험 액션이 오른쪽"
            />
          </div>
        </Subsection>

        {/* Best Practices (merged from standalone section + UX Writing) */}
        <Subsection title="Best Practices">
          <div style={{ display: "grid", gap: spacing.primitive[5] }}>
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <DoCard>
                    <ButtonDemo buttonType="filled" color="primary">확인</ButtonDemo>
                  </DoCard>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <DontCard>
                    <button
                      style={{
                        padding: `${spacing.primitive[2]}px ${spacing.primitive[6]}px`,
                        backgroundColor: "var(--surface-brand-default)",
                        color: "var(--content-base-onColor)",
                        border: "none",
                        borderRadius: radius.primitive.xl,
                        fontSize: typography.fontSize.sm,
                        fontWeight: typography.fontWeight.semibold,
                      }}
                    >
                      확인
                    </button>
                  </DontCard>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> 디자인 시스템의 기본 스타일을 유지합니다
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0, fontStyle: "italic" }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Don&apos;t</span> 높이와 border-radius를 임의로 변경하지 않습니다
                </p>
              </div>
            </div>

            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <DoCard>
                    <ButtonDemo buttonType="filled" color="primary" iconOnly="plus" />
                  </DoCard>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <DontCard>
                    <ButtonDemo buttonType="filled" color="primary">확인확인확인확인확인</ButtonDemo>
                  </DontCard>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> Icon-only 버튼에는 반드시 aria-label을 제공합니다
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0, fontStyle: "italic" }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Don&apos;t</span> Label은 간결하게 작성합니다. 2-4글자를 권장합니다
                </p>
              </div>
            </div>

            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <DoCard>
                    <InlineCode>&quot;저장하기&quot;</InlineCode>
                  </DoCard>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <DontCard>
                    <InlineCode>&quot;저장&quot;</InlineCode>
                  </DontCard>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> 동사 + ~하기 형태로 액션을 명시합니다
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0, fontStyle: "italic" }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Don&apos;t</span> 명사만으로는 액션 의도가 불분명합니다
                </p>
              </div>
            </div>

            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <DoCard>
                    <InlineCode>&quot;결제 진행&quot;</InlineCode>
                  </DoCard>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <DontCard>
                    <InlineCode>&quot;결제를 진행하시겠습니까?&quot;</InlineCode>
                  </DontCard>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> 간결하게 액션만 표현합니다
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0, fontStyle: "italic" }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Don&apos;t</span> 버튼 레이블에 물음표를 사용하지 않습니다
                </p>
              </div>
            </div>

            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <DoCard>
                    <InlineCode>&quot;삭제하기&quot;</InlineCode>
                  </DoCard>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <DontCard>
                    <InlineCode>&quot;정말 삭제?&quot;</InlineCode>
                  </DontCard>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> 존댓말 톤을 유지합니다
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0, fontStyle: "italic" }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Don&apos;t</span> 반말이나 불완전한 문장을 사용하지 않습니다
                </p>
              </div>
            </div>

            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <DoCard>
                    <InlineCode>&quot;로그인&quot;</InlineCode>
                  </DoCard>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <DontCard>
                    <InlineCode>&quot;로그인 버튼을 눌러주세요&quot;</InlineCode>
                  </DontCard>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> 레이블만으로 충분합니다
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0, fontStyle: "italic" }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Don&apos;t</span> 레이블에 &apos;버튼&apos;이라는 단어는 불필요합니다
                </p>
              </div>
            </div>
          </div>
        </Subsection>
      </Section>

      {/* 10. Design Tokens */}
      <Section title="Design Tokens">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[5], lineHeight: 1.7 }}>
          Button 컴포넌트에 적용된 Foundation 기반 디자인 토큰입니다.
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
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Padding X (S/M)</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>button.paddingX.sm</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>16px (primitive.4)</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Padding X (L)</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>button.paddingX.md</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>20px (primitive.5)</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Padding X (XL)</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>button.paddingX.lg</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>24px (primitive.6)</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Icon-Text Gap</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>button.gap</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>8px (primitive.2)</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Border Radius (S/M)</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>radius.component.button.sm</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>8px</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-primary)" }}>Border Radius (L/XL)</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>radius.component.button.lg</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>12px</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Height (Size별)">
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
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>small</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>primitive.8 + 4</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>36px</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>medium</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>primitive.10</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>40px</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>large</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>primitive.12 - 4</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>44px</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>xLarge</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>primitive.12</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>48px</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Typography">
          <div style={{ overflow: "auto", borderRadius: radius.primitive.md, border: "1px solid var(--divider)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
              <thead>
                <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Size</th>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Token</th>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}>small / medium / large</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>fontSize.sm</InlineCode> + <InlineCode>fontWeight.semibold</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>14px / 600</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}>xLarge</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>fontSize.md</InlineCode> + <InlineCode>fontWeight.semibold</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>16px / 600</td>
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
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Transition</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>transitions.background</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>배경색 전환 (150ms ease)</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Disabled Background</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>--surface-disabled-default</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>비활성화 시 배경색 (회색 톤)</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Disabled Text Color</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>--content-disabled-default</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>비활성화 시 텍스트 색상</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-primary)" }}>Disabled Opacity</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>opacity.disabled</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>0.5 — 비활성화 시 전체 투명도</td>
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
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Filled BG</th>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Filled Text</th>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Weak BG</th>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Weak Text</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>primary</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--surface-brand-default</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--content-base-on-color</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--surface-brand-secondary</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--content-brand-default</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>neutral</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--surface-base-container</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--content-base-default</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--surface-base-container</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--content-base-default</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>success</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--surface-success-solid</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--content-base-on-color</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--surface-success-default</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--content-success-default</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>error</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--surface-error-solid</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--content-base-on-color</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--surface-error-default</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--content-error-default</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>kakao</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--surface-kakao-default</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--content-base-strong</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--fill-alternative</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--content-base-strong</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>google</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--surface-google-default</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--content-base-default</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--surface-base-container</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)", fontSize: typography.fontSize.xs, fontFamily: "monospace" }}>--content-base-default</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>
      </Section>

      {/* 11. Accessibility */}
      <Section title="Accessibility">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[5], lineHeight: 1.7 }}>
          Button 컴포넌트는 웹 접근성 표준을 준수합니다.
        </p>

        <div style={{ overflow: "auto", borderRadius: radius.primitive.md, border: "1px solid var(--divider)", marginBottom: spacing.primitive[6] }}>
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
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>aria-busy</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>로딩 상태를 보조 기술에 전달</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>aria-label</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>Icon-only 버튼에 필수. 액션을 설명하는 텍스트</td>
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
              desc="키보드 포커스 시 2px solid outline이 표시됩니다. 포커스 링은 버튼 외곽에서 2px offset으로 표시되어 시인성을 확보합니다."
            />
            <PrincipleCard
              number={2}
              title="Minimum Touch Target"
              desc="모든 버튼은 최소 44x44px 터치 영역을 확보합니다 (iOS HIG 기준). small 사이즈도 hitSlop을 통해 터치 영역을 보장합니다."
            />
            <PrincipleCard
              number={3}
              title="Color Contrast"
              desc="WCAG 2.1 AA 기준(4.5:1)을 충족하는 색상 대비를 유지합니다. disabled 상태에서도 텍스트 가독성을 유지합니다."
            />
            <PrincipleCard
              number={4}
              title="Screen Reader Support"
              desc="버튼의 역할(role='button')과 상태(aria-disabled, aria-busy)가 스크린 리더에 전달됩니다. icon-only 버튼은 반드시 aria-label을 제공해야 합니다."
            />
          </div>
        </Subsection>
      </Section>

      {/* 12. Related Components */}
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
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontWeight: typography.fontWeight.medium }}>TextButton</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>보조 액션, 네비게이션</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>배경 없이 텍스트만으로 최소한의 시각적 존재감. Button과 함께 보조 액션으로 배치</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontWeight: typography.fontWeight.medium }}>IconButton</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>아이콘 전용 원형 버튼</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>아이콘만 표시하는 원형 버튼. 공간이 제한적이고 의미가 명확한 아이콘이 있을 때 사용</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontWeight: typography.fontWeight.medium }}>Chip</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>필터링, 선택 토글</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>선택 상태를 토글하는 용도. Button은 단발성 액션, Chip은 상태 전환</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontWeight: typography.fontWeight.medium }}>ActionArea</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>하단 액션 영역 컨테이너</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>Button을 포함하는 고정 하단 영역. 주요 CTA Button + 보조 TextButton 조합이 일반적</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}

// ============================================
// Web Tab Content
// ============================================
function WebContent() {
  return (
    <>
      <Section title="Source Code">
        <div style={{ padding: spacing.primitive[4], backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.md, marginBottom: spacing.primitive[6], display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)", margin: 0 }}>Button Component</p>
            <p style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", margin: "4px 0 0 0" }}>실제 컴포넌트 소스 코드를 GitHub에서 확인하세요.</p>
          </div>
          <a
            href={BUTTON_SOURCE}
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

      <Section title="Import">
        <CodeBlock code={`import { Button } from '@baerae-zkap/design-system';`} sourceUrl={BUTTON_SOURCE} />
      </Section>

      <Section title="Basic Usage">
        <PreviewBox>
          <div style={{ display: "flex", gap: spacing.primitive[4] }}>
            <ButtonDemo buttonType="filled" color="primary">Filled</ButtonDemo>
            <ButtonDemo buttonType="weak" color="primary">Weak</ButtonDemo>
          </div>
        </PreviewBox>
        <CodeBlock
          code={`<Button buttonType="filled" color="primary">
  Filled
</Button>

<Button buttonType="weak" color="primary">
  Weak
</Button>`}
          sourceUrl={BUTTON_SOURCE}
        />
      </Section>

      <Section title="Colors">
        <PreviewBox>
          <div style={{ display: "flex", gap: spacing.primitive[3], flexWrap: "wrap" }}>
            <ButtonDemo buttonType="filled" color="primary">Brand</ButtonDemo>
            <ButtonDemo buttonType="weak" color="primary">Weak</ButtonDemo>
            <ButtonDemo buttonType="filled" color="neutral">Base</ButtonDemo>
            <ButtonDemo buttonType="filled" color="success">Success</ButtonDemo>
            <ButtonDemo buttonType="filled" color="error">Error</ButtonDemo>
          </div>
        </PreviewBox>
        <CodeBlock
          code={`<Button buttonType="filled" color="primary">Brand</Button>
<Button buttonType="weak" color="primary">Weak</Button>
<Button buttonType="filled" color="neutral">Base</Button>
<Button buttonType="filled" color="success">Success</Button>
<Button buttonType="filled" color="error">Error</Button>`}
          title="Colors"
        />
      </Section>

      <Section title="Sizes">
        <PreviewBox>
          <div style={{ display: "flex", gap: spacing.primitive[3], alignItems: "center" }}>
            <ButtonDemo buttonType="filled" color="primary" size="small">Small</ButtonDemo>
            <ButtonDemo buttonType="filled" color="primary" size="medium">Medium</ButtonDemo>
            <ButtonDemo buttonType="filled" color="primary" size="large">Large</ButtonDemo>
            <ButtonDemo buttonType="filled" color="primary" size="xLarge">X-Large</ButtonDemo>
          </div>
        </PreviewBox>
        <CodeBlock
          code={`<Button buttonType="filled" color="primary" size="small">Small</Button>
<Button buttonType="filled" color="primary" size="medium">Medium</Button>
<Button buttonType="filled" color="primary" size="large">Large</Button>
<Button buttonType="filled" color="primary" size="xLarge">X-Large</Button>`}
          title="Sizes"
        />
      </Section>

      <Section title="With Grid Content">
        <PreviewBox>
          <div style={{ display: "flex", gap: spacing.primitive[4] }}>
            <ButtonDemo buttonType="filled" color="primary" leadingIcon>Leading</ButtonDemo>
            <ButtonDemo buttonType="filled" color="primary" trailingIcon>Trailing</ButtonDemo>
            <ButtonDemo buttonType="filled" color="primary" iconOnly="plus" />
          </div>
        </PreviewBox>
        <CodeBlock code={`// Leading icon
<Button
  buttonType="filled"
  color="primary"
  leftContent={<Icon name="plus" />}
>
  Leading
</Button>

// Trailing icon
<Button
  buttonType="filled"
  color="primary"
  rightContent={<Icon name="chevron-right" />}
>
  Trailing
</Button>

// Icon only - aria-label 필수!
<Button
  buttonType="filled"
  color="primary"
  leftContent={<Icon name="plus" />}
  aria-label="추가하기"
/>`} />
      </Section>

      <Section title="Layout">
        <PreviewBox>
          <div style={{ width: "100%", maxWidth: 280, display: "flex", flexDirection: "column", gap: spacing.primitive[3] }}>
            <ButtonDemo buttonType="filled" color="primary" layout="fillWidth">Fill Width</ButtonDemo>
            <ButtonDemo buttonType="filled" color="primary">Hug (default)</ButtonDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<Button buttonType="filled" color="primary" layout="fillWidth">
  Fill Width
</Button>

<Button buttonType="filled" color="primary" layout="hug">
  Hug (default)
</Button>`} />
      </Section>

      <Section title="States">
        <PreviewBox>
          <div style={{ display: "flex", gap: spacing.primitive[4] }}>
            <ButtonDemo buttonType="filled" color="primary">Default</ButtonDemo>
            <ButtonDemo buttonType="filled" color="primary" disabled>Disabled</ButtonDemo>
            <ButtonDemo buttonType="filled" color="primary" isLoading>Loading</ButtonDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<Button buttonType="filled" color="primary">
  Default
</Button>

<Button buttonType="filled" color="primary" disabled>
  Disabled
</Button>

<Button buttonType="filled" color="primary" isLoading>
  Loading
</Button>`} />
      </Section>

      <Section title="API Reference">
        <Subsection title="Common Props">
          <PropsTable
            props={[
              { name: "children", type: "ReactNode", required: false, description: "버튼 텍스트" },
              { name: "buttonType", type: '"filled" | "weak"', required: false, defaultVal: '"filled"', description: "버튼 스타일" },
              { name: "color", type: '"primary" | "neutral" | "success" | "error" | "kakao" | "google"', required: false, defaultVal: '"primary"', description: "색상 테마" },
              { name: "size", type: '"small" | "medium" | "large" | "xLarge"', required: false, defaultVal: '"medium"', description: "버튼 크기" },
              { name: "layout", type: '"hug" | "fillWidth"', required: false, defaultVal: '"hug"', description: "레이아웃 모드" },
              { name: "disabled", type: "boolean", required: false, defaultVal: "false", description: "비활성화 상태" },
              { name: "isLoading", type: "boolean", required: false, defaultVal: "false", description: "로딩 상태" },
              { name: "leftContent", type: "ReactNode", required: false, description: "좌측 콘텐츠 (Grid 모드)" },
              { name: "rightContent", type: "ReactNode", required: false, description: "우측 콘텐츠 (Grid 모드)" },
            ]}
          />
        </Subsection>
        <Subsection title="Web-specific Props">
          <PropsTable
            props={[
              { name: "onClick", type: "() => void", required: false, description: "클릭 핸들러" },
              { name: "type", type: '"button" | "submit" | "reset"', required: false, defaultVal: '"button"', description: "HTML button type" },
              { name: "aria-label", type: "string", required: false, description: "스크린 리더용 레이블 (icon-only 필수)" },
              { name: "aria-busy", type: "boolean", required: false, description: "로딩 상태 접근성 전달" },
              { name: "aria-disabled", type: "boolean", required: false, description: "비활성화 상태 접근성 전달" },
            ]}
          />
        </Subsection>
      </Section>
    </>
  );
}


// ============================================
// Usage Guidelines Components
// ============================================
function UsageCard({ situation, desc, buttonType, color, examples }: {
  situation: string;
  desc: string;
  buttonType: "filled" | "weak";
  color: ButtonColor;
  examples: string[];
}) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr auto",
      gap: spacing.primitive[4],
      padding: spacing.primitive[4],
      backgroundColor: "var(--surface-base-default)",
      borderRadius: radius.primitive.sm,
      border: "1px solid var(--divider)",
      alignItems: "center",
    }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: spacing.primitive[2], marginBottom: spacing.primitive[1] }}>
          <span style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>{situation}</span>
          <span style={{
            fontSize: typography.fontSize['2xs'],
            padding: "2px 6px",
            backgroundColor: buttonType === "filled" ? "var(--surface-brand-secondary)" : "var(--surface-base-alternative)",
            color: buttonType === "filled" ? "var(--content-brand-default)" : "var(--content-base-secondary)",
            borderRadius: radius.primitive.xs,
            fontWeight: typography.fontWeight.medium,
          }}>
            {buttonType} + {color}
          </span>
        </div>
        <p style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", margin: 0, marginBottom: spacing.primitive[2] }}>{desc}</p>
        <p style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", margin: 0 }}>
          예시: {examples.join(", ")}
        </p>
      </div>
      <ButtonDemo buttonType={buttonType} color={color} size="small">
        {examples[0]}
      </ButtonDemo>
    </div>
  );
}

function PlacementExample({ title, left, right, note }: {
  title: string;
  left: { type: "filled" | "weak"; color: ButtonColor; label: string };
  right: { type: "filled" | "weak"; color: ButtonColor; label: string };
  note: string;
}) {
  return (
    <div style={{
      padding: spacing.primitive[5],
      backgroundColor: "var(--surface-base-default)",
      borderRadius: radius.primitive.md,
      border: "1px solid var(--divider)",
    }}>
      <div style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)", marginBottom: spacing.primitive[4] }}>{title}</div>
      <div style={{
        display: "flex",
        justifyContent: "flex-end",
        gap: spacing.primitive[2],
        padding: spacing.primitive[5],
        backgroundColor: "var(--surface-base-alternative)",
        borderRadius: radius.primitive.md,
      }}>
        <ButtonDemo buttonType={left.type} color={left.color} size="small">{left.label}</ButtonDemo>
        <ButtonDemo buttonType={right.type} color={right.color} size="small">{right.label}</ButtonDemo>
      </div>
      <p style={{ fontSize: typography.fontSize.compact, color: "var(--text-tertiary)", margin: 0, marginTop: spacing.primitive[3] }}>{note}</p>
    </div>
  );
}

// ============================================
// Anatomy Diagram
// ============================================
function AnatomyDiagram() {
  return (
    <div style={{
      backgroundColor: "var(--surface-base-container)",
      borderRadius: radius.primitive.lg,
      padding: "60px 40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <svg width="400" height="120" viewBox="0 0 400 120">
        {/* Lines */}
        {/* Line from circle 1 to leading icon */}
        <line x1="60" y1="50" x2="120" y2="50" stroke="var(--content-base-default)" strokeWidth="1.5" />
        <circle cx="120" cy="50" r="3" fill="var(--content-base-default)" />

        {/* Line from circle 2 to label (vertical) */}
        <line x1="200" y1="50" x2="200" y2="85" stroke="var(--content-base-default)" strokeWidth="1.5" />
        <circle cx="200" cy="50" r="3" fill="var(--content-base-default)" />

        {/* Line from circle 3 to trailing icon */}
        <line x1="280" y1="50" x2="340" y2="50" stroke="var(--content-base-default)" strokeWidth="1.5" />
        <circle cx="280" cy="50" r="3" fill="var(--content-base-default)" />

        {/* Numbered circles */}
        {/* Circle 1 */}
        <circle cx="45" cy="50" r="16" fill="var(--content-base-default)" />
        <text x="45" y="55" textAnchor="middle" fill="var(--content-base-onColor)" fontSize={typography.fontSize.compact} fontWeight={typography.fontWeight.semibold}>1</text>

        {/* Circle 2 */}
        <circle cx="200" cy="100" r="16" fill="var(--content-base-default)" />
        <text x="200" y="105" textAnchor="middle" fill="var(--content-base-onColor)" fontSize={typography.fontSize.compact} fontWeight={typography.fontWeight.semibold}>2</text>

        {/* Circle 3 */}
        <circle cx="355" cy="50" r="16" fill="var(--content-base-default)" />
        <text x="355" y="55" textAnchor="middle" fill="var(--content-base-onColor)" fontSize={typography.fontSize.compact} fontWeight={typography.fontWeight.semibold}>3</text>

        {/* Button content */}
        {/* Leading icon placeholder (dashed box) */}
        <rect x="125" y="38" width="24" height="24" rx="4" fill="none" stroke="var(--border-brand-default)" strokeWidth="1.5" strokeDasharray="3 2" />

        {/* Text button label */}
        <text x="200" y="55" textAnchor="middle" fill="var(--content-brand-default)" fontSize={typography.fontSize.md} fontWeight={typography.fontWeight.semibold}>Text button</text>

        {/* Trailing icon placeholder (dashed box) */}
        <rect x="251" y="38" width="24" height="24" rx="4" fill="none" stroke="var(--border-brand-default)" strokeWidth="1.5" strokeDasharray="3 2" />
      </svg>
    </div>
  );
}

// ============================================
// State Demo
// ============================================
function StateDemo({ label, state }: { label: string; state: "default" | "hover" | "pressed" | "focus" | "disabled" }) {
  const getStyles = () => {
    const base = {
      padding: `${spacing.primitive[2]}px ${spacing.primitive[5]}px`,
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.semibold,
      borderRadius: radius.primitive.md,
      border: "none",
      cursor: state === "disabled" ? "not-allowed" : "pointer",
      transition: "all 150ms ease",
      outline: "none",
    };

    switch (state) {
      case "default":
        return { ...base, backgroundColor: "var(--surface-brand-default)", color: "var(--content-base-onColor)" };
      case "hover":
        return { ...base, backgroundColor: "var(--surface-brand-defaultPressed)", color: "var(--content-base-onColor)" };
      case "pressed":
        return { ...base, backgroundColor: "var(--surface-brand-defaultPressed)", color: "var(--content-base-onColor)", transform: "scale(0.98)" };
      case "focus":
        return { ...base, backgroundColor: "var(--surface-brand-default)", color: "var(--content-base-onColor)", boxShadow: "0 0 0 3px var(--surface-brand-secondary)" };
      case "disabled":
        return { ...base, backgroundColor: "var(--surface-disabled-default)", color: "var(--content-disabled-default)" };
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <button style={getStyles()}>{label}</button>
      <p style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", marginTop: spacing.primitive[2] }}>{label}</p>
    </div>
  );
}

// ============================================
// Demo Components
// ============================================
type ButtonType = "filled" | "weak";
type ButtonColor = "primary" | "neutral" | "success" | "error" | "kakao" | "google";
type ButtonSize = "small" | "medium" | "large" | "xLarge";
type ButtonLayout = "hug" | "fillWidth" | "fill";

interface ButtonDemoProps {
  buttonType: ButtonType;
  color: ButtonColor;
  children?: React.ReactNode;
  size?: ButtonSize;
  layout?: ButtonLayout;
  disabled?: boolean;
  isLoading?: boolean;
  leadingIcon?: boolean | string;
  trailingIcon?: boolean | string;
  iconOnly?: string;
  forcePressed?: boolean;
}

function ButtonDemo({
  buttonType,
  color,
  children,
  size = "medium",
  layout = "hug",
  disabled = false,
  isLoading = false,
  leadingIcon = false,
  trailingIcon = false,
  iconOnly,
  forcePressed = false,
}: ButtonDemoProps) {
  const getIcon = (type: string) => {
    const paths: Record<string, React.ReactNode> = {
      plus: <path d="M12 5v14M5 12h14" />,
      download: <><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></>,
      edit: <><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></>,
      close: <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>,
      external: <><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></>,
    };
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {paths[type] || <path d="M9 18l6-6-6-6" />}
      </svg>
    );
  };

  const leftContent = leadingIcon
    ? getIcon(typeof leadingIcon === "string" ? leadingIcon : "plus")
    : undefined;

  const rightContent = trailingIcon
    ? getIcon(typeof trailingIcon === "string" ? trailingIcon : "chevron")
    : undefined;

  return (
    <Button
      buttonType={buttonType}
      color={color}
      size={size}
      layout={layout === "fill" ? "fillWidth" : layout}
      disabled={disabled}
      isLoading={isLoading}
      leftContent={leftContent}
      rightContent={rightContent}
    >
      {iconOnly ? getIcon(iconOnly) : children}
    </Button>
  );
}

function LoadingButtonDemo() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <Button
      buttonType="filled"
      color="primary"
      isLoading={isLoading}
      onClick={handleClick}
    >
      Click to Load
    </Button>
  );
}

function KakaoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: spacing.primitive[1] }}>
      <path d="M12 3C6.48 3 2 6.58 2 11c0 2.84 1.87 5.33 4.67 6.75l-.95 3.52c-.08.31.27.56.54.38l4.2-2.79c.5.05 1.01.14 1.54.14 5.52 0 10-3.58 10-8s-4.48-8-10-8z"/>
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" style={{ marginRight: spacing.primitive[1] }}>
      <path fill={BRAND_EXTERNAL_COLORS.google.blue} d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill={BRAND_EXTERNAL_COLORS.google.green} d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill={BRAND_EXTERNAL_COLORS.google.yellow} d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill={BRAND_EXTERNAL_COLORS.google.red} d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

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
