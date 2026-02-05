/**
 * ListCell Component (Web)
 *
 * @description 리스트 아이템을 표시하는 수평 레이아웃 컴포넌트입니다.
 * @see docs/components/ListCell.md - AI용 상세 가이드
 *
 * @example
 * <ListCell
 *   leading={<Avatar src="user.jpg" />}
 *   title="홍길동"
 *   subtitle="hong@example.com"
 *   trailing={<ChevronRight />}
 *   onClick={() => {}}
 * />
 */

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

export type ListCellSize = 'small' | 'medium' | 'large';

export interface ListCellProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** 좌측 영역 (아이콘, 아바타 등) */
  leading?: ReactNode;
  /** 메인 타이틀 */
  title: ReactNode;
  /** 서브타이틀 (선택) */
  subtitle?: ReactNode;
  /** 우측 영역 (화살표, 버튼, 값 등) */
  trailing?: ReactNode;
  /** 크기 */
  size?: ListCellSize;
  /** 클릭 핸들러 (있으면 인터랙티브) */
  onClick?: () => void;
  /** 비활성화 */
  disabled?: boolean;
  /** 하단 구분선 표시 */
  divider?: boolean;
}

// Size configurations (from Foundation tokens)
const sizeConfig: Record<ListCellSize, {
  minHeight: number;
  paddingY: number;
  paddingX: number;
  titleSize: number;
  subtitleSize: number;
  gap: number;
}> = {
  small: {
    minHeight: 44,
    paddingY: 8,   // primitive.2
    paddingX: 16,  // primitive.4
    titleSize: 14,
    subtitleSize: 12,
    gap: 12,       // primitive.3
  },
  medium: {
    minHeight: 56,
    paddingY: 12,  // primitive.3
    paddingX: 16,  // primitive.4
    titleSize: 15,
    subtitleSize: 13,
    gap: 12,       // primitive.3
  },
  large: {
    minHeight: 72,
    paddingY: 16,  // primitive.4
    paddingX: 16,  // primitive.4
    titleSize: 16,
    subtitleSize: 14,
    gap: 16,       // primitive.4
  },
};

export const ListCell = forwardRef<HTMLDivElement, ListCellProps>(
  (
    {
      leading,
      title,
      subtitle,
      trailing,
      size = 'medium',
      onClick,
      disabled = false,
      divider = false,
      style,
      ...props
    },
    ref
  ) => {
    const sizeStyle = sizeConfig[size];
    const isInteractive = !!onClick && !disabled;

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: sizeStyle.gap,
      minHeight: sizeStyle.minHeight,
      padding: `${sizeStyle.paddingY}px ${sizeStyle.paddingX}px`,
      backgroundColor: 'transparent',
      cursor: isInteractive ? 'pointer' : 'default',
      opacity: disabled ? 0.5 : 1,
      borderBottom: divider ? '1px solid #e2e8f0' : 'none', // border.base.default
      transition: 'background-color 0.15s ease',
      ...style,
    };

    const contentStyle: React.CSSProperties = {
      flex: 1,
      minWidth: 0, // Enable text truncation
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    };

    const titleStyle: React.CSSProperties = {
      fontSize: sizeStyle.titleSize,
      fontWeight: 500,
      color: '#334155', // content.base.default
      lineHeight: 1.4,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    };

    const subtitleStyle: React.CSSProperties = {
      fontSize: sizeStyle.subtitleSize,
      fontWeight: 400,
      color: '#64748b', // content.base.secondary
      lineHeight: 1.4,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    };

    const handleClick = () => {
      if (isInteractive) {
        onClick();
      }
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      if (isInteractive) {
        e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.02)';
      }
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      e.currentTarget.style.backgroundColor = 'transparent';
    };

    return (
      <div
        ref={ref}
        role={isInteractive ? 'button' : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onKeyDown={(e) => {
          if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick();
          }
        }}
        style={containerStyle}
        {...props}
      >
        {/* Leading */}
        {leading && (
          <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
            {leading}
          </div>
        )}

        {/* Content */}
        <div style={contentStyle}>
          <div style={titleStyle}>{title}</div>
          {subtitle && <div style={subtitleStyle}>{subtitle}</div>}
        </div>

        {/* Trailing */}
        {trailing && (
          <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', color: '#94a3b8' }}>
            {trailing}
          </div>
        )}
      </div>
    );
  }
);

ListCell.displayName = 'ListCell';
