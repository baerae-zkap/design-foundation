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
import { cssVarColors } from '../../tokens/colors';
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
      bg: cssVarColors.component.button.primarySurface,
      bgPressed: cssVarColors.component.button.primarySurfacePressed,
      color: cssVarColors.component.button.primaryContent,
    },
    outlined: {
      bg: cssVarColors.surface.base.default,
      bgPressed: cssVarColors.surface.brand.secondary,
      color: cssVarColors.content.brand.default,
      border: cssVarColors.border.brand.default,
    },
  },
  brandSecondary: {
    filled: {
      bg: cssVarColors.component.button.secondarySurface,
      bgPressed: cssVarColors.component.button.secondarySurfacePressed,
      color: cssVarColors.component.button.secondaryContent,
    },
    outlined: {
      bg: cssVarColors.surface.base.default,
      bgPressed: cssVarColors.surface.brand.secondary,
      color: cssVarColors.content.brand.default,
      border: cssVarColors.component.button.secondaryBorder,
    },
  },
  baseContainer: {
    filled: {
      bg: cssVarColors.surface.base.container,
      bgPressed: cssVarColors.surface.base.containerPressed,
      color: cssVarColors.content.base.default,
    },
    outlined: {
      bg: cssVarColors.surface.base.default,
      bgPressed: cssVarColors.surface.base.alternative,
      color: cssVarColors.content.base.default,
      border: cssVarColors.border.secondary.default,
    },
  },
  successDefault: {
    filled: {
      bg: cssVarColors.surface.success.solid,
      bgPressed: cssVarColors.surface.success.solidPressed,
      color: cssVarColors.content.base.onColor,
    },
    outlined: {
      bg: cssVarColors.surface.base.default,
      bgPressed: cssVarColors.surface.success.default,
      color: cssVarColors.content.success.default,
      border: cssVarColors.border.success.default,
    },
  },
  errorDefault: {
    filled: {
      bg: cssVarColors.component.button.destructiveSurface,
      bgPressed: cssVarColors.component.button.destructiveSurfacePressed,
      color: cssVarColors.component.button.destructiveContent,
    },
    outlined: {
      bg: cssVarColors.surface.base.default,
      bgPressed: cssVarColors.surface.error.default,
      color: cssVarColors.content.error.default,
      border: cssVarColors.border.error.default,
    },
  },
  kakaoDefault: {
    filled: {
      bg: cssVarColors.surface.kakao.default,
      bgPressed: cssVarColors.surface.kakao.defaultPressed,
      color: cssVarColors.content.base.strong,
    },
    outlined: {
      bg: cssVarColors.surface.base.default,
      bgPressed: cssVarColors.surface.kakao.defaultPressed,
      color: cssVarColors.content.base.strong,
      border: cssVarColors.surface.kakao.default,
    },
  },
  googleDefault: {
    filled: {
      bg: cssVarColors.surface.google.default,
      bgPressed: cssVarColors.surface.google.defaultPressed,
      color: cssVarColors.content.base.default,
    },
    outlined: {
      bg: cssVarColors.surface.base.default,
      bgPressed: cssVarColors.surface.google.defaultPressed,
      color: cssVarColors.content.base.default,
      border: cssVarColors.border.base.default,
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
        ? cssVarColors.surface.disabled.default
        : (isPressed ? colorStyle.bgPressed : colorStyle.bg),
      color: isDisabled ? cssVarColors.content.disabled.default : colorStyle.color,
      border: buttonType === 'outlined'
        ? `1px solid ${isDisabled ? cssVarColors.border.disabled.default : (colorStyle as { border: string }).border}`
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
