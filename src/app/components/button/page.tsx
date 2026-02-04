"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  iconOnly?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}

function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  iconOnly = false,
  children,
  onClick,
}: ButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const sizeStyles: Record<ButtonSize, React.CSSProperties & { iconSize: number }> = {
    xs: { padding: iconOnly ? "6px" : "6px 10px", fontSize: "12px", height: "28px", borderRadius: "var(--radius-sm)", iconSize: 14 },
    sm: { padding: iconOnly ? "8px" : "8px 12px", fontSize: "13px", height: "32px", borderRadius: "var(--radius-md)", iconSize: 16 },
    md: { padding: iconOnly ? "10px" : "10px 16px", fontSize: "14px", height: "40px", borderRadius: "var(--radius-md)", iconSize: 18 },
    lg: { padding: iconOnly ? "12px" : "12px 20px", fontSize: "15px", height: "48px", borderRadius: "var(--radius-md)", iconSize: 20 },
    xl: { padding: iconOnly ? "14px" : "14px 24px", fontSize: "16px", height: "56px", borderRadius: "var(--radius-lg)", iconSize: 22 },
  };

  const getVariantStyles = (v: ButtonVariant): React.CSSProperties => {
    const styles: Record<ButtonVariant, React.CSSProperties> = {
      primary: { backgroundColor: "var(--brand-primary)", color: "white", border: "none" },
      secondary: { backgroundColor: "var(--grey-97)", color: "var(--text-primary)", border: "none" },
      outline: { backgroundColor: "transparent", color: "var(--brand-primary)", border: "1px solid var(--brand-primary)" },
      ghost: { backgroundColor: "transparent", color: "var(--text-secondary)", border: "none" },
      danger: { backgroundColor: "#EF4444", color: "white", border: "none" },
    };

    return styles[v];
  };

  const getPressedStyles = (): React.CSSProperties => {
    if (disabled || loading) return {};
    if (isPressed) {
      return {
        transform: "scale(0.96)",
        opacity: 0.8,
      };
    }
    return {};
  };

  const { iconSize, ...sizeStyle } = sizeStyles[size];

  return (
    <button
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: size === "xs" ? 4 : size === "sm" ? 6 : 8,
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : isPressed ? 0.8 : 1,
        transition: "transform 0.1s ease-in-out, opacity 0.1s ease-in-out",
        outline: "none",
        width: fullWidth ? "100%" : iconOnly ? sizeStyle.height : "auto",
        minWidth: iconOnly ? sizeStyle.height : undefined,
        ...sizeStyle,
        ...getVariantStyles(variant),
        ...getPressedStyles(),
      }}
      disabled={disabled || loading}
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
    >
      {loading ? (
        <svg
          style={{ width: iconSize, height: iconSize, animation: "spin 1s linear infinite" }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
          <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
        </svg>
      ) : leftIcon ? (
        <span style={{ display: "flex", width: iconSize, height: iconSize }}>{leftIcon}</span>
      ) : null}
      {!iconOnly && children}
      {!loading && rightIcon && !iconOnly ? (
        <span style={{ display: "flex", width: iconSize, height: iconSize }}>{rightIcon}</span>
      ) : null}
    </button>
  );
}

// Icons
const PlusIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const ArrowRightIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const DownloadIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
  </svg>
);

const TrashIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
  </svg>
);

const ShareIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
    <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
  </svg>
);

export default function ButtonPage() {
  const [loading, setLoading] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleLoadingClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <Breadcrumb items={[{ label: "컴포넌트", href: "/" }, { label: "Button" }]} />

      <h1 className="text-3xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>Button</h1>
      <p className="mb-8 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        사용자 액션을 유도하는 핵심 인터랙션 요소입니다. 시각적 계층과 맥락에 맞는 variant를 선택하세요.
      </p>

      {/* Variants */}
      <section className="mb-12">
        <h2 id="variants" className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>Variants</h2>
        <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
          버튼의 중요도와 맥락에 따라 적절한 variant를 선택합니다. 버튼을 눌러 인터랙션을 확인해보세요.
        </p>
        <div className="p-6 flex flex-wrap gap-4" style={{ backgroundColor: "var(--bg-elevated)", borderRadius: "var(--radius-lg)", border: "1px solid var(--divider)" }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
        <div className="mt-4 p-4" style={{ backgroundColor: "var(--bg-secondary)", borderRadius: "var(--radius-md)" }}>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            <strong style={{ color: "var(--text-primary)" }}>사용 가이드:</strong><br />
            • <strong>Primary</strong>: 페이지당 1~2개, 가장 중요한 CTA<br />
            • <strong>Secondary</strong>: 보조 액션, Primary와 함께 사용<br />
            • <strong>Outline</strong>: 중요도가 낮지만 명확한 액션<br />
            • <strong>Ghost</strong>: 텍스트 링크처럼 가벼운 액션<br />
            • <strong>Danger</strong>: 삭제, 취소 등 주의가 필요한 액션
          </p>
        </div>
        <pre className="code-block mt-4">
          <code style={{ color: "var(--text-secondary)" }}>{`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>`}</code>
        </pre>
      </section>

      {/* Sizes */}
      <section className="mb-12">
        <h2 id="sizes" className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>Sizes</h2>
        <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
          5가지 크기를 제공합니다. UI 밀도와 터치 영역을 고려해 선택하세요.
        </p>
        <div className="p-6 flex flex-wrap items-end gap-4" style={{ backgroundColor: "var(--bg-elevated)", borderRadius: "var(--radius-lg)", border: "1px solid var(--divider)" }}>
          <div className="flex flex-col items-center gap-2">
            <Button size="xs">XSmall</Button>
            <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>28px</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button size="sm">Small</Button>
            <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>32px</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button size="md">Medium</Button>
            <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>40px</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button size="lg">Large</Button>
            <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>48px</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button size="xl">XLarge</Button>
            <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>56px</span>
          </div>
        </div>
        <pre className="code-block mt-4">
          <code style={{ color: "var(--text-secondary)" }}>{`<Button size="xs">XSmall</Button>  // 28px
<Button size="sm">Small</Button>   // 32px
<Button size="md">Medium</Button>  // 40px (default)
<Button size="lg">Large</Button>   // 48px
<Button size="xl">XLarge</Button>  // 56px`}</code>
        </pre>
      </section>

      {/* With Icons */}
      <section className="mb-12">
        <h2 id="icons" className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>With Icons</h2>
        <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
          아이콘과 함께 사용하여 의미를 명확히 전달할 수 있습니다.
        </p>
        <div className="p-6 space-y-4" style={{ backgroundColor: "var(--bg-elevated)", borderRadius: "var(--radius-lg)", border: "1px solid var(--divider)" }}>
          <div className="flex flex-wrap gap-4">
            <Button leftIcon={<PlusIcon />}>새로 만들기</Button>
            <Button variant="secondary" rightIcon={<ArrowRightIcon />}>다음 단계</Button>
            <Button variant="outline" leftIcon={<DownloadIcon />}>다운로드</Button>
            <Button variant="danger" leftIcon={<TrashIcon />}>삭제하기</Button>
          </div>
          <div className="pt-4" style={{ borderTop: "1px solid var(--divider)" }}>
            <p className="text-sm mb-3" style={{ color: "var(--text-tertiary)" }}>Icon Only Buttons</p>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary" size="sm" iconOnly><PlusIcon size={14} /></Button>
              <Button variant="secondary" size="md" iconOnly><ShareIcon size={18} /></Button>
              <Button variant="outline" size="md" iconOnly><PlusIcon size={18} /></Button>
              <Button variant="ghost" size="md" iconOnly><TrashIcon size={18} /></Button>
            </div>
          </div>
        </div>
        <pre className="code-block mt-4">
          <code style={{ color: "var(--text-secondary)" }}>{`<Button leftIcon={<PlusIcon />}>새로 만들기</Button>
<Button rightIcon={<ArrowRightIcon />}>다음 단계</Button>
<Button iconOnly><HeartIcon /></Button>`}</code>
        </pre>
      </section>

      {/* States */}
      <section className="mb-12">
        <h2 id="states" className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>States</h2>
        <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
          버튼의 다양한 상태를 지원합니다.
        </p>
        <div className="p-6 space-y-6" style={{ backgroundColor: "var(--bg-elevated)", borderRadius: "var(--radius-lg)", border: "1px solid var(--divider)" }}>
          <div>
            <p className="text-sm font-medium mb-3" style={{ color: "var(--text-primary)" }}>Disabled</p>
            <div className="flex flex-wrap gap-4">
              <Button disabled>Primary Disabled</Button>
              <Button variant="secondary" disabled>Secondary Disabled</Button>
              <Button variant="outline" disabled>Outline Disabled</Button>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium mb-3" style={{ color: "var(--text-primary)" }}>Loading</p>
            <div className="flex flex-wrap gap-4">
              <Button loading={loading} onClick={handleLoadingClick}>
                {loading ? "처리 중..." : "클릭하면 로딩"}
              </Button>
              <Button variant="secondary" loading>로딩 중...</Button>
              <Button variant="outline" loading>처리 중</Button>
            </div>
          </div>
        </div>
        <pre className="code-block mt-4">
          <code style={{ color: "var(--text-secondary)" }}>{`<Button disabled>Disabled</Button>
<Button loading>Loading...</Button>`}</code>
        </pre>
      </section>

      {/* Full Width */}
      <section className="mb-12">
        <h2 id="fullwidth" className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>Full Width</h2>
        <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
          모바일 화면이나 모달 하단에서 전체 너비 버튼이 필요할 때 사용합니다.
        </p>
        <div className="p-6 space-y-3" style={{ backgroundColor: "var(--bg-elevated)", borderRadius: "var(--radius-lg)", border: "1px solid var(--divider)", maxWidth: 400 }}>
          <Button fullWidth size="lg">회원가입</Button>
          <Button fullWidth variant="secondary">다른 방법으로 로그인</Button>
          <Button fullWidth variant="ghost">나중에 하기</Button>
        </div>
        <pre className="code-block mt-4">
          <code style={{ color: "var(--text-secondary)" }}>{`<Button fullWidth size="lg">회원가입</Button>`}</code>
        </pre>
      </section>

      {/* Button Group */}
      <section className="mb-12">
        <h2 id="group" className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>Button Group</h2>
        <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
          관련된 액션들을 그룹으로 묶어 사용합니다.
        </p>
        <div className="p-6 space-y-6" style={{ backgroundColor: "var(--bg-elevated)", borderRadius: "var(--radius-lg)", border: "1px solid var(--divider)" }}>
          <div>
            <p className="text-sm font-medium mb-3" style={{ color: "var(--text-primary)" }}>Actions</p>
            <div style={{ display: "flex", gap: 8 }}>
              <Button variant="secondary">취소</Button>
              <Button>저장</Button>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium mb-3" style={{ color: "var(--text-primary)" }}>Danger Confirmation</p>
            <div style={{ display: "flex", gap: 8 }}>
              <Button variant="ghost">취소</Button>
              <Button variant="danger" leftIcon={<TrashIcon />}>삭제</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="mb-12">
        <h2 id="interactive" className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>Interactive Demo</h2>
        <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
          다양한 인터랙션을 체험해보세요.
        </p>
        <div className="p-6 space-y-6" style={{ backgroundColor: "var(--bg-elevated)", borderRadius: "var(--radius-lg)", border: "1px solid var(--divider)" }}>
          <div>
            <p className="text-sm font-medium mb-3" style={{ color: "var(--text-primary)" }}>Click Counter</p>
            <div className="flex items-center gap-4">
              <Button onClick={() => setClickCount(c => c + 1)} leftIcon={<PlusIcon />}>
                증가
              </Button>
              <span className="text-2xl font-bold" style={{ color: "var(--brand-primary)", minWidth: 60, textAlign: "center" }}>
                {clickCount}
              </span>
              <Button variant="secondary" onClick={() => setClickCount(0)}>리셋</Button>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium mb-3" style={{ color: "var(--text-primary)" }}>Async Action</p>
            <Button
              loading={loading}
              onClick={handleLoadingClick}
              leftIcon={!loading ? <DownloadIcon /> : undefined}
            >
              {loading ? "다운로드 중..." : "파일 다운로드"}
            </Button>
          </div>
        </div>
      </section>

      {/* Accessibility */}
      <section className="mb-12">
        <h2 id="a11y" className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>Accessibility</h2>
        <div className="p-4" style={{ backgroundColor: "var(--bg-secondary)", borderRadius: "var(--radius-md)" }}>
          <ul className="text-sm space-y-2" style={{ color: "var(--text-secondary)" }}>
            <li>• 최소 터치 영역 44×44px (모바일 권장)</li>
            <li>• disabled 상태에서 <code style={{ backgroundColor: "var(--grey-95)", padding: "2px 6px", borderRadius: 4 }}>aria-disabled="true"</code> 적용</li>
            <li>• loading 상태에서 <code style={{ backgroundColor: "var(--grey-95)", padding: "2px 6px", borderRadius: 4 }}>aria-busy="true"</code> 적용</li>
            <li>• iconOnly 버튼에는 <code style={{ backgroundColor: "var(--grey-95)", padding: "2px 6px", borderRadius: 4 }}>aria-label</code> 필수</li>
            <li>• 색상 대비 WCAG AA 이상 준수</li>
          </ul>
        </div>
      </section>

      {/* Props */}
      <section className="mb-12">
        <h2 id="props" className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>Props</h2>
        <div className="overflow-x-auto" style={{ backgroundColor: "var(--bg-elevated)", borderRadius: "var(--radius-lg)", border: "1px solid var(--divider)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <th className="text-left p-4 text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Prop</th>
                <th className="text-left p-4 text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Type</th>
                <th className="text-left p-4 text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Default</th>
                <th className="text-left p-4 text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                { prop: "variant", type: '"primary" | "secondary" | "outline" | "ghost" | "danger"', default: '"primary"', desc: "버튼 스타일 유형" },
                { prop: "size", type: '"xs" | "sm" | "md" | "lg" | "xl"', default: '"md"', desc: "버튼 크기" },
                { prop: "disabled", type: "boolean", default: "false", desc: "비활성화 상태" },
                { prop: "loading", type: "boolean", default: "false", desc: "로딩 상태 (스피너 표시)" },
                { prop: "fullWidth", type: "boolean", default: "false", desc: "전체 너비 사용" },
                { prop: "leftIcon", type: "ReactNode", default: "-", desc: "왼쪽 아이콘" },
                { prop: "rightIcon", type: "ReactNode", default: "-", desc: "오른쪽 아이콘" },
                { prop: "iconOnly", type: "boolean", default: "false", desc: "아이콘만 표시 (정사각형)" },
                { prop: "onClick", type: "() => void", default: "-", desc: "클릭 핸들러" },
              ].map((row, i, arr) => (
                <tr key={row.prop} style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--divider)" : "none" }}>
                  <td className="p-4 text-sm font-mono" style={{ color: "var(--brand-primary)" }}>{row.prop}</td>
                  <td className="p-4 text-sm font-mono" style={{ color: "var(--text-tertiary)" }}>{row.type}</td>
                  <td className="p-4 text-sm font-mono" style={{ color: "var(--text-tertiary)" }}>{row.default}</td>
                  <td className="p-4 text-sm" style={{ color: "var(--text-secondary)" }}>{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
