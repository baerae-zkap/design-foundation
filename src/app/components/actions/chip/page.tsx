"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform, highlightCode } from "@/components/PlatformTabs";

// Types
type ChipVariant = "filled" | "outlined";
type ChipColor = "brandDefault" | "baseDefault" | "successDefault" | "errorDefault" | "warningDefault";
type ChipSize = "small" | "medium" | "large";

// Size configurations
const sizeConfig: Record<ChipSize, { height: number; fontSize: number; paddingX: number; iconSize: number }> = {
  small: { height: 24, fontSize: 12, paddingX: 8, iconSize: 14 },
  medium: { height: 32, fontSize: 14, paddingX: 12, iconSize: 18 },
  large: { height: 40, fontSize: 16, paddingX: 16, iconSize: 22 },
};

// Color configurations
const colorConfig: Record<ChipColor, {
  filled: { bg: string; bgPressed: string; bgSelected: string; text: string; textSelected: string };
  outlined: { bg: string; bgPressed: string; bgSelected: string; border: string; text: string; textSelected: string };
}> = {
  brandDefault: {
    filled: {
      bg: '#dbeafe',
      bgPressed: '#bfdbfe',
      bgSelected: '#2563eb',
      text: '#1e40af',
      textSelected: '#ffffff',
    },
    outlined: {
      bg: 'transparent',
      bgPressed: 'rgba(37, 99, 235, 0.08)',
      bgSelected: '#2563eb',
      border: '#2563eb',
      text: '#2563eb',
      textSelected: '#ffffff',
    },
  },
  baseDefault: {
    filled: {
      bg: '#f1f5f9',
      bgPressed: '#e2e8f0',
      bgSelected: '#334155',
      text: '#334155',
      textSelected: '#ffffff',
    },
    outlined: {
      bg: 'transparent',
      bgPressed: 'rgba(0, 0, 0, 0.04)',
      bgSelected: '#334155',
      border: '#cbd5e1',
      text: '#334155',
      textSelected: '#ffffff',
    },
  },
  successDefault: {
    filled: {
      bg: '#dcfce7',
      bgPressed: '#bbf7d0',
      bgSelected: '#16a34a',
      text: '#166534',
      textSelected: '#ffffff',
    },
    outlined: {
      bg: 'transparent',
      bgPressed: 'rgba(34, 197, 94, 0.08)',
      bgSelected: '#16a34a',
      border: '#22c55e',
      text: '#166534',
      textSelected: '#ffffff',
    },
  },
  errorDefault: {
    filled: {
      bg: '#fee2e2',
      bgPressed: '#fecaca',
      bgSelected: '#dc2626',
      text: '#991b1b',
      textSelected: '#ffffff',
    },
    outlined: {
      bg: 'transparent',
      bgPressed: 'rgba(239, 68, 68, 0.08)',
      bgSelected: '#dc2626',
      border: '#ef4444',
      text: '#991b1b',
      textSelected: '#ffffff',
    },
  },
  warningDefault: {
    filled: {
      bg: '#fef9c3',
      bgPressed: '#fef08a',
      bgSelected: '#ca8a04',
      text: '#854d0e',
      textSelected: '#ffffff',
    },
    outlined: {
      bg: 'transparent',
      bgPressed: 'rgba(234, 179, 8, 0.08)',
      bgSelected: '#ca8a04',
      border: '#eab308',
      text: '#854d0e',
      textSelected: '#ffffff',
    },
  },
};

export default function ChipPage() {
  return (
    <div style={{ maxWidth: 720 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Actions" },
          { label: "Chip" },
        ]}
      />

      {/* Header */}
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
        Chip
      </h1>
      <p style={{ fontSize: 15, color: "var(--text-secondary)", marginBottom: 32, lineHeight: 1.6 }}>
        입력, 속성, 액션을 나타내는 컴팩트한 인터랙티브 요소입니다. 필터 선택, 태그 입력, 보조 액션 등에 사용됩니다.
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
  const [color, setColor] = useState<ChipColor>("baseDefault");
  const [size, setSize] = useState<ChipSize>("medium");
  const [selected, setSelected] = useState(false);
  const [showClose, setShowClose] = useState(false);
  const [codeType, setCodeType] = useState<"rn" | "web">("rn");

  const generateCode = () => {
    const props = [];
    if (variant !== "filled") props.push(`variant="${variant}"`);
    if (color !== "baseDefault") props.push(`color="${color}"`);
    if (size !== "medium") props.push(`size="${size}"`);
    if (selected) props.push("selected");
    if (showClose) props.push("onClose={() => {}}");

    const propsStr = props.length > 0 ? `\n  ${props.join("\n  ")}\n` : " ";

    if (codeType === "rn") {
      return `<Chip${propsStr.length > 1 ? propsStr : " "}onPress={() => {}}>
  태그
</Chip>`;
    } else {
      return `<Chip${propsStr.length > 1 ? propsStr : " "}onClick={() => {}}>
  태그
</Chip>`;
    }
  };

  const colorLabels: Record<ChipColor, string> = {
    brandDefault: "Brand",
    baseDefault: "Base",
    successDefault: "Success",
    errorDefault: "Error",
    warningDefault: "Warning",
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
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", minHeight: 400 }}>
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
                gap: 24,
                backgroundColor: "white",
                borderRadius: 16,
              }}
            >
              {/* Variant */}
              <RadioGroup
                label="Variant"
                options={[
                  { value: "filled", label: "Filled" },
                  { value: "outlined", label: "Outlined" },
                ]}
                value={variant}
                onChange={(v) => setVariant(v as ChipVariant)}
              />

              {/* Color */}
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8, display: "block" }}>
                  Color
                </label>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {(Object.keys(colorLabels) as ChipColor[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      style={{
                        padding: "6px 10px",
                        fontSize: 12,
                        borderRadius: 6,
                        border: color === c ? "2px solid #2563eb" : "1px solid #e2e8f0",
                        backgroundColor: color === c ? "#eff6ff" : "white",
                        cursor: "pointer",
                        fontWeight: color === c ? 600 : 400,
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
                onChange={(v) => setSize(v as ChipSize)}
              />

              {/* Options */}
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8, display: "block" }}>
                  Options
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <CheckboxOption label="Selected" checked={selected} onChange={setSelected} />
                  <CheckboxOption label="Show Close" checked={showClose} onChange={setShowClose} />
                </div>
              </div>
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
              <ChipDemo color="brandDefault" selected size="large">태그</ChipDemo>
              <div style={{ position: "absolute", top: -24, left: 8, fontSize: 10, color: "#64748b" }}>① Container</div>
              <div style={{ position: "absolute", top: "50%", right: -50, transform: "translateY(-50%)", fontSize: 10, color: "#64748b" }}>② Label</div>
              <div style={{ position: "absolute", top: "50%", left: -40, transform: "translateY(-50%)", fontSize: 10, color: "#64748b" }}>③ Icon</div>
            </div>
            <div style={{ position: "relative" }}>
              <ChipDemo onClose={() => {}} size="large">삭제 가능</ChipDemo>
              <div style={{ position: "absolute", top: "50%", right: -60, transform: "translateY(-50%)", fontSize: 10, color: "#64748b" }}>④ Close</div>
            </div>
          </div>
        </PreviewBox>
        <div style={{ marginTop: 16, padding: 16, backgroundColor: "var(--bg-secondary)", borderRadius: 12, fontSize: 13 }}>
          <p style={{ margin: 0, color: "var(--text-secondary)", lineHeight: 1.8 }}>
            <strong style={{ color: "var(--text-primary)" }}>① Container:</strong> Chip의 외부 컨테이너 (pill shape)<br />
            <strong style={{ color: "var(--text-primary)" }}>② Label:</strong> Chip의 텍스트 콘텐츠<br />
            <strong style={{ color: "var(--text-primary)" }}>③ Icon:</strong> 선택 상태 표시 또는 좌측 아이콘<br />
            <strong style={{ color: "var(--text-primary)" }}>④ Close:</strong> 삭제 버튼 (onClose 사용 시)
          </p>
        </div>
      </Section>

      {/* Behaviors */}
      <Section title="Behaviors">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <VariantCard name="Selectable (selected)" description="필터/카테고리 선택. selected=true 시 체크 아이콘 표시.">
            <div style={{ display: "flex", gap: 8 }}>
              <ChipDemo color="brandDefault">전체</ChipDemo>
              <ChipDemo color="brandDefault" selected>전자제품</ChipDemo>
            </div>
          </VariantCard>
          <VariantCard name="Removable (onClose)" description="태그 삭제. onClose 제공 시 X 버튼 표시.">
            <div style={{ display: "flex", gap: 8 }}>
              <ChipDemo onClose={() => {}}>React</ChipDemo>
              <ChipDemo onClose={() => {}}>TypeScript</ChipDemo>
            </div>
          </VariantCard>
        </div>
      </Section>

      {/* Variants */}
      <Section title="Variants">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <VariantCard name="Filled" description="배경색이 채워진 기본 스타일">
            <div style={{ display: "flex", gap: 8 }}>
              <ChipDemo variant="filled" color="brandDefault">Brand</ChipDemo>
              <ChipDemo variant="filled" color="baseDefault">Base</ChipDemo>
            </div>
          </VariantCard>
          <VariantCard name="Outlined" description="테두리만 있는 가벼운 스타일">
            <div style={{ display: "flex", gap: 8 }}>
              <ChipDemo variant="outlined" color="brandDefault">Brand</ChipDemo>
              <ChipDemo variant="outlined" color="baseDefault">Base</ChipDemo>
            </div>
          </VariantCard>
        </div>
      </Section>

      {/* Sizes */}
      <Section title="Sizes">
        <PreviewBox>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <ChipDemo size="small">Small</ChipDemo>
              <p style={{ fontSize: 11, color: "#64748b", marginTop: 8 }}>24px</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <ChipDemo size="medium">Medium</ChipDemo>
              <p style={{ fontSize: 11, color: "#64748b", marginTop: 8 }}>32px</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <ChipDemo size="large">Large</ChipDemo>
              <p style={{ fontSize: 11, color: "#64748b", marginTop: 8 }}>40px</p>
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* Colors */}
      <Section title="Colors">
        <Subsection title="Filled">
          <PreviewBox>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <ChipDemo color="brandDefault">Brand</ChipDemo>
              <ChipDemo color="baseDefault">Base</ChipDemo>
              <ChipDemo color="successDefault">Success</ChipDemo>
              <ChipDemo color="errorDefault">Error</ChipDemo>
              <ChipDemo color="warningDefault">Warning</ChipDemo>
            </div>
          </PreviewBox>
        </Subsection>
        <Subsection title="Outlined">
          <PreviewBox>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <ChipDemo variant="outlined" color="brandDefault">Brand</ChipDemo>
              <ChipDemo variant="outlined" color="baseDefault">Base</ChipDemo>
              <ChipDemo variant="outlined" color="successDefault">Success</ChipDemo>
              <ChipDemo variant="outlined" color="errorDefault">Error</ChipDemo>
              <ChipDemo variant="outlined" color="warningDefault">Warning</ChipDemo>
            </div>
          </PreviewBox>
        </Subsection>
      </Section>

      {/* States */}
      <Section title="States">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          Chip의 다양한 상태를 확인할 수 있습니다. 직접 클릭해서 Pressed 상태를 확인해보세요.
        </p>
        <PreviewBox>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <ChipDemo color="brandDefault">Default</ChipDemo>
              <p style={{ fontSize: 11, color: "#64748b", marginTop: 8 }}>기본</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <ChipDemo color="brandDefault" selected>Selected</ChipDemo>
              <p style={{ fontSize: 11, color: "#64748b", marginTop: 8 }}>선택됨</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <ChipDemo color="brandDefault" disabled>Disabled</ChipDemo>
              <p style={{ fontSize: 11, color: "#64748b", marginTop: 8 }}>비활성화</p>
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
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Property</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Small</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Medium</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Large</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>Height</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>24px</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>32px</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>40px</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>Padding X</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>8px</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>12px</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>16px</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>Font Size</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>12px</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>14px</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>16px</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}>Icon Size</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>14px</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>18px</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>22px</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px" }}>Border Radius</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>12px</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>16px</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>20px</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* Accessibility */}
      <Section title="Accessibility">
        <div style={{ display: "grid", gap: 16 }}>
          <PrincipleCard
            number={1}
            title="aria-pressed"
            desc="selected 상태를 스크린 리더에 전달합니다."
          />
          <PrincipleCard
            number={2}
            title="Close Button"
            desc="닫기 버튼은 별도의 탭 타겟으로 접근 가능하며, Enter/Space로 삭제할 수 있습니다."
          />
          <PrincipleCard
            number={3}
            title="Color Contrast"
            desc="WCAG 2.1 AA 기준(4.5:1)을 충족하는 색상 대비를 유지합니다."
          />
        </div>
      </Section>
    </div>
  );
}

function WebContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
      {/* Source Code */}
      <Section title="Source Code">
        <div style={{ padding: 16, backgroundColor: "var(--bg-secondary)", borderRadius: 12, marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>Chip Component</p>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "4px 0 0 0" }}>실제 컴포넌트 소스 코드를 GitHub에서 확인하세요.</p>
          </div>
          <a
            href="https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system/src/components/Chip/Chip.tsx"
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
        <CodeBlock code={`import { Chip } from '@baerae-zkap/design-system';`} />
      </Section>

      {/* Basic Usage */}
      <Section title="Basic Usage">
        <PreviewBox>
          <ChipDemo>기본 칩</ChipDemo>
        </PreviewBox>
        <CodeBlock code={`<Chip onClick={() => {}}>기본 칩</Chip>`} />
      </Section>

      {/* Filter Example */}
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
      color="brandDefault"
      selected={selected.includes(filter)}
      onClick={() => toggle(filter)}
    >
      {filter}
    </Chip>
  ))}
</div>`} />
      </Section>

      {/* Input Example */}
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

      {/* API Reference */}
      <Section title="API Reference">
        <PropsTable
          props={[
            { name: "variant", type: '"filled" | "outlined"', required: false, defaultVal: '"filled"', description: "스타일 변형" },
            { name: "color", type: '"brandDefault" | "baseDefault" | "successDefault" | "errorDefault" | "warningDefault"', required: false, defaultVal: '"baseDefault"', description: "색상 테마" },
            { name: "size", type: '"small" | "medium" | "large"', required: false, defaultVal: '"medium"', description: "크기" },
            { name: "selected", type: "boolean", required: false, defaultVal: "false", description: "선택 상태" },
            { name: "disabled", type: "boolean", required: false, defaultVal: "false", description: "비활성화 상태" },
            { name: "leftIcon", type: "ReactNode", required: false, description: "좌측 아이콘" },
            { name: "onClose", type: "() => void", required: false, description: "닫기 버튼 핸들러" },
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
            <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>Chip Component</p>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "4px 0 0 0" }}>실제 컴포넌트 소스 코드를 GitHub에서 확인하세요.</p>
          </div>
          <a
            href="https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system/src/native/Chip.tsx"
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
        <CodeBlock code={`import { Chip } from '@baerae-zkap/design-system/native';`} />
      </Section>

      {/* Basic Usage */}
      <Section title="Basic Usage">
        <PreviewBox>
          <ChipDemo>기본 칩</ChipDemo>
        </PreviewBox>
        <CodeBlock code={`<Chip onPress={() => {}}>기본 칩</Chip>`} />
      </Section>

      {/* Filter Example */}
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

<View style={{ flexDirection: 'row', gap: 8 }}>
  {['전자제품', '의류', '식품'].map(filter => (
    <Chip
      key={filter}
      color="brandDefault"
      selected={selected.includes(filter)}
      onPress={() => toggle(filter)}
    >
      {filter}
    </Chip>
  ))}
</View>`} />
      </Section>

      {/* Input Example */}
      <Section title="Input Example">
        <PreviewBox>
          <InputChipDemo />
        </PreviewBox>
        <CodeBlock code={`const [tags, setTags] = useState(['React', 'TypeScript']);

const remove = (tag: string) => {
  setTags(prev => prev.filter(t => t !== tag));
};

<View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
  {tags.map(tag => (
    <Chip
      key={tag}
      onClose={() => remove(tag)}
    >
      {tag}
    </Chip>
  ))}
</View>`} />
      </Section>

      {/* API Reference */}
      <Section title="API Reference">
        <PropsTable
          props={[
            { name: "variant", type: '"filled" | "outlined"', required: false, defaultVal: '"filled"', description: "스타일 변형" },
            { name: "color", type: '"brandDefault" | "baseDefault" | "successDefault" | "errorDefault" | "warningDefault"', required: false, defaultVal: '"baseDefault"', description: "색상 테마" },
            { name: "size", type: '"small" | "medium" | "large"', required: false, defaultVal: '"medium"', description: "크기" },
            { name: "selected", type: "boolean", required: false, defaultVal: "false", description: "선택 상태" },
            { name: "disabled", type: "boolean", required: false, defaultVal: "false", description: "비활성화 상태" },
            { name: "leftIcon", type: "ReactNode", required: false, description: "좌측 아이콘" },
            { name: "onClose", type: "() => void", required: false, description: "닫기 버튼 핸들러" },
            { name: "onPress", type: "(event) => void", required: false, description: "탭 핸들러" },
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
  color = "baseDefault",
  size = "medium",
  selected = false,
  disabled = false,
  onClose,
  children,
}: ChipDemoProps) {
  const [isPressed, setIsPressed] = useState(false);
  const sizeStyle = sizeConfig[size];
  const colorStyle = colorConfig[color][variant];

  const getBackgroundColor = (): string => {
    if (selected) return colorStyle.bgSelected;
    if (isPressed && !disabled) return colorStyle.bgPressed;
    return colorStyle.bg;
  };

  const getTextColor = (): string => {
    if (disabled) return '#94a3b8';
    return selected ? colorStyle.textSelected : colorStyle.text;
  };

  return (
    <button
      disabled={disabled}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        height: sizeStyle.height,
        padding: `0 ${sizeStyle.paddingX}px`,
        fontSize: sizeStyle.fontSize,
        fontWeight: 500,
        color: getTextColor(),
        backgroundColor: getBackgroundColor(),
        border: variant === 'outlined' && !selected
          ? `1px solid ${disabled ? '#cbd5e1' : (colorStyle as { border: string }).border}`
          : 'none',
        borderRadius: sizeStyle.height / 2,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'background-color 150ms ease, color 150ms ease',
      }}
    >
      {children}

      {/* Selected Check Icon */}
      {selected && !onClose && (
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg
            width={sizeStyle.iconSize * 0.7}
            height={sizeStyle.iconSize * 0.7}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
      )}

      {/* Close Button */}
      {onClose && (
        <span
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          style={{
            marginRight: -4,
            padding: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            borderRadius: '50%',
          }}
        >
          <svg
            width={sizeStyle.iconSize * 0.7}
            height={sizeStyle.iconSize * 0.7}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </span>
      )}
    </button>
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
    <div style={{ display: 'flex', gap: 8 }}>
      {filters.map(filter => (
        <ChipDemo
          key={filter}
              color="brandDefault"
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
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 0 }}>
      <h2 style={{
        fontSize: 20,
        fontWeight: 700,
        marginBottom: 20,
        color: "var(--text-primary)",
        letterSpacing: "-0.01em"
      }}>
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
    <div style={{
      padding: 20,
      backgroundColor: "white",
      borderRadius: 12,
      border: "1px solid var(--divider)",
    }}>
      <div style={{
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fafbfc",
        borderRadius: 8,
        marginBottom: 16,
      }}>
        {children}
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>{name}</div>
      <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>{description}</p>
    </div>
  );
}

function PrincipleCard({ number, title, desc }: { number: number; title: string; desc: string }) {
  return (
    <div style={{
      padding: 20,
      backgroundColor: "white",
      borderRadius: 12,
      border: "1px solid var(--divider)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <span style={{
          width: 22, height: 22, borderRadius: "50%",
          backgroundColor: "#e5e7eb", color: "#6b7280",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, fontWeight: 600,
        }}>{number}</span>
        <span style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)" }}>{title}</span>
      </div>
      <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: 0, lineHeight: 1.6, paddingLeft: 34 }}>{desc}</p>
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
      <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8, display: "block" }}>
        {label}
      </label>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            style={{
              padding: "6px 12px",
              fontSize: 12,
              borderRadius: 6,
              border: value === opt.value ? "2px solid #2563eb" : "1px solid #e2e8f0",
              backgroundColor: value === opt.value ? "#eff6ff" : "white",
              cursor: "pointer",
              fontWeight: value === opt.value ? 600 : 400,
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function CheckboxOption({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13 }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{ width: 16, height: 16 }}
      />
      {label}
    </label>
  );
}

function PropsTable({ props }: { props: { name: string; type: string; required: boolean; defaultVal?: string; description: string }[] }) {
  return (
    <div style={{ overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
        <thead>
          <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Prop</th>
            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Type</th>
            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Default</th>
            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop, i) => (
            <tr key={prop.name}>
              <td style={{ padding: "12px 16px", borderBottom: i < props.length - 1 ? "1px solid var(--divider)" : "none", fontFamily: "monospace", fontSize: 13 }}>
                {prop.name}{prop.required && <span style={{ color: "#ef4444" }}>*</span>}
              </td>
              <td style={{ padding: "12px 16px", borderBottom: i < props.length - 1 ? "1px solid var(--divider)" : "none", color: "#6366f1", fontFamily: "monospace", fontSize: 12 }}>
                {prop.type}
              </td>
              <td style={{ padding: "12px 16px", borderBottom: i < props.length - 1 ? "1px solid var(--divider)" : "none", color: "var(--text-secondary)", fontFamily: "monospace", fontSize: 12 }}>
                {prop.defaultVal || "-"}
              </td>
              <td style={{ padding: "12px 16px", borderBottom: i < props.length - 1 ? "1px solid var(--divider)" : "none", color: "var(--text-secondary)" }}>
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
