"use client";

import { type ReactNode, useMemo, useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, highlightCode, type Platform } from "@/components/PlatformTabs";
import { Tab, IconButton, typography, spacing, radius } from "@baerae-zkap/design-system";
import type { TabItem, TabSize, TabResize } from "@baerae-zkap/design-system";
import { Section, Subsection, InlineCode } from "@/components/docs/Section";
import { PropsTable, type PropItem } from "@/components/docs/PropsTable";
import { DoCard, DontCard, PrincipleCard } from "@/components/docs/Cards";
import { RadioGroup, CopyButton } from "@/components/docs/Playground";

function FilterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="7" y1="12" x2="17" y2="12" />
      <line x1="10" y1="18" x2="14" y2="18" />
    </svg>
  );
}

const TAB_ITEMS: TabItem[] = [
  { label: "전체", value: "all" },
  { label: "BTC", value: "btc" },
  { label: "ETH", value: "eth" },
  { label: "BNB", value: "bnb" },
  { label: "SOL", value: "sol" },
  { label: "XRP", value: "xrp" },
  { label: "DOGE", value: "doge" },
];

const FILL_TAB_ITEMS: TabItem[] = [
  { label: "전체", value: "all" },
  { label: "BTC", value: "btc" },
  { label: "ETH", value: "eth" },
];

const DISABLED_TAB_ITEMS: TabItem[] = [
  { label: "전체", value: "all" },
  { label: "BTC", value: "btc" },
  { label: "ETH", value: "eth", disabled: true },
  { label: "BNB", value: "bnb" },
  { label: "SOL", value: "sol", disabled: true },
  { label: "XRP", value: "xrp" },
  { label: "DOGE", value: "doge" },
];

const descText = {
  fontSize: typography.fontSize.sm,
  color: "var(--content-base-secondary)",
  lineHeight: 1.7,
  margin: 0,
} as const;

function DeviceFrame({
  items,
  value,
  onChange,
  size = "md",
  resize = "hug",
  fixedPadding = false,
  iconButton,
}: {
  items: TabItem[];
  value: string;
  onChange?: (v: string) => void;
  size?: TabSize;
  resize?: TabResize;
  fixedPadding?: boolean;
  iconButton?: ReactNode;
}) {
  return (
    <div style={{ width: 320 }}>
      <Tab
        items={items}
        value={value}
        onChange={onChange ?? (() => {})}
        size={size}
        resize={resize}
        fixedPadding={fixedPadding}
        iconButton={iconButton}
      />
    </div>
  );
}

function Playground() {
  const [value, setValue] = useState("all");
  const [size, setSize] = useState<TabSize>("md");
  const [resize, setResize] = useState<TabResize>("hug");
  const [paddingMode, setPaddingMode] = useState("false");
  const [iconMode, setIconMode] = useState("off");

  const fixedPadding = paddingMode === "true";
  const iconButton = iconMode === "on"
    ? (
      <IconButton variant="weak" color="neutral" size="small" aria-label="탭 필터">
        <FilterIcon />
      </IconButton>
    )
    : undefined;

  const generatedCode = useMemo(() => {
    const itemLines = TAB_ITEMS.map(
      (item) => `  { label: "${item.label}", value: "${item.value}" },`
    ).join("\n");

    return `const items: TabItem[] = [
${itemLines}
];

const [value, setValue] = useState("all");

<Tab
  items={items}
  value={value}
  onChange={setValue}
  size="${size}"
  resize="${resize}"${fixedPadding ? `\n  fixedPadding` : ""}${iconMode === "on" ? `
  iconButton={<IconButton variant="weak" color="neutral" size="small" aria-label="탭 필터"><FilterIcon /></IconButton>}` : ""}
/>`;
  }, [fixedPadding, iconMode, resize, size]);

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
            <DeviceFrame
              items={resize === "fill" ? FILL_TAB_ITEMS : TAB_ITEMS}
              value={value}
              onChange={setValue}
              size={size}
              resize={resize}
              fixedPadding={fixedPadding}
              iconButton={iconButton}
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
                label="Size"
                value={size}
                onChange={(v) => setSize(v as TabSize)}
                options={[
                  { value: "sm", label: "sm" },
                  { value: "md", label: "md" },
                  { value: "lg", label: "lg" },
                ]}
              />
              <RadioGroup
                label="Resize"
                value={resize}
                onChange={(v) => setResize(v as TabResize)}
                options={[
                  { value: "hug", label: "hug" },
                  { value: "fill", label: "fill" },
                ]}
              />
              <RadioGroup
                label="Horizontal Padding"
                value={paddingMode}
                onChange={setPaddingMode}
                options={[
                  { value: "false", label: "false" },
                  { value: "true", label: "true" },
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
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: spacing.primitive[4], borderRadius: radius.primitive.md, overflow: "hidden", border: "1px solid var(--divider)" }}>
        <div
          style={{
            padding: `${spacing.primitive[2]}px ${spacing.primitive[4]}px`,
            backgroundColor: "var(--docs-code-surface)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.medium, color: "var(--docs-code-active-text)" }}>Web</span>
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
  const [statesValue, setStatesValue] = useState("all");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>
      <Section title="Overview">
        <p style={descText}>
          <InlineCode>Tab</InlineCode>은 페이지 내 콘텐츠 탐색을 위한 언더라인 인디케이터 탭 컴포넌트입니다.
          선택된 탭은 2px underline으로 강조되며, 탭 수가 많으면 수평 스크롤로 자연스럽게 확장됩니다.
        </p>
      </Section>

      <Section title="Anatomy">
        <PreviewBox>
          <DeviceFrame
            items={TAB_ITEMS}
            value="eth"
            iconButton={
              <IconButton variant="weak" color="neutral" size="small" aria-label="탭 필터">
                <FilterIcon />
              </IconButton>
            }
          />
        </PreviewBox>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[3], marginTop: spacing.primitive[3] }}>
          {[
            ["1", "Selection indicator", "선택된 탭 하단 2px 언더라인"],
            ["2", "Active tab", "선택된 탭 텍스트 강조"],
            ["3", "Inactive tab", "미선택 탭 텍스트"],
            ["4", "Divider line", "탭 하단 구분선"],
            ["5", "Icon button slot", "우측 고정 아이콘 슬롯 + fade"],
          ].map(([num, name, desc]) => (
            <div key={num} style={{ fontSize: typography.fontSize.sm }}>
              <span style={{ fontWeight: typography.fontWeight.semibold }}>{num}. {name}</span>
              <span style={{ color: "var(--content-base-secondary)", fontWeight: typography.fontWeight.regular }}> — {desc}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Variants">
        <Subsection title="Size">
          <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
            <InlineCode>sm</InlineCode>, <InlineCode>md</InlineCode>, <InlineCode>lg</InlineCode> 3가지 크기를 제공합니다.
          </p>
          <PreviewBox>
            <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[4], width: 320 }}>
              {(["sm", "md", "lg"] as TabSize[]).map((s) => (
                <div key={s} style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
                  <span style={{ fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.medium, color: "var(--content-base-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{s}</span>
                  <div style={{ border: "1px solid var(--divider)", borderRadius: radius.primitive.md, backgroundColor: "var(--surface-base-default)", padding: spacing.primitive[3], boxSizing: "border-box" }}>
                    <Tab items={TAB_ITEMS} value="all" onChange={() => {}} size={s} />
                  </div>
                </div>
              ))}
            </div>
          </PreviewBox>
        </Subsection>

        <Subsection title="Resize">
          <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
            <InlineCode>resize="hug"</InlineCode>(기본)은 탭이 텍스트 길이에 맞고 넘치면 스크롤됩니다.
            <InlineCode>resize="fill"</InlineCode>이면 탭이 컨테이너 가로 폭을 균등 분할합니다.
          </p>
          <PreviewBox>
            <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[4] }}>
              {(["hug", "fill"] as TabResize[]).map((r) => (
                <div key={r} style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
                  <span style={{ fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.medium, color: "var(--content-base-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>resize="{r}"</span>
                  <div style={{ width: 320, border: "1px solid var(--divider)", borderRadius: radius.primitive.md, backgroundColor: "var(--surface-base-default)", padding: spacing.primitive[3], boxSizing: "border-box" }}>
                    <Tab items={r === "fill" ? FILL_TAB_ITEMS : TAB_ITEMS} value="all" onChange={() => {}} resize={r} />
                  </div>
                </div>
              ))}
            </div>
          </PreviewBox>
        </Subsection>
      </Section>

      <Section title="States">
        <p style={{ ...descText, marginBottom: spacing.primitive[5] }}>
          Active/Inactive 탭에 대해 normal, hover, pressed, disabled 상태를 제공합니다.
          disabled 항목은 선택/클릭되지 않으며 보조 텍스트 컬러를 사용합니다.
        </p>
        <PreviewBox>
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[6], alignItems: "center" }}>
            <DeviceFrame items={DISABLED_TAB_ITEMS} value={statesValue} onChange={setStatesValue} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: spacing.primitive[3], width: "100%", maxWidth: 480 }}>
              {[
                { label: "Inactive · Normal", color: "var(--content-base-secondary)", line: "transparent" },
                { label: "Inactive · Hover", color: "var(--content-base-default)", line: "transparent" },
                { label: "Inactive · Pressed", color: "var(--content-base-default)", line: "transparent", opacity: 0.75 },
                { label: "Active · Normal", color: "var(--content-brand-default)", line: "var(--surface-brand-default)" },
                { label: "Active · Pressed", color: "var(--content-brand-default)", line: "var(--surface-brand-default)", opacity: 0.8 },
                { label: "Disabled", color: "var(--content-disabled-default)", line: "transparent" },
              ].map(({ label, color, line, opacity }) => (
                <div
                  key={label}
                  style={{
                    height: 60,
                    borderRadius: radius.primitive.sm,
                    border: "1px solid var(--divider)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: spacing.primitive[1],
                    opacity,
                  }}
                >
                  <div
                    style={{
                      fontSize: typography.fontSize.compact,
                      color,
                      paddingBottom: spacing.primitive[2],
                      borderBottom: `2px solid ${line}`,
                      lineHeight: 1,
                    }}
                  >
                    BTC
                  </div>
                  <span style={{ fontSize: 9, color: "var(--content-base-secondary)", textAlign: "center" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </PreviewBox>
      </Section>

      <Section title="Usage Guidelines">
        <p style={{ ...descText, marginBottom: spacing.primitive[5] }}>
          상위 페이지 내에서 하위 콘텐츠 영역을 전환할 때 사용합니다.
          독립적인 페이지 전환 내비게이션에는 <InlineCode>BottomNavigation</InlineCode> 또는 라우팅 기반 메뉴를 사용하세요.
        </p>
        <Subsection title="Best Practices">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
            <DoCard>
              <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[3] }}>
                <DeviceFrame
                  items={TAB_ITEMS}
                  value="all"
                  iconButton={
                    <IconButton variant="weak" color="neutral" size="small" aria-label="필터">
                      <FilterIcon />
                    </IconButton>
                  }
                />
                <p style={{ ...descText, fontSize: typography.fontSize.compact, textAlign: "center" }}>
                  탭 탐색 + 보조 액션(필터)을 분리해 정보 구조를 명확히 유지
                </p>
              </div>
            </DoCard>
            <DontCard>
              <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[3] }}>
                <div style={{ width: 320, border: "1px solid var(--divider)", borderRadius: radius.primitive.md, backgroundColor: "var(--surface-base-default)", padding: spacing.primitive[3], boxSizing: "border-box" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: spacing.primitive[3], borderBottom: "1px solid var(--divider)", paddingBottom: spacing.primitive[2] }}>
                    {TAB_ITEMS.map((item) => (
                      <div key={item.value} style={{ fontSize: typography.fontSize.sm, color: "var(--content-base-default)" }}>
                        {item.label}
                      </div>
                    ))}
                  </div>
                </div>
                <p style={{ ...descText, fontSize: typography.fontSize.compact, textAlign: "center" }}>
                  줄바꿈된 자유 배치는 탭 역할과 선택 상태 인지를 약화시킵니다
                </p>
              </div>
            </DontCard>
          </div>
        </Subsection>
        <Subsection title="Principles">
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[3] }}>
            <PrincipleCard number={1} title="하나의 활성 탭만 유지" desc="탭은 상호 배타적 탐색 요소입니다. 같은 레벨에서 항상 하나의 활성 값만 가지세요." />
            <PrincipleCard number={2} title="레이블은 짧고 명확하게" desc="한글/영문 혼합 시에도 한 줄 유지가 가능한 길이로 작성하고 약어는 제품 맥락에서만 사용하세요." />
            <PrincipleCard number={3} title="보조 액션은 iconButton으로 분리" desc="정렬·필터 같은 부가 기능을 탭 자체에 섞지 말고 우측 아이콘 슬롯으로 분리하세요." />
          </div>
        </Subsection>
      </Section>

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
                ["--content-brand-default", "Active 텍스트 (cssVarColors.content.brand.default)"],
                ["--surface-brand-default", "Active selection underline (cssVarColors.surface.brand.default)"],
                ["--content-base-secondary", "Inactive 기본 텍스트 (cssVarColors.content.base.secondary)"],
                ["--content-base-default", "Inactive hover/pressed 텍스트 (cssVarColors.content.base.default)"],
                ["--content-disabled-default", "Disabled 텍스트 (cssVarColors.content.disabled.default)"],
                ["--border-base-default", "탭 하단 divider line (cssVarColors.border.base.default)"],
                ["--surface-base-default", "우측 icon slot gradient 종료색 (cssVarColors.surface.base.default)"],
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

      <Section title="Accessibility">
        <ul style={{ margin: 0, paddingLeft: spacing.primitive[5], color: "var(--content-base-secondary)", fontSize: typography.fontSize.sm, lineHeight: 1.8 }}>
          <li>컨테이너에 <InlineCode>{'role="tablist"'}</InlineCode>과 <InlineCode>{'aria-label="탭 탐색"'}</InlineCode>이 적용됩니다.</li>
          <li>각 탭 버튼은 <InlineCode>{'role="tab"'}</InlineCode>과 <InlineCode>aria-selected</InlineCode>를 통해 선택 상태를 전달합니다.</li>
          <li>비활성 항목은 <InlineCode>aria-disabled</InlineCode>가 설정되고 포커스/클릭에서 제외됩니다.</li>
          <li>활성 탭만 <InlineCode>tabIndex=0</InlineCode>을 가져 키보드 포커스 순서를 단순화합니다.</li>
          <li><InlineCode>iconButton</InlineCode>에는 목적이 드러나는 <InlineCode>aria-label</InlineCode>을 제공해야 합니다.</li>
        </ul>
      </Section>

      <Section title="Related Components">
        <p style={descText}>
          스크롤 가능한 카테고리 칩 탐색은 <InlineCode>CategoryNavigation</InlineCode>,
          2–5개 고정 옵션의 세그먼트 전환은 <InlineCode>SegmentedControl</InlineCode>,
          하단 앱 전역 내비게이션은 <InlineCode>BottomNavigation</InlineCode>을 사용하세요.
        </p>
      </Section>
    </div>
  );
}

const tabProps: PropItem[] = [
  { name: "items", type: "TabItem[]", required: true, description: "표시할 탭 항목 목록" },
  { name: "value", type: "string", required: true, description: "현재 활성 탭 value" },
  { name: "onChange", type: "(value: string) => void", required: true, description: "탭 변경 핸들러" },
  { name: "size", type: "'sm' | 'md' | 'lg'", required: false, description: "탭 크기 (기본값: 'md')" },
  { name: "resize", type: "'hug' | 'fill'", required: false, description: "hug: 텍스트 길이에 맞춤 + 스크롤, fill: 컨테이너 폭 균등 분배 (기본값: 'hug')" },
  { name: "fixedPadding", type: "boolean", required: false, description: "탭바 좌우에 수평 패딩 적용 (기본값: false)" },
  { name: "iconButton", type: "ReactNode", required: false, description: "우측 고정 보조 액션 버튼" },
  { name: "className", type: "string", required: false, description: "루트 컨테이너 커스텀 클래스" },
];

const tabItemProps: PropItem[] = [
  { name: "label", type: "string", required: true, description: "탭 레이블" },
  { name: "value", type: "string", required: true, description: "탭 식별 값 (onChange로 전달)" },
  { name: "disabled", type: "boolean", required: false, description: "비활성화 여부" },
];

function WebContent() {
  const basicCode = `import { Tab } from '@baerae-zkap/design-system';
import type { TabItem } from '@baerae-zkap/design-system';

const items: TabItem[] = [
  { label: "전체", value: "all" },
  { label: "BTC", value: "btc" },
  { label: "ETH", value: "eth" },
  { label: "BNB", value: "bnb" },
  { label: "SOL", value: "sol" },
  { label: "XRP", value: "xrp" },
  { label: "DOGE", value: "doge" },
];

export function App() {
  const [value, setValue] = useState("all");
  return (
    <Tab
      items={items}
      value={value}
      onChange={setValue}
    />
  );
}`;

  const resizeCode = `// 텍스트 길이 기반 스크롤 (기본값)
<Tab items={items} value={value} onChange={setValue} resize="hug" />

// 컨테이너 폭 균등 분배
<Tab items={items} value={value} onChange={setValue} resize="fill" />`;

  const withIconCode = `import { Tab, IconButton } from '@baerae-zkap/design-system';

<Tab
  items={items}
  value={value}
  onChange={setValue}
  iconButton={
    <IconButton variant="weak" color="neutral" size="small" aria-label="탭 필터">
      <FilterIcon />
    </IconButton>
  }
/>`;

  const disabledCode = `const items: TabItem[] = [
  { label: "전체", value: "all" },
  { label: "BTC", value: "btc" },
  { label: "ETH", value: "eth", disabled: true },
  { label: "BNB", value: "bnb" },
];

<Tab items={items} value={value} onChange={setValue} />`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>
      <Section title="Source Code">
        <a
          href="https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system/src/components/Tab/Tab.tsx"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: typography.fontSize.sm, color: "var(--content-brand-default)", textDecoration: "underline", textUnderlineOffset: 3 }}
        >
          Tab/Tab.tsx
        </a>
      </Section>

      <Section title="Import">
        <CodeBlock code={`import { Tab } from '@baerae-zkap/design-system';
import type { TabItem, TabSize } from '@baerae-zkap/design-system';`} />
      </Section>

      <Section title="Basic Usage">
        <PreviewBox>
          <DeviceFrame items={TAB_ITEMS} value="all" />
        </PreviewBox>
        <CodeBlock code={basicCode} />
      </Section>

      <Section title="Resize">
        <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
          <InlineCode>resize</InlineCode> 값에 따라 텍스트 길이 기반 스크롤 또는 균등 분배로 전환됩니다.
        </p>
        <PreviewBox>
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[4] }}>
            {(["hug", "fill"] as TabResize[]).map((r) => (
              <div key={r} style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[1] }}>
                <span style={{ fontSize: typography.fontSize.xs, color: "var(--content-base-secondary)", fontWeight: typography.fontWeight.medium }}>resize="{r}"</span>
                <div style={{ width: 320, border: "1px solid var(--divider)", borderRadius: radius.primitive.md, backgroundColor: "var(--surface-base-default)", padding: spacing.primitive[3] }}>
                  <Tab items={r === "fill" ? FILL_TAB_ITEMS : TAB_ITEMS} value="all" onChange={() => {}} resize={r} />
                </div>
              </div>
            ))}
          </div>
        </PreviewBox>
        <CodeBlock code={resizeCode} />
      </Section>

      <Section title="With Icon Button">
        <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
          <InlineCode>iconButton</InlineCode>으로 우측 고정 액션을 추가할 수 있습니다.
        </p>
        <PreviewBox>
          <DeviceFrame
            items={TAB_ITEMS}
            value="all"
            iconButton={
              <IconButton variant="weak" color="neutral" size="small" aria-label="탭 필터">
                <FilterIcon />
              </IconButton>
            }
          />
        </PreviewBox>
        <CodeBlock code={withIconCode} />
      </Section>

      <Section title="Disabled Items">
        <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
          비활성 탭은 선택 상태 변경에 반응하지 않고 보조 색상으로 렌더링됩니다.
        </p>
        <PreviewBox>
          <DeviceFrame items={DISABLED_TAB_ITEMS} value="all" />
        </PreviewBox>
        <CodeBlock code={disabledCode} />
      </Section>

      <Section title="API Reference">
        <Subsection title="TabProps">
          <PropsTable props={tabProps} />
        </Subsection>
        <Subsection title="TabItem">
          <PropsTable props={tabItemProps} />
        </Subsection>
      </Section>
    </div>
  );
}

export default function TabPage() {
  return (
    <div style={{ maxWidth: 840 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Navigations" },
          { label: "Tab" },
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
        Tab
      </h1>
      <p style={{ ...descText, fontSize: typography.fontSize.md, marginBottom: spacing.primitive[8] }}>
        페이지 내 콘텐츠를 언더라인 인디케이터로 구분해 탐색하는 수평 탭 컴포넌트입니다.
      </p>

      <Playground />

      <div style={{ marginTop: spacing.primitive[10] }}>
        <PlatformTabs>
          {(platform: Platform) => (platform === "web" ? <WebContent /> : <DesignContent />)}
        </PlatformTabs>
      </div>
    </div>
  );
}
