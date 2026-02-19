"use client";

import { Breadcrumb } from "@/components/Breadcrumb";
import { TokenDownload } from "@/components/TokenDownload";
import radiusJson from "../../../public/radius-tokens.json";
import { formatTokenName } from "@/utils/formatTokenName";
import { typography, spacing, radius } from '@baerae-zkap/design-system';

const primitive = radiusJson.radius.primitive;
const semantic = radiusJson.radius.semantic;

function resolveRef(token: { value: string; _comment?: string }): number {
  const val = token.value;
  if (val.startsWith("{primitive.")) {
    const key = val.slice(11, -1);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const p = (primitive as any)[key];
    return typeof p === "number" ? p : 0;
  }
  return parseInt(val) || 0;
}

export default function RadiusPage() {
  return (
    <div style={{ maxWidth: 720 }}>
      <Breadcrumb items={[{ label: "파운데이션", href: "/" }, { label: "Radius" }]} />

      <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Radius</h1>
      <p className="mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        모서리 둥글기(border-radius) 토큰입니다. 컴포넌트 유형에 맞는 값을 선택해주세요.
      </p>
      <TokenDownload files={[
        { label: 'Radius', jsonPath: 'radius-tokens.json', tsPath: 'radius.ts' },
      ]} />

      {/* Visual Scale */}
      <section style={{ marginBottom: spacing.primitive[12] }}>
        <h2 id="scale" style={{ fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.bold, marginBottom: spacing.primitive[3], color: 'var(--text-primary)' }}>스케일 시각화</h2>
        <div style={{ padding: spacing.primitive[6], borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)', backgroundColor: 'var(--bg-elevated)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {Object.entries(primitive).filter(([k]) => !k.startsWith("_")).map(([key, value]) => (
              <div key={key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: spacing.primitive[2] }}>
                <div
                  style={{ width: 48, height: 48, backgroundColor: 'var(--brand-primary)', borderRadius: value === 9999 ? "50%" : value }}
                />
                <span style={{ fontSize: typography.fontSize.xs, fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>{key}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Primitive */}
      <section style={{ marginBottom: spacing.primitive[12] }}>
        <h2 id="primitive" style={{ fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.bold, marginBottom: spacing.primitive[1], color: 'var(--text-primary)' }}>Primitive</h2>
        <p style={{ marginBottom: spacing.primitive[4], color: 'var(--text-secondary)' }}>기본 라운딩 값 목록입니다.</p>
        <div style={{ backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)', overflow: 'hidden' }}>
          {Object.entries(primitive).filter(([k]) => !k.startsWith("_")).map(([key, value], i, arr) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: spacing.primitive[4], padding: spacing.primitive[4], borderBottom: i < arr.length - 1 ? '1px solid var(--divider)' : 'none' }}>
              <div style={{ width: 64, display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: 48, height: 48, backgroundColor: 'var(--brand-primary)', borderRadius: value === 9999 ? "50%" : value }} />
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium, color: 'var(--text-primary)' }}>{formatTokenName('radius', key)}</span>
              </div>
              <span style={{ fontSize: typography.fontSize.sm, fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>{value === 9999 ? "9999px" : `${value}px`}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Input */}
      <SemanticSection id="input" title="Input" description="입력 필드용 라운딩입니다." data={semantic.input} renderPreview={(value) => (
        <div style={{ width: 72, height: 36, border: '2px solid var(--divider)', backgroundColor: 'var(--bg-secondary)', borderRadius: value === 9999 ? 9999 : value }} />
      )} />

      {/* Card */}
      <SemanticSection id="card" title="Card" description="카드 컴포넌트용 라운딩입니다." data={semantic.card} renderPreview={(value) => (
        <div style={{ width: 72, height: 48, backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--divider)', borderRadius: value }} />
      )} />

      {/* Button */}
      <SemanticSection id="button" title="Button" description="버튼 컴포넌트용 라운딩입니다." data={semantic.button} renderPreview={(value, key) => (
        <button style={{
          padding: key === 'lg' ? '10px 20px' : '8px 16px',
          fontSize: key === 'lg' ? 14 : 13,
          fontWeight: typography.fontWeight.medium,
          backgroundColor: 'var(--content-brand-default)',
          color: 'white',
          border: 'none',
          borderRadius: value === 9999 ? 9999 : value,
          cursor: 'pointer'
        }}>Button</button>
      )} />

      {/* Chip */}
      <SemanticSection id="chip" title="Chip" description="칩/태그 컴포넌트용 라운딩입니다." data={semantic.chip} renderPreview={(value) => (
        <span style={{ display: 'inline-block', padding: `${spacing.primitive[1]}px ${spacing.primitive[3]}px`, fontSize: typography.fontSize.compact, backgroundColor: 'var(--surface-brand-secondary)', color: 'var(--content-brand-default)', borderRadius: value === 9999 ? 9999 : value }}>Tag</span>
      )} />

      {/* Badge */}
      <SemanticSection id="badge" title="Badge" description="뱃지 컴포넌트용 라운딩입니다." data={semantic.badge} renderPreview={(value) => (
        <span style={{ display: 'inline-block', padding: `2px ${spacing.primitive[2]}px`, fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.medium, backgroundColor: 'var(--content-error-default)', color: 'white', borderRadius: value === 9999 ? 9999 : value }}>NEW</span>
      )} />

      {/* Avatar */}
      <SemanticSection id="avatar" title="Avatar" description="아바타 컴포넌트용 라운딩입니다." data={semantic.avatar} renderPreview={(value) => (
        <div style={{ width: 40, height: 40, background: 'var(--border-base-default)', borderRadius: value === 9999 ? '50%' : value, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--content-base-placeholder)">
            <circle cx="12" cy="8" r="4" />
            <path d="M12 14c-4 0-8 2-8 4v2h16v-2c0-2-4-4-8-4z" />
          </svg>
        </div>
      )} />

      {/* Image */}
      <SemanticSection id="image" title="Image" description="이미지/썸네일 컴포넌트용 라운딩입니다." data={semantic.image} renderPreview={(value) => (
        <div style={{ width: 56, height: 40, background: 'var(--border-base-default)', borderRadius: value, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--content-base-placeholder)">
            <rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="var(--content-base-placeholder)" strokeWidth="2"/>
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5-4 4-3-3-6 6" stroke="var(--content-base-placeholder)" strokeWidth="2" fill="none"/>
          </svg>
        </div>
      )} />

      {/* Surface Components */}
      <section style={{ marginBottom: spacing.primitive[12] }}>
        <h2 id="surface" style={{ fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.bold, marginBottom: spacing.primitive[1], color: 'var(--text-primary)' }}>Surface</h2>
        <p style={{ marginBottom: spacing.primitive[4], color: 'var(--text-secondary)' }}>모달, 바텀시트, 토스트 등 서피스 컴포넌트용 라운딩입니다.</p>
        <div style={{ backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)', overflow: 'hidden' }}>
          {[
            { key: 'modal', token: semantic.modal.default },
            { key: 'bottomSheet', token: semantic.bottomSheet.default },
            { key: 'toast', token: semantic.toast.default },
            { key: 'tooltip', token: semantic.tooltip.default },
          ].map(({ key, token }, i, arr) => {
            const value = resolveRef(token);
            return (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: spacing.primitive[6], padding: `${spacing.primitive[5]}px ${spacing.primitive[4]}px`, borderBottom: i < arr.length - 1 ? '1px solid var(--divider)' : 'none' }}>
                <div style={{ width: 140, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {key === 'modal' && (
                    <div style={{ width: 120, height: 80, backgroundColor: 'var(--static-white)', border: '1px solid var(--border-base-default)', borderRadius: value, boxShadow: '0 8px 24px var(--shadow-primitive-sm)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                      <div style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-base-default)' }}>
                        <div style={{ width: 40, height: 6, backgroundColor: 'var(--border-base-default)', borderRadius: 2 }} />
                      </div>
                      <div style={{ flex: 1, padding: 10, display: 'flex', flexDirection: 'column', gap: spacing.primitive[1] }}>
                        <div style={{ width: '100%', height: 4, backgroundColor: 'var(--surface-base-alternative)', borderRadius: 2 }} />
                        <div style={{ width: '70%', height: 4, backgroundColor: 'var(--surface-base-alternative)', borderRadius: 2 }} />
                      </div>
                    </div>
                  )}
                  {key === 'bottomSheet' && (
                    <div style={{ width: 120, height: 70, backgroundColor: 'var(--static-white)', border: '1px solid var(--border-base-default)', borderTopLeftRadius: value, borderTopRightRadius: value, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, boxShadow: '0 -4px 16px var(--shadow-primitive-xs)', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 8 }}>
                      <div style={{ width: 32, height: 4, backgroundColor: 'var(--border-base-default)', borderRadius: 2, marginBottom: spacing.primitive[3] }} />
                      <div style={{ width: '80%', height: 4, backgroundColor: 'var(--surface-base-alternative)', borderRadius: 2, marginBottom: 6 }} />
                      <div style={{ width: '60%', height: 4, backgroundColor: 'var(--surface-base-alternative)', borderRadius: 2 }} />
                    </div>
                  )}
                  {key === 'toast' && (
                    <div style={{ width: 120, height: 36, backgroundColor: 'var(--inverse-surface-default)', borderRadius: value, display: 'flex', alignItems: 'center', padding: `0 ${spacing.primitive[3]}px`, gap: spacing.primitive[2], boxShadow: '0 4px 12px var(--shadow-primitive-sm)' }}>
                      <div style={{ width: 14, height: 14, backgroundColor: 'var(--content-success-default)', borderRadius: '50%' }} />
                      <span style={{ fontSize: typography.fontSize['2xs'], color: 'var(--static-white)' }}>완료!</span>
                    </div>
                  )}
                  {key === 'tooltip' && (
                    <div style={{ width: 80, height: 28, backgroundColor: 'var(--inverse-surface-default)', borderRadius: value, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px var(--shadow-primitive-sm)' }}>
                      <span style={{ fontSize: typography.fontSize['2xs'], color: 'var(--static-white)' }}>도움말</span>
                    </div>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium, color: 'var(--text-primary)' }}>{key}</span>
                  <p style={{ fontSize: typography.fontSize.xs, color: 'var(--text-tertiary)', marginTop: 2 }}>{token._comment || ''}</p>
                </div>
                <span style={{ fontSize: typography.fontSize.sm, fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>{value}px</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Skeleton */}
      <SemanticSection id="skeleton" title="Skeleton" description="스켈레톤 로딩 컴포넌트용 라운딩입니다." data={semantic.skeleton} renderPreview={(value, key) => (
        <div style={{ width: key === 'text' ? 64 : 40, height: key === 'text' ? 14 : 40, background: 'linear-gradient(90deg, var(--border-base-default), var(--surface-base-alternative), var(--border-base-default))', borderRadius: value }} />
      )} />
    </div>
  );
}

function SemanticSection({ id, title, description, data, renderPreview }: {
  id: string;
  title: string;
  description: string;
  data: Record<string, { value: string; _comment?: string }>;
  renderPreview: (value: number, key: string) => React.ReactNode;
}) {
  return (
    <section style={{ marginBottom: spacing.primitive[12] }}>
      <h2 id={id} style={{ fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.bold, marginBottom: spacing.primitive[1], color: 'var(--text-primary)' }}>{title}</h2>
      <p style={{ marginBottom: spacing.primitive[4], color: 'var(--text-secondary)' }}>{description}</p>
      <div style={{ backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)', overflow: 'hidden' }}>
        {Object.entries(data).filter(([k]) => !k.startsWith("_")).map(([key, token], i, arr) => {
          const value = resolveRef(token);
          return (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: spacing.primitive[4], padding: spacing.primitive[4], borderBottom: i < arr.length - 1 ? '1px solid var(--divider)' : 'none' }}>
              <div style={{ width: 96, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {renderPreview(value, key)}
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium, color: 'var(--text-primary)' }}>{formatTokenName(id, key)}</span>
                <p style={{ fontSize: typography.fontSize.xs, color: 'var(--text-tertiary)', marginTop: 2 }}>{token._comment || ''}</p>
              </div>
              <span style={{ fontSize: typography.fontSize.sm, fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>{value === 9999 ? "9999px" : `${value}px`}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
