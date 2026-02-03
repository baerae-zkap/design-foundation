"use client";

import { Breadcrumb } from "@/components/Breadcrumb";
import { TokenDownload } from "@/components/TokenDownload";
import { shadow } from "@/data/tokens";

export default function ShadowPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "파운데이션", href: "/" }, { label: "Shadow" }]} />

      <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Shadow</h1>
      <p className="mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        <strong style={{ color: 'var(--text-primary)' }}>Elevation(높이)</strong> 개념의 그림자 시스템입니다.
        레이어가 높을수록 그림자가 짙어집니다.
      </p>
      <TokenDownload files={[
        { name: 'shadow-tokens.json', path: '/shadow-tokens.json' },
      ]} />

      {/* Visual Scale */}
      <section className="mb-12">
        <h2 id="elevation" className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Elevation 시각화</h2>
        <div className="p-8" style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)', backgroundColor: 'var(--bg-secondary)' }}>
          <div className="flex items-end justify-center gap-6 flex-wrap">
            {Object.entries(shadow.primitive).map(([key, token], index) => (
              <div key={key} className="flex flex-col items-center gap-3">
                <div
                  className="w-16 h-16"
                  style={{
                    backgroundColor: 'var(--bg-elevated)',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: token.value,
                    transform: `translateY(-${index * 2}px)`,
                  }}
                />
                <div className="text-center">
                  <p className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{key}</p>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>level {index}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Usage */}
      <section className="mb-12">
        <h2 id="usage" className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>기본 사용법</h2>
        <pre className="code-block">
          <code style={{ color: 'var(--text-secondary)' }}>{`// 컴포넌트별 시멘틱 그림자
<Card style={{ ...theme.shadows.card }} />
<Modal style={{ ...theme.shadows.modal }} />
<Dropdown style={{ ...theme.shadows.dropdown }} />`}</code>
        </pre>
      </section>

      {/* Primitive */}
      <section className="mb-12">
        <h2 id="primitive" className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Primitive</h2>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>기본 그림자 단계입니다.</p>
        <div className="space-y-3">
          {Object.entries(shadow.primitive).map(([key, token]) => (
            <div
              key={key}
              className="flex items-center gap-4 p-4 cursor-pointer transition-colors"
              style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)', backgroundColor: 'var(--bg-elevated)' }}
              onClick={() => navigator.clipboard.writeText(token.value)}
            >
              <div className="w-20 flex justify-center">
                <div
                  className="w-16 h-16"
                  style={{ backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)', boxShadow: token.value }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>shadow.{key}</span>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{token.description}</p>
                <p className="text-xs font-mono mt-1 truncate" style={{ color: 'var(--text-placeholder)' }}>{token.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Semantic */}
      <section className="mb-12">
        <h2 id="semantic" className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Semantic</h2>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>컴포넌트 유형별 권장 그림자입니다.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {Object.entries(shadow.semantic).map(([key, token]) => (
            <div
              key={key}
              className="p-5 cursor-pointer transition-colors"
              style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)', backgroundColor: 'var(--bg-elevated)' }}
              onClick={() => navigator.clipboard.writeText(token.value)}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium" style={{ color: 'var(--brand-primary)' }}>{key}</span>
              </div>
              <div className="flex justify-center mb-3">
                <div
                  className="w-24 h-16"
                  style={{ backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)', boxShadow: token.value }}
                />
              </div>
              <p className="text-xs text-center" style={{ color: 'var(--text-tertiary)' }}>{token.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Examples */}
      <section className="mb-12">
        <h2 id="examples" className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>적용 예시</h2>

        {/* Card */}
        <div className="mb-6 p-6" style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)', backgroundColor: 'var(--bg-secondary)' }}>
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-tertiary)' }}>Card</h3>
          <div className="flex gap-6 flex-wrap">
            <div className="text-center">
              <div className="w-32 h-20 mb-2" style={{ backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', boxShadow: shadow.semantic.card.value }} />
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Default</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-20 mb-2" style={{ backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', boxShadow: shadow.semantic.cardHover.value }} />
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Hover</p>
            </div>
          </div>
        </div>

        {/* Modal */}
        <div className="mb-6 p-6" style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)', backgroundColor: 'var(--bg-secondary)' }}>
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-tertiary)' }}>Modal</h3>
          <div className="flex justify-center">
            <div className="w-72 p-5" style={{ backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-xl)', boxShadow: shadow.semantic.modal.value }}>
              <p className="font-medium" style={{ color: 'var(--text-primary)' }}>Modal Title</p>
              <p className="text-sm mt-2" style={{ color: 'var(--text-tertiary)' }}>Modal content with elevation 4 shadow.</p>
              <div className="flex gap-2 mt-4">
                <button className="px-3 py-1.5 text-sm" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)', borderRadius: 'var(--radius-md)' }}>Cancel</button>
                <button className="px-3 py-1.5 text-sm" style={{ backgroundColor: 'var(--brand-primary)', color: 'white', borderRadius: 'var(--radius-md)' }}>Confirm</button>
              </div>
            </div>
          </div>
        </div>

        {/* Dropdown */}
        <div className="p-6" style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)', backgroundColor: 'var(--bg-secondary)' }}>
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-tertiary)' }}>Dropdown</h3>
          <div className="inline-block">
            <div className="px-4 py-2 text-sm" style={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--divider)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)' }}>
              Select option
            </div>
            <div className="mt-1 w-48 overflow-hidden" style={{ backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)', boxShadow: shadow.semantic.dropdown.value }}>
              <div className="px-4 py-2.5 text-sm" style={{ color: 'var(--text-primary)' }}>Option 1</div>
              <div className="px-4 py-2.5 text-sm" style={{ color: 'var(--text-primary)' }}>Option 2</div>
              <div className="px-4 py-2.5 text-sm" style={{ color: 'var(--text-primary)' }}>Option 3</div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Notes */}
      <section className="mb-12">
        <h2 id="platform" className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>플랫폼별 구현</h2>
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
