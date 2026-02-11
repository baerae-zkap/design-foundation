import { SectionMessage } from '@baerae-zkap/design-system/native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View, Text } from 'react-native';
import { fn } from 'storybook/test';

const meta = {
  title: '@baerae-zkap/Feedback/Section message',
  component: SectionMessage,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <View style={{ width: 360, padding: 16 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    onClose: { table: { disable: true } },
    trailingAction: { table: { disable: true } },
    bottomAction: { table: { disable: true } },
    contentColor: { table: { disable: true } },
    backgroundColor: { table: { disable: true } },
    icon: { table: { disable: true } },
  },
} as Meta<typeof SectionMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    status: 'info',
    heading: '안내',
    description: '거래소 연결 시 자산 정보가 자동으로 동기화돼요.',
    showClose: false as any,
    showTrailingAction: false as any,
    showBottomAction: false as any,
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['custom', 'info', 'success', 'warning', 'error'],
    },
    heading: { control: 'text' },
    description: { control: 'text' },
    showClose: {
      control: 'boolean',
      name: '닫기 버튼',
      description: 'onClose 활성화',
    },
    showTrailingAction: {
      control: 'boolean',
      name: '트레일링 액션',
      description: '우측 인라인 버튼',
    },
    showBottomAction: {
      control: 'boolean',
      name: '바텀 액션',
      description: '하단 버튼',
    },
  },
  render: (args: any) => (
    <SectionMessage
      status={args.status}
      heading={args.heading}
      description={args.description}
      onClose={args.showClose ? fn() : undefined}
      trailingAction={args.showTrailingAction ? { label: '자세히', onPress: fn() } : undefined}
      bottomAction={args.showBottomAction ? { label: '확인하기', onPress: fn() } : undefined}
    />
  ),
};

export const Status: Story = {
  render: () => (
    <View style={{ gap: 16, width: '100%' }}>
      <SectionMessage
        status="custom"
        description="맞춤 메시지를 자유롭게 구성할 수 있어요."
      />
      <SectionMessage
        status="info"
        description="거래소 점검 시간에는 자산 조회가 제한될 수 있어요."
      />
      <SectionMessage
        status="success"
        description="거래소 연결이 완료되었어요."
      />
      <SectionMessage
        status="warning"
        description="일부 거래소의 API 키가 곧 만료돼요."
      />
      <SectionMessage
        status="error"
        description="자산 데이터를 불러오는 데 실패했어요."
      />
    </View>
  ),
};

export const WithHeading: Story = {
  render: () => (
    <View style={{ gap: 16, width: '100%' }}>
      <SectionMessage
        status="info"
        heading="자산 동기화 안내"
        description="매일 오전 9시에 자동으로 자산이 동기화돼요."
      />
      <SectionMessage
        status="warning"
        heading="API 키 만료 예정"
        description="바이낸스 API 키가 3일 후 만료됩니다. 갱신해주세요."
      />
    </View>
  ),
};

export const WithCloseButton: Story = {
  render: () => (
    <View style={{ gap: 16, width: '100%' }}>
      <SectionMessage
        status="info"
        description="거래소 연결 시 자산 정보가 자동으로 동기화돼요."
        onClose={fn()}
      />
      <SectionMessage
        status="warning"
        heading="API 키 만료 예정"
        description="바이낸스 API 키가 3일 후 만료됩니다. 갱신해주세요."
        onClose={fn()}
      />
    </View>
  ),
};

export const WithTrailingAction: Story = {
  render: () => (
    <View style={{ gap: 16, width: '100%' }}>
      <SectionMessage
        status="info"
        description="새로운 기능이 추가되었어요."
        trailingAction={{
          label: '자세히',
          onPress: fn(),
        }}
      />
      <SectionMessage
        status="success"
        description="포트폴리오가 업데이트되었어요."
        trailingAction={{
          label: '확인',
          onPress: fn(),
        }}
      />
    </View>
  ),
};

export const WithBottomAction: Story = {
  render: () => (
    <View style={{ gap: 16, width: '100%' }}>
      <SectionMessage
        status="warning"
        heading="API 키 갱신 필요"
        description="바이낸스 API 키가 만료되었어요. 새로운 키를 등록해주세요."
        bottomAction={{
          label: '키 갱신하기',
          onPress: fn(),
        }}
      />
      <SectionMessage
        status="error"
        heading="동기화 실패"
        description="서버 연결에 실패했어요. 다시 시도해주세요."
        bottomAction={{
          label: '다시 시도',
          onPress: fn(),
        }}
      />
    </View>
  ),
};

export const CustomizeExample: Story = {
  render: () => (
    <View style={{ gap: 16, width: '100%' }}>
      <SectionMessage
        status="custom"
        description="보라색 테마로 커스터마이징된 메시지예요."
        backgroundColor="#f3e8ff"
        contentColor="#7c3aed"
      />
      <SectionMessage
        status="custom"
        heading="브랜드 테마"
        description="브랜드 컬러로 메시지를 강조할 수 있어요."
        backgroundColor="#e0f2fe"
        contentColor="#0369a1"
      />
    </View>
  ),
  argTypes: {
    contentColor: {
      table: { disable: true },
    },
    backgroundColor: {
      table: { disable: true },
    },
  },
};

export const InPageUsage: Story = {
  render: () => (
    <View style={{ width: '100%', gap: 20 }}>
      <View>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>
          설정
        </Text>
        <Text style={{ fontSize: 14, color: '#64748b', marginBottom: 16 }}>
          거래소 연동 및 알림 설정을 관리하세요
        </Text>
      </View>

      <SectionMessage
        status="info"
        heading="자동 동기화 활성화됨"
        description="매일 오전 9시에 자동으로 자산이 동기화돼요. 설정에서 변경할 수 있어요."
        trailingAction={{
          label: '설정',
          onPress: fn(),
        }}
        onClose={fn()}
      />

      <View style={{ gap: 12 }}>
        <View
          style={{
            padding: 16,
            borderRadius: 12,
            backgroundColor: '#f8fafc',
            borderWidth: 1,
            borderColor: '#e2e8f0',
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 4 }}>
            거래소 연동
          </Text>
          <Text style={{ fontSize: 13, color: '#64748b' }}>
            바이낸스, 업비트 연동됨
          </Text>
        </View>

        <View
          style={{
            padding: 16,
            borderRadius: 12,
            backgroundColor: '#f8fafc',
            borderWidth: 1,
            borderColor: '#e2e8f0',
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 4 }}>
            알림 설정
          </Text>
          <Text style={{ fontSize: 13, color: '#64748b' }}>
            가격 알림, 뉴스 알림 활성화됨
          </Text>
        </View>
      </View>
    </View>
  ),
  decorators: [
    (Story) => (
      <View style={{ width: 360, padding: 20 }}>
        <Story />
      </View>
    ),
  ],
};
