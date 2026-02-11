import { IconButton } from '@baerae-zkap/design-system/native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View, Text } from 'react-native';
import { fn } from 'storybook/test';
import {
  Plus,
  X,
  Menu,
  ArrowLeft,
  Bell,
  Settings,
  Heart,
  Bookmark,
  Share2,
  Play,
  RefreshCw,
  Search,
  Wallet,
  Send,
  QrCode
} from 'lucide-react-native';
import { useState } from 'react';

/**
 * IconButton - 아이콘 전용 원형 버튼
 *
 * 암호화폐 지갑 및 자산 관리 앱의 네비게이션, FAB, 액션 버튼에 사용됩니다.
 */
const meta = {
  title: '@baerae-zkap/Actions/Icon button',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['ghost', 'solid', 'outlined'],
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
      options: ['small', 'medium', 'large'],
      description: '버튼 크기',
      table: { category: '크기' }
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
      table: { category: '상태' }
    },
    iconColor: { table: { disable: true } },
    backgroundColor: { table: { disable: true } },
    borderColor: { table: { disable: true } },
    onPress: { table: { disable: true } },
    icon: { table: { disable: true } },
    style: { table: { disable: true } },
    testID: { table: { disable: true } },
    accessibilityLabel: { table: { disable: true } },
  },
  args: {
    onPress: fn(),
    variant: 'ghost',
    color: 'secondary',
    size: 'medium',
    disabled: false,
  },
  decorators: [
    (Story) => (
      <View style={{ width: 375, padding: 20, backgroundColor: '#f8fafc', alignItems: 'center' }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Default (Playground)
export const Default: Story = {
  render: (args) => (
    <IconButton {...args}>
      <Plus />
    </IconButton>
  ),
};

// 2. Variants
export const Variants: Story = {
  render: () => (
    <View style={{ gap: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <IconButton variant="ghost" color="secondary" onPress={fn()}>
          <Plus />
        </IconButton>
        <Text style={{ fontSize: 13, color: '#64748b' }}>Ghost (기본, 투명)</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <IconButton variant="solid" color="primary" onPress={fn()}>
          <Plus />
        </IconButton>
        <Text style={{ fontSize: 13, color: '#64748b' }}>Solid (채워진)</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <IconButton variant="outlined" color="secondary" onPress={fn()}>
          <Plus />
        </IconButton>
        <Text style={{ fontSize: 13, color: '#64748b' }}>Outlined (테두리)</Text>
      </View>
    </View>
  ),
};

// 3. Colors
export const Colors: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      {/* Ghost Row */}
      <View>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#94a3b8', marginBottom: 12 }}>Ghost</Text>
        <View style={{ flexDirection: 'row', gap: 16 }}>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <IconButton variant="ghost" color="primary" onPress={fn()}>
              <Wallet />
            </IconButton>
            <Text style={{ fontSize: 11, color: '#64748b' }}>Primary</Text>
          </View>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <IconButton variant="ghost" color="secondary" onPress={fn()}>
              <Settings />
            </IconButton>
            <Text style={{ fontSize: 11, color: '#64748b' }}>Secondary</Text>
          </View>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <IconButton variant="ghost" color="danger" onPress={fn()}>
              <X />
            </IconButton>
            <Text style={{ fontSize: 11, color: '#64748b' }}>Danger</Text>
          </View>
        </View>
      </View>

      {/* Solid Row */}
      <View>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#94a3b8', marginBottom: 12 }}>Solid</Text>
        <View style={{ flexDirection: 'row', gap: 16 }}>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <IconButton variant="solid" color="primary" onPress={fn()}>
              <Send />
            </IconButton>
            <Text style={{ fontSize: 11, color: '#64748b' }}>Primary</Text>
          </View>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <IconButton variant="solid" color="secondary" onPress={fn()}>
              <QrCode />
            </IconButton>
            <Text style={{ fontSize: 11, color: '#64748b' }}>Secondary</Text>
          </View>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <IconButton variant="solid" color="danger" onPress={fn()}>
              <X />
            </IconButton>
            <Text style={{ fontSize: 11, color: '#64748b' }}>Danger</Text>
          </View>
        </View>
      </View>

      {/* Outlined Row */}
      <View>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#94a3b8', marginBottom: 12 }}>Outlined</Text>
        <View style={{ flexDirection: 'row', gap: 16 }}>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <IconButton variant="outlined" color="primary" onPress={fn()}>
              <RefreshCw />
            </IconButton>
            <Text style={{ fontSize: 11, color: '#64748b' }}>Primary</Text>
          </View>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <IconButton variant="outlined" color="secondary" onPress={fn()}>
              <Search />
            </IconButton>
            <Text style={{ fontSize: 11, color: '#64748b' }}>Secondary</Text>
          </View>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <IconButton variant="outlined" color="danger" onPress={fn()}>
              <X />
            </IconButton>
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
        <IconButton size="small" variant="solid" color="primary" onPress={fn()}>
          <Plus />
        </IconButton>
        <Text style={{ fontSize: 13, color: '#64748b' }}>Small (32px)</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <IconButton size="medium" variant="solid" color="primary" onPress={fn()}>
          <Plus />
        </IconButton>
        <Text style={{ fontSize: 13, color: '#64748b' }}>Medium (40px)</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <IconButton size="large" variant="solid" color="primary" onPress={fn()}>
          <Plus />
        </IconButton>
        <Text style={{ fontSize: 13, color: '#64748b' }}>Large (48px)</Text>
      </View>
    </View>
  ),
};

// 5. States
export const States: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      {/* Ghost States */}
      <View>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#94a3b8', marginBottom: 12 }}>Ghost</Text>
        <View style={{ flexDirection: 'row', gap: 16 }}>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <IconButton variant="ghost" color="secondary" onPress={fn()}>
              <Settings />
            </IconButton>
            <Text style={{ fontSize: 11, color: '#64748b' }}>Normal</Text>
          </View>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <IconButton variant="ghost" color="secondary" disabled onPress={fn()}>
              <Settings />
            </IconButton>
            <Text style={{ fontSize: 11, color: '#64748b' }}>Disabled</Text>
          </View>
        </View>
      </View>

      {/* Solid States */}
      <View>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#94a3b8', marginBottom: 12 }}>Solid</Text>
        <View style={{ flexDirection: 'row', gap: 16 }}>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <IconButton variant="solid" color="primary" onPress={fn()}>
              <Send />
            </IconButton>
            <Text style={{ fontSize: 11, color: '#64748b' }}>Normal</Text>
          </View>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <IconButton variant="solid" color="primary" disabled onPress={fn()}>
              <Send />
            </IconButton>
            <Text style={{ fontSize: 11, color: '#64748b' }}>Disabled</Text>
          </View>
        </View>
      </View>

      {/* Outlined States */}
      <View>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#94a3b8', marginBottom: 12 }}>Outlined</Text>
        <View style={{ flexDirection: 'row', gap: 16 }}>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <IconButton variant="outlined" color="secondary" onPress={fn()}>
              <RefreshCw />
            </IconButton>
            <Text style={{ fontSize: 11, color: '#64748b' }}>Normal</Text>
          </View>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <IconButton variant="outlined" color="secondary" disabled onPress={fn()}>
              <RefreshCw />
            </IconButton>
            <Text style={{ fontSize: 11, color: '#64748b' }}>Disabled</Text>
          </View>
        </View>
      </View>
    </View>
  ),
};

// 6. FloatingActionButton
export const FloatingActionButton: Story = {
  render: () => (
    <View style={{
      width: 320,
      height: 480,
      backgroundColor: '#fff',
      borderRadius: 16,
      position: 'relative',
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    }}>
      <Text style={{ fontSize: 18, fontWeight: '700', color: '#1e293b', marginBottom: 8 }}>
        거래 내역
      </Text>
      <Text style={{ fontSize: 14, color: '#64748b', lineHeight: 20 }}>
        최근 암호화폐 거래 목록을 확인하고{'\n'}새로운 거래를 추가할 수 있습니다.
      </Text>

      {/* FAB positioned at bottom-right */}
      <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
        <IconButton
          variant="solid"
          color="primary"
          size="large"
          accessibilityLabel="새 거래 추가"
          onPress={fn()}
        >
          <Plus />
        </IconButton>
      </View>
    </View>
  ),
};

// 7. HeaderActions
export const HeaderActions: Story = {
  render: () => (
    <View style={{ width: 320 }}>
      {/* Navigation Header */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      }}>
        <IconButton variant="ghost" color="secondary" onPress={fn()}>
          <ArrowLeft />
        </IconButton>

        <Text style={{ fontSize: 16, fontWeight: '600', color: '#1e293b' }}>
          지갑 설정
        </Text>

        <View style={{ flexDirection: 'row', gap: 8 }}>
          <IconButton variant="ghost" color="secondary" onPress={fn()}>
            <Bell />
          </IconButton>
          <IconButton variant="ghost" color="secondary" onPress={fn()}>
            <Settings />
          </IconButton>
        </View>
      </View>
    </View>
  ),
};

// 8. OverlayButton
export const OverlayButton: Story = {
  render: () => (
    <View style={{
      width: 320,
      height: 240,
      backgroundColor: '#334155',
      borderRadius: 16,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Mock image background */}
      <View style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#475569',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Text style={{ fontSize: 14, color: '#94a3b8' }}>NFT Artwork</Text>
      </View>

      {/* Overlay buttons */}
      <View style={{
        position: 'absolute',
        top: 12,
        right: 12,
        flexDirection: 'row',
        gap: 8,
      }}>
        <IconButton
          variant="solid"
          backgroundColor="rgba(0, 0, 0, 0.6)"
          iconColor="#ffffff"
          onPress={fn()}
        >
          <Share2 />
        </IconButton>
        <IconButton
          variant="solid"
          backgroundColor="rgba(0, 0, 0, 0.6)"
          iconColor="#ffffff"
          onPress={fn()}
        >
          <Bookmark />
        </IconButton>
      </View>

      <View style={{
        position: 'absolute',
        bottom: 12,
        right: 12,
      }}>
        <IconButton
          variant="solid"
          backgroundColor="rgba(0, 0, 0, 0.6)"
          iconColor="#ffffff"
          size="large"
          onPress={fn()}
        >
          <Play />
        </IconButton>
      </View>
    </View>
  ),
};

// 9. ConditionalButton
export const ConditionalButton: Story = {
  render: () => {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    return (
      <View style={{ gap: 24 }}>
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#64748b', textAlign: 'center' }}>
          버튼을 눌러 상태를 토글해보세요
        </Text>

        <View style={{ flexDirection: 'row', gap: 20, justifyContent: 'center' }}>
          {/* Bookmark Toggle */}
          <View style={{ alignItems: 'center', gap: 12 }}>
            <IconButton
              variant="solid"
              color={isBookmarked ? 'primary' : 'secondary'}
              onPress={() => setIsBookmarked(!isBookmarked)}
            >
              <Bookmark />
            </IconButton>
            <Text style={{ fontSize: 12, color: '#64748b' }}>
              {isBookmarked ? '북마크됨' : '북마크'}
            </Text>
          </View>

          {/* Like Toggle */}
          <View style={{ alignItems: 'center', gap: 12 }}>
            <IconButton
              variant="solid"
              color={isLiked ? 'danger' : 'secondary'}
              onPress={() => setIsLiked(!isLiked)}
            >
              <Heart />
            </IconButton>
            <Text style={{ fontSize: 12, color: '#64748b' }}>
              {isLiked ? '좋아요' : '안좋아요'}
            </Text>
          </View>
        </View>
      </View>
    );
  },
};

// 10. CustomizeExample
export const CustomizeExample: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <Text style={{ fontSize: 14, fontWeight: '600', color: '#64748b', textAlign: 'center' }}>
        커스텀 색상으로 브랜드 아이덴티티 표현
      </Text>

      <View style={{ flexDirection: 'row', gap: 16, justifyContent: 'center' }}>
        {/* Gold */}
        <View style={{ alignItems: 'center', gap: 8 }}>
          <IconButton
            variant="solid"
            backgroundColor="#f59e0b"
            iconColor="#ffffff"
            onPress={fn()}
          >
            <Wallet />
          </IconButton>
          <Text style={{ fontSize: 11, color: '#64748b' }}>Gold Tier</Text>
        </View>

        {/* Purple */}
        <View style={{ alignItems: 'center', gap: 8 }}>
          <IconButton
            variant="solid"
            backgroundColor="#8b5cf6"
            iconColor="#ffffff"
            onPress={fn()}
          >
            <Wallet />
          </IconButton>
          <Text style={{ fontSize: 11, color: '#64748b' }}>Purple Tier</Text>
        </View>

        {/* Teal */}
        <View style={{ alignItems: 'center', gap: 8 }}>
          <IconButton
            variant="solid"
            backgroundColor="#14b8a6"
            iconColor="#ffffff"
            onPress={fn()}
          >
            <Wallet />
          </IconButton>
          <Text style={{ fontSize: 11, color: '#64748b' }}>Teal Tier</Text>
        </View>
      </View>

      {/* Custom Outlined */}
      <View style={{ gap: 12 }}>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#94a3b8', textAlign: 'center' }}>
          Outlined + Custom Colors
        </Text>
        <View style={{ flexDirection: 'row', gap: 16, justifyContent: 'center' }}>
          <IconButton
            variant="outlined"
            borderColor="#f59e0b"
            iconColor="#f59e0b"
            backgroundColor="#fffbeb"
            onPress={fn()}
          >
            <Send />
          </IconButton>
          <IconButton
            variant="outlined"
            borderColor="#8b5cf6"
            iconColor="#8b5cf6"
            backgroundColor="#faf5ff"
            onPress={fn()}
          >
            <Send />
          </IconButton>
          <IconButton
            variant="outlined"
            borderColor="#14b8a6"
            iconColor="#14b8a6"
            backgroundColor="#f0fdfa"
            onPress={fn()}
          >
            <Send />
          </IconButton>
        </View>
      </View>
    </View>
  ),
};
