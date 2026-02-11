import { TextButton } from '@baerae-zkap/design-system/native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View, Text } from 'react-native';
import { fn } from 'storybook/test';
import { ExternalLink, ArrowUpRight, ChevronRight, Download, RefreshCw, Wallet } from 'lucide-react-native';

/**
 * TextButton - 배경 없는 경량 텍스트 버튼
 *
 * 암호화폐 지갑 및 자산 관리 앱에서 보조 액션, 네비게이션, 인라인 링크에 사용됩니다.
 */
const meta = {
  title: '@baerae-zkap/Actions/Text button',
  component: TextButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['clear', 'underline', 'arrow'],
      description: '버튼 스타일',
      table: { category: '스타일' }
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
      description: '색상 테마',
      table: { category: '스타일' }
    },
    size: {
      control: 'select',
      options: ['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge'],
      description: '텍스트 크기',
      table: { category: '크기' }
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
      table: { category: '상태' }
    },
    loading: {
      control: 'boolean',
      description: '로딩 상태',
      table: { category: '상태' }
    },
    contentColor: { table: { disable: true } },
    onPress: { table: { disable: true } },
    leadingIcon: { table: { disable: true } },
    trailingIcon: { table: { disable: true } },
    style: { table: { disable: true } },
    testID: { table: { disable: true } },
    accessibilityLabel: { table: { disable: true } },
  },
  args: {
    onPress: fn(),
    variant: 'clear',
    color: 'primary',
    size: 'medium',
    disabled: false,
    loading: false,
    children: '더보기',
  },
  decorators: [
    (Story) => (
      <View style={{ width: 375, padding: 20, backgroundColor: '#f8fafc', alignItems: 'flex-start' }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Default (Playground)
export const Default: Story = {
  render: (args) => <TextButton {...args}>{args.children}</TextButton>,
};

// 2. Variants
export const Variants: Story = {
  render: () => (
    <View style={{ gap: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <TextButton variant="clear" color="primary" onPress={fn()}>
          자산 현황 보기
        </TextButton>
        <Text style={{ fontSize: 13, color: '#64748b' }}>Clear (기본, 배경 없음)</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <TextButton variant="underline" color="primary" onPress={fn()}>
          이용약관 확인
        </TextButton>
        <Text style={{ fontSize: 13, color: '#64748b' }}>Underline (밑줄)</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <TextButton variant="arrow" color="primary" onPress={fn()}>
          전체 거래 내역
        </TextButton>
        <Text style={{ fontSize: 13, color: '#64748b' }}>Arrow (화살표 아이콘)</Text>
      </View>
    </View>
  ),
};

// 3. Colors
export const Colors: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      {/* Clear Row */}
      <View>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#94a3b8', marginBottom: 12 }}>Clear</Text>
        <View style={{ flexDirection: 'row', gap: 16 }}>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <TextButton variant="clear" color="primary" onPress={fn()}>
              포트폴리오 보기
            </TextButton>
            <Text style={{ fontSize: 11, color: '#64748b' }}>Primary</Text>
          </View>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <TextButton variant="clear" color="secondary" onPress={fn()}>
              더보기
            </TextButton>
            <Text style={{ fontSize: 11, color: '#64748b' }}>Secondary</Text>
          </View>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <TextButton variant="clear" color="danger" onPress={fn()}>
              계정 삭제
            </TextButton>
            <Text style={{ fontSize: 11, color: '#64748b' }}>Danger</Text>
          </View>
        </View>
      </View>

      {/* Underline Row */}
      <View>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#94a3b8', marginBottom: 12 }}>Underline</Text>
        <View style={{ flexDirection: 'row', gap: 16 }}>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <TextButton variant="underline" color="primary" onPress={fn()}>
              포트폴리오 보기
            </TextButton>
            <Text style={{ fontSize: 11, color: '#64748b' }}>Primary</Text>
          </View>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <TextButton variant="underline" color="secondary" onPress={fn()}>
              더보기
            </TextButton>
            <Text style={{ fontSize: 11, color: '#64748b' }}>Secondary</Text>
          </View>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <TextButton variant="underline" color="danger" onPress={fn()}>
              계정 삭제
            </TextButton>
            <Text style={{ fontSize: 11, color: '#64748b' }}>Danger</Text>
          </View>
        </View>
      </View>

      {/* Arrow Row */}
      <View>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#94a3b8', marginBottom: 12 }}>Arrow</Text>
        <View style={{ flexDirection: 'row', gap: 16 }}>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <TextButton variant="arrow" color="primary" onPress={fn()}>
              포트폴리오 보기
            </TextButton>
            <Text style={{ fontSize: 11, color: '#64748b' }}>Primary</Text>
          </View>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <TextButton variant="arrow" color="secondary" onPress={fn()}>
              더보기
            </TextButton>
            <Text style={{ fontSize: 11, color: '#64748b' }}>Secondary</Text>
          </View>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <TextButton variant="arrow" color="danger" onPress={fn()}>
              계정 삭제
            </TextButton>
            <Text style={{ fontSize: 11, color: '#64748b' }}>Danger</Text>
          </View>
        </View>
      </View>
    </View>
  ),
};

// 4. Sizes
export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <TextButton size="xsmall" color="primary" onPress={fn()}>
          자산 보기
        </TextButton>
        <Text style={{ fontSize: 13, color: '#64748b' }}>XSmall (12px)</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <TextButton size="small" color="primary" onPress={fn()}>
          자산 보기
        </TextButton>
        <Text style={{ fontSize: 13, color: '#64748b' }}>Small (14px)</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <TextButton size="medium" color="primary" onPress={fn()}>
          자산 보기
        </TextButton>
        <Text style={{ fontSize: 13, color: '#64748b' }}>Medium (16px)</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <TextButton size="large" color="primary" onPress={fn()}>
          자산 보기
        </TextButton>
        <Text style={{ fontSize: 13, color: '#64748b' }}>Large (18px)</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <TextButton size="xlarge" color="primary" onPress={fn()}>
          자산 보기
        </TextButton>
        <Text style={{ fontSize: 13, color: '#64748b' }}>XLarge (20px)</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <TextButton size="xxlarge" color="primary" onPress={fn()}>
          자산 보기
        </TextButton>
        <Text style={{ fontSize: 13, color: '#64748b' }}>XXLarge (24px)</Text>
      </View>
    </View>
  ),
};

// 5. States
export const States: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      {/* Primary States */}
      <View>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#94a3b8', marginBottom: 12 }}>Primary</Text>
        <View style={{ flexDirection: 'row', gap: 16 }}>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <TextButton color="primary" onPress={fn()}>
              자산 보기
            </TextButton>
            <Text style={{ fontSize: 11, color: '#64748b' }}>Normal</Text>
          </View>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <TextButton color="primary" disabled onPress={fn()}>
              자산 보기
            </TextButton>
            <Text style={{ fontSize: 11, color: '#64748b' }}>Disabled</Text>
          </View>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <TextButton color="primary" loading onPress={fn()}>
              자산 보기
            </TextButton>
            <Text style={{ fontSize: 11, color: '#64748b' }}>Loading</Text>
          </View>
        </View>
      </View>

      {/* Secondary States */}
      <View>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#94a3b8', marginBottom: 12 }}>Secondary</Text>
        <View style={{ flexDirection: 'row', gap: 16 }}>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <TextButton color="secondary" onPress={fn()}>
              더보기
            </TextButton>
            <Text style={{ fontSize: 11, color: '#64748b' }}>Normal</Text>
          </View>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <TextButton color="secondary" disabled onPress={fn()}>
              더보기
            </TextButton>
            <Text style={{ fontSize: 11, color: '#64748b' }}>Disabled</Text>
          </View>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <TextButton color="secondary" loading onPress={fn()}>
              더보기
            </TextButton>
            <Text style={{ fontSize: 11, color: '#64748b' }}>Loading</Text>
          </View>
        </View>
      </View>

      {/* Danger States */}
      <View>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#94a3b8', marginBottom: 12 }}>Danger</Text>
        <View style={{ flexDirection: 'row', gap: 16 }}>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <TextButton color="danger" onPress={fn()}>
              삭제
            </TextButton>
            <Text style={{ fontSize: 11, color: '#64748b' }}>Normal</Text>
          </View>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <TextButton color="danger" disabled onPress={fn()}>
              삭제
            </TextButton>
            <Text style={{ fontSize: 11, color: '#64748b' }}>Disabled</Text>
          </View>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <TextButton color="danger" loading onPress={fn()}>
              삭제
            </TextButton>
            <Text style={{ fontSize: 11, color: '#64748b' }}>Loading</Text>
          </View>
        </View>
      </View>
    </View>
  ),
};

// 6. WithLeadingIcon
export const WithLeadingIcon: Story = {
  render: () => (
    <View style={{ gap: 20 }}>
      <View>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#94a3b8', marginBottom: 12 }}>Clear Variant</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
          <TextButton
            variant="clear"
            color="primary"
            leadingIcon={<Wallet size={16} color="currentColor" />}
            onPress={fn()}
          >
            지갑 연결
          </TextButton>
          <TextButton
            variant="clear"
            color="secondary"
            leadingIcon={<Download size={16} color="currentColor" />}
            onPress={fn()}
          >
            내역 다운로드
          </TextButton>
          <TextButton
            variant="clear"
            color="primary"
            leadingIcon={<RefreshCw size={16} color="currentColor" />}
            onPress={fn()}
          >
            새로고침
          </TextButton>
        </View>
      </View>

      <View>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#94a3b8', marginBottom: 12 }}>Underline Variant</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
          <TextButton
            variant="underline"
            color="primary"
            leadingIcon={<ExternalLink size={16} color="currentColor" />}
            onPress={fn()}
          >
            외부 링크 열기
          </TextButton>
          <TextButton
            variant="underline"
            color="secondary"
            leadingIcon={<Download size={16} color="currentColor" />}
            onPress={fn()}
          >
            보고서 다운로드
          </TextButton>
        </View>
      </View>

      <View>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#94a3b8', marginBottom: 12 }}>Arrow Variant</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
          <TextButton
            variant="arrow"
            color="primary"
            leadingIcon={<Wallet size={16} color="currentColor" />}
            onPress={fn()}
          >
            지갑 상세보기
          </TextButton>
          <TextButton
            variant="arrow"
            color="secondary"
            leadingIcon={<RefreshCw size={16} color="currentColor" />}
            onPress={fn()}
          >
            새로고침
          </TextButton>
        </View>
      </View>
    </View>
  ),
};

// 7. InlineUsage
export const InlineUsage: Story = {
  render: () => (
    <View style={{ gap: 20 }}>
      <View style={{
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
          <Text style={{ fontSize: 14, color: '#334155', lineHeight: 24 }}>
            현재 보유 자산을 확인하려면{' '}
          </Text>
          <TextButton variant="arrow" color="primary" size="small" onPress={fn()}>
            포트폴리오 보기
          </TextButton>
          <Text style={{ fontSize: 14, color: '#334155', lineHeight: 24 }}>
            {' '}를 눌러주세요.
          </Text>
        </View>
      </View>

      <View style={{
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
          <Text style={{ fontSize: 14, color: '#334155', lineHeight: 24 }}>
            자세한 내용은{' '}
          </Text>
          <TextButton variant="underline" color="primary" size="small" onPress={fn()}>
            이용약관
          </TextButton>
          <Text style={{ fontSize: 14, color: '#334155', lineHeight: 24 }}>
            {' '}및{' '}
          </Text>
          <TextButton variant="underline" color="primary" size="small" onPress={fn()}>
            개인정보처리방침
          </TextButton>
          <Text style={{ fontSize: 14, color: '#334155', lineHeight: 24 }}>
            {' '}에서 확인하실 수 있습니다.
          </Text>
        </View>
      </View>

      <View style={{
        padding: 16,
        backgroundColor: '#fef2f2',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#fecaca',
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
          <Text style={{ fontSize: 14, color: '#991b1b', lineHeight: 24 }}>
            계정을 삭제하시려면{' '}
          </Text>
          <TextButton variant="underline" color="danger" size="small" onPress={fn()}>
            여기
          </TextButton>
          <Text style={{ fontSize: 14, color: '#991b1b', lineHeight: 24 }}>
            {' '}를 눌러주세요.
          </Text>
        </View>
      </View>
    </View>
  ),
};

// 8. InComponentUsage
export const InComponentUsage: Story = {
  render: () => (
    <View style={{ gap: 20 }}>
      {/* Card with action button */}
      <View style={{
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      }}>
        <Text style={{ fontSize: 18, fontWeight: '700', color: '#1e293b', marginBottom: 8 }}>
          이번 달 투자 리포트
        </Text>
        <Text style={{ fontSize: 14, color: '#64748b', marginBottom: 16, lineHeight: 20 }}>
          포트폴리오 수익률이 12.5% 상승했습니다.
        </Text>
        <View style={{ alignItems: 'flex-end' }}>
          <TextButton variant="arrow" color="primary" onPress={fn()}>
            자세히 보기
          </TextButton>
        </View>
      </View>

      {/* Input-like area with max button */}
      <View style={{
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 8,
        }}>
          <Text style={{ fontSize: 13, fontWeight: '600', color: '#64748b' }}>
            송금 금액
          </Text>
          <TextButton variant="clear" color="primary" size="small" onPress={fn()}>
            최대 입력
          </TextButton>
        </View>
        <View style={{
          padding: 12,
          backgroundColor: '#f8fafc',
          borderRadius: 8,
        }}>
          <Text style={{ fontSize: 16, color: '#1e293b' }}>0.00 BTC</Text>
        </View>
      </View>

      {/* List with action */}
      <View style={{
        backgroundColor: 'white',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        overflow: 'hidden',
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 16,
          borderBottomWidth: 1,
          borderBottomColor: '#e2e8f0',
        }}>
          <View>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#1e293b', marginBottom: 2 }}>
              비트코인 (BTC)
            </Text>
            <Text style={{ fontSize: 13, color: '#64748b' }}>
              0.125 BTC
            </Text>
          </View>
          <TextButton variant="clear" color="primary" size="small" onPress={fn()}>
            거래하기
          </TextButton>
        </View>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 16,
        }}>
          <View>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#1e293b', marginBottom: 2 }}>
              이더리움 (ETH)
            </Text>
            <Text style={{ fontSize: 13, color: '#64748b' }}>
              2.45 ETH
            </Text>
          </View>
          <TextButton variant="clear" color="primary" size="small" onPress={fn()}>
            거래하기
          </TextButton>
        </View>
      </View>
    </View>
  ),
};

// 9. CustomizeExample
export const CustomizeExample: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <Text style={{ fontSize: 14, fontWeight: '600', color: '#64748b', textAlign: 'center' }}>
        커스텀 색상으로 브랜드 아이덴티티 표현
      </Text>

      <View style={{ flexDirection: 'row', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
        {/* Gold Tier */}
        <View style={{ alignItems: 'center', gap: 8 }}>
          <TextButton
            variant="arrow"
            contentColor="#f59e0b"
            onPress={fn()}
          >
            Gold 혜택 보기
          </TextButton>
          <Text style={{ fontSize: 11, color: '#64748b' }}>Gold Tier</Text>
        </View>

        {/* Purple Tier */}
        <View style={{ alignItems: 'center', gap: 8 }}>
          <TextButton
            variant="arrow"
            contentColor="#8b5cf6"
            onPress={fn()}
          >
            Purple 혜택 보기
          </TextButton>
          <Text style={{ fontSize: 11, color: '#64748b' }}>Purple Tier</Text>
        </View>

        {/* Teal Tier */}
        <View style={{ alignItems: 'center', gap: 8 }}>
          <TextButton
            variant="arrow"
            contentColor="#14b8a6"
            onPress={fn()}
          >
            Teal 혜택 보기
          </TextButton>
          <Text style={{ fontSize: 11, color: '#64748b' }}>Teal Tier</Text>
        </View>
      </View>

      {/* Underline Custom Colors */}
      <View style={{ gap: 12 }}>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#94a3b8', textAlign: 'center' }}>
          Underline + Custom Colors
        </Text>
        <View style={{ flexDirection: 'row', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <TextButton
            variant="underline"
            contentColor="#f59e0b"
            leadingIcon={<ExternalLink size={16} color="#f59e0b" />}
            onPress={fn()}
          >
            Gold 약관
          </TextButton>
          <TextButton
            variant="underline"
            contentColor="#8b5cf6"
            leadingIcon={<ExternalLink size={16} color="#8b5cf6" />}
            onPress={fn()}
          >
            Purple 약관
          </TextButton>
          <TextButton
            variant="underline"
            contentColor="#14b8a6"
            leadingIcon={<ExternalLink size={16} color="#14b8a6" />}
            onPress={fn()}
          >
            Teal 약관
          </TextButton>
        </View>
      </View>

      <View style={{
        padding: 16,
        backgroundColor: '#f0f9ff',
        borderRadius: 8,
        borderLeftWidth: 3,
        borderLeftColor: '#0284c7',
      }}>
        <Text style={{ fontSize: 13, color: '#075985', lineHeight: 20 }}>
          💡 <Text style={{ fontWeight: '600' }}>팁:</Text> contentColor를 사용하여 텍스트와 아이콘 색상을
          브랜드 컬러로 커스터마이징할 수 있습니다.
        </Text>
      </View>
    </View>
  ),
};

// 10. NavigationLinks
export const NavigationLinks: Story = {
  render: () => (
    <View style={{
      backgroundColor: 'white',
      borderRadius: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      overflow: 'hidden',
    }}>
      <View style={{
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
      }}>
        <Text style={{ fontSize: 18, fontWeight: '700', color: '#1e293b' }}>
          설정 및 관리
        </Text>
      </View>

      {[
        { icon: Wallet, label: '자산 관리', desc: '보유 자산 및 거래 내역' },
        { icon: ChevronRight, label: '거래 내역', desc: '최근 입출금 기록 확인' },
        { icon: RefreshCw, label: '보안 설정', desc: '인증 방식 및 보안 관리' },
        { icon: ExternalLink, label: '고객센터', desc: '문의 및 지원 서비스' },
      ].map((item, index, arr) => (
        <View
          key={item.label}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 20,
            borderBottomWidth: index < arr.length - 1 ? 1 : 0,
            borderBottomColor: '#e2e8f0',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 }}>
            <View style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: '#f1f5f9',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <item.icon size={20} color="#64748b" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 15, fontWeight: '600', color: '#1e293b', marginBottom: 2 }}>
                {item.label}
              </Text>
              <Text style={{ fontSize: 13, color: '#64748b' }}>
                {item.desc}
              </Text>
            </View>
          </View>
          <TextButton variant="arrow" color="secondary" size="small" onPress={fn()}>
            이동
          </TextButton>
        </View>
      ))}
    </View>
  ),
};
