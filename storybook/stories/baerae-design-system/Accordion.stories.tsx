import { Accordion } from '@baerae-zkap/design-system/native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View, Text } from 'react-native';
import { fn } from 'storybook/test';
import { useState } from 'react';
import { User, Settings, FileText, MoreVertical, ArrowRight } from 'lucide-react-native';

/**
 * Accordion 컴포넌트
 *
 * - **fillWidth**: false(내용 맞춤) / true(전체 너비)
 * - **verticalPadding**: small(8px) / medium(12px) / large(16px)
 * - **leadingIcon**: 좌측 아이콘
 * - **trailingContent**: 우측 커스텀 콘텐츠 (chevron 대체)
 * - **showDivider**: 하단 구분선
 */
const meta = {
  title: '@baerae-zkap/Contents/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    fillWidth: { control: 'boolean' },
    verticalPadding: { control: 'select', options: ['small', 'medium', 'large'] },
    showDivider: { control: 'boolean' },
    disabled: { control: 'boolean' },
    defaultExpanded: { control: 'boolean' },
    // Hide auto-generated controls
    title: { table: { disable: true } },
    children: { table: { disable: true } },
    expanded: { table: { disable: true } },
    onChange: { table: { disable: true } },
    leadingIcon: { table: { disable: true } },
    trailingContent: { table: { disable: true } },
    style: { table: { disable: true } },
    testID: { table: { disable: true } },
    accessibilityLabel: { table: { disable: true } },
  },
  args: {
    onChange: fn(),
    fillWidth: false,
    verticalPadding: 'medium',
    showDivider: false,
    disabled: false,
    defaultExpanded: false,
  },
  decorators: [
    (Story) => (
      <View style={{ width: 375, padding: 40, backgroundColor: '#f8fafc' }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const contentTextStyle = { fontSize: 14, color: '#6b7684', lineHeight: 21 };
const labelStyle = { fontSize: 12, color: '#8b95a1', marginBottom: 8, fontWeight: '500' as const };

// 기본 - 모든 구성요소를 Controls에서 켜고 끌 수 있는 플레이그라운드
export const Default: Story = {
  argTypes: {
    fillWidth: { control: 'boolean', name: '전체 너비', table: { category: '레이아웃' } },
    verticalPadding: { control: 'select', options: ['small', 'medium', 'large'], name: '상하 여백', table: { category: '레이아웃' } },
    showDivider: { control: 'boolean', name: '구분선', table: { category: '구성요소 토글' } },
    disabled: { control: 'boolean', name: '비활성화', table: { category: '상태' } },
    defaultExpanded: { control: 'boolean', name: '기본 펼침', table: { category: '상태' } },
    showLeadingIcon: { control: 'boolean', name: '좌측 아이콘', table: { category: '구성요소 토글' } },
    useTrailingArrow: { control: 'boolean', name: '우측 화살표 (chevron 대체)', table: { category: '구성요소 토글' } },
  } as any,
  args: {
    fillWidth: false,
    verticalPadding: 'medium',
    showDivider: false,
    disabled: false,
    defaultExpanded: false,
    showLeadingIcon: false,
    useTrailingArrow: false,
  } as any,
  render: (args: any) => (
    <View style={{ gap: 8 }}>
      <Text style={{ fontSize: 11, color: '#8b95a1' }}>
        {args.fillWidth ? '전체 너비 (컨테이너를 꽉 채움)' : '내용 맞춤 (텍스트만큼만 차지)'}
      </Text>
      <View style={{
        width: 320,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        border: '1px solid #e5e8eb',
        borderStyle: 'dashed',
        padding: 4,
      } as any}>
        <Accordion
          key={`${args.defaultExpanded}-${args.fillWidth}-${args.showLeadingIcon}-${args.useTrailingArrow}`}
          fillWidth={args.fillWidth}
          verticalPadding={args.verticalPadding}
          showDivider={args.showDivider}
          disabled={args.disabled}
          defaultExpanded={args.defaultExpanded}
          leadingIcon={args.showLeadingIcon ? (
            <Settings size={20} color="#6b7684" strokeWidth={2} />
          ) : undefined}
          trailingContent={args.useTrailingArrow ? (
            <ArrowRight size={20} color="#6b7684" strokeWidth={2} />
          ) : undefined}
          title="서비스 이용 안내"
          onChange={fn()}
        >
          <Text style={contentTextStyle}>
            서비스 이용에 대한 상세 내용이 여기에 표시됩니다.
            제목을 탭하면 펼쳐지고 접힙니다.
          </Text>
        </Accordion>
      </View>
    </View>
  ),
};

// Vertical Padding 비교
export const VerticalPadding: Story = {
  render: () => (
    <View style={{ gap: 24, width: 320 }}>
      <View>
        <Text style={labelStyle}>Small (8px)</Text>
        <Accordion verticalPadding="small" title="Small 패딩" showDivider onChange={fn()}>
          <Text style={contentTextStyle}>상하 여백이 8px인 아코디언입니다.</Text>
        </Accordion>
      </View>
      <View>
        <Text style={labelStyle}>Medium (12px) - 기본</Text>
        <Accordion verticalPadding="medium" title="Medium 패딩" showDivider onChange={fn()}>
          <Text style={contentTextStyle}>상하 여백이 12px인 아코디언입니다.</Text>
        </Accordion>
      </View>
      <View>
        <Text style={labelStyle}>Large (16px)</Text>
        <Accordion verticalPadding="large" title="Large 패딩" showDivider onChange={fn()}>
          <Text style={contentTextStyle}>상하 여백이 16px인 아코디언입니다.</Text>
        </Accordion>
      </View>
    </View>
  ),
};

// Fill Width 비교
export const FillWidth: Story = {
  render: () => (
    <View style={{ gap: 32, width: 320 }}>
      <View>
        <Text style={labelStyle}>Normal (fillWidth=false)</Text>
        <View style={{ gap: 0 }}>
          <Accordion title="알림 설정" showDivider onChange={fn()}>
            <Text style={contentTextStyle}>알림 관련 설정을 변경할 수 있습니다.</Text>
          </Accordion>
          <Accordion title="보안 설정" showDivider onChange={fn()}>
            <Text style={contentTextStyle}>비밀번호 및 인증 설정을 관리합니다.</Text>
          </Accordion>
          <Accordion title="앱 정보" onChange={fn()}>
            <Text style={contentTextStyle}>앱 버전 및 라이선스 정보를 확인합니다.</Text>
          </Accordion>
        </View>
      </View>
      <View>
        <Text style={labelStyle}>Fill Width (fillWidth=true)</Text>
        <View style={{ gap: 0 }}>
          <Accordion fillWidth title="알림 설정" showDivider onChange={fn()}>
            <Text style={contentTextStyle}>알림 관련 설정을 변경할 수 있습니다.</Text>
          </Accordion>
          <Accordion fillWidth title="보안 설정" showDivider onChange={fn()}>
            <Text style={contentTextStyle}>비밀번호 및 인증 설정을 관리합니다.</Text>
          </Accordion>
          <Accordion fillWidth title="앱 정보" onChange={fn()}>
            <Text style={contentTextStyle}>앱 버전 및 라이선스 정보를 확인합니다.</Text>
          </Accordion>
        </View>
      </View>
    </View>
  ),
};

// Leading Icon
export const WithLeadingIcon: Story = {
  render: () => (
    <View style={{ gap: 0, width: 320 }}>
      <Accordion
        title="계정"
        leadingIcon={<User size={20} color="#6b7684" strokeWidth={2} />}
        showDivider
        onChange={fn()}
      >
        <Text style={contentTextStyle}>계정 정보를 관리합니다.</Text>
      </Accordion>
      <Accordion
        title="설정"
        leadingIcon={<Settings size={20} color="#6b7684" strokeWidth={2} />}
        showDivider
        defaultExpanded
        onChange={fn()}
      >
        <View style={{ gap: 12 }}>
          <Text style={contentTextStyle}>시스템 업데이트</Text>
          <Text style={contentTextStyle}>아이디 및 비밀번호</Text>
          <Text style={contentTextStyle}>회원 탈퇴</Text>
        </View>
      </Accordion>
      <Accordion
        title="요금"
        leadingIcon={<FileText size={20} color="#6b7684" strokeWidth={2} />}
        onChange={fn()}
      >
        <Text style={contentTextStyle}>요금제 정보를 확인합니다.</Text>
      </Accordion>
    </View>
  ),
};

// Trailing Content (커스텀 우측 콘텐츠)
export const WithTrailingContent: Story = {
  render: () => {
    function TrailingExample() {
      return (
        <View style={{ gap: 0, width: 320 }}>
          <Accordion
            title="조직"
            showDivider
            trailingContent={
              <MoreVertical size={20} color="#6b7684" strokeWidth={2} />
            }
            onChange={fn()}
          >
            <Text style={contentTextStyle}>조직 관리 메뉴입니다.</Text>
          </Accordion>
          <Accordion
            title="결재"
            showDivider
            defaultExpanded
            trailingContent={
              <MoreVertical size={20} color="#6b7684" strokeWidth={2} />
            }
            onChange={fn()}
          >
            <View style={{ gap: 12 }}>
              <Text style={contentTextStyle}>수신함</Text>
              <Text style={contentTextStyle}>상신함</Text>
              <Text style={contentTextStyle}>임시 저장</Text>
            </View>
          </Accordion>
          <Accordion
            title="근태"
            trailingContent={
              <MoreVertical size={20} color="#6b7684" strokeWidth={2} />
            }
            onChange={fn()}
          >
            <Text style={contentTextStyle}>근태 관리 메뉴입니다.</Text>
          </Accordion>
        </View>
      );
    }
    return <TrailingExample />;
  },
};

// 상태 비교
export const States: Story = {
  render: () => (
    <View style={{ gap: 24, width: 320 }}>
      <View>
        <Text style={labelStyle}>Collapsed</Text>
        <Accordion title="접힌 상태" defaultExpanded={false} onChange={fn()}>
          <Text style={contentTextStyle}>접힌 콘텐츠</Text>
        </Accordion>
      </View>
      <View>
        <Text style={labelStyle}>Expanded</Text>
        <Accordion title="펼쳐진 상태" defaultExpanded={true} onChange={fn()}>
          <Text style={contentTextStyle}>
            펼쳐진 콘텐츠입니다. 제목을 탭하면 다시 접힙니다.
            Chevron 방향이 반전되는 애니메이션이 적용됩니다.
          </Text>
        </Accordion>
      </View>
      <View>
        <Text style={labelStyle}>Disabled</Text>
        <Accordion title="비활성화 상태" disabled onChange={fn()}>
          <Text style={contentTextStyle}>비활성화된 콘텐츠</Text>
        </Accordion>
      </View>
    </View>
  ),
};

// Divider
export const WithDivider: Story = {
  render: () => (
    <View style={{ gap: 0, width: 320 }}>
      <Accordion title="서비스 소개" showDivider defaultExpanded onChange={fn()}>
        <Text style={contentTextStyle}>
          모두가 나답게 일하고 성장할 수 있는 세상을 만들어 갑니다.
        </Text>
      </Accordion>
      <Accordion title="이용 약관" showDivider onChange={fn()}>
        <Text style={contentTextStyle}>서비스 이용 약관 내용입니다.</Text>
      </Accordion>
      <Accordion title="개인정보 처리방침" onChange={fn()}>
        <Text style={contentTextStyle}>개인정보 처리방침 내용입니다.</Text>
      </Accordion>
    </View>
  ),
};

// 제어 컴포넌트
export const Controlled: Story = {
  render: () => {
    function ControlledExample() {
      const [expanded, setExpanded] = useState(false);

      return (
        <View style={{ gap: 16, width: 320 }}>
          <View style={{ padding: 12, backgroundColor: 'white', borderRadius: 8 }}>
            <Text style={{ fontSize: 12, color: '#6b7684' }}>
              현재 상태: <Text style={{ fontWeight: '600', color: '#333d4b' }}>
                {expanded ? '펼쳐짐' : '접힘'}
              </Text>
            </Text>
          </View>
          <Accordion
            title="제어되는 아코디언"
            expanded={expanded}
            onChange={setExpanded}
          >
            <Text style={contentTextStyle}>
              외부 상태로 제어되는 콘텐츠입니다.
            </Text>
          </Accordion>
        </View>
      );
    }
    return <ControlledExample />;
  },
};

// Nested Accordions
export const Nested: Story = {
  render: () => (
    <View style={{ gap: 0, width: 320 }}>
      <Accordion title="개발" showDivider onChange={fn()}>
        <Text style={contentTextStyle}>프론트엔드, 백엔드 관련 정보</Text>
      </Accordion>
      <Accordion title="디자인" showDivider defaultExpanded onChange={fn()}>
        <View style={{ gap: 0, paddingLeft: 8 }}>
          <Accordion title="브랜드" showDivider verticalPadding="small" onChange={fn()}>
            <Text style={contentTextStyle}>브랜드 디자인 관련 내용</Text>
          </Accordion>
          <Accordion title="UX/UI" verticalPadding="small" defaultExpanded onChange={fn()}>
            <View style={{ gap: 12, paddingLeft: 8 }}>
              <Text style={contentTextStyle}>프로덕트 디자이너</Text>
              <Text style={contentTextStyle}>플랫폼 디자이너</Text>
              <Text style={contentTextStyle}>UX 리서처</Text>
            </View>
          </Accordion>
        </View>
      </Accordion>
      <Accordion title="마케팅" onChange={fn()}>
        <Text style={contentTextStyle}>마케팅 관련 정보</Text>
      </Accordion>
    </View>
  ),
};

// FAQ 실제 사용 예시
export const FAQ: Story = {
  render: () => (
    <View style={{ width: 320 }}>
      <Text style={{
        fontSize: 22,
        fontWeight: '700',
        color: '#191f28',
        marginBottom: 20,
        letterSpacing: -0.3,
      }}>
        FAQ
      </Text>
      <View style={{ gap: 0 }}>
        <Accordion title="상업적 사용이 가능한가요?" showDivider onChange={fn()}>
          <Text style={contentTextStyle}>
            네, 상업적 사용이 가능합니다. 라이선스를 확인해 주세요.
          </Text>
        </Accordion>
        <Accordion
          title="컴포넌트 혹은 스타일을 커스터마이징해도 괜찮을까요?"
          showDivider
          defaultExpanded
          onChange={fn()}
        >
          <Text style={contentTextStyle}>
            자유롭게 수정 및 커스터마이징이 가능합니다.
            다만 원저작자인 배래와 라이선스를 명시해 주셔야 합니다.
          </Text>
        </Accordion>
        <Accordion title="오류를 발견했을 때 어떻게 하나요?" showDivider onChange={fn()}>
          <Text style={contentTextStyle}>
            GitHub 이슈에 등록하시거나 담당자에게 연락해 주세요.
          </Text>
        </Accordion>
        <Accordion title="새로운 컴포넌트 요청은 어떻게 하나요?" onChange={fn()}>
          <Text style={contentTextStyle}>
            디자인 시스템 채널에서 요청하시면 검토 후 반영됩니다.
          </Text>
        </Accordion>
      </View>
    </View>
  ),
};

// Clickable Area (Arrow 트레일링)
export const ClickableArea: Story = {
  render: () => (
    <View style={{ gap: 24, width: 320 }}>
      <View>
        <Text style={labelStyle}>Chevron (기본 - 펼침/접힘)</Text>
        <View style={{ gap: 0 }}>
          <Accordion title="알림 설정" showDivider defaultExpanded onChange={fn()}>
            <Text style={contentTextStyle}>
              알림을 통해 중요한 업데이트와 소식을 빠르게 받아보세요.
            </Text>
          </Accordion>
          <Accordion title="계정 설정" onChange={fn()}>
            <Text style={contentTextStyle}>계정 관련 설정입니다.</Text>
          </Accordion>
        </View>
      </View>
      <View>
        <Text style={labelStyle}>Arrow (커스텀 - 네비게이션)</Text>
        <View style={{ gap: 0 }}>
          <Accordion
            title="서비스 소개"
            showDivider
            trailingContent={<ArrowRight size={20} color="#6b7684" strokeWidth={2} />}
            onChange={fn()}
          >
            <Text style={contentTextStyle}>서비스에 대한 상세 소개입니다.</Text>
          </Accordion>
          <Accordion
            title="도움말"
            trailingContent={<ArrowRight size={20} color="#6b7684" strokeWidth={2} />}
            onChange={fn()}
          >
            <Text style={contentTextStyle}>도움말 및 FAQ 페이지입니다.</Text>
          </Accordion>
        </View>
      </View>
    </View>
  ),
};
