import Link from "next/link";

const foundations = [
  {
    href: "/colors",
    title: "Colors",
    description: "Palette와 Semantic 컬러 토큰",
  },
  {
    href: "/typography",
    title: "Typography",
    description: "폰트, 사이즈, 행간 시스템",
  },
  {
    href: "/spacing",
    title: "Spacing",
    description: "4px 그리드 기반 간격 시스템",
  },
  {
    href: "/radius",
    title: "Radius",
    description: "모서리 라운딩 토큰",
  },
  {
    href: "/shadow",
    title: "Shadow",
    description: "Elevation 기반 그림자 시스템",
  },
];

export default function Home() {
  return (
    <div>
      <h1
        className="text-3xl font-bold mb-4"
        style={{ color: 'var(--text-primary)' }}
      >
        ZKAP Design System
      </h1>
      <p
        className="mb-8 leading-relaxed text-lg"
        style={{ color: 'var(--text-secondary)' }}
      >
        ZKAP 제품군의 디자인 일관성을 위한 파운데이션 토큰입니다.
        <br />
        토큰 값을 클릭하면 복사할 수 있습니다.
      </p>

      {/* Quick Info */}
      <div
        className="grid sm:grid-cols-2 gap-4 mb-10"
        style={{ gap: 'var(--space-4)' }}
      >
        <div
          className="rounded-xl"
          style={{
            backgroundColor: 'var(--bg-elevated)',
            border: '1px solid var(--divider)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-5)',
          }}
        >
          <h3
            className="text-sm font-semibold uppercase tracking-wider mb-3"
            style={{ color: 'var(--text-tertiary)' }}
          >
            Font Family
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>기본 텍스트</span>
              <span className="font-medium" style={{ color: 'var(--text-primary)' }}>Pretendard</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>숫자 전용</span>
              <span className="font-medium" style={{ color: 'var(--text-primary)' }}>Spoqa Han Sans Neo</span>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: 'var(--bg-elevated)',
            border: '1px solid var(--divider)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-5)',
          }}
        >
          <h3
            className="text-sm font-semibold uppercase tracking-wider mb-3"
            style={{ color: 'var(--text-tertiary)' }}
          >
            Base Unit
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Spacing</span>
              <span className="font-medium" style={{ color: 'var(--text-primary)' }}>4px grid</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Typography</span>
              <span className="font-medium" style={{ color: 'var(--text-primary)' }}>100% base</span>
            </div>
          </div>
        </div>
      </div>

      {/* Typography Scale */}
      <section className="mb-10">
        <h2
          className="text-xl font-bold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          타이포그래피 스케일
        </h2>
        <div
          style={{
            backgroundColor: 'var(--bg-elevated)',
            border: '1px solid var(--divider)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--divider)' }}>
                <th className="text-left p-4 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Scale</th>
                <th className="text-left p-4 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Size</th>
                <th className="text-left p-4 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Line Height</th>
                <th className="text-left p-4 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Weight</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'displayLarge', size: 32, lineHeight: 40, weight: 700, category: 'Display' },
                { name: 'displayMedium', size: 28, lineHeight: 36, weight: 700 },
                { name: 'displaySmall', size: 24, lineHeight: 32, weight: 700 },
                { name: 'title1', size: 36, lineHeight: 44, weight: 700, category: 'Title' },
                { name: 'title2', size: 32, lineHeight: 40, weight: 700 },
                { name: 'title3', size: 28, lineHeight: 36, weight: 700 },
                { name: 'title4', size: 24, lineHeight: 32, weight: 700 },
                { name: 'subtitle1', size: 20, lineHeight: 28, weight: 600, category: 'Subtitle' },
                { name: 'subtitle2', size: 18, lineHeight: 26, weight: 600 },
                { name: 'subtitle3', size: 16, lineHeight: 24, weight: 600 },
                { name: 'subtitle4', size: 14, lineHeight: 20, weight: 600 },
                { name: 'headingLarge', size: 24, lineHeight: 32, weight: 600, category: 'Heading' },
                { name: 'headingMedium', size: 20, lineHeight: 28, weight: 600 },
                { name: 'headingSmall', size: 18, lineHeight: 26, weight: 600 },
                { name: 'bodyExtraLarge', size: 18, lineHeight: 28, weight: 400, category: 'Body' },
                { name: 'bodyLarge', size: 16, lineHeight: 24, weight: 400 },
                { name: 'bodyMedium', size: 14, lineHeight: 20, weight: 400 },
                { name: 'bodySmall', size: 13, lineHeight: 18, weight: 400 },
                { name: 'bodyExtraSmall', size: 12, lineHeight: 16, weight: 400 },
                { name: 'labelLarge', size: 16, lineHeight: 24, weight: 500, category: 'Label' },
                { name: 'labelMedium', size: 14, lineHeight: 20, weight: 500 },
                { name: 'labelSmall', size: 12, lineHeight: 16, weight: 500 },
                { name: 'numericExtraLarge', size: 32, lineHeight: 40, weight: 600, category: 'Numeric' },
                { name: 'numericLarge', size: 24, lineHeight: 32, weight: 600 },
                { name: 'numericMedium', size: 18, lineHeight: 26, weight: 600 },
                { name: 'numericSmall', size: 14, lineHeight: 20, weight: 600 },
                { name: 'caption', size: 12, lineHeight: 16, weight: 400, category: 'Etc' },
                { name: 'overline', size: 11, lineHeight: 14, weight: 500 },
              ].map((row, i, arr) => (
                <tr key={row.name} style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--divider)' : 'none' }}>
                  <td className="p-4 text-sm font-mono" style={{ color: 'var(--brand-primary)' }}>{row.name}</td>
                  <td className="p-4 text-sm" style={{ color: 'var(--text-secondary)' }}>{row.size}px</td>
                  <td className="p-4 text-sm" style={{ color: 'var(--text-secondary)' }}>{row.lineHeight}px</td>
                  <td className="p-4 text-sm" style={{ color: 'var(--text-secondary)' }}>{row.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Foundations */}
      <section>
        <h2
          className="text-xl font-bold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          파운데이션
        </h2>
        <div className="space-y-2">
          {foundations.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-between group transition-colors"
              style={{
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--divider)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-4)',
              }}
            >
              <div>
                <h3
                  className="font-semibold transition-colors group-hover:text-blue-500"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm mt-0.5"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  {item.description}
                </p>
              </div>
              <svg
                className="w-5 h-5 transition-colors"
                style={{ color: 'var(--grey-300)' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </section>

      {/* Token Structure */}
      <section style={{ marginTop: 'var(--space-10)' }}>
        <h2
          className="text-xl font-bold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          토큰 구조
        </h2>
        <p
          className="mb-4"
          style={{ color: 'var(--text-secondary)' }}
        >
          Primitive(기본값)와 Semantic(의미 기반) 2단계 레이어로 구성됩니다.
        </p>
        <pre className="code-block">
          <code style={{ color: 'var(--text-secondary)' }}>{`// Primitive → Semantic 참조 구조
palette.blue.500  →  brand.primary
palette.grey.900  →  text.text1
spacing.4         →  inset.sm`}</code>
        </pre>
      </section>

    </div>
  );
}
