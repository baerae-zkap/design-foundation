"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform, highlightCode } from "@/components/PlatformTabs";

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
  const [variant, setVariant] = useState<ActionAreaVariant>("strong");
  const [buttonCombo, setButtonCombo] = useState<"main+alt" | "main+sub" | "main">("main+alt");
  const [hasExtra, setHasExtra] = useState(false);
  const [hasCaption, setHasCaption] = useState(false);
  const [hasBackground, setHasBackground] = useState(false);
  const [codeType, setCodeType] = useState<"rn" | "web">("rn");

  const generateCode = () => {
    const eventHandler = codeType === "rn" ? "onPress={() => {}}" : "onClick={() => {}}";
    const size = variant === "compact" ? "medium" : "xLarge";

    // Determine flex direction based on variant
    const flexDirection = variant === "strong" || variant === "cancel" ? "column" : "row";
    const justifyContent = variant === "compact" ? ", justifyContent: 'flex-end'" : "";
    const alignItems = buttonCombo === "main+sub" && variant === "strong" ? ", alignItems: 'center'" : "";

    // Caption text
    const captionCode = hasCaption ? `  <Text style={{ fontSize: 14, color: '#6b7280', textAlign: 'center', marginBottom: 6 }}>
    변경 사항을 저장하시겠습니까?
  </Text>\n` : "";

    // Main button
    const mainButton = `  <Button
    buttonType="filled"
    color="brandDefault"
    size="${size}"
    layout="fillWidth"
    ${eventHandler}
  >
    Main
  </Button>`;

    // Alternative button
    const altButton = `  <Button
    buttonType="outlined"
    color="baseContainer"
    size="${size}"
    layout="fillWidth"
    ${eventHandler}
  >
    Alternative
  </Button>`;

    // Sub button (plain style)
    const subButton = `  <Button
    buttonType="plain"
    color="brandDefault"
    ${eventHandler}
  >
    Sub
  </Button>`;

    // Build buttons based on combo and variant
    let buttons = "";
    if (buttonCombo === "main+alt") {
      if (variant === "strong" || variant === "cancel") {
        buttons = `${mainButton}\n${altButton}`;
      } else {
        // neutral, compact: Alternative first, then Main
        buttons = `${altButton}\n${mainButton}`;
      }
    } else if (buttonCombo === "main+sub") {
      buttons = `${mainButton}\n${subButton}`;
    } else {
      buttons = mainButton;
    }

    // Wrapper style
    let wrapperStyle = `flexDirection: '${flexDirection}', gap: 10, padding: 20${justifyContent}${alignItems}`;

    // Background wrapper
    if (hasBackground) {
      if (codeType === "rn") {
        return `<LinearGradient
  colors={['rgba(255,255,255,0)', '#f4f4f5']}
  style={{ padding: 20 }}
>
${captionCode}${buttons}
</LinearGradient>`;
      } else {
        wrapperStyle = `flexDirection: '${flexDirection}', gap: 10, padding: 20${justifyContent}${alignItems}, background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, #f4f4f5 100%)'`;
      }
    }

    return `<View style={{ ${wrapperStyle} }}>
${captionCode}${buttons}
</View>`;
  };

  return (
    <div style={{ marginBottom: 32 }}>
      {/* Main Playground Card */}
      <div
        style={{
          borderRadius: 20,
          border: "1px solid #e5e5e5",
          overflow: "hidden",
          backgroundColor: "#fafbfc",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 240px" }}>
          {/* Preview Area */}
          <div
            style={{
              padding: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 280,
              backgroundColor: "#fafbfc",
            }}
          >
            <div style={{ width: 320 }}>
              <ActionAreaDemo
                variant={variant}
                extra={hasExtra}
                caption={hasCaption ? "변경 사항을 저장하시겠습니까?" : undefined}
                background={hasBackground}
              >
                <ActionAreaButtonDemo variant="main" size={variant === "compact" ? "small" : "xLarge"}>
                  Main
                </ActionAreaButtonDemo>
                {buttonCombo === "main+alt" && (
                  <ActionAreaButtonDemo variant="alternative" size={variant === "compact" ? "small" : "xLarge"}>
                    Alternative
                  </ActionAreaButtonDemo>
                )}
                {buttonCombo === "main+sub" && (
                  <ActionAreaButtonDemo variant="sub" size={variant === "compact" ? "small" : "xLarge"}>
                    Sub
                  </ActionAreaButtonDemo>
                )}
              </ActionAreaDemo>
            </div>
          </div>

          {/* Control Panel */}
          <div
            style={{
              padding: 24,
              backgroundColor: "white",
              borderLeft: "1px solid #e5e5e5",
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            {/* Variant */}
            <RadioGroup
              label="Variant"
              options={[
                { value: "strong", label: "Strong" },
                { value: "neutral", label: "Neutral" },
                { value: "compact", label: "Compact" },
                { value: "cancel", label: "Cancel" },
              ]}
              value={variant}
              onChange={(v) => setVariant(v as ActionAreaVariant)}
            />

            {/* Button Combination */}
            <RadioGroup
              label="Buttons"
              options={[
                { value: "main+alt", label: "Main + Alternative" },
                { value: "main+sub", label: "Main + Sub" },
                { value: "main", label: "Main only" },
              ]}
              value={buttonCombo}
              onChange={(v) => setButtonCombo(v as "main+alt" | "main+sub" | "main")}
            />

            {/* Extra */}
            <RadioGroup
              label="Extra"
              options={[
                { value: "false", label: "False" },
                { value: "true", label: "True" },
              ]}
              value={hasExtra ? "true" : "false"}
              onChange={(v) => setHasExtra(v === "true")}
            />

            {/* Caption */}
            <RadioGroup
              label="Caption"
              options={[
                { value: "false", label: "False" },
                { value: "true", label: "True" },
              ]}
              value={hasCaption ? "true" : "false"}
              onChange={(v) => setHasCaption(v === "true")}
            />

            {/* Background */}
            <RadioGroup
              label="Background"
              options={[
                { value: "false", label: "False" },
                { value: "true", label: "True" },
              ]}
              value={hasBackground ? "true" : "false"}
              onChange={(v) => setHasBackground(v === "true")}
            />
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

function RadioGroup({ label, options, value, onChange }: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 500, color: "#9ca3af", marginBottom: 10 }}>
        {label}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {options.map(opt => (
          <label
            key={opt.value}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 500,
              color: "var(--text-primary)",
            }}
            onClick={() => onChange(opt.value)}
          >
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                border: value === opt.value ? "2px solid #3b82f6" : "2px solid #d1d5db",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.15s ease",
              }}
            >
              {value === opt.value && (
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: "#3b82f6",
                  }}
                />
              )}
            </div>
            {opt.label}
          </label>
        ))}
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
          <InlineCode>ActionAreaButton</InlineCode>은 내부적으로 <InlineCode>Button</InlineCode> 컴포넌트를 사용합니다.
          각 variant는 아래와 같이 Button props로 매핑됩니다.
        </p>

        <div style={{ overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)", marginBottom: 32 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>ActionAreaButton variant</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Button props</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Preview</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>
                  <InlineCode>main</InlineCode>
                </td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", fontFamily: "monospace", fontSize: 12, color: "#6366f1" }}>
                  buttonType=&quot;filled&quot; color=&quot;brandDefault&quot; size=&quot;xLarge&quot; layout=&quot;fillWidth&quot;
                </td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>
                  <ButtonDemo buttonType="filled" color="brandDefault" size="small">Main</ButtonDemo>
                </td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>
                  <InlineCode>alternative</InlineCode>
                </td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", fontFamily: "monospace", fontSize: 12, color: "#6366f1" }}>
                  buttonType=&quot;outlined&quot; color=&quot;baseContainer&quot; size=&quot;xLarge&quot; layout=&quot;fillWidth&quot;
                </td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>
                  <ButtonDemo buttonType="outlined" color="baseContainer" size="small">Alternative</ButtonDemo>
                </td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px" }}>
                  <InlineCode>sub</InlineCode>
                </td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 12, color: "#6366f1" }}>
                  buttonType=&quot;plain&quot; color=&quot;brandDefault&quot;
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <PlainButtonDemo>Sub</PlainButtonDemo>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <CodeBlock code={`// ActionAreaButton internally uses Button component:

// variant="main" maps to:
<Button
  buttonType="filled"
  color="brandDefault"
  size="xLarge"
  layout="fillWidth"
>
  Main
</Button>

// variant="alternative" maps to:
<Button
  buttonType="outlined"
  color="baseContainer"
  size="xLarge"
  layout="fillWidth"
>
  Alternative
</Button>

// variant="sub" maps to:
<Button
  buttonType="plain"
  color="brandDefault"
>
  Sub
</Button>`} />
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
            <div style={{ width: 320, display: "flex", flexDirection: "column", gap: 16 }}>
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
            <div style={{ width: 320, display: "flex", flexDirection: "column", gap: 16 }}>
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
            <div style={{ width: 320, display: "flex", flexDirection: "column", gap: 16 }}>
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

        {/* Cancel */}
        <Subsection title="Cancel">
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
            <strong style={{ color: "var(--text-primary)" }}>단일 버튼</strong>. 알림 다이얼로그의 확인이나 단순 닫기에 사용합니다.
            추가 선택이 필요 없는 단순한 확인 동작에 적합합니다.
          </p>
          <PreviewBox>
            <div style={{ width: 320 }}>
              <ActionAreaDemo variant="cancel">
                <ActionAreaButtonDemo variant="main" size="xLarge">확인</ActionAreaButtonDemo>
              </ActionAreaDemo>
            </div>
          </PreviewBox>
        </Subsection>
      </Section>

      {/* Extra Action Area */}
      <Section title="Extra Action Area">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          <InlineCode>extra</InlineCode> prop을 활성화하면 버튼 영역과 상단 콘텐츠 영역을 시각적으로 구분합니다.
          체크박스나 추가 정보 입력이 필요한 경우에 활용합니다.
        </p>
        <PreviewBox>
          <div style={{ width: 320 }}>
            <ActionAreaDemo variant="strong" extra>
              <ActionAreaButtonDemo variant="main" size="xLarge">Main</ActionAreaButtonDemo>
            </ActionAreaDemo>
          </div>
        </PreviewBox>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginTop: 20, marginBottom: 20, lineHeight: 1.6 }}>
          <InlineCode>extraContent</InlineCode> prop을 통해 상단에 커스텀 콘텐츠를 배치할 수 있습니다.
        </p>
        <PreviewBox>
          <div style={{ width: 320 }}>
            <ActionAreaWithExtra />
          </div>
        </PreviewBox>
      </Section>

      {/* Caption */}
      <Section title="Caption">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          <InlineCode>caption</InlineCode> prop을 통해 버튼 상단에 설명 텍스트를 표시할 수 있습니다.
          사용자에게 액션의 결과를 명확히 전달하거나 추가 안내가 필요할 때 사용합니다.
        </p>
        <PreviewBox>
          <div style={{ width: 320 }}>
            <ActionAreaDemo variant="strong" caption="변경 사항을 저장하시겠습니까?">
              <ActionAreaButtonDemo variant="main" size="xLarge">저장</ActionAreaButtonDemo>
              <ActionAreaButtonDemo variant="alternative" size="xLarge">취소</ActionAreaButtonDemo>
            </ActionAreaDemo>
          </div>
        </PreviewBox>
      </Section>

      {/* Background */}
      <Section title="Background">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          <InlineCode>background</InlineCode> prop을 활성화하면 gradient 배경이나 divider가 표시됩니다.
          스크롤 가능한 콘텐츠 위에 ActionArea를 고정할 때 시각적 구분을 위해 사용합니다.
        </p>
        <PreviewBox>
          <div style={{ width: 320 }}>
            <ActionAreaDemo variant="strong" background>
              <ActionAreaButtonDemo variant="main" size="xLarge">Main</ActionAreaButtonDemo>
              <ActionAreaButtonDemo variant="alternative" size="xLarge">Alternative</ActionAreaButtonDemo>
            </ActionAreaDemo>
          </div>
        </PreviewBox>
        <div style={{ marginTop: 16, padding: 16, backgroundColor: "var(--bg-secondary)", borderRadius: 8, fontSize: 13 }}>
          <p style={{ margin: 0, color: "var(--text-secondary)", lineHeight: 1.8 }}>
            <strong style={{ color: "var(--text-primary)" }}>Auto Detection:</strong> Popup, Bottom Sheet 내부에서 사용할 경우,
            스크롤 여부에 따라 background 옵션이 자동으로 조정됩니다.
          </p>
        </div>
      </Section>

      {/* Usage Guidelines */}
      <Section title="Usage Guidelines">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 24, lineHeight: 1.6 }}>
          일관된 UX를 위해 상황에 맞는 variant와 버튼 조합을 선택하세요.
        </p>

        <Subsection title="Recommended Combinations">
          <div style={{ display: "grid", gap: 12 }}>
            <UsageCard
              situation="중요한 결정"
              desc="모달에서 주요 액션과 취소를 제공"
              variant="strong"
              buttons="Main + Alternative"
              examples={["결제 확인", "회원가입", "파일 저장"]}
            />
            <UsageCard
              situation="균등한 선택지"
              desc="두 가지 옵션이 비슷한 중요도를 가질 때"
              variant="neutral"
              buttons="Main + Alternative"
              examples={["확인/취소", "예/아니오"]}
            />
            <UsageCard
              situation="보조 액션 포함"
              desc="주요 액션과 함께 덜 중요한 링크 제공"
              variant="strong"
              buttons="Main + Sub"
              examples={["로그인 + 회원가입", "구매 + 장바구니"]}
            />
            <UsageCard
              situation="단순 확인"
              desc="추가 선택 없이 확인만 필요할 때"
              variant="cancel"
              buttons="Main only"
              examples={["알림 확인", "안내 닫기"]}
            />
            <UsageCard
              situation="인라인 액션"
              desc="카드나 리스트 아이템 내부"
              variant="compact"
              buttons="Main + Alternative"
              examples={["수정/삭제", "승인/반려"]}
            />
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
            <div style={{ width: 320 }}>
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
            <div style={{ width: 320 }}>
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
            <div style={{ width: 320 }}>
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
            <div style={{ width: 320 }}>
              <ActionAreaDemo variant="strong">
                <StateButtonDemo state="loading" variant="main">처리 중...</StateButtonDemo>
                <StateButtonDemo state="disabled" variant="alternative">취소</StateButtonDemo>
              </ActionAreaDemo>
            </div>
          </PreviewBox>
        </Subsection>
      </Section>

      {/* Accessibility */}
      <Section title="Accessibility">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 24, lineHeight: 1.6 }}>
          ActionArea는 모든 사용자가 접근할 수 있도록 접근성 기능을 지원합니다.
        </p>

        <div style={{ display: "grid", gap: 16 }}>
          <AccessibilityCard
            icon="⌨️"
            title="키보드 내비게이션"
            items={[
              "Tab: 버튼 간 포커스 이동",
              "Enter / Space: 포커스된 버튼 실행",
              "포커스 링이 시각적으로 표시됨",
            ]}
          />
          <AccessibilityCard
            icon="🔊"
            title="스크린 리더"
            items={[
              "버튼 역할(role=\"button\")이 자동으로 적용됨",
              "비활성화 상태가 aria-disabled로 전달됨",
              "로딩 상태가 aria-busy로 전달됨",
            ]}
          />
          <AccessibilityCard
            icon="📱"
            title="터치 타겟"
            items={[
              "최소 44x44px 터치 영역 확보 (WCAG 2.5.5)",
              "xLarge 사이즈: 48px 높이로 충분한 터치 영역 제공",
              "버튼 간 최소 10px 간격으로 오터치 방지",
            ]}
          />
          <AccessibilityCard
            icon="🎨"
            title="색상 대비"
            items={[
              "Main 버튼: 4.5:1 이상 대비율 확보",
              "텍스트와 배경 간 WCAG AA 기준 충족",
              "비활성화 상태도 구분 가능한 대비 유지",
            ]}
          />
        </div>

        <div style={{ marginTop: 24, padding: 16, backgroundColor: "var(--bg-secondary)", borderRadius: 8 }}>
          <p style={{ margin: 0, fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.8 }}>
            <strong style={{ color: "var(--text-primary)" }}>React Native 접근성:</strong> accessibilityLabel, accessibilityHint,
            accessibilityState props를 통해 네이티브 접근성 기능을 활용하세요.
          </p>
        </div>
      </Section>

      {/* Design Tokens */}
      <Section title="Design Tokens">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          ActionArea 컴포넌트에 적용된 디자인 토큰입니다.
        </p>

        <div style={{ overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Property</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Token</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Container Padding</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><InlineCode>vars.spacing[5]</InlineCode></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>20px</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Button Gap (Strong)</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><InlineCode>vars.spacing[2.5]</InlineCode></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>10px</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Button Gap (Neutral/Compact)</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><InlineCode>vars.spacing[2.5]</InlineCode></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>10px</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Caption Font Size</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><InlineCode>typography.sm</InlineCode></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>14px</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", color: "var(--text-primary)" }}>Button Height (xLarge)</td>
                <td style={{ padding: "12px 16px" }}><InlineCode>48px</InlineCode></td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>48px</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>
    </>
  );
}

// ============================================
// Web Tab Content
// ============================================
function WebContent() {
  return (
    <>
      <Section title="Import">
        <CodeBlock code={`import { Button } from '@zkap/design-system';`} />
      </Section>

      <Section title="Strong Variant">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
          세로 배치, Main 버튼이 위에 위치합니다.
        </p>
        <PreviewBox>
          <div style={{ width: 320, display: "flex", flexDirection: "column", gap: 16 }}>
            <ActionAreaDemo variant="strong">
              <ActionAreaButtonDemo variant="main" size="xLarge">Main</ActionAreaButtonDemo>
              <ActionAreaButtonDemo variant="alternative" size="xLarge">Alternative</ActionAreaButtonDemo>
            </ActionAreaDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<View style={{ flexDirection: 'column', gap: 10, padding: 20 }}>
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
          <div style={{ width: 320 }}>
            <ActionAreaDemo variant="neutral">
              <ActionAreaButtonDemo variant="alternative" size="xLarge">Alternative</ActionAreaButtonDemo>
              <ActionAreaButtonDemo variant="main" size="xLarge">Main</ActionAreaButtonDemo>
            </ActionAreaDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<View style={{ flexDirection: 'row', gap: 10, padding: 20 }}>
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
          <div style={{ width: 320 }}>
            <ActionAreaDemo variant="compact">
              <ActionAreaButtonDemo variant="sub" size="small">Sub</ActionAreaButtonDemo>
              <ActionAreaButtonDemo variant="main" size="small">Main</ActionAreaButtonDemo>
            </ActionAreaDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<View style={{ flexDirection: 'row', gap: 10, justifyContent: 'flex-end', padding: 20 }}>
  <Button
    buttonType="plain"
    color="brandDefault"
    onClick={() => {}}
  >
    Sub
  </Button>
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

      <Section title="Cancel Variant">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
          단일 버튼으로 확인/닫기 동작에 사용합니다.
        </p>
        <PreviewBox>
          <div style={{ width: 320 }}>
            <ActionAreaDemo variant="cancel">
              <ActionAreaButtonDemo variant="main" size="xLarge">확인</ActionAreaButtonDemo>
            </ActionAreaDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<View style={{ padding: 20 }}>
  <Button
    buttonType="filled"
    color="brandDefault"
    size="xLarge"
    layout="fillWidth"
    onClick={() => {}}
  >
    확인
  </Button>
</View>`} />
      </Section>

      <Section title="With Caption">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
          버튼 상단에 안내 텍스트를 추가합니다.
        </p>
        <PreviewBox>
          <div style={{ width: 320 }}>
            <ActionAreaDemo variant="strong" caption="변경 사항을 저장하시겠습니까?">
              <ActionAreaButtonDemo variant="main" size="xLarge">저장</ActionAreaButtonDemo>
              <ActionAreaButtonDemo variant="alternative" size="xLarge">취소</ActionAreaButtonDemo>
            </ActionAreaDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<View style={{ flexDirection: 'column', gap: 10, padding: 20 }}>
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

      <Section title="With Background">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
          스크롤 콘텐츠 위에 고정할 때 gradient 배경을 추가합니다.
        </p>
        <PreviewBox>
          <div style={{ width: 320 }}>
            <ActionAreaDemo variant="strong" background>
              <ActionAreaButtonDemo variant="main" size="xLarge">Main</ActionAreaButtonDemo>
            </ActionAreaDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<View style={{
  padding: 20,
  background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, #f4f4f5 100%)'
}}>
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

      <Section title="Main + Sub Combination">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
          주요 액션과 보조 링크를 함께 제공합니다.
        </p>
        <PreviewBox>
          <div style={{ width: 320 }}>
            <ActionAreaDemo variant="strong">
              <ActionAreaButtonDemo variant="main" size="xLarge">로그인</ActionAreaButtonDemo>
              <ActionAreaButtonDemo variant="sub" size="xLarge">회원가입</ActionAreaButtonDemo>
            </ActionAreaDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<View style={{ flexDirection: 'column', gap: 10, padding: 20, alignItems: 'center' }}>
  <Button
    buttonType="filled"
    color="brandDefault"
    size="xLarge"
    layout="fillWidth"
    onClick={() => {}}
  >
    로그인
  </Button>
  <Button
    buttonType="plain"
    color="brandDefault"
    onClick={() => {}}
  >
    회원가입
  </Button>
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
              { name: "onClick", type: "() => void", required: false, description: "클릭 핸들러" },
            ]}
          />
        </Subsection>
      </Section>
    </>
  );
}

// ============================================
// React Native Tab Content
// ============================================
function RNContent() {
  return (
    <>
      <Section title="Import">
        <CodeBlock code={`import { Button } from '@zkap/design-system';
import { View, Text } from 'react-native';`} />
      </Section>

      <Section title="Strong Variant">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
          세로 배치, Main 버튼이 위에 위치합니다.
        </p>
        <PreviewBox>
          <div style={{ width: 320, display: "flex", flexDirection: "column", gap: 16 }}>
            <ActionAreaDemo variant="strong">
              <ActionAreaButtonDemo variant="main" size="xLarge">Main</ActionAreaButtonDemo>
              <ActionAreaButtonDemo variant="alternative" size="xLarge">Alternative</ActionAreaButtonDemo>
            </ActionAreaDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<View style={{ flexDirection: 'column', gap: 10, padding: 20 }}>
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
          <div style={{ width: 320 }}>
            <ActionAreaDemo variant="neutral">
              <ActionAreaButtonDemo variant="alternative" size="xLarge">Alternative</ActionAreaButtonDemo>
              <ActionAreaButtonDemo variant="main" size="xLarge">Main</ActionAreaButtonDemo>
            </ActionAreaDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<View style={{ flexDirection: 'row', gap: 10, padding: 20 }}>
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
          <div style={{ width: 320 }}>
            <ActionAreaDemo variant="compact">
              <ActionAreaButtonDemo variant="sub" size="small">Sub</ActionAreaButtonDemo>
              <ActionAreaButtonDemo variant="main" size="small">Main</ActionAreaButtonDemo>
            </ActionAreaDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<View style={{ flexDirection: 'row', gap: 10, justifyContent: 'flex-end', padding: 20 }}>
  <Button
    buttonType="plain"
    color="brandDefault"
    onPress={() => {}}
  >
    Sub
  </Button>
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

      <Section title="Cancel Variant">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
          단일 버튼으로 확인/닫기 동작에 사용합니다.
        </p>
        <PreviewBox>
          <div style={{ width: 320 }}>
            <ActionAreaDemo variant="cancel">
              <ActionAreaButtonDemo variant="main" size="xLarge">확인</ActionAreaButtonDemo>
            </ActionAreaDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<View style={{ padding: 20 }}>
  <Button
    buttonType="filled"
    color="brandDefault"
    size="xLarge"
    layout="fillWidth"
    onPress={() => {}}
  >
    확인
  </Button>
</View>`} />
      </Section>

      <Section title="With Caption">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
          버튼 상단에 안내 텍스트를 추가합니다.
        </p>
        <PreviewBox>
          <div style={{ width: 320 }}>
            <ActionAreaDemo variant="strong" caption="변경 사항을 저장하시겠습니까?">
              <ActionAreaButtonDemo variant="main" size="xLarge">저장</ActionAreaButtonDemo>
              <ActionAreaButtonDemo variant="alternative" size="xLarge">취소</ActionAreaButtonDemo>
            </ActionAreaDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<View style={{ flexDirection: 'column', gap: 10, padding: 20 }}>
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

      <Section title="With Background">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
          스크롤 콘텐츠 위에 고정할 때 gradient 배경을 추가합니다.
        </p>
        <PreviewBox>
          <div style={{ width: 320 }}>
            <ActionAreaDemo variant="strong" background>
              <ActionAreaButtonDemo variant="main" size="xLarge">Main</ActionAreaButtonDemo>
            </ActionAreaDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`import LinearGradient from 'react-native-linear-gradient';

<LinearGradient
  colors={['rgba(255,255,255,0)', '#f4f4f5']}
  style={{ padding: 20 }}
>
  <Button
    buttonType="filled"
    color="brandDefault"
    size="xLarge"
    layout="fillWidth"
    onPress={() => {}}
  >
    Main
  </Button>
</LinearGradient>`} />
      </Section>

      <Section title="Main + Sub Combination">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
          주요 액션과 보조 링크를 함께 제공합니다.
        </p>
        <PreviewBox>
          <div style={{ width: 320 }}>
            <ActionAreaDemo variant="strong">
              <ActionAreaButtonDemo variant="main" size="xLarge">로그인</ActionAreaButtonDemo>
              <ActionAreaButtonDemo variant="sub" size="xLarge">회원가입</ActionAreaButtonDemo>
            </ActionAreaDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<View style={{ flexDirection: 'column', gap: 10, padding: 20, alignItems: 'center' }}>
  <Button
    buttonType="filled"
    color="brandDefault"
    size="xLarge"
    layout="fillWidth"
    onPress={() => {}}
  >
    로그인
  </Button>
  <Button
    buttonType="plain"
    color="brandDefault"
    onPress={() => {}}
  >
    회원가입
  </Button>
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
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <span style={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          backgroundColor: "var(--brand-primary)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 13,
          fontWeight: 600,
        }}>
          {number}
        </span>
        <span style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)" }}>{title}</span>
      </div>
      <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: 0, lineHeight: 1.6 }}>{desc}</p>
    </div>
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
      padding: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <svg width="360" height="200" viewBox="0 0 360 200">
        {/* Container background */}
        <rect x="30" y="30" width="300" height="140" rx="12" fill="white" stroke="#e5e7eb" strokeWidth="1" />

        {/* Caption area */}
        <text x="180" y="60" textAnchor="middle" fill="#6b7280" fontSize="13">변경 사항을 저장하시겠습니까?</text>

        {/* Main button */}
        <rect x="50" y="80" width="260" height="36" rx="8" fill="#2563eb" />
        <text x="180" y="104" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">Main</text>

        {/* Alternative button */}
        <rect x="50" y="124" width="260" height="36" rx="8" fill="white" stroke="#cbd5e1" strokeWidth="1" />
        <text x="180" y="148" textAnchor="middle" fill="#334155" fontSize="14" fontWeight="600">Alternative</text>

        {/* Number indicators */}
        <circle cx="20" cy="55" r="12" fill="#374151" />
        <text x="20" y="59" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">1</text>
        <line x1="32" y1="55" x2="50" y2="55" stroke="#374151" strokeWidth="1" />

        <circle cx="340" cy="98" r="12" fill="#374151" />
        <text x="340" y="102" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">2</text>
        <line x1="310" y1="98" x2="328" y2="98" stroke="#374151" strokeWidth="1" />

        <circle cx="340" cy="142" r="12" fill="#374151" />
        <text x="340" y="146" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">3</text>
        <line x1="310" y1="142" x2="328" y2="142" stroke="#374151" strokeWidth="1" />

        <circle cx="20" cy="100" r="12" fill="#374151" />
        <text x="20" y="104" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">4</text>
        <line x1="32" y1="100" x2="50" y2="80" stroke="#374151" strokeWidth="1" />
      </svg>
    </div>
  );
}

// ============================================
// Demo Components (matching Button page styling)
// ============================================
type ActionAreaVariant = "strong" | "neutral" | "compact" | "cancel";
type ButtonVariant = "main" | "sub" | "alternative";
type ButtonSize = "small" | "xLarge";
type ButtonType = "filled" | "outlined";
type ButtonColor = "brandDefault" | "brandSecondary" | "baseContainer" | "successDefault" | "errorDefault" | "kakaoDefault" | "googleDefault";

interface ActionAreaDemoProps {
  variant: ActionAreaVariant;
  children: React.ReactNode;
  extra?: boolean;
  caption?: string;
  background?: boolean;
}

function ActionAreaDemo({ variant, children, extra, caption, background }: ActionAreaDemoProps) {
  const getLayout = () => {
    switch (variant) {
      case "strong":
      case "cancel":
        return { flexDirection: "column" as const, gap: 10 };
      case "neutral":
        return { flexDirection: "row" as const, gap: 10 };
      case "compact":
        return { flexDirection: "row" as const, gap: 10, justifyContent: "flex-end" as const };
    }
  };

  const layout = getLayout();

  return (
    <div
      style={{
        padding: 20,
        backgroundColor: background ? "transparent" : "white",
        background: background ? "linear-gradient(180deg, rgba(255,255,255,0) 0%, #f4f4f5 100%)" : "white",
        borderRadius: 16,
        border: "1px solid #e5e7eb",
        borderTop: extra ? "3px solid #d1d5db" : "1px solid #e5e7eb",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      {caption && (
        <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 16, textAlign: "center", lineHeight: 1.5 }}>
          {caption}
        </p>
      )}
      <div style={{ display: "flex", ...layout }}>
        {children}
      </div>
    </div>
  );
}

function ActionAreaWithExtra() {
  const [checked, setChecked] = useState(false);

  return (
    <div
      style={{
        padding: 20,
        backgroundColor: "white",
        borderRadius: 16,
        border: "1px solid #e5e7eb",
        borderTop: "3px solid #d1d5db",
      }}
    >
      {/* Extra Content */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          style={{ width: 18, height: 18, accentColor: "#2563eb" }}
        />
        <label style={{ fontSize: 14, color: "#18181b" }}>약관에 동의합니다.</label>
      </div>
      {/* Buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <ActionAreaButtonDemo variant="main" size="xLarge">동의하고 계속하기</ActionAreaButtonDemo>
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

function ActionAreaButtonDemo({ variant, size, children }: ActionAreaButtonDemoProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Size heights matching Button component
  const sizeHeights: Record<ButtonSize, number> = { small: 36, xLarge: 48 };

  // Color definitions matching Button component exactly
  const getStyles = () => {
    const height = sizeHeights[size];
    const fontSize = size === "xLarge" ? 15 : 14;

    const baseStyles = {
      height,
      padding: "10px 16px",
      fontSize,
      fontWeight: 600,
      borderRadius: 8,
      cursor: "pointer",
      transition: "all 150ms ease",
      transform: isPressed ? "scale(0.98)" : "scale(1)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: variant === "sub" ? "auto" : "100%",
      flex: variant === "sub" ? "0 0 auto" : 1,
    };

    switch (variant) {
      case "main":
        // Button: buttonType="filled" color="brandDefault"
        return {
          ...baseStyles,
          backgroundColor: isPressed ? "#1e40af" : isHovered ? "#1d4ed8" : "#2563eb",
          color: "white",
          border: "none",
        };
      case "alternative":
        // Button: buttonType="outlined" color="baseContainer"
        return {
          ...baseStyles,
          backgroundColor: isPressed ? "#f1f5f9" : isHovered ? "#f8fafc" : "white",
          color: "#334155",
          border: "1px solid #cbd5e1",
        };
      case "sub":
        // Button: buttonType="plain" color="brandDefault"
        return {
          ...baseStyles,
          backgroundColor: "transparent",
          color: isPressed ? "#1e40af" : isHovered ? "#1d4ed8" : "#2563eb",
          border: "none",
        };
    }
  };

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      style={getStyles()}
    >
      {children}
    </button>
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
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const sizeHeights: Record<string, number> = { small: 36, medium: 40, large: 44, xLarge: 48 };

  const getColors = () => {
    if (disabled && !isLoading) {
      return { bg: "#e2e8f0", text: "#94a3b8", border: "#e2e8f0" };
    }

    const colorMap: Record<ButtonColor, { bg: string; bgHover: string; bgPressed: string; text: string; border: string }> = {
      brandDefault: { bg: "#2563eb", bgHover: "#1d4ed8", bgPressed: "#1e40af", text: "white", border: "#2563eb" },
      brandSecondary: { bg: "#dbeafe", bgHover: "#bfdbfe", bgPressed: "#93c5fd", text: "#2563eb", border: "#93c5fd" },
      baseContainer: { bg: "#f1f5f9", bgHover: "#e2e8f0", bgPressed: "#cbd5e1", text: "#334155", border: "#cbd5e1" },
      successDefault: { bg: "#22c55e", bgHover: "#16a34a", bgPressed: "#15803d", text: "white", border: "#22c55e" },
      errorDefault: { bg: "#ef4444", bgHover: "#dc2626", bgPressed: "#b91c1c", text: "white", border: "#ef4444" },
      kakaoDefault: { bg: "#FEE500", bgHover: "#E8D000", bgPressed: "#D4BF00", text: "#191919", border: "#FEE500" },
      googleDefault: { bg: "white", bgHover: "#f8fafc", bgPressed: "#f1f5f9", text: "#334155", border: "#d1d5db" },
    };

    const c = colorMap[color];
    const getBg = () => {
      if (isPressed) return c.bgPressed;
      if (isHovered) return c.bgHover;
      return c.bg;
    };

    if (buttonType === "filled") {
      return { bg: getBg(), text: c.text, border: "transparent" };
    } else {
      const getOutlinedText = () => {
        if (color === "brandDefault" || color === "brandSecondary") return "#2563eb";
        if (color === "successDefault") return "#16a34a";
        if (color === "errorDefault") return "#dc2626";
        return "#334155";
      };
      return {
        bg: isPressed ? "#f1f5f9" : isHovered ? "#f8fafc" : "white",
        text: getOutlinedText(),
        border: c.border,
      };
    }
  };

  const colors = getColors();

  return (
    <button
      disabled={disabled || isLoading}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
      onMouseDown={() => !disabled && !isLoading && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      style={{
        padding: "10px 16px",
        fontSize: size === "xLarge" ? 15 : 14,
        fontWeight: 600,
        backgroundColor: colors.bg,
        color: colors.text,
        border: buttonType === "outlined" ? `1px solid ${colors.border}` : "none",
        borderRadius: 8,
        cursor: disabled || isLoading ? "not-allowed" : "pointer",
        transition: "all 150ms ease",
        transform: isPressed ? "scale(0.98)" : "scale(1)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        width: layout === "fillWidth" ? "100%" : "auto",
        minWidth: 80,
        height: sizeHeights[size],
      }}
    >
      {children}
    </button>
  );
}

// Plain button demo for sub variant display
function PlainButtonDemo({ children }: { children: React.ReactNode }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      style={{
        padding: "8px 12px",
        fontSize: 14,
        fontWeight: 600,
        backgroundColor: "transparent",
        color: isPressed ? "#1e40af" : isHovered ? "#1d4ed8" : "#2563eb",
        border: "none",
        borderRadius: 8,
        cursor: "pointer",
        transition: "all 150ms ease",
      }}
    >
      {children}
    </button>
  );
}

// State demo button for States section
function StateButtonDemo({ state, variant, children }: {
  state: "pressed" | "disabled" | "loading";
  variant: "main" | "alternative";
  children: React.ReactNode;
}) {
  const getStyles = () => {
    const baseStyles = {
      height: 48,
      padding: "10px 16px",
      fontSize: 15,
      fontWeight: 600,
      borderRadius: 8,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      width: "100%",
      flex: 1,
      transition: "all 150ms ease",
    };

    if (state === "disabled") {
      return {
        ...baseStyles,
        backgroundColor: "#e2e8f0",
        color: "#94a3b8",
        border: variant === "alternative" ? "1px solid #e2e8f0" : "none",
        cursor: "not-allowed",
      };
    }

    if (state === "loading") {
      return {
        ...baseStyles,
        backgroundColor: variant === "main" ? "#2563eb" : "white",
        color: variant === "main" ? "white" : "#334155",
        border: variant === "alternative" ? "1px solid #cbd5e1" : "none",
        cursor: "wait",
        opacity: 0.8,
      };
    }

    // pressed state
    if (variant === "main") {
      return {
        ...baseStyles,
        backgroundColor: "#1e40af",
        color: "white",
        border: "none",
        transform: "scale(0.98)",
        cursor: "pointer",
      };
    } else {
      return {
        ...baseStyles,
        backgroundColor: "#f1f5f9",
        color: "#334155",
        border: "1px solid #cbd5e1",
        transform: "scale(0.98)",
        cursor: "pointer",
      };
    }
  };

  return (
    <button style={getStyles()} disabled={state === "disabled" || state === "loading"}>
      {state === "loading" && (
        <svg width="16" height="16" viewBox="0 0 24 24" style={{ animation: "spin 1s linear infinite" }}>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="32" strokeLinecap="round" />
        </svg>
      )}
      {children}
    </button>
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
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
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
