"use client";

import { useMemo, useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, PreviewBox, highlightCode, type Platform } from "@/components/PlatformTabs";
import { PageCounter, typography, spacing, radius } from "@baerae-zkap/design-system";
import type { PageCounterSize, PageCounterVariant } from "@baerae-zkap/design-system";
import { Section, Subsection, InlineCode } from "@/components/docs/Section";
import { PropsTable, type PropItem } from "@/components/docs/PropsTable";
import { DoCard, DontCard, PrincipleCard } from "@/components/docs/Cards";
import { RadioGroup, CopyButton } from "@/components/docs/Playground";

// ─── Constants ────────────────────────────────────────────────────────────────

const NEWS_CARDS = [
  { title: "비트코인 반감기 분석", category: "BTC" },
  { title: "이더리움 업그레이드 로드맵", category: "ETH" },
  { title: "솔라나 생태계 현황", category: "SOL" },
  { title: "거시경제와 암호화폐", category: "MACRO" },
  { title: "온체인 데이터 인사이트", category: "INSIGHT" },
];

const descText = {
  fontSize: typography.fontSize.sm,
  color: "var(--content-base-secondary)",
  lineHeight: 1.7,
  margin: 0,
} as const;

// ─── Card Mock ────────────────────────────────────────────────────────────────

function CardMock({
  current,
  total,
  variant,
  size,
}: {
  current: number;
  total: number;
  variant: PageCounterVariant;
  size: PageCounterSize;
}) {
  const card = NEWS_CARDS[(current - 1) % NEWS_CARDS.length];

  return (
    <div style={{
      width: 320,
      borderRadius: radius.primitive.lg,
      border: "1px solid var(--divider)",
      overflow: "hidden",
    }}>
      {/* Image placeholder */}
      <div style={{
        height: 200,
        position: "relative",
        background: "linear-gradient(160deg, var(--surface-base-container) 0%, var(--surface-base-alternative) 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: spacing.primitive[4],
        boxSizing: "border-box",
      }}>
        {/* Category tag */}
        <div style={{
          display: "inline-flex",
          alignSelf: "flex-start",
          padding: `${spacing.primitive[1]}px ${spacing.primitive[2]}px`,
          borderRadius: radius.primitive.full,
          backgroundColor: "var(--surface-base-container)",
          color: "var(--content-base-secondary)",
          fontSize: typography.fontSize["3xs"],
          fontWeight: typography.fontWeight.medium,
        }}>
          {card.category}
        </div>

        {/* Bottom row: title + counter */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: spacing.primitive[3],
        }}>
          <span style={{
            color: "var(--content-base-default)",
            fontSize: typography.fontSize.md,
            fontWeight: typography.fontWeight.semibold,
            lineHeight: 1.4,
          }}>
            {card.title}
          </span>

          <PageCounter
            current={current}
            total={total}
            variant={variant}
            size={size}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Playground ───────────────────────────────────────────────────────────────

function Playground() {
  const [current, setCurrent] = useState(1);
  const total = NEWS_CARDS.length;
  const [variant, setVariant] = useState<PageCounterVariant>("alternative");
  const [size, setSize] = useState<PageCounterSize>("small");

  const generatedCode = useMemo(() => {
    return `const [current, setCurrent] = useState(1);
const total = ${total};

<PageCounter
  current={current}
  total={total}
  variant="${variant}"
  size="${size}"
/>`;
  }, [variant, size, total]);

  return (
    <div style={{ marginBottom: spacing.primitive[8] }}>
      <div style={{
        borderRadius: radius.primitive.xl,
        overflow: "hidden",
        backgroundColor: "var(--surface-base-default)", border: "1px solid var(--border-solid-alternative)",
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", height: 480 }}>
          {/* Preview */}
          <div style={{
            padding: spacing.primitive[10],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "var(--surface-base-default)",
          }}>
            <CardMock current={current} total={total} variant={variant} size={size} />
          </div>

          {/* Controls */}
          <div style={{
            backgroundColor: "var(--surface-base-default)", borderLeft: "1px solid var(--border-solid-alternative)",
            display: "flex",
            flexDirection: "column",
            padding: spacing.primitive[4],
            overflow: "hidden",
            height: "100%",
            boxSizing: "border-box",
          }}>
            <div style={{
              flex: 1,
              minHeight: 0,
              padding: spacing.primitive[6],
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: spacing.primitive[7],
              backgroundColor: "var(--surface-base-default)",
              borderRadius: radius.primitive.lg,
            }}>
              <RadioGroup
                label="Variant"
                value={variant}
                onChange={(v) => setVariant(v as PageCounterVariant)}
                options={[
                  { value: "normal", label: "Normal" },
                  { value: "alternative", label: "Alternative" },
                ]}
              />
              <RadioGroup
                label="Size"
                value={size}
                onChange={(v) => setSize(v as PageCounterSize)}
                options={[
                  { value: "small", label: "Small" },
                  { value: "medium", label: "Medium" },
                ]}
              />
              <RadioGroup
                label="Current"
                value={String(current)}
                onChange={(v) => setCurrent(Number(v))}
                options={Array.from({ length: total }, (_, i) => ({
                  value: String(i + 1),
                  label: String(i + 1),
                }))}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Generated Code */}
      <div style={{ marginTop: spacing.primitive[4], borderRadius: radius.primitive.md, overflow: "hidden", border: "1px solid var(--divider)" }}>
        <div style={{
          padding: `${spacing.primitive[2]}px ${spacing.primitive[4]}px`,
          backgroundColor: "var(--docs-code-surface)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <span style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.medium, color: "var(--docs-code-active-text)" }}>Web</span>
          <CopyButton text={generatedCode} />
        </div>
        <pre style={{
          margin: 0,
          padding: spacing.primitive[4],
          fontSize: typography.fontSize.compact,
          lineHeight: 1.7,
          color: "var(--docs-code-text)",
          backgroundColor: "var(--docs-code-surface)",
          fontFamily: "'SF Mono', 'Fira Code', monospace",
          overflow: "auto",
        }}>
          <code>{highlightCode(generatedCode)}</code>
        </pre>
      </div>
    </div>
  );
}

// ─── Design Content ───────────────────────────────────────────────────────────

function DesignContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>

      {/* 1. Overview */}
      <Section title="Overview">
        <p style={descText}>
          <InlineCode>PageCounter</InlineCode>는 이미지 캐러셀이나 카드 슬라이더에서 현재 위치를 <InlineCode>N / M</InlineCode> 형식의 pill 배지로 표시하는 인디케이터입니다.
          콘텐츠 위에 오버레이로 배치되며, 두 가지 variant와 두 가지 size를 제공합니다.
        </p>
      </Section>

      {/* 2. Anatomy */}
      <Section title="Anatomy">
        <PreviewBox>
          <div style={{ display: "flex", gap: spacing.primitive[4] }}>
            <PageCounter current={2} total={5} variant="normal" size="medium" />
            <PageCounter current={2} total={5} variant="alternative" size="medium" />
          </div>
        </PreviewBox>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[3], marginTop: spacing.primitive[3] }}>
          {[
            ["1", "Pill container", "borderRadius: full, paddingInline으로 구성"],
            ["2", "Current page", "현재 페이지 번호 (tabular-nums)"],
            ["3", "Separator", "/ 구분자, opacity 0.5"],
            ["4", "Total pages", "전체 페이지 수 (tabular-nums)"],
          ].map(([num, name, desc]) => (
            <div key={num} style={{ fontSize: typography.fontSize.sm }}>
              <span style={{ fontWeight: typography.fontWeight.semibold }}>{num}. {name}</span>
              <span style={{ color: "var(--content-base-secondary)" }}> — {desc}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* 3. Variants */}
      <Section title="Variants">
        <Subsection title="Variant">
          <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
            <InlineCode>normal</InlineCode>은 밝은 배경 위에서 사용하는 subtle 스타일, <InlineCode>alternative</InlineCode>는 이미지나 어두운 배경 위에서 사용하는 대비 스타일입니다.
          </p>
          <PreviewBox>
            <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[4], width: 320 }}>
              {(["normal", "alternative"] as PageCounterVariant[]).map((v) => (
                <div key={v} style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
                  <span style={{ fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.medium, color: "var(--content-base-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{v}</span>
                  <div style={{
                    border: "1px solid var(--divider)",
                    borderRadius: radius.primitive.md,
                    backgroundColor: v === "alternative" ? "var(--surface-base-container)" : "var(--surface-base-default)",
                    padding: spacing.primitive[4],
                    display: "flex",
                    gap: spacing.primitive[3],
                  }}>
                    {[1, 2, 3].map((n) => (
                      <PageCounter key={n} current={n} total={5} variant={v} size="medium" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </PreviewBox>
        </Subsection>

        <Subsection title="Size">
          <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
            <InlineCode>small</InlineCode>은 콤팩트한 오버레이에, <InlineCode>medium</InlineCode>은 좀 더 넉넉한 레이아웃에 사용합니다.
          </p>
          <PreviewBox>
            <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[4] }}>
              {(["small", "medium"] as PageCounterSize[]).map((s) => (
                <div key={s} style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
                  <span style={{ fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.medium, color: "var(--content-base-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{s}</span>
                  <div style={{ display: "flex", gap: spacing.primitive[3] }}>
                    <PageCounter current={1} total={5} variant="normal" size={s} />
                    <PageCounter current={3} total={5} variant="alternative" size={s} />
                  </div>
                </div>
              ))}
            </div>
          </PreviewBox>
        </Subsection>
      </Section>

      {/* 4. States */}
      <Section title="States">
        <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
          PageCounter는 정적 표시 컴포넌트입니다. 상태 변화는 외부에서 <InlineCode>current</InlineCode> prop을 업데이트해 반영합니다.
        </p>
        <PreviewBox>
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[4], alignItems: "flex-start" }}>
            {[
              { label: "First page", current: 1, total: 5 },
              { label: "Mid page", current: 3, total: 5 },
              { label: "Last page", current: 5, total: 5 },
            ].map(({ label, current, total }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: spacing.primitive[4] }}>
                <span style={{ width: 100, fontSize: typography.fontSize.sm, color: "var(--content-base-secondary)" }}>{label}</span>
                <PageCounter current={current} total={total} variant="normal" size="medium" />
                <PageCounter current={current} total={total} variant="alternative" size="medium" />
              </div>
            ))}
          </div>
        </PreviewBox>
      </Section>

      {/* 5. Usage Guidelines */}
      <Section title="Usage Guidelines">
        <p style={{ ...descText, marginBottom: spacing.primitive[5] }}>
          콘텐츠 슬라이더·캐러셀에서 현재 위치를 알려야 할 때 사용합니다.
          총 페이지 수가 많으면 dot 방식보다 가독성이 높습니다.
        </p>
        <Subsection title="Best Practices">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
            <DoCard>
              <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[3] }}>
                <div style={{
                  height: 120,
                  borderRadius: radius.primitive.md,
                  background: "linear-gradient(160deg, var(--surface-base-container) 0%, var(--surface-base-alternative) 100%)",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                  padding: spacing.primitive[3],
                  boxSizing: "border-box",
                }}>
                  <PageCounter current={2} total={5} variant="alternative" size="small" />
                </div>
                <p style={{ ...descText, fontSize: typography.fontSize.compact, textAlign: "center" }}>
                  이미지/카드 위에 alternative로 오버레이
                </p>
              </div>
            </DoCard>
            <DontCard>
              <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[3] }}>
                <div style={{
                  height: 120,
                  borderRadius: radius.primitive.md,
                  backgroundColor: "var(--surface-base-default)",
                  border: "1px solid var(--divider)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: spacing.primitive[2],
                  padding: spacing.primitive[3],
                  boxSizing: "border-box",
                }}>
                  {/* Multiple counters at once — wrong */}
                  <PageCounter current={1} total={5} variant="normal" size="small" />
                  <PageCounter current={2} total={5} variant="normal" size="small" />
                  <PageCounter current={3} total={5} variant="normal" size="small" />
                </div>
                <p style={{ ...descText, fontSize: typography.fontSize.compact, textAlign: "center" }}>
                  한 슬라이더에 PageCounter를 여러 개 동시 표시하지 않습니다
                </p>
              </div>
            </DontCard>
          </div>
        </Subsection>
        <Subsection title="Principles">
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[3] }}>
            <PrincipleCard number={1} title="오버레이는 alternative" desc="이미지나 채도 있는 배경 위에는 alternative variant를 사용해 가독성을 확보하세요." />
            <PrincipleCard number={2} title="위치는 일관되게" desc="슬라이더 내 PageCounter 위치(우하단, 중앙 등)를 화면 전체에서 통일하세요." />
            <PrincipleCard number={3} title="current는 1-indexed" desc="current prop은 1부터 시작합니다. 배열 인덱스(0-based)를 그대로 전달하지 마세요." />
          </div>
        </Subsection>
      </Section>

      {/* 6. Design Tokens */}
      <Section title="Design Tokens">
        <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
          컴포넌트에서 실제로 사용되는 CSS 변수입니다.
        </p>
        <div style={{ overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, textAlign: "left", borderBottom: "1px solid var(--divider)", fontWeight: typography.fontWeight.medium }}>CSS Variable</th>
                <th style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, textAlign: "left", borderBottom: "1px solid var(--divider)", fontWeight: typography.fontWeight.medium }}>Usage</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["--surface-base-container", "normal variant 배경 (cssVarColors.surface.base.container)"],
                ["--content-base-default", "normal variant 텍스트 / alternative variant 배경 (cssVarColors.content.base.default)"],
                ["--surface-base-default", "alternative variant 텍스트 (cssVarColors.surface.base.default)"],
              ].map(([token, usage], i, arr) => (
                <tr key={token}>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, borderBottom: i < arr.length - 1 ? "1px solid var(--divider)" : "none", whiteSpace: "nowrap" }}>
                    <InlineCode>{token}</InlineCode>
                  </td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, borderBottom: i < arr.length - 1 ? "1px solid var(--divider)" : "none", color: "var(--content-base-secondary)", fontSize: typography.fontSize.compact }}>
                    {usage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* 7. Accessibility */}
      <Section title="Accessibility">
        <ul style={{ margin: 0, paddingLeft: spacing.primitive[5], color: "var(--content-base-secondary)", fontSize: typography.fontSize.sm, lineHeight: 1.8 }}>
          <li>컨테이너에 <InlineCode>{'role="status"'}</InlineCode>와 <InlineCode>{`aria-label="N / M 페이지"`}</InlineCode>가 자동 적용됩니다.</li>
          <li>숫자는 <InlineCode>font-variant-numeric: tabular-nums</InlineCode>로 렌더링되어 자릿수가 바뀌어도 너비가 유지됩니다.</li>
          <li>슬라이더를 조작하는 버튼에는 별도로 <InlineCode>aria-label</InlineCode>을 제공하세요.</li>
        </ul>
      </Section>

      {/* 8. Related Components */}
      <Section title="Related Components">
        <p style={descText}>
          탭 기반 카테고리 탐색에는 <InlineCode>CategoryNavigation</InlineCode>을,
          하단 고정 탭 전환에는 <InlineCode>BottomNavigation</InlineCode>을 사용하세요.
        </p>
      </Section>
    </div>
  );
}

// ─── Web Content ──────────────────────────────────────────────────────────────

const pageCounterProps: PropItem[] = [
  { name: "current", type: "number", required: true, description: "현재 페이지 (1-indexed)" },
  { name: "total", type: "number", required: true, description: "전체 페이지 수" },
  { name: "variant", type: "'normal' | 'alternative'", required: false, description: "시각 스타일 (기본값: 'normal')" },
  { name: "size", type: "'small' | 'medium'", required: false, description: "pill 크기 (기본값: 'small')" },
  { name: "className", type: "string", required: false, description: "루트 컨테이너 커스텀 클래스" },
];

function WebContent() {
  const basicCode = `import { PageCounter } from '@baerae-zkap/design-system';

const [current, setCurrent] = useState(1);
const total = 5;

// 슬라이더 인덱스(0-based)를 사용하는 경우
// current={activeIndex + 1}

<PageCounter
  current={current}
  total={total}
  variant="alternative"
  size="small"
/>`;

  const variantsCode = `// normal — 밝은 배경 위 subtle 스타일
<PageCounter current={2} total={5} variant="normal" />

// alternative — 이미지/어두운 배경 위 대비 스타일 (기본값)
<PageCounter current={2} total={5} variant="alternative" />`;

  const sizesCode = `// small (기본값)
<PageCounter current={2} total={5} size="small" />

// medium
<PageCounter current={2} total={5} size="medium" />`;

  const overlayCode = `// 카드/이미지 위 오버레이 예시
<div style={{ position: "relative" }}>
  <img src="/card-image.jpg" alt="..." />
  <PageCounter
    current={current}
    total={total}
    variant="alternative"
    size="small"
    className="page-counter-overlay"
  />
</div>

/* CSS */
.page-counter-overlay {
  position: absolute;
  bottom: 12px;
  right: 12px;
}`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>

      <Section title="Source Code">
        <a
          href="https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system/src/components/PageCounter/PageCounter.tsx"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: typography.fontSize.sm, color: "var(--content-brand-default)", textDecoration: "underline", textUnderlineOffset: 3 }}
        >
          PageCounter/PageCounter.tsx
        </a>
      </Section>

      <Section title="Import">
        <div style={{ borderRadius: radius.primitive.md, overflow: "hidden", border: "1px solid var(--divider)" }}>
          <pre style={{ margin: 0, padding: spacing.primitive[4], fontSize: typography.fontSize.compact, lineHeight: 1.7, color: "var(--docs-code-text)", backgroundColor: "var(--docs-code-surface)", fontFamily: "'SF Mono', 'Fira Code', monospace" }}>
            <code>{highlightCode(`import { PageCounter } from '@baerae-zkap/design-system';
import type { PageCounterVariant, PageCounterSize } from '@baerae-zkap/design-system';`)}</code>
          </pre>
        </div>
      </Section>

      <Section title="Basic Usage">
        <PreviewBox>
          <div style={{ display: "flex", gap: spacing.primitive[3] }}>
            <PageCounter current={2} total={5} variant="normal" size="medium" />
            <PageCounter current={2} total={5} variant="alternative" size="medium" />
          </div>
        </PreviewBox>
        <div style={{ borderRadius: radius.primitive.md, overflow: "hidden", border: "1px solid var(--divider)", marginTop: spacing.primitive[4] }}>
          <div style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[4]}px`, backgroundColor: "var(--docs-code-surface)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.medium, color: "var(--docs-code-active-text)" }}>Web</span>
            <CopyButton text={basicCode} />
          </div>
          <pre style={{ margin: 0, padding: spacing.primitive[4], fontSize: typography.fontSize.compact, lineHeight: 1.7, color: "var(--docs-code-text)", backgroundColor: "var(--docs-code-surface)", fontFamily: "'SF Mono', 'Fira Code', monospace", overflow: "auto" }}>
            <code>{highlightCode(basicCode)}</code>
          </pre>
        </div>
      </Section>

      <Section title="Variants">
        <PreviewBox>
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[4], alignItems: "flex-start" }}>
            {(["normal", "alternative"] as PageCounterVariant[]).map((v) => (
              <div key={v} style={{ display: "flex", alignItems: "center", gap: spacing.primitive[4] }}>
                <span style={{ width: 96, fontSize: typography.fontSize.sm, color: "var(--content-base-secondary)" }}>{v}</span>
                <PageCounter current={2} total={5} variant={v} size="medium" />
              </div>
            ))}
          </div>
        </PreviewBox>
        <div style={{ borderRadius: radius.primitive.md, overflow: "hidden", border: "1px solid var(--divider)", marginTop: spacing.primitive[4] }}>
          <pre style={{ margin: 0, padding: spacing.primitive[4], fontSize: typography.fontSize.compact, lineHeight: 1.7, color: "var(--docs-code-text)", backgroundColor: "var(--docs-code-surface)", fontFamily: "'SF Mono', 'Fira Code', monospace", overflow: "auto" }}>
            <code>{highlightCode(variantsCode)}</code>
          </pre>
        </div>
      </Section>

      <Section title="Sizes">
        <PreviewBox>
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[4], alignItems: "flex-start" }}>
            {(["small", "medium"] as PageCounterSize[]).map((s) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: spacing.primitive[4] }}>
                <span style={{ width: 64, fontSize: typography.fontSize.sm, color: "var(--content-base-secondary)" }}>{s}</span>
                <PageCounter current={2} total={5} variant="alternative" size={s} />
              </div>
            ))}
          </div>
        </PreviewBox>
        <div style={{ borderRadius: radius.primitive.md, overflow: "hidden", border: "1px solid var(--divider)", marginTop: spacing.primitive[4] }}>
          <pre style={{ margin: 0, padding: spacing.primitive[4], fontSize: typography.fontSize.compact, lineHeight: 1.7, color: "var(--docs-code-text)", backgroundColor: "var(--docs-code-surface)", fontFamily: "'SF Mono', 'Fira Code', monospace", overflow: "auto" }}>
            <code>{highlightCode(sizesCode)}</code>
          </pre>
        </div>
      </Section>

      <Section title="Overlay Pattern">
        <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
          <InlineCode>className</InlineCode> prop과 CSS position으로 카드/이미지 위에 오버레이합니다.
          컴포넌트 자체는 <InlineCode>display: inline-flex</InlineCode>이므로 레이아웃 제어는 부모에서 합니다.
        </p>
        <div style={{ borderRadius: radius.primitive.md, overflow: "hidden", border: "1px solid var(--divider)" }}>
          <pre style={{ margin: 0, padding: spacing.primitive[4], fontSize: typography.fontSize.compact, lineHeight: 1.7, color: "var(--docs-code-text)", backgroundColor: "var(--docs-code-surface)", fontFamily: "'SF Mono', 'Fira Code', monospace", overflow: "auto" }}>
            <code>{highlightCode(overlayCode)}</code>
          </pre>
        </div>
      </Section>

      <Section title="API Reference">
        <PropsTable props={pageCounterProps} />
      </Section>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PageCounterPage() {
  return (
    <div style={{ maxWidth: 840 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Navigations" },
          { label: "Page Counter" },
        ]}
      />

      <h1 style={{
        fontSize: typography.fontSize["3xl"],
        fontWeight: typography.fontWeight.bold,
        marginBottom: spacing.primitive[2],
        marginTop: spacing.primitive[4],
        color: "var(--text-primary)",
        letterSpacing: "-0.02em",
      }}>
        Page Counter
      </h1>
      <p style={{ ...descText, fontSize: typography.fontSize.md, marginBottom: spacing.primitive[8] }}>
        이미지 캐러셀이나 카드 슬라이더에서 현재 페이지 위치를 <strong>N / M</strong> pill 배지로 표시하는 인디케이터입니다.
      </p>

      <Playground />

      <div style={{ marginTop: spacing.primitive[10] }}>
        <PlatformTabs>
          {(platform: Platform) => platform === "web" ? <WebContent /> : <DesignContent />}
        </PlatformTabs>
      </div>
    </div>
  );
}
