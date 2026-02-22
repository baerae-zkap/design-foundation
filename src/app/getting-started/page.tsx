"use client";

import Link from "next/link";
import { typography, spacing, radius } from "@baerae-zkap/design-system";
import { Section } from "@/components/docs/Section";
import { CodeBlock } from "@/components/PlatformTabs";
import { InlineCode } from "@/components/docs/Section";

/* ── Data ────────────────────────────────────────────────────────────── */

const componentCategories = [
  {
    title: "Actions",
    count: 5,
    description: "Button, IconButton, TextButton, Chip, ActionArea",
    href: "/components",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="8" width="18" height="8" rx="4" />
      </svg>
    ),
  },
  {
    title: "Contents",
    count: 10,
    description: "Card, ListCard, ListCell, Accordion, Avatar, Badge 등",
    href: "/components",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
      </svg>
    ),
  },
  {
    title: "Inputs",
    count: 10,
    description: "TextField, TextArea, Checkbox, Radio, Switch, Slider 등",
    href: "/components",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <line x1="7" y1="12" x2="7" y2="12" />
      </svg>
    ),
  },
  {
    title: "Feedback",
    count: 8,
    description: "Dialog, Snackbar, Toast, Skeleton, StateView 등",
    href: "/components",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
  {
    title: "Navigation",
    count: 7,
    description: "BottomNavigation, Tab, TopNavigation, ProgressTracker 등",
    href: "/components",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    ),
  },
  {
    title: "Presentation",
    count: 5,
    description: "BottomSheet, Popover, Popup, Tooltip, Autocomplete",
    href: "/components",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 3l-4 4-4-4" />
      </svg>
    ),
  },
];

const nextSteps = [
  {
    title: "Foundation Tokens",
    description: "색상, 타이포그래피, 스페이싱, 라디우스 토큰 확인하기",
    href: "/foundations",
  },
  {
    title: "Color System",
    description: "Palette, Semantic, Effects 컬러 토큰 살펴보기",
    href: "/colors/palette",
  },
  {
    title: "Component Library",
    description: "45개 컴포넌트 전체 목록과 사용법 확인하기",
    href: "/components",
  },
  {
    title: "Typography",
    description: "타이포그래피 스케일과 시맨틱 토큰 확인하기",
    href: "/typography",
  },
];

/* ── Page ─────────────────────────────────────────────────────────────── */

export default function GettingStartedPage() {
  return (
    <div style={{ maxWidth: 840 }}>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <div style={{ marginBottom: spacing.primitive[12] }}>
        <p
          style={{
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.medium,
            color: "var(--content-brand-default)",
            marginBottom: spacing.primitive[2],
            letterSpacing: "0.02em",
          }}
        >
          GETTING STARTED
        </p>
        <h1
          style={{
            fontSize: typography.fontSize["3xl"],
            fontWeight: typography.fontWeight.bold,
            color: "var(--text-primary)",
            marginBottom: spacing.primitive[3],
            letterSpacing: "-0.02em",
          }}
        >
          시작하기
        </h1>
        <p
          style={{
            fontSize: typography.fontSize.lg,
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          <InlineCode>@baerae-zkap/design-system</InlineCode>을 프로젝트에 설치하고,
          컴포넌트와 디자인 토큰을 사용하는 방법을 안내합니다.
          3단계만 따라하면 바로 사용할 수 있습니다.
        </p>
      </div>

      {/* ── Step 1: Install ──────────────────────────────────────────── */}
      <Section title="1. 패키지 설치">
        <p style={descStyle}>
          npm, yarn, pnpm 등 원하는 패키지 매니저로 설치합니다.
        </p>
        <CodeBlock code="npm install @baerae-zkap/design-system" language="bash" />
        <div style={{ marginTop: spacing.primitive[3] }}>
          <CodeBlock code="yarn add @baerae-zkap/design-system" language="bash" />
        </div>
        <div style={{ marginTop: spacing.primitive[3] }}>
          <CodeBlock code="pnpm add @baerae-zkap/design-system" language="bash" />
        </div>

        <Callout accent="var(--content-brand-default)">
          <strong style={{ color: "var(--text-primary)" }}>Peer Dependencies</strong>
          <br />
          React 18 이상과 React DOM이 필요합니다. 대부분의 React 프로젝트에는 이미 설치되어 있습니다.
        </Callout>
      </Section>

      {/* ── Step 2: Theme CSS ────────────────────────────────────────── */}
      <Section title="2. 테마 CSS 설정">
        <p style={descStyle}>
          디자인 시스템의 색상 토큰과 파운데이션 토큰을 사용하려면 CSS 파일을 프로젝트에 포함해야 합니다.
          이 CSS 파일에는 라이트/다크 모드에 대응하는 모든 CSS 변수가 정의되어 있습니다.
        </p>

        <StepLabel>Next.js 프로젝트</StepLabel>
        <CodeBlock
          code={`// app/layout.tsx
import '@baerae-zkap/design-system/styles.css';`}
          language="tsx"
        />

        <div style={{ marginTop: spacing.primitive[4] }}>
          <StepLabel>Vite 프로젝트</StepLabel>
          <CodeBlock
            code={`// main.tsx
import '@baerae-zkap/design-system/styles.css';`}
            language="tsx"
          />
        </div>

        <Callout accent="var(--content-success-default)">
          <strong style={{ color: "var(--text-primary)" }}>자동 다크 모드</strong>
          <br />
          CSS 변수는 <InlineCode>prefers-color-scheme</InlineCode> 미디어 쿼리를 통해
          라이트/다크 모드를 자동으로 전환합니다. 별도의 테마 토글 코드가 필요하지 않습니다.
        </Callout>
      </Section>

      {/* ── Step 3: First Component ──────────────────────────────────── */}
      <Section title="3. 첫 번째 컴포넌트 사용">
        <p style={descStyle}>
          설치와 CSS 설정이 끝나면 바로 컴포넌트를 사용할 수 있습니다.
          간단한 Button 예제로 시작해보세요.
        </p>
        <CodeBlock
          code={`import { Button } from '@baerae-zkap/design-system';

function MyComponent() {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <Button
        buttonType="filled"
        color="primary"
        onClick={() => console.log('clicked')}
      >
        저장하기
      </Button>
      <Button
        buttonType="weak"
        color="neutral"
        onClick={() => console.log('cancel')}
      >
        취소
      </Button>
    </div>
  );
}`}
          language="tsx"
        />

        <p
          style={{
            ...descStyle,
            marginTop: spacing.primitive[6],
            marginBottom: spacing.primitive[4],
          }}
        >
          폼 입력 필드도 마찬가지로 간단합니다.
        </p>
        <CodeBlock
          code={`import { TextField, Button } from '@baerae-zkap/design-system';

function LoginForm() {
  return (
    <form style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <TextField
        label="이메일"
        type="email"
        placeholder="example@email.com"
      />
      <TextField
        label="비밀번호"
        type="password"
      />
      <Button buttonType="filled" color="primary">
        로그인
      </Button>
    </form>
  );
}`}
          language="tsx"
        />
      </Section>

      {/* ── Token Usage ──────────────────────────────────────────────── */}
      <Section title="디자인 토큰 사용">
        <p style={descStyle}>
          컴포넌트 외에도 스페이싱, 타이포그래피, 라디우스, 색상 토큰을 직접 사용할 수 있습니다.
          하드코딩 대신 토큰을 사용하면 제품 전체의 시각적 일관성을 유지할 수 있습니다.
        </p>
        <CodeBlock
          code={`import { spacing, typography, radius } from '@baerae-zkap/design-system';

function ProfileCard() {
  return (
    <div
      style={{
        padding: spacing.primitive[5],        // 20px
        borderRadius: radius.primitive.lg,     // 16px
        backgroundColor: 'var(--surface-base-default)',
        border: '1px solid var(--divider)',
      }}
    >
      <h3
        style={{
          ...typography.semantic.title.sm,     // 18px, bold
          color: 'var(--text-primary)',
          margin: 0,
        }}
      >
        사용자 이름
      </h3>
      <p
        style={{
          ...typography.semantic.body.sm,      // 14px, regular
          color: 'var(--text-secondary)',
          marginTop: spacing.primitive[2],     // 8px
        }}
      >
        프로필 설명 텍스트
      </p>
    </div>
  );
}`}
          language="tsx"
        />

        {/* Token Overview Table */}
        <div style={{ marginTop: spacing.primitive[6] }}>
          <h3
            style={{
              fontSize: typography.fontSize.md,
              fontWeight: typography.fontWeight.semibold,
              color: "var(--text-primary)",
              marginBottom: spacing.primitive[3],
            }}
          >
            주요 토큰 종류
          </h3>
          <div
            style={{
              overflow: "hidden",
              borderRadius: radius.primitive.md,
              border: "1px solid var(--divider)",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                  {["토큰", "용도", "예시"].map((h) => (
                    <th key={h} style={thStyle}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["spacing", "간격, 패딩, 마진", "spacing.primitive[4] → 16px"],
                  ["typography", "폰트 크기, 굵기, 행간", "typography.semantic.body.md"],
                  ["radius", "모서리 라운딩", "radius.primitive.md → 12px"],
                  ["colors (CSS var)", "색상 (자동 다크모드)", "var(--text-primary)"],
                  ["shadow (CSS var)", "그림자 엘리베이션", "var(--shadow-md)"],
                ].map(([token, usage, example], i, arr) => (
                  <tr
                    key={token}
                    style={i < arr.length - 1 ? { borderBottom: "1px solid var(--divider)" } : {}}
                  >
                    <td style={tdBrand}>{token}</td>
                    <td style={tdDefault}>{usage}</td>
                    <td style={tdMono}>{example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* ── Component Categories ─────────────────────────────────────── */}
      <Section title="컴포넌트 카테고리">
        <p style={descStyle}>
          총 <strong style={{ color: "var(--text-primary)" }}>45개</strong>의
          컴포넌트가 6개 카테고리로 분류되어 있습니다.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: spacing.primitive[3],
          }}
        >
          {componentCategories.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: spacing.primitive[2],
                padding: spacing.primitive[4],
                backgroundColor: "var(--surface-base-alternative)",
                borderRadius: radius.primitive.md,
                textDecoration: "none",
                transition: "background-color 0.2s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: spacing.primitive[2] }}>
                  <span style={{ color: "var(--content-brand-default)" }}>{cat.icon}</span>
                  <span
                    style={{
                      fontSize: typography.fontSize.sm,
                      fontWeight: typography.fontWeight.semibold,
                      color: "var(--text-primary)",
                    }}
                  >
                    {cat.title}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: typography.fontSize.compact,
                    fontWeight: typography.fontWeight.medium,
                    color: "var(--content-brand-default)",
                    backgroundColor: "var(--surface-brand-secondary)",
                    padding: "2px 8px",
                    borderRadius: radius.primitive.full,
                  }}
                >
                  {cat.count}
                </span>
              </div>
              <p
                style={{
                  fontSize: typography.fontSize.compact,
                  color: "var(--text-tertiary)",
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                {cat.description}
              </p>
            </Link>
          ))}
        </div>
      </Section>

      {/* ── Next Steps ───────────────────────────────────────────────── */}
      <Section title="다음 단계">
        <p style={descStyle}>
          설치를 마쳤다면, 아래 페이지에서 더 자세한 내용을 확인해보세요.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: spacing.primitive[3],
          }}
        >
          {nextSteps.map((step) => (
            <Link
              key={step.title}
              href={step.href}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: spacing.primitive[4],
                backgroundColor: "var(--bg-elevated)",
                border: "1px solid var(--divider)",
                borderRadius: radius.primitive.md,
                textDecoration: "none",
                transition: "border-color 0.2s ease",
              }}
            >
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: typography.fontSize.sm,
                    fontWeight: typography.fontWeight.semibold,
                    color: "var(--text-primary)",
                  }}
                >
                  {step.title}
                </p>
                <p
                  style={{
                    margin: `${spacing.primitive[1]}px 0 0`,
                    fontSize: typography.fontSize.compact,
                    color: "var(--text-tertiary)",
                    lineHeight: 1.5,
                  }}
                >
                  {step.description}
                </p>
              </div>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--text-tertiary)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0, marginLeft: spacing.primitive[3] }}
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}

/* ── Shared Sub-Components ───────────────────────────────────────────── */

function StepLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.semibold,
        color: "var(--text-primary)",
        marginBottom: spacing.primitive[2],
      }}
    >
      {children}
    </p>
  );
}

function Callout({
  accent,
  children,
}: {
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        marginTop: spacing.primitive[6],
        padding: spacing.primitive[4],
        backgroundColor: "var(--surface-base-alternative)",
        borderRadius: radius.primitive.md,
        borderLeft: `3px solid ${accent}`,
      }}
    >
      <p
        style={{
          fontSize: typography.fontSize.sm,
          color: "var(--text-secondary)",
          lineHeight: 1.7,
          margin: 0,
        }}
      >
        {children}
      </p>
    </div>
  );
}

/* ── Shared Styles ───────────────────────────────────────────────────── */

const descStyle: React.CSSProperties = {
  fontSize: typography.fontSize.sm,
  color: "var(--text-secondary)",
  lineHeight: 1.7,
  marginBottom: spacing.primitive[4],
};

const thStyle: React.CSSProperties = {
  padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`,
  textAlign: "left" as const,
  fontWeight: typography.fontWeight.semibold,
  fontSize: typography.fontSize.compact,
  color: "var(--text-primary)",
  borderBottom: "1px solid var(--divider)",
};

const tdBrand: React.CSSProperties = {
  padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`,
  fontSize: typography.fontSize.compact,
  fontWeight: typography.fontWeight.medium,
  color: "var(--content-brand-default)",
  fontFamily: "'SF Mono', 'Fira Code', monospace",
};

const tdDefault: React.CSSProperties = {
  padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`,
  fontSize: typography.fontSize.compact,
  color: "var(--text-secondary)",
};

const tdMono: React.CSSProperties = {
  padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`,
  fontSize: typography.fontSize.compact,
  color: "var(--text-secondary)",
  fontFamily: "'SF Mono', 'Fira Code', monospace",
};
