/**
 * @baerae-zkap/design-system
 *
 * Design Tokens + Web Components를 export합니다.
 * React Native 컴포넌트: import from '@baerae-zkap/design-system/native'
 * AI 문서: import docs from '@baerae-zkap/design-system/docs'
 */

// Design Tokens
export {
  colors,
  palette,
  typography,
  spacing,
  radius,
  tokens,
  brandColors,
  errorColors,
  successColors,
  warningColors,
  infoColors,
} from './tokens';
export type {
  ColorToken,
  PaletteToken,
  TypographyToken,
  SpacingToken,
  RadiusToken,
} from './tokens';

// Web Components
export { Button } from './components/Button/Button';
export type { ButtonProps, ButtonType, ButtonColor, ButtonSize, ButtonLayout } from './components/Button/Button';

export { TextButton } from './components/TextButton/TextButton';
export type { TextButtonProps } from './components/TextButton/TextButton';

export { IconButton } from './components/IconButton/IconButton';
export type { IconButtonProps, IconButtonVariant, IconButtonColor, IconButtonSize } from './components/IconButton/IconButton';

export { Chip } from './components/Chip/Chip';
export type { ChipProps, ChipVariant, ChipColor, ChipSize } from './components/Chip/Chip';

export { ActionArea } from './components/ActionArea/ActionArea';
export type { ActionAreaProps, ActionAreaVariant, ActionAreaPosition } from './components/ActionArea/ActionArea';

export { Accordion } from './components/Accordion/Accordion';
export type { AccordionProps, AccordionSize } from './components/Accordion/Accordion';

export { Card } from './components/Card/Card';
export type { CardProps, CardVariant, CardPadding } from './components/Card/Card';

export { ContentBadge } from './components/ContentBadge/ContentBadge';
export type { ContentBadgeProps, ContentBadgeVariant, ContentBadgeColor, ContentBadgeSize } from './components/ContentBadge/ContentBadge';

export { ListCard } from './components/ListCard/ListCard';
export type { ListCardProps, ListCardSize, ListCardVariant } from './components/ListCard/ListCard';

export { ListCell } from './components/ListCell/ListCell';
export type { ListCellProps, ListCellSize } from './components/ListCell/ListCell';

export * from './components/SectionHeader/SectionHeader';

export { Table, TableHead, TableBody, TableRow, TableHeadCell, TableCell } from './components/Table/Table';
export type { TableProps, TableHeadProps, TableBodyProps, TableRowProps, TableHeadCellProps, TableCellProps, TableVariant, TableSize } from './components/Table/Table';

export { Thumbnail } from './components/Thumbnail/Thumbnail';
export type { ThumbnailProps, ThumbnailAspectRatio } from './components/Thumbnail/Thumbnail';
