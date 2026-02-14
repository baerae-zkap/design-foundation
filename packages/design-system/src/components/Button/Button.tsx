/**
 * Button Component (Web)
 *
 * @description 작업을 수행하는데 사용되는 클릭 가능한 요소입니다.
 * @see docs/components/Button.md - AI용 상세 가이드
 *
 * @example
 * <Button
 *   buttonType="filled"
 *   color="brandDefault"
 *   size="medium"
 *   onClick={() => {}}
 * >
 *   확인
 * </Button>
 */

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';
import { usePressable } from '../../utils/usePressable';
import { transitions } from '../../utils/styles';

export type ButtonType = 'filled' | 'outlined';
export type ButtonColor =
  | 'brandDefault'
  | 'brandSecondary'
  | 'baseContainer'
  | 'successDefault'
  | 'errorDefault'
  | 'kakaoDefault'
  | 'googleDefault';
export type ButtonSize = 'small' | 'medium' | 'large' | 'xLarge';
export type ButtonLayout = 'hug' | 'fillWidth';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  /** 버튼 스타일 - filled(채워진) 또는 outlined(테두리) */
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
  small: { height: 36, fontSize: typography.fontSize.sm, padding: `0 ${spacing.component.button.paddingX.sm}px` },
  medium: { height: 40, fontSize: typography.fontSize.sm, padding: `0 ${spacing.component.button.paddingX.sm}px` },
  large: { height: 44, fontSize: typography.fontSize.sm, padding: `0 ${spacing.component.button.paddingX.md}px` },
  xLarge: { height: 48, fontSize: typography.fontSize.md, padding: `0 ${spacing.component.button.paddingX.lg}px` },
};

const colorStyles: Record<ButtonColor, {
  filled: { bg: string; bgPressed: string; color: string };
  outlined: { bg: string; bgPressed: string; color: string; border: string };
}> = {
  brandDefault: {
    filled: {
      bg: colors.surface.brand.default,
      bgPressed: colors.surface.brand.defaultPressed,
      color: colors.content.base.onColor,
    },
    outlined: {
      bg: colors.surface.base.default,
      bgPressed: colors.surface.brand.secondary,
      color: colors.content.brand.default,
      border: colors.border.brand.default,
    },
  },
  brandSecondary: {
    filled: {
      bg: colors.surface.brand.secondary,
      bgPressed: colors.surface.brand.secondaryPressed,
      color: colors.content.brand.default,
    },
    outlined: {
      bg: colors.surface.base.default,
      bgPressed: colors.surface.brand.secondary,
      color: colors.content.brand.default,
      border: colors.border.brand.default,
    },
  },
  baseContainer: {
    filled: {
      bg: colors.surface.base.container,
      bgPressed: colors.surface.base.containerPressed,
      color: colors.content.base.default,
    },
    outlined: {
      bg: colors.surface.base.default,
      bgPressed: colors.surface.base.alternative,
      color: colors.content.base.default,
      border: colors.border.secondary.default,
    },
  },
  successDefault: {
    filled: {
      bg: colors.surface.success.solid,
      bgPressed: colors.surface.success.solidPressed,
      color: colors.content.base.onColor,
    },
    outlined: {
      bg: colors.surface.base.default,
      bgPressed: colors.surface.success.default,
      color: colors.content.success.default,
      border: colors.border.success.default,
    },
  },
  errorDefault: {
    filled: {
      bg: colors.surface.error.solid,
      bgPressed: colors.surface.error.solidPressed,
      color: colors.content.base.onColor,
    },
    outlined: {
      bg: colors.surface.base.default,
      bgPressed: colors.surface.error.default,
      color: colors.content.error.default,
      border: colors.border.error.default,
    },
  },
  kakaoDefault: {
    filled: {
      bg: colors.surface.kakao.default,
      bgPressed: colors.surface.kakao.defaultPressed,
      color: colors.content.base.strong,
    },
    outlined: {
      bg: colors.surface.base.default,
      bgPressed: colors.surface.kakao.defaultPressed,
      color: colors.content.base.strong,
      border: colors.surface.kakao.default,
    },
  },
  googleDefault: {
    filled: {
      bg: colors.surface.google.default,
      bgPressed: colors.surface.google.defaultPressed,
      color: colors.content.base.default,
    },
    outlined: {
      bg: colors.surface.base.default,
      bgPressed: colors.surface.google.defaultPressed,
      color: colors.content.base.default,
      border: colors.border.base.default,
    },
  },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      buttonType = 'filled',
      color = 'brandDefault',
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
      opacity: isDisabled ? 0.5 : 1,
      background: isDisabled
        ? colors.surface.disabled.default
        : (isPressed ? colorStyle.bgPressed : colorStyle.bg),
      color: isDisabled ? colors.content.disabled.default : colorStyle.color,
      border: buttonType === 'outlined'
        ? `1px solid ${isDisabled ? colors.border.disabled.default : (colorStyle as { border: string }).border}`
        : 'none',
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

function LoadingDots() {
  return (
    <span style={{ display: 'flex', gap: spacing.primitive[1] }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: 'currentColor',
            animation: `pulse 1.2s ease-in-out infinite`,
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </span>
  );
}
