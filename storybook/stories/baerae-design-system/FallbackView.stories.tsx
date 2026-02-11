import { FallbackView } from '@baerae-zkap/design-system/native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View, Text } from 'react-native';
import { fn } from 'storybook/test';
import { Wallet, Search, WifiOff } from 'lucide-react';

/**
 * FallbackView 컴포넌트
 *
 * 빈 상태(Empty State)와 오류 상태(Error State)를 표시하는 컴포넌트입니다.
 *
 * - **image**: 커스텀 이미지/일러스트레이션 (선택)
 * - **heading**: 제목 텍스트 (선택)
 * - **description**: 설명 텍스트 (필수)
 * - **action**: 단일 액션 버튼 (선택)
 * - **imageSize**: 이미지 크기 (기본 128)
 * - **compact**: 컴팩트 모드 (선택)
 */
const meta = {
  title: '@baerae-zkap/Feedback/Fallback view',
  component: FallbackView,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    heading: { control: 'text' },
    description: { control: 'text' },
    compact: { control: 'boolean' },
    imageSize: { control: { type: 'number', min: 64, max: 256, step: 16 } },
  },
  args: {
    heading: '데이터가 없어요',
    description: '새로운 항목을 추가해보세요',
    compact: false,
    imageSize: 128,
  },
  decorators: [
    (Story) => (
      <View style={{ minHeight: 600, backgroundColor: '#ffffff', padding: 20 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Default - Controls로 조정 가능
export const Default: Story = {
  render: (args) => <FallbackView {...args} />,
};

// 2. Anatomy - 모든 구성 요소 표시
export const Anatomy: Story = {
  render: () => (
    <View style={{ padding: 20 }}>
      <FallbackView
        image={
          <View
            style={{
              width: 128,
              height: 128,
              borderRadius: 64,
              backgroundColor: '#e0e7ff',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Wallet size={48} color="#6366f1" />
          </View>
        }
        heading="데이터가 없어요"
        description="거래소를 연결하고 자산을 확인해보세요"
        action={{
          label: '거래소 연결하기',
          onPress: fn(),
        }}
      />
      <View style={{ marginTop: 32, paddingHorizontal: 20 }}>
        <Text style={{ fontSize: 13, color: '#64748b', marginBottom: 8 }}>
          • Image: 커스텀 이미지 또는 일러스트레이션
        </Text>
        <Text style={{ fontSize: 13, color: '#64748b', marginBottom: 8 }}>
          • Heading: 제목 텍스트 (선택)
        </Text>
        <Text style={{ fontSize: 13, color: '#64748b', marginBottom: 8 }}>
          • Description: 설명 텍스트 (필수)
        </Text>
        <Text style={{ fontSize: 13, color: '#64748b', marginBottom: 8 }}>
          • Action: 단일 액션 버튼 (선택)
        </Text>
      </View>
    </View>
  ),
};

// 3. Compact - Normal vs Compact 비교
export const Compact: Story = {
  render: () => (
    <View style={{ gap: 24, padding: 20 }}>
      {/* Normal */}
      <View
        style={{
          borderWidth: 1,
          borderColor: '#e2e8f0',
          borderRadius: 12,
          overflow: 'hidden',
        }}
      >
        <View style={{ padding: 12, backgroundColor: '#f8fafc' }}>
          <Text style={{ fontSize: 12, fontWeight: '600', color: '#475569' }}>
            Normal (compact=false)
          </Text>
        </View>
        <FallbackView
          heading="데이터가 없어요"
          description="새로운 항목을 추가해보세요"
          compact={false}
        />
      </View>

      {/* Compact */}
      <View
        style={{
          borderWidth: 1,
          borderColor: '#e2e8f0',
          borderRadius: 12,
          overflow: 'hidden',
        }}
      >
        <View style={{ padding: 12, backgroundColor: '#f8fafc' }}>
          <Text style={{ fontSize: 12, fontWeight: '600', color: '#475569' }}>
            Compact (compact=true)
          </Text>
        </View>
        <FallbackView
          heading="데이터가 없어요"
          description="새로운 항목을 추가해보세요"
          compact={true}
        />
      </View>
    </View>
  ),
};

// 4. WithHeading / WithoutHeading
export const HeadingVariations: Story = {
  render: () => (
    <View style={{ gap: 40 }}>
      {/* With Heading */}
      <View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: '#334155',
            marginBottom: 16,
          }}
        >
          With Heading
        </Text>
        <FallbackView
          heading="보유 자산이 없어요"
          description="거래소를 연결하고 자산을 확인해보세요"
        />
      </View>

      {/* Without Heading - More Compact */}
      <View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: '#334155',
            marginBottom: 16,
          }}
        >
          Without Heading (More Compact)
        </Text>
        <FallbackView description="거래소를 연결하고 자산을 확인해보세요" />
      </View>
    </View>
  ),
};

// 5. EmptyState - 크립토/금융 테마
export const EmptyState: Story = {
  render: () => (
    <View style={{ gap: 48 }}>
      {/* With Action */}
      <FallbackView
        image={
          <View
            style={{
              width: 128,
              height: 128,
              borderRadius: 64,
              backgroundColor: '#e0e7ff',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Wallet size={48} color="#6366f1" />
          </View>
        }
        heading="보유 자산이 없어요"
        description="거래소를 연결하고 자산을 확인해보세요"
        action={{
          label: '거래소 연결하기',
          onPress: fn(),
        }}
      />

      {/* Without Action */}
      <FallbackView
        heading="거래 내역이 없어요"
        description="첫 번째 거래를 시작해보세요"
      />
    </View>
  ),
};

// 6. ErrorState - 오류 시나리오
export const ErrorState: Story = {
  render: () => (
    <View style={{ gap: 48 }}>
      {/* Network Error with Action */}
      <FallbackView
        image={
          <View
            style={{
              width: 128,
              height: 128,
              borderRadius: 64,
              backgroundColor: '#fee2e2',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <WifiOff size={48} color="#ef4444" />
          </View>
        }
        heading="데이터를 불러올 수 없어요"
        description="잠시 후 다시 시도해주세요"
        action={{
          label: '다시 시도',
          onPress: fn(),
        }}
      />

      {/* Permission Error without Action */}
      <FallbackView
        heading="접근 권한이 없어요"
        description="관리자에게 문의해주세요"
      />
    </View>
  ),
};

// 7. CustomImage - 커스텀 ReactNode 이미지
export const CustomImage: Story = {
  render: () => (
    <View style={{ gap: 48 }}>
      {/* Wallet Icon */}
      <FallbackView
        image={
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: '#dbeafe',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Wallet size={56} color="#3b82f6" />
          </View>
        }
        heading="지갑이 연결되지 않았어요"
        description="Web3 지갑을 연결해주세요"
        imageSize={120}
      />

      {/* Search Icon */}
      <FallbackView
        image={
          <View
            style={{
              width: 96,
              height: 96,
              borderRadius: 48,
              backgroundColor: '#f3f4f6',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Search size={40} color="#6b7280" />
          </View>
        }
        heading="검색 결과가 없어요"
        description="다른 키워드로 검색해보세요"
        imageSize={96}
      />

      {/* WiFi Off Icon */}
      <FallbackView
        image={
          <View
            style={{
              width: 112,
              height: 112,
              borderRadius: 56,
              backgroundColor: '#fef2f2',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <WifiOff size={48} color="#dc2626" />
          </View>
        }
        heading="네트워크 오류"
        description="인터넷 연결을 확인해주세요"
        imageSize={112}
      />
    </View>
  ),
};

// 8. InPageUsage - 실제 페이지 레이아웃 시뮬레이션
export const InPageUsage: Story = {
  render: () => (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      {/* TopNav-like Header */}
      <View
        style={{
          height: 56,
          paddingHorizontal: 20,
          backgroundColor: '#ffffff',
          borderBottomWidth: 1,
          borderBottomColor: '#e5e7eb',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#1f2937' }}>
          자산 내역
        </Text>
      </View>

      {/* FallbackView taking remaining space */}
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <FallbackView
          image={
            <View
              style={{
                width: 128,
                height: 128,
                borderRadius: 64,
                backgroundColor: '#e0e7ff',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Wallet size={48} color="#6366f1" />
            </View>
          }
          heading="보유 자산이 없어요"
          description="거래소를 연결하고 자산을 확인해보세요"
          action={{
            label: '거래소 연결하기',
            onPress: fn(),
          }}
        />
      </View>
    </View>
  ),
};
