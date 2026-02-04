"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform } from "@/components/PlatformTabs";

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
      </p>

      {/* Hero Image - Phone Mockup */}
      <div
        style={{
          aspectRatio: "21/9",
          borderRadius: 24,
          border: "1px solid var(--divider)",
          backgroundColor: "#fafafa",
          marginBottom: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <PhoneMockup />
      </div>

      {/* Platform Tabs */}
      <PlatformTabs>
        {(platform) => <PlatformContent platform={platform} />}
      </PlatformTabs>
    </div>
  );
}

// Phone Mockup Component
function PhoneMockup() {
  return (
    <div
      style={{
        width: 180,
        height: 140,
        backgroundColor: "white",
        borderRadius: 20,
        border: "6px solid #18181b",
        padding: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)",
      }}
    >
      {/* Content area placeholder */}
      <div style={{ flex: 1, backgroundColor: "#fafafa", borderRadius: 8, marginBottom: 8 }} />

      {/* Action Area */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ height: 20, backgroundColor: "var(--brand-primary)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 7, fontWeight: 600, color: "white" }}>확인</span>
        </div>
        <div style={{ height: 20, backgroundColor: "transparent", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 7, fontWeight: 500, color: "var(--brand-primary)" }}>취소</span>
        </div>
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
      {/* Variants */}
      <Section title="Variants">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          <InlineCode>ActionArea</InlineCode>는 4가지 variant를 사용할 수 있습니다.
        </p>
        <ul style={{ margin: "0 0 32px 0", padding: 0, listStyle: "none", fontSize: 14, color: "var(--text-secondary)", lineHeight: 2 }}>
          <li>• <strong style={{ color: "var(--text-primary)" }}>strong</strong> (기본값)</li>
          <li>• <strong style={{ color: "var(--text-primary)" }}>neutral</strong></li>
          <li>• <strong style={{ color: "var(--text-primary)" }}>compact</strong></li>
          <li>• <strong style={{ color: "var(--text-primary)" }}>cancel</strong></li>
        </ul>

        {/* Strong */}
        <Subsection title="Strong">
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
            Strong variant는 세로로 버튼을 크게 배치합니다.
          </p>
          <PreviewBox>
            <div style={{ width: 320, display: "flex", flexDirection: "column", gap: 16 }}>
              <ActionAreaDemo variant="strong">
                <ActionButton variant="main">Main</ActionButton>
                <ActionButton variant="alternative">Alternative</ActionButton>
              </ActionAreaDemo>
              <ActionAreaDemo variant="strong">
                <ActionButton variant="main">Main</ActionButton>
                <ActionButton variant="sub">Sub</ActionButton>
              </ActionAreaDemo>
            </div>
          </PreviewBox>
        </Subsection>

        {/* Neutral */}
        <Subsection title="Neutral">
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
            Neutral variant는 가로로 버튼을 최대 영역만큼 배치합니다.
          </p>
          <PreviewBox>
            <div style={{ width: 320, display: "flex", flexDirection: "column", gap: 16 }}>
              <ActionAreaDemo variant="neutral">
                <ActionButton variant="alternative">Alternative</ActionButton>
                <ActionButton variant="main">Main</ActionButton>
              </ActionAreaDemo>
              <ActionAreaDemo variant="neutral">
                <ActionButton variant="sub">Sub</ActionButton>
                <ActionButton variant="main">Main</ActionButton>
              </ActionAreaDemo>
            </div>
          </PreviewBox>
        </Subsection>

        {/* Cancel */}
        <Subsection title="Cancel">
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
            Cancel variant는 하나의 Main 버튼을 배치합니다.
          </p>
          <PreviewBox>
            <div style={{ width: 320 }}>
              <ActionAreaDemo variant="cancel">
                <ActionButton variant="main">Main</ActionButton>
              </ActionAreaDemo>
            </div>
          </PreviewBox>
        </Subsection>

        {/* Compact */}
        <Subsection title="Compact">
          <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
            Compact variant는 가로로 우측에 배치합니다.
          </p>
          <PreviewBox>
            <div style={{ width: 320, display: "flex", flexDirection: "column", gap: 16 }}>
              <ActionAreaDemo variant="compact">
                <ActionButton variant="alternative" size="small">Alternative</ActionButton>
                <ActionButton variant="main" size="small">Main</ActionButton>
              </ActionAreaDemo>
              <ActionAreaDemo variant="compact">
                <ActionButton variant="sub" size="small">Sub</ActionButton>
                <ActionButton variant="main" size="small">Main</ActionButton>
              </ActionAreaDemo>
            </div>
          </PreviewBox>
        </Subsection>
      </Section>

      {/* Anatomy */}
      <Section title="Anatomy">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          아래와 같은 구조로 조합하여 사용합니다.
        </p>
        <CodeBlock code={`<ActionArea>
  <ActionAreaButton variant="main">Main</ActionAreaButton>
  <ActionAreaButton variant="alternative">Alternative</ActionAreaButton>
  <ActionAreaButton variant="sub">Sub</ActionAreaButton>
</ActionArea>`} />
      </Section>

      {/* Extra Action Area */}
      <Section title="Extra Action Area">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          <InlineCode>extra</InlineCode> 옵션을 활성화하여 버튼 영역과 상단 콘텐츠 영역을 명확하게 구분할 수 있습니다.
        </p>
        <PreviewBox>
          <div style={{ width: 320 }}>
            <ActionAreaDemo variant="strong" extra>
              <ActionButton variant="main">Main</ActionButton>
            </ActionAreaDemo>
          </div>
        </PreviewBox>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginTop: 20, marginBottom: 20, lineHeight: 1.6 }}>
          <InlineCode>extraContent</InlineCode> prop을 통해 상단에 콘텐츠를 배치할 수 있습니다.
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
          <InlineCode>caption</InlineCode> prop을 통해 캡션을 표시할 수 있습니다.
        </p>
        <PreviewBox>
          <div style={{ width: 320 }}>
            <ActionAreaDemo variant="strong" caption="변경 사항을 저장하시겠습니까?">
              <ActionButton variant="main">확인</ActionButton>
            </ActionAreaDemo>
          </div>
        </PreviewBox>
      </Section>

      {/* Background */}
      <Section title="Background">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          <InlineCode>background</InlineCode> prop을 이용하여 gradient 혹은 divider를 표시할 수 있습니다.
          Popup, Bottom sheet 내부에서 사용할 경우 자동으로 스크롤 여부에 따라 background 옵션을 조정합니다.
        </p>
        <PreviewBox>
          <div style={{ width: 320 }}>
            <ActionAreaDemo variant="strong" background>
              <ActionButton variant="main">Main</ActionButton>
            </ActionAreaDemo>
          </div>
        </PreviewBox>
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
        <CodeBlock code={`import { ActionArea, ActionAreaButton } from '@zkap/design-system';`} />
      </Section>

      <Section title="Strong Variant">
        <PreviewBox>
          <div style={{ width: 320, display: "flex", flexDirection: "column", gap: 16 }}>
            <ActionAreaDemo variant="strong">
              <ActionButton variant="main">Main</ActionButton>
              <ActionButton variant="alternative">Alternative</ActionButton>
            </ActionAreaDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<ActionArea variant="strong">
  <ActionAreaButton variant="main">Main</ActionAreaButton>
  <ActionAreaButton variant="alternative">Alternative</ActionAreaButton>
</ActionArea>`} />
      </Section>

      <Section title="Neutral Variant">
        <PreviewBox>
          <div style={{ width: 320 }}>
            <ActionAreaDemo variant="neutral">
              <ActionButton variant="alternative">Alternative</ActionButton>
              <ActionButton variant="main">Main</ActionButton>
            </ActionAreaDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<ActionArea variant="neutral">
  <ActionAreaButton variant="alternative">Alternative</ActionAreaButton>
  <ActionAreaButton variant="main">Main</ActionAreaButton>
</ActionArea>`} />
      </Section>

      <Section title="Cancel Variant">
        <PreviewBox>
          <div style={{ width: 320 }}>
            <ActionAreaDemo variant="cancel">
              <ActionButton variant="main">Main</ActionButton>
            </ActionAreaDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<ActionArea variant="cancel">
  <ActionAreaButton variant="main">Main</ActionAreaButton>
</ActionArea>`} />
      </Section>

      <Section title="Compact Variant">
        <PreviewBox>
          <div style={{ width: 320 }}>
            <ActionAreaDemo variant="compact">
              <ActionButton variant="sub" size="small">Sub</ActionButton>
              <ActionButton variant="main" size="small">Main</ActionButton>
            </ActionAreaDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<ActionArea variant="compact">
  <ActionAreaButton variant="sub">Sub</ActionAreaButton>
  <ActionAreaButton variant="main">Main</ActionAreaButton>
</ActionArea>`} />
      </Section>

      <Section title="With Caption">
        <PreviewBox>
          <div style={{ width: 320 }}>
            <ActionAreaDemo variant="strong" caption="변경 사항을 저장하시겠습니까?">
              <ActionButton variant="main">확인</ActionButton>
            </ActionAreaDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<ActionArea variant="strong" caption="변경 사항을 저장하시겠습니까?">
  <ActionAreaButton variant="main">확인</ActionAreaButton>
</ActionArea>`} />
      </Section>

      <Section title="API Reference">
        <Subsection title="ActionArea">
          <PropsTable
            props={[
              { name: "children", type: "ReactNode", required: true, description: "ActionAreaButton 요소들" },
              { name: "variant", type: '"strong" | "neutral" | "compact" | "cancel"', required: false, description: "레이아웃 variant (기본값: strong)" },
              { name: "extra", type: "boolean", required: false, description: "상단 영역 구분선 (기본값: false)" },
              { name: "caption", type: "ReactNode", required: false, description: "캡션 텍스트" },
              { name: "extraContent", type: "ReactNode", required: false, description: "상단 커스텀 콘텐츠" },
              { name: "compactContent", type: "ReactNode", required: false, description: "compact에서 좌측 콘텐츠" },
              { name: "background", type: "boolean", required: false, description: "배경 gradient/divider 표시" },
              { name: "divider", type: "boolean", required: false, description: "상단 divider (기본값: true)" },
            ]}
          />
        </Subsection>

        <Subsection title="ActionAreaButton">
          <PropsTable
            props={[
              { name: "children", type: "ReactNode", required: true, description: "버튼 텍스트" },
              { name: "variant", type: '"main" | "sub" | "alternative"', required: false, description: "버튼 variant (기본값: main)" },
              { name: "disabled", type: "boolean", required: false, description: "비활성화 상태" },
              { name: "loading", type: "boolean", required: false, description: "로딩 상태" },
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
        <CodeBlock code={`import { ActionArea, ActionAreaButton } from '@zkap/design-system';`} />
      </Section>

      <Section title="Strong Variant">
        <PreviewBox>
          <div style={{ width: 320, display: "flex", flexDirection: "column", gap: 16 }}>
            <ActionAreaDemo variant="strong">
              <ActionButton variant="main">Main</ActionButton>
              <ActionButton variant="alternative">Alternative</ActionButton>
            </ActionAreaDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<ActionArea variant="strong">
  <ActionAreaButton variant="main" onPress={() => {}}>
    Main
  </ActionAreaButton>
  <ActionAreaButton variant="alternative" onPress={() => {}}>
    Alternative
  </ActionAreaButton>
</ActionArea>`} />
      </Section>

      <Section title="Neutral Variant">
        <PreviewBox>
          <div style={{ width: 320 }}>
            <ActionAreaDemo variant="neutral">
              <ActionButton variant="alternative">Alternative</ActionButton>
              <ActionButton variant="main">Main</ActionButton>
            </ActionAreaDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<ActionArea variant="neutral">
  <ActionAreaButton variant="alternative" onPress={() => {}}>
    Alternative
  </ActionAreaButton>
  <ActionAreaButton variant="main" onPress={() => {}}>
    Main
  </ActionAreaButton>
</ActionArea>`} />
      </Section>

      <Section title="Cancel Variant">
        <PreviewBox>
          <div style={{ width: 320 }}>
            <ActionAreaDemo variant="cancel">
              <ActionButton variant="main">Main</ActionButton>
            </ActionAreaDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<ActionArea variant="cancel">
  <ActionAreaButton variant="main" onPress={() => {}}>
    Main
  </ActionAreaButton>
</ActionArea>`} />
      </Section>

      <Section title="Compact Variant">
        <PreviewBox>
          <div style={{ width: 320 }}>
            <ActionAreaDemo variant="compact">
              <ActionButton variant="sub" size="small">Sub</ActionButton>
              <ActionButton variant="main" size="small">Main</ActionButton>
            </ActionAreaDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<ActionArea variant="compact">
  <ActionAreaButton variant="sub" onPress={() => {}}>
    Sub
  </ActionAreaButton>
  <ActionAreaButton variant="main" onPress={() => {}}>
    Main
  </ActionAreaButton>
</ActionArea>`} />
      </Section>

      <Section title="With Caption">
        <PreviewBox>
          <div style={{ width: 320 }}>
            <ActionAreaDemo variant="strong" caption="변경 사항을 저장하시겠습니까?">
              <ActionButton variant="main">확인</ActionButton>
            </ActionAreaDemo>
          </div>
        </PreviewBox>
        <CodeBlock code={`<ActionArea variant="strong" caption="변경 사항을 저장하시겠습니까?">
  <ActionAreaButton variant="main" onPress={() => {}}>
    확인
  </ActionAreaButton>
</ActionArea>`} />
      </Section>

      <Section title="API Reference">
        <Subsection title="ActionArea">
          <PropsTable
            props={[
              { name: "children", type: "ReactNode", required: true, description: "ActionAreaButton 요소들" },
              { name: "variant", type: '"strong" | "neutral" | "compact" | "cancel"', required: false, description: "레이아웃 variant (기본값: strong)" },
              { name: "extra", type: "boolean", required: false, description: "상단 영역 구분선 (기본값: false)" },
              { name: "caption", type: "ReactNode", required: false, description: "캡션 텍스트" },
              { name: "extraContent", type: "ReactNode", required: false, description: "상단 커스텀 콘텐츠" },
              { name: "compactContent", type: "ReactNode", required: false, description: "compact에서 좌측 콘텐츠" },
              { name: "background", type: "boolean", required: false, description: "배경 gradient/divider 표시" },
              { name: "divider", type: "boolean", required: false, description: "상단 divider (기본값: true)" },
            ]}
          />
        </Subsection>

        <Subsection title="ActionAreaButton">
          <PropsTable
            props={[
              { name: "children", type: "ReactNode", required: true, description: "버튼 텍스트" },
              { name: "variant", type: '"main" | "sub" | "alternative"', required: false, description: "버튼 variant (기본값: main)" },
              { name: "disabled", type: "boolean", required: false, description: "비활성화 상태" },
              { name: "loading", type: "boolean", required: false, description: "로딩 상태" },
              { name: "onPress", type: "() => void", required: false, description: "탭 핸들러" },
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
    <div style={{ marginBottom: 40 }}>
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

function PropsTable({ props }: { props: { name: string; type: string; required: boolean; description: string }[] }) {
  return (
    <div style={{ overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
        <thead>
          <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Name</th>
            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Type</th>
            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Required</th>
            <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop, i) => (
            <tr key={prop.name}>
              <td style={{ padding: "12px 16px", borderBottom: i === props.length - 1 ? "none" : "1px solid var(--divider)", verticalAlign: "top" }}>
                <code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 8px", borderRadius: 4, fontSize: 13, fontWeight: 500 }}>{prop.name}</code>
              </td>
              <td style={{ padding: "12px 16px", borderBottom: i === props.length - 1 ? "none" : "1px solid var(--divider)", color: "#6366f1", fontFamily: "monospace", fontSize: 13, verticalAlign: "top" }}>{prop.type}</td>
              <td style={{ padding: "12px 16px", borderBottom: i === props.length - 1 ? "none" : "1px solid var(--divider)", color: "var(--text-secondary)", verticalAlign: "top" }}>{prop.required ? "Yes" : "-"}</td>
              <td style={{ padding: "12px 16px", borderBottom: i === props.length - 1 ? "none" : "1px solid var(--divider)", color: "var(--text-secondary)", verticalAlign: "top" }}>{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ============================================
// Demo Components
// ============================================
type ActionAreaVariant = "strong" | "neutral" | "compact" | "cancel";

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
        return { flexDirection: "column" as const, gap: 8 };
      case "neutral":
        return { flexDirection: "row" as const, gap: 8 };
      case "compact":
        return { flexDirection: "row" as const, gap: 8, justifyContent: "flex-end" as const };
    }
  };

  const layout = getLayout();

  return (
    <div
      style={{
        padding: 16,
        backgroundColor: background ? "#f4f4f5" : "white",
        borderRadius: 12,
        border: extra ? "1px solid #e4e4e7" : "none",
        borderTop: extra ? "3px solid #e4e4e7" : undefined,
      }}
    >
      {caption && (
        <p style={{ fontSize: 13, color: "#71717a", marginBottom: 12, textAlign: "center" }}>
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
        padding: 16,
        backgroundColor: "white",
        borderRadius: 12,
        border: "1px solid #e4e4e7",
        borderTop: "3px solid #e4e4e7",
      }}
    >
      {/* Extra Content */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          style={{ width: 18, height: 18, accentColor: "var(--brand-primary)" }}
        />
        <label style={{ fontSize: 14, color: "#18181b" }}>약관에 동의합니다.</label>
      </div>
      {/* Buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <ActionButton variant="main">Main</ActionButton>
      </div>
    </div>
  );
}

type ButtonVariant = "main" | "sub" | "alternative";
type ButtonSize = "default" | "small";

interface ActionButtonProps {
  variant: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

function ActionButton({ variant, size = "default", children }: ActionButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getStyles = () => {
    const baseStyles = {
      padding: size === "small" ? "8px 16px" : "14px 24px",
      fontSize: size === "small" ? 13 : 15,
      fontWeight: 600,
      borderRadius: size === "small" ? 8 : 10,
      cursor: "pointer",
      transition: "all 200ms cubic-bezier(0.16, 1, 0.3, 1)",
      transform: isPressed ? "scale(0.98)" : "scale(1)",
      flex: size === "small" ? "0 0 auto" : 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };

    switch (variant) {
      case "main":
        return {
          ...baseStyles,
          backgroundColor: isPressed ? "#1e40af" : isHovered ? "#1d4ed8" : "var(--brand-primary)",
          color: "white",
          border: "none",
        };
      case "alternative":
        return {
          ...baseStyles,
          backgroundColor: isPressed ? "#e2e8f0" : isHovered ? "#f1f5f9" : "transparent",
          color: "var(--brand-primary)",
          border: "1px solid var(--brand-primary)",
        };
      case "sub":
        return {
          ...baseStyles,
          backgroundColor: "transparent",
          color: "var(--brand-primary)",
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
