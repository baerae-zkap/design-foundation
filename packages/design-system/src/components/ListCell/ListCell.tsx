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
import { colors, palette } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';
import { usePressable } from '../../utils/usePressable';
import { transitions } from '../../utils/styles';

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
    paddingY: spacing.primitive[2],
    paddingX: spacing.primitive[4],
    titleSize: typography.fontSize.sm,
    subtitleSize: typography.fontSize.xs,
    gap: spacing.primitive[3],
  },
  medium: {
    minHeight: 56,
    paddingY: spacing.primitive[3],
    paddingX: spacing.primitive[4],
    titleSize: typography.fontSize.md,
    subtitleSize: typography.fontSize.sm,
    gap: spacing.primitive[3],
  },
  large: {
    minHeight: 72,
    paddingY: spacing.primitive[4],
    paddingX: spacing.primitive[4],
    titleSize: typography.fontSize.md,
    subtitleSize: typography.fontSize.sm,
    gap: spacing.primitive[4],
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
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const sizeStyle = sizeConfig[size];
    const isInteractive = !!onClick && !disabled;

    const { isPressed, isHovered, handlers } = usePressable<HTMLDivElement>({
      disabled: !isInteractive,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
    });

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: sizeStyle.gap,
      minHeight: sizeStyle.minHeight,
      padding: `${sizeStyle.paddingY}px ${sizeStyle.paddingX}px`,
      backgroundColor: isHovered && isInteractive ? 'rgba(0,0,0,0.02)' : 'transparent',
      cursor: isInteractive ? 'pointer' : 'default',
      opacity: disabled ? 0.5 : 1,
      borderBottom: divider ? `1px solid ${colors.border.base.default}` : 'none',
      transition: transitions.background,
      ...style,
    };

    const contentStyle: React.CSSProperties = {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    };

    const titleStyle: React.CSSProperties = {
      fontSize: sizeStyle.titleSize,
      fontWeight: typography.fontWeight.medium,
      color: colors.content.base.default,
      lineHeight: 1.4,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    };

    const subtitleStyle: React.CSSProperties = {
      fontSize: sizeStyle.subtitleSize,
      fontWeight: typography.fontWeight.regular,
      color: colors.content.base.secondary,
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

    return (
      <div
        ref={ref}
        role={isInteractive ? 'button' : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick();
          }
        }}
        style={containerStyle}
        {...handlers}
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
          <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', color: colors.content.disabled.default }}>
            {trailing}
          </div>
        )}
      </div>
    );
  }
);

ListCell.displayName = 'ListCell';
