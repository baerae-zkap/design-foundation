import React from 'react';
import { PushBadge } from '@baerae-zkap/design-system/native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View, Text, StyleSheet } from 'react-native';
import { Bell, Home, MessageCircle, MoreHorizontal } from 'lucide-react';

const meta = {
  title: '@baerae-zkap/Feedback/Push badge',
  component: PushBadge,
  argTypes: {
    mode: {
      control: 'radio',
      options: ['dot', 'number'],
      description: '배지 모드',
    },
    count: {
      control: { type: 'number' },
      description: '표시할 숫자 (number 모드)',
      if: { arg: 'mode', eq: 'number' },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '점 배지 크기 (dot 모드)',
      if: { arg: 'mode', eq: 'dot' },
    },
    color: {
      control: 'select',
      options: ['danger', 'primary', 'success'],
      description: '색상 프리셋',
    },
    maxCount: {
      control: { type: 'number' },
      description: '최대 표시 숫자 (초과 시 99+)',
      if: { arg: 'mode', eq: 'number' },
    },
    backgroundColor: { table: { disable: true } },
    typographyColor: { table: { disable: true } },
    offset: { table: { disable: true } },
  },
  args: {
    mode: 'dot' as any,
    count: 5,
    size: 'medium',
    color: 'danger',
    maxCount: 99,
  },
  decorators: [
    (Story) => (
      <View style={styles.decorator}>
        <Story />
      </View>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof PushBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

const styles = StyleSheet.create({
  decorator: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    flexWrap: 'wrap',
  },
  column: {
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
  },
  section: {
    marginBottom: 32,
    gap: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  iconContainer: {
    position: 'relative',
    padding: 12,
  },
  icon: {
    color: '#666',
  },
  badgePosition: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    gap: 24,
  },
  tabItem: {
    alignItems: 'center',
    gap: 4,
    position: 'relative',
  },
  tabText: {
    fontSize: 14,
    color: '#333',
  },
  tabBadgePosition: {
    position: 'absolute',
    top: -6,
    right: -6,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e0e0e0',
  },
  avatarBadgePosition: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});

// 기본 (mode로 dot/number 전환, 아이콘과 함께 표시)
export const Default: Story = {
  render: (args: any) => (
    <View style={{ alignItems: 'center', gap: 32 }}>
      {/* 배지 단독 (확대 영역) */}
      <View style={{ alignItems: 'center', gap: 12 }}>
        <View style={{
          width: 60,
          height: 60,
          borderRadius: 12,
          backgroundColor: '#f1f5f9',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {args.mode === 'number' ? (
            <PushBadge count={args.count} color={args.color} maxCount={args.maxCount} />
          ) : (
            <PushBadge size={args.size} color={args.color} />
          )}
        </View>
        <Text style={{ fontSize: 13, color: '#94a3b8' }}>
          {args.mode === 'number' ? 'Number Badge' : 'Dot Badge'}
        </Text>
      </View>

      {/* 아이콘에 배치된 모습 */}
      <View style={{ alignItems: 'center', gap: 12 }}>
        <View style={{ position: 'relative', padding: 8 }}>
          <Bell size={28} color="#334155" />
          <View style={{ position: 'absolute', top: 4, right: 4 }}>
            {args.mode === 'number' ? (
              <PushBadge count={args.count} color={args.color} maxCount={args.maxCount} />
            ) : (
              <PushBadge size={args.size} color={args.color} />
            )}
          </View>
        </View>
        <Text style={{ fontSize: 13, color: '#94a3b8' }}>아이콘에 배치</Text>
      </View>
    </View>
  ),
};

export const Variants: Story = {
  render: () => (
    <View style={styles.section}>
      <View style={styles.row}>
        <Text style={styles.sectionTitle}>점 배지</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <PushBadge size="small" color="danger" />
          <Text style={styles.label}>Small</Text>
        </View>
        <View style={styles.column}>
          <PushBadge size="medium" color="danger" />
          <Text style={styles.label}>Medium</Text>
        </View>
        <View style={styles.column}>
          <PushBadge size="large" color="danger" />
          <Text style={styles.label}>Large</Text>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={styles.sectionTitle}>숫자 배지</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <PushBadge count={3} color="danger" />
          <Text style={styles.label}>한 자리</Text>
        </View>
        <View style={styles.column}>
          <PushBadge count={12} color="danger" />
          <Text style={styles.label}>두 자리</Text>
        </View>
        <View style={styles.column}>
          <PushBadge count={100} maxCount={99} color="danger" />
          <Text style={styles.label}>최대값 초과</Text>
        </View>
      </View>
    </View>
  ),
};

export const Colors: Story = {
  render: () => (
    <View style={styles.section}>
      <View style={styles.row}>
        <Text style={styles.sectionTitle}>점 배지 색상</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <PushBadge color="danger" />
          <Text style={styles.label}>Danger</Text>
        </View>
        <View style={styles.column}>
          <PushBadge color="primary" />
          <Text style={styles.label}>Primary</Text>
        </View>
        <View style={styles.column}>
          <PushBadge color="success" />
          <Text style={styles.label}>Success</Text>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={styles.sectionTitle}>숫자 배지 색상</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <PushBadge count={5} color="danger" />
          <Text style={styles.label}>Danger</Text>
        </View>
        <View style={styles.column}>
          <PushBadge count={5} color="primary" />
          <Text style={styles.label}>Primary</Text>
        </View>
        <View style={styles.column}>
          <PushBadge count={5} color="success" />
          <Text style={styles.label}>Success</Text>
        </View>
      </View>
    </View>
  ),
};

export const IndicatingCount: Story = {
  render: () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>숫자 증가 표시</Text>
      <View style={styles.row}>
        <View style={styles.column}>
          <PushBadge count={1} color="danger" />
          <Text style={styles.label}>1</Text>
        </View>
        <View style={styles.column}>
          <PushBadge count={5} color="danger" />
          <Text style={styles.label}>5</Text>
        </View>
        <View style={styles.column}>
          <PushBadge count={12} color="danger" />
          <Text style={styles.label}>12</Text>
        </View>
        <View style={styles.column}>
          <PushBadge count={50} color="danger" />
          <Text style={styles.label}>50</Text>
        </View>
        <View style={styles.column}>
          <PushBadge count={99} color="danger" />
          <Text style={styles.label}>99</Text>
        </View>
        <View style={styles.column}>
          <PushBadge count={100} maxCount={99} color="danger" />
          <Text style={styles.label}>100 (99+)</Text>
        </View>
      </View>
    </View>
  ),
};

export const WithNotification: Story = {
  name: 'Usage: Notification',
  render: () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>알림 아이콘과 함께</Text>
      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <Bell size={24} style={styles.icon} />
          <View style={styles.badgePosition}>
            <PushBadge color="danger" />
          </View>
        </View>
        <View style={styles.iconContainer}>
          <Bell size={24} style={styles.icon} />
          <View style={styles.badgePosition}>
            <PushBadge count={3} color="danger" />
          </View>
        </View>
        <View style={styles.iconContainer}>
          <Bell size={24} style={styles.icon} />
          <View style={styles.badgePosition}>
            <PushBadge count={12} color="danger" />
          </View>
        </View>
      </View>
    </View>
  ),
};

export const WithTab: Story = {
  name: 'Usage: Tab',
  render: () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>탭 아이템에 적용</Text>
      <View style={styles.tabContainer}>
        <View style={styles.tabItem}>
          <Home size={24} style={styles.icon} />
          <Text style={styles.tabText}>홈</Text>
        </View>
        <View style={styles.tabItem}>
          <Bell size={24} style={styles.icon} />
          <View style={styles.tabBadgePosition}>
            <PushBadge count={3} color="danger" size="small" />
          </View>
          <Text style={styles.tabText}>알림</Text>
        </View>
        <View style={styles.tabItem}>
          <MessageCircle size={24} style={styles.icon} />
          <View style={styles.tabBadgePosition}>
            <PushBadge count={12} color="primary" size="small" />
          </View>
          <Text style={styles.tabText}>메시지</Text>
        </View>
        <View style={styles.tabItem}>
          <MoreHorizontal size={24} style={styles.icon} />
          <Text style={styles.tabText}>더보기</Text>
        </View>
      </View>
    </View>
  ),
};

export const WithAvatar: Story = {
  name: 'Usage: With avatar',
  render: () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>아바타 온라인 상태</Text>
      <View style={styles.row}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar} />
          <View style={styles.avatarBadgePosition}>
            <PushBadge color="success" size="small" />
          </View>
        </View>
      </View>
    </View>
  ),
};

export const Customize: Story = {
  render: () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>커스텀 색상</Text>
      <View style={styles.row}>
        <View style={styles.column}>
          <PushBadge
            count={5}
            backgroundColor="#9333ea"
            typographyColor="#ffffff"
          />
          <Text style={styles.label}>Purple</Text>
        </View>
        <View style={styles.column}>
          <PushBadge
            count={8}
            backgroundColor="#f97316"
            typographyColor="#ffffff"
          />
          <Text style={styles.label}>Orange</Text>
        </View>
        <View style={styles.column}>
          <PushBadge
            count={12}
            backgroundColor="#06b6d4"
            typographyColor="#ffffff"
          />
          <Text style={styles.label}>Cyan</Text>
        </View>
        <View style={styles.column}>
          <PushBadge
            backgroundColor="#9333ea"
            typographyColor="#ffffff"
          />
          <Text style={styles.label}>Purple Dot</Text>
        </View>
      </View>
    </View>
  ),
};
