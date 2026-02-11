import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SegmentedControl } from '@baerae-zkap/design-system/native';
import { LayoutGrid, List, Map, Sun, Moon } from 'lucide-react-native';

/**
 * Segmented Control
 *
 * 옵션들을 수평으로 나열한 버튼 그룹으로 한 번에 하나의 옵션만 선택합니다.
 * 선택된 항목은 시각적으로 강조되며, 같은 콘텐츠 영역 내에서
 * 보기 방식이나 필터를 변경할 때 사용됩니다.
 *
 * - **variant**: solid (채워진 인디케이터) / outlined (테두리 컨테이너)
 * - **size**: small(32px) / medium(36px) / large(42px)
 * - **alignment**: fixed (균등 분할) / fluid (콘텐츠 기반 + 스크롤)
 * - **fullWidth**: 전체 너비 사용 여부
 * - **API**: value/onChange(value) 기반 (Toss 스타일) + segments 배열 / compound 방식 지원
 *
 * Foundation 토큰:
 * - Container borderRadius: radius.component.segmentedControl.container (8px)
 * - Segment borderRadius: radius.component.segmentedControl.segment (6px)
 * - Container padding: spacing.component.segmentedControl.containerPadding (3px)
 * - Icon-text gap: spacing.component.segmentedControl.iconGap (8px)
 */
const meta: Meta<typeof SegmentedControl> = {
  title: '@baerae-zkap/Selection and input/Segmented control',
  component: SegmentedControl,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <View style={{ padding: 20, backgroundColor: '#fff' }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    segments: { table: { disable: true } },
    children: { table: { disable: true } },
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    onChange: { table: { disable: true } },
    selectedIndex: { table: { disable: true } },
    onIndexChange: { table: { disable: true } },
    variant: {
      control: 'select',
      options: ['solid', 'outlined'],
      name: 'Variant',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      name: 'Size',
    },
    alignment: {
      control: 'select',
      options: ['fixed', 'fluid'],
      name: 'Alignment',
    },
    fullWidth: {
      control: 'boolean',
      name: 'Full Width',
    },
    disabled: {
      control: 'boolean',
      name: 'Disabled',
    },
    testID: { table: { disable: true } },
    accessibilityLabel: { table: { disable: true } },
    style: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const styles = StyleSheet.create({
  stack: { gap: 24 },
  item: { gap: 8 },
  label: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: '#334155',
  },
  desc: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 8,
  },
});

// ─── Default (Controls) ──────────────────────────────────────────────

export const Default: Story = {
  args: {
    variant: 'solid',
    size: 'medium',
    fullWidth: false,
    disabled: false,
  },
  render: (args) => {
    const [value, setValue] = useState('all');
    return (
      <SegmentedControl
        {...args}
        segments={[
          { label: '전체', value: 'all' },
          { label: '진행중', value: 'progress' },
          { label: '완료', value: 'done' },
        ]}
        value={value}
        onChange={setValue}
      />
    );
  },
};

// ─── Variants ────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => {
    const [solidVal, setSolidVal] = useState('option1');
    const [outlinedVal, setOutlinedVal] = useState('option1');

    return (
      <View style={styles.stack}>
        <View style={styles.item}>
          <Text style={styles.label}>Solid</Text>
          <SegmentedControl
            variant="solid"
            segments={[
              { label: '옵션 1', value: 'option1' },
              { label: '옵션 2', value: 'option2' },
              { label: '옵션 3', value: 'option3' },
            ]}
            value={solidVal}
            onChange={setSolidVal}
          />
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Outlined</Text>
          <SegmentedControl
            variant="outlined"
            segments={[
              { label: '옵션 1', value: 'option1' },
              { label: '옵션 2', value: 'option2' },
              { label: '옵션 3', value: 'option3' },
            ]}
            value={outlinedVal}
            onChange={setOutlinedVal}
          />
        </View>
      </View>
    );
  },
};

// ─── Sizes ───────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => {
    const [small, setSmall] = useState('1');
    const [medium, setMedium] = useState('1');
    const [large, setLarge] = useState('1');

    const segs = [
      { label: 'Active', value: '1' },
      { label: 'Inactive', value: '2' },
      { label: 'Inactive', value: '3' },
    ];

    return (
      <View style={styles.stack}>
        <View style={styles.item}>
          <Text style={styles.label}>Small (32px)</Text>
          <SegmentedControl size="small" segments={segs} value={small} onChange={setSmall} />
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Medium (36px)</Text>
          <SegmentedControl size="medium" segments={segs} value={medium} onChange={setMedium} />
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Large (42px)</Text>
          <SegmentedControl size="large" segments={segs} value={large} onChange={setLarge} />
        </View>
      </View>
    );
  },
};

// ─── Segment Counts (Min/Max) ────────────────────────────────────────

export const SegmentCounts: Story = {
  render: () => {
    const [two, setTwo] = useState('1');
    const [three, setThree] = useState('1');
    const [four, setFour] = useState('1');
    const [six, setSix] = useState('1');

    return (
      <View style={styles.stack}>
        <View style={styles.item}>
          <Text style={styles.sectionTitle}>Min and Max</Text>
          <Text style={styles.desc}>Desktop: 최소 2개, 최대 6개 / Mobile: 최대 4개 권장</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>2개</Text>
          <SegmentedControl
            segments={[
              { label: '옵션 1', value: '1' },
              { label: '옵션 2', value: '2' },
            ]}
            value={two}
            onChange={setTwo}
          />
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>3개</Text>
          <SegmentedControl
            segments={[
              { label: '옵션 1', value: '1' },
              { label: '옵션 2', value: '2' },
              { label: '옵션 3', value: '3' },
            ]}
            value={three}
            onChange={setThree}
          />
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>4개 (Mobile 권장 최대)</Text>
          <SegmentedControl
            segments={[
              { label: '옵션 1', value: '1' },
              { label: '옵션 2', value: '2' },
              { label: '옵션 3', value: '3' },
              { label: '옵션 4', value: '4' },
            ]}
            value={four}
            onChange={setFour}
          />
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>6개 (Desktop 최대)</Text>
          <SegmentedControl
            segments={[
              { label: '1', value: '1' },
              { label: '2', value: '2' },
              { label: '3', value: '3' },
              { label: '4', value: '4' },
              { label: '5', value: '5' },
              { label: '6', value: '6' },
            ]}
            value={six}
            onChange={setSix}
          />
        </View>
      </View>
    );
  },
};

// ─── States ──────────────────────────────────────────────────────────

export const States: Story = {
  render: () => {
    const [normal, setNormal] = useState('all');
    const [segDisabled, setSegDisabled] = useState('all');
    const [allDisabled, setAllDisabled] = useState('all');

    const segs = [
      { label: '전체', value: 'all' },
      { label: '진행중', value: 'progress' },
      { label: '완료', value: 'done' },
    ];

    return (
      <View style={styles.stack}>
        <View style={styles.item}>
          <Text style={styles.label}>Normal</Text>
          <SegmentedControl segments={segs} value={normal} onChange={setNormal} />
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Individual Disabled Segment</Text>
          <SegmentedControl
            segments={[
              { label: '전체', value: 'all' },
              { label: '진행중', value: 'progress', disabled: true },
              { label: '완료', value: 'done' },
            ]}
            value={segDisabled}
            onChange={setSegDisabled}
          />
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>All Disabled</Text>
          <SegmentedControl segments={segs} value={allDisabled} onChange={setAllDisabled} disabled />
        </View>
      </View>
    );
  },
};

// ─── With Icons ──────────────────────────────────────────────────────

export const WithIcons: Story = {
  render: () => {
    const [iconLabel, setIconLabel] = useState('grid');
    const [iconOnly, setIconOnly] = useState('grid');

    return (
      <View style={styles.stack}>
        <View style={styles.item}>
          <Text style={styles.label}>아이콘 + 라벨</Text>
          <SegmentedControl
            variant="solid"
            segments={[
              { label: '그리드', value: 'grid', icon: <LayoutGrid size={16} /> },
              { label: '리스트', value: 'list', icon: <List size={16} /> },
              { label: '지도', value: 'map', icon: <Map size={16} /> },
            ]}
            value={iconLabel}
            onChange={setIconLabel}
          />
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>아이콘 전용</Text>
          <SegmentedControl
            variant="solid"
            segments={[
              { label: '', value: 'grid', icon: <LayoutGrid size={16} /> },
              { label: '', value: 'list', icon: <List size={16} /> },
              { label: '', value: 'map', icon: <Map size={16} /> },
            ]}
            value={iconOnly}
            onChange={setIconOnly}
          />
        </View>
      </View>
    );
  },
};

// ─── Full Width ──────────────────────────────────────────────────────

export const FullWidth: Story = {
  render: () => {
    const [value, setValue] = useState('day');
    return (
      <View style={{ width: '100%' }}>
        <SegmentedControl
          fullWidth
          segments={[
            { label: '일', value: 'day' },
            { label: '주', value: 'week' },
            { label: '월', value: 'month' },
            { label: '년', value: 'year' },
          ]}
          value={value}
          onChange={setValue}
        />
      </View>
    );
  },
};

// ─── Fixed vs Fluid ──────────────────────────────────────────────────

export const FixedVsFluid: Story = {
  render: () => {
    const [fixed, setFixed] = useState('1');
    const [fluid, setFluid] = useState('1');

    return (
      <View style={styles.stack}>
        <View style={styles.item}>
          <Text style={styles.sectionTitle}>Fixed (균등 분할)</Text>
          <Text style={styles.desc}>세그먼트 너비가 동일하게 분배됩니다.</Text>
          <SegmentedControl
            alignment="fixed"
            fullWidth
            segments={[
              { label: 'Short', value: '1' },
              { label: 'Medium Text', value: '2' },
              { label: 'Very Long Option', value: '3' },
            ]}
            value={fixed}
            onChange={setFixed}
          />
        </View>
        <View style={styles.item}>
          <Text style={styles.sectionTitle}>Fluid (콘텐츠 기반)</Text>
          <Text style={styles.desc}>세그먼트 너비가 콘텐츠에 맞춰 조정됩니다.</Text>
          <SegmentedControl
            alignment="fluid"
            segments={[
              { label: 'Short', value: '1' },
              { label: 'Medium Text', value: '2' },
              { label: 'Very Long Option', value: '3' },
            ]}
            value={fluid}
            onChange={setFluid}
          />
        </View>
      </View>
    );
  },
};

// ─── Fluid Mode (Scroll) ────────────────────────────────────────────

export const FluidMode: Story = {
  render: () => {
    const [value, setValue] = useState('all');

    return (
      <View style={styles.stack}>
        <View style={styles.item}>
          <Text style={styles.sectionTitle}>스크롤 되게 하기</Text>
          <Text style={styles.desc}>
            항목이 많으면 alignment="fluid"로 가로 스크롤이 생깁니다.
          </Text>
          <SegmentedControl
            alignment="fluid"
            segments={[
              { label: 'All', value: 'all' },
              { label: 'Technology', value: 'tech' },
              { label: 'Design', value: 'design' },
              { label: 'Business', value: 'business' },
              { label: 'Marketing', value: 'marketing' },
              { label: 'Finance', value: 'finance' },
              { label: 'Healthcare', value: 'healthcare' },
            ]}
            value={value}
            onChange={setValue}
          />
        </View>
      </View>
    );
  },
};

// ─── Compound Component API ──────────────────────────────────────────

export const CompoundAPI: Story = {
  render: () => {
    const [value, setValue] = useState('1');

    return (
      <View style={styles.stack}>
        <View style={styles.item}>
          <Text style={styles.sectionTitle}>Compound Component 방식</Text>
          <Text style={styles.desc}>
            SegmentedControl.Item으로 자식을 구성할 수 있습니다.
          </Text>
          <SegmentedControl value={value} onChange={setValue}>
            <SegmentedControl.Item value="1" label="아이템1" />
            <SegmentedControl.Item value="2" label="아이템2" />
            <SegmentedControl.Item value="3" label="아이템3" />
          </SegmentedControl>
        </View>
      </View>
    );
  },
};

// ─── Hierarchy (Montage) ─────────────────────────────────────────────

export const Hierarchy: Story = {
  render: () => {
    const [level2, setLevel2] = useState('list');
    const [level1, setLevel1] = useState('all');

    return (
      <View style={styles.stack}>
        <View style={styles.item}>
          <Text style={styles.sectionTitle}>Hierarchy</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Level.2 → 화면 전체에 대한 뷰 값을 컨트롤</Text>
          <SegmentedControl
            variant="solid"
            fullWidth
            size="large"
            segments={[
              { label: '리스트', value: 'list' },
              { label: '그리드', value: 'grid' },
            ]}
            value={level2}
            onChange={setLevel2}
          />
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Level.1 → 일정 영역에 대한 뷰 값을 컨트롤</Text>
          <SegmentedControl
            variant="solid"
            size="small"
            segments={[
              { label: '전체', value: 'all' },
              { label: '진행중', value: 'progress' },
            ]}
            value={level1}
            onChange={setLevel1}
          />
        </View>
      </View>
    );
  },
};

// ─── Usage Examples ──────────────────────────────────────────────────

export const UsageExamples: Story = {
  render: () => {
    const [view, setView] = useState('list');
    const [filter, setFilter] = useState('all');
    const [mode, setMode] = useState('light');

    return (
      <View style={styles.stack}>
        <View style={styles.item}>
          <Text style={styles.sectionTitle}>Conversion View</Text>
          <Text style={styles.desc}>
            뷰 스타일을 변경할 때 사용합니다.
          </Text>
          <SegmentedControl
            variant="solid"
            segments={[
              { label: '리스트', value: 'list', icon: <List size={16} /> },
              { label: '그리드', value: 'grid', icon: <LayoutGrid size={16} /> },
              { label: '지도', value: 'map', icon: <Map size={16} /> },
            ]}
            value={view}
            onChange={setView}
          />
        </View>
        <View style={styles.item}>
          <Text style={styles.sectionTitle}>Filter</Text>
          <Text style={styles.desc}>
            상태 필터, 정렬 옵션을 표현할 때 사용합니다.
          </Text>
          <SegmentedControl
            variant="outlined"
            fullWidth
            segments={[
              { label: '전체', value: 'all' },
              { label: '진행중', value: 'progress' },
              { label: '완료', value: 'done' },
            ]}
            value={filter}
            onChange={setFilter}
          />
        </View>
        <View style={styles.item}>
          <Text style={styles.sectionTitle}>Select Mode</Text>
          <Text style={styles.desc}>
            모드나 단위를 전환할 때 사용합니다.
          </Text>
          <SegmentedControl
            variant="solid"
            segments={[
              { label: 'Light', value: 'light', icon: <Sun size={16} /> },
              { label: 'Dark', value: 'dark', icon: <Moon size={16} /> },
            ]}
            value={mode}
            onChange={setMode}
          />
        </View>
      </View>
    );
  },
};
