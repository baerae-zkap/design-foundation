/**
 * Table Component (Web)
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

import { forwardRef, createContext, useContext, type ReactNode, type HTMLAttributes, type TdHTMLAttributes, type ThHTMLAttributes } from 'react';
import { cssVarColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';
import { borderWidth } from '../../tokens/general';

export type TableVariant = 'default' | 'striped';
export type TableSize = 'small' | 'medium' | 'large';

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  /** 테이블 스타일 - default(기본), striped(줄무늬) */
  variant?: TableVariant;
  /** 테이블 크기 */
  size?: TableSize;
  /** 자식 요소 (TableHead, TableBody) */
  children: ReactNode;
}

export interface TableHeadProps extends HTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
}

export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
}

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  children: ReactNode;
}

export interface TableHeadCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
}

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
}

// Context for sharing table configuration
interface TableContextValue {
  variant: TableVariant;
  size: TableSize;
}

const TableContext = createContext<TableContextValue>({
  variant: 'default',
  size: 'medium',
});

const sizeStyles: Record<TableSize, {
  headCellPaddingX: number;
  headCellPaddingY: number;
  dataCellPaddingX: number;
  dataCellPaddingY: number;
  fontSize: number;
  minHeight: number;
}> = {
  small: {
    headCellPaddingX: spacing.primitive[4],
    headCellPaddingY: spacing.component.table.headCellPaddingY.sm,
    dataCellPaddingX: spacing.primitive[4],
    dataCellPaddingY: spacing.primitive[3],
    fontSize: typography.fontSize.compact,
    minHeight: spacing.component.table.minHeight.sm,
  },
  medium: {
    headCellPaddingX: spacing.primitive[5],
    headCellPaddingY: spacing.component.table.headCellPaddingY.md,
    dataCellPaddingX: spacing.primitive[5],
    dataCellPaddingY: spacing.primitive[4],
    fontSize: typography.fontSize.sm,
    minHeight: spacing.component.table.minHeight.md,
  },
  large: {
    headCellPaddingX: spacing.primitive[6],
    headCellPaddingY: spacing.component.table.headCellPaddingY.lg,
    dataCellPaddingX: spacing.primitive[6],
    dataCellPaddingY: spacing.primitive[5],
    fontSize: typography.fontSize.md,
    minHeight: spacing.component.table.minHeight.lg,
  },
};

// Table Wrapper
export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ variant = 'default', size = 'medium', children, style, ...props }, ref) => {
    const tableStyle: React.CSSProperties = {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
      borderRadius: radius.component.card.sm,
      border: 'none',
      overflow: 'hidden',
      backgroundColor: cssVarColors.surface.base.default,
      ...style,
    };

    return (
      <TableContext.Provider value={{ variant, size }}>
        <div style={{ borderRadius: radius.component.card.sm, overflow: 'hidden', border: `${borderWidth.default}px solid ${cssVarColors.border.base.default}` }}>
          <table
            ref={ref}
            data-variant={variant}
            data-size={size}
            style={tableStyle}
            {...props}
          >
            {children}
          </table>
        </div>
      </TableContext.Provider>
    );
  }
);

Table.displayName = 'Table';

// TableHead
export const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(
  ({ children, style, ...props }, ref) => {
    return (
      <thead ref={ref} style={style} {...props}>
        {children}
      </thead>
    );
  }
);

TableHead.displayName = 'TableHead';

// TableBody
export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ children, style, ...props }, ref) => {
    return (
      <tbody ref={ref} style={style} {...props}>
        {children}
      </tbody>
    );
  }
);

TableBody.displayName = 'TableBody';

// TableRow
export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ children, style, ...props }, ref) => {
    const rowStyle: React.CSSProperties = {
      borderBottom: `${borderWidth.default}px solid ${cssVarColors.border.base.default}`,
      ...style,
    };

    return (
      <tr ref={ref} style={rowStyle} {...props}>
        {children}
      </tr>
    );
  }
);

TableRow.displayName = 'TableRow';

// TableHeadCell
export const TableHeadCell = forwardRef<HTMLTableCellElement, TableHeadCellProps>(
  ({ children, style, ...props }, ref) => {
    const { size } = useContext(TableContext);
    const sizeStyle = sizeStyles[size];

    const headCellStyle: React.CSSProperties = {
      padding: `${sizeStyle.headCellPaddingY}px ${sizeStyle.headCellPaddingX}px`,
      textAlign: 'left',
      fontSize: sizeStyle.fontSize,
      fontWeight: typography.fontWeight.semibold,
      color: cssVarColors.content.base.neutral,
      backgroundColor: cssVarColors.surface.base.alternative,
      borderBottom: `${borderWidth.default}px solid ${cssVarColors.border.base.default}`,
      minHeight: sizeStyle.minHeight,
      ...style,
    };

    return (
      <th ref={ref} style={headCellStyle} {...props}>
        {children}
      </th>
    );
  }
);

TableHeadCell.displayName = 'TableHeadCell';

// TableCell
export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ children, style, ...props }, ref) => {
    const { size } = useContext(TableContext);
    const sizeStyle = sizeStyles[size];

    const cellStyle: React.CSSProperties = {
      padding: `${sizeStyle.dataCellPaddingY}px ${sizeStyle.dataCellPaddingX}px`,
      fontSize: sizeStyle.fontSize,
      color: cssVarColors.content.base.default,
      minHeight: sizeStyle.minHeight,
      ...style,
    };

    return (
      <td ref={ref} style={cellStyle} {...props}>
        {children}
      </td>
    );
  }
);

TableCell.displayName = 'TableCell';
