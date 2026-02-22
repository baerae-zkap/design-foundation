"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform, highlightCode } from "@/components/PlatformTabs";
import { Dialog, Button, typography, spacing, radius } from '@baerae-zkap/design-system';
import { Section, Subsection, InlineCode } from "@/components/docs/Section";
import { PropsTable } from "@/components/docs/PropsTable";
import { PrincipleCard, DoCard, DontCard } from "@/components/docs/Cards";
import { RadioGroup, CopyButton } from "@/components/docs/Playground";

export default function AlertDialogPage() {
  return (
    <div style={{ maxWidth: 840 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Feedback" },
          { label: "Dialog" },
        ]}
      />

      {/* Header */}
      <h1 style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold, marginBottom: spacing.primitive[2], color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
        Dialog
      </h1>
      <p style={{ fontSize: typography.fontSize.md, color: "var(--text-secondary)", marginBottom: spacing.primitive[8], lineHeight: 1.7 }}>
        중요한 정보를 전달하거나 단일 확인 액션을 요구하는 모달 다이얼로그입니다. 사용자가 의도적인 결정을 내리도록 유도합니다.
      </p>

      {/* Interactive Playground */}
      <DialogPlayground />

      {/* Platform Tabs */}
      <PlatformTabs>
        {(platform) => <PlatformContent platform={platform} />}
      </PlatformTabs>
    </div>
  );
}

function DialogPlayground() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTitle, setHasTitle] = useState<"with" | "without">("with");
  const [actionCount, setActionCount] = useState<"one" | "two">("two");
  const [closeOnDimmer, setCloseOnDimmer] = useState<"false" | "true">("false");

  const generateCode = () => {
    const lines: string[] = [];
    lines.push("<Dialog");
    lines.push("  open={isOpen}");
    lines.push("  onClose={() => setIsOpen(false)}");
    if (hasTitle === "with") lines.push('  title="삭제하시겠어요?"');
    lines.push('  description="이 작업은 되돌릴 수 없습니다."');
    if (closeOnDimmer === "true") lines.push("  closeOnDimmerClick");
    if (actionCount === "one") {
      lines.push("  actions={[");
      lines.push("    { label: '확인', onClick: () => setIsOpen(false) },");
      lines.push("  ]}");
    } else {
      lines.push("  actions={[");
      lines.push("    { label: '취소', onClick: () => setIsOpen(false), color: 'neutral', variant: 'weak' },");
      lines.push("    { label: '삭제', onClick: handleDelete, color: 'error', variant: 'filled' },");
      lines.push("  ]}");
    }
    lines.push("/>");
    return lines.join("\n");
  };

  const dialogTitle = hasTitle === "with" ? "삭제하시겠어요?" : undefined;
  type DialogAction = { label: string; onClick: () => void; color?: "primary" | "neutral" | "error"; variant?: "filled" | "weak" };
  const dialogActions: DialogAction[] = actionCount === "one"
    ? [{ label: "확인", onClick: () => setIsOpen(false) }]
    : [
        { label: "취소", onClick: () => setIsOpen(false), color: "neutral", variant: "weak" },
        { label: "삭제", onClick: () => setIsOpen(false), color: "error", variant: "filled" },
      ];

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
          {/* Preview Area */}
          <div
            style={{
              padding: spacing.primitive[16], // 64px — closest token to 60px preview area padding
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "var(--surface-base-alternative)",
            }}
          >
            <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[4] }}>
              <div style={{
                padding: `${spacing.primitive[6]}px`,
                backgroundColor: "var(--surface-base-default)",
                borderRadius: radius.primitive["2xl"],
                boxShadow: "var(--shadow-semantic-modal-default)",
                width: 280,
                textAlign: "left",
              }}>
                {dialogTitle && (
                  <div style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.bold, color: "var(--content-base-default)", marginBottom: spacing.primitive[2] }}>
                    {dialogTitle}
                  </div>
                )}
                <div style={{ fontSize: typography.fontSize.sm, color: "var(--content-base-secondary)", lineHeight: 1.6, marginBottom: spacing.primitive[5] }}>
                  이 작업은 되돌릴 수 없습니다.
                </div>
                <div style={{ display: "flex", gap: spacing.primitive[2], justifyContent: "stretch" }}>
                  {dialogActions.map((action, i) => (
                      <Button
                        key={i}
                        buttonType={action.variant}
                        color={action.color}
                        size="medium"
                        layout="fillWidth"
                      >
                        {action.label}
                      </Button>
                    ))}
                </div>
              </div>
              <Button
                buttonType="weak"
                color="neutral"
                size="medium"
                onClick={() => setIsOpen(true)}
              >
                Open Dialog
              </Button>
            </div>

            {/* Live dialog */}
            <Dialog
              open={isOpen}
              onClose={() => setIsOpen(false)}
              title={dialogTitle}
              description="이 작업은 되돌릴 수 없습니다."
              actions={dialogActions}
              closeOnDimmerClick={closeOnDimmer === "true"}
              aria-label={!dialogTitle ? "Dialog" : undefined}
            />
          </div>

          {/* Control Panel */}
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
                label="Title"
                options={[
                  { value: "with", label: "With title" },
                  { value: "without", label: "Without" },
                ]}
                value={hasTitle}
                onChange={(v) => setHasTitle(v as "with" | "without")}
              />

              <RadioGroup
                label="Actions"
                options={[
                  { value: "two", label: "Two actions" },
                  { value: "one", label: "One action" },
                ]}
                value={actionCount}
                onChange={(v) => setActionCount(v as "one" | "two")}
              />

              <RadioGroup
                label="Close on Dimmer"
                options={[
                  { value: "false", label: "False" },
                  { value: "true", label: "True" },
                ]}
                value={closeOnDimmer}
                onChange={(v) => setCloseOnDimmer(v as "false" | "true")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Generated Code */}
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
          <div style={{ display: "flex", gap: spacing.primitive[2] }}>
            <span style={{
              fontSize: typography.fontSize.compact,
              fontWeight: typography.fontWeight.semibold,
              padding: `${spacing.primitive[1]}px ${spacing.primitive[3]}px`,
              borderRadius: 6, // optical: between xs(4) and sm(8), intentional for compact tab badge
              color: "var(--content-base-onColor)",
              backgroundColor: "var(--docs-code-active-bg)",
            }}>Web</span>
          </div>
          <CopyButton text={generateCode()} />
        </div>
        <pre
          style={{
            margin: 0,
            padding: spacing.primitive[4],
            fontSize: typography.fontSize.compact,
            lineHeight: 1.6,
            color: "var(--docs-code-text)",
            backgroundColor: "var(--docs-code-surface)",
            fontFamily: "'SF Mono', 'Fira Code', monospace",
            overflow: "auto",
          }}
        >
          <code>{highlightCode(generateCode())}</code>
        </pre>
      </div>
    </div>
  );
}

function PlatformContent({ platform }: { platform: Platform }) {
  if (platform === "design") {
    return <DesignContent />;
  }
  return <WebContent />;
}

function DesignContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>
      {/* Overview */}
      <Section title="Overview">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7 }}>
          <InlineCode>Dialog</InlineCode>는 중요한 결정이나 확인이 필요한 상황에서 사용하는 모달 컴포넌트입니다.
          삭제, 로그아웃, 권한 요청 등 되돌리기 어렵거나 영향 범위가 큰 액션을 실행하기 전에 사용자의 의도를 명확히 확인합니다.
        </p>
      </Section>

      {/* Anatomy */}
      <Section title="Anatomy">
        <div style={{
          backgroundColor: "var(--surface-base-alternative)",
          borderRadius: radius.primitive.lg,
          padding: `${spacing.primitive[12]}px ${spacing.primitive[10]}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <svg width="420" height="200" viewBox="0 0 420 200">
            {/* Backdrop hint */}
            <rect x="0" y="0" width="420" height="200" rx="8" fill="black" fillOpacity={0.08} />

            {/* Dialog container */}
            <rect x="80" y="20" width="260" height="160" rx="16" fill="white" stroke="var(--border-base-default)" strokeWidth="1.5" />

            {/* Title */}
            <rect x="104" y="44" width="120" height="12" rx="4" fill="var(--content-base-strong)" opacity="0.85" />

            {/* Description */}
            <rect x="104" y="68" width="210" height="8" rx="3" fill="var(--border-base-default)" />
            <rect x="104" y="82" width="160" height="8" rx="3" fill="var(--border-base-default)" />

            {/* Buttons */}
            <rect x="175" y="128" width="68" height="28" rx="8" fill="var(--border-base-default)" />
            <rect x="251" y="128" width="68" height="28" rx="8" fill="var(--content-error-default)" opacity="0.85" />

            {/* Annotation lines */}
            <line x1="50" y1="50" x2="80" y2="50" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="80" cy="50" r="3" fill="var(--content-base-default)" />

            <line x1="50" y1="75" x2="80" y2="75" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="80" cy="75" r="3" fill="var(--content-base-default)" />

            <line x1="370" y1="142" x2="340" y2="142" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="340" cy="142" r="3" fill="var(--content-base-default)" />

            {/* Number badges */}
            <circle cx="36" cy="50" r="12" fill="var(--content-base-default)" />
            <text x="36" y="55" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">1</text>

            <circle cx="36" cy="75" r="12" fill="var(--content-base-default)" />
            <text x="36" y="80" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">2</text>

            <circle cx="384" cy="142" r="12" fill="var(--content-base-default)" />
            <text x="384" y="147" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">3</text>
          </svg>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: spacing.primitive[6],
          marginTop: spacing.primitive[5],
          fontSize: typography.fontSize.sm,
          fontWeight: typography.fontWeight.medium,
          color: "var(--text-primary)",
        }}>
          <div>1. Title (optional)</div>
          <div style={{ textAlign: "center" }}>2. Description</div>
          <div style={{ textAlign: "right" }}>3. Actions</div>
        </div>
      </Section>

      {/* Variants */}
      <Section title="Variants">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[5], lineHeight: 1.7 }}>
          Dialog는 액션 구성에 따라 두 가지 레이아웃을 지원합니다.
        </p>
        <Subsection title="Two Actions (권장)">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
            취소와 확인으로 구성된 표준 패턴입니다. 사용자가 결정을 취소할 수 있는 안전한 탈출구를 제공합니다.
          </p>
          <PreviewBox>
            <TwoActionDialogPreview />
          </PreviewBox>
        </Subsection>
        <Subsection title="One Action">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
            단순 확인만 필요한 경우 단일 버튼을 전체 너비로 표시합니다. 알림성 메시지나 단방향 동의에 사용합니다.
          </p>
          <PreviewBox>
            <OneActionDialogPreview />
          </PreviewBox>
        </Subsection>
      </Section>

      {/* States */}
      <Section title="States">
        <Subsection title="Interaction States">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: spacing.primitive[4] }}>
            Dialog는 열림/닫힘 두 가지 상태를 가지며, 각각 Enter/Exit 애니메이션으로 전환됩니다.
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: spacing.primitive[4],
            padding: spacing.primitive[6],
            backgroundColor: "var(--surface-base-alternative)",
            borderRadius: radius.primitive.lg,
          }}>
            <StateCard label="Closed" sublabel="마운트 해제됨">
              <div style={{
                width: 120, height: 70,
                backgroundColor: "var(--surface-base-default)",
                borderRadius: radius.primitive.sm,
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "1px dashed var(--divider)",
              }}>
                <span style={{ fontSize: 11, color: "var(--content-base-tertiary)" }}>No portal</span>
              </div>
            </StateCard>
            <StateCard label="Enter" sublabel="scale + fade in">
              <div style={{
                width: 120, height: 70,
                backgroundColor: "var(--surface-base-default)",
                borderRadius: radius.primitive.sm,
                border: "1px solid var(--border-base-default)",
                boxShadow: "var(--shadow-primitive-md)",
                opacity: 0.6,
                transform: "scale(0.97)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontSize: 11, color: "var(--content-base-secondary)", fontWeight: typography.fontWeight.medium }}>Animating...</span>
              </div>
            </StateCard>
            <StateCard label="Open" sublabel="완전히 표시됨">
              <div style={{
                width: 120, height: 70,
                backgroundColor: "var(--surface-base-default)",
                borderRadius: radius.primitive.sm,
                border: "1px solid var(--border-base-default)",
                boxShadow: "var(--shadow-semantic-modal-default)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontSize: 11, color: "var(--content-base-default)", fontWeight: typography.fontWeight.semibold }}>Visible</span>
              </div>
            </StateCard>
          </div>
        </Subsection>
      </Section>

      {/* Usage Guidelines */}
      <Section title="Usage Guidelines">
        <Subsection title="Design Principles">
          <div style={{ display: "grid", gap: spacing.primitive[4] }}>
            <PrincipleCard
              number={1}
              title="의도적 결정을 유도하세요"
              desc="Dialog는 기본적으로 백드롭 클릭으로 닫히지 않습니다(closeOnDimmerClick=false). 중요한 결정은 명시적인 버튼 클릭으로만 처리되어야 합니다."
            />
            <PrincipleCard
              number={2}
              title="Destructive 액션은 error 색상으로"
              desc="삭제, 탈퇴 등 되돌릴 수 없는 액션의 확인 버튼은 color='error'를 사용합니다. 취소 버튼은 항상 neutral + weak로 안전하게 표시합니다."
            />
            <PrincipleCard
              number={3}
              title="간결한 메시지를 사용하세요"
              desc="title은 질문형으로 간결하게, description은 결과를 명확히 설명합니다. 사용자가 결정을 내리는 데 필요한 최소한의 정보만 제공합니다."
            />
          </div>
        </Subsection>

        <Subsection title="Best Practices">
          <div style={{ display: "grid", gap: spacing.primitive[5] }}>
            {/* Pair 1: Destructive color */}
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <DoCard>
                    <MiniDialog
                      title="계정 삭제"
                      desc="삭제된 데이터는 복구할 수 없습니다."
                      cancelLabel="취소"
                      confirmLabel="삭제"
                      confirmColor="var(--content-error-default)"
                    />
                  </DoCard>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <DontCard>
                    <MiniDialog
                      title="계정 삭제"
                      desc="삭제된 데이터는 복구할 수 없습니다."
                      cancelLabel="취소"
                      confirmLabel="삭제"
                      confirmColor="var(--content-brand-default)"
                    />
                  </DontCard>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> 파괴적 액션은 error 색상으로 위험성을 전달합니다
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0, fontStyle: "italic" }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Don&apos;t</span> primary 색상은 파괴적 의도를 숨깁니다
                </p>
              </div>
            </div>

            {/* Pair 2: Escape hatch */}
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <DoCard>
                    <MiniDialog
                      title="저장하시겠어요?"
                      desc="변경사항이 저장됩니다."
                      cancelLabel="취소"
                      confirmLabel="저장"
                      confirmColor="var(--content-brand-default)"
                    />
                  </DoCard>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <DontCard>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: typography.fontSize.compact, color: "var(--content-base-secondary)", marginBottom: spacing.primitive[2] }}>확인 버튼만 있는 다이얼로그</div>
                      <MiniDialog
                        desc="변경사항이 저장됩니다."
                        confirmLabel="확인"
                        confirmColor="var(--content-brand-default)"
                      />
                    </div>
                  </DontCard>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> 취소 버튼으로 사용자에게 탈출구를 제공합니다
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0, fontStyle: "italic" }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Don&apos;t</span> 선택지가 없으면 사용자가 갇힌 느낌을 받습니다
                </p>
              </div>
            </div>
          </div>
        </Subsection>
      </Section>

      {/* Design Tokens */}
      <Section title="Design Tokens">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: spacing.primitive[4] }}>
          Dialog 컴포넌트에 적용된 Foundation 기반 디자인 토큰입니다.
        </p>
        <div style={{ overflowX: "auto", borderRadius: radius.primitive.md, border: "1px solid var(--divider)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.compact }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={{ textAlign: "left", padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-primary)", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>Property</th>
                <th style={{ textAlign: "left", padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-primary)", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>Token</th>
                <th style={{ textAlign: "left", padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-primary)", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-primary)" }}>Container Border Radius</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}><InlineCode>radius.primitive[&apos;2xl&apos;]</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>24px</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-primary)" }}>Container Padding</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}><InlineCode>spacing.primitive[6]</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>24px</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-primary)" }}>Max Width</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}><InlineCode>360px</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>360px</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-primary)" }}>Background</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}><InlineCode>surface.base.default</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>var(--surface-base-default)</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-primary)" }}>Backdrop</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}><InlineCode>var(--overlay-dim)</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>overlay-dim token (라이트/다크 자동 전환)</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-primary)" }}>Shadow</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}><InlineCode>cssVarShadow.semantic.modal.default</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>modal shadow token</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-primary)" }}>z-index</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}><InlineCode>zIndex.modal</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>1100</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-primary)" }}>Title Font Size</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}><InlineCode>typography.fontSize.lg</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>18px / Bold</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-primary)" }}>Description Font Size</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}><InlineCode>typography.fontSize.sm</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>14px / Regular</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-primary)" }}>Actions Gap</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}><InlineCode>spacing.primitive[2]</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>8px</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-primary)" }}>Animation Duration</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}><InlineCode>180ms</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>cubic-bezier(0.16, 1, 0.3, 1)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* Accessibility */}
      <Section title="Accessibility">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[5], lineHeight: 1.7 }}>
          Dialog는 WAI-ARIA 다이얼로그 패턴을 준수합니다.
        </p>

        <div style={{ overflow: "auto", borderRadius: radius.primitive.md, border: "1px solid var(--divider)", marginBottom: spacing.primitive[6] }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>속성</th>
                <th style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>role=&quot;alertdialog&quot;</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>스크린 리더에 경고 다이얼로그임을 전달</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>aria-modal=&quot;true&quot;</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>배경 콘텐츠 접근 차단</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>aria-labelledby</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>title이 있을 때 자동 연결</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, borderBottom: "1px solid var(--divider)" }}><InlineCode>aria-label</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>title 없을 때 필수 — 접근성 레이블 직접 제공</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}><InlineCode>aria-describedby</InlineCode></td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>description이 있을 때 자동 연결</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Subsection title="Keyboard Interaction">
          <div style={{ overflow: "auto", borderRadius: radius.primitive.md, border: "1px solid var(--divider)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
              <thead>
                <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                  <th style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>키</th>
                  <th style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>동작</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, borderBottom: "1px solid var(--divider)" }}><kbd style={{ padding: "2px 6px", backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.xs, fontSize: typography.fontSize.xs }}>Tab</kbd></td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>액션 버튼 간 포커스 이동</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, borderBottom: "1px solid var(--divider)" }}><kbd style={{ padding: "2px 6px", backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.xs, fontSize: typography.fontSize.xs }}>Enter</kbd> / <kbd style={{ padding: "2px 6px", backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.xs, fontSize: typography.fontSize.xs }}>Space</kbd></td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>포커스된 버튼 실행</td>
                </tr>
                <tr>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px` }}><kbd style={{ padding: "2px 6px", backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.xs, fontSize: typography.fontSize.xs }}>Esc</kbd></td>
                  <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>다이얼로그 닫기 (onClose 호출)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>
      </Section>

      {/* Related Components */}
      <Section title="Related Components">
        <div style={{ overflow: "auto", borderRadius: radius.primitive.md, border: "1px solid var(--divider)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={{ textAlign: "left", padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>컴포넌트</th>
                <th style={{ textAlign: "left", padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>용도</th>
                <th style={{ textAlign: "left", padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>차이점</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>Button</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>직접 액션 실행</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>Dialog는 중간 확인 단계를 추가함</td>
              </tr>
              <tr>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>Card</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>콘텐츠 컨테이너</td>
                <td style={{ padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`, color: "var(--text-secondary)" }}>Card는 인라인, Dialog는 포털 기반 모달</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}

const GITHUB_BASE = "https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system/src";
const ALERT_DIALOG_SOURCE = `${GITHUB_BASE}/components/AlertDialog/AlertDialog.tsx`;

function WebContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>
      {/* Source Code */}
      <Section title="Source Code">
        <div style={{ padding: spacing.primitive[4], backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.md, marginBottom: spacing.primitive[6], display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)", margin: 0 }}>Dialog Component</p>
            <p style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", margin: `${spacing.primitive[1]}px 0 0 0` }}>실제 컴포넌트 소스 코드를 GitHub에서 확인하세요.</p>
          </div>
          <a
            href={ALERT_DIALOG_SOURCE}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6, // optical: sub-token gap for icon+text in compact link
              padding: `${spacing.primitive[2]}px ${spacing.primitive[4]}px`,
              fontSize: typography.fontSize.compact,
              fontWeight: typography.fontWeight.medium,
              color: "var(--content-base-onColor)",
              backgroundColor: "var(--docs-code-surface)",
              borderRadius: radius.primitive.md,
              textDecoration: "none",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View on GitHub
          </a>
        </div>
      </Section>

      {/* Import */}
      <Section title="Import">
        <CodeBlock code={`import { Dialog } from '@baerae-zkap/design-system';`} />
      </Section>

      {/* Basic Usage */}
      <Section title="Basic Usage">
        <CodeBlock code={`const [open, setOpen] = useState(false);

<Button buttonType="weak" color="neutral" onClick={() => setOpen(true)}>
  Open Dialog
</Button>

<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="삭제하시겠어요?"
  description="이 작업은 되돌릴 수 없습니다."
  actions={[
    { label: '취소', onClick: () => setOpen(false), color: 'neutral', variant: 'weak' },
    { label: '삭제', onClick: handleDelete, color: 'error', variant: 'filled' },
  ]}
/>`} />
      </Section>

      {/* Single Action */}
      <Section title="Single Action">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          액션이 하나일 경우 전체 너비 버튼으로 표시됩니다.
        </p>
        <CodeBlock code={`<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="업데이트 완료"
  description="앱이 최신 버전으로 업데이트되었습니다."
  actions={[
    { label: '확인', onClick: () => setOpen(false) },
  ]}
/>`} />
      </Section>

      {/* Without Title */}
      <Section title="Without Title">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          <InlineCode>title</InlineCode>을 생략할 경우 <InlineCode>aria-label</InlineCode>을 반드시 제공해야 합니다.
        </p>
        <CodeBlock code={`<Dialog
  open={open}
  onClose={() => setOpen(false)}
  aria-label="로그아웃 확인"
  description="정말 로그아웃하시겠어요?"
  actions={[
    { label: '취소', onClick: () => setOpen(false), color: 'neutral', variant: 'weak' },
    { label: '로그아웃', onClick: handleLogout, color: 'error', variant: 'filled' },
  ]}
/>`} />
      </Section>

      {/* Close on Dimmer */}
      <Section title="Close on Dimmer Click">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          기본값은 <InlineCode>false</InlineCode>입니다. 중요도가 낮은 알림에는 <InlineCode>closeOnDimmerClick</InlineCode>을 활성화할 수 있습니다.
        </p>
        <CodeBlock code={`<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="알림"
  description="새 메시지가 도착했습니다."
  closeOnDimmerClick
  actions={[
    { label: '확인', onClick: () => setOpen(false) },
  ]}
/>`} />
      </Section>

      {/* API Reference */}
      <Section title="API Reference">
        <PropsTable
          props={[
            { name: "open", type: "boolean", required: true, description: "다이얼로그 열림 여부" },
            { name: "onClose", type: "() => void", required: true, description: "닫기 콜백 (Esc, 백드롭 클릭, 버튼)" },
            { name: "actions", type: "DialogAction[]", required: true, description: "액션 버튼 목록 (1-2개)" },
            { name: "title", type: "ReactNode", required: false, description: "다이얼로그 제목 (선택적 — 없으면 aria-label 필수)" },
            { name: "description", type: "ReactNode", required: false, description: "본문 내용" },
            { name: "closeOnDimmerClick", type: "boolean", required: false, defaultVal: "false", description: "백드롭 클릭 시 닫기 여부" },
            { name: "aria-label", type: "string", required: false, description: "title 없을 때 접근성 레이블 (필수)" },
          ]}
        />

        <div style={{ marginTop: spacing.primitive[6] }}>
          <p style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)", marginBottom: spacing.primitive[3] }}>DialogAction</p>
          <PropsTable
            props={[
              { name: "label", type: "string", required: true, description: "버튼 레이블" },
              { name: "onClick", type: "() => void", required: true, description: "버튼 클릭 핸들러" },
              { name: "color", type: "ButtonColor", required: false, defaultVal: "자동", description: "버튼 색상 (마지막 버튼 기본값: primary, 앞 버튼: neutral)" },
              { name: "variant", type: '"filled" | "weak"', required: false, defaultVal: "자동", description: "버튼 타입 (마지막 버튼 기본값: filled, 앞 버튼: weak)" },
            ]}
          />
        </div>
      </Section>
    </div>
  );
}

// ============================================
// Preview Components
// ============================================

function TwoActionDialogPreview() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: spacing.primitive[6] }}>
      <div style={{
        width: 280,
        backgroundColor: "var(--surface-base-default)",
        borderRadius: radius.primitive["2xl"],
        padding: spacing.primitive[6],
        boxShadow: "var(--shadow-semantic-modal-default)",
        border: "1px solid var(--divider)",
      }}>
        <div style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.bold, color: "var(--content-base-default)", marginBottom: spacing.primitive[2] }}>
          삭제하시겠어요?
        </div>
        <div style={{ fontSize: typography.fontSize.sm, color: "var(--content-base-secondary)", lineHeight: 1.6, marginBottom: spacing.primitive[5] }}>
          이 작업은 되돌릴 수 없습니다.
        </div>
        <div style={{ display: "flex", gap: spacing.primitive[2] }}>
          <Button buttonType="weak" color="neutral" size="medium" layout="fillWidth">취소</Button>
          <Button buttonType="filled" color="error" size="medium" layout="fillWidth">삭제</Button>
        </div>
      </div>
    </div>
  );
}

function OneActionDialogPreview() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: spacing.primitive[6] }}>
      <div style={{
        width: 280,
        backgroundColor: "var(--surface-base-default)",
        borderRadius: radius.primitive["2xl"],
        padding: spacing.primitive[6],
        boxShadow: "var(--shadow-semantic-modal-default)",
        border: "1px solid var(--divider)",
      }}>
        <div style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.bold, color: "var(--content-base-default)", marginBottom: spacing.primitive[2] }}>
          업데이트 완료
        </div>
        <div style={{ fontSize: typography.fontSize.sm, color: "var(--content-base-secondary)", lineHeight: 1.6, marginBottom: spacing.primitive[5] }}>
          앱이 최신 버전으로 업데이트되었습니다.
        </div>
        <Button buttonType="filled" color="primary" size="medium" layout="fillWidth">확인</Button>
      </div>
    </div>
  );
}

function MiniDialog({
  title,
  desc,
  cancelLabel,
  confirmLabel,
  confirmColor,
}: {
  title?: string;
  desc: string;
  cancelLabel?: string;
  confirmLabel: string;
  confirmColor: string;
}) {
  return (
    <div style={{
      width: "100%",
      maxWidth: 200,
      backgroundColor: "var(--surface-base-default)",
      borderRadius: radius.primitive.md,
      padding: spacing.primitive[3],
      boxShadow: "var(--shadow-primitive-sm)",
      border: "1px solid var(--divider)",
    }}>
      {/* MiniDialog uses sub-token scale values for decorative preview illustration */}
      {title && (
        <div style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.bold, color: "var(--content-base-default)", marginBottom: spacing.primitive[1] }}>
          {title}
        </div>
      )}
      <div style={{ fontSize: 11, color: "var(--content-base-secondary)", lineHeight: 1.5, marginBottom: spacing.primitive[3] }}>
        {/* fontSize:11 and marginBottom:10 are sub-token decorative values */}
        {desc}
      </div>
      <div style={{ display: "flex", gap: 6, justifyContent: cancelLabel ? "flex-end" : "stretch" }}>
        {/* gap:6 is sub-token decorative value for mini preview */}
        {cancelLabel && (
          <div style={{
            padding: "5px 10px", borderRadius: 6, fontSize: 11, fontWeight: typography.fontWeight.medium,
            /* padding/borderRadius/fontSize are sub-token decorative values for mini preview */
            backgroundColor: "var(--surface-base-alternative)", color: "var(--content-base-secondary)",
          }}>
            {cancelLabel}
          </div>
        )}
        <div style={{
          padding: "5px 10px", borderRadius: 6, fontSize: 11, fontWeight: typography.fontWeight.semibold,
          /* padding/borderRadius/fontSize are sub-token decorative values for mini preview */
          backgroundColor: confirmColor, color: "white",
          flex: cancelLabel ? undefined : 1, textAlign: "center",
        }}>
          {confirmLabel}
        </div>
      </div>
    </div>
  );
}

function StateCard({ label, sublabel, children }: {
  label: string; sublabel: string; children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[3], padding: spacing.primitive[4] }}>
      {children}
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>{label}</div>
        <div style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", marginTop: 2 /* optical: sub-token tight gap */ }}>{sublabel}</div>
      </div>
    </div>
  );
}
