/**
 * Button Component (Web)
 *
 * @description 작업을 수행하는데 사용되는 클릭 가능한 요소입니다.
 * @see docs/components/Button.md - AI용 상세 가이드
 *
 * @example
 * <Button
 *   buttonType="filled"
 *   color="primary"
 *   size="medium"
 *   onClick={() => {}}
 * >
 *   확인
 * </Button>
 */

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cssVarColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';
import { opacity } from '../../tokens/general';
import { usePressable } from '../../utils/usePressable';
import { transitions } from '../../utils/styles';
import { easing } from '../../tokens/motion';

export type ButtonType = 'filled' | 'weak';
export type ButtonColor =
  | 'primary'
  | 'neutral'
  | 'success'
  | 'error'
  | 'kakao'
  | 'google';
export type ButtonSize = 'small' | 'medium' | 'large' | 'xLarge';
export type ButtonLayout = 'hug' | 'fillWidth';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  /** 버튼 스타일 - filled(채워진) 또는 weak(연한 배경) */
  buttonType?: ButtonType;
  /** 색상 테마 */
  color?: ButtonColor;
  /** 버튼 크기 */
  size?: ButtonSize;
  /** 레이아웃 모드 - hug(내용에 맞춤) 또는 fillWidth(전체 너비) */
  layout?: ButtonLayout;
  /** 로딩 상태 */
  isLoading?: boolean;
  /** 좌측 콘텐츠 (아이콘 등) */
  leftContent?: ReactNode;
  /** 우측 콘텐츠 (아이콘 등) */
  rightContent?: ReactNode;
  /** 버튼 텍스트 또는 콘텐츠 */
  children?: ReactNode;
}

const sizeStyles: Record<ButtonSize, { height: number; fontSize: number; padding: string }> = {
  small: { height: spacing.component.input.height.sm, fontSize: typography.fontSize.sm, padding: `0 ${spacing.component.button.paddingX.sm}px` },
  medium: { height: spacing.primitive[10], fontSize: typography.fontSize.sm, padding: `0 ${spacing.component.button.paddingX.sm}px` },
  large: { height: spacing.semantic.minTouchTarget, fontSize: typography.fontSize.sm, padding: `0 ${spacing.component.button.paddingX.md}px` },
  xLarge: { height: spacing.primitive[12], fontSize: typography.fontSize.md, padding: `0 ${spacing.component.button.paddingX.lg}px` },
};

const colorStyles: Record<ButtonColor, {
  filled: { bg: string; bgPressed: string; color: string };
  weak: { bg: string; bgPressed: string; color: string };
}> = {
  primary: {
    filled: {
      bg: cssVarColors.surface.brand.default,
      bgPressed: cssVarColors.surface.brand.defaultPressed,
      color: cssVarColors.content.base.onColor,
    },
    weak: {
      bg: cssVarColors.surface.brand.secondary,
      bgPressed: cssVarColors.surface.brand.secondaryPressed,
      color: cssVarColors.content.brand.default,
    },
  },
  neutral: {
    filled: {
      bg: cssVarColors.surface.base.container,
      bgPressed: cssVarColors.surface.base.containerPressed,
      color: cssVarColors.content.base.default,
    },
    weak: {
      bg: cssVarColors.surface.base.container,
      bgPressed: cssVarColors.surface.base.containerPressed,
      color: cssVarColors.content.base.default,
    },
  },
  success: {
    filled: {
      bg: cssVarColors.surface.success.solid,
      bgPressed: cssVarColors.surface.success.solidPressed,
      color: cssVarColors.content.base.onColor,
    },
    weak: {
      bg: cssVarColors.surface.success.default,
      bgPressed: cssVarColors.surface.success.defaultPressed,
      color: cssVarColors.content.success.default,
    },
  },
  error: {
    filled: {
      bg: cssVarColors.surface.error.solid,
      bgPressed: cssVarColors.surface.error.solidPressed,
      color: cssVarColors.content.base.onColor,
    },
    weak: {
      bg: cssVarColors.surface.error.default,
      bgPressed: cssVarColors.surface.error.defaultPressed,
      color: cssVarColors.content.error.default,
    },
  },
  kakao: {
    filled: {
      bg: cssVarColors.surface.kakao.default,
      bgPressed: cssVarColors.surface.kakao.defaultPressed,
      color: cssVarColors.content.base.strong,
    },
    weak: {
      bg: cssVarColors.fill.alternative,
      bgPressed: cssVarColors.fill.normal,
      color: cssVarColors.content.base.strong,
    },
  },
  google: {
    filled: {
      bg: cssVarColors.surface.google.default,
      bgPressed: cssVarColors.surface.google.defaultPressed,
      color: cssVarColors.content.base.default,
    },
    weak: {
      bg: cssVarColors.surface.base.container,
      bgPressed: cssVarColors.surface.base.containerPressed,
      color: cssVarColors.content.base.default,
    },
  },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      buttonType = 'filled',
      color = 'primary',
      size = 'medium',
      layout = 'hug',
      isLoading = false,
      disabled = false,
      leftContent,
      rightContent,
      children,
      style,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;
    const { isPressed, handlers } = usePressable<HTMLButtonElement>({
      disabled: isDisabled,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
    });

    const sizeStyle = sizeStyles[size];
    const colorStyle = colorStyles[color][buttonType];
    const borderRadiusValue = size === 'large' || size === 'xLarge'
      ? radius.component.button.lg
      : radius.component.button.sm;

    const buttonStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.component.button.gap,
      height: sizeStyle.height,
      padding: sizeStyle.padding,
      fontSize: sizeStyle.fontSize,
      fontWeight: typography.fontWeight.semibold,
      borderRadius: borderRadiusValue,
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      transition: transitions.background,
      width: layout === 'fillWidth' ? '100%' : 'auto',
      opacity: disabled ? opacity.disabled : 1,
      background: disabled
        ? cssVarColors.surface.disabled.default
        : (isPressed && !isLoading ? colorStyle.bgPressed : colorStyle.bg),
      color: disabled ? cssVarColors.content.disabled.default : colorStyle.color,
      border: 'none',
      ...style,
    };

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-busy={isLoading}
        aria-disabled={isDisabled}
        style={buttonStyle}
        {...handlers}
        {...props}
      >
        {isLoading ? (
          <LoadingDots />
        ) : (
          <>
            {leftContent}
            {children}
            {rightContent}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

const PULSE_KEYFRAME_ID = 'btn-pulse-keyframe';

function ensurePulseKeyframe() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(PULSE_KEYFRAME_ID)) return;
  const style = document.createElement('style');
  style.id = PULSE_KEYFRAME_ID;
  style.textContent = `@keyframes btn-pulse { 0%, 100% { opacity: 0.3; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1); } }`;
  document.head.appendChild(style);
}

function LoadingDots() {
  ensurePulseKeyframe();
  return (
    <span style={{ display: 'flex', gap: spacing.primitive[1], alignItems: 'center' }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: radius.primitive.full,
            backgroundColor: 'currentColor',
            animation: `btn-pulse 1.2s ${easing.easeInOut} infinite`,
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </span>
  );
}
