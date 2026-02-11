/**
 * Table Component (React Native)
 *
 * @description 데이터를 행과 열의 그리드 형식으로 표시하는 테이블입니다. Desktop 전용 컴포넌트입니다.
 * @see docs/components/Table.md - AI용 상세 가이드
 *
 * @example
 * <Table variant="default" size="medium">
 *   <TableHead>
 *     <TableRow>
 *       <TableHeadCell>자산명</TableHeadCell>
 *       <TableHeadCell>보유량</TableHeadCell>
 *     </TableRow>
 *   </TableHead>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>ETH</TableCell>
 *       <TableCell>0.7812</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 */

import { forwardRef, type ReactNode, createContext, useContext } from 'react';
import { View, Text, Pressable, type ViewStyle, type TextStyle, type ViewProps, type TextProps } from 'react-native';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react-native';
import { colors, palette } from '../tokens/colors';
import { spacing } from '../tokens/spacing';
import { radius } from '../tokens/radius';
import { typography } from '../tokens/typography';

export type TableVariant = 'default' | 'striped';
export type TableSize = 'small' | 'medium' | 'large';

export interface TableProps extends Omit<ViewProps, 'children'> {
  /** 테이블 스타일 - default(기본), striped(줄무늬) */
  variant?: TableVariant;
  /** 테이블 크기 */
  size?: TableSize;
  /** 자식 요소 (TableHead, TableBody) */
  children: ReactNode;
}

export interface TableHeadProps extends Omit<ViewProps, 'children'> {
  children: ReactNode;
}

export interface TableBodyProps extends Omit<ViewProps, 'children'> {
  children: ReactNode;
}

export interface TableRowProps extends Omit<ViewProps, 'children'> {
  children: ReactNode;
  /** 행 클릭 이벤트 */
  onPress?: () => void;
  /** 선택 상태 */
  selected?: boolean;
}

export interface TableHeadCellProps extends Omit<ViewProps, 'children'> {
  children: ReactNode;
  /** 정렬 방향 - left(왼쪽), center(중앙), right(오른쪽) */
  align?: 'left' | 'center' | 'right';
  /** 정렬 가능 여부 */
  sortable?: boolean;
  /** 정렬 방향 */
  sortDirection?: 'asc' | 'desc' | 'none';
  /** 정렬 클릭 이벤트 */
  onSort?: () => void;
  /** 고정 너비 (flex 대신 사용) */
  width?: number;
}

export interface TableCellProps extends Omit<ViewProps, 'children'> {
  children: ReactNode;
  /** 정렬 방향 - left(왼쪽), center(중앙), right(오른쪽) */
  align?: 'left' | 'center' | 'right';
  /** 고정 너비 (flex 대신 사용) */
  width?: number;
}

interface TableContextValue {
  variant: TableVariant;
  size: TableSize;
}

interface TableBodyContextValue {
  rowIndex: number;
}

const TableContext = createContext<TableContextValue>({ variant: 'default', size: 'medium' });
const TableBodyContext = createContext<TableBodyContextValue>({ rowIndex: 0 });

const sizeStyles: Record<TableSize, {
  headCellPaddingX: number;
  headCellPaddingY: number;
  dataCellPaddingX: number;
  dataCellPaddingY: number;
  fontSize: number;
  minHeight: number;
}> = {
  small: {
    headCellPaddingX: spacing.primitive[4],     // 16
    headCellPaddingY: spacing.primitive[1] + 2, // 6
    dataCellPaddingX: spacing.primitive[4],     // 16
    dataCellPaddingY: spacing.primitive[3],     // 12
    fontSize: 13,
    minHeight: 40,
  },
  medium: {
    headCellPaddingX: spacing.primitive[5],     // 20
    headCellPaddingY: spacing.primitive[2],     // 8
    dataCellPaddingX: spacing.primitive[5],     // 20
    dataCellPaddingY: spacing.primitive[4],     // 16
    fontSize: 14,
    minHeight: 44,
  },
  large: {
    headCellPaddingX: spacing.primitive[6],     // 24
    headCellPaddingY: spacing.primitive[2] + 2, // 10
    dataCellPaddingX: spacing.primitive[6],     // 24
    dataCellPaddingY: spacing.primitive[5],     // 20
    fontSize: 15,
    minHeight: 48,
  },
};

// Table Wrapper
export const Table = forwardRef<View, TableProps>(
  ({ variant = 'default', size = 'medium', children, style, ...props }, ref) => {
    const tableStyle: ViewStyle = {
      borderRadius: radius.component.card.sm,  // 12
      borderWidth: 1,
      borderColor: colors.border.base.default, // palette.grey[95] = #d6d9dd
      backgroundColor: colors.surface.base.default, // palette.static.white = #ffffff
      overflow: 'hidden',
    };

    return (
      <TableContext.Provider value={{ variant, size }}>
        <View ref={ref} style={[tableStyle, style]} {...props}>
          {children}
        </View>
      </TableContext.Provider>
    );
  }
);

Table.displayName = 'Table';

// TableHead
export const TableHead = forwardRef<View, TableHeadProps>(
  ({ children, style, ...props }, ref) => {
    return (
      <View ref={ref} style={style} {...props}>
        {children}
      </View>
    );
  }
);

TableHead.displayName = 'TableHead';

// TableBody
export const TableBody = forwardRef<View, TableBodyProps>(
  ({ children, style, ...props }, ref) => {
    // Track row indices for striped variant
    let rowIndex = 0;
    const childrenWithIndex = Array.isArray(children)
      ? children.map((child) => {
          const currentIndex = rowIndex++;
          return (
            <TableBodyContext.Provider key={currentIndex} value={{ rowIndex: currentIndex }}>
              {child}
            </TableBodyContext.Provider>
          );
        })
      : children;

    return (
      <View ref={ref} style={style} {...props}>
        {childrenWithIndex}
      </View>
    );
  }
);

TableBody.displayName = 'TableBody';

// TableRow
export const TableRow = forwardRef<View, TableRowProps>(
  ({ children, style, onPress, selected, ...props }, ref) => {
    const { variant } = useContext(TableContext);
    const { rowIndex } = useContext(TableBodyContext);

    const rowStyle: ViewStyle = {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: colors.border.base.default, // palette.grey[95] = #d6d9dd
    };

    // Striped variant - add background to even rows
    if (variant === 'striped' && rowIndex % 2 === 1) {
      rowStyle.backgroundColor = colors.surface.base.alternative; // palette.grey[99] = #f7f8f9
    }

    // Selected state - light brand background
    if (selected) {
      rowStyle.backgroundColor = 'rgba(37, 99, 235, 0.06)';
    }

    // If onPress is provided, wrap in Pressable
    if (onPress) {
      return (
        <Pressable
          ref={ref as any}
          onPress={onPress}
          style={({ pressed }) => [
            rowStyle,
            pressed && {
              backgroundColor: colors.surface.base.alternative, // palette.grey[99] = #f7f8f9
            },
            style,
          ]}
          {...props}
        >
          {children}
        </Pressable>
      );
    }

    return (
      <View ref={ref} style={[rowStyle, style]} {...props}>
        {children}
      </View>
    );
  }
);

TableRow.displayName = 'TableRow';

// TableHeadCell
export const TableHeadCell = forwardRef<View, TableHeadCellProps>(
  ({ children, style, align = 'left', sortable, sortDirection = 'none', onSort, width, ...props }, ref) => {
    const { size } = useContext(TableContext);
    const sizeStyle = sizeStyles[size];

    const headCellStyle: ViewStyle = {
      ...(width ? { width } : { flex: 1 }),
      paddingVertical: sizeStyle.headCellPaddingY,
      paddingHorizontal: sizeStyle.headCellPaddingX,
      backgroundColor: colors.surface.base.alternative, // palette.grey[99] = #f7f8f9
      borderBottomWidth: 1,
      borderBottomColor: colors.border.base.default, // palette.grey[95] = #d6d9dd
      minHeight: sizeStyle.minHeight,
      justifyContent: 'center',
      alignItems: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
    };

    const textStyle: TextStyle = {
      fontFamily: typography.fontFamily.base,
      fontSize: sizeStyle.fontSize,
      fontWeight: typography.fontWeight.semibold,
      color: colors.content.base.secondary, // palette.grey[50] = #68707a
      textAlign: align,
    };

    // Render sort indicator
    const renderSortIcon = () => {
      if (!sortable) return null;

      const iconSize = 16;
      const iconColor = colors.content.base.secondary;

      if (sortDirection === 'asc') {
        return <ChevronUp size={iconSize} color={iconColor} />;
      } else if (sortDirection === 'desc') {
        return <ChevronDown size={iconSize} color={iconColor} />;
      } else {
        return <ChevronsUpDown size={iconSize} color={iconColor} style={{ opacity: 0.5 }} />;
      }
    };

    const content = (
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.primitive[1] }}>
        {typeof children === 'string' ? (
          <Text style={textStyle}>{children}</Text>
        ) : (
          children
        )}
        {renderSortIcon()}
      </View>
    );

    // If sortable and onSort provided, wrap in Pressable
    if (sortable && onSort) {
      return (
        <Pressable
          ref={ref as any}
          onPress={onSort}
          style={({ pressed }) => [
            headCellStyle,
            pressed && { backgroundColor: colors.border.base.default }, // palette.grey[95] = #d6d9dd
            style,
          ]}
          {...props}
        >
          {content}
        </Pressable>
      );
    }

    return (
      <View ref={ref} style={[headCellStyle, style]} {...props}>
        {content}
      </View>
    );
  }
);

TableHeadCell.displayName = 'TableHeadCell';

// TableCell
export const TableCell = forwardRef<View, TableCellProps>(
  ({ children, style, align = 'left', width, ...props }, ref) => {
    const { size } = useContext(TableContext);
    const sizeStyle = sizeStyles[size];

    const cellStyle: ViewStyle = {
      ...(width ? { width } : { flex: 1 }),
      paddingVertical: sizeStyle.dataCellPaddingY,
      paddingHorizontal: sizeStyle.dataCellPaddingX,
      minHeight: sizeStyle.minHeight,
      justifyContent: 'center',
      alignItems: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
    };

    const textStyle: TextStyle = {
      fontFamily: typography.fontFamily.base,
      fontSize: sizeStyle.fontSize,
      fontWeight: typography.fontWeight.regular,
      color: colors.content.base.default, // palette.grey[30] = #3e4651
      textAlign: align,
    };

    return (
      <View ref={ref} style={[cellStyle, style]} {...props}>
        {typeof children === 'string' ? (
          <Text style={textStyle}>{children}</Text>
        ) : (
          children
        )}
      </View>
    );
  }
);

TableCell.displayName = 'TableCell';
