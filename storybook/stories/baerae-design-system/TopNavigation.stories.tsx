import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { TopNavigation } from '@baerae-zkap/design-system/native';
import { Bell, Search, MoreVertical } from 'lucide-react-native';

const meta: Meta<typeof TopNavigation> = {
  title: '@baerae-zkap/Navigations/TopNavigation',
  component: TopNavigation,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <View style={{ backgroundColor: '#fff', minHeight: 200 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['normal', 'display', 'search'],
      name: '변형',
      table: { disable: false },
    },
    title: { table: { disable: true } },
    leadingArea: { table: { disable: true } },
    trailingArea: { table: { disable: true } },
    onBackPress: { table: { disable: true } },
    onClosePress: { table: { disable: true } },
    leadingText: { table: { disable: true } },
    onLeadingPress: { table: { disable: true } },
    trailingText: { table: { disable: true } },
    onTrailingPress: { table: { disable: true } },
    searchPlaceholder: { table: { disable: true } },
    searchValue: { table: { disable: true } },
    onSearchChange: { table: { disable: true } },
    onSearchSubmit: { table: { disable: true } },
    toolbar: { table: { disable: true } },
    extraToolbar: { table: { disable: true } },
    borderVisible: { table: { disable: true } },
    style: { table: { disable: true } },
    testID: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof TopNavigation>;

/**
 * Default story with Montage-style Controls panel.
 * Use the Controls panel to interactively test different configurations.
 */
export const Default: Story = {
  argTypes: {
    variant: { control: 'select', options: ['normal', 'display', 'search'], name: '변형' },
    titleVisible: { control: 'boolean', name: '타이틀' },
    leadingButtonArea: { control: 'select', options: ['none', 'backButton', 'textButton'], name: '왼쪽 버튼 영역' },
    trailingButtonArea: { control: 'select', options: ['none', 'iconButton', 'textButton'], name: '오른쪽 버튼 영역' },
    toolbar: { control: 'boolean', name: '툴바' },
    extraToolbar: { control: 'boolean', name: '추가 툴바' },
  },
  args: {
    variant: 'normal',
    titleVisible: true,
    leadingButtonArea: 'backButton',
    trailingButtonArea: 'iconButton',
    toolbar: false,
    extraToolbar: false,
  },
  render: (args: any) => {
    const props: any = {
      variant: args.variant,
      title: args.titleVisible ? 'Title' : undefined,
      borderVisible: true,
    };

    // Leading area
    if (args.leadingButtonArea === 'backButton') {
      props.onBackPress = () => console.log('Back');
    } else if (args.leadingButtonArea === 'textButton') {
      props.leadingText = '취소';
      props.onLeadingPress = () => console.log('Leading');
    }

    // Trailing area
    if (args.trailingButtonArea === 'iconButton') {
      props.onClosePress = () => console.log('Close');
    } else if (args.trailingButtonArea === 'textButton') {
      props.trailingText = '완료';
      props.onTrailingPress = () => console.log('Trailing');
    }

    // Toolbar
    if (args.toolbar) {
      props.toolbar = (
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {['전체', '입금', '출금'].map((label) => (
            <View key={label} style={{ paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#f1f5f9', borderRadius: 16 }}>
              <Text style={{ fontSize: 13, color: '#666' }}>{label}</Text>
            </View>
          ))}
        </View>
      );
    }

    // Extra toolbar
    if (args.extraToolbar) {
      props.extraToolbar = (
        <View style={{ height: 40, backgroundColor: '#f8f9fa', borderRadius: 8, justifyContent: 'center', paddingHorizontal: 12 }}>
          <Text style={{ fontSize: 13, color: '#999' }}>추가 툴바 영역</Text>
        </View>
      );
    }

    // Search variant specific
    if (args.variant === 'search') {
      props.searchPlaceholder = '검색어를 입력하세요';
    }

    return <TopNavigation {...props} />;
  },
};

/**
 * 3가지 변형 비교: Normal, Display, Search
 */
export const Variants: Story = {
  render: () => (
    <View style={styles.stack}>
      <View style={styles.item}>
        <Text style={styles.label}>Normal</Text>
        <TopNavigation
          variant="normal"
          title="Normal Navigation"
          onBackPress={() => console.log('Back')}
          onClosePress={() => console.log('Close')}
          borderVisible
        />
      </View>

      <View style={styles.item}>
        <Text style={styles.label}>Display</Text>
        <TopNavigation
          variant="display"
          title="Display Navigation"
          onBackPress={() => console.log('Back')}
          borderVisible
        />
      </View>

      <View style={styles.item}>
        <Text style={styles.label}>Search</Text>
        <TopNavigation
          variant="search"
          searchPlaceholder="검색어를 입력하세요"
          onBackPress={() => console.log('Back')}
          borderVisible
        />
      </View>
    </View>
  ),
};

/**
 * Compare different leading button area options.
 */
export const LeadingButtonArea: Story = {
  render: () => (
    <View style={styles.stack}>
      <View style={styles.item}>
        <Text style={styles.label}>None</Text>
        <TopNavigation title="Title Only" borderVisible />
      </View>

      <View style={styles.item}>
        <Text style={styles.label}>Back Button</Text>
        <TopNavigation
          title="With Back Button"
          onBackPress={() => console.log('Back')}
          borderVisible
        />
      </View>

      <View style={styles.item}>
        <Text style={styles.label}>Text Button</Text>
        <TopNavigation
          title="With Text Button"
          leadingText="취소"
          onLeadingPress={() => console.log('Leading')}
          borderVisible
        />
      </View>
    </View>
  ),
};

/**
 * Compare different trailing button area options.
 */
export const TrailingButtonArea: Story = {
  render: () => (
    <View style={styles.stack}>
      <View style={styles.item}>
        <Text style={styles.label}>None</Text>
        <TopNavigation
          title="Title Only"
          onBackPress={() => console.log('Back')}
          borderVisible
        />
      </View>

      <View style={styles.item}>
        <Text style={styles.label}>Icon Button</Text>
        <TopNavigation
          title="With Icon Button"
          onBackPress={() => console.log('Back')}
          onClosePress={() => console.log('Close')}
          borderVisible
        />
      </View>

      <View style={styles.item}>
        <Text style={styles.label}>Text Button</Text>
        <TopNavigation
          title="With Text Button"
          onBackPress={() => console.log('Back')}
          trailingText="완료"
          onTrailingPress={() => console.log('Trailing')}
          borderVisible
        />
      </View>
    </View>
  ),
};

/**
 * Navigation with toolbar and extra toolbar.
 */
export const WithToolbar: Story = {
  render: () => (
    <View style={styles.stack}>
      <View style={styles.item}>
        <Text style={styles.label}>With Toolbar</Text>
        <TopNavigation
          variant="normal"
          title="거래 내역"
          onBackPress={() => console.log('Back')}
          toolbar={
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {['전체', '입금', '출금', '이체'].map((label) => (
                <View
                  key={label}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    backgroundColor: '#f1f5f9',
                    borderRadius: 16,
                  }}
                >
                  <Text style={{ fontSize: 13, color: '#666' }}>{label}</Text>
                </View>
              ))}
            </View>
          }
          borderVisible
        />
      </View>

      <View style={styles.item}>
        <Text style={styles.label}>With Toolbar + Extra Toolbar</Text>
        <TopNavigation
          variant="normal"
          title="거래 내역"
          onBackPress={() => console.log('Back')}
          toolbar={
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {['전체', '입금', '출금'].map((label) => (
                <View
                  key={label}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    backgroundColor: '#f1f5f9',
                    borderRadius: 16,
                  }}
                >
                  <Text style={{ fontSize: 13, color: '#666' }}>{label}</Text>
                </View>
              ))}
            </View>
          }
          extraToolbar={
            <View
              style={{
                height: 44,
                backgroundColor: '#f8f9fa',
                borderRadius: 8,
                justifyContent: 'center',
                paddingHorizontal: 12,
              }}
            >
              <Text style={{ fontSize: 13, color: '#999' }}>2024년 2월</Text>
            </View>
          }
          borderVisible
        />
      </View>
    </View>
  ),
};

/**
 * Search variant with interactive search input.
 */
export const SearchVariant: Story = {
  render: () => {
    const [searchValue, setSearchValue] = useState('');

    return (
      <View style={styles.stack}>
        <View style={styles.item}>
          <Text style={styles.label}>Search (Empty)</Text>
          <TopNavigation
            variant="search"
            searchPlaceholder="검색어를 입력하세요"
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            onSearchSubmit={() => console.log('Search:', searchValue)}
            onBackPress={() => console.log('Back')}
            borderVisible
          />
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>Search (With Value)</Text>
          <TopNavigation
            variant="search"
            searchPlaceholder="검색어를 입력하세요"
            searchValue="검색어"
            onSearchChange={() => {}}
            onSearchSubmit={() => console.log('Search')}
            onBackPress={() => console.log('Back')}
            borderVisible
          />
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>Search (With Trailing Button)</Text>
          <TopNavigation
            variant="search"
            searchPlaceholder="검색어를 입력하세요"
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            onSearchSubmit={() => console.log('Search:', searchValue)}
            onBackPress={() => console.log('Back')}
            trailingText="취소"
            onTrailingPress={() => console.log('Cancel')}
            borderVisible
          />
        </View>
      </View>
    );
  },
};

const styles = StyleSheet.create({
  stack: { gap: 24 },
  item: { gap: 8 },
  label: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    paddingHorizontal: 12,
  },
});
