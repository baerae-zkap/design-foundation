import { Snackbar } from '@baerae-zkap/design-system/native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View, Text } from 'react-native';
import { fn } from 'storybook/test';
import { Check, Info, AlertTriangle, Bell } from 'lucide-react';

const meta = {
  title: '@baerae-zkap/Feedback/Snackbar',
  component: Snackbar,
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
    heading: { table: { disable: true } },
    leadingContent: { table: { disable: true } },
    action: { table: { disable: true } },
    onClose: { table: { disable: true } },
    onDismiss: { table: { disable: true } },
    style: { table: { disable: true } },
  },
} as Meta<typeof Snackbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    description: '작업이 완료되었습니다',
    duration: 0,
    showHeading: false as any,
    showLeadingContent: false as any,
    showAction: false as any,
    showClose: false as any,
  },
  argTypes: {
    description: {
      control: 'text',
      name: '설명',
      description: '스낵바 설명 텍스트',
    },
    duration: {
      control: 'number',
      name: '지속 시간 (ms)',
      description: '자동 사라짐 시간 (0=무제한)',
    },
    showHeading: {
      control: 'boolean',
      name: '제목',
      description: '헤딩 표시',
    },
    showLeadingContent: {
      control: 'boolean',
      name: '리딩 콘텐츠',
      description: '좌측 아이콘 표시',
    },
    showAction: {
      control: 'boolean',
      name: '액션 버튼',
      description: '액션 버튼 표시',
    },
    showClose: {
      control: 'boolean',
      name: '닫기 버튼',
      description: '닫기 버튼 표시',
    },
  },
  render: (args: any) => (
    <Snackbar
      description={args.description}
      duration={args.duration}
      heading={args.showHeading ? '알림' : undefined}
      leadingContent={args.showLeadingContent ? <Check size={20} color="#10B981" /> : undefined}
      action={args.showAction ? { label: '실행취소', onPress: fn() } : undefined}
      onClose={args.showClose ? fn() : undefined}
    />
  ),
};

export const DescriptionOnly: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Snackbar description="간단한 알림 메시지" duration={0} />
      <Snackbar description="파일이 성공적으로 저장되었습니다" duration={0} />
      <Snackbar
        description="네트워크 연결이 불안정합니다. 잠시 후 다시 시도해주세요"
        duration={0}
      />
    </View>
  ),
};

export const WithHeading: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Snackbar
        heading="업로드 완료"
        description="파일이 성공적으로 업로드되었습니다"
        duration={0}
      />
      <Snackbar
        heading="자산 추가됨"
        description="비트코인이 포트폴리오에 추가되었습니다"
        duration={0}
      />
      <Snackbar
        heading="알림"
        description="새로운 업데이트가 있습니다"
        duration={0}
      />
    </View>
  ),
};

export const WithAction: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Snackbar
        description="거래가 취소되었습니다"
        action={{ label: '실행취소', onPress: fn() }}
        duration={0}
      />
      <Snackbar
        heading="자산 삭제됨"
        description="이더리움이 포트폴리오에서 삭제되었습니다"
        action={{ label: '복구', onPress: fn() }}
        duration={0}
      />
      <Snackbar
        description="변경사항이 저장되었습니다"
        action={{ label: '보기', onPress: fn() }}
        duration={0}
      />
    </View>
  ),
};

export const WithCloseButton: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Snackbar
        description="파일 다운로드가 시작되었습니다"
        onClose={fn()}
        duration={0}
      />
      <Snackbar
        heading="업데이트 알림"
        description="새로운 버전이 출시되었습니다"
        onClose={fn()}
        duration={0}
      />
      <Snackbar
        heading="연결 상태"
        description="거래소 연결이 완료되었습니다"
        onClose={fn()}
        duration={0}
      />
    </View>
  ),
};

export const WithLeadingContent: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Snackbar
        leadingContent={<Check size={20} color="#10B981" />}
        heading="완료"
        description="작업이 성공적으로 완료되었습니다"
        duration={0}
      />
      <Snackbar
        leadingContent={<Info size={20} color="#3B82F6" />}
        heading="정보"
        description="새로운 기능을 확인해보세요"
        duration={0}
      />
      <Snackbar
        leadingContent={<AlertTriangle size={20} color="#F59E0B" />}
        heading="주의"
        description="네트워크 연결 상태를 확인해주세요"
        duration={0}
      />
      <Snackbar
        leadingContent={<Bell size={20} color="#8B5CF6" />}
        heading="알림"
        description="거래소에서 새로운 메시지가 도착했습니다"
        duration={0}
      />
    </View>
  ),
};

export const FullFeature: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Snackbar
        leadingContent={<Check size={20} color="#10B981" />}
        heading="거래 완료"
        description="비트코인 구매가 완료되었습니다"
        action={{ label: '확인', onPress: fn() }}
        onClose={fn()}
        duration={0}
      />
      <Snackbar
        leadingContent={<Info size={20} color="#3B82F6" />}
        heading="자산 업데이트"
        description="포트폴리오 가치가 업데이트되었습니다"
        action={{ label: '보기', onPress: fn() }}
        onClose={fn()}
        duration={0}
      />
      <Snackbar
        leadingContent={<AlertTriangle size={20} color="#F59E0B" />}
        heading="주의 필요"
        description="가격 변동이 감지되었습니다"
        action={{ label: '자세히', onPress: fn() }}
        onClose={fn()}
        duration={0}
      />
    </View>
  ),
};

export const InPageUsage: Story = {
  render: () => (
    <View style={{ width: 360, minHeight: 400 }}>
      <View style={{ padding: 16, gap: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>자산 관리</Text>
        <Text style={{ fontSize: 16, color: '#6B7280' }}>
          포트폴리오를 관리하고 자산을 추적하세요
        </Text>
        <View
          style={{
            height: 120,
            backgroundColor: '#F3F4F6',
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#9CA3AF' }}>자산 카드 영역</Text>
        </View>
      </View>

      <View style={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
        <Snackbar
          leadingContent={<Check size={20} color="#10B981" />}
          heading="자산 추가됨"
          description="이더리움이 포트폴리오에 추가되었습니다"
          action={{ label: '실행취소', onPress: fn() }}
          onClose={fn()}
          duration={0}
        />
      </View>
    </View>
  ),
  decorators: [
    (Story) => (
      <View style={{ width: 360 }}>
        <Story />
      </View>
    ),
  ],
};
