"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform, highlightCode } from "@/components/PlatformTabs";
import { StateView, Button, TextButton, typography, spacing, radius } from "@baerae-zkap/design-system";
import { Section, Subsection, InlineCode } from "@/components/docs/Section";
import { PropsTable } from "@/components/docs/PropsTable";
import { PrincipleCard, DoCard, DontCard } from "@/components/docs/Cards";
import { DoLabel, DontLabel } from "@/components/docs/Labels";
import { RadioGroup, CopyButton } from "@/components/docs/Playground";

export default function StateViewPage() {
  return (
    <div style={{ maxWidth: 720 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Feedback" },
          { label: "State View" },
        ]}
      />

      {/* Header */}
      <h1 style={{ fontSize: typography.fontSize["3xl"], fontWeight: 700, marginBottom: spacing.primitive[2], color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
        State View
      </h1>
      <p style={{ fontSize: typography.fontSize.md, color: "var(--text-secondary)", marginBottom: spacing.primitive[8], lineHeight: 1.7 }}>
        비어있음, 오류, 결과 등 다양한 상태를 하나의 API로 표현하는 범용 상태 컴포넌트입니다.
      </p>

      {/* Interactive Playground */}
      <StateViewPlayground />

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

function StateViewPlayground() {
  const [variant, setVariant] = useState<"inline" | "page">("inline");
  const [size, setSize] = useState<"default" | "compact">("default");
  const [hasTitle, setHasTitle] = useState<"yes" | "no">("yes");
  const [hasDescription, setHasDescription] = useState<"yes" | "no">("yes");
  const [hasPrimary, setHasPrimary] = useState<"yes" | "no">("yes");
  const [hasSecondary, setHasSecondary] = useState<"yes" | "no">("no");

  const generateCode = () => {
    const lines: string[] = [];
    lines.push("<StateView");
    if (variant !== "inline") lines.push(`  variant="${variant}"`);
    if (variant === "inline" && size !== "default") lines.push(`  size="${size}"`);
    lines.push("  figure={<EmptyIcon />}");
    if (hasTitle === "yes") lines.push('  title="아직 항목이 없어요"');
    if (hasDescription === "yes") lines.push('  description="새 항목을 추가해 시작해보세요."');
    if (hasPrimary === "yes") {
      if (variant === "page") {
        lines.push('  primaryAction={<Button buttonType="filled" color="primary" layout="fillWidth">홈으로</Button>}');
      } else {
        lines.push('  primaryAction={<Button buttonType="weak" color="primary">추가하기</Button>}');
      }
    }
    if (hasPrimary === "yes" && hasSecondary === "yes") {
      if (variant === "page") {
        lines.push('  secondaryAction={<TextButton color="neutral">목록 보기</TextButton>}');
      } else {
        lines.push('  secondaryAction={<TextButton>더 알아보기</TextButton>}');
      }
    }
    lines.push("/>");
    return lines.join("\n");
  };

  const previewStyle = variant === "page"
    ? { height: 400, overflowY: "hidden" as const, display: "flex", alignItems: "center", justifyContent: "center" }
    : {};

  return (
    <div style={{ marginBottom: spacing.primitive[8] }}>
      <div
        style={{
          borderRadius: 20,
          overflow: "hidden",
          backgroundColor: "var(--surface-base-alternative)",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", height: 480 }}>
          {/* Preview Area */}
          <div
            style={{
              padding: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "var(--surface-base-alternative)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: 360,
                backgroundColor: "var(--surface-base-default)",
                borderRadius: radius.primitive.lg,
                overflow: "hidden",
                ...previewStyle,
              }}
            >
              <StateView
                variant={variant}
                size={variant === "inline" ? size : "default"}
                figure={<PlaygroundEmptyIcon />}
                title={hasTitle === "yes" ? "아직 항목이 없어요" : undefined}
                description={hasDescription === "yes" ? "새 항목을 추가해 시작해보세요." : undefined}
                primaryAction={
                  hasPrimary === "yes"
                    ? variant === "page"
                      ? <Button buttonType="filled" color="primary" layout="fillWidth">홈으로</Button>
                      : <Button buttonType="weak" color="primary">추가하기</Button>
                    : undefined
                }
                secondaryAction={
                  hasPrimary === "yes" && hasSecondary === "yes"
                    ? variant === "page"
                      ? <TextButton color="neutral">목록 보기</TextButton>
                      : <TextButton>더 알아보기</TextButton>
                    : undefined
                }
              />
            </div>
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
                gap: 28,
                backgroundColor: "var(--surface-base-default)",
                borderRadius: spacing.primitive[4],
              }}
            >
              <RadioGroup
                label="variant"
                options={[
                  { value: "inline", label: "inline" },
                  { value: "page", label: "page" },
                ]}
                value={variant}
                onChange={(v) => setVariant(v as "inline" | "page")}
              />

              <RadioGroup
                label="size"
                options={[
                  { value: "default", label: "default" },
                  { value: "compact", label: "compact" },
                ]}
                value={size}
                onChange={(v) => setSize(v as "default" | "compact")}
                disabled={variant === "page"}
              />

              <RadioGroup
                label="title"
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
                value={hasTitle}
                onChange={(v) => setHasTitle(v as "yes" | "no")}
              />

              <RadioGroup
                label="description"
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
                value={hasDescription}
                onChange={(v) => setHasDescription(v as "yes" | "no")}
              />

              <RadioGroup
                label="primaryAction"
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
                value={hasPrimary}
                onChange={(v) => {
                  setHasPrimary(v as "yes" | "no");
                  if (v === "no") setHasSecondary("no");
                }}
              />

              <RadioGroup
                label="secondaryAction"
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
                value={hasSecondary}
                onChange={(v) => setHasSecondary(v as "yes" | "no")}
                disabled={hasPrimary === "no"}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Generated Code */}
      <div style={{ marginTop: spacing.primitive[4], borderRadius: radius.primitive.md, overflow: "hidden", border: "1px solid var(--divider)" }}>
        <div
          style={{
            padding: "10px 16px",
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
              padding: "4px 12px",
              borderRadius: 6,
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

// ============================================
// Design Tab
// ============================================

function DesignContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>
      {/* Overview */}
      <Section title="Overview">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7 }}>
          <InlineCode>StateView</InlineCode>는 비어있음, 오류, 결과 등 다양한 상태를 하나의 API로 표현하는 범용 상태 컴포넌트입니다.
          <InlineCode>variant=&quot;inline&quot;</InlineCode>으로 콘텐츠 영역 내에 삽입하거나,{" "}
          <InlineCode>variant=&quot;page&quot;</InlineCode>로 전체 페이지 결과 화면을 구성할 수 있습니다.
        </p>
      </Section>

      {/* Anatomy */}
      <Section title="Anatomy">
        <div style={{
          backgroundColor: "var(--surface-base-alternative)",
          borderRadius: radius.primitive.lg,
          padding: "48px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <svg width="340" height="260" viewBox="0 0 340 260">
            {/* Container outline */}
            <rect x="80" y="10" width="180" height="240" rx="12" fill="var(--surface-base-default)" stroke="var(--border-base-default)" strokeWidth="1.5" />

            {/* 1. figure */}
            <rect x="130" y="30" width="80" height="60" rx="10" fill="var(--surface-base-alternative)" stroke="var(--border-base-default)" strokeWidth="1" />
            <circle cx="170" cy="60" r="18" fill="var(--border-base-default)" />

            {/* 2. title */}
            <rect x="115" y="105" width="110" height="12" rx="4" fill="var(--content-base-strong)" opacity="0.8" />

            {/* 3. description */}
            <rect x="100" y="127" width="140" height="8" rx="3" fill="var(--border-base-default)" />
            <rect x="110" y="141" width="120" height="8" rx="3" fill="var(--border-base-default)" />

            {/* 4. primaryAction */}
            <rect x="120" y="165" width="100" height="28" rx="8" fill="var(--content-brand-default)" opacity="0.85" />

            {/* 5. secondaryAction */}
            <rect x="130" y="201" width="80" height="28" rx="8" fill="var(--surface-base-alternative)" stroke="var(--border-base-default)" strokeWidth="1" />

            {/* Annotation lines - left side */}
            <line x1="44" y1="60" x2="80" y2="60" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="80" cy="60" r="3" fill="var(--content-base-default)" />

            <line x1="44" y1="111" x2="80" y2="111" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="80" cy="111" r="3" fill="var(--content-base-default)" />

            <line x1="44" y1="134" x2="80" y2="134" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="80" cy="134" r="3" fill="var(--content-base-default)" />

            {/* Annotation lines - right side */}
            <line x1="296" y1="179" x2="260" y2="179" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="260" cy="179" r="3" fill="var(--content-base-default)" />

            <line x1="296" y1="215" x2="260" y2="215" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="260" cy="215" r="3" fill="var(--content-base-default)" />

            {/* Number badges - left */}
            <circle cx="30" cy="60" r="12" fill="var(--content-base-default)" />
            <text x="30" y="65" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">1</text>

            <circle cx="30" cy="111" r="12" fill="var(--content-base-default)" />
            <text x="30" y="116" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">2</text>

            <circle cx="30" cy="134" r="12" fill="var(--content-base-default)" />
            <text x="30" y="139" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">3</text>

            {/* Number badges - right */}
            <circle cx="310" cy="179" r="12" fill="var(--content-base-default)" />
            <text x="310" y="184" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">4</text>

            <circle cx="310" cy="215" r="12" fill="var(--content-base-default)" />
            <text x="310" y="220" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">5</text>
          </svg>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: spacing.primitive[4],
          marginTop: spacing.primitive[5],
          fontSize: typography.fontSize.sm,
          color: "var(--text-primary)",
        }}>
          <div><span style={{ fontWeight: typography.fontWeight.semibold }}>1.</span> figure (optional)</div>
          <div style={{ textAlign: "center" }}><span style={{ fontWeight: typography.fontWeight.semibold }}>2.</span> title (optional)</div>
          <div style={{ textAlign: "right" }}><span style={{ fontWeight: typography.fontWeight.semibold }}>3.</span> description (optional)</div>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: spacing.primitive[4],
          marginTop: spacing.primitive[3],
          fontSize: typography.fontSize.sm,
          color: "var(--text-primary)",
        }}>
          <div><span style={{ fontWeight: typography.fontWeight.semibold }}>4.</span> primaryAction (optional)</div>
          <div style={{ textAlign: "right" }}><span style={{ fontWeight: typography.fontWeight.semibold }}>5.</span> secondaryAction (optional)</div>
        </div>
      </Section>

      {/* Variants */}
      <Section title="Variants">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[5], lineHeight: 1.7 }}>
          StateView는 두 가지 레이아웃 변형을 지원합니다.
        </p>

        <Subsection title="Inline — 콘텐츠 영역 삽입">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
            리스트, 카드 본문, 검색 결과 등 콘텐츠 영역 안에 인라인으로 삽입합니다.
            비어있음, 오류, 검색 결과 없음 등의 상태에 사용합니다.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: spacing.primitive[4] }}>
            <PreviewBox>
              <div style={{ backgroundColor: "var(--surface-base-default)", borderRadius: 12, overflow: "hidden" }}>
                <StateView
                  figure={<InlineEmptyIcon />}
                  title="항목이 없어요"
                  description="새 항목을 추가해보세요."
                  primaryAction={<Button buttonType="weak" color="primary" size="small">추가하기</Button>}
                />
              </div>
            </PreviewBox>
            <PreviewBox>
              <div style={{ backgroundColor: "var(--surface-base-default)", borderRadius: 12, overflow: "hidden" }}>
                <StateView
                  figure={<InlineErrorIcon />}
                  title="불러오지 못했어요"
                  description="잠시 후 다시 시도해주세요."
                  primaryAction={<TextButton>다시 시도</TextButton>}
                />
              </div>
            </PreviewBox>
            <PreviewBox>
              <div style={{ backgroundColor: "var(--surface-base-default)", borderRadius: 12, overflow: "hidden" }}>
                <StateView
                  figure={<InlineSearchIcon />}
                  title="검색 결과 없음"
                  description="다른 키워드로 검색해보세요."
                />
              </div>
            </PreviewBox>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
            <p style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", margin: 0, textAlign: "center" }}>Empty</p>
            <p style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", margin: 0, textAlign: "center" }}>Error</p>
            <p style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", margin: 0, textAlign: "center" }}>No results</p>
          </div>
        </Subsection>

        <Subsection title="Page — 전체 페이지 결과">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
            결제 완료, 오류 페이지, 처리 중 등 화면 전체를 차지하는 결과 화면에 사용합니다.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: spacing.primitive[4] }}>
            {[
              { icon: <PageSuccessIcon />, title: "결제 완료", desc: "주문이 접수됐어요", label: "Success" },
              { icon: <PageErrorIcon />, title: "오류가 발생했어요", desc: "잠시 후 다시 시도해주세요.", label: "Error" },
              { icon: <PageProcessingIcon />, title: "처리 중이에요", desc: "잠시만 기다려주세요.", label: "Processing" },
            ].map(({ icon, title, desc, label }) => (
              <div key={label}>
                <PreviewBox>
                  <div style={{
                    backgroundColor: "var(--surface-base-default)",
                    borderRadius: 12,
                    overflow: "hidden",
                    height: 220,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <StateView
                      variant="page"
                      figure={icon}
                      title={title}
                      description={desc}
                      primaryAction={<Button buttonType="filled" color="primary" layout="fillWidth">홈으로</Button>}
                    />
                  </div>
                </PreviewBox>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", margin: `${spacing.primitive[2]}px 0 0`, textAlign: "center" }}>{label}</p>
              </div>
            ))}
          </div>
        </Subsection>
      </Section>

      {/* Size */}
      <Section title="Size">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[5], lineHeight: 1.7 }}>
          <InlineCode>size</InlineCode> prop은 <InlineCode>inline</InlineCode> variant에서만 적용됩니다.
          제한된 공간에는 <InlineCode>compact</InlineCode>를 사용해 여백을 줄입니다.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
          <div>
            <PreviewBox>
              <div style={{ backgroundColor: "var(--surface-base-default)", borderRadius: 12, overflow: "hidden", width: "100%" }}>
                <StateView
                  size="default"
                  figure={<InlineEmptyIcon />}
                  title="항목이 없어요"
                  description="새 항목을 추가해보세요."
                  primaryAction={<Button buttonType="weak" color="primary" size="small">추가하기</Button>}
                />
              </div>
            </PreviewBox>
            <p style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", margin: `${spacing.primitive[2]}px 0 0`, textAlign: "center" }}>
              default — generous padding
            </p>
          </div>
          <div>
            <PreviewBox>
              <div style={{ backgroundColor: "var(--surface-base-default)", borderRadius: 12, overflow: "hidden", width: "100%" }}>
                <StateView
                  size="compact"
                  figure={<InlineEmptyIcon />}
                  title="항목이 없어요"
                  description="새 항목을 추가해보세요."
                  primaryAction={<Button buttonType="weak" color="primary" size="small">추가하기</Button>}
                />
              </div>
            </PreviewBox>
            <p style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", margin: `${spacing.primitive[2]}px 0 0`, textAlign: "center" }}>
              compact — tighter spacing
            </p>
          </div>
        </div>
      </Section>

      {/* States */}
      <Section title="States">
        <Subsection title="Interaction States">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: spacing.primitive[4] }}>
            StateView 자체는 인터랙션이 없는 정적 레이아웃 컴포넌트입니다.
            인터랙션은 <InlineCode>primaryAction</InlineCode>/<InlineCode>secondaryAction</InlineCode>에 전달되는 Button, TextButton이 처리합니다.
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: spacing.primitive[4],
            padding: spacing.primitive[6],
            backgroundColor: "var(--surface-base-alternative)",
            borderRadius: radius.primitive.lg,
          }}>
            {[
              { label: "Figure only", sublabel: "최소 구성" },
              { label: "Title + Description", sublabel: "콘텐츠 구성" },
              { label: "With Actions", sublabel: "액션 포함" },
            ].map(({ label, sublabel }) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: spacing.primitive[3], padding: spacing.primitive[3] }}>
                <div style={{
                  width: "100%",
                  backgroundColor: "var(--surface-base-default)",
                  borderRadius: 8,
                  border: "1px solid var(--border-base-default)",
                  padding: spacing.primitive[3],
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                }}>
                  <div style={{ width: 28, height: 28, borderRadius: 6, backgroundColor: "var(--surface-base-alternative)" }} />
                  {label !== "Figure only" && (
                    <>
                      <div style={{ width: 60, height: 8, borderRadius: 3, backgroundColor: "var(--border-base-default)", marginTop: 2 }} />
                      <div style={{ width: 80, height: 6, borderRadius: 3, backgroundColor: "var(--surface-base-alternative)" }} />
                    </>
                  )}
                  {label === "With Actions" && (
                    <div style={{ width: 60, height: 18, borderRadius: 5, backgroundColor: "var(--content-brand-default)", opacity: 0.8, marginTop: 2 }} />
                  )}
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>{label}</div>
                  <div style={{ fontSize: typography.fontSize.xs, color: "var(--text-tertiary)", marginTop: 2 }}>{sublabel}</div>
                </div>
              </div>
            ))}
          </div>
        </Subsection>
      </Section>

      {/* Usage Guidelines */}
      <Section title="Usage Guidelines">
        <Subsection title="Best Practices">
          <div style={{ display: "grid", gap: spacing.primitive[5] }}>

            {/* Pair 1: inline for lists */}
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <DoCard>
                    <div style={{
                      width: "100%",
                      maxWidth: 200,
                      backgroundColor: "var(--surface-base-default)",
                      borderRadius: 10,
                      overflow: "hidden",
                      border: "1px solid var(--divider)",
                    }}>
                      <div style={{ padding: "10px 12px", borderBottom: "1px solid var(--divider)", fontSize: 11, fontWeight: 600, color: "var(--content-base-default)" }}>즐겨찾기</div>
                      <StateView
                        size="compact"
                        figure={<MiniEmptyIcon />}
                        title="즐겨찾기가 없어요"
                        description="자주 쓰는 항목을 추가하세요."
                      />
                    </div>
                  </DoCard>
                  <DoLabel>리스트/카드 내 빈 상태에 inline을 사용하세요</DoLabel>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <DontCard>
                    <div style={{
                      width: "100%",
                      maxWidth: 200,
                      backgroundColor: "var(--surface-base-default)",
                      borderRadius: 10,
                      overflow: "hidden",
                      border: "1px solid var(--divider)",
                    }}>
                      <div style={{ padding: "10px 12px", borderBottom: "1px solid var(--divider)", fontSize: 11, fontWeight: 600, color: "var(--content-base-default)" }}>즐겨찾기</div>
                      <StateView
                        variant="page"
                        figure={<MiniEmptyIcon />}
                        title="즐겨찾기가 없어요"
                      />
                    </div>
                  </DontCard>
                  <DontLabel>카드 내부에 page variant를 사용하지 마세요</DontLabel>
                </div>
              </div>
            </div>

            {/* Pair 2: page for outcomes */}
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <DoCard>
                    <div style={{
                      width: "100%",
                      maxWidth: 180,
                      backgroundColor: "var(--surface-base-default)",
                      borderRadius: 10,
                      overflow: "hidden",
                      height: 140,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      <StateView
                        variant="page"
                        figure={<MiniSuccessIcon />}
                        title="결제 완료"
                        description="주문이 접수됐어요."
                        primaryAction={
                          <Button buttonType="filled" color="primary" layout="fillWidth" size="small">홈으로</Button>
                        }
                      />
                    </div>
                  </DoCard>
                  <DoLabel>결제, 가입 등 결과 화면에 page를 사용하세요</DoLabel>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <DontCard>
                    <div style={{
                      width: "100%",
                      maxWidth: 180,
                      backgroundColor: "var(--surface-base-default)",
                      borderRadius: 10,
                      overflow: "hidden",
                      border: "1px solid var(--divider)",
                    }}>
                      <div style={{ padding: "8px 10px", borderBottom: "1px solid var(--divider)", fontSize: 11, fontWeight: 600, color: "var(--content-base-default)" }}>결제</div>
                      <StateView
                        variant="page"
                        figure={<MiniSuccessIcon />}
                        title="결제 완료"
                        description="주문이 접수됐어요."
                      />
                    </div>
                  </DontCard>
                  <DontLabel>StateView를 다른 StateView 안에 중첩하지 마세요</DontLabel>
                </div>
              </div>
            </div>
          </div>
        </Subsection>
      </Section>

      {/* Design Tokens */}
      <Section title="Design Tokens">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: spacing.primitive[4] }}>
          StateView 컴포넌트에 적용된 Foundation 기반 디자인 토큰입니다.
        </p>
        <div style={{ overflowX: "auto", borderRadius: radius.primitive.md, border: "1px solid var(--divider)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.compact }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={{ textAlign: "left", padding: "10px 12px", color: "var(--text-primary)", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>Property</th>
                <th style={{ textAlign: "left", padding: "10px 12px", color: "var(--text-primary)", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>Token</th>
                <th style={{ textAlign: "left", padding: "10px 12px", color: "var(--text-primary)", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>Value</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Padding (inline default)", "spacing.primitive[10]", "40px"],
                ["Padding (inline compact)", "spacing.primitive[6]", "24px"],
                ["Padding (page)", "spacing.primitive[10]", "40px"],
                ["Figure max size (page)", "160px", "160px"],
                ["Figure max size (inline default)", "120px", "120px"],
                ["Figure max size (inline compact)", "80px", "80px"],
                ["Figure gap (page)", "spacing.primitive[8]", "32px"],
                ["Figure gap (inline default)", "spacing.primitive[5]", "20px"],
                ["Figure gap (inline compact)", "spacing.primitive[3]", "12px"],
                ["Title font size (page)", "typography.fontSize['2xl']", "24px / Bold"],
                ["Title font size (inline default)", "typography.fontSize.xl", "20px / Bold"],
                ["Title font size (inline compact)", "typography.fontSize.lg", "18px / Bold"],
                ["Description font size (default)", "typography.fontSize.sm", "14px"],
                ["Description font size (compact)", "typography.fontSize.compact", "12px"],
                ["Action max width (page)", "320px", "320px"],
                ["Actions gap", "spacing.primitive[3]", "12px"],
                ["Title color", "cssVarColors.content.base.default", "var(--content-base-default)"],
                ["Description color", "cssVarColors.content.base.secondary", "var(--content-base-secondary)"],
              ].map(([prop, token, value], i, arr) => (
                <tr key={prop} style={{ borderBottom: i === arr.length - 1 ? "none" : "1px solid var(--divider)" }}>
                  <td style={{ padding: "10px 12px", color: "var(--text-primary)" }}>{prop}</td>
                  <td style={{ padding: "10px 12px" }}><InlineCode>{token}</InlineCode></td>
                  <td style={{ padding: "10px 12px", color: "var(--text-secondary)" }}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Accessibility */}
      <Section title="Accessibility">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[5], lineHeight: 1.7 }}>
          StateView는 사용 맥락에 따라 적절한 ARIA 속성을 자동으로 적용합니다.
        </p>

        <div style={{ overflow: "auto", borderRadius: radius.primitive.md, border: "1px solid var(--divider)", marginBottom: spacing.primitive[6] }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={{ padding: "10px 14px", textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>속성</th>
                <th style={{ padding: "10px 14px", textAlign: "left", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--divider)" }}><InlineCode>role=&quot;status&quot;</InlineCode></td>
                <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>inline variant에 자동 적용. 스크린 리더에 상태 변화를 알림</td>
              </tr>
              <tr>
                <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--divider)" }}><InlineCode>&lt;h1&gt; 태그</InlineCode></td>
                <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>page variant에서 title을 h1으로 렌더링. 페이지 구조 정보 제공</td>
              </tr>
              <tr>
                <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--divider)" }}><InlineCode>aria-label (action)</InlineCode></td>
                <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>IconButton을 action으로 사용할 경우 aria-label 필수</td>
              </tr>
              <tr>
                <td style={{ padding: "10px 14px" }}><InlineCode>figure alt</InlineCode></td>
                <td style={{ padding: "10px 14px", color: "var(--text-secondary)" }}>이미지를 figure로 전달할 때 alt 텍스트 또는 aria-hidden 명시 권장</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* Related Components */}
      <Section title="Related Components">
        <div style={{ overflow: "auto", borderRadius: radius.primitive.md, border: "1px solid var(--divider)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={{ textAlign: "left", padding: "10px 14px", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>컴포넌트</th>
                <th style={{ textAlign: "left", padding: "10px 14px", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>용도</th>
                <th style={{ textAlign: "left", padding: "10px 14px", fontWeight: typography.fontWeight.semibold, fontSize: typography.fontSize.compact, borderBottom: "1px solid var(--divider)" }}>차이점</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "10px 14px", fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>AlertDialog</td>
                <td style={{ padding: "10px 14px", color: "var(--text-secondary)" }}>확인/취소가 필요한 중요 알림</td>
                <td style={{ padding: "10px 14px", color: "var(--text-secondary)" }}>AlertDialog는 모달, StateView는 인라인/페이지 레이아웃</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "10px 14px", fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>Button</td>
                <td style={{ padding: "10px 14px", color: "var(--text-secondary)" }}>액션 실행</td>
                <td style={{ padding: "10px 14px", color: "var(--text-secondary)" }}>primaryAction/secondaryAction 슬롯에 전달하여 사용</td>
              </tr>
              <tr>
                <td style={{ padding: "10px 14px", fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>TextButton</td>
                <td style={{ padding: "10px 14px", color: "var(--text-secondary)" }}>인라인 텍스트 액션</td>
                <td style={{ padding: "10px 14px", color: "var(--text-secondary)" }}>compact 인라인 상태에서 secondaryAction으로 적합</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}

// ============================================
// Web Tab
// ============================================

const GITHUB_BASE = "https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system/src";
const STATE_VIEW_SOURCE = `${GITHUB_BASE}/components/StateView/StateView.tsx`;

function WebContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>
      {/* Source Code */}
      <Section title="Source Code">
        <div style={{ padding: spacing.primitive[4], backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.md, marginBottom: spacing.primitive[6], display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)", margin: 0 }}>StateView Component</p>
            <p style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", margin: "4px 0 0 0" }}>실제 컴포넌트 소스 코드를 GitHub에서 확인하세요.</p>
          </div>
          <a
            href={STATE_VIEW_SOURCE}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
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
        <CodeBlock code={`import { StateView } from '@baerae-zkap/design-system';`} />
      </Section>

      {/* Basic Usage */}
      <Section title="Basic Usage">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          기본 inline variant로 리스트나 카드 내 빈 상태를 표시합니다.
        </p>
        <CodeBlock code={`<StateView
  figure={<EmptyIcon />}
  title="아직 항목이 없어요"
  description="새 항목을 추가해 시작해보세요."
  primaryAction={
    <Button buttonType="weak" color="primary">추가하기</Button>
  }
/>`} />
      </Section>

      {/* Page Variant */}
      <Section title="Page Variant">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          결제 완료, 회원가입 완료 등 전체 페이지 결과 화면에 사용합니다.
          액션 버튼은 <InlineCode>layout=&quot;fillWidth&quot;</InlineCode>를 권장합니다.
        </p>
        <CodeBlock code={`<StateView
  variant="page"
  figure={<SuccessIcon />}
  title="결제가 완료됐어요"
  description="주문이 정상적으로 접수됐습니다."
  primaryAction={
    <Button buttonType="filled" color="primary" layout="fillWidth">
      홈으로
    </Button>
  }
  secondaryAction={
    <Button buttonType="weak" color="neutral" layout="fillWidth">
      주문 내역 보기
    </Button>
  }
/>`} />
      </Section>

      {/* Compact Size */}
      <Section title="Compact Size">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          공간이 제한된 컨테이너 내 오류/빈 상태에는 <InlineCode>size=&quot;compact&quot;</InlineCode>와
          <InlineCode>TextButton</InlineCode>을 조합합니다.
        </p>
        <CodeBlock code={`<StateView
  size="compact"
  figure={<ErrorIcon />}
  title="불러오지 못했어요"
  primaryAction={
    <TextButton onClick={onRetry}>다시 시도</TextButton>
  }
/>`} />
      </Section>

      {/* API Reference */}
      <Section title="API Reference">
        <PropsTable
          props={[
            { name: "figure", type: "ReactNode", required: false, description: "일러스트, 아이콘, 이모지 등 시각적 요소" },
            { name: "title", type: "ReactNode", required: false, description: "주요 제목 텍스트. page variant에서는 h1으로 렌더링" },
            { name: "description", type: "ReactNode", required: false, description: "보조 설명 텍스트" },
            { name: "primaryAction", type: "ReactNode", required: false, description: "주요 액션. page variant에서는 layout=\"fillWidth\" 권장" },
            { name: "secondaryAction", type: "ReactNode", required: false, description: "보조 액션. primaryAction 없을 때 단독 사용 불가" },
            { name: "variant", type: '"inline" | "page"', required: false, defaultVal: '"inline"', description: "레이아웃 변형. inline: 콘텐츠 삽입 / page: 전체 화면 결과" },
            { name: "size", type: '"default" | "compact"', required: false, defaultVal: '"default"', description: "inline variant에서만 적용. compact는 여백을 줄임" },
          ]}
        />
      </Section>
    </div>
  );
}

// ============================================
// SVG Icons for Playground
// ============================================

function PlaygroundEmptyIcon() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="36" fill="var(--surface-base-alternative)" />
      <rect x="24" y="30" width="32" height="24" rx="4" stroke="var(--border-base-default)" strokeWidth="2" fill="none" />
      <path d="M28 30V26a4 4 0 0 1 4-4h16a4 4 0 0 1 4 4v4" stroke="var(--border-base-default)" strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="40" x2="48" y2="40" stroke="var(--border-base-default)" strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="46" x2="42" y2="46" stroke="var(--border-base-default)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ============================================
// SVG Icons for Inline variant previews
// ============================================

function InlineEmptyIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="28" fill="var(--surface-base-alternative)" />
      <rect x="20" y="24" width="24" height="18" rx="3" stroke="var(--border-base-default)" strokeWidth="1.5" fill="none" />
      <path d="M23 24V21a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v3" stroke="var(--border-base-default)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="24" y1="32" x2="40" y2="32" stroke="var(--border-base-default)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="24" y1="37" x2="34" y2="37" stroke="var(--border-base-default)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function InlineErrorIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="28" fill="var(--surface-base-alternative)" />
      <circle cx="32" cy="32" r="14" stroke="var(--content-error-default)" strokeWidth="1.5" fill="none" opacity="0.6" />
      <line x1="32" y1="25" x2="32" y2="33" stroke="var(--content-error-default)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="32" cy="38" r="1.5" fill="var(--content-error-default)" />
    </svg>
  );
}

function InlineSearchIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="28" fill="var(--surface-base-alternative)" />
      <circle cx="30" cy="30" r="10" stroke="var(--border-base-default)" strokeWidth="1.5" fill="none" />
      <line x1="37" y1="37" x2="44" y2="44" stroke="var(--border-base-default)" strokeWidth="2" strokeLinecap="round" />
      <line x1="27" y1="30" x2="33" y2="30" stroke="var(--border-base-default)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ============================================
// SVG Icons for Page variant previews
// ============================================

function PageSuccessIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="28" fill="var(--surface-base-alternative)" />
      <circle cx="32" cy="32" r="14" fill="var(--content-success-default)" opacity="0.15" />
      <circle cx="32" cy="32" r="14" stroke="var(--content-success-default)" strokeWidth="1.5" fill="none" />
      <path d="M25 32l5 5 9-9" stroke="var(--content-success-default)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PageErrorIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="28" fill="var(--surface-base-alternative)" />
      <circle cx="32" cy="32" r="14" fill="var(--content-error-default)" opacity="0.1" />
      <circle cx="32" cy="32" r="14" stroke="var(--content-error-default)" strokeWidth="1.5" fill="none" />
      <line x1="27" y1="27" x2="37" y2="37" stroke="var(--content-error-default)" strokeWidth="2" strokeLinecap="round" />
      <line x1="37" y1="27" x2="27" y2="37" stroke="var(--content-error-default)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PageProcessingIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="28" fill="var(--surface-base-alternative)" />
      <circle cx="32" cy="32" r="12" stroke="var(--border-base-default)" strokeWidth="1.5" fill="none" />
      <path d="M32 20 A12 12 0 0 1 44 32" stroke="var(--content-brand-default)" strokeWidth="2" strokeLinecap="round" fill="none" />
      <line x1="32" y1="26" x2="32" y2="32" stroke="var(--content-base-default)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="32" y1="32" x2="36" y2="36" stroke="var(--content-base-default)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ============================================
// SVG Icons for Best Practices (mini)
// ============================================

function MiniEmptyIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="16" fill="var(--surface-base-alternative)" />
      <rect x="10" y="13" width="16" height="12" rx="2" stroke="var(--border-base-default)" strokeWidth="1.5" fill="none" />
      <path d="M13 13V11a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" stroke="var(--border-base-default)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function MiniSuccessIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="16" fill="var(--surface-base-alternative)" />
      <circle cx="18" cy="18" r="8" stroke="var(--content-success-default)" strokeWidth="1.5" fill="none" />
      <path d="M14 18l3 3 5-5" stroke="var(--content-success-default)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
