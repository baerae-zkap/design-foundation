import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomNavigation } from '@baerae-zkap/design-system/native';
import { Home, Search, Bell, User, Settings } from 'lucide-react-native';

const meta: Meta<typeof BottomNavigation> = {
  title: '@baerae-zkap/Navigations/BottomNavigation',
  component: BottomNavigation,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    items: { table: { disable: true } },
    selectedIndex: { table: { disable: true } },
    onSelect: { table: { disable: true } },
    style: { table: { disable: true } },
    testID: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof BottomNavigation>;

/**
 * 기본 4개 탭 구성
 */
export const Default: Story = {
  render: () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
      <View style={styles.container}>
        <View style={styles.content} />
        <BottomNavigation
          items={[
            {
              label: '홈',
              icon: <Home size={24} />,
              activeIcon: <Home size={24} />,
            },
            {
              label: '검색',
              icon: <Search size={24} />,
              activeIcon: <Search size={24} />,
            },
            {
              label: '알림',
              icon: <Bell size={24} />,
              activeIcon: <Bell size={24} />,
            },
            {
              label: '프로필',
              icon: <User size={24} />,
              activeIcon: <User size={24} />,
            },
          ]}
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
        />
      </View>
    );
  },
};

/**
 * 뱃지 표시 (점, 숫자, 99+ 표시)
 */
export const WithBadges: Story = {
  render: () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
      <View style={styles.container}>
        <View style={styles.content} />
        <BottomNavigation
          items={[
            {
              label: '홈',
              icon: <Home size={24} />,
              activeIcon: <Home size={24} />,
              badge: true, // 점 뱃지
            },
            {
              label: '검색',
              icon: <Search size={24} />,
              activeIcon: <Search size={24} />,
            },
            {
              label: '알림',
              icon: <Bell size={24} />,
              activeIcon: <Bell size={24} />,
              badge: 5, // 숫자 뱃지
            },
            {
              label: '프로필',
              icon: <User size={24} />,
              activeIcon: <User size={24} />,
              badge: 150, // 99+ 표시
            },
          ]}
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
        />
      </View>
    );
  },
};

/**
 * 5개 탭 (최대 권장)
 */
export const FiveItems: Story = {
  render: () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
      <View style={styles.container}>
        <View style={styles.content} />
        <BottomNavigation
          items={[
            {
              label: '홈',
              icon: <Home size={24} />,
              activeIcon: <Home size={24} />,
            },
            {
              label: '검색',
              icon: <Search size={24} />,
              activeIcon: <Search size={24} />,
            },
            {
              label: '알림',
              icon: <Bell size={24} />,
              activeIcon: <Bell size={24} />,
            },
            {
              label: '설정',
              icon: <Settings size={24} />,
              activeIcon: <Settings size={24} />,
            },
            {
              label: '프로필',
              icon: <User size={24} />,
              activeIcon: <User size={24} />,
            },
          ]}
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
        />
      </View>
    );
  },
};

/**
 * 3개 탭 (최소 권장)
 */
export const ThreeItems: Story = {
  render: () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
      <View style={styles.container}>
        <View style={styles.content} />
        <BottomNavigation
          items={[
            {
              label: '홈',
              icon: <Home size={24} />,
              activeIcon: <Home size={24} />,
            },
            {
              label: '검색',
              icon: <Search size={24} />,
              activeIcon: <Search size={24} />,
            },
            {
              label: '프로필',
              icon: <User size={24} />,
              activeIcon: <User size={24} />,
            },
          ]}
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
        />
      </View>
    );
  },
};

/**
 * 비활성화된 탭 포함
 */
export const WithDisabledItem: Story = {
  render: () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
      <View style={styles.container}>
        <View style={styles.content} />
        <BottomNavigation
          items={[
            {
              label: '홈',
              icon: <Home size={24} />,
              activeIcon: <Home size={24} />,
            },
            {
              label: '검색',
              icon: <Search size={24} />,
              activeIcon: <Search size={24} />,
              disabled: true,
            },
            {
              label: '알림',
              icon: <Bell size={24} />,
              activeIcon: <Bell size={24} />,
            },
            {
              label: '프로필',
              icon: <User size={24} />,
              activeIcon: <User size={24} />,
            },
          ]}
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
        />
      </View>
    );
  },
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
});
