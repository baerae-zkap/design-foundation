"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PlatformTabs, CodeBlock, PreviewBox, Platform, highlightCode } from "@/components/PlatformTabs";
import { Slider, typography, spacing, radius } from '@baerae-zkap/design-system';
import { Section, Subsection, InlineCode } from "@/components/docs/Section";
import { PropsTable } from "@/components/docs/PropsTable";
import { DoCard, DontCard, PrincipleCard } from "@/components/docs/Cards";
import { RadioGroup, CopyButton } from "@/components/docs/Playground";

export default function SliderPage() {
  return (
    <div style={{ maxWidth: 840 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Inputs" },
          { label: "Slider" },
        ]}
      />

      <h1 style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold, marginBottom: spacing.primitive[2], color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
        Slider
      </h1>
      <p style={{ fontSize: typography.fontSize.md, color: "var(--text-secondary)", marginBottom: spacing.primitive[8], lineHeight: 1.7 }}>
        드래그로 연속적인 범위 내의 값을 선택합니다. 볼륨, 밝기, 가격 범위 등에 적합합니다.
      </p>

      <SliderPlayground />

      <PlatformTabs>
        {(platform) => <PlatformContent platform={platform} />}
      </PlatformTabs>
    </div>
  );
}

// ─── Playground ──────────────────────────────────────────────────────

function SliderPlayground() {
  const [value, setValue] = useState(40);
  const [showValue, setShowValue] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [step, setStep] = useState<'1' | '10' | '25'>('1');

  const stepNum = step === '1' ? 1 : step === '10' ? 10 : 25;

  const generateCode = () => {
    const props: string[] = [`value={${value}}`, `onChange={setValue}`];
    if (showValue) props.push('showValue');
    if (disabled) props.push('disabled');
    if (stepNum !== 1) props.push(`step={${stepNum}}`);
    return `<Slider\n  ${props.join('\n  ')}\n/>`;
  };

  return (
    <div style={{ marginBottom: spacing.primitive[8] }}>
      <div style={{ borderRadius: radius.primitive.xl, overflow: 'hidden', border: '1px solid var(--divider)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', minHeight: 320 }}>
          {/* Preview Area */}
          <div style={{ padding: spacing.primitive[10], display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--surface-base-alternative)' }}>
            <div style={{ width: '100%', maxWidth: 320 }}>
              <Slider
                value={value}
                onChange={setValue}
                showValue={showValue}
                disabled={disabled}
                step={stepNum}
              />
            </div>
          </div>

          {/* Control Panel */}
          <div style={{ backgroundColor: 'var(--surface-base-default)', borderLeft: '1px solid var(--divider)', display: 'flex', flexDirection: 'column', padding: spacing.primitive[5], gap: spacing.primitive[6], overflowY: 'auto' }}>
              <RadioGroup
                label="Step"
                options={[
                  { value: '1', label: '1' },
                  { value: '10', label: '10' },
                  { value: '25', label: '25' },
                ]}
                value={step}
                onChange={(v) => setStep(v as '1' | '10' | '25')}
              />
              <RadioGroup
                label="Show Value"
                options={[
                  { value: 'false', label: 'Hide' },
                  { value: 'true', label: 'Show' },
                ]}
                value={showValue ? 'true' : 'false'}
                onChange={(v) => setShowValue(v === 'true')}
              />
              <RadioGroup
                label="Disabled"
                options={[
                  { value: 'false', label: 'False' },
                  { value: 'true', label: 'True' },
                ]}
                value={disabled ? 'true' : 'false'}
                onChange={(v) => setDisabled(v === 'true')}
              />
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
          <InlineCode>Slider</InlineCode>는 드래그로 연속적인 범위에서 값을 선택하는 입력 컴포넌트입니다.
          볼륨 조절, 밝기, 가격 필터 등 정확한 숫자 입력보다 상대적 위치가 중요한 경우에 사용합니다.
          정확한 숫자 입력이 필요하면 <InlineCode>TextField</InlineCode>를 사용하세요.
        </p>
      </Section>

      {/* 2. Anatomy */}
      <Section title="Anatomy">
        <div style={{ backgroundColor: 'var(--surface-base-alternative)', borderRadius: radius.primitive.md, padding: `${spacing.primitive[10]}px ${spacing.primitive[8]}px`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="400" height="80" viewBox="0 0 400 80">
            {/* Track background */}
            <rect x="40" y="36" width="240" height="4" rx="2" fill="var(--fill-base-default)" />
            {/* Filled track */}
            <rect x="40" y="36" width="140" height="4" rx="2" fill="var(--surface-brand-default)" />
            {/* Thumb */}
            <circle cx="180" cy="38" r="10" fill="var(--surface-base-default)" stroke="var(--surface-brand-default)" strokeWidth="2" />

            {/* Arrow to track */}
            <line x1="40" y1="52" x2="100" y2="62" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="100" cy="62" r="2.5" fill="var(--content-base-default)" />
            <circle cx="32" cy="52" r="10" fill="var(--content-base-default)" />
            <text x="32" y="57" textAnchor="middle" fill="white" fontSize={typography.fontSize['3xs']} fontWeight={typography.fontWeight.semibold}>1</text>

            {/* Arrow to filled portion */}
            <line x1="100" y1="22" x2="100" y2="36" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="100" cy="36" r="2.5" fill="var(--content-base-default)" />
            <circle cx="100" cy="14" r="10" fill="var(--content-base-default)" />
            <text x="100" y="19" textAnchor="middle" fill="white" fontSize={typography.fontSize['3xs']} fontWeight={typography.fontWeight.semibold}>2</text>

            {/* Arrow to thumb */}
            <line x1="180" y1="22" x2="180" y2="27" stroke="var(--content-base-default)" strokeWidth="1.5" />
            <circle cx="180" cy="27" r="2.5" fill="var(--content-base-default)" />
            <circle cx="180" cy="14" r="10" fill="var(--content-base-default)" />
            <text x="180" y="19" textAnchor="middle" fill="white" fontSize={typography.fontSize['3xs']} fontWeight={typography.fontWeight.semibold}>3</text>

            {/* Labels */}
            <text x="32" y="74" textAnchor="middle" fill="var(--content-base-secondary)" fontSize={typography.fontSize['3xs']}>Track</text>
            <text x="100" y="74" textAnchor="middle" fill="var(--content-base-secondary)" fontSize={typography.fontSize['3xs']}>Fill</text>
            <text x="180" y="74" textAnchor="middle" fill="var(--content-base-secondary)" fontSize={typography.fontSize['3xs']}>Thumb</text>
          </svg>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: spacing.primitive[4], marginTop: spacing.primitive[5], fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium, color: 'var(--text-primary)' }}>
          <div>1. Track</div>
          <div style={{ textAlign: 'center' }}>2. Filled Track</div>
          <div style={{ textAlign: 'right' }}>3. Thumb</div>
        </div>
      </Section>

      {/* 3. Variants / States */}
      <Section title="States">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.primitive[4] }}>
          <div style={{ padding: spacing.primitive[6], backgroundColor: 'var(--surface-base-alternative)', borderRadius: radius.primitive.md }}>
            <p style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.medium, color: 'var(--text-primary)', marginTop: 0, marginBottom: spacing.primitive[4] }}>Default</p>
            <Slider defaultValue={40} />
          </div>
          <div style={{ padding: spacing.primitive[6], backgroundColor: 'var(--surface-base-alternative)', borderRadius: radius.primitive.md }}>
            <p style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.medium, color: 'var(--text-primary)', marginTop: 0, marginBottom: spacing.primitive[4] }}>With Value Label</p>
            <Slider defaultValue={60} showValue />
          </div>
          <div style={{ padding: spacing.primitive[6], backgroundColor: 'var(--surface-base-alternative)', borderRadius: radius.primitive.md }}>
            <p style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.medium, color: 'var(--text-primary)', marginTop: 0, marginBottom: spacing.primitive[4] }}>Step 10</p>
            <Slider defaultValue={30} step={10} showValue />
          </div>
          <div style={{ padding: spacing.primitive[6], backgroundColor: 'var(--surface-base-alternative)', borderRadius: radius.primitive.md }}>
            <p style={{ fontSize: typography.fontSize.compact, fontWeight: typography.fontWeight.medium, color: 'var(--text-primary)', marginTop: 0, marginBottom: spacing.primitive[4] }}>Disabled</p>
            <Slider defaultValue={50} disabled />
          </div>
        </div>

        <Subsection title="Interaction States">
          <p style={{ fontSize: typography.fontSize.sm, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            Thumb에 포커스 시 brand 색상의 링이 표시됩니다. 드래그 중에는 Track의 채워진 부분이 실시간으로 업데이트됩니다.
          </p>
        </Subsection>
      </Section>

      {/* 4. Usage Guidelines */}
      <Section title="Usage Guidelines">
        <Subsection title="Best Practices">
          <div style={{ display: 'grid', gap: spacing.primitive[5] }}>
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.primitive[4] }}>
                <DoCard>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.primitive[3] }}>
                    <p style={{ fontSize: typography.fontSize.compact, color: 'var(--text-primary)', margin: 0, fontWeight: typography.fontWeight.medium }}>볼륨</p>
                    <Slider defaultValue={70} showValue />
                  </div>
                </DoCard>
                <DontCard>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.primitive[3] }}>
                    <p style={{ fontSize: typography.fontSize.compact, color: 'var(--text-primary)', margin: 0, fontWeight: typography.fontWeight.medium }}>나이 (정확한 값)</p>
                    <Slider defaultValue={28} min={0} max={100} showValue />
                  </div>
                </DontCard>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.primitive[4], marginTop: spacing.primitive[2] }}>
                <p style={{ fontSize: typography.fontSize.compact, color: 'var(--content-success-default)', margin: 0 }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Do</span> 정확한 값보다 상대적 위치가 중요한 설정에 사용합니다
                </p>
                <p style={{ fontSize: typography.fontSize.compact, color: 'var(--content-error-default)', margin: 0, fontStyle: 'italic' }}>
                  <span style={{ fontWeight: typography.fontWeight.bold }}>Don't</span> 나이, 수량 등 정확한 숫자 입력에는 TextField를 사용합니다
                </p>
              </div>
            </div>
          </div>
        </Subsection>
      </Section>

      {/* 5. Design Tokens */}
      <Section title="Design Tokens">
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
              <tr style={trBorder}><td style={tdStyle}>Track Height</td><td style={tdMono}>4px</td><td style={tdMono}>fixed</td></tr>
              <tr style={trBorder}><td style={tdStyle}>Track Color (empty)</td><td style={tdStyle}><InlineCode>fill.normal</InlineCode></td><td style={tdMono}>var(--fill-base-default)</td></tr>
              <tr style={trBorder}><td style={tdStyle}>Track Color (filled)</td><td style={tdStyle}><InlineCode>surface.brand.default</InlineCode></td><td style={tdMono}>var(--surface-brand-default)</td></tr>
              <tr style={trBorder}><td style={tdStyle}>Thumb Size</td><td style={tdMono}>20×20px</td><td style={tdMono}>fixed</td></tr>
              <tr style={trBorder}><td style={tdStyle}>Thumb Background</td><td style={tdStyle}><InlineCode>surface.base.default</InlineCode></td><td style={tdMono}>var(--surface-base-default)</td></tr>
              <tr style={trBorder}><td style={tdStyle}>Thumb Border</td><td style={tdStyle}><InlineCode>surface.brand.default</InlineCode></td><td style={tdMono}>var(--surface-brand-default)</td></tr>
              <tr><td style={tdStyle}>Disabled Opacity</td><td style={tdMono}>0.4</td><td style={tdMono}>opacity: 0.4</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* 6. Accessibility */}
      <Section title="Accessibility">
        <div style={{ display: 'grid', gap: spacing.primitive[4] }}>
          <PrincipleCard
            number={1}
            title="네이티브 range input 기반"
            desc="네이티브 <input type='range'>를 사용하여 키보드 네비게이션과 스크린 리더를 자동으로 지원합니다. aria-label을 반드시 제공하세요."
          />
          <PrincipleCard
            number={2}
            title="키보드 지원"
            desc="Arrow 키로 값을 조절하고, Home/End로 최솟값/최댓값으로 이동합니다. 브라우저 기본 동작이 지원됩니다."
          />
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
                <tr style={trBorder}><td style={tdStyle}><kbd style={kbdStyle}>←</kbd> / <kbd style={kbdStyle}>↓</kbd></td><td style={tdMono}>값 감소 (step 단위)</td></tr>
                <tr style={trBorder}><td style={tdStyle}><kbd style={kbdStyle}>→</kbd> / <kbd style={kbdStyle}>↑</kbd></td><td style={tdMono}>값 증가 (step 단위)</td></tr>
                <tr style={trBorder}><td style={tdStyle}><kbd style={kbdStyle}>Home</kbd></td><td style={tdMono}>최솟값으로 이동</td></tr>
                <tr><td style={tdStyle}><kbd style={kbdStyle}>End</kbd></td><td style={tdMono}>최댓값으로 이동</td></tr>
              </tbody>
            </table>
          </div>
        </Subsection>
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
                <td style={{ ...tdStyle, fontWeight: typography.fontWeight.medium }}>TextField</td>
                <td style={{ ...tdStyle, color: 'var(--text-secondary)' }}>정확한 숫자 입력</td>
                <td style={{ ...tdStyle, color: 'var(--text-secondary)' }}>Slider는 상대적 범위, TextField는 정확한 값</td>
              </tr>
              <tr>
                <td style={{ ...tdStyle, fontWeight: typography.fontWeight.medium }}>SegmentedControl</td>
                <td style={{ ...tdStyle, color: 'var(--text-secondary)' }}>고정된 옵션 선택</td>
                <td style={{ ...tdStyle, color: 'var(--text-secondary)' }}>Slider는 연속값, SegmentedControl은 이산 옵션</td>
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
            <p style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, color: 'var(--text-primary)', margin: 0 }}>Slider Component</p>
            <p style={{ fontSize: typography.fontSize.compact, color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>실제 컴포넌트 소스 코드를 GitHub에서 확인하세요.</p>
          </div>
          <a
            href="https://github.com/baerae-zkap/design-foundation/blob/main/packages/design-system/src/components/Slider/Slider.tsx"
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
        <CodeBlock code={`import { Slider } from '@baerae-zkap/design-system';`} />
      </Section>

      {/* 3. Basic Usage */}
      <Section title="Basic Usage">
        <PreviewBox>
          <div style={{ width: '100%', maxWidth: 400 }}>
            <BasicSliderDemo />
          </div>
        </PreviewBox>
        <CodeBlock code={`const [volume, setVolume] = useState(40);

<Slider
  value={volume}
  onChange={setVolume}
  showValue
/>`} />
      </Section>

      {/* 4. Min / Max / Step */}
      <Section title="Min / Max / Step">
        <PreviewBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.primitive[6], width: '100%', maxWidth: 400 }}>
            <div>
              <p style={{ fontSize: typography.fontSize.compact, color: 'var(--text-secondary)', margin: `0 0 ${spacing.primitive[3]}px` }}>Temperature (0–50, step 5)</p>
              <TempSliderDemo />
            </div>
            <div>
              <p style={{ fontSize: typography.fontSize.compact, color: 'var(--text-secondary)', margin: `0 0 ${spacing.primitive[3]}px` }}>Price (0–500, step 50)</p>
              <PriceSliderDemo />
            </div>
          </div>
        </PreviewBox>
        <CodeBlock code={`{/* Temperature */}
<Slider min={0} max={50} step={5} defaultValue={25} showValue />

{/* Price */}
<Slider min={0} max={500} step={50} defaultValue={150} showValue />`} />
      </Section>

      {/* 5. Disabled */}
      <Section title="Disabled">
        <PreviewBox>
          <div style={{ width: '100%', maxWidth: 400 }}>
            <Slider defaultValue={60} disabled />
          </div>
        </PreviewBox>
        <CodeBlock code={`<Slider defaultValue={60} disabled />`} />
      </Section>

      {/* 6. API Reference */}
      <Section title="API Reference">
        <PropsTable
          props={[
            { name: 'value', type: 'number', required: false, description: '현재 값 (제어 모드)' },
            { name: 'defaultValue', type: 'number', required: false, description: '초기 값 (비제어 모드). 기본값: min' },
            { name: 'onChange', type: '(value: number) => void', required: false, description: '값 변경 콜백' },
            { name: 'min', type: 'number', required: false, defaultVal: '0', description: '최솟값' },
            { name: 'max', type: 'number', required: false, defaultVal: '100', description: '최댓값' },
            { name: 'step', type: 'number', required: false, defaultVal: '1', description: '증감 단위' },
            { name: 'disabled', type: 'boolean', required: false, defaultVal: 'false', description: '비활성화' },
            { name: 'showValue', type: 'boolean', required: false, defaultVal: 'false', description: '현재 값 레이블 표시' },
            { name: 'aria-label', type: 'string', required: false, description: '접근성 레이블' },
            { name: 'id', type: 'string', required: false, description: 'input 요소 id' },
            { name: 'style', type: 'CSSProperties', required: false, description: '인라인 스타일 오버라이드' },
          ]}
        />
      </Section>
    </div>
  );
}

// ─── Demo Components ──────────────────────────────────────────────────

function BasicSliderDemo() {
  const [volume, setVolume] = useState(40);
  return <Slider value={volume} onChange={setVolume} showValue aria-label="볼륨" />;
}

function TempSliderDemo() {
  const [temp, setTemp] = useState(25);
  return <Slider value={temp} onChange={setTemp} min={0} max={50} step={5} showValue aria-label="온도" />;
}

function PriceSliderDemo() {
  const [price, setPrice] = useState(150);
  return <Slider value={price} onChange={setPrice} min={0} max={500} step={50} showValue aria-label="가격" />;
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
