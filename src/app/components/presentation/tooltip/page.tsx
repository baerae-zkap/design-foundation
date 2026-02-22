"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  PlatformTabs,
  CodeBlock,
  PreviewBox,
  type Platform,
} from "@/components/PlatformTabs";
import { typography, spacing, radius, Button, Tooltip } from "@baerae-zkap/design-system";
import type { TooltipPosition, TooltipSize, TooltipMode } from "@baerae-zkap/design-system";
import { Section, Subsection, InlineCode } from "@/components/docs/Section";
import { PropsTable, type PropItem } from "@/components/docs/PropsTable";
import { DoCard, DontCard, PrincipleCard } from "@/components/docs/Cards";
import { RadioGroup } from "@/components/docs/Playground";

// ─── Shared Style ─────────────────────────────────────────────────────────────

const descText = {
  fontSize: typography.fontSize.sm,
  color: "var(--content-base-secondary)",
  lineHeight: 1.7,
  margin: 0,
} as const;

// ─── Inline Mock Tooltip (for static design previews) ────────────────────────

function MockTooltip({
  label = "Tooltip label",
  position = "bottom",
  size = "medium",
  shortcut,
}: {
  label?: string;
  position?: string;
  size?: TooltipSize;
  shortcut?: string;
}) {
  const sizeConfig = {
    small: { fontSize: typography.fontSize.xs, padding: `${spacing.primitive[2]}px ${spacing.primitive[2] + 2}px` },
    medium: { fontSize: typography.fontSize.sm, padding: `${spacing.primitive[2]}px ${spacing.primitive[2] + 2}px` },
  };
  const config = sizeConfig[size];
  const basePos = position.split("-")[0];

  // Arrow styles by position
  const arrowStyles: Record<string, React.CSSProperties> = {
    top: {
      position: "absolute", bottom: -6, left: "50%", transform: "translateX(-50%)",
      width: 0, height: 0,
      borderLeft: "6px solid transparent", borderRight: "6px solid transparent",
      borderTop: "6px solid var(--content-base-default)",
    },
    bottom: {
      position: "absolute", top: -6, left: "50%", transform: "translateX(-50%)",
      width: 0, height: 0,
      borderLeft: "6px solid transparent", borderRight: "6px solid transparent",
      borderBottom: "6px solid var(--content-base-default)",
    },
    left: {
      position: "absolute", right: -6, top: "50%", transform: "translateY(-50%)",
      width: 0, height: 0,
      borderTop: "6px solid transparent", borderBottom: "6px solid transparent",
      borderLeft: "6px solid var(--content-base-default)",
    },
    right: {
      position: "absolute", left: -6, top: "50%", transform: "translateY(-50%)",
      width: 0, height: 0,
      borderTop: "6px solid transparent", borderBottom: "6px solid transparent",
      borderRight: "6px solid var(--content-base-default)",
    },
  };

  return (
    <div style={{
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: spacing.primitive[1],
      backgroundColor: "var(--content-base-default)",
      color: "var(--surface-base-default)",
      fontSize: config.fontSize,
      fontWeight: typography.fontWeight.medium,
      lineHeight: 1.4,
      padding: config.padding,
      borderRadius: radius.primitive.md,
      maxWidth: 280,
      whiteSpace: "nowrap",
      textAlign: "center",
    }}>
      <span>{label}</span>
      {shortcut && (
        <span style={{
          marginLeft: spacing.primitive[1],
          padding: `1px ${spacing.primitive[1]}px`,
          border: "1px solid currentColor",
          borderRadius: radius.primitive.xs,
          fontSize: typography.fontSize.xs,
          fontFamily: "monospace",
          opacity: 0.7,
          lineHeight: 1.2,
        }}>
          {shortcut}
        </span>
      )}
      <div style={arrowStyles[basePos] || arrowStyles.bottom} />
    </div>
  );
}

// ─── Trigger Button Mock ─────────────────────────────────────────────────────

function MockTrigger({ label = "Hover me" }: { label?: string }) {
  return (
    <div style={{
      padding: `${spacing.primitive[2]}px ${spacing.primitive[4]}px`,
      backgroundColor: "var(--surface-base-default)",
      border: "1px solid var(--divider)",
      borderRadius: radius.primitive.md,
      fontSize: typography.fontSize.sm,
      color: "var(--content-base-default)",
      fontWeight: typography.fontWeight.medium,
      textAlign: "center",
    }}>
      {label}
    </div>
  );
}

// ─── Position Demo Cell ──────────────────────────────────────────────────────

function PositionDemo({ pos, label }: { pos: string; label: string }) {
  // Layout: position tooltip relative to trigger
  const isTop = pos.startsWith("top");
  const isBottom = pos.startsWith("bottom");
  const isLeft = pos === "left";
  const isRight = pos === "right";

  const flexDir = isTop ? "column" : isBottom ? "column-reverse" : isLeft ? "row" : "row-reverse";

  return (
    <div style={{
      display: "flex",
      flexDirection: flexDir as React.CSSProperties["flexDirection"],
      alignItems: "center",
      gap: spacing.primitive[2],
    }}>
      <MockTrigger label={label} />
      <MockTooltip label={pos} position={pos} size="small" />
    </div>
  );
}

// ─── Playground ───────────────────────────────────────────────────────────────

function Playground() {
  const [position, setPosition] = useState<TooltipPosition>("bottom");
  const [size, setSize] = useState<TooltipSize>("medium");
  const [mode, setMode] = useState<TooltipMode>("hover");
  const [shortcutText, setShortcutText] = useState("");

  return (
    <div style={{ marginBottom: spacing.primitive[8] }}>
      <div style={{ borderRadius: radius.primitive.xl, overflow: "hidden", backgroundColor: "var(--surface-base-alternative)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", minHeight: 340 }}>
          {/* Preview */}
          <div style={{ padding: spacing.primitive[8], display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Tooltip
              label="Tooltip 내용입니다"
              position={position}
              size={size}
              mode={mode}
              shortcut={shortcutText || undefined}
            >
              <Button buttonType="weak" color="neutral" size="medium" onClick={() => {}}>
                트리거 버튼
              </Button>
            </Tooltip>
          </div>

          {/* Controls */}
          <div style={{ backgroundColor: "var(--surface-base-alternative)", display: "flex", flexDirection: "column", padding: spacing.primitive[4], overflow: "hidden", height: "100%", boxSizing: "border-box" }}>
            <div style={{ flex: 1, minHeight: 0, padding: spacing.primitive[6], overflowY: "auto", display: "flex", flexDirection: "column", gap: spacing.primitive[6], backgroundColor: "var(--surface-base-default)", borderRadius: radius.primitive.lg }}>
              <RadioGroup
                label="Position"
                value={position}
                onChange={(v) => setPosition(v as TooltipPosition)}
                options={[
                  { value: "top", label: "Top" },
                  { value: "bottom", label: "Bottom" },
                  { value: "left", label: "Left" },
                  { value: "right", label: "Right" },
                  { value: "top-start", label: "Top Start" },
                  { value: "top-end", label: "Top End" },
                  { value: "bottom-start", label: "Bottom Start" },
                  { value: "bottom-end", label: "Bottom End" },
                ]}
              />
              <RadioGroup
                label="Size"
                value={size}
                onChange={(v) => setSize(v as TooltipSize)}
                options={[
                  { value: "small", label: "Small" },
                  { value: "medium", label: "Medium" },
                ]}
              />
              <RadioGroup
                label="Mode"
                value={mode}
                onChange={(v) => setMode(v as TooltipMode)}
                options={[
                  { value: "hover", label: "Hover" },
                  { value: "click", label: "Click" },
                  { value: "always", label: "Always" },
                ]}
              />
              <div>
                <div style={{ fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.semibold, color: "var(--content-base-secondary)", marginBottom: spacing.primitive[2] }}>
                  Shortcut
                </div>
                <input
                  type="text"
                  value={shortcutText}
                  onChange={(e) => setShortcutText(e.target.value)}
                  placeholder="e.g. Ctrl+S"
                  style={{
                    width: "100%",
                    padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`,
                    fontSize: typography.fontSize.sm,
                    border: "1px solid var(--divider)",
                    borderRadius: radius.primitive.md,
                    backgroundColor: "var(--surface-base-default)",
                    color: "var(--content-base-default)",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
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
          <InlineCode>Tooltip</InlineCode>은 UI 요소에 커서를 올리면 나타나는 간결한 정보 레이블입니다.
          버튼, 아이콘 등의 요소에 추가 설명이나 키보드 단축키 힌트를 제공할 때 사용합니다.
        </p>
      </Section>

      {/* 2. Anatomy */}
      <Section title="Anatomy">
        <PreviewBox>
          <div style={{ display: "flex", justifyContent: "center", padding: `${spacing.primitive[6]}px 0` }}>
            <MockTooltip label="Tooltip label" shortcut="Ctrl+S" position="bottom" />
          </div>
        </PreviewBox>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[3], marginTop: spacing.primitive[4] }}>
          {[
            ["1", "Container", "둥근 모서리의 inverse 배경 컨테이너"],
            ["2", "Arrow", "트리거 요소를 가리키는 삼각형 화살표"],
            ["3", "Label", "간결한 텍스트 레이블"],
            ["4", "Shortcut badge", "(선택) 키보드 단축키 배지"],
          ].map(([num, name, desc]) => (
            <div key={num} style={{ fontSize: typography.fontSize.sm }}>
              <span style={{ fontWeight: typography.fontWeight.semibold }}>{num}. {name}</span>
              <span style={{ color: "var(--content-base-secondary)" }}> &mdash; {desc}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* 3. Variants */}
      <Section title="Variants">
        <Subsection title="Size">
          <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
            2가지 크기를 제공합니다. 작은 아이콘 옆에는 <InlineCode>small</InlineCode>,
            일반적인 경우 <InlineCode>medium</InlineCode>을 사용합니다.
          </p>
          <PreviewBox>
            <div style={{ display: "flex", gap: spacing.primitive[8], alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
                <MockTooltip label="Small tooltip" size="small" position="bottom" />
                <span style={{ fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)", fontWeight: typography.fontWeight.medium }}>Small (12px)</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
                <MockTooltip label="Medium tooltip" size="medium" position="bottom" />
                <span style={{ fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)", fontWeight: typography.fontWeight.medium }}>Medium (14px)</span>
              </div>
            </div>
          </PreviewBox>
        </Subsection>

        <Subsection title="Mode">
          <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
            3가지 트리거 모드를 지원합니다.
          </p>
          <div style={{ overflow: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
              <thead>
                <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                  {["Mode", "Trigger", "Description"].map((h) => (
                    <th key={h} style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, textAlign: "left", borderBottom: "1px solid var(--divider)", fontWeight: typography.fontWeight.medium }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["hover", "Mouse enter / Focus", "가장 일반적. 마우스 오버 또는 포커스 시 표시"],
                  ["click", "Click / Tap", "클릭으로 토글. 외부 클릭 시 닫힘"],
                  ["always", "None (자동)", "항상 표시. 온보딩 힌트 등에 사용"],
                ].map(([mode, trigger, desc], i, arr) => (
                  <tr key={mode}>
                    <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, borderBottom: i < arr.length - 1 ? "1px solid var(--divider)" : "none", fontWeight: typography.fontWeight.medium }}>{mode}</td>
                    <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, borderBottom: i < arr.length - 1 ? "1px solid var(--divider)" : "none", color: "var(--content-base-secondary)" }}>{trigger}</td>
                    <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, borderBottom: i < arr.length - 1 ? "1px solid var(--divider)" : "none", color: "var(--content-base-secondary)" }}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Subsection>
      </Section>

      {/* 4. Position */}
      <Section title="Position">
        <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
          8가지 방향을 지원합니다. 기본값은 <InlineCode>bottom</InlineCode>입니다.
        </p>
        <PreviewBox>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: spacing.primitive[4], padding: spacing.primitive[4] }}>
            {(["top", "bottom", "left", "right", "top-start", "top-end", "bottom-start", "bottom-end"] as const).map((pos) => (
              <div key={pos} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
                <PositionDemo pos={pos} label={pos} />
              </div>
            ))}
          </div>
        </PreviewBox>
      </Section>

      {/* 5. States */}
      <Section title="States">
        <Subsection title="Interaction States">
          <div style={{ overflow: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
              <thead>
                <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                  {["State", "Description"].map((h) => (
                    <th key={h} style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, textAlign: "left", borderBottom: "1px solid var(--divider)", fontWeight: typography.fontWeight.medium }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Hidden", "기본 상태. 트리거 이벤트 대기"],
                  ["Visible", "150ms fade + scale 애니메이션으로 나타남"],
                  ["Dismissed", "Escape 키 또는 마우스 아웃으로 사라짐"],
                  ["Disabled", "disabled prop이 true이면 표시되지 않음"],
                ].map(([state, desc], i, arr) => (
                  <tr key={state}>
                    <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, borderBottom: i < arr.length - 1 ? "1px solid var(--divider)" : "none", fontWeight: typography.fontWeight.medium }}>{state}</td>
                    <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, borderBottom: i < arr.length - 1 ? "1px solid var(--divider)" : "none", color: "var(--content-base-secondary)" }}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Subsection>
      </Section>

      {/* 6. Usage Guidelines */}
      <Section title="Usage Guidelines">
        <Subsection title="Best Practices">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
            <DoCard>
              <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[3], alignItems: "center" }}>
                <MockTooltip label="복사하기" size="small" position="top" />
                <p style={{ ...descText, fontSize: typography.fontSize.compact, textAlign: "center" }}>
                  아이콘 버튼에 짧고 명확한 레이블을 제공하세요.
                </p>
              </div>
            </DoCard>
            <DontCard>
              <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[3], alignItems: "center" }}>
                <MockTooltip label="이 버튼을 클릭하면 현재 선택된 텍스트가 클립보드에 복사되어 다른 곳에 붙여넣기 할 수 있습니다." size="small" position="top" />
                <p style={{ ...descText, fontSize: typography.fontSize.compact, textAlign: "center" }}>
                  긴 설명을 넣지 마세요. Popover를 사용하세요.
                </p>
              </div>
            </DontCard>
          </div>
        </Subsection>
        <Subsection title="Principles">
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[3] }}>
            <PrincipleCard number={1} title="간결함" desc="Tooltip은 1-2줄 이내의 짧은 텍스트에 적합합니다. 긴 설명이 필요하면 Popover를 사용하세요." />
            <PrincipleCard number={2} title="보조적 역할" desc="핵심 정보는 Tooltip 없이도 이해할 수 있어야 합니다. 필수 정보를 Tooltip에만 넣지 마세요." />
            <PrincipleCard number={3} title="일관된 위치" desc="같은 맥락의 요소들은 동일한 position을 사용하세요. 혼재하면 시각적으로 불안정합니다." />
          </div>
        </Subsection>
      </Section>

      {/* 7. Design Tokens */}
      <Section title="Design Tokens">
        <div style={{ overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, textAlign: "left", borderBottom: "1px solid var(--divider)", fontWeight: typography.fontWeight.medium }}>Token</th>
                <th style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, textAlign: "left", borderBottom: "1px solid var(--divider)", fontWeight: typography.fontWeight.medium }}>Usage</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["--content-base-default", "컨테이너 배경 (inverse)"],
                ["--surface-base-default", "텍스트 색상 (inverse)"],
                ["radius.primitive.md", "컨테이너 border-radius (8px)"],
                ["typography.fontSize.xs", "Small 크기 폰트 (12px)"],
                ["typography.fontSize.sm", "Medium 크기 폰트 (14px)"],
                ["typography.fontWeight.medium", "텍스트 weight"],
                ["spacing.primitive[2]", "내부 패딩 (8px)"],
                ["zIndex.toast", "z-index (1200)"],
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

      {/* 8. Accessibility */}
      <Section title="Accessibility">
        <ul style={{ margin: 0, paddingLeft: spacing.primitive[5], color: "var(--content-base-secondary)", fontSize: typography.fontSize.sm, lineHeight: 1.8 }}>
          <li>Tooltip에 <InlineCode>role=&quot;tooltip&quot;</InlineCode>이 설정됩니다.</li>
          <li>트리거 요소에 <InlineCode>aria-describedby</InlineCode>로 Tooltip ID가 연결됩니다.</li>
          <li>Escape 키로 Tooltip을 닫을 수 있습니다 (hover/click 모드).</li>
          <li>키보드 포커스(Tab)로 hover 모드의 Tooltip을 활성화할 수 있습니다.</li>
          <li>Tooltip은 <InlineCode>pointerEvents: none</InlineCode>으로 마우스 상호작용을 차단하지 않습니다.</li>
        </ul>
      </Section>

      {/* 9. Related Components */}
      <Section title="Related Components">
        <p style={descText}>
          더 복잡한 정보 표시에는 <InlineCode>Popover</InlineCode>를 사용하세요.
          모달 확인이 필요하면 <InlineCode>AlertDialog</InlineCode>를 사용하세요.
        </p>
      </Section>
    </div>
  );
}

// ─── Web Content ──────────────────────────────────────────────────────────────

const webProps: PropItem[] = [
  { name: "label", type: "string", required: true, description: "Tooltip에 표시할 텍스트" },
  { name: "children", type: "ReactElement", required: true, description: "트리거 요소" },
  { name: "position", type: "TooltipPosition", required: false, description: '표시 방향 (기본: "bottom")' },
  { name: "size", type: '"small" | "medium"', required: false, description: '크기 (기본: "medium")' },
  { name: "mode", type: '"hover" | "always" | "click"', required: false, description: '트리거 모드 (기본: "hover")' },
  { name: "shortcut", type: "string", required: false, description: "키보드 단축키 배지 텍스트" },
  { name: "defaultOpen", type: "boolean", required: false, description: "비제어 모드 초기 열림 여부" },
  { name: "open", type: "boolean", required: false, description: "제어 모드: 열림 상태" },
  { name: "onOpenChange", type: "(open: boolean) => void", required: false, description: "제어 모드: 상태 변경 콜백" },
  { name: "disabled", type: "boolean", required: false, description: "비활성화 (기본: false)" },
];

function WebContent() {
  const basicCode = `import { Tooltip, IconButton } from '@baerae-zkap/design-system';

function App() {
  return (
    <Tooltip label="복사하기" position="top">
      <IconButton aria-label="복사">
        <CopyIcon />
      </IconButton>
    </Tooltip>
  );
}`;

  const shortcutCode = `<Tooltip label="저장" shortcut="Ctrl+S" position="bottom">
  <Button buttonType="filled" color="primary" onClick={handleSave}>
    저장
  </Button>
</Tooltip>`;

  const modeCode = `// Hover (기본): 마우스 오버 시 표시
<Tooltip label="정보" mode="hover">
  <InfoIcon />
</Tooltip>

// Click: 클릭으로 토글
<Tooltip label="도움말" mode="click">
  <HelpIcon />
</Tooltip>

// Always: 항상 표시 (온보딩 힌트)
<Tooltip label="여기를 눌러보세요!" mode="always">
  <Button>시작하기</Button>
</Tooltip>`;

  const controlledCode = `function ControlledExample() {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip
      label="제어 모드 Tooltip"
      open={open}
      onOpenChange={setOpen}
    >
      <Button onClick={() => setOpen(!open)}>토글</Button>
    </Tooltip>
  );
}`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>

      <Section title="Source Code">
        <a
          href="https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system/src/components/Tooltip/Tooltip.tsx"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: typography.fontSize.sm, color: "var(--content-brand-default)", textDecoration: "underline", textUnderlineOffset: 3 }}
        >
          Tooltip/Tooltip.tsx
        </a>
      </Section>

      <Section title="Import">
        <CodeBlock code={`import { Tooltip } from '@baerae-zkap/design-system';
import type { TooltipProps, TooltipPosition, TooltipSize, TooltipMode } from '@baerae-zkap/design-system';`} />
      </Section>

      <Section title="Basic Usage">
        <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
          <InlineCode>Tooltip</InlineCode>은 트리거 요소를 감싸서 사용합니다.
          <InlineCode>label</InlineCode>에 표시할 텍스트를 전달하세요.
        </p>
        <CodeBlock code={basicCode} />
      </Section>

      <Section title="With Shortcut">
        <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
          <InlineCode>shortcut</InlineCode> prop으로 키보드 단축키 배지를 추가할 수 있습니다.
        </p>
        <CodeBlock code={shortcutCode} />
      </Section>

      <Section title="Trigger Modes">
        <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
          <InlineCode>mode</InlineCode> prop으로 Tooltip 트리거 방식을 지정합니다.
        </p>
        <CodeBlock code={modeCode} />
      </Section>

      <Section title="Controlled Mode">
        <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
          <InlineCode>open</InlineCode>과 <InlineCode>onOpenChange</InlineCode>로 외부에서 상태를 제어할 수 있습니다.
        </p>
        <CodeBlock code={controlledCode} />
      </Section>

      <Section title="API Reference">
        <Subsection title="TooltipProps">
          <PropsTable props={webProps} />
        </Subsection>
        <Subsection title="TooltipPosition">
          <p style={descText}>
            <InlineCode>&apos;top&apos; | &apos;bottom&apos; | &apos;left&apos; | &apos;right&apos; | &apos;top-start&apos; | &apos;top-end&apos; | &apos;bottom-start&apos; | &apos;bottom-end&apos;</InlineCode>
          </p>
        </Subsection>
      </Section>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function TooltipPage() {
  return (
    <div style={{ maxWidth: 840 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Presentation" },
          { label: "Tooltip" },
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
        Tooltip
      </h1>
      <p style={{
        fontSize: typography.fontSize.md,
        color: "var(--content-base-secondary)",
        lineHeight: 1.7,
        margin: 0,
        marginBottom: spacing.primitive[8],
      }}>
        특정 UI 요소 위에 간략한 레이블이나 추가 정보를 제공하는 컴포넌트입니다.
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
