import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckMark } from '@baerae-zkap/design-system/native';

/**
 * CheckMark 컴포넌트
 *
 * 동의, 선택, 확인 상태를 나타내는 체크마크 컴포넌트입니다.
 *
 * - **Size**: Small | Medium
 * - **Tight**: False (기본 12px 간격) | True (촘촘하게 8px 간격)
 * - **States**: Inactive/Active × Normal/Hovered/Pressed/Disabled
 */
const meta: Meta<typeof CheckMark> = {
  title: '@baerae-zkap/Selection and input/CheckMark',
  component: CheckMark,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <View style={{ backgroundColor: '#fff', padding: 24 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium'],
      name: '크기',
      table: { disable: false },
    },
    tight: {
      control: 'boolean',
      name: '촘촘하게',
      table: { disable: false },
    },
    checked: {
      control: 'boolean',
      name: '체크 상태',
      table: { disable: false },
    },
    disabled: {
      control: 'boolean',
      name: '비활성화',
      table: { disable: false },
    },
    label: { table: { disable: true } },
    onPress: { table: { disable: true } },
    style: { table: { disable: true } },
    testID: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 (Controls로 조정 가능)
export const Default: Story = {
  args: {
    size: 'medium',
    tight: false,
    checked: true,
    disabled: false,
  },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked);

    // Sync with controls
    React.useEffect(() => {
      setChecked(args.checked);
    }, [args.checked]);

    return (
      <CheckMark
        {...args}
        label="Check mark"
        checked={checked}
        onPress={() => !args.disabled && setChecked(!checked)}
      />
    );
  },
};

// 사이즈 비교
export const Sizes: Story = {
  render: () => (
    <View style={styles.stack}>
      <View style={styles.item}>
        <CheckMark
          label="Check mark"
          checked={true}
          size="small"
          onPress={() => {}}
        />
        <Text style={styles.label}>Small</Text>
      </View>
      <View style={styles.item}>
        <CheckMark
          label="Check mark"
          checked={true}
          size="medium"
          onPress={() => {}}
        />
        <Text style={styles.label}>Medium</Text>
      </View>
    </View>
  ),
};

// Tight 간격 비교
export const Tight: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 48 }}>
      {/* Normal spacing (12px) */}
      <View style={{ flex: 1 }}>
        <Text style={styles.sectionTitle}>12px</Text>
        <View style={{ gap: 12, marginTop: 16 }}>
          <CheckMark
            label="Confirm information"
            checked={true}
            tight={false}
            onPress={() => {}}
          />
          <CheckMark
            label="Confirm information"
            checked={true}
            tight={false}
            onPress={() => {}}
          />
          <CheckMark
            label="Confirm information"
            checked={true}
            tight={false}
            onPress={() => {}}
          />
          <CheckMark
            label="Confirm information"
            checked={true}
            tight={false}
            onPress={() => {}}
          />
        </View>
      </View>

      {/* Tight spacing (8px) */}
      <View style={{ flex: 1 }}>
        <Text style={styles.sectionTitle}>8px</Text>
        <View style={{ gap: 8, marginTop: 16 }}>
          <CheckMark
            label="Confirm information"
            checked={true}
            tight={true}
            onPress={() => {}}
          />
          <CheckMark
            label="Confirm information"
            checked={true}
            tight={true}
            onPress={() => {}}
          />
          <CheckMark
            label="Confirm information"
            checked={true}
            tight={true}
            onPress={() => {}}
          />
          <CheckMark
            label="Confirm information"
            checked={true}
            tight={true}
            onPress={() => {}}
          />
        </View>
      </View>
    </View>
  ),
};

// 전체 상태 그리드
export const States: Story = {
  render: () => {
    const [inactiveNormal, setInactiveNormal] = useState(false);
    const [activeNormal, setActiveNormal] = useState(true);
    const [inactiveHovered, setInactiveHovered] = useState(false);
    const [activeHovered, setActiveHovered] = useState(true);
    const [inactivePressed, setInactivePressed] = useState(false);
    const [activePressed, setActivePressed] = useState(true);

    return (
      <View style={{ gap: 24 }}>
        {/* Header row */}
        <View style={{ flexDirection: 'row', gap: 16 }}>
          <View style={{ flex: 1 }} />
          <View style={{ flex: 1 }}>
            <Text style={[styles.sectionTitle, { textAlign: 'center' }]}>Inactive</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.sectionTitle, { textAlign: 'center' }]}>Active</Text>
          </View>
        </View>

        {/* Normal */}
        <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Normal</Text>
          </View>
          <View style={{ flex: 1 }}>
            <CheckMark
              label="Check mark"
              checked={inactiveNormal}
              onPress={() => setInactiveNormal(!inactiveNormal)}
            />
          </View>
          <View style={{ flex: 1 }}>
            <CheckMark
              label="Check mark"
              checked={activeNormal}
              onPress={() => setActiveNormal(!activeNormal)}
            />
          </View>
        </View>

        {/* Hovered */}
        <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Hovered</Text>
          </View>
          <View style={{ flex: 1 }}>
            <CheckMark
              label="Check mark"
              checked={inactiveHovered}
              onPress={() => setInactiveHovered(!inactiveHovered)}
            />
          </View>
          <View style={{ flex: 1 }}>
            <CheckMark
              label="Check mark"
              checked={activeHovered}
              onPress={() => setActiveHovered(!activeHovered)}
            />
          </View>
        </View>

        {/* Pressed */}
        <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Pressed</Text>
          </View>
          <View style={{ flex: 1 }}>
            <CheckMark
              label="Check mark"
              checked={inactivePressed}
              onPress={() => setInactivePressed(!inactivePressed)}
            />
          </View>
          <View style={{ flex: 1 }}>
            <CheckMark
              label="Check mark"
              checked={activePressed}
              onPress={() => setActivePressed(!activePressed)}
            />
          </View>
        </View>

        {/* Disabled */}
        <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Disabled</Text>
          </View>
          <View style={{ flex: 1 }}>
            <CheckMark
              label="Check mark"
              checked={false}
              disabled={true}
              onPress={() => {}}
            />
          </View>
          <View style={{ flex: 1 }}>
            <CheckMark
              label="Check mark"
              checked={true}
              disabled={true}
              onPress={() => {}}
            />
          </View>
        </View>
      </View>
    );
  },
};

// 정보 확인 동의 Use Case
export const InformationConfirm: Story = {
  render: () => {
    const [allAgree, setAllAgree] = useState(false);
    const [required1, setRequired1] = useState(false);
    const [required2, setRequired2] = useState(false);
    const [optional, setOptional] = useState(false);

    const handleAllAgree = () => {
      const newState = !allAgree;
      setAllAgree(newState);
      setRequired1(newState);
      setRequired2(newState);
      setOptional(newState);
    };

    React.useEffect(() => {
      setAllAgree(required1 && required2 && optional);
    }, [required1, required2, optional]);

    const remainingCount = [required1, required2].filter(v => !v).length;

    return (
      <View style={{ gap: 20, maxWidth: 420 }}>
        <Text style={[styles.sectionTitle, { fontSize: 18 }]}>전체 동의</Text>

        {/* 전체 동의 */}
        <CheckMark
          label="전체 동의"
          checked={allAgree}
          onPress={handleAllAgree}
        />

        <View style={{ height: 1, backgroundColor: '#e5e7eb' }} />

        {/* 개별 항목 */}
        <View style={{ gap: 16 }}>
          <CheckMark
            label="[필수] 원티드 이력서에 동의"
            checked={required1}
            onPress={() => setRequired1(!required1)}
          />
          <CheckMark
            label="[필수] 본인 제3자 정보제공 동의 및 활용 동의"
            checked={required2}
            onPress={() => setRequired2(!required2)}
          />
          <CheckMark
            label="[선택] 이벤트 소식, 이력서 조회 및 활용 동의"
            checked={optional}
            onPress={() => setOptional(!optional)}
          />
        </View>

        {/* CTA Button */}
        <View
          style={{
            marginTop: 12,
            padding: 16,
            backgroundColor: remainingCount > 0 ? '#e5e7eb' : '#2563eb',
            borderRadius: 8,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: remainingCount > 0 ? '#9ca3af' : '#fff',
            }}
          >
            {remainingCount > 0
              ? `동의를 ${remainingCount}개 더 눌러주세요`
              : '확인'}
          </Text>
        </View>
      </View>
    );
  },
};

// Gap 비교
export const Gap: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 48 }}>
      {/* 8px gap */}
      <View style={{ flex: 1 }}>
        <Text style={styles.sectionTitle}>8px</Text>
        <View style={{ gap: 8, marginTop: 16 }}>
          <CheckMark label="Item 1" checked={true} onPress={() => {}} />
          <CheckMark label="Item 2" checked={true} onPress={() => {}} />
          <CheckMark label="Item 3" checked={false} onPress={() => {}} />
          <CheckMark label="Item 4" checked={false} onPress={() => {}} />
        </View>
      </View>

      {/* 12px gap */}
      <View style={{ flex: 1 }}>
        <Text style={styles.sectionTitle}>12px</Text>
        <View style={{ gap: 12, marginTop: 16 }}>
          <CheckMark label="Item 1" checked={true} onPress={() => {}} />
          <CheckMark label="Item 2" checked={true} onPress={() => {}} />
          <CheckMark label="Item 3" checked={false} onPress={() => {}} />
          <CheckMark label="Item 4" checked={false} onPress={() => {}} />
        </View>
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
  stack: {
    gap: 32,
  },
  item: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  label: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
});
