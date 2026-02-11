import { ListCard } from '@baerae-zkap/design-system/native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View, Text } from 'react-native';

// Simple colored circle icon
function ProductIcon({ size = 48, color = '#6366f1', emoji = '📦' }: { size?: number; color?: string; emoji?: string }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 4,
        backgroundColor: color + '15',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ fontSize: size * 0.4 }}>{emoji}</Text>
    </View>
  );
}

/**
 * ListCard 컴포넌트
 *
 * 리스트 형태의 카드 컴포넌트
 * - **thumbnail**: 좌측 이미지/아이콘
 * - **badges**: 상단 뱃지 영역
 * - **title**: 메인 타이틀
 * - **subtitle**: 서브타이틀
 * - **meta**: 추가 정보 (가격, 평점 등)
 * - **action**: 우측 액션 영역
 * - **bottomContent**: 하단 추가 콘텐츠
 * - **divider**: 구분선
 */
const meta = {
  title: '@baerae-zkap/Contents/List card',
  component: ListCard,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'radio', options: ['elevated', 'outlined', 'filled'], name: '스타일', table: { category: '레이아웃' } },
    size: { control: 'select', options: ['small', 'medium', 'large'], name: '크기', table: { category: '레이아웃' } },
    disabled: { control: 'boolean', name: '비활성화', table: { category: '상태' } },
    // Hide auto-generated controls
    thumbnail: { table: { disable: true } },
    title: { table: { disable: true } },
    subtitle: { table: { disable: true } },
    meta: { table: { disable: true } },
    action: { table: { disable: true } },
    badges: { table: { disable: true } },
    bottomContent: { table: { disable: true } },
    divider: { table: { disable: true } },
    onPress: { table: { disable: true } },
    style: { table: { disable: true } },
    testID: { table: { disable: true } },
    accessibilityLabel: { table: { disable: true } },
  },
  args: {
    variant: 'filled',
    size: 'medium',
    disabled: false,
  },
  decorators: [
    (Story) => (
      <View style={{ width: 375, padding: 20, backgroundColor: '#f8fafc' }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof ListCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Default - Full Playground with Toggles
export const Default: Story = {
  argTypes: {
    variant: { control: 'radio', options: ['elevated', 'outlined', 'filled'], name: '스타일', table: { category: '레이아웃' } },
    size: { control: 'select', options: ['small', 'medium', 'large'], name: '크기', table: { category: '레이아웃' } },
    disabled: { control: 'boolean', name: '비활성화', table: { category: '상태' } },
    // Custom toggles
    showThumbnail: { control: 'boolean', name: '썸네일', table: { category: '구성요소 토글' } },
    showBadges: { control: 'boolean', name: '뱃지', table: { category: '구성요소 토글' } },
    showSubtitle: { control: 'boolean', name: '서브타이틀', table: { category: '구성요소 토글' } },
    showMeta: { control: 'boolean', name: '메타 정보', table: { category: '구성요소 토글' } },
    showAction: { control: 'boolean', name: '액션 영역', table: { category: '구성요소 토글' } },
    showBottomContent: { control: 'boolean', name: '하단 콘텐츠', table: { category: '구성요소 토글' } },
    showDivider: { control: 'boolean', name: '구분선', table: { category: '구성요소 토글' } },
    isClickable: { control: 'boolean', name: '클릭 가능', table: { category: '인터랙션' } },
    // Hide auto-generated controls
    thumbnail: { table: { disable: true } },
    title: { table: { disable: true } },
    subtitle: { table: { disable: true } },
    meta: { table: { disable: true } },
    action: { table: { disable: true } },
    badges: { table: { disable: true } },
    bottomContent: { table: { disable: true } },
    divider: { table: { disable: true } },
    onPress: { table: { disable: true } },
    style: { table: { disable: true } },
    testID: { table: { disable: true } },
    accessibilityLabel: { table: { disable: true } },
  } as any,
  args: {
    variant: 'filled',
    size: 'medium',
    disabled: false,
    showThumbnail: true,
    showBadges: true,
    showSubtitle: true,
    showMeta: true,
    showAction: false,
    showBottomContent: false,
    showDivider: false,
    isClickable: true,
  } as any,
  render: (args: any) => {
    const thumbnailSize = args.size === 'small' ? 40 : args.size === 'large' ? 56 : 48;
    return (
      <ListCard
        variant={args.variant}
        size={args.size}
        disabled={args.disabled}
        thumbnail={args.showThumbnail ? <ProductIcon size={thumbnailSize} color="#6366f1" emoji="👟" /> : undefined}
        badges={args.showBadges ? (
          <View style={{ flexDirection: 'row', gap: 4 }}>
            <View style={{ paddingHorizontal: 6, paddingVertical: 2, backgroundColor: '#eff6ff', borderRadius: 4 }}>
              <Text style={{ fontSize: 11, fontWeight: '600', color: '#2563eb' }}>NEW</Text>
            </View>
          </View>
        ) : undefined}
        title="나이키 에어맥스 97"
        subtitle={args.showSubtitle ? "Silver Bullet · 270mm" : undefined}
        meta={args.showMeta ? <Text style={{ fontSize: 15, fontWeight: '700', color: '#334155' }}>₩189,000</Text> : undefined}
        action={args.showAction ? (
          <Text style={{ fontSize: 13, color: '#6366f1', fontWeight: '600' }}>구매</Text>
        ) : undefined}
        bottomContent={args.showBottomContent ? (
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Text style={{ fontSize: 12, color: '#94a3b8' }}>거래량 128건</Text>
            <Text style={{ fontSize: 12, color: '#94a3b8' }}>·</Text>
            <Text style={{ fontSize: 12, color: '#94a3b8' }}>수수료 무료</Text>
          </View>
        ) : undefined}
        divider={args.showDivider}
        onPress={args.isClickable ? () => {} : undefined}
        key={`${args.showThumbnail}-${args.showBadges}-${args.showSubtitle}-${args.showMeta}-${args.showAction}-${args.showBottomContent}-${args.showDivider}`}
      />
    );
  },
};

/** 자산 리스트 */
export const ProductList: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      <ListCard
        variant="elevated"
        thumbnail={<ProductIcon size={48} color="#6366f1" emoji="👟" />}
        badges={
          <View style={{ paddingHorizontal: 6, paddingVertical: 2, backgroundColor: '#eff6ff', borderRadius: 4 }}>
            <Text style={{ fontSize: 11, fontWeight: '600', color: '#2563eb' }}>NEW</Text>
          </View>
        }
        title="나이키 에어맥스 97"
        subtitle="Silver Bullet · 270mm"
        meta={<Text style={{ fontSize: 15, fontWeight: '700', color: '#334155' }}>₩189,000</Text>}
        onPress={() => {}}
      />
      <ListCard
        variant="elevated"
        thumbnail={<ProductIcon size={48} color="#22c55e" emoji="👕" />}
        badges={
          <View style={{ paddingHorizontal: 6, paddingVertical: 2, backgroundColor: '#f0fdf4', borderRadius: 4 }}>
            <Text style={{ fontSize: 11, fontWeight: '600', color: '#16a34a' }}>SALE</Text>
          </View>
        }
        title="아디다스 울트라부스트"
        subtitle="Triple Black · 275mm"
        meta={<Text style={{ fontSize: 15, fontWeight: '700', color: '#334155' }}>₩219,000</Text>}
        onPress={() => {}}
      />
      <ListCard
        variant="elevated"
        thumbnail={<ProductIcon size={48} color="#f59e0b" emoji="🎽" />}
        badges={
          <View style={{ paddingHorizontal: 6, paddingVertical: 2, backgroundColor: '#fef3c7', borderRadius: 4 }}>
            <Text style={{ fontSize: 11, fontWeight: '600', color: '#d97706' }}>인기</Text>
          </View>
        }
        title="뉴발란스 993"
        subtitle="Grey · 280mm"
        meta={<Text style={{ fontSize: 15, fontWeight: '700', color: '#334155' }}>₩259,000</Text>}
        onPress={() => {}}
      />
    </View>
  ),
};

/** Variants 비교 */
export const Variants: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <View>
        <Text style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>Elevated - 그림자로 떠있는 느낌</Text>
        <ListCard
          variant="elevated"
          thumbnail={<ProductIcon size={48} color="#6366f1" emoji="👟" />}
          title="나이키 에어맥스 97"
          subtitle="Silver Bullet · 270mm"
          meta={<Text style={{ fontSize: 15, fontWeight: '700', color: '#334155' }}>₩189,000</Text>}
          onPress={() => {}}
        />
      </View>
      <View>
        <Text style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>Outlined - 테두리로 영역 구분</Text>
        <ListCard
          variant="outlined"
          thumbnail={<ProductIcon size={48} color="#22c55e" emoji="👕" />}
          title="아디다스 울트라부스트"
          subtitle="Triple Black · 275mm"
          meta={<Text style={{ fontSize: 15, fontWeight: '700', color: '#334155' }}>₩219,000</Text>}
          onPress={() => {}}
        />
      </View>
      <View>
        <Text style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>Filled - 배경색으로 영역 표시</Text>
        <ListCard
          variant="filled"
          thumbnail={<ProductIcon size={48} color="#f59e0b" emoji="🎽" />}
          title="뉴발란스 993"
          subtitle="Grey · 280mm"
          meta={<Text style={{ fontSize: 15, fontWeight: '700', color: '#334155' }}>₩259,000</Text>}
          onPress={() => {}}
        />
      </View>
    </View>
  ),
};

/** Sizes 비교 */
export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <View>
        <Text style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>Small (thumbnail: 40px)</Text>
        <ListCard
          variant="elevated"
          size="small"
          thumbnail={<ProductIcon size={40} color="#6366f1" emoji="👟" />}
          title="나이키 에어맥스 97"
          subtitle="Silver Bullet · 270mm"
          meta={<Text style={{ fontSize: 14, fontWeight: '700', color: '#334155' }}>₩189,000</Text>}
          onPress={() => {}}
        />
      </View>
      <View>
        <Text style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>Medium (thumbnail: 48px) - Default</Text>
        <ListCard
          variant="elevated"
          size="medium"
          thumbnail={<ProductIcon size={48} color="#6366f1" emoji="👟" />}
          title="나이키 에어맥스 97"
          subtitle="Silver Bullet · 270mm"
          meta={<Text style={{ fontSize: 15, fontWeight: '700', color: '#334155' }}>₩189,000</Text>}
          onPress={() => {}}
        />
      </View>
      <View>
        <Text style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>Large (thumbnail: 56px)</Text>
        <ListCard
          variant="elevated"
          size="large"
          thumbnail={<ProductIcon size={56} color="#6366f1" emoji="👟" />}
          title="나이키 에어맥스 97"
          subtitle="Silver Bullet · 270mm"
          meta={<Text style={{ fontSize: 16, fontWeight: '700', color: '#334155' }}>₩189,000</Text>}
          onPress={() => {}}
        />
      </View>
    </View>
  ),
};

/** Disabled 상태 */
export const DisabledState: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <ListCard
        variant="elevated"
        thumbnail={<ProductIcon size={48} color="#6366f1" emoji="👟" />}
        title="나이키 에어맥스 97"
        subtitle="품절"
        onPress={() => {}}
        disabled
      />
      <ListCard
        variant="elevated"
        thumbnail={<ProductIcon size={48} color="#22c55e" emoji="👕" />}
        title="아디다스 울트라부스트"
        subtitle="Triple Black · 275mm"
        meta={<Text style={{ fontSize: 15, fontWeight: '700', color: '#334155' }}>₩219,000</Text>}
        onPress={() => {}}
      />
    </View>
  ),
};

/** Badge 없는 심플 리스트 */
export const SimpleList: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      <ListCard
        variant="outlined"
        thumbnail={<ProductIcon size={48} color="#6366f1" emoji="👟" />}
        title="나이키 에어맥스 97"
        subtitle="Silver Bullet · 270mm"
        meta={<Text style={{ fontSize: 15, fontWeight: '700', color: '#334155' }}>₩189,000</Text>}
        onPress={() => {}}
      />
      <ListCard
        variant="outlined"
        thumbnail={<ProductIcon size={48} color="#22c55e" emoji="👕" />}
        title="아디다스 울트라부스트"
        subtitle="Triple Black · 275mm"
        meta={<Text style={{ fontSize: 15, fontWeight: '700', color: '#334155' }}>₩219,000</Text>}
        onPress={() => {}}
      />
      <ListCard
        variant="outlined"
        thumbnail={<ProductIcon size={48} color="#f59e0b" emoji="🎽" />}
        title="뉴발란스 993"
        subtitle="Grey · 280mm"
        meta={<Text style={{ fontSize: 15, fontWeight: '700', color: '#334155' }}>₩259,000</Text>}
        onPress={() => {}}
      />
    </View>
  ),
};

/** 구분선이 있는 리스트 */
export const WithDivider: Story = {
  render: () => (
    <View>
      <ListCard
        variant="filled"
        thumbnail={<ProductIcon size={48} color="#6366f1" emoji="👟" />}
        title="나이키 에어맥스 97"
        subtitle="Silver Bullet · 270mm"
        meta={<Text style={{ fontSize: 15, fontWeight: '700', color: '#334155' }}>₩189,000</Text>}
        divider
        onPress={() => {}}
      />
      <ListCard
        variant="filled"
        thumbnail={<ProductIcon size={48} color="#22c55e" emoji="👕" />}
        title="아디다스 울트라부스트"
        subtitle="Triple Black · 275mm"
        meta={<Text style={{ fontSize: 15, fontWeight: '700', color: '#334155' }}>₩219,000</Text>}
        divider
        onPress={() => {}}
      />
      <ListCard
        variant="filled"
        thumbnail={<ProductIcon size={48} color="#f59e0b" emoji="🎽" />}
        title="뉴발란스 993"
        subtitle="Grey · 280mm"
        meta={<Text style={{ fontSize: 15, fontWeight: '700', color: '#334155' }}>₩259,000</Text>}
        onPress={() => {}}
      />
    </View>
  ),
};

/** 하단 콘텐츠 포함 */
export const WithBottomContent: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      <ListCard
        variant="elevated"
        thumbnail={<ProductIcon size={48} color="#6366f1" emoji="👟" />}
        title="나이키 에어맥스 97"
        subtitle="Silver Bullet · 270mm"
        meta={<Text style={{ fontSize: 15, fontWeight: '700', color: '#334155' }}>₩189,000</Text>}
        bottomContent={
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Text style={{ fontSize: 12, color: '#94a3b8' }}>수수료 무료</Text>
            <Text style={{ fontSize: 12, color: '#94a3b8' }}>·</Text>
            <Text style={{ fontSize: 12, color: '#94a3b8' }}>거래량 128건</Text>
          </View>
        }
        onPress={() => {}}
      />
      <ListCard
        variant="elevated"
        thumbnail={<ProductIcon size={48} color="#22c55e" emoji="👕" />}
        title="아디다스 울트라부스트"
        subtitle="Triple Black · 275mm"
        meta={<Text style={{ fontSize: 15, fontWeight: '700', color: '#334155' }}>₩219,000</Text>}
        bottomContent={
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Text style={{ fontSize: 12, color: '#94a3b8' }}>수수료 무료</Text>
            <Text style={{ fontSize: 12, color: '#94a3b8' }}>·</Text>
            <Text style={{ fontSize: 12, color: '#94a3b8' }}>보유자 89명</Text>
          </View>
        }
        onPress={() => {}}
      />
    </View>
  ),
};

/** 액션 영역 포함 */
export const WithAction: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      <ListCard
        variant="elevated"
        thumbnail={<ProductIcon size={48} color="#6366f1" emoji="👟" />}
        title="나이키 에어맥스 97"
        subtitle="Silver Bullet · 270mm"
        meta={<Text style={{ fontSize: 15, fontWeight: '700', color: '#334155' }}>₩189,000</Text>}
        action={
          <Text style={{ fontSize: 13, color: '#6366f1', fontWeight: '600' }}>구매</Text>
        }
        onPress={() => {}}
      />
      <ListCard
        variant="elevated"
        thumbnail={<ProductIcon size={48} color="#22c55e" emoji="👕" />}
        title="아디다스 울트라부스트"
        subtitle="Triple Black · 275mm"
        meta={<Text style={{ fontSize: 15, fontWeight: '700', color: '#334155' }}>₩219,000</Text>}
        action={
          <Text style={{ fontSize: 13, color: '#6366f1', fontWeight: '600' }}>장바구니</Text>
        }
        onPress={() => {}}
      />
    </View>
  ),
};

/** 실제 사용 예시 - 거래 내역 */
export const UsageExample: Story = {
  render: () => (
    <View style={{ width: 375 }}>
      <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: '700', color: '#191f28', marginBottom: 8 }}>
          최근 거래 내역
        </Text>
        <Text style={{ fontSize: 14, color: '#6b7684' }}>
          지난 30일간의 거래 내역입니다
        </Text>
      </View>
      <View style={{ gap: 8, paddingHorizontal: 20 }}>
        <ListCard
          variant="elevated"
          thumbnail={<ProductIcon size={48} color="#6366f1" emoji="👟" />}
          badges={
            <View style={{ paddingHorizontal: 6, paddingVertical: 2, backgroundColor: '#eff6ff', borderRadius: 4 }}>
              <Text style={{ fontSize: 11, fontWeight: '600', color: '#2563eb' }}>처리중</Text>
            </View>
          }
          title="나이키 에어맥스 97"
          subtitle="Silver Bullet · 270mm"
          meta={<Text style={{ fontSize: 15, fontWeight: '700', color: '#334155' }}>₩189,000</Text>}
          bottomContent={
            <Text style={{ fontSize: 12, color: '#94a3b8' }}>거래일: 2025-02-05</Text>
          }
          onPress={() => {}}
        />
        <ListCard
          variant="elevated"
          thumbnail={<ProductIcon size={48} color="#22c55e" emoji="👕" />}
          badges={
            <View style={{ paddingHorizontal: 6, paddingVertical: 2, backgroundColor: '#f0fdf4', borderRadius: 4 }}>
              <Text style={{ fontSize: 11, fontWeight: '600', color: '#16a34a' }}>완료</Text>
            </View>
          }
          title="아디다스 울트라부스트"
          subtitle="Triple Black · 275mm"
          meta={<Text style={{ fontSize: 15, fontWeight: '700', color: '#334155' }}>₩219,000</Text>}
          bottomContent={
            <Text style={{ fontSize: 12, color: '#94a3b8' }}>거래일: 2025-01-28</Text>
          }
          onPress={() => {}}
        />
        <ListCard
          variant="elevated"
          thumbnail={<ProductIcon size={48} color="#f59e0b" emoji="🎽" />}
          badges={
            <View style={{ paddingHorizontal: 6, paddingVertical: 2, backgroundColor: '#f0fdf4', borderRadius: 4 }}>
              <Text style={{ fontSize: 11, fontWeight: '600', color: '#16a34a' }}>완료</Text>
            </View>
          }
          title="뉴발란스 993"
          subtitle="Grey · 280mm"
          meta={<Text style={{ fontSize: 15, fontWeight: '700', color: '#334155' }}>₩259,000</Text>}
          bottomContent={
            <Text style={{ fontSize: 12, color: '#94a3b8' }}>거래일: 2025-01-20</Text>
          }
          onPress={() => {}}
        />
      </View>
    </View>
  ),
};
