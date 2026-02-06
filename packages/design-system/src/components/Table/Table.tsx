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
export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ variant = 'default', size = 'medium', children, style, ...props }, ref) => {
    const tableStyle: React.CSSProperties = {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
      borderRadius: 12, // card.sm
      border: 'none',
      overflow: 'hidden',
      backgroundColor: 'white', // surface.base.default
      ...style,
    };

    return (
      <TableContext.Provider value={{ variant, size }}>
        <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #e2e8f0' }}>
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
      borderBottom: '1px solid #e2e8f0', // border.base.default
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
      fontWeight: 600,
      color: '#64748b', // content.base.tertiary (palette.grey.60)
      backgroundColor: '#f8fafc', // surface.base.alternative (palette.grey.99)
      borderBottom: '1px solid #e2e8f0', // border.base.default
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
      color: '#334155', // content.base.default (palette.grey.20)
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
