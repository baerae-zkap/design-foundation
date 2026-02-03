"use client";

import { Breadcrumb } from "@/components/Breadcrumb";
import { TokenDownload } from "@/components/TokenDownload";
import { spacing } from "@/data/tokens";

export default function SpacingPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "파운데이션", href: "/" }, { label: "Spacing" }]} />

      <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Spacing</h1>
      <p className="mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        ZKAP 스페이싱은 <strong style={{ color: 'var(--text-primary)' }}>4px 단위</strong> 그리드를 따릅니다. 일관된 여백과 간격을 유지해주세요.
      </p>
      <TokenDownload files={[
        { name: 'spacing-tokens.json', path: '/spacing-tokens.json' },
      ]} />

      {/* Visual Scale */}
      <section className="mb-12">
        <h2 id="scale" className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>스케일 시각화</h2>
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
        <h2 id="primitive" className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Primitive</h2>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>기본 간격 값 목록입니다.</p>
        <div className="overflow-hidden" style={{ backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)' }}>
          {Object.entries(spacing.primitive).map(([key, token], i, arr) => (
            <div key={key} className="flex items-center gap-4 p-4 transition-colors" style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--divider)' : 'none' }}>
              <div className="w-20 flex items-center">
                <div style={{ width: Math.max(token.value, 2), height: 8, backgroundColor: 'var(--brand-primary)', borderRadius: 2 }} />
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>spacing.{key}</span>
              </div>
              <span className="text-sm font-mono" style={{ color: 'var(--text-tertiary)' }}>{token.value}px</span>
            </div>
          ))}
        </div>
      </section>

      {/* Inset */}
      <section className="mb-12">
        <h2 id="inset" className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Inset</h2>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>컴포넌트 내부 여백(padding)에 적용합니다.</p>
        <div className="overflow-hidden" style={{ backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)' }}>
          {Object.entries(spacing.semantic.inset).map(([key, token], i, arr) => (
            <div key={key} className="flex items-center gap-4 p-4 transition-colors" style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--divider)' : 'none' }}>
              <div className="w-16 h-10 rounded relative flex items-center justify-center" style={{ border: '2px solid var(--brand-primary)' }}>
                <div className="absolute inset-0 rounded" style={{ margin: token.value / 4, backgroundColor: 'var(--blue-100)' }} />
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>inset.{key}</span>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{token.description}</p>
              </div>
              <span className="text-sm font-mono" style={{ color: 'var(--text-tertiary)' }}>{token.value}px</span>
            </div>
          ))}
        </div>
      </section>

      {/* Stack */}
      <section className="mb-12">
        <h2 id="stack" className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Stack</h2>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>세로 방향 요소 사이 간격입니다.</p>
        <div className="overflow-hidden" style={{ backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)' }}>
          {Object.entries(spacing.semantic.stack).map(([key, token], i, arr) => (
            <div key={key} className="flex items-center gap-4 p-4 transition-colors" style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--divider)' : 'none' }}>
              <div className="w-16 flex flex-col items-center">
                <div className="w-10 h-2 rounded" style={{ backgroundColor: 'var(--grey-300)' }} />
                <div style={{ width: 2, height: token.value, backgroundColor: 'var(--brand-primary)' }} />
                <div className="w-10 h-2 rounded" style={{ backgroundColor: 'var(--grey-300)' }} />
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>stack.{key}</span>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{token.description}</p>
              </div>
              <span className="text-sm font-mono" style={{ color: 'var(--text-tertiary)' }}>{token.value}px</span>
            </div>
          ))}
        </div>
      </section>

      {/* Inline */}
      <section className="mb-12">
        <h2 id="inline" className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Inline</h2>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>가로 방향 요소 사이 간격입니다.</p>
        <div className="overflow-hidden" style={{ backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)' }}>
          {Object.entries(spacing.semantic.inline).map(([key, token], i, arr) => (
            <div key={key} className="flex items-center gap-4 p-4 transition-colors" style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--divider)' : 'none' }}>
              <div className="w-16 flex items-center justify-center">
                <div className="w-3 h-6 rounded" style={{ backgroundColor: 'var(--grey-300)' }} />
                <div style={{ width: token.value, height: 2, backgroundColor: 'var(--brand-primary)' }} />
                <div className="w-3 h-6 rounded" style={{ backgroundColor: 'var(--grey-300)' }} />
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>inline.{key}</span>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{token.description}</p>
              </div>
              <span className="text-sm font-mono" style={{ color: 'var(--text-tertiary)' }}>{token.value}px</span>
            </div>
          ))}
        </div>
      </section>

      {/* Screen */}
      <section className="mb-12">
        <h2 id="screen" className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Screen</h2>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>화면 가장자리 여백입니다.</p>
        <div className="overflow-hidden" style={{ backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)' }}>
          {Object.entries(spacing.semantic.screen).map(([key, token], i, arr) => (
            <div key={key} className="flex items-center gap-4 p-4 transition-colors" style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--divider)' : 'none' }}>
              <div className="w-16 h-10 rounded relative" style={{ border: '1px solid var(--grey-300)' }}>
                {key === "horizontal" && (
                  <>
                    <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: 'var(--brand-primary)' }} />
                    <div className="absolute right-0 top-0 bottom-0 w-1" style={{ backgroundColor: 'var(--brand-primary)' }} />
                  </>
                )}
                {key === "top" && <div className="absolute left-0 right-0 top-0 h-1" style={{ backgroundColor: 'var(--brand-primary)' }} />}
                {key === "bottom" && <div className="absolute left-0 right-0 bottom-0 h-1" style={{ backgroundColor: 'var(--brand-primary)' }} />}
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>screen.{key}</span>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{token.description}</p>
              </div>
              <span className="text-sm font-mono" style={{ color: 'var(--text-tertiary)' }}>{token.value}px</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
