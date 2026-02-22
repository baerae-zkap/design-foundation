"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform, highlightCode } from "@/components/PlatformTabs";
import { Snackbar, typography, spacing, radius } from "@baerae-zkap/design-system";
import { Section, Subsection, InlineCode } from "@/components/docs/Section";
import { PropsTable } from "@/components/docs/PropsTable";
import { DoCard, DontCard } from "@/components/docs/Cards";
import { RadioGroup, CopyButton } from "@/components/docs/Playground";

export default function SnackbarPage() {
  return (
    <div style={{ maxWidth: 840 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Feedback" },
          { label: "Snackbar" },
        ]}
      />

      {/* Header */}
      <h1 style={{ fontSize: typography.fontSize["3xl"], fontWeight: typography.fontWeight.bold, marginBottom: spacing.primitive[2], color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
        Snackbar
      </h1>
      <p style={{ fontSize: typography.fontSize.md, color: "var(--text-secondary)", marginBottom: spacing.primitive[8], lineHeight: 1.7 }}>
        화면 하단에 일시적으로 표시되는 간결한 알림 컴포넌트입니다. React Portal을 통해 렌더링되며 자동 닫힘 타이머를 지원합니다.
      </p>

      {/* Interactive Playground */}
      <SnackbarPlayground />

      {/* Platform Tabs */}
      <PlatformTabs>
        {(platform) => <PlatformContent platform={platform} />}
      </PlatformTabs>
    </div>
  );
}

// ============================================
// Playground
// ============================================

function SnackbarPlayground() {
  const [hasAction, setHasAction] = useState<"yes" | "no">("no");
  const [hasClose, setHasClose] = useState<"yes" | "no">("no");
  const [hasIcon, setHasIcon] = useState<"yes" | "no">("no");

  const generateCode = () => {
    const lines: string[] = [];
    lines.push(`<Snackbar`);
    lines.push(`  open={isOpen}`);
    lines.push(`  message="변경사항이 저장되었습니다."`);
    lines.push(`  onClose={() => setOpen(false)}`);
    if (hasIcon === "yes") lines.push(`  icon={<CheckIcon />}`);
    if (hasAction === "yes") lines.push(`  action={<ActionButton>실행 취소</ActionButton>}`);
    if (hasClose === "yes") lines.push(`  closable`);
    lines.push(`/>`);
    return lines.join("\n");
  };

  return (
    <div style={{ marginBottom: spacing.primitive[8] }}>
      <div style={{ borderRadius: radius.primitive.xl, overflow: "hidden", backgroundColor: "var(--surface-base-default)", border: "1px solid var(--border-solid-alternative)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", minHeight: 320 }}>
          {/* Preview */}
          <div style={{ padding: spacing.primitive[10], display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--surface-base-default)" }}>
            <div style={{ width: "100%", maxWidth: 400 }}>
              <SnackbarPreview
                message="변경사항이 저장되었습니다."
                icon={hasIcon === "yes" ? <CheckCircleIcon /> : undefined}
                action={hasAction === "yes" ? <ActionButton>실행 취소</ActionButton> : undefined}
                closable={hasClose === "yes"}
              />
            </div>
          </div>

          {/* Controls */}
          <div style={{ backgroundColor: "var(--surface-base-default)", borderLeft: "1px solid var(--border-solid-alternative)", display: "flex", flexDirection: "column", padding: spacing.primitive[4], height: "100%", boxSizing: "border-box" }}>
            <div style={{ flex: 1, minHeight: 0, padding: spacing.primitive[6], overflowY: "auto", display: "flex", flexDirection: "column", gap: spacing.primitive[7], backgroundColor: "var(--surface-base-default)", borderRadius: radius.primitive.lg }}>
              <RadioGroup
                label="icon"
                options={[{ value: "no", label: "No" }, { value: "yes", label: "Yes" }]}
                value={hasIcon}
                onChange={(v) => setHasIcon(v as "yes" | "no")}
              />
              <RadioGroup
                label="action"
                options={[{ value: "no", label: "No" }, { value: "yes", label: "Yes" }]}
                value={hasAction}
                onChange={(v) => setHasAction(v as "yes" | "no")}
              />
              <RadioGroup
                label="closable"
                options={[{ value: "no", label: "No" }, { value: "yes", label: "Yes" }]}
                value={hasClose}
                onChange={(v) => setHasClose(v as "yes" | "no")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Generated Code */}
      <div style={{ marginTop: spacing.primitive[4], borderRadius: radius.primitive.md, overflow: "hidden", border: "1px solid var(--divider)" }}>
        <div style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[4]}px`, backgroundColor: "var(--docs-code-surface)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: spacing.primitive[2] }}>
            <span style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.semibold, padding: `${spacing.primitive[1]}px ${spacing.primitive[3]}px`, borderRadius: 6 /* optical: between xs(4) and sm(8) */, color: "var(--content-base-onColor)", backgroundColor: "var(--docs-code-active-bg)" }}>Web</span>
          </div>
          <CopyButton text={generateCode()} />
        </div>
        <pre style={{ margin: 0, padding: spacing.primitive[4], fontSize: typography.fontSize.compact, lineHeight: 1.6, color: "var(--docs-code-text)", backgroundColor: "var(--docs-code-surface)", fontFamily: "'SF Mono', 'Fira Code', monospace", overflow: "auto" }}>
          <code>{highlightCode(generateCode())}</code>
        </pre>
      </div>
    </div>
  );
}

// ─── Inline helpers for Playground ───────────────────────────────────────────

function CheckCircleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6.5 10.5L8.5 12.5L13.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ActionButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: `${spacing.primitive[1]}px ${spacing.primitive[2]}px`,
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.semibold,
        color: "var(--inverse-content-default)",
        borderRadius: radius.primitive.xs,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </button>
  );
}

// ============================================
// Platform content
// ============================================

function PlatformContent({ platform }: { platform: Platform }) {
  if (platform === "design") return <DesignContent />;
  return <WebContent />;
}

// ─── Design Tab ───────────────────────────────────────────────────────────────

function DesignContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[10] }}>
      <Section title="Overview">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>
          <InlineCode>Snackbar</InlineCode>는 사용자 액션 결과나 시스템 상태 변화를 간결하게 알리는 토스트형 컴포넌트입니다.
          화면 하단에 고정 렌더링되며 일정 시간 후 자동으로 사라집니다.
          모달과 달리 사용자 흐름을 방해하지 않습니다.
        </p>
      </Section>

      <Section title="Anatomy">
        <SnackbarAnatomy />
      </Section>

      <Section title="Variants">
        <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[4] }}>
          {[
            {
              label: "Message only",
              desc: "가장 기본 형태. 짧고 명확한 메시지만 표시합니다.",
              preview: <SnackbarPreview message="변경사항이 저장되었습니다." />,
            },
            {
              label: "With action",
              desc: "실행 취소, 보기 등 단일 액션을 우측에 배치합니다.",
              preview: <SnackbarPreview message="항목이 삭제되었습니다." action={<ActionButton>실행 취소</ActionButton>} />,
            },
            {
              label: "With close button",
              desc: "자동 닫힘 없이 사용자가 직접 닫아야 할 때 사용합니다.",
              preview: <SnackbarPreview message="오류가 발생했습니다. 나중에 다시 시도해 주세요." closable />,
            },
            {
              label: "With icon",
              desc: "아이콘으로 메시지 성격을 시각적으로 강조합니다. 20×20 권장.",
              preview: <SnackbarPreview message="저장이 완료되었습니다." icon={<CheckCircleIcon />} />,
            },
          ].map(({ label, desc, preview }) => (
            <div key={label} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], alignItems: "center", background: "var(--surface-base-alternative)", borderRadius: radius.primitive.md, padding: spacing.primitive[5] }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                {preview}
              </div>
              <div>
                <p style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)", margin: `0 0 ${spacing.primitive[1]}px` }}>{label}</p>
                <p style={{ fontSize: 13, /* optical: between compact(12) and sm(14), no exact token */ color: "var(--text-secondary)", margin: 0, lineHeight: 1.6 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Position">
        <Subsection title="bottom-center (기본값)">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>
            웹 환경의 기본 위치. 화면 하단 중앙에 표시됩니다.
          </p>
        </Subsection>
        <Subsection title="bottom-left / bottom-right">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>
            대시보드, 어드민 같은 고정 레이아웃에서 좌·우 정렬이 필요할 때 사용합니다.
          </p>
        </Subsection>
      </Section>

      <Section title="Usage Guidelines">
        <Subsection title="Best Practices">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
            <DoCard>
              <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>
                짧고 명확한 메시지를 사용하세요. 한 문장, 40자 이내를 권장합니다.
              </p>
            </DoCard>
            <DontCard>
              <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>
                긴 설명이나 여러 액션이 필요한 경우 SectionMessage나 AlertDialog를 사용하세요.
              </p>
            </DontCard>
            <DoCard>
              <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>
                중요하지 않은 액션 피드백에 사용하세요. 저장 완료, 복사 성공, 삭제 완료 등.
              </p>
            </DoCard>
            <DontCard>
              <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>
                오류 복구나 사용자 확인이 반드시 필요한 중요한 메시지에는 사용하지 마세요.
              </p>
            </DontCard>
            <DoCard>
              <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>
                동시에 하나의 Snackbar만 표시하세요. 새 메시지가 생기면 기존 것을 닫고 새로 띄웁니다.
              </p>
            </DoCard>
            <DontCard>
              <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>
                여러 Snackbar를 동시에 쌓아서 표시하지 마세요.
              </p>
            </DontCard>
          </div>
        </Subsection>
      </Section>

      <Section title="Design Tokens">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--divider)" }}>
              <th style={{ textAlign: "left", padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)", fontWeight: typography.fontWeight.medium }}>Token</th>
              <th style={{ textAlign: "left", padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)", fontWeight: typography.fontWeight.medium }}>Value</th>
              <th style={{ textAlign: "left", padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)", fontWeight: typography.fontWeight.medium }}>Usage</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["inverse.surface.default", "var(--inverse-surface-default)", "배경색"],
              ["inverse.content.default", "var(--inverse-content-default)", "메시지 텍스트"],
              ["inverse.content.secondary", "var(--inverse-content-secondary)", "닫기 버튼 아이콘"],
              ["inverse.icon.default", "var(--inverse-icon-default)", "리딩 아이콘"],
              ["radius.primitive.md", "12px", "컨테이너 border-radius"],
              ["spacing.primitive[3]", "12px", "수직 패딩"],
              ["spacing.primitive[4]", "16px", "수평 패딩"],
              ["zIndex.toast", "1200", "레이어 순서"],
            ].map(([token, value, usage]) => (
              <tr key={token} style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontFamily: "monospace", fontSize: 12 }}>{token}</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)", fontFamily: "monospace", fontSize: 12 }}>{value}</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>{usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section title="Accessibility">
        <ul style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.9, paddingLeft: spacing.primitive[5], margin: 0 }}>
          <li>컨테이너에 <InlineCode>role="status"</InlineCode>와 <InlineCode>aria-live="polite"</InlineCode>가 적용됩니다.</li>
          <li>스크린리더가 메시지를 자동으로 읽어줍니다.</li>
          <li>닫기 버튼에 <InlineCode>aria-label="닫기"</InlineCode>가 적용됩니다.</li>
          <li>자동 닫힘이 있는 경우 최소 4초 이상의 <InlineCode>duration</InlineCode>을 권장합니다 (WCAG 2.1 기준).</li>
          <li>중요한 오류 메시지는 <InlineCode>closable</InlineCode>과 <InlineCode>{"duration={null}"}</InlineCode>을 함께 사용해 사용자가 내용을 읽을 수 있도록 하세요.</li>
        </ul>
      </Section>

      <Section title="Related Components">
        <ul style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.9, paddingLeft: spacing.primitive[5], margin: 0 }}>
          <li><strong>SectionMessage</strong> — 페이지 내 인라인 배너. 스크롤 영역 안에서 사용.</li>
          <li><strong>AlertDialog</strong> — 사용자 확인이 필요한 중요 메시지. 흐름 차단.</li>
          <li><strong>PushBadge</strong> — 숫자/점 형태의 소형 알림 뱃지.</li>
        </ul>
      </Section>
    </div>
  );
}

// ─── Anatomy diagram ──────────────────────────────────────────────────────────

function SnackbarAnatomy() {
  const bg = "var(--inverse-surface-default)";
  const textColor = "var(--inverse-content-default)";
  const secondaryColor = "var(--inverse-content-secondary)";

  return (
    <div style={{ background: "var(--surface-base-alternative)", borderRadius: radius.primitive.md, padding: spacing.primitive[6] }}>
      <svg
        viewBox="0 0 480 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", maxWidth: 480, display: "block", margin: "0 auto" }}
      >
        {/* Snackbar container */}
        <rect x="30" y="16" width="420" height="58" rx="12" fill={bg} />

        {/* Icon area */}
        <circle cx="64" cy="45" r="10" stroke={textColor} strokeWidth="1.5" />
        <path d="M59 45.5L62 48.5L69 41.5" stroke={textColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Message text */}
        <rect x="88" y="39" width="180" height="12" rx="3" fill={textColor} opacity="0.7" />

        {/* Action button */}
        <rect x="280" y="35" width="76" height="20" rx="4" fill={textColor} opacity="0.1" />
        <rect x="290" y="41" width="56" height="8" rx="2" fill={textColor} opacity="0.5" />

        {/* Close button */}
        <circle cx="404" cy="45" r="12" fill={textColor} fillOpacity="0.08" />
        <path d="M400 41L408 49M408 41L400 49" stroke={secondaryColor} strokeWidth="1.5" strokeLinecap="round" />

        {/* Labels */}
        <text x="64" y="82" textAnchor="middle" fontSize="9" fill={secondaryColor}>①Icon</text>
        <text x="178" y="82" textAnchor="middle" fontSize="9" fill={secondaryColor}>②Message</text>
        <text x="318" y="82" textAnchor="middle" fontSize="9" fill={secondaryColor}>③Action</text>
        <text x="404" y="82" textAnchor="middle" fontSize="9" fill={secondaryColor}>④Close</text>
      </svg>

      <div style={{ display: "flex", flexWrap: "wrap", gap: `${spacing.primitive[2]}px ${spacing.primitive[6]}px`, marginTop: spacing.primitive[4], fontSize: typography.fontSize.compact, color: "var(--text-secondary)" }}>
        <span><strong>① Icon</strong> — 선택적 리딩 아이콘 (20×20)</span>
        <span><strong>② Message</strong> — 주요 메시지 텍스트</span>
        <span><strong>③ Action</strong> — 선택적 인라인 액션 버튼</span>
        <span><strong>④ Close</strong> — 선택적 닫기 버튼</span>
      </div>
    </div>
  );
}

// ─── Static preview (no portal, for doc page) ─────────────────────────────────

function SnackbarPreview({
  message,
  action,
  icon,
  closable = false,
}: {
  message: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  closable?: boolean;
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: spacing.primitive[2],
        minWidth: 260,
        maxWidth: 400,
        padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`,
        backgroundColor: "var(--inverse-surface-default)",
        borderRadius: radius.primitive.md,
      }}
    >
      {icon && (
        <span style={{ flexShrink: 0, width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--inverse-icon-default)" }}>
          {icon}
        </span>
      )}
      <span style={{
        flex: 1,
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.medium,
        color: "var(--inverse-content-default)",
        wordBreak: "keep-all",
      }}>
        {message}
      </span>
      {action && (
        <span style={{ flexShrink: 0, color: "var(--inverse-content-default)" }}>
          {action}
        </span>
      )}
      {closable && (
        <button
          type="button"
          style={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 24,
            height: 24,
            padding: 0,
            border: "none",
            background: "none",
            cursor: "pointer",
            color: "var(--inverse-content-secondary)",
            borderRadius: radius.primitive.xs,
          }}
          aria-label="닫기"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
}

function ErrorIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7.5 7.5L12.5 12.5M12.5 7.5L7.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ─── Web Tab ──────────────────────────────────────────────────────────────────

function WebContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[10] }}>
      <Section title="Source Code">
        <CodeBlock
          code={`packages/design-system/src/components/Snackbar/Snackbar.tsx`}
          language="text"
        />
      </Section>

      <Section title="Import">
        <CodeBlock
          code={`import { Snackbar } from '@baerae-zkap/design-system';`}
          language="tsx"
        />
      </Section>

      <Section title="Basic Usage">
        <CodeBlock
          code={`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>저장</Button>

<Snackbar
  open={open}
  message="변경사항이 저장되었습니다."
  onClose={() => setOpen(false)}
/>`}
          language="tsx"
        />
      </Section>

      <Section title="Examples">
        <Subsection title="With action (실행 취소)">
          <CodeBlock
            code={`<Snackbar
  open={open}
  message="항목이 삭제되었습니다."
  onClose={() => setOpen(false)}
  action={
    <button
      style={{ color: 'var(--inverse-content-default)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}
      onClick={handleUndo}
    >
      실행 취소
    </button>
  }
/>`}
            language="tsx"
          />
        </Subsection>

        <Subsection title="Persistent (수동 닫기)">
          <CodeBlock
            code={`<Snackbar
  open={open}
  message="네트워크 연결이 끊겼습니다."
  onClose={() => setOpen(false)}
  duration={null}
  closable
/>`}
            language="tsx"
          />
        </Subsection>

        <Subsection title="Custom position">
          <CodeBlock
            code={`<Snackbar
  open={open}
  message="파일이 업로드되었습니다."
  onClose={() => setOpen(false)}
  position="bottom-right"
/>`}
            language="tsx"
          />
        </Subsection>

        <Subsection title="With icon">
          <CodeBlock
            code={`<Snackbar
  open={open}
  message="저장이 완료되었습니다."
  onClose={() => setOpen(false)}
  icon={<CheckCircleIcon />}
/>`}
            language="tsx"
          />
        </Subsection>

        <Subsection title="Snackbar 큐 관리 (여러 메시지)">
          <CodeBlock
            code={`const [queue, setQueue] = useState<string[]>([]);
const [open, setOpen] = useState(false);
const [message, setMessage] = useState('');

const showSnackbar = (msg: string) => {
  setQueue(prev => [...prev, msg]);
};

// 큐에서 순서대로 표시
useEffect(() => {
  if (!open && queue.length > 0) {
    setMessage(queue[0]);
    setQueue(prev => prev.slice(1));
    setOpen(true);
  }
}, [open, queue]);

<Snackbar
  open={open}
  message={message}
  onClose={() => setOpen(false)}
/>`}
            language="tsx"
          />
        </Subsection>
      </Section>

      <Section title="API Reference">
        <PropsTable
          props={[
            {
              name: "open",
              type: "boolean",
              required: true,
              description: "스낵바 표시 여부",
            },
            {
              name: "message",
              type: "ReactNode",
              required: true,
              description: "표시할 메시지 텍스트",
            },
            {
              name: "onClose",
              type: "() => void",
              required: false,
              description: "닫기 콜백. 타이머 만료 또는 닫기 버튼 클릭 시 호출됩니다.",
            },
            {
              name: "duration",
              type: "number | null",
              required: false,
              defaultVal: "4000",
              description: "자동 닫힘 시간(ms). null이면 자동 닫힘 없음.",
            },
            {
              name: "position",
              type: "'bottom-center' | 'bottom-left' | 'bottom-right'",
              required: false,
              defaultVal: "'bottom-center'",
              description: "화면 하단 표시 위치",
            },
            {
              name: "action",
              type: "ReactNode",
              required: false,
              description: "우측 인라인 액션 슬롯. 단일 액션 버튼만 권장.",
            },
            {
              name: "icon",
              type: "ReactNode",
              required: false,
              description: "좌측 리딩 아이콘 슬롯 (20×20 권장)",
            },
            {
              name: "closable",
              type: "boolean",
              required: false,
              defaultVal: "false",
              description: "우측 상단 닫기(X) 버튼 표시 여부",
            },
          ]}
        />
      </Section>
    </div>
  );
}
