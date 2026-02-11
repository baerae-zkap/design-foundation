import { Chip } from '@baerae-zkap/design-system/native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View, Text } from 'react-native';
import { fn } from 'storybook/test';
import { useState } from 'react';
import { Star, TrendingUp, Zap, Shield, Coins, Wallet, Tag } from 'lucide-react-native';

/**
 * Chip 컴포넌트 - 자산 관리 및 선택을 위한 인터랙티브 칩
 *
 * - **variant**: solid(채움) / outlined(테두리)
 * - **color**: primary / secondary / success / danger
 * - **size**: small(30) / medium(34) / large(38)
 * - **selected**: 선택 상태 표시
 * - **disabled**: 비활성화 상태
 * - **leadingIcon**: 선행 아이콘 (좌측)
 * - **avatar**: 아바타 이미지
 * - **onClose**: 닫기 버튼 핸들러
 * - **contentColor**: 커스텀 텍스트/아이콘 색상
 * - **backgroundColor**: 커스텀 배경색
 * - **activeColor**: 커스텀 선택 배경색
 */
const meta = {
  title: '@baerae-zkap/Actions/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Hidden: non-interactive / state-managed / internal props
    onPress: { table: { disable: true } },
    onClose: { table: { disable: true } },
    leadingIcon: { table: { disable: true } },
    avatar: { table: { disable: true } },
    contentColor: { table: { disable: true } },
    backgroundColor: { table: { disable: true } },
    activeColor: { table: { disable: true } },
    style: { table: { disable: true } },
    testID: { table: { disable: true } },
    accessibilityLabel: { table: { disable: true } },
    // Visible interactive controls
    variant: {
      control: 'inline-radio',
      options: ['solid', 'outlined'],
      description: '칩 스타일',
    },
    color: {
      control: 'inline-radio',
      options: ['primary', 'secondary', 'success', 'danger'],
      description: '색상 테마',
    },
    size: {
      control: 'inline-radio',
      options: ['small', 'medium', 'large'],
      description: '칩 크기',
    },
    selected: {
      control: 'boolean',
      description: '선택 상태',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화',
    },
    showLeadingIcon: {
      control: 'boolean',
      description: '선행 아이콘 표시',
    },
    showClose: {
      control: 'boolean',
      description: '닫기 버튼 표시',
    },
    children: {
      control: 'text',
      description: '칩 텍스트',
    },
  },
  args: {
    onPress: fn(),
    variant: 'solid',
    color: 'secondary',
    size: 'medium',
    selected: false,
    disabled: false,
    showLeadingIcon: false,
    showClose: false,
    children: 'BTC',
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
  render: ({ children, showLeadingIcon, showClose, ...args }) => (
    <Chip
      {...args}
      leadingIcon={showLeadingIcon ? <Coins size={16} color="currentColor" /> : undefined}
      onClose={showClose ? fn() : undefined}
    >
      {children}
    </Chip>
  ),
};

// 2. Variants - solid vs outlined
export const Variants: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View style={{ gap: 8 }}>
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#334155' }}>Solid (기본 상태)</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          <Chip variant="solid" color="primary" onPress={fn()}>BTC</Chip>
          <Chip variant="solid" color="secondary" onPress={fn()}>ETH</Chip>
          <Chip variant="solid" color="success" onPress={fn()}>USDT</Chip>
        </View>
      </View>

      <View style={{ gap: 8 }}>
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#334155' }}>Solid (선택 상태)</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          <Chip variant="solid" color="primary" selected onPress={fn()}>BTC</Chip>
          <Chip variant="solid" color="secondary" selected onPress={fn()}>ETH</Chip>
          <Chip variant="solid" color="success" selected onPress={fn()}>USDT</Chip>
        </View>
      </View>

      <View style={{ gap: 8 }}>
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#334155' }}>Outlined (기본 상태)</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          <Chip variant="outlined" color="primary" onPress={fn()}>BTC</Chip>
          <Chip variant="outlined" color="secondary" onPress={fn()}>ETH</Chip>
          <Chip variant="outlined" color="success" onPress={fn()}>USDT</Chip>
        </View>
      </View>

      <View style={{ gap: 8 }}>
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#334155' }}>Outlined (선택 상태)</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          <Chip variant="outlined" color="primary" selected onPress={fn()}>BTC</Chip>
          <Chip variant="outlined" color="secondary" selected onPress={fn()}>ETH</Chip>
          <Chip variant="outlined" color="success" selected onPress={fn()}>USDT</Chip>
        </View>
      </View>
    </View>
  ),
};

// 3. Colors - All 4 colors
export const Colors: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <View style={{ width: 80 }}>
          <Text style={{ fontSize: 12, color: '#64748b' }}>Primary</Text>
        </View>
        <Chip variant="solid" color="primary" onPress={fn()}>주요 자산</Chip>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <View style={{ width: 80 }}>
          <Text style={{ fontSize: 12, color: '#64748b' }}>Secondary</Text>
        </View>
        <Chip variant="solid" color="secondary" onPress={fn()}>일반</Chip>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <View style={{ width: 80 }}>
          <Text style={{ fontSize: 12, color: '#64748b' }}>Success</Text>
        </View>
        <Chip variant="solid" color="success" onPress={fn()}>수익중</Chip>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <View style={{ width: 80 }}>
          <Text style={{ fontSize: 12, color: '#64748b' }}>Danger</Text>
        </View>
        <Chip variant="solid" color="danger" onPress={fn()}>위험</Chip>
      </View>
    </View>
  ),
};

// 4. Sizes - small(30), medium(34), large(38)
export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Chip size="small" color="primary" onPress={fn()}>BTC</Chip>
        <Text style={{ fontSize: 12, color: '#64748b' }}>Small (30px)</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Chip size="medium" color="primary" onPress={fn()}>BTC</Chip>
        <Text style={{ fontSize: 12, color: '#64748b' }}>Medium (34px)</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Chip size="large" color="primary" onPress={fn()}>BTC</Chip>
        <Text style={{ fontSize: 12, color: '#64748b' }}>Large (38px)</Text>
      </View>
    </View>
  ),
};

// 5. States - Normal, Selected, Disabled, With Close
export const States: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <View style={{ width: 80 }}>
          <Text style={{ fontSize: 12, color: '#64748b' }}>Normal</Text>
        </View>
        <Chip color="primary" onPress={fn()}>BTC</Chip>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <View style={{ width: 80 }}>
          <Text style={{ fontSize: 12, color: '#64748b' }}>Selected</Text>
        </View>
        <Chip color="primary" selected onPress={fn()}>BTC</Chip>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <View style={{ width: 80 }}>
          <Text style={{ fontSize: 12, color: '#64748b' }}>Disabled</Text>
        </View>
        <Chip color="primary" disabled onPress={fn()}>BTC</Chip>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <View style={{ width: 80 }}>
          <Text style={{ fontSize: 12, color: '#64748b' }}>With Close</Text>
        </View>
        <Chip color="primary" onClose={fn()}>BTC</Chip>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <View style={{ width: 80 }}>
          <Text style={{ fontSize: 12, color: '#64748b' }}>With Icon</Text>
        </View>
        <Chip
          color="primary"
          leadingIcon={<Star size={16} color="currentColor" />}
          onPress={fn()}
        >
          BTC
        </Chip>
      </View>
    </View>
  ),
};

// 6. ChipGroup - Interactive multi-select filter
export const ChipGroup: Story = {
  render: function Render() {
    const [selected, setSelected] = useState<string[]>(['비트코인']);
    const categories = ['비트코인', 'DeFi', 'NFT', '레이어2', '스테이블코인'];

    const toggle = (category: string) => {
      setSelected(prev =>
        prev.includes(category)
          ? prev.filter(c => c !== category)
          : [...prev, category]
      );
    };

    return (
      <View style={{ gap: 16 }}>
        <View>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#334155', marginBottom: 4 }}>
            자산 카테고리 필터
          </Text>
          <Text style={{ fontSize: 12, color: '#64748b', marginBottom: 12 }}>
            관심있는 카테고리를 선택하세요
          </Text>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {categories.map(category => (
            <Chip
              key={category}
              variant="outlined"
              color="primary"
              selected={selected.includes(category)}
              onPress={() => toggle(category)}
              leadingIcon={
                category === '비트코인' ? <Coins size={16} color="currentColor" /> :
                category === 'DeFi' ? <TrendingUp size={16} color="currentColor" /> :
                category === 'NFT' ? <Star size={16} color="currentColor" /> :
                category === '레이어2' ? <Zap size={16} color="currentColor" /> :
                <Shield size={16} color="currentColor" />
              }
            >
              {category}
            </Chip>
          ))}
        </View>
        <View style={{
          padding: 12,
          backgroundColor: '#f1f5f9',
          borderRadius: 8,
          borderLeftWidth: 3,
          borderLeftColor: '#2563eb',
        }}>
          <Text style={{ fontSize: 13, color: '#475569', fontWeight: '500' }}>
            선택됨: {selected.length}개 ({selected.join(', ')})
          </Text>
        </View>
      </View>
    );
  },
};

// 7. RemovableTags - Dismissible tags with onClose
export const RemovableTags: Story = {
  render: function Render() {
    const [tokens, setTokens] = useState(['BTC', 'ETH', 'SOL', 'USDT', 'MATIC']);

    const remove = (token: string) => {
      setTokens(prev => prev.filter(t => t !== token));
    };

    return (
      <View style={{ gap: 16 }}>
        <View>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#334155', marginBottom: 4 }}>
            보유 자산
          </Text>
          <Text style={{ fontSize: 12, color: '#64748b', marginBottom: 12 }}>
            제거하려면 X 버튼을 누르세요
          </Text>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {tokens.map((token, index) => (
            <Chip
              key={token}
              variant="solid"
              color={index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'success' : 'secondary'}
              onClose={() => remove(token)}
              leadingIcon={<Wallet size={16} color="currentColor" />}
            >
              {token}
            </Chip>
          ))}
        </View>
        {tokens.length === 0 && (
          <View style={{
            padding: 16,
            backgroundColor: '#fef2f2',
            borderRadius: 8,
            alignItems: 'center',
          }}>
            <Text style={{ fontSize: 13, color: '#dc2626' }}>모든 자산이 제거되었습니다</Text>
          </View>
        )}
        {tokens.length > 0 && (
          <View style={{
            padding: 12,
            backgroundColor: '#f0fdf4',
            borderRadius: 8,
            borderLeftWidth: 3,
            borderLeftColor: '#22c55e',
          }}>
            <Text style={{ fontSize: 13, color: '#166534', fontWeight: '500' }}>
              총 {tokens.length}개 자산 보유중
            </Text>
          </View>
        )}
      </View>
    );
  },
};

// 8. Hierarchy - Montage hierarchy: Solid=Level.2 (high), Outlined=Level.1 (low)
export const Hierarchy: Story = {
  render: () => (
    <View style={{ gap: 20 }}>
      <View style={{ gap: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <View style={{
            paddingHorizontal: 8,
            paddingVertical: 2,
            backgroundColor: '#dbeafe',
            borderRadius: 4
          }}>
            <Text style={{ fontSize: 11, fontWeight: '600', color: '#1e40af' }}>Level.2</Text>
          </View>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#334155' }}>
            Solid - 높은 강조 (주요 선택)
          </Text>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          <Chip variant="solid" color="primary" selected onPress={fn()}>
            주요 자산
          </Chip>
          <Chip variant="solid" color="success" selected onPress={fn()}>
            수익 자산
          </Chip>
        </View>
        <Text style={{ fontSize: 12, color: '#64748b', lineHeight: 18 }}>
          사용자의 주요 선택이나 활성 필터를 나타냅니다. 시각적 강조도가 높아 즉시 주목을 끕니다.
        </Text>
      </View>

      <View style={{ gap: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <View style={{
            paddingHorizontal: 8,
            paddingVertical: 2,
            backgroundColor: '#f1f5f9',
            borderRadius: 4
          }}>
            <Text style={{ fontSize: 11, fontWeight: '600', color: '#64748b' }}>Level.1</Text>
          </View>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#334155' }}>
            Outlined - 낮은 강조 (보조 선택)
          </Text>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          <Chip variant="outlined" color="secondary" onPress={fn()}>
            전체
          </Chip>
          <Chip variant="outlined" color="secondary" onPress={fn()}>
            NFT
          </Chip>
          <Chip variant="outlined" color="secondary" onPress={fn()}>
            DeFi
          </Chip>
        </View>
        <Text style={{ fontSize: 12, color: '#64748b', lineHeight: 18 }}>
          보조 필터나 옵션을 나타냅니다. 화면을 압도하지 않으면서도 선택 가능한 상태를 명확히 전달합니다.
        </Text>
      </View>

      <View style={{
        padding: 16,
        backgroundColor: '#fffbeb',
        borderRadius: 8,
        borderLeftWidth: 3,
        borderLeftColor: '#f59e0b',
      }}>
        <Text style={{ fontSize: 13, color: '#92400e', lineHeight: 20 }}>
          💡 <Text style={{ fontWeight: '600' }}>디자인 팁:</Text> Solid는 주요 액션이나 선택된 상태에,
          Outlined는 다중 선택이 가능한 필터 그룹에 사용하세요.
        </Text>
      </View>
    </View>
  ),
};

// 9. SelectChip - Used inside Select component
export const SelectChip: Story = {
  render: function Render() {
    const [selectedTokens, setSelectedTokens] = useState(['BTC', 'ETH']);
    const availableTokens = ['BTC', 'ETH', 'SOL', 'USDT', 'MATIC', 'AVAX'];

    const toggleToken = (token: string) => {
      setSelectedTokens(prev =>
        prev.includes(token)
          ? prev.filter(t => t !== token)
          : [...prev, token]
      );
    };

    const removeToken = (token: string) => {
      setSelectedTokens(prev => prev.filter(t => t !== token));
    };

    return (
      <View style={{ gap: 16 }}>
        <View>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#334155', marginBottom: 4 }}>
            거래 가능 토큰 선택
          </Text>
          <Text style={{ fontSize: 12, color: '#64748b', marginBottom: 12 }}>
            Select 컴포넌트 내부에서 선택된 값을 Chip으로 표시합니다
          </Text>
        </View>

        {/* 선택된 토큰 영역 */}
        <View style={{
          padding: 16,
          backgroundColor: 'white',
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#e2e8f0',
        }}>
          <Text style={{ fontSize: 13, fontWeight: '600', color: '#64748b', marginBottom: 8 }}>
            선택된 토큰 ({selectedTokens.length})
          </Text>
          {selectedTokens.length > 0 ? (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {selectedTokens.map(token => (
                <Chip
                  key={token}
                  variant="solid"
                  color="primary"
                  size="small"
                  onClose={() => removeToken(token)}
                  leadingIcon={<Tag size={14} color="currentColor" />}
                >
                  {token}
                </Chip>
              ))}
            </View>
          ) : (
            <Text style={{ fontSize: 12, color: '#94a3b8', fontStyle: 'italic' }}>
              선택된 토큰이 없습니다
            </Text>
          )}
        </View>

        {/* 선택 가능한 토큰 목록 */}
        <View>
          <Text style={{ fontSize: 13, fontWeight: '600', color: '#64748b', marginBottom: 8 }}>
            토큰 목록
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {availableTokens.map(token => (
              <Chip
                key={token}
                variant="outlined"
                color="secondary"
                selected={selectedTokens.includes(token)}
                onPress={() => toggleToken(token)}
                leadingIcon={<Coins size={16} color="currentColor" />}
              >
                {token}
              </Chip>
            ))}
          </View>
        </View>
      </View>
    );
  },
};

// 10. CustomizeExample - Custom colors
export const CustomizeExample: Story = {
  render: () => (
    <View style={{ gap: 20 }}>
      <View>
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#334155', marginBottom: 4 }}>
          커스텀 색상 조합
        </Text>
        <Text style={{ fontSize: 12, color: '#64748b', marginBottom: 12 }}>
          contentColor, backgroundColor, activeColor를 사용하여 브랜드 컬러를 적용할 수 있습니다
        </Text>
      </View>

      {/* 골드 테마 */}
      <View style={{ gap: 8 }}>
        <Text style={{ fontSize: 13, fontWeight: '600', color: '#78716c' }}>골드 프리미엄</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          <Chip
            variant="solid"
            contentColor="#92400e"
            backgroundColor="#fef3c7"
            activeColor="#fcd34d"
            onPress={fn()}
          >
            Gold Member
          </Chip>
          <Chip
            variant="solid"
            contentColor="#92400e"
            backgroundColor="#fef3c7"
            activeColor="#fcd34d"
            selected
            onPress={fn()}
          >
            Gold Member
          </Chip>
        </View>
      </View>

      {/* 퍼플 테마 */}
      <View style={{ gap: 8 }}>
        <Text style={{ fontSize: 13, fontWeight: '600', color: '#78716c' }}>VIP 전용</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          <Chip
            variant="solid"
            contentColor="#6b21a8"
            backgroundColor="#f3e8ff"
            activeColor="#c084fc"
            leadingIcon={<Star size={16} color="#6b21a8" />}
            onPress={fn()}
          >
            VIP Only
          </Chip>
          <Chip
            variant="solid"
            contentColor="#6b21a8"
            backgroundColor="#f3e8ff"
            activeColor="#c084fc"
            leadingIcon={<Star size={16} color="#6b21a8" />}
            selected
            onPress={fn()}
          >
            VIP Only
          </Chip>
        </View>
      </View>

      {/* 그라데이션 느낌 */}
      <View style={{ gap: 8 }}>
        <Text style={{ fontSize: 13, fontWeight: '600', color: '#78716c' }}>특별 혜택</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          <Chip
            variant="solid"
            contentColor="#be185d"
            backgroundColor="#fce7f3"
            activeColor="#f9a8d4"
            leadingIcon={<Zap size={16} color="#be185d" />}
            onPress={fn()}
          >
            Limited Offer
          </Chip>
          <Chip
            variant="solid"
            contentColor="#be185d"
            backgroundColor="#fce7f3"
            activeColor="#f9a8d4"
            leadingIcon={<Zap size={16} color="#be185d" />}
            selected
            onPress={fn()}
          >
            Limited Offer
          </Chip>
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
          💡 <Text style={{ fontWeight: '600' }}>팁:</Text> backgroundColor는 기본 상태,
          activeColor는 selected 상태의 배경색입니다. contentColor는 텍스트와 아이콘에 모두 적용됩니다.
        </Text>
      </View>
    </View>
  ),
};
