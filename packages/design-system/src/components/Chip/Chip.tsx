/**
 * Chip Component (Web)
 *
 * @description 필터, 태그, 선택 등을 나타내는 컴팩트한 인터랙티브 요소입니다. 아바타, 아이콘, 닫기 버튼을 지원합니다.
 * @see docs/components/Chip.md - AI용 상세 가이드
 *
 * @example
 * <Chip
 *   color="primary"
 *   selected={isSelected}
 *   onClick={() => toggleFilter()}
 * >
 *   전자제품
 * </Chip>
 */

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cssVarColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';
import { opacity } from '../../tokens/general';
import { usePressable } from '../../utils/usePressable';
import { transitions } from '../../utils/styles';

export type ChipVariant = 'filled' | 'weak';
export type ChipColor = 'primary' | 'neutral' | 'success' | 'error' | 'warning';
export type ChipSize = 'small' | 'medium' | 'large';

export interface ChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  /** 스타일 변형 - filled(채움), weak(연한 배경) */
  variant?: ChipVariant;
  /** 색상 테마 */
  color?: ChipColor;
  /** 크기 */
  size?: ChipSize;
  /** 선택 상태 - 체크 아이콘 표시 (onClose가 없을 때) */
  selected?: boolean;
  /** 왼쪽 아이콘 */
  leftIcon?: ReactNode;
  /** 아바타 (leftIcon과 배타적) */
  avatar?: ReactNode;
  /** 닫기 버튼 핸들러 - 제공 시 X 버튼 표시 */
  onClose?: () => void;
  /** 닫기 아이콘 커스텀 */
  closeIcon?: ReactNode;
  /** Chip 텍스트 */
  children?: ReactNode;
}

// Size configurations
const sizeConfig: Record<ChipSize, { height: number; fontSize: number; paddingX: number; iconSize: number }> = {
  small: { height: spacing.component.chip.height.sm, fontSize: typography.fontSize.xs, paddingX: spacing.component.chip.paddingX.sm, iconSize: spacing.component.chip.iconSize.sm },
  medium: { height: spacing.component.chip.height.md, fontSize: typography.fontSize.sm, paddingX: spacing.component.chip.paddingX.md, iconSize: spacing.component.chip.iconSize.md },
  large: { height: spacing.component.chip.height.lg, fontSize: typography.fontSize.md, paddingX: spacing.component.chip.paddingX.lg, iconSize: spacing.component.chip.iconSize.lg },
};

// Color configurations
const colorConfig: Record<ChipColor, {
  filled: { bg: string; bgPressed: string; bgSelected: string; text: string; textSelected: string };
  weak: { bg: string; bgPressed: string; bgSelected: string; text: string; textSelected: string };
}> = {
  primary: {
    filled: {
      bg: cssVarColors.surface.brand.default,
      bgPressed: cssVarColors.surface.brand.defaultPressed,
      bgSelected: cssVarColors.surface.brand.default,
      text: cssVarColors.content.base.onColor,
      textSelected: cssVarColors.content.base.onColor,
    },
    weak: {
      bg: cssVarColors.surface.brand.secondary,
      bgPressed: cssVarColors.surface.brand.secondaryPressed,
      bgSelected: cssVarColors.surface.brand.default,
      text: cssVarColors.content.brand.default,
      textSelected: cssVarColors.content.base.onColor,
    },
  },
  neutral: {
    filled: {
      bg: cssVarColors.surface.base.container,
      bgPressed: cssVarColors.surface.base.defaultPressed,
      bgSelected: cssVarColors.content.base.default,
      text: cssVarColors.content.base.default,
      textSelected: cssVarColors.content.base.onColor,
    },
    weak: {
      bg: cssVarColors.fill.alternative,
      bgPressed: cssVarColors.surface.base.defaultPressed,
      bgSelected: cssVarColors.content.base.default,
      text: cssVarColors.content.base.default,
      textSelected: cssVarColors.content.base.onColor,
    },
  },
  success: {
    filled: {
      bg: cssVarColors.surface.success.solid,
      bgPressed: cssVarColors.surface.success.solidPressed,
      bgSelected: cssVarColors.surface.success.solid,
      text: cssVarColors.content.base.onColor,
      textSelected: cssVarColors.content.base.onColor,
    },
    weak: {
      bg: cssVarColors.surface.success.default,
      bgPressed: cssVarColors.surface.success.defaultPressed,
      bgSelected: cssVarColors.surface.success.solid,
      text: cssVarColors.content.success.strong,
      textSelected: cssVarColors.content.base.onColor,
    },
  },
  error: {
    filled: {
      bg: cssVarColors.surface.error.solid,
      bgPressed: cssVarColors.surface.error.solidPressed,
      bgSelected: cssVarColors.surface.error.solid,
      text: cssVarColors.content.base.onColor,
      textSelected: cssVarColors.content.base.onColor,
    },
    weak: {
      bg: cssVarColors.surface.error.default,
      bgPressed: cssVarColors.surface.error.defaultPressed,
      bgSelected: cssVarColors.surface.error.solid,
      text: cssVarColors.content.error.default,
      textSelected: cssVarColors.content.base.onColor,
    },
  },
  warning: {
    filled: {
      bg: cssVarColors.surface.warning.solid,
      bgPressed: cssVarColors.surface.warning.solidPressed,
      bgSelected: cssVarColors.surface.warning.solid,
      text: cssVarColors.content.base.onColor,
      textSelected: cssVarColors.content.base.onColor,
    },
    weak: {
      bg: cssVarColors.surface.warning.default,
      bgPressed: cssVarColors.surface.warning.defaultPressed,
      bgSelected: cssVarColors.surface.warning.solid,
      text: cssVarColors.content.warning.strong,
      textSelected: cssVarColors.content.base.onColor,
    },
  },
};

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  (
    {
      variant = 'filled',
      color = 'neutral',
      size = 'medium',
      selected = false,
      disabled = false,
      leftIcon,
      avatar,
      onClose,
      closeIcon,
      children,
      style,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const { isPressed, isHovered, handlers } = usePressable<HTMLButtonElement>({
      disabled,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
    });

    const sizeStyle = sizeConfig[size];
    const colorStyle = colorConfig[color][variant];

    const getBackgroundColor = (): string => {
      if (selected) return colorStyle.bgSelected;
      if ((isPressed || isHovered) && !disabled) return colorStyle.bgPressed;
      return colorStyle.bg;
    };

    const getTextColor = (): string => {
      if (disabled) return cssVarColors.content.disabled.default;
      return selected ? colorStyle.textSelected : colorStyle.text;
    };

    const chipStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.component.chip.gap,
      height: sizeStyle.height,
      padding: `0 ${sizeStyle.paddingX}px`,
      fontSize: sizeStyle.fontSize,
      fontWeight: typography.fontWeight.medium,
      color: getTextColor(),
      backgroundColor: getBackgroundColor(),
      border: 'none',
      borderRadius: radius.primitive.full,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? opacity.disabled : 1,
      transition: transitions.all,
      ...style,
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        aria-pressed={selected || undefined}
        aria-disabled={disabled}
        style={chipStyle}
        {...handlers}
        {...props}
      >
        {/* Avatar or Left Icon */}
        {avatar && (
          <span style={{ marginLeft: -spacing.component.chip.gap, display: 'flex', alignItems: 'center' }}>
            {avatar}
          </span>
        )}
        {!avatar && leftIcon && (
          <span style={{
            width: sizeStyle.iconSize,
            height: sizeStyle.iconSize,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {leftIcon}
          </span>
        )}

        {/* Label */}
        {children}

        {/* Selected Check Icon (for filter type) */}
        {selected && !onClose && (
          <span style={{
            width: sizeStyle.iconSize,
            height: sizeStyle.iconSize,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg
              width={sizeStyle.iconSize * 0.7}
              height={sizeStyle.iconSize * 0.7}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
        )}

        {/* Close Button (for input type) */}
        {onClose && (
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.stopPropagation();
                onClose();
              }
            }}
            style={{
              marginRight: -spacing.component.chip.gap,
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              borderRadius: radius.primitive.full,
            }}
          >
            {closeIcon || (
              <svg
                width={sizeStyle.iconSize * 0.7}
                height={sizeStyle.iconSize * 0.7}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            )}
          </span>
        )}
      </button>
    );
  }
);

Chip.displayName = 'Chip';
