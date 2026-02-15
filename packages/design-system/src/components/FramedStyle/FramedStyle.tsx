/**
 * FramedStyle Component (Web)
 *
 * @description 여러 요소를 하나의 프레임으로 감싸 정보의 그룹화를 명확히 하기 위한 컴포넌트.
 * @see docs/components/FramedStyle.md - AI용 상세 가이드
 *
 * @example
 * <FramedStyle size="medium" selected={false}>
 *   <ListCell title="홍길동" subtitle="hong@example.com" />
 * </FramedStyle>
 */

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cssVarColors } from '../../tokens/colors';
import { cssVarShadow } from '../../tokens/shadow';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { opacity } from '../../tokens/general';
import { usePressable } from '../../utils/usePressable';
import { transitions } from '../../utils/styles';

export type FramedStyleVariant = 'normal' | 'negative';
export type FramedStyleSize = 'small' | 'medium' | 'large' | 'xlarge';

export interface FramedStyleProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Child content to wrap */
  children: ReactNode;
  /** Visual variant */
  variant?: FramedStyleVariant;
  /** Selected state - shows brand border + shadow */
  selected?: boolean;
  /** Size preset (padding + borderRadius) */
  size?: FramedStyleSize;
  /** Custom padding override */
  padding?: number;
  /** Custom borderRadius override */
  borderRadius?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Click handler (makes the frame tappable) */
  onClick?: () => void;
}

// Size config using Foundation tokens
const sizeConfig: Record<FramedStyleSize, { padding: number; borderRadius: number }> = {
  small: { padding: spacing.primitive[2], borderRadius: radius.primitive.sm },
  medium: { padding: spacing.primitive[3], borderRadius: radius.primitive.md },
  large: { padding: spacing.primitive[4], borderRadius: radius.primitive.lg },
  xlarge: { padding: spacing.primitive[5], borderRadius: radius.primitive.xl },
};

export const FramedStyle = forwardRef<HTMLDivElement, FramedStyleProps>(
  (
    {
      children,
      variant = 'normal',
      selected = false,
      size = 'medium',
      padding: customPadding,
      borderRadius: customBorderRadius,
      disabled = false,
      onClick,
      style,
      ...props
    },
    ref
  ) => {
    const sizeStyle = sizeConfig[size];
    const isInteractive = !!onClick && !disabled;

    const { isPressed, handlers } = usePressable<HTMLDivElement>({
      disabled: !isInteractive,
      onMouseDown: onClick ? () => onClick() : undefined,
    });

    // Determine border color based on variant and selection
    const getBorderColor = () => {
      if (selected) {
        return variant === 'negative'
          ? cssVarColors.border.error.default
          : cssVarColors.content.brand.default;
      }
      return cssVarColors.border.solid.alternative;
    };

    const containerStyle: React.CSSProperties = {
      backgroundColor: isPressed && isInteractive
        ? cssVarColors.surface.base.container
        : cssVarColors.surface.base.default,
      borderWidth: selected ? 1.5 : 1,
      borderStyle: 'solid',
      borderColor: getBorderColor(),
      borderRadius: customBorderRadius ?? sizeStyle.borderRadius,
      padding: customPadding ?? sizeStyle.padding,
      opacity: disabled ? opacity.disabled : 1,
      cursor: isInteractive ? 'pointer' : 'default',
      transition: transitions.all,
      ...(selected && {
        boxShadow: cssVarShadow.semantic.card.floating,
      }),
      ...style,
    };

    const content = <div style={{ flex: 1 }}>{children}</div>;

    if (isInteractive) {
      return (
        <div
          ref={ref}
          style={containerStyle}
          {...handlers}
          {...props}
        >
          {content}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        style={containerStyle}
        {...props}
      >
        {content}
      </div>
    );
  }
);

FramedStyle.displayName = 'FramedStyle';
