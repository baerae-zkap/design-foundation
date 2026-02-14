"use client";

import { Breadcrumb } from "@/components/Breadcrumb";
import { TokenDownload } from "@/components/TokenDownload";
import spacingJson from "../../../public/spacing-tokens.json";
import { formatTokenName } from "@/utils/formatTokenName";

const primitive = spacingJson.spacing.primitive;
const semantic = spacingJson.spacing.semantic;

function resolveRef(ref: string | number | { value: string }): number {
  if (typeof ref === "number") return ref;
  if (typeof ref === "object" && "value" in ref) {
    const val = ref.value;
    if (typeof val === "string" && val.startsWith("{primitive.")) {
      const key = val.slice(11, -1);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const p = (primitive as any)[key];
      return typeof p === "number" ? p : 0;
    }
    return parseInt(val) || 0;
  }
  return 0;
}

// 토큰 타입 정의
interface TokenWithSizes {
  name: string;
  description: string;
  sizes: Record<string, { value: string; _comment?: string }>;
  renderDemo: (value: number) => React.ReactNode;
}

interface TokenWithValue {
  name: string;
  description: string;
  value: { value: string; _comment?: string };
  renderDemo: (value: number) => React.ReactNode;
}

type TokenDef = TokenWithSizes | TokenWithValue;

function hasMultipleSizes(token: TokenDef): token is TokenWithSizes {
  return 'sizes' in token;
}

// 측정선 컴포넌트
function MeasurementLine({ direction, value, label, color, style }: {
  direction: 'horizontal' | 'vertical';
  value: number;
  label: string;
  color: string;
  style?: React.CSSProperties;
}) {
  const isHorizontal = direction === 'horizontal';
  return (
    <div style={{
      display: 'flex',
      flexDirection: isHorizontal ? 'column' : 'row',
      alignItems: 'center',
      gap: 4,
      ...style,
    }}>
      <div style={{
        width: isHorizontal ? '100%' : 2,
        height: isHorizontal ? 2 : '100%',
        backgroundColor: color,
        position: 'relative',
      }}>
        {/* End caps */}
        <div style={{
          position: 'absolute',
          [isHorizontal ? 'left' : 'top']: 0,
          width: isHorizontal ? 2 : 8,
          height: isHorizontal ? 8 : 2,
          backgroundColor: color,
          transform: isHorizontal ? 'translateY(-3px)' : 'translateX(-3px)',
        }} />
        <div style={{
          position: 'absolute',
          [isHorizontal ? 'right' : 'bottom']: 0,
          width: isHorizontal ? 2 : 8,
          height: isHorizontal ? 8 : 2,
          backgroundColor: color,
          transform: isHorizontal ? 'translateY(-3px)' : 'translateX(-3px)',
        }} />
      </div>
      <span style={{
        fontSize: 10,
        fontWeight: 600,
        color,
        whiteSpace: 'nowrap',
      }}>
        {label} {value}px
      </span>
    </div>
  );
}

// 상세 스페이싱 섹션
interface DetailedToken {
  name: string;
  value?: { value: string; _comment?: string };
  sizes?: Record<string, { value: string; _comment?: string }>;
  color: string;
}

function DetailedSpacingSection({ title, description, tokens, renderMockup }: {
  title: string;
  description: string;
  tokens: DetailedToken[];
  renderMockup: (values: Record<string, number>) => React.ReactNode;
}) {
  // Resolve all token values
  const values: Record<string, number> = {};
  tokens.forEach(token => {
    if (token.value) {
      values[token.name] = resolveRef(token.value);
    } else if (token.sizes) {
      // Use 'md' size as default, or first available
      const sizeKey = token.sizes.md ? 'md' : Object.keys(token.sizes).find(k => !k.startsWith('_')) || 'md';
      if (token.sizes[sizeKey]) {
        values[token.name] = resolveRef(token.sizes[sizeKey]);
      }
    }
  });

  return (
    <div className="mb-10">
      {/* Header */}
      <div style={{ marginBottom: 12 }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>{title}</h3>
        <p style={{ fontSize: 13, color: 'var(--text-tertiary)', margin: '2px 0 0 0' }}>{description}</p>
      </div>

      {/* Mockup */}
      <div style={{
        backgroundColor: 'var(--bg-elevated)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--divider)',
        marginBottom: 12,
      }}>
        {renderMockup(values)}
      </div>

      {/* Token Table */}
      <div style={{
        backgroundColor: 'var(--bg-elevated)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--divider)',
        padding: '4px 16px',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            {tokens.map((token, idx) => (
              <tr key={token.name} style={{ borderBottom: idx < tokens.length - 1 ? '1px solid var(--divider)' : 'none' }}>
                <td style={{ padding: '12px 0', fontSize: 13 }}>
                  <code style={{ color: 'var(--brand-primary)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>component.{title.toLowerCase()}.{token.name}</code>
                </td>
                <td style={{ padding: '12px 0', fontSize: 13, textAlign: 'right' }}>
                  {token.sizes ? (
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                      {Object.entries(token.sizes).filter(([k]) => !k.startsWith('_')).map(([size, val]) => (
                        <span key={size} style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                          {size}: <strong style={{ color: 'var(--text-primary)' }}>{resolveRef(val)}px</strong>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{values[token.name]}px</span>
                  )}
                </td>
                <td style={{ padding: '12px 0', width: 32, paddingLeft: 12 }}>
                  <div style={{ width: 16, height: 16, backgroundColor: token.color, borderRadius: 3, border: '1px solid var(--divider)' }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 컴포넌트 토큰 섹션
function ComponentTokenSection({ title, tokens }: { title: string; tokens: TokenDef[] }) {
  return (
    <div className="mb-8">
      <h3 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-primary)' }}>
        {title}
      </h3>
      <div style={{
        backgroundColor: 'var(--bg-elevated)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--divider)',
        overflow: 'hidden',
      }}>
        {tokens.map((token, idx) => (
          <div
            key={token.name}
            style={{
              borderBottom: idx < tokens.length - 1 ? '1px solid var(--divider)' : 'none',
            }}
          >
            {hasMultipleSizes(token) ? (
              // 여러 사이즈가 있는 토큰 (lg, md, sm 등)
              <div>
                {/* 토큰 헤더 */}
                <div style={{ padding: '12px 16px', backgroundColor: 'var(--bg-secondary)' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>
                    {token.name}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
                    {token.description}
                  </div>
                </div>
                {/* 사이즈별 행 */}
                {Object.entries(token.sizes)
                  .filter(([key]) => !key.startsWith('_'))
                  .map(([size, val], sizeIdx, arr) => {
                    const resolvedValue = resolveRef(val);
                    return (
                      <div
                        key={size}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '12px 16px',
                          gap: 16,
                          borderBottom: sizeIdx < arr.length - 1 ? '1px solid var(--divider)' : 'none',
                        }}
                      >
                        <div style={{ width: 60 }}>
                          <span style={{
                            fontSize: 12,
                            fontWeight: 500,
                            color: 'var(--brand-primary)',
                            fontFamily: 'var(--font-mono)',
                          }}>
                            .{size}
                          </span>
                        </div>
                        <div style={{ width: 50, textAlign: 'right' }}>
                          <span style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                            fontFamily: 'var(--font-mono)',
                          }}>
                            {resolvedValue}px
                          </span>
                        </div>
                        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                          {token.renderDemo(resolvedValue)}
                        </div>
                      </div>
                    );
                  })}
              </div>
            ) : (
              // 단일 값 토큰
              <div style={{
                display: 'flex',
                alignItems: 'center',
                padding: '16px',
                gap: 16,
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>
                    {token.name}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
                    {token.description}
                  </div>
                </div>
                <div style={{ width: 50, textAlign: 'right', flexShrink: 0 }}>
                  <span style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-mono)',
                  }}>
                    {resolveRef(token.value)}px
                  </span>
                </div>
                <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
                  {token.renderDemo(resolveRef(token.value))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SpacingPage() {
  return (
    <div style={{ maxWidth: 720 }}>
      <Breadcrumb items={[{ label: "파운데이션", href: "/" }, { label: "Spacing" }]} />

      <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Spacing</h1>
      <p className="mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        ZKAP 스페이싱은 <strong style={{ color: 'var(--text-primary)' }}>4px 단위</strong> 그리드를 따릅니다. 일관된 여백과 간격을 유지해주세요.
      </p>
      <TokenDownload files={[
        { name: 'spacing-tokens.json', path: '/spacing-tokens.json' },
      ]} />

      {/* Visual Scale */}
      <section className="mb-12">
        <h2 id="scale" className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>스케일 시각화</h2>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>4px 단위의 간격 스케일입니다.</p>
        <div className="p-6" style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)', backgroundColor: 'var(--bg-elevated)' }}>
          <div className="flex items-end justify-between h-24">
            {[4, 8, 12, 16, 20, 24, 32, 40, 48, 64].map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <div style={{ width: size, height: size, backgroundColor: 'var(--brand-primary)', borderRadius: 'var(--radius-sm)' }} />
                <span className="text-xs font-mono" style={{ color: 'var(--text-tertiary)' }}>{size}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Primitive */}
      <section className="mb-12">
        <h2 id="primitive" className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Primitive</h2>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>기본 간격 값 목록입니다.</p>
        <div className="overflow-hidden" style={{ backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)' }}>
          {Object.entries(primitive).filter(([k, v]) => !k.startsWith("_") && typeof v === "number").map(([key, value], i, arr) => (
            <div key={key} className="flex items-center gap-4 p-4 transition-colors" style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--divider)' : 'none' }}>
              <div className="w-20 flex items-center">
                <div style={{ width: Math.max(value as number, 2), height: 8, backgroundColor: 'var(--brand-primary)', borderRadius: 2 }} />
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{formatTokenName('spacing', key)}</span>
              </div>
              <span className="text-sm font-mono" style={{ color: 'var(--text-tertiary)' }}>{value as number}px</span>
            </div>
          ))}
        </div>
      </section>

      {/* Component Spacing - Detailed Mockups */}
      <section className="mb-12">
        <h2 id="component" className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Component</h2>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>컴포넌트에서 사용하는 스페이싱 토큰입니다. 실제 UI에서 어떻게 적용되는지 확인하세요.</p>

        {/* Button Detailed Mockup */}
        <DetailedSpacingSection
          title="Button"
          description="버튼 컴포넌트의 내부 패딩과 아이콘-텍스트 간격"
          tokens={[
            { name: 'paddingX', sizes: semantic.component.button.paddingX, color: 'var(--status-negative-surface)' },
            { name: 'paddingY', sizes: semantic.component.button.paddingY, color: 'var(--surface-brand-secondary)' },
            { name: 'gap', value: semantic.component.button.gap, color: 'var(--status-positive-surface)' },
          ]}
          renderMockup={(values) => {
            const px = values.paddingX || 20;
            const py = values.paddingY || 12;
            const gap = values.gap || 8;
            return (
              <div style={{ padding: '32px 48px', display: 'flex', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                  {/* Button */}
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    backgroundColor: 'var(--brand-primary)',
                    borderRadius: 'var(--radius-md)',
                    position: 'relative',
                  }}>
                    {/* PaddingX overlays with dashed borders */}
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: px, backgroundColor: 'var(--status-negative-surface)', borderRadius: 'var(--radius-md) 0 0 var(--radius-md)', borderRight: '1px dashed var(--status-negative-border)' }}>
                      <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(-90deg)', fontSize: 10, fontWeight: 600, color: 'white' }}>{px}</span>
                    </div>
                    <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: px, backgroundColor: 'var(--status-negative-surface)', borderRadius: '0 var(--radius-md) var(--radius-md) 0', borderLeft: '1px dashed var(--status-negative-border)' }} />
                    {/* PaddingY overlays with dashed borders */}
                    <div style={{ position: 'absolute', left: px, right: px, top: 0, height: py, backgroundColor: 'var(--surface-brand-secondary)', borderBottom: '1px dashed var(--content-brand-default)' }}>
                      <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 10, fontWeight: 600, color: 'white' }}>{py}</span>
                    </div>
                    <div style={{ position: 'absolute', left: px, right: px, bottom: 0, height: py, backgroundColor: 'var(--surface-brand-secondary)', borderTop: '1px dashed var(--content-brand-default)' }} />

                    <div style={{ display: 'flex', alignItems: 'center', gap: gap, padding: `${py}px ${px}px`, color: 'white', fontSize: 14, fontWeight: 500, position: 'relative', zIndex: 1 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M5 12h14" strokeLinecap="round"/>
                      </svg>
                      <span>버튼 텍스트</span>
                    </div>

                    {/* Gap indicator overlay */}
                    <div style={{ position: 'absolute', left: px + 16, top: py, bottom: py, width: gap, backgroundColor: 'var(--status-positive-surface)', border: '1px dashed var(--status-positive-border)', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 9, fontWeight: 600, color: 'white', writingMode: 'vertical-rl' }}>{gap}</span>
                    </div>
                  </div>

                  {/* Legend */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 11 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 14, height: 14, backgroundColor: 'var(--status-negative-surface)', border: '1px dashed var(--status-negative-border)', borderRadius: 2 }} />
                      <span style={{ color: 'var(--text-secondary)' }}>paddingX <strong>{px}px</strong></span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 14, height: 14, backgroundColor: 'var(--surface-brand-secondary)', border: '1px dashed var(--content-brand-default)', borderRadius: 2 }} />
                      <span style={{ color: 'var(--text-secondary)' }}>paddingY <strong>{py}px</strong></span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 14, height: 14, backgroundColor: 'var(--status-positive-surface)', border: '1px dashed var(--status-positive-border)', borderRadius: 2 }} />
                      <span style={{ color: 'var(--text-secondary)' }}>gap <strong>{gap}px</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            );
          }}
        />

        {/* Modal Detailed Mockup */}
        <DetailedSpacingSection
          title="Modal"
          description="모달의 내부 패딩과 영역별 간격"
          tokens={[
            { name: 'padding', value: semantic.component.modal.padding, color: 'var(--status-negative-surface)' },
            { name: 'headerGap', value: semantic.component.modal.headerGap, color: 'var(--status-cautionary-surface)' },
            { name: 'footerGap', value: semantic.component.modal.footerGap, color: 'var(--surface-brand-secondary)' },
            { name: 'buttonGap', value: semantic.component.modal.buttonGap, color: 'var(--status-positive-surface)' },
          ]}
          renderMockup={(values) => {
            const padding = values.padding || 24;
            const headerGap = values.headerGap || 16;
            const footerGap = values.footerGap || 20;
            const buttonGap = values.buttonGap || 12;
            return (
              <div style={{ padding: '24px 48px', display: 'flex', justifyContent: 'center' }}>
                <div style={{ display: 'flex', gap: 24 }}>
                  {/* Modal */}
                  <div style={{
                    width: 300,
                    backgroundColor: 'var(--bg-elevated)',
                    borderRadius: 'var(--radius-xl)',
                    boxShadow: 'var(--shadow-lg)',
                    position: 'relative',
                  }}>
                    {/* Padding overlays with dashed borders */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: padding, backgroundColor: 'var(--status-negative-surface)', borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0', borderBottom: '1px dashed var(--status-negative-border)' }}>
                      <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 10, fontWeight: 600, color: 'var(--status-negative-content)' }}>{padding}</span>
                    </div>
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: padding, backgroundColor: 'var(--status-negative-surface)', borderRadius: '0 0 var(--radius-xl) var(--radius-xl)', borderTop: '1px dashed var(--status-negative-border)' }} />
                    <div style={{ position: 'absolute', top: padding, bottom: padding, left: 0, width: padding, backgroundColor: 'var(--status-negative-surface)', borderRight: '1px dashed var(--status-negative-border)' }}>
                      <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(-90deg)', fontSize: 10, fontWeight: 600, color: 'var(--status-negative-content)' }}>{padding}</span>
                    </div>
                    <div style={{ position: 'absolute', top: padding, bottom: padding, right: 0, width: padding, backgroundColor: 'var(--status-negative-surface)', borderLeft: '1px dashed var(--status-negative-border)' }} />

                    <div style={{ padding, position: 'relative', zIndex: 1 }}>
                      {/* Header */}
                      <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>모달 제목</div>

                      {/* HeaderGap indicator - inline */}
                      <div style={{ height: headerGap, backgroundColor: 'var(--status-cautionary-surface)', border: '1px dashed var(--status-cautionary-border)', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--status-cautionary-content)' }}>{headerGap}</span>
                      </div>

                      {/* Content */}
                      <div style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.6 }}>
                        모달 본문 내용입니다. 여기에 설명이나 폼이 들어갑니다.
                      </div>

                      {/* FooterGap indicator - inline */}
                      <div style={{ height: footerGap, backgroundColor: 'var(--surface-brand-secondary)', border: '1px dashed var(--content-brand-default)', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--content-brand-default)' }}>{footerGap}</span>
                      </div>

                      {/* Buttons */}
                      <div style={{ display: 'flex', position: 'relative' }}>
                        <button style={{ flex: 1, padding: '10px 14px', backgroundColor: 'var(--grey-95)', border: 'none', borderRadius: 'var(--radius-md)', fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', cursor: 'pointer' }}>취소</button>
                        {/* ButtonGap indicator - inline */}
                        <div style={{ width: buttonGap, backgroundColor: 'var(--status-positive-surface)', border: '1px dashed var(--status-positive-border)', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontSize: 9, fontWeight: 600, color: 'var(--status-positive-content)', writingMode: 'vertical-rl' }}>{buttonGap}</span>
                        </div>
                        <button style={{ flex: 1, padding: '10px 14px', backgroundColor: 'var(--brand-primary)', border: 'none', borderRadius: 'var(--radius-md)', fontSize: 13, fontWeight: 500, color: 'white', cursor: 'pointer' }}>확인</button>
                      </div>
                    </div>
                  </div>

                  {/* Legend */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 11, paddingTop: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 14, height: 14, backgroundColor: 'var(--status-negative-surface)', border: '1px dashed var(--status-negative-border)', borderRadius: 2 }} />
                      <span style={{ color: 'var(--text-secondary)' }}>padding <strong>{padding}px</strong></span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 14, height: 14, backgroundColor: 'var(--status-cautionary-surface)', border: '1px dashed var(--status-cautionary-border)', borderRadius: 2 }} />
                      <span style={{ color: 'var(--text-secondary)' }}>headerGap <strong>{headerGap}px</strong></span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 14, height: 14, backgroundColor: 'var(--surface-brand-secondary)', border: '1px dashed var(--content-brand-default)', borderRadius: 2 }} />
                      <span style={{ color: 'var(--text-secondary)' }}>footerGap <strong>{footerGap}px</strong></span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 14, height: 14, backgroundColor: 'var(--status-positive-surface)', border: '1px dashed var(--status-positive-border)', borderRadius: 2 }} />
                      <span style={{ color: 'var(--text-secondary)' }}>buttonGap <strong>{buttonGap}px</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            );
          }}
        />

        {/* Input Field Detailed Mockup */}
        <DetailedSpacingSection
          title="Input"
          description="입력 필드의 내부 패딩과 라벨/도움말 간격"
          tokens={[
            { name: 'paddingX', value: semantic.component.input.paddingX, color: 'var(--status-negative-surface)' },
            { name: 'paddingY', value: semantic.component.input.paddingY, color: 'var(--surface-brand-secondary)' },
            { name: 'labelGap', value: semantic.component.input.labelGap, color: 'var(--status-cautionary-surface)' },
            { name: 'helperGap', value: semantic.component.input.helperGap, color: 'var(--surface-brand-secondary)' },
          ]}
          renderMockup={(values) => {
            const px = values.paddingX || 16;
            const py = values.paddingY || 12;
            const labelGap = values.labelGap || 8;
            const helperGap = values.helperGap || 4;
            return (
              <div style={{ padding: '24px 48px', display: 'flex', justifyContent: 'center' }}>
                <div style={{ display: 'flex', gap: 24 }}>
                  {/* Input Field */}
                  <div style={{ width: 300 }}>
                    {/* Label */}
                    <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>이메일 주소</label>

                    {/* LabelGap indicator - inline */}
                    <div style={{ height: labelGap, backgroundColor: 'var(--status-cautionary-surface)', border: '1px dashed var(--status-cautionary-border)', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {labelGap >= 8 && <span style={{ fontSize: 9, fontWeight: 600, color: 'var(--status-cautionary-content)' }}>{labelGap}</span>}
                    </div>

                    {/* Input */}
                    <div style={{ position: 'relative', backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--divider)', borderRadius: 'var(--radius-md)' }}>
                      {/* Padding overlays with dashed borders */}
                      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: px, backgroundColor: 'var(--status-negative-surface)', borderRadius: 'var(--radius-md) 0 0 var(--radius-md)', borderRight: '1px dashed var(--status-negative-border)' }}>
                        <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(-90deg)', fontSize: 10, fontWeight: 600, color: 'var(--status-negative-content)' }}>{px}</span>
                      </div>
                      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: px, backgroundColor: 'var(--status-negative-surface)', borderRadius: '0 var(--radius-md) var(--radius-md) 0', borderLeft: '1px dashed var(--status-negative-border)' }} />
                      <div style={{ position: 'absolute', left: px, right: px, top: 0, height: py, backgroundColor: 'var(--surface-brand-secondary)', borderBottom: '1px dashed var(--content-brand-default)' }}>
                        <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 10, fontWeight: 600, color: 'var(--content-brand-default)' }}>{py}</span>
                      </div>
                      <div style={{ position: 'absolute', left: px, right: px, bottom: 0, height: py, backgroundColor: 'var(--surface-brand-secondary)', borderTop: '1px dashed var(--content-brand-default)' }} />

                      <input
                        type="email"
                        placeholder="example@email.com"
                        style={{
                          width: '100%',
                          padding: `${py}px ${px}px`,
                          border: 'none',
                          backgroundColor: 'transparent',
                          fontSize: 14,
                          color: 'var(--text-primary)',
                          outline: 'none',
                          position: 'relative',
                          zIndex: 1,
                        }}
                      />
                    </div>

                    {/* HelperGap indicator - inline, no number if small */}
                    <div style={{ height: helperGap, backgroundColor: 'var(--surface-brand-secondary)', border: '1px dashed var(--content-brand-default)', borderRadius: 2 }} />

                    {/* Helper text */}
                    <p style={{ fontSize: 12, color: 'var(--text-tertiary)', margin: 0 }}>로그인에 사용할 이메일을 입력해주세요.</p>
                  </div>

                  {/* Legend */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 11, paddingTop: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 14, height: 14, backgroundColor: 'var(--status-negative-surface)', border: '1px dashed var(--status-negative-border)', borderRadius: 2 }} />
                      <span style={{ color: 'var(--text-secondary)' }}>paddingX <strong>{px}px</strong></span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 14, height: 14, backgroundColor: 'var(--surface-brand-secondary)', border: '1px dashed var(--content-brand-default)', borderRadius: 2 }} />
                      <span style={{ color: 'var(--text-secondary)' }}>paddingY <strong>{py}px</strong></span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 14, height: 14, backgroundColor: 'var(--status-cautionary-surface)', border: '1px dashed var(--status-cautionary-border)', borderRadius: 2 }} />
                      <span style={{ color: 'var(--text-secondary)' }}>labelGap <strong>{labelGap}px</strong></span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 14, height: 14, backgroundColor: 'var(--surface-brand-secondary)', border: '1px dashed var(--content-brand-default)', borderRadius: 2 }} />
                      <span style={{ color: 'var(--text-secondary)' }}>helperGap <strong>{helperGap}px</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            );
          }}
        />

        {/* Card Detailed Mockup */}
        <DetailedSpacingSection
          title="Card"
          description="카드 컴포넌트의 내부 패딩과 요소 간격"
          tokens={[
            { name: 'padding', sizes: semantic.component.card.padding, color: 'var(--status-negative-surface)' },
            { name: 'gap', value: semantic.component.card.gap, color: 'var(--status-positive-surface)' },
          ]}
          renderMockup={(values) => {
            const padding = values.padding || 20;
            const gap = values.gap || 16;
            return (
              <div style={{ padding: '24px 48px', display: 'flex', justifyContent: 'center' }}>
                <div style={{ display: 'flex', gap: 24 }}>
                  {/* Card */}
                  <div style={{
                    width: 280,
                    backgroundColor: 'var(--bg-elevated)',
                    borderRadius: 'var(--radius-xl)',
                    border: '1px solid var(--divider)',
                    position: 'relative',
                  }}>
                    {/* Padding overlays with dashed borders */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: padding, backgroundColor: 'var(--status-negative-surface)', borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0', borderBottom: '1px dashed var(--status-negative-border)' }}>
                      <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 10, fontWeight: 600, color: 'var(--status-negative-content)' }}>{padding}</span>
                    </div>
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: padding, backgroundColor: 'var(--status-negative-surface)', borderRadius: '0 0 var(--radius-xl) var(--radius-xl)', borderTop: '1px dashed var(--status-negative-border)' }} />
                    <div style={{ position: 'absolute', top: padding, bottom: padding, left: 0, width: padding, backgroundColor: 'var(--status-negative-surface)', borderRight: '1px dashed var(--status-negative-border)' }}>
                      <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(-90deg)', fontSize: 10, fontWeight: 600, color: 'var(--status-negative-content)' }}>{padding}</span>
                    </div>
                    <div style={{ position: 'absolute', top: padding, bottom: padding, right: 0, width: padding, backgroundColor: 'var(--status-negative-surface)', borderLeft: '1px dashed var(--status-negative-border)' }} />

                    <div style={{ padding, position: 'relative', zIndex: 1 }}>
                      {/* Image placeholder */}
                      <div style={{ width: '100%', height: 120, backgroundColor: 'var(--grey-95)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--grey-70)" strokeWidth="1.5">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <path d="M21 15l-5-5L5 21" />
                        </svg>
                      </div>

                      {/* Gap indicator - inline */}
                      <div style={{ height: gap, backgroundColor: 'var(--status-positive-surface)', border: '1px dashed var(--status-positive-border)', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--status-positive-content)' }}>{gap}</span>
                      </div>

                      {/* Content */}
                      <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>카드 제목</h3>
                      <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '6px 0 0 0', lineHeight: 1.5 }}>카드 설명 텍스트입니다.</p>
                    </div>
                  </div>

                  {/* Legend */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 11, paddingTop: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 14, height: 14, backgroundColor: 'var(--status-negative-surface)', border: '1px dashed var(--status-negative-border)', borderRadius: 2 }} />
                      <span style={{ color: 'var(--text-secondary)' }}>padding <strong>{padding}px</strong></span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 14, height: 14, backgroundColor: 'var(--status-positive-surface)', border: '1px dashed var(--status-positive-border)', borderRadius: 2 }} />
                      <span style={{ color: 'var(--text-secondary)' }}>gap <strong>{gap}px</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            );
          }}
        />

        {/* List Detailed Mockup */}
        <DetailedSpacingSection
          title="List"
          description="리스트 아이템의 내부 패딩"
          tokens={[
            { name: 'itemPaddingX', value: semantic.component.list.itemPaddingX, color: 'var(--status-negative-surface)' },
            { name: 'itemPaddingY', value: semantic.component.list.itemPaddingY, color: 'var(--surface-brand-secondary)' },
          ]}
          renderMockup={(values) => {
            const px = values.itemPaddingX || 20;
            const py = values.itemPaddingY || 16;
            return (
              <div style={{ padding: '24px', maxWidth: 360, margin: '0 auto' }}>
                <div style={{ backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--divider)', overflow: 'hidden' }}>
                  {[
                    { name: '김지은', role: '디자이너', avatar: '👩‍🎨', showOverlay: true },
                    { name: '박민수', role: '개발자', avatar: '👨‍💻', showOverlay: false },
                    { name: '이서연', role: 'PM', avatar: '👩‍💼', showOverlay: false },
                  ].map((item, i, arr) => (
                    <div key={item.name} style={{ position: 'relative', borderBottom: i < arr.length - 1 ? '1px solid var(--divider)' : 'none' }}>
                      {/* Show padding overlay on first item only */}
                      {item.showOverlay && (
                        <>
                          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: px, backgroundColor: 'var(--status-negative-surface)', borderRight: '1px dashed var(--status-negative-surface)', zIndex: 2 }} />
                          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: px, backgroundColor: 'var(--status-negative-surface)', borderLeft: '1px dashed var(--status-negative-surface)', zIndex: 2 }} />
                          <div style={{ position: 'absolute', left: px, right: px, top: 0, height: py, backgroundColor: 'var(--surface-brand-secondary)', borderBottom: '1px dashed var(--surface-brand-secondary)', zIndex: 2 }} />
                          <div style={{ position: 'absolute', left: px, right: px, bottom: 0, height: py, backgroundColor: 'var(--surface-brand-secondary)', borderTop: '1px dashed var(--surface-brand-secondary)', zIndex: 2 }} />

                          <span style={{ position: 'absolute', left: px / 2, top: '50%', transform: 'translateX(-50%) rotate(-90deg)', fontSize: 9, fontWeight: 600, color: 'var(--status-negative-content)', whiteSpace: 'nowrap', zIndex: 3 }}>{px}</span>
                          <span style={{ position: 'absolute', left: '50%', top: py / 2, transform: 'translate(-50%, -50%)', fontSize: 9, fontWeight: 600, color: 'var(--content-brand-default)', whiteSpace: 'nowrap', zIndex: 3 }}>{py}</span>
                        </>
                      )}

                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: `${py}px ${px}px`, position: 'relative', zIndex: 1 }}>
                        <div style={{ width: 40, height: 40, backgroundColor: 'var(--grey-95)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{item.avatar}</div>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{item.name}</div>
                          <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{item.role}</div>
                        </div>
                        <div style={{ marginLeft: 'auto' }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--grey-70)" strokeWidth="2">
                            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          }}
        />
      </section>

      {/* Page Layout Spacing */}
      <section className="mb-12">
        <h2 id="page-layout" className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Page Layout</h2>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>페이지 레이아웃에서 타이틀, 본문, 섹션 간의 간격입니다.</p>

        {/* Page Title Layout */}
        <div className="mb-10">
          <div style={{ marginBottom: 12 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>타이틀 & 본문 간격</h3>
            <p style={{ fontSize: 13, color: 'var(--text-tertiary)', margin: '2px 0 0 0' }}>페이지 제목과 설명, 본문 콘텐츠 사이의 간격</p>
          </div>

          <div style={{
            backgroundColor: 'var(--bg-elevated)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--divider)',
            padding: '32px 48px',
            marginBottom: 12,
          }}>
            <div style={{ display: 'flex', gap: 32 }}>
              {/* Mockup */}
              <div style={{ flex: 1, maxWidth: 400 }}>
                {/* Page Title */}
                <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)' }}>
                  페이지 제목
                </div>

                {/* Title-Description gap indicator - inline */}
                <div style={{ height: 8, backgroundColor: 'var(--surface-brand-secondary)', border: '1px dashed var(--content-brand-default)', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 9, fontWeight: 600, color: 'var(--content-brand-default)' }}>8</span>
                </div>

                {/* Description */}
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  페이지에 대한 설명입니다. 사용자가 이 페이지에서 무엇을 할 수 있는지 안내합니다.
                </p>

                {/* Description-Content gap indicator - inline */}
                <div style={{ height: 24, backgroundColor: 'var(--status-cautionary-surface)', border: '1px dashed var(--status-cautionary-border)', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--status-cautionary-content)' }}>24</span>
                </div>

                {/* Content */}
                <div style={{ padding: 16, backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)' }}>
                  <div style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>본문 콘텐츠 영역</div>
                </div>
              </div>

              {/* Legend */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 12, minWidth: 180 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 16, height: 16, backgroundColor: 'var(--surface-brand-secondary)', border: '1px dashed var(--content-brand-default)', borderRadius: 2 }} />
                  <span style={{ color: 'var(--text-secondary)' }}>제목 → 설명 <strong>8px</strong></span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginLeft: 24 }}>vertical.2xs</div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                  <div style={{ width: 16, height: 16, backgroundColor: 'var(--status-cautionary-surface)', border: '1px dashed var(--status-cautionary-border)', borderRadius: 2 }} />
                  <span style={{ color: 'var(--text-secondary)' }}>설명 → 콘텐츠 <strong>24px</strong></span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginLeft: 24 }}>vertical.lg</div>
              </div>
            </div>
          </div>

          {/* Token Table */}
          <div style={{
            backgroundColor: 'var(--bg-elevated)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--divider)',
            padding: '4px 16px',
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--divider)' }}>
                  <td style={{ padding: '12px 0', fontSize: 13 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>제목 → 설명</span>
                  </td>
                  <td style={{ padding: '12px 0', fontSize: 13, textAlign: 'right' }}>
                    <code style={{ color: 'var(--brand-primary)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>vertical.2xs</code>
                  </td>
                  <td style={{ padding: '12px 0', fontSize: 13, textAlign: 'right', fontWeight: 600, fontFamily: 'var(--font-mono)', width: 60 }}>8px</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--divider)' }}>
                  <td style={{ padding: '12px 0', fontSize: 13 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>설명 → 콘텐츠</span>
                  </td>
                  <td style={{ padding: '12px 0', fontSize: 13, textAlign: 'right' }}>
                    <code style={{ color: 'var(--brand-primary)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>vertical.lg</code>
                  </td>
                  <td style={{ padding: '12px 0', fontSize: 13, textAlign: 'right', fontWeight: 600, fontFamily: 'var(--font-mono)', width: 60 }}>24px</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 0', fontSize: 13 }}>
                    <span style={{ color: 'var(--text-secondary)' }}>섹션 → 섹션</span>
                  </td>
                  <td style={{ padding: '12px 0', fontSize: 13, textAlign: 'right' }}>
                    <code style={{ color: 'var(--brand-primary)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>vertical.3xl</code>
                  </td>
                  <td style={{ padding: '12px 0', fontSize: 13, textAlign: 'right', fontWeight: 600, fontFamily: 'var(--font-mono)', width: 60 }}>48px</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section Layout */}
        <div className="mb-10">
          <div style={{ marginBottom: 12 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>섹션 간격</h3>
            <p style={{ fontSize: 13, color: 'var(--text-tertiary)', margin: '2px 0 0 0' }}>페이지 내 섹션들 사이의 간격</p>
          </div>

          <div style={{
            backgroundColor: 'var(--bg-elevated)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--divider)',
            padding: '32px 48px',
            marginBottom: 12,
          }}>
            <div style={{ display: 'flex', gap: 32 }}>
              {/* Mockup */}
              <div style={{ flex: 1, maxWidth: 400 }}>
                {/* Section 1 */}
                <div style={{ padding: 16, backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)' }}>
                  <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>섹션 제목 1</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>섹션 내용...</div>
                </div>

                {/* Section gap indicator - inline, not absolute */}
                <div style={{ height: 48, backgroundColor: 'var(--surface-brand-secondary)', border: '1px dashed var(--content-brand-default)', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0' }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--content-brand-default)' }}>48</span>
                </div>

                {/* Section 2 */}
                <div style={{ padding: 16, backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)' }}>
                  <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>섹션 제목 2</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>섹션 내용...</div>
                </div>
              </div>

              {/* Legend */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 12, minWidth: 180 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 16, height: 16, backgroundColor: 'var(--surface-brand-secondary)', border: '1px dashed var(--content-brand-default)', borderRadius: 2 }} />
                  <span style={{ color: 'var(--text-secondary)' }}>섹션 간격 <strong>48px</strong></span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginLeft: 24 }}>vertical.3xl</div>

                <div style={{ marginTop: 16, fontSize: 11, color: 'var(--text-tertiary)', lineHeight: 1.5 }}>
                  주요 섹션 사이에는 충분한 여백을 두어 시각적으로 분리합니다.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Spacing */}
        <div className="mb-10">
          <div style={{ marginBottom: 12 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>콘텐츠 내부 간격</h3>
            <p style={{ fontSize: 13, color: 'var(--text-tertiary)', margin: '2px 0 0 0' }}>본문 내 요소들 사이의 간격</p>
          </div>

          <div style={{
            backgroundColor: 'var(--bg-elevated)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--divider)',
            padding: '32px 48px',
            marginBottom: 12,
          }}>
            <div style={{ display: 'flex', gap: 32 }}>
              {/* Mockup */}
              <div style={{ flex: 1, maxWidth: 400 }}>
                {/* Section Title */}
                <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-primary)' }}>섹션 제목</div>

                {/* Title-Description gap indicator - inline (4px, no number) */}
                <div style={{ height: 4, backgroundColor: 'var(--status-positive-surface)', border: '1px dashed var(--status-positive-border)', borderRadius: 2 }} />

                {/* Section Description */}
                <p style={{ fontSize: 13, color: 'var(--text-tertiary)', margin: 0 }}>섹션에 대한 짧은 설명</p>

                {/* Description-Items gap indicator - inline */}
                <div style={{ height: 16, backgroundColor: 'var(--surface-brand-secondary)', border: '1px dashed var(--content-brand-default)', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 9, fontWeight: 600, color: 'var(--content-brand-default)' }}>16</span>
                </div>

                {/* List items with inline gap indicators */}
                <div style={{ padding: 12, backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', fontSize: 13, color: 'var(--text-secondary)' }}>리스트 아이템 1</div>

                {/* Item gap indicator - inline */}
                <div style={{ height: 12, backgroundColor: 'var(--status-cautionary-surface)', border: '1px dashed var(--status-cautionary-border)', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 9, fontWeight: 600, color: 'var(--status-cautionary-content)' }}>12</span>
                </div>

                <div style={{ padding: 12, backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', fontSize: 13, color: 'var(--text-secondary)' }}>리스트 아이템 2</div>

                {/* Item gap indicator - inline */}
                <div style={{ height: 12, backgroundColor: 'var(--status-cautionary-surface)', border: '1px dashed var(--status-cautionary-border)', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 9, fontWeight: 600, color: 'var(--status-cautionary-content)' }}>12</span>
                </div>

                <div style={{ padding: 12, backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', fontSize: 13, color: 'var(--text-secondary)' }}>리스트 아이템 3</div>
              </div>

              {/* Legend */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 12, minWidth: 180 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 16, height: 16, backgroundColor: 'var(--status-positive-surface)', border: '1px dashed var(--status-positive-border)', borderRadius: 2 }} />
                  <span style={{ color: 'var(--text-secondary)' }}>제목 → 설명 <strong>4px</strong></span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginLeft: 24 }}>vertical.3xs</div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                  <div style={{ width: 16, height: 16, backgroundColor: 'var(--surface-brand-secondary)', border: '1px dashed var(--content-brand-default)', borderRadius: 2 }} />
                  <span style={{ color: 'var(--text-secondary)' }}>설명 → 목록 <strong>16px</strong></span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginLeft: 24 }}>vertical.sm</div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                  <div style={{ width: 16, height: 16, backgroundColor: 'var(--status-cautionary-surface)', border: '1px dashed var(--status-cautionary-border)', borderRadius: 2 }} />
                  <span style={{ color: 'var(--text-secondary)' }}>아이템 간격 <strong>12px</strong></span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginLeft: 24 }}>vertical.xs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inset */}
      <section className="mb-12">
        <h2 id="inset" className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Inset</h2>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>컴포넌트 내부 여백(padding)에 적용합니다.</p>
        <div className="overflow-hidden" style={{ backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)' }}>
          {Object.entries(semantic.inset).filter(([k]) => !k.startsWith("_")).map(([key, token], i, arr) => {
            const value = resolveRef(token);
            const comment = (token as { _comment?: string })._comment || '';
            return (
              <div key={key} className="flex items-center gap-4 p-4 transition-colors" style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--divider)' : 'none' }}>
                <div className="w-16 h-10 rounded relative flex items-center justify-center" style={{ border: '2px solid var(--brand-primary)' }}>
                  <div className="absolute inset-0 rounded" style={{ margin: value / 4, backgroundColor: 'var(--blue-90)' }} />
                </div>
                <div className="flex-1">
                  <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{formatTokenName('inset', key)}</span>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{comment}</p>
                </div>
                <span className="text-sm font-mono" style={{ color: 'var(--text-tertiary)' }}>{value}px</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Vertical */}
      <section className="mb-12">
        <h2 id="vertical" className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Vertical</h2>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>세로 방향 요소 사이 간격입니다.</p>
        <div className="overflow-hidden" style={{ backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)' }}>
          {Object.entries(semantic.vertical).filter(([k]) => !k.startsWith("_")).map(([key, token], i, arr) => {
            const value = resolveRef(token);
            const comment = (token as { _comment?: string })._comment || '';
            return (
              <div key={key} className="flex items-center gap-4 p-4 transition-colors" style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--divider)' : 'none' }}>
                <div className="w-16 flex flex-col items-center">
                  <div className="w-10 h-2 rounded" style={{ backgroundColor: 'var(--grey-90)' }} />
                  <div style={{ width: 2, height: Math.max(value, 2), backgroundColor: 'var(--brand-primary)' }} />
                  <div className="w-10 h-2 rounded" style={{ backgroundColor: 'var(--grey-90)' }} />
                </div>
                <div className="flex-1">
                  <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{formatTokenName('vertical', key)}</span>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{comment}</p>
                </div>
                <span className="text-sm font-mono" style={{ color: 'var(--text-tertiary)' }}>{value}px</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Horizontal */}
      <section className="mb-12">
        <h2 id="horizontal" className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Horizontal</h2>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>가로 방향 요소 사이 간격입니다.</p>
        <div className="overflow-hidden" style={{ backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)' }}>
          {Object.entries(semantic.horizontal).filter(([k]) => !k.startsWith("_")).map(([key, token], i, arr) => {
            const value = resolveRef(token);
            const comment = (token as { _comment?: string })._comment || '';
            return (
              <div key={key} className="flex items-center gap-4 p-4 transition-colors" style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--divider)' : 'none' }}>
                <div className="w-16 flex items-center justify-center">
                  <div className="w-3 h-6 rounded" style={{ backgroundColor: 'var(--grey-90)' }} />
                  <div style={{ width: Math.max(value, 2), height: 2, backgroundColor: 'var(--brand-primary)' }} />
                  <div className="w-3 h-6 rounded" style={{ backgroundColor: 'var(--grey-90)' }} />
                </div>
                <div className="flex-1">
                  <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{formatTokenName('horizontal', key)}</span>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{comment}</p>
                </div>
                <span className="text-sm font-mono" style={{ color: 'var(--text-tertiary)' }}>{value}px</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Screen */}
      <section className="mb-12">
        <h2 id="screen" className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Screen</h2>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>화면 가장자리 여백입니다.</p>
        <div className="overflow-hidden" style={{ backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)' }}>
          {Object.entries(semantic.screen).filter(([k]) => !k.startsWith("_")).map(([key, token], i, arr) => {
            const value = resolveRef(token);
            const comment = (token as { _comment?: string })._comment || '';
            return (
              <div key={key} className="flex items-center gap-4 p-4 transition-colors" style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--divider)' : 'none' }}>
                <div className="w-16 h-10 rounded relative" style={{ border: '1px solid var(--grey-90)' }}>
                  {key.includes("X") && (
                    <>
                      <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: 'var(--brand-primary)' }} />
                      <div className="absolute right-0 top-0 bottom-0 w-1" style={{ backgroundColor: 'var(--brand-primary)' }} />
                    </>
                  )}
                  {key.includes("Top") && <div className="absolute left-0 right-0 top-0 h-1" style={{ backgroundColor: 'var(--brand-primary)' }} />}
                  {key.includes("Bottom") && <div className="absolute left-0 right-0 bottom-0 h-1" style={{ backgroundColor: 'var(--brand-primary)' }} />}
                </div>
                <div className="flex-1">
                  <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{formatTokenName('screen', key)}</span>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{comment}</p>
                </div>
                <span className="text-sm font-mono" style={{ color: 'var(--text-tertiary)' }}>{value}px</span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
