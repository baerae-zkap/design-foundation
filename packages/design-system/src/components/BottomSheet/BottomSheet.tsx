/**
 * BottomSheet Component (Web)
 *
 * @description 화면 하단에서 슬라이드 업 되는 시트 컴포넌트입니다.
 * 부가 정보, 옵션 선택, 액션 메뉴 등을 표시할 때 사용합니다.
 *
 * Anatomy:
 *   Overlay (backdrop) → Sheet → [Handle] → [Header] → [Content] → [Actions]
 *
 * - showHandle: 드래그 핸들 표시 여부 (기본 true)
 * - scrollable: 콘텐츠 영역 스크롤 허용 여부 (기본 false)
 * - actions: 하단 고정 액션 영역 (ReactNode)
 * - maxHeight: 시트 최대 높이 (기본 '90vh')
 *
 * @example
 * <BottomSheet
 *   open={isOpen}
 *   onClose={() => setOpen(false)}
 *   title="옵션 선택"
 *   description="원하는 옵션을 선택해주세요."
 *   actions={<Button buttonType="filled" color="primary" layout="fillWidth">확인</Button>}
 * >
 *   <div>콘텐츠</div>
 * </BottomSheet>
 */

'use client';

import { forwardRef, type ReactNode, type JSX } from 'react';
import { cssVarColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';
import { zIndex } from '../../tokens/general';
import { duration, easing } from '../../tokens/motion';

// Inject keyframe animations once
let stylesInjected = false;
function ensureKeyframes() {
  if (stylesInjected || typeof document === 'undefined') return;
  stylesInjected = true;
  const style = document.createElement('style');
  style.textContent = `
    @keyframes bs-slide-up {
      from { transform: translateY(100%); }
      to   { transform: translateY(0); }
    }
    @keyframes bs-fade-in {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
  `;
  document.head.appendChild(style);
}

export interface BottomSheetProps {
  /** 시트 열림 여부 */
  open?: boolean;
  /** 닫기 콜백 */
  onClose?: () => void;
  /** 헤더 제목 — string 또는 ReactNode (색상 강조 span 등) */
  title?: ReactNode;
  /** 헤더 설명 텍스트 — string 또는 ReactNode */
  description?: ReactNode;
  /** 하단 고정 액션 영역 (메인 CTA 버튼) */
  actions?: ReactNode;
  /**
   * 메인 액션 버튼 위 보조 텍스트 링크 영역
   * 예: <TextButton onClick={...}>한 곳에서 구매할게요</TextButton>
   */
  footerLink?: ReactNode;
  /** 스크롤 가능한 콘텐츠 영역 */
  children?: ReactNode;
  /**
   * 드래그 핸들 표시 여부
   * @default true
   */
  showHandle?: boolean;
  /**
   * 시트 최대 높이
   * @default '90vh'
   */
  maxHeight?: string | number;
  /**
   * 콘텐츠 영역 스크롤 허용 여부
   * @default false
   */
  scrollable?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 접근성용 레이블 ID */
  'aria-labelledby'?: string;
}

export const BottomSheet = forwardRef<HTMLDivElement, BottomSheetProps>(
  function BottomSheet(
    {
      open = false,
      onClose,
      title,
      description,
      actions,
      footerLink,
      children,
      showHandle = true,
      maxHeight = '90vh',
      scrollable = false,
      className,
      'aria-labelledby': ariaLabelledBy,
    },
    ref
  ): JSX.Element | null {
    if (!open) return null;

    ensureKeyframes();

    const overlayStyle: React.CSSProperties = {
      position: 'fixed',
      inset: 0,
      backgroundColor: cssVarColors.overlay.dim,
      zIndex: zIndex.modal,
      animation: `bs-fade-in ${duration.fast}ms ${easing.easeInOut} both`,
    };

    const sheetStyle: React.CSSProperties = {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: cssVarColors.surface.base.default,
      borderTopLeftRadius: radius.primitive.xl,
      borderTopRightRadius: radius.primitive.xl,
      zIndex: zIndex.modal,
      maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
      display: 'flex',
      flexDirection: 'column',
      animation: `bs-slide-up ${duration.normal}ms cubic-bezier(0.32, 0.72, 0, 1) both`,
    };

    const handleWrapperStyle: React.CSSProperties = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: spacing.primitive[2],
      paddingBottom: spacing.primitive[2],
      flexShrink: 0,
    };

    const handleStyle: React.CSSProperties = {
      width: 36,
      height: 4,
      backgroundColor: cssVarColors.fill.normal,
      borderRadius: radius.primitive.full,
    };

    const hasHeader = Boolean(title || description);

    const headerStyle: React.CSSProperties = {
      paddingTop: showHandle ? spacing.primitive[2] : spacing.primitive[4],
      paddingBottom: spacing.primitive[3],
      paddingInline: spacing.semantic.screen.paddingX,
      flexShrink: 0,
    };

    const titleStyle: React.CSSProperties = {
      fontSize: typography.fontSize.lg,
      fontWeight: typography.fontWeight.bold,
      color: cssVarColors.content.base.default,
      lineHeight: 1.4,
      margin: 0,
    };

    const descriptionStyle: React.CSSProperties = {
      fontSize: typography.fontSize.sm,
      color: cssVarColors.content.base.secondary,
      lineHeight: 1.6,
      marginTop: spacing.primitive[1],
      margin: 0,
      marginBlockStart: spacing.primitive[1],
    };

    const contentStyle: React.CSSProperties = {
      flex: 1,
      overflowY: scrollable ? 'auto' : 'hidden',
      paddingInline: spacing.semantic.screen.paddingX,
      paddingBottom: spacing.primitive[4],
    };

    const footerLinkStyle: React.CSSProperties = {
      textAlign: 'center',
      paddingTop: spacing.primitive[4],
      paddingBottom: spacing.primitive[1],
      paddingInline: spacing.semantic.screen.paddingX,
      flexShrink: 0,
    };

    const actionsStyle: React.CSSProperties = {
      paddingTop: spacing.primitive[3],
      paddingBottom: spacing.primitive[6],
      paddingInline: spacing.semantic.screen.paddingX,
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: spacing.primitive[2],
    };

    return (
      <>
        <div
          style={overlayStyle}
          onClick={onClose}
          aria-hidden="true"
        />
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-labelledby={ariaLabelledBy}
          style={sheetStyle}
          className={className}
        >
          {showHandle && (
            <div style={handleWrapperStyle}>
              <div style={handleStyle} />
            </div>
          )}

          {hasHeader && (
            <div style={headerStyle}>
              {title && (
                <div style={titleStyle}>{title}</div>
              )}
              {description && (
                <div style={descriptionStyle}>{description}</div>
              )}
            </div>
          )}

          {children && (
            <div style={contentStyle}>
              {children}
            </div>
          )}

          {footerLink && (
            <div style={footerLinkStyle}>
              {footerLink}
            </div>
          )}

          {actions && (
            <div style={actionsStyle}>
              {actions}
            </div>
          )}
        </div>
      </>
    );
  }
);

BottomSheet.displayName = 'BottomSheet';
