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

import { forwardRef, useState, type ButtonHTMLAttributes, type ReactNode } from 'react';

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
  medium: { height: 32, fontSize: 14, paddingX: 12, iconSize: 18 },
  large: { height: 40, fontSize: 16, paddingX: 16, iconSize: 22 },
};

// Color configurations
const colorConfig: Record<ChipColor, {
  filled: { bg: string; bgPressed: string; bgSelected: string; text: string; textSelected: string };
  outlined: { bg: string; bgPressed: string; bgSelected: string; border: string; text: string; textSelected: string };
}> = {
  brandDefault: {
    filled: {
      bg: '#dbeafe', // surface.brand.secondary (palette.blue.95)
      bgPressed: '#bfdbfe', // surface.brand.secondaryPressed (palette.blue.90)
      bgSelected: '#2563eb', // surface.brand.default (palette.blue.50)
      text: '#1e40af', // content.brand.strong (palette.blue.30)
      textSelected: '#ffffff', // content.base.onColor (palette.static.white)
    },
    outlined: {
      bg: 'transparent',
      bgPressed: 'rgba(37, 99, 235, 0.08)', // brand pressed overlay
      bgSelected: '#2563eb', // surface.brand.default (palette.blue.50)
      border: '#2563eb', // border.brand.default (palette.blue.50)
      text: '#2563eb', // content.brand.default (palette.blue.50)
      textSelected: '#ffffff', // content.base.onColor (palette.static.white)
    },
  },
  baseDefault: {
    filled: {
      bg: '#f1f5f9', // surface.base.container (palette.grey.97)
      bgPressed: '#e2e8f0', // surface.base.containerPressed (palette.grey.95)
      bgSelected: '#334155', // content.base.default filled (palette.grey.30)
      text: '#334155', // content.base.default (palette.grey.30)
      textSelected: '#ffffff', // content.base.onColor (palette.static.white)
    },
    outlined: {
      bg: 'transparent',
      bgPressed: 'rgba(0, 0, 0, 0.04)', // base pressed overlay
      bgSelected: '#334155', // content.base.default filled (palette.grey.30)
      border: '#cbd5e1', // border.base.default (palette.grey.90)
      text: '#334155', // content.base.default (palette.grey.30)
      textSelected: '#ffffff', // content.base.onColor (palette.static.white)
    },
  },
  successDefault: {
    filled: {
      bg: '#dcfce7', // surface.success.default (palette.green.95)
      bgPressed: '#bbf7d0', // surface.success.defaultPressed (palette.green.90)
      bgSelected: '#16a34a', // content.success.strong (palette.green.40)
      text: '#166534', // content.success.dark (palette.green.30)
      textSelected: '#ffffff', // content.base.onColor (palette.static.white)
    },
    outlined: {
      bg: 'transparent',
      bgPressed: 'rgba(34, 197, 94, 0.08)', // success pressed overlay
      bgSelected: '#16a34a', // content.success.strong (palette.green.40)
      border: '#22c55e', // border.success.default (palette.green.50)
      text: '#166534', // content.success.dark (palette.green.30)
      textSelected: '#ffffff', // content.base.onColor (palette.static.white)
    },
  },
  errorDefault: {
    filled: {
      bg: '#fee2e2', // surface.error.default (palette.red.95)
      bgPressed: '#fecaca', // surface.error.defaultPressed (palette.red.90)
      bgSelected: '#dc2626', // content.error.strong (palette.red.40)
      text: '#991b1b', // content.error.dark (palette.red.30)
      textSelected: '#ffffff', // content.base.onColor (palette.static.white)
    },
    outlined: {
      bg: 'transparent',
      bgPressed: 'rgba(239, 68, 68, 0.08)', // error pressed overlay
      bgSelected: '#dc2626', // content.error.strong (palette.red.40)
      border: '#ef4444', // border.error.default (palette.red.50)
      text: '#991b1b', // content.error.dark (palette.red.30)
      textSelected: '#ffffff', // content.base.onColor (palette.static.white)
    },
  },
  warningDefault: {
    filled: {
      bg: '#fef9c3', // surface.warning.default (palette.yellow.95)
      bgPressed: '#fef08a', // surface.warning.defaultPressed (palette.yellow.90)
      bgSelected: '#ca8a04', // content.warning.strong (palette.yellow.40)
      text: '#854d0e', // content.warning.dark (palette.yellow.30)
      textSelected: '#ffffff', // content.base.onColor (palette.static.white)
    },
    outlined: {
      bg: 'transparent',
      bgPressed: 'rgba(234, 179, 8, 0.08)', // warning pressed overlay
      bgSelected: '#ca8a04', // content.warning.strong (palette.yellow.40)
      border: '#eab308', // border.warning.default (palette.yellow.50)
      text: '#854d0e', // content.warning.dark (palette.yellow.30)
      textSelected: '#ffffff', // content.base.onColor (palette.static.white)
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
    const [isPressed, setIsPressed] = useState(false);
    const sizeStyle = sizeConfig[size];
    const colorStyle = colorConfig[color][variant];

    const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsPressed(true);
      onMouseDown?.(e);
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsPressed(false);
      onMouseUp?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsPressed(false);
      onMouseLeave?.(e);
    };

    const getBackgroundColor = (): string => {
      if (selected) return colorStyle.bgSelected;
      if (isPressed && !disabled) return colorStyle.bgPressed;
      return colorStyle.bg;
    };

    const getTextColor = (): string => {
      if (disabled) return '#94a3b8'; // content.disabled.default (palette.grey.70)
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
      fontWeight: 500,
      color: getTextColor(),
      backgroundColor: getBackgroundColor(),
      border: variant === 'outlined' && !selected
        ? `1px solid ${disabled ? '#cbd5e1' : (colorStyle as { border: string }).border}` // disabled border: border.disabled.default (palette.grey.90)
        : 'none',
      borderRadius: sizeStyle.height / 2, // radius.primitive.full (9999px for pill shape)
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transition: 'background-color 150ms ease, color 150ms ease',
      ...style,
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        aria-pressed={selected || undefined}
        aria-disabled={disabled}
        style={chipStyle}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
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
