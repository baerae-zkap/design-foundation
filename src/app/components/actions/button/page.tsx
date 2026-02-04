"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";

type ButtonVariant = "primary" | "secondary" | "tertiary";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonDemoProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  children: React.ReactNode;
}

function ButtonDemo({ variant = "primary", size = "md", disabled = false, children }: ButtonDemoProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const sizeStyles = {
    sm: { padding: "8px 16px", fontSize: 13, borderRadius: 8 },
    md: { padding: "10px 20px", fontSize: 14, borderRadius: 10 },
    lg: { padding: "14px 28px", fontSize: 16, borderRadius: 12 },
  };

  const variantStyles = {
    primary: {
      backgroundColor: disabled ? "#94a3b8" : isPressed ? "#1e40af" : isHovered ? "#1d4ed8" : "#2563eb",
      color: "white",
      border: "none",
    },
    secondary: {
      backgroundColor: disabled ? "#f1f5f9" : isPressed ? "#e2e8f0" : isHovered ? "#f1f5f9" : "transparent",
      color: disabled ? "#94a3b8" : "#2563eb",
      border: `1px solid ${disabled ? "#cbd5e1" : "#2563eb"}`,
    },
    tertiary: {
      backgroundColor: disabled ? "#f1f5f9" : isPressed ? "#e2e8f0" : isHovered ? "#f1f5f9" : "#f8fafc",
      color: disabled ? "#94a3b8" : "#334155",
      border: "none",
    },
  };

  return (
    <button
      disabled={disabled}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
      onMouseDown={() => !disabled && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      style={{
        ...sizeStyles[size],
        ...variantStyles[variant],
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 200ms cubic-bezier(0.16, 1, 0.3, 1)",
        transform: isPressed ? "scale(0.97)" : "scale(1)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
      }}
    >
      {children}
    </button>
  );
}

export default function ButtonPage() {
  return (
    <div style={{ maxWidth: 960, margin: "0 auto" }}>
      <Breadcrumb
        items={[
          { label: "컴포넌트", href: "/components" },
          { label: "Actions", href: "/components/actions/button" },
          { label: "Button" },
        ]}
      />

      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 4, color: "var(--text-primary)" }}>
        Button
      </h1>
      <p style={{ fontSize: 16, color: "var(--text-secondary)", marginBottom: 32 }}>
        사용자의 액션을 유도하는 기본 인터랙티브 요소입니다.
      </p>

      {/* Variants */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4, color: "var(--text-primary)" }}>
          Variants
        </h2>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16 }}>
          버튼의 시각적 중요도에 따라 세 가지 변형을 제공합니다.
        </p>
        <div style={{ padding: 32, backgroundColor: "var(--bg-secondary)", borderRadius: 16, display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
          <ButtonDemo variant="primary">Primary</ButtonDemo>
          <ButtonDemo variant="secondary">Secondary</ButtonDemo>
          <ButtonDemo variant="tertiary">Tertiary</ButtonDemo>
        </div>
        <div style={{ marginTop: 16, padding: 20, backgroundColor: "var(--bg-elevated)", borderRadius: 12, border: "1px solid var(--divider)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "12px 24px", fontSize: 14 }}>
            <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>Primary</span>
            <span style={{ color: "var(--text-secondary)" }}>가장 중요한 액션에 사용. 화면당 하나만 권장</span>
            <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>Secondary</span>
            <span style={{ color: "var(--text-secondary)" }}>보조 액션에 사용. Primary와 함께 배치 가능</span>
            <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>Tertiary</span>
            <span style={{ color: "var(--text-secondary)" }}>덜 중요한 액션에 사용. 배경과 유사한 톤</span>
          </div>
        </div>
      </section>

      {/* Sizes */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4, color: "var(--text-primary)" }}>
          Sizes
        </h2>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16 }}>
          컨텍스트에 맞는 세 가지 크기를 제공합니다.
        </p>
        <div style={{ padding: 32, backgroundColor: "var(--bg-secondary)", borderRadius: 16, display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
          <ButtonDemo size="sm">Small</ButtonDemo>
          <ButtonDemo size="md">Medium</ButtonDemo>
          <ButtonDemo size="lg">Large</ButtonDemo>
        </div>
        <div style={{ marginTop: 16, padding: 20, backgroundColor: "var(--bg-elevated)", borderRadius: 12, border: "1px solid var(--divider)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "12px 24px", fontSize: 14 }}>
            <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>Small</span>
            <span style={{ color: "var(--text-secondary)" }}>밀도가 높은 UI나 테이블 내 액션에 적합</span>
            <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>Medium</span>
            <span style={{ color: "var(--text-secondary)" }}>기본 크기. 대부분의 상황에 적합</span>
            <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>Large</span>
            <span style={{ color: "var(--text-secondary)" }}>CTA나 모바일 터치 영역에 적합</span>
          </div>
        </div>
      </section>

      {/* States */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4, color: "var(--text-primary)" }}>
          States
        </h2>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16 }}>
          버튼의 인터랙션 상태를 나타냅니다.
        </p>

        {/* Primary States */}
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--text-tertiary)", marginBottom: 12 }}>Primary</h3>
          <div style={{ padding: 32, backgroundColor: "var(--bg-secondary)", borderRadius: 16, display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <ButtonDemo variant="primary">Default</ButtonDemo>
              <p style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 8 }}>Default</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <button style={{ padding: "10px 20px", fontSize: 14, fontWeight: 600, backgroundColor: "#1d4ed8", color: "white", border: "none", borderRadius: 10, cursor: "pointer" }}>Hover</button>
              <p style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 8 }}>Hover</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <button style={{ padding: "10px 20px", fontSize: 14, fontWeight: 600, backgroundColor: "#1e40af", color: "white", border: "none", borderRadius: 10, cursor: "pointer", transform: "scale(0.97)" }}>Pressed</button>
              <p style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 8 }}>Pressed</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <ButtonDemo variant="primary" disabled>Disabled</ButtonDemo>
              <p style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 8 }}>Disabled</p>
            </div>
          </div>
        </div>

        {/* Secondary States */}
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--text-tertiary)", marginBottom: 12 }}>Secondary</h3>
          <div style={{ padding: 32, backgroundColor: "var(--bg-secondary)", borderRadius: 16, display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <ButtonDemo variant="secondary">Default</ButtonDemo>
              <p style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 8 }}>Default</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <button style={{ padding: "10px 20px", fontSize: 14, fontWeight: 600, backgroundColor: "#f1f5f9", color: "#2563eb", border: "1px solid #2563eb", borderRadius: 10, cursor: "pointer" }}>Hover</button>
              <p style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 8 }}>Hover</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <button style={{ padding: "10px 20px", fontSize: 14, fontWeight: 600, backgroundColor: "#e2e8f0", color: "#2563eb", border: "1px solid #2563eb", borderRadius: 10, cursor: "pointer", transform: "scale(0.97)" }}>Pressed</button>
              <p style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 8 }}>Pressed</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <ButtonDemo variant="secondary" disabled>Disabled</ButtonDemo>
              <p style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 8 }}>Disabled</p>
            </div>
          </div>
        </div>

        {/* Tertiary States */}
        <div>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--text-tertiary)", marginBottom: 12 }}>Tertiary</h3>
          <div style={{ padding: 32, backgroundColor: "var(--bg-secondary)", borderRadius: 16, display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <ButtonDemo variant="tertiary">Default</ButtonDemo>
              <p style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 8 }}>Default</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <button style={{ padding: "10px 20px", fontSize: 14, fontWeight: 600, backgroundColor: "#f1f5f9", color: "#334155", border: "none", borderRadius: 10, cursor: "pointer" }}>Hover</button>
              <p style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 8 }}>Hover</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <button style={{ padding: "10px 20px", fontSize: 14, fontWeight: 600, backgroundColor: "#e2e8f0", color: "#334155", border: "none", borderRadius: 10, cursor: "pointer", transform: "scale(0.97)" }}>Pressed</button>
              <p style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 8 }}>Pressed</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <ButtonDemo variant="tertiary" disabled>Disabled</ButtonDemo>
              <p style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 8 }}>Disabled</p>
            </div>
          </div>
        </div>
      </section>

      {/* With Icon */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4, color: "var(--text-primary)" }}>
          With Icon
        </h2>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16 }}>
          아이콘과 함께 사용하여 의미를 명확히 전달할 수 있습니다.
        </p>
        <div style={{ padding: 32, backgroundColor: "var(--bg-secondary)", borderRadius: 16, display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
          <ButtonDemo variant="primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add Item
          </ButtonDemo>
          <ButtonDemo variant="secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            Download
          </ButtonDemo>
          <ButtonDemo variant="tertiary">
            Settings
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </ButtonDemo>
        </div>
      </section>

      {/* Full Width */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4, color: "var(--text-primary)" }}>
          Full Width
        </h2>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16 }}>
          컨테이너 전체 너비를 차지하는 버튼입니다. 모바일이나 모달 하단에 적합합니다.
        </p>
        <div style={{ padding: 32, backgroundColor: "var(--bg-secondary)", borderRadius: 16 }}>
          <div style={{ maxWidth: 320, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12 }}>
            <button style={{ width: "100%", padding: "14px 28px", fontSize: 16, fontWeight: 600, backgroundColor: "#2563eb", color: "white", border: "none", borderRadius: 12, cursor: "pointer", transition: "all 200ms cubic-bezier(0.16, 1, 0.3, 1)" }}>
              Continue
            </button>
            <button style={{ width: "100%", padding: "14px 28px", fontSize: 16, fontWeight: 600, backgroundColor: "transparent", color: "#2563eb", border: "1px solid #2563eb", borderRadius: 12, cursor: "pointer", transition: "all 200ms cubic-bezier(0.16, 1, 0.3, 1)" }}>
              Cancel
            </button>
          </div>
        </div>
      </section>

      {/* Props Table */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4, color: "var(--text-primary)" }}>
          Props
        </h2>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16 }}>
          Button 컴포넌트의 속성입니다.
        </p>
        <div style={{ overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "var(--text-primary)", borderBottom: "1px solid var(--divider)" }}>Prop</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "var(--text-primary)", borderBottom: "1px solid var(--divider)" }}>Type</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "var(--text-primary)", borderBottom: "1px solid var(--divider)" }}>Default</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "var(--text-primary)", borderBottom: "1px solid var(--divider)" }}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4 }}>variant</code></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>&quot;primary&quot; | &quot;secondary&quot; | &quot;tertiary&quot;</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>&quot;primary&quot;</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>버튼의 시각적 스타일</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4 }}>size</code></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>&quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>&quot;md&quot;</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>버튼의 크기</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4 }}>disabled</code></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>boolean</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>false</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>비활성화 상태</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4 }}>fullWidth</code></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>boolean</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>false</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>전체 너비 차지 여부</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4 }}>leftIcon</code></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>ReactNode</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>-</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>텍스트 왼쪽 아이콘</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4 }}>rightIcon</code></td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>ReactNode</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>-</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>텍스트 오른쪽 아이콘</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Design Tokens */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4, color: "var(--text-primary)" }}>
          Design Tokens
        </h2>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16 }}>
          Button에 적용된 디자인 토큰입니다.
        </p>
        <div style={{ overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "var(--text-primary)", borderBottom: "1px solid var(--divider)" }}>Token</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "var(--text-primary)", borderBottom: "1px solid var(--divider)" }}>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Border Radius (sm)</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>8px</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Border Radius (md)</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>10px</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Border Radius (lg)</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>12px</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-primary)" }}>Transition Duration</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>200ms</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", color: "var(--text-primary)" }}>Easing</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>cubic-bezier(0.16, 1, 0.3, 1)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
