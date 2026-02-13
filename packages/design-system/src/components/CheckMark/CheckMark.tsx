/**
 * CheckMark Component (Web)
 *
 * @description 약관/동의 확인을 위한 체크마크 컴포넌트. 컨트롤(체크 아이콘) + 라벨로 구성되며, 라벨을 포함한 전체 영역이 클릭 가능합니다.
 * @see docs/components/CheckMark.md - AI용 상세 가이드
 *
 * @example
 * <CheckMark
 *   label="이용약관에 동의합니다"
 *   checked={agreed}
 *   onClick={() => setAgreed(!agreed)}
 *   size="medium"
 * />
 */

import { forwardRef, type HTMLAttributes } from 'react';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';
import { usePressable } from '../../utils/usePressable';
import { transitions } from '../../utils/styles';

export type CheckMarkSize = 'small' | 'medium';

export interface CheckMarkProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Label text displayed next to the check icon */
  label: string;
  /** Whether the checkmark is active (checked) */
  checked?: boolean;
  /** Click handler to toggle state */
  onClick?: () => void;
  /** Size variant */
  size?: CheckMarkSize;
  /** Tight spacing mode (reduces gap between items) */
  tight?: boolean;
  /** Disabled state */
  disabled?: boolean;
}

// Size configuration
const sizeConfig: Record<
  CheckMarkSize,
  { iconSize: number; fontSize: number; lineHeight: number }
> = {
  small: {
    iconSize: 16,
    fontSize: typography.fontSize.sm, // 14
    lineHeight: typography.lineHeight.sm, // 20
  },
  medium: {
    iconSize: 20,
    fontSize: typography.fontSize.md, // 16
    lineHeight: typography.lineHeight.md, // 24
  },
};

export const CheckMark = forwardRef<HTMLDivElement, CheckMarkProps>(
  (
    {
      label,
      checked = false,
      onClick,
      size = 'medium',
      tight = false,
      disabled = false,
      style,
      ...props
    },
    ref
  ) => {
    const config = sizeConfig[size];
    const { isPressed, handlers } = usePressable<HTMLDivElement>({
      disabled,
      onMouseDown: props.onMouseDown,
      onMouseUp: props.onMouseUp,
      onMouseLeave: props.onMouseLeave,
      onMouseEnter: props.onMouseEnter,
    });

    // Color logic based on state
    const getIconColor = () => {
      if (disabled) {
        return colors.content.disabled.default;
      }
      if (checked) {
        return colors.content.brand.default;
      }
      return isPressed ? colors.content.base.secondary : colors.content.base.alternative;
    };

    const getTextColor = () => {
      if (disabled) {
        return colors.content.disabled.default;
      }
      return colors.content.base.default;
    };

    const getOpacity = () => {
      if (disabled) return 1;
      return isPressed ? 0.8 : 1;
    };

    const containerStyle: React.CSSProperties = {
      display: 'inline-flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.primitive[2], // 8px
      minHeight: 44, // Minimum touch target
      paddingTop: tight ? spacing.primitive[1] : spacing.primitive[2],
      paddingBottom: tight ? spacing.primitive[1] : spacing.primitive[2],
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: getOpacity(),
      transition: transitions.opacity,
      userSelect: 'none',
      ...style,
    };

    const labelStyle: React.CSSProperties = {
      flex: 1,
      fontFamily: typography.fontFamily.base,
      fontWeight: typography.fontWeight.regular,
      fontSize: config.fontSize,
      lineHeight: `${config.lineHeight}px`,
      color: getTextColor(),
    };

    const iconColor = getIconColor();

    return (
      <div
        ref={ref}
        role="checkbox"
        aria-checked={checked}
        aria-disabled={disabled}
        aria-label={label}
        tabIndex={disabled ? -1 : 0}
        onClick={disabled ? undefined : onClick}
        onKeyDown={(e) => {
          if (!disabled && (e.key === ' ' || e.key === 'Enter')) {
            e.preventDefault();
            onClick?.();
          }
        }}
        style={containerStyle}
        data-testid={props['data-testid']}
        {...handlers}
        {...props}
      >
        <svg
          width={config.iconSize}
          height={config.iconSize}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ flexShrink: 0 }}
        >
          <path
            d="M5 12l5 5L20 7"
            stroke={iconColor}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span style={labelStyle}>{label}</span>
      </div>
    );
  }
);

CheckMark.displayName = 'CheckMark';
