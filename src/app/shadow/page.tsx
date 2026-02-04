"use client";

import { Breadcrumb } from "@/components/Breadcrumb";
import { TokenDownload } from "@/components/TokenDownload";
import shadowJson from "../../../public/shadow-tokens.json";
import { formatTokenName } from "@/utils/formatTokenName";

const primitive = shadowJson.shadow.primitive;
const semantic = shadowJson.shadow.semantic;
const dark = shadowJson.shadow.dark;

function resolveRef(token: { value: string; _comment?: string }): string {
  const val = token.value;
  if (val.startsWith("{primitive.")) {
    const key = val.slice(11, -1);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const p = (primitive as any)[key];
    return p?.value ?? "none";
  }
  return val;
}

export default function ShadowPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "파운데이션", href: "/" }, { label: "Shadow" }]} />

      <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Shadow</h1>
      <p className="mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        <strong style={{ color: 'var(--text-primary)' }}>Elevation(높이)</strong> 개념의 그림자 시스템입니다.
        레이어가 높을수록 그림자가 짙어집니다.
      </p>
      <TokenDownload files={[
        { name: 'shadow-tokens.json', path: '/shadow-tokens.json' },
      ]} />

      {/* Visual Scale */}
      <section className="mb-12">
        <h2 id="elevation" className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Elevation 시각화</h2>
        <div className="p-8" style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)', backgroundColor: 'var(--bg-secondary)' }}>
          <div className="flex items-end justify-center gap-6 flex-wrap">
            {Object.entries(primitive).filter(([k]) => !k.startsWith("_")).map(([key, token], index) => {
              const tokenObj = token as { value: string };
              return (
              <div key={key} className="flex flex-col items-center gap-3">
                <div
                  className="w-16 h-16"
                  style={{
                    backgroundColor: 'var(--bg-elevated)',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: tokenObj.value,
                    transform: `translateY(-${index * 2}px)`,
                  }}
                />
                <div className="text-center">
                  <p className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{key}</p>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>level {index}</p>
                </div>
              </div>
            );})}
          </div>
        </div>
      </section>

      {/* Primitive */}
      <section className="mb-12">
        <h2 id="primitive" className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Primitive</h2>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>기본 그림자 단계입니다.</p>
        <div className="space-y-3">
          {Object.entries(primitive).filter(([k]) => !k.startsWith("_")).map(([key, token]) => {
            const t = token as { value: string; _comment?: string };
            return (
            <div
              key={key}
              className="flex items-center gap-4 p-4 cursor-pointer transition-colors"
              style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)', backgroundColor: 'var(--bg-elevated)' }}
              onClick={() => navigator.clipboard.writeText(t.value)}
            >
              <div className="w-20 flex justify-center">
                <div className="w-16 h-16" style={{ backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)', boxShadow: t.value }} />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{formatTokenName('shadow', key)}</span>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{t._comment || ''}</p>
                <p className="text-xs font-mono mt-1 truncate" style={{ color: 'var(--text-placeholder)' }}>{t.value}</p>
              </div>
            </div>
          );})}
        </div>
      </section>

      {/* Card Shadows */}
      <SemanticSection id="card" title="Card" description="카드 컴포넌트용 그림자입니다." data={semantic.card} />

      {/* Button Shadows */}
      <section className="mb-12">
        <h2 id="button" className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Button</h2>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>버튼 컴포넌트용 그림자입니다.</p>
        <div className="overflow-hidden" style={{ backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)' }}>
          {Object.entries(semantic.button).filter(([k]) => !k.startsWith("_")).map(([key, token], i, arr) => {
            const value = resolveRef(token);
            return (
              <div
                key={key}
                className="flex items-center gap-4 p-4 cursor-pointer transition-colors"
                style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--divider)' : 'none' }}
                onClick={() => navigator.clipboard.writeText(value)}
              >
                <div className="w-24 flex justify-center">
                  <button className="px-4 py-2 text-sm font-medium" style={{ backgroundColor: 'var(--brand-primary)', color: 'white', borderRadius: 'var(--radius-md)', boxShadow: value }}>
                    Button
                  </button>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{formatTokenName('button', key)}</span>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{token._comment || ''}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Header & TabBar */}
      <section className="mb-12">
        <h2 id="header" className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Header & TabBar</h2>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>헤더와 탭바 컴포넌트용 그림자입니다.</p>
        <div className="overflow-hidden" style={{ backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)' }}>
          {Object.entries(semantic.header).filter(([k]) => !k.startsWith("_")).map(([key, token]) => (
            <div key={`header-${key}`} className="flex items-center gap-4 p-4" style={{ borderBottom: '1px solid var(--divider)' }}>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{formatTokenName('header', key)}</span>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{token._comment || ''}</p>
              </div>
            </div>
          ))}
          {Object.entries(semantic.tabBar).filter(([k]) => !k.startsWith("_")).map(([key, token], i, arr) => (
            <div key={`tabBar-${key}`} className="flex items-center gap-4 p-4" style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--divider)' : 'none' }}>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{formatTokenName('tabBar', key)}</span>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{token._comment || ''}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Surface Shadows */}
      <section className="mb-12">
        <h2 id="surface" className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Surface</h2>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>모달, 드롭다운, 토스트 등 서피스 컴포넌트용 그림자입니다.</p>
        <div className="overflow-hidden" style={{ backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)' }}>
          {[
            { key: 'dropdown', token: semantic.dropdown.default },
            { key: 'popover', token: semantic.popover.default },
            { key: 'modal', token: semantic.modal.default },
            { key: 'bottomSheet', token: semantic.bottomSheet.default },
            { key: 'drawer', token: semantic.drawer.default },
            { key: 'toast', token: semantic.toast.default },
          ].map(({ key, token }, i, arr) => {
            const value = resolveRef(token);
            return (
              <div
                key={key}
                className="flex items-center gap-4 p-4 cursor-pointer transition-colors"
                style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--divider)' : 'none' }}
                onClick={() => navigator.clipboard.writeText(value)}
              >
                <div className="w-24 flex justify-center">
                  <div className="w-16 h-12" style={{ backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)', boxShadow: value }} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{key}</span>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{token._comment || ''}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Input Focus */}
      <section className="mb-12">
        <h2 id="input" className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Input Focus</h2>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>입력 필드 포커스 링 그림자입니다.</p>
        <div className="overflow-hidden" style={{ backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)' }}>
          {Object.entries(semantic.input).filter(([k]) => !k.startsWith("_")).map(([key, token], i, arr) => (
            <div
              key={key}
              className="flex items-center gap-4 p-4 cursor-pointer transition-colors"
              style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--divider)' : 'none' }}
              onClick={() => navigator.clipboard.writeText(token.value)}
            >
              <div className="w-32 flex justify-center">
                <div
                  className="w-full h-10"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-md)',
                    border: key === 'error' ? '2px solid var(--red-500)' : '2px solid var(--brand-primary)',
                    boxShadow: token.value
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{formatTokenName('input', key)}</span>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{token._comment || ''}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dark Mode */}
      <section className="mb-12">
        <h2 id="dark" className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Dark Mode</h2>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>다크모드용 그림자입니다. 더 강한 그림자와 테두리로 분리감을 표현합니다.</p>
        <div className="overflow-hidden" style={{ backgroundColor: 'var(--grey-15)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--grey-30)' }}>
          {Object.entries(dark.primitive).filter(([k]) => !k.startsWith("_")).map(([key, token]) => {
            const t = token as { value: string; _comment?: string };
            return (
            <div
              key={key}
              className="flex items-center gap-4 p-4 cursor-pointer transition-colors"
              style={{ borderBottom: '1px solid var(--grey-30)' }}
              onClick={() => navigator.clipboard.writeText(t.value)}
            >
              <div className="w-20 flex justify-center">
                <div className="w-16 h-12" style={{ backgroundColor: 'var(--grey-20)', borderRadius: 'var(--radius-md)', boxShadow: t.value }} />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium" style={{ color: 'var(--grey-97)' }}>{formatTokenName('dark', key)}</span>
                <p className="text-xs" style={{ color: 'var(--grey-70)' }}>{t._comment || ''}</p>
              </div>
            </div>
          );})}
          {Object.entries(dark.border).filter(([k]) => !k.startsWith("_")).map(([key, token], i, arr) => {
            const t = token as { value: string; _comment?: string };
            return (
            <div
              key={key}
              className="flex items-center gap-4 p-4 cursor-pointer transition-colors"
              style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--grey-30)' : 'none' }}
              onClick={() => navigator.clipboard.writeText(t.value)}
            >
              <div className="w-20 flex justify-center">
                <div className="w-16 h-12" style={{ backgroundColor: 'var(--grey-20)', borderRadius: 'var(--radius-md)', boxShadow: t.value }} />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium" style={{ color: 'var(--grey-97)' }}>{formatTokenName('border', key)}</span>
                <p className="text-xs" style={{ color: 'var(--grey-70)' }}>{t._comment || ''}</p>
              </div>
            </div>
          );})}

        </div>
      </section>

      {/* Platform Notes */}
      <section className="mb-12">
        <h2 id="platform" className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>플랫폼별 구현</h2>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>React Native에서 iOS와 Android는 그림자 구현 방식이 다릅니다.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-5" style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)', backgroundColor: 'var(--bg-elevated)' }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🍎</span>
              <span className="font-medium" style={{ color: 'var(--text-primary)' }}>iOS</span>
            </div>
            <pre className="code-block text-xs">
              <code style={{ color: 'var(--text-secondary)' }}>{`shadowColor: "#101726"
shadowOffset: { width: 0, height: 4 }
shadowOpacity: 0.10
shadowRadius: 4`}</code>
            </pre>
          </div>
          <div className="p-5" style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)', backgroundColor: 'var(--bg-elevated)' }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🤖</span>
              <span className="font-medium" style={{ color: 'var(--text-primary)' }}>Android</span>
            </div>
            <pre className="code-block text-xs">
              <code style={{ color: 'var(--text-secondary)' }}>{`elevation: 3
// Android uses elevation only
// Fine control not available`}</code>
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}

function SemanticSection({ id, title, description, data }: {
  id: string;
  title: string;
  description: string;
  data: Record<string, { value: string; _comment?: string }>;
}) {
  return (
    <section className="mb-12">
      <h2 id={id} className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{title}</h2>
      <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>{description}</p>
      <div className="overflow-hidden" style={{ backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)' }}>
        {Object.entries(data).filter(([k]) => !k.startsWith("_")).map(([key, token], i, arr) => {
          const value = resolveRef(token);
          return (
            <div
              key={key}
              className="flex items-center gap-4 p-4 cursor-pointer transition-colors"
              style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--divider)' : 'none' }}
              onClick={() => navigator.clipboard.writeText(value)}
            >
              <div className="w-24 flex justify-center">
                <div className="w-16 h-12" style={{ backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)', boxShadow: value }} />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{formatTokenName(id, key)}</span>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{token._comment || ''}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
