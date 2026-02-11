import React, { useState } from 'react';
import { View, Text } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { fn } from 'storybook/test';
import { Popup, Button } from '@baerae-zkap/design-system/native';

const meta = {
  title: '@baerae-zkap/Presentation/Popup',
  component: Popup,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
        <Story />
      </View>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '즉각적인 사용자 주의가 필요한 모달 다이얼로그 컴포넌트입니다. 필수 결정/확인을 위해 현재 워크플로우를 중단합니다.',
      },
    },
  },
  argTypes: {
    visible: { table: { disable: true } },
    onClose: { table: { disable: true } },
    title: { table: { disable: true } },
    description: { table: { disable: true } },
    children: { table: { disable: true } },
    primaryAction: { table: { disable: true } },
    secondaryAction: { table: { disable: true } },
    style: { table: { disable: true } },
    testID: { table: { disable: true } },
    size: { table: { disable: true } },
    navigation: { table: { disable: true } },
    actionArea: { table: { disable: true } },
    heightType: { table: { disable: true } },
    closeOnScrim: { table: { disable: true } },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Popup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'medium',
    navigation: 'normal',
    actionArea: 'neutral',
    heightType: 'hug',
    showTitle: true as any,
    showDescription: true as any,
    showPrimaryAction: true as any,
    showSecondaryAction: true as any,
    closeOnScrim: true,
  },
  argTypes: {
    size: { control: 'select', options: ['medium', 'large', 'xlarge'], name: '크기' },
    navigation: { control: 'select', options: ['normal', 'emphasized', 'floating'], name: '네비게이션' },
    actionArea: { control: 'select', options: ['none', 'strong', 'neutral', 'compact', 'cancel'], name: '액션 영역' },
    heightType: { control: 'select', options: ['fixed', 'hug'], name: '높이 타입' },
    showTitle: { control: 'boolean', name: '제목' },
    showDescription: { control: 'boolean', name: '설명' },
    showPrimaryAction: { control: 'boolean', name: '주요 액션' },
    showSecondaryAction: { control: 'boolean', name: '보조 액션' },
    closeOnScrim: { control: 'boolean', name: '스크림 닫기' },
  },
  render: (args) => {
    const [visible, setVisible] = useState(false);

    return (
      <View>
        <Button variant="solid" color="primary" size="medium" onPress={() => setVisible(true)}>
          팝업 열기
        </Button>
        <Popup
          visible={visible}
          onClose={() => setVisible(false)}
          size={args.size}
          navigation={args.navigation}
          actionArea={args.actionArea}
          heightType={args.heightType}
          title={args.showTitle ? '서비스 이용 동의' : undefined}
          description={args.showDescription ? '서비스를 이용하기 위해서는 이용약관 및 개인정보 처리방침에 동의하셔야 합니다.' : undefined}
          primaryAction={args.showPrimaryAction ? {
            label: '동의',
            onPress: () => {
              fn()('동의 버튼 클릭');
              setVisible(false);
            },
          } : undefined}
          secondaryAction={args.showSecondaryAction ? {
            label: '취소',
            onPress: () => {
              fn()('취소 버튼 클릭');
              setVisible(false);
            },
          } : undefined}
          closeOnScrim={args.closeOnScrim}
        />
      </View>
    );
  },
};

export const NavigationNormal: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);

    return (
      <View>
        <Button variant="solid" color="primary" size="medium" onPress={() => setVisible(true)}>
          팝업 열기
        </Button>
        <Popup
          visible={visible}
          onClose={() => setVisible(false)}
          navigation="normal"
          actionArea="neutral"
          title="알림"
          description="새로운 업데이트가 있습니다."
          primaryAction={{
            label: '확인',
            onPress: () => setVisible(false),
          }}
        />
      </View>
    );
  },
};

export const NavigationEmphasized: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);

    return (
      <View>
        <Button variant="solid" color="primary" size="medium" onPress={() => setVisible(true)}>
          팝업 열기
        </Button>
        <Popup
          visible={visible}
          onClose={() => setVisible(false)}
          navigation="emphasized"
          actionArea="neutral"
          title="지갑 연결"
          description="서비스를 이용하기 위해 지갑을 연결해주세요. 지갑 연결 후 다양한 DeFi 서비스를 이용하실 수 있습니다. 연결된 지갑 정보는 안전하게 보관됩니다."
          primaryAction={{
            label: '연결',
            onPress: () => setVisible(false),
          }}
          secondaryAction={{
            label: '나중에',
            onPress: () => setVisible(false),
          }}
        />
      </View>
    );
  },
};

export const NavigationFloating: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);

    return (
      <View>
        <Button variant="solid" color="primary" size="medium" onPress={() => setVisible(true)}>
          팝업 열기
        </Button>
        <Popup
          visible={visible}
          onClose={() => setVisible(false)}
          navigation="floating"
          actionArea="neutral"
        >
          <View style={{ gap: 16 }}>
            <View
              style={{
                width: '100%',
                height: 200,
                backgroundColor: '#f0f0f0',
                borderRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 14, color: '#999' }}>이미지 영역</Text>
            </View>
            <Text style={{ fontSize: 16, color: '#3e4651', lineHeight: 24 }}>
              새로운 기능이 추가되었습니다. 이미지와 함께 제공되는 콘텐츠를 확인해보세요.
            </Text>
          </View>
        </Popup>
      </View>
    );
  },
};

export const ActionStrong: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);

    return (
      <View>
        <Button variant="solid" color="primary" size="medium" onPress={() => setVisible(true)}>
          팝업 열기
        </Button>
        <Popup
          visible={visible}
          onClose={() => setVisible(false)}
          navigation="normal"
          actionArea="strong"
          title="계정 삭제"
          description="계정을 삭제하시겠습니까? 삭제된 계정은 복구할 수 없으며, 모든 데이터가 영구적으로 삭제됩니다."
          primaryAction={{
            label: '삭제',
            onPress: () => setVisible(false),
            color: 'danger',
          }}
          secondaryAction={{
            label: '취소',
            onPress: () => setVisible(false),
          }}
        />
      </View>
    );
  },
};

export const ActionNeutral: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);

    return (
      <View>
        <Button variant="solid" color="primary" size="medium" onPress={() => setVisible(true)}>
          팝업 열기
        </Button>
        <Popup
          visible={visible}
          onClose={() => setVisible(false)}
          navigation="normal"
          actionArea="neutral"
          title="로그아웃"
          description="정말 로그아웃 하시겠습니까?"
          primaryAction={{
            label: '로그아웃',
            onPress: () => setVisible(false),
          }}
          secondaryAction={{
            label: '취소',
            onPress: () => setVisible(false),
          }}
        />
      </View>
    );
  },
};

export const ActionCompact: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);

    return (
      <View>
        <Button variant="solid" color="primary" size="medium" onPress={() => setVisible(true)}>
          팝업 열기
        </Button>
        <Popup
          visible={visible}
          onClose={() => setVisible(false)}
          navigation="normal"
          actionArea="compact"
          title="설정 변경"
          description="변경된 설정을 저장하시겠습니까?"
          primaryAction={{
            label: '저장',
            onPress: () => setVisible(false),
          }}
          secondaryAction={{
            label: '취소',
            onPress: () => setVisible(false),
          }}
        />
      </View>
    );
  },
};

export const ActionCancel: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);

    return (
      <View>
        <Button variant="solid" color="primary" size="medium" onPress={() => setVisible(true)}>
          팝업 열기
        </Button>
        <Popup
          visible={visible}
          onClose={() => setVisible(false)}
          navigation="normal"
          actionArea="cancel"
          title="공지사항"
          description="서비스 점검이 예정되어 있습니다. 2024년 12월 15일 오전 2시부터 4시까지 서비스 이용이 제한됩니다."
          secondaryAction={{
            label: '확인',
            onPress: () => setVisible(false),
          }}
        />
      </View>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [visibleMedium, setVisibleMedium] = useState(false);
    const [visibleLarge, setVisibleLarge] = useState(false);
    const [visibleXLarge, setVisibleXLarge] = useState(false);

    return (
      <View style={{ gap: 12 }}>
        <Button variant="solid" color="primary" size="medium" onPress={() => setVisibleMedium(true)}>
          Medium 팝업
        </Button>
        <Button variant="solid" color="primary" size="medium" onPress={() => setVisibleLarge(true)}>
          Large 팝업
        </Button>
        <Button variant="solid" color="primary" size="medium" onPress={() => setVisibleXLarge(true)}>
          XLarge 팝업
        </Button>

        <Popup
          visible={visibleMedium}
          onClose={() => setVisibleMedium(false)}
          size="medium"
          title="Medium 크기"
          description="기본 크기의 팝업입니다."
          primaryAction={{
            label: '확인',
            onPress: () => setVisibleMedium(false),
          }}
        />

        <Popup
          visible={visibleLarge}
          onClose={() => setVisibleLarge(false)}
          size="large"
          title="Large 크기"
          description="큰 크기의 팝업입니다. 더 많은 콘텐츠를 표시할 수 있습니다."
          primaryAction={{
            label: '확인',
            onPress: () => setVisibleLarge(false),
          }}
        />

        <Popup
          visible={visibleXLarge}
          onClose={() => setVisibleXLarge(false)}
          size="xlarge"
          title="XLarge 크기"
          description="가장 큰 크기의 팝업입니다. 복잡한 콘텐츠나 많은 정보를 표시할 때 사용합니다."
          primaryAction={{
            label: '확인',
            onPress: () => setVisibleXLarge(false),
          }}
        />
      </View>
    );
  },
};

export const FixedHeight: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);

    return (
      <View>
        <Button variant="solid" color="primary" size="medium" onPress={() => setVisible(true)}>
          팝업 열기
        </Button>
        <Popup
          visible={visible}
          onClose={() => setVisible(false)}
          navigation="normal"
          actionArea="neutral"
          heightType="fixed"
          title="이용약관"
          primaryAction={{
            label: '동의',
            onPress: () => setVisible(false),
          }}
          secondaryAction={{
            label: '취소',
            onPress: () => setVisible(false),
          }}
        >
          <View style={{ gap: 12 }}>
            <Text style={{ fontSize: 14, color: '#3e4651', lineHeight: 22 }}>
              제1조 (목적)
              {'\n'}본 약관은 회사가 제공하는 서비스의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
              {'\n\n'}제2조 (정의)
              {'\n'}본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
              {'\n'}1. "서비스"란 회사가 제공하는 모든 서비스를 의미합니다.
              {'\n'}2. "회원"이란 회사와 서비스 이용계약을 체결하고 회사가 제공하는 서비스를 이용하는 자를 말합니다.
              {'\n\n'}제3조 (약관의 효력 및 변경)
              {'\n'}1. 본 약관은 서비스를 이용하고자 하는 모든 회원에 대하여 그 효력을 발생합니다.
              {'\n'}2. 회사는 필요한 경우 관련 법령을 위배하지 않는 범위 내에서 본 약관을 변경할 수 있습니다.
              {'\n\n'}제4조 (서비스의 제공 및 변경)
              {'\n'}1. 회사는 다음과 같은 서비스를 제공합니다.
              {'\n'}2. 회사는 서비스의 내용 및 제공 일자를 제공 화면에 표시하거나 공지사항에 게시합니다.
              {'\n\n'}제5조 (서비스의 중단)
              {'\n'}1. 회사는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.
            </Text>
          </View>
        </Popup>
      </View>
    );
  },
};
