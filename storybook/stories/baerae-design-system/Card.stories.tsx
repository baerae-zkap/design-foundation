import { Card } from '@baerae-zkap/design-system/native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View, Text, ScrollView } from 'react-native';
import { fn } from 'storybook/test';
import { Heart, Bookmark } from 'lucide-react-native';
import { useState } from 'react';

/**
 * Card 컴포넌트
 *
 * 콘텐츠에 대한 정보를 간략하게 표현하는 카드 요소입니다.
 *
 * **두 가지 모드:**
 * 1. **Container mode** (기존): variant, padding만으로 간단하게 사용
 * 2. **Content card mode** (Montage): thumbnail, heading, caption 등으로 풍부한 카드 구성
 *
 * - **variant**: elevated(그림자) / outlined(테두리) / filled(채움)
 * - **padding**: none / small / medium / large (container mode)
 * - **thumbnail**: 썸네일 이미지 (content card mode)
 * - **heading**: 메인 제목 (최대 2줄)
 * - **caption**: 설명 텍스트 (최대 1줄)
 * - **overlayCaption**: 썸네일 위 오버레이 텍스트
 * - **toggleIcon**: 북마크/좋아요 토글 아이콘
 */
const meta = {
  title: '@baerae-zkap/Contents/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: { control: 'select', options: ['elevated', 'outlined', 'filled'] },
    padding: { control: 'select', options: ['none', 'small', 'medium', 'large'] },
    disabled: { control: 'boolean' },
    // Hide all auto-generated controls from Card props
    thumbnail: { table: { disable: true } },
    thumbnailAspectRatio: { table: { disable: true } },
    overlayCaption: { table: { disable: true } },
    toggleIcon: { table: { disable: true } },
    onTogglePress: { table: { disable: true } },
    topContent: { table: { disable: true } },
    heading: { table: { disable: true } },
    headingNumberOfLines: { table: { disable: true } },
    caption: { table: { disable: true } },
    captionNumberOfLines: { table: { disable: true } },
    subCaption: { table: { disable: true } },
    extraCaption: { table: { disable: true } },
    bottomContent: { table: { disable: true } },
    width: { table: { disable: true } },
    onPress: { table: { disable: true } },
    style: { table: { disable: true } },
    children: { table: { disable: true } },
    testID: { table: { disable: true } },
    accessibilityLabel: { table: { disable: true } },
  },
  args: {
    variant: 'filled',
    padding: 'medium',
    disabled: false,
  },
  decorators: [
    (Story) => (
      <View style={{ width: 375, padding: 40, backgroundColor: '#f8fafc' }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const contentTextStyle = { fontSize: 14, color: '#6b7684', lineHeight: 21 };
const labelStyle = { fontSize: 12, color: '#8b95a1', marginBottom: 8, fontWeight: '500' as const };

// 1. Default - 모든 구성요소를 Controls에서 켜고 끌 수 있는 플레이그라운드
export const Default: Story = {
  argTypes: {
    variant: { control: 'select', options: ['elevated', 'outlined', 'filled'] },
    padding: { table: { disable: true } }, // padding is container mode only
    disabled: { control: 'boolean' },
    // Feature toggles
    showThumbnail: { control: 'boolean', name: '썸네일', table: { category: '구성요소 토글' } },
    showOverlayCaption: { control: 'boolean', name: '오버레이 캡션', table: { category: '구성요소 토글' } },
    showToggleIcon: { control: 'boolean', name: '토글 아이콘 (북마크)', table: { category: '구성요소 토글' } },
    showHeading: { control: 'boolean', name: '제목', table: { category: '구성요소 토글' } },
    showCaption: { control: 'boolean', name: '설명', table: { category: '구성요소 토글' } },
    showSubCaption: { control: 'boolean', name: '보조 설명', table: { category: '구성요소 토글' } },
    showExtraCaption: { control: 'boolean', name: '추가 설명', table: { category: '구성요소 토글' } },
    showTopContent: { control: 'boolean', name: '상단 커스텀 (뱃지)', table: { category: '구성요소 토글' } },
    showBottomContent: { control: 'boolean', name: '하단 커스텀 (가격/평점)', table: { category: '구성요소 토글' } },
    isClickable: { control: 'boolean', name: '클릭 가능', table: { category: '인터랙션' } },
  } as any,
  args: {
    variant: 'filled',
    disabled: false,
    showThumbnail: true,
    showOverlayCaption: false,
    showToggleIcon: false,
    showHeading: true,
    showCaption: true,
    showSubCaption: false,
    showExtraCaption: false,
    showTopContent: false,
    showBottomContent: false,
    isClickable: true,
  } as any,
  render: (args: any) => (
    <Card
      variant={args.variant}
      disabled={args.disabled}
      thumbnail={args.showThumbnail ? { uri: 'https://picsum.photos/seed/card-play/400/267' } : undefined}
      overlayCaption={args.showOverlayCaption ? '인기 토큰' : undefined}
      toggleIcon={args.showToggleIcon ? (
        <Bookmark size={20} color="white" strokeWidth={2} />
      ) : undefined}
      onTogglePress={args.showToggleIcon ? fn() : undefined}
      topContent={args.showTopContent ? (
        <View style={{ flexDirection: 'row', gap: 6 }}>
          <View style={{ paddingHorizontal: 8, paddingVertical: 4, backgroundColor: '#eff6ff', borderRadius: 4 }}>
            <Text style={{ fontSize: 11, color: '#2563eb', fontWeight: '600' }}>신규 상장</Text>
          </View>
          <View style={{ paddingHorizontal: 8, paddingVertical: 4, backgroundColor: '#f0fdf4', borderRadius: 4 }}>
            <Text style={{ fontSize: 11, color: '#16a34a', fontWeight: '600' }}>HOT</Text>
          </View>
        </View>
      ) : undefined}
      heading={args.showHeading ? '비트코인 스테이킹 프로그램' : undefined}
      caption={args.showCaption ? '안전하게 수익을 창출하는 암호화폐 투자' : undefined}
      subCaption={args.showSubCaption ? 'APY 8.5% · 최소 0.01 BTC' : undefined}
      extraCaption={args.showExtraCaption ? '참여자 12,450명' : undefined}
      bottomContent={args.showBottomContent ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Text style={{ fontSize: 12, color: '#22c55e', fontWeight: '700' }}>+12.4%</Text>
            <Text style={{ fontSize: 12, color: '#8b95a1' }}>· 24시간</Text>
          </View>
          <Text style={{ fontSize: 14, fontWeight: '700', color: '#191f28' }}>$43,250</Text>
        </View>
      ) : undefined}
      width={300}
      onPress={args.isClickable ? fn() : undefined}
    />
  ),
};

// 2. Variants - Compare elevated, outlined, filled
export const Variants: Story = {
  render: () => (
    <View style={{ gap: 24, width: 320 }}>
      <View>
        <Text style={labelStyle}>Elevated (기본 - 그림자)</Text>
        <Card variant="elevated" padding="medium" style={{ width: '100%' }}>
          <Text style={{ fontSize: 15, fontWeight: '600', color: '#191f28', marginBottom: 4 }}>
            그림자 카드
          </Text>
          <Text style={contentTextStyle}>
            기본적으로 그림자가 적용된 카드입니다.
          </Text>
        </Card>
      </View>
      <View>
        <Text style={labelStyle}>Outlined (테두리)</Text>
        <Card variant="outlined" padding="medium" style={{ width: '100%' }}>
          <Text style={{ fontSize: 15, fontWeight: '600', color: '#191f28', marginBottom: 4 }}>
            테두리 카드
          </Text>
          <Text style={contentTextStyle}>
            테두리선이 있는 카드입니다.
          </Text>
        </Card>
      </View>
      <View>
        <Text style={labelStyle}>Filled (채움)</Text>
        <Card variant="filled" padding="medium" style={{ width: '100%' }}>
          <Text style={{ fontSize: 15, fontWeight: '600', color: '#191f28', marginBottom: 4 }}>
            채움 카드
          </Text>
          <Text style={contentTextStyle}>
            배경색이 채워진 카드입니다.
          </Text>
        </Card>
      </View>
    </View>
  ),
};

// 3. Padding - Compare none, small, medium, large
export const Padding: Story = {
  render: () => (
    <View style={{ gap: 24, width: 320 }}>
      <View>
        <Text style={labelStyle}>None (0px)</Text>
        <Card variant="outlined" padding="none" style={{ width: '100%' }}>
          <View style={{ padding: 12, backgroundColor: '#f1f5f9' }}>
            <Text style={contentTextStyle}>패딩 없음 (직접 제어)</Text>
          </View>
        </Card>
      </View>
      <View>
        <Text style={labelStyle}>Small (12px)</Text>
        <Card variant="outlined" padding="small" style={{ width: '100%' }}>
          <Text style={contentTextStyle}>작은 패딩</Text>
        </Card>
      </View>
      <View>
        <Text style={labelStyle}>Medium (20px) - 기본</Text>
        <Card variant="outlined" padding="medium" style={{ width: '100%' }}>
          <Text style={contentTextStyle}>기본 패딩</Text>
        </Card>
      </View>
      <View>
        <Text style={labelStyle}>Large (24px)</Text>
        <Card variant="outlined" padding="large" style={{ width: '100%' }}>
          <Text style={contentTextStyle}>큰 패딩</Text>
        </Card>
      </View>
    </View>
  ),
};

// 4. ContentCard - Montage content card with thumbnail + heading + caption
export const ContentCard: Story = {
  render: () => (
    <View style={{ gap: 24, width: 320 }}>
      <View>
        <Text style={labelStyle}>기본 콘텐츠 카드</Text>
        <Card
          variant="elevated"
          thumbnail={{ uri: 'https://picsum.photos/400/267' }}
          heading="이더리움 유동성 스테이킹"
          caption="언제든 인출 가능한 유연한 DeFi 투자"
          width={280}
          onPress={fn()}
        />
      </View>
      <View>
        <Text style={labelStyle}>서브캡션 포함</Text>
        <Card
          variant="elevated"
          thumbnail={{ uri: 'https://picsum.photos/400/268' }}
          heading="프리미엄 NFT 컬렉션"
          caption="한정판 디지털 아트 투자 기회"
          subCaption="민팅 시작: 2024년 3월 15일"
          width={280}
          onPress={fn()}
        />
      </View>
      <View>
        <Text style={labelStyle}>추가 정보 포함</Text>
        <Card
          variant="elevated"
          thumbnail={{ uri: 'https://picsum.photos/400/269' }}
          heading="자동 적립식 투자 플랜"
          caption="매월 자동으로 암호화폐 포트폴리오 구성"
          subCaption="최소 월 10만원부터"
          extraCaption="연 평균 수익률 18.5%"
          width={280}
          onPress={fn()}
        />
      </View>
    </View>
  ),
};

// 5. ThumbnailAspectRatios - Compare 3:2, 16:9, 1:1
export const ThumbnailAspectRatios: Story = {
  render: () => (
    <View style={{ gap: 24, width: 320 }}>
      <View>
        <Text style={labelStyle}>3:2 비율 (기본)</Text>
        <Card
          variant="elevated"
          thumbnail={{ uri: 'https://picsum.photos/300/200' }}
          thumbnailAspectRatio={3 / 2}
          heading="비트코인 가격 분석"
          caption="실시간 차트와 시장 전망"
          width={280}
          onPress={fn()}
        />
      </View>
      <View>
        <Text style={labelStyle}>16:9 비율 (와이드)</Text>
        <Card
          variant="elevated"
          thumbnail={{ uri: 'https://picsum.photos/320/180' }}
          thumbnailAspectRatio={16 / 9}
          heading="암호화폐 투자 가이드"
          caption="초보자를 위한 영상 강의 시리즈"
          width={280}
          onPress={fn()}
        />
      </View>
      <View>
        <Text style={labelStyle}>1:1 비율 (정사각형)</Text>
        <Card
          variant="elevated"
          thumbnail={{ uri: 'https://picsum.photos/280/280' }}
          thumbnailAspectRatio={1}
          heading="NFT 마켓플레이스"
          caption="디지털 자산 거래 플랫폼"
          width={280}
          onPress={fn()}
        />
      </View>
    </View>
  ),
};

// 6. OverlayCaption - Card with overlay text on thumbnail
export const OverlayCaption: Story = {
  render: () => (
    <View style={{ gap: 24, width: 320 }}>
      <Card
        variant="elevated"
        thumbnail={{ uri: 'https://picsum.photos/400/270' }}
        overlayCaption="신규 상장"
        heading="솔라나 생태계 토큰"
        caption="빠른 속도와 낮은 수수료의 차세대 블록체인"
        width={280}
        onPress={fn()}
      />
      <Card
        variant="elevated"
        thumbnail={{ uri: 'https://picsum.photos/400/271' }}
        overlayCaption="인기 급상승"
        heading="디파이 유동성 풀"
        caption="높은 수익률의 탈중앙화 금융 프로토콜"
        width={280}
        onPress={fn()}
      />
      <Card
        variant="elevated"
        thumbnail={{ uri: 'https://picsum.photos/400/272' }}
        overlayCaption="마감 임박"
        heading="한정판 NFT 드롭"
        caption="유명 아티스트 협업 디지털 컬렉션"
        width={280}
        onPress={fn()}
      />
    </View>
  ),
};

// 7. ToggleIcon - Card with bookmark/heart toggle icon
export const ToggleIcon: Story = {
  render: () => {
    function ToggleIconExample() {
      const [bookmarked, setBookmarked] = useState(false);
      const [liked, setLiked] = useState(false);

      return (
        <View style={{ gap: 24, width: 320 }}>
          <View>
            <Text style={labelStyle}>북마크 아이콘</Text>
            <Card
              variant="elevated"
              thumbnail={{ uri: 'https://picsum.photos/400/273' }}
              toggleIcon={
                <Bookmark
                  size={20}
                  color={bookmarked ? '#f59e0b' : 'white'}
                  fill={bookmarked ? '#f59e0b' : 'none'}
                  strokeWidth={2}
                />
              }
              onTogglePress={() => setBookmarked(!bookmarked)}
              heading="이더리움 관심 목록"
              caption="실시간 가격 알림 설정된 코인"
              width={280}
              onPress={fn()}
            />
          </View>
          <View>
            <Text style={labelStyle}>좋아요 아이콘</Text>
            <Card
              variant="elevated"
              thumbnail={{ uri: 'https://picsum.photos/400/274' }}
              toggleIcon={
                <Heart
                  size={20}
                  color={liked ? '#ef4444' : 'white'}
                  fill={liked ? '#ef4444' : 'none'}
                  strokeWidth={2}
                />
              }
              onTogglePress={() => setLiked(!liked)}
              heading="스테이블코인 적립 풀"
              caption="안정적인 수익을 원하는 보수적 투자자용"
              width={280}
              onPress={fn()}
            />
          </View>
        </View>
      );
    }
    return <ToggleIconExample />;
  },
};

// 8. TextEllipsis - Long heading (2 lines) and caption (1 line) with ellipsis
export const TextEllipsis: Story = {
  render: () => (
    <View style={{ gap: 24, width: 320 }}>
      <View>
        <Text style={labelStyle}>제목 2줄 말줄임 (기본)</Text>
        <Card
          variant="elevated"
          thumbnail={{ uri: 'https://picsum.photos/400/275' }}
          heading="초보자를 위한 완벽한 암호화폐 투자 전략: 기초 지식부터 포트폴리오 구성까지"
          caption="단계별 가이드로 체계적으로 배우는 디지털 자산 관리"
          width={280}
          onPress={fn()}
        />
      </View>
      <View>
        <Text style={labelStyle}>설명 1줄 말줄임 (기본)</Text>
        <Card
          variant="elevated"
          thumbnail={{ uri: 'https://picsum.photos/400/276' }}
          heading="글로벌 암호화폐 시장 분석"
          caption="주요 거래소 동향과 기관 투자자 움직임을 실시간으로 추적하고 분석하는 프리미엄 리포트"
          width={280}
          onPress={fn()}
        />
      </View>
      <View>
        <Text style={labelStyle}>제목 1줄 제한</Text>
        <Card
          variant="elevated"
          thumbnail={{ uri: 'https://picsum.photos/400/277' }}
          heading="블록체인과 함께하는 미래: 탈중앙화 기술의 현재와 미래 전망"
          headingNumberOfLines={1}
          caption="최신 암호화폐 트렌드를 파악하고 투자에 적용하기"
          width={280}
          onPress={fn()}
        />
      </View>
      <View>
        <Text style={labelStyle}>설명 2줄 제한</Text>
        <Card
          variant="elevated"
          thumbnail={{ uri: 'https://picsum.photos/400/278' }}
          heading="암호화폐 자산 배분 전략"
          caption="비트코인, 이더리움, 알트코인 등 다양한 디지털 자산을 활용한 효과적인 포트폴리오 구성과 리스크 관리 방법을 배웁니다"
          captionNumberOfLines={2}
          width={280}
          onPress={fn()}
        />
      </View>
    </View>
  ),
};

// 9. WithCustomContent - Cards using topContent, bottomContent slots
export const WithCustomContent: Story = {
  render: () => (
    <View style={{ gap: 24, width: 320 }}>
      <View>
        <Text style={labelStyle}>topContent 사용</Text>
        <Card
          variant="elevated"
          thumbnail={{ uri: 'https://picsum.photos/400/279' }}
          topContent={
            <View style={{
              flexDirection: 'row',
              gap: 6,
            }}>
              <View style={{
                paddingHorizontal: 8,
                paddingVertical: 4,
                backgroundColor: '#eff6ff',
                borderRadius: 4,
              }}>
                <Text style={{ fontSize: 11, color: '#2563eb', fontWeight: '600' }}>DeFi</Text>
              </View>
              <View style={{
                paddingHorizontal: 8,
                paddingVertical: 4,
                backgroundColor: '#f0fdf4',
                borderRadius: 4,
              }}>
                <Text style={{ fontSize: 11, color: '#16a34a', fontWeight: '600' }}>고수익</Text>
              </View>
            </View>
          }
          heading="이자 농사 마스터 플랜"
          caption="12주 만에 완성하는 DeFi 수익 극대화"
          width={280}
          onPress={fn()}
        />
      </View>
      <View>
        <Text style={labelStyle}>bottomContent 사용</Text>
        <Card
          variant="elevated"
          thumbnail={{ uri: 'https://picsum.photos/400/280' }}
          heading="비트코인 정기 적립"
          caption="매월 자동으로 BTC 매수하기"
          bottomContent={
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Text style={{ fontSize: 12, color: '#f59e0b', fontWeight: '700' }}>★ 4.9</Text>
                <Text style={{ fontSize: 12, color: '#8b95a1' }}>· 투자자 12,400명</Text>
              </View>
              <Text style={{ fontSize: 14, fontWeight: '700', color: '#191f28' }}>월 10만원~</Text>
            </View>
          }
          width={280}
          onPress={fn()}
        />
      </View>
      <View>
        <Text style={labelStyle}>top + bottom 조합</Text>
        <Card
          variant="elevated"
          thumbnail={{ uri: 'https://picsum.photos/400/281' }}
          topContent={
            <View style={{
              paddingHorizontal: 8,
              paddingVertical: 4,
              backgroundColor: '#fef2f2',
              borderRadius: 4,
              alignSelf: 'flex-start',
            }}>
              <Text style={{ fontSize: 11, color: '#dc2626', fontWeight: '600' }}>베스트 상품</Text>
            </View>
          }
          heading="프리미엄 스테이킹 플랜"
          caption="높은 수익률과 보안을 동시에 제공하는 투자 상품"
          bottomContent={
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <Text style={{ fontSize: 12, color: '#8b95a1' }}>90일 고정 · APY</Text>
              <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
                <Text style={{ fontSize: 12, color: '#8b95a1', textDecorationLine: 'line-through' }}>
                  8.0%
                </Text>
                <Text style={{ fontSize: 14, fontWeight: '700', color: '#191f28' }}>12.5%</Text>
              </View>
            </View>
          }
          width={280}
          onPress={fn()}
        />
      </View>
    </View>
  ),
};

// 10. HorizontalCardList - Horizontal scrollable card list
export const HorizontalCardList: Story = {
  render: () => (
    <View style={{ width: 375 }}>
      <Text style={{
        fontSize: 18,
        fontWeight: '700',
        color: '#191f28',
        marginBottom: 16,
        paddingHorizontal: 20,
      }}>
        추천 투자 상품
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          gap: 16,
        }}
      >
        <Card
          variant="elevated"
          thumbnail={{ uri: 'https://picsum.photos/220/147' }}
          heading="비트코인 입문"
          caption="디지털 금 투자 시작하기"
          subCaption="APY 6.5%"
          width={220}
          onPress={fn()}
        />
        <Card
          variant="elevated"
          thumbnail={{ uri: 'https://picsum.photos/221/147' }}
          heading="이더리움 스테이킹"
          caption="안전한 장기 투자 전략"
          subCaption="연 8.2% 수익"
          width={220}
          onPress={fn()}
        />
        <Card
          variant="elevated"
          thumbnail={{ uri: 'https://picsum.photos/222/147' }}
          heading="알트코인 포트폴리오"
          caption="고수익 분산 투자"
          subCaption="주간 리밸런싱"
          width={220}
          onPress={fn()}
        />
        <Card
          variant="elevated"
          thumbnail={{ uri: 'https://picsum.photos/223/147' }}
          heading="NFT 투자 가이드"
          caption="디지털 자산 전문가 되기"
          subCaption="실전 민팅 포함"
          width={220}
          onPress={fn()}
        />
      </ScrollView>
    </View>
  ),
  decorators: [
    (Story) => (
      <View style={{ padding: 40, backgroundColor: '#f8fafc' }}>
        <Story />
      </View>
    ),
  ],
};

// 11. States - Normal, Clickable, Disabled
export const States: Story = {
  render: () => (
    <View style={{ gap: 24, width: 320 }}>
      <View>
        <Text style={labelStyle}>Normal (정적 - 클릭 불가)</Text>
        <Card
          variant="elevated"
          thumbnail={{ uri: 'https://picsum.photos/400/282' }}
          heading="시장 분석 리포트"
          caption="읽기 전용 정보 카드입니다"
          width={280}
        />
      </View>
      <View>
        <Text style={labelStyle}>Clickable (클릭 시 pressed 상태)</Text>
        <Card
          variant="elevated"
          thumbnail={{ uri: 'https://picsum.photos/400/283' }}
          heading="투자 상품 상세보기"
          caption="클릭하면 상세 페이지로 이동합니다"
          width={280}
          onPress={fn()}
        />
      </View>
      <View>
        <Text style={labelStyle}>Disabled (비활성화)</Text>
        <Card
          variant="elevated"
          thumbnail={{ uri: 'https://picsum.photos/400/284' }}
          heading="마감된 투자 상품"
          caption="모집이 종료되어 참여할 수 없습니다"
          width={280}
          disabled
          onPress={fn()}
        />
      </View>
      <View>
        <Text style={labelStyle}>Container mode - Clickable</Text>
        <Card
          variant="elevated"
          padding="medium"
          width={280}
          onPress={fn()}
        >
          <Text style={{ fontSize: 15, fontWeight: '600', color: '#191f28', marginBottom: 4 }}>
            포트폴리오 요약
          </Text>
          <Text style={contentTextStyle}>
            컨테이너 모드로 커스텀 콘텐츠를 자유롭게 구성할 수 있습니다.
          </Text>
        </Card>
      </View>
    </View>
  ),
};

// 12. CombinedExample - Real-world usage: product listing
export const CombinedExample: Story = {
  render: () => {
    function ProductListing() {
      const [bookmarks, setBookmarks] = useState<Record<number, boolean>>({});

      const toggleBookmark = (id: number) => {
        setBookmarks(prev => ({ ...prev, [id]: !prev[id] }));
      };

      const products = [
        {
          id: 1,
          image: 'https://picsum.photos/320/213',
          badge: '신규',
          title: '비트코인 유동성 스테이킹',
          description: '언제든 인출 가능한 유연한 투자',
          location: 'APY 6.8%',
          price: '최소 0.01 BTC',
          rating: '4.8',
          reviews: '3,280',
        },
        {
          id: 2,
          image: 'https://picsum.photos/321/213',
          badge: '인기',
          title: '이더리움 고정 예치',
          description: '안정적인 장기 수익 보장 상품',
          location: 'APY 9.5%',
          price: '최소 0.5 ETH',
          rating: '4.9',
          reviews: '5,120',
        },
        {
          id: 3,
          image: 'https://picsum.photos/322/213',
          badge: '특가',
          title: '스테이블코인 적립식',
          description: '매월 자동으로 USDT 적립하기',
          location: 'APY 12.0%',
          price: '월 10만원~',
          rating: '4.7',
          reviews: '2,030',
        },
        {
          id: 4,
          image: 'https://picsum.photos/323/213',
          badge: '추천',
          title: 'DeFi 유동성 풀 프리미엄',
          description: '높은 수익률의 탈중앙화 투자',
          location: 'APY 15.8%',
          price: '최소 $1,000',
          rating: '4.9',
          reviews: '4,410',
        },
      ];

      return (
        <View style={{ width: 375 }}>
          <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
            <Text style={{
              fontSize: 22,
              fontWeight: '700',
              color: '#191f28',
              marginBottom: 8,
              letterSpacing: -0.3,
            }}>
              인기 스테이킹 상품
            </Text>
            <Text style={{ fontSize: 14, color: '#6b7684' }}>
              안전하고 높은 수익률의 투자 기회
            </Text>
          </View>
          <View style={{
            paddingHorizontal: 20,
            gap: 20,
          }}>
            {products.map((product) => (
              <Card
                key={product.id}
                variant="elevated"
                thumbnail={{ uri: product.image }}
                overlayCaption={product.badge}
                toggleIcon={
                  <Bookmark
                    size={20}
                    color={bookmarks[product.id] ? '#f59e0b' : 'white'}
                    fill={bookmarks[product.id] ? '#f59e0b' : 'none'}
                    strokeWidth={2}
                  />
                }
                onTogglePress={() => toggleBookmark(product.id)}
                heading={product.title}
                caption={product.description}
                subCaption={product.location}
                bottomContent={
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                      <Text style={{ fontSize: 12, color: '#f59e0b', fontWeight: '700' }}>
                        ★ {product.rating}
                      </Text>
                      <Text style={{ fontSize: 12, color: '#8b95a1' }}>
                        · 투자자 {product.reviews}명
                      </Text>
                    </View>
                    <Text style={{ fontSize: 15, fontWeight: '700', color: '#191f28' }}>
                      {product.price}
                    </Text>
                  </View>
                }
                onPress={fn()}
              />
            ))}
          </View>
        </View>
      );
    }
    return <ProductListing />;
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 40, backgroundColor: '#f8fafc' }}>
        <Story />
      </View>
    ),
  ],
};
