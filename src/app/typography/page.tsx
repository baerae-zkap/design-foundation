"use client";

import { Breadcrumb } from "@/components/Breadcrumb";
import { TokenDownload } from "@/components/TokenDownload";
import typographyJson from "../../../public/typography-tokens.json";
import { formatTokenName } from "@/utils/formatTokenName";

const primitive = typographyJson.typography.primitive;
const semantic = typographyJson.typography.semantic;

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
            <p className="text-2xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{primitive.fontFamily.base}</p>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>본문, 제목, UI 텍스트 전반</p>
            <div className="pt-4" style={{ borderTop: '1px solid var(--divider)' }}>
              <p className="text-xl" style={{ color: 'var(--text-primary)' }}>가나다라마바사 ABCDEFG</p>
            </div>
          </div>

          <div className="p-6" style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)', backgroundColor: 'var(--bg-elevated)' }}>
            <p className="text-sm mb-2" style={{ color: 'var(--text-tertiary)' }}>숫자 전용</p>
            <p className="text-2xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{primitive.fontFamily.numeric.base}</p>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>금액, 통계, 타이머 등 숫자</p>
            <div className="pt-4" style={{ borderTop: '1px solid var(--divider)' }}>
              <p className="text-xl font-mono" style={{ color: 'var(--text-primary)' }}>₩1,234,567</p>
            </div>
          </div>
        </div>
      </section>

      {/* Display */}
      <TypographySection id="display" title="Display" description="랜딩 페이지, 히어로 영역의 대형 타이틀에 적합합니다." category={semantic.display} />

      {/* Headline */}
      <TypographySection id="headline" title="Headline" description="페이지나 섹션의 주요 제목입니다. 정보 계층 구조의 최상위 레벨." category={semantic.headline} />

      {/* Title */}
      <TypographySection id="title" title="Title" description="카드, 리스트 아이템, 모달 등 컴포넌트 수준의 제목입니다." category={semantic.title} />

      {/* Body */}
      <TypographySection id="body" title="Body" description="일반 본문, 설명 텍스트에 사용합니다. 링크는 body + underline + brand color 조합으로 사용합니다." category={semantic.body} />

      {/* Label */}
      <TypographySection id="label" title="Label" description="UI 요소 텍스트입니다 (버튼, 탭, 칩, 라벨 등). 버튼은 label + fontWeight.semibold 조합으로 사용합니다." category={semantic.label} />

      {/* Caption */}
      <TypographySection id="caption" title="Caption" description="부가 정보, 타임스탬프, 메타 데이터 등 보조 텍스트입니다." category={semantic.caption} isTertiary />

      {/* Numeric */}
      <TypographySectionNumeric id="numeric" title="Numeric" description="금액, 수량, 통계 등 숫자 전용입니다. Spoqa Han Sans Neo 폰트 권장." category={semantic.numeric} />

      {/* Code */}
      <TypographySectionCode id="code" title="Code" description="코드, 계좌번호 등 모노스페이스가 필요한 텍스트입니다." category={semantic.code} />
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function resolveTypoValue(ref: string | number): number {
  if (typeof ref === "number") return ref;
  if (typeof ref === "string" && ref.startsWith("{primitive.")) {
    const path = ref.slice(11, -1).split(".");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let val: any = primitive;
    for (const key of path) val = val?.[key];
    return typeof val === "number" ? val : 0;
  }
  return 0;
}

interface TypoToken {
  fontSize: string | number;
  lineHeight: string | number;
  fontWeight: string | number;
  _comment?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TypographySection({ id, title, description, category, isTertiary }: { id: string; title: string; description: string; category: any; isTertiary?: boolean }) {
  return (
    <section className="mb-12">
      <h2 id={id} className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>{title}</h2>
      <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>{description}</p>
      <div className="space-y-3">
        {Object.entries(category).filter(([k]) => !k.startsWith("_")).map(([size, tokenRaw]) => {
          const token = tokenRaw as TypoToken;
          const fontSize = resolveTypoValue(token.fontSize);
          const lineHeight = resolveTypoValue(token.lineHeight);
          const fontWeight = resolveTypoValue(token.fontWeight);
          return (
            <div key={size} className="p-5" style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)', backgroundColor: 'var(--bg-elevated)' }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium" style={{ color: 'var(--brand-primary)' }}>{formatTokenName(id, size)}</span>
                <span className="text-xs font-mono" style={{ color: 'var(--text-placeholder)' }}>{fontSize}px / {lineHeight}px • {fontWeight}</span>
              </div>
              <p style={{ color: isTertiary ? 'var(--text-tertiary)' : 'var(--text-primary)', fontSize, lineHeight: `${lineHeight}px`, fontWeight }}>
                {isTertiary ? '캡션 텍스트 • 2024.01.01 • 부가 정보' : '디자인 시스템으로 일관된 경험을'}
              </p>
              <p className="text-xs mt-2" style={{ color: 'var(--text-tertiary)' }}>{token._comment || ''}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TypographySectionNumeric({ id, title, description, category }: { id: string; title: string; description: string; category: any }) {
  return (
    <section className="mb-12">
      <h2 id={id} className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>{title}</h2>
      <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>{description}</p>
      <div className="space-y-3">
        {Object.entries(category).filter(([k]) => !k.startsWith("_")).map(([size, tokenRaw]) => {
          const token = tokenRaw as TypoToken;
          const fontSize = resolveTypoValue(token.fontSize);
          const lineHeight = resolveTypoValue(token.lineHeight);
          const fontWeight = resolveTypoValue(token.fontWeight);
          return (
            <div key={size} className="p-5" style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)', backgroundColor: 'var(--bg-elevated)' }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium" style={{ color: 'var(--brand-primary)' }}>{formatTokenName(id, size)}</span>
                <span className="text-xs font-mono" style={{ color: 'var(--text-placeholder)' }}>{fontSize}px / {lineHeight}px • {fontWeight}</span>
              </div>
              <p style={{ color: 'var(--text-primary)', fontSize, lineHeight: `${lineHeight}px`, fontWeight, fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums' }}>
                ₩1,234,567
              </p>
              <p className="text-xs mt-2" style={{ color: 'var(--text-tertiary)' }}>{token._comment || ''}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TypographySectionCode({ id, title, description, category }: { id: string; title: string; description: string; category: any }) {
  return (
    <section className="mb-12">
      <h2 id={id} className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>{title}</h2>
      <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>{description}</p>
      <div className="space-y-3">
        {Object.entries(category).filter(([k]) => !k.startsWith("_")).map(([size, tokenRaw]) => {
          const token = tokenRaw as TypoToken;
          const fontSize = resolveTypoValue(token.fontSize);
          const lineHeight = resolveTypoValue(token.lineHeight);
          const fontWeight = resolveTypoValue(token.fontWeight);
          return (
            <div key={size} className="p-5" style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)', backgroundColor: 'var(--bg-elevated)' }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium" style={{ color: 'var(--brand-primary)' }}>{formatTokenName(id, size)}</span>
                <span className="text-xs font-mono" style={{ color: 'var(--text-placeholder)' }}>{fontSize}px / {lineHeight}px • {fontWeight}</span>
              </div>
              <code style={{ color: 'var(--text-primary)', fontSize, lineHeight: `${lineHeight}px`, fontWeight, fontFamily: 'monospace', backgroundColor: 'var(--bg-secondary)', padding: '2px 6px', borderRadius: 'var(--radius-sm)' }}>
                110-123-456789
              </code>
              <p className="text-xs mt-2" style={{ color: 'var(--text-tertiary)' }}>{token._comment || ''}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
