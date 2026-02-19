/**
 * Motion & Transition Tokens
 *
 * @description 모든 컴포넌트의 트랜지션/애니메이션에 사용되는 모션 토큰입니다.
 * Source of truth: public/interaction-tokens.json
 */

/** Duration tokens (ms) */
export const duration = {
  instant: 100,
  fast: 200,
  normal: 300,
  slow: 400,
  slower: 500,
} as const;

/** Easing tokens */
export const easing = {
  easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
  easeIn: 'cubic-bezier(0.7, 0, 0.84, 0)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  linear: 'linear',
} as const;

export type DurationToken = typeof duration;
export type EasingToken = typeof easing;

/** Pre-composed transition strings for direct use in style objects */
export const transitions = {
  background: `background-color ${duration.fast}ms ${easing.easeOut}`,
  color: `color ${duration.fast}ms ${easing.easeOut}`,
  border: `border-color ${duration.fast}ms ${easing.easeOut}`,
  opacity: `opacity ${duration.fast}ms ${easing.easeOut}`,
  transform: `transform ${duration.normal}ms ${easing.easeOut}`,
  height: `height ${duration.slow}ms ${easing.easeInOut}`,
  all: `background-color ${duration.fast}ms ${easing.easeOut}, color ${duration.fast}ms ${easing.easeOut}, border-color ${duration.fast}ms ${easing.easeOut}`,
  expand: `height ${duration.slow}ms ${easing.easeInOut}, opacity ${duration.normal}ms ${easing.easeOut}`,
  slide: `all ${duration.slow}ms ${easing.easeInOut}`,
} as const;

export type TransitionsToken = typeof transitions;
