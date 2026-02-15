"use client";

import { Breadcrumb } from "@/components/Breadcrumb";
import { CodeBlock } from "@/components/PlatformTabs";

function DoDoNotCard({
  type,
  title,
  code,
  description,
}: {
  type: "do" | "dont";
  title: string;
  code: string;
  description: string;
}) {
  const isDo = type === "do";
  return (
    <div
      style={{
        border: `1px solid ${isDo ? "var(--border-success-default)" : "var(--border-error-default)"}`,
        borderRadius: 12,
        overflow: "hidden",
        marginBottom: 16,
      }}
    >
      <div
        style={{
          padding: "8px 16px",
          backgroundColor: isDo ? "var(--surface-success-default)" : "var(--surface-error-default)",
          fontSize: 13,
          fontWeight: 600,
          color: isDo ? "var(--content-success-default)" : "var(--content-error-default)",
        }}
      >
        {isDo ? "✅ Do" : "❌ Don't"}: {title}
      </div>
      <div style={{ padding: 16 }}>
        <code
          style={{
            display: "block",
            fontSize: 13,
            fontFamily: "monospace",
            backgroundColor: "var(--bg-secondary)",
            padding: 12,
            borderRadius: 8,
            whiteSpace: "pre-wrap",
            color: "var(--text-primary)",
          }}
        >
          {code}
        </code>
        <p style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 8, marginBottom: 0 }}>
          {description}
        </p>
      </div>
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

export default function UsageGuidePage() {
  return (
    <div style={{ maxWidth: 720 }}>
      <Breadcrumb items={[{ label: "파운데이션", href: "/" }, { label: "Usage Guide" }]} />

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
          Color Token Usage Guide
        </h1>
        <p
          style={{
            fontSize: 16,
            color: "var(--text-secondary)",
            lineHeight: 1.6,
          }}
        >
          올바른 토큰 사용법과 흔한 실수를 LINE/Toss 스타일 Do/Don't 가이드로 정리했습니다.
        </p>
      </header>

      {/* Section 1: Token Architecture Overview */}
      <Section title="토큰 아키텍처 개요">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
          색상 토큰은 3단계 계층 구조로 설계되었습니다.
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: 24,
            backgroundColor: "var(--bg-secondary)",
            borderRadius: 12,
            marginBottom: 24,
          }}
        >
          <div style={{ flex: 1, textAlign: "center" }}>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "var(--content-brand-default)",
                marginBottom: 8,
              }}
            >
              Palette
            </div>
            <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>
              원시 색상값
              <br />
              (테마 독립)
            </div>
          </div>
          <div style={{ fontSize: 20, color: "var(--text-tertiary)" }}>→</div>
          <div style={{ flex: 1, textAlign: "center" }}>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "var(--content-brand-default)",
                marginBottom: 8,
              }}
            >
              Semantic
            </div>
            <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>
              목적 기반 토큰
              <br />
              (테마 인식)
            </div>
          </div>
          <div style={{ fontSize: 20, color: "var(--text-tertiary)" }}>→</div>
          <div style={{ flex: 1, textAlign: "center" }}>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "var(--content-brand-default)",
                marginBottom: 8,
              }}
            >
              Component
            </div>
            <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>
              컴포넌트 전용
              <br />
              (Semantic 별칭)
            </div>
          </div>
        </div>
      </Section>

      {/* Section 2: Web vs React Native */}
      <Section title="플랫폼별 토큰 사용">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
          웹과 React Native는 서로 다른 테마 메커니즘을 사용합니다.
        </p>

        <div
          style={{
            backgroundColor: "var(--bg-secondary)",
            borderRadius: 8,
            padding: 16,
            marginBottom: 24,
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th
                  style={{
                    textAlign: "left",
                    padding: "8px 12px",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--text-secondary)",
                  }}
                >
                  Platform
                </th>
                <th
                  style={{
                    textAlign: "left",
                    padding: "8px 12px",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--text-secondary)",
                  }}
                >
                  Token Import
                </th>
                <th
                  style={{
                    textAlign: "left",
                    padding: "8px 12px",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--text-secondary)",
                  }}
                >
                  Theme Mechanism
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "8px 12px", fontSize: 14, color: "var(--text-primary)" }}>Web</td>
                <td
                  style={{
                    padding: "8px 12px",
                    fontSize: 13,
                    fontFamily: "monospace",
                    color: "var(--content-brand-default)",
                  }}
                >
                  cssVarColors
                </td>
                <td style={{ padding: "8px 12px", fontSize: 14, color: "var(--text-primary)" }}>
                  CSS variables (auto)
                </td>
              </tr>
              <tr>
                <td style={{ padding: "8px 12px", fontSize: 14, color: "var(--text-primary)" }}>React Native</td>
                <td
                  style={{
                    padding: "8px 12px",
                    fontSize: 13,
                    fontFamily: "monospace",
                    color: "var(--content-brand-default)",
                  }}
                >
                  colors / darkColors
                </td>
                <td style={{ padding: "8px 12px", fontSize: 14, color: "var(--text-primary)" }}>
                  JS-based switching
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <DoDoNotCard
          type="do"
          title="웹 컴포넌트는 cssVarColors 사용"
          code={`import { cssVarColors } from '@zkap/design-system';

<div style={{ color: cssVarColors.content.brand.default }}>
  브랜드 텍스트
</div>`}
          description="CSS 변수를 사용하면 테마 전환이 자동으로 처리됩니다."
        />

        <DoDoNotCard
          type="dont"
          title="웹 컴포넌트에서 hex 토큰 사용 금지"
          code={`import { colors } from '@zkap/design-system';

<div style={{ color: colors.content.brand.default }}>
  브랜드 텍스트
</div>`}
          description="Hex 토큰은 다크 테마가 적용되지 않습니다. 웹에서는 반드시 cssVarColors를 사용하세요."
        />
      </Section>

      {/* Section 3: Semantic Token Rules */}
      <Section title="시멘틱 토큰 규칙">
        <h3
          style={{
            fontSize: 16,
            fontWeight: 600,
            marginBottom: 16,
            marginTop: 24,
            color: "var(--text-primary)",
          }}
        >
          1. Disabled 네이밍
        </h3>

        <DoDoNotCard
          type="do"
          title="표준 disabled 토큰 사용"
          code={`cssVarColors.content.disabled.default`}
          description="비활성 텍스트는 content.disabled.default를 사용합니다."
        />

        <DoDoNotCard
          type="dont"
          title="Deprecated 토큰 사용 금지"
          code={`cssVarColors.content.base.disabled`}
          description="content.base.disabled는 호환 목적으로만 유지되며, 신규 사용이 금지됩니다."
        />

        <h3
          style={{
            fontSize: 16,
            fontWeight: 600,
            marginBottom: 16,
            marginTop: 32,
            color: "var(--text-primary)",
          }}
        >
          2. Strong 변형 (가독성 보강)
        </h3>

        <DoDoNotCard
          type="do"
          title="라이트 배경 본문에는 strong 사용"
          code={`cssVarColors.content.warning.strong`}
          description="라이트 배경에서 가독성이 필요한 경고 텍스트는 strong 변형을 사용합니다."
        />

        <DoDoNotCard
          type="dont"
          title="라이트 배경에서 default는 대비 부족 가능"
          code={`cssVarColors.content.warning.default`}
          description="라이트 배경에 default를 사용하면 색상이 너무 밝아 가독성이 떨어질 수 있습니다."
        />

        <h3
          style={{
            fontSize: 16,
            fontWeight: 600,
            marginBottom: 16,
            marginTop: 32,
            color: "var(--text-primary)",
          }}
        >
          3. OnSolid 텍스트
        </h3>

        <DoDoNotCard
          type="do"
          title="Solid 배경에는 onSolid 사용"
          code={`// Background
cssVarColors.surface.warning.solid

// Text
cssVarColors.content.warning.onSolid  // grey.15`}
          description="Solid 배경 위에는 반드시 대응하는 onSolid 토큰을 사용해야 WCAG 대비를 충족합니다."
        />

        <DoDoNotCard
          type="dont"
          title="Solid 배경에 onColor 사용 금지"
          code={`// Background
cssVarColors.surface.warning.solid  // orange

// Text (WRONG)
cssVarColors.content.base.onColor  // white`}
          description="흰색은 주황 배경과 충분한 대비를 만들지 못해 WCAG 기준을 통과하지 못합니다."
        />

        <h3
          style={{
            fontSize: 16,
            fontWeight: 600,
            marginBottom: 16,
            marginTop: 32,
            color: "var(--text-primary)",
          }}
        >
          4. Surface 계층
        </h3>

        <DoDoNotCard
          type="do"
          title="Surface 계층 구조 활용"
          code={`surface.base.default         // 기본 배경
  → surface.base.container    // 중첩 컨테이너
    → surface.elevated.default  // 부상 요소`}
          description="계층 구조를 활용하면 시각적 깊이감을 일관되게 표현할 수 있습니다."
        />

        <DoDoNotCard
          type="dont"
          title="하드코딩된 배경색 사용 금지"
          code={`<div style={{ backgroundColor: 'white' }}>`}
          description="하드코딩된 색상은 다크 테마에서 작동하지 않습니다."
        />
      </Section>

      {/* Section 4: Component Token Patterns */}
      <Section title="컴포넌트 토큰 패턴">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
          컴포넌트 전용 토큰은 시멘틱 토큰의 별칭으로 제공됩니다.
        </p>

        <CodeBlock
          code={`// Button
cssVarColors.component.button.filled.brand.bg
cssVarColors.component.button.filled.brand.bgPressed

// Input
cssVarColors.component.input.default.border
cssVarColors.component.input.default.borderFocused

// Chip
cssVarColors.component.chip.filled.default.bg
cssVarColors.component.chip.filled.default.text

// Status badges
cssVarColors.status.informational.bg
cssVarColors.status.informational.text`}
          language="tsx"
        />
      </Section>

      {/* Section 5: Foundation Tokens */}
      <Section title="파운데이션 토큰">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
          색상 외에도 opacity, borderWidth, spacing 등의 파운데이션 토큰을 제공합니다.
        </p>

        <div style={{ display: "grid", gap: 16, marginBottom: 24 }}>
          <div
            style={{
              padding: 16,
              backgroundColor: "var(--bg-secondary)",
              borderRadius: 8,
              border: "1px solid var(--divider)",
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>
              Opacity
            </div>
            <code style={{ fontSize: 13, fontFamily: "monospace", color: "var(--content-brand-default)" }}>
              opacity.disabled (0.5)
            </code>
            <p style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 4, marginBottom: 0 }}>
              0.5를 하드코딩하지 말고 토큰을 사용하세요.
            </p>
          </div>

          <div
            style={{
              padding: 16,
              backgroundColor: "var(--bg-secondary)",
              borderRadius: 8,
              border: "1px solid var(--divider)",
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>
              Border Width
            </div>
            <code style={{ fontSize: 13, fontFamily: "monospace", color: "var(--content-brand-default)" }}>
              borderWidth.default (1) · borderWidth.strong (2)
            </code>
            <p style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 4, marginBottom: 0 }}>
              일관된 보더 두께를 유지합니다.
            </p>
          </div>

          <div
            style={{
              padding: 16,
              backgroundColor: "var(--bg-secondary)",
              borderRadius: 8,
              border: "1px solid var(--divider)",
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>
              Spacing
            </div>
            <code style={{ fontSize: 13, fontFamily: "monospace", color: "var(--content-brand-default)" }}>
              spacing.component.button.paddingX · spacing.component.chip.height
            </code>
            <p style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 4, marginBottom: 0 }}>
              컴포넌트 크기 조정에 사용합니다.
            </p>
          </div>
        </div>
      </Section>

      {/* Section 6: Quality Gates */}
      <Section title="품질 게이트">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>
          자동화된 검증으로 토큰 품질을 보장합니다.
        </p>

        <div
          style={{
            backgroundColor: "var(--surface-info-default)",
            border: "1px solid var(--border-info-default)",
            borderRadius: 12,
            padding: 20,
            marginBottom: 24,
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 600, color: "var(--content-info-default)", marginBottom: 12 }}>
            자동 검증 항목
          </div>
          <ul style={{ margin: 0, paddingLeft: 20, color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.8 }}>
            <li>
              <code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4 }}>
                npm run check:raw-colors
              </code>
              <br />
              소스 코드에서 hex/hsla 리터럴 사용 금지 검증
            </li>
            <li>
              <code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4 }}>
                npm run check:tokens
              </code>
              <br />
              Light/Dark 패리티 + WCAG 대비 검증
            </li>
          </ul>
        </div>

        <p style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 0, lineHeight: 1.6 }}>
          두 검증은 <code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4 }}>
            prebuild
          </code>{" "}
          단계에서 자동 실행되어 배포 전 토큰 품질을 보장합니다.
        </p>
      </Section>
    </div>
  );
}
