"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  PlatformTabs,
  CodeBlock,
  PreviewBox,
  type Platform,
} from "@/components/PlatformTabs";
import { typography, spacing, radius, Button, TextButton } from "@baerae-zkap/design-system";
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

// ─── Inline Popover (docs-only) ───────────────────────────────────────────────

function PopoverBox({
  heading,
  description,
  action,
  subAction,
  showClose = false,
  onClose,
}: {
  heading?: string;
  description: string;
  action?: React.ReactNode;
  subAction?: React.ReactNode;
  showClose?: boolean;
  onClose?: () => void;
}) {
  const hasActions = Boolean(action || subAction);

  return (
    <div style={{
      position: "relative",
      display: "inline-block",
      maxWidth: 280,
      width: "100%",
      backgroundColor: "var(--surface-base-default)",
      borderRadius: radius.primitive.xl,
      padding: `${spacing.primitive[5]}px`,
      boxShadow: "var(--shadow-semantic-card-floating)",
      boxSizing: "border-box",
    }}>
      {/* Close button */}
      {showClose && (
        <button
          onClick={onClose}
          aria-label="닫기"
          style={{
            position: "absolute",
            top: spacing.primitive[3],
            right: spacing.primitive[3],
            width: 24, height: 24,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "none", border: "none", cursor: "pointer",
            color: "var(--content-base-secondary)",
            borderRadius: radius.primitive.full,
            padding: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}

      {/* Heading */}
      {heading && (
        <div style={{
          fontSize: typography.fontSize.md,
          fontWeight: typography.fontWeight.bold,
          color: "var(--content-base-default)",
          lineHeight: 1.4,
          marginBottom: spacing.primitive[2],
          paddingRight: showClose ? spacing.primitive[7] : 0,
        }}>
          {heading}
        </div>
      )}

      {/* Description */}
      <div style={{
        fontSize: typography.fontSize.sm,
        color: "var(--content-base-secondary)",
        lineHeight: 1.6,
        paddingRight: showClose && !heading ? spacing.primitive[7] : 0,
      }}>
        {description}
      </div>

      {/* Actions */}
      {hasActions && (
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: subAction ? "space-between" : "flex-end",
          marginTop: spacing.primitive[4],
          gap: spacing.primitive[2],
        }}>
          {subAction && <div>{subAction}</div>}
          {action && <div>{action}</div>}
        </div>
      )}
    </div>
  );
}

// ─── Playground ───────────────────────────────────────────────────────────────

function Playground() {
  const [open, setOpen] = useState(false);
  const [showHeading, setShowHeading] = useState(true);
  const [showClose, setShowClose] = useState(true);
  const [showAction, setShowAction] = useState(true);
  const [showSubAction, setShowSubAction] = useState(false);

  return (
    <div style={{ marginBottom: spacing.primitive[8] }}>
      <div style={{ borderRadius: radius.primitive.xl, overflow: "hidden", backgroundColor: "var(--surface-base-alternative)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", height: 480 }}>
          {/* Preview */}
          <div style={{ padding: spacing.primitive[8], display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[3] }}>
              <Button buttonType="filled" color="primary" size="medium" onClick={() => setOpen(v => !v)}>
                {open ? "팝오버 닫기" : "팝오버 열기"}
              </Button>
              {open && (
                <PopoverBox
                  heading={showHeading ? "새로운 기능이에요" : undefined}
                  description="이제 알림을 설정하고 중요한 내용을 놓치지 않을 수 있어요."
                  showClose={showClose}
                  onClose={() => setOpen(false)}
                  action={showAction ? (
                    <TextButton color="primary" onClick={() => setOpen(false)}>확인했어요</TextButton>
                  ) : undefined}
                  subAction={showSubAction ? (
                    <TextButton color="muted" onClick={() => setOpen(false)}>나중에</TextButton>
                  ) : undefined}
                />
              )}
            </div>
          </div>

          {/* Controls */}
          <div style={{ backgroundColor: "var(--surface-base-alternative)", display: "flex", flexDirection: "column", padding: spacing.primitive[4], overflow: "hidden", height: "100%", boxSizing: "border-box" }}>
            <div style={{ flex: 1, minHeight: 0, padding: spacing.primitive[6], overflowY: "auto", display: "flex", flexDirection: "column", gap: spacing.primitive[6], backgroundColor: "var(--surface-base-default)", borderRadius: radius.primitive.lg }}>
              <RadioGroup
                label="Heading"
                value={showHeading ? "true" : "false"}
                onChange={(v) => setShowHeading(v === "true")}
                options={[{ value: "true", label: "On" }, { value: "false", label: "Off" }]}
              />
              <RadioGroup
                label="Close"
                value={showClose ? "true" : "false"}
                onChange={(v) => setShowClose(v === "true")}
                options={[{ value: "true", label: "On" }, { value: "false", label: "Off" }]}
              />
              <RadioGroup
                label="Action"
                value={showAction ? "true" : "false"}
                onChange={(v) => setShowAction(v === "true")}
                options={[{ value: "true", label: "On" }, { value: "false", label: "Off" }]}
              />
              <RadioGroup
                label="Sub Action"
                value={showSubAction ? "true" : "false"}
                onChange={(v) => setShowSubAction(v === "true")}
                options={[{ value: "true", label: "On" }, { value: "false", label: "Off" }]}
              />
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
          <InlineCode>Popover</InlineCode>는 트리거 요소 근처에 떠오르는 작은 정보 패널입니다.
          기능 안내, 온보딩 힌트, 컨텍스트 설명 등 현재 화면 흐름을 방해하지 않는 보조 정보를 전달할 때 사용합니다.
        </p>
      </Section>

      {/* 2. Anatomy */}
      <Section title="Anatomy">
        <PreviewBox>
          <div style={{ display: "flex", justifyContent: "center", padding: `${spacing.primitive[6]}px 0` }}>
            <PopoverBox
              heading="새로운 기능이에요"
              description="이제 알림을 설정하고 중요한 내용을 놓치지 않을 수 있어요."
              showClose
              action={<TextButton color="primary">확인했어요</TextButton>}
              subAction={<TextButton color="muted">나중에</TextButton>}
            />
          </div>
        </PreviewBox>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[3], marginTop: spacing.primitive[4] }}>
          {[
            ["1", "Container", "팝오버의 외곽 카드 영역"],
            ["2", "Arrow", "트리거 요소를 가리키는 화살표"],
            ["3", "Close button", "X 닫기 버튼 (optional)"],
            ["4", "Heading", "제목 텍스트 (optional)"],
            ["5", "Description", "본문 설명 텍스트"],
            ["6", "Sub action", "보조 텍스트 버튼 (optional)"],
            ["7", "Action", "주요 CTA 버튼 (optional)"],
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
        <Subsection title="Heading">
          <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
            제목은 선택 사항입니다. 설명만으로 충분할 경우 생략하세요.
          </p>
          <PreviewBox>
            <div style={{ display: "flex", gap: spacing.primitive[6], alignItems: "flex-start", flexWrap: "wrap" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
                <PopoverBox
                  heading="새로운 기능이에요"
                  description="알림을 설정하면 중요한 내용을 놓치지 않아요."
                />
                <span style={{ fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)", fontWeight: typography.fontWeight.medium }}>With Heading</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
                <PopoverBox
                  description="알림을 설정하면 중요한 내용을 놓치지 않아요."
                />
                <span style={{ fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)", fontWeight: typography.fontWeight.medium }}>Description Only</span>
              </div>
            </div>
          </PreviewBox>
        </Subsection>

        <Subsection title="Close Button">
          <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
            항상 노출되는 팝오버(Always on)에는 닫기 버튼을 제공하세요.
          </p>
          <PreviewBox>
            <div style={{ display: "flex", gap: spacing.primitive[6], alignItems: "flex-start", flexWrap: "wrap" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
                <PopoverBox
                  heading="새로운 기능"
                  description="알림을 설정하면 중요한 내용을 놓치지 않아요."
                  showClose
                />
                <span style={{ fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)", fontWeight: typography.fontWeight.medium }}>With Close</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
                <PopoverBox
                  heading="새로운 기능"
                  description="알림을 설정하면 중요한 내용을 놓치지 않아요."
                />
                <span style={{ fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)", fontWeight: typography.fontWeight.medium }}>Without Close</span>
              </div>
            </div>
          </PreviewBox>
        </Subsection>

        <Subsection title="Action">
          <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
            액션 없이 정보만 전달하거나, 단일 CTA, 또는 보조 액션과 함께 구성할 수 있습니다.
          </p>
          <PreviewBox>
            <div style={{ display: "flex", gap: spacing.primitive[6], alignItems: "flex-start", flexWrap: "wrap" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
                <PopoverBox
                  heading="업데이트 완료"
                  description="새 버전이 적용됐어요."
                />
                <span style={{ fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)", fontWeight: typography.fontWeight.medium }}>No Action</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
                <PopoverBox
                  heading="새로운 기능이에요"
                  description="알림을 설정하면 중요한 내용을 놓치지 않아요."
                  action={<TextButton color="primary">확인했어요</TextButton>}
                />
                <span style={{ fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)", fontWeight: typography.fontWeight.medium }}>Single Action</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
                <PopoverBox
                  heading="새로운 기능이에요"
                  description="알림을 설정하면 중요한 내용을 놓치지 않아요."
                  action={<TextButton color="primary">확인했어요</TextButton>}
                  subAction={<TextButton color="muted">나중에</TextButton>}
                />
                <span style={{ fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)", fontWeight: typography.fontWeight.medium }}>With Sub Action</span>
              </div>
            </div>
          </PreviewBox>
        </Subsection>
      </Section>


      {/* 5. States */}
      <Section title="States">
        <Subsection title="Interaction States">
          <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
            Popover는 두 가지 표시 모드를 가집니다.
          </p>
          <PreviewBox>
            <div style={{ display: "flex", gap: spacing.primitive[8], alignItems: "flex-start", flexWrap: "wrap" }}>
              {/* Display on click */}
              <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[3], alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
                  <PopoverBox
                    heading="기능 안내"
                    description="버튼을 눌러 시작하세요."
                    action={<TextButton color="primary">시작하기</TextButton>}
                  />
                  <div style={{ height: 8 }} />
                  <Button buttonType="filled" color="primary" size="small">트리거</Button>
                </div>
                <span style={{ fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)", fontWeight: typography.fontWeight.medium }}>Display on click</span>
                <p style={{ ...descText, fontSize: typography.fontSize.compact, textAlign: "center", maxWidth: 200, margin: 0 }}>
                  사용자 인터랙션에 반응해 나타남
                </p>
              </div>
              {/* Always on */}
              <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[3], alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
                  <PopoverBox
                    heading="처음 사용하시나요?"
                    description="여기서 시작해보세요."
                    showClose
                    action={<TextButton color="primary">시작하기</TextButton>}
                  />
                  <div style={{ height: 8 }} />
                  <Button buttonType="weak" color="neutral" size="small">메뉴</Button>
                </div>
                <span style={{ fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)", fontWeight: typography.fontWeight.medium }}>Always on</span>
                <p style={{ ...descText, fontSize: typography.fontSize.compact, textAlign: "center", maxWidth: 200, margin: 0 }}>
                  온보딩·기능 발견을 위해 자동 노출
                </p>
              </div>
            </div>
          </PreviewBox>
        </Subsection>
      </Section>

      {/* 6. Usage Guidelines */}
      <Section title="Usage Guidelines">
        <Subsection title="Best Practices">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
            <DoCard>
              <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[3], alignItems: "center" }}>
                <PopoverBox
                  heading="새로운 기능"
                  description="이제 즐겨찾기를 추가할 수 있어요."
                  showClose
                />
                <p style={{ ...descText, fontSize: typography.fontSize.compact, textAlign: "center" }}>
                  하나의 기능에 대한 짧고 명확한 안내.
                </p>
              </div>
            </DoCard>
            <DontCard>
              <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[3], alignItems: "center" }}>
                <PopoverBox
                  heading="중요 안내사항"
                  description="이 기능을 사용하면 기존 데이터가 삭제되며 되돌릴 수 없습니다. 계속하시겠습니까? 취소 시 이전 화면으로 돌아갑니다."
                  action={<TextButton color="error">삭제하기</TextButton>}
                />
                <p style={{ ...descText, fontSize: typography.fontSize.compact, textAlign: "center" }}>
                  비가역적 액션 확인에 Popover 사용 금지. AlertDialog 사용.
                </p>
              </div>
            </DontCard>
          </div>
        </Subsection>
        <Subsection title="Principles">
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[3] }}>
            <PrincipleCard number={1} title="비침습적" desc="현재 작업 흐름을 막지 않는 정보에만 사용하세요. 확인이 필요한 중요 액션은 AlertDialog를 사용하세요." />
            <PrincipleCard number={2} title="간결하게" desc="설명은 1-2줄 이내로 유지하세요. 긴 내용은 별도 화면이나 모달로 분리하세요." />
            <PrincipleCard number={3} title="닫기 방법 제공" desc="Always on 모드에서는 반드시 X 버튼 또는 액션 버튼으로 닫는 방법을 제공하세요." />
          </div>
        </Subsection>
      </Section>

      {/* 7. Design Tokens */}
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
                ["--surface-base-default", "팝오버 배경 및 화살표 색상"],
                ["--content-base-default", "Heading 텍스트"],
                ["--content-base-secondary", "Description 텍스트, 닫기 아이콘"],
                ["--shadow-semantic-card-floating", "팝오버 그림자"],
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
          <li>팝오버 컨테이너에 <InlineCode>role=&quot;tooltip&quot;</InlineCode>을 설정하세요.</li>
          <li>트리거 요소에 <InlineCode>aria-describedby</InlineCode>로 팝오버를 연결하세요.</li>
          <li>닫기 버튼에는 <InlineCode>aria-label=&quot;닫기&quot;</InlineCode>를 반드시 포함하세요.</li>
          <li>Escape 키로 팝오버를 닫을 수 있어야 합니다.</li>
          <li>키보드로 트리거에 포커스했을 때 팝오버가 표시되어야 합니다.</li>
        </ul>
      </Section>

      {/* 9. Related Components */}
      <Section title="Related Components">
        <p style={descText}>
          화면 흐름을 중단하는 확인이 필요한 경우 <InlineCode>AlertDialog</InlineCode>를 사용하세요.
          화면 하단에서 추가 정보나 액션을 표시할 경우 <InlineCode>BottomSheet</InlineCode>를 사용하세요.
          단순 상태 알림은 <InlineCode>Snackbar</InlineCode>나 <InlineCode>Toast</InlineCode>를 고려하세요.
        </p>
      </Section>
    </div>
  );
}

// ─── Web Content ──────────────────────────────────────────────────────────────

const webProps: PropItem[] = [
  { name: "open", type: "boolean", required: false, description: "팝오버 표시 여부 (기본값: true)" },
  { name: "onClose", type: "() => void", required: false, description: "닫기 이벤트 핸들러" },
  { name: "heading", type: "string", required: false, description: "헤더 제목 (optional)" },
  { name: "description", type: "string", required: true, description: "본문 설명 텍스트" },
  { name: "action", type: "ReactNode", required: false, description: "우측 하단 주요 CTA 버튼" },
  { name: "subAction", type: "ReactNode", required: false, description: "좌측 하단 보조 텍스트 버튼" },
  { name: "showClose", type: "boolean", required: false, description: "X 닫기 버튼 표시 여부 (기본값: false)" },
  { name: "position", type: '"top" | "bottom" | "left" | "right"', required: false, description: "화살표 방향 — 트리거 요소의 상대적 위치 (기본값: \"bottom\")" },
  { name: "size", type: '"sm" | "md"', required: false, description: "최대 너비: sm=240px, md=320px (기본값: \"md\")" },
  { name: "style", type: "CSSProperties", required: false, description: "인라인 스타일 (위치 지정 등)" },
  { name: "className", type: "string", required: false, description: "커스텀 클래스" },
];

function WebContent() {
  const basicCode = `import { Popover, Button } from '@baerae-zkap/design-system';

// 1. 트리거를 position: relative 컨테이너로 감싸세요
// 2. Popover를 absolute 포지션으로 배치하세요
function App() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <Button onClick={() => setOpen(true)}>트리거</Button>
      {open && (
        <div style={{ position: 'absolute', bottom: 'calc(100% + 8px)', left: 0 }}>
          <Popover
            description="여기서 새로운 기능을 시작할 수 있어요."
            onClose={() => setOpen(false)}
          />
        </div>
      )}
    </div>
  );
}`;

  const withHeadingCode = `<Popover
  heading="새로운 기능이에요"
  description="이제 알림을 설정하고 중요한 내용을 놓치지 않을 수 있어요."
  showClose
  onClose={() => setOpen(false)}
  action={
    <Button buttonType="filled" color="primary" size="small"
      onClick={() => setOpen(false)}>
      확인했어요
    </Button>
  }
  subAction={
    <TextButton color="neutral" onClick={() => setOpen(false)}>
      나중에
    </TextButton>
  }
/>`;

  const positionCode = `// 트리거 아래에 팝오버 (arrow ▲, position="top")
<div style={{ position: 'absolute', top: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)' }}>
  <Popover description="..." position="top" />
</div>

// 트리거 오른쪽에 팝오버 (arrow ◀, position="left")
<div style={{ position: 'absolute', left: 'calc(100% + 8px)', top: '50%', transform: 'translateY(-50%)' }}>
  <Popover description="..." position="left" />
</div>`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>

      <Section title="Source Code">
        <a
          href="https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system/src/components/Popover/Popover.tsx"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: typography.fontSize.sm, color: "var(--content-brand-default)", textDecoration: "underline", textUnderlineOffset: 3 }}
        >
          Popover/Popover.tsx
        </a>
      </Section>

      <Section title="Import">
        <CodeBlock code={`import { Popover } from '@baerae-zkap/design-system';`} />
      </Section>

      <Section title="Basic Usage">
        <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
          <InlineCode>Popover</InlineCode>는 위치 지정을 포함하지 않습니다.
          트리거 요소를 <InlineCode>position: relative</InlineCode> 컨테이너로 감싸고,
          Popover를 <InlineCode>position: absolute</InlineCode>로 직접 배치하세요.
        </p>
        <PreviewBox>
          <div style={{ display: "flex", justifyContent: "center", padding: `${spacing.primitive[4]}px 0` }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[2] }}>
              <PopoverBox
                description="여기서 새로운 기능을 시작할 수 있어요."
              />
              <div style={{ height: 8 }} />
              <Button buttonType="filled" color="primary" size="medium">트리거</Button>
            </div>
          </div>
        </PreviewBox>
        <CodeBlock code={basicCode} />
      </Section>

      <Section title="With Heading & Actions">
        <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
          <InlineCode>heading</InlineCode>으로 제목을, <InlineCode>action</InlineCode>과 <InlineCode>subAction</InlineCode>으로 버튼을 추가하세요.
          Always on 모드에서는 <InlineCode>showClose</InlineCode>를 켜서 닫기 방법을 제공하세요.
        </p>
        <PreviewBox>
          <div style={{ display: "flex", justifyContent: "center", padding: `${spacing.primitive[4]}px 0` }}>
            <PopoverBox
              heading="새로운 기능이에요"
              description="이제 알림을 설정하고 중요한 내용을 놓치지 않을 수 있어요."
              showClose
              action={<TextButton color="primary">확인했어요</TextButton>}
              subAction={<TextButton color="muted">나중에</TextButton>}
            />
          </div>
        </PreviewBox>
        <CodeBlock code={withHeadingCode} />
      </Section>

      <Section title="Position">
        <p style={{ ...descText, marginBottom: spacing.primitive[4] }}>
          <InlineCode>position</InlineCode>은 화살표 방향입니다.
          팝오버의 절대 위치 좌표는 <InlineCode>style</InlineCode> prop으로 직접 지정하세요.
        </p>
        <CodeBlock code={positionCode} />
      </Section>

      <Section title="API Reference">
        <Subsection title="PopoverProps">
          <PropsTable props={webProps} />
        </Subsection>
      </Section>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function PopoverPage() {
  return (
    <div style={{ maxWidth: 840 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Presentation" },
          { label: "Popover" },
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
        Popover
      </h1>
      <p style={{
        fontSize: typography.fontSize.md,
        color: "var(--content-base-secondary)",
        lineHeight: 1.7,
        margin: 0,
        marginBottom: spacing.primitive[8],
      }}>
        트리거 요소 근처에 떠오르는 작은 정보 패널로, 기능 안내·온보딩 힌트·컨텍스트 설명에 사용합니다.
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
