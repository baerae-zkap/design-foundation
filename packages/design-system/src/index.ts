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

export { ActionArea } from './components/ActionArea';
export type {
  ActionAreaProps,
  ActionAreaVariant,
  ActionAreaPosition,
} from './components/ActionArea';

export { Chip } from './components/Chip';
export type {
  ChipProps,
  ChipVariant,
  ChipColor,
  ChipSize,
} from './components/Chip';

export { IconButton } from './components/IconButton';
export type {
  IconButtonProps,
  IconButtonVariant,
  IconButtonColor,
  IconButtonSize,
} from './components/IconButton';

export { Accordion } from './components/Accordion';
export type {
  AccordionProps,
  AccordionSize,
} from './components/Accordion';

export { Card } from './components/Card';
export type {
  CardProps,
  CardVariant,
  CardPadding,
} from './components/Card';

export { ContentBadge } from './components/ContentBadge';
export type {
  ContentBadgeProps,
  ContentBadgeVariant,
  ContentBadgeColor,
  ContentBadgeSize,
} from './components/ContentBadge';

export { ListCell } from './components/ListCell';
export type {
  ListCellProps,
  ListCellSize,
} from './components/ListCell';

export { ListCard } from './components/ListCard';
export type {
  ListCardProps,
  ListCardSize,
  ListCardVariant,
} from './components/ListCard';

export { SectionHeader } from './components/SectionHeader';
export type {
  SectionHeaderProps,
  SectionHeaderSize,
} from './components/SectionHeader';

export { Thumbnail } from './components/Thumbnail';
export type {
  ThumbnailProps,
  ThumbnailAspectRatio,
} from './components/Thumbnail';

export { Table, TableHead, TableBody, TableRow, TableHeadCell, TableCell } from './components/Table';
export type {
  TableProps,
  TableHeadProps,
  TableBodyProps,
  TableRowProps,
  TableHeadCellProps,
  TableCellProps,
  TableVariant,
  TableSize,
} from './components/Table';

// Design Tokens
export { colors, palette } from './tokens';
export type { ColorToken, PaletteToken } from './tokens';
