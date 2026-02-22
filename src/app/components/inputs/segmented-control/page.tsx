"use client";

import React, { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform, highlightCode } from "@/components/PlatformTabs";
import { SegmentedControl, typography, spacing, radius } from '@baerae-zkap/design-system';
import type { SegmentedControlOption } from '@baerae-zkap/design-system';
import { Section, Subsection, InlineCode } from "@/components/docs/Section";
import { PropsTable } from "@/components/docs/PropsTable";
import { DoCard, DontCard, PrincipleCard } from "@/components/docs/Cards";
import { RadioGroup, CopyButton } from "@/components/docs/Playground";

const VIEW_OPTIONS: SegmentedControlOption[] = [
  { value: 'list', label: 'List' },
  { value: 'grid', label: 'Grid' },
  { value: 'map', label: 'Map' },
];

export default function SegmentedControlPage() {
  return (
    <div style={{ maxWidth: 840 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Inputs" },
          { label: "Segmented Control" },
        ]}
      />

      <h1 style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold, marginBottom: spacing.primitive[2], color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
        Segmented Control
      </h1>
      <p style={{ fontSize: typography.fontSize.md, color: "var(--text-secondary)", marginBottom: spacing.primitive[8], lineHeight: 1.7 }}>
        2~5개의 배타적 옵션 중 하나를 선택하는 탭형 컨트롤입니다. 뷰 전환, 필터 모드, 정렬 기준 등에 적합합니다.
      </p>

      <SegmentedControlPlayground />

      <PlatformTabs>
        {(platform) => <PlatformContent platform={platform} />}
      </PlatformTabs>
    </div>
  );
}

// ─── Playground ──────────────────────────────────────────────────────

function SegmentedControlPlayground() {
  const [value, setValue] = useState('list');
  const [fullWidth, setFullWidth] = useState(false);
  const [size, setSize] = useState<string>('medium');

  const generateCode = () => {
    const lines: string[] = [
      `options={[`,
      `  { value: 'list', label: 'List' },`,
      `  { value: 'grid', label: 'Grid' },`,
      `  { value: 'map', label: 'Map' },`,
      `]}`,
      `value={view}`,
      `onChange={setView}`,
    ];
    if (fullWidth) lines.push('fullWidth');
    if (size !== 'medium') lines.push(`size="${size}"`);
    return `<SegmentedControl\n  ${lines.join('\n  ')}\n/>`;
  };

  return (
    <div style={{ marginBottom: spacing.primitive[8] }}>
      <div
        style={{
          borderRadius: radius.primitive.xl,
          overflow: "hidden",
          backgroundColor: "var(--surface-base-default)", border: "1px solid var(--border-solid-alternative)",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", height: 400 }}>
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
            <div style={{ width: fullWidth ? '100%' : undefined, maxWidth: 320 }}>
              <SegmentedControl
                options={VIEW_OPTIONS}
                value={value}
                onChange={setValue}
                fullWidth={fullWidth}
                size={size as 'small' | 'medium' | 'large'}
              />
            </div>
          </div>

          {/* Control Panel */}
          <div
            style={{
              backgroundColor: "var(--surface-base-default)", borderLeft: "1px solid var(--border-solid-alternative)",
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
                label="Selected"
                options={VIEW_OPTIONS.map(o => ({ label: o.label, value: o.value }))}
                value={value}
                onChange={setValue}
              />
              <RadioGroup
                label="Size"
                options={[
                  { value: 'small', label: 'Small' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'large', label: 'Large' },
                ]}
                value={size}
                onChange={setSize}
              />
              <RadioGroup
                label="Full Width"
                options={[
                  { value: 'false', label: 'False' },
                  { value: 'true', label: 'True' },
                ]}
                value={fullWidth ? 'true' : 'false'}
                onChange={(v) => setFullWidth(v === 'true')}
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
          <InlineCode>SegmentedControl</InlineCode>은 2~5개의 배타적 옵션 중 하나를 선택하는 탭형 컨트롤입니다.
          선택된 옵션은 흰색 필 배경으로 강조되며 애니메이션으로 전환됩니다.
          다중 선택이나 5개 초과 옵션에는 <InlineCode>Chip</InlineCode> 또는 <InlineCode>Tab</InlineCode>을 사용하세요.
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
          <svg width="400" height="90" viewBox="0 0 400 90">
            {/* Container */}
            <rect x="60" y="24" width="230" height="40" rx="8" fill="var(--fill-base-default)" />
            {/* Selected pill */}
            <rect x="63" y="27" width="73" height="34" rx="6" fill="var(--surface-base-default)" />

            {/* Option labels */}
            <text x="99" y="48" textAnchor="middle" fill="var(--content-base-default)" fontSize={typography.fontSize.compact} fontWeight={typography.fontWeight.semibold}>List</text>
            <text x="175" y="48" textAnchor="middle" fill="var(--content-base-secondary)" fontSize={typography.fontSize.compact}>Grid</text>
            <text x="251" y="48" textAnchor="middle" fill="var(--content-base-secondary)" fontSize={typography.fontSize.compact}>Map</text>

            {/* Arrow to container */}
            <line x1="45" y1="44" x2="59" y2="44" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="59" cy="44" r="2.5" fill="var(--content-base-default)" />
            <circle cx="28" cy="44" r="12" fill="var(--content-base-default)" />
            <text x="28" y="49" textAnchor="middle" fill="var(--content-base-onColor)" fontSize={typography.fontSize['3xs']} fontWeight={typography.fontWeight.semibold}>1</text>

            {/* Arrow to pill */}
            <line x1="99" y1="22" x2="99" y2="26" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="99" cy="26" r="2.5" fill="var(--content-base-default)" />
            <circle cx="99" cy="12" r="10" fill="var(--content-base-default)" />
            <text x="99" y="17" textAnchor="middle" fill="var(--content-base-onColor)" fontSize={typography.fontSize['3xs']} fontWeight={typography.fontWeight.semibold}>2</text>

            {/* Arrow to option */}
            <line x1="175" y1="22" x2="175" y2="36" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="175" cy="36" r="2.5" fill="var(--content-base-default)" />
            <circle cx="175" cy="12" r="10" fill="var(--content-base-default)" />
            <text x="175" y="17" textAnchor="middle" fill="var(--content-base-onColor)" fontSize={typography.fontSize['3xs']} fontWeight={typography.fontWeight.semibold}>3</text>

            {/* Labels */}
            <text x="28" y="72" textAnchor="middle" fill="var(--content-base-secondary)" fontSize={typography.fontSize['3xs']}>Container</text>
            <text x="99" y="72" textAnchor="middle" fill="var(--content-base-secondary)" fontSize={typography.fontSize['3xs']}>Selected Pill</text>
            <text x="175" y="72" textAnchor="middle" fill="var(--content-base-secondary)" fontSize={typography.fontSize['3xs']}>Option</text>
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
          <div style={{ textAlign: 'center' }}>2. Selected Pill</div>
          <div style={{ textAlign: 'right' }}>3. Option</div>
        </div>
      </Section>

      {/* 3. Variants */}
      <Section title="Variants">
        <Subsection title="Default">
          <PreviewBox>
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.primitive[6], width: '100%', maxWidth: 360 }}>
              <DefaultDemo />
            </div>
          </PreviewBox>
        </Subsection>

        <Subsection title="Full Width">
          <PreviewBox>
            <div style={{ width: '100%', maxWidth: 360 }}>
              <FullWidthDemo />
            </div>
          </PreviewBox>
        </Subsection>

        <Subsection title="Size">
          <PreviewBox>
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.primitive[6], alignItems: 'flex-start', width: '100%', maxWidth: 360 }}>
              <div>
                <div style={{ fontSize: typography.fontSize.compact, color: 'var(--text-secondary)', marginBottom: spacing.primitive[2] }}>Small</div>
                <SizeDemo size="small" />
              </div>
              <div>
                <div style={{ fontSize: typography.fontSize.compact, color: 'var(--text-secondary)', marginBottom: spacing.primitive[2] }}>Medium (default)</div>
                <SizeDemo size="medium" />
              </div>
              <div>
                <div style={{ fontSize: typography.fontSize.compact, color: 'var(--text-secondary)', marginBottom: spacing.primitive[2] }}>Large</div>
                <SizeDemo size="large" />
              </div>
            </div>
          </PreviewBox>
        </Subsection>
      </Section>

      {/* 4. States */}
      <Section title="States">
        <p style={{ fontSize: typography.fontSize.sm, color: 'var(--text-secondary)', marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          SegmentedControl의 다양한 상태를 확인할 수 있습니다.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: spacing.primitive[4],
          padding: spacing.primitive[6],
          backgroundColor: 'var(--surface-base-default)',
          borderRadius: radius.primitive.md,
        }}>
          <StatePreview label="2 Options" sublabel="최소 옵션 수">
            <SegmentedControl
              options={[{ value: 'on', label: 'On' }, { value: 'off', label: 'Off' }]}
              value="on"
              onChange={() => {}}
            />
          </StatePreview>
          <StatePreview label="3 Options" sublabel="일반적인 사용">
            <SegmentedControl
              options={VIEW_OPTIONS}
              value="list"
              onChange={() => {}}
            />
          </StatePreview>
          <StatePreview label="4 Options" sublabel="최대 권장 옵션 수">
            <SegmentedControl
              options={[
                { value: 'day', label: 'Day' },
                { value: 'week', label: 'Week' },
                { value: 'month', label: 'Month' },
                { value: 'year', label: 'Year' },
              ]}
              value="day"
              onChange={() => {}}
            />
          </StatePreview>
          <StatePreview label="Disabled" sublabel="비활성 상태">
            <SegmentedControl
              options={VIEW_OPTIONS}
              value="list"
              onChange={() => {}}
              disabled
            />
          </StatePreview>
        </div>

        <Subsection title="Interaction States">
          <p style={{ fontSize: typography.fontSize.sm, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: spacing.primitive[4] }}>
            선택 시 흰색 필 배경이 300ms ease 애니메이션으로 이동합니다.
            포커스된 항목은 키보드 방향키로 탐색할 수 있습니다.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: spacing.primitive[4],
            padding: spacing.primitive[6],
            backgroundColor: 'var(--surface-base-default)',
            borderRadius: radius.primitive.md,
          }}>
            <InteractionStateCard label="Unselected" sublabel="기본 상태" isSelected={false} />
            <InteractionStateCard label="Selected" sublabel="선택됨" isSelected />
          </div>
        </Subsection>
      </Section>

      {/* 5. Usage Guidelines */}
      <Section title="Usage Guidelines">
        <p style={{ fontSize: typography.fontSize.sm, color: 'var(--text-secondary)', marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          SegmentedControl은 <strong style={{ color: 'var(--text-primary)' }}>상호 배타적 선택</strong> 패턴에 사용합니다.
          복수 선택이나 많은 옵션에는 Chip 또는 Tab을 사용하세요.
        </p>

        <Subsection title="Best Practices">
          <div style={{ display: 'grid', gap: spacing.primitive[5] }}>
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.primitive[4] }}>
                <DoCard>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.primitive[4] }}>
                    <p style={{ fontSize: typography.fontSize.compact, color: 'var(--text-secondary)', margin: 0 }}>뷰 전환 (2~4개 옵션)</p>
                    <SmallDemo options={[{ value: 'all', label: '전체' }, { value: 'active', label: '활성' }, { value: 'done', label: '완료' }]} />
                  </div>
                </DoCard>
                <DontCard>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.primitive[4] }}>
                    <p style={{ fontSize: typography.fontSize.compact, color: 'var(--text-secondary)', margin: 0 }}>5개 이상 옵션</p>
                    <SmallDemo options={[
                      { value: 'a', label: 'Mon' },
                      { value: 'b', label: 'Tue' },
                      { value: 'c', label: 'Wed' },
                      { value: 'd', label: 'Thu' },
                      { value: 'e', label: 'Fri' },
                    ]} />
                  </div>
                </DontCard>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: 'var(--content-success-default)', margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> 2~4개의 배타적 옵션에 사용합니다
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: 'var(--content-error-default)', margin: 0, fontStyle: 'italic' }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Don&apos;t</span> 5개 초과 시 Tab 또는 Chip을 사용합니다
                </p>
              </div>
            </div>
          </div>
        </Subsection>

        <Subsection title="SegmentedControl vs Chip vs Tab">
          <div style={{ overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: typography.fontSize.compact }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--surface-base-alternative)' }}>
                  <th style={thStyle}>Component</th>
                  <th style={thStyle}>Selection</th>
                  <th style={thStyle}>Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr style={trBorder}>
                  <td style={{ ...tdStyle, fontWeight: typography.fontWeight.medium }}>SegmentedControl</td>
                  <td style={tdStyle}>단일 선택</td>
                  <td style={{ ...tdStyle, color: 'var(--text-secondary)' }}>뷰 전환, 모드 전환 (2~4옵션)</td>
                </tr>
                <tr style={trBorder}>
                  <td style={{ ...tdStyle, fontWeight: typography.fontWeight.medium }}>Chip</td>
                  <td style={tdStyle}>단일 or 다중</td>
                  <td style={{ ...tdStyle, color: 'var(--text-secondary)' }}>필터, 태그 (스크롤 가능)</td>
                </tr>
                <tr>
                  <td style={{ ...tdStyle, fontWeight: typography.fontWeight.medium }}>Tab</td>
                  <td style={tdStyle}>단일 선택</td>
                  <td style={{ ...tdStyle, color: 'var(--text-secondary)' }}>페이지 레벨 네비게이션 (많은 옵션)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>
      </Section>

      {/* 6. Design Tokens */}
      <Section title="Design Tokens">
        <p style={{ fontSize: typography.fontSize.sm, color: 'var(--text-secondary)', marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          SegmentedControl 컴포넌트에 적용된 Foundation 기반 디자인 토큰입니다.
        </p>

        <Subsection title="Container & Pill 토큰">
          <div style={{ overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: typography.fontSize.compact }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--surface-base-alternative)' }}>
                  <th style={thStyle}>Element</th>
                  <th style={thStyle}>Token</th>
                  <th style={thStyle}>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr style={trBorder}>
                  <td style={tdStyle}>Container BG</td>
                  <td style={tdStyle}><InlineCode>surface.base.alternative</InlineCode></td>
                  <td style={tdMono}>var(--surface-base-alternative)</td>
                </tr>
                <tr style={trBorder}>
                  <td style={tdStyle}>Container Radius</td>
                  <td style={tdStyle}><InlineCode>radius.component.segmentedControl.container</InlineCode></td>
                  <td style={tdMono}>8px</td>
                </tr>
                <tr style={trBorder}>
                  <td style={tdStyle}>Container Height</td>
                  <td style={tdStyle}><InlineCode>spacing.component.segmentedControl.height</InlineCode></td>
                  <td style={tdMono}>sm: 32px / md: 36px / lg: 42px</td>
                </tr>
                <tr style={trBorder}>
                  <td style={tdStyle}>Container Padding</td>
                  <td style={tdStyle}><InlineCode>spacing.component.segmentedControl.containerPadding</InlineCode></td>
                  <td style={tdMono}>3px</td>
                </tr>
                <tr style={trBorder}>
                  <td style={tdStyle}>Pill BG</td>
                  <td style={tdStyle}><InlineCode>surface.base.default</InlineCode></td>
                  <td style={tdMono}>var(--surface-base-default)</td>
                </tr>
                <tr style={trBorder}>
                  <td style={tdStyle}>Pill Radius</td>
                  <td style={tdStyle}><InlineCode>radius.component.segmentedControl.segment</InlineCode></td>
                  <td style={tdMono}>6px</td>
                </tr>
                <tr>
                  <td style={tdStyle}>Pill Shadow</td>
                  <td style={tdStyle}><InlineCode>cssVarShadow.primitive.xs</InlineCode></td>
                  <td style={tdMono}>var(--shadow-primitive-xs)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Color 토큰">
          <div style={{ overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: typography.fontSize.compact }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--surface-base-alternative)' }}>
                  <th style={thStyle}>State</th>
                  <th style={thStyle}>Token</th>
                  <th style={thStyle}>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr style={trBorder}>
                  <td style={tdStyle}>Selected Text</td>
                  <td style={tdStyle}><InlineCode>content.base.default</InlineCode></td>
                  <td style={tdMono}>var(--content-base-default)</td>
                </tr>
                <tr>
                  <td style={tdStyle}>Unselected Text</td>
                  <td style={tdStyle}><InlineCode>content.base.secondary</InlineCode></td>
                  <td style={tdMono}>var(--content-base-secondary)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Motion 토큰">
          <div style={{ overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: typography.fontSize.compact }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--surface-base-alternative)' }}>
                  <th style={thStyle}>Property</th>
                  <th style={thStyle}>Token</th>
                  <th style={thStyle}>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr style={trBorder}>
                  <td style={tdStyle}>Pill Transition</td>
                  <td style={tdStyle}><InlineCode>duration.normal</InlineCode> + <InlineCode>easing.easeOut</InlineCode></td>
                  <td style={tdMono}>300ms ease-out</td>
                </tr>
                <tr>
                  <td style={tdStyle}>Text Transition</td>
                  <td style={tdStyle}><InlineCode>duration.fast</InlineCode> + <InlineCode>easing.easeOut</InlineCode></td>
                  <td style={tdMono}>150ms ease-out</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>
      </Section>

      {/* 7. Accessibility */}
      <Section title="Accessibility">
        <p style={{ fontSize: typography.fontSize.sm, color: 'var(--text-secondary)', marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          SegmentedControl은 <InlineCode>role=&quot;tablist&quot;</InlineCode> / <InlineCode>role=&quot;tab&quot;</InlineCode> 패턴으로
          마크업되어 스크린 리더와 키보드 접근성을 지원합니다.
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
              <tr>
                <td style={{ ...tdStyle, borderBottom: '1px solid var(--divider)' }}><InlineCode>role=&quot;tablist&quot;</InlineCode></td>
                <td style={{ ...tdMono, borderBottom: '1px solid var(--divider)' }}>컨테이너가 탭 목록임을 보조 기술에 전달</td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, borderBottom: '1px solid var(--divider)' }}><InlineCode>role=&quot;tab&quot;</InlineCode></td>
                <td style={{ ...tdMono, borderBottom: '1px solid var(--divider)' }}>각 옵션 버튼이 탭임을 보조 기술에 전달</td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, borderBottom: '1px solid var(--divider)' }}><InlineCode>aria-selected</InlineCode></td>
                <td style={{ ...tdMono, borderBottom: '1px solid var(--divider)' }}>선택된 탭을 스크린 리더에 전달 (true/false)</td>
              </tr>
              <tr>
                <td style={tdStyle}><InlineCode>tabIndex</InlineCode></td>
                <td style={tdMono}>활성 탭만 tabIndex=0, 나머지는 -1 (roving tabindex 패턴)</td>
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
                  <td style={tdMono}>SegmentedControl로 포커스 이동</td>
                </tr>
                <tr style={trBorder}>
                  <td style={tdStyle}><kbd style={kbdStyle}>→</kbd> / <kbd style={kbdStyle}>↓</kbd></td>
                  <td style={tdMono}>다음 옵션 선택</td>
                </tr>
                <tr>
                  <td style={tdStyle}><kbd style={kbdStyle}>←</kbd> / <kbd style={kbdStyle}>↑</kbd></td>
                  <td style={tdMono}>이전 옵션 선택</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Design Principles">
          <div style={{ display: 'grid', gap: spacing.primitive[4] }}>
            <PrincipleCard
              number={1}
              title="role=tablist / role=tab"
              desc="컨테이너는 role='tablist', 각 옵션은 role='tab'으로 마크업됩니다. 스크린 리더가 선택된 상태를 aria-selected로 인식합니다."
            />
            <PrincipleCard
              number={2}
              title="키보드 방향키 지원"
              desc="좌/우 방향키로 옵션을 순환합니다. 활성 탭만 tabIndex=0을 가지며 나머지는 tabIndex=-1입니다 (roving tabindex 패턴)."
            />
          </div>
        </Subsection>
      </Section>

      {/* 8. Related Components */}
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
                <td style={{ ...tdStyle, fontWeight: typography.fontWeight.medium }}>Tab</td>
                <td style={{ ...tdStyle, color: 'var(--text-secondary)' }}>페이지 레벨 네비게이션</td>
                <td style={{ ...tdStyle, color: 'var(--text-secondary)' }}>SegmentedControl은 2~4옵션, Tab은 더 많은 항목 지원</td>
              </tr>
              <tr style={trBorder}>
                <td style={{ ...tdStyle, fontWeight: typography.fontWeight.medium }}>Chip</td>
                <td style={{ ...tdStyle, color: 'var(--text-secondary)' }}>필터, 다중 선택</td>
                <td style={{ ...tdStyle, color: 'var(--text-secondary)' }}>Chip은 다중 선택 가능, 스크롤 지원</td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, fontWeight: typography.fontWeight.medium }}>Radio</td>
                <td style={{ ...tdStyle, color: 'var(--text-secondary)' }}>폼 내 단일 선택</td>
                <td style={{ ...tdStyle, color: 'var(--text-secondary)' }}>Radio는 폼 제출 값, SegmentedControl은 즉시 반영</td>
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
        <div style={{ padding: spacing.primitive[4], backgroundColor: 'var(--surface-base-alternative)', borderRadius: radius.primitive.md, marginBottom: spacing.primitive[6], display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: 'var(--text-primary)', margin: 0 }}>SegmentedControl Component</p>
            <p style={{ fontSize: typography.fontSize.compact, color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>실제 컴포넌트 소스 코드를 GitHub에서 확인하세요.</p>
          </div>
          <a
            href="https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system/src/components/SegmentedControl/SegmentedControl.tsx"
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
        <CodeBlock code={`import { SegmentedControl } from '@baerae-zkap/design-system';
import type { SegmentedControlOption } from '@baerae-zkap/design-system';`} />
      </Section>

      {/* 3. Basic Usage */}
      <Section title="Basic Usage">
        <PreviewBox>
          <BasicDemo />
        </PreviewBox>
        <CodeBlock code={`const [view, setView] = useState('list');

const options: SegmentedControlOption[] = [
  { value: 'list', label: 'List' },
  { value: 'grid', label: 'Grid' },
  { value: 'map', label: 'Map' },
];

<SegmentedControl
  options={options}
  value={view}
  onChange={setView}
/>`} />
      </Section>

      {/* 4. Full Width */}
      <Section title="Full Width">
        <PreviewBox>
          <div style={{ width: '100%', maxWidth: 400 }}>
            <FullWidthDemo />
          </div>
        </PreviewBox>
        <CodeBlock code={`<SegmentedControl
  options={options}
  value={view}
  onChange={setView}
  fullWidth
/>`} />
      </Section>

      {/* 5. API Reference */}
      <Section title="API Reference">
        <PropsTable
          props={[
            { name: 'options', type: 'SegmentedControlOption[]', required: true, description: '옵션 목록 (value, label)' },
            { name: 'value', type: 'string', required: true, description: '선택된 값 (제어 모드)' },
            { name: 'onChange', type: '(value: string) => void', required: true, description: '선택 변경 콜백' },
            { name: 'size', type: "'small' | 'medium' | 'large'", required: false, defaultVal: "'medium'", description: '컴포넌트 크기' },
            { name: 'fullWidth', type: 'boolean', required: false, defaultVal: 'false', description: '컨테이너 전체 너비로 확장' },
            { name: 'disabled', type: 'boolean', required: false, defaultVal: 'false', description: '비활성 상태' },
            { name: 'style', type: 'CSSProperties', required: false, description: '인라인 스타일 오버라이드' },
          ]}
        />

        <div style={{ marginTop: spacing.primitive[6] }}>
          <p style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: 'var(--text-primary)', marginBottom: spacing.primitive[3] }}>SegmentedControlOption</p>
          <PropsTable
            props={[
              { name: 'value', type: 'string', required: true, description: '옵션 고유 값' },
              { name: 'label', type: 'string', required: true, description: '표시 텍스트' },
            ]}
          />
        </div>
      </Section>
    </div>
  );
}

// ─── Demo Components ──────────────────────────────────────────────────

function BasicDemo() {
  const [view, setView] = useState('list');
  return <SegmentedControl options={VIEW_OPTIONS} value={view} onChange={setView} />;
}

function DefaultDemo() {
  const [view, setView] = useState('list');
  return <SegmentedControl options={VIEW_OPTIONS} value={view} onChange={setView} />;
}

function FullWidthDemo() {
  const [view, setView] = useState('list');
  return <SegmentedControl options={VIEW_OPTIONS} value={view} onChange={setView} fullWidth />;
}

function SmallDemo({ options }: { options: SegmentedControlOption[] }) {
  const [value, setValue] = useState(options[0]?.value ?? '');
  return <SegmentedControl options={options} value={value} onChange={setValue} />;
}

function SizeDemo({ size }: { size: 'small' | 'medium' | 'large' }) {
  const [view, setView] = useState('list');
  return <SegmentedControl options={VIEW_OPTIONS} value={view} onChange={setView} size={size} />;
}

// ─── UI Helpers ───────────────────────────────────────────────────────

function StatePreview({ label, sublabel, children }: { label: string; sublabel: string; children: React.ReactNode }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: spacing.primitive[3],
      padding: spacing.primitive[4],
    }}>
      <div style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: spacing.primitive[12],
      }}>
        {children}
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.medium, color: 'var(--text-primary)' }}>{label}</div>
        <div style={{ fontSize: typography.fontSize.xs, color: 'var(--text-tertiary)', marginTop: 2 }}>{sublabel}</div>
      </div>
    </div>
  );
}

function InteractionStateCard({ label, sublabel, isSelected }: {
  label: string;
  sublabel: string;
  isSelected: boolean;
}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: spacing.primitive[3],
      padding: spacing.primitive[4],
    }}>
      {/* Mini segment illustration */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        backgroundColor: 'var(--surface-base-alternative)',
        borderRadius: 8,
        padding: 3,
        gap: 0,
      }}>
        <div style={{
          height: 28,
          padding: '0 12px',
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isSelected ? 'var(--surface-base-default)' : 'transparent',
          boxShadow: isSelected ? '0 1px 3px var(--shadow-primitive-xs)' : 'none',
          fontSize: typography.fontSize.compact,
          fontWeight: isSelected ? typography.fontWeight.semibold : typography.fontWeight.regular,
          color: isSelected ? 'var(--content-base-default)' : 'var(--content-base-secondary)',
          whiteSpace: 'nowrap' as const,
        }}>
          Option
        </div>
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
