/**
 * TextButton Component (Web)
 *
 * @description 텍스트 기반의 가벼운 액션 버튼입니다.
 * @see docs/components/TextButton.md - AI용 상세 가이드
 *
 * @example
 * <TextButton
 *   variant="clear"
 *   color="brandDefault"
 *   size="medium"
 *   onClick={() => {}}
 * >
 *   더보기
 * </TextButton>
 */

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';
import { usePressable } from '../../utils/usePressable';
import { transitions } from '../../utils/styles';

export type TextButtonVariant = 'clear' | 'underline' | 'arrow';
export type TextButtonColor = 'brandDefault' | 'baseDefault' | 'errorDefault';
export type TextButtonSize = 'xSmall' | 'small' | 'medium' | 'large' | 'xLarge';

export interface TextButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  /** 버튼 스타일 - clear(기본), underline(밑줄), arrow(화살표) */
  variant?: TextButtonVariant;
  /** 색상 테마 */
  color?: TextButtonColor;
  /** 텍스트 크기 */
  size?: TextButtonSize;
  /** 버튼 텍스트 */
  children?: ReactNode;
}

const sizeStyles: Record<TextButtonSize, number> = {
  xSmall: 12,
  small: typography.fontSize.sm,
  medium: typography.fontSize.md,
  large: 18,
  xLarge: 20,
};

const colorStyles: Record<TextButtonColor, { default: string; pressed: string; pressedBg: string }> = {
  brandDefault: {
    default: colors.content.brand.default,
    pressed: colors.surface.brand.defaultPressed,
    pressedBg: colors.fill.alternative
  },
  baseDefault: {
    default: colors.content.base.default,
    pressed: colors.content.base.strong,
    pressedBg: colors.fill.alternative
  },
  errorDefault: {
    default: colors.content.error.default,
    pressed: colors.surface.error.solidPressed,
    pressedBg: colors.fill.alternative
  },
};

export const TextButton = forwardRef<HTMLButtonElement, TextButtonProps>(
  (
    {
      variant = 'clear',
      color = 'brandDefault',
      size = 'medium',
      disabled = false,
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

    const fontSize = sizeStyles[size];
    const colorStyle = colorStyles[color];

    const buttonStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: spacing.primitive[1],
      padding: `${spacing.primitive[1]}px ${spacing.primitive[2]}px`,
      fontSize,
      fontWeight: typography.fontWeight.medium,
      color: disabled ? colors.content.disabled.default : (isPressed ? colorStyle.pressed : colorStyle.default),
      background: isPressed && !disabled ? colorStyle.pressedBg : 'transparent',
      border: 'none',
      borderRadius: radius.primitive.sm,
      cursor: disabled ? 'not-allowed' : 'pointer',
      textDecoration: variant === 'underline' ? 'underline' : 'none',
      transition: transitions.all,
      ...style,
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        aria-disabled={disabled}
        style={buttonStyle}
        {...handlers}
        {...props}
      >
        {children}
        {variant === 'arrow' && (
          <svg
            width={fontSize * 0.875}
            height={fontSize * 0.875}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        )}
      </button>
    );
  }
);

TextButton.displayName = 'TextButton';
