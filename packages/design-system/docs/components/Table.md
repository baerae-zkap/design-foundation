# Table

데이터를 행과 열의 그리드 형식으로 표시하는 테이블 컴포넌트입니다. Desktop 전용 컴포넌트로 설계되었습니다.

## 개요

Table 컴포넌트는 구조화된 데이터를 체계적으로 표시하는 데 사용됩니다. Montage Design System을 기반으로 하며, 자산 목록, 거래 내역 등 ZKAP 서비스의 다양한 데이터 표시에 활용됩니다.

## 특징

- **Desktop 전용**: 데스크톱 환경에 최적화된 컴포넌트
- **컴포저블 구조**: Table, TableHead, TableBody, TableRow, TableHeadCell, TableCell로 구성
- **두 가지 변형**: default(기본), striped(줄무늬)
- **세 가지 크기**: small, medium, large
- **Foundation 토큰 기반**: 일관된 스타일링

## Components

### Table (Wrapper)

테이블 전체를 감싸는 컨테이너입니다.

**Props:**
- `variant?: 'default' | 'striped'` - 테이블 스타일 (기본값: 'default')
- `size?: 'small' | 'medium' | 'large'` - 테이블 크기 (기본값: 'medium')

### TableHead

테이블 헤더 섹션입니다.

### TableBody

테이블 본문 섹션입니다.

### TableRow

테이블 행입니다.

### TableHeadCell

헤더 셀입니다. 진한 글꼴과 회색 배경을 가집니다.

### TableCell

데이터 셀입니다.

## 사용 예시

### 기본 사용법 (Web)

```tsx
import { Table, TableHead, TableBody, TableRow, TableHeadCell, TableCell } from '@baerae-zkap/design-system';

function AssetTable() {
  return (
    <Table variant="default" size="medium">
      <TableHead>
        <TableRow>
          <TableHeadCell>자산명</TableHeadCell>
          <TableHeadCell>보유량</TableHeadCell>
          <TableHeadCell>평가금액</TableHeadCell>
          <TableHeadCell>등락률</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>ETH</TableCell>
          <TableCell>0.7812</TableCell>
          <TableCell>₩3,245,000</TableCell>
          <TableCell style={{ color: '#22c55e' }}>+5.2%</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>BTC</TableCell>
          <TableCell>0.0234</TableCell>
          <TableCell>₩1,850,000</TableCell>
          <TableCell style={{ color: '#ef4444' }}>-2.1%</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
```

### 기본 사용법 (React Native)

```tsx
import { Table, TableHead, TableBody, TableRow, TableHeadCell, TableCell } from '@baerae-zkap/design-system/native';
import { Text } from 'react-native';

function AssetTable() {
  return (
    <Table variant="default" size="medium">
      <TableHead>
        <TableRow>
          <TableHeadCell>자산명</TableHeadCell>
          <TableHeadCell>보유량</TableHeadCell>
          <TableHeadCell>평가금액</TableHeadCell>
          <TableHeadCell>등락률</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>ETH</TableCell>
          <TableCell>0.7812</TableCell>
          <TableCell>₩3,245,000</TableCell>
          <TableCell>
            <Text style={{ color: '#22c55e' }}>+5.2%</Text>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>BTC</TableCell>
          <TableCell>0.0234</TableCell>
          <TableCell>₩1,850,000</TableCell>
          <TableCell>
            <Text style={{ color: '#ef4444' }}>-2.1%</Text>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
```

### Striped Variant

```tsx
<Table variant="striped" size="medium">
  <TableHead>
    <TableRow>
      <TableHeadCell>거래일시</TableHeadCell>
      <TableHeadCell>거래유형</TableHeadCell>
      <TableHeadCell>금액</TableHeadCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>2025-02-06 14:23</TableCell>
      <TableCell>입금</TableCell>
      <TableCell>+₩500,000</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>2025-02-05 09:45</TableCell>
      <TableCell>출금</TableCell>
      <TableCell>-₩200,000</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>2025-02-04 16:12</TableCell>
      <TableCell>입금</TableCell>
      <TableCell>+₩1,000,000</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Sizes

```tsx
// Small
<Table size="small">...</Table>

// Medium (기본값)
<Table size="medium">...</Table>

// Large
<Table size="large">...</Table>
```

## Design Tokens

### Border Radius
| Token | Value | Usage |
|-------|-------|-------|
| `card.sm` | 12px | 테이블 외곽 모서리 |

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| **Small Size** | | |
| Head Cell Padding | 16px / 6px | 좌우 / 상하 |
| Data Cell Padding | 16px / 12px | 좌우 / 상하 |
| Min Height | 40px | 최소 행 높이 |
| **Medium Size** | | |
| Head Cell Padding | 20px / 8px | 좌우 / 상하 |
| Data Cell Padding | 20px / 16px | 좌우 / 상하 |
| Min Height | 44px | 최소 행 높이 |
| **Large Size** | | |
| Head Cell Padding | 24px / 10px | 좌우 / 상하 |
| Data Cell Padding | 24px / 20px | 좌우 / 상하 |
| Min Height | 48px | 최소 행 높이 |

### Colors

| Element | Color | Token |
|---------|-------|-------|
| 테이블 배경 | `#ffffff` | surface.base.default |
| 테이블 테두리 | `#e2e8f0` | border.base.default |
| 헤더 배경 | `#f8fafc` | surface.base.alternative |
| 헤더 텍스트 | `#64748b` | content.base.tertiary |
| 셀 텍스트 | `#334155` | content.base.default |
| 행 구분선 | `#e2e8f0` | border.base.default |
| Striped 행 배경 | `#f8fafc` | surface.base.alternative |

## 사용 가이드라인

### DO
- ✅ 구조화된 데이터를 표시할 때 사용
- ✅ 헤더에는 명확한 컬럼명 표시
- ✅ 데이터는 왼쪽 정렬, 숫자는 오른쪽 정렬 고려
- ✅ 많은 행이 있을 때는 striped variant 사용
- ✅ Desktop 환경에서 사용

### DON'T
- ❌ 모바일에서 사용 (대신 ListCard나 ListCell 사용)
- ❌ 레이아웃 목적으로 사용
- ❌ 너무 많은 컬럼 (가독성 저하)
- ❌ 헤더 없이 사용

## Accessibility

- **시맨틱 HTML**: Web에서는 실제 `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>` 태그 사용
- **헤더 구분**: `<th>` 태그로 헤더 셀을 명확히 구분
- **키보드 네비게이션**: 필요시 각 행을 focusable하게 만들 수 있음
- **컨텐츠 간격**: 충분한 padding으로 가독성 확보

## 플랫폼별 차이점

| 기능 | Web | React Native |
|------|-----|--------------|
| 기본 구조 | HTML table 태그 | View + Context API |
| Striped 구현 | CSS :nth-child | rowIndex 기반 |
| 텍스트 렌더링 | 자동 | Text 컴포넌트 필요 (자동 변환) |
| 접근성 | 네이티브 table 시맨틱 | ARIA 지원 제한적 |

## ZKAP 사용 예시

### 자산 포트폴리오 테이블

```tsx
<Table variant="default" size="medium">
  <TableHead>
    <TableRow>
      <TableHeadCell>자산명</TableHeadCell>
      <TableHeadCell>보유량</TableHeadCell>
      <TableHeadCell>평가금액</TableHeadCell>
      <TableHeadCell>등락률</TableHeadCell>
      <TableHeadCell>수익률</TableHeadCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>ETH</TableCell>
      <TableCell>0.7812</TableCell>
      <TableCell>₩3,245,000</TableCell>
      <TableCell style={{ color: '#22c55e' }}>+5.2%</TableCell>
      <TableCell style={{ color: '#22c55e' }}>+12.4%</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### 거래 내역 테이블

```tsx
<Table variant="striped" size="small">
  <TableHead>
    <TableRow>
      <TableHeadCell>거래일시</TableHeadCell>
      <TableHeadCell>거래유형</TableHeadCell>
      <TableHeadCell>자산</TableHeadCell>
      <TableHeadCell>수량</TableHeadCell>
      <TableHeadCell>금액</TableHeadCell>
      <TableHeadCell>상태</TableHeadCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>2025-02-06 14:23:45</TableCell>
      <TableCell>매수</TableCell>
      <TableCell>ETH</TableCell>
      <TableCell>0.5</TableCell>
      <TableCell>₩2,000,000</TableCell>
      <TableCell>완료</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## 참고 자료

- [Montage Design System - Table](https://montage.wanted.co.kr/docs/components/table)
- Foundation 토큰: `public/spacing-tokens.json`, `public/radius-tokens.json`
