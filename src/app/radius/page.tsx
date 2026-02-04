"use client";

import { Breadcrumb } from "@/components/Breadcrumb";
import { TokenDownload } from "@/components/TokenDownload";
import radiusJson from "../../../public/radius-tokens.json";
import { formatTokenName } from "@/utils/formatTokenName";

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
    <div>
      <Breadcrumb items={[{ label: "파운데이션", href: "/" }, { label: "Radius" }]} />

      <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Radius</h1>
      <p className="mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        모서리 둥글기(border-radius) 토큰입니다. 컴포넌트 유형에 맞는 값을 선택해주세요.
      </p>
      <TokenDownload files={[
        { name: 'radius-tokens.json', path: '/radius-tokens.json' },
      ]} />

      {/* Visual Scale */}
      <section className="mb-12">
        <h2 id="scale" className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>스케일 시각화</h2>
        <div className="p-6" style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)', backgroundColor: 'var(--bg-elevated)' }}>
          <div className="flex items-center justify-between">
            {Object.entries(primitive).filter(([k]) => !k.startsWith("_")).map(([key, value]) => (
              <div key={key} className="flex flex-col items-center gap-2">
                <div
                  className="w-12 h-12"
                  style={{ backgroundColor: 'var(--brand-primary)', borderRadius: value === 9999 ? "50%" : value }}
                />
                <span className="text-xs font-mono" style={{ color: 'var(--text-tertiary)' }}>{key}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Primitive */}
      <section className="mb-12">
        <h2 id="primitive" className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Primitive</h2>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>기본 라운딩 값 목록입니다.</p>
        <div className="overflow-hidden" style={{ backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)' }}>
          {Object.entries(primitive).filter(([k]) => !k.startsWith("_")).map(([key, value], i, arr) => (
            <div key={key} className="flex items-center gap-4 p-4 transition-colors" style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--divider)' : 'none' }}>
              <div className="w-16 flex justify-center">
                <div className="w-12 h-12" style={{ backgroundColor: 'var(--brand-primary)', borderRadius: value === 9999 ? "50%" : value }} />
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{formatTokenName('radius', key)}</span>
              </div>
              <span className="text-sm font-mono" style={{ color: 'var(--text-tertiary)' }}>{value === 9999 ? "9999px" : `${value}px`}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Input */}
      <SemanticSection id="input" title="Input" description="입력 필드용 라운딩입니다." data={semantic.input} renderPreview={(value) => (
        <div className="w-full h-10" style={{ border: '2px solid var(--divider)', backgroundColor: 'var(--bg-secondary)', borderRadius: value === 9999 ? 9999 : value }} />
      )} />

      {/* Card */}
      <SemanticSection id="card" title="Card" description="카드 컴포넌트용 라운딩입니다." data={semantic.card} renderPreview={(value) => (
        <div className="w-full h-16" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--divider)', borderRadius: value }} />
      )} />

      {/* Chip */}
      <SemanticSection id="chip" title="Chip" description="칩/태그 컴포넌트용 라운딩입니다." data={semantic.chip} renderPreview={(value) => (
        <span className="px-3 py-1 text-sm" style={{ backgroundColor: 'var(--blue-90)', color: 'var(--blue-50)', borderRadius: value === 9999 ? 9999 : value }}>Tag</span>
      )} />

      {/* Badge */}
      <SemanticSection id="badge" title="Badge" description="뱃지 컴포넌트용 라운딩입니다." data={semantic.badge} renderPreview={(value) => (
        <span className="px-2 py-0.5 text-xs font-medium" style={{ backgroundColor: 'var(--red-500)', color: 'white', borderRadius: value === 9999 ? 9999 : value }}>NEW</span>
      )} />

      {/* Avatar */}
      <SemanticSection id="avatar" title="Avatar" description="아바타 컴포넌트용 라운딩입니다." data={semantic.avatar} renderPreview={(value) => (
        <div className="w-10 h-10" style={{ background: 'linear-gradient(135deg, var(--blue-65), var(--blue-50))', borderRadius: value === 9999 ? '50%' : value }} />
      )} />

      {/* Image */}
      <SemanticSection id="image" title="Image" description="이미지/썸네일 컴포넌트용 라운딩입니다." data={semantic.image} renderPreview={(value) => (
        <div className="w-16 h-12" style={{ backgroundColor: 'var(--grey-90)', borderRadius: value }} />
      )} />

      {/* Surface Components */}
      <section className="mb-12">
        <h2 id="surface" className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Surface</h2>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>모달, 바텀시트, 토스트 등 서피스 컴포넌트용 라운딩입니다.</p>
        <div className="overflow-hidden" style={{ backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)' }}>
          {[
            { key: 'modal', token: semantic.modal.default },
            { key: 'bottomSheet', token: semantic.bottomSheet.default },
            { key: 'toast', token: semantic.toast.default },
            { key: 'tooltip', token: semantic.tooltip.default },
          ].map(({ key, token }, i, arr) => {
            const value = resolveRef(token);
            return (
              <div key={key} className="flex items-center gap-4 p-4 transition-colors" style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--divider)' : 'none' }}>
                <div className="flex-1">
                  <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{key}</span>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{token._comment || ''}</p>
                </div>
                <span className="text-sm font-mono" style={{ color: 'var(--text-tertiary)' }}>{value}px</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Skeleton */}
      <SemanticSection id="skeleton" title="Skeleton" description="스켈레톤 로딩 컴포넌트용 라운딩입니다." data={semantic.skeleton} renderPreview={(value, key) => (
        <div className={key === 'text' ? 'w-20 h-4' : 'w-12 h-12'} style={{ backgroundColor: 'var(--grey-95)', borderRadius: value }} />
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
    <section className="mb-12">
      <h2 id={id} className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>{title}</h2>
      <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>{description}</p>
      <div className="overflow-hidden" style={{ backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)' }}>
        {Object.entries(data).filter(([k]) => !k.startsWith("_")).map(([key, token], i, arr) => {
          const value = resolveRef(token);
          return (
            <div key={key} className="flex items-center gap-4 p-4 transition-colors" style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--divider)' : 'none' }}>
              <div className="w-24 flex justify-center">
                {renderPreview(value, key)}
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{formatTokenName(id, key)}</span>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{token._comment || ''}</p>
              </div>
              <span className="text-sm font-mono" style={{ color: 'var(--text-tertiary)' }}>{value === 9999 ? "9999px" : `${value}px`}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
