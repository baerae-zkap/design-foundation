/**
 * Snackbar Component (Web)
 *
 * @description 화면 하단에 일시적으로 표시되는 토스트 알림 컴포넌트입니다.
 * React Portal을 통해 렌더링되며, 자동 닫힘 타이머를 지원합니다.
 *
 * @example
 * <Snackbar
 *   open={isOpen}
 *   message="변경사항이 저장되었습니다."
 *   onClose={() => setOpen(false)}
 * />
 * <Snackbar
 *   open={isOpen}
 *   message="네트워크 오류가 발생했습니다."
 *   action={<button style={{ color: 'var(--inverse-content-default)' }} onClick={onRetry}>다시 시도</button>}
 *   closable
 *   duration={null}
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

export type SnackbarPosition = 'bottom-center' | 'bottom-left' | 'bottom-right';

export interface SnackbarProps {
  /** 스낵바 표시 여부 */
  open: boolean;
  /** 닫기 콜백 (타이머 또는 닫기 버튼 클릭 시) */
  onClose?: () => void;
  /** 메시지 텍스트 */
  message: ReactNode;
  /** 선택적 액션 슬롯 (인라인 버튼 등) */
  action?: ReactNode;
  /** 선택적 리딩 아이콘 (20×20) */
  icon?: ReactNode;
  /** 닫기(X) 버튼 표시 여부. @default false */
  closable?: boolean;
  /** 자동 닫힘 시간(ms). null이면 자동 닫힘 없음. @default 4000 */
  duration?: number | null;
  /** 표시 위치. @default 'bottom-center' */
  position?: SnackbarPosition;
}

// ─── Animation injection ──────────────────────────────────────────────────────

const ANIM_DURATION = 220;

let stylesInjected = false;
function injectStyles() {
  if (stylesInjected || typeof document === 'undefined') return;
  stylesInjected = true;
  const style = document.createElement('style');
  style.textContent = `
    @keyframes _zkap_sb_in {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0);    }
    }
    @keyframes _zkap_sb_out {
      from { opacity: 1; transform: translateY(0);    }
      to   { opacity: 0; transform: translateY(10px); }
    }
  `;
  document.head.appendChild(style);
}

// ─── Close icon (16×16) ───────────────────────────────────────────────────────

function CloseIcon(): JSX.Element {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Snackbar({
  open,
  onClose,
  message,
  action,
  icon,
  closable = false,
  duration = 4000,
  position = 'bottom-center',
}: SnackbarProps): JSX.Element | null {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    injectStyles();
  }, []);

  // Mount/unmount with animation
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

  // Auto-dismiss timer
  useEffect(() => {
    if (!open || duration === null || duration === undefined) return;
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [open, duration, onClose]);

  if (!mounted || typeof document === 'undefined') return null;

  // ── Position wrapper ────────────────────────────────────────────────────────
  const isCenter = position === 'bottom-center';
  const isRight = position === 'bottom-right';

  const wrapperStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 40,
    left: isCenter ? 0 : (isRight ? 'auto' : 20),
    right: isRight ? 20 : (isCenter ? 0 : 'auto'),
    display: isCenter ? 'flex' : 'block',
    justifyContent: 'center',
    zIndex: zIndex.toast,
    pointerEvents: 'none',
    padding: isCenter ? `0 ${spacing.primitive[5]}px` : undefined,
  };

  // ── Snackbar box ────────────────────────────────────────────────────────────
  const boxStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing.primitive[2],
    minWidth: 280,
    maxWidth: 420,
    padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`,
    backgroundColor: cssVarColors.inverse.surface.default,
    borderRadius: radius.primitive.md,
    pointerEvents: 'auto',
    animation: `${visible ? '_zkap_sb_in' : '_zkap_sb_out'} ${ANIM_DURATION}ms cubic-bezier(0.16, 1, 0.3, 1) both`,
  };

  const iconWrapStyle: React.CSSProperties = {
    flexShrink: 0,
    width: 20,
    height: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: cssVarColors.inverse.icon.default,
  };

  const messageStyle: React.CSSProperties = {
    flex: 1,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    lineHeight: String(typography.lineHeight.sm / typography.fontSize.sm),
    color: cssVarColors.inverse.content.default,
    wordBreak: 'keep-all',
    overflowWrap: 'break-word',
  };

  const actionWrapStyle: React.CSSProperties = {
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    color: cssVarColors.inverse.content.default,
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
    marginRight: -4,
  };

  return createPortal(
    <div style={wrapperStyle} aria-live="polite" aria-atomic="true">
      <div
        role="status"
        style={boxStyle}
      >
        {icon && (
          <span style={iconWrapStyle}>
            {icon}
          </span>
        )}

        <span style={messageStyle}>
          {message}
        </span>

        {action && (
          <span style={actionWrapStyle}>
            {action}
          </span>
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

Snackbar.displayName = 'Snackbar';
