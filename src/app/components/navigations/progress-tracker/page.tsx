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
  ProgressTracker,
  typography,
  spacing,
  radius,
} from "@baerae-zkap/design-system";
import type {
  ProgressTrackerOrientation,
  ProgressTrackerStep,
  ProgressTrackerVariant,
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

const onboardingSteps: ProgressTrackerStep[] = [
  { label: "지갑 생성" },
  { label: "신원 확인" },
  { label: "입금" },
  { label: "거래 시작" },
];

const iconSteps: ProgressTrackerStep[] = [
  { label: "지갑 생성", icon: <span style={{ fontSize: typography.fontSize.xs }}>W</span> },
  { label: "신원 확인", icon: <span style={{ fontSize: typography.fontSize.xs }}>ID</span> },
  { label: "입금", icon: <span style={{ fontSize: typography.fontSize.xs }}>₿</span> },
  { label: "거래 시작", icon: <span style={{ fontSize: typography.fontSize.xs }}>↗</span> },
];


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
  const [variant, setVariant] = useState<ProgressTrackerVariant>("default");
  const [orientation, setOrientation] = useState<ProgressTrackerOrientation>("horizontal");
  const [activeStep, setActiveStep] = useState(1);
  const [checkForFinish, setCheckForFinish] = useState(false);

  const generatedCode = useMemo(() => {
    return `import { ProgressTracker } from '@baerae-zkap/design-system';

const steps = [
  { label: '지갑 생성' },
  { label: '신원 확인' },
  { label: '입금' },
  { label: '거래 시작' },
];

<ProgressTracker
  steps={steps}
  activeStep={${activeStep}}
  variant="${variant}"
  orientation="${orientation}"
  checkForFinish={${checkForFinish}}
/>`;
  }, [activeStep, checkForFinish, orientation, variant]);

  return (
    <div style={{ marginBottom: spacing.primitive[8] }}>
      <div
        style={{
          borderRadius: radius.primitive.xl,
          overflow: "hidden",
          backgroundColor: "var(--surface-base-default)", border: "1px solid var(--border-solid-alternative)",
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
              overflow: "hidden",
            }}
          >
            <div
              style={{
                maxWidth: orientation === "vertical" ? 200 : 440,
                width: "100%",
              }}
            >
              <ProgressTracker
                steps={onboardingSteps}
                activeStep={activeStep}
                variant={variant}
                orientation={orientation}
                checkForFinish={checkForFinish}
              />
            </div>
          </div>

          <div
            style={{
              backgroundColor: "var(--surface-base-default)", borderLeft: "1px solid var(--border-solid-alternative)",
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
                label="Variant"
                value={variant}
                onChange={(value) => setVariant(value as ProgressTrackerVariant)}
                options={[
                  { value: "default", label: "Default" },
                  { value: "compact", label: "Compact" },
                ]}
              />

              <RadioGroup
                label="Orientation"
                value={orientation}
                onChange={(value) => setOrientation(value as ProgressTrackerOrientation)}
                options={[
                  { value: "horizontal", label: "Horizontal" },
                  { value: "vertical", label: "Vertical" },
                ]}
              />

              <RadioGroup
                label="Active Step"
                value={String(activeStep)}
                onChange={(value) => setActiveStep(Number(value))}
                options={Array.from({ length: onboardingSteps.length }, (_, index) => ({
                  value: String(index),
                  label: String(index),
                }))}
              />

              <RadioGroup
                label="Check For Finish"
                value={checkForFinish ? "true" : "false"}
                onChange={(value) => setCheckForFinish(value === "true")}
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
          <InlineCode>ProgressTracker</InlineCode>는 다단계 온보딩, 인증, 신청 흐름에서 현재 단계를
          명확하게 표시하는 stepper 컴포넌트입니다. 현재 단계는 강조하고, 완료/예정 단계를 함께 보여
          사용자의 진행 맥락을 유지합니다.
        </p>
      </Section>

      <Section title="Anatomy">
        <PreviewBox>
          <div style={{ width: 460 }}>
            <ProgressTracker steps={onboardingSteps} activeStep={1} orientation="horizontal" />
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
            <span style={{ fontWeight: typography.fontWeight.semibold }}>1. Stepper node</span>
            <span style={{ color: "var(--content-base-secondary)" }}>
              {" "}— 단계 상태를 나타내는 원형 인디케이터
            </span>
          </div>
          <div style={{ fontSize: typography.fontSize.sm }}>
            <span style={{ fontWeight: typography.fontWeight.semibold }}>2. Label</span>
            <span style={{ color: "var(--content-base-secondary)" }}>
              {" "}— 단계 의미를 전달하는 텍스트
            </span>
          </div>
          <div style={{ fontSize: typography.fontSize.sm }}>
            <span style={{ fontWeight: typography.fontWeight.semibold }}>3. Connector</span>
            <span style={{ color: "var(--content-base-secondary)" }}>
              {" "}— 인접 단계를 연결하는 선
            </span>
          </div>
        </div>
      </Section>

      <Section title="Variants">
        <Subsection title="Variant">
          <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
            <InlineCode>default</InlineCode>는 단계 번호/아이콘과 라벨을 함께 보여주고,
            <InlineCode> compact</InlineCode>는 최소 밀도로 점 기반 진행 상태만 보여줍니다.
          </p>
          <PreviewBox>
            <div style={{ width: 460, display: "flex", flexDirection: "column", gap: spacing.primitive[5] }}>
              <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
                <span style={{ fontSize: typography.fontSize.xs, color: "var(--content-base-secondary)" }}>
                  default
                </span>
                <ProgressTracker steps={onboardingSteps} activeStep={1} variant="default" />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
                <span style={{ fontSize: typography.fontSize.xs, color: "var(--content-base-secondary)" }}>
                  compact
                </span>
                <ProgressTracker steps={onboardingSteps.length} activeStep={1} variant="compact" />
              </div>
            </div>
          </PreviewBox>
        </Subsection>

        <Subsection title="Orientation">
          <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
            수평 흐름에서는 <InlineCode>horizontal</InlineCode>, 체크리스트형 레이아웃에서는
            <InlineCode> vertical</InlineCode>을 사용합니다.
          </p>
          <PreviewBox>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[6] }}>
              <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
                <span style={{ fontSize: typography.fontSize.xs, color: "var(--content-base-secondary)" }}>
                  horizontal
                </span>
                <ProgressTracker steps={onboardingSteps} activeStep={1} orientation="horizontal" />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
                <span style={{ fontSize: typography.fontSize.xs, color: "var(--content-base-secondary)" }}>
                  vertical
                </span>
                <ProgressTracker steps={onboardingSteps} activeStep={1} orientation="vertical" />
              </div>
            </div>
          </PreviewBox>
        </Subsection>
      </Section>

      <Section title="States">
        <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
          <InlineCode>activeStep</InlineCode> 인덱스를 기준으로 완료 단계, 현재 단계, 예정 단계를
          자동 계산합니다.
        </p>
        <PreviewBox>
          <div style={{ width: 460, display: "flex", flexDirection: "column", gap: spacing.primitive[5] }}>
            {[0, 1, 2, 3].map((index) => (
              <div key={index} style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
                <span style={{ fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)" }}>
                  activeStep={index}
                </span>
                <ProgressTracker
                  steps={onboardingSteps}
                  activeStep={index}
                  checkForFinish
                  orientation="horizontal"
                />
              </div>
            ))}
          </div>
        </PreviewBox>
      </Section>

      <Section title="Usage Guidelines">
        <p style={{ ...descText, marginBottom: spacing.primitive[5] }}>
          절차형 플로우에서 사용자가 다음 단계 예측과 현재 위치 파악을 동시에 해야 할 때 사용합니다.
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
                  }}
                >
                  <ProgressTracker
                    steps={onboardingSteps}
                    activeStep={2}
                    orientation="horizontal"
                    checkForFinish
                  />
                </div>
                <p style={{ ...descText, fontSize: typography.fontSize.compact, textAlign: "center" }}>
                  단계 이름을 함께 표시해 진행 의미를 명확하게 제공합니다
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
                    gap: spacing.primitive[4],
                  }}
                >
                  <ProgressTracker steps={4} activeStep={1} variant="compact" />
                  <ProgressTracker steps={4} activeStep={2} variant="compact" />
                </div>
                <p style={{ ...descText, fontSize: typography.fontSize.compact, textAlign: "center" }}>
                  하나의 플로우에 다중 ProgressTracker를 중복 배치하지 않습니다
                </p>
              </div>
            </DontCard>
          </div>
        </Subsection>

        <Subsection title="Principles">
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[3] }}>
            <PrincipleCard
              number={1}
              title="0-indexed activeStep"
              desc="현재 단계는 0부터 시작하는 인덱스로 전달하세요."
            />
            <PrincipleCard
              number={2}
              title="단계 수 일관성"
              desc="steps 배열 길이와 실제 플로우 단계 수를 항상 동일하게 유지하세요."
            />
            <PrincipleCard
              number={3}
              title="밀도 기반 variant 선택"
              desc="텍스트 맥락이 중요하면 default, 좁은 영역이면 compact를 사용하세요."
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
                ["--surface-brand-default", "active/completed 노드 및 완료 connector"],
                ["--surface-brand-secondary", "active 노드 ring"],
                ["--content-base-onColor", "active/completed 노드 아이콘/텍스트"],
                ["--fill-alternative", "upcoming 노드/connector 배경"],
                ["--border-base-default", "upcoming 노드 테두리"],
                ["--content-brand-default", "active 라벨 텍스트"],
                ["--content-base-secondary", "upcoming/completed 라벨 및 보조 텍스트"],
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
            루트에 <InlineCode>{'role="list"'}</InlineCode>가 적용되고 현재 단계에
            <InlineCode>{'aria-current="step"'}</InlineCode>가 적용됩니다.
          </li>
          <li>
            단계별 <InlineCode>aria-label</InlineCode>은 label이 있으면 label을, 없으면
            <InlineCode> Step N</InlineCode>을 사용합니다.
          </li>
          <li>
            색상만으로 상태를 전달하지 않도록 default variant에서는 번호/아이콘과 라벨을 함께 사용하세요.
          </li>
        </ul>
      </Section>

      <Section title="Related Components">
        <p style={descText}>
          단일 비율 진행률 표시는 <InlineCode>ProgressIndicator</InlineCode>, 페이지 인덱스 표시는
          <InlineCode> PageCounter</InlineCode>, 상단 카테고리 전환은
          <InlineCode> CategoryNavigation</InlineCode>을 사용하세요.
        </p>
      </Section>
    </div>
  );
}

const progressTrackerProps: PropItem[] = [
  {
    name: "steps",
    type: "ProgressTrackerStep[] | number",
    required: true,
    description: "단계 배열 또는 단계 개수",
  },
  {
    name: "activeStep",
    type: "number",
    required: true,
    description: "현재 단계 인덱스 (0-indexed)",
  },
  {
    name: "variant",
    type: "'default' | 'compact'",
    required: false,
    description: "표시 형태 (기본값: 'default')",
  },
  {
    name: "orientation",
    type: "'horizontal' | 'vertical'",
    required: false,
    description: "배치 방향 (기본값: 'horizontal')",
  },
  {
    name: "checkForFinish",
    type: "boolean",
    required: false,
    description: "완료 단계에 체크 아이콘 표시 여부 (기본값: false)",
  },
  {
    name: "className",
    type: "string",
    required: false,
    description: "루트 컨테이너 커스텀 클래스",
  },
];

function WebContent() {
  const basicCode = `import { ProgressTracker } from '@baerae-zkap/design-system';

const steps = [
  { label: '지갑 생성' },
  { label: '신원 확인' },
  { label: '입금' },
  { label: '거래 시작' },
];

<ProgressTracker steps={steps} activeStep={1} />`;

  const compactCode = `<ProgressTracker steps={4} activeStep={2} variant="compact" />`;

  const verticalCode = `const steps = [
  { label: '지갑 생성' },
  { label: '신원 확인' },
  { label: '입금' },
  { label: '거래 시작' },
];

<ProgressTracker
  steps={steps}
  activeStep={2}
  orientation="vertical"
/>`;

  const finishCode = `<ProgressTracker
  steps={onboardingSteps}
  activeStep={2}
  checkForFinish
/>`;

  const withIconsCode = `const steps = [
  { label: '지갑 생성', icon: <WalletIcon /> },
  { label: '신원 확인', icon: <UserIcon /> },
  { label: '입금', icon: <DepositIcon /> },
  { label: '거래 시작', icon: <TradeIcon /> },
];

<ProgressTracker
  steps={steps}
  activeStep={1}
  checkForFinish
/>`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>
      <Section title="Source Code">
        <a
          href="https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system/src/components/ProgressTracker/ProgressTracker.tsx"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: typography.fontSize.sm,
            color: "var(--content-brand-default)",
            textDecoration: "underline",
            textUnderlineOffset: 3,
          }}
        >
          ProgressTracker/ProgressTracker.tsx
        </a>
      </Section>

      <Section title="Import">
        <DocsCodeBlock
          code={`import { ProgressTracker } from '@baerae-zkap/design-system';
import type {
  ProgressTrackerProps,
  ProgressTrackerStep,
  ProgressTrackerVariant,
  ProgressTrackerOrientation,
} from '@baerae-zkap/design-system';`}
        />
      </Section>

      <Section title="Basic Usage">
        <PreviewBox>
          <div style={{ width: 460 }}>
            <ProgressTracker steps={onboardingSteps} activeStep={1} />
          </div>
        </PreviewBox>
        <div style={{ marginTop: spacing.primitive[4] }}>
          <DocsCodeBlock code={basicCode} />
        </div>
      </Section>

      <Section title="Compact Variant">
        <PreviewBox>
          <div style={{ width: 460 }}>
            <ProgressTracker steps={onboardingSteps.length} activeStep={2} variant="compact" />
          </div>
        </PreviewBox>
        <div style={{ marginTop: spacing.primitive[4] }}>
          <DocsCodeBlock code={compactCode} />
        </div>
      </Section>

      <Section title="Vertical Orientation">
        <PreviewBox>
          <ProgressTracker steps={onboardingSteps} activeStep={2} orientation="vertical" />
        </PreviewBox>
        <div style={{ marginTop: spacing.primitive[4] }}>
          <DocsCodeBlock code={verticalCode} />
        </div>
      </Section>

      <Section title="Check For Finish">
        <PreviewBox>
          <div style={{ width: 460 }}>
            <ProgressTracker steps={onboardingSteps} activeStep={2} checkForFinish />
          </div>
        </PreviewBox>
        <div style={{ marginTop: spacing.primitive[4] }}>
          <DocsCodeBlock code={finishCode} />
        </div>
      </Section>

      <Section title="With Icons">
        <PreviewBox>
          <div style={{ width: 460 }}>
            <ProgressTracker steps={iconSteps} activeStep={1} checkForFinish />
          </div>
        </PreviewBox>
        <div style={{ marginTop: spacing.primitive[4] }}>
          <DocsCodeBlock code={withIconsCode} />
        </div>
      </Section>

      <Section title="API Reference">
        <PropsTable props={progressTrackerProps} />
      </Section>
    </div>
  );
}

export default function ProgressTrackerPage() {
  return (
    <div style={{ maxWidth: 840 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Navigations" },
          { label: "Progress Tracker" },
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
        Progress Tracker
      </h1>

      <p style={{ ...descText, fontSize: typography.fontSize.md, marginBottom: spacing.primitive[8] }}>
        다단계 온보딩 플로우에서 현재 단계와 전체 진행 맥락을 동시에 표시하는 stepper 컴포넌트입니다.
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
