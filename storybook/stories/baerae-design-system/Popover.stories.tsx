import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Popover, Button } from '@baerae-zkap/design-system/native';
import { fn } from 'storybook/test';
import { Info } from 'lucide-react-native';

const meta = {
  title: '@baerae-zkap/Presentation/Popover',
  component: Popover,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <View style={{ width: 360, padding: 16, minHeight: 200, alignItems: 'center', justifyContent: 'center' }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    trigger: { table: { disable: true } },
    children: { table: { disable: true } },
    heading: { table: { disable: true } },
    description: { table: { disable: true } },
    action: { table: { disable: true } },
    subAction: { table: { disable: true } },
    onClose: { table: { disable: true } },
    visible: { table: { disable: true } },
    onVisibleChange: { table: { disable: true } },
    style: { table: { disable: true } },
    testID: { table: { disable: true } },
    showCloseButton: { table: { disable: true } },
    placement: { table: { disable: true } },
  },
} as Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  args: {
    placement: 'bottom',
    showHeading: true as any,
    showDescription: true as any,
    showCloseButton: false as any,
    showAction: false as any,
    showSubAction: false as any,
  },
  argTypes: {
    placement: { control: 'select', options: ['top', 'bottom', 'left', 'right'], name: '위치' },
    showHeading: { control: 'boolean', name: '제목' },
    showDescription: { control: 'boolean', name: '설명' },
    showCloseButton: { control: 'boolean', name: '닫기 버튼' },
    showAction: { control: 'boolean', name: '액션 버튼' },
    showSubAction: { control: 'boolean', name: '보조 액션' },
  },
  render: (args) => {
    const [visible, setVisible] = useState(false);

    return (
      <Popover
        placement={args.placement}
        visible={visible}
        onVisibleChange={setVisible}
        trigger={
          <Button
            variant="outlined"
            color="secondary"
            size="medium"
            onPress={() => setVisible(true)}
          >
            팝오버 열기
          </Button>
        }
        heading={args.showHeading ? '새로운 기능 안내' : undefined}
        description={
          args.showDescription
            ? '이제 암호화폐 자산을 한눈에 확인할 수 있습니다. 포트폴리오 기능을 사용해보세요.'
            : undefined
        }
        showCloseButton={args.showCloseButton}
        onClose={() => {
          setVisible(false);
          fn()('onClose called');
        }}
        action={
          args.showAction
            ? {
                label: '자세히 보기',
                onPress: () => {
                  fn()('action pressed');
                  setVisible(false);
                },
              }
            : undefined
        }
        subAction={
          args.showSubAction
            ? {
                label: '나중에',
                onPress: () => {
                  fn()('subAction pressed');
                  setVisible(false);
                },
              }
            : undefined
        }
      />
    );
  },
};

export const WithHeadingOnly: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);

    return (
      <Popover
        placement="bottom"
        visible={visible}
        onVisibleChange={setVisible}
        trigger={
          <Button
            variant="outlined"
            color="secondary"
            size="medium"
            onPress={() => setVisible(true)}
          >
            제목만 있는 팝오버
          </Button>
        }
        heading="새로운 기능 안내"
        onClose={() => setVisible(false)}
      />
    );
  },
};

export const WithDescription: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);

    return (
      <Popover
        placement="bottom"
        visible={visible}
        onVisibleChange={setVisible}
        trigger={
          <Button
            variant="outlined"
            color="secondary"
            size="medium"
            onPress={() => setVisible(true)}
          >
            제목과 설명
          </Button>
        }
        heading="새로운 기능 안내"
        description="이제 암호화폐 자산을 한눈에 확인할 수 있습니다. 포트폴리오 기능을 사용해보세요."
        onClose={() => setVisible(false)}
      />
    );
  },
};

export const WithCloseButton: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);

    return (
      <Popover
        placement="bottom"
        visible={visible}
        onVisibleChange={setVisible}
        trigger={
          <Button
            variant="outlined"
            color="secondary"
            size="medium"
            onPress={() => setVisible(true)}
          >
            닫기 버튼 있음
          </Button>
        }
        heading="새로운 기능 안내"
        description="이제 암호화폐 자산을 한눈에 확인할 수 있습니다. 포트폴리오 기능을 사용해보세요."
        showCloseButton={true}
        onClose={() => {
          setVisible(false);
          fn()('close button pressed');
        }}
      />
    );
  },
};

export const WithActions: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);

    return (
      <Popover
        placement="bottom"
        visible={visible}
        onVisibleChange={setVisible}
        trigger={
          <Button
            variant="outlined"
            color="secondary"
            size="medium"
            onPress={() => setVisible(true)}
          >
            액션 버튼 있음
          </Button>
        }
        heading="새로운 기능 안내"
        description="이제 암호화폐 자산을 한눈에 확인할 수 있습니다. 포트폴리오 기능을 사용해보세요."
        action={{
          label: '자세히 보기',
          onPress: () => {
            fn()('primary action pressed');
            setVisible(false);
          },
        }}
        subAction={{
          label: '나중에',
          onPress: () => {
            fn()('sub action pressed');
            setVisible(false);
          },
        }}
        onClose={() => setVisible(false)}
      />
    );
  },
};

export const Placements: Story = {
  render: () => {
    const [visibleTop, setVisibleTop] = useState(false);
    const [visibleBottom, setVisibleBottom] = useState(false);
    const [visibleLeft, setVisibleLeft] = useState(false);
    const [visibleRight, setVisibleRight] = useState(false);

    return (
      <View style={{ gap: 32, alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', gap: 16 }}>
          <Popover
            placement="top"
                visible={visibleTop}
            onVisibleChange={setVisibleTop}
            trigger={
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                onPress={() => setVisibleTop(true)}
              >
                상단
              </Button>
            }
            heading="상단 배치"
            description="팝오버가 상단에 표시됩니다."
            onClose={() => setVisibleTop(false)}
          />
        </View>
        <View style={{ flexDirection: 'row', gap: 16 }}>
          <Popover
            placement="left"
                visible={visibleLeft}
            onVisibleChange={setVisibleLeft}
            trigger={
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                onPress={() => setVisibleLeft(true)}
              >
                좌측
              </Button>
            }
            heading="좌측 배치"
            description="팝오버가 좌측에 표시됩니다."
            onClose={() => setVisibleLeft(false)}
          />
          <Popover
            placement="right"
                visible={visibleRight}
            onVisibleChange={setVisibleRight}
            trigger={
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                onPress={() => setVisibleRight(true)}
              >
                우측
              </Button>
            }
            heading="우측 배치"
            description="팝오버가 우측에 표시됩니다."
            onClose={() => setVisibleRight(false)}
          />
        </View>
        <View style={{ flexDirection: 'row', gap: 16 }}>
          <Popover
            placement="bottom"
                visible={visibleBottom}
            onVisibleChange={setVisibleBottom}
            trigger={
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                onPress={() => setVisibleBottom(true)}
              >
                하단
              </Button>
            }
            heading="하단 배치"
            description="팝오버가 하단에 표시됩니다."
            onClose={() => setVisibleBottom(false)}
          />
        </View>
      </View>
    );
  },
};

export const OnboardingGuide: Story = {
  render: () => {
    return (
      <Popover
        placement="bottom"
        visible={true}
        trigger={
          <Button
            variant="outlined"
            color="secondary"
            size="medium"
          >
            온보딩 가이드
          </Button>
        }
        heading="포트폴리오 기능 소개"
        description="이제 모든 자산을 한눈에 확인하고 관리할 수 있습니다. 시작해볼까요?"
        action={{
          label: '시작하기',
          onPress: () => fn()('onboarding started'),
        }}
        showCloseButton={true}
        onClose={() => fn()('onboarding dismissed')}
      />
    );
  },
};

export const CustomContent: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);

    return (
      <Popover
        placement="bottom"
        visible={visible}
        onVisibleChange={setVisible}
        trigger={
          <Button
            variant="outlined"
            color="secondary"
            size="medium"
            onPress={() => setVisible(true)}
          >
            커스텀 콘텐츠
          </Button>
        }
        onClose={() => setVisible(false)}
      >
        <View style={{ gap: 12, padding: 4 }}>
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#000' }}>
            자유 형식 콘텐츠
          </Text>
          <Text style={{ fontSize: 14, color: '#666', lineHeight: 20 }}>
            children prop을 사용하면 원하는 형태의 콘텐츠를 자유롭게 표시할 수 있습니다.
          </Text>
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
            <View style={{ flex: 1, height: 40, backgroundColor: '#e0e7ff', borderRadius: 8 }} />
            <View style={{ flex: 1, height: 40, backgroundColor: '#dbeafe', borderRadius: 8 }} />
            <View style={{ flex: 1, height: 40, backgroundColor: '#e0f2fe', borderRadius: 8 }} />
          </View>
        </View>
      </Popover>
    );
  },
};

export const InPageUsage: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);

    return (
      <View style={{ gap: 16, alignItems: 'center' }}>
        <Text style={{ fontSize: 14, color: '#666' }}>
          실제 사용 예시
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#000' }}>
            포트폴리오 수익률
          </Text>
          <Popover
            placement="bottom"
                visible={visible}
            onVisibleChange={setVisible}
            trigger={
              <Button
                variant="weak"
                color="secondary"
                size="small"
                onPress={() => setVisible(true)}
                style={{ padding: 4 }}
              >
                <Info size={16} color="#666" />
              </Button>
            }
            heading="수익률 계산 방식"
            description="포트폴리오 수익률은 투자 원금 대비 현재 평가액의 비율로 계산됩니다. 실현/미실현 손익이 모두 포함됩니다."
            showCloseButton={true}
            onClose={() => setVisible(false)}
          />
        </View>
        <View style={{
          paddingHorizontal: 24,
          paddingVertical: 16,
          backgroundColor: '#f3f4f6',
          borderRadius: 12,
          minWidth: 200,
          alignItems: 'center'
        }}>
          <Text style={{ fontSize: 24, fontWeight: '700', color: '#16a34a' }}>
            +15.3%
          </Text>
        </View>
      </View>
    );
  },
};
