import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View, Text, Pressable } from 'react-native';
import { Thumbnail } from '@baerae-zkap/design-system/native';
import { fn } from 'storybook/test';

const meta = {
  title: '@baerae-zkap/Contents/Thumbnail',
  component: Thumbnail,
  parameters: {
    notes: 'Thumbnail 컴포넌트는 암호화폐, NFT, 블록체인 콘텐츠를 다양한 종횡비로 표시합니다.',
  },
  argTypes: {
    aspectRatio: {
      control: { type: 'select' },
      options: ['1:1', '5:4', '4:3', '3:2', '16:10', '1.618:1', '16:9', '2:1', '21:9', '4:5', '3:4', '2:3', '10:16', '1:1.618', '9:16', '1:2', '9:21'],
      description: '종횡비',
      table: { category: '레이아웃' },
    },
    size: {
      control: { type: 'number', min: 48, max: 400, step: 8 },
      description: '너비 크기 (px)',
      table: { category: '레이아웃' },
    },
    radius: {
      control: { type: 'boolean' },
      description: '라운드 모서리 (12px)',
      table: { category: '스타일' },
    },
    border: {
      control: { type: 'boolean' },
      description: '테두리 표시',
      table: { category: '스타일' },
    },
    playIcon: {
      control: { type: 'boolean' },
      description: '재생 아이콘 표시 (비디오용)',
      table: { category: '기능' },
    },
  },
} satisfies Meta<typeof Thumbnail>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleImages = {
  crypto: { uri: 'https://picsum.photos/seed/crypto/400/400' },
  nft: { uri: 'https://picsum.photos/seed/nft/400/400' },
  defi: { uri: 'https://picsum.photos/seed/defi/400/400' },
  token: { uri: 'https://picsum.photos/seed/token/400/400' },
  chain: { uri: 'https://picsum.photos/seed/chain/400/400' },
  wallet: { uri: 'https://picsum.photos/seed/wallet/400/400' },
  wide: { uri: 'https://picsum.photos/seed/wide/800/450' },
  portrait: { uri: 'https://picsum.photos/seed/portrait/400/600' },
};

// 1. Default (Playground)
export const Default: Story = {
  args: {
    src: sampleImages.crypto,
    alt: '암호화폐 썸네일',
    aspectRatio: '16:9',
    size: 300,
    radius: true,
    border: false,
    playIcon: false,
    onPress: fn(),
  },
  render: (args) => {
    const [showOverlay, setShowOverlay] = React.useState(false);

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <View style={{ marginBottom: 20 }}>
          <Pressable
            onPress={() => setShowOverlay(!showOverlay)}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              backgroundColor: '#f1f5f9',
              borderRadius: 8
            }}
          >
            <Text style={{ fontSize: 14 }}>오버레이 표시: {showOverlay ? 'ON' : 'OFF'}</Text>
          </Pressable>
        </View>

        <Thumbnail
          {...args}
          overlay={showOverlay ? (
            <View
              style={{
                position: 'absolute',
                bottom: 8,
                left: 8,
                paddingHorizontal: 12,
                paddingVertical: 6,
                backgroundColor: 'rgba(59, 130, 246, 0.9)',
                borderRadius: 6,
              }}
            >
              <Text style={{ color: 'white', fontSize: 11, fontWeight: '600' }}>
                NEW
              </Text>
            </View>
          ) : undefined}
        />
      </View>
    );
  },
};

// 2. AspectRatios
export const AspectRatios: Story = {
  name: '종횡비 옵션',
  render: () => (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16 }}>
        다양한 종횡비
      </Text>

      <View style={{ gap: 24 }}>
        <View style={{ flexDirection: 'row', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <View style={{ alignItems: 'center' }}>
            <Thumbnail src={sampleImages.crypto} aspectRatio="1:1" size={160} />
            <Text style={{ marginTop: 8, fontSize: 12, color: '#6b7280' }}>1:1 정사각형</Text>
          </View>

          <View style={{ alignItems: 'center' }}>
            <Thumbnail src={sampleImages.nft} aspectRatio="4:3" size={160} />
            <Text style={{ marginTop: 8, fontSize: 12, color: '#6b7280' }}>4:3 표준</Text>
          </View>

          <View style={{ alignItems: 'center' }}>
            <Thumbnail src={sampleImages.defi} aspectRatio="16:9" size={160} />
            <Text style={{ marginTop: 8, fontSize: 12, color: '#6b7280' }}>16:9 와이드</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <View style={{ alignItems: 'center' }}>
            <Thumbnail src={sampleImages.token} aspectRatio="3:2" size={160} />
            <Text style={{ marginTop: 8, fontSize: 12, color: '#6b7280' }}>3:2 사진</Text>
          </View>

          <View style={{ alignItems: 'center' }}>
            <Thumbnail src={sampleImages.chain} aspectRatio="2:1" size={160} />
            <Text style={{ marginTop: 8, fontSize: 12, color: '#6b7280' }}>2:1 배너</Text>
          </View>

          <View style={{ alignItems: 'center' }}>
            <Thumbnail src={sampleImages.wallet} aspectRatio="9:16" size={90} />
            <Text style={{ marginTop: 8, fontSize: 12, color: '#6b7280' }}>9:16 세로</Text>
          </View>
        </View>
      </View>
    </View>
  ),
};

// 3. RadiusOptions
export const RadiusOptions: Story = {
  name: '라운드 옵션',
  render: () => (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16 }}>
        모서리 라운드 옵션
      </Text>

      <View style={{ flexDirection: 'row', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
        <View style={{ alignItems: 'center' }}>
          <Thumbnail src={sampleImages.crypto} aspectRatio="1:1" size={160} radius />
          <Text style={{ marginTop: 8, fontSize: 13, color: '#334155', fontWeight: '500' }}>라운드 (12px)</Text>
        </View>

        <View style={{ alignItems: 'center' }}>
          <Thumbnail src={sampleImages.crypto} aspectRatio="1:1" size={160} radius={false} />
          <Text style={{ marginTop: 8, fontSize: 13, color: '#334155', fontWeight: '500' }}>직각 (0px)</Text>
        </View>
      </View>
    </View>
  ),
};

// 4. BorderOptions
export const BorderOptions: Story = {
  name: '테두리 옵션',
  render: () => (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16 }}>
        테두리 옵션
      </Text>

      <View style={{ flexDirection: 'row', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
        <View style={{ alignItems: 'center' }}>
          <Thumbnail src={sampleImages.wallet} aspectRatio="1:1" size={160} border />
          <Text style={{ marginTop: 8, fontSize: 13, color: '#334155', fontWeight: '500' }}>테두리 있음</Text>
        </View>

        <View style={{ alignItems: 'center' }}>
          <Thumbnail src={sampleImages.wallet} aspectRatio="1:1" size={160} border={false} />
          <Text style={{ marginTop: 8, fontSize: 13, color: '#334155', fontWeight: '500' }}>테두리 없음</Text>
        </View>
      </View>
    </View>
  ),
};

// 5. WithPlayIcon
export const WithPlayIcon: Story = {
  name: '비디오 썸네일',
  render: () => (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16 }}>
        비디오 콘텐츠 (Play Icon)
      </Text>

      <View style={{ gap: 20 }}>
        <View>
          <Text style={{ fontSize: 14, fontWeight: '500', marginBottom: 8, color: '#6b7280' }}>
            DeFi 투자 가이드
          </Text>
          <Thumbnail
            src={sampleImages.defi}
            aspectRatio="16:9"
            size={300}
            playIcon
            onPress={fn()}
            overlay={
              <View
                style={{
                  position: 'absolute',
                  bottom: 8,
                  right: 8,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  borderRadius: 4,
                }}
              >
                <Text style={{ color: 'white', fontSize: 11, fontWeight: '600' }}>
                  5:32
                </Text>
              </View>
            }
          />
        </View>

        <View>
          <Text style={{ fontSize: 14, fontWeight: '500', marginBottom: 8, color: '#6b7280' }}>
            블록체인 기초 강의
          </Text>
          <Thumbnail
            src={sampleImages.chain}
            aspectRatio="1:1"
            size={200}
            playIcon
            onPress={fn()}
            overlay={
              <View
                style={{
                  position: 'absolute',
                  bottom: 8,
                  right: 8,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  borderRadius: 4,
                }}
              >
                <Text style={{ color: 'white', fontSize: 11, fontWeight: '600' }}>
                  12:48
                </Text>
              </View>
            }
          />
        </View>
      </View>
    </View>
  ),
};

// 6. WithOverlay
export const WithOverlay: Story = {
  name: '오버레이 패턴',
  render: () => (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16 }}>
        다양한 오버레이 패턴
      </Text>

      <View style={{ gap: 20 }}>
        <View>
          <Text style={{ fontSize: 14, fontWeight: '500', marginBottom: 8, color: '#6b7280' }}>
            Bottom-left Badge (LIVE)
          </Text>
          <Thumbnail
            src={sampleImages.crypto}
            aspectRatio="1:1"
            size={200}
            overlay={
              <View
                style={{
                  position: 'absolute',
                  bottom: 8,
                  left: 8,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  backgroundColor: 'rgba(239, 68, 68, 0.95)',
                  borderRadius: 6,
                }}
              >
                <Text style={{ color: 'white', fontSize: 11, fontWeight: '700' }}>
                  LIVE
                </Text>
              </View>
            }
          />
        </View>

        <View>
          <Text style={{ fontSize: 14, fontWeight: '500', marginBottom: 8, color: '#6b7280' }}>
            Top-right Badge (NEW)
          </Text>
          <Thumbnail
            src={sampleImages.nft}
            aspectRatio="16:9"
            size={300}
            overlay={
              <View
                style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  backgroundColor: 'rgba(34, 197, 94, 0.95)',
                  borderRadius: 6,
                }}
              >
                <Text style={{ fontSize: 11, fontWeight: '700', color: 'white' }}>
                  NEW
                </Text>
              </View>
            }
          />
        </View>

        <View>
          <Text style={{ fontSize: 14, fontWeight: '500', marginBottom: 8, color: '#6b7280' }}>
            Bottom Gradient with Text
          </Text>
          <Thumbnail
            src={sampleImages.wallet}
            aspectRatio="16:9"
            size={300}
            overlay={
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: 12,
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  borderBottomLeftRadius: 12,
                  borderBottomRightRadius: 12,
                }}
              >
                <Text style={{ color: 'white', fontSize: 13, fontWeight: '600' }}>
                  지갑 연결 가이드
                </Text>
                <Text style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: 11, marginTop: 2 }}>
                  메타마스크 설정 방법
                </Text>
              </View>
            }
          />
        </View>
      </View>
    </View>
  ),
};

// 7. Fallback
export const Fallback: Story = {
  name: '로드 실패 시 Fallback',
  render: () => (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16 }}>
        이미지 로드 실패 처리
      </Text>

      <View style={{ gap: 20 }}>
        <View>
          <Text style={{ fontSize: 14, fontWeight: '500', marginBottom: 8, color: '#6b7280' }}>
            기본 Fallback (텍스트)
          </Text>
          <Thumbnail
            src={{ uri: 'https://invalid-url.com/crypto.jpg' }}
            aspectRatio="16:9"
            size={300}
            fallback="암호화폐 이미지를 불러올 수 없습니다"
          />
        </View>

        <View>
          <Text style={{ fontSize: 14, fontWeight: '500', marginBottom: 8, color: '#6b7280' }}>
            커스텀 Fallback (이모지 + 텍스트)
          </Text>
          <Thumbnail
            src={{ uri: 'https://invalid-url.com/nft.jpg' }}
            aspectRatio="1:1"
            size={160}
            fallback={
              <View style={{ alignItems: 'center', gap: 8 }}>
                <Text style={{ fontSize: 40 }}>🪙</Text>
                <Text style={{ fontSize: 12, color: '#94a3b8', fontWeight: '500' }}>
                  토큰 이미지 없음
                </Text>
              </View>
            }
          />
        </View>
      </View>
    </View>
  ),
};

// 8. Sizes
export const Sizes: Story = {
  name: '다양한 크기',
  render: () => (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16 }}>
        크기 옵션 (1:1)
      </Text>

      <View style={{ flexDirection: 'row', gap: 16, flexWrap: 'wrap', alignItems: 'flex-end' }}>
        {[48, 64, 80, 120, 160, 200].map((size) => (
          <View key={size} style={{ alignItems: 'center' }}>
            <Thumbnail src={sampleImages.crypto} aspectRatio="1:1" size={size} />
            <Text style={{ marginTop: 8, fontSize: 12, color: '#6b7280' }}>{size}px</Text>
          </View>
        ))}
      </View>
    </View>
  ),
};

// 9. NFTGallery
export const NFTGallery: Story = {
  name: 'NFT 갤러리',
  render: () => (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16 }}>
        NFT 컬렉션
      </Text>

      <View style={{ flexDirection: 'row', gap: 12, flexWrap: 'wrap', maxWidth: 340 }}>
        <Thumbnail src={sampleImages.nft} aspectRatio="1:1" size={100} border />
        <Thumbnail src={sampleImages.crypto} aspectRatio="1:1" size={100} border />
        <Thumbnail src={sampleImages.token} aspectRatio="1:1" size={100} border />
        <Thumbnail src={sampleImages.chain} aspectRatio="1:1" size={100} border />
        <Thumbnail src={sampleImages.wallet} aspectRatio="1:1" size={100} border />
        <Thumbnail src={sampleImages.defi} aspectRatio="1:1" size={100} border />
        <Thumbnail
          src={sampleImages.nft}
          aspectRatio="1:1"
          size={100}
          border
          overlay={
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white', fontSize: 14, fontWeight: '700' }}>
                SOLD
              </Text>
            </View>
          }
        />
        <Thumbnail src={sampleImages.crypto} aspectRatio="1:1" size={100} border />
        <Thumbnail src={sampleImages.wallet} aspectRatio="1:1" size={100} border />
      </View>
    </View>
  ),
};

// 10. UsageExample
export const UsageExample: Story = {
  name: '실제 사용 예시',
  render: () => (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 20 }}>
        실제 화면 구성 예시
      </Text>

      <View style={{ gap: 32 }}>
        {/* 토큰 목록 */}
        <View>
          <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 12, color: '#334155' }}>
            토큰 목록
          </Text>
          <View style={{ gap: 12 }}>
            {[
              { name: 'Bitcoin (BTC)', value: '$45,234.56', img: sampleImages.crypto },
              { name: 'Ethereum (ETH)', value: '$3,123.45', img: sampleImages.token },
              { name: 'Solana (SOL)', value: '$98.76', img: sampleImages.chain },
            ].map((token, idx) => (
              <Pressable
                key={idx}
                onPress={fn()}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 12,
                  backgroundColor: 'white',
                  borderRadius: 12,
                  gap: 12,
                }}
              >
                <Thumbnail src={token.img} aspectRatio="1:1" size={48} border />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#1f2937' }}>
                    {token.name}
                  </Text>
                  <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>
                    {token.value}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        {/* NFT 컬렉션 */}
        <View>
          <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 12, color: '#334155' }}>
            NFT 컬렉션
          </Text>
          <View style={{ flexDirection: 'row', gap: 12, flexWrap: 'wrap' }}>
            {[sampleImages.nft, sampleImages.crypto, sampleImages.wallet, sampleImages.defi].map((img, idx) => (
              <Pressable key={idx} onPress={fn()}>
                <Thumbnail src={img} aspectRatio="1:1" size={90} border />
              </Pressable>
            ))}
          </View>
        </View>

        {/* 교육 콘텐츠 */}
        <View>
          <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 12, color: '#334155' }}>
            교육 콘텐츠
          </Text>
          <View style={{ gap: 12 }}>
            {[
              { title: 'DeFi 투자 시작하기', duration: '8:24', img: sampleImages.defi },
              { title: '블록체인 기초 강좌', duration: '12:48', img: sampleImages.chain },
            ].map((video, idx) => (
              <Pressable
                key={idx}
                onPress={fn()}
                style={{
                  backgroundColor: 'white',
                  borderRadius: 12,
                  overflow: 'hidden',
                }}
              >
                <Thumbnail
                  src={video.img}
                  aspectRatio="16:9"
                  size={300}
                  playIcon
                  overlay={
                    <View
                      style={{
                        position: 'absolute',
                        bottom: 8,
                        right: 8,
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        borderRadius: 4,
                      }}
                    >
                      <Text style={{ color: 'white', fontSize: 11, fontWeight: '600' }}>
                        {video.duration}
                      </Text>
                    </View>
                  }
                />
                <View style={{ padding: 12 }}>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#1f2937' }}>
                    {video.title}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </View>
  ),
};

// React import for useState in Default story
import React from 'react';
