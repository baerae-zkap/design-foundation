/**
 * AlertDialog Component (Web)
 *
 * @description 사용자에게 중요한 정보를 전달하거나 단일 확인 액션을 요구하는 모달 다이얼로그입니다.
 *
 * Anatomy (Montage 패턴):
 *   Scene (backdrop) → Container → [Heading] → Body → Action
 *
 * - title: 선택적 헤딩 (없으면 aria-label 필수)
 * - description: 본문 내용
 * - actions: 1-2개의 버튼 (structured API)
 * - closeOnDimmerClick: 기본 false (중요 알림은 의도적 결정 유도)
 *
 * @example
 * <AlertDialog
 *   open={isOpen}
 *   onClose={() => setOpen(false)}
 *   title="삭제하시겠어요?"
 *   description="이 작업은 되돌릴 수 없습니다."
 *   actions={[
 *     { label: '취소', onClick: () => setOpen(false), color: 'neutral', variant: 'weak' },
 *     { label: '삭제', onClick: handleDelete, color: 'error', variant: 'filled' },
 *   ]}
 * />
 */

'use client';

import { useState, useEffect, useId, type ReactNode, type JSX } from 'react';
import { createPortal } from 'react-dom';
import { cssVarColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';
import { radius } from '../../tokens/radius';
import { zIndex } from '../../tokens/general';
import { cssVarShadow } from '../../tokens/shadow';
import { duration, easing } from '../../tokens/motion';
import { Button } from '../Button/Button';
import type { ButtonColor } from '../Button/Button';

// Inject keyframe animations once
let stylesInjected = false;
function injectStyles() {
  if (stylesInjected || typeof document === 'undefined') return;
  stylesInjected = true;
  const style = document.createElement('style');
  style.textContent = `
    @keyframes _zkap_ad_backdrop_in {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes _zkap_ad_backdrop_out {
      from { opacity: 1; }
      to   { opacity: 0; }
    }
    @keyframes _zkap_ad_in {
      from { opacity: 0; transform: translateY(28px); }
      to   { opacity: 1; transform: translateY(0);    }
    }
    @keyframes _zkap_ad_out {
      from { opacity: 1; transform: translateY(0);    }
      to   { opacity: 0; transform: translateY(28px); }
    }
  `;
  document.head.appendChild(style);
}

export interface DialogAction {
  /** 버튼 레이블 */
  label: string;
  /** 버튼 클릭 핸들러 */
  onClick: () => void;
  /** 버튼 색상 */
  color?: ButtonColor;
  /** 버튼 타입 */
  variant?: 'filled' | 'weak';
}

export interface DialogProps {
  /** 다이얼로그 열림 여부 */
  open: boolean;
  /** 닫기 콜백 */
  onClose: () => void;
  /** 제목 (선택적 — 없으면 aria-label 필수) */
  title?: ReactNode;
  /** 본문 내용 */
  description?: ReactNode;
  /** 액션 버튼 목록 (1-2개) */
  actions: DialogAction[];
  /**
   * 백드롭 클릭 시 닫기 여부
   * @default false — Alert는 의도적 결정을 유도
   */
  closeOnDimmerClick?: boolean;
  /** title 없을 때 접근성용 레이블 */
  'aria-label'?: string;
}

const ANIMATION_DURATION = duration.fast; // ms

export function Dialog({
  open,
  onClose,
  title,
  description,
  actions,
  closeOnDimmerClick = false,
  'aria-label': ariaLabel,
}: DialogProps): JSX.Element | null {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const id = useId();
  const titleId = `${id}-title`;
  const descId = `${id}-desc`;

  useEffect(() => {
    injectStyles();
  }, []);

  useEffect(() => {
    if (open) {
      setMounted(true);
      // 한 프레임 후 visible=true → enter animation 트리거
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    } else {
      setVisible(false);
      const timer = setTimeout(() => setMounted(false), ANIMATION_DURATION);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Body scroll lock
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  if (!mounted || typeof document === 'undefined') return null;

  const backdropStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    backgroundColor: cssVarColors.overlay.dim,
    zIndex: zIndex.modal,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `0 ${spacing.primitive[5]}px`,
    animation: `${visible ? '_zkap_ad_backdrop_in' : '_zkap_ad_backdrop_out'} ${ANIMATION_DURATION}ms ${easing.easeInOut} both`,
  };

  const containerStyle: React.CSSProperties = {
    backgroundColor: cssVarColors.surface.base.default,
    borderRadius: radius.primitive['2xl'],
    boxShadow: cssVarShadow.semantic.modal.default,
    width: '100%',
    maxWidth: 360,
    padding: spacing.primitive[6],
    outline: 'none',
    animation: `${visible ? '_zkap_ad_in' : '_zkap_ad_out'} ${ANIMATION_DURATION}ms ${easing.easeOut} both`,
  };

  const titleStyle: React.CSSProperties = {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: cssVarColors.content.base.default,
    lineHeight: 1.4,
    marginBottom: description ? spacing.primitive[2] : 0,
  };

  const descStyle: React.CSSProperties = {
    fontSize: typography.fontSize.sm,
    color: cssVarColors.content.base.secondary,
    lineHeight: 1.6,
  };

  const actionsStyle: React.CSSProperties = {
    display: 'flex',
    gap: spacing.primitive[2],
    marginTop: spacing.primitive[5],
    justifyContent: 'stretch',
  };

  return createPortal(
    <div
      style={backdropStyle}
      onClick={closeOnDimmerClick ? onClose : undefined}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={!title ? ariaLabel : undefined}
        aria-describedby={description ? descId : undefined}
        style={containerStyle}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {title && (
          <div id={titleId} style={titleStyle}>{title}</div>
        )}
        {description && (
          <div id={descId} style={descStyle}>{description}</div>
        )}
        <div style={actionsStyle}>
          {actions.map((action, i) => (
            <Button
              key={i}
              buttonType={action.variant ?? (i === actions.length - 1 ? 'filled' : 'weak')}
              color={action.color ?? (i === actions.length - 1 ? 'primary' : 'neutral')}
              size="medium"
              layout="fillWidth"
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}

Dialog.displayName = 'Dialog';
