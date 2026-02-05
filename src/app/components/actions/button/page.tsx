"use client";

import { useState, useRef, useEffect } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform, highlightCode } from "@/components/PlatformTabs";

// GitHub source URLs (design-foundation repo)
const GITHUB_BASE = "https://github.com/baerae-zkap/design-foundation/blob/main/src/source/components/Button";
const BUTTON_SOURCE = `${GITHUB_BASE}/Button.tsx`;
const BUTTON_STYLES = `${GITHUB_BASE}/Button.css.ts`;

export default function ButtonPage() {
  return (
    <div style={{ maxWidth: 720 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Actions" },
          { label: "Button" },
        ]}
      />

      {/* Header */}
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
        Button
      </h1>
      <p style={{ fontSize: 15, color: "var(--text-secondary)", marginBottom: 32, lineHeight: 1.6 }}>
        작업을 수행하는데 사용되는 클릭 가능한 요소입니다. 폼 제출, 다이얼로그 상호작용, 작업 취소 및 삭제 등의 액션을 트리거합니다.
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
  const [color, setColor] = useState<ButtonColor>("brandDefault");
  const [size, setSize] = useState<ButtonSize>("medium");
  const [leadingIcon, setLeadingIcon] = useState(false);
  const [trailingIcon, setTrailingIcon] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [codeType, setCodeType] = useState<"rn" | "web">("rn");

  const generateCode = () => {
    const props = [];
    if (buttonType !== "filled") props.push(`buttonType="${buttonType}"`);
    if (color !== "brandDefault") props.push(`color="${color}"`);
    if (size !== "medium") props.push(`size="${size}"`);
    if (leadingIcon) props.push(`leftContent={<Icon name="plus" />}`);
    if (trailingIcon) props.push(`rightContent={<Icon name="chevron-right" />}`);
    if (isLoading) props.push("isLoading");
    if (disabled) props.push("disabled");

    const propsStr = props.length > 0 ? `\n  ${props.join("\n  ")}\n` : " ";

    if (codeType === "rn") {
      return `<Button${propsStr.length > 1 ? propsStr : " "}onPress={() => {}}>
  Button
</Button>`;
    } else {
      return `<Button${propsStr.length > 1 ? propsStr : " "}onClick={() => {}}>
  Button
</Button>`;
    }
  };

  const colorLabels: Record<ButtonColor, string> = {
    brandDefault: "Brand Primary",
    brandSecondary: "Brand Secondary",
    baseContainer: "Base",
    successDefault: "Success",
    errorDefault: "Error",
    kakaoDefault: "Kakao",
    googleDefault: "Google",
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
              padding: 24,
              backgroundColor: "white",
              borderLeft: "1px solid #e5e5e5",
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            {/* Type */}
            <RadioGroup
              label="Type"
              options={[
                { value: "filled", label: "Filled" },
                { value: "outlined", label: "Outlined" },
              ]}
              value={buttonType}
              onChange={(v) => setButtonType(v as ButtonType)}
            />

            {/* Color */}
            <RadioGroup
              label="Color"
              options={[
                { value: "brandDefault", label: colorLabels.brandDefault },
                { value: "brandSecondary", label: colorLabels.brandSecondary },
                { value: "baseContainer", label: colorLabels.baseContainer },
                { value: "successDefault", label: colorLabels.successDefault },
                { value: "errorDefault", label: colorLabels.errorDefault },
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
      {/* Anatomy */}
      <Section title="Anatomy">
        <AnatomyDiagram />
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 24,
          marginTop: 20,
          fontSize: 14,
          fontWeight: 500,
          color: "var(--text-primary)",
        }}>
          <div>1. Leading Icon</div>
          <div style={{ textAlign: "center" }}>2. Label</div>
          <div style={{ textAlign: "right" }}>3. Trailing Icon</div>
        </div>
      </Section>

      {/* Usage Guidelines */}
      <Section title="Usage Guidelines">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 24, lineHeight: 1.6 }}>
          일관된 UX를 위해 아래 권고 조합을 따르세요. 모든 조합이 가능하지만, <strong style={{ color: "var(--text-primary)" }}>권장 패턴</strong>을 사용하면 사용자가 예측 가능한 경험을 할 수 있습니다.
        </p>

        {/* Recommended Combinations */}
        <Subsection title="Recommended Combinations">
          <div style={{ display: "grid", gap: 12 }}>
            <UsageCard
              situation="Primary CTA"
              desc="화면에서 가장 중요한 액션"
              buttonType="filled"
              color="brandDefault"
              examples={["결제하기", "가입하기", "제출"]}
            />
            <UsageCard
              situation="Secondary CTA"
              desc="두 번째로 중요한 액션"
              buttonType="filled"
              color="brandSecondary"
              examples={["다음", "확인", "저장"]}
            />
            <UsageCard
              situation="Cancel / Dismiss"
              desc="취소, 닫기 등 보조 액션"
              buttonType="outlined"
              color="baseContainer"
              examples={["취소", "닫기", "나중에"]}
            />
            <UsageCard
              situation="Destructive Action"
              desc="되돌릴 수 없는 위험한 액션"
              buttonType="filled"
              color="errorDefault"
              examples={["삭제", "탈퇴", "초기화"]}
            />
            <UsageCard
              situation="Success / Complete"
              desc="긍정적 완료 액션"
              buttonType="filled"
              color="successDefault"
              examples={["완료", "승인", "확정"]}
            />
          </div>
        </Subsection>

        {/* Design Principles */}
        <Subsection title="Design Principles">
          <div style={{ display: "grid", gap: 16 }}>
            <PrincipleCard
              number={1}
              title="화면당 Primary CTA는 1개"
              desc="brandDefault + filled 조합은 화면당 1개만 사용하세요. 여러 액션이 있다면 나머지는 brandSecondary 또는 outlined를 사용합니다."
              doExample={
                <div style={{ display: "flex", gap: 8 }}>
                  <ButtonDemo buttonType="filled" color="brandDefault" size="small">결제하기</ButtonDemo>
                  <ButtonDemo buttonType="outlined" color="baseContainer" size="small">취소</ButtonDemo>
                </div>
              }
              dontExample={
                <div style={{ display: "flex", gap: 8 }}>
                  <ButtonDemo buttonType="filled" color="brandDefault" size="small">결제하기</ButtonDemo>
                  <ButtonDemo buttonType="filled" color="brandDefault" size="small">장바구니</ButtonDemo>
                </div>
              }
            />
            <PrincipleCard
              number={2}
              title="버튼 계층 구조 유지"
              desc="가장 중요한 액션에 가장 강조된 스타일을 사용하세요. 취소/닫기는 항상 outlined + baseContainer입니다."
              hierarchy={["brandDefault (filled)", "brandSecondary (filled)", "outlined", "TextButton"]}
            />
            <PrincipleCard
              number={3}
              title="색상의 의미를 지키세요"
              desc="errorDefault는 위험한 액션에만, successDefault는 긍정적 완료에만 사용하세요. 일반 액션에 semantic 색상을 사용하지 마세요."
            />
          </div>
        </Subsection>

        {/* Button Placement */}
        <Subsection title="Button Placement">
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
            다이얼로그나 폼에서 버튼 배치 순서:
          </p>
          <div style={{ display: "grid", gap: 16 }}>
            <PlacementExample
              title="일반 다이얼로그"
              left={{ type: "outlined", color: "baseContainer", label: "취소" }}
              right={{ type: "filled", color: "brandDefault", label: "확인" }}
              note="확인(Primary)이 오른쪽"
            />
            <PlacementExample
              title="위험 액션 확인"
              left={{ type: "outlined", color: "baseContainer", label: "취소" }}
              right={{ type: "filled", color: "errorDefault", label: "삭제" }}
              note="위험 액션이 오른쪽"
            />
          </div>
        </Subsection>
      </Section>

      {/* Variants */}
      <Section title="Variants">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          <InlineCode>buttonType</InlineCode> prop을 통해 2가지 variant를 사용할 수 있습니다. 각 variant는 시각적 강조 수준이 다릅니다.
        </p>

        <Subsection title="Filled">
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
            배경색이 채워진 버튼입니다. <strong style={{ color: "var(--text-primary)" }}>가장 높은 시각적 강조</strong>가 필요한 주요 액션에 사용합니다. 화면당 하나의 Primary filled 버튼만 사용하는 것을 권장합니다.
          </p>
          <PreviewBox>
            <div style={{ display: "flex", gap: 16 }}>
              <ButtonDemo buttonType="filled" color="brandDefault">Brand Default</ButtonDemo>
              <ButtonDemo buttonType="filled" color="baseContainer">Base Container</ButtonDemo>
            </div>
          </PreviewBox>
        </Subsection>

        <Subsection title="Outlined">
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
            테두리만 있는 버튼입니다. <strong style={{ color: "var(--text-primary)" }}>중간 수준의 강조</strong>가 필요한 보조 액션에 사용합니다. Filled 버튼과 함께 배치하여 계층을 표현합니다.
          </p>
          <PreviewBox>
            <div style={{ display: "flex", gap: 16 }}>
              <ButtonDemo buttonType="outlined" color="brandDefault">Brand Default</ButtonDemo>
              <ButtonDemo buttonType="outlined" color="baseContainer">Base Container</ButtonDemo>
            </div>
          </PreviewBox>
        </Subsection>
      </Section>

      {/* Color */}
      <Section title="Color">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          <InlineCode>color</InlineCode> prop을 통해 버튼의 의미와 목적에 맞는 색상을 지정합니다.
        </p>

        <div style={{ marginBottom: 24, overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Color</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>용도</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>예시</th>
              </tr>
            </thead>
            <tbody>
              <ColorTableRow color="brandDefault" desc="브랜드 주요 색상. 가장 중요한 CTA에 사용" example="확인, 저장, 제출" />
              <ColorTableRow color="brandSecondary" desc="브랜드 보조 색상. 약한 강조의 브랜드 액션" example="임시저장, 미리보기" />
              <ColorTableRow color="baseContainer" desc="중립적 색상. 취소, 닫기 등 보조 액션" example="취소, 닫기, 돌아가기" />
              <ColorTableRow color="successDefault" desc="성공/긍정적 액션" example="완료, 승인" />
              <ColorTableRow color="errorDefault" desc="위험/삭제 액션 (Destructive)" example="삭제, 탈퇴" isLast />
            </tbody>
          </table>
        </div>

        <PreviewBox>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <ButtonDemo buttonType="filled" color="brandDefault">Brand</ButtonDemo>
            <ButtonDemo buttonType="filled" color="brandSecondary">Secondary</ButtonDemo>
            <ButtonDemo buttonType="filled" color="baseContainer">Base</ButtonDemo>
            <ButtonDemo buttonType="filled" color="successDefault">Success</ButtonDemo>
            <ButtonDemo buttonType="filled" color="errorDefault">Error</ButtonDemo>
          </div>
        </PreviewBox>

        <Subsection title="Social Login Colors">
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
            소셜 로그인 버튼을 위한 전용 색상입니다.
          </p>
          <PreviewBox>
            <div style={{ display: "flex", gap: 12, flexDirection: "column", width: 280 }}>
              <ButtonDemo buttonType="filled" color="kakaoDefault" layout="fillWidth">
                <KakaoIcon />
                카카오로 시작하기
              </ButtonDemo>
              <ButtonDemo buttonType="outlined" color="googleDefault" layout="fillWidth">
                <GoogleIcon />
                Google로 시작하기
              </ButtonDemo>
            </div>
          </PreviewBox>
        </Subsection>
      </Section>

      {/* Size */}
      <Section title="Size">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          너비는 자유롭게 커스터마이징할 수 있으나 <strong style={{ color: "var(--text-primary)" }}>높이는 고정</strong>하여 사용합니다. 일관된 터치 영역과 시각적 안정성을 위해 높이를 임의로 변경하지 않습니다.
        </p>

        <div style={{ marginBottom: 24, overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Size</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Height</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Font Size</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>용도</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><InlineCode>small</InlineCode></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>36px</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>14px (sm)</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>밀도 높은 UI, 테이블 내 액션</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><InlineCode>medium</InlineCode></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>40px</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>14px (sm)</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>기본값, 대부분의 상황</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><InlineCode>large</InlineCode></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>44px</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>14px (sm)</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>강조가 필요한 CTA</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px" }}><InlineCode>xLarge</InlineCode></td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>48px</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>16px (base)</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>모달/시트 하단, 주요 CTA</td>
              </tr>
            </tbody>
          </table>
        </div>

        <PreviewBox>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
            <div style={{ textAlign: "center" }}>
              <ButtonDemo buttonType="filled" color="brandDefault" size="small">Small</ButtonDemo>
              <p style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 8 }}>36px</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <ButtonDemo buttonType="filled" color="brandDefault" size="medium">Medium</ButtonDemo>
              <p style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 8 }}>40px</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <ButtonDemo buttonType="filled" color="brandDefault" size="large">Large</ButtonDemo>
              <p style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 8 }}>44px</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <ButtonDemo buttonType="filled" color="brandDefault" size="xLarge">X-Large</ButtonDemo>
              <p style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 8 }}>48px</p>
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* Layout */}
      <Section title="Layout">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          <InlineCode>layout</InlineCode> prop을 통해 버튼의 너비 동작을 제어합니다.
        </p>

        <div style={{ marginBottom: 24, overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Layout</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>동작</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><InlineCode>hug</InlineCode> (기본값)</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>콘텐츠 크기에 맞춤 (flex: 0)</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><InlineCode>fillWidth</InlineCode></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>부모의 전체 너비에 맞춤 (flex: 1)</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px" }}><InlineCode>fill</InlineCode></td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>부모의 전체 공간에 맞춤 (flex: 1)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <PreviewBox>
          <div style={{ width: 300, display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <p style={{ fontSize: 12, color: "var(--text-tertiary)", marginBottom: 8 }}>hug (default)</p>
              <ButtonDemo buttonType="filled" color="brandDefault">Hug Content</ButtonDemo>
            </div>
            <div>
              <p style={{ fontSize: 12, color: "var(--text-tertiary)", marginBottom: 8 }}>fillWidth</p>
              <ButtonDemo buttonType="filled" color="brandDefault" layout="fillWidth">Fill Width</ButtonDemo>
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* States */}
      <Section title="States">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          버튼은 사용자 상호작용에 따라 다양한 상태를 가집니다. 각 상태는 시각적으로 구분되어 사용자에게 피드백을 제공합니다.
        </p>

        <Subsection title="Interactive States">
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
            마우스/터치 상호작용에 따른 상태 변화입니다. 아래 버튼들을 직접 hover하고 클릭해보세요.
          </p>
          <PreviewBox>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              <StateDemo label="Default" state="default" />
              <StateDemo label="Hover" state="hover" />
              <StateDemo label="Pressed" state="pressed" />
              <StateDemo label="Disabled" state="disabled" />
            </div>
          </PreviewBox>
          <div style={{ marginTop: 16, padding: 16, backgroundColor: "var(--bg-secondary)", borderRadius: 8, fontSize: 13 }}>
            <p style={{ margin: 0, color: "var(--text-secondary)", lineHeight: 1.8 }}>
              <strong style={{ color: "var(--text-primary)" }}>Default:</strong> 기본 상태<br />
              <strong style={{ color: "var(--text-primary)" }}>Hover:</strong> 마우스 오버 시 배경색이 약간 어두워짐<br />
              <strong style={{ color: "var(--text-primary)" }}>Pressed:</strong> 클릭/터치 시 배경색이 더 어두워지고 scale(0.98) 적용<br />
              <strong style={{ color: "var(--text-primary)" }}>Disabled:</strong> 비활성화 시 opacity 감소, 클릭 불가
            </p>
          </div>
        </Subsection>

        <Subsection title="Loading State">
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
            비동기 작업 중 로딩 상태를 표시합니다. 로딩 중에는 버튼 너비가 유지되며, 레이블 대신 로딩 인디케이터가 표시됩니다.
          </p>
          <PreviewBox>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <LoadingButtonDemo />
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <ButtonDemo buttonType="filled" color="brandDefault" isLoading>Loading</ButtonDemo>
                <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: 0 }}>isLoading=true</p>
              </div>
            </div>
          </PreviewBox>
        </Subsection>

        <Subsection title="Loading + Disabled">
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
            <InlineCode>isLoading</InlineCode>과 <InlineCode>disabled</InlineCode>가 동시에 적용되면, 로딩 UI가 표시되면서 상호작용이 차단됩니다.
          </p>
          <PreviewBox>
            <div style={{ display: "flex", gap: 16 }}>
              <div style={{ textAlign: "center" }}>
                <ButtonDemo buttonType="filled" color="brandDefault" isLoading disabled>Submit</ButtonDemo>
                <p style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 8 }}>Loading + Disabled</p>
              </div>
            </div>
          </PreviewBox>
        </Subsection>
      </Section>

      {/* Icon Options */}
      <Section title="Icon option">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          <InlineCode>leftContent</InlineCode>, <InlineCode>centerContent</InlineCode>, <InlineCode>rightContent</InlineCode>를 사용하면 Grid 레이아웃 모드로 전환되어 아이콘을 유연하게 배치할 수 있습니다.
        </p>

        <Subsection title="Leading icon with label">
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
            Label의 의미를 보조하거나 시각적 힌트를 제공할 때 사용합니다.
          </p>
          <PreviewBox>
            <div style={{ display: "flex", gap: 12 }}>
              <ButtonDemo buttonType="filled" color="brandDefault" leadingIcon>추가하기</ButtonDemo>
              <ButtonDemo buttonType="outlined" color="brandDefault" leadingIcon="download">다운로드</ButtonDemo>
            </div>
          </PreviewBox>
        </Subsection>

        <Subsection title="Trailing icon with label">
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
            행동의 방향성을 강조하거나 다음 단계로의 이동을 유도할 때 사용합니다.
          </p>
          <PreviewBox>
            <div style={{ display: "flex", gap: 12 }}>
              <ButtonDemo buttonType="filled" color="brandDefault" trailingIcon>다음</ButtonDemo>
              <ButtonDemo buttonType="outlined" color="brandDefault" trailingIcon="external">외부 링크</ButtonDemo>
            </div>
          </PreviewBox>
        </Subsection>

        <Subsection title="Icon only">
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
            공간이 제한되거나 아이콘만으로 의미 전달이 충분할 때 사용합니다. <strong style={{ color: "var(--text-primary)" }}>반드시 aria-label을 제공</strong>해야 합니다.
          </p>
          <PreviewBox>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <ButtonDemo buttonType="filled" color="brandDefault" iconOnly="plus" />
              <ButtonDemo buttonType="outlined" color="brandDefault" iconOnly="edit" />
              <ButtonDemo buttonType="filled" color="baseContainer" iconOnly="close" />
            </div>
          </PreviewBox>
        </Subsection>
      </Section>

      {/* Accessibility */}
      <Section title="Accessibility">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          Button 컴포넌트는 웹 접근성 표준을 준수합니다.
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
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><InlineCode>role=&quot;button&quot;</InlineCode></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>스크린 리더가 버튼으로 인식</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><InlineCode>aria-disabled</InlineCode></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>비활성화 상태를 보조 기술에 전달</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><InlineCode>aria-busy</InlineCode></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>로딩 상태를 보조 기술에 전달</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px" }}><InlineCode>aria-label</InlineCode></td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>Icon-only 버튼에 필수. 액션을 설명하는 텍스트</td>
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
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>버튼으로 포커스 이동</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><kbd style={{ padding: "2px 6px", backgroundColor: "var(--bg-secondary)", borderRadius: 4, fontSize: 12 }}>Enter</kbd></td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>버튼 클릭 실행</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px" }}><kbd style={{ padding: "2px 6px", backgroundColor: "var(--bg-secondary)", borderRadius: 4, fontSize: 12 }}>Space</kbd></td>
                  <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>버튼 클릭 실행</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>
      </Section>

      {/* Best Practices */}
      <Section title="Best Practices">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <PreviewBox padding={24}>
              <ButtonDemo buttonType="filled" color="brandDefault">확인</ButtonDemo>
            </PreviewBox>
            <DoLabel>디자인 시스템의 기본 스타일을 유지합니다.</DoLabel>
          </div>
          <div>
            <PreviewBox padding={24}>
              <button
                style={{
                  padding: "10px 24px",
                  backgroundColor: "#2563eb",
                  color: "white",
                  border: "none",
                  borderRadius: 20,
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                확인
              </button>
            </PreviewBox>
            <DontLabel>높이와 border-radius를 임의로 변경하지 않습니다.</DontLabel>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
          <div>
            <PreviewBox padding={24}>
              <ButtonDemo buttonType="filled" color="brandDefault" iconOnly="plus" />
            </PreviewBox>
            <DoLabel>Icon-only 버튼에는 반드시 aria-label을 제공합니다.</DoLabel>
          </div>
          <div>
            <PreviewBox padding={24}>
              <ButtonDemo buttonType="filled" color="brandDefault">확인확인확인확인확인</ButtonDemo>
            </PreviewBox>
            <DontLabel>Label은 간결하게 작성합니다. 2-4글자를 권장합니다.</DontLabel>
          </div>
        </div>
      </Section>

      {/* Design Tokens */}
      <Section title="Design Tokens">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          Button 컴포넌트에 적용된 디자인 토큰입니다.
        </p>

        <div style={{ overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Property</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Token</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Border Radius</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><InlineCode>vars.radius.s</InlineCode></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>8px</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Horizontal Padding</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><InlineCode>vars.spacing[4]</InlineCode></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>16px</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Border Width (outlined)</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>-</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>1px</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Typography (small-large)</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><InlineCode>typography.sm.semibold</InlineCode></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>14px / 600</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Typography (xLarge)</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><InlineCode>typography.base.semibold</InlineCode></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>16px / 600</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", color: "var(--text-primary)" }}>Press Scale</td>
                <td style={{ padding: "12px 16px" }}>-</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>0.98</td>
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
      <Section title="Source Code">
        <div style={{ padding: 16, backgroundColor: "var(--bg-secondary)", borderRadius: 12, marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>Button Component</p>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "4px 0 0 0" }}>실제 컴포넌트 소스 코드를 GitHub에서 확인하세요.</p>
          </div>
          <a
            href={BUTTON_SOURCE}
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
              borderRadius: 8,
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
        <CodeBlock code={`import { Button } from '@zkap/design-system';`} sourceUrl={BUTTON_SOURCE} />
      </Section>

      <Section title="Basic Usage">
        <PreviewBox>
          <div style={{ display: "flex", gap: 16 }}>
            <ButtonDemo buttonType="filled" color="brandDefault">Filled</ButtonDemo>
            <ButtonDemo buttonType="outlined" color="brandDefault">Outlined</ButtonDemo>
          </div>
        </PreviewBox>
        <CodeBlock
          code={`<Button buttonType="filled" color="brandDefault">
  Filled
</Button>

<Button buttonType="outlined" color="brandDefault">
  Outlined
</Button>`}
          sourceUrl={BUTTON_SOURCE}
        />
      </Section>

      <Section title="Colors">
        <PreviewBox>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <ButtonDemo buttonType="filled" color="brandDefault">Brand</ButtonDemo>
            <ButtonDemo buttonType="filled" color="brandSecondary">Secondary</ButtonDemo>
            <ButtonDemo buttonType="filled" color="baseContainer">Base</ButtonDemo>
            <ButtonDemo buttonType="filled" color="successDefault">Success</ButtonDemo>
            <ButtonDemo buttonType="filled" color="errorDefault">Error</ButtonDemo>
          </div>
        </PreviewBox>
        <CodeBlock
          code={`<Button buttonType="filled" color="brandDefault">Brand</Button>
<Button buttonType="filled" color="brandSecondary">Secondary</Button>
<Button buttonType="filled" color="baseContainer">Base</Button>
<Button buttonType="filled" color="successDefault">Success</Button>
<Button buttonType="filled" color="errorDefault">Error</Button>`}
          sourceUrl={BUTTON_STYLES}
          title="Colors"
        />
      </Section>

      <Section title="Sizes">
        <PreviewBox>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <ButtonDemo buttonType="filled" color="brandDefault" size="small">Small</ButtonDemo>
            <ButtonDemo buttonType="filled" color="brandDefault" size="medium">Medium</ButtonDemo>
            <ButtonDemo buttonType="filled" color="brandDefault" size="large">Large</ButtonDemo>
            <ButtonDemo buttonType="filled" color="brandDefault" size="xLarge">X-Large</ButtonDemo>
          </div>
        </PreviewBox>
        <CodeBlock
          code={`<Button buttonType="filled" color="brandDefault" size="small">Small</Button>
<Button buttonType="filled" color="brandDefault" size="medium">Medium</Button>
<Button buttonType="filled" color="brandDefault" size="large">Large</Button>
<Button buttonType="filled" color="brandDefault" size="xLarge">X-Large</Button>`}
          sourceUrl={BUTTON_STYLES}
          title="Sizes"
        />
      </Section>

      <Section title="With Grid Content">
        <PreviewBox>
          <div style={{ display: "flex", gap: 16 }}>
            <ButtonDemo buttonType="filled" color="brandDefault" leadingIcon>Leading</ButtonDemo>
            <ButtonDemo buttonType="filled" color="brandDefault" trailingIcon>Trailing</ButtonDemo>
            <ButtonDemo buttonType="filled" color="brandDefault" iconOnly="plus" />
          </div>
        </PreviewBox>
        <CodeBlock code={`// Leading icon
<Button
  buttonType="filled"
  color="brandDefault"
  leftContent={<Icon name="plus" />}
  centerContent="Leading"
/>

// Trailing icon
<Button
  buttonType="filled"
  color="brandDefault"
  centerContent="Trailing"
  rightContent={<Icon name="chevron-right" />}
/>

// Icon only - aria-label 필수!
<Button
  buttonType="filled"
  color="brandDefault"
  centerContent={<Icon name="plus" />}
  aria-label="추가하기"
/>`} />
      </Section>

      <Section title="Layout">
        <PreviewBox>
          <div style={{ width: 280, display: "flex", flexDirection: "column", gap: 12 }}>
            <ButtonDemo buttonType="filled" color="brandDefault" layout="fillWidth">Fill Width</ButtonDemo>
            <ButtonDemo buttonType="filled" color="brandDefault">Hug (default)</ButtonDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<Button buttonType="filled" color="brandDefault" layout="fillWidth">
  Fill Width
</Button>

<Button buttonType="filled" color="brandDefault" layout="hug">
  Hug (default)
</Button>`} />
      </Section>

      <Section title="States">
        <PreviewBox>
          <div style={{ display: "flex", gap: 16 }}>
            <ButtonDemo buttonType="filled" color="brandDefault">Default</ButtonDemo>
            <ButtonDemo buttonType="filled" color="brandDefault" disabled>Disabled</ButtonDemo>
            <ButtonDemo buttonType="filled" color="brandDefault" isLoading>Loading</ButtonDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<Button buttonType="filled" color="brandDefault">
  Default
</Button>

<Button buttonType="filled" color="brandDefault" disabled>
  Disabled
</Button>

<Button buttonType="filled" color="brandDefault" isLoading>
  Loading
</Button>`} />
      </Section>

      <Section title="API Reference">
        <Subsection title="Common Props">
          <PropsTable
            props={[
              { name: "children", type: "ReactNode", required: false, description: "버튼 텍스트" },
              { name: "buttonType", type: '"filled" | "outlined"', required: false, defaultVal: '"filled"', description: "버튼 스타일" },
              { name: "color", type: '"brandDefault" | "brandSecondary" | "baseContainer" | "successDefault" | "errorDefault" | "kakaoDefault" | "googleDefault"', required: false, defaultVal: '"brandDefault"', description: "색상 테마" },
              { name: "size", type: '"small" | "medium" | "large" | "xLarge"', required: false, defaultVal: '"medium"', description: "버튼 크기" },
              { name: "layout", type: '"hug" | "fillWidth" | "fill"', required: false, defaultVal: '"hug"', description: "레이아웃 모드" },
              { name: "disabled", type: "boolean", required: false, defaultVal: "false", description: "비활성화 상태" },
              { name: "isLoading", type: "boolean", required: false, defaultVal: "false", description: "로딩 상태" },
              { name: "leftContent", type: "ReactNode", required: false, description: "좌측 콘텐츠 (Grid 모드)" },
              { name: "centerContent", type: "ReactNode", required: false, description: "중앙 콘텐츠 (Grid 모드)" },
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
// React Native Tab Content
// ============================================
function RNContent() {
  return (
    <>
      <Section title="Source Code">
        <div style={{ padding: 16, backgroundColor: "var(--bg-secondary)", borderRadius: 12, marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>Button Component</p>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "4px 0 0 0" }}>실제 컴포넌트 소스 코드를 GitHub에서 확인하세요.</p>
          </div>
          <a
            href={BUTTON_SOURCE}
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
              borderRadius: 8,
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
        <CodeBlock
          code={`import { Button } from '@zkap/design-system';`}
          sourceUrl={BUTTON_SOURCE}
        />
      </Section>

      <Section title="Basic Usage">
        <PreviewBox>
          <div style={{ display: "flex", gap: 16 }}>
            <ButtonDemo buttonType="filled" color="brandDefault">Filled</ButtonDemo>
            <ButtonDemo buttonType="outlined" color="brandDefault">Outlined</ButtonDemo>
          </div>
        </PreviewBox>
        <CodeBlock
          code={`<Button
  buttonType="filled"
  color="brandDefault"
  onPress={() => {}}
>
  Filled
</Button>

<Button
  buttonType="outlined"
  color="brandDefault"
  onPress={() => {}}
>
  Outlined
</Button>`}
          sourceUrl={BUTTON_SOURCE}
        />
      </Section>

      <Section title="Colors">
        <PreviewBox>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <ButtonDemo buttonType="filled" color="brandDefault">Brand</ButtonDemo>
            <ButtonDemo buttonType="filled" color="brandSecondary">Secondary</ButtonDemo>
            <ButtonDemo buttonType="filled" color="baseContainer">Base</ButtonDemo>
            <ButtonDemo buttonType="filled" color="successDefault">Success</ButtonDemo>
            <ButtonDemo buttonType="filled" color="errorDefault">Error</ButtonDemo>
          </div>
        </PreviewBox>
        <CodeBlock
          code={`<Button buttonType="filled" color="brandDefault" onPress={() => {}}>
  Brand
</Button>

<Button buttonType="filled" color="successDefault" onPress={() => {}}>
  Success
</Button>

<Button buttonType="filled" color="errorDefault" onPress={() => {}}>
  Error
</Button>`}
          sourceUrl={BUTTON_STYLES}
          title="Colors"
        />
      </Section>

      <Section title="Sizes">
        <PreviewBox>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <ButtonDemo buttonType="filled" color="brandDefault" size="small">Small</ButtonDemo>
            <ButtonDemo buttonType="filled" color="brandDefault" size="medium">Medium</ButtonDemo>
            <ButtonDemo buttonType="filled" color="brandDefault" size="large">Large</ButtonDemo>
            <ButtonDemo buttonType="filled" color="brandDefault" size="xLarge">X-Large</ButtonDemo>
          </div>
        </PreviewBox>
        <CodeBlock
          code={`<Button buttonType="filled" color="brandDefault" size="small" onPress={() => {}}>
  Small
</Button>

<Button buttonType="filled" color="brandDefault" size="xLarge" onPress={() => {}}>
  X-Large
</Button>`}
          sourceUrl={BUTTON_STYLES}
          title="Sizes"
        />
      </Section>

      <Section title="With Grid Content">
        <PreviewBox>
          <div style={{ display: "flex", gap: 16 }}>
            <ButtonDemo buttonType="filled" color="brandDefault" leadingIcon>Leading</ButtonDemo>
            <ButtonDemo buttonType="filled" color="brandDefault" trailingIcon>Trailing</ButtonDemo>
            <ButtonDemo buttonType="filled" color="brandDefault" iconOnly="plus" />
          </div>
        </PreviewBox>
        <CodeBlock
          code={`// Leading icon
<Button
  buttonType="filled"
  color="brandDefault"
  leftContent={<Icon name="plus" size={16} color="onColor" />}
  centerContent="Leading"
  onPress={() => {}}
/>

// Trailing icon
<Button
  buttonType="filled"
  color="brandDefault"
  centerContent="Trailing"
  rightContent={<Icon name="chevron-right" size={16} color="onColor" />}
  onPress={() => {}}
/>

// Icon only - accessibilityLabel 필수!
<Button
  buttonType="filled"
  color="brandDefault"
  centerContent={<Icon name="plus" size={20} color="onColor" />}
  accessibilityLabel="추가하기"
  onPress={() => {}}
/>`}
          sourceUrl={BUTTON_SOURCE}
          title="Grid Content"
        />
      </Section>

      <Section title="Layout">
        <PreviewBox>
          <div style={{ width: 280, display: "flex", flexDirection: "column", gap: 12 }}>
            <ButtonDemo buttonType="filled" color="brandDefault" layout="fillWidth">Fill Width</ButtonDemo>
            <ButtonDemo buttonType="filled" color="brandDefault">Hug (default)</ButtonDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<Button
  buttonType="filled"
  color="brandDefault"
  layout="fillWidth"
  onPress={() => {}}
>
  Fill Width
</Button>`} />
      </Section>

      <Section title="States">
        <PreviewBox>
          <div style={{ display: "flex", gap: 16 }}>
            <ButtonDemo buttonType="filled" color="brandDefault">Default</ButtonDemo>
            <ButtonDemo buttonType="filled" color="brandDefault" disabled>Disabled</ButtonDemo>
            <ButtonDemo buttonType="filled" color="brandDefault" isLoading>Loading</ButtonDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<Button
  buttonType="filled"
  color="brandDefault"
  disabled
  onPress={() => {}}
>
  Disabled
</Button>

<Button
  buttonType="filled"
  color="brandDefault"
  isLoading
  onPress={() => {}}
>
  Loading
</Button>`} />
      </Section>

      <Section title="API Reference">
        <Subsection title="Common Props">
          <PropsTable
            props={[
              { name: "children", type: "ReactNode", required: false, description: "버튼 텍스트" },
              { name: "buttonType", type: '"filled" | "outlined"', required: false, defaultVal: '"filled"', description: "버튼 스타일" },
              { name: "color", type: '"brandDefault" | "brandSecondary" | "baseContainer" | "successDefault" | "errorDefault" | "kakaoDefault" | "googleDefault"', required: false, defaultVal: '"brandDefault"', description: "색상 테마" },
              { name: "size", type: '"small" | "medium" | "large" | "xLarge"', required: false, defaultVal: '"medium"', description: "버튼 크기" },
              { name: "layout", type: '"hug" | "fillWidth" | "fill"', required: false, defaultVal: '"hug"', description: "레이아웃 모드" },
              { name: "disabled", type: "boolean", required: false, defaultVal: "false", description: "비활성화 상태" },
              { name: "isLoading", type: "boolean", required: false, defaultVal: "false", description: "로딩 상태" },
              { name: "leftContent", type: "ReactNode", required: false, description: "좌측 콘텐츠 (Grid 모드)" },
              { name: "centerContent", type: "ReactNode", required: false, description: "중앙 콘텐츠 (Grid 모드)" },
              { name: "rightContent", type: "ReactNode", required: false, description: "우측 콘텐츠 (Grid 모드)" },
            ]}
          />
        </Subsection>
        <Subsection title="React Native-specific Props">
          <PropsTable
            props={[
              { name: "onPress", type: "(event: GestureResponderEvent) => void", required: false, description: "탭 핸들러" },
              { name: "onPressIn", type: "(event: GestureResponderEvent) => void", required: false, description: "터치 시작 핸들러" },
              { name: "onPressOut", type: "(event: GestureResponderEvent) => void", required: false, description: "터치 종료 핸들러" },
              { name: "onLongPress", type: "(event: GestureResponderEvent) => void", required: false, description: "길게 누르기 핸들러" },
              { name: "accessibilityLabel", type: "string", required: false, description: "스크린 리더용 레이블 (icon-only 필수)" },
              { name: "accessibilityHint", type: "string", required: false, description: "동작 힌트 설명" },
              { name: "accessibilityState", type: "AccessibilityState", required: false, description: "접근성 상태 (disabled, busy 등)" },
              { name: "hitSlop", type: "Insets", required: false, description: "터치 영역 확장" },
            ]}
          />
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
        backgroundColor: "var(--brand-primary)",
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

function ColorTableRow({ color, desc, example, isLast = false }: { color: string; desc: string; example: string; isLast?: boolean }) {
  return (
    <tr>
      <td style={{ padding: "12px 16px", borderBottom: isLast ? "none" : "1px solid var(--divider)" }}>
        <InlineCode>{color}</InlineCode>
      </td>
      <td style={{ padding: "12px 16px", borderBottom: isLast ? "none" : "1px solid var(--divider)", color: "var(--text-secondary)" }}>{desc}</td>
      <td style={{ padding: "12px 16px", borderBottom: isLast ? "none" : "1px solid var(--divider)", color: "var(--text-tertiary)", fontSize: 13 }}>{example}</td>
    </tr>
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
function UsageCard({ situation, desc, buttonType, color, examples }: {
  situation: string;
  desc: string;
  buttonType: "filled" | "outlined";
  color: ButtonColor;
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
            backgroundColor: buttonType === "filled" ? "#dbeafe" : "#f1f5f9",
            color: buttonType === "filled" ? "#1d4ed8" : "#475569",
            borderRadius: 4,
            fontWeight: 500,
          }}>
            {buttonType} + {color}
          </span>
        </div>
        <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0, marginBottom: 6 }}>{desc}</p>
        <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: 0 }}>
          예시: {examples.join(", ")}
        </p>
      </div>
      <ButtonDemo buttonType={buttonType} color={color} size="small">
        {examples[0]}
      </ButtonDemo>
    </div>
  );
}

function PrincipleCard({ number, title, desc, doExample, dontExample, hierarchy }: {
  number: number;
  title: string;
  desc: string;
  doExample?: React.ReactNode;
  dontExample?: React.ReactNode;
  hierarchy?: string[];
}) {
  return (
    <div style={{
      padding: 24,
      backgroundColor: "white",
      borderRadius: 16,
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
      <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: 0, marginBottom: doExample || hierarchy ? 20 : 0, lineHeight: 1.6 }}>{desc}</p>

      {(doExample || dontExample) && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {doExample && (
            <DoCard>{doExample}</DoCard>
          )}
          {dontExample && (
            <DontCard>{dontExample}</DontCard>
          )}
        </div>
      )}

      {hierarchy && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          {hierarchy.map((item, i) => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{
                fontSize: 12,
                padding: "4px 10px",
                backgroundColor: i === 0 ? "#dbeafe" : i === 1 ? "#e0e7ff" : i === 2 ? "#f1f5f9" : "#fafafa",
                color: i === 0 ? "#1d4ed8" : i === 1 ? "#4338ca" : "#64748b",
                borderRadius: 6,
                fontWeight: 500,
              }}>
                {item}
              </span>
              {i < hierarchy.length - 1 && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
              )}
            </div>
          ))}
          <span style={{ fontSize: 12, color: "var(--text-tertiary)", marginLeft: 4 }}>(강조도 순)</span>
        </div>
      )}
    </div>
  );
}

function DoCard({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid var(--divider)" }}>
      {/* Preview area */}
      <div style={{
        padding: 24,
        backgroundColor: "#f8f9fa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 80,
      }}>
        {children}
      </div>
      {/* Label */}
      <div style={{
        padding: "12px 16px",
        backgroundColor: "white",
        borderTop: "1px solid var(--divider)",
        display: "flex",
        alignItems: "center",
        gap: 6,
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="#22c55e"/>
          <path d="M8 12l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span style={{ fontSize: 14, fontWeight: 600, color: "#16a34a" }}>Do</span>
      </div>
    </div>
  );
}

function DontCard({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid var(--divider)" }}>
      {/* Preview area */}
      <div style={{
        padding: 24,
        backgroundColor: "#f8f9fa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 80,
      }}>
        {children}
      </div>
      {/* Label */}
      <div style={{
        padding: "12px 16px",
        backgroundColor: "white",
        borderTop: "1px solid var(--divider)",
        display: "flex",
        alignItems: "center",
        gap: 6,
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="#ef4444"/>
          <path d="M15 9l-6 6M9 9l6 6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <span style={{ fontSize: 14, fontWeight: 600, color: "#dc2626" }}>Don&apos;t</span>
      </div>
    </div>
  );
}

function PlacementExample({ title, left, right, note }: {
  title: string;
  left: { type: "filled" | "outlined"; color: ButtonColor; label: string };
  right: { type: "filled" | "outlined"; color: ButtonColor; label: string };
  note: string;
}) {
  return (
    <div style={{
      padding: 20,
      backgroundColor: "white",
      borderRadius: 12,
      border: "1px solid var(--divider)",
    }}>
      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 16 }}>{title}</div>
      <div style={{
        display: "flex",
        justifyContent: "flex-end",
        gap: 8,
        padding: 20,
        backgroundColor: "#f8f9fa",
        borderRadius: 8,
      }}>
        <ButtonDemo buttonType={left.type} color={left.color} size="small">{left.label}</ButtonDemo>
        <ButtonDemo buttonType={right.type} color={right.color} size="small">{right.label}</ButtonDemo>
      </div>
      <p style={{ fontSize: 13, color: "var(--text-tertiary)", margin: 0, marginTop: 12 }}>{note}</p>
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
      padding: "60px 40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <svg width="400" height="120" viewBox="0 0 400 120">
        {/* Lines */}
        {/* Line from circle 1 to leading icon */}
        <line x1="60" y1="50" x2="120" y2="50" stroke="#374151" strokeWidth="1.5" />
        <circle cx="120" cy="50" r="3" fill="#374151" />

        {/* Line from circle 2 to label (vertical) */}
        <line x1="200" y1="50" x2="200" y2="85" stroke="#374151" strokeWidth="1.5" />
        <circle cx="200" cy="50" r="3" fill="#374151" />

        {/* Line from circle 3 to trailing icon */}
        <line x1="280" y1="50" x2="340" y2="50" stroke="#374151" strokeWidth="1.5" />
        <circle cx="280" cy="50" r="3" fill="#374151" />

        {/* Numbered circles */}
        {/* Circle 1 */}
        <circle cx="45" cy="50" r="16" fill="#374151" />
        <text x="45" y="55" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">1</text>

        {/* Circle 2 */}
        <circle cx="200" cy="100" r="16" fill="#374151" />
        <text x="200" y="105" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">2</text>

        {/* Circle 3 */}
        <circle cx="355" cy="50" r="16" fill="#374151" />
        <text x="355" y="55" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">3</text>

        {/* Button content */}
        {/* Leading icon placeholder (dashed box) */}
        <rect x="125" y="38" width="24" height="24" rx="4" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 2" />

        {/* Text button label */}
        <text x="200" y="55" textAnchor="middle" fill="#3b82f6" fontSize="16" fontWeight="600">Text button</text>

        {/* Trailing icon placeholder (dashed box) */}
        <rect x="251" y="38" width="24" height="24" rx="4" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 2" />
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
      padding: "10px 20px",
      fontSize: 14,
      fontWeight: 600,
      borderRadius: 8,
      border: "none",
      cursor: state === "disabled" ? "not-allowed" : "pointer",
      transition: "all 150ms ease",
      outline: "none",
    };

    switch (state) {
      case "default":
        return { ...base, backgroundColor: "#2563eb", color: "white" };
      case "hover":
        return { ...base, backgroundColor: "#1d4ed8", color: "white" };
      case "pressed":
        return { ...base, backgroundColor: "#1e40af", color: "white", transform: "scale(0.98)" };
      case "focus":
        return { ...base, backgroundColor: "#2563eb", color: "white", boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.4)" };
      case "disabled":
        return { ...base, backgroundColor: "#e2e8f0", color: "#94a3b8" };
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <button style={getStyles()}>{label}</button>
      <p style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 8 }}>{label}</p>
    </div>
  );
}

// ============================================
// Demo Components
// ============================================
type ButtonType = "filled" | "outlined";
type ButtonColor = "brandDefault" | "brandSecondary" | "baseContainer" | "successDefault" | "errorDefault" | "kakaoDefault" | "googleDefault";
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
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const actualPressed = forcePressed || isPressed;

  const sizeHeights: Record<ButtonSize, number> = { small: 36, medium: 40, large: 44, xLarge: 48 };

  const getColors = () => {
    if (disabled && !isLoading) {
      return { bg: "#e2e8f0", text: "#94a3b8", border: "#e2e8f0" };
    }

    const colorMap: Record<ButtonColor, { bg: string; bgHover: string; bgPressed: string; text: string; border: string; borderHover: string }> = {
      brandDefault: { bg: "#2563eb", bgHover: "#1d4ed8", bgPressed: "#1e40af", text: "white", border: "#2563eb", borderHover: "#1d4ed8" },
      brandSecondary: { bg: "#dbeafe", bgHover: "#bfdbfe", bgPressed: "#93c5fd", text: "#2563eb", border: "#93c5fd", borderHover: "#60a5fa" },
      baseContainer: { bg: "#f1f5f9", bgHover: "#e2e8f0", bgPressed: "#cbd5e1", text: "#334155", border: "#cbd5e1", borderHover: "#94a3b8" },
      successDefault: { bg: "#22c55e", bgHover: "#16a34a", bgPressed: "#15803d", text: "white", border: "#22c55e", borderHover: "#16a34a" },
      errorDefault: { bg: "#ef4444", bgHover: "#dc2626", bgPressed: "#b91c1c", text: "white", border: "#ef4444", borderHover: "#dc2626" },
      kakaoDefault: { bg: "#FEE500", bgHover: "#E8D000", bgPressed: "#D4BF00", text: "#191919", border: "#FEE500", borderHover: "#E8D000" },
      googleDefault: { bg: "white", bgHover: "#f8fafc", bgPressed: "#f1f5f9", text: "#334155", border: "#d1d5db", borderHover: "#9ca3af" },
    };

    const c = colorMap[color];
    const getBg = () => {
      if (actualPressed) return c.bgPressed;
      if (isHovered) return c.bgHover;
      return c.bg;
    };

    if (buttonType === "filled") {
      return { bg: getBg(), text: c.text, border: "transparent" };
    } else {
      // outlined 버튼은 텍스트 색상 유지, 배경만 살짝 어두워짐
      const getOutlinedText = () => {
        if (color === "brandDefault" || color === "brandSecondary") return "#2563eb";
        if (color === "successDefault") return "#16a34a";
        if (color === "errorDefault") return "#dc2626";
        return "#334155";
      };
      return {
        bg: actualPressed ? "#f1f5f9" : isHovered ? "#f8fafc" : "white",
        text: getOutlinedText(),
        border: c.border,
      };
    }
  };

  const colors = getColors();

  const getIcon = (type: string) => {
    switch (type) {
      case "plus":
        return <path d="M12 5v14M5 12h14" />;
      case "download":
        return <><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></>;
      case "edit":
        return <><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></>;
      case "close":
        return <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>;
      case "external":
        return <><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></>;
      default:
        return <path d="M9 18l6-6-6-6" />;
    }
  };

  return (
    <button
      disabled={disabled || isLoading}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
      onMouseDown={() => !disabled && !isLoading && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      style={{
        padding: iconOnly ? "10px" : "10px 16px",
        fontSize: size === "xLarge" ? 15 : 14,
        fontWeight: 600,
        backgroundColor: colors.bg,
        color: colors.text,
        border: buttonType === "outlined" ? `1px solid ${colors.border}` : "none",
        borderRadius: 8,
        cursor: disabled || isLoading ? "not-allowed" : "pointer",
        transition: "all 150ms ease",
        transform: actualPressed ? "scale(0.98)" : "scale(1)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        width: layout === "fillWidth" ? "100%" : "auto",
        minWidth: iconOnly ? "auto" : 80,
        height: sizeHeights[size],
        opacity: disabled && !isLoading ? 1 : 1,
        position: "relative",
      }}
    >
      {isLoading ? (
        <LoadingDots />
      ) : (
        <>
          {leadingIcon && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {getIcon(typeof leadingIcon === "string" ? leadingIcon : "plus")}
            </svg>
          )}
          {iconOnly ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {getIcon(iconOnly)}
            </svg>
          ) : (
            children
          )}
          {trailingIcon && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {getIcon(typeof trailingIcon === "string" ? trailingIcon : "chevron")}
            </svg>
          )}
        </>
      )}
    </button>
  );
}

function LoadingButtonDemo() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      style={{
        padding: "10px 20px",
        fontSize: 14,
        fontWeight: 600,
        backgroundColor: "#2563eb",
        color: "white",
        border: "none",
        borderRadius: 8,
        cursor: isLoading ? "not-allowed" : "pointer",
        transition: "all 150ms ease",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        minWidth: 140,
        height: 40,
      }}
    >
      {isLoading ? (
        <LoadingDots />
      ) : (
        "Click to Load"
      )}
    </button>
  );
}

function LoadingDots({ color = "currentColor" }: { color?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <style>{`
        @keyframes dotPulse {
          0%, 100% { transform: scale(0.6); opacity: 0.4; }
          50% { transform: scale(1); opacity: 1; }
        }
      `}</style>
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            backgroundColor: color,
            animation: `dotPulse 1.2s ease-in-out infinite`,
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
}

function KakaoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 4 }}>
      <path d="M12 3C6.48 3 2 6.58 2 11c0 2.84 1.87 5.33 4.67 6.75l-.95 3.52c-.08.31.27.56.54.38l4.2-2.79c.5.05 1.01.14 1.54.14 5.52 0 10-3.58 10-8s-4.48-8-10-8z"/>
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" style={{ marginRight: 4 }}>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}
