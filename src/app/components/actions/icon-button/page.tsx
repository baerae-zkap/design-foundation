"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform, highlightCode } from "@/components/PlatformTabs";
import { IconButton } from '@baerae-zkap/design-system';
import { Section, Subsection } from "@/components/docs/Section";
import { PropsTable } from "@/components/docs/PropsTable";
import { PrincipleCard, VariantCard, DoCard, DontCard } from "@/components/docs/Cards";
import { RadioGroup, CopyButton } from "@/components/docs/Playground";
import { DoLabel, DontLabel } from "@/components/docs/Labels";

// Types
type IconButtonVariant = "filled" | "ghost" | "outlined";
type IconButtonColor = "brandDefault" | "baseDefault" | "errorDefault";
type IconButtonSize = "small" | "medium" | "large";

// Size configurations
const sizeConfig: Record<IconButtonSize, { iconSize: number }> = {
  small: { iconSize: 18 },
  medium: { iconSize: 22 },
  large: { iconSize: 26 },
};

export default function IconButtonPage() {
  return (
    <div style={{ maxWidth: 720 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Actions" },
          { label: "Icon Button" },
        ]}
      />

      {/* Header */}
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
        Icon Button
      </h1>
      <p style={{ fontSize: 15, color: "var(--text-secondary)", marginBottom: 32, lineHeight: 1.6 }}>
        아이콘만으로 의미를 전달하는 원형 버튼입니다. 닫기, 메뉴, 검색 등 보편적으로 인식되는 아이콘 액션에 사용하며, 공간이 제한된 툴바나 네비게이션 영역에 최적화되어 있습니다.
      </p>

      {/* Interactive Playground */}
      <IconButtonPlayground />

      {/* Platform Tabs */}
      <PlatformTabs>
        {(platform) => <PlatformContent platform={platform} />}
      </PlatformTabs>
    </div>
  );
}

function IconButtonPlayground() {
  const [variant, setVariant] = useState<IconButtonVariant>("ghost");
  const [color, setColor] = useState<IconButtonColor>("baseDefault");
  const [size, setSize] = useState<IconButtonSize>("medium");
  const [disabled, setDisabled] = useState(false);

  const generateCode = () => {
    const props = [];
    if (variant !== "ghost") props.push(`variant="${variant}"`);
    if (color !== "baseDefault") props.push(`color="${color}"`);
    if (size !== "medium") props.push(`size="${size}"`);
    if (disabled) props.push("disabled");

    const propsStr = props.length > 0 ? `\n  ${props.join("\n  ")}\n` : " ";

    return `<IconButton${propsStr.length > 1 ? propsStr : " "}onClick={() => {}}>
  <PlusIcon />
</IconButton>`;
  };

  const colorLabels: Record<IconButtonColor, string> = {
    brandDefault: "Brand",
    baseDefault: "Base",
    errorDefault: "Error",
  };

  return (
    <div style={{ marginBottom: 32 }}>
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
              padding: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "var(--surface-base-alternative)",
            }}
          >
            <IconButtonDemo
              variant={variant}
              color={color}
              size={size}
              disabled={disabled}
            />
          </div>

          {/* Control Panel */}
          <div
            style={{
              backgroundColor: "var(--surface-base-alternative)",
              display: "flex",
              flexDirection: "column",
              padding: 16,
              overflow: "hidden",
              height: "100%",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                flex: 1,
                minHeight: 0,
                padding: 24,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 28,
                backgroundColor: "var(--surface-base-default)",
                borderRadius: 16,
              }}
            >
              {/* Variant */}
              <RadioGroup
                label="Variant"
                options={[
                  { value: "ghost", label: "Ghost" },
                  { value: "filled", label: "Filled" },
                  { value: "outlined", label: "Outlined" },
                ]}
                value={variant}
                onChange={(v) => setVariant(v as IconButtonVariant)}
              />

              {/* Color */}
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8, display: "block" }}>
                  Color
                </label>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {(Object.keys(colorLabels) as IconButtonColor[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      style={{
                        padding: "6px 10px",
                        fontSize: 12,
                        borderRadius: 6,
                        border: color === c ? "2px solid var(--content-brand-default)" : "1px solid var(--border-base-default)",
                        backgroundColor: color === c ? "var(--surface-brand-secondary)" : "var(--surface-base-default)",
                        color: color === c ? "var(--content-brand-default)" : "var(--content-base-secondary)",
                        cursor: "pointer",
                      }}
                    >
                      {colorLabels[c]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <RadioGroup
                label="Size"
                options={[
                  { value: "small", label: "Small" },
                  { value: "medium", label: "Medium" },
                  { value: "large", label: "Large" },
                ]}
                value={size}
                onChange={(v) => setSize(v as IconButtonSize)}
              />

              {/* Disabled */}
              <RadioGroup
                label="Disabled"
                options={[
                  { value: "false", label: "False" },
                  { value: "true", label: "True" },
                ]}
                value={disabled ? "true" : "false"}
                onChange={(v) => setDisabled(v === "true")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Generated Code */}
      <div style={{ marginTop: 16, borderRadius: 12, overflow: "hidden", border: "1px solid var(--divider)" }}>
        <div
          style={{
            padding: "10px 16px",
            backgroundColor: "var(--docs-code-surface)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 500, color: "var(--docs-code-active-text)" }}>Web</span>
          <CopyButton text={generateCode()} />
        </div>
        <pre
          style={{
            margin: 0,
            padding: 16,
            fontSize: 13,
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
    <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
      {/* Overview */}
      <Section title="Overview">
        <div style={{ display: "grid", gap: 24 }}>
          <div>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
              IconButton은 <strong style={{ color: "var(--text-primary)" }}>아이콘만으로 의미가 명확히 전달되는 단일 액션</strong>을 위한 원형 버튼입니다.
              텍스트 없이 아이콘으로만 기능을 표현하므로 공간 효율이 높고, 툴바나 네비게이션 등 반복적으로 나타나는 UI 패턴에 적합합니다.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>When to use</h4>
            <ul style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.8, margin: 0, paddingLeft: 20 }}>
              <li>아이콘의 의미가 <strong style={{ color: "var(--text-primary)" }}>보편적으로 인식</strong>되는 액션 (닫기, 메뉴, 검색, 추가 등)</li>
              <li><strong style={{ color: "var(--text-primary)" }}>공간이 제한된</strong> 툴바, 헤더, 카드 액션 영역</li>
              <li>테이블 행별 편집/삭제 등 <strong style={{ color: "var(--text-primary)" }}>반복되는 액션 패턴</strong></li>
              <li>원형 버튼의 시각적 일관성이 필요할 때 (FAB, 모달 닫기 등)</li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>When NOT to use</h4>
            <ul style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.8, margin: 0, paddingLeft: 20 }}>
              <li><strong style={{ color: "var(--text-primary)" }}>아이콘만으로 의미 전달이 어렵다면</strong> → Button에 텍스트 + 아이콘 조합 사용</li>
              <li><strong style={{ color: "var(--text-primary)" }}>주요 CTA 액션이라면</strong> → Button filled variant 사용 (텍스트로 명확성 확보)</li>
              <li><strong style={{ color: "var(--text-primary)" }}>텍스트 링크 스타일이 필요하면</strong> → TextButton 사용</li>
              <li><strong style={{ color: "var(--text-primary)" }}>Button의 icon-only 모드와 비교:</strong> Button은 직사각형 기반 icon-only 지원, IconButton은 원형 전용 설계로 툴바/네비게이션 패턴에 최적화</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Anatomy */}
      <Section title="Anatomy">
        <div style={{
          backgroundColor: "var(--surface-base-alternative)",
          borderRadius: 16,
          padding: "48px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <svg width="280" height="120" viewBox="0 0 280 120">
            {/* Container circle */}
            <circle cx="140" cy="60" r="28" fill="none" stroke="var(--content-brand-default)" strokeWidth="2" strokeDasharray="4 3" />

            {/* Icon inside */}
            <line x1="140" y1="48" x2="140" y2="72" stroke="var(--content-brand-default)" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="128" y1="60" x2="152" y2="60" stroke="var(--content-brand-default)" strokeWidth="2.5" strokeLinecap="round" />

            {/* Line from circle 1 to container */}
            <line x1="50" y1="60" x2="112" y2="60" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="112" cy="60" r="3" fill="var(--content-base-default)" />

            {/* Line from circle 2 to icon */}
            <line x1="140" y1="32" x2="140" y2="10" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="140" cy="32" r="3" fill="var(--content-base-default)" />

            {/* Numbered circles */}
            <circle cx="35" cy="60" r="14" fill="var(--content-base-default)" />
            <text x="35" y="65" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">1</text>

            <circle cx="140" cy="10" r="14" fill="var(--content-base-default)" />
            <text x="140" y="15" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">2</text>
          </svg>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginTop: 20,
          fontSize: 14,
          fontWeight: 500,
          color: "var(--text-primary)",
        }}>
          <div>1. Container</div>
          <div style={{ textAlign: "right" }}>2. Icon</div>
        </div>
      </Section>

      {/* Interaction States */}
      <Section title="Interaction States">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 24 }}>
          IconButton은 원형 버튼으로 사용자 상호작용에 따라 배경색과 아이콘 색상이 변화합니다. 각 상태는 시각적으로 명확히 구분되어 터치/클릭 피드백을 제공합니다.
        </p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: 16,
          padding: 24,
          backgroundColor: "var(--surface-base-alternative)",
          borderRadius: 16,
        }}>
          <InteractionStateCard label="Default" sublabel="기본 상태" color="var(--content-base-default)" bgColor="transparent" />
          <InteractionStateCard label="Hover" sublabel="마우스 오버" color="var(--content-base-default)" bgColor="var(--effect-alpha-fill-alternative)" />
          <InteractionStateCard label="Pressed" sublabel="누름" color="var(--content-base-default)" bgColor="var(--effect-alpha-fill-normal)" />
          <InteractionStateCard label="Disabled" sublabel="비활성화" color="var(--content-disabled-default)" bgColor="transparent" opacity={0.4} />
          <InteractionStateCard label="Focused" sublabel="키보드 포커스" color="var(--content-base-default)" bgColor="transparent" showFocusRing />
        </div>
      </Section>

      {/* Design Tokens (New) */}
      <Section title="Design Tokens">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 16 }}>
          컴포넌트에 적용된 디자인 토큰입니다. 커스터마이징 시 아래 토큰을 참조하세요.
        </p>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border-default)" }}>
                <th style={{ textAlign: "left", padding: "10px 12px", color: "var(--text-primary)", fontWeight: 600 }}>속성</th>
                <th style={{ textAlign: "left", padding: "10px 12px", color: "var(--text-primary)", fontWeight: 600 }}>토큰</th>
                <th style={{ textAlign: "left", padding: "10px 12px", color: "var(--text-primary)", fontWeight: 600 }}>값 (Light)</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
                <td style={{ padding: "10px 12px", color: "var(--text-primary)" }}>배경색 (ghost)</td>
                <td style={{ padding: "10px 12px" }}>
                  <code style={{ fontSize: 12, padding: "2px 6px", borderRadius: 4, backgroundColor: "var(--surface-base-alternative)", color: "var(--content-brand-default)" }}>transparent</code>
                </td>
                <td style={{ padding: "10px 12px", color: "var(--text-tertiary)" }}>투명</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
                <td style={{ padding: "10px 12px", color: "var(--text-primary)" }}>아이콘 색상</td>
                <td style={{ padding: "10px 12px" }}>
                  <code style={{ fontSize: 12, padding: "2px 6px", borderRadius: 4, backgroundColor: "var(--surface-base-alternative)", color: "var(--content-brand-default)" }}>--content-base-default</code>
                </td>
                <td style={{ padding: "10px 12px", color: "var(--text-tertiary)" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: "var(--content-base-default)" }} />
                    Base Default
                  </span>
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
                <td style={{ padding: "10px 12px", color: "var(--text-primary)" }}>크기 (sm / md / lg)</td>
                <td style={{ padding: "10px 12px" }}>
                  <code style={{ fontSize: 12, padding: "2px 6px", borderRadius: 4, backgroundColor: "var(--surface-base-alternative)", color: "var(--content-brand-default)" }}>primitive.8 / 10 / 12</code>
                </td>
                <td style={{ padding: "10px 12px", color: "var(--text-tertiary)" }}>32px / 40px / 48px</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
                <td style={{ padding: "10px 12px", color: "var(--text-primary)" }}>아이콘 크기 (sm / md / lg)</td>
                <td style={{ padding: "10px 12px" }}>
                  <code style={{ fontSize: 12, padding: "2px 6px", borderRadius: 4, backgroundColor: "var(--surface-base-alternative)", color: "var(--content-brand-default)" }}>iconSize</code>
                </td>
                <td style={{ padding: "10px 12px", color: "var(--text-tertiary)" }}>18px / 22px / 26px</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
                <td style={{ padding: "10px 12px", color: "var(--text-primary)" }}>모서리 반경</td>
                <td style={{ padding: "10px 12px" }}>
                  <code style={{ fontSize: 12, padding: "2px 6px", borderRadius: 4, backgroundColor: "var(--surface-base-alternative)", color: "var(--content-brand-default)" }}>primitive.full</code>
                </td>
                <td style={{ padding: "10px 12px", color: "var(--text-tertiary)" }}>9999px (원형)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* UX Writing */}
      <Section title="UX Writing">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 24 }}>
          사용자에게 명확한 경험을 전달하기 위한 텍스트 작성 가이드입니다.
        </p>
        <div style={{ display: "grid", gap: 12 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ padding: 16, borderRadius: 12, backgroundColor: "var(--surface-success-default)", border: "1px solid var(--border-success-default)" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--content-success-default)", marginBottom: 8 }}>DO</div>
              <code style={{ fontSize: 14, color: "var(--text-primary)" }}>aria-label=&quot;검색&quot;</code>
              <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: 0, marginTop: 4 }}>반드시 접근성 레이블을 제공합니다</p>
            </div>
            <div style={{ padding: 16, borderRadius: 12, backgroundColor: "var(--surface-error-default)", border: "1px solid var(--border-error-default)" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--content-error-default)", marginBottom: 8 }}>DON&apos;T</div>
              <code style={{ fontSize: 14, color: "var(--text-primary)" }}>aria-label=&quot;&quot;</code>
              <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: 0, marginTop: 4 }}>빈 레이블은 스크린 리더가 인식할 수 없습니다</p>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ padding: 16, borderRadius: 12, backgroundColor: "var(--surface-success-default)", border: "1px solid var(--border-success-default)" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--content-success-default)", marginBottom: 8 }}>DO</div>
              <code style={{ fontSize: 14, color: "var(--text-primary)" }}>aria-label=&quot;닫기&quot;</code>
              <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: 0, marginTop: 4 }}>기능을 설명하는 레이블을 사용합니다</p>
            </div>
            <div style={{ padding: 16, borderRadius: 12, backgroundColor: "var(--surface-error-default)", border: "1px solid var(--border-error-default)" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--content-error-default)", marginBottom: 8 }}>DON&apos;T</div>
              <code style={{ fontSize: 14, color: "var(--text-primary)" }}>aria-label=&quot;X 아이콘&quot;</code>
              <p style={{ fontSize: 12, color: "var(--text-tertiary)", margin: 0, marginTop: 4 }}>외형이 아닌 기능을 설명해야 합니다</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Usage Guidelines */}
      <Section title="Usage Guidelines">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 24, lineHeight: 1.6 }}>
          일관된 UX를 위해 아래 권고 조합을 따르세요. Icon Button은 <strong style={{ color: "var(--text-primary)" }}>원형 버튼이 필요하고 아이콘만으로 의미가 전달</strong>되어야 하는 상황에서 사용합니다. Button 컴포넌트도 icon-only 모드를 제공하나 직사각형 기반이며, IconButton은 원형 전용으로 시각적 일관성이 중요한 패턴에 적합합니다.
        </p>

        <Subsection title="Recommended Combinations">
          <div style={{ display: "grid", gap: 12 }}>
            <UsageCard
              situation="Navigation Actions"
              desc="뒤로가기, 닫기, 메뉴 열기 등 네비게이션"
              variant="ghost"
              color="baseDefault"
              iconType="menu"
            />
            <UsageCard
              situation="Toolbar Buttons"
              desc="에디터, 뷰어 등의 툴바 액션"
              variant="ghost"
              color="baseDefault"
              iconType="edit"
            />
            <UsageCard
              situation="Close / Dismiss"
              desc="모달, 토스트, 패널 닫기"
              variant="ghost"
              color="baseDefault"
              iconType="close"
            />
            <UsageCard
              situation="Primary Action (Floating)"
              desc="FAB 등 화면에서 가장 중요한 액션"
              variant="filled"
              color="brandDefault"
              iconType="plus"
            />
            <UsageCard
              situation="Destructive Action"
              desc="삭제, 제거 등 위험한 액션"
              variant="ghost"
              color="errorDefault"
              iconType="close"
            />
          </div>
        </Subsection>

        <Subsection title="Design Principles">
          <div style={{ display: "grid", gap: 16 }}>
            <PrincipleCard
              number={1}
              title="반드시 접근성 레이블 제공"
              desc="아이콘만 있으므로 aria-label을 필수로 제공해야 합니다. 스크린 리더 사용자가 버튼의 목적을 알 수 있어야 합니다."
            />
            <PrincipleCard
              number={2}
              title="variant로 계층 구조 표현"
              desc="filled는 가장 강조된 액션, ghost는 보조 액션, outlined는 중간 강조에 사용합니다. 화면당 filled Icon Button은 1-2개로 제한하세요."
            />
          </div>
        </Subsection>
      </Section>

      {/* Variants */}
      <Section title="Variants">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          <VariantCard name="Ghost" description="투명 배경, 기본 스타일">
            <IconButtonDemo variant="ghost" color="baseDefault" />
          </VariantCard>
          <VariantCard name="Filled" description="채워진 배경, 강조 액션">
            <IconButtonDemo variant="filled" color="brandDefault" />
          </VariantCard>
          <VariantCard name="Outlined" description="테두리만 표시">
            <IconButtonDemo variant="outlined" color="baseDefault" />
          </VariantCard>
        </div>
      </Section>

      {/* Sizes */}
      <Section title="Sizes">
        <PreviewBox>
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <IconButtonDemo size="small" />
              <p style={{ fontSize: 11, color: "var(--content-base-secondary)", marginTop: 8 }}>32px</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <IconButtonDemo size="medium" />
              <p style={{ fontSize: 11, color: "var(--content-base-secondary)", marginTop: 8 }}>40px</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <IconButtonDemo size="large" />
              <p style={{ fontSize: 11, color: "var(--content-base-secondary)", marginTop: 8 }}>48px</p>
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* Colors */}
      <Section title="Colors">
        <Subsection title="Ghost">
          <PreviewBox>
            <div style={{ display: "flex", gap: 16 }}>
              <IconButtonDemo variant="ghost" color="brandDefault" />
              <IconButtonDemo variant="ghost" color="baseDefault" />
              <IconButtonDemo variant="ghost" color="errorDefault" />
            </div>
          </PreviewBox>
        </Subsection>
        <Subsection title="Filled">
          <PreviewBox>
            <div style={{ display: "flex", gap: 16 }}>
              <IconButtonDemo variant="filled" color="brandDefault" />
              <IconButtonDemo variant="filled" color="baseDefault" />
              <IconButtonDemo variant="filled" color="errorDefault" />
            </div>
          </PreviewBox>
        </Subsection>
        <Subsection title="Outlined">
          <PreviewBox>
            <div style={{ display: "flex", gap: 16 }}>
              <IconButtonDemo variant="outlined" color="brandDefault" />
              <IconButtonDemo variant="outlined" color="baseDefault" />
              <IconButtonDemo variant="outlined" color="errorDefault" />
            </div>
          </PreviewBox>
        </Subsection>
      </Section>

      {/* States */}
      <Section title="States">
        <PreviewBox>
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <IconButtonDemo variant="ghost" color="baseDefault" />
              <p style={{ fontSize: 11, color: "var(--content-base-secondary)", marginTop: 8 }}>Default</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <IconButtonDemo variant="ghost" color="baseDefault" disabled />
              <p style={{ fontSize: 11, color: "var(--content-base-secondary)", marginTop: 8 }}>Disabled</p>
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* Best Practices */}
      <Section title="Best Practices">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <DoCard>
            <div style={{ display: "flex", gap: 8 }}>
              <IconButtonDemo variant="ghost" color="baseDefault" />
              <IconButtonDemo variant="ghost" color="baseDefault" />
            </div>
          </DoCard>
          <DontCard>
            <div style={{ display: "flex", gap: 8 }}>
              <IconButtonDemo variant="filled" color="brandDefault" />
              <IconButtonDemo variant="filled" color="errorDefault" />
              <IconButtonDemo variant="filled" color="baseDefault" />
            </div>
          </DontCard>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 4 }}>
          <DoLabel>보조 액션에는 ghost variant를 사용합니다.</DoLabel>
          <DontLabel>한 영역에 filled Icon Button을 과도하게 사용하지 않습니다.</DontLabel>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
          <DoCard>
            <IconButtonDemo variant="ghost" color="baseDefault" size="medium" />
          </DoCard>
          <DontCard>
            <IconButtonDemo variant="ghost" color="baseDefault" size="small" />
          </DontCard>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 4 }}>
          <DoLabel>모바일에서는 medium 이상 사이즈를 사용하여 터치 영역을 확보합니다.</DoLabel>
          <DontLabel>모바일에서 small 사이즈만 사용하면 터치 오류가 발생할 수 있습니다.</DontLabel>
        </div>
      </Section>

      {/* Design Tokens */}
      <Section title="Design Tokens">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          IconButton 컴포넌트에 적용된 Foundation 기반 디자인 토큰입니다.
        </p>
        <div style={{ overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Property</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Small</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Medium</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>Large</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px" }}>Button Size</td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "var(--content-brand-default)" }}>32px (primitive.8)</td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "var(--content-brand-default)" }}>40px (primitive.10)</td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "var(--content-brand-default)" }}>48px (primitive.12)</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px" }}>Icon Size</td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "var(--content-brand-default)" }}>18px</td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "var(--content-brand-default)" }}>22px</td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", color: "var(--content-brand-default)" }}>26px</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px" }}>Border Radius</td>
                <td colSpan={3} style={{ padding: "12px 16px", fontFamily: "monospace", color: "var(--content-brand-default)" }}>9999px (primitive.full)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* Accessibility */}
      <Section title="Accessibility">
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, lineHeight: 1.6 }}>
          Icon Button은 텍스트 레이블이 없으므로 접근성에 특별한 주의가 필요합니다.
        </p>

        <div style={{ overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)", marginBottom: 24 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>속성</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>role=&quot;button&quot;</code></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>스크린 리더가 버튼으로 인식</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>aria-label</code> (필수)</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>아이콘의 목적을 설명하는 텍스트. Icon Button에서 필수</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4, fontSize: 12 }}>aria-disabled</code></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>비활성화 상태를 보조 기술에 전달</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Subsection title="Keyboard Interaction">
          <div style={{ overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>키</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>동작</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><kbd style={{ padding: "2px 6px", backgroundColor: "var(--bg-secondary)", borderRadius: 4, fontSize: 12 }}>Tab</kbd></td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>버튼으로 포커스 이동</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><kbd style={{ padding: "2px 6px", backgroundColor: "var(--bg-secondary)", borderRadius: 4, fontSize: 12 }}>Enter</kbd></td>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>버튼 클릭 실행</td>
                </tr>
                <tr>
                  <td style={{ padding: "12px 16px" }}><kbd style={{ padding: "2px 6px", backgroundColor: "var(--bg-secondary)", borderRadius: 4, fontSize: 12 }}>Space</kbd></td>
                  <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>버튼 클릭 실행</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Design Principles">
          <div style={{ display: "grid", gap: 16 }}>
            <PrincipleCard
              number={1}
              title="Accessibility Label 필수"
              desc="텍스트 레이블이 없으므로 aria-label을 반드시 제공해야 합니다. 예: aria-label='메뉴 열기', aria-label='닫기'"
            />
            <PrincipleCard
              number={2}
              title="Minimum Touch Target"
              desc="모든 Icon Button은 최소 32px 터치 영역을 확보합니다. small 사이즈(32px)는 데스크톱 전용으로 권장하며, 모바일에서는 medium(40px) 이상을 사용하세요."
            />
            <PrincipleCard
              number={3}
              title="Focus Visible"
              desc="키보드 포커스 시 2px solid outline이 표시됩니다. 원형 버튼 외곽에 포커스 링이 표시되어 시인성을 확보합니다."
            />
            <PrincipleCard
              number={4}
              title="Color Contrast"
              desc="WCAG 2.1 AA 기준(3:1)을 충족하는 아이콘 대비를 유지합니다. disabled 상태에서도 비활성화 상태가 인지 가능해야 합니다."
            />
          </div>
        </Subsection>
      </Section>

      {/* Related Components */}
      <Section title="Related Components">
        <div style={{ overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>컴포넌트</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>용도</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, borderBottom: "1px solid var(--divider)" }}>차이점</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px", fontWeight: 500 }}>Button</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>텍스트 레이블이 있는 주요/보조 액션</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>Button도 icon-only 지원하나 직사각형 기반. IconButton은 원형 전용으로 툴바/네비게이션에 최적화</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px", fontWeight: 500 }}>TextButton</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>텍스트 링크 스타일의 가벼운 액션</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>IconButton은 아이콘 전용, TextButton은 텍스트 중심의 최소한 버튼</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <td style={{ padding: "12px 16px", fontWeight: 500 }}>Chip</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>필터링/선택 인터랙션</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>Chip은 선택 상태 토글용, IconButton은 단일 액션 실행용</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", fontWeight: 500 }}>ContentBadge</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>읽기 전용 상태/라벨 표시</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>ContentBadge는 인터랙션 없음, IconButton은 클릭 가능한 액션 버튼</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}

const GITHUB_BASE = "https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system/src";
const ICONBUTTON_SOURCE = `${GITHUB_BASE}/components/IconButton/IconButton.tsx`;

function WebContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
      {/* Source Code */}
      <Section title="Source Code">
        <div style={{ padding: 16, backgroundColor: "var(--bg-secondary)", borderRadius: 12, marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>IconButton Component</p>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: "4px 0 0 0" }}>실제 컴포넌트 소스 코드를 GitHub에서 확인하세요.</p>
          </div>
          <a
            href={ICONBUTTON_SOURCE}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              fontSize: 13,
              fontWeight: 500,
              color: "var(--content-base-onColor)",
              backgroundColor: "var(--docs-code-surface)",
              borderRadius: 12,
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
        <CodeBlock code={`import { IconButton } from '@baerae-zkap/design-system';`} />
      </Section>

      {/* Basic Usage */}
      <Section title="Basic Usage">
        <PreviewBox>
          <div style={{ display: "flex", gap: 16, alignItems: "center", padding: 24 }}>
            <IconButtonDemo variant="ghost" color="baseDefault" />
          </div>
        </PreviewBox>
        <CodeBlock code={`<IconButton onClick={() => {}}>
  <PlusIcon />
</IconButton>`} />
      </Section>

      {/* Variants */}
      <Section title="Variants">
        <PreviewBox>
          <div style={{ display: "flex", gap: 16, alignItems: "center", padding: 24 }}>
            <IconButtonDemo variant="ghost" color="baseDefault" />
            <IconButtonDemo variant="filled" color="brandDefault" />
            <IconButtonDemo variant="outlined" color="baseDefault" />
          </div>
        </PreviewBox>
        <CodeBlock code={`<IconButton variant="ghost" onClick={() => {}}>
  <MenuIcon />
</IconButton>

<IconButton variant="filled" color="brandDefault" onClick={() => {}}>
  <PlusIcon />
</IconButton>

<IconButton variant="outlined" onClick={() => {}}>
  <SettingsIcon />
</IconButton>`} />
      </Section>

      {/* API Reference */}
      <Section title="API Reference">
        <PropsTable
          props={[
            { name: "variant", type: '"filled" | "ghost" | "outlined"', required: false, defaultVal: '"ghost"', description: "버튼 스타일" },
            { name: "color", type: '"brandDefault" | "baseDefault" | "errorDefault"', required: false, defaultVal: '"baseDefault"', description: "색상 테마" },
            { name: "size", type: '"small" | "medium" | "large"', required: false, defaultVal: '"medium"', description: "버튼 크기" },
            { name: "disabled", type: "boolean", required: false, defaultVal: "false", description: "비활성화 상태" },
            { name: "children", type: "ReactNode", required: true, description: "아이콘 콘텐츠" },
            { name: "onClick", type: "() => void", required: false, description: "클릭 핸들러" },
          ]}
        />
      </Section>
    </div>
  );
}

// ============================================
// Shared Components
// ============================================

function UsageCard({ situation, desc, variant, color, iconType }: {
  situation: string;
  desc: string;
  variant: IconButtonVariant;
  color: IconButtonColor;
  iconType: "plus" | "close" | "menu" | "edit";
}) {
  const iconPaths: Record<string, React.ReactNode> = {
    plus: (
      <>
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </>
    ),
    close: (
      <>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </>
    ),
    menu: (
      <>
        <line x1="4" y1="7" x2="20" y2="7" />
        <line x1="4" y1="12" x2="20" y2="12" />
        <line x1="4" y1="17" x2="20" y2="17" />
      </>
    ),
    edit: (
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" fill="none" />
    ),
  };

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr auto",
      gap: 16,
      padding: 16,
      backgroundColor: "var(--surface-base-default)",
      borderRadius: 12,
      border: "1px solid var(--divider)",
      alignItems: "center",
    }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>{situation}</span>
          <span style={{
            fontSize: 11,
            padding: "2px 6px",
            backgroundColor: variant === "filled" ? "var(--surface-brand-secondary)" : "var(--surface-base-alternative)",
            color: variant === "filled" ? "var(--surface-brand-defaultPressed)" : "var(--content-base-secondary)",
            borderRadius: 4,
            fontWeight: 500,
          }}>
            {variant} + {color}
          </span>
        </div>
        <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0 }}>{desc}</p>
      </div>
      <IconButtonDemo variant={variant} color={color} size="small" />
    </div>
  );
}

// ============================================
// Demo Component
// ============================================

function InteractionStateCard({ label, sublabel, color, bgColor, opacity, showFocusRing }: {
  label: string; sublabel: string; color: string; bgColor: string; opacity?: number; showFocusRing?: boolean;
}) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: 16,
    }}>
      <div style={{
        width: "100%", height: 48, borderRadius: 12,
        backgroundColor: bgColor,
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: opacity ?? 1,
        outline: showFocusRing ? "2px solid var(--content-brand-default)" : "none",
        outlineOffset: showFocusRing ? 2 : 0,
        color: color, fontSize: 13, fontWeight: 500,
      }}>
        {label}
      </div>
      <span style={{ fontSize: 12, color: "var(--text-tertiary)", textAlign: "center" }}>{sublabel}</span>
    </div>
  );
}

function IconButtonDemo({
  variant = "ghost",
  color = "baseDefault",
  size = "medium",
  disabled = false,
}: {
  variant?: IconButtonVariant;
  color?: IconButtonColor;
  size?: IconButtonSize;
  disabled?: boolean;
}) {
  const iconSize = sizeConfig[size].iconSize;

  return (
    <IconButton
      variant={variant}
      color={color}
      size={size}
      disabled={disabled}
    >
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    </IconButton>
  );
}
