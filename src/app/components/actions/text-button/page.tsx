"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform, highlightCode } from "@/components/PlatformTabs";

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

// Section component
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 48 }}>
      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: "var(--text-primary)" }}>
        {title}
      </h2>
      {children}
    </section>
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
    <div>
      {/* Anatomy */}
      <Section title="Anatomy">
        <AnatomyDiagram />
        <div style={{ marginTop: 20 }}>
          <ol style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.8, paddingLeft: 20, margin: 0 }}>
            <li><strong>Label</strong> - 버튼의 액션을 설명하는 텍스트</li>
            <li><strong>Leading Icon</strong> (optional) - 라벨 앞에 위치하는 아이콘</li>
            <li><strong>Trailing Icon</strong> (optional) - 라벨 뒤에 위치하는 아이콘 (Arrow variant)</li>
            <li><strong>Underline</strong> (optional) - 텍스트 하단의 밑줄 (Underline variant)</li>
          </ol>
        </div>
      </Section>

      {/* Variants */}
      <Section title="Variants">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {/* Clear */}
          <VariantCard
            name="Clear"
            description="기본 텍스트 버튼. 배경이나 장식 없이 텍스트만으로 액션을 표현합니다."
          >
            <TextButtonDemo variant="clear" color="brandDefault" size="medium">텍스트 버튼</TextButtonDemo>
          </VariantCard>

          {/* Underline */}
          <VariantCard
            name="Underline"
            description="밑줄이 있는 텍스트 버튼. 링크처럼 보이면서 버튼 역할을 합니다."
          >
            <TextButtonDemo variant="underline" color="brandDefault" size="medium">더 알아보기</TextButtonDemo>
          </VariantCard>

          {/* Arrow */}
          <VariantCard
            name="Arrow"
            description="화살표 아이콘이 있는 네비게이션 버튼. 다음 페이지나 상세 화면으로 이동할 때 사용합니다."
          >
            <TextButtonDemo variant="arrow" color="brandDefault" size="medium">더보기</TextButtonDemo>
          </VariantCard>

          {/* Color Variations */}
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

      {/* Sizes */}
      <Section title="Sizes">
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

      {/* Colors */}
      <Section title="Colors">
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

      {/* States */}
      <Section title="States">
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
      </Section>

      {/* Design Tokens */}
      <Section title="Design Tokens">
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
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>Font Size (XS)</td>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>typography.size.xs</code></td>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-tertiary)" }}>12px</td>
              </tr>
              <tr>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>Font Size (S)</td>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>typography.size.sm</code></td>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-tertiary)" }}>14px</td>
              </tr>
              <tr>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>Font Size (M)</td>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>typography.size.md</code></td>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-tertiary)" }}>16px</td>
              </tr>
              <tr>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>Font Size (L)</td>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>typography.size.lg</code></td>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-tertiary)" }}>18px</td>
              </tr>
              <tr>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>Font Size (XL)</td>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>typography.size.xl</code></td>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-tertiary)" }}>20px</td>
              </tr>
              <tr>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>Font Weight</td>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>typography.weight.medium</code></td>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-tertiary)" }}>500</td>
              </tr>
              <tr>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>Icon Gap</td>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>horizontal.3xs</code></td>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-tertiary)" }}>4px</td>
              </tr>
              <tr>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>Padding Vertical</td>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>primitive.1</code></td>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-tertiary)" }}>4px</td>
              </tr>
              <tr>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>Border Radius</td>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>radius.xs</code></td>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-tertiary)" }}>6px</td>
              </tr>
              <tr>
                <td style={{ padding: "10px 16px", color: "var(--text-secondary)" }}>Disabled Opacity</td>
                <td style={{ padding: "10px 16px" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>opacity.disabled</code></td>
                <td style={{ padding: "10px 16px", color: "var(--text-tertiary)" }}>0.38</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* Usage Guidelines */}
      <Section title="Usage Guidelines">
        {/* 2x2 Grid with Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          {/* Card 1: Do - 보조 액션에 사용 (bottom position) */}
          <UsageCard type="do" title="보조 액션에 사용" description="주요 버튼(Filled Button)과 함께 사용하여 보조 액션을 제공합니다. 시각적 계층을 형성하여 주요 액션을 강조합니다." position="bottom">
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
          </UsageCard>

          {/* Card 2: Do - 네비게이션 링크로 사용 */}
          <UsageCard type="do" title="네비게이션 링크로 사용" description="Arrow variant를 사용하여 '더보기', '전체보기' 등 페이지 이동을 유도합니다.">
            <div style={{ padding: "16px 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span style={{ fontSize: 18, fontWeight: 700, color: "#18181b" }}>추천 상품</span>
                <TextButtonDemo variant="arrow" color="baseDefault" size="small">
                  전체보기
                </TextButtonDemo>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ width: 72, height: 72, backgroundColor: "#e5e7eb", borderRadius: 12 }} />
                <div style={{ width: 72, height: 72, backgroundColor: "#e5e7eb", borderRadius: 12 }} />
                <div style={{ width: 72, height: 72, backgroundColor: "#e5e7eb", borderRadius: 12 }} />
              </div>
            </div>
          </UsageCard>

          {/* Card 3: Don't - 주요 CTA로 사용 금지 (bottom position) */}
          <UsageCard type="dont" title="주요 CTA로 사용 금지" description="Text Button은 시각적 강조가 약하므로 중요한 Call-to-Action에는 Filled Button을 사용하세요." position="bottom">
            <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
              <TextButtonDemo variant="clear" color="brandDefault" size="large">
                결제하기
              </TextButtonDemo>
              <div style={{ fontSize: 12, color: "#ef4444", marginTop: 4 }}>CTA에 텍스트 버튼 사용 X</div>
            </div>
          </UsageCard>

          {/* Card 4: Don't - 배경색 대비 주의 */}
          <UsageCard type="dont" title="배경색 대비 주의" description="배경색과 텍스트 색상의 대비가 충분하지 않으면 가독성이 떨어집니다.">
            <div style={{ padding: 20, backgroundColor: "#2563eb", borderRadius: 12, margin: 16 }}>
              <TextButtonDemo variant="clear" color="brandDefault" size="medium">
                가독성 낮음
              </TextButtonDemo>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 8 }}>파란 배경 + 파란 텍스트</div>
            </div>
          </UsageCard>
        </div>
      </Section>

      {/* Design Principles */}
      <Section title="Design Principles">
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
            desc="배경이 없어도 hover, pressed 상태에서 명확한 피드백을 제공합니다. opacity 변화로 인터랙션 상태를 표현합니다."
          />
        </div>
      </Section>

      {/* Accessibility */}
      <Section title="Accessibility">
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
        </div>
      </Section>
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

      <Section title="API Reference">
        <div style={{ overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Prop</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Type</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Default</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>variant</code></td>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>'clear' | 'underline' | 'arrow'</td>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-tertiary)" }}>'clear'</td>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>버튼 스타일 변형</td>
              </tr>
              <tr>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>color</code></td>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>'brandDefault' | 'baseDefault' | 'errorDefault'</td>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-tertiary)" }}>'brandDefault'</td>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>텍스트 색상</td>
              </tr>
              <tr>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>size</code></td>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>'xSmall' | 'small' | 'medium' | 'large' | 'xLarge'</td>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-tertiary)" }}>'medium'</td>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>텍스트 크기</td>
              </tr>
              <tr>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>disabled</code></td>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>boolean</td>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-tertiary)" }}>false</td>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>비활성화 상태</td>
              </tr>
              <tr>
                <td style={{ padding: "10px 16px" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>onClick</code></td>
                <td style={{ padding: "10px 16px", color: "var(--text-secondary)" }}>() =&gt; void</td>
                <td style={{ padding: "10px 16px", color: "var(--text-tertiary)" }}>-</td>
                <td style={{ padding: "10px 16px", color: "var(--text-secondary)" }}>클릭 이벤트 핸들러</td>
              </tr>
            </tbody>
          </table>
        </div>
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

      <Section title="API Reference">
        <div style={{ overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Prop</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Type</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Default</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>variant</code></td>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>'clear' | 'underline' | 'arrow'</td>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-tertiary)" }}>'clear'</td>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>버튼 스타일 변형</td>
              </tr>
              <tr>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>color</code></td>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>'brandDefault' | 'baseDefault' | 'errorDefault'</td>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-tertiary)" }}>'brandDefault'</td>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>텍스트 색상</td>
              </tr>
              <tr>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>size</code></td>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>'xSmall' | 'small' | 'medium' | 'large' | 'xLarge'</td>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-tertiary)" }}>'medium'</td>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>텍스트 크기</td>
              </tr>
              <tr>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>disabled</code></td>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>boolean</td>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-tertiary)" }}>false</td>
                <td style={{ padding: "10px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>비활성화 상태</td>
              </tr>
              <tr>
                <td style={{ padding: "10px 16px" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>onPress</code></td>
                <td style={{ padding: "10px 16px", color: "var(--text-secondary)" }}>() =&gt; void</td>
                <td style={{ padding: "10px 16px", color: "var(--text-tertiary)" }}>-</td>
                <td style={{ padding: "10px 16px", color: "var(--text-secondary)" }}>터치 이벤트 핸들러</td>
              </tr>
            </tbody>
          </table>
        </div>
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
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const actualHovered = isHovered ?? hovered;
  const actualPressed = isPressed ?? pressed;

  const getColor = () => {
    if (disabled) return "#9ca3af";
    switch (color) {
      case "brandDefault": return "#2563eb";
      case "baseDefault": return "#374151";
      case "errorDefault": return "#dc2626";
    }
  };

  const getFontSize = () => {
    switch (size) {
      case "xSmall": return 12;
      case "small": return 14;
      case "medium": return 16;
      case "large": return 18;
      case "xLarge": return 20;
    }
  };

  const getBackgroundColor = () => {
    if (disabled) return "transparent";

    // 각 컬러별 배경색 (pressed > hovered > default)
    const colorMap = {
      brandDefault: {
        pressed: "rgba(37, 99, 235, 0.12)",
        hovered: "rgba(37, 99, 235, 0.06)",
        default: "transparent",
      },
      baseDefault: {
        pressed: "rgba(55, 65, 81, 0.12)",
        hovered: "rgba(55, 65, 81, 0.06)",
        default: "transparent",
      },
      errorDefault: {
        pressed: "rgba(220, 38, 38, 0.12)",
        hovered: "rgba(220, 38, 38, 0.06)",
        default: "transparent",
      },
    };

    const colors = colorMap[color];
    if (actualPressed) return colors.pressed;
    if (actualHovered) return colors.hovered;
    return colors.default;
  };

  return (
    <button
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "4px 8px",
        border: "none",
        borderRadius: 6,
        backgroundColor: getBackgroundColor(),
        color: getColor(),
        fontSize: getFontSize(),
        fontWeight: 500,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.38 : 1,
        textDecoration: variant === "underline" ? "underline" : "none",
        transition: "background-color 0.15s ease, opacity 0.15s ease",
      }}
    >
      {children}
      {variant === "arrow" && (
        <svg
          width={getFontSize() * 0.75}
          height={getFontSize() * 0.75}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      )}
    </button>
  );
}
