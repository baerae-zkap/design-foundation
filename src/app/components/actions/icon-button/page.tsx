"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform, highlightCode } from "@/components/PlatformTabs";

// Types
type IconButtonVariant = "filled" | "ghost" | "outlined";
type IconButtonColor = "brandDefault" | "baseDefault" | "errorDefault";
type IconButtonSize = "small" | "medium" | "large";

// Size configurations
const sizeConfig: Record<IconButtonSize, { size: number; iconSize: number }> = {
  small: { size: 32, iconSize: 18 },
  medium: { size: 40, iconSize: 22 },
  large: { size: 48, iconSize: 26 },
};

// Color configurations
const colorConfig: Record<IconButtonColor, {
  filled: { bg: string; bgPressed: string; color: string };
  ghost: { bg: string; bgHover: string; bgPressed: string; color: string; colorPressed: string };
  outlined: { bg: string; bgPressed: string; color: string; border: string };
}> = {
  brandDefault: {
    filled: { bg: '#2563eb', bgPressed: '#1d4ed8', color: 'white' },
    ghost: { bg: 'transparent', bgHover: 'rgba(37, 99, 235, 0.08)', bgPressed: 'rgba(37, 99, 235, 0.12)', color: '#2563eb', colorPressed: '#1d4ed8' },
    outlined: { bg: 'white', bgPressed: '#eff6ff', color: '#2563eb', border: '#2563eb' },
  },
  baseDefault: {
    filled: { bg: '#334155', bgPressed: '#1e293b', color: 'white' },
    ghost: { bg: 'transparent', bgHover: 'rgba(0, 0, 0, 0.04)', bgPressed: 'rgba(0, 0, 0, 0.08)', color: '#334155', colorPressed: '#1e293b' },
    outlined: { bg: 'white', bgPressed: '#f8fafc', color: '#334155', border: '#cbd5e1' },
  },
  errorDefault: {
    filled: { bg: '#ef4444', bgPressed: '#dc2626', color: 'white' },
    ghost: { bg: 'transparent', bgHover: 'rgba(239, 68, 68, 0.08)', bgPressed: 'rgba(239, 68, 68, 0.12)', color: '#ef4444', colorPressed: '#dc2626' },
    outlined: { bg: 'white', bgPressed: '#fef2f2', color: '#dc2626', border: '#ef4444' },
  },
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
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
        Icon Button
      </h1>
      <p style={{ fontSize: 15, color: "var(--text-secondary)", marginBottom: 32, lineHeight: 1.6 }}>
        아이콘만으로 구성된 원형 버튼입니다. 공간이 제한된 영역이나 반복적인 액션에 사용됩니다.
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
  const [color, setColor] = useState<IconButtonColor>("baseDefault");
  const [size, setSize] = useState<IconButtonSize>("medium");
  const [disabled, setDisabled] = useState(false);
  const [codeType, setCodeType] = useState<"rn" | "web">("rn");

  const generateCode = () => {
    const props = [];
    if (variant !== "ghost") props.push(`variant="${variant}"`);
    if (color !== "baseDefault") props.push(`color="${color}"`);
    if (size !== "medium") props.push(`size="${size}"`);
    if (disabled) props.push("disabled");

    const propsStr = props.length > 0 ? `\n  ${props.join("\n  ")}\n` : " ";

    if (codeType === "rn") {
      return `<IconButton${propsStr.length > 1 ? propsStr : " "}onPress={() => {}}>
  <PlusIcon />
</IconButton>`;
    } else {
      return `<IconButton${propsStr.length > 1 ? propsStr : " "}onClick={() => {}}>
  <PlusIcon />
</IconButton>`;
    }
  };

  const colorLabels: Record<IconButtonColor, string> = {
    brandDefault: "Brand",
    baseDefault: "Base",
    errorDefault: "Error",
  };

  return (
    <div style={{ marginBottom: 32 }}>
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
              backgroundColor: "#fafbfc",
              display: "flex",
              flexDirection: "column",
              padding: 16,
              overflow: "hidden",
              height: "100%",
              boxSizing: "border-box",
            }}
          >
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
                  { value: "ghost", label: "Ghost" },
                  { value: "filled", label: "Filled" },
                  { value: "outlined", label: "Outlined" },
                ]}
                value={variant}
                onChange={(v) => setVariant(v as IconButtonVariant)}
              />

              {/* Color */}
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8, display: "block" }}>
                  Color
                </label>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {(Object.keys(colorLabels) as IconButtonColor[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      style={{
                        padding: "6px 10px",
                        fontSize: 12,
                        borderRadius: 6,
                        border: color === c ? "2px solid #2563eb" : "1px solid #e2e8f0",
                        backgroundColor: color === c ? "#eff6ff" : "white",
                        color: color === c ? "#2563eb" : "#64748b",
                        cursor: "pointer",
                      }}
                    >
                      {colorLabels[c]}
                    </button>
                  ))}
                </div>
              </div>

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
    <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
      {/* Anatomy */}
      <Section title="Anatomy">
        <PreviewBox>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <div style={{ position: "relative" }}>
              <IconButtonDemo variant="ghost" color="baseDefault" size="large" />
              <div style={{ position: "absolute", top: -24, left: "50%", transform: "translateX(-50%)", fontSize: 10, color: "#64748b", whiteSpace: "nowrap" }}>① Container</div>
              <div style={{ position: "absolute", top: "50%", right: -50, transform: "translateY(-50%)", fontSize: 10, color: "#64748b" }}>② Icon</div>
            </div>
          </div>
        </PreviewBox>
        <div style={{ marginTop: 16, padding: 16, backgroundColor: "var(--bg-secondary)", borderRadius: 12, fontSize: 13 }}>
          <p style={{ margin: 0, color: "var(--text-secondary)", lineHeight: 1.8 }}>
            <strong style={{ color: "var(--text-primary)" }}>① Container:</strong> 원형 버튼 컨테이너<br />
            <strong style={{ color: "var(--text-primary)" }}>② Icon:</strong> 아이콘 콘텐츠
          </p>
        </div>
      </Section>

      {/* Variants */}
      <Section title="Variants">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          <VariantCard name="Ghost" description="투명 배경, 기본 스타일">
            <IconButtonDemo variant="ghost" color="baseDefault" />
          </VariantCard>
          <VariantCard name="Filled" description="채워진 배경, 강조 액션">
            <IconButtonDemo variant="filled" color="brandDefault" />
          </VariantCard>
          <VariantCard name="Outlined" description="테두리만 표시">
            <IconButtonDemo variant="outlined" color="baseDefault" />
          </VariantCard>
        </div>
      </Section>

      {/* Sizes */}
      <Section title="Sizes">
        <PreviewBox>
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <IconButtonDemo size="small" />
              <p style={{ fontSize: 11, color: "#64748b", marginTop: 8 }}>32px</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <IconButtonDemo size="medium" />
              <p style={{ fontSize: 11, color: "#64748b", marginTop: 8 }}>40px</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <IconButtonDemo size="large" />
              <p style={{ fontSize: 11, color: "#64748b", marginTop: 8 }}>48px</p>
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* Colors */}
      <Section title="Colors">
        <Subsection title="Ghost">
          <PreviewBox>
            <div style={{ display: "flex", gap: 16 }}>
              <IconButtonDemo variant="ghost" color="brandDefault" />
              <IconButtonDemo variant="ghost" color="baseDefault" />
              <IconButtonDemo variant="ghost" color="errorDefault" />
            </div>
          </PreviewBox>
        </Subsection>
        <Subsection title="Filled">
          <PreviewBox>
            <div style={{ display: "flex", gap: 16 }}>
              <IconButtonDemo variant="filled" color="brandDefault" />
              <IconButtonDemo variant="filled" color="baseDefault" />
              <IconButtonDemo variant="filled" color="errorDefault" />
            </div>
          </PreviewBox>
        </Subsection>
        <Subsection title="Outlined">
          <PreviewBox>
            <div style={{ display: "flex", gap: 16 }}>
              <IconButtonDemo variant="outlined" color="brandDefault" />
              <IconButtonDemo variant="outlined" color="baseDefault" />
              <IconButtonDemo variant="outlined" color="errorDefault" />
            </div>
          </PreviewBox>
        </Subsection>
      </Section>

      {/* States */}
      <Section title="States">
        <PreviewBox>
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <IconButtonDemo variant="ghost" color="baseDefault" />
              <p style={{ fontSize: 11, color: "#64748b", marginTop: 8 }}>Default</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <IconButtonDemo variant="ghost" color="baseDefault" disabled />
              <p style={{ fontSize: 11, color: "#64748b", marginTop: 8 }}>Disabled</p>
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* Design Tokens */}
      <Section title="Design Tokens">
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>Property</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>Small</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>Medium</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>Large</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px" }}>Button Size</td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "#6366f1" }}>32px</td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "#6366f1" }}>40px</td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "#6366f1" }}>48px</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px" }}>Icon Size</td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "#6366f1" }}>18px</td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "#6366f1" }}>22px</td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "#6366f1" }}>26px</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px" }}>Border Radius</td>
                <td colSpan={3} style={{ padding: "12px 16px", fontFamily: "monospace", color: "#6366f1" }}>9999px (circular)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* Accessibility */}
      <Section title="Accessibility">
        <div style={{ display: "grid", gap: 12 }}>
          <PrincipleCard number={1} title="Touch Target" desc="최소 32px 이상의 터치 영역을 확보합니다." />
          <PrincipleCard number={2} title="Accessibility Label" desc="아이콘만 있으므로 aria-label 또는 accessibilityLabel을 필수로 제공합니다." />
          <PrincipleCard number={3} title="Disabled State" desc="비활성화 상태는 시각적으로 구분되며 스크린 리더에 전달됩니다." />
        </div>
      </Section>
    </div>
  );
}

const GITHUB_BASE = "https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system/src";
const ICONBUTTON_SOURCE = `${GITHUB_BASE}/components/IconButton/IconButton.tsx`;
const ICONBUTTON_NATIVE_SOURCE = `${GITHUB_BASE}/native/IconButton.tsx`;

function WebContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
      {/* Source Code */}
      <Section title="Source Code">
        <div style={{ padding: 16, backgroundColor: "var(--bg-secondary)", borderRadius: 12, marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>IconButton Component</p>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "4px 0 0 0" }}>실제 컴포넌트 소스 코드를 GitHub에서 확인하세요.</p>
          </div>
          <a
            href={ICONBUTTON_SOURCE}
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

      {/* Import */}
      <Section title="Import">
        <CodeBlock code={`import { IconButton } from '@baerae-zkap/design-system';`} />
      </Section>

      {/* Basic Usage */}
      <Section title="Basic Usage">
        <PreviewBox>
          <div style={{ display: "flex", gap: 16, alignItems: "center", padding: 24 }}>
            <IconButtonDemo variant="ghost" color="baseDefault" />
          </div>
        </PreviewBox>
        <CodeBlock code={`<IconButton onClick={() => {}}>
  <PlusIcon />
</IconButton>`} />
      </Section>

      {/* Variants */}
      <Section title="Variants">
        <PreviewBox>
          <div style={{ display: "flex", gap: 16, alignItems: "center", padding: 24 }}>
            <IconButtonDemo variant="ghost" color="baseDefault" />
            <IconButtonDemo variant="filled" color="brandDefault" />
            <IconButtonDemo variant="outlined" color="baseDefault" />
          </div>
        </PreviewBox>
        <CodeBlock code={`<IconButton variant="ghost" onClick={() => {}}>
  <MenuIcon />
</IconButton>

<IconButton variant="filled" color="brandDefault" onClick={() => {}}>
  <PlusIcon />
</IconButton>

<IconButton variant="outlined" onClick={() => {}}>
  <SettingsIcon />
</IconButton>`} />
      </Section>

      {/* API Reference */}
      <Section title="API Reference">
        <PropsTable
          props={[
            { name: "variant", type: '"filled" | "ghost" | "outlined"', required: false, defaultVal: '"ghost"', description: "버튼 스타일" },
            { name: "color", type: '"brandDefault" | "baseDefault" | "errorDefault"', required: false, defaultVal: '"baseDefault"', description: "색상 테마" },
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

function RNContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
      {/* Source Code */}
      <Section title="Source Code">
        <div style={{ padding: 16, backgroundColor: "var(--bg-secondary)", borderRadius: 12, marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>IconButton Component</p>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "4px 0 0 0" }}>실제 컴포넌트 소스 코드를 GitHub에서 확인하세요.</p>
          </div>
          <a
            href={ICONBUTTON_NATIVE_SOURCE}
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

      {/* Import */}
      <Section title="Import">
        <CodeBlock code={`import { IconButton } from '@baerae-zkap/design-system/native';`} />
      </Section>

      {/* Basic Usage */}
      <Section title="Basic Usage">
        <PreviewBox>
          <div style={{ display: "flex", gap: 16, alignItems: "center", padding: 24 }}>
            <IconButtonDemo variant="ghost" color="baseDefault" />
          </div>
        </PreviewBox>
        <CodeBlock code={`<IconButton onPress={() => {}}>
  <PlusIcon />
</IconButton>`} />
      </Section>

      {/* API Reference */}
      <Section title="API Reference">
        <PropsTable
          props={[
            { name: "variant", type: '"filled" | "ghost" | "outlined"', required: false, defaultVal: '"ghost"', description: "버튼 스타일" },
            { name: "color", type: '"brandDefault" | "baseDefault" | "errorDefault"', required: false, defaultVal: '"baseDefault"', description: "색상 테마" },
            { name: "size", type: '"small" | "medium" | "large"', required: false, defaultVal: '"medium"', description: "버튼 크기" },
            { name: "disabled", type: "boolean", required: false, defaultVal: "false", description: "비활성화 상태" },
            { name: "children", type: "ReactNode", required: true, description: "아이콘 콘텐츠" },
            { name: "onPress", type: "(event) => void", required: false, description: "탭 핸들러" },
          ]}
        />
      </Section>
    </div>
  );
}

// ============================================
// Shared Components
// ============================================

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 0 }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Subsection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: "var(--text-primary)" }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

function VariantCard({ name, description, children }: { name: string; description: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: 20, backgroundColor: "white", borderRadius: 12, border: "1px solid var(--divider)" }}>
      <div style={{ height: 60, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#fafbfc", borderRadius: 8, marginBottom: 16 }}>
        {children}
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>{name}</div>
      <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>{description}</p>
    </div>
  );
}

function PrincipleCard({ number, title, desc }: { number: number; title: string; desc: string }) {
  return (
    <div style={{ padding: 20, backgroundColor: "white", borderRadius: 12, border: "1px solid var(--divider)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <span style={{ width: 22, height: 22, borderRadius: "50%", backgroundColor: "#e5e7eb", color: "#6b7280", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600 }}>{number}</span>
        <span style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)" }}>{title}</span>
      </div>
      <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: 0, lineHeight: 1.6, paddingLeft: 34 }}>{desc}</p>
    </div>
  );
}

function RadioGroup({ label, options, value, onChange }: { label: string; options: { value: string; label: string }[]; value: string; onChange: (v: string) => void }) {
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


function PropsTable({ props }: { props: { name: string; type: string; required: boolean; defaultVal?: string; description: string }[] }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>Prop</th>
            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>Type</th>
            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>Default</th>
            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name} style={{ borderBottom: "1px solid var(--divider)" }}>
              <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "#6366f1" }}>{prop.name}{prop.required && <span style={{ color: "#ef4444" }}>*</span>}</td>
              <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 12, color: "#64748b" }}>{prop.type}</td>
              <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 12 }}>{prop.defaultVal || "-"}</td>
              <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ============================================
// Demo Component
// ============================================

function IconButtonDemo({
  variant = "ghost",
  color = "baseDefault",
  size = "medium",
  disabled = false,
}: {
  variant?: IconButtonVariant;
  color?: IconButtonColor;
  size?: IconButtonSize;
  disabled?: boolean;
}) {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const sizeStyle = sizeConfig[size];
  const colorStyle = colorConfig[color][variant];

  // Determine background color based on state
  let backgroundColor: string;
  if (variant === "ghost") {
    const ghostStyle = colorStyle as typeof colorConfig.brandDefault.ghost;
    backgroundColor = isPressed ? ghostStyle.bgPressed : isHovered ? ghostStyle.bgHover : ghostStyle.bg;
  } else if (variant === "filled") {
    const filledStyle = colorStyle as typeof colorConfig.brandDefault.filled;
    backgroundColor = isPressed ? filledStyle.bgPressed : filledStyle.bg;
  } else {
    const outlinedStyle = colorStyle as typeof colorConfig.brandDefault.outlined;
    backgroundColor = isPressed ? outlinedStyle.bgPressed : outlinedStyle.bg;
  }

  // Determine icon color
  let iconColor: string;
  if (variant === "ghost") {
    const ghostStyle = colorStyle as typeof colorConfig.brandDefault.ghost;
    iconColor = isPressed ? ghostStyle.colorPressed : ghostStyle.color;
  } else {
    iconColor = (colorStyle as typeof colorConfig.brandDefault.filled).color;
  }

  return (
    <button
      disabled={disabled}
      onMouseDown={() => !disabled && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => { setIsPressed(false); setIsHovered(false); }}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: sizeStyle.size,
        height: sizeStyle.size,
        borderRadius: 9999,
        border: variant === "outlined" ? `1px solid ${(colorStyle as typeof colorConfig.brandDefault.outlined).border}` : "none",
        backgroundColor,
        color: iconColor,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "background-color 0.15s ease, color 0.15s ease",
        padding: 0,
        outline: "none",
      }}
    >
      <svg
        width={sizeStyle.iconSize}
        height={sizeStyle.iconSize}
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
    </button>
  );
}
