"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, highlightCode, type Platform } from "@/components/PlatformTabs";
import { BottomNavigation, typography, spacing, radius } from "@baerae-zkap/design-system";
import type { BottomNavigationItem } from "@baerae-zkap/design-system";
import { Section, Subsection, InlineCode } from "@/components/docs/Section";
import { PropsTable, type PropItem } from "@/components/docs/PropsTable";
import { PrincipleCard, DoCard, DontCard } from "@/components/docs/Cards";
import { RadioGroup, CopyButton } from "@/components/docs/Playground";

// ─── Icons ────────────────────────────────────────────────────────────────────

// Outlined icons — used in States section for visual reference
function HomeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}
function BookmarkIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
    </svg>
  );
}
function BellIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

// High-quality filled icons — used in all nav tabs (Heroicons v2 style)
function HomeFilledIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.47 2.63a.75.75 0 0 1 1.06 0l8.25 8.25a.75.75 0 0 1-.53 1.28H18v6.09A1.75 1.75 0 0 1 16.25 20H7.75A1.75 1.75 0 0 1 6 18.25v-6.09H3.75a.75.75 0 0 1-.53-1.28l8.25-8.25Z" />
    </svg>
  );
}
function SearchFilledIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M10.5 3a7.5 7.5 0 0 0 0 15 7.46 7.46 0 0 0 4.83-1.76l3.96 3.96a1 1 0 0 0 1.42-1.42l-3.96-3.96A7.46 7.46 0 0 0 18 10.5 7.5 7.5 0 0 0 10.5 3Z" />
    </svg>
  );
}
function BookmarkFilledIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 3.75A1.75 1.75 0 0 1 8.75 2h6.5A1.75 1.75 0 0 1 17 3.75v16.19a.75.75 0 0 1-1.19.61L12 17.69l-3.81 2.86A.75.75 0 0 1 7 19.94V3.75Z" />
    </svg>
  );
}
function BellFilledIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.5A5.5 5.5 0 0 0 6.5 8v2.38c0 1.03-.34 2.04-.98 2.84l-1.1 1.38A1.75 1.75 0 0 0 5.8 18h12.4a1.75 1.75 0 0 0 1.37-2.8l-1.1-1.38a4.56 4.56 0 0 1-.97-2.84V8A5.5 5.5 0 0 0 12 2.5Z" />
      <path d="M9.75 19a2.25 2.25 0 0 0 4.5 0h-4.5Z" />
    </svg>
  );
}
function UserFilledIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.75a4.25 4.25 0 1 0 0 8.5 4.25 4.25 0 0 0 0-8.5ZM4 18.25A4.25 4.25 0 0 1 8.25 14h7.5A4.25 4.25 0 0 1 20 18.25V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-1.75Z" />
    </svg>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Dashed rounded-rect placeholder — inactive state */
function IconPlaceholder() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="2.75" y="2.75" width="18.5" height="18.5" rx="5.5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2.5" />
    </svg>
  );
}

/** Solid rounded-rect placeholder — active state */
function IconPlaceholderFilled() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <rect x="2" y="2" width="20" height="20" rx="6" />
    </svg>
  );
}

// Playground items — placeholder icons, unified "Menu" label
const ALL_ITEMS: BottomNavigationItem[] = [
  { icon: <IconPlaceholder />, activeIcon: <IconPlaceholderFilled />, label: "Menu" },
  { icon: <IconPlaceholder />, activeIcon: <IconPlaceholderFilled />, label: "Menu" },
  { icon: <IconPlaceholder />, activeIcon: <IconPlaceholderFilled />, label: "Menu" },
  { icon: <IconPlaceholder />, activeIcon: <IconPlaceholderFilled />, label: "Menu" },
  { icon: <IconPlaceholder />, activeIcon: <IconPlaceholderFilled />, label: "Menu" },
];

/** Mobile-frame wrapper for BottomNavigation demos */
function DeviceFrame({
  items,
  activeIndex,
  onChange,
}: {
  items: BottomNavigationItem[];
  activeIndex: number;
  onChange?: (i: number) => void;
}) {
  return (
    <div style={{
      width: 320,
      borderRadius: radius.primitive.lg,
      border: "1px solid var(--divider)",
      overflow: "hidden",
      isolation: "isolate",
    }}>
      <BottomNavigation
        items={items}
        activeIndex={activeIndex}
        onChange={onChange}
        style={{ borderRadius: `0 0 ${radius.primitive.lg}px ${radius.primitive.lg}px` }}
      />
    </div>
  );
}

const descText = {
  fontSize: typography.fontSize.sm,
  color: "var(--content-base-secondary)",
  lineHeight: 1.7,
  margin: 0,
} as const;

// ─── Playground ───────────────────────────────────────────────────────────────

function Playground() {
  const [tabCount, setTabCount] = useState<string>("4");
  const [activeIndex, setActiveIndex] = useState(0);

  const count = Number(tabCount);
  const active = Math.min(activeIndex, count - 1);
  const items = ALL_ITEMS.slice(0, count);

  const TAB_LABELS = ["Home", "Search", "Saved", "Alert", "Me"];

  const generateCode = () => {
    const lines = Array.from({ length: count }, (_, i) =>
      `  { icon: <${TAB_LABELS[i]}Icon />, activeIcon: <${TAB_LABELS[i]}FilledIcon />, label: "${TAB_LABELS[i]}" },`
    ).join("\n");
    return `const items: BottomNavigationItem[] = [\n${lines}\n];\n\n<BottomNavigation\n  items={items}\n  activeIndex={activeIndex}\n  onChange={setActiveIndex}\n/>`;
  };

  const tabCountOptions = [
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
  ];

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
            <DeviceFrame items={items} activeIndex={active} onChange={setActiveIndex} />
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
                label="Tab Count"
                options={tabCountOptions}
                value={tabCount}
                onChange={(v) => {
                  setTabCount(v);
                  setActiveIndex((prev) => Math.min(prev, Number(v) - 1));
                }}
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
          <CopyButton text={generateCode()} />
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
          <code>{highlightCode(generateCode())}</code>
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
          <InlineCode>BottomNavigation</InlineCode>은 앱의 최상위 정보 구조를 전환하는 하단 고정 탭 바입니다.
          높이 68px, 상단 1px divider, frosted glass 배경(backdrop-filter blur)으로 콘텐츠 영역과 구분됩니다.
          활성 탭은 채워진(filled) 아이콘과 진한 모노크로매틱 컬러, 비활성 탭은 아웃라인 아이콘과 보조 컬러를 사용합니다.
        </p>
      </Section>

      {/* 2. Anatomy */}
      <Section title="Anatomy">
        <PreviewBox>
          <svg width="500" height="160" viewBox="0 0 500 160" style={{ overflow: "visible" }}>
            {/* Phone chrome */}
            <rect x="50" y="10" width="400" height="140" rx="14" fill="none" stroke="var(--divider)" strokeWidth="1.5" />
            {/* Content area */}
            <rect x="50" y="10" width="400" height="78" rx="14" fill="var(--surface-base-alternative)" />
            {/* Bottom nav bg */}
            <rect x="50" y="88" width="400" height="62" fill="var(--surface-base-default)" />
            {/* Bottom corners fix */}
            <rect x="50" y="136" width="400" height="14" rx="14" fill="var(--surface-base-default)" />
            {/* Divider line */}
            <line x1="50" y1="88" x2="450" y2="88" stroke="var(--border-base-default)" strokeWidth="1" />

            {/* Tab 1 - Active: filled icon, dark monochrome */}
            <g transform="translate(85, 96)">
              <svg x="-12" y="0" width="24" height="24" viewBox="0 0 24 24" fill="var(--content-base-default)">
                <path d="M11.47 2.63a.75.75 0 0 1 1.06 0l8.25 8.25a.75.75 0 0 1-.53 1.28H18v6.09A1.75 1.75 0 0 1 16.25 20H7.75A1.75 1.75 0 0 1 6 18.25v-6.09H3.75a.75.75 0 0 1-.53-1.28l8.25-8.25Z" />
              </svg>
              <text x="0" y="38" textAnchor="middle" fill="var(--content-base-default)" fontSize="10" fontWeight="700">Home</text>
            </g>
            {/* Tab 2 - Inactive */}
            <g transform="translate(185, 96)">
              <svg x="-12" y="0" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--content-base-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <text x="0" y="38" textAnchor="middle" fill="var(--content-base-secondary)" fontSize="10" fontWeight="500">Search</text>
            </g>
            {/* Tab 3 - Inactive */}
            <g transform="translate(285, 96)">
              <svg x="-12" y="0" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--content-base-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
              </svg>
              <text x="0" y="38" textAnchor="middle" fill="var(--content-base-secondary)" fontSize="10" fontWeight="500">Saved</text>
            </g>
            {/* Tab 4 - Inactive */}
            <g transform="translate(385, 96)">
              <svg x="-12" y="0" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--content-base-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
              <text x="0" y="38" textAnchor="middle" fill="var(--content-base-secondary)" fontSize="10" fontWeight="500">Me</text>
            </g>

            {/* Annotations */}
            {/* 1. Container */}
            <line x1="50" y1="65" x2="30" y2="65" stroke="var(--content-base-default)" strokeWidth="1" strokeDasharray="3 2" />
            <circle cx="18" cy="65" r="10" fill="var(--content-base-default)" />
            <text x="18" y="69" textAnchor="middle" fill="white" fontSize="10" fontWeight="700">1</text>
            {/* 2. Active tab */}
            <line x1="85" y1="88" x2="85" y2="72" stroke="var(--content-base-default)" strokeWidth="1" strokeDasharray="3 2" />
            <circle cx="85" cy="60" r="10" fill="var(--content-base-default)" />
            <text x="85" y="64" textAnchor="middle" fill="white" fontSize="10" fontWeight="700">2</text>
            {/* 3. Inactive tab */}
            <line x1="285" y1="88" x2="285" y2="72" stroke="var(--content-base-default)" strokeWidth="1" strokeDasharray="3 2" />
            <circle cx="285" cy="60" r="10" fill="var(--content-base-default)" />
            <text x="285" y="64" textAnchor="middle" fill="white" fontSize="10" fontWeight="700">3</text>
            {/* 4. Divider */}
            <line x1="450" y1="88" x2="470" y2="88" stroke="var(--content-base-default)" strokeWidth="1" strokeDasharray="3 2" />
            <circle cx="482" cy="88" r="10" fill="var(--content-base-default)" />
            <text x="482" y="92" textAnchor="middle" fill="white" fontSize="10" fontWeight="700">4</text>
          </svg>
        </PreviewBox>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[3], marginTop: spacing.primitive[3] }}>
          {[
            ["1", "Container", "전체 너비 고정 영역, 높이 68px"],
            ["2", "Active tab", "채워진 아이콘 + 진한 라벨 (모노크로)"],
            ["3", "Inactive tab", "아웃라인 아이콘 + 보조 컬러 라벨"],
            ["4", "Divider", "상단 1px 구분선"],
          ].map(([num, name, desc]) => (
            <div key={num} style={{ fontSize: typography.fontSize.sm, color: "var(--text-primary)" }}>
              <span style={{ fontWeight: typography.fontWeight.semibold }}>{num}. {name}</span>
              <span style={{ color: "var(--content-base-secondary)", fontWeight: typography.fontWeight.regular }}> — {desc}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* 3. States */}
      <Section title="States">
        <PreviewBox>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[6], width: "100%" }}>
            <DeviceFrame items={ALL_ITEMS.slice(0, 4)} activeIndex={0} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: spacing.primitive[3], width: "100%", maxWidth: 480 }}>
              {[
                { label: "Inactive · Normal", bg: "transparent", color: "var(--content-base-secondary)", active: false },
                { label: "Inactive · Hover", bg: "var(--fill-alternative)", color: "var(--content-base-secondary)", active: false },
                { label: "Inactive · Pressed", bg: "var(--fill-alternative)", color: "var(--content-base-secondary)", active: false },
                { label: "Active · Normal", bg: "transparent", color: "var(--content-base-default)", active: true },
                { label: "Active · Hover", bg: "var(--fill-alternative)", color: "var(--content-base-default)", active: true },
                { label: "Active · Pressed", bg: "var(--fill-alternative)", color: "var(--content-base-default)", active: true },
              ].map(({ label, bg, color, active }) => (
                <div key={label} style={{
                  height: 52,
                  borderRadius: radius.primitive.sm,
                  border: "1px solid var(--divider)",
                  backgroundColor: bg,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 3,
                  color,
                }}>
                  {active ? <HomeFilledIcon /> : <HomeIcon />}
                  <span style={{ fontSize: typography.fontSize["3xs"], fontWeight: active ? typography.fontWeight.semibold : typography.fontWeight.medium, color }}>Home</span>
                  <span style={{ fontSize: 9, color: "var(--content-base-secondary)", marginTop: 1 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* 4. Usage Guidelines */}
      <Section title="Usage Guidelines">
        <p style={{ ...descText, marginBottom: spacing.primitive[5] }}>
          2–5개 탭으로 구성하고 라벨은 6자 이내를 권장합니다.
          앱의 최상위 정보 구조(1st-depth) 전환에만 사용하며, 서브 페이지나 모달 위에서는 사용하지 않습니다.
        </p>
        <Subsection title="Best Practices">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
            <DoCard>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[3] }}>
                <DeviceFrame items={ALL_ITEMS.slice(0, 4)} activeIndex={1} />
                <p style={{ ...descText, fontSize: typography.fontSize.compact, textAlign: "center" }}>
                  1st-depth 페이지에 배치, active/inactive 컬러 체계 일관 유지
                </p>
              </div>
            </DoCard>
            <DontCard>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[3] }}>
                <div style={{ width: 320, border: "1px solid var(--divider)", borderRadius: radius.primitive.md, overflow: "hidden" }}>
                  <div style={{ height: 120, backgroundColor: "var(--surface-base-alternative)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--content-base-secondary)", fontSize: typography.fontSize.compact }}>
                    Page Content
                  </div>
                  {/* Mock bad custom colors */}
                  <div style={{ height: 58, display: "flex", borderTop: "1px solid var(--divider)" }}>
                    {[
                      { label: "Home", color: "var(--content-brand-default)" },
                      { label: "Search", color: "var(--content-error-default)" },
                      { label: "Saved", color: "var(--content-success-default)" },
                      { label: "Me", color: "var(--content-warning-default)" },
                    ].map(({ label, color }) => (
                      <div key={label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3, color, fontSize: 10, fontWeight: 600 }}>
                        ●<span>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <p style={{ ...descText, fontSize: typography.fontSize.compact, textAlign: "center" }}>
                  각 탭마다 임의의 active 컬러를 다르게 지정하지 않습니다
                </p>
              </div>
            </DontCard>
          </div>
        </Subsection>
        <Subsection title="Principles">
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[3] }}>
            <PrincipleCard number={1} title="계층 전환 전용" desc="1st-depth 화면 전환에만 사용합니다. 서브 페이지, 모달, 드로어 내부에는 배치하지 않습니다." />
            <PrincipleCard number={2} title="2–5개 탭" desc="탭은 최소 2개, 최대 5개를 권장합니다. 5개를 초과하면 IA를 재정의하거나 다른 탐색 패턴을 검토하세요." />
            <PrincipleCard number={3} title="간결한 라벨" desc="아이콘과 의미가 일치하는 짧은 단어를 사용하세요. 6자 이내가 이상적이며 잘림(ellipsis) 없이 표시되어야 합니다." />
          </div>
        </Subsection>
      </Section>

      {/* 5. Design Tokens */}
      <Section title="Design Tokens">
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
                ["--surface-base-default", "Container 배경"],
                ["--border-base-default", "상단 1px divider 선"],
                ["--content-base-default", "활성 탭 아이콘 + 라벨 컬러 (모노크로매틱)"],
                ["--content-base-secondary", "비활성 탭 아이콘 + 라벨 컬러"],
                ["--fill-alternative", "탭 hover/pressed 배경"],
              ].map(([token, usage], i, arr) => (
                <tr key={token}>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, borderBottom: i < arr.length - 1 ? "1px solid var(--divider)" : "none" }}>
                    <InlineCode>{token}</InlineCode>
                  </td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, borderBottom: i < arr.length - 1 ? "1px solid var(--divider)" : "none", color: "var(--content-base-secondary)" }}>
                    {usage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* 6. Accessibility */}
      <Section title="Accessibility">
        <ul style={{ margin: 0, paddingLeft: spacing.primitive[5], color: "var(--content-base-secondary)", fontSize: typography.fontSize.sm, lineHeight: 1.8 }}>
          <li>컨테이너에 <InlineCode>role="tablist"</InlineCode>과 <InlineCode>aria-label="하단 탭 바"</InlineCode>가 자동 적용됩니다.</li>
          <li>각 탭은 <InlineCode>role="tab"</InlineCode>과 <InlineCode>aria-selected</InlineCode>로 상태를 전달합니다.</li>
          <li>활성 탭에만 <InlineCode>tabIndex=0</InlineCode>이 적용되어 키보드 포커스를 받을 수 있습니다.</li>
          <li>아이콘만으로 의미가 불명확할 수 있으므로 <InlineCode>label</InlineCode> prop을 항상 제공합니다.</li>
        </ul>
      </Section>

      {/* 7. Related Components */}
      <Section title="Related Components">
        <p style={descText}>
          페이지 내 섹션 제목은 <InlineCode>SectionHeader</InlineCode>를, 목록 아이템은 <InlineCode>ListCell</InlineCode>을 함께 사용해 정보 계층을 구성합니다.
          아이콘 전용 탭 동작이 필요한 경우 <InlineCode>IconButton</InlineCode>을 참고하세요.
        </p>
      </Section>
    </div>
  );
}

// ─── Web Content ──────────────────────────────────────────────────────────────

const bottomNavProps: PropItem[] = [
  { name: "items", type: "BottomNavigationItem[]", required: true, description: "탭 목록 (2–5개)" },
  { name: "activeIndex", type: "number", required: true, description: "현재 활성 탭 인덱스" },
  { name: "onChange", type: "(index: number) => void", required: false, description: "탭 변경 핸들러" },
  { name: "className", type: "string", required: false, description: "커스텀 CSS 클래스" },
  { name: "style", type: "CSSProperties", required: false, description: "컨테이너 인라인 스타일" },
];

const bottomNavItemProps: PropItem[] = [
  { name: "icon", type: "ReactNode", required: true, description: "기본(비활성) 상태 아이콘" },
  { name: "activeIcon", type: "ReactNode", required: false, description: "활성 상태 아이콘 (없으면 icon 사용)" },
  { name: "label", type: "string", required: true, description: "탭 라벨 (6자 이내 권장)" },
  { name: "onClick", type: "() => void", required: false, description: "개별 탭 클릭 핸들러" },
];

function WebContent() {
  const basicCode = `import { BottomNavigation } from '@baerae-zkap/design-system';
import type { BottomNavigationItem } from '@baerae-zkap/design-system';

const items: BottomNavigationItem[] = [
  { icon: <HomeIcon />, activeIcon: <HomeFilledIcon />, label: "Home" },
  { icon: <SearchIcon />, activeIcon: <SearchFilledIcon />, label: "Search" },
  { icon: <BookmarkIcon />, activeIcon: <BookmarkFilledIcon />, label: "Saved" },
  { icon: <UserIcon />, activeIcon: <UserFilledIcon />, label: "Me" },
];

export function App() {
  const [active, setActive] = useState(0);
  return (
    <BottomNavigation
      items={items}
      activeIndex={active}
      onChange={setActive}
    />
  );
}`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>

      <Section title="Source Code">
        <a
          href="https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system/src/components/BottomNavigation/BottomNavigation.tsx"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: typography.fontSize.sm, color: "var(--content-brand-default)", textDecoration: "underline", textUnderlineOffset: 3 }}
        >
          BottomNavigation/BottomNavigation.tsx
        </a>
      </Section>

      <Section title="Import">
        <CodeBlock code={`import { BottomNavigation } from '@baerae-zkap/design-system';\nimport type { BottomNavigationItem } from '@baerae-zkap/design-system';`} />
      </Section>

      <Section title="Basic Usage">
        <PreviewBox>
          <DeviceFrame items={ALL_ITEMS.slice(0, 4)} activeIndex={0} />
        </PreviewBox>
        <CodeBlock code={basicCode} />
      </Section>

      <Section title="API Reference">
        <Subsection title="BottomNavigationProps">
          <PropsTable props={bottomNavProps} />
        </Subsection>
        <Subsection title="BottomNavigationItem">
          <PropsTable props={bottomNavItemProps} />
        </Subsection>
      </Section>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BottomNavigationPage() {
  return (
    <div style={{ maxWidth: 840 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Navigations" },
          { label: "Bottom Navigation" },
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
        Bottom Navigation
      </h1>
      <p style={{ ...descText, fontSize: typography.fontSize.md, marginBottom: spacing.primitive[8] }}>
        하단 고정 탭 바로 앱의 최상위 섹션을 전환합니다. 2–5개 탭과 frosted glass 배경으로 구성됩니다.
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
