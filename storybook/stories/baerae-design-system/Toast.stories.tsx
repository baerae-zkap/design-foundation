import { Toast } from '@baerae-zkap/design-system/native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View, Text } from 'react-native';
import { fn } from 'storybook/test';
import { CircleCheck, CircleX, TriangleAlert, Bell, Star, Zap } from 'lucide-react';
import React from 'react';

const meta = {
  title: '@baerae-zkap/Feedback/Toast',
  component: Toast,
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
    leadingContent: { table: { disable: true } },
    action: { table: { disable: true } },
    onClose: { table: { disable: true } },
    onDismiss: { table: { disable: true } },
    style: { table: { disable: true } },
  },
} as Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    status: 'default',
    message: '변경사항이 저장되었습니다',
    duration: 0,
    position: 'bottom',
    showLeadingContent: false as any,
    showAction: false as any,
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
      name: '상태',
      description: '토스트 상태 (배경색/아이콘 결정)',
    },
    message: {
      control: 'text',
      name: '메시지',
      description: '토스트 메시지',
    },
    duration: {
      control: 'number',
      name: '지속 시간 (ms)',
      description: '자동 닫힘 시간 (0=무제한)',
    },
    position: {
      control: 'select',
      options: ['top', 'bottom'],
      name: '위치',
      description: '토스트 위치',
    },
    showLeadingContent: {
      control: 'boolean',
      name: '커스텀 아이콘',
      description: '리딩 콘텐츠 (커스텀 아이콘) 표시',
    },
    showAction: {
      control: 'boolean',
      name: '액션 버튼',
      description: '액션 버튼 표시 (bottom 전용)',
    },
  },
  render: (args: any) => (
    <Toast
      status={args.status}
      message={args.message}
      duration={args.duration}
      position={args.position}
      leadingContent={args.showLeadingContent ? <Bell size={20} color="#6b7280" /> : undefined}
      action={args.showAction ? { label: '실행취소', onPress: fn() } : undefined}
      onDismiss={fn()}
    />
  ),
};

export const Status: Story = {
  name: '상태별',
  render: () => (
    <View style={{ gap: 16 }}>
      <Toast status="default" message="변경사항이 저장되었습니다" duration={0} />
      <Toast status="success" message="거래소 연결이 완료되었어요" duration={0} />
      <Toast status="warning" message="네트워크 연결이 불안정합니다" duration={0} />
      <Toast status="error" message="자산 데이터를 불러오지 못했어요" duration={0} />
    </View>
  ),
};

export const LongMessage: Story = {
  name: '긴 메시지',
  render: () => (
    <View style={{ gap: 16 }}>
      <Toast
        status="default"
        message="이것은 두 줄로 표시되는 긴 메시지 예제입니다. 토스트는 자동으로 줄바꿈됩니다"
        duration={0}
      />
      <Toast
        status="success"
        message="거래소 연결이 성공적으로 완료되었습니다. 이제 실시간으로 자산 정보를 확인하실 수 있습니다"
        duration={0}
      />
      <Toast
        status="warning"
        message="네트워크 연결이 불안정합니다. 일부 데이터가 지연될 수 있습니다. 잠시 후 다시 시도해주세요"
        duration={0}
      />
      <Toast
        status="error"
        message="자산 데이터를 불러오는 중 오류가 발생했습니다. 네트워크 상태를 확인하고 다시 시도해주세요"
        duration={0}
      />
    </View>
  ),
};

export const WithLeadingContent: Story = {
  name: '커스텀 아이콘',
  render: () => (
    <View style={{ gap: 16 }}>
      <Toast
        status="default"
        message="새로운 알림이 도착했습니다"
        leadingContent={<Bell size={20} color="#6b7280" />}
        duration={0}
      />
      <Toast
        status="success"
        message="즐겨찾기에 추가되었습니다"
        leadingContent={<Star size={20} color="#22c55e" />}
        duration={0}
      />
      <Toast
        status="warning"
        message="빠른 작업이 실행되었습니다"
        leadingContent={<Zap size={20} color="#f59e0b" />}
        duration={0}
      />
    </View>
  ),
};

export const WithAction: Story = {
  name: '액션 버튼',
  render: () => (
    <View style={{ gap: 16 }}>
      <Toast
        status="default"
        message="항목이 삭제되었습니다"
        action={{ label: '실행취소', onPress: fn() }}
        duration={0}
      />
      <Toast
        status="success"
        message="거래소 연결이 완료되었어요"
        action={{ label: '확인', onPress: fn() }}
        duration={0}
      />
      <Toast
        status="warning"
        message="네트워크 연결이 불안정합니다"
        action={{ label: '재시도', onPress: fn() }}
        duration={0}
      />
      <Toast
        status="error"
        message="자산 동기화에 실패했어요"
        action={{ label: '다시 시도', onPress: fn() }}
        duration={0}
      />
    </View>
  ),
};

export const Positions: Story = {
  name: '위치별',
  render: () => (
    <View style={{ gap: 32 }}>
      <View style={{ gap: 8 }}>
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#6b7280', marginBottom: 8 }}>
          상단 (Top)
        </Text>
        <Toast
          status="success"
          message="상단에 표시되는 토스트입니다"
          position="top"
          duration={0}
        />
      </View>

      <View style={{ gap: 8 }}>
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#6b7280', marginBottom: 8 }}>
          하단 (Bottom)
        </Text>
        <Toast
          status="default"
          message="하단에 표시되는 토스트입니다"
          position="bottom"
          duration={0}
        />
      </View>
    </View>
  ),
};

export const InPageUsage: Story = {
  name: '페이지 내 사용',
  render: () => (
    <View
      style={{
        width: 360,
        height: 640,
        backgroundColor: '#f8fafc',
        borderRadius: 12,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* 헤더 */}
      <View
        style={{
          height: 56,
          backgroundColor: 'white',
          borderBottomWidth: 1,
          borderBottomColor: '#e5e7eb',
          justifyContent: 'center',
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ fontSize: 17, fontWeight: '600', color: '#1f2937' }}>자산 관리</Text>
      </View>

      {/* 콘텐츠 */}
      <View style={{ flex: 1, padding: 20, gap: 12 }}>
        <View
          style={{
            padding: 16,
            backgroundColor: 'white',
            borderRadius: 12,
            borderWidth: 1,
            borderColor: '#e5e7eb',
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: '600', color: '#1f2937', marginBottom: 4 }}>
            총 자산
          </Text>
          <Text style={{ fontSize: 24, fontWeight: '700', color: '#1f2937' }}>
            ₩ 1,234,567
          </Text>
        </View>

        <View
          style={{
            padding: 16,
            backgroundColor: 'white',
            borderRadius: 12,
            borderWidth: 1,
            borderColor: '#e5e7eb',
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: '600', color: '#1f2937', marginBottom: 8 }}>
            최근 거래
          </Text>
          <Text style={{ fontSize: 14, color: '#6b7280' }}>거래 내역이 없습니다</Text>
        </View>
      </View>

      {/* 토스트 (화면 하단) */}
      <View
        style={{
          position: 'absolute',
          bottom: 32,
          left: 20,
          right: 20,
        }}
      >
        <Toast
          status="success"
          message="거래소 연결이 완료되었어요"
          duration={0}
        />
      </View>
    </View>
  ),
};

export const AllVariants: Story = {
  name: '전체 변형',
  render: () => (
    <View style={{ gap: 32 }}>
      {/* 상태별 */}
      <View style={{ gap: 8 }}>
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#1f2937', marginBottom: 8 }}>
          상태별 (Status)
        </Text>
        <View style={{ gap: 12 }}>
          <Toast status="default" message="기본 토스트 메시지입니다" duration={0} />
          <Toast status="success" message="작업이 성공적으로 완료되었습니다" duration={0} />
          <Toast status="warning" message="주의가 필요한 상황입니다" duration={0} />
          <Toast status="error" message="오류가 발생했습니다" duration={0} />
        </View>
      </View>

      {/* 긴 메시지 */}
      <View style={{ gap: 8 }}>
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#1f2937', marginBottom: 8 }}>
          긴 메시지
        </Text>
        <View style={{ gap: 12 }}>
          <Toast
            status="default"
            message="이것은 두 줄로 표시되는 긴 메시지 예제입니다. 토스트는 자동으로 줄바꿈됩니다"
            duration={0}
          />
          <Toast
            status="success"
            message="거래소 연결이 성공적으로 완료되었습니다. 이제 실시간으로 자산 정보를 확인하실 수 있습니다"
            duration={0}
          />
        </View>
      </View>

      {/* 커스텀 아이콘 */}
      <View style={{ gap: 8 }}>
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#1f2937', marginBottom: 8 }}>
          커스텀 아이콘
        </Text>
        <View style={{ gap: 12 }}>
          <Toast
            status="default"
            message="새로운 알림이 도착했습니다"
            leadingContent={<Bell size={20} color="#6b7280" />}
            duration={0}
          />
          <Toast
            status="success"
            message="즐겨찾기에 추가되었습니다"
            leadingContent={<Star size={20} color="#22c55e" />}
            duration={0}
          />
          <Toast
            status="warning"
            message="빠른 작업이 실행되었습니다"
            leadingContent={<Zap size={20} color="#f59e0b" />}
            duration={0}
          />
        </View>
      </View>

      {/* 위치별 */}
      <View style={{ gap: 8 }}>
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#1f2937', marginBottom: 8 }}>
          위치별 (Position)
        </Text>
        <View style={{ gap: 12 }}>
          <View style={{ gap: 4 }}>
            <Text style={{ fontSize: 12, color: '#6b7280' }}>Top</Text>
            <Toast status="success" message="상단 위치" position="top" duration={0} />
          </View>
          <View style={{ gap: 4 }}>
            <Text style={{ fontSize: 12, color: '#6b7280' }}>Bottom</Text>
            <Toast status="default" message="하단 위치" position="bottom" duration={0} />
          </View>
        </View>
      </View>
    </View>
  ),
};
