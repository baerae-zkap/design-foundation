/**
 * FilterButton Component (Web)
 *
 * @description 컴팩트한 필터 선택 컨트롤입니다. 레이블 + 트레일링 셰브론을 표시하며, 선택(active) 상태에 따라 시각적 피드백이 달라집니다.
 * @see docs/components/FilterButton.md - AI용 상세 가이드
 *
 * @example
 * <FilterButton
 *   active={isActive}
 *   activeLabel="서울"
 *   onClick={() => openDropdown()}
 * >
 *   지역
 * </FilterButton>
 */

import { forwardRef, type ButtonHTMLAttributes, type CSSProperties, type ReactNode } from 'react';
import { cssVarColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';
import { opacity, borderWidth } from '../../tokens/general';
import { usePressable } from '../../utils/usePressable';

export type FilterButtonVariant = 'filled' | 'outlined';
export type FilterButtonSize = 'small' | 'medium' | 'large';

export interface FilterButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  /** 스타일 변형 - filled(채움), outlined(테두리) */
  variant?: FilterButtonVariant;
  /** 크기 */
  size?: FilterButtonSize;
  /** 선택/활성 상태 */
  active?: boolean;
  /** 활성 상태일 때 표시할 레이블 (children 대체) */
  activeLabel?: ReactNode;
  /** 드롭다운 열림 상태 (셰브론 180도 회전) */
  expanded?: boolean;
  /** 비활성화 */
  disabled?: boolean;
  /** 레이블 텍스트 */
  children: ReactNode;
}

// Size configurations
const sizeConfig: Record<FilterButtonSize, {
  height: number;
  fontSize: number;
  fontSizeVal: number;
  paddingLeft: number;
  paddingRight: number;
  gap: number;
  iconSize: number;
  borderRadius: number;
}> = {
  small: {
    height: spacing.component.filterButton.height.sm,
    fontSize: typography.fontSize.compact,
    fontSizeVal: typography.fontSize.compact,
    paddingLeft: spacing.component.filterButton.paddingLeft.sm,
    paddingRight: spacing.component.filterButton.paddingRight.sm,
    gap: spacing.component.filterButton.gap.sm,
    iconSize: spacing.component.filterButton.iconSize.sm,
    borderRadius: radius.component.filterButton.sm,
  },
  medium: {
    height: spacing.component.filterButton.height.md,
    fontSize: typography.fontSize.sm,
    fontSizeVal: typography.fontSize.sm,
    paddingLeft: spacing.component.filterButton.paddingLeft.md,
    paddingRight: spacing.component.filterButton.paddingRight.md,
    gap: spacing.component.filterButton.gap.md,
    iconSize: spacing.component.filterButton.iconSize.md,
    borderRadius: radius.component.filterButton.md,
  },
  large: {
    height: spacing.component.filterButton.height.lg,
    fontSize: typography.fontSize.md,
    fontSizeVal: typography.fontSize.md,
    paddingLeft: spacing.component.filterButton.paddingLeft.lg,
    paddingRight: spacing.component.filterButton.paddingRight.lg,
    gap: spacing.component.filterButton.gap.lg,
    iconSize: spacing.component.filterButton.iconSize.lg,
    borderRadius: radius.component.filterButton.lg,
  },
};

// Color configurations
const colorConfig: Record<FilterButtonVariant, {
  bg: string;
  bgPressed: string;
  bgActive: string;
  bgActivePressed: string;
  text: string;
  textActive: string;
  border: string | null;
  borderActive: string | null;
}> = {
  filled: {
    bg: cssVarColors.surface.base.container,
    bgPressed: cssVarColors.surface.base.containerPressed,
    bgActive: cssVarColors.content.base.default,
    bgActivePressed: cssVarColors.surface.base.defaultPressed,
    text: cssVarColors.content.base.default,
    textActive: cssVarColors.content.base.onColor,
    border: null,
    borderActive: null,
  },
  outlined: {
    bg: 'transparent',
    bgPressed: cssVarColors.fill.alternative,
    bgActive: cssVarColors.surface.brand.secondary,
    bgActivePressed: cssVarColors.surface.brand.secondaryPressed,
    text: cssVarColors.content.base.default,
    textActive: cssVarColors.content.brand.default,
    border: cssVarColors.border.solid.default,
    borderActive: cssVarColors.border.brand.default,
  },
};

export const FilterButton = forwardRef<HTMLButtonElement, FilterButtonProps>(
  (
    {
      variant = 'filled',
      size = 'medium',
      active = false,
      activeLabel,
      expanded = false,
      disabled = false,
      children,
      style,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      onMouseEnter,
      ...props
    },
    ref
  ) => {
    const { isPressed, isHovered, handlers } = usePressable<HTMLButtonElement>({
      disabled,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      onMouseEnter,
    });

    const sizeStyle = sizeConfig[size];
    const colorStyle = colorConfig[variant];

    const getBackgroundColor = (): string => {
      if (active) {
        if ((isPressed || isHovered) && !disabled) return colorStyle.bgActivePressed;
        return colorStyle.bgActive;
      }
      if ((isPressed || isHovered) && !disabled) return colorStyle.bgPressed;
      return colorStyle.bg;
    };

    const getTextColor = (): string => {
      if (disabled) return cssVarColors.content.disabled.default;
      return active ? colorStyle.textActive : colorStyle.text;
    };

    const getBorderColor = (): string | undefined => {
      if (!colorStyle.border) return undefined;
      return active ? (colorStyle.borderActive ?? undefined) : colorStyle.border;
    };

    const displayLabel = active && activeLabel !== undefined ? activeLabel : children;

    const buttonStyle: CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: sizeStyle.gap,
      height: sizeStyle.height,
      paddingLeft: sizeStyle.paddingLeft,
      paddingRight: sizeStyle.paddingRight,
      fontSize: sizeStyle.fontSize,
      fontWeight: active ? typography.fontWeight.semibold : typography.fontWeight.medium,
      color: getTextColor(),
      backgroundColor: getBackgroundColor(),
      border: colorStyle.border
        ? `${borderWidth.default}px solid ${getBorderColor()}`
        : 'none',
      borderRadius: sizeStyle.borderRadius,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? opacity.disabled : 1,
      transition: 'background-color 150ms ease, border-color 150ms ease, color 150ms ease',
      whiteSpace: 'nowrap',
      ...style,
    };

    const chevronStyle: CSSProperties = {
      width: sizeStyle.iconSize,
      height: sizeStyle.iconSize,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      transition: 'transform 200ms ease',
      transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        aria-pressed={active || undefined}
        aria-expanded={expanded || undefined}
        aria-disabled={disabled}
        style={buttonStyle}
        {...handlers}
        {...props}
      >
        {/* Label */}
        <span style={{ flex: '0 1 auto', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {displayLabel}
        </span>

        {/* Trailing chevron */}
        <span style={chevronStyle}>
          <svg
            width={sizeStyle.iconSize * 0.75}
            height={sizeStyle.iconSize * 0.75}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>
    );
  }
);

FilterButton.displayName = 'FilterButton';
