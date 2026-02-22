"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform, highlightCode } from "@/components/PlatformTabs";
import { Badge, typography, spacing, radius } from '@baerae-zkap/design-system';
import type { BadgeColor, BadgeVariant, BadgeSize } from '@baerae-zkap/design-system';
import { Section, Subsection, InlineCode } from "@/components/docs/Section";
import { PropsTable } from "@/components/docs/PropsTable";
import { DoCard, DontCard, PrincipleCard } from "@/components/docs/Cards";
import { RadioGroup, CopyButton } from "@/components/docs/Playground";

const COLORS: BadgeColor[] = ['neutral', 'primary', 'success', 'error', 'warning', 'info'];
const VARIANTS: BadgeVariant[] = ['filled', 'weak', 'outline'];
const SIZES: BadgeSize[] = ['sm', 'md'];

export default function BadgePage() {
  return (
    <div style={{ maxWidth: 840 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Contents" },
          { label: "Badge" },
        ]}
      />

      <h1 style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold, marginBottom: spacing.primitive[2], color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
        Badge
      </h1>
      <p style={{ fontSize: typography.fontSize.md, color: "var(--text-secondary)", marginBottom: spacing.primitive[8], lineHeight: 1.7 }}>
        인라인 레이블 뱃지. 상태, 카테고리, 속성을 텍스트 흐름 내에 표시합니다.
      </p>

      <BadgePlayground />

      <PlatformTabs>
        {(platform) => <PlatformContent platform={platform} />}
      </PlatformTabs>
    </div>
  );
}

// ─── Playground ──────────────────────────────────────────────────────

function BadgePlayground() {
  const [color, setColor] = useState<BadgeColor>('primary');
  const [variant, setVariant] = useState<BadgeVariant>('filled');
  const [size, setSize] = useState<BadgeSize>('md');

  const generateCode = () => {
    const props: string[] = [];
    if (color !== 'neutral') props.push(`color="${color}"`);
    if (variant !== 'filled') props.push(`variant="${variant}"`);
    if (size !== 'md') props.push(`size="${size}"`);
    const propsStr = props.length > 0 ? `\n  ${props.join('\n  ')}\n` : ' ';
    const label = color === 'primary' ? 'NEW' : color === 'success' ? 'Active' : color === 'error' ? 'Error' : color === 'warning' ? 'Warning' : color === 'info' ? 'Info' : 'Label';
    return `<Badge${propsStr.length > 1 ? propsStr : ' '}>${label}</Badge>`;
  };

  const label = color === 'primary' ? 'NEW' : color === 'success' ? 'Active' : color === 'error' ? 'Error' : color === 'warning' ? 'Warning' : color === 'info' ? 'Info' : 'Label';

  return (
    <div style={{ marginBottom: spacing.primitive[8] }}>
      <div style={{ borderRadius: radius.primitive.xl, overflow: 'hidden', backgroundColor: 'var(--surface-base-alternative)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', minHeight: 400 }}>
          <div style={{ padding: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--surface-base-alternative)' }}>
            <Badge color={color} variant={variant} size={size}>{label}</Badge>
          </div>
          <div style={{ backgroundColor: 'var(--surface-base-alternative)', display: 'flex', flexDirection: 'column', padding: spacing.primitive[4], height: '100%', boxSizing: 'border-box' }}>
            <div style={{ flex: 1, minHeight: 0, padding: spacing.primitive[5], overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: spacing.primitive[5], backgroundColor: 'var(--surface-base-default)', borderRadius: radius.primitive.lg }}>
              <RadioGroup
                label="Color"
                options={COLORS.map(c => ({ value: c, label: c.charAt(0).toUpperCase() + c.slice(1) }))}
                value={color}
                onChange={(v) => setColor(v as BadgeColor)}
              />
              <RadioGroup
                label="Variant"
                options={VARIANTS.map(v => ({ value: v, label: v.charAt(0).toUpperCase() + v.slice(1) }))}
                value={variant}
                onChange={(v) => setVariant(v as BadgeVariant)}
              />
              <RadioGroup
                label="Size"
                options={SIZES.map(s => ({ value: s, label: s.toUpperCase() }))}
                value={size}
                onChange={(v) => setSize(v as BadgeSize)}
              />
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: spacing.primitive[4], borderRadius: radius.primitive.md, overflow: 'hidden', border: '1px solid var(--divider)' }}>
        <div style={{ padding: '10px 16px', backgroundColor: 'var(--docs-code-surface)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.medium, color: 'var(--docs-code-active-text)' }}>Web</span>
          <CopyButton text={generateCode()} />
        </div>
        <pre style={{ margin: 0, padding: spacing.primitive[4], fontSize: typography.fontSize.compact, lineHeight: 1.7, color: 'var(--docs-code-text)', backgroundColor: 'var(--docs-code-surface)', fontFamily: "'SF Mono', 'Fira Code', monospace", overflow: 'auto' }}>
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
          <InlineCode>Badge</InlineCode>는 텍스트 흐름 내에 인라인으로 삽입되는 레이블 뱃지입니다.
          상태(NEW, SALE), 카테고리, 속성 등을 간결하게 표시할 때 사용합니다.
          알림 카운터 오버레이에는 <InlineCode>PushBadge</InlineCode>를,
          독립된 콘텐츠 태깅에는 <InlineCode>ContentBadge</InlineCode>를 사용하세요.
        </p>
      </Section>

      {/* 2. Anatomy */}
      <Section title="Anatomy">
        <div style={{ backgroundColor: 'var(--surface-base-alternative)', borderRadius: radius.primitive.md, padding: `${spacing.primitive[12]}px ${spacing.primitive[10]}px`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="340" height="90" viewBox="0 0 340 90">
            {/* Badge shape */}
            <rect x="100" y="28" width="60" height="24" rx="12" fill="var(--surface-brand-default)" />
            <text x="130" y="44" textAnchor="middle" fill="white" fontSize={typography.fontSize.xs} fontWeight={typography.fontWeight.medium}>NEW</text>
            {/* Leading icon indicator */}
            <rect x="104" y="34" width="12" height="12" rx="6" fill="white" fillOpacity={0.3} />

            {/* Arrow to container */}
            <line x1="70" y1="40" x2="99" y2="40" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="99" cy="40" r="3" fill="var(--content-base-default)" />
            <circle cx="55" cy="40" r="14" fill="var(--content-base-default)" />
            <text x="55" y="45" textAnchor="middle" fill="white" fontSize={typography.fontSize.xs} fontWeight={typography.fontWeight.semibold}>1</text>

            {/* Arrow to icon */}
            <line x1="110" y1="20" x2="110" y2="33" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="110" cy="33" r="3" fill="var(--content-base-default)" />
            <circle cx="110" cy="10" r="10" fill="var(--content-base-default)" />
            <text x="110" y="15" textAnchor="middle" fill="white" fontSize={typography.fontSize.xs} fontWeight={typography.fontWeight.semibold}>2</text>

            {/* Arrow to label */}
            <line x1="148" y1="20" x2="140" y2="33" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="140" cy="33" r="3" fill="var(--content-base-default)" />
            <circle cx="155" cy="10" r="10" fill="var(--content-base-default)" />
            <text x="155" y="15" textAnchor="middle" fill="white" fontSize={typography.fontSize.xs} fontWeight={typography.fontWeight.semibold}>3</text>

            {/* Labels */}
            <text x="55" y="68" textAnchor="middle" fill="var(--content-base-secondary)" fontSize={typography.fontSize.xs}>Container</text>
            <text x="110" y="68" textAnchor="middle" fill="var(--content-base-secondary)" fontSize={typography.fontSize.xs}>Icon (opt)</text>
            <text x="155" y="68" textAnchor="middle" fill="var(--content-base-secondary)" fontSize={typography.fontSize.xs}>Label</text>
          </svg>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: spacing.primitive[4], marginTop: spacing.primitive[5], fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium, color: 'var(--text-primary)' }}>
          <div>1. Container</div>
          <div style={{ textAlign: 'center' }}>2. Leading Icon (optional)</div>
          <div style={{ textAlign: 'right' }}>3. Label</div>
        </div>
      </Section>

      {/* 3. Variants */}
      <Section title="Variants">
        <Subsection title="Color × Variant">
          <p style={{ fontSize: typography.fontSize.sm, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: spacing.primitive[4] }}>
            6가지 색상과 3가지 스타일 변형의 조합입니다.
          </p>
          <div style={{ backgroundColor: 'var(--surface-base-alternative)', borderRadius: radius.primitive.md, padding: spacing.primitive[6], overflow: 'auto' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr>
                  <th style={{ ...thStyle, width: 100 }}>Color</th>
                  {VARIANTS.map(v => <th key={v} style={{ ...thStyle, textAlign: 'center' }}>{v}</th>)}
                </tr>
              </thead>
              <tbody>
                {COLORS.map(c => (
                  <tr key={c} style={{ borderBottom: '1px solid var(--divider)' }}>
                    <td style={{ ...tdStyle, fontWeight: typography.fontWeight.medium, color: 'var(--text-primary)' }}>{c}</td>
                    {VARIANTS.map(v => (
                      <td key={v} style={{ ...tdStyle, textAlign: 'center' }}>
                        <Badge color={c} variant={v}>{c === 'primary' ? 'NEW' : c === 'success' ? 'Active' : c === 'error' ? 'Error' : c === 'warning' ? 'Sale' : c === 'info' ? 'Info' : 'Label'}</Badge>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Sizes">
          <PreviewBox>
            <div style={{ display: 'flex', gap: spacing.primitive[4], alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <Badge color="primary" size="sm">SM</Badge>
                <p style={{ fontSize: typography.fontSize['2xs'], color: 'var(--content-base-secondary)', marginTop: spacing.primitive[2] }}>height 20px</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Badge color="primary" size="md">MD</Badge>
                <p style={{ fontSize: typography.fontSize['2xs'], color: 'var(--content-base-secondary)', marginTop: spacing.primitive[2] }}>height 24px</p>
              </div>
            </div>
          </PreviewBox>
        </Subsection>
      </Section>

      {/* 4. Usage Guidelines */}
      <Section title="Usage Guidelines">
        <p style={{ fontSize: typography.fontSize.sm, color: 'var(--text-secondary)', marginBottom: spacing.primitive[4], lineHeight: 1.7 }}>
          Badge, ContentBadge, PushBadge는 목적이 다릅니다. 상황에 맞는 컴포넌트를 선택하세요.
        </p>

        <Subsection title="Best Practices">
          <div style={{ display: 'grid', gap: spacing.primitive[5] }}>
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.primitive[4] }}>
                <DoCard>
                  <div style={{ display: 'flex', gap: spacing.primitive[2], alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: typography.fontSize.sm, color: 'var(--text-primary)' }}>한정 특가</span>
                    <Badge color="error">SALE</Badge>
                  </div>
                </DoCard>
                <DontCard>
                  <div style={{ display: 'flex', gap: spacing.primitive[2], alignItems: 'center', flexWrap: 'wrap' }}>
                    <Badge color="primary">신상품</Badge>
                    <Badge color="success">베스트</Badge>
                    <Badge color="error">한정</Badge>
                    <Badge color="warning">특가</Badge>
                  </div>
                </DontCard>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: 'var(--content-success-default)', margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> 한 항목에 하나의 Badge로 핵심 속성만 강조합니다
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: 'var(--content-error-default)', margin: 0, fontStyle: 'italic' }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Don't</span> 여러 Badge를 한꺼번에 나열하면 정보 위계가 무너집니다
                </p>
              </div>
            </div>

            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.primitive[4] }}>
                <DoCard>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.primitive[2] }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: spacing.primitive[2] }}>
                      <span style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium, color: 'var(--text-primary)' }}>프리미엄 플랜</span>
                      <Badge color="primary" variant="weak">추천</Badge>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: spacing.primitive[2] }}>
                      <span style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium, color: 'var(--text-primary)' }}>무료 플랜</span>
                    </div>
                  </div>
                </DoCard>
                <DontCard>
                  <div style={{ display: 'flex', alignItems: 'center', gap: spacing.primitive[2] }}>
                    <Badge color="neutral" size="sm">항목 1</Badge>
                    <Badge color="neutral" size="sm">항목 2</Badge>
                    <Badge color="neutral" size="sm">항목 3</Badge>
                  </div>
                </DontCard>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: 'var(--content-success-default)', margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> 특정 항목의 차별화 속성에만 사용합니다
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: 'var(--content-error-default)', margin: 0, fontStyle: 'italic' }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Don't</span> 목록 항목 레이블 대용으로 남용하지 않습니다
                </p>
              </div>
            </div>
          </div>
        </Subsection>

        <Subsection title="Badge vs ContentBadge vs PushBadge">
          <div style={{ overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: typography.fontSize.compact }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--surface-base-alternative)' }}>
                  <th style={thStyle}>Component</th>
                  <th style={thStyle}>Shape</th>
                  <th style={thStyle}>Use Case</th>
                  <th style={thStyle}>Example</th>
                </tr>
              </thead>
              <tbody>
                <tr style={trBorder}>
                  <td style={{ ...tdStyle, fontWeight: typography.fontWeight.medium }}><InlineCode>Badge</InlineCode></td>
                  <td style={tdStyle}>Pill (full round)</td>
                  <td style={{ ...tdStyle, color: 'var(--text-secondary)' }}>인라인 레이블, 상태 표시</td>
                  <td style={tdStyle}><Badge color="primary" size="sm">NEW</Badge></td>
                </tr>
                <tr style={trBorder}>
                  <td style={{ ...tdStyle, fontWeight: typography.fontWeight.medium }}><InlineCode>ContentBadge</InlineCode></td>
                  <td style={tdStyle}>Rect (4px radius)</td>
                  <td style={{ ...tdStyle, color: 'var(--text-secondary)' }}>콘텐츠 카드 태깅, 카테고리</td>
                  <td style={tdStyle}><span style={{ fontSize: typography.fontSize.xs, color: 'var(--text-secondary)' }}>카드 상단 태그</span></td>
                </tr>
                <tr>
                  <td style={{ ...tdStyle, fontWeight: typography.fontWeight.medium }}><InlineCode>PushBadge</InlineCode></td>
                  <td style={tdStyle}>Circle overlay</td>
                  <td style={{ ...tdStyle, color: 'var(--text-secondary)' }}>알림 카운터 오버레이</td>
                  <td style={tdStyle}><span style={{ fontSize: typography.fontSize.xs, color: 'var(--text-secondary)' }}>아이콘 위 숫자</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>
      </Section>

      {/* 5. Design Tokens */}
      <Section title="Design Tokens">
        <Subsection title="Size Tokens">
          <div style={{ overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: typography.fontSize.compact }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--surface-base-alternative)' }}>
                  <th style={thStyle}>Property</th>
                  <th style={thStyle}>SM</th>
                  <th style={thStyle}>MD</th>
                </tr>
              </thead>
              <tbody>
                <tr style={trBorder}><td style={tdStyle}>Height</td><td style={tdMono}>20px</td><td style={tdMono}>24px</td></tr>
                <tr style={trBorder}><td style={tdStyle}>Padding X</td><td style={tdMono}>6px</td><td style={tdMono}>8px</td></tr>
                <tr style={trBorder}><td style={tdStyle}>Font Size</td><td style={tdMono}>12px (xs)</td><td style={tdMono}>12px (xs)</td></tr>
                <tr style={trBorder}><td style={tdStyle}>Font Weight</td><td style={tdMono}>medium (500)</td><td style={tdMono}>medium (500)</td></tr>
                <tr><td style={tdStyle}>Border Radius</td><td style={tdMono} colSpan={2}>9999px (pill)</td></tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection title="Color Tokens (Filled)">
          <div style={{ overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: typography.fontSize.compact }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--surface-base-alternative)' }}>
                  <th style={thStyle}>Color</th>
                  <th style={thStyle}>Background</th>
                  <th style={thStyle}>Text</th>
                </tr>
              </thead>
              <tbody>
                <tr style={trBorder}><td style={tdStyle}>neutral</td><td style={tdMono}>fill.normal</td><td style={tdMono}>content.base.secondary</td></tr>
                <tr style={trBorder}><td style={tdStyle}>primary</td><td style={tdMono}>surface.brand.default</td><td style={tdMono}>content.base.onColor</td></tr>
                <tr style={trBorder}><td style={tdStyle}>success</td><td style={tdMono}>surface.success.default</td><td style={tdMono}>content.base.onColor</td></tr>
                <tr style={trBorder}><td style={tdStyle}>error</td><td style={tdMono}>surface.error.default</td><td style={tdMono}>content.base.onColor</td></tr>
                <tr style={trBorder}><td style={tdStyle}>warning</td><td style={tdMono}>surface.warning.default</td><td style={tdMono}>content.base.onColor</td></tr>
                <tr><td style={tdStyle}>info</td><td style={tdMono}>surface.info.default</td><td style={tdMono}>content.base.onColor</td></tr>
              </tbody>
            </table>
          </div>
        </Subsection>
      </Section>

      {/* 6. Accessibility */}
      <Section title="Accessibility">
        <div style={{ display: 'grid', gap: spacing.primitive[4] }}>
          <PrincipleCard
            number={1}
            title="색상만으로 의미 전달 금지"
            desc="색상 외에 텍스트 레이블을 반드시 포함하세요. 색맹 사용자나 스크린 리더 사용자가 색상 단독으로 상태를 인식하기 어렵습니다."
          />
          <PrincipleCard
            number={2}
            title="짧은 레이블 사용"
            desc="Badge는 1~4자 내외의 짧은 텍스트에 최적화되어 있습니다. 긴 문장은 Tooltip이나 본문으로 대체하세요."
          />
        </div>
      </Section>

      {/* 7. Related Components */}
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
                <td style={{ ...tdStyle, fontWeight: typography.fontWeight.medium }}>ContentBadge</td>
                <td style={{ ...tdStyle, color: 'var(--text-secondary)' }}>콘텐츠 카드 태그</td>
                <td style={{ ...tdStyle, color: 'var(--text-secondary)' }}>직사각형(4px radius), 3가지 크기 지원</td>
              </tr>
              <tr style={trBorder}>
                <td style={{ ...tdStyle, fontWeight: typography.fontWeight.medium }}>PushBadge</td>
                <td style={{ ...tdStyle, color: 'var(--text-secondary)' }}>알림 카운터</td>
                <td style={{ ...tdStyle, color: 'var(--text-secondary)' }}>다른 요소 위에 오버레이되는 원형 숫자 뱃지</td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, fontWeight: typography.fontWeight.medium }}>Chip</td>
                <td style={{ ...tdStyle, color: 'var(--text-secondary)' }}>필터, 태그 선택</td>
                <td style={{ ...tdStyle, color: 'var(--text-secondary)' }}>인터랙티브(클릭/선택 가능), Badge는 비인터랙티브</td>
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
            <p style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: 'var(--text-primary)', margin: 0 }}>Badge Component</p>
            <p style={{ fontSize: typography.fontSize.compact, color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>실제 컴포넌트 소스 코드를 GitHub에서 확인하세요.</p>
          </div>
          <a
            href="https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system/src/components/Badge/Badge.tsx"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: spacing.primitive[1], padding: `${spacing.primitive[2]}px ${spacing.primitive[4]}px`, fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.medium, color: 'white', backgroundColor: 'var(--inverse-surface-default)', borderRadius: radius.primitive.md, textDecoration: 'none' }}
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
        <CodeBlock code={`import { Badge } from '@baerae-zkap/design-system';
import type { BadgeColor, BadgeVariant, BadgeSize } from '@baerae-zkap/design-system';`} />
      </Section>

      {/* 3. Basic Usage */}
      <Section title="Basic Usage">
        <PreviewBox>
          <div style={{ display: 'flex', gap: spacing.primitive[3], flexWrap: 'wrap', alignItems: 'center' }}>
            {COLORS.map(c => (
              <Badge key={c} color={c}>{c === 'primary' ? 'NEW' : c === 'success' ? 'Active' : c === 'error' ? 'Error' : c === 'warning' ? 'Sale' : c === 'info' ? 'Info' : 'Label'}</Badge>
            ))}
          </div>
        </PreviewBox>
        <CodeBlock code={`<Badge>Label</Badge>
<Badge color="primary">NEW</Badge>
<Badge color="success">Active</Badge>
<Badge color="error">Error</Badge>
<Badge color="warning">Sale</Badge>
<Badge color="info">Info</Badge>`} />
      </Section>

      {/* 4. All Variants */}
      <Section title="All Variants">
        <PreviewBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.primitive[4] }}>
            {VARIANTS.map(v => (
              <div key={v} style={{ display: 'flex', gap: spacing.primitive[3], alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ width: 60, fontSize: typography.fontSize.xs, color: 'var(--text-secondary)', fontWeight: typography.fontWeight.medium }}>{v}</span>
                {COLORS.map(c => (
                  <Badge key={c} color={c} variant={v}>{c === 'primary' ? 'NEW' : c === 'success' ? 'Active' : c === 'neutral' ? 'Label' : c === 'error' ? 'Error' : c === 'warning' ? 'Sale' : 'Info'}</Badge>
                ))}
              </div>
            ))}
          </div>
        </PreviewBox>
        <CodeBlock code={`{/* Filled */}
<Badge color="primary" variant="filled">NEW</Badge>

{/* Weak */}
<Badge color="primary" variant="weak">NEW</Badge>

{/* Outline */}
<Badge color="primary" variant="outline">NEW</Badge>`} />
      </Section>

      {/* 5. With Icon */}
      <Section title="With Icon">
        <PreviewBox>
          <div style={{ display: 'flex', gap: spacing.primitive[3], flexWrap: 'wrap', alignItems: 'center' }}>
            <Badge color="success" leadingIcon={
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="4" fill="currentColor" />
              </svg>
            }>Online</Badge>
            <Badge color="error" variant="weak" leadingIcon={
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="4" fill="currentColor" />
              </svg>
            }>Offline</Badge>
            <Badge color="primary" variant="weak" leadingIcon={
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path d="M6 1l1.5 3 3.5.5-2.5 2.5.5 3.5L6 9l-3 1.5.5-3.5L1 4.5 4.5 4z" fill="currentColor" />
              </svg>
            }>Featured</Badge>
          </div>
        </PreviewBox>
        <CodeBlock code={`<Badge
  color="success"
  leadingIcon={<CircleIcon />}
>
  Online
</Badge>`} />
      </Section>

      {/* 6. API Reference */}
      <Section title="API Reference">
        <PropsTable
          props={[
            { name: 'children', type: 'ReactNode', required: true, description: '뱃지 레이블 텍스트' },
            { name: 'color', type: '"neutral" | "primary" | "success" | "error" | "warning" | "info"', required: false, defaultVal: '"neutral"', description: '색상 테마' },
            { name: 'variant', type: '"filled" | "weak" | "outline"', required: false, defaultVal: '"filled"', description: '스타일 변형' },
            { name: 'size', type: '"sm" | "md"', required: false, defaultVal: '"md"', description: '크기' },
            { name: 'leadingIcon', type: 'ReactNode', required: false, description: '좌측 아이콘' },
            { name: 'style', type: 'CSSProperties', required: false, description: '인라인 스타일 오버라이드' },
          ]}
        />
      </Section>
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
