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
 *   description="hong@example.com"
 *   trailing={<ChevronRight />}
 *   onClick={() => {}}
 * />
 */

import { useState, forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cssVarColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';
import { borderWidth, opacity as opacityTokens } from '../../tokens/general';
import { usePressable } from '../../utils/usePressable';
import { transitions } from '../../utils/styles';

export type ListCellSize = 'small' | 'medium' | 'large';

export interface ListCellProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** 좌측 영역 (아이콘, 아바타 등) */
  leading?: ReactNode;
  /** 메인 타이틀 */
  title: ReactNode;
  /** 설명 텍스트 (선택) */
  description?: ReactNode;
  /** 우측 영역 (화살표, 버튼, 값 등) */
  trailing?: ReactNode;
  /** 크기 */
  size?: ListCellSize;
  /** 수직 정렬 */
  verticalAlign?: 'top' | 'center';
  /** 클릭 핸들러 (있으면 인터랙티브) */
  onClick?: () => void;
  /** 하단 구분선 표시 */
  divider?: boolean;
  /** 우측에 화살표(chevron) 아이콘 표시 */
  withArrow?: boolean;
}

// Size configurations (from Foundation tokens)
const sizeConfig: Record<ListCellSize, {
  minHeight: number;
  paddingY: number;
  paddingX: number;
  titleSize: number;
  descriptionSize: number;
  gap: number;
}> = {
  small: {
    minHeight: spacing.component.listCell.minHeight.sm,
    paddingY: spacing.primitive[2],
    paddingX: spacing.primitive[4],
    titleSize: typography.fontSize.sm,
    descriptionSize: typography.fontSize.xs,
    gap: spacing.primitive[3],
  },
  medium: {
    minHeight: spacing.component.listCell.minHeight.md,
    paddingY: spacing.primitive[3],
    paddingX: spacing.primitive[4],
    titleSize: typography.fontSize.md,
    descriptionSize: typography.fontSize.sm,
    gap: spacing.primitive[3],
  },
  large: {
    minHeight: spacing.component.listCell.minHeight.lg,
    paddingY: spacing.primitive[4],
    paddingX: spacing.primitive[4],
    titleSize: typography.fontSize.md,
    descriptionSize: typography.fontSize.sm,
    gap: spacing.primitive[4],
  },
};

export const ListCell = forwardRef<HTMLDivElement, ListCellProps>(
  (
    {
      leading,
      title,
      description,
      trailing,
      size = 'medium',
      verticalAlign = 'center',
      onClick,
      divider = false,
      withArrow = false,
      style,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      onMouseEnter,
      onFocus,
      onBlur,
      onKeyDown: externalKeyDown,
      onKeyUp: externalKeyUp,
      ...props
    },
    ref
  ) => {
    const sizeStyle = sizeConfig[size];
    const isInteractive = !!onClick;

    const { isPressed, isHovered, handlers } = usePressable<HTMLDivElement>({
      disabled: !isInteractive,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      onMouseEnter,
    });

    const [isFocusVisible, setIsFocusVisible] = useState(false);

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: verticalAlign === 'top' ? 'flex-start' : 'center',
      gap: sizeStyle.gap,
      minHeight: sizeStyle.minHeight,
      padding: `${sizeStyle.paddingY}px ${sizeStyle.paddingX}px`,
      opacity: isPressed && isInteractive ? opacityTokens.pressed : 1,
      cursor: isInteractive ? 'pointer' : 'default',
      outline: isFocusVisible && isInteractive ? `${borderWidth.strong}px solid ${cssVarColors.content.brand.default}` : 'none',
      outlineOffset: 2,
      borderBottom: divider ? `${borderWidth.default}px solid ${cssVarColors.border.solid.alternative}` : 'none',
      transition: 'opacity 150ms ease',
      ...style,
    };

    const contentStyle: React.CSSProperties = {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: spacing.primitive[1],
    };

    const titleStyle: React.CSSProperties = {
      fontSize: sizeStyle.titleSize,
      fontWeight: typography.fontWeight.medium,
      color: cssVarColors.content.base.default,
      lineHeight: 1.4,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    };

    const descriptionStyle: React.CSSProperties = {
      fontSize: sizeStyle.descriptionSize,
      fontWeight: typography.fontWeight.regular,
      color: cssVarColors.content.base.secondary,
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
          if (isInteractive && e.key === 'Enter') {
            e.preventDefault();
            onClick!();
          }
          if (isInteractive && e.key === ' ') {
            e.preventDefault();
          }
          externalKeyDown?.(e);
        }}
        onKeyUp={(e) => {
          if (isInteractive && e.key === ' ') {
            onClick!();
          }
          externalKeyUp?.(e);
        }}
        onFocus={(e) => {
          try {
            if (e.target.matches(':focus-visible')) {
              setIsFocusVisible(true);
            }
          } catch {
            // Safe fallback for older browsers
          }
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocusVisible(false);
          onBlur?.(e);
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
          {description && <div style={descriptionStyle}>{description}</div>}
        </div>

        {/* Trailing */}
        {(trailing || withArrow) && (
          <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: spacing.primitive[1], color: cssVarColors.content.base.neutral }}>
            {trailing}
            {withArrow && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            )}
          </div>
        )}
      </div>
    );
  }
);

ListCell.displayName = 'ListCell';
