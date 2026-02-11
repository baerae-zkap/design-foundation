import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { Alert } from '@baerae-zkap/design-system/native';

/**
 * Alert 컴포넌트
 *
 * 현재 화면 위에 창을 띄워, 사용자의 흐름을 잠시 멈추고 주의할 내용을 안내하는 모달 다이얼로그입니다.
 * 사용자가 반드시 확인하고 넘어가야 하는 주요한 상황에 사용합니다.
 *
 * ## Features
 * - Heading 선택적 (body만으로도 사용 가능)
 * - 액션 유형: 권장 행동(brand), 부정 행동(negative/error), 보조 행동(secondary)
 * - 스크림 터치 닫기 비활성 기본 (반드시 버튼으로 닫기)
 * - Spring 애니메이션 (scale + opacity)
 */
const meta = {
  title: '@baerae-zkap/Feedback/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    heading: {
      control: 'text',
      description: '제목 (선택)',
      table: { category: '콘텐츠' },
    },
    body: {
      control: 'text',
      description: '본문 메시지',
      table: { category: '콘텐츠' },
    },
    negative: {
      control: 'boolean',
      description: '부정 행동 모드 (빨간색 버튼)',
      table: { category: '스타일' },
    },
    closeOnScrim: {
      control: 'boolean',
      description: '스크림 터치 시 닫기',
      table: { category: '기능' },
    },
    primaryLabel: {
      control: 'text',
      description: '주요 액션 버튼 라벨',
      table: { category: '액션' },
    },
    secondaryLabel: {
      control: 'text',
      description: '보조 액션 버튼 라벨',
      table: { category: '액션' },
    },
    showSecondary: {
      control: 'boolean',
      description: '보조 버튼 표시',
      table: { category: '액션' },
    },
  },
  args: {
    heading: '자산 매도 확인',
    body: '보유 중인 0.5 BTC를 현재 시세로 매도하시겠습니까? 이 작업은 취소할 수 없습니다.',
    negative: false,
    closeOnScrim: false,
    primaryLabel: '매도',
    secondaryLabel: '취소',
    showSecondary: true,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// === 1. Default (Playground) ===
export const Default: Story = {
  render: (args: any) => {
    const Comp = () => {
      const [visible, setVisible] = useState(true);
      return (
        <View style={s.center}>
          <Pressable style={s.openBtn} onPress={() => setVisible(true)}>
            <Text style={s.openBtnText}>Alert 열기</Text>
          </Pressable>
          <Alert
            visible={visible}
            onClose={() => setVisible(false)}
            heading={args.heading}
            body={args.body}
            negative={args.negative}
            closeOnScrim={args.closeOnScrim}
            primaryAction={{
              label: args.primaryLabel || '확인',
              onPress: () => setVisible(false),
            }}
            secondaryAction={
              args.showSecondary
                ? {
                    label: args.secondaryLabel || '취소',
                    onPress: () => setVisible(false),
                  }
                : undefined
            }
          />
        </View>
      );
    };
    return <Comp />;
  },
};

// === 2. WithHeading ===
export const WithHeading: Story = {
  render: () => {
    const Comp = () => {
      const [visible, setVisible] = useState(true);
      return (
        <View style={s.center}>
          <Pressable style={s.openBtn} onPress={() => setVisible(true)}>
            <Text style={s.openBtnText}>Alert 열기</Text>
          </Pressable>
          <Alert
            visible={visible}
            onClose={() => setVisible(false)}
            heading="출금 요청 확인"
            body="지갑 주소 0x742d...89Ab로 50,000 USDT를 출금하시겠습니까? 처리까지 약 10분이 소요됩니다."
            primaryAction={{ label: '출금 진행', onPress: () => setVisible(false) }}
            secondaryAction={{ label: '취소', onPress: () => setVisible(false) }}
          />
        </View>
      );
    };
    return <Comp />;
  },
};

// === 3. WithoutHeading ===
export const WithoutHeading: Story = {
  render: () => {
    const Comp = () => {
      const [visible, setVisible] = useState(true);
      return (
        <View style={s.center}>
          <Pressable style={s.openBtn} onPress={() => setVisible(true)}>
            <Text style={s.openBtnText}>Alert 열기</Text>
          </Pressable>
          <Alert
            visible={visible}
            onClose={() => setVisible(false)}
            body="거래가 성공적으로 완료되었습니다."
            primaryAction={{ label: '확인', onPress: () => setVisible(false) }}
          />
        </View>
      );
    };
    return <Comp />;
  },
};

// === 4. NegativeAction ===
export const NegativeAction: Story = {
  render: () => {
    const Comp = () => {
      const [visible, setVisible] = useState(true);
      return (
        <View style={s.center}>
          <Pressable style={[s.openBtn, s.negBtn]} onPress={() => setVisible(true)}>
            <Text style={s.openBtnText}>연결 해제 Alert</Text>
          </Pressable>
          <Alert
            visible={visible}
            onClose={() => setVisible(false)}
            heading="지갑 연결 해제"
            body="메타마스크 지갑 연결을 해제하시겠습니까? 연결된 모든 dApp에서 로그아웃됩니다."
            negative
            primaryAction={{ label: '연결 해제', onPress: () => setVisible(false) }}
            secondaryAction={{ label: '취소', onPress: () => setVisible(false) }}
          />
        </View>
      );
    };
    return <Comp />;
  },
};

// === 5. SingleButton ===
export const SingleButton: Story = {
  render: () => {
    const Comp = () => {
      const [visible, setVisible] = useState(true);
      return (
        <View style={s.center}>
          <Pressable style={s.openBtn} onPress={() => setVisible(true)}>
            <Text style={s.openBtnText}>Alert 열기</Text>
          </Pressable>
          <Alert
            visible={visible}
            onClose={() => setVisible(false)}
            heading="NFT 구매 완료"
            body="CryptoPunk #1234가 지갑에 추가되었습니다. 마이페이지에서 확인할 수 있습니다."
            primaryAction={{ label: '확인', onPress: () => setVisible(false) }}
          />
        </View>
      );
    };
    return <Comp />;
  },
};

// === 6. ActionTypes ===
export const ActionTypes: Story = {
  render: () => {
    const Comp = () => {
      const [normalVisible, setNormalVisible] = useState(false);
      const [negativeVisible, setNegativeVisible] = useState(false);
      return (
        <View style={s.center}>
          <View style={s.row}>
            <Pressable style={s.openBtn} onPress={() => setNormalVisible(true)}>
              <Text style={s.openBtnText}>권장 행동</Text>
            </Pressable>
            <Pressable style={[s.openBtn, s.negBtn]} onPress={() => setNegativeVisible(true)}>
              <Text style={s.openBtnText}>부정 행동</Text>
            </Pressable>
          </View>
          <Alert
            visible={normalVisible}
            onClose={() => setNormalVisible(false)}
            heading="ETH 매수 확인"
            body="1.5 ETH를 현재 시세로 매수하시겠습니까?"
            primaryAction={{ label: '매수', onPress: () => setNormalVisible(false) }}
            secondaryAction={{ label: '취소', onPress: () => setNormalVisible(false) }}
          />
          <Alert
            visible={negativeVisible}
            onClose={() => setNegativeVisible(false)}
            heading="계정 탈퇴"
            body="모든 자산과 거래 내역이 삭제됩니다. 이 작업은 되돌릴 수 없습니다."
            negative
            primaryAction={{ label: '탈퇴', onPress: () => setNegativeVisible(false) }}
            secondaryAction={{ label: '취소', onPress: () => setNegativeVisible(false) }}
          />
        </View>
      );
    };
    return <Comp />;
  },
};

// === 7. WithLongContent ===
export const WithLongContent: Story = {
  render: () => {
    const Comp = () => {
      const [visible, setVisible] = useState(true);
      return (
        <View style={s.center}>
          <Pressable style={s.openBtn} onPress={() => setVisible(true)}>
            <Text style={s.openBtnText}>Alert 열기</Text>
          </Pressable>
          <Alert
            visible={visible}
            onClose={() => setVisible(false)}
            heading="서비스 약관 동의"
            body="ZKAP 플랫폼을 이용하기 위해서는 서비스 이용약관, 개인정보 처리방침, 전자금융거래 이용약관에 동의해야 합니다. 약관 내용을 충분히 검토하신 후 동의해 주시기 바랍니다. 동의하지 않으실 경우 일부 서비스 이용이 제한될 수 있습니다."
            primaryAction={{ label: '동의', onPress: () => setVisible(false) }}
            secondaryAction={{ label: '거부', onPress: () => setVisible(false) }}
          />
        </View>
      );
    };
    return <Comp />;
  },
};

// === 8. TransactionConfirm ===
export const TransactionConfirm: Story = {
  render: () => {
    const Comp = () => {
      const [visible, setVisible] = useState(true);
      return (
        <View style={s.center}>
          <Pressable style={s.openBtn} onPress={() => setVisible(true)}>
            <Text style={s.openBtnText}>스테이킹 확인</Text>
          </Pressable>
          <Alert
            visible={visible}
            onClose={() => setVisible(false)}
            heading="SOL 스테이킹 확인"
            body="100 SOL을 90일간 스테이킹하시겠습니까? 예상 연이율: 7.2% APY. 락업 기간 동안 출금이 불가능합니다."
            primaryAction={{ label: '스테이킹 시작', onPress: () => setVisible(false) }}
            secondaryAction={{ label: '취소', onPress: () => setVisible(false) }}
          />
        </View>
      );
    };
    return <Comp />;
  },
};

// === 9. SecurityAlert ===
export const SecurityAlert: Story = {
  render: () => {
    const Comp = () => {
      const [visible, setVisible] = useState(true);
      return (
        <View style={s.center}>
          <Pressable style={[s.openBtn, s.negBtn]} onPress={() => setVisible(true)}>
            <Text style={s.openBtnText}>보안 경고</Text>
          </Pressable>
          <Alert
            visible={visible}
            onClose={() => setVisible(false)}
            heading="비정상 로그인 감지"
            body="새로운 기기(iPhone 14, Seoul)에서 로그인 시도가 감지되었습니다. 본인이 아니라면 즉시 비밀번호를 변경하세요."
            negative
            primaryAction={{ label: '비밀번호 변경', onPress: () => setVisible(false) }}
            secondaryAction={{ label: '본인입니다', onPress: () => setVisible(false) }}
          />
        </View>
      );
    };
    return <Comp />;
  },
};

// === 10. UsageExample ===
export const UsageExample: Story = {
  render: () => {
    const Comp = () => {
      const [tradingVisible, setTradingVisible] = useState(false);
      const [withdrawVisible, setWithdrawVisible] = useState(false);
      const [disconnectVisible, setDisconnectVisible] = useState(false);
      const [nftVisible, setNftVisible] = useState(false);

      return (
        <ScrollView contentContainerStyle={s.exampleContainer}>
          <Text style={s.sectionTitle}>다양한 Alert 유형</Text>
          <View style={s.buttonGroup}>
            <Pressable style={s.openBtn} onPress={() => setTradingVisible(true)}>
              <Text style={s.openBtnText}>자산 매도 (권장 행동)</Text>
            </Pressable>
            <Pressable style={s.openBtn} onPress={() => setWithdrawVisible(true)}>
              <Text style={s.openBtnText}>출금 확인 (Heading + Body)</Text>
            </Pressable>
            <Pressable style={[s.openBtn, s.negBtn]} onPress={() => setDisconnectVisible(true)}>
              <Text style={s.openBtnText}>지갑 해제 (부정 행동)</Text>
            </Pressable>
            <Pressable style={s.openBtn} onPress={() => setNftVisible(true)}>
              <Text style={s.openBtnText}>NFT 완료 (단일 버튼)</Text>
            </Pressable>
          </View>

          <Alert
            visible={tradingVisible}
            onClose={() => setTradingVisible(false)}
            heading="자산 매도 확인"
            body="보유 중인 2.5 ETH를 현재 시세(4,500,000 KRW)로 매도하시겠습니까?"
            primaryAction={{ label: '매도', onPress: () => setTradingVisible(false) }}
            secondaryAction={{ label: '취소', onPress: () => setTradingVisible(false) }}
          />

          <Alert
            visible={withdrawVisible}
            onClose={() => setWithdrawVisible(false)}
            heading="출금 요청 확인"
            body="지갑 주소 0x742d...89Ab로 100,000 USDT를 출금하시겠습니까? 네트워크 수수료 5 USDT가 차감됩니다."
            primaryAction={{ label: '출금 진행', onPress: () => setWithdrawVisible(false) }}
            secondaryAction={{ label: '취소', onPress: () => setWithdrawVisible(false) }}
          />

          <Alert
            visible={disconnectVisible}
            onClose={() => setDisconnectVisible(false)}
            heading="지갑 연결 해제"
            body="메타마스크 지갑 연결을 해제하시겠습니까? 연결된 모든 dApp에서 로그아웃됩니다."
            negative
            primaryAction={{ label: '연결 해제', onPress: () => setDisconnectVisible(false) }}
            secondaryAction={{ label: '취소', onPress: () => setDisconnectVisible(false) }}
          />

          <Alert
            visible={nftVisible}
            onClose={() => setNftVisible(false)}
            body="Bored Ape #5678이 지갑에 추가되었습니다."
            primaryAction={{ label: '확인', onPress: () => setNftVisible(false) }}
          />
        </ScrollView>
      );
    };
    return <Comp />;
  },
};

const s = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  openBtn: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 140,
  },
  negBtn: {
    backgroundColor: '#dc2626',
  },
  openBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  exampleContainer: {
    padding: 24,
    gap: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  buttonGroup: {
    gap: 12,
  },
});
