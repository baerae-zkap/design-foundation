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
 *   <Button buttonType="filled" color="primary" onClick={() => {}}>
 *     확인
 *   </Button>
 *   <Button buttonType="weak" color="primary" onClick={() => {}}>
 *     취소
 *   </Button>
 * </ActionArea>
 */

import React, { forwardRef, useId, type HTMLAttributes, type ReactNode, Children, isValidElement, cloneElement } from 'react';
import { cssVarColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';
import { zIndex as zIndexToken } from '../../tokens/general';
import { Button } from '../Button/Button';
import { TextButton } from '../TextButton/TextButton';

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
  /** 버튼 상단에 추가 콘텐츠 (예: 약관 동의 체크박스, 안내 텍스트) */
  topAccessory?: ReactNode;
  /** 버튼 그룹의 접근성 레이블 (스크린 리더용) */
  'aria-label'?: string;
  /** 버튼 요소들 (Button, TextButton 컴포넌트) */
  children: ReactNode;
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
      topAccessory,
      useSafeArea = true,
      backgroundColor = cssVarColors.surface.base.default,
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
      zIndex: position !== 'static' ? zIndexToken.sticky : undefined,
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
        const isButton = child.type === Button;
        const isTextButton = child.type === TextButton;

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

    const autoId = useId();
    const captionId = caption ? `${props.id ?? autoId}-caption` : undefined;

    return (
      <div
        ref={ref}
        role="group"
        aria-describedby={captionId}
        style={containerStyle}
        {...props}
      >
        {/* Gradient Overlay */}
        {showGradient && position !== 'static' && (
          <div
            style={{
              position: 'absolute',
              top: -gradientHeight,
              left: 0,
              right: 0,
              height: gradientHeight,
              background: `linear-gradient(to bottom, color-mix(in srgb, ${backgroundColor} 0%, transparent) 0%, ${backgroundColor} 100%)`,
              pointerEvents: 'none',
            }}
          />
        )}

        {/* Content Area */}
        <div style={innerStyle}>
          {/* Top Accessory */}
          {topAccessory && (
            <div style={{ marginBottom: spacing.component.modal.buttonGap }}>
              {topAccessory}
            </div>
          )}

          {/* Caption */}
          {caption && (
            <p
              id={captionId}
              style={{
                fontSize: typography.fontSize.sm,
                lineHeight: typography.lineHeight.sm,
                color: cssVarColors.content.base.neutral,
                textAlign: 'center',
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
