"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform, highlightCode } from "@/components/PlatformTabs";
import { Spinner, typography, spacing, radius } from "@baerae-zkap/design-system";
import type { SpinnerSize, SpinnerColor } from "@baerae-zkap/design-system";
import { Section, Subsection, InlineCode } from "@/components/docs/Section";
import { PropsTable } from "@/components/docs/PropsTable";
import { DoCard, DontCard } from "@/components/docs/Cards";
import { RadioGroup, CopyButton } from "@/components/docs/Playground";

const GITHUB_BASE = "https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system/src";
const SPINNER_SOURCE = `${GITHUB_BASE}/components/Spinner/Spinner.tsx`;

const sizeOrder: SpinnerSize[] = ["xs", "sm", "md", "lg", "xl"];
const colorOrder: SpinnerColor[] = ["primary", "neutral", "inverse", "inherit"];

export default function LoadingPage() {
  return (
    <div style={{ maxWidth: 840 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Loading" },
          { label: "Spinner" },
        ]}
      />

      <h1
        style={{
          fontSize: typography.fontSize["3xl"],
          fontWeight: typography.fontWeight.bold,
          marginBottom: spacing.primitive[2],
          color: "var(--text-primary)",
          letterSpacing: "-0.02em",
        }}
      >
        Spinner
      </h1>
      <p
        style={{
          fontSize: typography.fontSize.md,
          color: "var(--text-secondary)",
          marginBottom: spacing.primitive[8],
          lineHeight: 1.7,
        }}
      >
        Spinner는 데이터 로딩이나 처리 대기 상태를 간결하게 전달하는 원형 인디케이터입니다.
        단독으로 사용하거나 컨테이너 중앙 정렬 오버레이 패턴에 함께 사용합니다.
      </p>

      <SpinnerPlayground />

      <PlatformTabs>{(platform) => <PlatformContent platform={platform} />}</PlatformTabs>
    </div>
  );
}

function SpinnerPlayground() {
  const [size, setSize] = useState<SpinnerSize>("md");
  const [color, setColor] = useState<Exclude<SpinnerColor, "inherit">>("primary");

  const previewBg = color === "inverse"
    ? "var(--surface-inverse-default, var(--inverse-surface-default))"
    : "var(--surface-base-alternative)";

  const generateCode = () => {
    const lines: string[] = ["<Spinner"];
    if (size !== "md") lines.push(`  size=\"${size}\"`);
    if (color !== "primary") lines.push(`  color=\"${color}\"`);
    lines.push("/>");

    if (lines.length === 2) {
      return "<Spinner />";
    }

    return lines.join("\n");
  };

  return (
    <div style={{ marginBottom: spacing.primitive[8] }}>
      <div
        style={{
          borderRadius: radius.primitive.xl,
          overflow: "hidden",
          backgroundColor: "var(--surface-base-default)", border: "1px solid var(--border-solid-alternative)",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", minHeight: 360 }}>
          <div
            style={{
              padding: spacing.primitive[10],
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: previewBg,
              color: color === "inverse" ? "var(--inverse-content-default)" : "var(--content-base-default)",
            }}
          >
            <Spinner size={size} color={color} />
          </div>

          <div
            style={{
              backgroundColor: "var(--surface-base-default)", borderLeft: "1px solid var(--border-solid-alternative)",
              display: "flex",
              flexDirection: "column",
              padding: spacing.primitive[4],
              height: "100%",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                flex: 1,
                minHeight: 0,
                padding: spacing.primitive[6],
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: spacing.primitive[7],
                backgroundColor: "var(--surface-base-default)",
                borderRadius: radius.primitive.lg,
              }}
            >
              <RadioGroup
                label="size"
                options={sizeOrder.map((value) => ({ value, label: value }))}
                value={size}
                onChange={(v) => setSize(v as SpinnerSize)}
              />

              <RadioGroup
                label="color"
                options={[
                  { value: "primary", label: "primary" },
                  { value: "neutral", label: "neutral" },
                  { value: "inverse", label: "inverse" },
                ]}
                value={color}
                onChange={(v) => setColor(v as Exclude<SpinnerColor, "inherit">)}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: spacing.primitive[4],
          borderRadius: radius.primitive.md,
          overflow: "hidden",
          border: "1px solid var(--divider)",
        }}
      >
        <div
          style={{
            padding: `${spacing.primitive[2]}px ${spacing.primitive[4]}px`,
            backgroundColor: "var(--docs-code-surface)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: spacing.primitive[2] }}>
            <span
              style={{
                fontSize: typography.fontSize.compact,
                fontWeight: typography.fontWeight.semibold,
                padding: `${spacing.primitive[1]}px ${spacing.primitive[3]}px`,
                borderRadius: 6, /* optical: between xs(4) and sm(8), compact tab badge */
                color: "var(--content-base-onColor)",
                backgroundColor: "var(--docs-code-active-bg)",
              }}
            >
              Web
            </span>
          </div>
          <CopyButton text={generateCode()} />
        </div>
        <pre
          style={{
            margin: 0,
            padding: spacing.primitive[4],
            fontSize: typography.fontSize.compact,
            lineHeight: 1.6,
            color: "var(--docs-code-text)",
            backgroundColor: "var(--docs-code-surface)",
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

function PlatformContent({ platform }: { platform: Platform }) {
  if (platform === "design") return <DesignContent />;
  return <WebContent />;
}

function DesignContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>
      <Section title="Overview">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>
          <InlineCode>Spinner</InlineCode>는 짧은 비동기 작업의 진행 중 상태를 표시하는 로딩 인디케이터입니다.
          단순한 구조로 어디서나 쉽게 배치할 수 있습니다.
        </p>
      </Section>

      <Section title="Anatomy">
        <div
          style={{
            backgroundColor: "var(--surface-base-alternative)",
            borderRadius: radius.primitive.md,
            padding: spacing.primitive[8],
            display: "flex",
            justifyContent: "center",
          }}
        >
          <svg width="420" height="140" viewBox="0 0 420 140" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Spinner anatomy diagram">
            <circle cx="180" cy="70" r="28" stroke="var(--content-base-assistive)" strokeOpacity="0.3" strokeWidth="6" />
            <path d="M180 42 A28 28 0 0 1 207 64" stroke="var(--content-brand-default)" strokeWidth="6" strokeLinecap="round" />

            <line x1="120" y1="70" x2="70" y2="70" stroke="var(--content-base-assistive)" strokeWidth="1" strokeDasharray="2 2" />
            <text x="44" y="74" fill="var(--text-secondary)" fontSize="11" fontFamily="system-ui">1. Track ring</text>

            <line x1="207" y1="52" x2="262" y2="30" stroke="var(--content-base-assistive)" strokeWidth="1" strokeDasharray="2 2" />
            <text x="270" y="34" fill="var(--text-secondary)" fontSize="11" fontFamily="system-ui">2. Indicator arc</text>
          </svg>
        </div>
      </Section>

      <Section title="Variants (Size)">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(88px, 1fr))", gap: spacing.primitive[3] }}>
          {sizeOrder.map((size) => (
            <div
              key={size}
              style={{
                backgroundColor: "var(--surface-base-alternative)",
                borderRadius: radius.primitive.md,
                padding: spacing.primitive[4],
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: spacing.primitive[2],
              }}
            >
              <Spinner size={size} />
              <span style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)" }}>{size}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Color">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: spacing.primitive[4] }}>
          {colorOrder.map((color) => {
            const isInverse = color === "inverse";
            const bg = isInverse
              ? "var(--surface-inverse-default, var(--inverse-surface-default))"
              : "var(--surface-base-alternative)";
            const textColor = color === "inherit"
              ? "var(--content-success-default)"
              : isInverse
                ? "var(--inverse-content-default)"
                : "var(--content-base-default)";

            return (
              <div
                key={color}
                style={{
                  borderRadius: radius.primitive.md,
                  border: "1px solid var(--divider)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: 120,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: bg,
                    color: textColor,
                  }}
                >
                  <Spinner color={color} />
                </div>
                <div style={{ padding: spacing.primitive[3], backgroundColor: "var(--surface-base-default)" }}>
                  <p style={{ margin: 0, fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>
                    {color}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section title="States">
        <Subsection title="Interaction States">
          <p style={{ margin: 0, fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7 }}>
            Spinner is non-interactive. It has no hover/pressed/disabled state. Use parent component states.
          </p>
        </Subsection>
      </Section>

      <Section title="Usage Guidelines">
        <Subsection title="Best Practices">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: spacing.primitive[4] }}>
            <DoCard>
              <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                300ms 이상 대기되는 비동기 작업에서만 Spinner를 노출해 로딩 상태를 명확하게 전달하세요.
              </p>
            </DoCard>
            <DontCard>
              <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                즉시 완료되는 동작에 Spinner를 표시하지 마세요. 불필요한 깜빡임은 사용자 신뢰를 낮춥니다.
              </p>
            </DontCard>
            <DoCard>
              <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                버튼 내부나 카드 오버레이에 사용할 때 주변 문맥과 대비가 충분한 색상을 선택하세요.
              </p>
            </DoCard>
            <DontCard>
              <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                텍스트 설명 없이 전체 화면을 Spinner만으로 대체하지 마세요. 필요한 경우 상태 메시지를 함께 제공하세요.
              </p>
            </DontCard>
          </div>
        </Subsection>
      </Section>

      <Section title="Design Tokens">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--divider)" }}>
              {["Token", "Value", "Usage"].map((head) => (
                <th key={head} style={{ textAlign: "left", padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-primary)", fontWeight: typography.fontWeight.semibold }}>
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["content.brand.default", "var(--content-brand-default)", "primary indicator color"],
              ["content.base.secondary", "var(--content-base-secondary)", "neutral indicator color"],
              ["inverse.content.default", "var(--inverse-content-default)", "inverse indicator color"],
              ["spacing.primitive[4]", "16px", "control panel/card spacing"],
              ["radius.primitive.md", "12px", "preview/tile rounding"],
            ].map(([token, value, usage]) => (
              <tr key={token} style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}><InlineCode>{token}</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>{value}</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>{usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section title="Accessibility">
        <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[3] }}>
          {[
            { prop: 'role="status"', desc: "보조기기에 진행 상태를 전달하는 live region 역할" },
            { prop: 'aria-live="polite"', desc: "현재 읽기 흐름을 방해하지 않고 로딩 상태를 알림" },
            { prop: 'aria-label', desc: '기본값은 "로딩 중"이며 상황에 맞는 레이블로 변경 가능' },
            { prop: 'aria-hidden="true"', desc: "내부 시각 링은 스크린 리더 탐색에서 제외" },
          ].map(({ prop, desc }) => (
            <div key={prop} style={{ display: "flex", gap: spacing.primitive[3], alignItems: "flex-start" }}>
              <InlineCode>{prop}</InlineCode>
              <span style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.6 }}>{desc}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Related Components">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: spacing.primitive[3] }}>
          {[
            { name: "StateView", href: "/components/feedback/state-view", desc: "로딩 포함한 비어있는 전체 상태 화면" },
            { name: "Toast", href: "/components/feedback/toast", desc: "비동기 완료/실패 결과 피드백" },
            { name: "SectionMessage", href: "/components/feedback/section-message", desc: "섹션 내 인라인 상태 안내" },
          ].map(({ name, href, desc }) => (
            <a
              key={name}
              href={href}
              style={{
                padding: spacing.primitive[4],
                backgroundColor: "var(--surface-base-alternative)",
                borderRadius: radius.primitive.md,
                textDecoration: "none",
                display: "block",
              }}
            >
              <p style={{ margin: 0, color: "var(--text-primary)", fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold }}>
                {name}
              </p>
              <p style={{ margin: `${spacing.primitive[1]}px 0 0 0`, color: "var(--text-secondary)", fontSize: typography.fontSize.sm }}>
                {desc}
              </p>
            </a>
          ))}
        </div>
      </Section>
    </div>
  );
}

function WebContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>
      <Section title="Source Code">
        <div
          style={{
            padding: spacing.primitive[4],
            backgroundColor: "var(--surface-base-default)", borderLeft: "1px solid var(--border-solid-alternative)",
            borderRadius: radius.primitive.md,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: spacing.primitive[4],
            flexWrap: "wrap",
          }}
        >
          <div>
            <p style={{ margin: 0, fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>
              Spinner Component
            </p>
            <p style={{ margin: `${spacing.primitive[1]}px 0 0 0`, fontSize: typography.fontSize.compact, color: "var(--text-secondary)" }}>
              실제 컴포넌트 구현은 GitHub에서 확인할 수 있습니다.
            </p>
          </div>
          <a
            href={SPINNER_SOURCE}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: spacing.primitive[1],
              padding: `${spacing.primitive[2]}px ${spacing.primitive[4]}px`,
              fontSize: typography.fontSize.compact,
              fontWeight: typography.fontWeight.medium,
              color: "var(--content-base-onColor)",
              backgroundColor: "var(--docs-code-surface)",
              borderRadius: radius.primitive.md,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View on GitHub
          </a>
        </div>
      </Section>

      <Section title="Import">
        <CodeBlock
          code={`import { Spinner, typography, spacing, radius } from '@baerae-zkap/design-system';
import type { SpinnerSize, SpinnerColor } from '@baerae-zkap/design-system';`}
          language="tsx"
        />
      </Section>

      <Section title="Basic Usage">
        <PreviewBox>
          <div style={{ width: "100%", minHeight: 120, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Spinner />
          </div>
        </PreviewBox>
        <CodeBlock code={`<Spinner />`} language="tsx" />
      </Section>

      <Section title="Sizes example">
        <PreviewBox>
          <div style={{ display: "flex", alignItems: "center", gap: spacing.primitive[6], flexWrap: "wrap", justifyContent: "center" }}>
            {sizeOrder.map((size) => (
              <div key={size} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
                <Spinner size={size} />
                <span style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)" }}>{size}</span>
              </div>
            ))}
          </div>
        </PreviewBox>
        <CodeBlock
          code={`<Spinner size="xs" />
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
<Spinner size="xl" />`}
          language="tsx"
        />
      </Section>

      <Section title="Colors example">
        <PreviewBox>
          <div style={{ width: "100%", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: spacing.primitive[4] }}>
            <div style={{ borderRadius: radius.primitive.md, backgroundColor: "var(--surface-base-default)", border: "1px solid var(--divider)", padding: spacing.primitive[4], display: "flex", justifyContent: "center" }}>
              <Spinner color="primary" />
            </div>
            <div style={{ borderRadius: radius.primitive.md, backgroundColor: "var(--surface-base-default)", border: "1px solid var(--divider)", padding: spacing.primitive[4], display: "flex", justifyContent: "center" }}>
              <Spinner color="neutral" />
            </div>
            <div style={{ borderRadius: radius.primitive.md, backgroundColor: "var(--surface-inverse-default, var(--inverse-surface-default))", padding: spacing.primitive[4], display: "flex", justifyContent: "center" }}>
              <Spinner color="inverse" />
            </div>
            <div style={{ borderRadius: radius.primitive.md, backgroundColor: "var(--surface-base-default)", border: "1px solid var(--divider)", color: "var(--content-success-default)", padding: spacing.primitive[4], display: "flex", justifyContent: "center" }}>
              <Spinner color="inherit" />
            </div>
          </div>
        </PreviewBox>
        <CodeBlock
          code={`<Spinner color="primary" />
<Spinner color="neutral" />
<Spinner color="inverse" />
<Spinner color="inherit" />`}
          language="tsx"
        />
      </Section>

      <Section title="Overlay Pattern">
        <PreviewBox>
          <div
            style={{
              width: "100%",
              maxWidth: 480,
              height: 180,
              position: "relative",
              borderRadius: radius.primitive.md,
              backgroundColor: "var(--surface-base-container)",
              border: "1px solid var(--divider)",
            }}
          >
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Spinner size="lg" />
            </div>
          </div>
        </PreviewBox>
        <CodeBlock
          code={`<div style={{ position: 'relative', minHeight: 180 }}>
  <Content />
  <div style={{
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    <Spinner size="lg" />
  </div>
</div>`}
          language="tsx"
        />
      </Section>

      <Section title="API Reference">
        <PropsTable
          props={[
            {
              name: "size",
              type: '"xs" | "sm" | "md" | "lg" | "xl"',
              required: false,
              defaultVal: '"md"',
              description: "스피너의 시각적 크기를 지정합니다.",
            },
            {
              name: "color",
              type: '"primary" | "neutral" | "inverse" | "inherit"',
              required: false,
              defaultVal: '"primary"',
              description: "인디케이터 색상 토큰을 선택합니다.",
            },
            {
              name: "aria-label",
              type: "string",
              required: false,
              defaultVal: '"로딩 중"',
              description: "스크린 리더에 전달할 로딩 상태 설명입니다.",
            },
            {
              name: "className",
              type: "string",
              required: false,
              defaultVal: "-",
              description: "외부 스타일 클래스명을 전달합니다.",
            },
            {
              name: "style",
              type: "React.CSSProperties",
              required: false,
              defaultVal: "-",
              description: "루트 컨테이너 인라인 스타일을 확장합니다.",
            },
          ]}
        />
      </Section>
    </div>
  );
}
