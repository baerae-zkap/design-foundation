"use client";

import React, { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform, highlightCode } from "@/components/PlatformTabs";
import { FilterButton, typography, spacing, radius } from '@baerae-zkap/design-system';
import { Section, Subsection, InlineCode } from "@/components/docs/Section";
import { PropsTable } from "@/components/docs/PropsTable";
import { DoCard, DontCard, PrincipleCard, VariantCard } from "@/components/docs/Cards";
import { RadioGroup, CopyButton } from "@/components/docs/Playground";

type FilterButtonVariant = 'filled' | 'outlined';
type FilterButtonSize = 'small' | 'medium' | 'large';

const sampleItems = [
  { label: 'Menu item 1', value: '1' },
  { label: 'Menu item 2', value: '2' },
  { label: 'Menu item 3', value: '3' },
];

export default function FilterButtonPage() {
  return (
    <div style={{ maxWidth: 840 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Inputs" },
          { label: "Filter Button" },
        ]}
      />

      <h1 style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold, marginBottom: spacing.primitive[2], color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
        Filter Button
      </h1>
      <p style={{ fontSize: typography.fontSize.md, color: "var(--text-secondary)", marginBottom: spacing.primitive[8], lineHeight: 1.7 }}>
        콘텐츠 필터링을 위한 컴팩트한 선택 버튼입니다. 클릭하면 드롭다운 메뉴가 열려 아이템을 선택할 수 있습니다.
      </p>

      <FilterButtonPlayground />

      <PlatformTabs>
        {(platform) => <PlatformContent platform={platform} />}
      </PlatformTabs>
    </div>
  );
}

// ─── Playground ──────────────────────────────────────────────────────

function FilterButtonPlayground() {
  const [variant, setVariant] = useState<FilterButtonVariant>('filled');
  const [size, setSize] = useState<FilterButtonSize>('medium');
  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);

  const generateCode = () => {
    const props: string[] = [];
    if (variant !== 'filled') props.push(`variant="${variant}"`);
    if (size !== 'medium') props.push(`size="${size}"`);
    props.push(`items={[
    { label: 'Menu item 1', value: '1' },
    { label: 'Menu item 2', value: '2' },
    { label: 'Menu item 3', value: '3' },
  ]}`);
    props.push(`value={selected}`);
    props.push(`onSelect={setSelected}`);
    const propsStr = `\n  ${props.join('\n  ')}\n`;
    return `<FilterButton${propsStr}>
  카테고리
</FilterButton>`;
  };

  return (
    <div style={{ marginBottom: spacing.primitive[8] }}>
      <div
        style={{
          borderRadius: radius.primitive.xl,
          overflow: "hidden",
          backgroundColor: "var(--surface-base-default)",
          border: "1px solid var(--border-solid-alternative)",
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
              backgroundColor: "var(--surface-base-default)",
            }}
          >
            <FilterButton
              variant={variant}
              size={size}
              items={sampleItems}
              value={selectedValue}
              onSelect={setSelectedValue}
            >
              카테고리
            </FilterButton>
          </div>

          {/* Control Panel */}
          <div
            style={{
              backgroundColor: "var(--surface-base-default)",
              borderLeft: "1px solid var(--border-solid-alternative)",
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
                  { value: 'filled', label: 'Filled' },
                  { value: 'outlined', label: 'Outlined' },
                ]}
                value={variant}
                onChange={(v) => setVariant(v as FilterButtonVariant)}
              />
              <RadioGroup
                label="Size"
                options={[
                  { value: 'small', label: 'Small' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'large', label: 'Large' },
                ]}
                value={size}
                onChange={(v) => setSize(v as FilterButtonSize)}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.primitive[2] }}>
                <span style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.medium, color: 'var(--text-primary)' }}>
                  Selected
                </span>
                <span style={{ fontSize: typography.fontSize.compact, color: 'var(--text-secondary)' }}>
                  {selectedValue ? sampleItems.find(i => i.value === selectedValue)?.label : '(none)'}
                </span>
                {selectedValue && (
                  <button
                    onClick={() => setSelectedValue(undefined)}
                    style={{
                      fontSize: typography.fontSize.compact,
                      color: 'var(--content-brand-default)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      textAlign: 'left',
                    }}
                  >
                    Reset
                  </button>
                )}
              </div>
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

function PlatformContent({ platform }: { platform: Platform }) {
  if (platform === 'design') return <DesignContent />;
  return <WebContent />;
}

// ─── Design Content ───────────────────────────────────────────────────

function DesignContent() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.primitive[12] }}>

      {/* 1. Overview */}
      <Section title="Overview">
        <p style={{ fontSize: typography.fontSize.sm, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          <InlineCode>FilterButton</InlineCode>은 콘텐츠 목록을 필터링하거나 정렬 기준을 선택하는 데 사용하는
          컴팩트한 선택 버튼입니다. 클릭하면 드롭다운 메뉴가 열리며, 아이템을 선택하면 버튼 라벨이 변경됩니다.
          복수 선택 필터에는 <InlineCode>Chip</InlineCode>을, 배타적 뷰 전환에는 <InlineCode>SegmentedControl</InlineCode>을 사용하세요.
        </p>
      </Section>

      {/* 2. Anatomy */}
      <Section title="Anatomy">
        <div style={{
          backgroundColor: 'var(--surface-base-alternative)',
          borderRadius: radius.primitive.md,
          padding: `${spacing.primitive[12]}px ${spacing.primitive[10]}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg width="420" height="100" viewBox="0 0 420 100">
            {/* Button container */}
            <rect x="130" y="30" width="160" height="40" rx="8" fill="var(--surface-base-alternative)" stroke="var(--border-solid-default)" strokeWidth="1" />

            {/* Label text */}
            <text x="182" y="55" textAnchor="middle" fill="var(--content-base-default)" fontSize={typography.fontSize.sm} fontWeight={typography.fontWeight.medium}>카테고리</text>

            {/* Chevron icon */}
            <polyline points="256,46 263,54 270,46" fill="none" stroke="var(--content-base-default)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

            {/* Arrow to container */}
            <line x1="100" y1="50" x2="129" y2="50" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="130" cy="50" r="2.5" fill="var(--content-base-default)" />
            <circle cx="82" cy="50" r="14" fill="var(--content-base-default)" />
            <text x="82" y="55" textAnchor="middle" fill="var(--content-base-onColor)" fontSize={typography.fontSize['3xs']} fontWeight={typography.fontWeight.semibold}>1</text>

            {/* Arrow to label */}
            <line x1="182" y1="29" x2="182" y2="15" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="182" cy="29" r="2.5" fill="var(--content-base-default)" />
            <circle cx="182" cy="8" r="8" fill="var(--content-base-default)" />
            <text x="182" y="13" textAnchor="middle" fill="var(--content-base-onColor)" fontSize={typography.fontSize['3xs']} fontWeight={typography.fontWeight.semibold}>2</text>

            {/* Arrow to chevron */}
            <line x1="263" y1="29" x2="263" y2="15" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="263" cy="29" r="2.5" fill="var(--content-base-default)" />
            <circle cx="263" cy="8" r="8" fill="var(--content-base-default)" />
            <text x="263" y="13" textAnchor="middle" fill="var(--content-base-onColor)" fontSize={typography.fontSize['3xs']} fontWeight={typography.fontWeight.semibold}>3</text>

            {/* Labels */}
            <text x="82" y="82" textAnchor="middle" fill="var(--content-base-secondary)" fontSize={typography.fontSize['3xs']}>Container</text>
            <text x="182" y="82" textAnchor="middle" fill="var(--content-base-secondary)" fontSize={typography.fontSize['3xs']}>Label</text>
            <text x="263" y="82" textAnchor="middle" fill="var(--content-base-secondary)" fontSize={typography.fontSize['3xs']}>Trailing Icon</text>
          </svg>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: spacing.primitive[4],
          marginTop: spacing.primitive[5],
          fontSize: typography.fontSize.sm,
          fontWeight: typography.fontWeight.medium,
          color: 'var(--text-primary)',
        }}>
          <div>1. Container</div>
          <div style={{ textAlign: 'center' }}>2. Label</div>
          <div style={{ textAlign: 'right' }}>3. Trailing Icon (Chevron)</div>
        </div>
      </Section>

      {/* 3. Variants */}
      <Section title="Variants">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.primitive[4] }}>
          <VariantCard name="Filled" description="채워진 배경 스타일 (기본값). 단독 또는 소수 필터에 적합합니다.">
            <div style={{ display: 'flex', gap: spacing.primitive[2] }}>
              <FilterButton variant="filled">카테고리</FilterButton>
            </div>
          </VariantCard>
          <VariantCard name="Outlined" description="테두리만 있는 투명 배경. 여러 필터를 나란히 배치할 때 적합합니다.">
            <div style={{ display: 'flex', gap: spacing.primitive[2] }}>
              <FilterButton variant="outlined">카테고리</FilterButton>
            </div>
          </VariantCard>
        </div>
      </Section>

      {/* 4. Size */}
      <Section title="Size">
        <PreviewBox>
          <div style={{ display: 'flex', gap: spacing.primitive[6], alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <FilterButton size="small">필터</FilterButton>
              <p style={{ fontSize: typography.fontSize['2xs'], color: 'var(--content-base-secondary)', marginTop: spacing.primitive[2] }}>Small</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <FilterButton size="medium">필터</FilterButton>
              <p style={{ fontSize: typography.fontSize['2xs'], color: 'var(--content-base-secondary)', marginTop: spacing.primitive[2] }}>Medium</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <FilterButton size="large">필터</FilterButton>
              <p style={{ fontSize: typography.fontSize['2xs'], color: 'var(--content-base-secondary)', marginTop: spacing.primitive[2] }}>Large</p>
            </div>
          </div>
        </PreviewBox>
      </Section>

      {/* 5. States */}
      <Section title="States">
        <p style={{ fontSize: typography.fontSize.sm, color: 'var(--text-secondary)', marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          FilterButton의 다양한 상태를 확인할 수 있습니다.
        </p>

        <PreviewBox>
          <div style={{ display: 'flex', gap: spacing.primitive[5], flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div style={{ textAlign: 'center' }}>
              <FilterButton>기본</FilterButton>
              <p style={{ fontSize: typography.fontSize['2xs'], color: 'var(--content-base-secondary)', marginTop: spacing.primitive[2] }}>Default</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <FilterButton
                items={[{ label: '전자제품', value: 'electronics' }]}
                value="electronics"
              >
                카테고리
              </FilterButton>
              <p style={{ fontSize: typography.fontSize['2xs'], color: 'var(--content-base-secondary)', marginTop: spacing.primitive[2] }}>Selected</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <FilterButton disabled>비활성</FilterButton>
              <p style={{ fontSize: typography.fontSize['2xs'], color: 'var(--content-base-secondary)', marginTop: spacing.primitive[2] }}>Disabled</p>
            </div>
          </div>
        </PreviewBox>

        <Subsection title="Interaction States">
          <p style={{ fontSize: typography.fontSize.sm, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: spacing.primitive[4] }}>
            클릭하면 드롭다운 메뉴가 열리며 셰브론이 180도 회전합니다.
            값을 선택하면 버튼 라벨이 선택된 아이템의 라벨로 변경됩니다.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: spacing.primitive[4],
            padding: spacing.primitive[6],
            backgroundColor: 'var(--surface-base-default)',
            borderRadius: radius.primitive.md,
          }}>
            <StateCard label="Default" sublabel="기본 상태" bgColor="var(--surface-base-alternative)" textColor="var(--content-base-default)" />
            <StateCard label="Hover" sublabel="마우스 오버" bgColor="var(--surface-base-defaultPressed)" textColor="var(--content-base-default)" />
            <StateCard label="Open" sublabel="메뉴 열림" bgColor="var(--surface-base-defaultPressed)" textColor="var(--content-base-default)" showChevronUp />
            <StateCard label="Disabled" sublabel="비활성" bgColor="var(--surface-base-alternative)" textColor="var(--content-base-default)" opacity={0.4} />
          </div>
        </Subsection>
      </Section>

      {/* 6. Usage Guidelines */}
      <Section title="Usage Guidelines">
        <p style={{ fontSize: typography.fontSize.sm, color: 'var(--text-secondary)', marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          FilterButton은 <strong style={{ color: 'var(--text-primary)' }}>드롭다운 연계 필터</strong> 패턴에 사용합니다.
          단순 토글 필터에는 Chip을, 배타적 뷰 전환에는 SegmentedControl을 사용하세요.
        </p>

        <Subsection title="Best Practices">
          <div style={{ display: 'grid', gap: spacing.primitive[5] }}>

            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.primitive[4] }}>
                <DoCard>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.primitive[3] }}>
                    <p style={{ fontSize: typography.fontSize.compact, color: 'var(--text-secondary)', margin: 0 }}>필터 유형이 많으면 카테고리별로 분리</p>
                    <div style={{ display: 'flex', gap: spacing.primitive[2], flexWrap: 'wrap' }}>
                      <FilterButton size="small">카테고리</FilterButton>
                      <FilterButton size="small">브랜드</FilterButton>
                      <FilterButton size="small">가격</FilterButton>
                    </div>
                  </div>
                </DoCard>
                <DontCard>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.primitive[3] }}>
                    <p style={{ fontSize: typography.fontSize.compact, color: 'var(--text-secondary)', margin: 0 }}>폰트 스타일이나 아이콘 변경 금지</p>
                    <div style={{ display: 'flex', gap: spacing.primitive[2] }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 8, backgroundColor: 'var(--surface-base-container)', fontSize: 12, fontStyle: 'italic', fontWeight: 'bold' }}>
                        카테고리
                      </div>
                    </div>
                  </div>
                </DontCard>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: 'var(--content-success-default)', margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> 필터를 카테고리 단위로 나눕니다
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: 'var(--content-error-default)', margin: 0, fontStyle: 'italic' }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Don&apos;t</span> 시스템 스타일을 임의로 변경하지 않습니다
                </p>
              </div>
            </div>

            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.primitive[4] }}>
                <DoCard>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.primitive[3] }}>
                    <p style={{ fontSize: typography.fontSize.compact, color: 'var(--text-secondary)', margin: 0 }}>items를 사용하여 드롭다운 메뉴 제공</p>
                    <FilterButton
                      size="small"
                      items={[{ label: '최신순', value: 'latest' }, { label: '인기순', value: 'popular' }]}
                      value="latest"
                    >
                      정렬
                    </FilterButton>
                  </div>
                </DoCard>
                <DontCard>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.primitive[3] }}>
                    <p style={{ fontSize: typography.fontSize.compact, color: 'var(--text-secondary)', margin: 0 }}>과도하게 많은 필터를 한 줄에 배치</p>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'nowrap', overflow: 'hidden' }}>
                      {['카테고리', '브랜드', '가격', '배송', '할인', '평점'].map(label => (
                        <FilterButton key={label} size="small" style={{ flexShrink: 0 }}>{label}</FilterButton>
                      ))}
                    </div>
                  </div>
                </DontCard>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: 'var(--content-success-default)', margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> items prop으로 선택 메뉴를 제공합니다
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: 'var(--content-error-default)', margin: 0, fontStyle: 'italic' }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Don&apos;t</span> 한 줄에 6개 이상의 FilterButton을 배치하지 않습니다
                </p>
              </div>
            </div>

          </div>
        </Subsection>
      </Section>

      {/* 7. Design Tokens */}
      <Section title="Design Tokens">
        <p style={{ fontSize: typography.fontSize.sm, color: 'var(--text-secondary)', marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          FilterButton 컴포넌트에 적용된 Foundation 기반 디자인 토큰입니다.
        </p>

        <Subsection title="Color 토큰">
          <div style={{ overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: typography.fontSize.compact }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--surface-base-alternative)' }}>
                  <th style={thStyle}>State</th>
                  <th style={thStyle}>Filled Token</th>
                  <th style={thStyle}>Outlined Token</th>
                </tr>
              </thead>
              <tbody>
                <tr style={trBorder}>
                  <td style={tdStyle}>Default BG</td>
                  <td style={tdMono}>surface.base.alternative</td>
                  <td style={tdMono}>transparent</td>
                </tr>
                <tr style={trBorder}>
                  <td style={tdStyle}>Hover / Open BG</td>
                  <td style={tdMono}>surface.base.defaultPressed</td>
                  <td style={tdMono}>fill.alternative</td>
                </tr>
                <tr style={trBorder}>
                  <td style={tdStyle}>Default Border</td>
                  <td style={tdMono}>-</td>
                  <td style={tdMono}>border.solid.default</td>
                </tr>
                <tr style={trBorder}>
                  <td style={tdStyle}>Text</td>
                  <td style={tdMono}>content.base.default</td>
                  <td style={tdMono}>content.base.default</td>
                </tr>
                <tr>
                  <td style={tdStyle}>Disabled Opacity</td>
                  <td style={tdMono}>opacity.disabled (0.4)</td>
                  <td style={tdMono}>opacity.disabled (0.4)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>
      </Section>

      {/* 8. Accessibility */}
      <Section title="Accessibility">
        <p style={{ fontSize: typography.fontSize.sm, color: 'var(--text-secondary)', marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          FilterButton은 <InlineCode>aria-expanded</InlineCode>와 <InlineCode>aria-haspopup=&quot;listbox&quot;</InlineCode> 속성으로
          드롭다운 연계 패턴을 스크린 리더에 전달합니다.
        </p>

        <div style={{ overflow: 'auto', marginBottom: spacing.primitive[6] }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--surface-base-alternative)' }}>
                <th style={thStyle}>속성</th>
                <th style={thStyle}>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr style={trBorder}>
                <td style={tdStyle}><InlineCode>aria-expanded</InlineCode></td>
                <td style={{ ...tdMono, borderBottom: undefined }}>드롭다운 열림/닫힘 상태를 보조 기술에 전달</td>
              </tr>
              <tr style={trBorder}>
                <td style={tdStyle}><InlineCode>aria-haspopup</InlineCode></td>
                <td style={{ ...tdMono, borderBottom: undefined }}>listbox 역할의 팝업이 있음을 전달</td>
              </tr>
              <tr style={trBorder}>
                <td style={tdStyle}><InlineCode>role=&quot;listbox&quot;</InlineCode></td>
                <td style={{ ...tdMono, borderBottom: undefined }}>드롭다운 메뉴의 역할</td>
              </tr>
              <tr>
                <td style={tdStyle}><InlineCode>role=&quot;option&quot;</InlineCode></td>
                <td style={tdMono}>각 메뉴 아이템의 역할 (aria-selected로 선택 상태 표시)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Subsection title="Keyboard Interaction">
          <div style={{ overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: typography.fontSize.sm }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--surface-base-alternative)' }}>
                  <th style={thStyle}>키</th>
                  <th style={thStyle}>동작</th>
                </tr>
              </thead>
              <tbody>
                <tr style={trBorder}>
                  <td style={tdStyle}><kbd style={kbdStyle}>Tab</kbd></td>
                  <td style={tdMono}>FilterButton으로 포커스 이동</td>
                </tr>
                <tr style={trBorder}>
                  <td style={tdStyle}><kbd style={kbdStyle}>Enter</kbd> / <kbd style={kbdStyle}>Space</kbd></td>
                  <td style={tdMono}>드롭다운 열기/닫기</td>
                </tr>
                <tr>
                  <td style={tdStyle}><kbd style={kbdStyle}>Esc</kbd></td>
                  <td style={tdMono}>드롭다운 닫기 (버튼에 포커스 복귀)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Design Principles">
          <div style={{ display: 'grid', gap: spacing.primitive[4] }}>
            <PrincipleCard
              number={1}
              title="aria-expanded로 드롭다운 상태 전달"
              desc="메뉴가 열리면 aria-expanded='true'가 설정됩니다. ESC 키로 닫을 수 있으며, 포커스가 버튼으로 복귀합니다."
            />
            <PrincipleCard
              number={2}
              title="선택 상태를 텍스트로 전달"
              desc="값이 선택되면 버튼 라벨이 선택된 아이템의 라벨로 변경되어 시각적, 텍스트적으로 현재 상태를 전달합니다."
            />
            <PrincipleCard
              number={3}
              title="최소 터치 영역 보장"
              desc="모든 사이즈에서 최소 32px 이상의 높이를 유지하여 터치 인터페이스에서의 접근성을 보장합니다."
            />
          </div>
        </Subsection>
      </Section>

      {/* 9. Related Components */}
      <Section title="Related Components">
        <div style={{ overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: typography.fontSize.sm }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--surface-base-alternative)' }}>
                <th style={thStyle}>컴포넌트</th>
                <th style={thStyle}>용도</th>
                <th style={thStyle}>차이점</th>
              </tr>
            </thead>
            <tbody>
              <tr style={trBorder}>
                <td style={{ ...tdStyle, fontWeight: typography.fontWeight.medium }}>Chip</td>
                <td style={{ ...tdStyle, color: 'var(--text-secondary)' }}>태그, 다중 선택 필터</td>
                <td style={{ ...tdStyle, color: 'var(--text-secondary)' }}>Chip은 토글 선택, FilterButton은 드롭다운 연계</td>
              </tr>
              <tr style={trBorder}>
                <td style={{ ...tdStyle, fontWeight: typography.fontWeight.medium }}>SegmentedControl</td>
                <td style={{ ...tdStyle, color: 'var(--text-secondary)' }}>배타적 뷰/모드 전환 (2-4 옵션)</td>
                <td style={{ ...tdStyle, color: 'var(--text-secondary)' }}>SegmentedControl은 즉시 적용, FilterButton은 드롭다운 선택</td>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.primitive[12] }}>

      {/* 1. Source Code */}
      <Section title="Source Code">
        <div style={{
          padding: spacing.primitive[4],
          backgroundColor: 'var(--surface-base-alternative)',
          borderRadius: radius.primitive.md,
          marginBottom: spacing.primitive[6],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div>
            <p style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: 'var(--text-primary)', margin: 0 }}>FilterButton Component</p>
            <p style={{ fontSize: typography.fontSize.compact, color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>실제 컴포넌트 소스 코드를 GitHub에서 확인하세요.</p>
          </div>
          <a
            href="https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system/src/components/FilterButton/FilterButton.tsx"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: spacing.primitive[1],
              padding: `${spacing.primitive[2]}px ${spacing.primitive[4]}px`,
              fontSize: typography.fontSize.compact,
              fontWeight: typography.fontWeight.medium,
              color: 'white',
              backgroundColor: 'var(--inverse-surface-default)',
              borderRadius: radius.primitive.md,
              textDecoration: 'none',
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
        <CodeBlock code={`import { FilterButton } from '@baerae-zkap/design-system';
import type { FilterItem } from '@baerae-zkap/design-system';`} />
      </Section>

      {/* 3. Basic Usage */}
      <Section title="Basic Usage">
        <PreviewBox>
          <div style={{ display: 'flex', gap: spacing.primitive[3] }}>
            <BasicDemo />
          </div>
        </PreviewBox>
        <CodeBlock code={`const items = [
  { label: '최신순', value: 'latest' },
  { label: '인기순', value: 'popular' },
  { label: '가격순', value: 'price' },
];

const [selected, setSelected] = useState<string>();

<FilterButton
  items={items}
  value={selected}
  onSelect={setSelected}
>
  정렬
</FilterButton>`} />
      </Section>

      {/* 4. Variants */}
      <Section title="Variants">
        <PreviewBox>
          <div style={{ display: 'flex', gap: spacing.primitive[3] }}>
            <FilterButton variant="filled" items={sampleItems}>Filled</FilterButton>
            <FilterButton variant="outlined" items={sampleItems}>Outlined</FilterButton>
          </div>
        </PreviewBox>
        <CodeBlock code={`<FilterButton variant="filled" items={items}>Filled</FilterButton>
<FilterButton variant="outlined" items={items}>Outlined</FilterButton>`} />
      </Section>

      {/* 5. Sizes */}
      <Section title="Sizes">
        <PreviewBox>
          <div style={{ display: 'flex', gap: spacing.primitive[4], alignItems: 'center' }}>
            <FilterButton size="small" items={sampleItems}>Small</FilterButton>
            <FilterButton size="medium" items={sampleItems}>Medium</FilterButton>
            <FilterButton size="large" items={sampleItems}>Large</FilterButton>
          </div>
        </PreviewBox>
        <CodeBlock code={`<FilterButton size="small" items={items}>Small</FilterButton>
<FilterButton size="medium" items={items}>Medium</FilterButton>
<FilterButton size="large" items={items}>Large</FilterButton>`} />
      </Section>

      {/* 6. Controlled Selection */}
      <Section title="Controlled Selection">
        <p style={{ fontSize: typography.fontSize.sm, color: 'var(--text-secondary)', marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          <InlineCode>value</InlineCode>와 <InlineCode>onSelect</InlineCode>를 사용하여 선택 상태를 제어합니다.
          값이 선택되면 버튼 라벨이 해당 아이템의 라벨로 변경됩니다.
        </p>
        <PreviewBox>
          <ControlledDemo />
        </PreviewBox>
        <CodeBlock code={`const [selected, setSelected] = useState<string>();

<FilterButton
  items={[
    { label: '최신순', value: 'latest' },
    { label: '인기순', value: 'popular' },
    { label: '가격순', value: 'price' },
  ]}
  value={selected}
  onSelect={setSelected}
>
  정렬
</FilterButton>`} />
      </Section>

      {/* 7. API Reference */}
      <Section title="API Reference">
        <PropsTable
          props={[
            { name: 'children', type: 'ReactNode', required: true, description: '라벨 텍스트 (값 미선택 시 표시)' },
            { name: 'variant', type: "'filled' | 'outlined'", required: false, defaultVal: "'filled'", description: "버튼 스타일 -- filled(채워진 배경), outlined(테두리 배경)" },
            { name: 'size', type: "'small' | 'medium' | 'large'", required: false, defaultVal: "'medium'", description: '버튼 크기' },
            { name: 'items', type: 'FilterItem[]', required: false, description: '드롭다운 메뉴 아이템 목록 ({ label, value })' },
            { name: 'value', type: 'string', required: false, description: '선택된 값 (controlled). items 내 value와 매칭' },
            { name: 'onSelect', type: '(value: string) => void', required: false, description: '아이템 선택 시 콜백' },
            { name: 'disabled', type: 'boolean', required: false, defaultVal: 'false', description: '비활성 상태' },
            { name: 'onClick', type: '() => void', required: false, description: '버튼 클릭 핸들러 (드롭다운 토글과 별도)' },
            { name: 'style', type: 'CSSProperties', required: false, description: '인라인 스타일 오버라이드' },
          ]}
        />
      </Section>
    </div>
  );
}

// ─── Demo Components ──────────────────────────────────────────────────

function BasicDemo() {
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const items = [
    { label: '최신순', value: 'latest' },
    { label: '인기순', value: 'popular' },
    { label: '가격순', value: 'price' },
  ];
  return (
    <FilterButton items={items} value={selected} onSelect={setSelected}>
      정렬
    </FilterButton>
  );
}

function ControlledDemo() {
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const items = [
    { label: '최신순', value: 'latest' },
    { label: '인기순', value: 'popular' },
    { label: '가격순', value: 'price' },
  ];
  return (
    <div style={{ display: 'flex', gap: spacing.primitive[3], alignItems: 'center' }}>
      <FilterButton items={items} value={selected} onSelect={setSelected}>
        정렬
      </FilterButton>
      {selected && (
        <span style={{ fontSize: typography.fontSize.sm, color: 'var(--text-secondary)' }}>
          선택: {items.find(i => i.value === selected)?.label}
        </span>
      )}
    </div>
  );
}

// ─── UI Helpers ───────────────────────────────────────────────────────

function StateCard({ label, sublabel, bgColor, textColor, opacity = 1, showChevronUp = false }: {
  label: string;
  sublabel: string;
  bgColor: string;
  textColor: string;
  opacity?: number;
  showChevronUp?: boolean;
}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: spacing.primitive[3],
      padding: spacing.primitive[4],
    }}>
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '0 12px',
        height: 36,
        borderRadius: 8,
        backgroundColor: bgColor,
        opacity,
        color: textColor,
        fontSize: typography.fontSize.compact,
        fontWeight: typography.fontWeight.medium,
        whiteSpace: 'nowrap' as const,
      }}>
        <span>필터</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          style={{ transform: showChevronUp ? 'rotate(180deg)' : 'none', transition: 'transform 200ms ease-out' }}
        >
          <polyline points="3,5 7,9 11,5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.medium, color: 'var(--text-primary)' }}>{label}</div>
        <div style={{ fontSize: typography.fontSize.xs, color: 'var(--text-tertiary)', marginTop: 2 }}>{sublabel}</div>
      </div>
    </div>
  );
}

// ─── Shared Styles ────────────────────────────────────────────────────

const thStyle: React.CSSProperties = {
  padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`,
  textAlign: 'left' as const,
  fontWeight: typography.fontWeight.semibold,
  fontSize: typography.fontSize.compact,
  borderBottom: '1px solid var(--divider)',
};

const tdStyle: React.CSSProperties = {
  padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`,
};

const tdMono: React.CSSProperties = {
  padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`,
  fontFamily: 'monospace',
  color: 'var(--text-secondary)',
};

const trBorder: React.CSSProperties = {
  borderBottom: '1px solid var(--divider)',
};

const kbdStyle: React.CSSProperties = {
  padding: '2px 6px',
  backgroundColor: 'var(--surface-base-alternative)',
  borderRadius: radius.primitive.xs,
  fontSize: typography.fontSize.xs,
};
