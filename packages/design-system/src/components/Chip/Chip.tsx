/**
 * Chip Component (Web)
 *
 * @description 입력, 속성, 액션을 나타내는 컴팩트한 인터랙티브 요소입니다.
 * @see docs/components/Chip.md - AI용 상세 가이드
 *
 * @example
 * <Chip
 *   color="brandDefault"
 *   selected={isSelected}
 *   onClick={() => toggleFilter()}
 * >
 *   전자제품
 * </Chip>
 */

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { colors, palette } from '../../tokens/colors';
import { typography } from '../../tokens/typography';
import { usePressable } from '../../utils/usePressable';
import { transitions } from '../../utils/styles';

export type ChipVariant = 'filled' | 'outlined';
export type ChipColor = 'brandDefault' | 'baseDefault' | 'successDefault' | 'errorDefault' | 'warningDefault';
export type ChipSize = 'small' | 'medium' | 'large';

export interface ChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  /** 스타일 변형 - filled(채움), outlined(테두리) */
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
  small: { height: 24, fontSize: 12, paddingX: 8, iconSize: 14 },
  medium: { height: 32, fontSize: typography.fontSize.sm, paddingX: 12, iconSize: 18 },
  large: { height: 40, fontSize: typography.fontSize.md, paddingX: 16, iconSize: 22 },
};

// Color configurations
const colorConfig: Record<ChipColor, {
  filled: { bg: string; bgPressed: string; bgSelected: string; text: string; textSelected: string };
  outlined: { bg: string; bgPressed: string; bgSelected: string; border: string; text: string; textSelected: string };
}> = {
  brandDefault: {
    filled: {
      bg: colors.surface.brand.secondary,
      bgPressed: colors.surface.brand.secondaryPressed,
      bgSelected: colors.surface.brand.default,
      text: palette.blue[30],
      textSelected: colors.content.base.onColor,
    },
    outlined: {
      bg: 'transparent',
      bgPressed: 'rgba(37, 99, 235, 0.08)',
      bgSelected: colors.surface.brand.default,
      border: colors.border.brand.default,
      text: colors.content.brand.default,
      textSelected: colors.content.base.onColor,
    },
  },
  baseDefault: {
    filled: {
      bg: colors.surface.base.container,
      bgPressed: colors.surface.base.containerPressed,
      bgSelected: colors.content.base.default,
      text: colors.content.base.default,
      textSelected: colors.content.base.onColor,
    },
    outlined: {
      bg: 'transparent',
      bgPressed: 'rgba(0, 0, 0, 0.04)',
      bgSelected: colors.content.base.default,
      border: colors.border.secondary.default,
      text: colors.content.base.default,
      textSelected: colors.content.base.onColor,
    },
  },
  successDefault: {
    filled: {
      bg: palette.green[95],
      bgPressed: palette.green[90],
      bgSelected: palette.green[40],
      text: palette.green[30],
      textSelected: colors.content.base.onColor,
    },
    outlined: {
      bg: 'transparent',
      bgPressed: 'rgba(34, 197, 94, 0.08)',
      bgSelected: palette.green[40],
      border: colors.border.success.default,
      text: palette.green[30],
      textSelected: colors.content.base.onColor,
    },
  },
  errorDefault: {
    filled: {
      bg: palette.red[95],
      bgPressed: palette.red[90],
      bgSelected: colors.surface.error.solid,
      text: palette.red[30],
      textSelected: colors.content.base.onColor,
    },
    outlined: {
      bg: 'transparent',
      bgPressed: 'rgba(239, 68, 68, 0.08)',
      bgSelected: colors.surface.error.solid,
      border: colors.border.error.default,
      text: palette.red[30],
      textSelected: colors.content.base.onColor,
    },
  },
  warningDefault: {
    filled: {
      bg: palette.yellow[95],
      bgPressed: palette.yellow[90],
      bgSelected: palette.yellow[40],
      text: palette.yellow[30],
      textSelected: colors.content.base.onColor,
    },
    outlined: {
      bg: 'transparent',
      bgPressed: 'rgba(234, 179, 8, 0.08)',
      bgSelected: palette.yellow[40],
      border: palette.yellow[50],
      text: palette.yellow[30],
      textSelected: colors.content.base.onColor,
    },
  },
};

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  (
    {
      variant = 'filled',
      color = 'baseDefault',
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
    const { isPressed, handlers } = usePressable<HTMLButtonElement>({
      disabled,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
    });

    const sizeStyle = sizeConfig[size];
    const colorStyle = colorConfig[color][variant];

    const getBackgroundColor = (): string => {
      if (selected) return colorStyle.bgSelected;
      if (isPressed && !disabled) return colorStyle.bgPressed;
      return colorStyle.bg;
    };

    const getTextColor = (): string => {
      if (disabled) return colors.content.disabled.default;
      return selected ? colorStyle.textSelected : colorStyle.text;
    };

    const chipStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 4,
      height: sizeStyle.height,
      padding: `0 ${sizeStyle.paddingX}px`,
      fontSize: sizeStyle.fontSize,
      fontWeight: typography.fontWeight.medium,
      color: getTextColor(),
      backgroundColor: getBackgroundColor(),
      border: variant === 'outlined' && !selected
        ? `1px solid ${disabled ? colors.border.disabled.default : (colorStyle as { border: string }).border}`
        : 'none',
      borderRadius: sizeStyle.height / 2,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
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
          <span style={{ marginLeft: -4, display: 'flex', alignItems: 'center' }}>
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
              marginRight: -4,
              padding: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              borderRadius: '50%',
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
