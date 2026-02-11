import { ListCell } from '@baerae-zkap/design-system/native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View, Text } from 'react-native';
import { fn } from 'storybook/test';
import { ChevronRight as ChevronRightIcon } from 'lucide-react-native';

// Helper Components
function LeadingIcon({ emoji, bgColor }: { emoji: string; bgColor: string }) {
  return (
    <View
      style={{
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: bgColor,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ fontSize: 16 }}>{emoji}</Text>
    </View>
  );
}

function ChevronRight() {
  return <ChevronRightIcon size={20} color="#94a3b8" strokeWidth={2} />;
}

function ValueText({ value }: { value: string }) {
  return <Text style={{ fontSize: 14, color: '#64748b' }}>{value}</Text>;
}

function Badge({ count }: { count: number }) {
  return (
    <View
      style={{
        minWidth: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#ef4444',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 6,
      }}
    >
      <Text style={{ fontSize: 12, color: 'white', fontWeight: '600' }}>
        {count}
      </Text>
    </View>
  );
}

function Switch({ on }: { on: boolean }) {
  return (
    <View
      style={{
        width: 44,
        height: 24,
        borderRadius: 12,
        backgroundColor: on ? '#3b82f6' : '#cbd5e1',
        padding: 2,
        justifyContent: 'center',
        alignItems: on ? 'flex-end' : 'flex-start',
      }}
    >
      <View
        style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          backgroundColor: 'white',
        }}
      />
    </View>
  );
}

const meta = {
  title: '@baerae-zkap/Contents/List cell',
  component: ListCell,
  decorators: [
    (Story) => (
      <View style={{ padding: 20, backgroundColor: '#f8fafc' }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '셀의 크기',
      table: { category: '레이아웃' },
    },
    fillWidth: {
      control: 'boolean',
      description: '전체 너비 사용',
      table: { category: '레이아웃' },
    },
    verticalAlign: {
      control: 'select',
      options: ['top', 'center'],
      description: '수직 정렬',
      table: { category: '레이아웃' },
    },
    showLeading: {
      control: 'boolean',
      description: '좌측 아이콘 표시',
      table: { category: '구성요소 토글' },
    } as any,
    showSubtitle: {
      control: 'boolean',
      description: '부제목 표시',
      table: { category: '구성요소 토글' },
    } as any,
    showTrailing: {
      control: 'boolean',
      description: '우측 콘텐츠 표시',
      table: { category: '구성요소 토글' },
    } as any,
    divider: {
      control: 'boolean',
      description: '구분선 표시',
      table: { category: '상태' },
    },
    disabled: {
      control: 'boolean',
      description: '비활성 상태',
      table: { category: '상태' },
    },
    clickable: {
      control: 'boolean',
      description: '클릭 가능',
      table: { category: '인터랙션' },
    } as any,
    leading: { table: { disable: true } },
    title: { table: { disable: true } },
    subtitle: { table: { disable: true } },
    trailing: { table: { disable: true } },
    onPress: { table: { disable: true } },
    style: { table: { disable: true } },
    testID: { table: { disable: true } },
    accessibilityLabel: { table: { disable: true } },
  },
} satisfies Meta<typeof ListCell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'medium',
    fillWidth: false,
    verticalAlign: 'center',
    showLeading: true,
    showSubtitle: true,
    showTrailing: true,
    divider: false,
    disabled: false,
    clickable: true,
  } as any,
  render: (args) => {
    const { showLeading, showSubtitle, showTrailing, clickable, ...rest } =
      args as any;
    return (
      <View
        style={{ backgroundColor: 'white', borderRadius: 12, overflow: 'hidden', width: 375 }}
      >
        <ListCell
          {...rest}
          leading={showLeading ? <LeadingIcon emoji="🔔" bgColor="#dbeafe" /> : undefined}
          title="알림 설정"
          subtitle={showSubtitle ? '앱 알림 및 마케팅 수신 설정' : undefined}
          trailing={showTrailing ? <ChevronRight /> : undefined}
          onPress={clickable ? fn() : undefined}
        />
      </View>
    );
  },
};

export const SettingsMenu: Story = {
  render: () => (
    <View
      style={{ backgroundColor: 'white', borderRadius: 12, overflow: 'hidden', width: 375 }}
    >
      <ListCell
        leading={<LeadingIcon emoji="👤" bgColor="#dbeafe" />}
        title="프로필 설정"
        subtitle="닉네임, 프로필 사진 변경"
        trailing={<ChevronRight />}
        onPress={fn()}
      />
      <ListCell
        leading={<LeadingIcon emoji="🔒" bgColor="#fce7f3" />}
        title="보안"
        subtitle="비밀번호, 2단계 인증"
        trailing={<ChevronRight />}
        onPress={fn()}
        divider
      />
      <ListCell
        leading={<LeadingIcon emoji="🔔" bgColor="#fef3c7" />}
        title="알림"
        trailing={
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <ValueText value="켜짐" />
            <ChevronRight />
          </View>
        }
        onPress={fn()}
        divider
      />
      <ListCell
        leading={<LeadingIcon emoji="🌙" bgColor="#e0e7ff" />}
        title="다크 모드"
        trailing={<Switch on={false} />}
        onPress={fn()}
        divider
      />
      <ListCell
        leading={<LeadingIcon emoji="🌐" bgColor="#d1fae5" />}
        title="언어"
        trailing={
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <ValueText value="한국어" />
            <ChevronRight />
          </View>
        }
        onPress={fn()}
        divider
      />
    </View>
  ),
};

export const ProfileList: Story = {
  render: () => (
    <View
      style={{ backgroundColor: 'white', borderRadius: 12, overflow: 'hidden', width: 375 }}
    >
      <ListCell
        leading={
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: '#3b82f6',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 16, color: 'white', fontWeight: '600' }}>
              김
            </Text>
          </View>
        }
        title="김철수"
        subtitle="chulsoo@example.com"
        trailing={<ChevronRight />}
        onPress={fn()}
      />
      <ListCell
        leading={
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: '#8b5cf6',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 16, color: 'white', fontWeight: '600' }}>
              이
            </Text>
          </View>
        }
        title="이영희"
        subtitle="younghee@example.com"
        trailing={<ChevronRight />}
        onPress={fn()}
        divider
      />
      <ListCell
        leading={
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: '#ec4899',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 16, color: 'white', fontWeight: '600' }}>
              박
            </Text>
          </View>
        }
        title="박민수"
        subtitle="minsu@example.com"
        trailing={<ChevronRight />}
        onPress={fn()}
        divider
      />
      <ListCell
        leading={
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: '#f59e0b',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 16, color: 'white', fontWeight: '600' }}>
              최
            </Text>
          </View>
        }
        title="최지은"
        subtitle="jieun@example.com"
        trailing={<ChevronRight />}
        onPress={fn()}
        divider
      />
    </View>
  ),
};

export const WithDivider: Story = {
  render: () => (
    <View
      style={{ backgroundColor: 'white', borderRadius: 12, overflow: 'hidden', width: 375 }}
    >
      <ListCell
        leading={<LeadingIcon emoji="📱" bgColor="#dbeafe" />}
        title="기기 관리"
        subtitle="연결된 기기 확인 및 관리"
        trailing={<ChevronRight />}
        onPress={fn()}
      />
      <ListCell
        leading={<LeadingIcon emoji="💳" bgColor="#fce7f3" />}
        title="입출금 수단"
        subtitle="카드 및 계좌 관리"
        trailing={<ChevronRight />}
        onPress={fn()}
        divider
      />
      <ListCell
        leading={<LeadingIcon emoji="⭐" bgColor="#fef3c7" />}
        title="즐겨찾기"
        subtitle="자주 사용하는 기능 모음"
        trailing={<ChevronRight />}
        onPress={fn()}
        divider
      />
    </View>
  ),
};

export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: '#64748b',
            marginBottom: 8,
          }}
        >
          Small
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 12,
            overflow: 'hidden',
            width: 375,
          }}
        >
          <ListCell
            size="small"
            leading={<LeadingIcon emoji="📱" bgColor="#dbeafe" />}
            title="기기 관리"
            subtitle="연결된 기기 확인"
            trailing={<ChevronRight />}
            onPress={fn()}
          />
        </View>
      </View>

      <View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: '#64748b',
            marginBottom: 8,
          }}
        >
          Medium (기본)
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 12,
            overflow: 'hidden',
            width: 375,
          }}
        >
          <ListCell
            size="medium"
            leading={<LeadingIcon emoji="📱" bgColor="#dbeafe" />}
            title="기기 관리"
            subtitle="연결된 기기 확인"
            trailing={<ChevronRight />}
            onPress={fn()}
          />
        </View>
      </View>

      <View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: '#64748b',
            marginBottom: 8,
          }}
        >
          Large
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 12,
            overflow: 'hidden',
            width: 375,
          }}
        >
          <ListCell
            size="large"
            leading={<LeadingIcon emoji="📱" bgColor="#dbeafe" />}
            title="기기 관리"
            subtitle="연결된 기기 확인"
            trailing={<ChevronRight />}
            onPress={fn()}
          />
        </View>
      </View>
    </View>
  ),
};

export const FillWidth: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: '#64748b',
            marginBottom: 8,
          }}
        >
          fillWidth={'{false}'} (기본)
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 12,
            overflow: 'hidden',
            width: 375,
          }}
        >
          <ListCell
            fillWidth={false}
            leading={<LeadingIcon emoji="🔔" bgColor="#dbeafe" />}
            title="알림 설정"
            subtitle="앱 알림 관리"
            trailing={<ChevronRight />}
            onPress={fn()}
          />
        </View>
      </View>

      <View>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: '#64748b',
            marginBottom: 8,
          }}
        >
          fillWidth={'{true}'}
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 12,
            overflow: 'hidden',
            width: 375,
          }}
        >
          <ListCell
            fillWidth={true}
            leading={<LeadingIcon emoji="🔔" bgColor="#dbeafe" />}
            title="알림 설정"
            subtitle="앱 알림 관리"
            trailing={<ChevronRight />}
            onPress={fn()}
          />
        </View>
      </View>
    </View>
  ),
};

export const VerticalAlignTop: Story = {
  render: () => (
    <View
      style={{ backgroundColor: 'white', borderRadius: 12, overflow: 'hidden', width: 375 }}
    >
      <ListCell
        verticalAlign="top"
        leading={<LeadingIcon emoji="📱" bgColor="#dbeafe" />}
        title="기기 관리"
        subtitle="연결된 모든 기기를 확인하고 관리할 수 있습니다. 로그인된 기기의 위치와 마지막 접속 시간을 확인하세요."
        trailing={<ChevronRight />}
        onPress={fn()}
      />
      <ListCell
        verticalAlign="top"
        leading={<LeadingIcon emoji="🔒" bgColor="#fce7f3" />}
        title="보안 설정"
        subtitle="2단계 인증, 생체 인증, 비밀번호 변경 등 계정 보안을 강화할 수 있는 다양한 옵션을 제공합니다."
        trailing={<ChevronRight />}
        onPress={fn()}
        divider
      />
    </View>
  ),
};

export const DisabledState: Story = {
  render: () => (
    <View
      style={{ backgroundColor: 'white', borderRadius: 12, overflow: 'hidden', width: 375 }}
    >
      <ListCell
        leading={<LeadingIcon emoji="🔔" bgColor="#dbeafe" />}
        title="알림 설정"
        subtitle="사용 가능"
        trailing={<ChevronRight />}
        onPress={fn()}
      />
      <ListCell
        leading={<LeadingIcon emoji="🔒" bgColor="#fce7f3" />}
        title="프리미엄 기능"
        subtitle="업그레이드 필요"
        trailing={<ChevronRight />}
        disabled
        divider
      />
      <ListCell
        leading={<LeadingIcon emoji="⭐" bgColor="#fef3c7" />}
        title="베타 기능"
        subtitle="곧 출시 예정"
        trailing={<ChevronRight />}
        disabled
        divider
      />
      <ListCell
        leading={<LeadingIcon emoji="📱" bgColor="#d1fae5" />}
        title="일반 기능"
        subtitle="사용 가능"
        trailing={<ChevronRight />}
        onPress={fn()}
        divider
      />
    </View>
  ),
};

export const TrailingVariations: Story = {
  render: () => (
    <View
      style={{ backgroundColor: 'white', borderRadius: 12, overflow: 'hidden', width: 375 }}
    >
      <ListCell
        leading={<LeadingIcon emoji="🔔" bgColor="#dbeafe" />}
        title="메시지"
        trailing={<Badge count={5} />}
        onPress={fn()}
      />
      <ListCell
        leading={<LeadingIcon emoji="🌙" bgColor="#e0e7ff" />}
        title="다크 모드"
        trailing={<Switch on={true} />}
        onPress={fn()}
        divider
      />
      <ListCell
        leading={<LeadingIcon emoji="🌐" bgColor="#d1fae5" />}
        title="언어"
        trailing={
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <ValueText value="한국어" />
            <ChevronRight />
          </View>
        }
        onPress={fn()}
        divider
      />
      <ListCell
        leading={<LeadingIcon emoji="⭐" bgColor="#fef3c7" />}
        title="버전"
        trailing={<ValueText value="1.2.3" />}
      />
      <ListCell
        leading={<LeadingIcon emoji="📱" bgColor="#fce7f3" />}
        title="저장공간"
        trailing={
          <View style={{ alignItems: 'flex-end' }}>
            <ValueText value="1.2 GB" />
            <Text style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>
              사용 중
            </Text>
          </View>
        }
        divider
      />
    </View>
  ),
};

export const UsageExample: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '700',
            color: '#0f172a',
            marginBottom: 12,
          }}
        >
          거래 내역
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 12,
            overflow: 'hidden',
            width: 375,
          }}
        >
          <ListCell
            leading={<LeadingIcon emoji="📦" bgColor="#dbeafe" />}
            title="BTC 매수"
            subtitle="2024.01.15 • 전송 완료"
            trailing={
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ fontSize: 15, fontWeight: '600', color: '#0f172a' }}>
                  89,000원
                </Text>
                <ChevronRight />
              </View>
            }
            onPress={fn()}
          />
          <ListCell
            leading={<LeadingIcon emoji="👕" bgColor="#fce7f3" />}
            title="ETH 전송"
            subtitle="2024.01.10 • 처리 중"
            trailing={
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ fontSize: 15, fontWeight: '600', color: '#0f172a' }}>
                  29,000원
                </Text>
                <ChevronRight />
              </View>
            }
            onPress={fn()}
            divider
          />
          <ListCell
            leading={<LeadingIcon emoji="📚" bgColor="#fef3c7" />}
            title="USDT 스왑"
            subtitle="2024.01.05 • 완료"
            trailing={
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ fontSize: 15, fontWeight: '600', color: '#0f172a' }}>
                  35,000원
                </Text>
                <ChevronRight />
              </View>
            }
            onPress={fn()}
            divider
          />
        </View>
      </View>

      <View>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '700',
            color: '#0f172a',
            marginBottom: 12,
          }}
        >
          알림
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 12,
            overflow: 'hidden',
            width: 375,
          }}
        >
          <ListCell
            leading={<Badge count={1} />}
            title="새로운 메시지가 도착했습니다"
            subtitle="방금 전"
            trailing={<ChevronRight />}
            onPress={fn()}
          />
          <ListCell
            leading={<LeadingIcon emoji="📦" bgColor="#dbeafe" />}
            title="출금 요청이 처리되었습니다"
            subtitle="1시간 전"
            trailing={<ChevronRight />}
            onPress={fn()}
            divider
          />
          <ListCell
            leading={<LeadingIcon emoji="⭐" bgColor="#fef3c7" />}
            title="스테이킹하고 보상 받으세요"
            subtitle="2시간 전"
            trailing={<ChevronRight />}
            onPress={fn()}
            divider
          />
        </View>
      </View>
    </View>
  ),
};
