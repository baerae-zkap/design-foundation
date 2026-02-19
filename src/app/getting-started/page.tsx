"use client";

import Link from "next/link";
import { PreviewBox, CodeBlock } from "@/components/PlatformTabs";
import { typography, spacing, radius } from '@baerae-zkap/design-system';

export default function GettingStartedPage() {
  return (
    <div style={{ maxWidth: 720 }}>
      <header style={{ marginBottom: spacing.primitive[12] }}>
        <h1
          style={{
            fontSize: 32,
            fontWeight: typography.fontWeight.bold,
            marginBottom: spacing.primitive[3],
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
          }}
        >
          Getting Started
        </h1>
        <p
          style={{
            fontSize: typography.fontSize.md,
            color: "var(--text-secondary)",
            lineHeight: 1.6,
          }}
        >
          ZKAP Design System을 프로젝트에 설치하고 사용하는 방법을 안내합니다.
        </p>
      </header>

      {/* Installation */}
      <Section title="Installation">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.6 }}>
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
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.6 }}>
          React 웹 프로젝트에서 컴포넌트를 import하여 사용합니다.
        </p>
        <CodeBlock
          code={`import { Button, TextButton } from '@zkap/design-system';

function App() {
  return (
    <>
      <Button
        buttonType="filled"
        color="primary"
        size="medium"
        onClick={() => console.log('clicked')}
      >
        Confirm
      </Button>

      <TextButton
        variant="arrow"
        color="primary"
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
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.6 }}>
          React Native 프로젝트에서는 <code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: radius.primitive.xs, fontSize: typography.fontSize.compact }}>/native</code> 경로에서 import합니다.
        </p>
        <CodeBlock
          code={`import { Button, TextButton } from '@zkap/design-system/native';

function App() {
  return (
    <>
      <Button
        buttonType="filled"
        color="primary"
        size="medium"
        onPress={() => console.log('pressed')}
      >
        Confirm
      </Button>

      <TextButton
        variant="arrow"
        color="primary"
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: spacing.primitive[4] }}>
          <ComponentCard
            name="Button"
            description="Primary action button with filled/weak variants"
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
          <div style={{ padding: spacing.primitive[6] }}>
            <div style={{ display: "flex", alignItems: "center", gap: spacing.primitive[3], marginBottom: spacing.primitive[4] }}>
              <span style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                backgroundColor: "var(--surface-brand-secondary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: typography.fontSize.xl,
              }}>
                AI
              </span>
              <div>
                <div style={{ fontSize: 15, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>
                  AI-Readable Documentation
                </div>
                <div style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)" }}>
                  Vibe Coding을 위한 마크다운 문서가 패키지에 포함되어 있습니다.
                </div>
              </div>
            </div>
          </div>
        </PreviewBox>
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginTop: spacing.primitive[4], marginBottom: spacing.primitive[4], lineHeight: 1.6 }}>
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
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.6 }}>
          이 패키지는 다음 peer dependencies를 필요로 합니다.
        </p>
        <div style={{
          backgroundColor: "var(--bg-secondary)",
          borderRadius: radius.primitive.sm,
          padding: spacing.primitive[4],
        }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.semibold, color: "var(--text-secondary)" }}>Package</th>
                <th style={{ textAlign: "left", padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.semibold, color: "var(--text-secondary)" }}>Version</th>
                <th style={{ textAlign: "left", padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.semibold, color: "var(--text-secondary)" }}>Required</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontSize: typography.fontSize.sm, color: "var(--text-primary)" }}>react</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontSize: typography.fontSize.compact, fontFamily: "monospace", color: "var(--content-brand-default)" }}>&gt;= 18.0.0</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontSize: typography.fontSize.sm, color: "var(--text-primary)" }}>Yes</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontSize: typography.fontSize.sm, color: "var(--text-primary)" }}>react-native</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontSize: typography.fontSize.compact, fontFamily: "monospace", color: "var(--content-brand-default)" }}>&gt;= 0.70.0</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontSize: typography.fontSize.sm, color: "var(--text-secondary)" }}>Optional (for native)</td>
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
    <section style={{ marginBottom: spacing.primitive[14] }}>
      <h2
        style={{
          fontSize: typography.fontSize.xl,
          fontWeight: typography.fontWeight.bold,
          marginBottom: spacing.primitive[5],
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
    <Link
      href={href}
      style={{
        display: "block",
        padding: spacing.primitive[5],
        backgroundColor: "white",
        borderRadius: radius.primitive.md,
        border: "1px solid var(--divider)",
        textDecoration: "none",
        transition: "all 150ms ease",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.borderColor = "var(--content-brand-default)";
        e.currentTarget.style.boxShadow = "var(--shadow-sm)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.borderColor = "var(--divider)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div style={{ fontSize: 15, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)", marginBottom: 6 }}>
        {name}
      </div>
      <p style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>
        {description}
      </p>
    </Link>
  );
}
