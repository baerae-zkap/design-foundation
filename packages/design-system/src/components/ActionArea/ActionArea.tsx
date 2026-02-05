/**
 * ActionArea Component (Web)
 *
 * @description 모달, 바텀시트, 화면 하단에서 버튼 그룹을 제공하는 컴포넌트입니다.
 * 스크롤 시 하단에 고정되며, 상단 그라데이션으로 콘텐츠가 자연스럽게 페이드됩니다.
 * @see docs/components/ActionArea.md - AI용 상세 가이드
 *
 * @example
 * <ActionArea variant="strong" position="sticky">
 *   <ActionAreaButton variant="main" onClick={() => {}}>
 *     확인
 *   </ActionAreaButton>
 *   <ActionAreaButton variant="alternative" onClick={() => {}}>
 *     취소
 *   </ActionAreaButton>
 * </ActionArea>
 */

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

// ============================================
// Types
// ============================================

export type ActionAreaVariant = 'strong' | 'neutral' | 'compact';
export type ActionAreaPosition = 'static' | 'sticky' | 'fixed';
export type ActionAreaButtonVariant = 'main' | 'alternative' | 'sub';

export interface ActionAreaProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** 레이아웃 variant - strong(세로/메인상단), neutral(가로/균등), compact(가로/우측정렬) */
  variant?: ActionAreaVariant;
  /** 위치 설정 - static(기본), sticky(스크롤시고정), fixed(항상고정) */
  position?: ActionAreaPosition;
  /** 상단 그라데이션 표시 여부 */
  showGradient?: boolean;
  /** 그라데이션 높이 (px) */
  gradientHeight?: number;
  /** 캡션 텍스트 (버튼 상단에 표시) */
  caption?: string;
  /** Safe area 하단 패딩 적용 여부 (모바일 홈 인디케이터 영역) */
  useSafeArea?: boolean;
  /** 배경색 */
  backgroundColor?: string;
  /** 버튼 요소들 */
  children: ReactNode;
}

export interface ActionAreaButtonProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'color'> {
  /** 버튼 역할 - main(주요), alternative(대안), sub(보조) */
  variant?: ActionAreaButtonVariant;
  /** 버튼 크기 */
  size?: 'small' | 'medium' | 'large' | 'xLarge';
  /** 로딩 상태 */
  isLoading?: boolean;
  /** 비활성화 */
  disabled?: boolean;
  /** 버튼 텍스트 */
  children: ReactNode;
}

// ============================================
// Color Utilities
// ============================================

/**
 * Convert a color to its transparent version (alpha = 0)
 * This prevents the "transparent black" issue in gradients
 * where 'transparent' is interpreted as rgba(0,0,0,0)
 */
function toTransparent(color: string): string {
  // Handle common color names
  if (color === 'white' || color === '#fff' || color === '#ffffff') {
    return 'rgba(255,255,255,0)';
  }
  if (color === 'black' || color === '#000' || color === '#000000') {
    return 'rgba(0,0,0,0)';
  }
  // Handle hex colors
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    let r, g, b;
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else {
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
    }
    return `rgba(${r},${g},${b},0)`;
  }
  // Handle rgb/rgba
  if (color.startsWith('rgb')) {
    const match = color.match(/\d+/g);
    if (match) {
      const [r, g, b] = match;
      return `rgba(${r},${g},${b},0)`;
    }
  }
  // Fallback to transparent white
  return 'rgba(255,255,255,0)';
}

// ============================================
// Spacing Tokens (from Foundation)
// ============================================

const tokens = {
  modal: {
    padding: 24,
    buttonGap: 12,
  },
  bottomSheet: {
    padding: 20,
  },
  safeArea: {
    bottom: 32, // 홈 인디케이터 영역
  },
};

// ============================================
// Variant Layouts
// ============================================

const variantLayouts: Record<ActionAreaVariant, React.CSSProperties> = {
  strong: {
    flexDirection: 'column',
    gap: tokens.modal.buttonGap,
  },
  neutral: {
    flexDirection: 'row',
    gap: tokens.modal.buttonGap,
  },
  compact: {
    flexDirection: 'row',
    gap: tokens.modal.buttonGap,
    justifyContent: 'flex-end',
  },
};

// ============================================
// Button Styles
// ============================================

const buttonVariantStyles: Record<ActionAreaButtonVariant, React.CSSProperties> = {
  main: {
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
  },
  alternative: {
    backgroundColor: 'white',
    color: '#2563eb',
    border: '1px solid #2563eb',
  },
  sub: {
    backgroundColor: 'transparent',
    color: '#6b7280',
    border: 'none',
  },
};

const buttonSizeStyles: Record<string, { height: number; fontSize: number; padding: string }> = {
  small: { height: 36, fontSize: 14, padding: '0 16px' },
  medium: { height: 40, fontSize: 14, padding: '0 16px' },
  large: { height: 44, fontSize: 14, padding: '0 20px' },
  xLarge: { height: 48, fontSize: 16, padding: '0 24px' },
};

// ============================================
// ActionArea Component
// ============================================

export const ActionArea = forwardRef<HTMLDivElement, ActionAreaProps>(
  (
    {
      variant = 'strong',
      position = 'static',
      showGradient = true,
      gradientHeight = 80,
      caption,
      useSafeArea = true,
      backgroundColor = 'white',
      children,
      style,
      ...props
    },
    ref
  ) => {
    const layout = variantLayouts[variant];

    const containerStyle: React.CSSProperties = {
      position: position === 'static' ? 'relative' : position,
      bottom: position !== 'static' ? 0 : undefined,
      left: position === 'fixed' ? 0 : undefined,
      right: position === 'fixed' ? 0 : undefined,
      width: position === 'fixed' ? '100%' : undefined,
      zIndex: position !== 'static' ? 100 : undefined,
      ...style,
    };

    const innerStyle: React.CSSProperties = {
      padding: tokens.bottomSheet.padding,
      paddingBottom: useSafeArea
        ? tokens.bottomSheet.padding + tokens.safeArea.bottom
        : tokens.bottomSheet.padding,
      backgroundColor,
    };

    const buttonContainerStyle: React.CSSProperties = {
      display: 'flex',
      ...layout,
    };

    return (
      <div ref={ref} style={containerStyle} {...props}>
        {/* Gradient Overlay */}
        {showGradient && position !== 'static' && (
          <div
            style={{
              position: 'absolute',
              top: -gradientHeight,
              left: 0,
              right: 0,
              height: gradientHeight,
              background: `linear-gradient(to bottom, ${toTransparent(backgroundColor)} 0%, ${backgroundColor} 100%)`,
              pointerEvents: 'none',
            }}
          />
        )}

        {/* Content Area */}
        <div style={innerStyle}>
          {/* Caption */}
          {caption && (
            <p
              style={{
                fontSize: 14,
                color: '#6b7280',
                textAlign: 'center',
                lineHeight: 1.5,
                margin: 0,
                marginBottom: tokens.modal.buttonGap,
              }}
            >
              {caption}
            </p>
          )}

          {/* Buttons */}
          <div style={buttonContainerStyle}>{children}</div>
        </div>
      </div>
    );
  }
);

ActionArea.displayName = 'ActionArea';

// ============================================
// ActionAreaButton Component
// ============================================

export const ActionAreaButton = forwardRef<HTMLButtonElement, ActionAreaButtonProps>(
  (
    {
      variant = 'main',
      size = 'xLarge',
      isLoading = false,
      disabled = false,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const variantStyle = buttonVariantStyles[variant];
    const sizeStyle = buttonSizeStyles[size];
    const isDisabled = disabled || isLoading;

    const buttonStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: sizeStyle.height,
      padding: sizeStyle.padding,
      fontSize: sizeStyle.fontSize,
      fontWeight: 600,
      borderRadius: 8,
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      transition: 'all 150ms ease',
      width: variant === 'sub' ? 'auto' : '100%',
      opacity: isDisabled ? 0.5 : 1,
      ...variantStyle,
      ...(isDisabled && {
        backgroundColor: variant === 'main' ? '#e2e8f0' : 'transparent',
        color: '#94a3b8',
        border: variant === 'alternative' ? '1px solid #e2e8f0' : 'none',
      }),
      ...style,
    };

    return (
      <button ref={ref} disabled={isDisabled} style={buttonStyle} {...props}>
        {isLoading ? <LoadingDots /> : children}
      </button>
    );
  }
);

ActionAreaButton.displayName = 'ActionAreaButton';

// ============================================
// LoadingDots
// ============================================

function LoadingDots() {
  return (
    <span style={{ display: 'flex', gap: 4 }}>
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
