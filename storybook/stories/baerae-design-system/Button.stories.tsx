import { Button } from '@baerae-zkap/design-system/native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View, Text } from 'react-native';
import { fn } from 'storybook/test';
import { Download, Upload, ArrowRight, Plus, Wallet, ArrowLeftRight, Share2, Heart, Check } from 'lucide-react-native';

/**
 * Button 컴포넌트
 *
 * - **variant**: solid(채움) / outlined(테두리) / weak(약한/반투명)
 * - **color**: primary / secondary / assistive / success / danger
 * - **size**: small(36) / medium(40) / large(48) / xlarge(52)
 * - **display**: inline(내용맞춤) / block(줄바꿈 확장) / full(부모 전체 너비)
 * - **loading**: 로딩 상태
 * - **leadingIcon / trailingIcon**: 아이콘 삽입
 * - **iconOnly**: 아이콘 전용 정사각 버튼
 */
const meta = {
  title: '@baerae-zkap/Actions/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['solid', 'outlined', 'weak'],
      description: '버튼 스타일',
      table: { category: '스타일' },
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'assistive', 'success', 'danger'],
      description: '색상 테마',
      table: { category: '스타일' },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'xlarge'],
      description: '버튼 크기',
      table: { category: '크기' },
    },
    display: {
      control: 'radio',
      options: ['inline', 'block', 'full'],
      description: '표시 방식',
      table: { category: '레이아웃' },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
      table: { category: '상태' },
    },
    loading: {
      control: 'boolean',
      description: '로딩 상태',
      table: { category: '상태' },
    },
    iconOnly: {
      control: 'boolean',
      description: '아이콘 전용 모드',
      table: { category: '아이콘' },
    },
    showLeadingIcon: {
      control: 'boolean',
      description: '선행 아이콘 표시',
      table: { category: '아이콘' },
    },
    showTrailingIcon: {
      control: 'boolean',
      description: '후행 아이콘 표시',
      table: { category: '아이콘' },
    },
    children: {
      control: 'text',
      description: '버튼 텍스트',
      table: { category: '콘텐츠' },
    },
  },
  args: {
    onPress: fn(),
    variant: 'solid',
    color: 'primary',
    size: 'medium',
    display: 'inline',
    disabled: false,
    loading: false,
    iconOnly: false,
    showLeadingIcon: false,
    showTrailingIcon: false,
    children: '매수',
  },
  decorators: [
    (Story) => (
      <View style={{ width: 375, padding: 20, backgroundColor: '#f8fafc' }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// 1. Default (Playground)
// ============================================
export const Default: Story = {
  render: (args: any) => {
    const { showLeadingIcon, showTrailingIcon, variant, color, ...rest } = args;

    // Determine icon color based on variant and color
    const getIconColor = () => {
      if (variant === 'solid') {
        return 'white';
      }
      // outlined or weak
      if (color === 'primary' || color === 'secondary') return '#0066FF';
      if (color === 'success') return '#14B66B';
      if (color === 'danger') return '#DC2F2F';
      return '#334155';
    };

    const iconColor = getIconColor();
    const leadingIcon = showLeadingIcon ? <Download size={18} color={iconColor} /> : undefined;
    const trailingIcon = showTrailingIcon ? <ArrowRight size={18} color={iconColor} /> : undefined;

    return (
      <Button
        {...rest}
        variant={variant}
        color={color}
        leadingIcon={leadingIcon}
        trailingIcon={trailingIcon}
      >
        {args.children}
      </Button>
    );
  },
};

// ============================================
// 2. ButtonTypes (Solid vs Outlined vs Weak)
// ============================================
export const ButtonTypes: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <View style={{ alignItems: 'center' }}>
        <Button variant="solid" color="primary" onPress={fn()}>
          Solid
        </Button>
        <Text style={{ fontSize: 12, color: '#64748b', marginTop: 8 }}>채움 스타일</Text>
      </View>
      <View style={{ alignItems: 'center' }}>
        <Button variant="outlined" color="primary" onPress={fn()}>
          Outlined
        </Button>
        <Text style={{ fontSize: 12, color: '#64748b', marginTop: 8 }}>테두리 스타일</Text>
      </View>
      <View style={{ alignItems: 'center' }}>
        <Button variant="weak" color="primary" onPress={fn()}>
          Weak
        </Button>
        <Text style={{ fontSize: 12, color: '#64748b', marginTop: 8 }}>약한/반투명 스타일</Text>
      </View>
    </View>
  ),
};

// ============================================
// 3. Colors (모든 색상)
// ============================================
export const Colors: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <View>
        <Button variant="solid" color="primary" onPress={fn()}>
          매수
        </Button>
        <Text style={{ fontSize: 11, color: '#64748b', marginTop: 6, textAlign: 'center' }}>
          primary
        </Text>
      </View>
      <View>
        <Button variant="solid" color="secondary" onPress={fn()}>
          지갑 연결
        </Button>
        <Text style={{ fontSize: 11, color: '#64748b', marginTop: 6, textAlign: 'center' }}>
          secondary
        </Text>
      </View>
      <View>
        <Button variant="solid" color="assistive" onPress={fn()}>
          취소
        </Button>
        <Text style={{ fontSize: 11, color: '#64748b', marginTop: 6, textAlign: 'center' }}>
          assistive
        </Text>
      </View>
      <View>
        <Button variant="solid" color="success" onPress={fn()}>
          스테이킹
        </Button>
        <Text style={{ fontSize: 11, color: '#64748b', marginTop: 6, textAlign: 'center' }}>
          success
        </Text>
      </View>
      <View>
        <Button variant="solid" color="danger" onPress={fn()}>
          매도
        </Button>
        <Text style={{ fontSize: 11, color: '#64748b', marginTop: 6, textAlign: 'center' }}>
          danger
        </Text>
      </View>
    </View>
  ),
};

// ============================================
// 4. Sizes (모든 크기)
// ============================================
export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 12, alignItems: 'flex-start' }}>
      <View>
        <Button variant="solid" color="primary" size="small" onPress={fn()}>
          매수
        </Button>
        <Text style={{ fontSize: 11, color: '#64748b', marginTop: 6 }}>Small (36px)</Text>
      </View>
      <View>
        <Button variant="solid" color="primary" size="medium" onPress={fn()}>
          매수
        </Button>
        <Text style={{ fontSize: 11, color: '#64748b', marginTop: 6 }}>Medium (40px)</Text>
      </View>
      <View>
        <Button variant="solid" color="primary" size="large" onPress={fn()}>
          매수
        </Button>
        <Text style={{ fontSize: 11, color: '#64748b', marginTop: 6 }}>Large (48px)</Text>
      </View>
      <View>
        <Button variant="solid" color="primary" size="xlarge" onPress={fn()}>
          매수
        </Button>
        <Text style={{ fontSize: 11, color: '#64748b', marginTop: 6 }}>XLarge (52px)</Text>
      </View>
    </View>
  ),
};

// ============================================
// 5. DisplayModes (레이아웃 모드)
// ============================================
export const DisplayModes: Story = {
  render: () => (
    <View style={{ gap: 20, width: '100%' }}>
      <View>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#334155', marginBottom: 8 }}>
          Inline (내용에 맞춤)
        </Text>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Button variant="solid" color="assistive" display="inline" onPress={fn()}>
            취소
          </Button>
          <Button variant="solid" color="primary" display="inline" onPress={fn()}>
            확인
          </Button>
        </View>
      </View>

      <View>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#334155', marginBottom: 8 }}>
          Block (줄바꿈 확장)
        </Text>
        <View style={{ gap: 8 }}>
          <Button variant="solid" color="primary" display="block" onPress={fn()}>
            매수
          </Button>
          <Button variant="solid" color="danger" display="block" onPress={fn()}>
            매도
          </Button>
        </View>
      </View>

      <View>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#334155', marginBottom: 8 }}>
          Full (부모 전체 너비)
        </Text>
        <View style={{ gap: 8 }}>
          <Button variant="solid" color="primary" display="full" onPress={fn()}>
            매수
          </Button>
          <Button variant="solid" color="danger" display="full" onPress={fn()}>
            매도
          </Button>
        </View>
      </View>
    </View>
  ),
};

// ============================================
// 6. WithIcons (아이콘 사용)
// ============================================
export const WithIcons: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      {/* Leading Icon */}
      <View>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#334155', marginBottom: 8 }}>
          Leading Icon
        </Text>
        <View style={{ gap: 8 }}>
          <Button
            variant="solid"
            color="primary"
            onPress={fn()}
            leadingIcon={<Download size={18} color="white" />}
          >
            입금
          </Button>
          <Button
            variant="solid"
            color="success"
            onPress={fn()}
            leadingIcon={<Plus size={18} color="white" />}
          >
            토큰 추가
          </Button>
        </View>
      </View>

      {/* Trailing Icon */}
      <View>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#334155', marginBottom: 8 }}>
          Trailing Icon
        </Text>
        <View style={{ gap: 8 }}>
          <Button
            variant="solid"
            color="primary"
            onPress={fn()}
            trailingIcon={<ArrowRight size={18} color="white" />}
          >
            거래소 연동
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onPress={fn()}
            trailingIcon={<Share2 size={18} color="#0066FF" />}
          >
            공유하기
          </Button>
        </View>
      </View>

      {/* Both Icons */}
      <View>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#334155', marginBottom: 8 }}>
          Leading + Trailing
        </Text>
        <Button
          variant="solid"
          color="primary"
          onPress={fn()}
          leadingIcon={<Wallet size={18} color="white" />}
          trailingIcon={<ArrowRight size={18} color="white" />}
        >
          메타마스크 연결
        </Button>
      </View>

      {/* Icon Only */}
      <View>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#334155', marginBottom: 8 }}>
          Icon Only (아이콘 전용)
        </Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Button
            variant="solid"
            color="assistive"
            size="medium"
            iconOnly
            onPress={fn()}
            leadingIcon={<Share2 size={18} color="#334155" />}
          />
          <Button
            variant="solid"
            color="assistive"
            size="medium"
            iconOnly
            onPress={fn()}
            leadingIcon={<Heart size={18} color="#334155" />}
          />
          <Button
            variant="solid"
            color="assistive"
            size="medium"
            iconOnly
            onPress={fn()}
            leadingIcon={<Download size={18} color="#334155" />}
          />
        </View>
      </View>
    </View>
  ),
};

// ============================================
// 7. States (모든 상태)
// ============================================
export const States: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#334155', marginBottom: 8 }}>
          Solid States
        </Text>
        <View style={{ gap: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Button variant="solid" color="primary" onPress={fn()}>
              Normal
            </Button>
            <Text style={{ fontSize: 11, color: '#64748b' }}>기본 상태</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Button variant="solid" color="primary" disabled onPress={fn()}>
              Disabled
            </Button>
            <Text style={{ fontSize: 11, color: '#64748b' }}>비활성화</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Button variant="solid" color="primary" loading onPress={fn()}>
              Loading
            </Button>
            <Text style={{ fontSize: 11, color: '#64748b' }}>로딩 중</Text>
          </View>
        </View>
      </View>

      <View>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#334155', marginBottom: 8 }}>
          Outlined States
        </Text>
        <View style={{ gap: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Button variant="outlined" color="primary" onPress={fn()}>
              Normal
            </Button>
            <Text style={{ fontSize: 11, color: '#64748b' }}>기본 상태</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Button variant="outlined" color="primary" disabled onPress={fn()}>
              Disabled
            </Button>
            <Text style={{ fontSize: 11, color: '#64748b' }}>비활성화</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Button variant="outlined" color="primary" loading onPress={fn()}>
              Loading
            </Button>
            <Text style={{ fontSize: 11, color: '#64748b' }}>로딩 중</Text>
          </View>
        </View>
      </View>

      <View>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#334155', marginBottom: 8 }}>
          Weak States
        </Text>
        <View style={{ gap: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Button variant="weak" color="primary" onPress={fn()}>
              Normal
            </Button>
            <Text style={{ fontSize: 11, color: '#64748b' }}>기본 상태</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Button variant="weak" color="primary" disabled onPress={fn()}>
              Disabled
            </Button>
            <Text style={{ fontSize: 11, color: '#64748b' }}>비활성화</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Button variant="weak" color="primary" loading onPress={fn()}>
              Loading
            </Button>
            <Text style={{ fontSize: 11, color: '#64748b' }}>로딩 중</Text>
          </View>
        </View>
      </View>
    </View>
  ),
};

// ============================================
// 8. AllVariantsByColor (색상별 전체 변형)
// ============================================
export const AllVariantsByColor: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      {/* primary */}
      <View>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#334155', marginBottom: 8 }}>
          Primary
        </Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Button variant="solid" color="primary" onPress={fn()}>
            Solid
          </Button>
          <Button variant="outlined" color="primary" onPress={fn()}>
            Outlined
          </Button>
          <Button variant="weak" color="primary" onPress={fn()}>
            Weak
          </Button>
        </View>
      </View>

      {/* secondary */}
      <View>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#334155', marginBottom: 8 }}>
          Secondary
        </Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Button variant="solid" color="secondary" onPress={fn()}>
            Solid
          </Button>
          <Button variant="outlined" color="secondary" onPress={fn()}>
            Outlined
          </Button>
          <Button variant="weak" color="secondary" onPress={fn()}>
            Weak
          </Button>
        </View>
      </View>

      {/* assistive */}
      <View>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#334155', marginBottom: 8 }}>
          Assistive
        </Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Button variant="solid" color="assistive" onPress={fn()}>
            Solid
          </Button>
          <Button variant="outlined" color="assistive" onPress={fn()}>
            Outlined
          </Button>
          <Button variant="weak" color="assistive" onPress={fn()}>
            Weak
          </Button>
        </View>
      </View>

      {/* success */}
      <View>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#334155', marginBottom: 8 }}>
          Success
        </Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Button variant="solid" color="success" onPress={fn()}>
            Solid
          </Button>
          <Button variant="outlined" color="success" onPress={fn()}>
            Outlined
          </Button>
          <Button variant="weak" color="success" onPress={fn()}>
            Weak
          </Button>
        </View>
      </View>

      {/* danger */}
      <View>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#334155', marginBottom: 8 }}>
          Danger
        </Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Button variant="solid" color="danger" onPress={fn()}>
            Solid
          </Button>
          <Button variant="outlined" color="danger" onPress={fn()}>
            Outlined
          </Button>
          <Button variant="weak" color="danger" onPress={fn()}>
            Weak
          </Button>
        </View>
      </View>
    </View>
  ),
};

// ============================================
// 9. Hierarchy (계층 구조)
// ============================================
export const Hierarchy: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#334155', marginBottom: 4 }}>
          Level 4 - 가장 중요한 행동
        </Text>
        <Text style={{ fontSize: 11, color: '#64748b', marginBottom: 8 }}>
          Primary solid: 매수, 확인 등
        </Text>
        <Button variant="solid" color="primary" onPress={fn()}>
          매수
        </Button>
      </View>

      <View>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#334155', marginBottom: 4 }}>
          Level 3 - 대체 행동
        </Text>
        <Text style={{ fontSize: 11, color: '#64748b', marginBottom: 8 }}>
          Secondary solid: 지갑 연결 등
        </Text>
        <Button variant="solid" color="secondary" onPress={fn()}>
          지갑 연결
        </Button>
      </View>

      <View>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#334155', marginBottom: 4 }}>
          Level 2 - 보조 행동
        </Text>
        <Text style={{ fontSize: 11, color: '#64748b', marginBottom: 8 }}>
          Assistive solid: 취소, 뒤로 등
        </Text>
        <Button variant="solid" color="assistive" onPress={fn()}>
          취소
        </Button>
      </View>

      <View>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#334155', marginBottom: 4 }}>
          Level 1 - 최소 강조
        </Text>
        <Text style={{ fontSize: 11, color: '#64748b', marginBottom: 8 }}>
          Assistive outlined: 닫기, 나중에 등
        </Text>
        <Button variant="outlined" color="assistive" onPress={fn()}>
          닫기
        </Button>
      </View>
    </View>
  ),
};

// ============================================
// 10. UsageExample (실제 사용 예시)
// ============================================
export const UsageExample: Story = {
  render: () => (
    <View style={{ gap: 24, width: '100%' }}>
      {/* 거래 화면 */}
      <View>
        <Text style={{ fontSize: 13, fontWeight: '600', color: '#334155', marginBottom: 8 }}>
          거래 화면
        </Text>
        <View style={{ gap: 8 }}>
          <Button
            variant="solid"
            color="primary"
            display="full"
            size="large"
            onPress={fn()}
          >
            매수
          </Button>
          <Button
            variant="solid"
            color="danger"
            display="full"
            size="large"
            onPress={fn()}
          >
            매도
          </Button>
        </View>
      </View>

      {/* 지갑 연결 */}
      <View>
        <Text style={{ fontSize: 13, fontWeight: '600', color: '#334155', marginBottom: 8 }}>
          지갑 연결
        </Text>
        <Button
          variant="outlined"
          color="primary"
          display="full"
          onPress={fn()}
          leadingIcon={<Wallet size={18} color="#0066FF" />}
        >
          메타마스크 연결
        </Button>
      </View>

      {/* 바텀 액션 */}
      <View>
        <Text style={{ fontSize: 13, fontWeight: '600', color: '#334155', marginBottom: 8 }}>
          바텀 액션 (Modal Footer)
        </Text>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Button
            variant="solid"
            color="assistive"
            display="inline"
            style={{ flex: 1 }}
            onPress={fn()}
          >
            취소
          </Button>
          <Button
            variant="solid"
            color="primary"
            display="inline"
            style={{ flex: 1 }}
            onPress={fn()}
          >
            확인
          </Button>
        </View>
      </View>

      {/* 로딩 상태 */}
      <View>
        <Text style={{ fontSize: 13, fontWeight: '600', color: '#334155', marginBottom: 8 }}>
          거래 처리 중
        </Text>
        <Button
          variant="solid"
          color="primary"
          display="full"
          loading
          onPress={fn()}
        >
          거래 처리 중...
        </Button>
      </View>

      {/* 아이콘 버튼들 */}
      <View>
        <Text style={{ fontSize: 13, fontWeight: '600', color: '#334155', marginBottom: 8 }}>
          빠른 액션
        </Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Button
            variant="solid"
            color="assistive"
            size="medium"
            iconOnly
            onPress={fn()}
            leadingIcon={<Share2 size={18} color="#334155" />}
          />
          <Button
            variant="solid"
            color="assistive"
            size="medium"
            iconOnly
            onPress={fn()}
            leadingIcon={<Heart size={18} color="#334155" />}
          />
          <Button
            variant="solid"
            color="assistive"
            size="medium"
            iconOnly
            onPress={fn()}
            leadingIcon={<Download size={18} color="#334155" />}
          />
        </View>
      </View>
    </View>
  ),
};

// ============================================
// 11. CryptoScenarios (암호화폐 시나리오)
// ============================================
export const CryptoScenarios: Story = {
  render: () => (
    <View style={{ gap: 24, width: '100%' }}>
      {/* 스테이킹 */}
      <View>
        <Text style={{ fontSize: 13, fontWeight: '600', color: '#334155', marginBottom: 8 }}>
          스테이킹
        </Text>
        <View style={{ gap: 8 }}>
          <Button
            variant="solid"
            color="success"
            display="full"
            onPress={fn()}
            leadingIcon={<Plus size={18} color="white" />}
          >
            스테이킹 시작
          </Button>
          <Button
            variant="outlined"
            color="danger"
            display="full"
            onPress={fn()}
          >
            스테이킹 해제
          </Button>
        </View>
      </View>

      {/* 토큰 스왑 */}
      <View>
        <Text style={{ fontSize: 13, fontWeight: '600', color: '#334155', marginBottom: 8 }}>
          토큰 스왑
        </Text>
        <Button
          variant="solid"
          color="primary"
          display="full"
          size="large"
          onPress={fn()}
          leadingIcon={<ArrowLeftRight size={20} color="white" />}
        >
          스왑
        </Button>
      </View>

      {/* 입출금 */}
      <View>
        <Text style={{ fontSize: 13, fontWeight: '600', color: '#334155', marginBottom: 8 }}>
          입출금
        </Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Button
            variant="solid"
            color="primary"
            style={{ flex: 1 }}
            onPress={fn()}
            leadingIcon={<Download size={18} color="white" />}
          >
            입금
          </Button>
          <Button
            variant="outlined"
            color="primary"
            style={{ flex: 1 }}
            onPress={fn()}
            leadingIcon={<Upload size={18} color="#0066FF" />}
          >
            출금
          </Button>
        </View>
      </View>

      {/* NFT 구매 */}
      <View>
        <Text style={{ fontSize: 13, fontWeight: '600', color: '#334155', marginBottom: 8 }}>
          NFT 구매
        </Text>
        <Button
          variant="solid"
          color="primary"
          display="full"
          size="large"
          onPress={fn()}
          trailingIcon={<Check size={18} color="white" />}
        >
          NFT 구매하기
        </Button>
      </View>
    </View>
  ),
};

// ============================================
// 12. PressedState (누름 상태 테스트)
// ============================================
export const PressedState: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Text style={{ fontSize: 14, fontWeight: '600', color: '#334155' }}>
        아래 버튼을 눌러서 Pressed 상태 확인
      </Text>
      <Text style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>
        누르면 색상이 어두워져야 합니다
      </Text>

      <View style={{ gap: 12 }}>
        <Button variant="solid" color="primary" onPress={fn()}>
          Primary Solid - 눌러보기
        </Button>
        <Button variant="outlined" color="primary" onPress={fn()}>
          Primary Outlined - 눌러보기
        </Button>
        <Button variant="weak" color="primary" onPress={fn()}>
          Primary Weak - 눌러보기
        </Button>
        <Button variant="solid" color="assistive" onPress={fn()}>
          Assistive Solid - 눌러보기
        </Button>
        <Button variant="solid" color="success" onPress={fn()}>
          Success Solid - 눌러보기
        </Button>
        <Button variant="solid" color="danger" onPress={fn()}>
          Danger Solid - 눌러보기
        </Button>
      </View>
    </View>
  ),
};
