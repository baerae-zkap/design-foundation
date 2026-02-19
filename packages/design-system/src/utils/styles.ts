import type { CSSProperties } from 'react';

// Re-export transitions from token file for backwards compatibility
export { transitions } from '../tokens/motion';

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
