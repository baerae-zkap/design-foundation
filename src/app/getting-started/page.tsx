"use client";

import { PreviewBox, CodeBlock } from "@/components/PlatformTabs";

export default function GettingStartedPage() {
  return (
    <div style={{ maxWidth: 720 }}>
      <header style={{ marginBottom: 48 }}>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 700,
            marginBottom: 12,
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
          }}
        >
          Getting Started
        </h1>
        <p
          style={{
            fontSize: 16,
            color: "var(--text-secondary)",
            lineHeight: 1.6,
          }}
        >
          ZKAP Design System을 프로젝트에 설치하고 사용하는 방법을 안내합니다.
        </p>
      </header>

      {/* Installation */}
      <Section title="Installation">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
          npm, yarn, 또는 pnpm을 사용하여 패키지를 설치합니다.
        </p>
        <CodeBlock
          code={`# npm
npm install @zkap/design-system

# yarn
yarn add @zkap/design-system

# pnpm
pnpm add @zkap/design-system`}
          language="bash"
        />
      </Section>

      {/* Usage - Web */}
      <Section title="Usage (Web)">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
          React 웹 프로젝트에서 컴포넌트를 import하여 사용합니다.
        </p>
        <CodeBlock
          code={`import { Button, TextButton } from '@zkap/design-system';

function App() {
  return (
    <>
      <Button
        buttonType="filled"
        color="brandDefault"
        size="medium"
        onClick={() => console.log('clicked')}
      >
        Confirm
      </Button>

      <TextButton
        variant="arrow"
        color="brandDefault"
        onClick={() => console.log('clicked')}
      >
        Learn More
      </TextButton>
    </>
  );
}`}
          language="tsx"
        />
      </Section>

      {/* Usage - React Native */}
      <Section title="Usage (React Native)">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
          React Native 프로젝트에서는 <code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 13 }}>/native</code> 경로에서 import합니다.
        </p>
        <CodeBlock
          code={`import { Button, TextButton } from '@zkap/design-system/native';

function App() {
  return (
    <>
      <Button
        buttonType="filled"
        color="brandDefault"
        size="medium"
        onPress={() => console.log('pressed')}
      >
        Confirm
      </Button>

      <TextButton
        variant="arrow"
        color="brandDefault"
        onPress={() => console.log('pressed')}
      >
        Learn More
      </TextButton>
    </>
  );
}`}
          language="tsx"
        />
      </Section>

      {/* Available Components */}
      <Section title="Available Components">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          <ComponentCard
            name="Button"
            description="Primary action button with filled/outlined variants"
            href="/components/actions/button"
          />
          <ComponentCard
            name="TextButton"
            description="Lightweight text-based action button"
            href="/components/actions/text-button"
          />
          <ComponentCard
            name="ActionArea"
            description="Layout pattern for button groups"
            href="/components/actions/action-area"
          />
        </div>
      </Section>

      {/* AI Documentation */}
      <Section title="AI Documentation">
        <PreviewBox>
          <div style={{ padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <span style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                backgroundColor: "#f0f9ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
              }}>
                AI
              </span>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)" }}>
                  AI-Readable Documentation
                </div>
                <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                  Vibe Coding을 위한 마크다운 문서가 패키지에 포함되어 있습니다.
                </div>
              </div>
            </div>
          </div>
        </PreviewBox>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginTop: 16, marginBottom: 16, lineHeight: 1.6 }}>
          AI가 컴포넌트의 디자인 규칙과 사용법을 이해할 수 있도록 마크다운 문서가 패키지에 포함됩니다.
        </p>
        <CodeBlock
          code={`# AI가 참조할 수 있는 문서 경로
node_modules/@zkap/design-system/docs/COMPONENTS.md     # 전체 개요
node_modules/@zkap/design-system/docs/components/Button.md
node_modules/@zkap/design-system/docs/components/TextButton.md
node_modules/@zkap/design-system/docs/components/ActionArea.md`}
          language="bash"
        />
      </Section>

      {/* Peer Dependencies */}
      <Section title="Peer Dependencies">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
          이 패키지는 다음 peer dependencies를 필요로 합니다.
        </p>
        <div style={{
          backgroundColor: "var(--bg-secondary)",
          borderRadius: 8,
          padding: 16,
        }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "8px 12px", fontSize: 13, fontWeight: 600, color: "var(--text-secondary)" }}>Package</th>
                <th style={{ textAlign: "left", padding: "8px 12px", fontSize: 13, fontWeight: 600, color: "var(--text-secondary)" }}>Version</th>
                <th style={{ textAlign: "left", padding: "8px 12px", fontSize: 13, fontWeight: 600, color: "var(--text-secondary)" }}>Required</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "8px 12px", fontSize: 14, color: "var(--text-primary)" }}>react</td>
                <td style={{ padding: "8px 12px", fontSize: 13, fontFamily: "monospace", color: "#6366f1" }}>&gt;= 18.0.0</td>
                <td style={{ padding: "8px 12px", fontSize: 14, color: "var(--text-primary)" }}>Yes</td>
              </tr>
              <tr>
                <td style={{ padding: "8px 12px", fontSize: 14, color: "var(--text-primary)" }}>react-native</td>
                <td style={{ padding: "8px 12px", fontSize: 13, fontFamily: "monospace", color: "#6366f1" }}>&gt;= 0.70.0</td>
                <td style={{ padding: "8px 12px", fontSize: 14, color: "var(--text-secondary)" }}>Optional (for native)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 56 }}>
      <h2
        style={{
          fontSize: 20,
          fontWeight: 700,
          marginBottom: 20,
          color: "var(--text-primary)",
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function ComponentCard({ name, description, href }: { name: string; description: string; href: string }) {
  return (
    <a
      href={href}
      style={{
        display: "block",
        padding: 20,
        backgroundColor: "white",
        borderRadius: 12,
        border: "1px solid var(--divider)",
        textDecoration: "none",
        transition: "all 150ms ease",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.borderColor = "#2563eb";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(37, 99, 235, 0.1)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.borderColor = "var(--divider)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)", marginBottom: 6 }}>
        {name}
      </div>
      <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>
        {description}
      </p>
    </a>
  );
}
