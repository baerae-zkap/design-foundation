/**
 * ActionArea Component (Web)
 *
 * @description 모달, 바텀시트, 화면 하단에서 버튼 그룹을 제공하는 컴포넌트입니다.
 * 스크롤 시 하단에 고정되며, 상단 그라데이션으로 콘텐츠가 자연스럽게 페이드됩니다.
 *
 * ActionArea는 Button, TextButton 컴포넌트를 children으로 받아 레이아웃을 구성합니다.
 * @see docs/components/ActionArea.md - AI용 상세 가이드
 *
 * @example
 * <ActionArea variant="strong" position="sticky">
 *   <Button buttonType="filled" color="brandDefault" onClick={() => {}}>
 *     확인
 *   </Button>
 *   <Button buttonType="outlined" color="brandDefault" onClick={() => {}}>
 *     취소
 *   </Button>
 * </ActionArea>
 */

import React, { forwardRef, type HTMLAttributes, type ReactNode, Children, isValidElement, cloneElement } from 'react';
import { colors, palette } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';

// ============================================
// Types
// ============================================

export type ActionAreaVariant = 'strong' | 'neutral' | 'compact';
export type ActionAreaPosition = 'static' | 'sticky' | 'fixed';

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
  /** 버튼 요소들 (Button, TextButton 컴포넌트) */
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
// Variant Layouts
// ============================================

const variantLayouts: Record<ActionAreaVariant, React.CSSProperties> = {
  strong: {
    flexDirection: 'column',
    gap: spacing.component.modal.buttonGap,
  },
  neutral: {
    flexDirection: 'row',
    gap: spacing.component.modal.buttonGap,
  },
  compact: {
    flexDirection: 'row',
    gap: spacing.component.modal.buttonGap,
    justifyContent: 'flex-end',
  },
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
      gradientHeight = 48,
      caption,
      useSafeArea = true,
      backgroundColor = colors.surface.base.default,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const layout = variantLayouts[variant];
    const isVertical = variant === 'strong';
    const isCompact = variant === 'compact';

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
      padding: spacing.component.bottomSheet.padding,
      paddingBottom: useSafeArea
        ? spacing.component.bottomSheet.padding + spacing.semantic.screen.safeAreaBottom
        : spacing.component.bottomSheet.padding,
      backgroundColor,
    };

    const buttonContainerStyle: React.CSSProperties = {
      display: 'flex',
      ...layout,
    };

    // Process children to add proper styling for layout
    const processedChildren = Children.map(children, (child) => {
      if (isValidElement(child)) {
        const childType = child.type as { displayName?: string };
        const isButton = childType.displayName === 'Button';
        const isTextButton = childType.displayName === 'TextButton';

        if (isButton) {
          // In non-compact horizontal layouts, buttons should fill width equally
          const shouldFillWidth = !isCompact;
          const existingStyle = (child.props as { style?: React.CSSProperties }).style || {};

          return cloneElement(child as React.ReactElement<{ layout?: string; style?: React.CSSProperties }>, {
            layout: shouldFillWidth ? 'fillWidth' : (child.props as { layout?: string }).layout,
            style: {
              ...existingStyle,
              // In horizontal layouts, each button gets flex: 1 for equal width
              ...((!isVertical && !isCompact) && { flex: 1 }),
            },
          });
        }

        if (isTextButton) {
          const existingStyle = (child.props as { style?: React.CSSProperties }).style || {};
          return cloneElement(child as React.ReactElement<{ style?: React.CSSProperties }>, {
            style: {
              ...existingStyle,
              alignSelf: 'center',
            },
          });
        }
      }
      return child;
    });

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
                fontSize: typography.fontSize.sm,
                color: palette.grey[60],
                textAlign: 'center',
                lineHeight: 1.5,
                margin: 0,
                marginBottom: spacing.component.modal.buttonGap,
              }}
            >
              {caption}
            </p>
          )}

          {/* Buttons */}
          <div style={buttonContainerStyle}>{processedChildren}</div>
        </div>
      </div>
    );
  }
);

ActionArea.displayName = 'ActionArea';
