"use client";

import { Breadcrumb } from "@/components/Breadcrumb";
import { TokenDownload } from "@/components/TokenDownload";
import { typography } from "@/data/tokens";

export default function TypographyPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "파운데이션", href: "/" }, { label: "Typography" }]} />

      <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Typography</h1>
      <p className="mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        ZKAP 타이포그래피는 <strong style={{ color: 'var(--text-primary)' }}>가독성</strong>과 <strong style={{ color: 'var(--text-primary)' }}>시각적 위계</strong>를 고려해 설계되었습니다.
      </p>
      <TokenDownload files={[
        { name: 'typography-tokens.json', path: '/typography-tokens.json' },
      ]} />

      {/* Font Family */}
      <section className="mb-12">
        <h2 id="font-family" className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>폰트 패밀리</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-6" style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)', backgroundColor: 'var(--bg-elevated)' }}>
            <p className="text-sm mb-2" style={{ color: 'var(--text-tertiary)' }}>기본 텍스트</p>
            <p className="text-2xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{typography.fontFamily.base}</p>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>본문, 제목, UI 텍스트 전반</p>
            <div className="pt-4" style={{ borderTop: '1px solid var(--divider)' }}>
              <p className="text-xl" style={{ color: 'var(--text-primary)' }}>가나다라마바사 ABCDEFG</p>
            </div>
          </div>

          <div className="p-6" style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)', backgroundColor: 'var(--bg-elevated)' }}>
            <p className="text-sm mb-2" style={{ color: 'var(--text-tertiary)' }}>숫자 전용</p>
            <p className="text-2xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{typography.fontFamily.numeric}</p>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>금액, 통계, 타이머 등 숫자</p>
            <div className="pt-4" style={{ borderTop: '1px solid var(--divider)' }}>
              <p className="text-xl font-mono" style={{ color: 'var(--text-primary)' }}>₩1,234,567</p>
            </div>
          </div>
        </div>
      </section>

      {/* Usage */}
      <section className="mb-12">
        <h2 id="usage" className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>기본 사용법</h2>
        <pre className="code-block">
          <code style={{ color: 'var(--text-secondary)' }}>{`// 타이포 토큰 스프레드 사용
<Text style={{ ...theme.typography.heading.lg }}>제목</Text>
<Text style={{ ...theme.typography.body.md }}>본문</Text>`}</code>
        </pre>
      </section>

      {/* Display */}
      <section className="mb-12">
        <h2 id="display" className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Display</h2>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>랜딩 페이지, 히어로 영역의 대형 타이틀에 적합합니다.</p>
        <div className="space-y-3">
          {Object.entries(typography.scale.display).map(([size, token]) => (
            <div key={size} className="p-5" style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)', backgroundColor: 'var(--bg-elevated)' }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium" style={{ color: 'var(--brand-primary)' }}>display.{size}</span>
                <span className="text-xs font-mono" style={{ color: 'var(--text-placeholder)' }}>{token.fontSize}px / {token.lineHeight}px • {token.fontWeight}</span>
              </div>
              <p
                style={{ color: 'var(--text-primary)', fontSize: token.fontSize, lineHeight: `${token.lineHeight}px`, fontWeight: token.fontWeight }}
              >
                디자인 시스템으로 일관된 경험을
              </p>
              <p className="text-xs mt-2" style={{ color: 'var(--text-tertiary)' }}>{token.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Title */}
      <section className="mb-12">
        <h2 id="title" className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Title</h2>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>페이지 및 섹션의 주요 타이틀에 사용합니다.</p>
        <div className="space-y-3">
          {Object.entries(typography.scale.title).map(([size, token]) => (
            <div key={size} className="p-5" style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)', backgroundColor: 'var(--bg-elevated)' }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium" style={{ color: 'var(--brand-primary)' }}>title.{size}</span>
                <span className="text-xs font-mono" style={{ color: 'var(--text-placeholder)' }}>{token.fontSize}px / {token.lineHeight}px • {token.fontWeight}</span>
              </div>
              <p
                style={{ color: 'var(--text-primary)', fontSize: token.fontSize, lineHeight: `${token.lineHeight}px`, fontWeight: token.fontWeight }}
              >
                타이틀 예시 텍스트
              </p>
              <p className="text-xs mt-2" style={{ color: 'var(--text-tertiary)' }}>{token.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Subtitle */}
      <section className="mb-12">
        <h2 id="subtitle" className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Subtitle</h2>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>부제목, 서브헤더에 사용합니다.</p>
        <div className="space-y-3">
          {Object.entries(typography.scale.subtitle).map(([size, token]) => (
            <div key={size} className="p-5" style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)', backgroundColor: 'var(--bg-elevated)' }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium" style={{ color: 'var(--brand-primary)' }}>subtitle.{size}</span>
                <span className="text-xs font-mono" style={{ color: 'var(--text-placeholder)' }}>{token.fontSize}px / {token.lineHeight}px • {token.fontWeight}</span>
              </div>
              <p
                style={{ color: 'var(--text-primary)', fontSize: token.fontSize, lineHeight: `${token.lineHeight}px`, fontWeight: token.fontWeight }}
              >
                부제목 예시 텍스트
              </p>
              <p className="text-xs mt-2" style={{ color: 'var(--text-tertiary)' }}>{token.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Heading */}
      <section className="mb-12">
        <h2 id="heading" className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Heading</h2>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>페이지 타이틀, 섹션 헤더에 사용합니다. (기존 호환용)</p>
        <div className="space-y-3">
          {Object.entries(typography.scale.heading).map(([size, token]) => (
            <div key={size} className="p-5" style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)', backgroundColor: 'var(--bg-elevated)' }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium" style={{ color: 'var(--brand-primary)' }}>heading.{size}</span>
                <span className="text-xs font-mono" style={{ color: 'var(--text-placeholder)' }}>{token.fontSize}px / {token.lineHeight}px • {token.fontWeight}</span>
              </div>
              <p
                style={{ color: 'var(--text-primary)', fontSize: token.fontSize, lineHeight: `${token.lineHeight}px`, fontWeight: token.fontWeight }}
              >
                섹션 제목 예시 텍스트
              </p>
              <p className="text-xs mt-2" style={{ color: 'var(--text-tertiary)' }}>{token.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Body */}
      <section className="mb-12">
        <h2 id="body" className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Body</h2>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>일반 본문, 설명 텍스트에 사용합니다.</p>
        <div className="space-y-3">
          {Object.entries(typography.scale.body).map(([size, token]) => (
            <div key={size} className="p-5" style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)', backgroundColor: 'var(--bg-elevated)' }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium" style={{ color: 'var(--brand-primary)' }}>body.{size}</span>
                <span className="text-xs font-mono" style={{ color: 'var(--text-placeholder)' }}>{token.fontSize}px / {token.lineHeight}px • {token.fontWeight}</span>
              </div>
              <p
                style={{ color: 'var(--text-primary)', fontSize: token.fontSize, lineHeight: `${token.lineHeight}px`, fontWeight: token.fontWeight }}
              >
                본문 텍스트 예시입니다. 디자인 시스템은 일관된 사용자 경험을 제공합니다.
              </p>
              <p className="text-xs mt-2" style={{ color: 'var(--text-tertiary)' }}>{token.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Label */}
      <section className="mb-12">
        <h2 id="label" className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Label</h2>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>버튼, 입력 필드 라벨, UI 요소에 사용합니다.</p>
        <div className="space-y-3">
          {Object.entries(typography.scale.label).map(([size, token]) => (
            <div key={size} className="p-5" style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)', backgroundColor: 'var(--bg-elevated)' }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium" style={{ color: 'var(--brand-primary)' }}>label.{size}</span>
                <span className="text-xs font-mono" style={{ color: 'var(--text-placeholder)' }}>{token.fontSize}px / {token.lineHeight}px • {token.fontWeight}</span>
              </div>
              <p
                style={{ color: 'var(--text-primary)', fontSize: token.fontSize, lineHeight: `${token.lineHeight}px`, fontWeight: token.fontWeight }}
              >
                라벨 텍스트
              </p>
              <p className="text-xs mt-2" style={{ color: 'var(--text-tertiary)' }}>{token.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Numeric */}
      <section className="mb-12">
        <h2 id="numeric" className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Numeric</h2>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>금액, 통계 등 숫자 표시에 사용합니다. Spoqa Han Sans Neo 폰트 권장.</p>
        <div className="space-y-3">
          {Object.entries(typography.scale.numeric).map(([size, token]) => (
            <div key={size} className="p-5" style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)', backgroundColor: 'var(--bg-elevated)' }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium" style={{ color: 'var(--brand-primary)' }}>numeric.{size}</span>
                <span className="text-xs font-mono" style={{ color: 'var(--text-placeholder)' }}>{token.fontSize}px / {token.lineHeight}px • {token.fontWeight}</span>
              </div>
              <p
                style={{ color: 'var(--text-primary)', fontSize: token.fontSize, lineHeight: `${token.lineHeight}px`, fontWeight: token.fontWeight, fontFamily: 'var(--font-mono)' }}
              >
                ₩1,234,567
              </p>
              <p className="text-xs mt-2" style={{ color: 'var(--text-tertiary)' }}>{token.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Caption & Overline */}
      <section className="mb-12">
        <h2 id="caption" className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Caption & Overline</h2>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>부가 정보, 태그 등에 사용합니다.</p>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="p-5" style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)', backgroundColor: 'var(--bg-elevated)' }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium" style={{ color: 'var(--brand-primary)' }}>caption</span>
              <span className="text-xs font-mono" style={{ color: 'var(--text-placeholder)' }}>{typography.scale.caption.fontSize}px</span>
            </div>
            <p
              style={{ color: 'var(--text-primary)', fontSize: typography.scale.caption.fontSize, lineHeight: `${typography.scale.caption.lineHeight}px` }}
            >
              캡션 텍스트 • 부가 정보
            </p>
          </div>
          <div className="p-5" style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)', backgroundColor: 'var(--bg-elevated)' }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium" style={{ color: 'var(--brand-primary)' }}>overline</span>
              <span className="text-xs font-mono" style={{ color: 'var(--text-placeholder)' }}>{typography.scale.overline.fontSize}px</span>
            </div>
            <p
              className="uppercase tracking-wider"
              style={{ color: 'var(--text-primary)', fontSize: typography.scale.overline.fontSize, lineHeight: `${typography.scale.overline.lineHeight}px`, fontWeight: typography.scale.overline.fontWeight }}
            >
              라벨 텍스트 • 태그
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
