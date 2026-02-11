import { SectionHeader } from '@baerae-zkap/design-system/native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View, Text, Pressable } from 'react-native';
import { fn } from 'storybook/test';

// Helper Components
function ListItem({ title, value }: { title: string; value?: string }) {
  return (
    <View style={{
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
      paddingHorizontal: 20, paddingVertical: 14,
      borderBottomWidth: 1, borderBottomColor: '#f1f5f9',
    }}>
      <Text style={{ fontSize: 15, fontWeight: '500', color: '#334155' }}>{title}</Text>
      {value && <Text style={{ fontSize: 14, color: '#64748b' }}>{value}</Text>}
    </View>
  );
}

function TextAction({ children, onPress }: { children: string; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <Text style={{
          fontSize: 14,
          fontWeight: '500',
          color: pressed ? '#1e40af' : '#2563eb',
        }}>
          {children}
        </Text>
      )}
    </Pressable>
  );
}

function FilterChip({ label, active }: { label: string; active?: boolean }) {
  return (
    <View style={{
      paddingHorizontal: 12, paddingVertical: 4, borderRadius: 16,
      backgroundColor: active ? '#2563eb' : '#f1f5f9',
    }}>
      <Text style={{ fontSize: 12, fontWeight: '500', color: active ? 'white' : '#64748b' }}>{label}</Text>
    </View>
  );
}

/**
 * SectionHeader 컴포넌트
 *
 * 리스트 섹션 상단에 사용되는 헤더 컴포넌트
 * - **title**: 섹션 타이틀 (bold, 다크 컬러, NOT uppercase)
 * - **headingContent**: 타이틀 옆 슬롯 (FilterButton, Chip 등)
 * - **action**: 우측 트레일링 컨텐츠 (TextButton 등)
 * - **size**: small(17px), medium(20px), large(24px)
 * - **description**: 부가 설명
 * - **descriptionPosition**: top | bottom
 * - **rightText + showArrow**: 화살표 포함 링크
 */
const meta = {
  title: '@baerae-zkap/Contents/Section header',
  component: SectionHeader,
  parameters: { layout: 'centered' },
  argTypes: {
    // 레이아웃
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '타이틀 크기',
      table: { category: '레이아웃' },
    },

    // 구성요소 토글
    showHeadingContent: {
      control: 'boolean',
      description: 'headingContent 슬롯 표시 (FilterChip)',
      table: { category: '구성요소 토글' },
    },
    showTrailing: {
      control: 'boolean',
      description: 'trailing action 표시 (TextButton)',
      table: { category: '구성요소 토글' },
    },
    showDescription: {
      control: 'boolean',
      description: 'description 표시',
      table: { category: '구성요소 토글' },
    },
    showArrow: {
      control: 'boolean',
      description: 'rightText 화살표 표시',
      table: { category: '구성요소 토글' },
    },

    // 콘텐츠
    title: {
      control: 'text',
      description: '섹션 타이틀',
      table: { category: '콘텐츠' },
    },
    titleWeight: {
      control: 'select',
      options: ['regular', 'medium', 'bold'],
      description: '타이틀 굵기',
      table: { category: '콘텐츠' },
    },
    descriptionPosition: {
      control: 'select',
      options: ['top', 'bottom'],
      description: 'description 위치',
      table: { category: '콘텐츠' },
    },

    // 숨김
    headingContent: { table: { disable: true } },
    action: { table: { disable: true } },
    style: { table: { disable: true } },
    rightText: { table: { disable: true } },
    onRightPress: { table: { disable: true } },
    description: { table: { disable: true } },
  },
  args: {
    title: '보유 자산',
    size: 'medium',
    titleWeight: 'bold',
    showHeadingContent: false,
    showTrailing: true,
    showDescription: false,
    showArrow: false,
    descriptionPosition: 'bottom',
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 20, backgroundColor: '#f8fafc' }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 기본 플레이그라운드 - 모든 옵션 조정 가능 */
export const Default: Story = {
  render: (args) => {
    const { showHeadingContent, showTrailing, showDescription, ...rest } = args as any;
    return (
      <View style={{ backgroundColor: 'white', borderRadius: 12, overflow: 'hidden', width: 375 }}>
        <SectionHeader
          {...rest}
          headingContent={showHeadingContent ? <FilterChip label="CEX" active /> : undefined}
          action={showTrailing ? <TextAction onPress={fn()}>전체보기</TextAction> : undefined}
          description={showDescription ? "연동된 거래소의 보유 자산 현황입니다" : undefined}
        />
        <ListItem title="비트코인 (BTC)" value="0.5284 BTC" />
        <ListItem title="이더리움 (ETH)" value="3.2100 ETH" />
        <ListItem title="솔라나 (SOL)" value="45.00 SOL" />
      </View>
    );
  },
};

/** 타이틀 크기 비교 - Small(17px), Medium(20px), Large(24px) */
export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View>
        <Text style={{ fontSize: 12, color: '#64748b', marginBottom: 8, paddingHorizontal: 4 }}>Small (17px)</Text>
        <View style={{ backgroundColor: 'white', borderRadius: 12, overflow: 'hidden', width: 375 }}>
          <SectionHeader size="small" title="최근 거래" />
          <ListItem title="BTC 매수" value="+0.01 BTC" />
          <ListItem title="ETH 매도" value="-1.5 ETH" />
        </View>
      </View>

      <View>
        <Text style={{ fontSize: 12, color: '#64748b', marginBottom: 8, paddingHorizontal: 4 }}>Medium (20px) - Default</Text>
        <View style={{ backgroundColor: 'white', borderRadius: 12, overflow: 'hidden', width: 375 }}>
          <SectionHeader size="medium" title="포트폴리오" />
          <ListItem title="비트코인" value="62.4%" />
          <ListItem title="이더리움" value="24.8%" />
        </View>
      </View>

      <View>
        <Text style={{ fontSize: 12, color: '#64748b', marginBottom: 8, paddingHorizontal: 4 }}>Large (24px)</Text>
        <View style={{ backgroundColor: 'white', borderRadius: 12, overflow: 'hidden', width: 375 }}>
          <SectionHeader size="large" title="자산 요약" />
          <ListItem title="총 평가금액" value="₩48,320,000" />
          <ListItem title="총 수익률" value="+12.5%" />
        </View>
      </View>
    </View>
  ),
};

/** Trailing TextButton 포함 */
export const WithTrailingTextButton: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View style={{ backgroundColor: 'white', borderRadius: 12, overflow: 'hidden', width: 375 }}>
        <SectionHeader
          title="보유 코인"
          action={<TextAction onPress={fn()}>전체보기</TextAction>}
        />
        <ListItem title="비트코인 (BTC)" value="₩28,500,000" />
        <ListItem title="이더리움 (ETH)" value="₩12,400,000" />
      </View>

      <View style={{ backgroundColor: 'white', borderRadius: 12, overflow: 'hidden', width: 375 }}>
        <SectionHeader
          title="연동 계좌"
          action={<TextAction onPress={fn()}>계좌 추가</TextAction>}
        />
        <ListItem title="업비트" value="₩5,200,000" />
        <ListItem title="빗썸" value="₩3,100,000" />
      </View>
    </View>
  ),
};

/** HeadingContent 슬롯 - 타이틀 옆 FilterChip */
export const WithHeadingContent: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View style={{ backgroundColor: 'white', borderRadius: 12, overflow: 'hidden', width: 375 }}>
        <SectionHeader
          title="토큰 목록"
          headingContent={<FilterChip label="ERC-20" active />}
          action={<TextAction onPress={fn()}>전체보기</TextAction>}
        />
        <ListItem title="USDT (Tether)" value="1,500 USDT" />
        <ListItem title="LINK (Chainlink)" value="120 LINK" />
      </View>

      <View style={{ backgroundColor: 'white', borderRadius: 12, overflow: 'hidden', width: 375 }}>
        <SectionHeader
          title="체인별 자산"
          headingContent={<FilterChip label="Ethereum" active />}
        />
        <ListItem title="ETH" value="3.21 ETH" />
        <ListItem title="USDC" value="2,000 USDC" />
      </View>
    </View>
  ),
};

/** RightText + 화살표 링크 */
export const WithRightArrow: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View style={{ backgroundColor: 'white', borderRadius: 12, overflow: 'hidden', width: 375 }}>
        <SectionHeader
          title="내 지갑"
          rightText="관리"
          onRightPress={fn()}
          showArrow={true}
        />
        <ListItem title="메인 지갑" value="0x1a2b...3c4d" />
        <ListItem title="DeFi 지갑" value="0x5e6f...7g8h" />
      </View>

      <View style={{ backgroundColor: 'white', borderRadius: 12, overflow: 'hidden', width: 375 }}>
        <SectionHeader
          title="거래 내역"
          rightText="전체보기"
          onRightPress={fn()}
          showArrow={true}
        />
        <ListItem title="입금" value="12건" />
        <ListItem title="출금" value="5건" />
      </View>
    </View>
  ),
};

/** Description 위치 - Top / Bottom */
export const WithDescription: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View>
        <Text style={{ fontSize: 12, color: '#64748b', marginBottom: 8, paddingHorizontal: 4 }}>Description Top</Text>
        <View style={{ backgroundColor: 'white', borderRadius: 12, overflow: 'hidden', width: 375 }}>
          <SectionHeader
            title="수익 분석"
            description="최근 30일 기준 수익률입니다"
            descriptionPosition="top"
          />
          <ListItem title="실현 수익" value="+₩1,240,000" />
          <ListItem title="미실현 수익" value="+₩580,000" />
        </View>
      </View>

      <View>
        <Text style={{ fontSize: 12, color: '#64748b', marginBottom: 8, paddingHorizontal: 4 }}>Description Bottom (default)</Text>
        <View style={{ backgroundColor: 'white', borderRadius: 12, overflow: 'hidden', width: 375 }}>
          <SectionHeader
            title="가격 알림"
            description="설정한 목표가에 도달하면 알려드립니다"
            descriptionPosition="bottom"
          />
          <ListItem title="BTC ≥ ₩60,000,000" value="활성" />
          <ListItem title="ETH ≤ ₩3,000,000" value="활성" />
        </View>
      </View>
    </View>
  ),
};

/** 타이틀 굵기 비교 */
export const TitleWeights: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View style={{ backgroundColor: 'white', borderRadius: 12, overflow: 'hidden', width: 375 }}>
        <SectionHeader title="Regular Weight" titleWeight="regular" />
        <ListItem title="일반 굵기 타이틀" />
      </View>

      <View style={{ backgroundColor: 'white', borderRadius: 12, overflow: 'hidden', width: 375 }}>
        <SectionHeader title="Medium Weight" titleWeight="medium" />
        <ListItem title="중간 굵기 타이틀" />
      </View>

      <View style={{ backgroundColor: 'white', borderRadius: 12, overflow: 'hidden', width: 375 }}>
        <SectionHeader title="Bold Weight (Default)" titleWeight="bold" />
        <ListItem title="굵은 타이틀 (기본값)" />
      </View>
    </View>
  ),
};

/** 설정 페이지 섹션 */
export const SettingsSection: Story = {
  render: () => (
    <View style={{ gap: 20 }}>
      <View style={{ backgroundColor: 'white', borderRadius: 12, overflow: 'hidden', width: 375 }}>
        <SectionHeader title="거래소 연동" />
        <ListItem title="업비트" value="연동됨" />
        <ListItem title="빗썸" value="연동됨" />
        <ListItem title="바이낸스" value="미연동" />
      </View>

      <View style={{ backgroundColor: 'white', borderRadius: 12, overflow: 'hidden', width: 375 }}>
        <SectionHeader title="보안 설정" />
        <ListItem title="생체 인증" value="켜짐" />
        <ListItem title="거래 비밀번호" value="설정됨" />
      </View>

      <View style={{ backgroundColor: 'white', borderRadius: 12, overflow: 'hidden', width: 375 }}>
        <SectionHeader title="앱 정보" />
        <ListItem title="버전" value="2.1.0" />
        <ListItem title="이용약관" value="" />
      </View>
    </View>
  ),
};

/** 콘텐츠 피드 섹션 */
export const ContentFeed: Story = {
  render: () => (
    <View style={{ gap: 20 }}>
      <View style={{ backgroundColor: 'white', borderRadius: 12, overflow: 'hidden', width: 375 }}>
        <SectionHeader
          title="시세 현황"
          description="실시간 주요 코인 시세입니다"
          action={<TextAction onPress={fn()}>전체보기</TextAction>}
        />
        <ListItem title="비트코인 (BTC)" value="₩57,200,000" />
        <ListItem title="이더리움 (ETH)" value="₩3,850,000" />
        <ListItem title="리플 (XRP)" value="₩820" />
      </View>

      <View style={{ backgroundColor: 'white', borderRadius: 12, overflow: 'hidden', width: 375 }}>
        <SectionHeader
          title="온체인 자산"
          headingContent={<FilterChip label="Ethereum" active />}
        />
        <ListItem title="ETH" value="3.21 ETH" />
        <ListItem title="USDC" value="2,000 USDC" />
      </View>

      <View style={{ backgroundColor: 'white', borderRadius: 12, overflow: 'hidden', width: 375 }}>
        <SectionHeader
          title="은행 계좌"
          rightText="계좌 추가"
          onRightPress={fn()}
          showArrow={true}
        />
        <ListItem title="카카오뱅크" value="₩3,200,000" />
        <ListItem title="토스뱅크" value="₩1,500,000" />
      </View>
    </View>
  ),
};

/** 전체 페이지 시뮬레이션 */
export const UsageExample: Story = {
  render: () => (
    <View style={{ gap: 20 }}>
      {/* 상단: 필터 포함 섹션 */}
      <View style={{ backgroundColor: 'white', borderRadius: 12, overflow: 'hidden', width: 375 }}>
        <SectionHeader
          size="large"
          title="포트폴리오"
          headingContent={<FilterChip label="CEX" active />}
          action={<TextAction onPress={fn()}>전체보기</TextAction>}
          description="연동된 거래소 자산 현황입니다"
        />
        <ListItem title="비트코인 (BTC)" value="₩28,500,000" />
        <ListItem title="이더리움 (ETH)" value="₩12,400,000" />
        <ListItem title="솔라나 (SOL)" value="₩4,200,000" />
      </View>

      {/* 중간: 간단한 링크 섹션 */}
      <View style={{ backgroundColor: 'white', borderRadius: 12, overflow: 'hidden', width: 375 }}>
        <SectionHeader
          title="내 지갑"
          rightText="관리"
          onRightPress={fn()}
          showArrow={true}
        />
        <ListItem title="메인 지갑" value="0x1a2b...3c4d" />
        <ListItem title="DeFi 지갑" value="0x5e6f...7g8h" />
        <ListItem title="NFT 지갑" value="0x9i0j...1k2l" />
      </View>

      {/* 하단: 액션 버튼 섹션 */}
      <View style={{ backgroundColor: 'white', borderRadius: 12, overflow: 'hidden', width: 375 }}>
        <SectionHeader
          title="최근 거래"
          action={<TextAction onPress={fn()}>전체보기</TextAction>}
        />
        <ListItem title="BTC 매수" value="+0.05 BTC" />
        <ListItem title="ETH → USDT 스왑" value="1.0 ETH" />
      </View>

      {/* 설정 섹션 */}
      <View style={{ backgroundColor: 'white', borderRadius: 12, overflow: 'hidden', width: 375 }}>
        <SectionHeader title="설정" size="medium" />
        <ListItem title="가격 알림" value="" />
        <ListItem title="보안" value="" />
        <ListItem title="통화 단위" value="KRW" />
      </View>
    </View>
  ),
};
