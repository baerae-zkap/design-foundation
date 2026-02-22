"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform, highlightCode } from "@/components/PlatformTabs";
import { Skeleton, typography, spacing, radius } from "@baerae-zkap/design-system";
import type { SkeletonVariant } from "@baerae-zkap/design-system";
import { Section, Subsection, InlineCode } from "@/components/docs/Section";
import { PropsTable } from "@/components/docs/PropsTable";
import { DoCard, DontCard, PrincipleCard } from "@/components/docs/Cards";
import { RadioGroup, CopyButton } from "@/components/docs/Playground";

const GITHUB_BASE =
  "https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system/src";
const SKELETON_SOURCE = `${GITHUB_BASE}/components/Skeleton/Skeleton.tsx`;

export default function SkeletonPage() {
  return (
    <div style={{ maxWidth: 840 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Feedback" },
          { label: "Skeleton" },
        ]}
      />

      <h1
        style={{
          fontSize: typography.fontSize["3xl"],
          fontWeight: typography.fontWeight.bold,
          marginBottom: spacing.primitive[2],
          color: "var(--text-primary)",
          letterSpacing: "-0.02em",
        }}
      >
        Skeleton
      </h1>
      <p
        style={{
          fontSize: typography.fontSize.md,
          color: "var(--text-secondary)",
          marginBottom: spacing.primitive[8],
          lineHeight: 1.7,
        }}
      >
        Skeleton은 콘텐츠가 로드되는 동안 레이아웃을 보존하는 플레이스홀더입니다.
        레이아웃 구조가 예측 가능한 경우 Spinner 대신 사용하면 더 나은 사용자 경험을 제공합니다.
      </p>

      <SkeletonPlayground />

      <PlatformTabs>{(platform) => <PlatformContent platform={platform} />}</PlatformTabs>
    </div>
  );
}

// ─── Playground ──────────────────────────────────────────────────────

type Preset = "single" | "card" | "list" | "profile" | "media";

function CardPreview({ animate }: { animate: boolean }) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 300,
        padding: spacing.primitive[4],
        border: "1px solid var(--divider)",
        borderRadius: radius.primitive.md,
        backgroundColor: "var(--surface-base-default)",
      }}
    >
      <Skeleton variant="rectangular" width="100%" height={140} animate={animate} />
      <div style={{ marginTop: spacing.primitive[3], display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
        <Skeleton variant="text" width="70%" animate={animate} />
        <Skeleton variant="text" width="50%" animate={animate} />
        <Skeleton variant="text" width="85%" animate={animate} />
      </div>
    </div>
  );
}

function ListPreview({ animate }: { animate: boolean }) {
  return (
    <div style={{ width: "100%", maxWidth: 320 }}>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            display: "flex",
            gap: spacing.primitive[3],
            alignItems: "center",
            padding: `${spacing.primitive[3]}px 0`,
            borderBottom: i < 3 ? "1px solid var(--divider)" : "none",
          }}
        >
          <Skeleton variant="circular" width={44} height={44} animate={animate} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
            <Skeleton variant="text" width="65%" animate={animate} />
            <Skeleton variant="text" width="45%" animate={animate} />
          </div>
        </div>
      ))}
    </div>
  );
}

function ProfilePreview({ animate }: { animate: boolean }) {
  return (
    <div style={{ width: "100%", maxWidth: 320 }}>
      <div style={{ display: "flex", gap: spacing.primitive[4], alignItems: "center", marginBottom: spacing.primitive[4] }}>
        <Skeleton variant="circular" width={64} height={64} animate={animate} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
          <Skeleton variant="text" width="40%" animate={animate} />
          <Skeleton variant="text" width="70%" animate={animate} />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
        <Skeleton variant="text" width="100%" animate={animate} />
        <Skeleton variant="text" width="95%" animate={animate} />
        <Skeleton variant="text" width="80%" animate={animate} />
      </div>
    </div>
  );
}

function MediaPreview({ animate }: { animate: boolean }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: spacing.primitive[2],
        width: "100%",
        maxWidth: 280,
      }}
    >
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} variant="rounded" width="100%" height={100} animate={animate} />
      ))}
    </div>
  );
}

function SinglePreview({ variant, animate }: { variant: SkeletonVariant; animate: boolean }) {
  const resolvedWidth = variant === "circular" ? 80 : 200;
  const resolvedHeight =
    variant === "circular" ? 80 : variant === "text" ? "1em" : 80;
  return (
    <Skeleton variant={variant} width={resolvedWidth} height={resolvedHeight} animate={animate} />
  );
}

function generatePresetCode(preset: Preset, variant: SkeletonVariant, animate: boolean): string {
  const animateProp = animate ? "" : "\n  animate={false}";
  switch (preset) {
    case "single": {
      const parts: string[] = [];
      if (variant !== "rectangular") parts.push(`variant="${variant}"`);
      if (!animate) parts.push("animate={false}");
      const inner = parts.length > 0 ? `\n  ${parts.join("\n  ")}\n` : " ";
      return `<Skeleton${inner}/>`;
    }
    case "card":
      return `<div style={{ padding: 16, border: '1px solid var(--divider)', borderRadius: 12 }}>
  <Skeleton variant="rectangular" width="100%" height={140}${animateProp} />
  <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
    <Skeleton variant="text" width="70%"${animateProp} />
    <Skeleton variant="text" width="50%"${animateProp} />
    <Skeleton variant="text" width="85%"${animateProp} />
  </div>
</div>`;
    case "list":
      return `{[1, 2, 3].map((i) => (
  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--divider)' }}>
    <Skeleton variant="circular" width={44} height={44}${animateProp} />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Skeleton variant="text" width="65%"${animateProp} />
      <Skeleton variant="text" width="45%"${animateProp} />
    </div>
  </div>
))}`;
    case "profile":
      return `<div>
  <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 16 }}>
    <Skeleton variant="circular" width={64} height={64}${animateProp} />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Skeleton variant="text" width="40%"${animateProp} />
      <Skeleton variant="text" width="70%"${animateProp} />
    </div>
  </div>
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <Skeleton variant="text" width="100%"${animateProp} />
    <Skeleton variant="text" width="95%"${animateProp} />
    <Skeleton variant="text" width="80%"${animateProp} />
  </div>
</div>`;
    case "media":
      return `<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
  <Skeleton variant="rounded" width="100%" height={100}${animateProp} />
  <Skeleton variant="rounded" width="100%" height={100}${animateProp} />
  <Skeleton variant="rounded" width="100%" height={100}${animateProp} />
  <Skeleton variant="rounded" width="100%" height={100}${animateProp} />
</div>`;
  }
}

function SkeletonPlayground() {
  const [preset, setPreset] = useState<Preset>("card");
  const [variant, setVariant] = useState<SkeletonVariant>("rectangular");
  const [animate, setAnimate] = useState(true);

  const code = generatePresetCode(preset, variant, animate);

  return (
    <div style={{ marginBottom: spacing.primitive[8] }}>
      <div
        style={{
          borderRadius: radius.primitive.xl,
          overflow: "hidden",
          backgroundColor: "var(--surface-base-default)", border: "1px solid var(--border-solid-alternative)",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", minHeight: 360 }}>
          {/* Preview */}
          <div
            style={{
              padding: spacing.primitive[10],
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "var(--surface-base-default)",
            }}
          >
            {preset === "single" && <SinglePreview variant={variant} animate={animate} />}
            {preset === "card" && <CardPreview animate={animate} />}
            {preset === "list" && <ListPreview animate={animate} />}
            {preset === "profile" && <ProfilePreview animate={animate} />}
            {preset === "media" && <MediaPreview animate={animate} />}
          </div>

          {/* Controls */}
          <div
            style={{
              backgroundColor: "var(--surface-base-default)", borderLeft: "1px solid var(--border-solid-alternative)",
              display: "flex",
              flexDirection: "column",
              padding: spacing.primitive[4],
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
                label="preset"
                options={[
                  { value: "single", label: "single" },
                  { value: "card", label: "card" },
                  { value: "list", label: "list" },
                  { value: "profile", label: "profile" },
                  { value: "media", label: "media" },
                ]}
                value={preset}
                onChange={(v) => setPreset(v as Preset)}
              />

              {preset === "single" && (
                <RadioGroup
                  label="variant"
                  options={[
                    { value: "rectangular", label: "rectangular" },
                    { value: "rounded", label: "rounded" },
                    { value: "text", label: "text" },
                    { value: "circular", label: "circular" },
                  ]}
                  value={variant}
                  onChange={(v) => setVariant(v as SkeletonVariant)}
                />
              )}

              <RadioGroup
                label="animate"
                options={[
                  { value: "true", label: "True" },
                  { value: "false", label: "False" },
                ]}
                value={animate ? "true" : "false"}
                onChange={(v) => setAnimate(v === "true")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Generated code */}
      <div
        style={{
          marginTop: spacing.primitive[4],
          borderRadius: radius.primitive.md,
          overflow: "hidden",
          border: "1px solid var(--divider)",
        }}
      >
        <div
          style={{
            padding: `${spacing.primitive[2]}px ${spacing.primitive[4]}px`,
            backgroundColor: "var(--docs-code-surface)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontSize: typography.fontSize.compact,
              fontWeight: typography.fontWeight.semibold,
              color: "var(--docs-code-active-text)",
            }}
          >
            Web
          </span>
          <CopyButton text={code} />
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
          <code>{highlightCode(code)}</code>
        </pre>
      </div>
    </div>
  );
}

// ─── Platform Content ─────────────────────────────────────────────────

function PlatformContent({ platform }: { platform: Platform }) {
  if (platform === "design") return <DesignContent />;
  return <WebContent />;
}

// ─── Design Content ───────────────────────────────────────────────────

function DesignContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>
      {/* 1. Overview */}
      <Section title="Overview">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>
          <InlineCode>Skeleton</InlineCode>은 콘텐츠가 로드되는 동안 레이아웃을 보존하는 플레이스홀더입니다.
          레이아웃이 예측 가능한 경우 Spinner 대신 사용하여 콘텐츠 이동(layout shift)을 방지하고
          사용자가 로드될 콘텐츠의 구조를 미리 인지할 수 있게 합니다.
        </p>
      </Section>

      {/* 2. Anatomy */}
      <Section title="Anatomy">
        <div
          style={{
            backgroundColor: "var(--surface-base-default)",
            borderRadius: radius.primitive.md,
            padding: `${spacing.primitive[10]}px ${spacing.primitive[8]}px`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="420" height="130" viewBox="0 0 420 130" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Skeleton anatomy diagram">
            {/* Skeleton block */}
            <rect x="100" y="30" width="220" height="70" rx="4" fill="var(--fill-normal)" opacity="0.8" />

            {/* Shimmer wave overlay hint */}
            <rect x="100" y="30" width="60" height="70" rx="4" fill="var(--fill-alternative)" opacity="0.6" />

            {/* Label: fill */}
            <line x1="80" y1="65" x2="50" y2="65" stroke="var(--content-base-assistive)" strokeWidth="1" strokeDasharray="3 2" />
            <text x="6" y="69" fill="var(--text-secondary)" fontSize="11" fontFamily="system-ui">1. Fill</text>

            {/* Label: shimmer */}
            <line x1="165" y1="30" x2="165" y2="12" stroke="var(--content-base-assistive)" strokeWidth="1" strokeDasharray="3 2" />
            <text x="122" y="10" fill="var(--text-secondary)" fontSize="11" fontFamily="system-ui">2. Shimmer wave</text>

            {/* Label: border radius */}
            <line x1="320" y1="35" x2="348" y2="16" stroke="var(--content-base-assistive)" strokeWidth="1" strokeDasharray="3 2" />
            <text x="350" y="14" fill="var(--text-secondary)" fontSize="11" fontFamily="system-ui">3. Border radius</text>
          </svg>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: spacing.primitive[4],
            marginTop: spacing.primitive[4],
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.medium,
            color: "var(--text-primary)",
          }}
        >
          <div>1. Fill — <span style={{ fontWeight: 400, color: "var(--text-secondary)" }}>var(--fill-normal)</span></div>
          <div style={{ textAlign: "center" }}>2. Shimmer — <span style={{ fontWeight: 400, color: "var(--text-secondary)" }}>애니메이션</span></div>
          <div style={{ textAlign: "right" }}>3. Radius — <span style={{ fontWeight: 400, color: "var(--text-secondary)" }}>variant별 적용</span></div>
        </div>
      </Section>

      {/* 3. Variants */}
      <Section title="Variants">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          콘텐츠 종류에 따라 4가지 형태를 선택합니다.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: spacing.primitive[4],
          }}
        >
          {(
            [
              { variant: "rectangular" as SkeletonVariant, label: "rectangular", desc: "이미지, 배너, 카드 영역", w: 160, h: 80 },
              { variant: "rounded" as SkeletonVariant, label: "rounded", desc: "카드, 버튼 등 모서리 있는 요소", w: 160, h: 80 },
              { variant: "text" as SkeletonVariant, label: "text", desc: "텍스트 줄 플레이스홀더", w: 160, h: undefined },
              { variant: "circular" as SkeletonVariant, label: "circular", desc: "아바타, 아이콘 등 원형 요소", w: 48, h: 48 },
            ] as const
          ).map(({ variant, label, desc, w, h }) => (
            <div
              key={variant}
              style={{
                backgroundColor: "var(--surface-base-alternative)",
                borderRadius: radius.primitive.md,
                padding: spacing.primitive[5],
                display: "flex",
                flexDirection: "column",
                gap: spacing.primitive[3],
              }}
            >
              <div
                style={{
                  minHeight: 80,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Skeleton variant={variant} width={w} height={h} />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>
                  {label}
                </p>
                <p style={{ margin: `${spacing.primitive[1]}px 0 0`, fontSize: typography.fontSize.compact, color: "var(--text-secondary)" }}>
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 4. States */}
      <Section title="States">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          Skeleton은 애니메이션 활성/비활성 두 가지 상태만 가집니다.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: spacing.primitive[4],
          }}
        >
          <div
            style={{
              backgroundColor: "var(--surface-base-alternative)",
              borderRadius: radius.primitive.md,
              padding: spacing.primitive[5],
            }}
          >
            <Skeleton variant="rounded" width="100%" height={60} animate={true} />
            <p style={{ marginTop: spacing.primitive[3], marginBottom: 0, fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>
              animate=true (기본값)
            </p>
            <p style={{ margin: `${spacing.primitive[1]}px 0 0`, fontSize: typography.fontSize.compact, color: "var(--text-secondary)" }}>
              shimmer 효과로 로딩 중임을 표현
            </p>
          </div>
          <div
            style={{
              backgroundColor: "var(--surface-base-alternative)",
              borderRadius: radius.primitive.md,
              padding: spacing.primitive[5],
            }}
          >
            <Skeleton variant="rounded" width="100%" height={60} animate={false} />
            <p style={{ marginTop: spacing.primitive[3], marginBottom: 0, fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>
              animate=false
            </p>
            <p style={{ margin: `${spacing.primitive[1]}px 0 0`, fontSize: typography.fontSize.compact, color: "var(--text-secondary)" }}>
              정적 플레이스홀더, 모션 감소 환경 대응
            </p>
          </div>
        </div>

        <Subsection title="Composition Examples">
          <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
            여러 Skeleton을 조합하여 실제 콘텐츠 구조를 반영합니다.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
            {/* Card skeleton */}
            <div
              style={{
                backgroundColor: "var(--surface-base-alternative)",
                borderRadius: radius.primitive.md,
                padding: spacing.primitive[5],
              }}
            >
              <p style={{ margin: `0 0 ${spacing.primitive[3]}px`, fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>
                Card Skeleton
              </p>
              <Skeleton variant="rectangular" width="100%" height={120} />
              <div style={{ marginTop: spacing.primitive[3], display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
                <Skeleton variant="text" width="70%" />
                <Skeleton variant="text" width="50%" />
              </div>
            </div>

            {/* List skeleton */}
            <div
              style={{
                backgroundColor: "var(--surface-base-alternative)",
                borderRadius: radius.primitive.md,
                padding: spacing.primitive[5],
              }}
            >
              <p style={{ margin: `0 0 ${spacing.primitive[3]}px`, fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>
                List Skeleton
              </p>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: spacing.primitive[3],
                    alignItems: "center",
                    paddingBottom: spacing.primitive[3],
                    borderBottom: i < 3 ? "1px solid var(--divider)" : "none",
                    marginBottom: i < 3 ? spacing.primitive[3] : 0,
                  }}
                >
                  <Skeleton variant="circular" width={40} height={40} />
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: spacing.primitive[1] }}>
                    <Skeleton variant="text" width="80%" />
                    <Skeleton variant="text" width="55%" />
                  </div>
                </div>
              ))}
            </div>

            {/* Profile skeleton */}
            <div
              style={{
                backgroundColor: "var(--surface-base-alternative)",
                borderRadius: radius.primitive.md,
                padding: spacing.primitive[5],
              }}
            >
              <p style={{ margin: `0 0 ${spacing.primitive[3]}px`, fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>
                Profile Skeleton
              </p>
              <div style={{ display: "flex", gap: spacing.primitive[4], alignItems: "center", marginBottom: spacing.primitive[3] }}>
                <Skeleton variant="circular" width={64} height={64} />
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
                  <Skeleton variant="text" width="40%" />
                  <Skeleton variant="text" width="70%" />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="90%" />
                <Skeleton variant="text" width="75%" />
              </div>
            </div>

            {/* Media grid skeleton */}
            <div
              style={{
                backgroundColor: "var(--surface-base-alternative)",
                borderRadius: radius.primitive.md,
                padding: spacing.primitive[5],
              }}
            >
              <p style={{ margin: `0 0 ${spacing.primitive[3]}px`, fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>
                Media Grid Skeleton
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[2] }}>
                <Skeleton variant="rounded" width="100%" height={80} />
                <Skeleton variant="rounded" width="100%" height={80} />
                <Skeleton variant="rounded" width="100%" height={80} />
                <Skeleton variant="rounded" width="100%" height={80} />
              </div>
            </div>
          </div>
        </Subsection>
      </Section>

      {/* 5. Usage Guidelines */}
      <Section title="Usage Guidelines">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          Skeleton은 <strong style={{ color: "var(--text-primary)" }}>레이아웃이 예측 가능한</strong> 로딩 상황에 사용합니다.
        </p>

        <Subsection title="Best Practices">
          <div style={{ display: "grid", gap: spacing.primitive[5] }}>
            {/* Do/Don't pair 1 */}
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <DoCard>
                  <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
                    <Skeleton variant="rounded" width="100%" height={64} />
                    <Skeleton variant="text" width="80%" />
                    <Skeleton variant="text" width="60%" />
                  </div>
                </DoCard>
                <DontCard>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 80 }}>
                    <div style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", textAlign: "center", lineHeight: 1.5 }}>
                      전체 화면 Spinner
                    </div>
                  </div>
                </DontCard>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> 레이아웃이 알려진 콘텐츠에 Skeleton을 사용합니다
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0, fontStyle: "italic" }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Don&apos;t</span> 레이아웃을 알 수 없을 때 Spinner를 대신 사용하세요
                </p>
              </div>
            </div>

            {/* Do/Don't pair 2 */}
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <DoCard>
                  <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
                    <div style={{ display: "flex", gap: spacing.primitive[3], alignItems: "center" }}>
                      <Skeleton variant="circular" width={44} height={44} />
                      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
                        <Skeleton variant="text" width="65%" />
                        <Skeleton variant="text" width="45%" />
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: spacing.primitive[3], alignItems: "center" }}>
                      <Skeleton variant="circular" width={44} height={44} />
                      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
                        <Skeleton variant="text" width="70%" />
                        <Skeleton variant="text" width="40%" />
                      </div>
                    </div>
                  </div>
                </DoCard>
                <DontCard>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 80 }}>
                    <Skeleton variant="rectangular" width="100%" height={60} />
                  </div>
                </DontCard>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> 실제 콘텐츠 구조를 반영하는 구성 패턴을 사용합니다
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0, fontStyle: "italic" }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Don&apos;t</span> 복잡한 레이아웃에 단일 generic Skeleton을 사용하지 마세요
                </p>
              </div>
            </div>

            {/* Do/Don't pair 3 */}
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <DoCard>
                  <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
                    <Skeleton variant="rounded" width="100%" height={100} />
                    <div style={{ display: "flex", gap: spacing.primitive[2] }}>
                      <Skeleton variant="rounded" width="50%" height={80} />
                      <Skeleton variant="rounded" width="50%" height={80} />
                    </div>
                  </div>
                </DoCard>
                <DontCard>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 80 }}>
                    <div style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", textAlign: "center", lineHeight: 1.5 }}>
                      즉시 로드되는<br />콘텐츠에 Skeleton
                    </div>
                  </div>
                </DontCard>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> 실제 콘텐츠와 동일한 크기로 설정하여 레이아웃 이동(CLS)을 방지합니다
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0, fontStyle: "italic" }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Don&apos;t</span> 300ms 미만으로 로드되는 콘텐츠에는 Skeleton을 사용하지 마세요
                </p>
              </div>
            </div>
          </div>
        </Subsection>
      </Section>

      {/* 6. Design Tokens */}
      <Section title="Design Tokens">
        <div style={{ overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                {["Token", "CSS Variable", "Usage"].map((h) => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["fill.normal", "var(--fill-normal)", "베이스 배경색"],
                ["fill.alternative", "var(--fill-alternative)", "shimmer 하이라이트"],
                ["radius.component.skeleton.text", "4px", "text variant radius"],
                ["radius.primitive.md", "12px", "rounded variant radius"],
                ["radius.primitive.full", "9999px", "circular variant radius"],
                ["animation duration", "1.5s", "shimmer 주기"],
              ].map(([token, value, usage], i, arr) => (
                <tr key={token} style={i < arr.length - 1 ? trBorder : {}}>
                  <td style={tdStyle}><InlineCode>{token}</InlineCode></td>
                  <td style={tdMono}>{value}</td>
                  <td style={{ ...tdStyle, color: "var(--text-secondary)" }}>{usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* 7. Accessibility */}
      <Section title="Accessibility">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          Skeleton은 <InlineCode>role=&quot;status&quot;</InlineCode>, <InlineCode>aria-busy=&quot;true&quot;</InlineCode>를 사용하여
          보조 기술에 로딩 상태를 전달합니다.
        </p>

        <div style={{ overflow: "auto", marginBottom: spacing.primitive[6] }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={thStyle}>속성</th>
                <th style={thStyle}>설명</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['role="status"', "보조기기에 진행 상태 영역임을 전달합니다"],
                ['aria-busy="true"', "콘텐츠가 아직 로드 중임을 나타냅니다"],
                ['aria-label="로딩 중"', "스크린 리더에 Skeleton의 목적을 설명합니다"],
              ].map(([attr, desc], i, arr) => (
                <tr key={attr} style={i < arr.length - 1 ? { borderBottom: "1px solid var(--divider)" } : {}}>
                  <td style={tdStyle}><InlineCode>{attr}</InlineCode></td>
                  <td style={{ ...tdStyle, color: "var(--text-secondary)" }}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Subsection title="Design Principles">
          <div style={{ display: "grid", gap: spacing.primitive[4] }}>
            <PrincipleCard
              number={1}
              title="레이아웃 안정성"
              desc="Skeleton은 콘텐츠 로드 전후 레이아웃 이동(CLS)을 최소화합니다. 실제 콘텐츠와 동일한 크기로 설정하세요."
            />
            <PrincipleCard
              number={2}
              title="모션 감소 대응"
              desc="사용자가 OS에서 모션 감소를 설정한 경우 animate={false}를 전달하거나 prefers-reduced-motion 미디어 쿼리로 shimmer를 비활성화하세요. 컴포넌트는 [aria-busy=true] 선택자를 통해 자동으로 대응합니다."
            />
            <PrincipleCard
              number={3}
              title="구성 패턴 일치"
              desc="Skeleton 구성은 실제 UI 구조를 반영해야 합니다. 콘텐츠가 로드될 때 레이아웃 이동이 없도록 형태와 크기를 맞추세요."
            />
          </div>
        </Subsection>
      </Section>

      {/* 8. Related Components */}
      <Section title="Related Components">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: spacing.primitive[3] }}>
          {[
            { name: "Spinner", href: "/components/feedback/loading", desc: "로딩 중 원형 인디케이터, 레이아웃 불명확 시" },
            { name: "StateView", href: "/components/feedback/state-view", desc: "빈 상태·에러·완료 등 전체 상태 화면" },
          ].map(({ name, href, desc }) => (
            <a
              key={name}
              href={href}
              style={{
                padding: spacing.primitive[4],
                backgroundColor: "var(--surface-base-alternative)",
                borderRadius: radius.primitive.md,
                textDecoration: "none",
                display: "block",
              }}
            >
              <p style={{ margin: 0, color: "var(--text-primary)", fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold }}>
                {name}
              </p>
              <p style={{ margin: `${spacing.primitive[1]}px 0 0`, color: "var(--text-secondary)", fontSize: typography.fontSize.sm }}>
                {desc}
              </p>
            </a>
          ))}
        </div>
      </Section>
    </div>
  );
}

// ─── Web Content ──────────────────────────────────────────────────────

function WebContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[12] }}>
      {/* 1. Source Code */}
      <Section title="Source Code">
        <div
          style={{
            padding: spacing.primitive[4],
            backgroundColor: "var(--surface-base-default)", borderLeft: "1px solid var(--border-solid-alternative)",
            borderRadius: radius.primitive.md,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: spacing.primitive[4],
            flexWrap: "wrap",
          }}
        >
          <div>
            <p style={{ margin: 0, fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)" }}>
              Skeleton Component
            </p>
            <p style={{ margin: `${spacing.primitive[1]}px 0 0 0`, fontSize: typography.fontSize.compact, color: "var(--text-secondary)" }}>
              실제 컴포넌트 구현은 GitHub에서 확인할 수 있습니다.
            </p>
          </div>
          <a
            href={SKELETON_SOURCE}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: spacing.primitive[1],
              padding: `${spacing.primitive[2]}px ${spacing.primitive[4]}px`,
              fontSize: typography.fontSize.compact,
              fontWeight: typography.fontWeight.medium,
              color: "var(--content-base-onColor)",
              backgroundColor: "var(--docs-code-surface)",
              borderRadius: radius.primitive.md,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View on GitHub
          </a>
        </div>
      </Section>

      {/* 2. Import */}
      <Section title="Import">
        <CodeBlock
          code={`import { Skeleton } from '@baerae-zkap/design-system';
import type { SkeletonVariant } from '@baerae-zkap/design-system';`}
          language="tsx"
        />
      </Section>

      {/* 3. Basic Usage */}
      <Section title="Basic Usage">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          4가지 variant를 제공합니다. 각각 사용 맥락에 맞게 선택하세요.
        </p>
        <PreviewBox>
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[4], width: "100%", maxWidth: 360 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
              <span style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)" }}>rectangular</span>
              <Skeleton variant="rectangular" width="100%" height={80} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
              <span style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)" }}>rounded</span>
              <Skeleton variant="rounded" width="100%" height={80} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
              <span style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)" }}>text</span>
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="60%" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
              <span style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)" }}>circular</span>
              <Skeleton variant="circular" width={48} height={48} />
            </div>
          </div>
        </PreviewBox>
        <CodeBlock
          code={`<Skeleton variant="rectangular" width="100%" height={80} />
<Skeleton variant="rounded" width="100%" height={80} />
<Skeleton variant="text" width="80%" />
<Skeleton variant="circular" width={48} height={48} />`}
          language="tsx"
        />
      </Section>

      {/* 4. Composition */}
      <Section title="Composition">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          여러 Skeleton을 조합하여 실제 콘텐츠 레이아웃과 동일한 플레이스홀더를 만드세요.
        </p>

        <Subsection title="Card Skeleton">
          <PreviewBox>
            <div
              style={{
                width: "100%",
                maxWidth: 320,
                padding: spacing.primitive[4],
                border: "1px solid var(--divider)",
                borderRadius: radius.primitive.md,
                backgroundColor: "var(--surface-base-default)",
              }}
            >
              <Skeleton variant="rectangular" width="100%" height={160} />
              <div style={{ marginTop: spacing.primitive[3], display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
                <Skeleton variant="text" width="70%" />
                <Skeleton variant="text" width="50%" />
                <Skeleton variant="text" width="90%" />
              </div>
            </div>
          </PreviewBox>
          <CodeBlock
            code={`// Card skeleton — image + 3 text lines
<div style={{ padding: 16, border: '1px solid var(--divider)', borderRadius: 12 }}>
  <Skeleton variant="rectangular" width="100%" height={160} />
  <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
    <Skeleton variant="text" width="70%" />
    <Skeleton variant="text" width="50%" />
    <Skeleton variant="text" width="90%" />
  </div>
</div>`}
            language="tsx"
          />
        </Subsection>

        <Subsection title="List Skeleton">
          <PreviewBox>
            <div style={{ width: "100%", maxWidth: 360 }}>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: spacing.primitive[3],
                    alignItems: "center",
                    padding: `${spacing.primitive[3]}px 0`,
                    borderBottom: i < 3 ? "1px solid var(--divider)" : "none",
                  }}
                >
                  <Skeleton variant="circular" width={44} height={44} />
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
                    <Skeleton variant="text" width="65%" />
                    <Skeleton variant="text" width="45%" />
                  </div>
                </div>
              ))}
            </div>
          </PreviewBox>
          <CodeBlock
            code={`// List skeleton — avatar + 2 text lines per row
{[1, 2, 3].map((i) => (
  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--divider)' }}>
    <Skeleton variant="circular" width={44} height={44} />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Skeleton variant="text" width="65%" />
      <Skeleton variant="text" width="45%" />
    </div>
  </div>
))}`}
            language="tsx"
          />
        </Subsection>

        <Subsection title="Profile Skeleton">
          <PreviewBox>
            <div style={{ width: "100%", maxWidth: 360 }}>
              <div style={{ display: "flex", gap: spacing.primitive[4], alignItems: "center", marginBottom: spacing.primitive[4] }}>
                <Skeleton variant="circular" width={64} height={64} />
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
                  <Skeleton variant="text" width="40%" />
                  <Skeleton variant="text" width="70%" />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="95%" />
                <Skeleton variant="text" width="80%" />
              </div>
            </div>
          </PreviewBox>
          <CodeBlock
            code={`// Profile skeleton — avatar + name + bio lines
<div>
  <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 16 }}>
    <Skeleton variant="circular" width={64} height={64} />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Skeleton variant="text" width="40%" />
      <Skeleton variant="text" width="70%" />
    </div>
  </div>
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <Skeleton variant="text" width="100%" />
    <Skeleton variant="text" width="95%" />
    <Skeleton variant="text" width="80%" />
  </div>
</div>`}
            language="tsx"
          />
        </Subsection>

        <Subsection title="Media Grid Skeleton">
          <PreviewBox>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: spacing.primitive[2],
                width: "100%",
                maxWidth: 320,
              }}
            >
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} variant="rounded" width="100%" height={120} />
              ))}
            </div>
          </PreviewBox>
          <CodeBlock
            code={`// Media grid skeleton — 2x2 thumbnail grid
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
  <Skeleton variant="rounded" width="100%" height={120} />
  <Skeleton variant="rounded" width="100%" height={120} />
  <Skeleton variant="rounded" width="100%" height={120} />
  <Skeleton variant="rounded" width="100%" height={120} />
</div>`}
            language="tsx"
          />
        </Subsection>
      </Section>

      {/* 5. Text Skeleton */}
      <Section title="Text Skeleton">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          <InlineCode>variant=&quot;text&quot;</InlineCode>는 텍스트 줄을 시뮬레이션합니다. 기본 높이는 <InlineCode>1em</InlineCode>입니다.
        </p>
        <PreviewBox>
          <div style={{ width: "100%", maxWidth: 400, display: "flex", flexDirection: "column", gap: spacing.primitive[2] }}>
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="95%" />
            <Skeleton variant="text" width="88%" />
            <Skeleton variant="text" width="70%" />
          </div>
        </PreviewBox>
        <CodeBlock
          code={`// Paragraph text skeleton
<Skeleton variant="text" width="100%" />
<Skeleton variant="text" width="95%" />
<Skeleton variant="text" width="88%" />
<Skeleton variant="text" width="70%" />`}
          language="tsx"
        />
      </Section>

      {/* 6. API Reference */}
      <Section title="API Reference">
        <PropsTable
          props={[
            {
              name: "variant",
              type: '"text" | "circular" | "rectangular" | "rounded"',
              required: false,
              defaultVal: '"rectangular"',
              description: "플레이스홀더의 시각적 형태를 지정합니다.",
            },
            {
              name: "width",
              type: "number | string",
              required: false,
              defaultVal: "circular: 40, 나머지: undefined",
              description: "너비를 px 숫자 또는 CSS 문자열('100%' 등)로 지정합니다.",
            },
            {
              name: "height",
              type: "number | string",
              required: false,
              defaultVal: "text: '1em', circular: 40, 나머지: undefined",
              description: "높이를 px 숫자 또는 CSS 문자열로 지정합니다.",
            },
            {
              name: "borderRadius",
              type: "number | string",
              required: false,
              defaultVal: "variant별 자동 적용",
              description: "variant 기본 radius를 덮어씁니다.",
            },
            {
              name: "animate",
              type: "boolean",
              required: false,
              defaultVal: "true",
              description: "shimmer 애니메이션 활성 여부를 제어합니다. prefers-reduced-motion이 설정된 환경에서는 CSS를 통해 자동으로 비활성화됩니다.",
            },
            {
              name: "className",
              type: "string",
              required: false,
              defaultVal: "-",
              description: "루트 요소에 적용할 클래스명입니다.",
            },
            {
              name: "style",
              type: "React.CSSProperties",
              required: false,
              defaultVal: "-",
              description: "루트 요소의 인라인 스타일을 확장합니다.",
            },
          ]}
        />
      </Section>
    </div>
  );
}

// ─── Shared Styles ────────────────────────────────────────────────────

const thStyle: React.CSSProperties = {
  padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`,
  textAlign: "left",
  fontWeight: typography.fontWeight.semibold,
  fontSize: typography.fontSize.compact,
  borderBottom: "1px solid var(--divider)",
};

const tdStyle: React.CSSProperties = {
  padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`,
};

const tdMono: React.CSSProperties = {
  padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`,
  fontFamily: "monospace",
  color: "var(--text-secondary)",
};

const trBorder: React.CSSProperties = {
  borderBottom: "1px solid var(--divider)",
};
