/**
 * ListCard Component (Web)
 *
 * @description 리스트 형태의 카드 컴포넌트입니다. 썸네일, 콘텐츠, 액션 영역으로 구성됩니다.
 * @see docs/components/ListCard.md - AI용 상세 가이드
 *
 * @example
 * <ListCard
 *   thumbnail={<img src="product.jpg" />}
 *   title="상품명"
 *   subtitle="상품 설명"
 *   meta="₩59,000"
 *   onClick={() => {}}
 * />
 */

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

export type ListCardSize = 'small' | 'medium' | 'large';
export type ListCardVariant = 'elevated' | 'outlined' | 'filled';

export interface ListCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** 카드 스타일 */
  variant?: ListCardVariant;
  /** 크기 */
  size?: ListCardSize;
  /** 좌측 썸네일 영역 */
  thumbnail?: ReactNode;
  /** 메인 타이틀 */
  title: ReactNode;
  /** 서브타이틀 */
  subtitle?: ReactNode;
  /** 메타 정보 (가격, 날짜 등) */
  meta?: ReactNode;
  /** 우측 액션 영역 */
  action?: ReactNode;
  /** 상단 뱃지 영역 */
  badges?: ReactNode;
  /** 클릭 핸들러 */
  onClick?: () => void;
  /** 비활성화 */
  disabled?: boolean;
}

// Size configurations
const sizeConfig: Record<ListCardSize, {
  padding: number;
  thumbnailSize: number;
  gap: number;
  titleSize: number;
  subtitleSize: number;
  metaSize: number;
}> = {
  small: {
    padding: 12,      // primitive.3
    thumbnailSize: 56,
    gap: 12,          // primitive.3
    titleSize: 14,
    subtitleSize: 12,
    metaSize: 13,
  },
  medium: {
    padding: 16,      // primitive.4
    thumbnailSize: 80,
    gap: 12,          // primitive.3
    titleSize: 15,
    subtitleSize: 13,
    metaSize: 14,
  },
  large: {
    padding: 16,      // primitive.4
    thumbnailSize: 100,
    gap: 16,          // primitive.4
    titleSize: 16,
    subtitleSize: 14,
    metaSize: 15,
  },
};

// Variant styles
const variantStyles: Record<ListCardVariant, React.CSSProperties> = {
  elevated: {
    backgroundColor: 'white',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
    border: 'none',
  },
  outlined: {
    backgroundColor: 'white',
    boxShadow: 'none',
    border: '1px solid #e2e8f0', // border.base.default
  },
  filled: {
    backgroundColor: '#f8fafc', // surface.base.alternative
    boxShadow: 'none',
    border: 'none',
  },
};

export const ListCard = forwardRef<HTMLDivElement, ListCardProps>(
  (
    {
      variant = 'elevated',
      size = 'medium',
      thumbnail,
      title,
      subtitle,
      meta,
      action,
      badges,
      onClick,
      disabled = false,
      style,
      ...props
    },
    ref
  ) => {
    const sizeStyle = sizeConfig[size];
    const variantStyle = variantStyles[variant];
    const isInteractive = !!onClick && !disabled;

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'flex-start',
      gap: sizeStyle.gap,
      padding: sizeStyle.padding,
      borderRadius: 12, // radius.semantic.card.sm
      cursor: isInteractive ? 'pointer' : 'default',
      opacity: disabled ? 0.5 : 1,
      transition: 'all 0.15s ease',
      ...variantStyle,
      ...style,
    };

    const thumbnailContainerStyle: React.CSSProperties = {
      width: sizeStyle.thumbnailSize,
      height: sizeStyle.thumbnailSize,
      borderRadius: 8, // primitive.sm
      overflow: 'hidden',
      flexShrink: 0,
      backgroundColor: '#f1f5f9', // surface.base.container
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };

    const contentStyle: React.CSSProperties = {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 4, // primitive.1
    };

    const titleStyle: React.CSSProperties = {
      fontSize: sizeStyle.titleSize,
      fontWeight: 600,
      color: '#334155', // content.base.default
      lineHeight: 1.4,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
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

    const metaStyle: React.CSSProperties = {
      fontSize: sizeStyle.metaSize,
      fontWeight: 700,
      color: '#334155', // content.base.default
      marginTop: 4,
    };

    const handleClick = () => {
      if (isInteractive) {
        onClick();
      }
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      if (isInteractive) {
        if (variant === 'filled') {
          e.currentTarget.style.backgroundColor = '#f1f5f9';
        } else {
          e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.02)';
        }
      }
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      e.currentTarget.style.backgroundColor = variant === 'filled' ? '#f8fafc' : 'white';
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
        {/* Thumbnail */}
        {thumbnail && (
          <div style={thumbnailContainerStyle}>
            {thumbnail}
          </div>
        )}

        {/* Content */}
        <div style={contentStyle}>
          {/* Badges */}
          {badges && (
            <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
              {badges}
            </div>
          )}

          <div style={titleStyle}>{title}</div>
          {subtitle && <div style={subtitleStyle}>{subtitle}</div>}
          {meta && <div style={metaStyle}>{meta}</div>}
        </div>

        {/* Action */}
        {action && (
          <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
            {action}
          </div>
        )}
      </div>
    );
  }
);

ListCard.displayName = 'ListCard';
