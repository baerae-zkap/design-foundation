/**
 * TextButton Component (Web)
 *
 * @description 텍스트 기반의 가벼운 액션 버튼입니다.
 * @see docs/components/TextButton.md - AI용 상세 가이드
 *
 * @example
 * <TextButton
 *   variant="clear"
 *   color="primary"
 *   size="medium"
 *   onClick={() => {}}
 * >
 *   더보기
 * </TextButton>
 */

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cssVarColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';
import { usePressable } from '../../utils/usePressable';
import { transitions } from '../../utils/styles';

export type TextButtonVariant = 'clear' | 'underline' | 'arrow';
export type TextButtonColor = 'primary' | 'neutral' | 'muted' | 'error';
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
  xSmall: spacing.component.textButton.fontSize.xs,
  small: spacing.component.textButton.fontSize.sm,
  medium: spacing.component.textButton.fontSize.md,
  large: spacing.component.textButton.fontSize.lg,
  xLarge: spacing.component.textButton.fontSize.xl,
};

const colorStyles: Record<TextButtonColor, { default: string; pressed: string; pressedBg: string }> = {
  primary: {
    default: cssVarColors.content.brand.default,
    pressed: cssVarColors.surface.brand.defaultPressed,
    pressedBg: cssVarColors.surface.brand.secondary
  },
  neutral: {
    default: cssVarColors.content.base.default,
    pressed: cssVarColors.content.base.strong,
    pressedBg: cssVarColors.surface.base.defaultPressed
  },
  muted: {
    default: cssVarColors.content.base.neutral,
    pressed: cssVarColors.content.base.default,
    pressedBg: cssVarColors.surface.base.defaultPressed
  },
  error: {
    default: cssVarColors.content.error.default,
    pressed: cssVarColors.surface.error.solidPressed,
    pressedBg: cssVarColors.surface.error.default
  },
};

export const TextButton = forwardRef<HTMLButtonElement, TextButtonProps>(
  (
    {
      variant = 'clear',
      color = 'primary',
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
    const { isPressed, isHovered, handlers } = usePressable<HTMLButtonElement>({
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
      color: disabled ? cssVarColors.content.disabled.default : ((isPressed || isHovered) ? colorStyle.pressed : colorStyle.default),
      background: (isPressed || isHovered) && !disabled ? colorStyle.pressedBg : 'transparent',
      border: 'none',
      borderRadius: radius.primitive.sm,
      cursor: disabled ? 'not-allowed' : 'pointer',
      textDecoration: variant === 'underline' ? 'underline' : 'none',
      transition: 'background-color 150ms ease, transform 150ms ease',
      transform: isPressed && !disabled ? 'scale(0.97)' : undefined,
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
