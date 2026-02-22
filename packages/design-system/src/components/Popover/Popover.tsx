/**
 * Popover Component (Web)
 *
 * @description 트리거 근처 또는 화면 중앙에 떠오르는 플로팅 정보 카드입니다.
 * 기능 안내, 온보딩 힌트, 간단한 확인 메시지 등에 사용합니다.
 *
 * Anatomy:
 *   Container → [Close button] → [Heading] → Description → [Actions]
 *
 * @example
 * <Popover
 *   heading="새로운 기능이에요"
 *   description="이제 알림을 설정하고 중요한 내용을 놓치지 않을 수 있어요."
 *   action={<TextButton color="primary">확인했어요</TextButton>}
 *   subAction={<TextButton color="muted">나중에</TextButton>}
 *   showClose
 *   onClose={() => setOpen(false)}
 * />
 */

'use client';

import { forwardRef, type ReactNode, type JSX } from 'react';
import { cssVarColors } from '../../tokens/colors';
import { cssVarShadow } from '../../tokens/shadow';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';
import { duration, easing } from '../../tokens/motion';

export type PopoverSize = 'sm' | 'md';

export interface PopoverProps {
  /** 표시 여부 @default true */
  open?: boolean;
  /** 닫기 콜백 (X 버튼 클릭 시) */
  onClose?: () => void;
  /** 헤더 제목 (optional) */
  heading?: string;
  /** 본문 설명 텍스트 */
  description: string;
  /** 주요 액션 (우측 하단 CTA — TextButton 권장) */
  action?: ReactNode;
  /** 보조 액션 (좌측 하단 — TextButton color="muted" 권장) */
  subAction?: ReactNode;
  /**
   * X 닫기 버튼 표시 여부
   * @default false
   */
  showClose?: boolean;
  /**
   * 팝오버 최대 너비
   * @default 'md'
   */
  size?: PopoverSize;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 인라인 스타일 (위치 지정 등) */
  style?: React.CSSProperties;
}

const MAX_WIDTHS: Record<PopoverSize, number> = {
  sm: 240,
  md: 320,
};

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  function Popover(
    {
      open = true,
      onClose,
      heading,
      description,
      action,
      subAction,
      showClose = false,
      size = 'md',
      className,
      style,
    },
    ref
  ): JSX.Element | null {
    if (!open) return null;

    const hasActions = Boolean(action || subAction);

    const containerStyle: React.CSSProperties = {
      position: 'relative',
      display: 'inline-block',
      maxWidth: MAX_WIDTHS[size],
      width: '100%',
      backgroundColor: cssVarColors.surface.base.default,
      borderRadius: radius.primitive.xl,
      padding: `${spacing.primitive[5]}px`,
      boxShadow: cssVarShadow.semantic.card.floating,
      boxSizing: 'border-box',
      animation: `popover-in ${duration.fast}ms ${easing.easeOut} both`,
    };

    return (
      <>
      <style>{`
        @keyframes popover-in {
          from { opacity: 0; transform: scale(0.94); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
      <div
        ref={ref}
        role="dialog"
        aria-modal="false"
        style={{ ...containerStyle, ...style }}
        className={className}
      >
        {/* Close button */}
        {showClose && (
          <button
            onClick={onClose}
            aria-label="닫기"
            style={{
              position: 'absolute',
              top: spacing.primitive[3],
              right: spacing.primitive[3],
              width: 24,
              height: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: cssVarColors.content.base.secondary,
              borderRadius: radius.primitive.full,
              padding: 0,
              flexShrink: 0,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 1l12 12M13 1L1 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}

        {/* Heading */}
        {heading && (
          <div
            style={{
              fontSize: typography.fontSize.md,
              fontWeight: typography.fontWeight.bold,
              color: cssVarColors.content.base.default,
              lineHeight: 1.4,
              marginBottom: spacing.primitive[2],
              paddingRight: showClose ? spacing.primitive[7] : 0,
            }}
          >
            {heading}
          </div>
        )}

        {/* Description */}
        <div
          style={{
            fontSize: typography.fontSize.sm,
            color: cssVarColors.content.base.secondary,
            lineHeight: 1.6,
            paddingRight: showClose && !heading ? spacing.primitive[7] : 0,
          }}
        >
          {description}
        </div>

        {/* Actions */}
        {hasActions && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: subAction ? 'space-between' : 'flex-end',
              marginTop: spacing.primitive[4],
              gap: spacing.primitive[2],
            }}
          >
            {subAction && <div>{subAction}</div>}
            {action && <div>{action}</div>}
          </div>
        )}
      </div>
      </>
    );
  }
);

Popover.displayName = 'Popover';
