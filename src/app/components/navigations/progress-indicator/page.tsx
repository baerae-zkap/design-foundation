"use client";

import { useMemo, useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  PlatformTabs,
  PreviewBox,
  highlightCode,
  type Platform,
} from "@/components/PlatformTabs";
import {
  ProgressIndicator,
  typography,
  spacing,
  radius,
} from "@baerae-zkap/design-system";
import type {
  ProgressIndicatorColor,
  ProgressIndicatorSize,
} from "@baerae-zkap/design-system";
import { Section, Subsection, InlineCode } from "@/components/docs/Section";
import { PropsTable, type PropItem } from "@/components/docs/PropsTable";
import { DoCard, DontCard, PrincipleCard } from "@/components/docs/Cards";
import { RadioGroup, CopyButton } from "@/components/docs/Playground";

const descText = {
  fontSize: typography.fontSize.sm,
  color: "var(--content-base-secondary)",
  lineHeight: 1.7,
  margin: 0,
} as const;

const progressOptions = [
  { value: "0.15", label: "15%" },
  { value: "0.42", label: "42%" },
  { value: "0.68", label: "68%" },
  { value: "0.92", label: "92%" },
] as const;

function PortfolioCard({
  progress,
  size,
  color,
  animate,
}: {
  progress: number;
  size: ProgressIndicatorSize;
  color: ProgressIndicatorColor;
  animate: boolean;
}) {
  return (
    <div
      style={{
        width: 360,
        borderRadius: radius.primitive.lg,
        border: "1px solid var(--divider)",
        backgroundColor: "var(--surface-base-default)",
        padding: spacing.primitive[5],
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: spacing.primitive[5],
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
        <span
          style={{
            fontSize: typography.fontSize.compact,
            color: "var(--content-base-secondary)",
            fontWeight: typography.fontWeight.medium,
          }}
        >
          BTC 목표 달성률
        </span>
        <span
          style={{
            fontSize: typography.fontSize["2xl"],
            color: "var(--content-base-default)",
            fontWeight: typography.fontWeight.semibold,
            lineHeight: 1.2,
          }}
        >
          {Math.round(progress * 100)}%
        </span>
        <ProgressIndicator
          progress={progress}
          size={size}
          color={color}
          animate={animate}
          aria-label="BTC 목표 달성률"
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontSize: typography.fontSize.compact,
              color: "var(--content-base-secondary)",
              fontWeight: typography.fontWeight.medium,
            }}
          >
            포트폴리오 채우기
          </span>
          <span
            style={{
              fontSize: typography.fontSize.compact,
              color: "var(--content-base-default)",
              fontWeight: typography.fontWeight.medium,
            }}
          >
            4 / 8
          </span>
        </div>
        <ProgressIndicator
          progress={0.5}
          size={size}
          color="neutral"
          animate={animate}
          aria-label="포트폴리오 채우기"
        />
      </div>
    </div>
  );
}

function DocsCodeBlock({ code }: { code: string }) {
  return (
    <div
      style={{
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
        <span
          style={{
            fontSize: typography.fontSize.compact,
            fontWeight: typography.fontWeight.medium,
            color: "var(--docs-code-active-text)",
          }}
        >
          Web
        </span>
        <CopyButton text={code} />
      </div>
      <pre
        style={{
          margin: 0,
          padding: spacing.primitive[4],
          fontSize: typography.fontSize.compact,
          lineHeight: 1.7,
          color: "var(--docs-code-text)",
          backgroundColor: "var(--docs-code-surface)",
          fontFamily: "'SF Mono', 'Fira Code', monospace",
          overflow: "auto",
        }}
      >
        <code>{highlightCode(code)}</code>
      </pre>
    </div>
  );
}

function Playground() {
  const [progress, setProgress] = useState(0.68);
  const [size, setSize] = useState<ProgressIndicatorSize>("md");
  const [color, setColor] = useState<ProgressIndicatorColor>("primary");
  const [animate, setAnimate] = useState(true);

  const generatedCode = useMemo(() => {
    return `import { ProgressIndicator } from '@baerae-zkap/design-system';

<ProgressIndicator
  progress={${progress.toFixed(2)}}
  size="${size}"
  color="${color}"
  animate={${animate}}
  aria-label="BTC 목표 달성률"
/>`;
  }, [progress, size, color, animate]);

  return (
    <div style={{ marginBottom: spacing.primitive[8] }}>
      <div
        style={{
          borderRadius: radius.primitive.xl,
          overflow: "hidden",
          backgroundColor: "var(--surface-base-alternative)",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", height: 480 }}>
          <div
            style={{
              padding: spacing.primitive[10],
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "var(--surface-base-alternative)",
            }}
          >
            <PortfolioCard
              progress={progress}
              size={size}
              color={color}
              animate={animate}
            />
          </div>

          <div
            style={{
              backgroundColor: "var(--surface-base-alternative)",
              display: "flex",
              flexDirection: "column",
              padding: spacing.primitive[4],
              overflow: "hidden",
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
                label="Progress"
                value={String(progress)}
                onChange={(value) => setProgress(Number(value))}
                options={[...progressOptions]}
              />

              <RadioGroup
                label="Size"
                value={size}
                onChange={(value) => setSize(value as ProgressIndicatorSize)}
                options={[
                  { value: "sm", label: "sm" },
                  { value: "md", label: "md" },
                  { value: "lg", label: "lg" },
                ]}
              />

              <RadioGroup
                label="Color"
                value={color}
                onChange={(value) => setColor(value as ProgressIndicatorColor)}
                options={[
                  { value: "primary", label: "Primary" },
                  { value: "neutral", label: "Neutral" },
                  { value: "success", label: "Success" },
                  { value: "error", label: "Error" },
                  { value: "warning", label: "Warning" },
                ]}
              />

              <RadioGroup
                label="Animate"
                value={animate ? "true" : "false"}
                onChange={(value) => setAnimate(value === "true")}
                options={[
                  { value: "true", label: "True" },
                  { value: "false", label: "False" },
                ]}
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
          <span
            style={{
              fontSize: typography.fontSize.compact,
              fontWeight: typography.fontWeight.medium,
              color: "var(--docs-code-active-text)",
            }}
          >
            Web
          </span>
          <CopyButton text={generatedCode} />
        </div>
        <pre
          style={{
            margin: 0,
            padding: spacing.primitive[4],
            fontSize: typography.fontSize.compact,
            lineHeight: 1.7,
            color: "var(--docs-code-text)",
            backgroundColor: "var(--docs-code-surface)",
            fontFamily: "'SF Mono', 'Fira Code', monospace",
            overflow: "auto",
          }}
        >
          <code>{highlightCode(generatedCode)}</code>
        </pre>
      </div>
    </div>
  );
}

function DesignContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>
      <Section title="Overview">
        <p style={descText}>
          <InlineCode>ProgressIndicator</InlineCode>는 지갑 목표 달성률이나 포트폴리오 채우기 상태처럼
          0%에서 100% 사이 진행률을 직관적으로 전달하는 수평 막대형 컴포넌트입니다.
          단일 라인 구조로 정보 밀도가 높은 카드에서도 깔끔하게 동작합니다.
        </p>
      </Section>

      <Section title="Anatomy">
        <PreviewBox>
          <div style={{ width: 360, display: "flex", flexDirection: "column", gap: spacing.primitive[3] }}>
            <ProgressIndicator progress={0.68} size="md" color="primary" aria-label="BTC 목표 달성률" />
          </div>
        </PreviewBox>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: spacing.primitive[3],
            marginTop: spacing.primitive[3],
          }}
        >
          <div style={{ fontSize: typography.fontSize.sm }}>
            <span style={{ fontWeight: typography.fontWeight.semibold }}>1. Track</span>
            <span style={{ color: "var(--content-base-secondary)" }}>
              {" "}— 전체 폭을 차지하는 muted 배경 바
            </span>
          </div>
          <div style={{ fontSize: typography.fontSize.sm }}>
            <span style={{ fontWeight: typography.fontWeight.semibold }}>2. Indicator</span>
            <span style={{ color: "var(--content-base-secondary)" }}>
              {" "}— 좌측부터 progress 비율만큼 채워지는 상태 바
            </span>
          </div>
        </div>
      </Section>

      <Section title="Variants">
        <Subsection title="Size">
          <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
            작은 밀도의 리스트에는 <InlineCode>sm</InlineCode>, 기본 카드에는
            <InlineCode> md</InlineCode>, 시각 강조가 필요한 영역에는 <InlineCode>lg</InlineCode>를 사용합니다.
          </p>
          <PreviewBox>
            <div style={{ width: 360, display: "flex", flexDirection: "column", gap: spacing.primitive[4] }}>
              {(["sm", "md", "lg"] as ProgressIndicatorSize[]).map((value) => (
                <div key={value} style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
                  <span
                    style={{
                      fontSize: typography.fontSize.xs,
                      color: "var(--content-base-secondary)",
                      fontWeight: typography.fontWeight.medium,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {value}
                  </span>
                  <ProgressIndicator progress={0.68} size={value} color="primary" aria-label={`size-${value}`} />
                </div>
              ))}
            </div>
          </PreviewBox>
        </Subsection>

        <Subsection title="Color">
          <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
            의미 기반 컬러를 사용해 진행 상태의 성격을 표현합니다.
            일반 목표는 <InlineCode>primary</InlineCode>, 완료/성공은 <InlineCode>success</InlineCode>,
            경고성 진행은 <InlineCode>warning</InlineCode>처럼 사용하세요.
          </p>
          <PreviewBox>
            <div style={{ width: 360, display: "flex", flexDirection: "column", gap: spacing.primitive[4] }}>
              {([
                "primary",
                "neutral",
                "success",
                "error",
                "warning",
              ] as ProgressIndicatorColor[]).map((value) => (
                <div key={value} style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
                  <span
                    style={{
                      fontSize: typography.fontSize.xs,
                      color: "var(--content-base-secondary)",
                      fontWeight: typography.fontWeight.medium,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {value}
                  </span>
                  <ProgressIndicator progress={0.62} size="md" color={value} aria-label={`color-${value}`} />
                </div>
              ))}
            </div>
          </PreviewBox>
        </Subsection>
      </Section>

      <Section title="States">
        <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
          진행률 값은 내부에서 0.0~1.0으로 자동 보정되며, 0%, 진행 중, 완료 상태를 명확히 구분해 보여줍니다.
        </p>
        <PreviewBox>
          <div style={{ width: 360, display: "flex", flexDirection: "column", gap: spacing.primitive[5] }}>
            {[
              { label: "Empty", progress: 0 },
              { label: "In Progress", progress: 0.56 },
              { label: "Complete", progress: 1 },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)" }}>
                    {item.label}
                  </span>
                  <span
                    style={{
                      fontSize: typography.fontSize.compact,
                      color: "var(--content-base-default)",
                      fontWeight: typography.fontWeight.medium,
                    }}
                  >
                    {Math.round(item.progress * 100)}%
                  </span>
                </div>
                <ProgressIndicator progress={item.progress} size="md" color="primary" animate aria-label={item.label} />
              </div>
            ))}
          </div>
        </PreviewBox>
      </Section>

      <Section title="Usage Guidelines">
        <p style={{ ...descText, marginBottom: spacing.primitive[5] }}>
          사용자가 목표 진행 상황을 빠르게 판단해야 하는 영역에 배치합니다.
          잔고 달성률, 체크리스트 완료율, 온보딩 진척도에 적합합니다.
        </p>

        <Subsection title="Best Practices">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
            <DoCard>
              <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[3] }}>
                <div
                  style={{
                    borderRadius: radius.primitive.md,
                    border: "1px solid var(--divider)",
                    backgroundColor: "var(--surface-base-default)",
                    padding: spacing.primitive[4],
                    display: "flex",
                    flexDirection: "column",
                    gap: spacing.primitive[3],
                  }}
                >
                  <span style={{ fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)" }}>
                    BTC 목표 달성률
                  </span>
                  <ProgressIndicator progress={0.74} color="primary" size="md" aria-label="BTC 목표 달성률" />
                </div>
                <p style={{ ...descText, fontSize: typography.fontSize.compact, textAlign: "center" }}>
                  진행률 값과 맥락 레이블을 함께 배치합니다
                </p>
              </div>
            </DoCard>

            <DontCard>
              <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[3] }}>
                <div
                  style={{
                    borderRadius: radius.primitive.md,
                    border: "1px solid var(--divider)",
                    backgroundColor: "var(--surface-base-default)",
                    padding: spacing.primitive[4],
                    display: "flex",
                    flexDirection: "column",
                    gap: spacing.primitive[3],
                  }}
                >
                  <ProgressIndicator progress={0.2} color="error" size="md" aria-label="bad-example-1" />
                  <ProgressIndicator progress={0.5} color="warning" size="md" aria-label="bad-example-2" />
                  <ProgressIndicator progress={0.8} color="success" size="md" aria-label="bad-example-3" />
                </div>
                <p style={{ ...descText, fontSize: typography.fontSize.compact, textAlign: "center" }}>
                  하나의 의미에 다수 색상을 혼합해 혼란을 만들지 않습니다
                </p>
              </div>
            </DontCard>
          </div>
        </Subsection>

        <Subsection title="Principles">
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[3] }}>
            <PrincipleCard
              number={1}
              title="0~1 스케일 유지"
              desc="progress는 0.0~1.0 비율값으로 전달하고, 퍼센트 텍스트는 뷰 레이어에서 변환하세요."
            />
            <PrincipleCard
              number={2}
              title="의미 기반 컬러"
              desc="primary는 일반 목표, success는 완료/성공, error는 실패성 상태처럼 의미를 일관되게 유지하세요."
            />
            <PrincipleCard
              number={3}
              title="애니메이션은 변화가 보일 때만"
              desc="짧은 갱신은 animate=true로 자연스럽게 연결하고, 실시간 고빈도 업데이트에는 animate=false를 고려하세요."
            />
          </div>
        </Subsection>
      </Section>

      <Section title="Design Tokens">
        <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
          컴포넌트 코드에서 실제로 사용되는 CSS 변수만 정리했습니다.
        </p>
        <div style={{ overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th
                  style={{
                    padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`,
                    textAlign: "left",
                    borderBottom: "1px solid var(--divider)",
                    fontWeight: typography.fontWeight.medium,
                  }}
                >
                  CSS Variable
                </th>
                <th
                  style={{
                    padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`,
                    textAlign: "left",
                    borderBottom: "1px solid var(--divider)",
                    fontWeight: typography.fontWeight.medium,
                  }}
                >
                  Usage
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ["--fill-alternative", "Track 배경 (cssVarColors.fill.alternative)"],
                ["--surface-brand-default", "primary Indicator (cssVarColors.surface.brand.default)"],
                ["--content-base-default", "neutral Indicator (cssVarColors.content.base.default)"],
                ["--content-success-default", "success Indicator (cssVarColors.content.success.default)"],
                ["--content-error-default", "error Indicator (cssVarColors.content.error.default)"],
                ["--content-warning-default", "warning Indicator (cssVarColors.content.warning.default)"],
              ].map(([token, usage], index, rows) => (
                <tr key={token}>
                  <td
                    style={{
                      padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`,
                      borderBottom: index < rows.length - 1 ? "1px solid var(--divider)" : "none",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <InlineCode>{token}</InlineCode>
                  </td>
                  <td
                    style={{
                      padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`,
                      borderBottom: index < rows.length - 1 ? "1px solid var(--divider)" : "none",
                      color: "var(--content-base-secondary)",
                      fontSize: typography.fontSize.compact,
                    }}
                  >
                    {usage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Accessibility">
        <ul
          style={{
            margin: 0,
            paddingLeft: spacing.primitive[5],
            color: "var(--content-base-secondary)",
            fontSize: typography.fontSize.sm,
            lineHeight: 1.8,
          }}
        >
          <li>
            루트에 <InlineCode>{'role="progressbar"'}</InlineCode>, <InlineCode>aria-valuemin</InlineCode>,
            <InlineCode>aria-valuemax</InlineCode>, <InlineCode>aria-valuenow</InlineCode>가 적용됩니다.
          </li>
          <li>
            의미가 필요한 맥락에서는 <InlineCode>aria-label</InlineCode>을 지정해 진행 대상을 명확히 전달하세요.
          </li>
          <li>
            시각적 색상만으로 상태를 전달하지 말고 텍스트(예: 68%)를 함께 표시하세요.
          </li>
        </ul>
      </Section>

      <Section title="Related Components">
        <p style={descText}>
          페이지 위치 표시에는 <InlineCode>PageCounter</InlineCode>를, 로딩/대기 상태 표현에는
          <InlineCode> Spinner</InlineCode>를 함께 검토하세요.
        </p>
      </Section>
    </div>
  );
}

const progressIndicatorProps: PropItem[] = [
  {
    name: "progress",
    type: "number",
    required: true,
    description: "진행률 비율 값 (0.0 ~ 1.0, 내부에서 자동 clamp)",
  },
  {
    name: "size",
    type: "'sm' | 'md' | 'lg'",
    required: false,
    description: "트랙 높이 프리셋 (기본값: 'md')",
  },
  {
    name: "color",
    type: "'primary' | 'neutral' | 'success' | 'error' | 'warning'",
    required: false,
    description: "Indicator 컬러 (기본값: 'primary')",
  },
  {
    name: "animate",
    type: "boolean",
    required: false,
    description: "width 300ms ease 전환 활성화 (기본값: true)",
  },
  {
    name: "className",
    type: "string",
    required: false,
    description: "루트 컨테이너 커스텀 클래스",
  },
  {
    name: "aria-label",
    type: "string",
    required: false,
    description: "스크린리더용 진행 대상 설명",
  },
];

function WebContent() {
  const basicCode = `import { ProgressIndicator } from '@baerae-zkap/design-system';

<ProgressIndicator
  progress={0.68}
  aria-label="BTC 목표 달성률"
/>`;

  const sizesCode = `
<ProgressIndicator progress={0.68} size="sm" />
<ProgressIndicator progress={0.68} size="md" />
<ProgressIndicator progress={0.68} size="lg" />`.trim();

  const colorsCode = `
<ProgressIndicator progress={0.68} color="primary" />
<ProgressIndicator progress={0.68} color="neutral" />
<ProgressIndicator progress={0.68} color="success" />
<ProgressIndicator progress={0.68} color="error" />
<ProgressIndicator progress={0.68} color="warning" />`.trim();

  const animatedCode = `
<ProgressIndicator progress={0.42} animate />
<ProgressIndicator progress={0.42} animate={false} />`.trim();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>
      <Section title="Source Code">
        <a
          href="https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system/src/components/ProgressIndicator/ProgressIndicator.tsx"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: typography.fontSize.sm,
            color: "var(--content-brand-default)",
            textDecoration: "underline",
            textUnderlineOffset: 3,
          }}
        >
          ProgressIndicator/ProgressIndicator.tsx
        </a>
      </Section>

      <Section title="Import">
        <DocsCodeBlock
          code={`import { ProgressIndicator } from '@baerae-zkap/design-system';
import type { ProgressIndicatorSize, ProgressIndicatorColor } from '@baerae-zkap/design-system';`}
        />
      </Section>

      <Section title="Basic Usage">
        <PreviewBox>
          <div style={{ width: 360, display: "flex", flexDirection: "column", gap: spacing.primitive[3] }}>
            <ProgressIndicator progress={0.68} color="primary" size="md" aria-label="BTC 목표 달성률" />
          </div>
        </PreviewBox>
        <div style={{ marginTop: spacing.primitive[4] }}>
          <DocsCodeBlock code={basicCode} />
        </div>
      </Section>

      <Section title="Sizes">
        <PreviewBox>
          <div style={{ width: 360, display: "flex", flexDirection: "column", gap: spacing.primitive[4] }}>
            {(["sm", "md", "lg"] as ProgressIndicatorSize[]).map((value) => (
              <div key={value} style={{ display: "flex", alignItems: "center", gap: spacing.primitive[3] }}>
                <span style={{ width: 40, color: "var(--content-base-secondary)", fontSize: typography.fontSize.sm }}>
                  {value}
                </span>
                <div style={{ flex: 1 }}>
                  <ProgressIndicator progress={0.68} size={value} color="primary" aria-label={`size-${value}`} />
                </div>
              </div>
            ))}
          </div>
        </PreviewBox>
        <div style={{ marginTop: spacing.primitive[4] }}>
          <DocsCodeBlock code={sizesCode} />
        </div>
      </Section>

      <Section title="Colors">
        <PreviewBox>
          <div style={{ width: 360, display: "flex", flexDirection: "column", gap: spacing.primitive[4] }}>
            {([
              "primary",
              "neutral",
              "success",
              "error",
              "warning",
            ] as ProgressIndicatorColor[]).map((value) => (
              <div key={value} style={{ display: "flex", alignItems: "center", gap: spacing.primitive[3] }}>
                <span
                  style={{
                    width: 72,
                    color: "var(--content-base-secondary)",
                    fontSize: typography.fontSize.sm,
                    textTransform: "capitalize",
                  }}
                >
                  {value}
                </span>
                <div style={{ flex: 1 }}>
                  <ProgressIndicator progress={0.62} size="md" color={value} aria-label={`color-${value}`} />
                </div>
              </div>
            ))}
          </div>
        </PreviewBox>
        <div style={{ marginTop: spacing.primitive[4] }}>
          <DocsCodeBlock code={colorsCode} />
        </div>
      </Section>

      <Section title="Animated">
        <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
          <InlineCode>animate</InlineCode>가 <InlineCode>true</InlineCode>면 width 변화에
          <InlineCode> 300ms ease</InlineCode> 전환이 적용됩니다.
        </p>
        <PreviewBox>
          <div style={{ width: 360, display: "flex", flexDirection: "column", gap: spacing.primitive[4] }}>
            <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
              <span style={{ color: "var(--content-base-secondary)", fontSize: typography.fontSize.compact }}>
                animate=true
              </span>
              <ProgressIndicator progress={0.42} size="md" color="primary" animate aria-label="animate-true" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
              <span style={{ color: "var(--content-base-secondary)", fontSize: typography.fontSize.compact }}>
                animate=false
              </span>
              <ProgressIndicator
                progress={0.42}
                size="md"
                color="primary"
                animate={false}
                aria-label="animate-false"
              />
            </div>
          </div>
        </PreviewBox>
        <div style={{ marginTop: spacing.primitive[4] }}>
          <DocsCodeBlock code={animatedCode} />
        </div>
      </Section>

      <Section title="API Reference">
        <PropsTable props={progressIndicatorProps} />
      </Section>
    </div>
  );
}

export default function ProgressIndicatorPage() {
  return (
    <div style={{ maxWidth: 840 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Navigations" },
          { label: "Progress Indicator" },
        ]}
      />

      <h1
        style={{
          fontSize: typography.fontSize["3xl"],
          fontWeight: typography.fontWeight.bold,
          marginBottom: spacing.primitive[2],
          marginTop: spacing.primitive[4],
          color: "var(--text-primary)",
          letterSpacing: "-0.02em",
        }}
      >
        Progress Indicator
      </h1>

      <p style={{ ...descText, fontSize: typography.fontSize.md, marginBottom: spacing.primitive[8] }}>
        BTC 목표 달성률, 포트폴리오 채우기 같은 진행 상태를 0~100% 수평 바 형태로 시각화합니다.
      </p>

      <Playground />

      <div style={{ marginTop: spacing.primitive[10] }}>
        <PlatformTabs>
          {(platform: Platform) =>
            platform === "web" ? <WebContent /> : <DesignContent />
          }
        </PlatformTabs>
      </div>
    </div>
  );
}
