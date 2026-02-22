"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform, highlightCode } from "@/components/PlatformTabs";
import { ActionArea, Button, TextButton, IconButton, Checkbox } from '@baerae-zkap/design-system';
import { typography, spacing, radius } from '@baerae-zkap/design-system';
import { Section, Subsection, InlineCode } from "@/components/docs/Section";
import { PropsTable } from "@/components/docs/PropsTable";
import { PrincipleCard, DoCard, DontCard } from "@/components/docs/Cards";
import { RadioGroup, CopyButton } from "@/components/docs/Playground";
import { NumberBadge } from "@/components/docs/Labels";

export default function ActionAreaPage() {
  return (
    <div style={{ maxWidth: 840 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Actions" },
          { label: "Action Area" },
        ]}
      />

      {/* Header */}
      <h1 style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold, marginBottom: spacing.primitive[2], color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
        Action Area
      </h1>
      <p style={{ fontSize: typography.fontSize.md, color: "var(--text-secondary)", marginBottom: spacing.primitive[8], lineHeight: 1.7 }}>
        화면 하단 또는 모달·바텀시트 하단에 고정되는 액션 버튼 컨테이너입니다.
        Button과 TextButton을 조합하여 주요(Main)·대안(Alternative)·보조(Sub) 액션의 시각적 위계를 자동으로 관리합니다.
      </p>

      {/* Interactive Playground */}
      <ActionAreaPlayground />

      {/* Platform Tabs */}
      <PlatformTabs>
        {(platform) => <PlatformContent platform={platform} />}
      </PlatformTabs>
    </div>
  );
}

// ============================================
// Interactive Playground
// ============================================
function ActionAreaPlayground() {
  const [variant, setVariant] = useState<ActionAreaVariant>("neutral");
  const [combination, setCombination] = useState<"alternative" | "sub" | "main">("alternative");
  const [subButtonOption, setSubButtonOption] = useState<"label" | "icon">("label");

  const generateCode = () => {
    const eventHandler = "onClick={() => {}}";

    const isCompact = variant === "compact";
    const isVertical = variant === "strong";
    const size = isCompact ? "medium" : "xLarge";

    // Main button
    const mainButton = `  <Button
    buttonType="filled"
    color="primary"
    size="${size}"
    ${eventHandler}
  >
    Main action
  </Button>`;

    // Alternative button
    const altButton = `  <Button
    buttonType="weak"
    color="primary"
    size="${size}"
    ${eventHandler}
  >
    Alternative
  </Button>`;

    // Sub button - Label or Icon
    const iconSize = isCompact ? "medium" : "large";
    const svgSize = isCompact ? 18 : 24;
    const subButton = subButtonOption === "icon"
      ? `  <IconButton
    variant="weak"
    color="neutral"
    size="${iconSize}"
    ${eventHandler}
  >
    <RefreshIcon size={${svgSize}} />
  </IconButton>`
      : `  <Button
    buttonType="filled"
    color="neutral"
    size="${size}"
    ${eventHandler}
  >
    Sub action
  </Button>`;

    // Build children based on combination and variant
    let children = "";
    if (combination === "alternative") {
      children = isVertical
        ? `${mainButton}\n${altButton}`
        : `${altButton}\n${mainButton}`;
    } else if (combination === "sub") {
      // Strong uses TextButton for sub, others use weak Button
      const verticalSubButton = subButtonOption === "icon"
        ? subButton
        : `  <TextButton
    color="neutral"
    ${eventHandler}
  >
    Sub action
  </TextButton>`;
      children = isVertical
        ? `${mainButton}\n${verticalSubButton}`
        : `${subButton}\n${mainButton}`;
    } else {
      children = mainButton;
    }

    return `<ActionArea variant="${variant}">
${children}
</ActionArea>`;
  };

  const isVertical = variant === "strong";
  const buttonSize = variant === "compact" ? "medium" as const : "xLarge" as const;

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
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", minHeight: 420 }}>
          {/* Preview Area */}
          <div
            style={{
              padding: spacing.primitive[10],
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "var(--surface-base-default)",
            }}
          >
            <div style={{ width: "100%", maxWidth: 380 }}>
              <ActionAreaDemo variant={variant}>
                <>
                  {/* Sub action (left/top position for neutral/compact) */}
                  {combination === "sub" && !isVertical && (
                      subButtonOption === "icon" ? (
                        <IconButtonDemo size={buttonSize} />
                      ) : (
                        <ActionAreaButtonDemo variant="sub" size={buttonSize} compact={variant === "compact"}>
                          Sub action
                        </ActionAreaButtonDemo>
                      )
                    )}
                    {/* Alternative (left position for neutral/compact) */}
                    {combination === "alternative" && !isVertical && (
                      <ActionAreaButtonDemo variant="alternative" size={buttonSize} compact={variant === "compact"}>
                        Alternative
                      </ActionAreaButtonDemo>
                    )}
                    {/* Main button */}
                    <ActionAreaButtonDemo variant="main" size={buttonSize} compact={variant === "compact"}>
                      Main action
                    </ActionAreaButtonDemo>
                    {/* Alternative (bottom position for strong) */}
                    {combination === "alternative" && isVertical && (
                      <ActionAreaButtonDemo variant="alternative" size={buttonSize}>
                        Alternative
                      </ActionAreaButtonDemo>
                    )}
                    {/* Sub action (bottom position for strong) — TextButton style */}
                    {combination === "sub" && isVertical && (
                      subButtonOption === "icon" ? (
                        <IconButtonDemo size={buttonSize} />
                      ) : (
                        <TextButton color="neutral" style={{ alignSelf: 'center' }}>
                          Sub action
                        </TextButton>
                      )
                    )}
                  </>
              </ActionAreaDemo>
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
              {/* Variants */}
              <RadioGroup
                label="Variants"
                options={[
                  { value: "strong", label: "Strong" },
                  { value: "neutral", label: "Neutral" },
                  { value: "compact", label: "Compact" },
                ]}
                value={variant}
                onChange={(v) => setVariant(v as ActionAreaVariant)}
              />

              {/* Combination */}
              <RadioGroup
                label="Combination"
                options={[
                  { value: "alternative", label: "With alternative action" },
                  { value: "sub", label: "With sub action" },
                  { value: "main", label: "Main only" },
                ]}
                value={combination}
                onChange={(v) => setCombination(v as "alternative" | "sub" | "main")}
              />

              {/* Sub button option - disabled when not "With sub action" */}
              <RadioGroup
                label="Sub button option"
                options={[
                  { value: "label", label: "Label" },
                  { value: "icon", label: "With icon" },
                ]}
                value={subButtonOption}
                onChange={(v) => setSubButtonOption(v as "label" | "icon")}
                disabled={combination !== "sub"}
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
            lineHeight: 1.6,
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
      {/* Overview */}
      <Section title="Overview">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7 }}>
          <InlineCode>ActionArea</InlineCode> 컴포넌트는 화면 하단이나 모달·바텀시트 하단에 고정되는 액션 버튼 컨테이너예요.
          <InlineCode>Button</InlineCode>과 <InlineCode>TextButton</InlineCode>을 조합하여 주요·보조·대체 액션의 시각적 위계를 자동으로 관리해요.
        </p>
      </Section>

      {/* Anatomy */}
      <Section title="Anatomy">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          ActionArea는 아래와 같은 구조로 조합하여 사용합니다.
        </p>
        <AnatomyDiagram />
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: spacing.primitive[4],
          marginTop: spacing.primitive[5],
          fontSize: typography.fontSize.sm,
          fontWeight: typography.fontWeight.medium,
          color: "var(--text-primary)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: spacing.primitive[2] }}>
            <NumberBadge>1</NumberBadge>
            <span>Caption (optional)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: spacing.primitive[2] }}>
            <NumberBadge>2</NumberBadge>
            <span>Main Button</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: spacing.primitive[2] }}>
            <NumberBadge>3</NumberBadge>
            <span>Alternative / Sub</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: spacing.primitive[2] }}>
            <NumberBadge>4</NumberBadge>
            <span>Container</span>
          </div>
        </div>
      </Section>

      {/* Variants */}
      <Section title="Variants">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          <InlineCode>ActionArea</InlineCode>는 4가지 variant를 제공하며, 각각 다른 레이아웃과 용도를 가집니다.
        </p>

        {/* Strong */}
        <Subsection title="Strong (Default)">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
            <strong style={{ color: "var(--text-primary)" }}>세로 배치, 큰 버튼</strong>. 모달이나 시트의 주요 CTA 영역에서 사용합니다.
            가장 강조되는 레이아웃으로, 사용자의 주요 결정을 유도할 때 적합합니다.
          </p>
          <PreviewBox>
            <div style={{ width: "100%", maxWidth: 320, display: "flex", flexDirection: "column", gap: spacing.primitive[4] }}>
              <ActionAreaDemo variant="strong">
                <ActionAreaButtonDemo variant="main" size="xLarge">Main</ActionAreaButtonDemo>
                <ActionAreaButtonDemo variant="alternative" size="xLarge">Alternative</ActionAreaButtonDemo>
              </ActionAreaDemo>
              <ActionAreaDemo variant="strong">
                <ActionAreaButtonDemo variant="main" size="xLarge">Main</ActionAreaButtonDemo>
                <ActionAreaButtonDemo variant="sub" size="xLarge">Sub</ActionAreaButtonDemo>
              </ActionAreaDemo>
            </div>
          </PreviewBox>
        </Subsection>

        {/* Neutral */}
        <Subsection title="Neutral">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
            <strong style={{ color: "var(--text-primary)" }}>가로 배치, 동일 너비</strong>. 확인/취소 다이얼로그나 두 가지 선택이 균등한 비중을 가질 때 사용합니다.
          </p>
          <PreviewBox>
            <div style={{ width: "100%", maxWidth: 320, display: "flex", flexDirection: "column", gap: spacing.primitive[4] }}>
              <ActionAreaDemo variant="neutral">
                <ActionAreaButtonDemo variant="alternative" size="xLarge">Alternative</ActionAreaButtonDemo>
                <ActionAreaButtonDemo variant="main" size="xLarge">Main</ActionAreaButtonDemo>
              </ActionAreaDemo>
              <ActionAreaDemo variant="neutral">
                <ActionAreaButtonDemo variant="sub" size="xLarge">Sub</ActionAreaButtonDemo>
                <ActionAreaButtonDemo variant="main" size="xLarge">Main</ActionAreaButtonDemo>
              </ActionAreaDemo>
            </div>
          </PreviewBox>
        </Subsection>

        {/* Compact */}
        <Subsection title="Compact">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
            <strong style={{ color: "var(--text-primary)" }}>가로 배치, 우측 정렬, 작은 버튼</strong>. 인라인 폼이나 카드 내부의 액션 영역에서 사용합니다.
            컨텐츠와 함께 배치되어 공간을 절약합니다.
          </p>
          <PreviewBox>
            <div style={{ width: "100%", maxWidth: 320, display: "flex", flexDirection: "column", gap: spacing.primitive[4] }}>
              <ActionAreaDemo variant="compact">
                <ActionAreaButtonDemo variant="alternative" size="medium">Alternative</ActionAreaButtonDemo>
                <ActionAreaButtonDemo variant="main" size="medium">Main</ActionAreaButtonDemo>
              </ActionAreaDemo>
              <ActionAreaDemo variant="compact">
                <ActionAreaButtonDemo variant="sub" size="medium">Sub</ActionAreaButtonDemo>
                <ActionAreaButtonDemo variant="main" size="medium">Main</ActionAreaButtonDemo>
              </ActionAreaDemo>
            </div>
          </PreviewBox>
        </Subsection>

        {/* Cancel (Composition) */}
        <Subsection title="Cancel (Composition)">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
            <strong style={{ color: "var(--text-primary)" }}>단독 취소 버튼</strong>. 바텀시트나 모달에서 명시적 취소 액션만 필요할 때 사용합니다.
            <InlineCode>variant=&quot;strong&quot;</InlineCode>에 weak 버튼 하나를 배치하는 조합 패턴입니다.
          </p>
          <PreviewBox>
            <div style={{ width: "100%", maxWidth: 320 }}>
              <ActionAreaDemo variant="strong">
                <Button buttonType="weak" color="neutral" size="xLarge" layout="fillWidth">
                  Cancel
                </Button>
              </ActionAreaDemo>
            </div>
          </PreviewBox>
        </Subsection>

      </Section>

      {/* Button Component Mapping */}
      <Section title="Button Component Mapping">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          <InlineCode>ActionArea</InlineCode>는 <InlineCode>Button</InlineCode>과 <InlineCode>TextButton</InlineCode> 컴포넌트를 children으로 받습니다.
          각 역할에 맞게 아래와 같이 Button props를 설정합니다.
        </p>

        <div style={{ overflow: "auto", marginBottom: spacing.primitive[8] }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>역할</th>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Button props</th>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Preview</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}>
                  <InlineCode>주요 (Main)</InlineCode>
                </td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", fontFamily: "monospace", fontSize: typography.fontSize.xs, color: "var(--text-secondary)" }}>
                  buttonType=&quot;filled&quot; color=&quot;primary&quot;
                </td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}>
                  <ButtonDemo buttonType="filled" color="primary" size="small">Main</ButtonDemo>
                </td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}>
                  <InlineCode>대안 (Alternative)</InlineCode>
                </td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", fontFamily: "monospace", fontSize: typography.fontSize.xs, color: "var(--text-secondary)" }}>
                  buttonType=&quot;filled&quot; color=&quot;neutral&quot;
                </td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}>
                  <ButtonDemo buttonType="filled" color="neutral" size="small">Alternative</ButtonDemo>
                </td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}>
                  <InlineCode>보조 (Sub)</InlineCode>
                </td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontFamily: "monospace", fontSize: typography.fontSize.xs, color: "var(--text-secondary)" }}>
                  TextButton color=&quot;primary&quot;
                </td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}>
                  <TextButtonDemo size="small">Sub</TextButtonDemo>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <CodeBlock code={`// ActionArea에서 Button/TextButton 사용:

import { ActionArea, Button, TextButton } from '@baerae-zkap/design-system';

// 주요 액션 (Main)
<Button buttonType="filled" color="primary">확인</Button>

// 대안 액션 (Alternative) - filled gray
<Button buttonType="filled" color="neutral">취소</Button>

// 보조 링크 (Sub)
<TextButton color="neutral">건너뛰기</TextButton>

// ActionArea로 감싸면 자동 레이아웃
<ActionArea variant="neutral">
  <Button buttonType="filled" color="neutral" onClick={() => {}}>취소</Button>
  <Button buttonType="filled" color="primary" onClick={() => {}}>확인</Button>
</ActionArea>`} />
      </Section>

      {/* Caption */}
      <Section title="Caption">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          <InlineCode>caption</InlineCode> prop을 통해 버튼 상단에 설명 텍스트를 표시할 수 있습니다.
          사용자에게 액션의 결과를 명확히 전달하거나 추가 안내가 필요할 때 사용합니다.
        </p>
        <PreviewBox>
          <div style={{ width: "100%", maxWidth: 320 }}>
            <ActionAreaDemo variant="strong" caption="변경 사항을 저장하시겠습니까?">
              <ActionAreaButtonDemo variant="main" size="xLarge">저장</ActionAreaButtonDemo>
              <ActionAreaButtonDemo variant="alternative" size="xLarge">취소</ActionAreaButtonDemo>
            </ActionAreaDemo>
          </div>
        </PreviewBox>
      </Section>

      {/* States */}
      <Section title="States">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          ActionArea 내의 버튼들은 다음 상태를 지원합니다.
        </p>

        <Subsection title="Enabled (Default)">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
            기본 상태입니다. 사용자가 상호작용할 수 있습니다.
          </p>
          <PreviewBox>
            <div style={{ width: "100%", maxWidth: 320 }}>
              <ActionAreaDemo variant="strong">
                <ActionAreaButtonDemo variant="main" size="xLarge">확인</ActionAreaButtonDemo>
                <ActionAreaButtonDemo variant="alternative" size="xLarge">취소</ActionAreaButtonDemo>
              </ActionAreaDemo>
            </div>
          </PreviewBox>
        </Subsection>

        <Subsection title="Pressed">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
            버튼을 누르고 있을 때의 상태입니다. 시각적 피드백으로 scale과 색상 변화가 적용됩니다.
          </p>
          <PreviewBox>
            <div style={{ width: "100%", maxWidth: 320 }}>
              <ActionAreaDemo variant="strong">
                <StateButtonDemo state="pressed" variant="main">확인 (Pressed)</StateButtonDemo>
                <StateButtonDemo state="pressed" variant="alternative">취소 (Pressed)</StateButtonDemo>
              </ActionAreaDemo>
            </div>
          </PreviewBox>
        </Subsection>

        <Subsection title="Disabled">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
            비활성화 상태입니다. 사용자가 상호작용할 수 없으며, 시각적으로 흐리게 표시됩니다.
            필수 조건이 충족되지 않았을 때 사용합니다.
          </p>
          <PreviewBox>
            <div style={{ width: "100%", maxWidth: 320 }}>
              <ActionAreaDemo variant="strong">
                <StateButtonDemo state="disabled" variant="main">확인 (Disabled)</StateButtonDemo>
                <StateButtonDemo state="disabled" variant="alternative">취소 (Disabled)</StateButtonDemo>
              </ActionAreaDemo>
            </div>
          </PreviewBox>
        </Subsection>

        <Subsection title="Loading">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
            로딩 상태입니다. 비동기 작업이 진행 중일 때 표시되며, 추가 상호작용이 방지됩니다.
          </p>
          <PreviewBox>
            <div style={{ width: "100%", maxWidth: 320 }}>
              <ActionAreaDemo variant="strong">
                <StateButtonDemo state="loading" variant="main">처리 중...</StateButtonDemo>
                <StateButtonDemo state="disabled" variant="alternative">취소</StateButtonDemo>
              </ActionAreaDemo>
            </div>
          </PreviewBox>
        </Subsection>

        <Subsection title="Interaction States">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: spacing.primitive[4] }}>
            ActionArea는 컨테이너로서 내부 버튼의 상태에 따라 전체 영역의 시각적 피드백이 달라집니다. 각 내부 버튼은 독립적인 인터랙션 상태를 가집니다.
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
            <InteractionStateCard label="Focus" sublabel="키보드 포커스" color="var(--content-base-onColor)" bgColor="var(--surface-brand-default)" showFocusRing />
            <InteractionStateCard label="Pressed" sublabel="누름" color="var(--content-base-onColor)" bgColor="var(--surface-brand-defaultPressed)" />
            <InteractionStateCard label="Disabled" sublabel="비활성화" color="var(--content-disabled-default)" bgColor="var(--surface-disabled-default)" opacity={0.5} />
          </div>
        </Subsection>
      </Section>

      {/* Usage Guidelines */}
      <Section title="Usage Guidelines">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          일관된 UX를 위해 상황에 맞는 variant와 버튼 조합을 선택하세요.
        </p>

        <Subsection title="Recommended Combinations">
          <div style={{ overflow: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
              <thead>
                <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>상황</th>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Variant</th>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>버튼 조합</th>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>예시</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", fontWeight: typography.fontWeight.medium }}>중요한 결정</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><code style={{ backgroundColor: "var(--surface-base-alternative)", padding: "2px 6px", borderRadius: radius.primitive.xs, fontSize: typography.fontSize.compact }}>strong</code></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>Main + Alternative</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-tertiary)", fontSize: typography.fontSize.compact }}>결제, 저장</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", fontWeight: typography.fontWeight.medium }}>균등한 선택</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><code style={{ backgroundColor: "var(--surface-base-alternative)", padding: "2px 6px", borderRadius: radius.primitive.xs, fontSize: typography.fontSize.compact }}>neutral</code></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>Main + Alternative</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-tertiary)", fontSize: typography.fontSize.compact }}>확인/취소</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontWeight: typography.fontWeight.medium }}>인라인 액션</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><code style={{ backgroundColor: "var(--surface-base-alternative)", padding: "2px 6px", borderRadius: radius.primitive.xs, fontSize: typography.fontSize.compact }}>compact</code></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>Main + Alternative</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-tertiary)", fontSize: typography.fontSize.compact }}>수정/삭제</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Design Principles">
          <div style={{ display: "grid", gap: spacing.primitive[4] }}>
            <PrincipleCard
              number={1}
              title="버튼 순서 유지"
              desc="Strong variant에서는 Main이 위에, Neutral/Compact에서는 Main이 오른쪽에 위치합니다. 이 순서를 임의로 변경하지 마세요."
            />
            <PrincipleCard
              number={2}
              title="적절한 variant 선택"
              desc="모달이나 시트의 주요 CTA는 Strong, 인라인 액션은 Compact를 사용하세요. 화면 맥락에 맞는 variant를 선택합니다."
            />
            <PrincipleCard
              number={3}
              title="버튼 조합 일관성"
              desc="같은 유형의 다이얼로그에서는 동일한 버튼 조합을 사용하세요. Alternative와 Sub을 혼용하지 않습니다."
            />
          </div>
        </Subsection>

        <Subsection title="Best Practices">
          <div style={{ display: "grid", gap: spacing.primitive[5] }}>
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <DoCard>
                    <div style={{ width: "100%", maxWidth: 260 }}>
                      <ActionAreaDemo variant="strong">
                        <ActionAreaButtonDemo variant="main" size="xLarge">확인</ActionAreaButtonDemo>
                        <ActionAreaButtonDemo variant="alternative" size="xLarge">취소</ActionAreaButtonDemo>
                      </ActionAreaDemo>
                    </div>
                  </DoCard>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <DontCard>
                    <div style={{ width: "100%", maxWidth: 260 }}>
                      <ActionAreaDemo variant="strong">
                        <ActionAreaButtonDemo variant="alternative" size="xLarge">취소</ActionAreaButtonDemo>
                        <ActionAreaButtonDemo variant="main" size="xLarge">확인</ActionAreaButtonDemo>
                      </ActionAreaDemo>
                    </div>
                  </DontCard>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> 상황에 맞는 variant를 선택하고 기본 버튼 순서를 유지합니다
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0, fontStyle: "italic" }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Don&apos;t</span> Strong variant에서 Main 버튼을 아래에 배치하지 않습니다
                </p>
              </div>
            </div>

            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <DoCard>
                    <div style={{ width: "100%", maxWidth: 260 }}>
                      <ActionAreaDemo variant="neutral">
                        <ActionAreaButtonDemo variant="alternative" size="xLarge">취소</ActionAreaButtonDemo>
                        <ActionAreaButtonDemo variant="main" size="xLarge">확인</ActionAreaButtonDemo>
                      </ActionAreaDemo>
                    </div>
                  </DoCard>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <DontCard>
                    <div style={{ width: "100%", maxWidth: 260 }}>
                      <ActionAreaDemo variant="neutral">
                        <ActionAreaButtonDemo variant="main" size="xLarge">확인</ActionAreaButtonDemo>
                        <ActionAreaButtonDemo variant="main" size="xLarge">저장</ActionAreaButtonDemo>
                      </ActionAreaDemo>
                    </div>
                  </DontCard>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> 같은 유형의 다이얼로그에서는 동일한 variant와 조합을 사용합니다
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0, fontStyle: "italic" }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Don&apos;t</span> 동일한 역할의 버튼을 두 개 이상 배치하지 않습니다
                </p>
              </div>
            </div>
          </div>
        </Subsection>
      </Section>

      {/* Design Tokens */}
      <Section title="Design Tokens">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[5], lineHeight: 1.7 }}>
          ActionArea 컴포넌트에 적용된 Foundation 기반 디자인 토큰입니다.
        </p>

        <div style={{ overflow: "auto", borderRadius: radius.primitive.md, border: "1px solid var(--divider)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Property</th>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Foundation Token</th>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>Value</th>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, borderBottom: "1px solid var(--divider)" }}>비고</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Container Padding</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>spacing.component.bottomSheet.padding</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>20px</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-tertiary)", fontSize: typography.fontSize.compact }}>기본 패딩. 상위에서 style prop으로 오버라이드 가능</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Safe Area Bottom</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>spacing.semantic.screen.safeAreaBottom</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>env(safe-area-inset-bottom)</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-tertiary)", fontSize: typography.fontSize.compact }}>useSafeArea=true 시 paddingBottom에 추가</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Button Gap</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>spacing.component.modal.buttonGap</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>12px</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-tertiary)", fontSize: typography.fontSize.compact }}>모든 variant 공통. caption과 버튼 사이 간격에도 사용</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Caption Font</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>typography.fontSize.sm</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>14px</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-tertiary)", fontSize: typography.fontSize.compact }}>lineHeight 1.5</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Caption Color</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>content.base.neutral</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>var(--content-base-neutral)</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-tertiary)", fontSize: typography.fontSize.compact }}>테마 자동 전환</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Background</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>surface.base.default</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>var(--surface-base-default)</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-tertiary)", fontSize: typography.fontSize.compact }}>backgroundColor prop으로 오버라이드 가능</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-primary)" }}>Z-Index (sticky/fixed)</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>zIndex.sticky</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>100</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-tertiary)", fontSize: typography.fontSize.compact }}>position이 static이 아닐 때 적용</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* Accessibility */}
      <Section title="Accessibility">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          ActionArea는 버튼 그룹으로서 웹 접근성 표준을 준수합니다. 아래 속성은 컴포넌트에 자동 적용됩니다.
        </p>

        <Subsection title="Built-in (자동 적용)">
          <div style={{ overflow: "auto", marginBottom: spacing.primitive[6] }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
              <thead>
                <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>속성</th>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>동작</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>role=&quot;group&quot;</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>자동 적용 — 스크린 리더가 버튼 그룹으로 인식</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>aria-describedby</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>caption이 있으면 자동 연결 — 설명 텍스트를 보조 기술에 전달</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>aria-label</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>직접 전달 — 그룹의 용도를 설명 (예: &quot;결제 액션&quot;)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Keyboard Interaction">
          <div style={{ overflow: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
              <thead>
                <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>키</th>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>동작</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><kbd style={{ padding: "2px 6px", backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.xs, fontSize: typography.fontSize.xs }}>Tab</kbd></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>그룹 내 다음 버튼으로 포커스 이동</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><kbd style={{ padding: "2px 6px", backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.xs, fontSize: typography.fontSize.xs }}>Shift + Tab</kbd></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>그룹 내 이전 버튼으로 포커스 이동</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><kbd style={{ padding: "2px 6px", backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.xs, fontSize: typography.fontSize.xs }}>Enter</kbd></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>포커스된 버튼 클릭 실행</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><kbd style={{ padding: "2px 6px", backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.xs, fontSize: typography.fontSize.xs }}>Space</kbd></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>포커스된 버튼 클릭 실행</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="ActionArea 접근성 원칙">
          <div style={{ display: "grid", gap: spacing.primitive[4] }}>
            <PrincipleCard
              number={1}
              title="Focus Order"
              desc="버튼 간 포커스 순서는 시각적 순서와 일치합니다. Strong variant에서는 Main → Alternative 순으로, Neutral/Compact에서는 좌측 → 우측 순으로 포커스가 이동합니다."
            />
            <PrincipleCard
              number={2}
              title="Screen Reader Announcement"
              desc="role='group'과 aria-label로 버튼 그룹의 맥락을 전달합니다. caption이 있으면 aria-describedby로 자동 연결됩니다."
            />
            <PrincipleCard
              number={3}
              title="Focus Visible"
              desc="키보드 포커스 시 :focus-visible로 포커스 링이 표시됩니다. 마우스 클릭 시에는 포커스 링이 나타나지 않아 깔끔한 UX를 유지합니다."
            />
          </div>
        </Subsection>

        <Subsection title="Modal/BottomSheet 통합 시 주의사항">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
            다음은 ActionArea 자체가 아닌, ActionArea를 Modal이나 BottomSheet 내에서 사용할 때 상위 컴포넌트가 담당해야 할 접근성 요구사항입니다.
          </p>
          <div style={{ display: "grid", gap: spacing.primitive[4] }}>
            <PrincipleCard
              number={1}
              title="Focus Trap (Modal 담당)"
              desc="모달 내에서 Tab 키는 모달 콘텐츠 내에서 순환해야 합니다. 이는 ActionArea가 아닌 Modal 컴포넌트의 책임입니다."
            />
            <PrincipleCard
              number={2}
              title="Loading State (Button 담당)"
              desc="로딩 상태 관리(aria-busy, 상호작용 방지)는 개별 Button 컴포넌트의 isLoading prop으로 처리합니다."
            />
          </div>
        </Subsection>
      </Section>

      {/* Related Components */}
      <Section title="Related Components">
        <div style={{ overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>컴포넌트</th>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>용도</th>
                <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>차이점</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontWeight: typography.fontWeight.medium }}>Button</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>개별 액션 버튼</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>ActionArea는 Button을 내부적으로 사용하며, 여러 버튼의 레이아웃과 위계를 자동 관리</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontWeight: typography.fontWeight.medium }}>TextButton</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>텍스트 전용 보조 액션</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>ActionArea 내에서 보조(sub) 버튼으로 자동 배치됨</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontWeight: typography.fontWeight.medium }}>IconButton</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>아이콘 전용 보조 버튼</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>ActionArea의 sub 위치에 아이콘 버튼을 배치할 수 있음</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontWeight: typography.fontWeight.medium }}>Chip</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>필터/선택 토글</td>
                <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>Chip은 상태 토글용으로 ActionArea의 액션 버튼과는 역할이 다름</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}

const GITHUB_BASE = "https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system/src";
const ACTIONAREA_SOURCE = `${GITHUB_BASE}/components/ActionArea/ActionArea.tsx`;

// ============================================
// Web Tab Content
// ============================================
function WebContent() {
  return (
    <>
      <Section title="Source Code">
        <div style={{ padding: spacing.primitive[4], backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.md, marginBottom: spacing.primitive[6], display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)", margin: 0 }}>ActionArea Component</p>
            <p style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", margin: "4px 0 0 0" }}>실제 컴포넌트 소스 코드를 GitHub에서 확인하세요.</p>
          </div>
          <a
            href={ACTIONAREA_SOURCE}
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
        <CodeBlock code={`import { ActionArea, Button, TextButton } from '@baerae-zkap/design-system';`} />
      </Section>

      <Section title="Strong Variant">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          세로 배치, Main 버튼이 위에 위치합니다.
        </p>
        <PreviewBox>
          <div style={{ width: "100%", maxWidth: 320, display: "flex", flexDirection: "column", gap: spacing.primitive[4] }}>
            <ActionAreaDemo variant="strong">
              <ActionAreaButtonDemo variant="main" size="xLarge">Main</ActionAreaButtonDemo>
              <ActionAreaButtonDemo variant="alternative" size="xLarge">Alternative</ActionAreaButtonDemo>
            </ActionAreaDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<ActionArea variant="strong">
  <Button buttonType="filled" color="primary" size="xLarge" onClick={() => {}}>
    Main
  </Button>
  <Button buttonType="filled" color="neutral" size="xLarge" onClick={() => {}}>
    Alternative
  </Button>
</ActionArea>`} />
      </Section>

      <Section title="Neutral Variant">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          가로 배치, 동일 너비로 Main 버튼이 오른쪽에 위치합니다.
        </p>
        <PreviewBox>
          <div style={{ width: "100%", maxWidth: 320 }}>
            <ActionAreaDemo variant="neutral">
              <ActionAreaButtonDemo variant="alternative" size="xLarge">Alternative</ActionAreaButtonDemo>
              <ActionAreaButtonDemo variant="main" size="xLarge">Main</ActionAreaButtonDemo>
            </ActionAreaDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<ActionArea variant="neutral">
  <Button buttonType="filled" color="neutral" size="xLarge" onClick={() => {}}>
    Alternative
  </Button>
  <Button buttonType="filled" color="primary" size="xLarge" onClick={() => {}}>
    Main
  </Button>
</ActionArea>`} />
      </Section>

      <Section title="Compact Variant">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          가로 배치, 우측 정렬, 작은 버튼 사이즈입니다.
        </p>
        <PreviewBox>
          <div style={{ width: "100%", maxWidth: 320 }}>
            <ActionAreaDemo variant="compact">
              <ActionAreaButtonDemo variant="sub" size="medium">Sub</ActionAreaButtonDemo>
              <ActionAreaButtonDemo variant="main" size="medium">Main</ActionAreaButtonDemo>
            </ActionAreaDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<ActionArea variant="compact">
  <TextButton color="primary" onClick={() => {}}>
    Sub
  </TextButton>
  <Button buttonType="filled" color="primary" size="medium" onClick={() => {}}>
    Main
  </Button>
</ActionArea>`} />
      </Section>

      <Section title="With Caption">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          버튼 상단에 안내 텍스트를 추가합니다.
        </p>
        <PreviewBox>
          <div style={{ width: "100%", maxWidth: 320 }}>
            <ActionAreaDemo variant="strong" caption="변경 사항을 저장하시겠습니까?">
              <ActionAreaButtonDemo variant="main" size="xLarge">저장</ActionAreaButtonDemo>
              <ActionAreaButtonDemo variant="alternative" size="xLarge">취소</ActionAreaButtonDemo>
            </ActionAreaDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<ActionArea variant="strong" caption="변경 사항을 저장하시겠습니까?">
  <Button buttonType="filled" color="primary" size="xLarge" onClick={() => {}}>
    저장
  </Button>
  <Button buttonType="filled" color="neutral" size="xLarge" onClick={() => {}}>
    취소
  </Button>
</ActionArea>`} />
      </Section>

      <Section title="Main + Sub Combination">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          주요 액션과 보조 링크를 함께 제공합니다.
        </p>
        <PreviewBox>
          <div style={{ width: "100%", maxWidth: 320 }}>
            <ActionAreaDemo variant="strong">
              <ActionAreaButtonDemo variant="main" size="xLarge">로그인</ActionAreaButtonDemo>
              <ActionAreaButtonDemo variant="sub" size="xLarge">회원가입</ActionAreaButtonDemo>
            </ActionAreaDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<ActionArea variant="strong">
  <Button buttonType="filled" color="primary" size="xLarge" onClick={() => {}}>
    로그인
  </Button>
  <TextButton color="primary" onClick={() => {}}>
    회원가입
  </TextButton>
</ActionArea>`} />
      </Section>

      <Section title="With Top Accessory">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          버튼 상단에 약관 동의 체크박스, 안내 문구 등 추가 콘텐츠를 배치합니다.
          약관 동의, 가격 요약 등 버튼 위에 추가 정보가 필요한 경우 활용합니다.
        </p>
        <PreviewBox>
          <div style={{ width: "100%", maxWidth: 320 }}>
            <TopAccessoryDemo />
          </div>
        </PreviewBox>
        <CodeBlock code={`<ActionArea
  variant="strong"
  position="sticky"
  topAccessory={
    <Checkbox
      checked={agreed}
      onChange={setAgreed}
      label="이용약관에 동의합니다"
    />
  }
>
  <Button
    buttonType="filled"
    color="primary"
    size="xLarge"
    disabled={!agreed}
    onClick={() => {}}
  >
    결제하기
  </Button>
</ActionArea>`} />
      </Section>

      <Section title="API Reference">
        <Subsection title="ActionArea Props">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
            ActionArea 컴포넌트의 props입니다. HTML <InlineCode>div</InlineCode> 속성도 함께 전달할 수 있습니다.
          </p>
          <PropsTable
            props={[
              { name: "variant", type: '"strong" | "neutral" | "compact"', required: false, defaultVal: '"strong"', description: "레이아웃 variant — strong(세로/메인상단), neutral(가로/균등), compact(가로/우측정렬)" },
              { name: "position", type: '"static" | "sticky" | "fixed"', required: false, defaultVal: '"static"', description: "위치 설정 — sticky(스크롤시 고정), fixed(항상 고정)" },
              { name: "showGradient", type: "boolean", required: false, defaultVal: "true", description: "상단 그라데이션 표시 여부 (sticky/fixed에서만 적용)" },
              { name: "gradientHeight", type: "number", required: false, defaultVal: "48", description: "그라데이션 높이 (px)" },
              { name: "caption", type: "string", required: false, description: "버튼 상단에 표시되는 안내 텍스트. aria-describedby로 자동 연결됩니다." },
              { name: "topAccessory", type: "ReactNode", required: false, description: "버튼 상단에 추가 콘텐츠 (예: 약관 동의 체크박스, 안내 텍스트). caption보다 위에 렌더링됩니다." },
              { name: "useSafeArea", type: "boolean", required: false, defaultVal: "true", description: "모바일 Safe Area 하단 패딩 적용 여부" },
              { name: "backgroundColor", type: "string", required: false, defaultVal: "var(--surface-base-default)", description: "컨테이너 및 그라데이션 배경색" },
              { name: "aria-label", type: "string", required: false, description: "스크린 리더가 읽을 버튼 그룹 설명 (예: \"결제 액션\")" },
              { name: "children", type: "ReactNode", required: true, description: "Button, TextButton, IconButton 컴포넌트" },
            ]}
          />
        </Subsection>

        <Subsection title="Children Button Props">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
            ActionArea 내부에서 사용하는 Button의 권장 props 조합입니다.
          </p>
          <div style={{ overflow: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
              <thead>
                <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>역할</th>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>컴포넌트</th>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>권장 Props</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", fontWeight: typography.fontWeight.medium }}>Main</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>Button</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", fontFamily: "monospace", fontSize: typography.fontSize.xs, color: "var(--text-secondary)" }}>buttonType=&quot;filled&quot; color=&quot;primary&quot;</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", fontWeight: typography.fontWeight.medium }}>Alternative</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>Button</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", fontFamily: "monospace", fontSize: typography.fontSize.xs, color: "var(--text-secondary)" }}>buttonType=&quot;filled&quot; color=&quot;neutral&quot;</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", fontWeight: typography.fontWeight.medium }}>Sub (텍스트)</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>TextButton</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", fontFamily: "monospace", fontSize: typography.fontSize.xs, color: "var(--text-secondary)" }}>color=&quot;primary&quot;</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontWeight: typography.fontWeight.medium }}>Sub (아이콘)</td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>IconButton</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, fontFamily: "monospace", fontSize: typography.fontSize.xs, color: "var(--text-secondary)" }}>variant=&quot;weak&quot; color=&quot;neutral&quot;</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Accessibility">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
            ActionArea에 자동 적용되는 접근성 속성입니다.
          </p>
          <div style={{ overflow: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
              <thead>
                <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>속성</th>
                  <th style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>동작</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>role=&quot;group&quot;</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>자동 적용 — 스크린 리더가 버튼 그룹으로 인식</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>aria-describedby</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>caption이 있으면 자동 연결 — 설명 텍스트를 보조 기술에 전달</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px` }}><InlineCode>aria-label</InlineCode></td>
                  <td style={{ padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`, color: "var(--text-secondary)" }}>직접 전달 — 그룹의 용도를 설명 (예: &quot;결제 액션&quot;)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>
      </Section>
    </>
  );
}


// ============================================
// Anatomy Diagram
// ============================================
function AnatomyDiagram() {
  return (
    <div style={{
      backgroundColor: "var(--surface-base-default)",
      borderRadius: radius.primitive.lg,
      padding: `${spacing.primitive[8]}px ${spacing.primitive[10]}px`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <svg width="320" height="160" viewBox="0 0 320 160">
        {/* Screen side borders (open top) */}
        <line x1="60" y1="0" x2="60" y2="140" stroke="var(--border-base-default)" strokeWidth="2" />
        <line x1="260" y1="0" x2="260" y2="140" stroke="var(--border-base-default)" strokeWidth="2" />

        {/* Screen bottom with rounded corners */}
        <path d="M60 140 L60 150 Q60 160 70 160 L250 160 Q260 160 260 150 L260 140" fill="none" stroke="var(--border-base-default)" strokeWidth="2" />

        {/* Action Area background */}
        <rect x="61" y="0" width="198" height="140" fill="var(--surface-base-default)" />

        {/* Caption */}
        <text x="160" y="28" textAnchor="middle" fill="var(--content-base-secondary)" fontSize="11">변경 사항을 저장하시겠습니까?</text>

        {/* Main button */}
        <rect x="76" y="42" width="168" height="36" rx="8" fill="var(--content-brand-default)" />
        <text x="160" y="65" textAnchor="middle" fill="white" fontSize={typography.fontSize.compact} fontWeight={typography.fontWeight.semibold}>Main</text>

        {/* Alternative button */}
        <rect x="76" y="86" width="168" height="36" rx="8" fill="var(--surface-base-alternative)" />
        <text x="160" y="109" textAnchor="middle" fill="var(--content-base-default)" fontSize={typography.fontSize.compact} fontWeight={typography.fontWeight.semibold}>Alternative</text>

        {/* Home indicator */}
        <rect x="130" y="135" width="60" height="4" rx="2" fill="var(--border-base-default)" />

        {/* Number indicators */}
        {/* 1. Caption */}
        <circle cx="30" cy="28" r="12" fill="var(--content-base-default)" />
        <text x="30" y="32" textAnchor="middle" fill="white" fontSize="11" fontWeight={typography.fontWeight.semibold}>1</text>
        <line x1="42" y1="28" x2="72" y2="28" stroke="var(--content-base-default)" strokeWidth="1" strokeDasharray="2,2" />

        {/* 2. Main Button */}
        <circle cx="290" cy="60" r="12" fill="var(--content-base-default)" />
        <text x="290" y="64" textAnchor="middle" fill="white" fontSize="11" fontWeight={typography.fontWeight.semibold}>2</text>
        <line x1="245" y1="60" x2="278" y2="60" stroke="var(--content-base-default)" strokeWidth="1" strokeDasharray="2,2" />

        {/* 3. Alternative Button */}
        <circle cx="290" cy="104" r="12" fill="var(--content-base-default)" />
        <text x="290" y="108" textAnchor="middle" fill="white" fontSize="11" fontWeight={typography.fontWeight.semibold}>3</text>
        <line x1="245" y1="104" x2="278" y2="104" stroke="var(--content-base-default)" strokeWidth="1" strokeDasharray="2,2" />

        {/* 4. Container */}
        <circle cx="30" cy="90" r="12" fill="var(--content-base-default)" />
        <text x="30" y="94" textAnchor="middle" fill="white" fontSize="11" fontWeight={typography.fontWeight.semibold}>4</text>
        <line x1="42" y1="90" x2="60" y2="90" stroke="var(--content-base-default)" strokeWidth="1" strokeDasharray="2,2" />
      </svg>
    </div>
  );
}

// ============================================
// Top Accessory Demo
// ============================================
function TopAccessoryDemo() {
  const [agreed, setAgreed] = useState(false);
  return (
    <div
      style={{
        borderLeft: "2px solid var(--border-base-default)",
        borderRight: "2px solid var(--border-base-default)",
        borderBottom: "2px solid var(--border-base-default)",
        borderRadius: `0 0 ${radius.primitive.xl}px ${radius.primitive.xl}px`,
        overflow: "hidden",
        backgroundColor: "var(--surface-base-default)",
      }}
    >
      <ActionArea
        variant="strong"
        position="static"
        showGradient={false}
        useSafeArea={false}
        topAccessory={
          <Checkbox
            checked={agreed}
            onChange={setAgreed}
            label="이용약관에 동의합니다"
          />
        }
      >
        <Button
          buttonType="filled"
          color="primary"
          size="xLarge"
          disabled={!agreed}
          layout="fillWidth"
          onClick={() => {}}
        >
          결제하기
        </Button>
      </ActionArea>
      <div style={{ padding: `${spacing.primitive[2]}px 0 ${spacing.primitive[3]}px`, backgroundColor: "var(--surface-base-default)", display: "flex", justifyContent: "center" }}>
        <div style={{ width: 60, height: 4, backgroundColor: "var(--border-base-default)", borderRadius: 2 }} />
      </div>
    </div>
  );
}

// ============================================
// Demo Components (matching Button page styling)
// ============================================
type ActionAreaVariant = "strong" | "neutral" | "compact";
type ButtonVariant = "main" | "sub" | "alternative";
type ButtonSize = "small" | "medium" | "xLarge";
type ButtonType = "filled" | "weak";
type ButtonColor = "primary" | "neutral" | "success" | "error" | "kakao" | "google";

interface ActionAreaDemoProps {
  variant: ActionAreaVariant;
  children: React.ReactNode;
  caption?: string;
}

function ActionAreaDemo({ variant, children, caption }: ActionAreaDemoProps) {
  return (
    <div
      style={{
        borderLeft: "2px solid var(--border-base-default)",
        borderRight: "2px solid var(--border-base-default)",
        borderBottom: "2px solid var(--border-base-default)",
        borderRadius: `0 0 ${radius.primitive.xl}px ${radius.primitive.xl}px`,
        overflow: "hidden",
        backgroundColor: "var(--surface-base-default)",
      }}
    >
      {/* Action Area using real component */}
      <ActionArea
        variant={variant}
        position="static"
        showGradient={false}
        useSafeArea={false}
        caption={caption}
      >
        {children}
      </ActionArea>

      {/* Home indicator */}
      <div style={{ padding: `${spacing.primitive[2]}px 0 ${spacing.primitive[3]}px`, backgroundColor: "var(--surface-base-default)", display: "flex", justifyContent: "center" }}>
        <div style={{ width: 60, height: 4, backgroundColor: "var(--border-base-default)", borderRadius: 2 }} />
      </div>
    </div>
  );
}

// ActionAreaButton Demo - uses exact same styling as Button component
interface ActionAreaButtonDemoProps {
  variant: ButtonVariant;
  size: ButtonSize;
  children: React.ReactNode;
}

function ActionAreaButtonDemo({ variant, size, children, compact = false }: ActionAreaButtonDemoProps & { compact?: boolean }) {
  const buttonSize = size;
  const layout = compact ? "hug" as const : "fillWidth" as const;

  switch (variant) {
    case "main":
      return (
        <Button buttonType="filled" color="primary" size={buttonSize} layout={layout}>
          {children}
        </Button>
      );
    case "alternative":
      return (
        <Button buttonType="weak" color="primary" size={buttonSize} layout={layout}>
          {children}
        </Button>
      );
    case "sub":
      return (
        <Button buttonType="filled" color="neutral" size={buttonSize} layout={layout}>
          {children}
        </Button>
      );
  }
}

// IconButton Demo for sub action with icon
function IconButtonDemo({ size }: { size: ButtonSize }) {
  const iconButtonSize = size === "xLarge" ? "large" as const : size === "medium" ? "medium" as const : "small" as const;
  const iconSize = size === "xLarge" ? 24 : size === "medium" ? 20 : 18;

  return (
    <IconButton
      variant="weak"
      color="neutral"
      size={iconButtonSize}
    >
      {/* Refresh icon */}
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 2v6h-6" />
        <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
        <path d="M3 22v-6h6" />
        <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
      </svg>
    </IconButton>
  );
}

// ButtonDemo component matching Button page for consistency
interface ButtonDemoProps {
  buttonType: ButtonType;
  color: ButtonColor;
  children?: React.ReactNode;
  size?: "small" | "medium" | "large" | "xLarge";
  layout?: "hug" | "fillWidth" | "fill";
  disabled?: boolean;
  isLoading?: boolean;
}

function ButtonDemo({
  buttonType,
  color,
  children,
  size = "medium",
  layout = "hug",
  disabled = false,
  isLoading = false,
}: ButtonDemoProps) {
  return (
    <Button
      buttonType={buttonType}
      color={color}
      size={size}
      layout={layout === "fill" ? "fillWidth" : layout}
      disabled={disabled}
      isLoading={isLoading}
    >
      {children}
    </Button>
  );
}

// TextButton demo for sub variant display (matches TextButtonDemo from text-button page)
type TextButtonColor = "primary" | "neutral" | "muted" | "error";
type TextButtonSize = "xSmall" | "small" | "medium" | "large" | "xLarge";
type TextButtonVariant = "default" | "underline";

interface TextButtonDemoProps {
  variant?: TextButtonVariant;
  color?: TextButtonColor;
  size?: TextButtonSize;
  disabled?: boolean;
  children: React.ReactNode;
}

function TextButtonDemo({
  variant = "default",
  color = "primary",
  size = "medium",
  disabled = false,
  children
}: TextButtonDemoProps) {
  // Map page-level variant ("default" | "underline") to real TextButton variant ("clear" | "underline" | "arrow")
  const realVariant = variant === "underline" ? "underline" as const : "clear" as const;

  return (
    <TextButton
      variant={realVariant}
      color={color}
      size={size}
      disabled={disabled}
    >
      {children}
    </TextButton>
  );
}

// State demo button for States section
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

function StateButtonDemo({ state, variant, children }: {
  state: "pressed" | "disabled" | "loading";
  variant: "main" | "alternative";
  children: React.ReactNode;
}) {
  const buttonType = variant === "main" ? "filled" as const : "filled" as const;
  const color = variant === "main" ? "primary" as const : "neutral" as const;

  return (
    <Button
      buttonType={buttonType}
      color={color}
      size="xLarge"
      layout="fillWidth"
      disabled={state === "disabled"}
      isLoading={state === "loading"}
    >
      {children}
    </Button>
  );
}
