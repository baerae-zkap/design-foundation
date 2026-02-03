"use client";

import { Breadcrumb } from "@/components/Breadcrumb";
import { TokenDownload } from "@/components/TokenDownload";
import { radius } from "@/data/tokens";
import { formatTokenName } from "@/utils/formatTokenName";

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
            {Object.entries(radius.primitive).map(([key, token]) => (
              <div key={key} className="flex flex-col items-center gap-2">
                <div
                  className="w-12 h-12"
                  style={{ backgroundColor: 'var(--brand-primary)', borderRadius: token.value === 9999 ? "50%" : token.value }}
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
          {Object.entries(radius.primitive).map(([key, token], i, arr) => (
            <div key={key} className="flex items-center gap-4 p-4 transition-colors" style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--divider)' : 'none' }}>
              <div className="w-16 flex justify-center">
                <div
                  className="w-12 h-12"
                  style={{ backgroundColor: 'var(--brand-primary)', borderRadius: token.value === 9999 ? "50%" : token.value }}
                />
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{formatTokenName('radius', key)}</span>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{token.description}</p>
              </div>
              <span className="text-sm font-mono" style={{ color: 'var(--text-tertiary)' }}>
                {token.value === 9999 ? "9999px" : `${token.value}px`}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Button */}
      <section className="mb-12">
        <h2 id="button" className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Button</h2>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>버튼 컴포넌트용 라운딩입니다.</p>
        <div className="overflow-hidden" style={{ backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)' }}>
          {Object.entries(radius.semantic.button).map(([key, token], i, arr) => (
            <div key={key} className="flex items-center gap-4 p-4 transition-colors" style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--divider)' : 'none' }}>
              <div className="w-24 flex justify-center">
                <div
                  className="px-4 py-2 text-sm font-medium"
                  style={{ backgroundColor: 'var(--brand-primary)', color: 'white', borderRadius: token.value === 9999 ? 9999 : token.value }}
                >
                  Button
                </div>
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{formatTokenName('button', key)}</span>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{token.description}</p>
              </div>
              <span className="text-sm font-mono" style={{ color: 'var(--text-tertiary)' }}>
                {token.value === 9999 ? "9999px" : `${token.value}px`}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Components */}
      <section className="mb-12">
        <h2 id="components" className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Components</h2>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>UI 요소별 권장 라운딩입니다.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Input */}
          <div className="p-5" style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)', backgroundColor: 'var(--bg-elevated)' }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium" style={{ color: 'var(--brand-primary)' }}>input</span>
              <span className="text-xs font-mono" style={{ color: 'var(--text-placeholder)' }}>{radius.semantic.input.value}px</span>
            </div>
            <div
              className="w-full h-10"
              style={{ border: '2px solid var(--divider)', backgroundColor: 'var(--bg-secondary)', borderRadius: radius.semantic.input.value }}
            />
            <p className="text-xs mt-2" style={{ color: 'var(--text-tertiary)' }}>{radius.semantic.input.description}</p>
          </div>

          {/* Card */}
          <div className="p-5" style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)', backgroundColor: 'var(--bg-elevated)' }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium" style={{ color: 'var(--brand-primary)' }}>card</span>
              <span className="text-xs font-mono" style={{ color: 'var(--text-placeholder)' }}>{radius.semantic.card.value}px</span>
            </div>
            <div
              className="w-full h-16"
              style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--divider)', borderRadius: radius.semantic.card.value }}
            />
            <p className="text-xs mt-2" style={{ color: 'var(--text-tertiary)' }}>{radius.semantic.card.description}</p>
          </div>

          {/* Chip */}
          <div className="p-5" style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)', backgroundColor: 'var(--bg-elevated)' }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium" style={{ color: 'var(--brand-primary)' }}>chip</span>
              <span className="text-xs font-mono" style={{ color: 'var(--text-placeholder)' }}>{radius.semantic.chip.value}px</span>
            </div>
            <div className="flex gap-2">
              <span
                className="px-3 py-1 text-sm"
                style={{ backgroundColor: 'var(--blue-100)', color: 'var(--blue-600)', borderRadius: radius.semantic.chip.value }}
              >
                Tag
              </span>
              <span
                className="px-3 py-1 text-sm"
                style={{ backgroundColor: 'var(--grey-200)', color: 'var(--grey-700)', borderRadius: radius.semantic.chip.value }}
              >
                Label
              </span>
            </div>
            <p className="text-xs mt-2" style={{ color: 'var(--text-tertiary)' }}>{radius.semantic.chip.description}</p>
          </div>

          {/* Avatar */}
          <div className="p-5" style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)', backgroundColor: 'var(--bg-elevated)' }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium" style={{ color: 'var(--brand-primary)' }}>avatar</span>
              <span className="text-xs font-mono" style={{ color: 'var(--text-placeholder)' }}>9999px (full)</span>
            </div>
            <div className="flex gap-3">
              <div
                className="w-10 h-10"
                style={{ background: 'linear-gradient(135deg, var(--blue-400), var(--blue-600))', borderRadius: radius.semantic.avatar.value }}
              />
              <div
                className="w-10 h-10"
                style={{ background: 'linear-gradient(135deg, var(--grey-400), var(--grey-600))', borderRadius: radius.semantic.avatar.value }}
              />
            </div>
            <p className="text-xs mt-2" style={{ color: 'var(--text-tertiary)' }}>{radius.semantic.avatar.description}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
