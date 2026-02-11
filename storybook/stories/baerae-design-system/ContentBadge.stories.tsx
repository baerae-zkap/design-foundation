import { ContentBadge } from '@baerae-zkap/design-system/native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View, Text } from 'react-native';

/**
 * ContentBadge 컴포넌트
 *
 * 콘텐츠의 상태, 카테고리, 라벨을 표시하는 **비인터랙티브** 요소입니다.
 * (Chip과 달리 클릭 불가 - 정보 표시 전용)
 *
 * - **variant**: filled(채움) / outlined(테두리) / subtle(연한 배경)
 * - **color**: brandDefault / baseDefault / successDefault / errorDefault / warningDefault / infoDefault
 * - **size**: small(18px) / medium(22px) / large(26px)
 * - **dot**: 상태 점 표시
 */
const meta = {
  title: '@baerae-zkap/Contents/Content badge',
  component: ContentBadge,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: { control: 'radio', options: ['filled', 'outlined', 'subtle'], name: '스타일', table: { category: '스타일' } },
    color: { control: 'select', options: ['brandDefault', 'baseDefault', 'successDefault', 'errorDefault', 'warningDefault', 'infoDefault'], name: '색상', table: { category: '스타일' } },
    size: { control: 'select', options: ['small', 'medium', 'large'], name: '크기', table: { category: '스타일' } },
    dot: { control: 'boolean', name: '상태 점', table: { category: '구성요소 토글' } },
    // Hide auto-generated controls
    leftIcon: { table: { disable: true } },
    children: { table: { disable: true } },
    style: { table: { disable: true } },
    testID: { table: { disable: true } },
    accessibilityLabel: { table: { disable: true } },
  },
  args: {
    variant: 'filled',
    color: 'brandDefault',
    size: 'medium',
    dot: false,
  },
  decorators: [
    (Story) => (
      <View style={{ width: 375, padding: 40, backgroundColor: '#f8fafc' }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof ContentBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 - 모든 옵션을 Controls에서 조정 가능한 플레이그라운드
export const Default: Story = {
  argTypes: {
    variant: { control: 'radio', options: ['filled', 'outlined', 'subtle'], name: '스타일', table: { category: '스타일' } },
    color: { control: 'select', options: ['brandDefault', 'baseDefault', 'successDefault', 'errorDefault', 'warningDefault', 'infoDefault'], name: '색상', table: { category: '스타일' } },
    size: { control: 'select', options: ['small', 'medium', 'large'], name: '크기', table: { category: '스타일' } },
    dot: { control: 'boolean', name: '상태 점', table: { category: '구성요소 토글' } },
    label: { control: 'text', name: '텍스트', table: { category: '콘텐츠' } },
  } as any,
  args: {
    variant: 'filled',
    color: 'brandDefault',
    size: 'medium',
    dot: false,
    label: 'NEW',
  } as any,
  render: (args: any) => (
    <View style={{ alignItems: 'flex-start' }}>
      <ContentBadge
        variant={args.variant}
        color={args.color}
        size={args.size}
        dot={args.dot}
      >
        {args.label}
      </ContentBadge>
    </View>
  ),
};

// Variant 비교
export const Variants: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <View>
        <Text style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>Filled (강조)</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <ContentBadge variant="filled" color="brandDefault">NEW</ContentBadge>
          <ContentBadge variant="filled" color="successDefault">판매중</ContentBadge>
          <ContentBadge variant="filled" color="errorDefault">품절</ContentBadge>
        </View>
      </View>
      <View>
        <Text style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>Outlined (구분)</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <ContentBadge variant="outlined" color="brandDefault">Category</ContentBadge>
          <ContentBadge variant="outlined" color="baseDefault">Tag</ContentBadge>
        </View>
      </View>
      <View>
        <Text style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>Subtle (보조)</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <ContentBadge variant="subtle" color="brandDefault">Info</ContentBadge>
          <ContentBadge variant="subtle" color="successDefault">완료</ContentBadge>
        </View>
      </View>
    </View>
  ),
};

// Size 비교
export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
        <View style={{ width: 60 }}>
          <Text style={{ fontSize: 11, color: '#64748b' }}>Small</Text>
          <Text style={{ fontSize: 10, color: '#94a3b8' }}>18px</Text>
        </View>
        <ContentBadge variant="filled" color="brandDefault" size="small">NEW</ContentBadge>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
        <View style={{ width: 60 }}>
          <Text style={{ fontSize: 11, color: '#64748b' }}>Medium</Text>
          <Text style={{ fontSize: 10, color: '#94a3b8' }}>22px</Text>
        </View>
        <ContentBadge variant="filled" color="brandDefault" size="medium">NEW</ContentBadge>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
        <View style={{ width: 60 }}>
          <Text style={{ fontSize: 11, color: '#64748b' }}>Large</Text>
          <Text style={{ fontSize: 10, color: '#94a3b8' }}>26px</Text>
        </View>
        <ContentBadge variant="filled" color="brandDefault" size="large">NEW</ContentBadge>
      </View>
    </View>
  ),
};

// Color 비교
export const Colors: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View>
        <Text style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>Filled Variant</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          <ContentBadge variant="filled" color="brandDefault">Brand</ContentBadge>
          <ContentBadge variant="filled" color="baseDefault">Base</ContentBadge>
          <ContentBadge variant="filled" color="successDefault">Success</ContentBadge>
          <ContentBadge variant="filled" color="errorDefault">Error</ContentBadge>
          <ContentBadge variant="filled" color="warningDefault">Warning</ContentBadge>
          <ContentBadge variant="filled" color="infoDefault">Info</ContentBadge>
        </View>
      </View>
      <View>
        <Text style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>Outlined Variant</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          <ContentBadge variant="outlined" color="brandDefault">Brand</ContentBadge>
          <ContentBadge variant="outlined" color="baseDefault">Base</ContentBadge>
          <ContentBadge variant="outlined" color="successDefault">Success</ContentBadge>
          <ContentBadge variant="outlined" color="errorDefault">Error</ContentBadge>
          <ContentBadge variant="outlined" color="warningDefault">Warning</ContentBadge>
          <ContentBadge variant="outlined" color="infoDefault">Info</ContentBadge>
        </View>
      </View>
      <View>
        <Text style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>Subtle Variant</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          <ContentBadge variant="subtle" color="brandDefault">Brand</ContentBadge>
          <ContentBadge variant="subtle" color="baseDefault">Base</ContentBadge>
          <ContentBadge variant="subtle" color="successDefault">Success</ContentBadge>
          <ContentBadge variant="subtle" color="errorDefault">Error</ContentBadge>
          <ContentBadge variant="subtle" color="warningDefault">Warning</ContentBadge>
          <ContentBadge variant="subtle" color="infoDefault">Info</ContentBadge>
        </View>
      </View>
    </View>
  ),
};

// Dot 상태 표시
export const WithDot: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View>
        <Text style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>실시간 상태 표시</Text>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <ContentBadge variant="filled" color="successDefault" dot>온라인</ContentBadge>
          <ContentBadge variant="filled" color="errorDefault" dot>오프라인</ContentBadge>
          <ContentBadge variant="filled" color="warningDefault" dot>자리비움</ContentBadge>
        </View>
      </View>
      <View>
        <Text style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>진행 상태</Text>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <ContentBadge variant="filled" color="brandDefault" dot>진행중</ContentBadge>
          <ContentBadge variant="filled" color="successDefault" dot>완료</ContentBadge>
          <ContentBadge variant="filled" color="baseDefault" dot>대기중</ContentBadge>
        </View>
      </View>
    </View>
  ),
};

// 실제 사용 예시
export const UsageExample: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      {/* 상품 카드 */}
      <View>
        <Text style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>상품 카드 예시</Text>
        <View style={{
          backgroundColor: 'white',
          borderRadius: 12,
          padding: 16,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
        }}>
          <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}>
            <ContentBadge variant="filled" color="brandDefault" size="small">NEW</ContentBadge>
            <ContentBadge variant="filled" color="errorDefault" size="small">HOT</ContentBadge>
          </View>
          <View style={{
            width: '100%',
            height: 120,
            backgroundColor: '#f1f5f9',
            borderRadius: 8,
            marginBottom: 12,
          }} />
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#334155' }}>상품 이름</Text>
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#334155', marginTop: 4 }}>59,000원</Text>
        </View>
      </View>

      {/* 거래 상태 */}
      <View>
        <Text style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>거래 상태</Text>
        <View style={{ gap: 8 }}>
          <View style={{
            backgroundColor: 'white',
            borderRadius: 8,
            padding: 12,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderWidth: 1,
            borderColor: '#e2e8f0',
          }}>
            <Text style={{ fontSize: 14, color: '#334155' }}>거래 #TX-12345</Text>
            <ContentBadge variant="subtle" color="brandDefault" size="small">처리중</ContentBadge>
          </View>
          <View style={{
            backgroundColor: 'white',
            borderRadius: 8,
            padding: 12,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderWidth: 1,
            borderColor: '#e2e8f0',
          }}>
            <Text style={{ fontSize: 14, color: '#334155' }}>거래 #TX-12344</Text>
            <ContentBadge variant="subtle" color="successDefault" size="small">완료</ContentBadge>
          </View>
          <View style={{
            backgroundColor: 'white',
            borderRadius: 8,
            padding: 12,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderWidth: 1,
            borderColor: '#e2e8f0',
          }}>
            <Text style={{ fontSize: 14, color: '#334155' }}>거래 #TX-12343</Text>
            <ContentBadge variant="subtle" color="errorDefault" size="small">취소됨</ContentBadge>
          </View>
        </View>
      </View>

      {/* 카테고리 라벨 */}
      <View>
        <Text style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>카테고리 라벨</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          <ContentBadge variant="outlined" color="baseDefault">전자제품</ContentBadge>
          <ContentBadge variant="outlined" color="baseDefault">생활용품</ContentBadge>
          <ContentBadge variant="outlined" color="baseDefault">패션</ContentBadge>
          <ContentBadge variant="outlined" color="baseDefault">식품</ContentBadge>
        </View>
      </View>

      {/* 사용자 상태 */}
      <View>
        <Text style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>사용자 상태</Text>
        <View style={{
          backgroundColor: 'white',
          borderRadius: 12,
          padding: 16,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          borderWidth: 1,
          borderColor: '#e2e8f0',
        }}>
          <View style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: '#e2e8f0',
          }} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#334155' }}>홍길동</Text>
            <Text style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>Product Designer</Text>
          </View>
          <ContentBadge variant="filled" color="successDefault" size="small" dot>온라인</ContentBadge>
        </View>
      </View>
    </View>
  ),
};

// ContentBadge vs Chip 비교
export const ComparisonWithChip: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <View style={{
        backgroundColor: '#fef3c7',
        borderRadius: 8,
        padding: 12,
      }}>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#92400e', marginBottom: 4 }}>
          ContentBadge vs Chip
        </Text>
        <Text style={{ fontSize: 11, color: '#92400e', lineHeight: 16 }}>
          ContentBadge는 정보 표시 전용 (클릭 불가){'\n'}
          Chip은 인터랙티브 요소 (선택, 삭제 가능)
        </Text>
      </View>

      <View>
        <Text style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>ContentBadge (정보 표시)</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <ContentBadge variant="filled" color="brandDefault">NEW</ContentBadge>
          <ContentBadge variant="filled" color="successDefault">판매중</ContentBadge>
          <ContentBadge variant="filled" color="errorDefault">품절</ContentBadge>
        </View>
        <Text style={{ fontSize: 10, color: '#94a3b8', marginTop: 4 }}>
          직사각형 형태, 클릭 불가, borderRadius: 4px
        </Text>
      </View>

      <View style={{
        padding: 12,
        backgroundColor: '#f1f5f9',
        borderRadius: 8,
      }}>
        <Text style={{ fontSize: 11, color: '#64748b', textAlign: 'center' }}>
          Chip 컴포넌트는 @baerae-zkap/Chip 스토리에서 확인하세요
        </Text>
      </View>
    </View>
  ),
};
