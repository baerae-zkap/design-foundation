import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '@baerae-zkap/design-system/native';
import { View, Text } from 'react-native';
import { useState } from 'react';
import { MapPin, Globe } from 'lucide-react-native';

const meta = {
  title: '@baerae-zkap/Selection and input/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
    options: { table: { disable: true } },
    leadingIcon: { table: { disable: true } },
    style: { table: { disable: true } },
    testID: { table: { disable: true } },
    accessibilityLabel: { table: { disable: true } },
    placeholder: { control: 'text' },
    label: { control: 'text' },
    description: { control: 'text' },
    errorMessage: { control: 'text' },
    required: { control: 'boolean' },
    multiple: { control: 'boolean' },
    renderType: {
      control: 'inline-radio',
      options: ['text', 'chip'],
    },
    overflow: { control: 'boolean' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    size: {
      control: 'inline-radio',
      options: ['small', 'medium', 'large'],
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOptions = [
  { label: '서울', value: 'seoul' },
  { label: '부산', value: 'busan' },
  { label: '대구', value: 'daegu' },
  { label: '인천', value: 'incheon' },
  { label: '광주', value: 'gwangju' },
  { label: '대전', value: 'daejeon' },
  { label: '울산', value: 'ulsan' },
];

const categoryOptions = [
  { label: '개발', value: 'dev' },
  { label: '디자인', value: 'design' },
  { label: '마케팅', value: 'marketing' },
  { label: '기획', value: 'planning' },
  { label: '영업', value: 'sales' },
  { label: '운영', value: 'operations' },
  { label: '인사', value: 'hr' },
  { label: '재무', value: 'finance' },
];

/**
 * Default Select with interactive controls
 */
export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>(args.value as string || null);
    return (
      <View style={{ width: 300 }}>
        <Select
          {...args}
          value={value}
          onChange={(v) => setValue(v as string)}
          options={sampleOptions}
        />
      </View>
    );
  },
  args: {
    placeholder: '도시를 선택하세요',
    label: '도시',
    description: '',
    errorMessage: '',
    size: 'medium',
    multiple: false,
    renderType: 'text',
    overflow: false,
    required: false,
    error: false,
    disabled: false,
    readOnly: false,
  },
  // Note: description and errorMessage already have empty string defaults to prevent "Set string" button
};

/**
 * Single vs Multiple selection modes
 */
export const Variants: Story = {
  render: () => {
    const [single, setSingle] = useState<string | null>(null);
    const [multiText, setMultiText] = useState<string[]>([]);
    const [multiChip, setMultiChip] = useState<string[]>(['dev', 'design']);

    return (
      <View style={{ gap: 24, width: 300 }}>
        <View>
          <Text style={{ fontSize: 12, color: '#6b7280', marginBottom: 8, fontWeight: '600' }}>
            Single Select
          </Text>
          <Select
            value={single}
            onChange={(v) => setSingle(v as string)}
            options={sampleOptions}
            label="거주 도시"
            placeholder="도시를 선택하세요"
          />
        </View>
        <View>
          <Text style={{ fontSize: 12, color: '#6b7280', marginBottom: 8, fontWeight: '600' }}>
            Multiple Select (Text)
          </Text>
          <Select
            multiple
            renderType="text"
            value={multiText}
            onChange={(v) => setMultiText(v as string[])}
            options={categoryOptions}
            label="관심 분야"
            placeholder="최대 5개까지 선택"
          />
        </View>
        <View>
          <Text style={{ fontSize: 12, color: '#6b7280', marginBottom: 8, fontWeight: '600' }}>
            Multiple Select (Chip)
          </Text>
          <Select
            multiple
            renderType="chip"
            value={multiChip}
            onChange={(v) => setMultiChip(v as string[])}
            options={categoryOptions}
            label="관심 분야"
            placeholder="선택하세요"
          />
        </View>
      </View>
    );
  },
};

/**
 * Select sizes: small (36px), medium (44px), large (52px)
 */
export const Sizes: Story = {
  render: () => {
    const [small, setSmall] = useState<string | null>(null);
    const [medium, setMedium] = useState<string | null>('seoul');
    const [large, setLarge] = useState<string | null>(null);

    return (
      <View style={{ gap: 20, width: 300 }}>
        <View>
          <Select
            size="small"
            value={small}
            onChange={(v) => setSmall(v as string)}
            options={sampleOptions}
            placeholder="Small (36px)"
            label="Small"
          />
        </View>
        <View>
          <Select
            size="medium"
            value={medium}
            onChange={(v) => setMedium(v as string)}
            options={sampleOptions}
            placeholder="Medium (44px)"
            label="Medium"
          />
        </View>
        <View>
          <Select
            size="large"
            value={large}
            onChange={(v) => setLarge(v as string)}
            options={sampleOptions}
            placeholder="Large (52px)"
            label="Large"
          />
        </View>
      </View>
    );
  },
};

/**
 * Select states: default, selected, error, disabled, readOnly
 */
export const States: Story = {
  render: () => {
    const [defaultValue, setDefaultValue] = useState<string | null>(null);
    const [selectedValue, setSelectedValue] = useState<string | null>('seoul');
    const [errorValue, setErrorValue] = useState<string | null>(null);

    return (
      <View style={{ gap: 20, width: 300 }}>
        <View>
          <Select
            value={defaultValue}
            onChange={(v) => setDefaultValue(v as string)}
            options={sampleOptions}
            placeholder="Default state"
            label="Default"
          />
        </View>
        <View>
          <Select
            value={selectedValue}
            onChange={(v) => setSelectedValue(v as string)}
            options={sampleOptions}
            label="Selected"
          />
        </View>
        <View>
          <Select
            value={errorValue}
            onChange={(v) => setErrorValue(v as string)}
            options={sampleOptions}
            label="Error"
            error={true}
            errorMessage="This field is required"
            placeholder="Error state"
          />
        </View>
        <View>
          <Select
            value="seoul"
            onChange={() => {}}
            options={sampleOptions}
            label="Disabled"
            disabled={true}
          />
        </View>
        <View>
          <Select
            value="busan"
            onChange={() => {}}
            options={sampleOptions}
            label="Read Only"
            readOnly={true}
          />
        </View>
      </View>
    );
  },
};

/**
 * Select with leading icon
 */
export const WithLeadingIcon: Story = {
  render: () => {
    const [city, setCity] = useState<string | null>(null);
    const [country, setCountry] = useState<string | null>(null);

    return (
      <View style={{ gap: 20, width: 300 }}>
        <Select
          value={city}
          onChange={(v) => setCity(v as string)}
          options={sampleOptions}
          label="거주 도시"
          placeholder="도시를 선택하세요"
          leadingIcon={<MapPin size={16} color="#6b7280" />}
        />
        <Select
          value={country}
          onChange={(v) => setCountry(v as string)}
          options={[
            { label: '대한민국', value: 'kr' },
            { label: '미국', value: 'us' },
            { label: '일본', value: 'jp' },
            { label: '중국', value: 'cn' },
          ]}
          label="국가"
          placeholder="국가를 선택하세요"
          leadingIcon={<Globe size={16} color="#6b7280" />}
        />
      </View>
    );
  },
};

/**
 * Select with description helper text
 */
export const WithDescription: Story = {
  render: () => {
    const [city, setCity] = useState<string | null>(null);

    return (
      <View style={{ width: 300 }}>
        <Select
          value={city}
          onChange={(v) => setCity(v as string)}
          options={sampleOptions}
          label="거주 도시"
          description="현재 거주하고 계신 도시를 선택해주세요"
          placeholder="도시를 선택하세요"
        />
      </View>
    );
  },
};

/**
 * Required field with asterisk badge
 */
export const Required: Story = {
  render: () => {
    const [city, setCity] = useState<string | null>(null);

    return (
      <View style={{ width: 300 }}>
        <Select
          value={city}
          onChange={(v) => setCity(v as string)}
          options={sampleOptions}
          label="거주 도시"
          required
          placeholder="도시를 선택하세요"
          error={city === null}
          errorMessage={city === null ? '필수 입력 항목입니다' : undefined}
        />
      </View>
    );
  },
};

/**
 * Multiple select with text render (comma-separated)
 */
export const MultiSelectText: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>(['dev', 'design']);

    return (
      <View style={{ width: 300 }}>
        <Select
          multiple
          renderType="text"
          value={values}
          onChange={(v) => setValues(v as string[])}
          options={categoryOptions}
          label="관심 분야"
          description="여러 개를 선택할 수 있습니다"
          placeholder="관심 분야를 선택하세요"
        />
      </View>
    );
  },
};

/**
 * Multiple select with chip render (removable chips)
 */
export const MultiSelectChip: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>(['dev', 'design', 'marketing']);

    return (
      <View style={{ width: 300 }}>
        <Select
          multiple
          renderType="chip"
          value={values}
          onChange={(v) => setValues(v as string[])}
          options={categoryOptions}
          label="관심 분야"
          description="칩을 클릭하여 제거할 수 있습니다"
          placeholder="관심 분야를 선택하세요"
        />
      </View>
    );
  },
};

/**
 * Chip overflow behavior (horizontal scroll vs wrap)
 */
export const Overflow: Story = {
  render: () => {
    const [noOverflow, setNoOverflow] = useState<string[]>(['dev', 'design', 'marketing', 'planning']);
    const [withOverflow, setWithOverflow] = useState<string[]>(['dev', 'design', 'marketing', 'planning']);

    return (
      <View style={{ gap: 20, width: 300 }}>
        <View>
          <Text style={{ fontSize: 12, color: '#6b7280', marginBottom: 8, fontWeight: '600' }}>
            Overflow: false (Auto Height, Wrap)
          </Text>
          <Select
            multiple
            renderType="chip"
            overflow={false}
            value={noOverflow}
            onChange={(v) => setNoOverflow(v as string[])}
            options={categoryOptions}
            label="관심 분야"
            placeholder="선택하세요"
          />
        </View>
        <View>
          <Text style={{ fontSize: 12, color: '#6b7280', marginBottom: 8, fontWeight: '600' }}>
            Overflow: true (Fixed Height, Scroll)
          </Text>
          <Select
            multiple
            renderType="chip"
            overflow={true}
            value={withOverflow}
            onChange={(v) => setWithOverflow(v as string[])}
            options={categoryOptions}
            label="관심 분야"
            placeholder="선택하세요"
          />
        </View>
      </View>
    );
  },
};

/**
 * Select with disabled options
 */
export const DisabledOptions: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);

    const optionsWithDisabled = [
      { label: '서울', value: 'seoul' },
      { label: '부산', value: 'busan', disabled: true },
      { label: '대구', value: 'daegu' },
      { label: '인천', value: 'incheon', disabled: true },
      { label: '광주', value: 'gwangju' },
    ];

    return (
      <View style={{ width: 300 }}>
        <Select
          value={value}
          onChange={(v) => setValue(v as string)}
          options={optionsWithDisabled}
          label="도시 선택"
          placeholder="일부 옵션이 비활성화되어 있습니다"
        />
      </View>
    );
  },
};

/**
 * Select with many options (scrollable dropdown)
 */
export const ManyOptions: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);

    const manyOptions = [
      { label: '서울특별시', value: 'seoul' },
      { label: '부산광역시', value: 'busan' },
      { label: '대구광역시', value: 'daegu' },
      { label: '인천광역시', value: 'incheon' },
      { label: '광주광역시', value: 'gwangju' },
      { label: '대전광역시', value: 'daejeon' },
      { label: '울산광역시', value: 'ulsan' },
      { label: '세종특별자치시', value: 'sejong' },
      { label: '경기도', value: 'gyeonggi' },
      { label: '강원도', value: 'gangwon' },
      { label: '충청북도', value: 'chungbuk' },
      { label: '충청남도', value: 'chungnam' },
      { label: '전라북도', value: 'jeonbuk' },
      { label: '전라남도', value: 'jeonnam' },
      { label: '경상북도', value: 'gyeongbuk' },
      { label: '경상남도', value: 'gyeongnam' },
      { label: '제주특별자치도', value: 'jeju' },
    ];

    return (
      <View style={{ width: 300 }}>
        <Select
          value={value}
          onChange={(v) => setValue(v as string)}
          options={manyOptions}
          label="시/도 선택"
          placeholder="시/도를 선택하세요"
        />
      </View>
    );
  },
};

/**
 * Form example with multiple selects
 */
export const FormExample: Story = {
  render: () => {
    const [country, setCountry] = useState<string | null>(null);
    const [city, setCity] = useState<string | null>(null);
    const [language, setLanguage] = useState<string | null>('ko');
    const [interests, setInterests] = useState<string[]>([]);

    const countries = [
      { label: '대한민국', value: 'kr' },
      { label: '미국', value: 'us' },
      { label: '일본', value: 'jp' },
      { label: '중국', value: 'cn' },
    ];

    const languages = [
      { label: '한국어', value: 'ko' },
      { label: 'English', value: 'en' },
      { label: '日本語', value: 'ja' },
      { label: '中文', value: 'zh' },
    ];

    return (
      <View style={{ gap: 20, width: 300 }}>
        <Select
          value={country}
          onChange={(v) => setCountry(v as string)}
          options={countries}
          label="국가"
          required
          placeholder="국가를 선택하세요"
          leadingIcon={<Globe size={16} color="#6b7280" />}
          error={country === null}
          errorMessage={country === null ? '국가를 선택해주세요' : undefined}
        />
        <Select
          value={city}
          onChange={(v) => setCity(v as string)}
          options={sampleOptions}
          label="도시"
          placeholder="도시를 선택하세요"
          leadingIcon={<MapPin size={16} color="#6b7280" />}
          disabled={country === null}
        />
        <Select
          value={language}
          onChange={(v) => setLanguage(v as string)}
          options={languages}
          label="언어"
          description="선호하는 언어를 선택하세요"
          placeholder="언어를 선택하세요"
        />
        <Select
          multiple
          renderType="chip"
          value={interests}
          onChange={(v) => setInterests(v as string[])}
          options={categoryOptions}
          label="관심 분야"
          description="최대 5개까지 선택 가능합니다"
          placeholder="관심 분야를 선택하세요"
        />
      </View>
    );
  },
};
