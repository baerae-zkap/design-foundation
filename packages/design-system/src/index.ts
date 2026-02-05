/**
 * @zkap/design-system
 *
 * Web (React) 컴포넌트를 export합니다.
 * React Native 사용 시: import from '@zkap/design-system/native'
 *
 * AI Documentation: import docs from '@zkap/design-system/docs'
 */

export { Button } from './components/Button';
export type { ButtonProps } from './components/Button';

export { TextButton } from './components/TextButton';
export type { TextButtonProps } from './components/TextButton';

// ActionArea는 레이아웃 패턴이므로 컴포넌트가 아닌 가이드만 제공
// 사용법: docs/components/ActionArea.md 참조
