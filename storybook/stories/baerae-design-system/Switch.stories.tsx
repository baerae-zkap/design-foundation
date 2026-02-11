import { Switch } from '@baerae-zkap/design-system/native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View, Text } from 'react-native';
import { useState } from 'react';

const meta = {
  title: '@baerae-zkap/Selection and input/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: { table: { disable: true } },
    onValueChange: { table: { disable: true } },
    onColor: { table: { disable: true } },
    offColor: { table: { disable: true } },
    style: { table: { disable: true } },
    testID: { table: { disable: true } },
    accessibilityLabel: { table: { disable: true } },
    size: {
      control: 'inline-radio',
      options: ['small', 'medium', 'large'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    hasTouchEffect: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    size: 'medium',
    disabled: false,
    loading: false,
    hasTouchEffect: true,
    label: '',
  },
  decorators: [
    (Story) => (
      <View style={{ width: 375, padding: 20, backgroundColor: '#f8fafc' }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Switch with interactive controls
 */
export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(false);
    return (
      <Switch
        {...args}
        value={value}
        onValueChange={setValue}
      />
    );
  },
};

/**
 * States: Normal/Disabled x Inactive/Active (Montage 기준)
 */
export const States: Story = {
  render: () => {
    const [normalOff, setNormalOff] = useState(false);
    const [normalOn, setNormalOn] = useState(true);

    const Label = ({ text }: { text: string }) => (
      <Text style={{ width: 100, fontSize: 13, color: '#64748b' }}>{text}</Text>
    );
    const Header = ({ text }: { text: string }) => (
      <Text style={{ fontSize: 12, fontWeight: '600', color: '#94a3b8', textAlign: 'center', width: 80 }}>{text}</Text>
    );

    return (
      <View style={{ gap: 16 }}>
        {/* Header row */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <View style={{ width: 100 }} />
          <Header text="Inactive" />
          <Header text="Active" />
        </View>
        {/* Normal */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <Label text="Normal" />
          <View style={{ width: 80, alignItems: 'center' }}>
            <Switch value={normalOff} onValueChange={setNormalOff} />
          </View>
          <View style={{ width: 80, alignItems: 'center' }}>
            <Switch value={normalOn} onValueChange={setNormalOn} />
          </View>
        </View>
        {/* Disabled */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <Label text="Disabled" />
          <View style={{ width: 80, alignItems: 'center' }}>
            <Switch value={false} onValueChange={() => {}} disabled />
          </View>
          <View style={{ width: 80, alignItems: 'center' }}>
            <Switch value={true} onValueChange={() => {}} disabled />
          </View>
        </View>
      </View>
    );
  },
};

/**
 * Sizes: Small (24px) / Medium (32px) - Montage 기준
 */
export const Sizes: Story = {
  render: () => {
    const [small, setSmall] = useState(true);
    const [medium, setMedium] = useState(true);

    return (
      <View style={{ gap: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <Switch size="small" value={small} onValueChange={setSmall} />
          <Text style={{ fontSize: 13, color: '#64748b' }}>Small (24px)</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <Switch size="medium" value={medium} onValueChange={setMedium} />
          <Text style={{ fontSize: 13, color: '#64748b' }}>Medium (32px)</Text>
        </View>
      </View>
    );
  },
};

/**
 * Touch Effect: hasTouchEffect prop
 */
export const TouchEffect: Story = {
  render: () => {
    const [withEffect, setWithEffect] = useState(false);
    const [withoutEffect, setWithoutEffect] = useState(false);

    return (
      <View style={{ gap: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <Switch
            value={withEffect}
            onValueChange={setWithEffect}
            hasTouchEffect={true}
          />
          <Text style={{ fontSize: 13, color: '#64748b' }}>With Touch Effect (default)</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <Switch
            value={withoutEffect}
            onValueChange={setWithoutEffect}
            hasTouchEffect={false}
          />
          <Text style={{ fontSize: 13, color: '#64748b' }}>Without Touch Effect</Text>
        </View>
      </View>
    );
  },
};

/**
 * With Label: Switch + 라벨 텍스트
 */
export const WithLabel: Story = {
  render: () => {
    const [notifications, setNotifications] = useState(true);
    const [marketing, setMarketing] = useState(false);
    const [analytics, setAnalytics] = useState(true);

    return (
      <View style={{ gap: 20 }}>
        <Switch
          value={notifications}
          onValueChange={setNotifications}
          label="알림 받기"
        />
        <Switch
          value={marketing}
          onValueChange={setMarketing}
          label="마케팅 정보 수신"
        />
        <Switch
          value={analytics}
          onValueChange={setAnalytics}
          label="분석 데이터 수집"
          disabled
        />
      </View>
    );
  },
};

/**
 * Usage: 설정 화면 예시 (Montage Medium 사용 권장)
 */
export const SettingsExample: Story = {
  render: () => {
    const [darkMode, setDarkMode] = useState(false);
    const [autoUpdate, setAutoUpdate] = useState(true);
    const [notifications, setNotifications] = useState(true);
    const [biometric, setBiometric] = useState(false);

    const SettingRow = ({
      title,
      description,
      value,
      onValueChange,
      disabled,
    }: {
      title: string;
      description?: string;
      value: boolean;
      onValueChange: (v: boolean) => void;
      disabled?: boolean;
    }) => (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 14,
          borderBottomWidth: 1,
          borderBottomColor: '#f1f5f9',
        }}
      >
        <View style={{ flex: 1, marginRight: 16 }}>
          <Text style={{ fontSize: 15, fontWeight: '500', color: '#1e293b' }}>{title}</Text>
          {description && (
            <Text style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{description}</Text>
          )}
        </View>
        <Switch value={value} onValueChange={onValueChange} disabled={disabled} />
      </View>
    );

    return (
      <View style={{ backgroundColor: 'white', borderRadius: 12, padding: 16 }}>
        <Text style={{ fontSize: 13, fontWeight: '600', color: '#94a3b8', marginBottom: 8 }}>
          설정
        </Text>
        <SettingRow
          title="다크 모드"
          description="어두운 테마를 사용합니다"
          value={darkMode}
          onValueChange={setDarkMode}
        />
        <SettingRow
          title="자동 업데이트"
          description="앱을 자동으로 업데이트합니다"
          value={autoUpdate}
          onValueChange={setAutoUpdate}
        />
        <SettingRow
          title="알림"
          value={notifications}
          onValueChange={setNotifications}
        />
        <SettingRow
          title="생체 인증"
          description="지문 또는 Face ID로 잠금해제"
          value={biometric}
          onValueChange={setBiometric}
        />
      </View>
    );
  },
};

/**
 * Loading: 로딩 상태 (상호작용 비활성화)
 */
export const Loading: Story = {
  render: () => {
    const [normal, setNormal] = useState(false);

    return (
      <View style={{ gap: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <Switch value={true} onValueChange={() => {}} loading size="medium" />
          <Text style={{ fontSize: 13, color: '#64748b' }}>Loading On</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <Switch value={false} onValueChange={() => {}} loading size="medium" />
          <Text style={{ fontSize: 13, color: '#64748b' }}>Loading Off</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <Switch value={normal} onValueChange={setNormal} size="medium" />
          <Text style={{ fontSize: 13, color: '#64748b' }}>Normal (clickable)</Text>
        </View>
      </View>
    );
  },
};
