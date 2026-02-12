"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform, highlightCode } from "@/components/PlatformTabs";
import { ActionArea, Button, TextButton, IconButton } from '@baerae-zkap/design-system';

export default function ActionAreaPage() {
  return (
    <div style={{ maxWidth: 720 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Actions" },
          { label: "Action Area" },
        ]}
      />

      {/* Header */}
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
        Action Area
      </h1>
      <p style={{ fontSize: 15, color: "var(--text-secondary)", marginBottom: 32, lineHeight: 1.6 }}>
        모달 혹은 화면 하단 영역에서 메인, 대체, 보조 행동을 할 수 있는 다양한 레벨의 버튼 묶음을 제공합니다.
        내부적으로 Button 컴포넌트를 사용하여 일관된 스타일을 유지합니다.
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
  const [subButtonOption, setSubButtonOption] = useState<"label" | "icon">("icon");
  const [codeType, setCodeType] = useState<"rn" | "web">("rn");

  const generateCode = () => {
    const eventHandler = codeType === "rn" ? "onPress={() => {}}" : "onClick={() => {}}";
    const size = variant === "compact" ? "medium" : "xLarge";
    const isCompact = variant === "compact";

    // Cancel variant: single outlined cancel button
    if (variant === "cancel") {
      return `{/* Cancel variant: single dismiss button */}
<View style={{ flexDirection: 'column', gap: 12, padding: 20 }}>
  <Button
    buttonType="outlined"
    color="baseContainer"
    size="${size}"
    layout="fillWidth"
    ${eventHandler}
  >
    Cancel
  </Button>
</View>`;
    }

    // Determine flex direction based on variant
    const isVertical = variant === "strong";
    const flexDirection = isVertical ? "column" : "row";
    const justifyContent = isCompact ? ", justifyContent: 'flex-end'" : "";
    const alignItems = combination === "sub" && isVertical ? ", alignItems: 'center'" : "";

    // Layout prop - compact uses hug, others use fillWidth
    const layoutProp = isCompact ? "" : `\n    layout="fillWidth"`;

    // Main button
    const mainButton = `  <Button
    buttonType="filled"
    color="brandDefault"
    size="${size}"${layoutProp}
    ${eventHandler}
  >
    Main action
  </Button>`;

    // Alternative button
    const altButton = `  <Button
    buttonType="filled"
    color="baseContainer"
    size="${size}"${layoutProp}
    ${eventHandler}
  >
    Alternative
  </Button>`;

    // Sub button - Label or Icon
    const subButton = subButtonOption === "icon"
      ? `  <IconButton
    icon="refresh"
    buttonType="outlined"
    color="baseContainer"
    size="${size}"
    ${eventHandler}
  />`
      : `  <TextButton
    color="brandDefault"
    ${eventHandler}
  >
    Sub action
  </TextButton>`;

    // Build buttons based on combination and variant
    let buttons = "";
    if (combination === "alternative") {
      if (isVertical) {
        buttons = `${mainButton}\n${altButton}`;
      } else {
        // neutral, compact: Alternative first, then Main
        buttons = `${altButton}\n${mainButton}`;
      }
    } else if (combination === "sub") {
      if (isVertical) {
        buttons = `${mainButton}\n${subButton}`;
      } else {
        buttons = `${subButton}\n${mainButton}`;
      }
    } else {
      buttons = mainButton;
    }

    // Wrapper style - padding: Modal(24px) or BottomSheet(20px), gap: modal.buttonGap(12px)
    const wrapperStyle = `flexDirection: '${flexDirection}', gap: 12, padding: 20${justifyContent}${alignItems}`;

    return `{/* gap: modal.buttonGap(12), padding: bottomSheet.padding(20) or modal.padding(24) */}
<View style={{ ${wrapperStyle} }}>
${buttons}
</View>`;
  };

  const isVertical = variant === "strong";
  const buttonSize = variant === "compact" ? "small" : "xLarge";
  // Cancel variant only shows single cancel button
  const effectiveCombination = variant === "cancel" ? "main" : combination;

  return (
    <div style={{ marginBottom: 32 }}>
      {/* Main Playground Card */}
      <div
        style={{
          borderRadius: 20,
          overflow: "hidden",
          backgroundColor: "#fafbfc",
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
              backgroundColor: "#fafbfc",
            }}
          >
            <div style={{ width: "100%", maxWidth: 340 }}>
              <ActionAreaDemo variant={variant}>
                {/* Cancel variant: single cancel button only */}
                {variant === "cancel" ? (
                  <ActionAreaButtonDemo variant="cancel" size={buttonSize}>
                    Cancel
                  </ActionAreaButtonDemo>
                ) : (
                  <>
                    {/* Sub action (left/top position for neutral/compact) */}
                    {effectiveCombination === "sub" && !isVertical && (
                      subButtonOption === "icon" ? (
                        <IconButtonDemo size={buttonSize} />
                      ) : (
                        <ActionAreaButtonDemo variant="sub" size={buttonSize} compact={variant === "compact"}>
                          Sub action
                        </ActionAreaButtonDemo>
                      )
                    )}
                    {/* Alternative (left position for neutral/compact) */}
                    {effectiveCombination === "alternative" && !isVertical && (
                      <ActionAreaButtonDemo variant="alternative" size={buttonSize} compact={variant === "compact"}>
                        Alternative
                      </ActionAreaButtonDemo>
                    )}
                    {/* Main button */}
                    <ActionAreaButtonDemo variant="main" size={buttonSize} compact={variant === "compact"}>
                      Main action
                    </ActionAreaButtonDemo>
                    {/* Alternative (bottom position for strong) */}
                    {effectiveCombination === "alternative" && isVertical && (
                      <ActionAreaButtonDemo variant="alternative" size={buttonSize}>
                        Alternative
                      </ActionAreaButtonDemo>
                    )}
                    {/* Sub action (bottom position for strong) */}
                    {effectiveCombination === "sub" && isVertical && (
                      subButtonOption === "icon" ? (
                        <IconButtonDemo size={buttonSize} />
                      ) : (
                        <ActionAreaButtonDemo variant="sub" size={buttonSize}>
                          Sub action
                        </ActionAreaButtonDemo>
                      )
                    )}
                  </>
                )}
              </ActionAreaDemo>
            </div>
          </div>

          {/* Control Panel */}
          <div
            style={{
              backgroundColor: "#fafbfc",
              display: "flex",
              flexDirection: "column",
              padding: 16,
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
                padding: 24,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 28,
                backgroundColor: "white",
                borderRadius: 16,
              }}
            >
              {/* Variants */}
              <RadioGroup
                label="Variants"
                options={[
                  { value: "strong", label: "Strong" },
                  { value: "neutral", label: "Neutral" },
                  { value: "compact", label: "Compact" },
                  { value: "cancel", label: "Cancel" },
                ]}
                value={variant}
                onChange={(v) => setVariant(v as ActionAreaVariant)}
              />

              {/* Combination - disabled when Cancel variant */}
              <RadioGroup
                label="Combination"
                options={[
                  { value: "alternative", label: "With alternative action" },
                  { value: "sub", label: "With sub action" },
                  { value: "main", label: "Main only" },
                ]}
                value={combination}
                onChange={(v) => setCombination(v as "alternative" | "sub" | "main")}
                disabled={variant === "cancel"}
              />

              {/* Sub button option - disabled when not "With sub action" or Cancel variant */}
              <RadioGroup
                label="Sub button option"
                options={[
                  { value: "label", label: "Label" },
                  { value: "icon", label: "With icon" },
                ]}
                value={subButtonOption}
                onChange={(v) => setSubButtonOption(v as "label" | "icon")}
                disabled={combination !== "sub" || variant === "cancel"}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Generated Code */}
      <div style={{ marginTop: 16, borderRadius: 12, overflow: "hidden", border: "1px solid var(--divider)" }}>
        <div
          style={{
            padding: "10px 16px",
            backgroundColor: "#18181b",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: 8 }}>
            <CodeTypeTab active={codeType === "rn"} onClick={() => setCodeType("rn")}>React Native</CodeTypeTab>
            <CodeTypeTab active={codeType === "web"} onClick={() => setCodeType("web")}>Web</CodeTypeTab>
          </div>
          <CopyButton text={generateCode()} />
        </div>
        <pre
          style={{
            margin: 0,
            padding: 16,
            fontSize: 13,
            lineHeight: 1.6,
            color: "#e4e4e7",
            backgroundColor: "#18181b",
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

function RadioGroup({ label, options, value, onChange, disabled = false }: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <div style={{ opacity: disabled ? 0.4 : 1, pointerEvents: disabled ? "none" : "auto" }}>
      <div style={{ fontSize: 14, fontWeight: 500, color: "#c4c4c4", marginBottom: 14 }}>
        {label}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {options.map(opt => {
          const isSelected = value === opt.value;
          return (
            <label
              key={opt.value}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                cursor: "pointer",
                fontSize: 15,
                fontWeight: 500,
                color: isSelected ? "var(--text-primary)" : "#9ca3af",
                transition: "color 0.15s ease",
              }}
              onClick={() => onChange(opt.value)}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  border: isSelected ? "2px solid #3b82f6" : "2px solid #e5e5e5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.15s ease",
                  backgroundColor: "white",
                }}
              >
                {isSelected && (
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      backgroundColor: "#3b82f6",
                    }}
                  />
                )}
              </div>
              {opt.label}
            </label>
          );
        })}
      </div>
    </div>
  );
}

function CodeTypeTab({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "4px 12px",
        fontSize: 12,
        fontWeight: 500,
        color: active ? "#e4e4e7" : "#71717a",
        backgroundColor: active ? "#27272a" : "transparent",
        border: "none",
        borderRadius: 4,
        cursor: "pointer",
        transition: "all 0.15s ease",
      }}
    >
      {children}
    </button>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      style={{
        padding: "4px 10px",
        fontSize: 11,
        fontWeight: 500,
        color: copied ? "#22c55e" : "#71717a",
        backgroundColor: "transparent",
        border: "1px solid #3f3f46",
        borderRadius: 4,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 4,
        transition: "all 0.15s ease",
      }}
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

function PlatformContent({ platform }: { platform: Platform }) {
  switch (platform) {
    case "design":
      return <DesignContent />;
    case "web":
      return <WebContent />;
    case "rn":
      return <RNContent />;
  }
}

// ============================================
// Design Tab Content
// ============================================
function DesignContent() {
  return (
    <>
      {/* Button Mapping */}
      <Section title="Button Component Mapping">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          <InlineCode>ActionArea</InlineCode>는 <InlineCode>Button</InlineCode>과 <InlineCode>TextButton</InlineCode> 컴포넌트를 children으로 받습니다.
          각 역할에 맞게 아래와 같이 Button props를 설정합니다.
        </p>

        <div style={{ overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)", marginBottom: 32 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>역할</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Button props</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Preview</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>
                  <InlineCode>주요 (Main)</InlineCode>
                </td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", fontFamily: "monospace", fontSize: 12, color: "#6366f1" }}>
                  buttonType=&quot;filled&quot; color=&quot;brandDefault&quot;
                </td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>
                  <ButtonDemo buttonType="filled" color="brandDefault" size="small">Main</ButtonDemo>
                </td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>
                  <InlineCode>대안 (Alternative)</InlineCode>
                </td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", fontFamily: "monospace", fontSize: 12, color: "#6366f1" }}>
                  buttonType=&quot;filled&quot; color=&quot;baseContainer&quot;
                </td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>
                  <ButtonDemo buttonType="filled" color="baseContainer" size="small">Alternative</ButtonDemo>
                </td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px" }}>
                  <InlineCode>보조 (Sub)</InlineCode>
                </td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 12, color: "#6366f1" }}>
                  TextButton color=&quot;baseDefault&quot;
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <TextButtonDemo size="small">Sub</TextButtonDemo>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <CodeBlock code={`// ActionArea에서 Button/TextButton 사용:

import { ActionArea, Button, TextButton } from '@baerae-zkap/design-system/native';

// 주요 액션 (Main)
<Button buttonType="filled" color="brandDefault">확인</Button>

// 대안 액션 (Alternative) - filled gray
<Button buttonType="filled" color="baseContainer">취소</Button>

// 보조 링크 (Sub)
<TextButton color="baseDefault">건너뛰기</TextButton>

// ActionArea로 감싸면 자동 레이아웃
<ActionArea variant="neutral">
  <Button buttonType="filled" color="baseContainer" onPress={() => {}}>취소</Button>
  <Button buttonType="filled" color="brandDefault" onPress={() => {}}>확인</Button>
</ActionArea>`} />
      </Section>

      {/* Anatomy */}
      <Section title="Anatomy">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          ActionArea는 아래와 같은 구조로 조합하여 사용합니다.
        </p>
        <AnatomyDiagram />
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
          marginTop: 20,
          fontSize: 14,
          fontWeight: 500,
          color: "var(--text-primary)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <NumberBadge>1</NumberBadge>
            <span>Caption (optional)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <NumberBadge>2</NumberBadge>
            <span>Main Button</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <NumberBadge>3</NumberBadge>
            <span>Alternative / Sub</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <NumberBadge>4</NumberBadge>
            <span>Container</span>
          </div>
        </div>
      </Section>

      {/* Variants */}
      <Section title="Variants">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 24, lineHeight: 1.6 }}>
          <InlineCode>ActionArea</InlineCode>는 4가지 variant를 제공하며, 각각 다른 레이아웃과 용도를 가집니다.
        </p>

        {/* Strong */}
        <Subsection title="Strong (Default)">
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
            <strong style={{ color: "var(--text-primary)" }}>세로 배치, 큰 버튼</strong>. 모달이나 시트의 주요 CTA 영역에서 사용합니다.
            가장 강조되는 레이아웃으로, 사용자의 주요 결정을 유도할 때 적합합니다.
          </p>
          <PreviewBox>
            <div style={{ width: "100%", maxWidth: 320, display: "flex", flexDirection: "column", gap: 16 }}>
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
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
            <strong style={{ color: "var(--text-primary)" }}>가로 배치, 동일 너비</strong>. 확인/취소 다이얼로그나 두 가지 선택이 균등한 비중을 가질 때 사용합니다.
          </p>
          <PreviewBox>
            <div style={{ width: "100%", maxWidth: 320, display: "flex", flexDirection: "column", gap: 16 }}>
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
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
            <strong style={{ color: "var(--text-primary)" }}>가로 배치, 우측 정렬, 작은 버튼</strong>. 인라인 폼이나 카드 내부의 액션 영역에서 사용합니다.
            컨텐츠와 함께 배치되어 공간을 절약합니다.
          </p>
          <PreviewBox>
            <div style={{ width: "100%", maxWidth: 320, display: "flex", flexDirection: "column", gap: 16 }}>
              <ActionAreaDemo variant="compact">
                <ActionAreaButtonDemo variant="alternative" size="small">Alternative</ActionAreaButtonDemo>
                <ActionAreaButtonDemo variant="main" size="small">Main</ActionAreaButtonDemo>
              </ActionAreaDemo>
              <ActionAreaDemo variant="compact">
                <ActionAreaButtonDemo variant="sub" size="small">Sub</ActionAreaButtonDemo>
                <ActionAreaButtonDemo variant="main" size="small">Main</ActionAreaButtonDemo>
              </ActionAreaDemo>
            </div>
          </PreviewBox>
        </Subsection>

      </Section>

      {/* Caption */}
      <Section title="Caption">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
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

      {/* Usage Guidelines */}
      <Section title="Usage Guidelines">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 24, lineHeight: 1.6 }}>
          일관된 UX를 위해 상황에 맞는 variant와 버튼 조합을 선택하세요.
        </p>

        <Subsection title="Recommended Combinations">
          <div style={{ overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                  <th style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>상황</th>
                  <th style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Variant</th>
                  <th style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>버튼 조합</th>
                  <th style={{ padding: "10px 14px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>예시</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--divider)", fontWeight: 500 }}>중요한 결정</td>
                  <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--divider)" }}><code style={{ backgroundColor: "#dbeafe", padding: "2px 6px", borderRadius: 4, fontSize: 12, color: "#1d4ed8" }}>strong</code></td>
                  <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>Main + Alternative</td>
                  <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--divider)", color: "var(--text-tertiary)", fontSize: 13 }}>결제, 저장</td>
                </tr>
                <tr>
                  <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--divider)", fontWeight: 500 }}>균등한 선택</td>
                  <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--divider)" }}><code style={{ backgroundColor: "#dbeafe", padding: "2px 6px", borderRadius: 4, fontSize: 12, color: "#1d4ed8" }}>neutral</code></td>
                  <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>Main + Alternative</td>
                  <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--divider)", color: "var(--text-tertiary)", fontSize: 13 }}>확인/취소</td>
                </tr>
                <tr>
                  <td style={{ padding: "10px 14px", fontWeight: 500 }}>인라인 액션</td>
                  <td style={{ padding: "10px 14px" }}><code style={{ backgroundColor: "#dbeafe", padding: "2px 6px", borderRadius: 4, fontSize: 12, color: "#1d4ed8" }}>compact</code></td>
                  <td style={{ padding: "10px 14px", color: "var(--text-secondary)" }}>Main + Alternative</td>
                  <td style={{ padding: "10px 14px", color: "var(--text-tertiary)", fontSize: 13 }}>수정/삭제</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Design Principles">
          <div style={{ display: "grid", gap: 16 }}>
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
      </Section>

      {/* States */}
      <Section title="States">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 24, lineHeight: 1.6 }}>
          ActionArea 내의 버튼들은 다음 상태를 지원합니다.
        </p>

        <Subsection title="Enabled (Default)">
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
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
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
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
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
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
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
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
      </Section>

      {/* Design Tokens */}
      <Section title="Design Tokens">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          ActionArea는 사용되는 컨텍스트에 따라 다른 토큰을 적용합니다. <a href="/spacing" style={{ color: "var(--brand-primary)" }}>Spacing 토큰 전체 보기 →</a>
        </p>

        <div style={{ overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Property</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Context</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Token</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowSpan={2} style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-primary)", verticalAlign: "middle" }}>Container Padding</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: 13 }}>Modal</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><InlineCode>modal.padding</InlineCode></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>24px</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: 13 }}>BottomSheet</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><InlineCode>bottomSheet.padding</InlineCode></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>20px</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Button Gap</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: 13 }}>All</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><InlineCode>modal.buttonGap</InlineCode></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>12px</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Caption Font Size</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)", fontSize: 13 }}>All</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><InlineCode>typography.sm</InlineCode></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>14px</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", color: "var(--text-primary)" }}>Button Height (xLarge)</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)", fontSize: 13 }}>All</td>
                <td style={{ padding: "12px 16px" }}><InlineCode>primitive.12</InlineCode></td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>48px</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* Accessibility */}
      <Section title="Accessibility">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          ActionArea는 버튼 그룹으로서 웹 접근성 표준을 준수합니다.
        </p>

        <div style={{ overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)", marginBottom: 24 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>속성</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><InlineCode>role=&quot;group&quot;</InlineCode></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>스크린 리더가 버튼 그룹으로 인식</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><InlineCode>aria-label</InlineCode></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>그룹의 용도를 설명하는 레이블 (예: &quot;결제 액션&quot;)</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><InlineCode>aria-describedby</InlineCode></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>caption이 있는 경우 설명 텍스트와 연결</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><InlineCode>aria-disabled</InlineCode></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>비활성화 상태를 보조 기술에 전달</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px" }}><InlineCode>aria-busy</InlineCode></td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>로딩 상태를 보조 기술에 전달</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Subsection title="Keyboard Interaction">
          <div style={{ overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>키</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>동작</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><kbd style={{ padding: "2px 6px", backgroundColor: "var(--bg-secondary)", borderRadius: 4, fontSize: 12 }}>Tab</kbd></td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>그룹 내 다음 버튼으로 포커스 이동</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><kbd style={{ padding: "2px 6px", backgroundColor: "var(--bg-secondary)", borderRadius: 4, fontSize: 12 }}>Shift + Tab</kbd></td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>그룹 내 이전 버튼으로 포커스 이동</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><kbd style={{ padding: "2px 6px", backgroundColor: "var(--bg-secondary)", borderRadius: 4, fontSize: 12 }}>Enter</kbd></td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>포커스된 버튼 클릭 실행</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px" }}><kbd style={{ padding: "2px 6px", backgroundColor: "var(--bg-secondary)", borderRadius: 4, fontSize: 12 }}>Space</kbd></td>
                  <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>포커스된 버튼 클릭 실행</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Design Principles">
          <div style={{ display: "grid", gap: 16 }}>
            <PrincipleCard
              number={1}
              title="Focus Order"
              desc="버튼 간 포커스 순서는 시각적 순서와 일치합니다. Strong variant에서는 Main → Alternative 순으로, Neutral/Compact에서는 좌측 → 우측 순으로 포커스가 이동합니다."
            />
            <PrincipleCard
              number={2}
              title="Focus Trap in Modal"
              desc="모달 내에서 ActionArea를 사용할 때, Tab 키는 모달 콘텐츠 내에서 순환합니다. 포커스가 모달 밖으로 빠져나가지 않도록 구현합니다."
            />
            <PrincipleCard
              number={3}
              title="Screen Reader Announcement"
              desc="버튼 그룹의 컨텍스트를 role='group'과 aria-label로 전달합니다. caption이 있는 경우 aria-describedby로 연결하여 맥락을 제공합니다."
            />
            <PrincipleCard
              number={4}
              title="Loading State"
              desc="로딩 상태에서는 aria-busy='true'를 설정하고, 완료 시 결과를 aria-live 영역으로 알립니다. 로딩 중에는 추가 상호작용이 방지됩니다."
            />
          </div>
        </Subsection>
      </Section>

      {/* Best Practices */}
      <Section title="Best Practices">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <PreviewBox>
              <div style={{ width: "100%", maxWidth: 260, padding: 8 }}>
                <ActionAreaDemo variant="strong">
                  <ActionAreaButtonDemo variant="main" size="xLarge">확인</ActionAreaButtonDemo>
                  <ActionAreaButtonDemo variant="alternative" size="xLarge">취소</ActionAreaButtonDemo>
                </ActionAreaDemo>
              </div>
            </PreviewBox>
            <DoLabel>상황에 맞는 variant를 선택하고 기본 버튼 순서를 유지합니다.</DoLabel>
          </div>
          <div>
            <PreviewBox>
              <div style={{ width: "100%", maxWidth: 260, padding: 8 }}>
                <ActionAreaDemo variant="strong">
                  <ActionAreaButtonDemo variant="alternative" size="xLarge">취소</ActionAreaButtonDemo>
                  <ActionAreaButtonDemo variant="main" size="xLarge">확인</ActionAreaButtonDemo>
                </ActionAreaDemo>
              </div>
            </PreviewBox>
            <DontLabel>Strong variant에서 Main 버튼을 아래에 배치하지 않습니다.</DontLabel>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
          <div>
            <PreviewBox>
              <div style={{ width: "100%", maxWidth: 260, padding: 8 }}>
                <ActionAreaDemo variant="neutral">
                  <ActionAreaButtonDemo variant="alternative" size="xLarge">취소</ActionAreaButtonDemo>
                  <ActionAreaButtonDemo variant="main" size="xLarge">확인</ActionAreaButtonDemo>
                </ActionAreaDemo>
              </div>
            </PreviewBox>
            <DoLabel>같은 유형의 다이얼로그에서는 동일한 variant와 조합을 사용합니다.</DoLabel>
          </div>
          <div>
            <PreviewBox>
              <div style={{ width: "100%", maxWidth: 260, padding: 8 }}>
                <ActionAreaDemo variant="neutral">
                  <ActionAreaButtonDemo variant="main" size="xLarge">확인</ActionAreaButtonDemo>
                  <ActionAreaButtonDemo variant="main" size="xLarge">저장</ActionAreaButtonDemo>
                </ActionAreaDemo>
              </div>
            </PreviewBox>
            <DontLabel>동일한 역할의 버튼을 두 개 이상 배치하지 않습니다.</DontLabel>
          </div>
        </div>
      </Section>
    </>
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
        <div style={{ padding: 16, backgroundColor: "var(--bg-secondary)", borderRadius: 12, marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>ActionArea Component</p>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "4px 0 0 0" }}>실제 컴포넌트 소스 코드를 GitHub에서 확인하세요.</p>
          </div>
          <a
            href={ACTIONAREA_SOURCE}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              fontSize: 13,
              fontWeight: 500,
              color: "white",
              backgroundColor: "#24292f",
              borderRadius: 12,
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
        <CodeBlock code={`import { Button } from '@zkap/design-system';`} />
      </Section>

      <Section title="Strong Variant">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
          세로 배치, Main 버튼이 위에 위치합니다.
        </p>
        <PreviewBox>
          <div style={{ width: "100%", maxWidth: 320, display: "flex", flexDirection: "column", gap: 16 }}>
            <ActionAreaDemo variant="strong">
              <ActionAreaButtonDemo variant="main" size="xLarge">Main</ActionAreaButtonDemo>
              <ActionAreaButtonDemo variant="alternative" size="xLarge">Alternative</ActionAreaButtonDemo>
            </ActionAreaDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<View style={{ flexDirection: 'column', gap: 12, padding: 20 }}>
  <Button
    buttonType="filled"
    color="brandDefault"
    size="xLarge"
    layout="fillWidth"
    onClick={() => {}}
  >
    Main
  </Button>
  <Button
    buttonType="outlined"
    color="baseContainer"
    size="xLarge"
    layout="fillWidth"
    onClick={() => {}}
  >
    Alternative
  </Button>
</View>`} />
      </Section>

      <Section title="Neutral Variant">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
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
        <CodeBlock code={`<View style={{ flexDirection: 'row', gap: 12, padding: 20 }}>
  <Button
    buttonType="outlined"
    color="baseContainer"
    size="xLarge"
    layout="fillWidth"
    onClick={() => {}}
  >
    Alternative
  </Button>
  <Button
    buttonType="filled"
    color="brandDefault"
    size="xLarge"
    layout="fillWidth"
    onClick={() => {}}
  >
    Main
  </Button>
</View>`} />
      </Section>

      <Section title="Compact Variant">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
          가로 배치, 우측 정렬, 작은 버튼 사이즈입니다.
        </p>
        <PreviewBox>
          <div style={{ width: "100%", maxWidth: 320 }}>
            <ActionAreaDemo variant="compact">
              <ActionAreaButtonDemo variant="sub" size="small">Sub</ActionAreaButtonDemo>
              <ActionAreaButtonDemo variant="main" size="small">Main</ActionAreaButtonDemo>
            </ActionAreaDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<View style={{ flexDirection: 'row', gap: 12, justifyContent: 'flex-end', padding: 20 }}>
  <TextButton
    color="brandDefault"
    onClick={() => {}}
  >
    Sub
  </TextButton>
  <Button
    buttonType="filled"
    color="brandDefault"
    size="medium"
    onClick={() => {}}
  >
    Main
  </Button>
</View>`} />
      </Section>

      <Section title="With Caption">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
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
        <CodeBlock code={`<View style={{ flexDirection: 'column', gap: 12, padding: 20 }}>
  <Text style={{ fontSize: 14, color: '#6b7280', textAlign: 'center', marginBottom: 6 }}>
    변경 사항을 저장하시겠습니까?
  </Text>
  <Button
    buttonType="filled"
    color="brandDefault"
    size="xLarge"
    layout="fillWidth"
    onClick={() => {}}
  >
    저장
  </Button>
  <Button
    buttonType="outlined"
    color="baseContainer"
    size="xLarge"
    layout="fillWidth"
    onClick={() => {}}
  >
    취소
  </Button>
</View>`} />
      </Section>

      <Section title="Main + Sub Combination">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
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
        <CodeBlock code={`<View style={{ flexDirection: 'column', gap: 12, padding: 20, alignItems: 'center' }}>
  <Button
    buttonType="filled"
    color="brandDefault"
    size="xLarge"
    layout="fillWidth"
    onClick={() => {}}
  >
    로그인
  </Button>
  <TextButton
    color="brandDefault"
    onClick={() => {}}
  >
    회원가입
  </TextButton>
</View>`} />
      </Section>

      <Section title="Button Props Reference">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          Action Area 패턴에서 사용되는 Button props 매핑입니다.
        </p>

        <div style={{ overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)", marginBottom: 24 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>버튼 역할</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Button Props</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", fontWeight: 500 }}>Main (주요 액션)</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", fontFamily: "monospace", fontSize: 12, color: "#6366f1" }}>
                  buttonType=&quot;filled&quot; color=&quot;brandDefault&quot; size=&quot;xLarge&quot; layout=&quot;fillWidth&quot;
                </td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", fontWeight: 500 }}>Alternative (대체 액션)</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", fontFamily: "monospace", fontSize: 12, color: "#6366f1" }}>
                  buttonType=&quot;outlined&quot; color=&quot;baseContainer&quot; size=&quot;xLarge&quot; layout=&quot;fillWidth&quot;
                </td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", fontWeight: 500 }}>Sub (보조 링크)</td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 12, color: "#6366f1" }}>
                  buttonType=&quot;plain&quot; color=&quot;brandDefault&quot;
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="API Reference">
        <Subsection title="Common Props">
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
            ActionArea 패턴에서 사용되는 Button의 공통 props입니다.
          </p>
          <PropsTable
            props={[
              { name: "children", type: "ReactNode", required: true, description: "버튼 텍스트 또는 콘텐츠" },
              { name: "buttonType", type: '"filled" | "outlined" | "plain"', required: false, defaultVal: '"filled"', description: "버튼 스타일 타입" },
              { name: "color", type: '"brandDefault" | "baseContainer" | ...', required: false, defaultVal: '"brandDefault"', description: "버튼 색상" },
              { name: "size", type: '"small" | "medium" | "large" | "xLarge"', required: false, defaultVal: '"medium"', description: "버튼 크기" },
              { name: "layout", type: '"hug" | "fillWidth" | "fill"', required: false, defaultVal: '"hug"', description: "버튼 레이아웃" },
              { name: "disabled", type: "boolean", required: false, defaultVal: "false", description: "비활성화 상태" },
              { name: "isLoading", type: "boolean", required: false, defaultVal: "false", description: "로딩 상태" },
            ]}
          />
        </Subsection>

        <Subsection title="Web 전용 Props">
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
            웹 환경에서 사용할 수 있는 추가 props입니다.
          </p>
          <PropsTable
            props={[
              { name: "onClick", type: "(event: MouseEvent) => void", required: false, description: "클릭 핸들러" },
              { name: "type", type: '"button" | "submit" | "reset"', required: false, defaultVal: '"button"', description: "HTML button type 속성" },
              { name: "aria-label", type: "string", required: false, description: "스크린 리더가 읽을 버튼 설명 텍스트" },
              { name: "aria-describedby", type: "string", required: false, description: "caption 등 연결할 설명 요소의 ID" },
              { name: "tabIndex", type: "number", required: false, description: "Tab 키 포커스 순서 지정" },
            ]}
          />
        </Subsection>

        <Subsection title="States">
          <div style={{ overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>State</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>설명</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>적용 방법</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", fontWeight: 500 }}>Enabled</td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>기본 상태</td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", fontFamily: "monospace", fontSize: 12, color: "#6366f1" }}>default</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", fontWeight: 500 }}>Disabled</td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>비활성화</td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", fontFamily: "monospace", fontSize: 12, color: "#6366f1" }}>disabled=true</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px", fontWeight: 500 }}>Loading</td>
                  <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>로딩 중</td>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 12, color: "#6366f1" }}>isLoading=true</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>
      </Section>
    </>
  );
}

const ACTIONAREA_NATIVE_SOURCE = `${GITHUB_BASE}/native/ActionArea.tsx`;

// ============================================
// React Native Tab Content
// ============================================
function RNContent() {
  return (
    <>
      <Section title="Source Code">
        <div style={{ padding: 16, backgroundColor: "var(--bg-secondary)", borderRadius: 12, marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>ActionArea Component</p>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "4px 0 0 0" }}>실제 컴포넌트 소스 코드를 GitHub에서 확인하세요.</p>
          </div>
          <a
            href={ACTIONAREA_NATIVE_SOURCE}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              fontSize: 13,
              fontWeight: 500,
              color: "white",
              backgroundColor: "#24292f",
              borderRadius: 12,
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
        <CodeBlock code={`import { Button } from '@zkap/design-system';
import { View, Text } from 'react-native';`} />
      </Section>

      <Section title="Strong Variant">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
          세로 배치, Main 버튼이 위에 위치합니다.
        </p>
        <PreviewBox>
          <div style={{ width: "100%", maxWidth: 320, display: "flex", flexDirection: "column", gap: 16 }}>
            <ActionAreaDemo variant="strong">
              <ActionAreaButtonDemo variant="main" size="xLarge">Main</ActionAreaButtonDemo>
              <ActionAreaButtonDemo variant="alternative" size="xLarge">Alternative</ActionAreaButtonDemo>
            </ActionAreaDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<View style={{ flexDirection: 'column', gap: 12, padding: 20 }}>
  <Button
    buttonType="filled"
    color="brandDefault"
    size="xLarge"
    layout="fillWidth"
    onPress={() => {}}
  >
    Main
  </Button>
  <Button
    buttonType="outlined"
    color="baseContainer"
    size="xLarge"
    layout="fillWidth"
    onPress={() => {}}
  >
    Alternative
  </Button>
</View>`} />
      </Section>

      <Section title="Neutral Variant">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
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
        <CodeBlock code={`<View style={{ flexDirection: 'row', gap: 12, padding: 20 }}>
  <Button
    buttonType="outlined"
    color="baseContainer"
    size="xLarge"
    layout="fillWidth"
    onPress={() => {}}
  >
    Alternative
  </Button>
  <Button
    buttonType="filled"
    color="brandDefault"
    size="xLarge"
    layout="fillWidth"
    onPress={() => {}}
  >
    Main
  </Button>
</View>`} />
      </Section>

      <Section title="Compact Variant">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
          가로 배치, 우측 정렬, 작은 버튼 사이즈입니다.
        </p>
        <PreviewBox>
          <div style={{ width: "100%", maxWidth: 320 }}>
            <ActionAreaDemo variant="compact">
              <ActionAreaButtonDemo variant="sub" size="small">Sub</ActionAreaButtonDemo>
              <ActionAreaButtonDemo variant="main" size="small">Main</ActionAreaButtonDemo>
            </ActionAreaDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<View style={{ flexDirection: 'row', gap: 12, justifyContent: 'flex-end', padding: 20 }}>
  <TextButton
    color="brandDefault"
    onPress={() => {}}
  >
    Sub
  </TextButton>
  <Button
    buttonType="filled"
    color="brandDefault"
    size="medium"
    onPress={() => {}}
  >
    Main
  </Button>
</View>`} />
      </Section>

      <Section title="With Caption">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
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
        <CodeBlock code={`<View style={{ flexDirection: 'column', gap: 12, padding: 20 }}>
  <Text style={{ fontSize: 14, color: '#6b7280', textAlign: 'center', marginBottom: 6 }}>
    변경 사항을 저장하시겠습니까?
  </Text>
  <Button
    buttonType="filled"
    color="brandDefault"
    size="xLarge"
    layout="fillWidth"
    onPress={() => {}}
  >
    저장
  </Button>
  <Button
    buttonType="outlined"
    color="baseContainer"
    size="xLarge"
    layout="fillWidth"
    onPress={() => {}}
  >
    취소
  </Button>
</View>`} />
      </Section>

      <Section title="Main + Sub Combination">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
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
        <CodeBlock code={`<View style={{ flexDirection: 'column', gap: 12, padding: 20, alignItems: 'center' }}>
  <Button
    buttonType="filled"
    color="brandDefault"
    size="xLarge"
    layout="fillWidth"
    onPress={() => {}}
  >
    로그인
  </Button>
  <TextButton
    color="brandDefault"
    onPress={() => {}}
  >
    회원가입
  </TextButton>
</View>`} />
      </Section>

      <Section title="Button Props Reference">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          Action Area 패턴에서 사용되는 Button props 매핑입니다.
        </p>

        <div style={{ overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)", marginBottom: 24 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>버튼 역할</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Button Props</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", fontWeight: 500 }}>Main (주요 액션)</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", fontFamily: "monospace", fontSize: 12, color: "#6366f1" }}>
                  buttonType=&quot;filled&quot; color=&quot;brandDefault&quot; size=&quot;xLarge&quot; layout=&quot;fillWidth&quot;
                </td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", fontWeight: 500 }}>Alternative (대체 액션)</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", fontFamily: "monospace", fontSize: 12, color: "#6366f1" }}>
                  buttonType=&quot;outlined&quot; color=&quot;baseContainer&quot; size=&quot;xLarge&quot; layout=&quot;fillWidth&quot;
                </td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", fontWeight: 500 }}>Sub (보조 링크)</td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 12, color: "#6366f1" }}>
                  buttonType=&quot;plain&quot; color=&quot;brandDefault&quot;
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="API Reference">
        <Subsection title="Button">
          <PropsTable
            props={[
              { name: "children", type: "ReactNode", required: true, description: "버튼 텍스트 또는 콘텐츠" },
              { name: "buttonType", type: '"filled" | "outlined" | "plain"', required: false, defaultVal: '"filled"', description: "버튼 스타일 타입" },
              { name: "color", type: '"brandDefault" | "baseContainer" | ...' , required: false, defaultVal: '"brandDefault"', description: "버튼 색상" },
              { name: "size", type: '"small" | "medium" | "large" | "xLarge"', required: false, defaultVal: '"medium"', description: "버튼 크기" },
              { name: "layout", type: '"hug" | "fillWidth" | "fill"', required: false, defaultVal: '"hug"', description: "버튼 레이아웃" },
              { name: "disabled", type: "boolean", required: false, defaultVal: "false", description: "비활성화 상태" },
              { name: "isLoading", type: "boolean", required: false, defaultVal: "false", description: "로딩 상태" },
              { name: "onPress", type: "(event: GestureResponderEvent) => void", required: false, description: "탭 핸들러" },
            ]}
          />
        </Subsection>

        <Subsection title="React Native 전용 Props">
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
            React Native 환경에서 접근성과 테스트를 위해 사용할 수 있는 추가 props입니다.
          </p>
          <PropsTable
            props={[
              { name: "accessibilityLabel", type: "string", required: false, description: "스크린 리더가 읽을 버튼 설명 텍스트" },
              { name: "accessibilityHint", type: "string", required: false, description: "버튼 동작에 대한 추가 힌트" },
              { name: "accessibilityState", type: "AccessibilityState", required: false, description: "{ disabled, busy } 등 접근성 상태" },
              { name: "testID", type: "string", required: false, description: "E2E 테스트용 식별자" },
              { name: "hapticFeedback", type: '"light" | "medium" | "heavy"', required: false, description: "탭 시 햅틱 피드백 강도" },
            ]}
          />
          <CodeBlock code={`// 접근성을 고려한 사용 예시
<Button
  buttonType="filled"
  color="brandDefault"
  size="xLarge"
  layout="fillWidth"
  accessibilityLabel="결제하기"
  accessibilityHint="터치하면 결제가 진행됩니다"
  testID="checkout-button"
  hapticFeedback="medium"
  onPress={handleCheckout}
>
  결제하기
</Button>`} />
        </Subsection>
      </Section>
    </>
  );
}

// ============================================
// Layout Components
// ============================================
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 56 }}>
      <h2
        id={title.toLowerCase().replace(/\s+/g, "-")}
        style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: "var(--text-primary)", letterSpacing: "-0.01em" }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function Subsection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: "var(--text-primary)" }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 13, fontWeight: 500 }}>
      {children}
    </code>
  );
}

function NumberBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 24,
        height: 24,
        backgroundColor: "#374151",
        color: "white",
        borderRadius: "50%",
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      {children}
    </span>
  );
}

function PropsTable({ props }: { props: { name: string; type: string; required: boolean; defaultVal?: string; description: string }[] }) {
  return (
    <div style={{ overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
        <thead>
          <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Name</th>
            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Type</th>
            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Default</th>
            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop, i) => (
            <tr key={prop.name}>
              <td style={{ padding: "12px 16px", borderBottom: i === props.length - 1 ? "none" : "1px solid var(--divider)", verticalAlign: "top" }}>
                <code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 8px", borderRadius: 4, fontSize: 13, fontWeight: 500 }}>{prop.name}</code>
              </td>
              <td style={{ padding: "12px 16px", borderBottom: i === props.length - 1 ? "none" : "1px solid var(--divider)", color: "#6366f1", fontFamily: "monospace", fontSize: 12, verticalAlign: "top", maxWidth: 180, wordBreak: "break-word" }}>{prop.type}</td>
              <td style={{ padding: "12px 16px", borderBottom: i === props.length - 1 ? "none" : "1px solid var(--divider)", color: "var(--text-tertiary)", fontSize: 13, verticalAlign: "top" }}>{prop.defaultVal || "-"}</td>
              <td style={{ padding: "12px 16px", borderBottom: i === props.length - 1 ? "none" : "1px solid var(--divider)", color: "var(--text-secondary)", verticalAlign: "top" }}>{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ============================================
// Usage Guidelines Components
// ============================================
function UsageCard({ situation, desc, variant, buttons, examples }: {
  situation: string;
  desc: string;
  variant: string;
  buttons: string;
  examples: string[];
}) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr auto",
      gap: 16,
      padding: 16,
      backgroundColor: "white",
      borderRadius: 12,
      border: "1px solid var(--divider)",
      alignItems: "center",
    }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>{situation}</span>
          <span style={{
            fontSize: 11,
            padding: "2px 6px",
            backgroundColor: "#dbeafe",
            color: "#1d4ed8",
            borderRadius: 4,
            fontWeight: 500,
          }}>
            {variant}
          </span>
        </div>
        <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0, marginBottom: 6 }}>{desc}</p>
        <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: 0 }}>
          {buttons} | 예시: {examples.join(", ")}
        </p>
      </div>
    </div>
  );
}

function PrincipleCard({ number, title, desc }: {
  number: number;
  title: string;
  desc: string;
}) {
  return (
    <div style={{
      padding: 20,
      backgroundColor: "white",
      borderRadius: 12,
      border: "1px solid var(--divider)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <span style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          backgroundColor: "#e5e7eb",
          color: "#6b7280",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
          fontWeight: 600,
        }}>
          {number}
        </span>
        <span style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)" }}>{title}</span>
      </div>
      <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: 0, lineHeight: 1.6, paddingLeft: 32 }}>{desc}</p>
    </div>
  );
}

function DoLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 13, color: "#22c55e", marginTop: 12, display: "flex", alignItems: "flex-start", gap: 8 }}>
      <span style={{ fontWeight: 700, flexShrink: 0 }}>Do</span>
      <span style={{ color: "var(--text-secondary)" }}>{children}</span>
    </p>
  );
}

function DontLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 13, color: "#ef4444", marginTop: 12, display: "flex", alignItems: "flex-start", gap: 8 }}>
      <span style={{ fontWeight: 700, flexShrink: 0 }}>Don&apos;t</span>
      <span style={{ color: "var(--text-secondary)" }}>{children}</span>
    </p>
  );
}

// ============================================
// Anatomy Diagram
// ============================================
function AnatomyDiagram() {
  return (
    <div style={{
      backgroundColor: "#f5f5f7",
      borderRadius: 16,
      padding: "32px 40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <svg width="320" height="160" viewBox="0 0 320 160">
        {/* Screen side borders (open top) */}
        <line x1="60" y1="0" x2="60" y2="140" stroke="#d1d5db" strokeWidth="2" />
        <line x1="260" y1="0" x2="260" y2="140" stroke="#d1d5db" strokeWidth="2" />

        {/* Screen bottom with rounded corners */}
        <path d="M60 140 L60 150 Q60 160 70 160 L250 160 Q260 160 260 150 L260 140" fill="none" stroke="#d1d5db" strokeWidth="2" />

        {/* Action Area background */}
        <rect x="61" y="0" width="198" height="140" fill="white" />

        {/* Caption */}
        <text x="160" y="28" textAnchor="middle" fill="#6b7280" fontSize="11">변경 사항을 저장하시겠습니까?</text>

        {/* Main button */}
        <rect x="76" y="42" width="168" height="36" rx="8" fill="#2563eb" />
        <text x="160" y="65" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">Main</text>

        {/* Alternative button */}
        <rect x="76" y="86" width="168" height="36" rx="8" fill="#f3f4f6" />
        <text x="160" y="109" textAnchor="middle" fill="#374151" fontSize="12" fontWeight="600">Alternative</text>

        {/* Home indicator */}
        <rect x="130" y="135" width="60" height="4" rx="2" fill="#d1d5db" />

        {/* Number indicators */}
        {/* 1. Caption */}
        <circle cx="30" cy="28" r="12" fill="#374151" />
        <text x="30" y="32" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">1</text>
        <line x1="42" y1="28" x2="72" y2="28" stroke="#374151" strokeWidth="1" strokeDasharray="2,2" />

        {/* 2. Main Button */}
        <circle cx="290" cy="60" r="12" fill="#374151" />
        <text x="290" y="64" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">2</text>
        <line x1="245" y1="60" x2="278" y2="60" stroke="#374151" strokeWidth="1" strokeDasharray="2,2" />

        {/* 3. Alternative Button */}
        <circle cx="290" cy="104" r="12" fill="#374151" />
        <text x="290" y="108" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">3</text>
        <line x1="245" y1="104" x2="278" y2="104" stroke="#374151" strokeWidth="1" strokeDasharray="2,2" />

        {/* 4. Container */}
        <circle cx="30" cy="90" r="12" fill="#374151" />
        <text x="30" y="94" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">4</text>
        <line x1="42" y1="90" x2="60" y2="90" stroke="#374151" strokeWidth="1" strokeDasharray="2,2" />
      </svg>
    </div>
  );
}

// ============================================
// Demo Components (matching Button page styling)
// ============================================
type ActionAreaVariant = "strong" | "neutral" | "compact" | "cancel";
type ButtonVariant = "main" | "sub" | "alternative" | "cancel";
type ButtonSize = "small" | "xLarge";
type ButtonType = "filled" | "outlined";
type ButtonColor = "brandDefault" | "brandSecondary" | "baseContainer" | "successDefault" | "errorDefault" | "kakaoDefault" | "googleDefault";

interface ActionAreaDemoProps {
  variant: ActionAreaVariant;
  children: React.ReactNode;
  caption?: string;
}

function ActionAreaDemo({ variant, children, caption }: ActionAreaDemoProps) {
  // Map page-level variant (includes "cancel") to real ActionArea variant
  const realVariant = variant === "cancel" ? "strong" : variant;

  return (
    <div
      style={{
        borderLeft: "2px solid #d1d5db",
        borderRight: "2px solid #d1d5db",
        borderBottom: "2px solid #d1d5db",
        borderRadius: "0 0 20px 20px",
        overflow: "hidden",
        backgroundColor: "white",
      }}
    >
      {/* Action Area using real component */}
      <ActionArea
        variant={realVariant}
        position="static"
        showGradient={false}
        useSafeArea={false}
        caption={caption}
      >
        {children}
      </ActionArea>

      {/* Home indicator */}
      <div style={{ padding: "8px 0 12px", backgroundColor: "white", display: "flex", justifyContent: "center" }}>
        <div style={{ width: 60, height: 4, backgroundColor: "#d1d5db", borderRadius: 2 }} />
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
  const buttonSize = size === "xLarge" ? "xLarge" : "small";
  const layout = compact ? "hug" as const : "fillWidth" as const;

  switch (variant) {
    case "main":
      return (
        <Button buttonType="filled" color="brandDefault" size={buttonSize} layout={layout}>
          {children}
        </Button>
      );
    case "cancel":
      return (
        <Button buttonType="outlined" color="baseContainer" size={buttonSize} layout="fillWidth">
          {children}
        </Button>
      );
    case "alternative":
      return (
        <Button buttonType="filled" color="baseContainer" size={buttonSize} layout={layout}>
          {children}
        </Button>
      );
    case "sub":
      return (
        <TextButton color="brandDefault">
          {children}
        </TextButton>
      );
  }
}

// IconButton Demo for sub action with icon
function IconButtonDemo({ size }: { size: ButtonSize }) {
  const iconButtonSize = size === "xLarge" ? "large" as const : "small" as const;
  const iconSize = size === "xLarge" ? 20 : 16;

  return (
    <IconButton
      variant="outlined"
      color="baseDefault"
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
type TextButtonColor = "brandDefault" | "baseDefault" | "errorDefault";
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
  color = "brandDefault",
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
function StateButtonDemo({ state, variant, children }: {
  state: "pressed" | "disabled" | "loading";
  variant: "main" | "alternative";
  children: React.ReactNode;
}) {
  const buttonType = variant === "main" ? "filled" as const : "filled" as const;
  const color = variant === "main" ? "brandDefault" as const : "baseContainer" as const;

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

// Accessibility card component
function AccessibilityCard({ icon, title, items }: {
  icon: string;
  title: string;
  items: string[];
}) {
  return (
    <div style={{
      padding: 20,
      backgroundColor: "white",
      borderRadius: 12,
      border: "1px solid var(--divider)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <span style={{ fontSize: 20 }}>{icon}</span>
        <span style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)" }}>{title}</span>
      </div>
      <ul style={{ margin: 0, padding: 0, paddingLeft: 20, listStyle: "disc" }}>
        {items.map((item, i) => (
          <li key={i} style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.8 }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
