/**
 * Toast Component (Web)
 *
 * @description 화면 하단에 일시적으로 표시되는 알림 컴포넌트입니다.
 * Heading + Description 두 줄 레이아웃을 지원하며, React Portal로 렌더링됩니다.
 *
 * @example
 * <Toast
 *   open={isOpen}
 *   heading="저장 완료"
 *   description="변경사항이 성공적으로 저장되었습니다."
 *   onClose={() => setOpen(false)}
 * />
 */

'use client';

import { useEffect, useState, type ReactNode, type JSX } from 'react';
import { createPortal } from 'react-dom';
import { cssVarColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';
import { zIndex } from '../../tokens/general';
import { duration, easing } from '../../tokens/motion';

export type ToastPosition = 'bottom-center' | 'bottom-left' | 'bottom-right';

export interface ToastProps {
  /** 토스트 표시 여부 */
  open: boolean;
  /** 닫기 콜백 */
  onClose?: () => void;
  /** 굵은 제목 텍스트 */
  heading?: ReactNode;
  /** 보조 설명 텍스트 */
  description?: ReactNode;
  /** 선택적 리딩 아이콘 슬롯 (24×24 권장) */
  icon?: ReactNode;
  /** 선택적 우측 액션 슬롯 */
  action?: ReactNode;
  /** 닫기(X) 버튼 표시 여부. @default false */
  closable?: boolean;
  /** 자동 닫힘 시간(ms). null이면 자동 닫힘 없음. @default 4000 */
  duration?: number | null;
  /** 표시 위치. @default 'bottom-center' */
  position?: ToastPosition;
}

// ─── Animation injection ──────────────────────────────────────────────────────

const ANIM_DURATION = duration.fast;

let stylesInjected = false;
function injectStyles() {
  if (stylesInjected || typeof document === 'undefined') return;
  stylesInjected = true;
  const style = document.createElement('style');
  style.textContent = `
    @keyframes _zkap_toast_in {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0);    }
    }
    @keyframes _zkap_toast_out {
      from { opacity: 1; transform: translateY(0);    }
      to   { opacity: 0; transform: translateY(10px); }
    }
  `;
  document.head.appendChild(style);
}

// ─── Close icon ───────────────────────────────────────────────────────────────

function CloseIcon(): JSX.Element {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Toast({
  open,
  onClose,
  heading,
  description,
  icon,
  action,
  closable = false,
  duration = 4000,
  position = 'bottom-center',
}: ToastProps): JSX.Element | null {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    injectStyles();
  }, []);

  useEffect(() => {
    if (open) {
      setMounted(true);
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
      return () => cancelAnimationFrame(raf);
    } else {
      setVisible(false);
      const timer = setTimeout(() => setMounted(false), ANIM_DURATION);
      return () => clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    if (!open || duration === null || duration === undefined) return;
    const timer = setTimeout(() => onClose?.(), duration);
    return () => clearTimeout(timer);
  }, [open, duration, onClose]);

  if (!mounted || typeof document === 'undefined') return null;

  const isCenter = position === 'bottom-center';
  const isRight = position === 'bottom-right';

  const wrapperStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: spacing.primitive[10],
    left: isCenter ? 0 : (isRight ? 'auto' : spacing.primitive[5]),
    right: isRight ? spacing.primitive[5] : (isCenter ? 0 : 'auto'),
    display: isCenter ? 'flex' : 'block',
    justifyContent: 'center',
    zIndex: zIndex.toast,
    pointerEvents: 'none',
    padding: isCenter ? `0 ${spacing.primitive[5]}px` : undefined,
  };

  const hasIcon = Boolean(icon);
  const hasAction = Boolean(action);
  const hasTwoLines = Boolean(heading && description);

  const boxStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: hasTwoLines ? 'flex-start' : 'center',
    gap: spacing.primitive[3],
    minWidth: 280,
    maxWidth: 420,
    padding: hasTwoLines
      ? `${spacing.primitive[4]}px ${spacing.primitive[4]}px`
      : `${spacing.primitive[3]}px ${spacing.primitive[4]}px`,
    backgroundColor: cssVarColors.inverse.surface.default,
    borderRadius: radius.primitive.md,
    pointerEvents: 'auto',
    animation: `${visible ? '_zkap_toast_in' : '_zkap_toast_out'} ${ANIM_DURATION}ms ${easing.easeOut} both`,
  };

  const iconWrapStyle: React.CSSProperties = {
    flexShrink: 0,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: cssVarColors.inverse.icon.default,
    marginTop: hasTwoLines ? 1 : 0, // optical: sub-token alignment with heading baseline
  };

  const contentStyle: React.CSSProperties = {
    flex: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 2, // optical: sub-token value for tight heading↔description spacing
  };

  const headingStyle: React.CSSProperties = {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    lineHeight: String(typography.lineHeight.sm / typography.fontSize.sm),
    color: cssVarColors.inverse.content.default,
    wordBreak: 'keep-all',
    overflowWrap: 'break-word',
    margin: 0,
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.regular,
    lineHeight: 1.5,
    color: cssVarColors.inverse.content.secondary,
    wordBreak: 'keep-all',
    overflowWrap: 'break-word',
    margin: 0,
  };

  const actionWrapStyle: React.CSSProperties = {
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    color: cssVarColors.inverse.content.default,
    marginTop: hasTwoLines ? 2 : 0, // optical: sub-token alignment with action slot
  };

  const closeButtonStyle: React.CSSProperties = {
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    padding: 0,
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    color: cssVarColors.inverse.content.secondary,
    borderRadius: radius.primitive.xs,
    marginRight: -spacing.primitive[1],
  };

  return createPortal(
    <div style={wrapperStyle} aria-live="polite" aria-atomic="true">
      <div role="status" style={boxStyle}>
        {icon && (
          <span style={iconWrapStyle}>{icon}</span>
        )}

        <div style={contentStyle}>
          {heading && <p style={headingStyle}>{heading}</p>}
          {description && <p style={descriptionStyle}>{description}</p>}
        </div>

        {action && (
          <span style={actionWrapStyle}>{action}</span>
        )}

        {closable && (
          <button
            type="button"
            onClick={onClose}
            style={closeButtonStyle}
            aria-label="닫기"
          >
            <CloseIcon />
          </button>
        )}
      </div>
    </div>,
    document.body
  );
}

Toast.displayName = 'Toast';
