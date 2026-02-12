"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform, highlightCode } from "@/components/PlatformTabs";
import { TextButton } from '@baerae-zkap/design-system';

// Types
type TextButtonSize = "xSmall" | "small" | "medium" | "large" | "xLarge";
type TextButtonColor = "brandDefault" | "baseDefault" | "errorDefault";
type TextButtonVariant = "clear" | "underline" | "arrow";

export default function TextButtonPage() {
  return (
    <div style={{ maxWidth: 720 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Actions" },
          { label: "Text Button" },
        ]}
      />

      {/* Header */}
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
        Text Button
      </h1>
      <p style={{ fontSize: 15, color: "var(--text-secondary)", marginBottom: 32, lineHeight: 1.6 }}>
        배경 없이 텍스트만으로 구성된 버튼입니다. 시각적 노이즈를 줄이면서 보조 액션이나 낮은 우선순위의 동작을 유도할 때 사용합니다.
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
  const [color, setColor] = useState<TextButtonColor>("brandDefault");
  const [size, setSize] = useState<TextButtonSize>("medium");
  const [disabled, setDisabled] = useState(false);
  const [codeType, setCodeType] = useState<"rn" | "web">("rn");

  const generateCode = () => {
    const props = [];
    if (variant !== "clear") props.push(`variant="${variant}"`);
    props.push(`color="${color}"`);
    props.push(`size="${size}"`);
    if (disabled) props.push("disabled");

    const propsStr = `\n  ${props.join("\n  ")}\n`;

    if (codeType === "rn") {
      return `<TextButton${propsStr}onPress={() => {}}>
  Text Button
</TextButton>`;
    } else {
      return `<TextButton${propsStr}onClick={() => {}}>
  Text Button
</TextButton>`;
    }
  };

  const colorLabels: Record<TextButtonColor, string> = {
    brandDefault: "Brand",
    baseDefault: "Base",
    errorDefault: "Error",
  };

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
                  { value: "brandDefault", label: colorLabels.brandDefault },
                  { value: "baseDefault", label: colorLabels.baseDefault },
                  { value: "errorDefault", label: colorLabels.errorDefault },
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
      {copied ? (
        <>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          Copy
        </>
      )}
    </button>
  );
}

// Section component (matching Button page)
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

function PlatformContent({ platform }: { platform: Platform }) {
  if (platform === "design") {
    return <DesignContent />;
  }
  if (platform === "web") {
    return <WebContent />;
  }
  return <RNContent />;
}

function DesignContent() {
  return (
    <>
      {/* Anatomy */}
      <Section title="Anatomy">
        <AnatomyDiagram />
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: 16,
          marginTop: 20,
          fontSize: 14,
          fontWeight: 500,
          color: "var(--text-primary)",
        }}>
          <div>1. Label</div>
          <div>2. Trailing Icon</div>
          <div>3. Underline</div>
          <div>4. Touch Area</div>
        </div>
      </Section>

      {/* Usage Guidelines */}
      <Section title="Usage Guidelines">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 24, lineHeight: 1.6 }}>
          일관된 UX를 위해 아래 권고 패턴을 따르세요. TextButton은 <strong style={{ color: "var(--text-primary)" }}>보조 액션</strong>이나 <strong style={{ color: "var(--text-primary)" }}>네비게이션 링크</strong>에 적합합니다.
        </p>

        <Subsection title="Recommended Combinations">
          <div style={{ display: "grid", gap: 12 }}>
            <UsageRecommendationCard
              situation="보조 액션 (Sub action)"
              desc="Filled Button 아래에서 보조 링크 역할"
              variant="clear"
              color="brandDefault"
              examples={["회원가입", "건너뛰기", "나중에"]}
            />
            <UsageRecommendationCard
              situation="네비게이션 링크"
              desc="섹션 헤더 옆에서 상세 페이지로 이동"
              variant="arrow"
              color="baseDefault"
              examples={["더보기", "전체보기", "상세"]}
            />
            <UsageRecommendationCard
              situation="인라인 액션"
              desc="문장 내에서 클릭 가능한 텍스트"
              variant="underline"
              color="brandDefault"
              examples={["이용약관", "개인정보처리방침"]}
            />
            <UsageRecommendationCard
              situation="위험한 보조 액션"
              desc="삭제나 초기화 등 파괴적 보조 행동"
              variant="clear"
              color="errorDefault"
              examples={["삭제", "초기화", "탈퇴"]}
            />
          </div>
        </Subsection>

        <Subsection title="Design Principles">
          <div style={{ display: "grid", gap: 16 }}>
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
      </Section>

      {/* Variants */}
      <Section title="Variants">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          <InlineCode>variant</InlineCode> prop을 통해 3가지 variant를 사용할 수 있습니다. 각 variant는 용도와 시각적 표현이 다릅니다.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          <VariantCard
            name="Clear"
            description="기본 텍스트 버튼. 배경이나 장식 없이 텍스트만으로 액션을 표현합니다."
          >
            <TextButtonDemo variant="clear" color="brandDefault" size="medium">텍스트 버튼</TextButtonDemo>
          </VariantCard>

          <VariantCard
            name="Underline"
            description="밑줄이 있는 텍스트 버튼. 링크처럼 보이면서 버튼 역할을 합니다."
          >
            <TextButtonDemo variant="underline" color="brandDefault" size="medium">더 알아보기</TextButtonDemo>
          </VariantCard>

          <VariantCard
            name="Arrow"
            description="화살표 아이콘이 있는 네비게이션 버튼. 다음 페이지나 상세 화면으로 이동할 때 사용합니다."
          >
            <TextButtonDemo variant="arrow" color="brandDefault" size="medium">더보기</TextButtonDemo>
          </VariantCard>

          <VariantCard
            name="Color Variants"
            description="상황에 맞는 색상을 선택할 수 있습니다. Brand, Base, Error 컬러를 지원합니다."
          >
            <div style={{ display: "flex", gap: 20 }}>
              <TextButtonDemo variant="clear" color="brandDefault" size="medium">Brand</TextButtonDemo>
              <TextButtonDemo variant="clear" color="baseDefault" size="medium">Base</TextButtonDemo>
              <TextButtonDemo variant="clear" color="errorDefault" size="medium">Error</TextButtonDemo>
            </div>
          </VariantCard>
        </div>
      </Section>

      {/* Colors */}
      <Section title="Colors">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          <InlineCode>color</InlineCode> prop을 통해 텍스트 버튼의 의미에 맞는 색상을 지정합니다.
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
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><InlineCode>brandDefault</InlineCode></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>브랜드 보조 액션, 링크</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-tertiary)", fontSize: 13 }}>회원가입, 더보기</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><InlineCode>baseDefault</InlineCode></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>중립적 보조 액션, 네비게이션</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-tertiary)", fontSize: 13 }}>전체보기, 건너뛰기</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px" }}><InlineCode>errorDefault</InlineCode></td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>위험/삭제 보조 액션</td>
                <td style={{ padding: "12px 16px", color: "var(--text-tertiary)", fontSize: 13 }}>삭제, 초기화</td>
              </tr>
            </tbody>
          </table>
        </div>

        <PreviewBox>
          <div style={{ display: "flex", gap: 32, alignItems: "center", padding: 24 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <TextButtonDemo variant="clear" color="brandDefault" size="medium">Brand</TextButtonDemo>
              <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>Primary action</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <TextButtonDemo variant="clear" color="baseDefault" size="medium">Base</TextButtonDemo>
              <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>Neutral action</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <TextButtonDemo variant="clear" color="errorDefault" size="medium">Error</TextButtonDemo>
              <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>Destructive action</span>
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* Sizes */}
      <Section title="Sizes">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          <InlineCode>size</InlineCode> prop을 통해 5가지 크기를 사용할 수 있습니다. 주변 텍스트나 컴포넌트와의 조화를 고려하여 선택합니다.
        </p>

        <div style={{ marginBottom: 24, overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Size</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Font Size</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>용도</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><InlineCode>xSmall</InlineCode></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>12px</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>캡션, 주석 내 링크</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><InlineCode>small</InlineCode></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>14px</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>리스트 내 액션, 카드 내부</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><InlineCode>medium</InlineCode></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>16px</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>기본값, 대부분의 상황</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><InlineCode>large</InlineCode></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>18px</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>강조가 필요한 보조 액션</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px" }}><InlineCode>xLarge</InlineCode></td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>20px</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>시트/모달 하단 보조 링크</td>
              </tr>
            </tbody>
          </table>
        </div>

        <PreviewBox>
          <div style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap", padding: 24 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <TextButtonDemo variant="clear" color="brandDefault" size="xSmall">XSmall</TextButtonDemo>
              <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>12px</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <TextButtonDemo variant="clear" color="brandDefault" size="small">Small</TextButtonDemo>
              <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>14px</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <TextButtonDemo variant="clear" color="brandDefault" size="medium">Medium</TextButtonDemo>
              <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>16px</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <TextButtonDemo variant="clear" color="brandDefault" size="large">Large</TextButtonDemo>
              <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>18px</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <TextButtonDemo variant="clear" color="brandDefault" size="xLarge">XLarge</TextButtonDemo>
              <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>20px</span>
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* States */}
      <Section title="States">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          TextButton은 사용자 상호작용에 따라 다양한 상태를 가집니다. 배경이 없어도 명확한 시각적 피드백을 제공합니다.
        </p>

        <Subsection title="Interactive States">
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
            마우스/터치 상호작용에 따른 상태 변화입니다. 아래 버튼들을 직접 hover하고 클릭해보세요.
          </p>
          <PreviewBox>
            <div style={{ display: "flex", gap: 32, alignItems: "center", padding: 24 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <TextButtonDemo variant="clear" color="brandDefault" size="medium">Default</TextButtonDemo>
                <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>기본 상태</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <TextButtonDemo variant="clear" color="brandDefault" size="medium" isHovered>Hovered</TextButtonDemo>
                <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>호버 상태</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <TextButtonDemo variant="clear" color="brandDefault" size="medium" isPressed>Pressed</TextButtonDemo>
                <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>눌림 상태</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <TextButtonDemo variant="clear" color="brandDefault" size="medium" disabled>Disabled</TextButtonDemo>
                <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>비활성화</span>
              </div>
            </div>
          </PreviewBox>
          <div style={{ marginTop: 16, padding: 16, backgroundColor: "var(--bg-secondary)", borderRadius: 12, fontSize: 13 }}>
            <p style={{ margin: 0, color: "var(--text-secondary)", lineHeight: 1.8 }}>
              <strong style={{ color: "var(--text-primary)" }}>Default:</strong> 기본 텍스트 색상<br />
              <strong style={{ color: "var(--text-primary)" }}>Hover:</strong> 연한 배경색 표시 (rgba overlay)<br />
              <strong style={{ color: "var(--text-primary)" }}>Pressed:</strong> 더 진한 배경색 + 텍스트 색상 변화<br />
              <strong style={{ color: "var(--text-primary)" }}>Disabled:</strong> opacity 0.38 적용, 클릭 불가
            </p>
          </div>
        </Subsection>
      </Section>

      {/* Accessibility */}
      <Section title="Accessibility">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          TextButton 컴포넌트는 웹 접근성 표준을 준수합니다.
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
                <td style={{ padding: "12px 16px" }}><InlineCode>aria-label</InlineCode></td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>텍스트가 불명확할 때 액션을 설명하는 레이블</td>
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

        <Subsection title="Design Principles">
          <div style={{ display: "grid", gap: 16 }}>
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

      {/* Best Practices */}
      <Section title="Best Practices">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <PreviewBox>
              <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
                <button style={{
                  width: "100%",
                  height: 48,
                  backgroundColor: "#2563eb",
                  color: "white",
                  border: "none",
                  borderRadius: 12,
                  fontSize: 16,
                  fontWeight: 600,
                }}>
                  로그인
                </button>
                <TextButtonDemo variant="clear" color="brandDefault" size="medium">
                  회원가입
                </TextButtonDemo>
              </div>
            </PreviewBox>
            <DoLabel>Filled Button의 보조 액션으로 사용하여 시각적 계층을 형성합니다.</DoLabel>
          </div>
          <div>
            <PreviewBox>
              <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
                <TextButtonDemo variant="clear" color="brandDefault" size="large">
                  결제하기
                </TextButtonDemo>
              </div>
            </PreviewBox>
            <DontLabel>주요 CTA에 Text Button을 사용하지 마세요. Filled Button을 사용합니다.</DontLabel>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
          <div>
            <PreviewBox>
              <div style={{ padding: "16px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#18181b" }}>추천 상품</span>
                  <TextButtonDemo variant="arrow" color="baseDefault" size="small">
                    전체보기
                  </TextButtonDemo>
                </div>
              </div>
            </PreviewBox>
            <DoLabel>Arrow variant를 네비게이션 링크로 사용하여 이동을 유도합니다.</DoLabel>
          </div>
          <div>
            <PreviewBox>
              <div style={{ padding: 20, backgroundColor: "#2563eb", borderRadius: 12, margin: 12, textAlign: "center" }}>
                <TextButtonDemo variant="clear" color="brandDefault" size="medium">
                  가독성 낮음
                </TextButtonDemo>
              </div>
            </PreviewBox>
            <DontLabel>배경색과 텍스트 색상의 대비가 부족하면 가독성이 떨어집니다.</DontLabel>
          </div>
        </div>
      </Section>

      {/* Design Tokens */}
      <Section title="Design Tokens">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          TextButton 컴포넌트에 적용된 Foundation 기반 디자인 토큰입니다. <a href="/spacing" style={{ color: "var(--brand-primary)" }}>Spacing 토큰 전체 보기 →</a>
        </p>

        <Subsection title="Spacing & Layout">
          <div style={{ overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Property</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Foundation Token</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Padding Horizontal</td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><InlineCode>primitive.2</InlineCode></td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>8px</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Padding Vertical</td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><InlineCode>primitive.1</InlineCode></td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>4px</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Icon-Text Gap</td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><InlineCode>horizontal.3xs</InlineCode></td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>4px</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px", color: "var(--text-primary)" }}>Border Radius</td>
                  <td style={{ padding: "12px 16px" }}><InlineCode>primitive.sm</InlineCode></td>
                  <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>8px</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Typography (Size별)">
          <div style={{ overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Size</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Foundation Token</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><InlineCode>xSmall</InlineCode></td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><InlineCode>typography.xs.medium</InlineCode></td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>12px / 500</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><InlineCode>small</InlineCode></td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><InlineCode>typography.sm.medium</InlineCode></td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>14px / 500</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><InlineCode>medium</InlineCode></td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><InlineCode>typography.base.medium</InlineCode></td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>16px / 500</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><InlineCode>large</InlineCode></td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><InlineCode>typography.lg.medium</InlineCode></td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>18px / 500</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px" }}><InlineCode>xLarge</InlineCode></td>
                  <td style={{ padding: "12px 16px" }}><InlineCode>typography.xl.medium</InlineCode></td>
                  <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>20px / 500</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Interaction">
          <div style={{ overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Property</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Value</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>설명</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Hover Background</td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>rgba(color, 0.06)</td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>호버 시 연한 배경 오버레이</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Pressed Background</td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>rgba(color, 0.12)</td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>누름 시 더 진한 배경 오버레이</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Disabled Opacity</td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>0.38</td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>비활성화 시 전체 투명도</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px", color: "var(--text-primary)" }}>Min Touch Target</td>
                  <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>44px</td>
                  <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>iOS HIG 기준 최소 터치 영역</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>
      </Section>
    </>
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
            backgroundColor: "#f1f5f9",
            color: "#475569",
            borderRadius: 4,
            fontWeight: 500,
          }}>
            {variant} + {color}
          </span>
        </div>
        <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0, marginBottom: 6 }}>{desc}</p>
        <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: 0 }}>
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
      <Section title="Source Code">
        <div style={{ padding: 16, backgroundColor: "var(--bg-secondary)", borderRadius: 12, marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>TextButton Component</p>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "4px 0 0 0" }}>실제 컴포넌트 소스 코드를 GitHub에서 확인하세요.</p>
          </div>
          <a
            href={TEXTBUTTON_SOURCE}
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
        <CodeBlock code={`import { TextButton } from '@zkap/design-system';`} />
      </Section>

      <Section title="Basic Usage">
        <PreviewBox>
          <div style={{ display: "flex", gap: 16, alignItems: "center", padding: 24 }}>
            <TextButtonDemo variant="clear" color="brandDefault" size="medium">Text Button</TextButtonDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<TextButton
  variant="clear"
  color="brandDefault"
  size="medium"
  onClick={() => {}}
>
  Text Button
</TextButton>`} />
      </Section>

      <Section title="Variants">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
          세 가지 variant를 제공합니다: clear(기본), underline, arrow
        </p>
        <PreviewBox>
          <div style={{ display: "flex", gap: 24, alignItems: "center", padding: 24 }}>
            <TextButtonDemo variant="clear" color="brandDefault" size="medium">Clear</TextButtonDemo>
            <TextButtonDemo variant="underline" color="brandDefault" size="medium">Underline</TextButtonDemo>
            <TextButtonDemo variant="arrow" color="brandDefault" size="medium">Arrow</TextButtonDemo>
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

      <Section title="Colors">
        <PreviewBox>
          <div style={{ display: "flex", gap: 24, alignItems: "center", padding: 24 }}>
            <TextButtonDemo variant="clear" color="brandDefault" size="medium">Brand</TextButtonDemo>
            <TextButtonDemo variant="clear" color="baseDefault" size="medium">Base</TextButtonDemo>
            <TextButtonDemo variant="clear" color="errorDefault" size="medium">Error</TextButtonDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<TextButton color="brandDefault" onClick={() => {}}>Brand</TextButton>
<TextButton color="baseDefault" onClick={() => {}}>Base</TextButton>
<TextButton color="errorDefault" onClick={() => {}}>Error</TextButton>`} />
      </Section>

      <Section title="Sizes">
        <PreviewBox>
          <div style={{ display: "flex", gap: 24, alignItems: "center", padding: 24 }}>
            <TextButtonDemo variant="clear" color="brandDefault" size="xSmall">XSmall</TextButtonDemo>
            <TextButtonDemo variant="clear" color="brandDefault" size="small">Small</TextButtonDemo>
            <TextButtonDemo variant="clear" color="brandDefault" size="medium">Medium</TextButtonDemo>
            <TextButtonDemo variant="clear" color="brandDefault" size="large">Large</TextButtonDemo>
            <TextButtonDemo variant="clear" color="brandDefault" size="xLarge">XLarge</TextButtonDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<TextButton size="xSmall" onClick={() => {}}>XSmall</TextButton>
<TextButton size="small" onClick={() => {}}>Small</TextButton>
<TextButton size="medium" onClick={() => {}}>Medium</TextButton>
<TextButton size="large" onClick={() => {}}>Large</TextButton>
<TextButton size="xLarge" onClick={() => {}}>XLarge</TextButton>`} />
      </Section>

      <Section title="With Action Area">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
          Action Area에서 보조 액션으로 사용됩니다. 주요 버튼과 함께 시각적 계층을 형성합니다.
        </p>
        <PreviewBox>
          <div style={{ width: "100%", maxWidth: 320 }}>
            <ActionAreaWithTextButton />
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

      <Section title="States">
        <PreviewBox>
          <div style={{ display: "flex", gap: 24, alignItems: "center", padding: 24 }}>
            <TextButtonDemo variant="clear" color="brandDefault" size="medium">Default</TextButtonDemo>
            <TextButtonDemo variant="clear" color="brandDefault" size="medium" disabled>Disabled</TextButtonDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<TextButton color="brandDefault" onClick={() => {}}>
  Default
</TextButton>

<TextButton color="brandDefault" disabled onClick={() => {}}>
  Disabled
</TextButton>`} />
      </Section>

      <Section title="API Reference">
        <Subsection title="Common Props">
          <PropsTable
            props={[
              { name: "children", type: "ReactNode", required: true, description: "버튼 텍스트" },
              { name: "variant", type: '"clear" | "underline" | "arrow"', required: false, defaultVal: '"clear"', description: "버튼 스타일 변형" },
              { name: "color", type: '"brandDefault" | "baseDefault" | "errorDefault"', required: false, defaultVal: '"brandDefault"', description: "텍스트 색상" },
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

const TEXTBUTTON_NATIVE_SOURCE = `${GITHUB_BASE}/native/TextButton.tsx`;

function RNContent() {
  return (
    <div>
      <Section title="Source Code">
        <div style={{ padding: 16, backgroundColor: "var(--bg-secondary)", borderRadius: 12, marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>TextButton Component</p>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "4px 0 0 0" }}>실제 컴포넌트 소스 코드를 GitHub에서 확인하세요.</p>
          </div>
          <a
            href={TEXTBUTTON_NATIVE_SOURCE}
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
        <CodeBlock code={`import { TextButton } from '@zkap/design-system';`} />
      </Section>

      <Section title="Basic Usage">
        <PreviewBox>
          <div style={{ display: "flex", gap: 16, alignItems: "center", padding: 24 }}>
            <TextButtonDemo variant="clear" color="brandDefault" size="medium">Text Button</TextButtonDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<TextButton
  variant="clear"
  color="brandDefault"
  size="medium"
  onPress={() => {}}
>
  Text Button
</TextButton>`} />
      </Section>

      <Section title="Variants">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
          세 가지 variant를 제공합니다: clear(기본), underline, arrow
        </p>
        <PreviewBox>
          <div style={{ display: "flex", gap: 24, alignItems: "center", padding: 24 }}>
            <TextButtonDemo variant="clear" color="brandDefault" size="medium">Clear</TextButtonDemo>
            <TextButtonDemo variant="underline" color="brandDefault" size="medium">Underline</TextButtonDemo>
            <TextButtonDemo variant="arrow" color="brandDefault" size="medium">Arrow</TextButtonDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`{/* Clear (default) */}
<TextButton variant="clear" onPress={() => {}}>
  Clear
</TextButton>

{/* Underline */}
<TextButton variant="underline" onPress={() => {}}>
  Underline
</TextButton>

{/* Arrow - for navigation */}
<TextButton variant="arrow" onPress={() => {}}>
  Arrow
</TextButton>`} />
      </Section>

      <Section title="Colors">
        <PreviewBox>
          <div style={{ display: "flex", gap: 24, alignItems: "center", padding: 24 }}>
            <TextButtonDemo variant="clear" color="brandDefault" size="medium">Brand</TextButtonDemo>
            <TextButtonDemo variant="clear" color="baseDefault" size="medium">Base</TextButtonDemo>
            <TextButtonDemo variant="clear" color="errorDefault" size="medium">Error</TextButtonDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<TextButton color="brandDefault" onPress={() => {}}>Brand</TextButton>
<TextButton color="baseDefault" onPress={() => {}}>Base</TextButton>
<TextButton color="errorDefault" onPress={() => {}}>Error</TextButton>`} />
      </Section>

      <Section title="Sizes">
        <PreviewBox>
          <div style={{ display: "flex", gap: 24, alignItems: "center", padding: 24 }}>
            <TextButtonDemo variant="clear" color="brandDefault" size="xSmall">XSmall</TextButtonDemo>
            <TextButtonDemo variant="clear" color="brandDefault" size="small">Small</TextButtonDemo>
            <TextButtonDemo variant="clear" color="brandDefault" size="medium">Medium</TextButtonDemo>
            <TextButtonDemo variant="clear" color="brandDefault" size="large">Large</TextButtonDemo>
            <TextButtonDemo variant="clear" color="brandDefault" size="xLarge">XLarge</TextButtonDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<TextButton size="xSmall" onPress={() => {}}>XSmall</TextButton>
<TextButton size="small" onPress={() => {}}>Small</TextButton>
<TextButton size="medium" onPress={() => {}}>Medium</TextButton>
<TextButton size="large" onPress={() => {}}>Large</TextButton>
<TextButton size="xLarge" onPress={() => {}}>XLarge</TextButton>`} />
      </Section>

      <Section title="With Action Area">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
          Action Area에서 보조 액션으로 사용됩니다. 주요 버튼과 함께 시각적 계층을 형성합니다.
        </p>
        <PreviewBox>
          <div style={{ width: "100%", maxWidth: 320 }}>
            <ActionAreaWithTextButton />
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

      <Section title="States">
        <PreviewBox>
          <div style={{ display: "flex", gap: 24, alignItems: "center", padding: 24 }}>
            <TextButtonDemo variant="clear" color="brandDefault" size="medium">Default</TextButtonDemo>
            <TextButtonDemo variant="clear" color="brandDefault" size="medium" disabled>Disabled</TextButtonDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<TextButton color="brandDefault" onPress={() => {}}>
  Default
</TextButton>

<TextButton color="brandDefault" disabled onPress={() => {}}>
  Disabled
</TextButton>`} />
      </Section>

      <Section title="API Reference">
        <Subsection title="Common Props">
          <PropsTable
            props={[
              { name: "children", type: "ReactNode", required: true, description: "버튼 텍스트" },
              { name: "variant", type: '"clear" | "underline" | "arrow"', required: false, defaultVal: '"clear"', description: "버튼 스타일 변형" },
              { name: "color", type: '"brandDefault" | "baseDefault" | "errorDefault"', required: false, defaultVal: '"brandDefault"', description: "텍스트 색상" },
              { name: "size", type: '"xSmall" | "small" | "medium" | "large" | "xLarge"', required: false, defaultVal: '"medium"', description: "텍스트 크기" },
              { name: "disabled", type: "boolean", required: false, defaultVal: "false", description: "비활성화 상태" },
            ]}
          />
        </Subsection>
        <Subsection title="React Native-specific Props">
          <PropsTable
            props={[
              { name: "onPress", type: "(event: GestureResponderEvent) => void", required: false, description: "탭 핸들러" },
              { name: "onPressIn", type: "(event: GestureResponderEvent) => void", required: false, description: "터치 시작 핸들러" },
              { name: "onPressOut", type: "(event: GestureResponderEvent) => void", required: false, description: "터치 종료 핸들러" },
              { name: "accessibilityLabel", type: "string", required: false, description: "스크린 리더용 레이블" },
              { name: "accessibilityHint", type: "string", required: false, description: "동작 힌트 설명" },
              { name: "hitSlop", type: "Insets", required: false, description: "터치 영역 확장" },
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
        <rect x="120" y="30" width="160" height="40" fill="transparent" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4" rx="6" />

        {/* Text Label */}
        <text x="200" y="55" textAnchor="middle" fontSize="16" fontWeight="500" fill="#2563eb">Text Button</text>

        {/* Arrow Icon (for arrow variant) */}
        <path d="M275 50 L285 50 M280 45 L285 50 L280 55" stroke="#2563eb" strokeWidth="2" fill="none" />

        {/* Underline (for underline variant) */}
        <line x1="150" y1="62" x2="250" y2="62" stroke="#2563eb" strokeWidth="1" strokeDasharray="4" opacity="0.5" />

        {/* Annotations */}
        {/* 1. Label */}
        <circle cx="200" cy="12" r="10" fill="#3b82f6" />
        <text x="200" y="16" textAnchor="middle" fontSize="11" fill="white" fontWeight="600">1</text>
        <line x1="200" y1="22" x2="200" y2="35" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2" />

        {/* 2. Trailing Icon */}
        <circle cx="320" cy="50" r="10" fill="#3b82f6" />
        <text x="320" y="54" textAnchor="middle" fontSize="11" fill="white" fontWeight="600">2</text>
        <line x1="310" y1="50" x2="290" y2="50" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2" />

        {/* 3. Underline */}
        <circle cx="200" cy="88" r="10" fill="#3b82f6" />
        <text x="200" y="92" textAnchor="middle" fontSize="11" fill="white" fontWeight="600">3</text>
        <line x1="200" y1="78" x2="200" y2="66" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2" />

        {/* 4. Touch area */}
        <circle cx="80" cy="50" r="10" fill="#3b82f6" />
        <text x="80" y="54" textAnchor="middle" fontSize="11" fill="white" fontWeight="600">4</text>
        <line x1="90" y1="50" x2="118" y2="50" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2" />
      </svg>
    </PreviewBox>
  );
}

// Guideline Item
function GuidelineItem({ type, title, description }: { type: "do" | "dont"; title: string; description: string }) {
  return (
    <div style={{ display: "flex", gap: 16 }}>
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          backgroundColor: type === "do" ? "#22c55e" : "#ef4444",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {type === "do" ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        )}
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: "var(--text-primary)" }}>{title}</div>
        <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{description}</div>
      </div>
    </div>
  );
}

// Variant Card for 2x2 grid layout
function VariantCard({ name, description, children }: {
  name: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{
      padding: 20,
      backgroundColor: "white",
      borderRadius: 12,
      border: "1px solid var(--divider)",
    }}>
      {/* Preview */}
      <div style={{
        height: 80,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fafbfc",
        borderRadius: 12,
        marginBottom: 16,
      }}>
        {children}
      </div>
      {/* Info */}
      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>
        {name}
      </div>
      <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>
        {description}
      </p>
    </div>
  );
}

// Phone Frame Component for Usage Guidelines
// Principle Card (matches Action Area style)
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
      <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: 0, lineHeight: 1.6, paddingLeft: 34 }}>{desc}</p>
    </div>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        borderRadius: 24,
        border: "2px solid #d1d5db",
        overflow: "hidden",
        backgroundColor: "white",
      }}
    >
      {/* Status Bar */}
      <div style={{
        padding: "8px 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: 12,
        fontWeight: 500,
        color: "#18181b",
      }}>
        <span>9:41</span>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3C7.46 3 3.34 4.78.29 7.67c-.18.18-.29.43-.29.71 0 .28.11.53.29.71l2.48 2.48c.18.18.43.29.71.29.27 0 .52-.11.7-.28.79-.74 1.69-1.36 2.66-1.85.33-.16.56-.5.56-.9v-3.1c1.45-.48 3-.73 4.6-.73s3.15.25 4.6.73v3.1c0 .4.23.74.56.9.98.49 1.87 1.12 2.67 1.85.18.18.43.28.7.28.28 0 .53-.11.71-.29l2.48-2.48c.18-.18.29-.43.29-.71 0-.28-.11-.53-.29-.71C20.66 4.78 16.54 3 12 3z"/>
          </svg>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/>
          </svg>
        </div>
      </div>

      {/* Content */}
      <div style={{ minHeight: 160 }}>
        {children}
      </div>

      {/* Home Indicator */}
      <div style={{ padding: "8px 0 12px", display: "flex", justifyContent: "center" }}>
        <div style={{ width: 60, height: 4, backgroundColor: "#d1d5db", borderRadius: 2 }} />
      </div>
    </div>
  );
}

// Usage Card Component with partial phone frame
function UsageCard({ type, title, description, position = "top", children }: {
  type: "do" | "dont";
  title: string;
  description: string;
  position?: "top" | "bottom";
  children: React.ReactNode;
}) {
  const isBottom = position === "bottom";

  return (
    <div>
      {/* Card with gray background and partial phone frame */}
      <div
        style={{
          backgroundColor: "#f5f5f7",
          borderRadius: 16,
          padding: isBottom ? "0 24px 24px" : "24px 24px 0",
          overflow: "hidden",
        }}
      >
        {/* Partial Phone Frame */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: isBottom ? "0 0 20px 20px" : "20px 20px 0 0",
            borderLeft: "2px solid #e5e7eb",
            borderRight: "2px solid #e5e7eb",
            borderTop: isBottom ? "none" : "2px solid #e5e7eb",
            borderBottom: isBottom ? "2px solid #e5e7eb" : "none",
            overflow: "hidden",
            marginTop: isBottom ? 0 : 20,
            marginBottom: isBottom ? 20 : 0,
          }}
        >
          {children}
          {/* Home indicator for bottom position */}
          {isBottom && (
            <div style={{ padding: "8px 0 12px", backgroundColor: "white", display: "flex", justifyContent: "center" }}>
              <div style={{ width: 60, height: 4, backgroundColor: "#d1d5db", borderRadius: 2 }} />
            </div>
          )}
        </div>
      </div>

      {/* Do/Don't indicator with description */}
      <div style={{ display: "flex", gap: 12, marginTop: 16, alignItems: "flex-start" }}>
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            backgroundColor: type === "do" ? "#22c55e" : "#ef4444",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            marginTop: 1,
          }}
        >
          {type === "do" ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          )}
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>{title}</div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{description}</div>
        </div>
      </div>
    </div>
  );
}

// Action Area with Text Button Demo
function ActionAreaWithTextButton() {
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
      <div style={{ padding: 20, backgroundColor: "white" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
          {/* Main Button */}
          <button
            style={{
              width: "100%",
              height: 48,
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: 12,
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            로그인
          </button>
          {/* Text Button */}
          <TextButtonDemo variant="clear" color="brandDefault" size="medium">
            회원가입
          </TextButtonDemo>
        </div>
      </div>
      {/* Home indicator */}
      <div style={{ padding: "8px 0 12px", backgroundColor: "white", display: "flex", justifyContent: "center" }}>
        <div style={{ width: 60, height: 4, backgroundColor: "#d1d5db", borderRadius: 2 }} />
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

function TextButtonDemo({ variant, color, size, disabled, isHovered, isPressed, children }: TextButtonDemoProps) {
  // For forced hover/pressed states (used in States section previews),
  // apply background overlay styles manually since the real component
  // manages its own hover/pressed states internally.
  const forcedStyle: React.CSSProperties = {};
  if (isPressed) {
    const pressedBgMap: Record<TextButtonColor, string> = {
      brandDefault: "rgba(37, 99, 235, 0.12)",
      baseDefault: "rgba(55, 65, 81, 0.12)",
      errorDefault: "rgba(220, 38, 38, 0.12)",
    };
    forcedStyle.backgroundColor = pressedBgMap[color];
  } else if (isHovered) {
    const hoverBgMap: Record<TextButtonColor, string> = {
      brandDefault: "rgba(37, 99, 235, 0.06)",
      baseDefault: "rgba(55, 65, 81, 0.06)",
      errorDefault: "rgba(220, 38, 38, 0.06)",
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
