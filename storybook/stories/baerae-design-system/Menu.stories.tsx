import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Menu, Button } from '@baerae-zkap/design-system/native';
import { Bitcoin, Coins, Zap, Globe, BookOpen, Trash2, Settings, MoreVertical, Check } from 'lucide-react-native';

const meta = {
  title: '@baerae-zkap/Presentation/Menu',
  component: Menu,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <View style={{ width: 360, padding: 16, minHeight: 200 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    sections: { table: { disable: true } },
    selectedIds: { table: { disable: true } },
    onSelectionChange: { table: { disable: true } },
    actionArea: { table: { disable: true } },
    visible: { table: { disable: true } },
    onVisibleChange: { table: { disable: true } },
    trigger: { table: { disable: true } },
    placement: { table: { disable: true } },
    width: { table: { disable: true } },
    style: { table: { disable: true } },
    testID: { table: { disable: true } },
    selectionMode: { table: { disable: true } },
  },
} as Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  args: {
    selectionMode: 'single',
    showSectionHeaders: false as any,
    showDescriptions: false as any,
    showIcons: false as any,
    showActionArea: false as any,
  },
  argTypes: {
    selectionMode: { control: 'select', options: ['single', 'radio', 'checkbox'], name: '선택 모드' },
    showSectionHeaders: { control: 'boolean', name: '섹션 헤더' },
    showDescriptions: { control: 'boolean', name: '설명' },
    showIcons: { control: 'boolean', name: '아이콘' },
    showActionArea: { control: 'boolean', name: '액션 영역' },
  },
  render: (args) => {
    const [visible, setVisible] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const sections = args.showSectionHeaders
      ? [
          {
            title: '레이어 1',
            items: [
              {
                id: 'btc',
                label: '비트코인 (BTC)',
                description: args.showDescriptions ? '시가총액 1위 암호화폐' : undefined,
                icon: args.showIcons ? <Bitcoin size={20} color="#3e4651" /> : undefined,
              },
              {
                id: 'eth',
                label: '이더리움 (ETH)',
                description: args.showDescriptions ? '스마트 컨트랙트 플랫폼' : undefined,
                icon: args.showIcons ? <Coins size={20} color="#3e4651" /> : undefined,
              },
              {
                id: 'sol',
                label: '솔라나 (SOL)',
                description: args.showDescriptions ? '고속 블록체인' : undefined,
                icon: args.showIcons ? <Zap size={20} color="#3e4651" /> : undefined,
              },
            ],
          },
          {
            title: '레이어 2',
            items: [
              {
                id: 'xrp',
                label: '리플 (XRP)',
                description: args.showDescriptions ? '글로벌 송금 네트워크' : undefined,
                icon: args.showIcons ? <Globe size={20} color="#3e4651" /> : undefined,
              },
              {
                id: 'ada',
                label: '에이다 (ADA)',
                description: args.showDescriptions ? '학술 기반 블록체인' : undefined,
                icon: args.showIcons ? <BookOpen size={20} color="#3e4651" /> : undefined,
              },
            ],
          },
        ]
      : [
          {
            items: [
              {
                id: 'btc',
                label: '비트코인 (BTC)',
                description: args.showDescriptions ? '시가총액 1위 암호화폐' : undefined,
                icon: args.showIcons ? <Bitcoin size={20} color="#3e4651" /> : undefined,
              },
              {
                id: 'eth',
                label: '이더리움 (ETH)',
                description: args.showDescriptions ? '스마트 컨트랙트 플랫폼' : undefined,
                icon: args.showIcons ? <Coins size={20} color="#3e4651" /> : undefined,
              },
              {
                id: 'sol',
                label: '솔라나 (SOL)',
                description: args.showDescriptions ? '고속 블록체인' : undefined,
                icon: args.showIcons ? <Zap size={20} color="#3e4651" /> : undefined,
              },
              {
                id: 'xrp',
                label: '리플 (XRP)',
                description: args.showDescriptions ? '글로벌 송금 네트워크' : undefined,
                icon: args.showIcons ? <Globe size={20} color="#3e4651" /> : undefined,
              },
              {
                id: 'ada',
                label: '에이다 (ADA)',
                description: args.showDescriptions ? '학술 기반 블록체인' : undefined,
                icon: args.showIcons ? <BookOpen size={20} color="#3e4651" /> : undefined,
              },
            ],
          },
        ];

    const actionArea = args.showActionArea ? (
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <Button
          variant="solid"
          color="assistive"
          size="medium"
          display="full"
          onPress={() => {
            setSelectedIds([]);
            setVisible(false);
          }}
        >
          취소
        </Button>
        <Button
          variant="solid"
          color="primary"
          size="medium"
          display="full"
          onPress={() => setVisible(false)}
        >
          확인
        </Button>
      </View>
    ) : undefined;

    return (
      <Menu
        trigger={
          <Button
            variant="outlined"
            color="secondary"
            size="medium"
            onPress={() => setVisible(true)}
          >
            메뉴 열기
          </Button>
        }
        sections={sections}
        selectionMode={args.selectionMode}
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        actionArea={actionArea}
        visible={visible}
        onVisibleChange={setVisible}
      />
    );
  },
};

export const SingleSelect: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const sections = [
      {
        items: [
          {
            id: 'btc',
            label: '비트코인 (BTC)',
            description: '시가총액 1위 암호화폐',
            icon: <Bitcoin size={20} color="#3e4651" />,
          },
          {
            id: 'eth',
            label: '이더리움 (ETH)',
            description: '스마트 컨트랙트 플랫폼',
            icon: <Coins size={20} color="#3e4651" />,
          },
          {
            id: 'sol',
            label: '솔라나 (SOL)',
            description: '고속 블록체인',
            icon: <Zap size={20} color="#3e4651" />,
          },
        ],
      },
    ];

    return (
      <Menu
        trigger={
          <Button
            variant="outlined"
            color="secondary"
            size="medium"
            onPress={() => setVisible(true)}
          >
            암호화폐 선택
          </Button>
        }
        sections={sections}
        selectionMode="single"
        selectedIds={selectedIds}
        onSelectionChange={(ids) => {
          setSelectedIds(ids);
          setVisible(false);
        }}
        visible={visible}
        onVisibleChange={setVisible}
      />
    );
  },
};

export const RadioSelect: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>(['eth']);

    const sections = [
      {
        items: [
          {
            id: 'btc',
            label: '비트코인 (BTC)',
            description: '시가총액 1위 암호화폐',
            icon: <Bitcoin size={20} color="#3e4651" />,
          },
          {
            id: 'eth',
            label: '이더리움 (ETH)',
            description: '스마트 컨트랙트 플랫폼',
            icon: <Coins size={20} color="#3e4651" />,
          },
          {
            id: 'sol',
            label: '솔라나 (SOL)',
            description: '고속 블록체인',
            icon: <Zap size={20} color="#3e4651" />,
          },
        ],
      },
    ];

    return (
      <Menu
        trigger={
          <Button
            variant="outlined"
            color="secondary"
            size="medium"
            onPress={() => setVisible(true)}
          >
            라디오 선택
          </Button>
        }
        sections={sections}
        selectionMode="radio"
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        actionArea={
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Button
              variant="solid"
              color="assistive"
              size="medium"
              display="full"
              onPress={() => setVisible(false)}
            >
              취소
            </Button>
            <Button
              variant="solid"
              color="primary"
              size="medium"
              display="full"
              onPress={() => setVisible(false)}
            >
              확인
            </Button>
          </View>
        }
        visible={visible}
        onVisibleChange={setVisible}
      />
    );
  },
};

export const CheckboxSelect: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>(['btc', 'eth']);

    const sections = [
      {
        items: [
          {
            id: 'btc',
            label: '비트코인 (BTC)',
            description: '시가총액 1위 암호화폐',
            icon: <Bitcoin size={20} color="#3e4651" />,
          },
          {
            id: 'eth',
            label: '이더리움 (ETH)',
            description: '스마트 컨트랙트 플랫폼',
            icon: <Coins size={20} color="#3e4651" />,
          },
          {
            id: 'sol',
            label: '솔라나 (SOL)',
            description: '고속 블록체인',
            icon: <Zap size={20} color="#3e4651" />,
          },
          {
            id: 'xrp',
            label: '리플 (XRP)',
            description: '글로벌 송금 네트워크',
            icon: <Globe size={20} color="#3e4651" />,
          },
        ],
      },
    ];

    return (
      <Menu
        trigger={
          <Button
            variant="outlined"
            color="secondary"
            size="medium"
            onPress={() => setVisible(true)}
          >
            체크박스 선택
          </Button>
        }
        sections={sections}
        selectionMode="checkbox"
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        actionArea={
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Button
              variant="solid"
              color="assistive"
              size="medium"
              display="full"
              onPress={() => setVisible(false)}
            >
              취소
            </Button>
            <Button
              variant="solid"
              color="primary"
              size="medium"
              display="full"
              onPress={() => setVisible(false)}
            >
              확인
            </Button>
          </View>
        }
        visible={visible}
        onVisibleChange={setVisible}
      />
    );
  },
};

export const WithSections: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const sections = [
      {
        title: '레이어 1',
        items: [
          {
            id: 'btc',
            label: '비트코인 (BTC)',
            icon: <Bitcoin size={20} color="#3e4651" />,
          },
          {
            id: 'eth',
            label: '이더리움 (ETH)',
            icon: <Coins size={20} color="#3e4651" />,
          },
          {
            id: 'sol',
            label: '솔라나 (SOL)',
            icon: <Zap size={20} color="#3e4651" />,
          },
        ],
      },
      {
        title: '레이어 2',
        items: [
          {
            id: 'xrp',
            label: '리플 (XRP)',
            icon: <Globe size={20} color="#3e4651" />,
          },
          {
            id: 'ada',
            label: '에이다 (ADA)',
            icon: <BookOpen size={20} color="#3e4651" />,
          },
        ],
      },
    ];

    return (
      <Menu
        trigger={
          <Button
            variant="outlined"
            color="secondary"
            size="medium"
            onPress={() => setVisible(true)}
          >
            암호화폐 카테고리
          </Button>
        }
        sections={sections}
        selectionMode="single"
        selectedIds={selectedIds}
        onSelectionChange={(ids) => {
          setSelectedIds(ids);
          setVisible(false);
        }}
        visible={visible}
        onVisibleChange={setVisible}
      />
    );
  },
};

export const WithDescriptions: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const sections = [
      {
        items: [
          {
            id: 'btc',
            label: '비트코인 (BTC)',
            description: '시가총액 1위 암호화폐로, 디지털 금으로 불립니다',
          },
          {
            id: 'eth',
            label: '이더리움 (ETH)',
            description: '스마트 컨트랙트를 지원하는 블록체인 플랫폼',
          },
          {
            id: 'sol',
            label: '솔라나 (SOL)',
            description: '초고속 트랜잭션 처리가 가능한 블록체인',
          },
        ],
      },
    ];

    return (
      <Menu
        trigger={
          <Button
            variant="outlined"
            color="secondary"
            size="medium"
            onPress={() => setVisible(true)}
          >
            암호화폐 상세
          </Button>
        }
        sections={sections}
        selectionMode="single"
        selectedIds={selectedIds}
        onSelectionChange={(ids) => {
          setSelectedIds(ids);
          setVisible(false);
        }}
        visible={visible}
        onVisibleChange={setVisible}
      />
    );
  },
};

export const WithIcons: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const sections = [
      {
        items: [
          {
            id: 'btc',
            label: '비트코인 (BTC)',
            icon: <Bitcoin size={20} color="#3e4651" />,
          },
          {
            id: 'eth',
            label: '이더리움 (ETH)',
            icon: <Coins size={20} color="#3e4651" />,
          },
          {
            id: 'sol',
            label: '솔라나 (SOL)',
            icon: <Zap size={20} color="#3e4651" />,
          },
          {
            id: 'xrp',
            label: '리플 (XRP)',
            icon: <Globe size={20} color="#3e4651" />,
          },
        ],
      },
    ];

    return (
      <Menu
        trigger={
          <Button
            variant="outlined"
            color="secondary"
            size="medium"
            onPress={() => setVisible(true)}
          >
            암호화폐 아이콘
          </Button>
        }
        sections={sections}
        selectionMode="single"
        selectedIds={selectedIds}
        onSelectionChange={(ids) => {
          setSelectedIds(ids);
          setVisible(false);
        }}
        visible={visible}
        onVisibleChange={setVisible}
      />
    );
  },
};

export const WithDestructive: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);

    const sections = [
      {
        items: [
          {
            id: 'settings',
            label: '설정',
            icon: <Settings size={20} color="#3e4651" />,
          },
          {
            id: 'clear',
            label: '데이터 초기화',
            icon: <Trash2 size={20} color="#ef4444" />,
            destructive: true,
          },
          {
            id: 'delete',
            label: '계정 삭제',
            icon: <Trash2 size={20} color="#ef4444" />,
            destructive: true,
          },
        ],
      },
    ];

    return (
      <Menu
        trigger={
          <Button
            variant="outlined"
            color="secondary"
            size="medium"
            onPress={() => setVisible(true)}
          >
            계정 관리
          </Button>
        }
        sections={sections}
        visible={visible}
        onVisibleChange={setVisible}
      />
    );
  },
};

export const WithActionArea: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>(['eth']);

    const sections = [
      {
        items: [
          {
            id: 'btc',
            label: '비트코인 (BTC)',
            description: '시가총액 1위 암호화폐',
            icon: <Bitcoin size={20} color="#3e4651" />,
          },
          {
            id: 'eth',
            label: '이더리움 (ETH)',
            description: '스마트 컨트랙트 플랫폼',
            icon: <Coins size={20} color="#3e4651" />,
          },
          {
            id: 'sol',
            label: '솔라나 (SOL)',
            description: '고속 블록체인',
            icon: <Zap size={20} color="#3e4651" />,
          },
        ],
      },
    ];

    return (
      <Menu
        trigger={
          <Button
            variant="outlined"
            color="secondary"
            size="medium"
            onPress={() => setVisible(true)}
          >
            선택 후 확인
          </Button>
        }
        sections={sections}
        selectionMode="radio"
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        actionArea={
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Button
              variant="solid"
              color="assistive"
              size="medium"
              display="full"
              onPress={() => {
                setSelectedIds(['eth']);
                setVisible(false);
              }}
            >
              취소
            </Button>
            <Button
              variant="solid"
              color="primary"
              size="medium"
              display="full"
              onPress={() => {
                console.log('선택된 항목:', selectedIds);
                setVisible(false);
              }}
            >
              확인
            </Button>
          </View>
        }
        visible={visible}
        onVisibleChange={setVisible}
      />
    );
  },
};

export const InPageUsage: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    const [selectedCrypto, setSelectedCrypto] = useState<string>('btc');

    const cryptoNames: Record<string, string> = {
      btc: '비트코인',
      eth: '이더리움',
      sol: '솔라나',
      xrp: '리플',
    };

    const sections = [
      {
        items: [
          {
            id: 'btc',
            label: '비트코인 (BTC)',
            icon: <Bitcoin size={20} color="#3e4651" />,
          },
          {
            id: 'eth',
            label: '이더리움 (ETH)',
            icon: <Coins size={20} color="#3e4651" />,
          },
          {
            id: 'sol',
            label: '솔라나 (SOL)',
            icon: <Zap size={20} color="#3e4651" />,
          },
          {
            id: 'xrp',
            label: '리플 (XRP)',
            icon: <Globe size={20} color="#3e4651" />,
          },
        ],
      },
    ];

    return (
      <View style={{ padding: 20, backgroundColor: '#f7f8f9', borderRadius: 12 }}>
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#3e4651', marginBottom: 8 }}>
            선택된 암호화폐
          </Text>
          <Text style={{ fontSize: 15, color: '#68707a' }}>
            {cryptoNames[selectedCrypto]}
          </Text>
        </View>
        <Menu
          trigger={
            <Button
              variant="outlined"
              color="secondary"
              size="medium"
              onPress={() => setVisible(true)}
            >
              암호화폐 변경
            </Button>
          }
          sections={sections}
          selectionMode="single"
          selectedIds={[selectedCrypto]}
          onSelectionChange={(ids) => {
            if (ids.length > 0) {
              setSelectedCrypto(ids[0]);
            }
            setVisible(false);
          }}
          visible={visible}
          onVisibleChange={setVisible}
        />
      </View>
    );
  },
};
