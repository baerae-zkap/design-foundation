"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform, highlightCode } from "@/components/PlatformTabs";
import { BottomCTA, Button, Checkbox, typography, spacing, radius } from '@baerae-zkap/design-system';
import { Section, Subsection, InlineCode } from "@/components/docs/Section";
import { PropsTable } from "@/components/docs/PropsTable";
import { DoCard, DontCard, PrincipleCard } from "@/components/docs/Cards";
import { RadioGroup, CopyButton } from "@/components/docs/Playground";

// ─── Types ───────────────────────────────────────────────────────────
type VariantOption = "single" | "double";
type BackgroundOption = "default" | "transparent";

export default function BottomCTAPage() {
  return (
    <div style={{ maxWidth: 840 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Actions" },
          { label: "Bottom CTA" },
        ]}
      />

      {/* Header */}
      <h1 style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold, marginBottom: spacing.primitive[2], color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
        Bottom CTA
      </h1>
      <p style={{ fontSize: typography.fontSize.md, color: "var(--text-secondary)", marginBottom: spacing.primitive[8], lineHeight: 1.7 }}>
        화면 하단에 고정되는 CTA 버튼 레이아웃 컨테이너. 스크롤 콘텐츠의 하단에 배치하여 주요 액션을 항상 접근 가능하게 합니다.
      </p>

      {/* Interactive Playground */}
      <BottomCTAPlayground />

      {/* Platform Tabs */}
      <PlatformTabs>
        {(platform) => <PlatformContent platform={platform} />}
      </PlatformTabs>
    </div>
  );
}

// ─── Playground ──────────────────────────────────────────────────────

function BottomCTAPlayground() {
  const [variant, setVariant] = useState<VariantOption>("single");
  const [background, setBackground] = useState<BackgroundOption>("default");
  const [safeAreaPadding, setSafeAreaPadding] = useState(true);
  const [hasTopAccessory, setHasTopAccessory] = useState(false);

  const generateCode = () => {
    const props: string[] = [];
    if (variant !== "single") props.push(`variant="${variant}"`);
    if (background !== "default") props.push(`background="${background}"`);
    if (!safeAreaPadding) props.push(`safeAreaPadding={false}`);
    if (hasTopAccessory) props.push(`topAccessory={<span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>이용약관에 동의합니다.</span>}`);

    if (variant === "double") {
      const propsStr = props.length > 0 ? `\n  ${props.join("\n  ")}\n  ` : "\n  ";
      return `<BottomCTA${propsStr}secondaryAction={
    <Button buttonType="weak" color="neutral" style={{ width: '100%' }}>취소</Button>
  }
  primaryAction={
    <Button buttonType="filled" color="primary" style={{ width: '100%' }}>확인</Button>
  }
/>`;
    }

    const propsStr = props.length > 0 ? `\n  ${props.join("\n  ")}\n  ` : "\n  ";
    return `<BottomCTA${propsStr}primaryAction={
    <Button buttonType="filled" color="primary" style={{ width: '100%' }}>다음</Button>
  }
/>`;
  };

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
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              backgroundColor: "var(--surface-base-alternative)",
              overflow: "hidden",
            }}
          >
            {/* Simulated scroll content */}
            <div style={{ flex: 1, padding: spacing.primitive[6], display: "flex", flexDirection: "column", gap: spacing.primitive[3] }}>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    height: 56,
                    borderRadius: radius.primitive.md,
                    backgroundColor: "var(--fill-alternative)",
                  }}
                />
              ))}
            </div>
            {/* BottomCTA preview — position relative so sticky works in preview */}
            <div style={{ position: "relative" }}>
              <BottomCTA
                variant={variant}
                background={background}
                safeAreaPadding={false}
                topAccessory={hasTopAccessory ? (
                  <span style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)" }}>
                    이용약관에 동의합니다.
                  </span>
                ) : undefined}
                primaryAction={
                  <Button buttonType="filled" color="primary" style={{ width: "100%" }}>
                    {variant === "single" ? "다음" : "확인"}
                  </Button>
                }
                secondaryAction={
                  variant === "double" ? (
                    <Button buttonType="weak" color="neutral" style={{ width: "100%" }}>
                      취소
                    </Button>
                  ) : undefined
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
                gap: spacing.primitive[7],
                backgroundColor: "var(--surface-base-default)",
                borderRadius: radius.primitive.lg,
              }}
            >
              <RadioGroup
                label="Variant"
                options={[
                  { value: "single", label: "Single" },
                  { value: "double", label: "Double" },
                ]}
                value={variant}
                onChange={(v) => setVariant(v as VariantOption)}
              />

              <RadioGroup
                label="Background"
                options={[
                  { value: "default", label: "Default" },
                  { value: "transparent", label: "Transparent" },
                ]}
                value={background}
                onChange={(v) => setBackground(v as BackgroundOption)}
              />

              <RadioGroup
                label="Safe Area"
                options={[
                  { value: "true", label: "On" },
                  { value: "false", label: "Off" },
                ]}
                value={safeAreaPadding ? "true" : "false"}
                onChange={(v) => setSafeAreaPadding(v === "true")}
              />

              <RadioGroup
                label="Top Accessory"
                options={[
                  { value: "false", label: "None" },
                  { value: "true", label: "Show" },
                ]}
                value={hasTopAccessory ? "true" : "false"}
                onChange={(v) => setHasTopAccessory(v === "true")}
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
          <span style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.medium, color: "var(--docs-code-active-text)" }}>Web</span>
          <CopyButton text={generateCode()} />
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
          <code>{highlightCode(generateCode())}</code>
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
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", lineHeight: 1.7 }}>
          <InlineCode>BottomCTA</InlineCode>는 화면 하단에 sticky로 고정되는 CTA 버튼 레이아웃 컨테이너입니다.
          스크롤 가능한 콘텐츠 하단에 배치하여 주요 액션을 항상 접근 가능하게 합니다.
          버튼 자체를 렌더링하지 않고 레이아웃 쉘 역할만 합니다 — <InlineCode>Button</InlineCode> 컴포넌트를 prop으로 전달합니다.
        </p>
      </Section>

      {/* 2. Anatomy */}
      <Section title="Anatomy">
        <div style={{
          backgroundColor: "var(--surface-base-alternative)",
          borderRadius: radius.primitive.md,
          padding: `${spacing.primitive[10]}px ${spacing.primitive[8]}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <svg width="480" height="180" viewBox="0 0 480 180">
            {/* Container outline */}
            <rect x="40" y="20" width="400" height="140" rx="8" fill="var(--surface-base-default)" stroke="var(--divider)" strokeWidth="1" />
            {/* Top border indicator */}
            <line x1="40" y1="20" x2="440" y2="20" stroke="var(--border-brand-default)" strokeWidth="2" />

            {/* Top accessory area */}
            <rect x="60" y="36" width="160" height="22" rx="4" fill="var(--fill-alternative)" />
            <text x="68" y="52" fill="var(--content-base-secondary)" fontSize={typography.fontSize.compact}>이용약관에 동의합니다.</text>

            {/* Button row — double variant */}
            <rect x="60" y="70" width="170" height="72" rx="8" fill="var(--fill-alternative)" />
            <text x="145" y="110" textAnchor="middle" fill="var(--content-base-default)" fontSize={typography.fontSize.sm} fontWeight={typography.fontWeight.medium}>취소</text>

            <rect x="248" y="70" width="172" height="72" rx="8" fill="var(--surface-brand-default)" />
            <text x="334" y="110" textAnchor="middle" fill="white" fontSize={typography.fontSize.sm} fontWeight={typography.fontWeight.medium}>확인</text>

            {/* Safe area indicator */}
            <rect x="40" y="148" width="400" height="12" rx="0" fill="var(--fill-alternative)" opacity="0.5" />
            <text x="240" y="158" textAnchor="middle" fill="var(--content-base-secondary)" fontSize={9}>safe-area-inset-bottom</text>

            {/* Callout lines */}
            {/* 1 → top border */}
            <line x1="30" y1="20" x2="14" y2="20" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="14" cy="20" r="3" fill="var(--content-base-default)" />
            <circle cx="6" cy="20" r="10" fill="var(--content-base-default)" />
            <text x="6" y="25" textAnchor="middle" fill="white" fontSize={9} fontWeight="600">1</text>

            {/* 2 → top accessory */}
            <line x1="60" y1="47" x2="14" y2="60" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="14" cy="60" r="3" fill="var(--content-base-default)" />
            <circle cx="6" cy="60" r="10" fill="var(--content-base-default)" />
            <text x="6" y="65" textAnchor="middle" fill="white" fontSize={9} fontWeight="600">2</text>

            {/* 3 → secondary button */}
            <line x1="60" y1="106" x2="14" y2="100" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="14" cy="100" r="3" fill="var(--content-base-default)" />
            <circle cx="6" cy="100" r="10" fill="var(--content-base-default)" />
            <text x="6" y="105" textAnchor="middle" fill="white" fontSize={9} fontWeight="600">3</text>

            {/* 4 → primary button */}
            <line x1="440" y1="106" x2="456" y2="100" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="456" cy="100" r="3" fill="var(--content-base-default)" />
            <circle cx="464" cy="100" r="10" fill="var(--content-base-default)" />
            <text x="464" y="105" textAnchor="middle" fill="white" fontSize={9} fontWeight="600">4</text>

            {/* 5 → safe area */}
            <line x1="440" y1="154" x2="456" y2="154" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="456" cy="154" r="3" fill="var(--content-base-default)" />
            <circle cx="464" cy="154" r="10" fill="var(--content-base-default)" />
            <text x="464" y="159" textAnchor="middle" fill="white" fontSize={9} fontWeight="600">5</text>
          </svg>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
          gap: spacing.primitive[4],
          marginTop: spacing.primitive[5],
          fontSize: typography.fontSize.sm,
          fontWeight: typography.fontWeight.medium,
          color: "var(--text-primary)",
        }}>
          <div>1. Top border</div>
          <div>2. Top Accessory</div>
          <div>3. Secondary Action</div>
          <div>4. Primary Action</div>
          <div>5. Safe Area</div>
        </div>
      </Section>

      {/* 3. Variants */}
      <Section title="Variants">
        <Subsection title="Single vs Double">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
            <div>
              <p style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.medium, color: "var(--text-primary)", marginBottom: spacing.primitive[2], marginTop: 0 }}>Single</p>
              <PreviewBox>
                <div style={{ width: "100%", position: "relative" }}>
                  <BottomCTA
                    safeAreaPadding={false}
                    primaryAction={
                      <Button buttonType="filled" color="primary" style={{ width: "100%" }}>다음</Button>
                    }
                  />
                </div>
              </PreviewBox>
              <p style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", marginTop: spacing.primitive[2] }}>
                단일 주요 액션. primaryAction이 전체 너비를 차지합니다.
              </p>
            </div>
            <div>
              <p style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.medium, color: "var(--text-primary)", marginBottom: spacing.primitive[2], marginTop: 0 }}>Double</p>
              <PreviewBox>
                <div style={{ width: "100%", position: "relative" }}>
                  <BottomCTA
                    variant="double"
                    safeAreaPadding={false}
                    secondaryAction={
                      <Button buttonType="weak" color="neutral" style={{ width: "100%" }}>취소</Button>
                    }
                    primaryAction={
                      <Button buttonType="filled" color="primary" style={{ width: "100%" }}>확인</Button>
                    }
                  />
                </div>
              </PreviewBox>
              <p style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", marginTop: spacing.primitive[2] }}>
                보조 + 주요 액션 쌍. 각 버튼이 동일한 너비를 차지합니다.
              </p>
            </div>
          </div>
        </Subsection>

        <Subsection title="Background">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
            <div>
              <p style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.medium, color: "var(--text-primary)", marginBottom: spacing.primitive[2], marginTop: 0 }}>Default</p>
              <PreviewBox>
                <div style={{ width: "100%", position: "relative" }}>
                  <BottomCTA
                    background="default"
                    safeAreaPadding={false}
                    primaryAction={
                      <Button buttonType="filled" color="primary" style={{ width: "100%" }}>다음</Button>
                    }
                  />
                </div>
              </PreviewBox>
              <p style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", marginTop: spacing.primitive[2] }}>
                흰색 배경 + 상단 구분선. 스크롤 위에 떠있는 느낌.
              </p>
            </div>
            <div>
              <p style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.medium, color: "var(--text-primary)", marginBottom: spacing.primitive[2], marginTop: 0 }}>Transparent</p>
              <PreviewBox>
                <div style={{ width: "100%", position: "relative" }}>
                  <BottomCTA
                    background="transparent"
                    safeAreaPadding={false}
                    primaryAction={
                      <Button buttonType="filled" color="primary" style={{ width: "100%" }}>다음</Button>
                    }
                  />
                </div>
              </PreviewBox>
              <p style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", marginTop: spacing.primitive[2] }}>
                배경 없음. 콘텐츠 영역과 시각적으로 연결됩니다.
              </p>
            </div>
          </div>
        </Subsection>
      </Section>

      {/* 4. States */}
      <Section title="States">
        <Subsection title="With Top Accessory">
          <PreviewBox>
            <div style={{ width: "100%", maxWidth: 400, position: "relative" }}>
              <BottomCTA
                safeAreaPadding={false}
                topAccessory={
                  <div style={{ display: "flex", alignItems: "center", gap: spacing.primitive[2] }}>
                    <Checkbox aria-label="이용약관 동의" />
                    <span style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)" }}>
                      이용약관 및 개인정보처리방침에 동의합니다.
                    </span>
                  </div>
                }
                primaryAction={
                  <Button buttonType="filled" color="primary" style={{ width: "100%" }}>시작하기</Button>
                }
              />
            </div>
          </PreviewBox>
          <p style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", marginTop: spacing.primitive[2] }}>
            버튼 위에 약관 동의, 안내 텍스트 등 추가 콘텐츠를 표시할 수 있습니다.
          </p>
        </Subsection>

        <Subsection title="Without Top Accessory">
          <PreviewBox>
            <div style={{ width: "100%", maxWidth: 400, position: "relative" }}>
              <BottomCTA
                safeAreaPadding={false}
                primaryAction={
                  <Button buttonType="filled" color="primary" style={{ width: "100%" }}>다음</Button>
                }
              />
            </div>
          </PreviewBox>
          <p style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", marginTop: spacing.primitive[2] }}>
            topAccessory 없이 버튼만 표시합니다.
          </p>
        </Subsection>
      </Section>

      {/* 5. Usage Guidelines */}
      <Section title="Usage Guidelines">
        <Subsection title="Best Practices">
          <div style={{ display: "grid", gap: spacing.primitive[5] }}>
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <DoCard>
                  <div style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    모바일 화면의 주요 액션에 BottomCTA를 사용합니다. 스크롤 콘텐츠 내 sticky로 배치합니다.
                  </div>
                </DoCard>
                <DontCard>
                  <div style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    여러 BottomCTA를 중첩하거나 쌓지 않습니다. 화면당 하나만 사용합니다.
                  </div>
                </DontCard>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> 스크롤 페이지의 하단 고정 액션에 사용합니다
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0, fontStyle: "italic" }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Don&apos;t</span> 같은 화면에 두 개 이상 사용하지 않습니다
                </p>
              </div>
            </div>

            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4] }}>
                <DoCard>
                  <div style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    확인/취소 플로우에 double variant를 사용합니다. secondary는 weak, primary는 filled입니다.
                  </div>
                </DoCard>
                <DontCard>
                  <div style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                    카드나 스크롤이 없는 컨테이너 내부에 사용하지 않습니다. sticky가 의도대로 동작하지 않습니다.
                  </div>
                </DontCard>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-success-default)", margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> Double: 왼쪽 취소(weak/neutral) + 오른쪽 확인(filled/primary)
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: "var(--content-error-default)", margin: 0, fontStyle: "italic" }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Don&apos;t</span> overflow:hidden 부모 내에 배치하면 sticky가 동작하지 않습니다
                </p>
              </div>
            </div>
          </div>
        </Subsection>
      </Section>

      {/* 6. Design Tokens */}
      <Section title="Design Tokens">
        <div style={{ overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.compact }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={thStyle}>Property</th>
                <th style={thStyle}>Token</th>
                <th style={thStyle}>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr style={trBorder}>
                <td style={tdStyle}>Background (default)</td>
                <td style={tdStyle}><InlineCode>surface.base.default</InlineCode></td>
                <td style={tdMono}>var(--surface-base-default)</td>
              </tr>
              <tr style={trBorder}>
                <td style={tdStyle}>Top border</td>
                <td style={tdStyle}><InlineCode>divider</InlineCode></td>
                <td style={tdMono}>var(--divider)</td>
              </tr>
              <tr style={trBorder}>
                <td style={tdStyle}>Padding horizontal</td>
                <td style={tdStyle}><InlineCode>spacing.primitive[4]</InlineCode></td>
                <td style={tdMono}>16px</td>
              </tr>
              <tr style={trBorder}>
                <td style={tdStyle}>Padding top</td>
                <td style={tdStyle}><InlineCode>spacing.primitive[3]</InlineCode></td>
                <td style={tdMono}>12px</td>
              </tr>
              <tr style={trBorder}>
                <td style={tdStyle}>Padding bottom</td>
                <td style={tdStyle}><InlineCode>spacing.primitive[5]</InlineCode></td>
                <td style={tdMono}>20px (+ safe area)</td>
              </tr>
              <tr style={trBorder}>
                <td style={tdStyle}>Button gap (double)</td>
                <td style={tdStyle}><InlineCode>spacing.primitive[2]</InlineCode></td>
                <td style={tdMono}>8px</td>
              </tr>
              <tr>
                <td style={tdStyle}>Top accessory margin</td>
                <td style={tdStyle}><InlineCode>spacing.primitive[3]</InlineCode></td>
                <td style={tdMono}>12px</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* 7. Accessibility */}
      <Section title="Accessibility">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          BottomCTA는 레이아웃 컨테이너이므로 내부 <InlineCode>Button</InlineCode> 컴포넌트의 접근성에 의존합니다.
        </p>
        <div style={{ display: "grid", gap: spacing.primitive[4] }}>
          <PrincipleCard
            number={1}
            title="버튼 접근성 위임"
            desc="BottomCTA는 레이아웃 쉘입니다. aria 속성, 포커스 관리는 전달하는 Button 컴포넌트가 처리합니다."
          />
          <PrincipleCard
            number={2}
            title="랜드마크 역할"
            desc="주요 페이지 CTA를 담고 있으므로 필요 시 aria-label='주요 액션'을 style prop으로 전달할 수 있습니다."
          />
          <PrincipleCard
            number={3}
            title="포커스 순서"
            desc="sticky 배치 시에도 DOM 순서상 콘텐츠 다음에 위치하므로 Tab 키 흐름이 자연스럽습니다."
          />
        </div>
      </Section>

      {/* 8. Related Components */}
      <Section title="Related Components">
        <div style={{ overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: "var(--surface-base-alternative)" }}>
                <th style={thStyle}>컴포넌트</th>
                <th style={thStyle}>용도</th>
                <th style={thStyle}>차이점</th>
              </tr>
            </thead>
            <tbody>
              <tr style={trBorder}>
                <td style={{ ...tdStyle, fontWeight: typography.fontWeight.medium }}>Button</td>
                <td style={{ ...tdStyle, color: "var(--text-secondary)" }}>개별 CTA 버튼</td>
                <td style={{ ...tdStyle, color: "var(--text-secondary)" }}>BottomCTA는 Button을 담는 레이아웃 컨테이너입니다</td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, fontWeight: typography.fontWeight.medium }}>Action Area</td>
                <td style={{ ...tdStyle, color: "var(--text-secondary)" }}>커스텀 콘텐츠 탭 영역</td>
                <td style={{ ...tdStyle, color: "var(--text-secondary)" }}>ActionArea는 단일 탭 영역, BottomCTA는 멀티 버튼 레이아웃</td>
              </tr>
            </tbody>
          </table>
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
        <div style={{ padding: spacing.primitive[4], backgroundColor: "var(--surface-base-alternative)", borderRadius: radius.primitive.md, marginBottom: spacing.primitive[6], display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: "var(--text-primary)", margin: 0 }}>BottomCTA Component</p>
            <p style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)", margin: "4px 0 0 0" }}>실제 컴포넌트 소스 코드를 GitHub에서 확인하세요.</p>
          </div>
          <a
            href="https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system/src/components/BottomCTA/BottomCTA.tsx"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: spacing.primitive[1],
              padding: `${spacing.primitive[2]}px ${spacing.primitive[4]}px`,
              fontSize: typography.fontSize.compact,
              fontWeight: typography.fontWeight.medium,
              color: "white",
              backgroundColor: "var(--inverse-surface-default)",
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

      {/* 2. Import */}
      <Section title="Import">
        <CodeBlock code={`import { BottomCTA } from '@baerae-zkap/design-system';`} />
      </Section>

      {/* 3. Single CTA */}
      <Section title="Single CTA">
        <PreviewBox>
          <div style={{ width: "100%", maxWidth: 400, position: "relative" }}>
            <BottomCTA
              safeAreaPadding={false}
              primaryAction={
                <Button buttonType="filled" color="primary" style={{ width: "100%" }}>다음</Button>
              }
            />
          </div>
        </PreviewBox>
        <CodeBlock code={`<BottomCTA
  primaryAction={
    <Button buttonType="filled" color="primary" style={{ width: '100%' }}>
      다음
    </Button>
  }
/>`} />
      </Section>

      {/* 4. Double CTA */}
      <Section title="Double CTA">
        <PreviewBox>
          <div style={{ width: "100%", maxWidth: 400, position: "relative" }}>
            <BottomCTA
              variant="double"
              safeAreaPadding={false}
              secondaryAction={
                <Button buttonType="weak" color="neutral" style={{ width: "100%" }}>취소</Button>
              }
              primaryAction={
                <Button buttonType="filled" color="primary" style={{ width: "100%" }}>확인</Button>
              }
            />
          </div>
        </PreviewBox>
        <CodeBlock code={`<BottomCTA
  variant="double"
  secondaryAction={
    <Button buttonType="weak" color="neutral" style={{ width: '100%' }}>
      취소
    </Button>
  }
  primaryAction={
    <Button buttonType="filled" color="primary" style={{ width: '100%' }}>
      확인
    </Button>
  }
/>`} />
      </Section>

      {/* 5. With Top Accessory */}
      <Section title="With Top Accessory">
        <p style={{ fontSize: typography.fontSize.sm, color: "var(--text-secondary)", marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          <InlineCode>topAccessory</InlineCode> prop으로 버튼 위에 약관 동의나 안내 텍스트를 추가할 수 있습니다.
        </p>
        <PreviewBox>
          <div style={{ width: "100%", maxWidth: 400, position: "relative" }}>
            <BottomCTAWithAccessoryDemo />
          </div>
        </PreviewBox>
        <CodeBlock code={`const [agreed, setAgreed] = useState(false);

<BottomCTA
  topAccessory={
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <Checkbox
        checked={agreed}
        onChange={setAgreed}
        aria-label="이용약관 동의"
      />
      <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
        이용약관 및 개인정보처리방침에 동의합니다.
      </span>
    </div>
  }
  primaryAction={
    <Button
      buttonType="filled"
      color="primary"
      disabled={!agreed}
      style={{ width: '100%' }}
    >
      시작하기
    </Button>
  }
/>`} />
      </Section>

      {/* 6. API Reference */}
      <Section title="API Reference">
        <PropsTable
          props={[
            { name: "variant", type: '"single" | "double"', required: false, defaultVal: '"single"', description: "레이아웃 변형. single은 primaryAction 전체 너비, double은 secondary + primary 반반" },
            { name: "primaryAction", type: "ReactNode", required: true, description: "주요(오른쪽/전체) 버튼 콘텐츠. 보통 filled Button 컴포넌트를 전달합니다" },
            { name: "secondaryAction", type: "ReactNode", required: false, description: "보조(왼쪽) 버튼 콘텐츠. double variant에서만 사용됩니다" },
            { name: "safeAreaPadding", type: "boolean", required: false, defaultVal: "true", description: "노치 기기를 위해 env(safe-area-inset-bottom)을 하단 패딩에 추가합니다" },
            { name: "background", type: '"default" | "transparent"', required: false, defaultVal: '"default"', description: "default: 흰색 배경 + 상단 구분선, transparent: 배경 없음" },
            { name: "topAccessory", type: "ReactNode", required: false, description: "버튼 영역 위에 렌더링할 추가 콘텐츠 (약관 동의, 안내 텍스트 등)" },
            { name: "style", type: "CSSProperties", required: false, description: "컨테이너에 적용할 커스텀 스타일" },
          ]}
        />
      </Section>
    </div>
  );
}

// ─── Demo Components ──────────────────────────────────────────────────

function BottomCTAWithAccessoryDemo() {
  const [agreed, setAgreed] = useState(false);
  return (
    <BottomCTA
      safeAreaPadding={false}
      topAccessory={
        <div style={{ display: "flex", alignItems: "center", gap: spacing.primitive[2] }}>
          <Checkbox
            checked={agreed}
            onChange={setAgreed}
            aria-label="이용약관 동의"
          />
          <span style={{ fontSize: typography.fontSize.compact, color: "var(--text-secondary)" }}>
            이용약관 및 개인정보처리방침에 동의합니다.
          </span>
        </div>
      }
      primaryAction={
        <Button
          buttonType="filled"
          color="primary"
          disabled={!agreed}
          style={{ width: "100%" }}
        >
          시작하기
        </Button>
      }
    />
  );
}

// ─── Shared Styles ────────────────────────────────────────────────────

const thStyle: React.CSSProperties = {
  padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`,
  textAlign: "left" as const,
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
