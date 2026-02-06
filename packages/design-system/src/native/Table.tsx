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
import { View, Text, type ViewStyle, type TextStyle, type ViewProps } from 'react-native';

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
}

export interface TableHeadCellProps extends Omit<ViewProps, 'children'> {
  children: ReactNode;
}

export interface TableCellProps extends Omit<ViewProps, 'children'> {
  children: ReactNode;
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
    headCellPaddingX: 16,
    headCellPaddingY: 6,
    dataCellPaddingX: 16,
    dataCellPaddingY: 12,
    fontSize: 13,
    minHeight: 40,
  },
  medium: {
    headCellPaddingX: 20,
    headCellPaddingY: 8,
    dataCellPaddingX: 20,
    dataCellPaddingY: 16,
    fontSize: 14,
    minHeight: 44,
  },
  large: {
    headCellPaddingX: 24,
    headCellPaddingY: 10,
    dataCellPaddingX: 24,
    dataCellPaddingY: 20,
    fontSize: 15,
    minHeight: 48,
  },
};

// Table Wrapper
export const Table = forwardRef<View, TableProps>(
  ({ variant = 'default', size = 'medium', children, style, ...props }, ref) => {
    const tableStyle: ViewStyle = {
      borderRadius: 12, // card.sm
      borderWidth: 1,
      borderColor: '#e2e8f0', // border.base.default (palette.grey.95)
      backgroundColor: 'white', // surface.base.default
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
  ({ children, style, ...props }, ref) => {
    const { variant } = useContext(TableContext);
    const { rowIndex } = useContext(TableBodyContext);

    const rowStyle: ViewStyle = {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#e2e8f0', // border.base.default
    };

    // Striped variant - add background to even rows
    if (variant === 'striped' && rowIndex % 2 === 1) {
      rowStyle.backgroundColor = '#f8fafc'; // surface.base.alternative (palette.grey.99)
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
  ({ children, style, ...props }, ref) => {
    const { size } = useContext(TableContext);
    const sizeStyle = sizeStyles[size];

    const headCellStyle: ViewStyle = {
      flex: 1,
      paddingVertical: sizeStyle.headCellPaddingY,
      paddingHorizontal: sizeStyle.headCellPaddingX,
      backgroundColor: '#f8fafc', // surface.base.alternative (palette.grey.99)
      borderBottomWidth: 1,
      borderBottomColor: '#e2e8f0', // border.base.default
      minHeight: sizeStyle.minHeight,
      justifyContent: 'center',
    };

    const textStyle: TextStyle = {
      fontSize: sizeStyle.fontSize,
      fontWeight: '600',
      color: '#64748b', // content.base.tertiary (palette.grey.60)
    };

    return (
      <View ref={ref} style={[headCellStyle, style]} {...props}>
        {typeof children === 'string' ? (
          <Text style={textStyle}>{children}</Text>
        ) : (
          children
        )}
      </View>
    );
  }
);

TableHeadCell.displayName = 'TableHeadCell';

// TableCell
export const TableCell = forwardRef<View, TableCellProps>(
  ({ children, style, ...props }, ref) => {
    const { size } = useContext(TableContext);
    const sizeStyle = sizeStyles[size];

    const cellStyle: ViewStyle = {
      flex: 1,
      paddingVertical: sizeStyle.dataCellPaddingY,
      paddingHorizontal: sizeStyle.dataCellPaddingX,
      minHeight: sizeStyle.minHeight,
      justifyContent: 'center',
    };

    const textStyle: TextStyle = {
      fontSize: sizeStyle.fontSize,
      color: '#334155', // content.base.default (palette.grey.20)
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
