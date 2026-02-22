/**
 * @baerae-zkap/design-system
 *
 * Design Tokens + Web Components를 export합니다.
 * 컬러 토큰: lightColors (라이트 테마), darkColors (다크 테마)
 * 플랫폼별 변환은 ThemeProvider에서 처리합니다.
 */

// Design Tokens
export {
  lightColors,
  /** @deprecated Use lightColors instead */
  colors,
  darkColors,
  palette,
  effects,
  darkEffects,
  shadow,
  darkShadow,
  typography,
  spacing,
  radius,
  tokens,
  brandColors,
  errorColors,
  successColors,
  warningColors,
  infoColors,
  duration,
  easing,
  transitions,
} from './tokens';
export type {
  LightColorToken,
  ColorToken,
  DarkColorToken,
  PaletteToken,
  DarkPaletteToken,
  EffectToken,
  DarkEffectToken,
  ShadowToken,
  DarkShadowToken,
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

export { PushBadge } from './components/PushBadge/PushBadge';
export type { PushBadgeProps, PushBadgeVariant, PushBadgeSize, PushBadgeColor } from './components/PushBadge/PushBadge';

export { ListCard } from './components/ListCard/ListCard';
export type { ListCardProps, ListCardVariant } from './components/ListCard/ListCard';

export { ListCell } from './components/ListCell/ListCell';
export type { ListCellProps, ListCellSize } from './components/ListCell/ListCell';

export * from './components/SectionHeader/SectionHeader';

export { Table, TableHead, TableBody, TableRow, TableHeadCell, TableCell } from './components/Table/Table';
export type { TableProps, TableHeadProps, TableBodyProps, TableRowProps, TableHeadCellProps, TableCellProps, TableVariant, TableSize } from './components/Table/Table';

export { Thumbnail } from './components/Thumbnail/Thumbnail';
export type { ThumbnailProps, ThumbnailAspectRatio } from './components/Thumbnail/Thumbnail';

export { Avatar, AvatarGroup } from './components/Avatar/Avatar';
export type { AvatarProps, AvatarGroupProps, AvatarSize } from './components/Avatar/Avatar';

export { Dialog } from './components/AlertDialog/AlertDialog';
export type { DialogProps, DialogAction } from './components/AlertDialog/AlertDialog';

export { StateView } from './components/StateView/StateView';
export type { StateViewProps, StateViewVariant, StateViewSize } from './components/StateView/StateView';

export { SectionMessage } from './components/SectionMessage/SectionMessage';
export type { SectionMessageProps, SectionMessageVariant } from './components/SectionMessage/SectionMessage';

export { Snackbar } from './components/Snackbar/Snackbar';
export type { SnackbarProps, SnackbarPosition } from './components/Snackbar/Snackbar';

export { Toast } from './components/Toast/Toast';
export type { ToastProps, ToastPosition } from './components/Toast/Toast';

export { Spinner } from './components/Spinner/Spinner';
export type { SpinnerProps, SpinnerSize, SpinnerColor } from './components/Spinner/Spinner';

export { BottomNavigation } from './components/BottomNavigation/BottomNavigation';
export type { BottomNavigationProps, BottomNavigationItem } from './components/BottomNavigation/BottomNavigation';

export { CategoryNavigation } from './components/CategoryNavigation/CategoryNavigation';
export type {
  CategoryNavigationProps,
  CategoryNavigationItem,
  CategoryNavigationSize,
} from './components/CategoryNavigation/CategoryNavigation';

export { PageCounter } from './components/PageCounter';
export type { PageCounterProps, PageCounterSize, PageCounterVariant } from './components/PageCounter';

export { ProgressIndicator } from './components/ProgressIndicator';
export type {
  ProgressIndicatorProps,
  ProgressIndicatorSize,
  ProgressIndicatorColor,
} from './components/ProgressIndicator';

export { ProgressTracker } from './components/ProgressTracker';
export type {
  ProgressTrackerProps,
  ProgressTrackerStep,
  ProgressTrackerVariant,
  ProgressTrackerOrientation,
} from './components/ProgressTracker';

export { Tab } from './components/Tab/Tab';
export type { TabProps, TabItem, TabSize, TabResize } from './components/Tab/Tab';

export { TopNavigation } from './components/TopNavigation/TopNavigation';
export type { TopNavigationProps, TopNavigationScrollEffect, TopNavigationVariant } from './components/TopNavigation/TopNavigation';

export { BottomSheet } from './components/BottomSheet';
export type { BottomSheetProps } from './components/BottomSheet';

export { Popover } from './components/Popover';
export type { PopoverProps, PopoverSize } from './components/Popover';

export { Popup } from './components/Popup/Popup';
export type { PopupProps, PopupAction, PopupSize, PopupNavigation, PopupActionLayout, PopupType } from './components/Popup/Popup';

export { Tooltip } from './components/Tooltip/Tooltip';
export type { TooltipProps, TooltipPosition, TooltipSize, TooltipMode } from './components/Tooltip/Tooltip';

export { CheckMark } from './components/CheckMark/CheckMark';
export type { CheckMarkProps, CheckMarkSize } from './components/CheckMark/CheckMark';

export { Checkbox } from './components/Checkbox/Checkbox';
export type { CheckboxProps, CheckboxSize } from './components/Checkbox/Checkbox';

export { Radio, RadioGroup } from './components/Radio/Radio';
export type { RadioProps, RadioGroupProps, RadioSize } from './components/Radio/Radio';

export { Switch } from './components/Switch/Switch';
export type { SwitchProps, SwitchSize } from './components/Switch/Switch';

export { TextField } from './components/TextField/TextField';
export type { TextFieldProps } from './components/TextField/TextField';


export { Skeleton } from './components/Skeleton/Skeleton';
export type { SkeletonProps, SkeletonVariant } from './components/Skeleton/Skeleton';

export { BottomCTA } from './components/BottomCTA/BottomCTA';
export type { BottomCTAProps, BottomCTAVariant } from './components/BottomCTA/BottomCTA';

export { TextArea } from './components/TextArea/TextArea';
export type { TextAreaProps } from './components/TextArea/TextArea';

export { SearchField } from './components/SearchField/SearchField';
export type { SearchFieldProps } from './components/SearchField/SearchField';
export { Badge } from './components/Badge/Badge';
export type { BadgeProps, BadgeColor, BadgeVariant, BadgeSize } from './components/Badge/Badge';
export { Slider } from './components/Slider/Slider';
export type { SliderProps } from './components/Slider/Slider';
export { SegmentedControl } from './components/SegmentedControl/SegmentedControl';
export type { SegmentedControlProps, SegmentedControlOption, SegmentedControlSize } from './components/SegmentedControl/SegmentedControl';
