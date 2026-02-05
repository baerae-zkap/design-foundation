"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform, highlightCode } from "@/components/PlatformTabs";

// Types
type AccordionSize = "medium" | "large";

// Size configurations
const sizeConfig: Record<AccordionSize, { height: number; fontSize: number; iconSize: number }> = {
  medium: { height: 48, fontSize: 14, iconSize: 20 },
  large: { height: 56, fontSize: 16, iconSize: 24 },
};

export default function AccordionPage() {
  return (
    <div style={{ maxWidth: 720 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Contents" },
          { label: "Accordion" },
        ]}
      />

      {/* Header */}
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
        Accordion
      </h1>
      <p style={{ fontSize: 15, color: "var(--text-secondary)", marginBottom: 32, lineHeight: 1.6 }}>
        접을 수 있는 콘텐츠 영역입니다. FAQ, 설정 메뉴 등에서 정보를 계층적으로 표시할 때 사용됩니다.
      </p>

      {/* Interactive Playground */}
      <AccordionPlayground />

      {/* Platform Tabs */}
      <PlatformTabs>
        {(platform) => <PlatformContent platform={platform} />}
      </PlatformTabs>
    </div>
  );
}

function AccordionPlayground() {
  const [size, setSize] = useState<AccordionSize>("medium");
  const [disabled, setDisabled] = useState(false);
  const [defaultExpanded, setDefaultExpanded] = useState(false);
  const [codeType, setCodeType] = useState<"rn" | "web">("rn");

  const generateCode = () => {
    const props = [];
    props.push('title="Accordion Title"');
    if (size !== "medium") props.push(`size="${size}"`);
    if (defaultExpanded) props.push("defaultExpanded");
    if (disabled) props.push("disabled");

    const propsStr = props.join("\n  ");

    if (codeType === "rn") {
      return `<Accordion
  ${propsStr}
  onChange={(expanded) => console.log(expanded)}
>
  <Text>Accordion content goes here</Text>
</Accordion>`;
    } else {
      return `<Accordion
  ${propsStr}
  onChange={(expanded) => console.log(expanded)}
>
  <p>Accordion content goes here</p>
</Accordion>`;
    }
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
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", minHeight: 360 }}>
          {/* Preview Area */}
          <div
            style={{
              padding: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fafbfc",
            }}
          >
            <div style={{ width: "100%", maxWidth: 400 }}>
              <AccordionDemo
                key={`accordion-${defaultExpanded}`}
                title="Accordion Title"
                size={size}
                disabled={disabled}
                defaultExpanded={defaultExpanded}
              >
                <p style={{ margin: 0, fontSize: 14, color: "#64748b", lineHeight: 1.6 }}>
                  This is the accordion content. It can contain any content including text, images, or other components.
                </p>
              </AccordionDemo>
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
              {/* Size */}
              <RadioGroup
                label="Size"
                options={[
                  { value: "medium", label: "Medium" },
                  { value: "large", label: "Large" },
                ]}
                value={size}
                onChange={(v) => setSize(v as AccordionSize)}
              />

              {/* Options */}
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8, display: "block" }}>
                  Options
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <CheckboxOption label="Default Expanded" checked={defaultExpanded} onChange={setDefaultExpanded} />
                  <CheckboxOption label="Disabled" checked={disabled} onChange={setDisabled} />
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
        <div style={{
          backgroundColor: "#f5f5f7",
          borderRadius: 16,
          padding: "48px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <svg width="420" height="140" viewBox="0 0 420 140">
            {/* Container outline */}
            <rect x="60" y="20" width="300" height="100" rx="12" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />

            {/* Header area */}
            <rect x="60" y="20" width="300" height="48" rx="12" fill="#fafbfc" />
            <rect x="60" y="56" width="300" height="12" fill="white" />

            {/* Title text */}
            <text x="80" y="50" fill="#334155" fontSize="14" fontWeight="600">Accordion Title</text>

            {/* Chevron icon */}
            <path d="M335 40 L340 46 L345 40" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

            {/* Content area */}
            <rect x="76" y="76" width="268" height="8" rx="4" fill="#e2e8f0" />
            <rect x="76" y="92" width="200" height="8" rx="4" fill="#e2e8f0" />

            {/* Lines to labels */}
            <line x1="30" y1="44" x2="60" y2="44" stroke="#374151" strokeWidth="1.5" />
            <circle cx="60" cy="44" r="3" fill="#374151" />

            <line x1="340" y1="44" x2="390" y2="44" stroke="#374151" strokeWidth="1.5" />
            <circle cx="340" cy="44" r="3" fill="#374151" />

            <line x1="210" y1="88" x2="210" y2="130" stroke="#374151" strokeWidth="1.5" />
            <circle cx="210" cy="88" r="3" fill="#374151" />

            {/* Numbered circles */}
            <circle cx="15" cy="44" r="14" fill="#374151" />
            <text x="15" y="49" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">1</text>

            <circle cx="405" cy="44" r="14" fill="#374151" />
            <text x="405" y="49" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">2</text>

            <circle cx="210" cy="130" r="14" fill="#374151" />
            <text x="210" y="135" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">3</text>
          </svg>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 24,
          marginTop: 20,
          fontSize: 14,
          fontWeight: 500,
          color: "var(--text-primary)",
        }}>
          <div>1. Header</div>
          <div style={{ textAlign: "center" }}>2. Chevron Icon</div>
          <div style={{ textAlign: "right" }}>3. Content Area</div>
        </div>
      </Section>

      {/* Sizes */}
      <Section title="Sizes">
        <PreviewBox>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", maxWidth: 400 }}>
            <div style={{ textAlign: "center" }}>
              <AccordionDemo title="Medium (48px)" size="medium" defaultExpanded={false}>
                <p style={{ margin: 0, fontSize: 14, color: "#64748b" }}>Content</p>
              </AccordionDemo>
            </div>
            <div style={{ textAlign: "center" }}>
              <AccordionDemo title="Large (56px)" size="large" defaultExpanded={false}>
                <p style={{ margin: 0, fontSize: 14, color: "#64748b" }}>Content</p>
              </AccordionDemo>
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* States */}
      <Section title="States">
        <PreviewBox>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", maxWidth: 400 }}>
            <div>
              <p style={{ fontSize: 11, color: "#64748b", marginBottom: 8 }}>Collapsed</p>
              <AccordionDemo title="Click to expand" defaultExpanded={false}>
                <p style={{ margin: 0, fontSize: 14, color: "#64748b" }}>Hidden content</p>
              </AccordionDemo>
            </div>
            <div>
              <p style={{ fontSize: 11, color: "#64748b", marginBottom: 8 }}>Expanded</p>
              <AccordionDemo title="Click to collapse" defaultExpanded={true}>
                <p style={{ margin: 0, fontSize: 14, color: "#64748b" }}>Visible content</p>
              </AccordionDemo>
            </div>
            <div>
              <p style={{ fontSize: 11, color: "#64748b", marginBottom: 8 }}>Disabled</p>
              <AccordionDemo title="Cannot interact" disabled defaultExpanded={false}>
                <p style={{ margin: 0, fontSize: 14, color: "#64748b" }}>Content</p>
              </AccordionDemo>
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* Design Tokens */}
      <Section title="Design Tokens">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          Accordion 컴포넌트에 적용된 Foundation 기반 디자인 토큰입니다.
        </p>
        <div style={{ overflowX: "auto", borderRadius: 12, border: "1px solid var(--divider)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Property</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Foundation Token</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px" }}>Border Radius</td>
                <td style={{ padding: "12px 16px" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>radius.semantic.card.sm</code></td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "#6366f1" }}>12px</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px" }}>Padding (내부)</td>
                <td style={{ padding: "12px 16px" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>spacing.primitive.4</code></td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "#6366f1" }}>16px</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px" }}>Header Height (medium)</td>
                <td style={{ padding: "12px 16px" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>spacing.primitive.12</code></td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "#6366f1" }}>48px</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px" }}>Header Height (large)</td>
                <td style={{ padding: "12px 16px" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>spacing.primitive.14</code></td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "#6366f1" }}>56px</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px" }}>Border Color</td>
                <td style={{ padding: "12px 16px" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>border.base.default</code></td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "#6366f1" }}>#e2e8f0 (palette.grey.95)</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px" }}>Background (header expanded)</td>
                <td style={{ padding: "12px 16px" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>surface.elevated.alternative</code></td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "#6366f1" }}>#fafbfc (palette.grey.99)</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px" }}>Text Color</td>
                <td style={{ padding: "12px 16px" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>content.base.default</code></td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "#6366f1" }}>#334155 (palette.grey.30)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* Accessibility */}
      <Section title="Accessibility">
        <div style={{ display: "grid", gap: 12 }}>
          <PrincipleCard number={1} title="Keyboard Navigation" desc="Enter 또는 Space 키로 펼침/접힘을 제어할 수 있습니다." />
          <PrincipleCard number={2} title="ARIA Attributes" desc="aria-expanded 속성으로 현재 상태를 스크린 리더에 전달합니다." />
          <PrincipleCard number={3} title="Focus Management" desc="헤더에 포커스가 표시되어 키보드 사용자가 인지할 수 있습니다." />
        </div>
      </Section>
    </div>
  );
}

const GITHUB_BASE = "https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system/src";
const ACCORDION_SOURCE = `${GITHUB_BASE}/components/Accordion/Accordion.tsx`;
const ACCORDION_NATIVE_SOURCE = `${GITHUB_BASE}/native/Accordion.tsx`;

function WebContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
      {/* Source Code */}
      <Section title="Source Code">
        <div style={{ padding: 16, backgroundColor: "var(--bg-secondary)", borderRadius: 12, marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>Accordion Component</p>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "4px 0 0 0" }}>실제 컴포넌트 소스 코드를 GitHub에서 확인하세요.</p>
          </div>
          <a
            href={ACCORDION_SOURCE}
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
        <CodeBlock code={`import { Accordion } from '@baerae-zkap/design-system';`} />
      </Section>

      {/* Basic Usage */}
      <Section title="Basic Usage">
        <PreviewBox>
          <div style={{ width: "100%", maxWidth: 400, padding: 24 }}>
            <AccordionDemo title="Click to expand">
              <p style={{ margin: 0, fontSize: 14, color: "#64748b", lineHeight: 1.6 }}>
                This content is revealed when expanded.
              </p>
            </AccordionDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<Accordion title="Click to expand">
  <p>This content is revealed when expanded.</p>
</Accordion>`} />
      </Section>

      {/* Controlled */}
      <Section title="Controlled">
        <CodeBlock code={`const [expanded, setExpanded] = useState(false);

<Accordion
  title="Controlled Accordion"
  expanded={expanded}
  onChange={setExpanded}
>
  <p>Content here</p>
</Accordion>`} />
      </Section>

      {/* API Reference */}
      <Section title="API Reference">
        <PropsTable
          props={[
            { name: "title", type: "string", required: true, description: "헤더에 표시되는 제목" },
            { name: "children", type: "ReactNode", required: true, description: "펼쳐지는 콘텐츠" },
            { name: "size", type: '"medium" | "large"', required: false, defaultVal: '"medium"', description: "아코디언 크기" },
            { name: "defaultExpanded", type: "boolean", required: false, defaultVal: "false", description: "초기 펼침 상태 (비제어)" },
            { name: "expanded", type: "boolean", required: false, description: "펼침 상태 (제어)" },
            { name: "onChange", type: "(expanded: boolean) => void", required: false, description: "상태 변경 콜백" },
            { name: "disabled", type: "boolean", required: false, defaultVal: "false", description: "비활성화 상태" },
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
            <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>Accordion Component</p>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "4px 0 0 0" }}>실제 컴포넌트 소스 코드를 GitHub에서 확인하세요.</p>
          </div>
          <a
            href={ACCORDION_NATIVE_SOURCE}
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
        <CodeBlock code={`import { Accordion } from '@baerae-zkap/design-system/native';`} />
      </Section>

      {/* Basic Usage */}
      <Section title="Basic Usage">
        <PreviewBox>
          <div style={{ width: "100%", maxWidth: 400, padding: 24 }}>
            <AccordionDemo title="Click to expand">
              <p style={{ margin: 0, fontSize: 14, color: "#64748b", lineHeight: 1.6 }}>
                This content is revealed when expanded.
              </p>
            </AccordionDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<Accordion title="Click to expand">
  <Text>This content is revealed when expanded.</Text>
</Accordion>`} />
      </Section>

      {/* API Reference */}
      <Section title="API Reference">
        <PropsTable
          props={[
            { name: "title", type: "string", required: true, description: "헤더에 표시되는 제목" },
            { name: "children", type: "ReactNode", required: true, description: "펼쳐지는 콘텐츠" },
            { name: "size", type: '"medium" | "large"', required: false, defaultVal: '"medium"', description: "아코디언 크기" },
            { name: "defaultExpanded", type: "boolean", required: false, defaultVal: "false", description: "초기 펼침 상태 (비제어)" },
            { name: "expanded", type: "boolean", required: false, description: "펼침 상태 (제어)" },
            { name: "onChange", type: "(expanded: boolean) => void", required: false, description: "상태 변경 콜백" },
            { name: "disabled", type: "boolean", required: false, defaultVal: "false", description: "비활성화 상태" },
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
              color: value === opt.value ? "#2563eb" : "#64748b",
              cursor: "pointer",
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
    <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--text-primary)", cursor: "pointer" }}>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} style={{ width: 16, height: 16 }} />
      {label}
    </label>
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

function AccordionDemo({
  title,
  size = "medium",
  disabled = false,
  defaultExpanded = false,
  children,
}: {
  title: string;
  size?: AccordionSize;
  disabled?: boolean;
  defaultExpanded?: boolean;
  children: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [isHovered, setIsHovered] = useState(false);

  const config = sizeConfig[size];

  const handleToggle = () => {
    if (!disabled) {
      setExpanded(!expanded);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: 12, // card.sm token
        overflow: "hidden",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <button
        onClick={handleToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        disabled={disabled}
        style={{
          width: "100%",
          height: config.height,
          padding: "0 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: expanded ? "#fafbfc" : isHovered ? "#fafbfc" : "white",
          border: "none",
          cursor: disabled ? "not-allowed" : "pointer",
          transition: "background-color 0.15s ease",
        }}
      >
        <span style={{ fontSize: config.fontSize, fontWeight: 500, color: "#334155" }}>
          {title}
        </span>
        <svg
          width={config.iconSize}
          height={config.iconSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#64748b"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div
        style={{
          maxHeight: expanded ? 500 : 0,
          overflow: "hidden",
          transition: "max-height 0.2s ease",
        }}
      >
        <div style={{ padding: 16, borderTop: "1px solid #e2e8f0" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
