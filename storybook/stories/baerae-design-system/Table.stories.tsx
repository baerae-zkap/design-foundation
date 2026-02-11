import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { View, Text } from "react-native";
import { fn } from "storybook/test";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeadCell,
  TableCell,
} from "@baerae-zkap/design-system/native";

/**
 * Table 컴포넌트
 *
 * 데이터를 행과 열의 그리드 형식으로 표시하는 테이블 컴포넌트입니다.
 * Desktop 전용 컴포넌트로 설계되었습니다.
 *
 * ## Features
 * - 컴포저블 구조 (Table, TableHead, TableBody, TableRow, TableHeadCell, TableCell)
 * - 두 가지 변형 (default, striped)
 * - 세 가지 크기 (small, medium, large)
 * - 정렬 지원 (sortable, sortDirection, onSort)
 * - 인터랙티브 행 (onPress, selected)
 * - 텍스트 정렬 (align: left, center, right)
 * - Foundation 토큰 기반 스타일링
 */
const meta = {
  title: "@baerae-zkap/Contents/Table",
  component: Table,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "striped"],
      description: "테이블 스타일",
      table: {
        type: { summary: "'default' | 'striped'" },
        defaultValue: { summary: "default" },
        category: "레이아웃",
      },
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "테이블 크기",
      table: {
        type: { summary: "'small' | 'medium' | 'large'" },
        defaultValue: { summary: "medium" },
        category: "레이아웃",
      },
    },
    showSortable: {
      control: "boolean",
      description: "정렬 가능 헤더 표시",
      table: {
        category: "구성요소 토글",
      },
    },
    showSelection: {
      control: "boolean",
      description: "행 선택 상태 표시",
      table: {
        category: "구성요소 토글",
      },
    },
    showRightAlign: {
      control: "boolean",
      description: "숫자 컬럼 우측 정렬",
      table: {
        category: "구성요소 토글",
      },
    },
    // Hide internal props
    children: { table: { disable: true } },
    style: { table: { disable: true } },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Playground
 *
 * 모든 옵션을 조정할 수 있는 대화형 보유 자산 포트폴리오 테이블입니다.
 */
export const Default: Story = {
  args: {
    variant: "default",
    size: "medium",
    showSortable: false,
    showSelection: false,
    showRightAlign: false,
  } as any,
  render: (args) => {
    const { showSortable, showSelection, showRightAlign, ...tableProps } = args as any;

    return (
      <Table {...tableProps}>
        <TableHead>
          <TableRow>
            <TableHeadCell
              sortable={showSortable}
              sortDirection={showSortable ? "asc" : "none"}
              onSort={fn()}
            >
              자산명
            </TableHeadCell>
            <TableHeadCell
              align={showRightAlign ? "right" : "left"}
              sortable={showSortable}
              sortDirection="none"
              onSort={fn()}
            >
              보유량
            </TableHeadCell>
            <TableHeadCell
              align={showRightAlign ? "right" : "left"}
              sortable={showSortable}
              sortDirection={showSortable ? "desc" : "none"}
              onSort={fn()}
            >
              평가금액
            </TableHeadCell>
            <TableHeadCell align={showRightAlign ? "right" : "left"}>
              등락률
            </TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow selected={showSelection} onPress={fn()}>
            <TableCell>BTC</TableCell>
            <TableCell align={showRightAlign ? "right" : "left"}>
              0.0234
            </TableCell>
            <TableCell align={showRightAlign ? "right" : "left"}>
              ₩1,850,000
            </TableCell>
            <TableCell align={showRightAlign ? "right" : "left"}>
              <Text style={{ color: "#ef4444", fontWeight: "600" }}>
                -2.1%
              </Text>
            </TableCell>
          </TableRow>
          <TableRow onPress={fn()}>
            <TableCell>ETH</TableCell>
            <TableCell align={showRightAlign ? "right" : "left"}>
              0.7812
            </TableCell>
            <TableCell align={showRightAlign ? "right" : "left"}>
              ₩3,245,000
            </TableCell>
            <TableCell align={showRightAlign ? "right" : "left"}>
              <Text style={{ color: "#22c55e", fontWeight: "600" }}>
                +5.2%
              </Text>
            </TableCell>
          </TableRow>
          <TableRow onPress={fn()}>
            <TableCell>SOL</TableCell>
            <TableCell align={showRightAlign ? "right" : "left"}>
              12.45
            </TableCell>
            <TableCell align={showRightAlign ? "right" : "left"}>
              ₩980,000
            </TableCell>
            <TableCell align={showRightAlign ? "right" : "left"}>
              <Text style={{ color: "#22c55e", fontWeight: "600" }}>
                +3.8%
              </Text>
            </TableCell>
          </TableRow>
          <TableRow onPress={fn()}>
            <TableCell>XRP</TableCell>
            <TableCell align={showRightAlign ? "right" : "left"}>
              1,450.00
            </TableCell>
            <TableCell align={showRightAlign ? "right" : "left"}>
              ₩725,000
            </TableCell>
            <TableCell align={showRightAlign ? "right" : "left"}>
              <Text style={{ color: "#ef4444", fontWeight: "600" }}>
                -1.5%
              </Text>
            </TableCell>
          </TableRow>
          <TableRow onPress={fn()}>
            <TableCell>USDT</TableCell>
            <TableCell align={showRightAlign ? "right" : "left"}>
              1,250.00
            </TableCell>
            <TableCell align={showRightAlign ? "right" : "left"}>
              ₩1,250,000
            </TableCell>
            <TableCell align={showRightAlign ? "right" : "left"}>
              <Text style={{ color: "#64748b", fontWeight: "600" }}>
                0.0%
              </Text>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  },
};

/**
 * Variants
 *
 * Default와 Striped 변형을 비교합니다.
 */
export const Variants: Story = {
  render: () => (
    <View style={{ gap: 32 }}>
      {/* Default */}
      <View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "600",
            marginBottom: 12,
            color: "#334155",
          }}
        >
          Default
        </Text>
        <Table variant="default" size="medium">
          <TableHead>
            <TableRow>
              <TableHeadCell>자산명</TableHeadCell>
              <TableHeadCell>보유량</TableHeadCell>
              <TableHeadCell>평가금액</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>BTC</TableCell>
              <TableCell>0.0234</TableCell>
              <TableCell>₩1,850,000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ETH</TableCell>
              <TableCell>0.7812</TableCell>
              <TableCell>₩3,245,000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>SOL</TableCell>
              <TableCell>12.45</TableCell>
              <TableCell>₩980,000</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </View>

      {/* Striped */}
      <View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "600",
            marginBottom: 12,
            color: "#334155",
          }}
        >
          Striped
        </Text>
        <Table variant="striped" size="medium">
          <TableHead>
            <TableRow>
              <TableHeadCell>자산명</TableHeadCell>
              <TableHeadCell>보유량</TableHeadCell>
              <TableHeadCell>평가금액</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>BTC</TableCell>
              <TableCell>0.0234</TableCell>
              <TableCell>₩1,850,000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ETH</TableCell>
              <TableCell>0.7812</TableCell>
              <TableCell>₩3,245,000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>SOL</TableCell>
              <TableCell>12.45</TableCell>
              <TableCell>₩980,000</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </View>
    </View>
  ),
};

/**
 * Sizes
 *
 * Small, Medium, Large 크기를 비교합니다.
 */
export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 32 }}>
      {/* Small */}
      <View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "600",
            marginBottom: 12,
            color: "#334155",
          }}
        >
          Small
        </Text>
        <Table variant="default" size="small">
          <TableHead>
            <TableRow>
              <TableHeadCell>자산명</TableHeadCell>
              <TableHeadCell>보유량</TableHeadCell>
              <TableHeadCell>평가금액</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>BTC</TableCell>
              <TableCell>0.0234</TableCell>
              <TableCell>₩1,850,000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ETH</TableCell>
              <TableCell>0.7812</TableCell>
              <TableCell>₩3,245,000</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </View>

      {/* Medium */}
      <View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "600",
            marginBottom: 12,
            color: "#334155",
          }}
        >
          Medium
        </Text>
        <Table variant="default" size="medium">
          <TableHead>
            <TableRow>
              <TableHeadCell>자산명</TableHeadCell>
              <TableHeadCell>보유량</TableHeadCell>
              <TableHeadCell>평가금액</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>BTC</TableCell>
              <TableCell>0.0234</TableCell>
              <TableCell>₩1,850,000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ETH</TableCell>
              <TableCell>0.7812</TableCell>
              <TableCell>₩3,245,000</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </View>

      {/* Large */}
      <View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "600",
            marginBottom: 12,
            color: "#334155",
          }}
        >
          Large
        </Text>
        <Table variant="default" size="large">
          <TableHead>
            <TableRow>
              <TableHeadCell>자산명</TableHeadCell>
              <TableHeadCell>보유량</TableHeadCell>
              <TableHeadCell>평가금액</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>BTC</TableCell>
              <TableCell>0.0234</TableCell>
              <TableCell>₩1,850,000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ETH</TableCell>
              <TableCell>0.7812</TableCell>
              <TableCell>₩3,245,000</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </View>
    </View>
  ),
};

/**
 * WithAlignment
 *
 * 좌측 정렬 텍스트 컬럼과 우측 정렬 숫자 컬럼을 보여줍니다.
 */
export const WithAlignment: Story = {
  render: () => (
    <Table variant="default" size="medium">
      <TableHead>
        <TableRow>
          <TableHeadCell align="left">자산명</TableHeadCell>
          <TableHeadCell align="right">보유량</TableHeadCell>
          <TableHeadCell align="right">평가금액</TableHeadCell>
          <TableHeadCell align="right">수익률</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell align="left">BTC</TableCell>
          <TableCell align="right">0.0234</TableCell>
          <TableCell align="right">₩1,850,000</TableCell>
          <TableCell align="right">
            <Text style={{ color: "#22c55e", fontWeight: "600" }}>+8.7%</Text>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">ETH</TableCell>
          <TableCell align="right">0.7812</TableCell>
          <TableCell align="right">₩3,245,000</TableCell>
          <TableCell align="right">
            <Text style={{ color: "#22c55e", fontWeight: "600" }}>+12.4%</Text>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">SOL</TableCell>
          <TableCell align="right">12.45</TableCell>
          <TableCell align="right">₩980,000</TableCell>
          <TableCell align="right">
            <Text style={{ color: "#ef4444", fontWeight: "600" }}>-1.2%</Text>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">XRP</TableCell>
          <TableCell align="right">1,450.00</TableCell>
          <TableCell align="right">₩725,000</TableCell>
          <TableCell align="right">
            <Text style={{ color: "#22c55e", fontWeight: "600" }}>+4.5%</Text>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

/**
 * WithSortable
 *
 * 정렬 가능한 헤더와 다양한 정렬 상태를 보여줍니다.
 */
export const WithSortable: Story = {
  render: () => (
    <Table variant="default" size="medium">
      <TableHead>
        <TableRow>
          <TableHeadCell
            sortable
            sortDirection="asc"
            onSort={fn()}
          >
            자산명
          </TableHeadCell>
          <TableHeadCell align="right" sortable sortDirection="none" onSort={fn()}>
            보유량
          </TableHeadCell>
          <TableHeadCell align="right" sortable sortDirection="desc" onSort={fn()}>
            평가금액
          </TableHeadCell>
          <TableHeadCell align="right" sortable sortDirection="none" onSort={fn()}>
            등락률
          </TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>BTC</TableCell>
          <TableCell align="right">0.0234</TableCell>
          <TableCell align="right">₩1,850,000</TableCell>
          <TableCell align="right">
            <Text style={{ color: "#ef4444", fontWeight: "600" }}>-2.1%</Text>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>ETH</TableCell>
          <TableCell align="right">0.7812</TableCell>
          <TableCell align="right">₩3,245,000</TableCell>
          <TableCell align="right">
            <Text style={{ color: "#22c55e", fontWeight: "600" }}>+5.2%</Text>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>SOL</TableCell>
          <TableCell align="right">12.45</TableCell>
          <TableCell align="right">₩980,000</TableCell>
          <TableCell align="right">
            <Text style={{ color: "#22c55e", fontWeight: "600" }}>+3.8%</Text>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

/**
 * WithInteractiveRows
 *
 * 클릭 가능한 행과 pressed 상태 피드백을 보여줍니다.
 */
export const WithInteractiveRows: Story = {
  render: () => (
    <Table variant="default" size="medium">
      <TableHead>
        <TableRow>
          <TableHeadCell>자산명</TableHeadCell>
          <TableHeadCell align="right">보유량</TableHeadCell>
          <TableHeadCell align="right">평가금액</TableHeadCell>
          <TableHeadCell align="right">등락률</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow onPress={fn()}>
          <TableCell>BTC</TableCell>
          <TableCell align="right">0.0234</TableCell>
          <TableCell align="right">₩1,850,000</TableCell>
          <TableCell align="right">
            <Text style={{ color: "#ef4444", fontWeight: "600" }}>-2.1%</Text>
          </TableCell>
        </TableRow>
        <TableRow onPress={fn()}>
          <TableCell>ETH</TableCell>
          <TableCell align="right">0.7812</TableCell>
          <TableCell align="right">₩3,245,000</TableCell>
          <TableCell align="right">
            <Text style={{ color: "#22c55e", fontWeight: "600" }}>+5.2%</Text>
          </TableCell>
        </TableRow>
        <TableRow onPress={fn()}>
          <TableCell>SOL</TableCell>
          <TableCell align="right">12.45</TableCell>
          <TableCell align="right">₩980,000</TableCell>
          <TableCell align="right">
            <Text style={{ color: "#22c55e", fontWeight: "600" }}>+3.8%</Text>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

/**
 * WithSelection
 *
 * 선택된 행과 선택되지 않은 행의 시각적 차이를 보여줍니다.
 */
export const WithSelection: Story = {
  render: () => (
    <Table variant="default" size="medium">
      <TableHead>
        <TableRow>
          <TableHeadCell>자산명</TableHeadCell>
          <TableHeadCell align="right">보유량</TableHeadCell>
          <TableHeadCell align="right">평가금액</TableHeadCell>
          <TableHeadCell align="right">등락률</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow selected onPress={fn()}>
          <TableCell>BTC</TableCell>
          <TableCell align="right">0.0234</TableCell>
          <TableCell align="right">₩1,850,000</TableCell>
          <TableCell align="right">
            <Text style={{ color: "#ef4444", fontWeight: "600" }}>-2.1%</Text>
          </TableCell>
        </TableRow>
        <TableRow onPress={fn()}>
          <TableCell>ETH</TableCell>
          <TableCell align="right">0.7812</TableCell>
          <TableCell align="right">₩3,245,000</TableCell>
          <TableCell align="right">
            <Text style={{ color: "#22c55e", fontWeight: "600" }}>+5.2%</Text>
          </TableCell>
        </TableRow>
        <TableRow selected onPress={fn()}>
          <TableCell>SOL</TableCell>
          <TableCell align="right">12.45</TableCell>
          <TableCell align="right">₩980,000</TableCell>
          <TableCell align="right">
            <Text style={{ color: "#22c55e", fontWeight: "600" }}>+3.8%</Text>
          </TableCell>
        </TableRow>
        <TableRow onPress={fn()}>
          <TableCell>XRP</TableCell>
          <TableCell align="right">1,450.00</TableCell>
          <TableCell align="right">₩725,000</TableCell>
          <TableCell align="right">
            <Text style={{ color: "#ef4444", fontWeight: "600" }}>-1.5%</Text>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

/**
 * TransactionHistory
 *
 * 거래 내역 테이블 (striped, small)
 */
export const TransactionHistory: Story = {
  render: () => (
    <Table variant="striped" size="small">
      <TableHead>
        <TableRow>
          <TableHeadCell>거래일시</TableHeadCell>
          <TableHeadCell>유형</TableHeadCell>
          <TableHeadCell>자산</TableHeadCell>
          <TableHeadCell align="right">수량</TableHeadCell>
          <TableHeadCell align="right">금액</TableHeadCell>
          <TableHeadCell>상태</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>
            <Text style={{ fontSize: 13 }}>2025-02-06 14:23</Text>
          </TableCell>
          <TableCell>
            <Text style={{ color: "#22c55e", fontWeight: "600" }}>매수</Text>
          </TableCell>
          <TableCell>BTC</TableCell>
          <TableCell align="right">0.5</TableCell>
          <TableCell align="right">₩2,000,000</TableCell>
          <TableCell>
            <Text style={{ color: "#22c55e" }}>완료</Text>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Text style={{ fontSize: 13 }}>2025-02-05 09:45</Text>
          </TableCell>
          <TableCell>
            <Text style={{ color: "#ef4444", fontWeight: "600" }}>매도</Text>
          </TableCell>
          <TableCell>ETH</TableCell>
          <TableCell align="right">0.2</TableCell>
          <TableCell align="right">₩850,000</TableCell>
          <TableCell>
            <Text style={{ color: "#22c55e" }}>완료</Text>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Text style={{ fontSize: 13 }}>2025-02-04 16:12</Text>
          </TableCell>
          <TableCell>
            <Text style={{ color: "#22c55e", fontWeight: "600" }}>매수</Text>
          </TableCell>
          <TableCell>SOL</TableCell>
          <TableCell align="right">10.0</TableCell>
          <TableCell align="right">₩750,000</TableCell>
          <TableCell>
            <Text style={{ color: "#22c55e" }}>완료</Text>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Text style={{ fontSize: 13 }}>2025-02-03 11:30</Text>
          </TableCell>
          <TableCell>
            <Text style={{ color: "#64748b", fontWeight: "600" }}>입금</Text>
          </TableCell>
          <TableCell>USDT</TableCell>
          <TableCell align="right">1,000.00</TableCell>
          <TableCell align="right">₩1,000,000</TableCell>
          <TableCell>
            <Text style={{ color: "#f59e0b" }}>대기중</Text>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Text style={{ fontSize: 13 }}>2025-02-02 08:15</Text>
          </TableCell>
          <TableCell>
            <Text style={{ color: "#ef4444", fontWeight: "600" }}>출금</Text>
          </TableCell>
          <TableCell>XRP</TableCell>
          <TableCell align="right">500.00</TableCell>
          <TableCell align="right">₩250,000</TableCell>
          <TableCell>
            <Text style={{ color: "#22c55e" }}>완료</Text>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Text style={{ fontSize: 13 }}>2025-02-01 19:22</Text>
          </TableCell>
          <TableCell>
            <Text style={{ color: "#22c55e", fontWeight: "600" }}>매수</Text>
          </TableCell>
          <TableCell>ETH</TableCell>
          <TableCell align="right">0.3</TableCell>
          <TableCell align="right">₩1,200,000</TableCell>
          <TableCell>
            <Text style={{ color: "#22c55e" }}>완료</Text>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

/**
 * DeFiPositions
 *
 * DeFi 프로토콜 포지션 테이블
 */
export const DeFiPositions: Story = {
  render: () => (
    <Table variant="default" size="medium">
      <TableHead>
        <TableRow>
          <TableHeadCell>프로토콜</TableHeadCell>
          <TableHeadCell>풀</TableHeadCell>
          <TableHeadCell align="right">TVL</TableHeadCell>
          <TableHeadCell align="right">APY</TableHeadCell>
          <TableHeadCell align="right">내 포지션</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Uniswap V3</TableCell>
          <TableCell>ETH-USDC</TableCell>
          <TableCell align="right">$1.2B</TableCell>
          <TableCell align="right">
            <Text style={{ color: "#22c55e", fontWeight: "600" }}>12.5%</Text>
          </TableCell>
          <TableCell align="right">₩2,450,000</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Aave V3</TableCell>
          <TableCell>USDT Supply</TableCell>
          <TableCell align="right">$850M</TableCell>
          <TableCell align="right">
            <Text style={{ color: "#22c55e", fontWeight: "600" }}>8.3%</Text>
          </TableCell>
          <TableCell align="right">₩1,000,000</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Compound</TableCell>
          <TableCell>ETH Supply</TableCell>
          <TableCell align="right">$620M</TableCell>
          <TableCell align="right">
            <Text style={{ color: "#22c55e", fontWeight: "600" }}>6.7%</Text>
          </TableCell>
          <TableCell align="right">₩3,245,000</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Curve</TableCell>
          <TableCell>3pool</TableCell>
          <TableCell align="right">$2.1B</TableCell>
          <TableCell align="right">
            <Text style={{ color: "#22c55e", fontWeight: "600" }}>4.2%</Text>
          </TableCell>
          <TableCell align="right">₩500,000</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Lido</TableCell>
          <TableCell>stETH</TableCell>
          <TableCell align="right">$14.3B</TableCell>
          <TableCell align="right">
            <Text style={{ color: "#22c55e", fontWeight: "600" }}>3.8%</Text>
          </TableCell>
          <TableCell align="right">₩1,850,000</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

/**
 * UsageExample
 *
 * 실제 페이지 시뮬레이션 - 여러 테이블을 조합한 전체 화면
 */
export const UsageExample: Story = {
  render: () => (
    <View style={{ gap: 40, padding: 24, backgroundColor: "#fafbfc" }}>
      {/* 보유 자산 섹션 */}
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: "#1e293b",
            }}
          >
            보유 자산
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#64748b",
            }}
          >
            총 평가금액: ₩8,050,000
          </Text>
        </View>
        <Table variant="default" size="medium">
          <TableHead>
            <TableRow>
              <TableHeadCell>자산명</TableHeadCell>
              <TableHeadCell align="right">보유량</TableHeadCell>
              <TableHeadCell align="right">평가금액</TableHeadCell>
              <TableHeadCell align="right">등락률</TableHeadCell>
              <TableHeadCell align="right">수익률</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow onPress={fn()}>
              <TableCell>BTC</TableCell>
              <TableCell align="right">0.0234</TableCell>
              <TableCell align="right">₩1,850,000</TableCell>
              <TableCell align="right">
                <Text style={{ color: "#ef4444", fontWeight: "600" }}>
                  -2.1%
                </Text>
              </TableCell>
              <TableCell align="right">
                <Text style={{ color: "#22c55e", fontWeight: "600" }}>
                  +8.7%
                </Text>
              </TableCell>
            </TableRow>
            <TableRow onPress={fn()}>
              <TableCell>ETH</TableCell>
              <TableCell align="right">0.7812</TableCell>
              <TableCell align="right">₩3,245,000</TableCell>
              <TableCell align="right">
                <Text style={{ color: "#22c55e", fontWeight: "600" }}>
                  +5.2%
                </Text>
              </TableCell>
              <TableCell align="right">
                <Text style={{ color: "#22c55e", fontWeight: "600" }}>
                  +12.4%
                </Text>
              </TableCell>
            </TableRow>
            <TableRow onPress={fn()}>
              <TableCell>SOL</TableCell>
              <TableCell align="right">12.45</TableCell>
              <TableCell align="right">₩980,000</TableCell>
              <TableCell align="right">
                <Text style={{ color: "#22c55e", fontWeight: "600" }}>
                  +3.8%
                </Text>
              </TableCell>
              <TableCell align="right">
                <Text style={{ color: "#ef4444", fontWeight: "600" }}>
                  -1.2%
                </Text>
              </TableCell>
            </TableRow>
            <TableRow onPress={fn()}>
              <TableCell>XRP</TableCell>
              <TableCell align="right">1,450.00</TableCell>
              <TableCell align="right">₩725,000</TableCell>
              <TableCell align="right">
                <Text style={{ color: "#ef4444", fontWeight: "600" }}>
                  -1.5%
                </Text>
              </TableCell>
              <TableCell align="right">
                <Text style={{ color: "#22c55e", fontWeight: "600" }}>
                  +4.5%
                </Text>
              </TableCell>
            </TableRow>
            <TableRow onPress={fn()}>
              <TableCell>USDT</TableCell>
              <TableCell align="right">1,250.00</TableCell>
              <TableCell align="right">₩1,250,000</TableCell>
              <TableCell align="right">
                <Text style={{ color: "#64748b", fontWeight: "600" }}>
                  0.0%
                </Text>
              </TableCell>
              <TableCell align="right">
                <Text style={{ color: "#64748b", fontWeight: "600" }}>
                  0.0%
                </Text>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </View>

      {/* 최근 거래 섹션 */}
      <View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            color: "#1e293b",
            marginBottom: 16,
          }}
        >
          최근 거래
        </Text>
        <Table variant="striped" size="small">
          <TableHead>
            <TableRow>
              <TableHeadCell>거래일시</TableHeadCell>
              <TableHeadCell>유형</TableHeadCell>
              <TableHeadCell>자산</TableHeadCell>
              <TableHeadCell align="right">수량</TableHeadCell>
              <TableHeadCell align="right">금액</TableHeadCell>
              <TableHeadCell>상태</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Text style={{ fontSize: 13 }}>2025-02-06 14:23</Text>
              </TableCell>
              <TableCell>
                <Text style={{ color: "#22c55e", fontWeight: "600" }}>
                  매수
                </Text>
              </TableCell>
              <TableCell>BTC</TableCell>
              <TableCell align="right">0.5</TableCell>
              <TableCell align="right">₩2,000,000</TableCell>
              <TableCell>
                <Text style={{ color: "#22c55e" }}>완료</Text>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Text style={{ fontSize: 13 }}>2025-02-05 09:45</Text>
              </TableCell>
              <TableCell>
                <Text style={{ color: "#ef4444", fontWeight: "600" }}>
                  매도
                </Text>
              </TableCell>
              <TableCell>ETH</TableCell>
              <TableCell align="right">0.2</TableCell>
              <TableCell align="right">₩850,000</TableCell>
              <TableCell>
                <Text style={{ color: "#22c55e" }}>완료</Text>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Text style={{ fontSize: 13 }}>2025-02-04 16:12</Text>
              </TableCell>
              <TableCell>
                <Text style={{ color: "#22c55e", fontWeight: "600" }}>
                  매수
                </Text>
              </TableCell>
              <TableCell>SOL</TableCell>
              <TableCell align="right">10.0</TableCell>
              <TableCell align="right">₩750,000</TableCell>
              <TableCell>
                <Text style={{ color: "#22c55e" }}>완료</Text>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </View>
    </View>
  ),
};
