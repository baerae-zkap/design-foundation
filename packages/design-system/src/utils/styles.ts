import type { CSSProperties } from 'react';

/**
 * 공통 transition 값
 */
export const transitions = {
  background: 'background-color 150ms ease',
  color: 'color 150ms ease',
  border: 'border-color 150ms ease',
  opacity: 'opacity 150ms ease',
  all: 'background-color 150ms ease, color 150ms ease, border-color 150ms ease',
} as const;

/**
 * disabled 상태 공통 스타일
 */
export const disabledStyle: CSSProperties = {
  opacity: 0.5,
  cursor: 'not-allowed',
  pointerEvents: 'none' as const,
};

/**
 * disabled 상태에서의 opacity만 적용 (pointerEvents 유지)
 * button 등 native disabled 지원 요소에 사용
 */
export const disabledOpacityStyle: CSSProperties = {
  opacity: 0.5,
  cursor: 'not-allowed',
};
