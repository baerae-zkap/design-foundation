import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { TextField, TextButton, ContentBadge } from '@baerae-zkap/design-system/native';
import { Search, Clock, Eye, DollarSign } from 'lucide-react-native';

// Helper to render leading icon
const renderLeadingIcon = (option: string) => {
  if (option === 'icon') {
    return <Search size={18} color="#94a3b8" strokeWidth={2} />;
  }
  return undefined;
};

// Helper to render trailing button
const renderTrailingButton = (option: string) => {
  if (option === 'button') {
    return (
      <TextButton size="small" color="primary" onPress={() => {}}>
        Button
      </TextButton>
    );
  }
  return undefined;
};

// Helper to render trailing content
const renderTrailingContent = (option: string) => {
  switch (option) {
    case 'badge':
      return <ContentBadge variant="subtle" color="baseDefault" size="small">Badge</ContentBadge>;
    case 'text':
      return <Text style={{ fontSize: 14, color: '#94a3b8' }}>원</Text>;
    case 'icon':
      return <Eye size={18} color="#94a3b8" strokeWidth={2} />;
    case 'timer':
      return (
        <Text style={{ fontSize: 13, color: '#ef4444', fontVariant: ['tabular-nums'] }}>03:00</Text>
      );
    default:
      return undefined;
  }
};

const meta = {
  title: '@baerae-zkap/Selection and input/Text field',
  component: TextField,
  argTypes: {
    // Hidden non-interactive props
    value: { table: { disable: true } },
    onChangeText: { table: { disable: true } },
    leftIcon: { table: { disable: true } },
    rightIcon: { table: { disable: true } },
    leadingIcon: { table: { disable: true } },
    trailingButton: { table: { disable: true } },
    trailingContent: { table: { disable: true } },
    prefix: { table: { disable: true } },
    suffix: { table: { disable: true } },
    style: { table: { disable: true } },
    testID: { table: { disable: true } },
    accessibilityLabel: { table: { disable: true } },
    helperText: { table: { disable: true } },
    // Visible interactive controls (continued)
    keyboardType: {
      control: 'select',
      options: ['default', 'email-address', 'numeric', 'phone-pad', 'url'],
      description: 'Keyboard type',
    },
    // Montage-style selectors
    leadingIconOption: {
      control: 'inline-radio',
      options: ['none', 'icon'],
      description: 'Leading icon',
    },
    trailingButtonOption: {
      control: 'inline-radio',
      options: ['none', 'button'],
      description: 'Trailing button',
    },
    trailingContentOption: {
      control: 'inline-radio',
      options: ['none', 'badge', 'text', 'icon', 'timer'],
      description: 'Trailing contents',
    },
    // Visible interactive controls
    placeholder: { control: 'text', description: 'Placeholder text' },
    label: { control: 'text', description: 'Label text' },
    required: { control: 'boolean', description: 'Show required badge (*)' },
    description: { control: 'text', description: 'Helper/description text' },
    error: { control: 'boolean', description: 'Error state' },
    errorMessage: { control: 'text', description: 'Error message' },
    disabled: { control: 'boolean', description: 'Disabled state' },
    readOnly: { control: 'boolean', description: 'Read-only state' },
    size: { control: 'inline-radio', options: ['small', 'medium', 'large'], description: 'Field size' },
    maxLength: { control: 'number', description: 'Maximum character length' },
    showCount: { control: 'boolean', description: 'Show character count' },
    secureTextEntry: { control: 'boolean', description: 'Password mode' },
  },
  args: {
    placeholder: 'Placeholder',
    label: 'Heading',
    description: 'Description',
    errorMessage: '',
    size: 'medium',
    maxLength: 100,
    error: false,
    disabled: false,
    readOnly: false,
    required: false,
    showCount: false,
    secureTextEntry: false,
    keyboardType: 'default',
    leadingIconOption: 'none',
    trailingButtonOption: 'none',
    trailingContentOption: 'none',
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default TextField with Montage-style interactive controls
 */
export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    const { leadingIconOption, trailingButtonOption, trailingContentOption, ...textFieldArgs } = args as any;

    return (
      <View style={{ width: 340, padding: 20 }}>
        <TextField
          {...textFieldArgs}
          value={value}
          onChangeText={setValue}
          leadingIcon={renderLeadingIcon(leadingIconOption)}
          trailingButton={renderTrailingButton(trailingButtonOption)}
          trailingContent={renderTrailingContent(trailingContentOption)}
        />
      </View>
    );
  },
};

/**
 * TextField states: Normal, Focused, Error, Disabled, Read-only
 */
export const States: Story = {
  render: () => {
    const [normalValue, setNormalValue] = useState('');
    const [focusedValue, setFocusedValue] = useState('Focused value');
    const [errorValue, setErrorValue] = useState('Error value');
    const [disabledValue] = useState('Disabled value');
    const [readOnlyValue] = useState('Read-only value');

    return (
      <View style={{ gap: 24, width: 340, padding: 20 }}>
        <View>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#6b7280', marginBottom: 8 }}>Normal</Text>
          <TextField
            value={normalValue}
            onChangeText={setNormalValue}
            placeholder="텍스트를 입력하세요"
            label="라벨"
          />
        </View>
        <View>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#6b7280', marginBottom: 8 }}>Focused</Text>
          <TextField
            value={focusedValue}
            onChangeText={setFocusedValue}
            label="라벨"
            placeholder="Click to focus"
          />
        </View>
        <View>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#6b7280', marginBottom: 8 }}>Error</Text>
          <TextField
            value={errorValue}
            onChangeText={setErrorValue}
            label="라벨"
            error={true}
            errorMessage="에러 메시지입니다"
          />
        </View>
        <View>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#6b7280', marginBottom: 8 }}>Disabled</Text>
          <TextField
            value={disabledValue}
            onChangeText={() => {}}
            label="라벨"
            disabled={true}
          />
        </View>
        <View>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#6b7280', marginBottom: 8 }}>Read-only</Text>
          <TextField
            value={readOnlyValue}
            onChangeText={() => {}}
            label="라벨"
            readOnly={true}
          />
        </View>
      </View>
    );
  },
};

/**
 * TextField sizes: Small (36px), Medium (44px), Large (52px)
 */
export const Sizes: Story = {
  render: () => {
    const [small, setSmall] = useState('');
    const [medium, setMedium] = useState('');
    const [large, setLarge] = useState('');

    return (
      <View style={{ gap: 20, width: 340, padding: 20 }}>
        <View>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#6b7280', marginBottom: 8 }}>Small (36px)</Text>
          <TextField
            size="small"
            value={small}
            onChangeText={setSmall}
            placeholder="Small size"
            label="Small"
          />
        </View>
        <View>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#6b7280', marginBottom: 8 }}>Medium (44px)</Text>
          <TextField
            size="medium"
            value={medium}
            onChangeText={setMedium}
            placeholder="Medium size"
            label="Medium"
          />
        </View>
        <View>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#6b7280', marginBottom: 8 }}>Large (52px)</Text>
          <TextField
            size="large"
            value={large}
            onChangeText={setLarge}
            placeholder="Large size"
            label="Large"
          />
        </View>
      </View>
    );
  },
};

/**
 * TextField with leading icon
 */
export const WithLeadingIcon: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <View style={{ width: 340, padding: 20 }}>
        <TextField
          value={value}
          onChangeText={setValue}
          label="Search"
          placeholder="검색어를 입력하세요"
          leadingIcon={<Search size={18} color="#94a3b8" strokeWidth={2} />}
        />
      </View>
    );
  },
};

/**
 * TextField with trailing content
 */
export const TrailingContent: Story = {
  render: () => {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');

    return (
      <View style={{ gap: 24, width: 340, padding: 20 }}>
        <View>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#6b7280', marginBottom: 8 }}>With ContentBadge</Text>
          <TextField
            value={value1}
            onChangeText={setValue1}
            label="인증"
            placeholder="인증번호를 입력하세요"
            trailingContent={
              <ContentBadge variant="subtle" color="baseDefault" size="small">Badge</ContentBadge>
            }
          />
        </View>
        <View>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#6b7280', marginBottom: 8 }}>With TextButton</Text>
          <TextField
            value={value2}
            onChangeText={setValue2}
            label="이메일"
            placeholder="이메일을 입력하세요"
            trailingButton={
              <TextButton size="small" color="primary" onPress={() => {}}>
                발송
              </TextButton>
            }
          />
        </View>
        <View>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#6b7280', marginBottom: 8 }}>Badge + TextButton</Text>
          <TextField
            value={value3}
            onChangeText={setValue3}
            label="인증번호"
            placeholder="인증번호 6자리"
            trailingContent={
              <Text style={{ fontSize: 13, color: '#ef4444', fontVariant: ['tabular-nums'] }}>03:00</Text>
            }
            trailingButton={
              <TextButton size="small" color="primary" onPress={() => {}}>
                재발송
              </TextButton>
            }
          />
        </View>
      </View>
    );
  },
};

/**
 * TextField with prefix and suffix (text or icon)
 */
export const PrefixSuffix: Story = {
  render: () => {
    const [price, setPrice] = useState('');
    const [amount, setAmount] = useState('');
    const [url, setUrl] = useState('');
    const [iconPrefix, setIconPrefix] = useState('');

    return (
      <View style={{ gap: 24, width: 340, padding: 20 }}>
        <View>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#6b7280', marginBottom: 8 }}>
            Text Prefix
          </Text>
          <TextField
            value={price}
            onChangeText={setPrice}
            label="Price"
            placeholder="0.00"
            prefix="$"
            keyboardType="numeric"
          />
        </View>
        <View>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#6b7280', marginBottom: 8 }}>
            Text Suffix
          </Text>
          <TextField
            value={amount}
            onChangeText={setAmount}
            label="금액"
            placeholder="0"
            suffix="원"
            keyboardType="numeric"
          />
        </View>
        <View>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#6b7280', marginBottom: 8 }}>
            Text Prefix (long)
          </Text>
          <TextField
            value={url}
            onChangeText={setUrl}
            label="Website"
            placeholder="example.com"
            prefix="https://"
          />
        </View>
        <View>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#6b7280', marginBottom: 8 }}>
            Icon Prefix + Text Suffix
          </Text>
          <TextField
            value={iconPrefix}
            onChangeText={setIconPrefix}
            label="금액 입력"
            placeholder="0"
            prefix={<DollarSign size={16} color="#94a3b8" strokeWidth={2} />}
            suffix="원"
            keyboardType="numeric"
          />
        </View>
      </View>
    );
  },
};

/**
 * TextField with description variations
 */
export const WithDescription: Story = {
  render: () => {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');
    const [value4, setValue4] = useState('');

    return (
      <View style={{ gap: 20, width: 340, padding: 20 }}>
        <TextField
          value={value1}
          onChangeText={setValue1}
          label="Label only"
          placeholder="텍스트를 입력하세요"
        />
        <TextField
          value={value2}
          onChangeText={setValue2}
          label="Label + Description"
          placeholder="텍스트를 입력하세요"
          description="도움말 텍스트입니다"
        />
        <TextField
          value={value3}
          onChangeText={setValue3}
          label="Label + Required"
          placeholder="텍스트를 입력하세요"
          required={true}
        />
        <TextField
          value={value4}
          onChangeText={setValue4}
          label="Label + Required + Description"
          placeholder="텍스트를 입력하세요"
          required={true}
          description="필수 입력 항목입니다"
        />
      </View>
    );
  },
};

/**
 * TextField with character count
 */
export const WithCharacterCount: Story = {
  render: () => {
    const [value1, setValue1] = useState('안녕하세요');
    const [value2, setValue2] = useState('설명과 함께');

    return (
      <View style={{ gap: 20, width: 340, padding: 20 }}>
        <TextField
          value={value1}
          onChangeText={setValue1}
          label="자기소개"
          placeholder="자기소개를 입력하세요"
          maxLength={100}
          showCount={true}
        />
        <TextField
          value={value2}
          onChangeText={setValue2}
          label="메모"
          placeholder="메모를 입력하세요"
          description="최대 50자까지 입력 가능합니다"
          maxLength={50}
          showCount={true}
        />
      </View>
    );
  },
};

/**
 * Password field with secure entry
 */
export const PasswordField: Story = {
  render: () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
      <View style={{ gap: 20, width: 340, padding: 20 }}>
        <TextField
          value={password}
          onChangeText={setPassword}
          label="비밀번호"
          placeholder="비밀번호를 입력하세요"
          secureTextEntry={true}
          description="8자 이상 입력해주세요"
        />
        <TextField
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          label="비밀번호 확인"
          placeholder="비밀번호를 다시 입력하세요"
          secureTextEntry={true}
          error={confirmPassword !== '' && password !== confirmPassword}
          errorMessage="비밀번호가 일치하지 않습니다"
        />
      </View>
    );
  },
};

/**
 * Form example with multiple text fields
 */
export const FormExample: Story = {
  render: () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [amount, setAmount] = useState('');

    return (
      <View style={{ gap: 20, padding: 20, width: 340 }}>
        <TextField
          value={name}
          onChangeText={setName}
          label="이름"
          placeholder="이름을 입력하세요"
          required={true}
        />
        <TextField
          value={email}
          onChangeText={setEmail}
          label="이메일"
          placeholder="example@email.com"
          description="이메일 주소를 정확히 입력해주세요"
          keyboardType="email-address"
        />
        <TextField
          value={phone}
          onChangeText={setPhone}
          label="전화번호"
          placeholder="1234-5678"
          prefix="010-"
          keyboardType="phone-pad"
        />
        <TextField
          value={amount}
          onChangeText={setAmount}
          label="금액"
          placeholder="0"
          suffix="원"
          keyboardType="numeric"
        />
      </View>
    );
  },
};
