"use client";

import { useMemo, useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, highlightCode, type Platform } from "@/components/PlatformTabs";
import { CategoryNavigation, IconButton, typography, spacing, radius } from "@baerae-zkap/design-system";
import type { CategoryNavigationItem, CategoryNavigationSize } from "@baerae-zkap/design-system";
import { Section, Subsection, InlineCode } from "@/components/docs/Section";
import { PropsTable, type PropItem } from "@/components/docs/PropsTable";
import { DoCard, DontCard, PrincipleCard } from "@/components/docs/Cards";
import { RadioGroup, CopyButton } from "@/components/docs/Playground";

// ─── Icons ────────────────────────────────────────────────────────────────────

function FilterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="7" y1="12" x2="17" y2="12" />
      <line x1="10" y1="18" x2="14" y2="18" />
    </svg>
  );
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORY_ITEMS: CategoryNavigationItem[] = [
  { label: "전체", value: "all" },
  { label: "BTC", value: "btc" },
  { label: "ETH", value: "eth" },
  { label: "BNB", value: "bnb" },
  { label: "SOL", value: "sol" },
  { label: "XRP", value: "xrp" },
  { label: "DOGE", value: "doge" },
];

const descText = {
  fontSize: typography.fontSize.sm,
  color: "var(--content-base-secondary)",
  lineHeight: 1.7,
  margin: 0,
} as const;

/** 320px 디바이스 프레임 */
function DeviceFrame({
  items,
  value,
  onChange,
  size = "md",
  iconButton,
  fixedPadding,
}: {
  items: CategoryNavigationItem[];
  value: string;
  onChange?: (v: string) => void;
  size?: CategoryNavigationSize;
  iconButton?: React.ReactNode;
  fixedPadding?: boolean;
}) {
  return (
    <div style={{
      width: 320,
      border: "1px solid var(--divider)",
      borderRadius: radius.primitive.lg,
      backgroundColor: "var(--surface-base-default)",
      padding: spacing.primitive[4],
      boxSizing: "border-box",
    }}>
      <CategoryNavigation
        items={items}
        value={value}
        onChange={onChange ?? (() => {})}
        size={size}
        iconButton={iconButton}
        fixedPadding={fixedPadding}
      />
    </div>
  );
}

// ─── Playground ───────────────────────────────────────────────────────────────

function Playground() {
  const [value, setValue] = useState("all");
  const [size, setSize] = useState<CategoryNavigationSize>("md");
  const [iconMode, setIconMode] = useState("on");
  const [paddingMode, setPaddingMode] = useState("flexible");

  const iconButton = iconMode === "on"
    ? (
      <IconButton variant="weak" color="neutral" size="small" aria-label="코인 필터">
        <FilterIcon />
      </IconButton>
    )
    : undefined;

  const fixedPadding = paddingMode === "fixed";

  const generatedCode = useMemo(() => {
    const itemLines = CATEGORY_ITEMS.map(
      (item) => `  { label: "${item.label}", value: "${item.value}" },`
    ).join("\n");
    return `const items: CategoryNavigationItem[] = [
${itemLines}
];

const [value, setValue] = useState("all");

<CategoryNavigation
  items={items}
  value={value}
  onChange={setValue}
  size="${size}"${iconMode === "on" ? `\n  iconButton={<IconButton variant="weak" color="neutral" size="small" aria-label="코인 필터"><FilterIcon /></IconButton>}` : ""}${fixedPadding ? "\n  fixedPadding" : ""}
/>`;
  }, [fixedPadding, iconMode, size]);

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
            <DeviceFrame
              items={CATEGORY_ITEMS}
              value={value}
              onChange={setValue}
              size={size}
              iconButton={iconButton}
              fixedPadding={fixedPadding}
            />
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
                label="Size"
                value={size}
                onChange={(v) => setSize(v as CategoryNavigationSize)}
                options={[
                  { value: "sm", label: "sm" },
                  { value: "md", label: "md" },
                  { value: "lg", label: "lg" },
                  { value: "xl", label: "xl" },
                ]}
              />
              <RadioGroup
                label="Icon Button"
                value={iconMode}
                onChange={setIconMode}
                options={[
                  { value: "on", label: "On" },
                  { value: "off", label: "Off" },
                ]}
              />
              <RadioGroup
                label="Padding"
                value={paddingMode}
                onChange={setPaddingMode}
                options={[
                  { value: "flexible", label: "Flexible" },
                  { value: "fixed", label: "Fixed" },
                ]}
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
  const [statesValue, setStatesValue] = useState("all");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>

      {/* 1. Overview */}
      <Section title="Overview">
        <p style={descText}>
          <InlineCode>CategoryNavigation</InlineCode>은 콘텐츠 필터·탐색 시나리오를 위한 수평 스크롤 칩 내비게이션입니다.
          항목 수가 화면 너비를 초과해도 자연스럽게 스크롤되며, 우측 보조 액션 버튼(필터·정렬)을 gradient fade 위에 고정 배치할 수 있습니다.
        </p>
      </Section>

      {/* 2. Anatomy */}
      <Section title="Anatomy">
        <PreviewBox>
          <DeviceFrame
            items={CATEGORY_ITEMS}
            value="eth"
            iconButton={
              <IconButton variant="weak" color="neutral" size="small" aria-label="코인 필터">
                <FilterIcon />
              </IconButton>
            }
          />
        </PreviewBox>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[3], marginTop: spacing.primitive[3] }}>
          {[
            ["1", "Active chip", "선택된 항목 — brand filled 스타일"],
            ["2", "Inactive chip", "미선택 항목 — fill.alternative 배경"],
            ["3", "Scroll container", "overflow-x: auto, 스크롤바 숨김"],
            ["4", "Icon button slot", "우측 고정 — gradient fade 위에 배치"],
          ].map(([num, name, desc]) => (
            <div key={num} style={{ fontSize: typography.fontSize.sm }}>
              <span style={{ fontWeight: typography.fontWeight.semibold }}>{num}. {name}</span>
              <span style={{ color: "var(--content-base-secondary)", fontWeight: typography.fontWeight.regular }}> — {desc}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* 3. Variants */}
      <Section title="Variants">
        <Subsection title="Size">
          <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
            4가지 크기를 제공합니다. 콘텐츠 밀도와 터치 영역 요구에 맞게 선택하세요.
          </p>
          <PreviewBox>
            <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[4], width: 320 }}>
              {(["sm", "md", "lg", "xl"] as CategoryNavigationSize[]).map((s) => (
                <div key={s} style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
                  <span style={{ fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.medium, color: "var(--content-base-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{s}</span>
                  <div style={{ border: "1px solid var(--divider)", borderRadius: radius.primitive.md, backgroundColor: "var(--surface-base-default)", padding: spacing.primitive[3], boxSizing: "border-box" }}>
                    <CategoryNavigation items={CATEGORY_ITEMS} value="all" onChange={() => {}} size={s} />
                  </div>
                </div>
              ))}
            </div>
          </PreviewBox>
        </Subsection>

        <Subsection title="With Icon Button">
          <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
            <InlineCode>iconButton</InlineCode> prop으로 우측에 필터·정렬 버튼을 추가할 수 있습니다.
            gradient fade가 자동으로 적용되어 칩 목록 끝을 자연스럽게 가립니다.
          </p>
          <PreviewBox>
            <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[4] }}>
              {[false, true].map((withIcon) => (
                <div key={String(withIcon)} style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
                  <span style={{ fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.medium, color: "var(--content-base-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {withIcon ? "With icon button" : "Without icon button"}
                  </span>
                  <div style={{ width: 320, border: "1px solid var(--divider)", borderRadius: radius.primitive.md, backgroundColor: "var(--surface-base-default)", padding: spacing.primitive[3], boxSizing: "border-box" }}>
                    <CategoryNavigation
                      items={CATEGORY_ITEMS}
                      value="all"
                      onChange={() => {}}
                      iconButton={withIcon ? (
                        <IconButton variant="weak" color="neutral" size="small" aria-label="필터">
                          <FilterIcon />
                        </IconButton>
                      ) : undefined}
                    />
                  </div>
                </div>
              ))}
            </div>
          </PreviewBox>
        </Subsection>

        <Subsection title="Fixed Padding">
          <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
            <InlineCode>fixedPadding=false</InlineCode>(기본)이면 칩 패딩이 뷰포트에 맞게 유동적으로 조정됩니다.
            <InlineCode>fixedPadding=true</InlineCode>이면 모든 칩이 동일한 고정 패딩을 가집니다.
          </p>
          <PreviewBox>
            <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[4] }}>
              {[false, true].map((fixed) => (
                <div key={String(fixed)} style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
                  <span style={{ fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.medium, color: "var(--content-base-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    fixedPadding={fixed ? "true" : "false"}
                  </span>
                  <div style={{ width: 320, border: "1px solid var(--divider)", borderRadius: radius.primitive.md, backgroundColor: "var(--surface-base-default)", padding: spacing.primitive[3], boxSizing: "border-box" }}>
                    <CategoryNavigation items={CATEGORY_ITEMS.slice(0, 4)} value="all" onChange={() => {}} fixedPadding={fixed} />
                  </div>
                </div>
              ))}
            </div>
          </PreviewBox>
        </Subsection>
      </Section>

      {/* 4. States */}
      <Section title="States">
        <p style={{ ...descText, marginBottom: spacing.primitive[5] }}>
          칩은 active(선택)와 inactive(미선택) 두 가지 상태를 가집니다. 상호작용 시 hover·pressed 피드백이 제공됩니다.
        </p>
        <PreviewBox>
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[6], alignItems: "center" }}>
            <DeviceFrame items={CATEGORY_ITEMS} value={statesValue} onChange={setStatesValue} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: spacing.primitive[3], width: "100%", maxWidth: 480 }}>
              {[
                { label: "Inactive · Default", bg: "var(--fill-alternative)", textColor: "var(--content-base-default)", isActive: false },
                { label: "Inactive · Hover", bg: "var(--fill-normal)", textColor: "var(--content-base-default)", isActive: false },
                { label: "Inactive · Pressed", bg: "var(--fill-normal)", textColor: "var(--content-base-default)", isActive: false, opacity: 0.7 },
                { label: "Active · Default", bg: "var(--surface-brand-default)", textColor: "var(--content-base-onColor)", isActive: true },
                { label: "Active · Hover", bg: "var(--surface-brand-default)", textColor: "var(--content-base-onColor)", isActive: true, opacity: 0.85 },
                { label: "Active · Pressed", bg: "var(--surface-brand-defaultPressed)", textColor: "var(--content-base-onColor)", isActive: true },
              ].map(({ label, bg, textColor, opacity }) => (
                <div key={label} style={{
                  height: 52,
                  borderRadius: radius.primitive.sm,
                  border: "1px solid var(--divider)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: spacing.primitive[1],
                  opacity,
                }}>
                  <div style={{
                    paddingInline: spacing.primitive[3],
                    paddingBlock: spacing.primitive[1],
                    borderRadius: radius.primitive.full,
                    backgroundColor: bg,
                    color: textColor,
                    fontSize: typography.fontSize.compact,
                    fontWeight: typography.fontWeight.medium,
                    whiteSpace: "nowrap",
                  }}>
                    BTC
                  </div>
                  <span style={{ fontSize: 9, color: "var(--content-base-secondary)", textAlign: "center" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* 5. Usage Guidelines */}
      <Section title="Usage Guidelines">
        <p style={{ ...descText, marginBottom: spacing.primitive[5] }}>
          카테고리 항목이 4개 이상이거나 화면 너비를 초과할 때 사용합니다.
          항목이 3개 이하로 고정이라면 <InlineCode>SegmentedControl</InlineCode>이 더 적합합니다.
        </p>
        <Subsection title="Best Practices">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
            <DoCard>
              <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[3] }}>
                <DeviceFrame
                  items={CATEGORY_ITEMS}
                  value="all"
                  iconButton={
                    <IconButton variant="weak" color="neutral" size="small" aria-label="필터">
                      <FilterIcon />
                    </IconButton>
                  }
                />
                <p style={{ ...descText, fontSize: typography.fontSize.compact, textAlign: "center" }}>
                  항목이 많을 때 횡스크롤 + 우측 필터 버튼 조합
                </p>
              </div>
            </DoCard>
            <DontCard>
              <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[3] }}>
                <div style={{ width: 320, border: "1px solid var(--divider)", borderRadius: radius.primitive.md, backgroundColor: "var(--surface-base-default)", padding: spacing.primitive[3], boxSizing: "border-box" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: spacing.primitive[2] }}>
                    {CATEGORY_ITEMS.map((item) => (
                      <div key={item.value} style={{
                        paddingInline: spacing.primitive[3],
                        paddingBlock: spacing.primitive[1],
                        borderRadius: radius.primitive.full,
                        backgroundColor: "var(--fill-alternative)",
                        fontSize: typography.fontSize.sm,
                        color: "var(--content-base-default)",
                        whiteSpace: "nowrap",
                      }}>
                        {item.label}
                      </div>
                    ))}
                  </div>
                </div>
                <p style={{ ...descText, fontSize: typography.fontSize.compact, textAlign: "center" }}>
                  줄 바꿈(flex-wrap)으로 표시하지 않습니다 — 높이가 불규칙해집니다
                </p>
              </div>
            </DontCard>
          </div>
        </Subsection>
        <Subsection title="Principles">
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[3] }}>
            <PrincipleCard number={1} title="스크롤은 자연스럽게" desc="항목을 억지로 줄여 한 줄에 맞추지 마세요. CategoryNavigation은 항목이 넘칠수록 가치를 발휘합니다." />
            <PrincipleCard number={2} title="첫 번째 항목은 '전체'" desc="일반적으로 첫 항목은 '전체(All)'로 설정해 사용자에게 기본 귀환점을 제공합니다." />
            <PrincipleCard number={3} title="아이콘 버튼은 보조 액션" desc="iconButton은 필터·정렬 등 보조 동작에만 사용합니다. 주요 네비게이션 동작은 칩에 담으세요." />
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
                ["--surface-brand-default", "Active 칩 기본 배경 (cssVarColors.surface.brand.default)"],
                ["--surface-brand-defaultPressed", "Active 칩 pressed 배경 (cssVarColors.surface.brand.defaultPressed)"],
                ["--content-base-onColor", "Active 칩 텍스트 (cssVarColors.content.base.onColor)"],
                ["--fill-alternative", "Inactive 칩 기본 배경 (cssVarColors.fill.alternative)"],
                ["--fill-normal", "Inactive 칩 hover/pressed 배경 (cssVarColors.fill.normal)"],
                ["--content-base-default", "Inactive 칩 텍스트 (cssVarColors.content.base.default)"],
                ["--surface-base-default", "우측 Icon slot gradient fade 종료색 (cssVarColors.surface.base.default)"],
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
          <li>컨테이너에 <InlineCode>{'role="tablist"'}</InlineCode>과 <InlineCode>{'aria-label="카테고리 탐색"'}</InlineCode>이 자동 적용됩니다.</li>
          <li>각 칩에 <InlineCode>{'role="tab"'}</InlineCode>과 <InlineCode>aria-selected</InlineCode>로 선택 상태를 전달합니다.</li>
          <li>활성 항목에만 <InlineCode>tabIndex=0</InlineCode>이 적용되어 키보드 포커스를 받습니다.</li>
          <li><InlineCode>iconButton</InlineCode>에는 반드시 명확한 <InlineCode>aria-label</InlineCode>을 제공하세요.</li>
          <li><InlineCode>WebkitOverflowScrolling: touch</InlineCode>가 적용되어 iOS에서 관성 스크롤이 동작합니다.</li>
        </ul>
      </Section>

      {/* 8. Related Components */}
      <Section title="Related Components">
        <p style={descText}>
          고정된 2–5개 옵션 간 뷰·모드 전환에는 <InlineCode>SegmentedControl</InlineCode>을,
          다중 선택 필터 태그에는 <InlineCode>Chip</InlineCode>을 사용하세요.
          우측 아이콘 버튼은 <InlineCode>IconButton</InlineCode>과 조합합니다.
        </p>
      </Section>
    </div>
  );
}

// ─── Web Content ──────────────────────────────────────────────────────────────

const categoryNavigationProps: PropItem[] = [
  { name: "items", type: "CategoryNavigationItem[]", required: true, description: "표시할 카테고리 항목 목록" },
  { name: "value", type: "string", required: true, description: "현재 활성 항목 value" },
  { name: "onChange", type: "(value: string) => void", required: true, description: "항목 변경 핸들러" },
  { name: "size", type: "'sm' | 'md' | 'lg' | 'xl'", required: false, description: "칩 크기 (기본값: 'md')" },
  { name: "iconButton", type: "ReactNode", required: false, description: "우측 고정 보조 액션 버튼" },
  { name: "fixedPadding", type: "boolean", required: false, description: "고정 패딩 모드 (기본값: false)" },
  { name: "className", type: "string", required: false, description: "루트 컨테이너 커스텀 클래스" },
];

const categoryNavigationItemProps: PropItem[] = [
  { name: "label", type: "string", required: true, description: "칩에 표시할 레이블" },
  { name: "value", type: "string", required: true, description: "항목 식별 값 (onChange 콜백에서 전달)" },
];

function WebContent() {
  const basicCode = `import { CategoryNavigation } from '@baerae-zkap/design-system';
import type { CategoryNavigationItem } from '@baerae-zkap/design-system';

const items: CategoryNavigationItem[] = [
  { label: "전체", value: "all" },
  { label: "BTC", value: "btc" },
  { label: "ETH", value: "eth" },
  { label: "BNB", value: "bnb" },
  { label: "SOL", value: "sol" },
  { label: "XRP", value: "xrp" },
];

export function App() {
  const [value, setValue] = useState("all");
  return (
    <CategoryNavigation
      items={items}
      value={value}
      onChange={setValue}
    />
  );
}`;

  const withIconCode = `import { CategoryNavigation, IconButton } from '@baerae-zkap/design-system';

<CategoryNavigation
  items={items}
  value={value}
  onChange={setValue}
  iconButton={
    <IconButton
      variant="weak"
      color="neutral"
      size="small"
      aria-label="코인 필터"
    >
      <FilterIcon />
    </IconButton>
  }
/>`;

  const sizesCode = `// sm
<CategoryNavigation items={items} value={value} onChange={setValue} size="sm" />

// md (default)
<CategoryNavigation items={items} value={value} onChange={setValue} size="md" />

// lg
<CategoryNavigation items={items} value={value} onChange={setValue} size="lg" />

// xl
<CategoryNavigation items={items} value={value} onChange={setValue} size="xl" />`;

  const fixedPaddingCode = `// 유동 패딩 (기본값)
<CategoryNavigation items={items} value={value} onChange={setValue} />

// 고정 패딩
<CategoryNavigation items={items} value={value} onChange={setValue} fixedPadding />`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>

      <Section title="Source Code">
        <a
          href="https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system/src/components/CategoryNavigation/CategoryNavigation.tsx"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: typography.fontSize.sm, color: "var(--content-brand-default)", textDecoration: "underline", textUnderlineOffset: 3 }}
        >
          CategoryNavigation/CategoryNavigation.tsx
        </a>
      </Section>

      <Section title="Import">
        <CodeBlock code={`import { CategoryNavigation } from '@baerae-zkap/design-system';
import type { CategoryNavigationItem, CategoryNavigationSize } from '@baerae-zkap/design-system';`} />
      </Section>

      <Section title="Basic Usage">
        <PreviewBox>
          <DeviceFrame items={CATEGORY_ITEMS} value="all" />
        </PreviewBox>
        <CodeBlock code={basicCode} />
      </Section>

      <Section title="Sizes">
        <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
          <InlineCode>size</InlineCode> prop으로 4가지 크기를 선택할 수 있습니다.
        </p>
        <PreviewBox>
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[4], width: 320 }}>
            {(["sm", "md", "lg", "xl"] as CategoryNavigationSize[]).map((s) => (
              <div key={s} style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[1] }}>
                <span style={{ fontSize: typography.fontSize.xs, color: "var(--content-base-secondary)", fontWeight: typography.fontWeight.medium }}>{s}</span>
                <div style={{ border: "1px solid var(--divider)", borderRadius: radius.primitive.md, backgroundColor: "var(--surface-base-default)", padding: spacing.primitive[3] }}>
                  <CategoryNavigation items={CATEGORY_ITEMS} value="all" onChange={() => {}} size={s} />
                </div>
              </div>
            ))}
          </div>
        </PreviewBox>
        <CodeBlock code={sizesCode} />
      </Section>

      <Section title="With Icon Button">
        <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
          <InlineCode>iconButton</InlineCode>에 <InlineCode>IconButton</InlineCode>을 전달하면 우측 고정 슬롯에 배치됩니다.
          스크롤 영역은 아이콘 슬롯 너비만큼 자동으로 오른쪽 여백이 확보됩니다.
        </p>
        <PreviewBox>
          <DeviceFrame
            items={CATEGORY_ITEMS}
            value="all"
            iconButton={
              <IconButton variant="weak" color="neutral" size="small" aria-label="필터">
                <FilterIcon />
              </IconButton>
            }
          />
        </PreviewBox>
        <CodeBlock code={withIconCode} />
      </Section>

      <Section title="Fixed Padding">
        <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
          <InlineCode>fixedPadding</InlineCode>으로 칩 패딩 동작을 제어합니다.
        </p>
        <PreviewBox>
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[4] }}>
            {[false, true].map((fixed) => (
              <div key={String(fixed)} style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[1] }}>
                <span style={{ fontSize: typography.fontSize.xs, color: "var(--content-base-secondary)", fontWeight: typography.fontWeight.medium }}>fixedPadding={fixed ? "true" : "false"}</span>
                <div style={{ width: 320, border: "1px solid var(--divider)", borderRadius: radius.primitive.md, backgroundColor: "var(--surface-base-default)", padding: spacing.primitive[3] }}>
                  <CategoryNavigation items={CATEGORY_ITEMS.slice(0, 4)} value="all" onChange={() => {}} fixedPadding={fixed} />
                </div>
              </div>
            ))}
          </div>
        </PreviewBox>
        <CodeBlock code={fixedPaddingCode} />
      </Section>

      <Section title="API Reference">
        <Subsection title="CategoryNavigationProps">
          <PropsTable props={categoryNavigationProps} />
        </Subsection>
        <Subsection title="CategoryNavigationItem">
          <PropsTable props={categoryNavigationItemProps} />
        </Subsection>
      </Section>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CategoryNavigationPage() {
  return (
    <div style={{ maxWidth: 840 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Navigations" },
          { label: "Category Navigation" },
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
        Category Navigation
      </h1>
      <p style={{ ...descText, fontSize: typography.fontSize.md, marginBottom: spacing.primitive[8] }}>
        카테고리 칩을 수평 스크롤로 제공하고, 우측 보조 액션 버튼을 함께 배치할 수 있는 탐색 컴포넌트입니다.
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
