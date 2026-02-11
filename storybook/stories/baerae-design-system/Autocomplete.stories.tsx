import { Autocomplete } from '@baerae-zkap/design-system/native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View, Text } from 'react-native';
import { fn } from 'storybook/test';
import React, { useState } from 'react';

const meta = {
  title: '@baerae-zkap/Presentation/Autocomplete',
  component: Autocomplete,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <View style={{ width: 360, padding: 16 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    options: { table: { disable: true } },
    onChange: { table: { disable: true } },
    value: { table: { disable: true } },
    style: { table: { disable: true } },
    placeholder: { table: { disable: true } },
    label: { table: { disable: true } },
    error: { table: { disable: true } },
    errorMessage: { table: { disable: true } },
    maxVisibleItems: { table: { disable: true } },
    noResultsText: { table: { disable: true } },
    testID: { table: { disable: true } },
  },
} as Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof Autocomplete>;

// Korean data for stories
const basicOptions = [
  { label: '비트코인 (BTC)', value: 'btc' },
  { label: '이더리움 (ETH)', value: 'eth' },
  { label: '리플 (XRP)', value: 'xrp' },
  { label: '솔라나 (SOL)', value: 'sol' },
  { label: '에이다 (ADA)', value: 'ada' },
  { label: '도지코인 (DOGE)', value: 'doge' },
  { label: '폴카닷 (DOT)', value: 'dot' },
  { label: '아발란체 (AVAX)', value: 'avax' },
];

const groupedOptions = [
  { label: '비트코인 (BTC)', value: 'btc', group: 'Layer 1' },
  { label: '이더리움 (ETH)', value: 'eth', group: 'Layer 1' },
  { label: '솔라나 (SOL)', value: 'sol', group: 'Layer 1' },
  { label: '폴리곤 (MATIC)', value: 'matic', group: 'Layer 2' },
  { label: '아비트럼 (ARB)', value: 'arb', group: 'Layer 2' },
  { label: '옵티미즘 (OP)', value: 'op', group: 'Layer 2' },
  { label: '유니스왑 (UNI)', value: 'uni', group: 'DeFi' },
  { label: '에이브 (AAVE)', value: 'aave', group: 'DeFi' },
];

const exchangeOptions = [
  { label: '업비트', value: 'upbit', description: '국내 최대 거래소' },
  { label: '빗썸', value: 'bithumb', description: '국내 거래소' },
  { label: '바이낸스', value: 'binance', description: '글로벌 최대 거래소' },
  { label: '코인베이스', value: 'coinbase', description: '미국 대표 거래소' },
  { label: 'OKX', value: 'okx', description: '글로벌 거래소' },
];

export const Default: Story = {
  args: {
    showLabel: true as any,
    showError: false as any,
    disabled: false,
    size: 'medium',
  },
  argTypes: {
    showLabel: { control: 'boolean', name: '라벨', description: '라벨 표시' },
    showError: { control: 'boolean', name: '에러', description: '에러 상태' },
    disabled: { control: 'boolean', name: '비활성화', description: '비활성화 상태' },
    size: { control: 'select', options: ['small', 'medium', 'large'], name: '사이즈' },
  },
  render: (args: any) => {
    const [value, setValue] = useState<string | null>(null);
    return (
      <Autocomplete
        value={value}
        onChange={setValue}
        options={basicOptions}
        label={args.showLabel ? '암호화폐 선택' : undefined}
        placeholder="암호화폐를 검색하세요..."
        error={args.showError}
        errorMessage={args.showError ? '필수 선택 항목입니다' : undefined}
        disabled={args.disabled}
        size={args.size}
      />
    );
  },
};

export const WithLabel: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);
    return (
      <Autocomplete
        value={value}
        onChange={setValue}
        options={basicOptions}
        label="암호화폐 선택"
        placeholder="암호화폐를 검색하세요..."
      />
    );
  },
};

export const WithGroups: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);
    return (
      <Autocomplete
        value={value}
        onChange={setValue}
        options={groupedOptions}
        label="블록체인 선택"
        placeholder="레이어별로 검색..."
      />
    );
  },
};

export const WithDescriptions: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);
    return (
      <Autocomplete
        value={value}
        onChange={setValue}
        options={exchangeOptions}
        label="거래소 선택"
        placeholder="거래소를 검색하세요..."
      />
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);
    return (
      <Autocomplete
        value={value}
        onChange={setValue}
        options={basicOptions}
        label="필수 선택 필드"
        placeholder="암호화폐를 선택하세요..."
        error
        errorMessage="필수 선택 항목입니다"
      />
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <Autocomplete
        value="btc"
        onChange={() => {}}
        options={basicOptions}
        label="비활성화된 자동완성"
        placeholder="선택 불가"
        disabled
      />
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [small, setSmall] = useState<string | null>(null);
    const [medium, setMedium] = useState<string | null>(null);
    const [large, setLarge] = useState<string | null>(null);
    return (
      <View style={{ gap: 24, width: '100%' }}>
        <View>
          <Text style={{ fontSize: 13, fontWeight: '600', color: '#64748b', marginBottom: 8 }}>Small</Text>
          <Autocomplete
            value={small}
            onChange={setSmall}
            options={basicOptions}
            label="소형 사이즈"
            placeholder="선택..."
            size="small"
          />
        </View>
        <View>
          <Text style={{ fontSize: 13, fontWeight: '600', color: '#64748b', marginBottom: 8 }}>Medium</Text>
          <Autocomplete
            value={medium}
            onChange={setMedium}
            options={basicOptions}
            label="중형 사이즈 (기본)"
            placeholder="선택..."
            size="medium"
          />
        </View>
        <View>
          <Text style={{ fontSize: 13, fontWeight: '600', color: '#64748b', marginBottom: 8 }}>Large</Text>
          <Autocomplete
            value={large}
            onChange={setLarge}
            options={basicOptions}
            label="대형 사이즈"
            placeholder="선택..."
            size="large"
          />
        </View>
      </View>
    );
  },
};

export const InPageUsage: Story = {
  render: () => {
    const [asset, setAsset] = useState<string | null>(null);
    const [exchange, setExchange] = useState<string | null>(null);
    return (
      <View style={{ gap: 16, width: '100%', backgroundColor: '#f8fafc', padding: 20, borderRadius: 12 }}>
        <View>
          <Text style={{ fontSize: 18, fontWeight: '700', color: '#0f172a', marginBottom: 4 }}>자산 검색</Text>
          <Text style={{ fontSize: 14, color: '#64748b', marginBottom: 16 }}>보유하신 암호화폐를 검색하세요</Text>
        </View>
        <Autocomplete
          value={asset}
          onChange={setAsset}
          options={basicOptions}
          label="암호화폐"
          placeholder="비트코인, 이더리움 등..."
        />
        <Autocomplete
          value={exchange}
          onChange={setExchange}
          options={exchangeOptions}
          label="거래소"
          placeholder="거래소를 선택하세요..."
        />
        <View style={{ marginTop: 8, padding: 12, backgroundColor: '#dbeafe', borderRadius: 8 }}>
          <Text style={{ fontSize: 13, color: '#1e40af' }}>
            {asset && exchange
              ? `${basicOptions.find(o => o.value === asset)?.label} • ${exchangeOptions.find(o => o.value === exchange)?.label}`
              : '자산과 거래소를 선택하세요'}
          </Text>
        </View>
      </View>
    );
  },
};
