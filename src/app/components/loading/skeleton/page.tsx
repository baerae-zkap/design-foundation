"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform, highlightCode } from "@/components/PlatformTabs";
import { Skeleton, typography, spacing, radius } from "@baerae-zkap/design-system";
import type { SkeletonVariant, SkeletonAnimation } from "@baerae-zkap/design-system";
import { Section, Subsection, InlineCode } from "@/components/docs/Section";
import { PropsTable } from "@/components/docs/PropsTable";
import { DoCard, DontCard, VariantCard } from "@/components/docs/Cards";
import { RadioGroup, CopyButton } from "@/components/docs/Playground";

const GITHUB_BASE = "https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system/src";
const SKELETON_SOURCE = `${GITHUB_BASE}/components/Skeleton/Skeleton.tsx`;

const variantOptions: { value: SkeletonVariant; label: string }[] = [
  { value: "text", label: "text" },
  { value: "rectangle", label: "rectangle" },
  { value: "circle", label: "circle" },
];

const animationOptions: { value: SkeletonAnimation; label: string }[] = [
  { value: "shimmer", label: "shimmer" },
  { value: "pulse", label: "pulse" },
  { value: "none", label: "none" },
];

export default function SkeletonPage() {
  return (
    <div style={{ maxWidth: 720 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Loading" },
          { label: "Skeleton" },
        ]}
      />

      <h1
        style={{
          fontSize: typography.fontSize["3xl"],
          fontWeight: 700,
          marginBottom: spacing.primitive[2],
          color: "var(--text-primary)",
          letterSpacing: "-0.02em",
        }}
      >
        Skeleton
      </h1>
      <p
        style={{
          fontSize: typography.fontSize.md,
          color: "var(--text-secondary)",
          marginBottom: spacing.primitive[8],
          lineHeight: 1.7,
        }}
      >
        콘텐츠가 로드되는 동안 실제 UI 레이아웃을 미리 보여주는 플레이스홀더 컴포넌트입니다.
      </p>

      <SkeletonPlayground />

      <PlatformTabs>{(platform) => <PlatformContent platform={platform} />}</PlatformTabs>
    </div>
  );
}

function SkeletonPlayground() {
  const [variant, setVariant] = useState<SkeletonVariant>("rectangle");
  const [animation, setAnimation] = useState<SkeletonAnimation>("shimmer");

  const sampleWidth = variant === "circle" ? 52 : variant === "text" ? "70%" : "100%";
  const sampleHeight = variant === "circle" ? 52 : variant === "text" ? 14 : 88;

  const generateCode = () => {
    const lines: string[] = ["<Skeleton"];
    if (variant !== "rectangle") lines.push(`  variant=\"${variant}\"`);
    if (animation !== "shimmer") lines.push(`  animation=\"${animation}\"`);
    lines.push("/>");

    if (lines.length === 2) {
      return "<Skeleton />";
    }

    return lines.join("\n");
  };

  return (
    <div style={{ marginBottom: spacing.primitive[8] }}>
      <div
        style={{
          borderRadius: 20,
          overflow: "hidden",
          backgroundColor: "var(--surface-base-alternative)",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", minHeight: 360 }}>
          <div
            style={{
              padding: spacing.primitive[8],
              backgroundColor: "var(--surface-base-default)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: 440,
                border: "1px solid var(--divider)",
                borderRadius: radius.primitive.lg,
                backgroundColor: "var(--surface-base-default)",
                padding: spacing.primitive[5],
                display: "flex",
                flexDirection: "column",
                gap: spacing.primitive[4],
              }}
            >
              <div style={{ display: "flex", gap: spacing.primitive[3], alignItems: "center" }}>
                <Skeleton variant="circle" width={40} height={40} animation={animation} />
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
                  <Skeleton variant="text" width="48%" animation={animation} />
                  <Skeleton variant="text" width="78%" animation={animation} />
                </div>
              </div>

              <Skeleton variant="rectangle" height={116} animation={animation} />

              <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
                <span style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)" }}>
                  Selected variant
                </span>
                <Skeleton variant={variant} width={sampleWidth} height={sampleHeight} animation={animation} />
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "var(--surface-base-alternative)",
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
                borderRadius: spacing.primitive[4],
              }}
            >
              <RadioGroup
                label="variant"
                options={variantOptions}
                value={variant}
                onChange={(v) => setVariant(v as SkeletonVariant)}
              />
              <RadioGroup
                label="animation"
                options={animationOptions}
                value={animation}
                onChange={(v) => setAnimation(v as SkeletonAnimation)}
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
            padding: "10px 16px",
            backgroundColor: "var(--docs-code-surface)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontSize: typography.fontSize.compact,
              fontWeight: typography.fontWeight.semibold,
              padding: "4px 12px",
              borderRadius: 6,
              color: "var(--content-base-onColor)",
              backgroundColor: "var(--docs-code-active-bg)",
            }}
          >
            Web
          </span>
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
          Skeleton은 콘텐츠가 로드되기 전에 실제 UI 레이아웃을 미리 보여주는 플레이스홀더입니다.
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
          <svg width="420" height="160" viewBox="0 0 420 160" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Skeleton anatomy diagram">
            <rect x="90" y="44" width="240" height="72" rx="8" fill="var(--surface-base-container)" />
            <rect x="90" y="44" width="240" height="72" rx="8" stroke="var(--content-base-assistive)" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="330" y1="80" x2="364" y2="58" stroke="var(--content-base-assistive)" strokeWidth="1" strokeDasharray="2 2" />
            <text x="368" y="62" fill="var(--text-secondary)" fontSize="11" fontFamily="system-ui">1. Shape</text>
          </svg>
        </div>
      </Section>

      <Section title="Variants">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: spacing.primitive[4] }}>
          <VariantCard name="Text" description="문장/단락 로딩에 적합한 라인 형태입니다.">
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
              <Skeleton variant="text" width="88%" />
              <Skeleton variant="text" width="64%" />
            </div>
          </VariantCard>
          <VariantCard name="Rectangle" description="카드, 썸네일, 블록 영역을 대체합니다.">
            <Skeleton variant="rectangle" width="100%" height={56} />
          </VariantCard>
          <VariantCard name="Circle" description="아바타, 아이콘 자리 표시자에 사용합니다.">
            <Skeleton variant="circle" width={44} height={44} />
          </VariantCard>
        </div>
      </Section>

      <Section title="Animation">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: spacing.primitive[4] }}>
          {animationOptions.map((option) => (
            <div
              key={option.value}
              style={{
                border: "1px solid var(--divider)",
                borderRadius: radius.primitive.md,
                padding: spacing.primitive[4],
                backgroundColor: "var(--surface-base-default)",
                display: "flex",
                flexDirection: "column",
                gap: spacing.primitive[3],
              }}
            >
              <Skeleton variant="rectangle" animation={option.value} height={52} />
              <span style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)" }}>{option.label}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Composition">
        <PreviewBox padding={0}>
          <div style={{ width: "100%", display: "flex", gap: 12, padding: 20, alignItems: "flex-start" }}>
            <Skeleton variant="circle" width={48} height={48} />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
              <Skeleton variant="text" height={14} width="60%" />
              <Skeleton variant="text" height={14} width="90%" />
              <Skeleton variant="text" height={14} width="40%" />
            </div>
          </div>
        </PreviewBox>
        <CodeBlock
          code={`<div style={{ display: 'flex', gap: 12, padding: 20 }}>
  <Skeleton variant="circle" width={48} height={48} />
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
    <Skeleton variant="text" height={14} width="60%" />
    <Skeleton variant="text" height={14} width="90%" />
    <Skeleton variant="text" height={14} width="40%" />
  </div>
</div>`}
          language="tsx"
        />
      </Section>

      <Section title="States">
        <Subsection title="Interaction States">
          <p style={{ margin: 0, fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7 }}>
            Skeleton은 비인터랙티브 요소입니다. 콘텐츠 로드 완료 시 실제 콘텐츠로 교체하세요.
          </p>
        </Subsection>
      </Section>

      <Section title="Usage Guidelines">
        <Subsection title="Best Practices">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: spacing.primitive[4] }}>
            <DoCard>
              <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                실제 콘텐츠 레이아웃과 유사한 크기로 사용하세요.
              </p>
            </DoCard>
            <DontCard>
              <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                임의 크기를 사용하거나 Spinner와 함께 중복 사용하지 마세요.
              </p>
            </DontCard>
          </div>
        </Subsection>
      </Section>

      <Section title="Design Tokens">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--divider)" }}>
              {["Property", "Token", "Value"].map((head) => (
                <th key={head} style={{ textAlign: "left", padding: "8px 12px", color: "var(--text-primary)", fontWeight: typography.fontWeight.semibold }}>
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["Base background", "surface.base.alternative", "var(--surface-base-alternative)"],
              ["Highlight (shimmer)", "surface.base.default", "var(--surface-base-default)"],
              ["Shimmer duration", "—", "1.5s"],
              ["Pulse duration", "—", "2s"],
              ["text border-radius", "—", "4px"],
              ["rectangle border-radius", "—", "8px"],
            ].map(([property, token, value]) => (
              <tr key={property} style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "10px 12px" }}>{property}</td>
                <td style={{ padding: "10px 12px" }}><InlineCode>{token}</InlineCode></td>
                <td style={{ padding: "10px 12px", color: "var(--text-secondary)" }}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section title="Accessibility">
        <ul style={{ margin: 0, paddingLeft: spacing.primitive[5], color: "var(--text-secondary)", fontSize: typography.fontSize.sm, lineHeight: 1.7 }}>
          <li>
            <InlineCode>role="img"</InlineCode> + <InlineCode>aria-label="로딩 중"</InlineCode>을 기본으로 사용합니다.
          </li>
          <li>콘텐츠가 로드되면 Skeleton을 제거하고 실제 콘텐츠를 렌더링합니다.</li>
          <li>Skeleton 자체에는 별도 aria-live가 필요하지 않습니다.</li>
        </ul>
      </Section>

      <Section title="Related Components">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: spacing.primitive[3] }}>
          {[
            { name: "Spinner", href: "/components/feedback/loading", desc: "사용자 액션 처리 대기 상태 표시" },
            { name: "StateView", href: "/components/feedback/state-view", desc: "비어있음/에러 등 상태 화면 표현" },
            { name: "Loading", href: "/components/feedback/loading", desc: "로딩 상태 패턴 문서" },
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
            backgroundColor: "var(--surface-base-alternative)",
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
              Skeleton Component
            </p>
            <p style={{ margin: `${spacing.primitive[1]}px 0 0 0`, fontSize: typography.fontSize.compact, color: "var(--text-secondary)" }}>
              실제 컴포넌트 구현은 GitHub에서 확인할 수 있습니다.
            </p>
          </div>
          <a
            href={SKELETON_SOURCE}
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
          code={`import { Skeleton, typography, spacing, radius } from '@baerae-zkap/design-system';
import type { SkeletonVariant, SkeletonAnimation } from '@baerae-zkap/design-system';`}
          language="tsx"
        />
      </Section>

      <Section title="Basic Usage">
        <PreviewBox>
          <div style={{ width: "100%", maxWidth: 420 }}>
            <Skeleton />
          </div>
        </PreviewBox>
        <CodeBlock code={`<Skeleton />`} language="tsx" />
      </Section>

      <Section title="Text Skeleton">
        <PreviewBox>
          <div style={{ width: "100%", maxWidth: 420, display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
            <Skeleton variant="text" width="72%" />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="64%" />
          </div>
        </PreviewBox>
        <CodeBlock
          code={`<Skeleton variant="text" width="72%" />
<Skeleton variant="text" width="100%" />
<Skeleton variant="text" width="64%" />`}
          language="tsx"
        />
      </Section>

      <Section title="Circle + Text Composition">
        <PreviewBox>
          <div style={{ width: "100%", maxWidth: 420, display: "flex", gap: spacing.primitive[3], alignItems: "center" }}>
            <Skeleton variant="circle" width={40} height={40} />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
              <Skeleton variant="text" width="54%" />
              <Skeleton variant="text" width="84%" />
            </div>
          </div>
        </PreviewBox>
        <CodeBlock
          code={`<div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
  <Skeleton variant="circle" width={40} height={40} />
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
    <Skeleton variant="text" width="54%" />
    <Skeleton variant="text" width="84%" />
  </div>
</div>`}
          language="tsx"
        />
      </Section>

      <Section title="Animation Variants">
        <PreviewBox>
          <div style={{ width: "100%", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: spacing.primitive[4] }}>
            {animationOptions.map((option) => (
              <div key={option.value} style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[2], alignItems: "center" }}>
                <Skeleton variant="rectangle" animation={option.value} width="100%" height={48} />
                <span style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)" }}>{option.label}</span>
              </div>
            ))}
          </div>
        </PreviewBox>
        <CodeBlock
          code={`<Skeleton animation="shimmer" />
<Skeleton animation="pulse" />
<Skeleton animation="none" />`}
          language="tsx"
        />
      </Section>

      <Section title="Card Skeleton Composition">
        <PreviewBox padding={24}>
          <div
            style={{
              width: "100%",
              maxWidth: 460,
              border: "1px solid var(--divider)",
              borderRadius: radius.primitive.lg,
              backgroundColor: "var(--surface-base-default)",
              padding: spacing.primitive[5],
              display: "flex",
              flexDirection: "column",
              gap: spacing.primitive[4],
            }}
          >
            <div style={{ display: "flex", gap: spacing.primitive[3], alignItems: "center" }}>
              <Skeleton variant="circle" width={40} height={40} />
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
                <Skeleton variant="text" width="45%" />
                <Skeleton variant="text" width="78%" />
              </div>
            </div>
            <Skeleton variant="rectangle" height={112} />
            <Skeleton variant="text" width="62%" />
          </div>
        </PreviewBox>
        <CodeBlock
          code={`<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
    <Skeleton variant="circle" width={40} height={40} />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Skeleton variant="text" width="45%" />
      <Skeleton variant="text" width="78%" />
    </div>
  </div>
  <Skeleton variant="rectangle" height={112} />
  <Skeleton variant="text" width="62%" />
</div>`}
          language="tsx"
        />
      </Section>

      <Section title="API Reference">
        <PropsTable
          props={[
            {
              name: "variant",
              type: "\"text\" | \"rectangle\" | \"circle\"",
              required: false,
              defaultVal: "\"rectangle\"",
              description: "Skeleton 형태를 지정합니다.",
            },
            {
              name: "width",
              type: "number | string",
              required: false,
              defaultVal: "variant 기반 기본값",
              description: "가로 크기입니다. 숫자는 px로 처리됩니다.",
            },
            {
              name: "height",
              type: "number | string",
              required: false,
              defaultVal: "variant 기반 기본값",
              description: "세로 크기입니다. 숫자는 px로 처리됩니다.",
            },
            {
              name: "borderRadius",
              type: "number | string",
              required: false,
              defaultVal: "variant 기반 기본값",
              description: "기본 모서리 값을 덮어씁니다.",
            },
            {
              name: "animation",
              type: "\"shimmer\" | \"pulse\" | \"none\"",
              required: false,
              defaultVal: "\"shimmer\"",
              description: "로딩 애니메이션 스타일입니다.",
            },
            {
              name: "aria-label",
              type: "string",
              required: false,
              defaultVal: "\"로딩 중\"",
              description: "스크린 리더용 접근성 레이블입니다.",
            },
            {
              name: "className",
              type: "string",
              required: false,
              defaultVal: "-",
              description: "외부 스타일 클래스를 전달합니다.",
            },
            {
              name: "style",
              type: "React.CSSProperties",
              required: false,
              defaultVal: "-",
              description: "루트 요소 인라인 스타일을 확장합니다.",
            },
          ]}
        />
      </Section>
    </div>
  );
}
