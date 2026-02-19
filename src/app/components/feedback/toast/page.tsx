"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform, highlightCode } from "@/components/PlatformTabs";
import { Toast, typography, spacing, radius } from "@baerae-zkap/design-system";
import { Section, Subsection, InlineCode } from "@/components/docs/Section";
import { PropsTable } from "@/components/docs/PropsTable";
import { DoCard, DontCard } from "@/components/docs/Cards";
import { RadioGroup, CopyButton } from "@/components/docs/Playground";

export default function ToastPage() {
  return (
    <div style={{ maxWidth: 720 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Feedback" },
          { label: "Toast" },
        ]}
      />

      <h1 style={{ fontSize: typography.fontSize["3xl"], fontWeight: 700, marginBottom: spacing.primitive[2], color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
        Toast
      </h1>
      <p style={{ fontSize: typography.fontSize.md, color: "var(--text-secondary)", marginBottom: spacing.primitive[8], lineHeight: 1.7 }}>
        Heading과 Description 두 줄 레이아웃을 지원하는 토스트 알림 컴포넌트입니다. React Portal로 화면 하단에 고정 렌더링되며 자동 닫힘 타이머를 지원합니다.
      </p>

      <ToastPlayground />

      <PlatformTabs>
        {(platform) => <PlatformContent platform={platform} />}
      </PlatformTabs>
    </div>
  );
}

// ============================================
// Playground
// ============================================

function ToastPlayground() {
  const [contents, setContents] = useState<"heading" | "both" | "desc">("both");
  const [hasIcon, setHasIcon] = useState<"yes" | "no">("yes");
  const [hasAction, setHasAction] = useState<"yes" | "no">("no");
  const [hasClose, setHasClose] = useState<"yes" | "no">("yes");

  const heading = contents !== "desc" ? "저장이 완료되었습니다" : undefined;
  const description = contents !== "heading" ? "변경사항이 성공적으로 저장되었습니다." : undefined;

  const generateCode = () => {
    const lines: string[] = [];
    lines.push(`<Toast`);
    lines.push(`  open={isOpen}`);
    if (heading) lines.push(`  heading="${heading}"`);
    if (description) lines.push(`  description="${description}"`);
    lines.push(`  onClose={() => setOpen(false)}`);
    if (hasIcon === "yes") lines.push(`  icon={<CheckIcon />}`);
    if (hasAction === "yes") lines.push(`  action={<ActionButton>보기</ActionButton>}`);
    if (hasClose === "yes") lines.push(`  closable`);
    lines.push(`/>`);
    return lines.join("\n");
  };

  return (
    <div style={{ marginBottom: spacing.primitive[8] }}>
      <div style={{ borderRadius: 20, overflow: "hidden", backgroundColor: "var(--surface-base-alternative)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", minHeight: 320 }}>
          {/* Preview */}
          <div style={{ padding: 40, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--surface-base-alternative)" }}>
            <div style={{ width: "100%", maxWidth: 400 }}>
              <ToastPreview
                heading={heading}
                description={description}
                icon={hasIcon === "yes" ? <CheckCircleIcon /> : undefined}
                action={hasAction === "yes" ? <ActionButton>보기</ActionButton> : undefined}
                closable={hasClose === "yes"}
              />
            </div>
          </div>

          {/* Controls */}
          <div style={{ backgroundColor: "var(--surface-base-alternative)", display: "flex", flexDirection: "column", padding: spacing.primitive[4], height: "100%", boxSizing: "border-box" }}>
            <div style={{ flex: 1, minHeight: 0, padding: spacing.primitive[6], overflowY: "auto", display: "flex", flexDirection: "column", gap: 28, backgroundColor: "var(--surface-base-default)", borderRadius: spacing.primitive[4] }}>
              <RadioGroup
                label="contents"
                options={[
                  { value: "heading", label: "Heading only" },
                  { value: "both", label: "Heading + desc" },
                  { value: "desc", label: "Desc only" },
                ]}
                value={contents}
                onChange={(v) => setContents(v as "heading" | "both" | "desc")}
              />
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
        <div style={{ padding: "10px 16px", backgroundColor: "var(--docs-code-surface)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: spacing.primitive[2] }}>
            <span style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.semibold, padding: "4px 12px", borderRadius: 6, color: "var(--content-base-onColor)", backgroundColor: "var(--docs-code-active-bg)" }}>Web</span>
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

// ─── Helpers ──────────────────────────────────────────────────────────────────

function CheckCircleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 12.5L10.5 15L16 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
        padding: "4px 8px",
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

// ─── Static preview ───────────────────────────────────────────────────────────

function ToastPreview({
  heading,
  description,
  icon,
  action,
  closable = false,
}: {
  heading?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  closable?: boolean;
}) {
  const hasTwoLines = Boolean(heading && description);

  return (
    <div style={{
      display: "flex",
      alignItems: hasTwoLines ? "flex-start" : "center",
      gap: spacing.primitive[3],
      width: "100%",
      padding: hasTwoLines
        ? `${spacing.primitive[4]}px ${spacing.primitive[4]}px`
        : `${spacing.primitive[3]}px ${spacing.primitive[4]}px`,
      backgroundColor: "var(--inverse-surface-default)",
      borderRadius: radius.primitive.md,
    }}>
      {icon && (
        <span style={{ flexShrink: 0, width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--inverse-icon-default)", marginTop: hasTwoLines ? 1 : 0 }}>
          {icon}
        </span>
      )}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 2 }}>
        {heading && (
          <p style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: "var(--inverse-content-default)", margin: 0, lineHeight: 1.4, wordBreak: "keep-all" }}>
            {heading}
          </p>
        )}
        {description && (
          <p style={{ fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.regular, color: "var(--inverse-content-secondary)", margin: 0, lineHeight: 1.5, wordBreak: "keep-all" }}>
            {description}
          </p>
        )}
      </div>
      {action && (
        <span style={{ flexShrink: 0, color: "var(--inverse-content-default)" }}>{action}</span>
      )}
      {closable && (
        <button type="button" style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", width: 24, height: 24, padding: 0, border: "none", background: "none", cursor: "pointer", color: "var(--inverse-content-secondary)", borderRadius: radius.primitive.xs }} aria-label="닫기">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
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
        <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>
          <InlineCode>Toast</InlineCode>는 제목(Heading)과 설명(Description) 두 줄 레이아웃을 지원하는 토스트 알림입니다.
          액션 버튼, 닫기 버튼, 아이콘 슬롯을 유연하게 조합할 수 있습니다.
          <InlineCode>Snackbar</InlineCode>와 달리 더 풍부한 내용 표현에 적합합니다.
        </p>
      </Section>

      <Section title="Anatomy">
        <ToastAnatomy />
      </Section>

      <Section title="Variants">
        <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[4] }}>
          {[
            {
              label: "Heading only",
              desc: "단일 문장으로 요약 가능한 간결한 피드백.",
              preview: <ToastPreview heading="저장이 완료되었습니다." icon={<CheckCircleIcon />} />,
            },
            {
              label: "Heading + Description",
              desc: "제목과 보조 설명이 함께 필요한 경우. 가장 일반적인 형태.",
              preview: <ToastPreview heading="저장이 완료되었습니다" description="변경사항이 성공적으로 저장되었습니다." icon={<CheckCircleIcon />} />,
            },
            {
              label: "With action",
              desc: "단일 CTA가 필요한 경우. 실행 취소, 보기 등.",
              preview: <ToastPreview heading="항목이 삭제되었습니다" action={<ActionButton>실행 취소</ActionButton>} />,
            },
            {
              label: "With close button",
              desc: "수동으로 닫아야 하는 중요 알림.",
              preview: <ToastPreview heading="연결이 끊겼습니다" description="네트워크 상태를 확인해 주세요." closable />,
            },
          ].map(({ label, desc, preview }) => (
            <div key={label} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], alignItems: "center", background: "var(--surface-base-alternative)", borderRadius: 12, padding: spacing.primitive[5] }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                {preview}
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", margin: `0 0 ${spacing.primitive[1]}px` }}>{label}</p>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0, lineHeight: 1.6 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Usage Guidelines">
        <Subsection title="Best Practices">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
            <DoCard>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>
                설명이 필요한 경우 Heading + Description 조합을 사용하세요. Heading은 결과, Description은 부연 설명.
              </p>
            </DoCard>
            <DontCard>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>
                설명 없이 너무 긴 단일 메시지를 넣지 마세요. Heading은 30자 이내를 권장합니다.
              </p>
            </DontCard>
            <DoCard>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>
                단순 피드백(복사, 저장 등)은 <InlineCode>Snackbar</InlineCode>를, 더 자세한 설명이 필요하면 Toast를 사용하세요.
              </p>
            </DoCard>
            <DontCard>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>
                Toast와 Snackbar를 동시에 여러 개 띄우지 마세요. 하나씩 순서대로 표시하세요.
              </p>
            </DontCard>
          </div>
        </Subsection>
      </Section>

      <Section title="Design Tokens">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--divider)" }}>
              <th style={{ textAlign: "left", padding: "8px 12px", color: "var(--text-secondary)", fontWeight: 500 }}>Token</th>
              <th style={{ textAlign: "left", padding: "8px 12px", color: "var(--text-secondary)", fontWeight: 500 }}>Value</th>
              <th style={{ textAlign: "left", padding: "8px 12px", color: "var(--text-secondary)", fontWeight: 500 }}>Usage</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["inverse.surface.default", "var(--inverse-surface-default)", "배경색"],
              ["inverse.content.default", "var(--inverse-content-default)", "Heading 텍스트"],
              ["inverse.content.secondary", "var(--inverse-content-secondary)", "Description 텍스트 / 닫기 아이콘"],
              ["inverse.icon.default", "var(--inverse-icon-default)", "리딩 아이콘"],
              ["radius.primitive.md", "12px", "컨테이너 border-radius"],
              ["spacing.primitive[4]", "16px", "두 줄 레이아웃 패딩"],
              ["spacing.primitive[3]", "12px", "단일 줄 수직 패딩"],
              ["zIndex.toast", "1200", "레이어 순서"],
            ].map(([token, value, usage]) => (
              <tr key={token} style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "10px 12px", fontFamily: "monospace", fontSize: 12 }}>{token}</td>
                <td style={{ padding: "10px 12px", color: "var(--text-secondary)", fontFamily: "monospace", fontSize: 12 }}>{value}</td>
                <td style={{ padding: "10px 12px", color: "var(--text-secondary)" }}>{usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section title="Accessibility">
        <ul style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.9, paddingLeft: spacing.primitive[5], margin: 0 }}>
          <li><InlineCode>role="status"</InlineCode>와 <InlineCode>aria-live="polite"</InlineCode>로 스크린리더에 알림을 전달합니다.</li>
          <li>닫기 버튼에 <InlineCode>aria-label="닫기"</InlineCode>가 적용됩니다.</li>
          <li>자동 닫힘 시 최소 4초 이상 <InlineCode>duration</InlineCode>을 권장합니다 (WCAG 2.1).</li>
        </ul>
      </Section>

      <Section title="Related Components">
        <ul style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.9, paddingLeft: spacing.primitive[5], margin: 0 }}>
          <li><strong>Snackbar</strong> — 단일 메시지 라인, 더 가벼운 피드백에 적합.</li>
          <li><strong>SectionMessage</strong> — 페이지 내 인라인 배너. 스크롤 영역에 위치.</li>
          <li><strong>AlertDialog</strong> — 사용자 확인이 필요한 중요 메시지.</li>
        </ul>
      </Section>
    </div>
  );
}

// ─── Anatomy ──────────────────────────────────────────────────────────────────

function ToastAnatomy() {
  const bg = "var(--inverse-surface-default)";
  const textColor = "var(--inverse-content-default)";
  const secondaryColor = "var(--inverse-content-secondary)";

  return (
    <div style={{ background: "var(--surface-base-alternative)", borderRadius: 12, padding: spacing.primitive[6] }}>
      <svg viewBox="0 0 480 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 480, display: "block", margin: "0 auto" }}>
        <rect x="30" y="12" width="420" height="70" rx="12" fill={bg} />
        {/* Icon */}
        <circle cx="66" cy="47" r="11" stroke={textColor} strokeWidth="1.5" />
        <path d="M61 47.5L63.5 50L71 42" stroke={textColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Heading */}
        <rect x="90" y="34" width="160" height="11" rx="3" fill={textColor} opacity="0.8" />
        {/* Description */}
        <rect x="90" y="52" width="200" height="9" rx="2.5" fill={secondaryColor} opacity="0.6" />
        {/* Action */}
        <rect x="304" y="38" width="60" height="20" rx="4" fill={textColor} opacity="0.12" />
        <rect x="312" y="44" width="44" height="8" rx="2" fill={textColor} opacity="0.5" />
        {/* Close */}
        <circle cx="418" cy="47" r="12" fill={textColor} fillOpacity="0.08" />
        <path d="M414 43L422 51M422 43L414 51" stroke={secondaryColor} strokeWidth="1.5" strokeLinecap="round" />
        {/* Labels */}
        <text x="66" y="95" textAnchor="middle" fontSize="9" fill={secondaryColor}>① Icon</text>
        <text x="170" y="95" textAnchor="middle" fontSize="9" fill={secondaryColor}>② Heading</text>
        <text x="190" y="95" textAnchor="middle" fontSize="9" fill={secondaryColor}></text>
        <text x="334" y="95" textAnchor="middle" fontSize="9" fill={secondaryColor}>③ Action</text>
        <text x="418" y="95" textAnchor="middle" fontSize="9" fill={secondaryColor}>④ Close</text>
      </svg>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px", marginTop: spacing.primitive[3], fontSize: 12, color: "var(--text-secondary)" }}>
        <span><strong>① Icon</strong> — 선택적 리딩 아이콘 (24×24)</span>
        <span><strong>② Heading + Description</strong> — 제목(bold) + 보조 설명</span>
        <span><strong>③ Action</strong> — 선택적 인라인 액션</span>
        <span><strong>④ Close</strong> — 선택적 닫기 버튼</span>
      </div>
    </div>
  );
}

// ─── Web Tab ──────────────────────────────────────────────────────────────────

function WebContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[10] }}>
      <Section title="Source Code">
        <CodeBlock code={`packages/design-system/src/components/Toast/Toast.tsx`} language="text" />
      </Section>

      <Section title="Import">
        <CodeBlock
          code={`import { Toast } from '@baerae-zkap/design-system';`}
          language="tsx"
        />
      </Section>

      <Section title="Basic Usage">
        <CodeBlock
          code={`const [open, setOpen] = useState(false);

<Toast
  open={open}
  heading="저장이 완료되었습니다"
  description="변경사항이 성공적으로 저장되었습니다."
  onClose={() => setOpen(false)}
/>`}
          language="tsx"
        />
      </Section>

      <Section title="Examples">
        <Subsection title="Heading only">
          <CodeBlock
            code={`<Toast
  open={open}
  heading="링크가 복사되었습니다."
  onClose={() => setOpen(false)}
/>`}
            language="tsx"
          />
        </Subsection>

        <Subsection title="With icon">
          <CodeBlock
            code={`<Toast
  open={open}
  heading="저장이 완료되었습니다"
  description="변경사항이 성공적으로 저장되었습니다."
  onClose={() => setOpen(false)}
  icon={<CheckCircleIcon />}
/>`}
            language="tsx"
          />
        </Subsection>

        <Subsection title="With action">
          <CodeBlock
            code={`<Toast
  open={open}
  heading="항목이 삭제되었습니다"
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

        <Subsection title="Persistent">
          <CodeBlock
            code={`<Toast
  open={open}
  heading="연결이 끊겼습니다"
  description="네트워크 상태를 확인해 주세요."
  onClose={() => setOpen(false)}
  duration={null}
  closable
/>`}
            language="tsx"
          />
        </Subsection>
      </Section>

      <Section title="API Reference">
        <PropsTable
          props={[
            { name: "open", type: "boolean", required: true, description: "Toast 표시 여부" },
            { name: "heading", type: "ReactNode", required: false, description: "굵은 제목 텍스트" },
            { name: "description", type: "ReactNode", required: false, description: "보조 설명 텍스트 (두 번째 줄)" },
            { name: "onClose", type: "() => void", required: false, description: "닫기 콜백. 타이머 만료 또는 닫기 버튼 클릭 시 호출됩니다." },
            { name: "duration", type: "number | null", required: false, defaultVal: "4000", description: "자동 닫힘 시간(ms). null이면 자동 닫힘 없음." },
            { name: "position", type: "'bottom-center' | 'bottom-left' | 'bottom-right'", required: false, defaultVal: "'bottom-center'", description: "화면 하단 표시 위치" },
            { name: "icon", type: "ReactNode", required: false, description: "좌측 리딩 아이콘 슬롯 (24×24 권장)" },
            { name: "action", type: "ReactNode", required: false, description: "우측 인라인 액션 슬롯" },
            { name: "closable", type: "boolean", required: false, defaultVal: "false", description: "닫기(X) 버튼 표시 여부" },
          ]}
        />
      </Section>
    </div>
  );
}
