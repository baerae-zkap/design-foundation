import { BottomSheet, Button } from '@baerae-zkap/design-system/native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { fn } from 'storybook/test';
import React, { useState } from 'react';

const meta = {
  title: '@baerae-zkap/Presentation/Bottom sheet',
  component: BottomSheet,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <View style={{ width: 360, padding: 16, minHeight: 200 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    children: { table: { disable: true } },
    actionArea: { table: { disable: true } },
    onClose: { table: { disable: true } },
    style: { table: { disable: true } },
    scrimColor: { table: { disable: true } },
    testID: { table: { disable: true } },
    visible: { table: { disable: true } },
    title: { table: { disable: true } },
    subtitle: { table: { disable: true } },
    showHandle: { table: { disable: true } },
  },
} as Meta<typeof BottomSheet>;

export default meta;

type Story = StoryObj<typeof meta>;

// =============================================================================
// Default - Toggle controls
// =============================================================================
export const Default: Story = {
  args: {
    showHandle: true,
    showTitle: true as any,
    showSubtitle: false as any,
    showActionArea: false as any,
  },
  argTypes: {
    showHandle: {
      control: 'boolean',
      name: '핸들',
      description: '드래그 핸들 표시',
    },
    showTitle: {
      control: 'boolean',
      name: '제목',
      description: '제목 표시',
    },
    showSubtitle: {
      control: 'boolean',
      name: '부제목',
      description: '부제목 표시',
    },
    showActionArea: {
      control: 'boolean',
      name: '액션 영역',
      description: '하단 버튼 영역 표시',
    },
  },
  render: (args: any) => {
    const [visible, setVisible] = useState(false);
    return (
      <View>
        <Button
          variant="solid"
          color="primary"
          size="medium"
          onPress={() => setVisible(true)}
        >
          바텀시트 열기
        </Button>
        <BottomSheet
          visible={visible}
          onClose={() => setVisible(false)}
          showHandle={args.showHandle}
          title={args.showTitle ? '바텀시트 제목' : undefined}
          subtitle={args.showSubtitle ? '바텀시트 부제목입니다' : undefined}
          actionArea={
            args.showActionArea ? (
              <View style={{ flexDirection: 'row', gap: 12 }}>
                <Button
                  variant="solid"
                  color="assistive"
                  size="medium"
                  onPress={() => setVisible(false)}
                  style={{ flex: 1 }}
                >
                  취소
                </Button>
                <Button
                  variant="solid"
                  color="primary"
                  size="medium"
                  onPress={() => setVisible(false)}
                  style={{ flex: 1 }}
                >
                  확인
                </Button>
              </View>
            ) : undefined
          }
        >
          <View style={{ paddingVertical: 8 }}>
            <Text style={{ fontSize: 15, lineHeight: 22, color: '#3e4651' }}>
              바텀시트의 기본 콘텐츠입니다. 스크림을 탭하거나 핸들을 내려서 닫을 수
              있습니다.
            </Text>
          </View>
        </BottomSheet>
      </View>
    );
  },
};

// =============================================================================
// WithTitle - 제목이 있는 바텀시트
// =============================================================================
export const WithTitle: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <View>
        <Button
          variant="solid"
          color="primary"
          size="medium"
          onPress={() => setVisible(true)}
        >
          제목이 있는 바텀시트 열기
        </Button>
        <BottomSheet
          visible={visible}
          onClose={() => setVisible(false)}
          showHandle={true}
          title="알림 설정"
        >
          <View style={{ gap: 16, paddingVertical: 8 }}>
            <Text style={{ fontSize: 15, lineHeight: 22, color: '#3e4651' }}>
              알림을 받을 항목을 선택하세요.
            </Text>
            <View style={{ gap: 12 }}>
              <View
                style={{
                  padding: 16,
                  backgroundColor: '#f1f5f9',
                  borderRadius: 8,
                }}
              >
                <Text style={{ fontSize: 14, color: '#334155' }}>
                  💬 새 메시지
                </Text>
              </View>
              <View
                style={{
                  padding: 16,
                  backgroundColor: '#f1f5f9',
                  borderRadius: 8,
                }}
              >
                <Text style={{ fontSize: 14, color: '#334155' }}>
                  🔔 시스템 알림
                </Text>
              </View>
              <View
                style={{
                  padding: 16,
                  backgroundColor: '#f1f5f9',
                  borderRadius: 8,
                }}
              >
                <Text style={{ fontSize: 14, color: '#334155' }}>
                  📢 프로모션
                </Text>
              </View>
            </View>
          </View>
        </BottomSheet>
      </View>
    );
  },
};

// =============================================================================
// WithSubtitle - 제목 + 부제목
// =============================================================================
export const WithSubtitle: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <View>
        <Button
          variant="solid"
          color="primary"
          size="medium"
          onPress={() => setVisible(true)}
        >
          부제목이 있는 바텀시트 열기
        </Button>
        <BottomSheet
          visible={visible}
          onClose={() => setVisible(false)}
          showHandle={true}
          title="서비스 약관 동의"
          subtitle="서비스 이용을 위해 아래 약관에 동의해주세요"
        >
          <View style={{ gap: 12, paddingVertical: 8 }}>
            <View
              style={{
                padding: 16,
                backgroundColor: '#f1f5f9',
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#334155',
                  marginBottom: 4,
                }}
              >
                서비스 이용약관 (필수)
              </Text>
              <Text style={{ fontSize: 13, color: '#64748b' }}>
                서비스 이용에 필요한 기본 약관입니다.
              </Text>
            </View>
            <View
              style={{
                padding: 16,
                backgroundColor: '#f1f5f9',
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#334155',
                  marginBottom: 4,
                }}
              >
                개인정보 처리방침 (필수)
              </Text>
              <Text style={{ fontSize: 13, color: '#64748b' }}>
                개인정보 보호를 위한 정책입니다.
              </Text>
            </View>
            <View
              style={{
                padding: 16,
                backgroundColor: '#f1f5f9',
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#334155',
                  marginBottom: 4,
                }}
              >
                마케팅 정보 수신 (선택)
              </Text>
              <Text style={{ fontSize: 13, color: '#64748b' }}>
                이벤트 및 혜택 정보를 받을 수 있습니다.
              </Text>
            </View>
          </View>
        </BottomSheet>
      </View>
    );
  },
};

// =============================================================================
// ActionAreaNeutral - Neutral (좌우 버튼 배치)
// =============================================================================
export const ActionAreaNeutral: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <View>
        <Button
          variant="solid"
          color="primary"
          size="medium"
          onPress={() => setVisible(true)}
        >
          Neutral 액션 영역
        </Button>
        <BottomSheet
          visible={visible}
          onClose={() => setVisible(false)}
          showHandle={true}
          title="변경사항을 저장하시겠습니까?"
          actionArea={
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <Button
                variant="solid"
                color="assistive"
                size="medium"
                onPress={() => setVisible(false)}
                style={{ flex: 1 }}
              >
                취소
              </Button>
              <Button
                variant="solid"
                color="primary"
                size="medium"
                onPress={() => setVisible(false)}
                style={{ flex: 1 }}
              >
                저장
              </Button>
            </View>
          }
        >
          <View style={{ paddingVertical: 8 }}>
            <Text style={{ fontSize: 15, lineHeight: 22, color: '#3e4651' }}>
              작성하신 내용이 저장되지 않았습니다. 저장하시겠습니까?
            </Text>
          </View>
        </BottomSheet>
      </View>
    );
  },
};

// =============================================================================
// ActionAreaStrong - Strong (상하 버튼 배치)
// =============================================================================
export const ActionAreaStrong: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <View>
        <Button
          variant="solid"
          color="primary"
          size="medium"
          onPress={() => setVisible(true)}
        >
          Strong 액션 영역
        </Button>
        <BottomSheet
          visible={visible}
          onClose={() => setVisible(false)}
          showHandle={true}
          title="계정을 삭제하시겠습니까?"
          actionArea={
            <View style={{ gap: 12 }}>
              <Button
                variant="solid"
                color="danger"
                size="large"
                onPress={() => setVisible(false)}
                display="full"
              >
                계정 삭제
              </Button>
              <Button
                variant="solid"
                color="assistive"
                size="large"
                onPress={() => setVisible(false)}
                display="full"
              >
                취소
              </Button>
            </View>
          }
        >
          <View style={{ paddingVertical: 8 }}>
            <Text style={{ fontSize: 15, lineHeight: 22, color: '#3e4651' }}>
              계정을 삭제하면 모든 데이터가 영구적으로 삭제됩니다. 이 작업은
              취소할 수 없습니다.
            </Text>
          </View>
        </BottomSheet>
      </View>
    );
  },
};

// =============================================================================
// ActionAreaCancel - Cancel (단일 확인 버튼)
// =============================================================================
export const ActionAreaCancel: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <View>
        <Button
          variant="solid"
          color="primary"
          size="medium"
          onPress={() => setVisible(true)}
        >
          Cancel 액션 영역
        </Button>
        <BottomSheet
          visible={visible}
          onClose={() => setVisible(false)}
          showHandle={true}
          title="업데이트 완료"
          actionArea={
            <Button
              variant="solid"
              color="primary"
              size="large"
              onPress={() => setVisible(false)}
              display="full"
            >
              확인
            </Button>
          }
        >
          <View style={{ paddingVertical: 8 }}>
            <Text style={{ fontSize: 15, lineHeight: 22, color: '#3e4651' }}>
              앱이 최신 버전으로 업데이트되었습니다. 새로운 기능을 사용해보세요!
            </Text>
          </View>
        </BottomSheet>
      </View>
    );
  },
};

// =============================================================================
// WithoutHandle - 핸들 없는 바텀시트
// =============================================================================
export const WithoutHandle: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <View>
        <Button
          variant="solid"
          color="primary"
          size="medium"
          onPress={() => setVisible(true)}
        >
          핸들 없는 바텀시트 열기
        </Button>
        <BottomSheet
          visible={visible}
          onClose={() => setVisible(false)}
          showHandle={false}
          title="필터 설정"
          actionArea={
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <Button
                variant="solid"
                color="assistive"
                size="medium"
                onPress={() => setVisible(false)}
                style={{ flex: 1 }}
              >
                초기화
              </Button>
              <Button
                variant="solid"
                color="primary"
                size="medium"
                onPress={() => setVisible(false)}
                style={{ flex: 1 }}
              >
                적용
              </Button>
            </View>
          }
        >
          <View style={{ gap: 16, paddingVertical: 8 }}>
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#334155',
                  marginBottom: 8,
                }}
              >
                가격 범위
              </Text>
              <View
                style={{
                  padding: 16,
                  backgroundColor: '#f1f5f9',
                  borderRadius: 8,
                }}
              >
                <Text style={{ fontSize: 14, color: '#64748b' }}>
                  0원 ~ 100,000원
                </Text>
              </View>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#334155',
                  marginBottom: 8,
                }}
              >
                카테고리
              </Text>
              <View
                style={{
                  padding: 16,
                  backgroundColor: '#f1f5f9',
                  borderRadius: 8,
                }}
              >
                <Text style={{ fontSize: 14, color: '#64748b' }}>전체</Text>
              </View>
            </View>
          </View>
        </BottomSheet>
      </View>
    );
  },
};

// =============================================================================
// LongContent - 스크롤 가능한 긴 콘텐츠
// =============================================================================
export const LongContent: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <View>
        <Button
          variant="solid"
          color="primary"
          size="medium"
          onPress={() => setVisible(true)}
        >
          긴 콘텐츠 바텀시트 열기
        </Button>
        <BottomSheet
          visible={visible}
          onClose={() => setVisible(false)}
          showHandle={true}
          title="서비스 이용약관"
          actionArea={
            <Button
              variant="solid"
              color="primary"
              size="large"
              onPress={() => setVisible(false)}
              display="full"
            >
              동의
            </Button>
          }
        >
          <ScrollView
            style={{ maxHeight: 300 }}
            showsVerticalScrollIndicator={true}
          >
            <View style={{ gap: 16, paddingVertical: 8 }}>
              <View>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '600',
                    color: '#334155',
                    marginBottom: 8,
                  }}
                >
                  제1조 (목적)
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    lineHeight: 20,
                    color: '#64748b',
                  }}
                >
                  이 약관은 회사가 제공하는 서비스의 이용과 관련하여 회사와
                  회원의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '600',
                    color: '#334155',
                    marginBottom: 8,
                  }}
                >
                  제2조 (정의)
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    lineHeight: 20,
                    color: '#64748b',
                  }}
                >
                  1. "서비스"란 회사가 제공하는 모든 서비스를 의미합니다.{'\n'}
                  2. "회원"이란 서비스에 접속하여 이 약관에 따라 회사와 이용계약을
                  체결하고 회사가 제공하는 서비스를 이용하는 고객을 말합니다.
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '600',
                    color: '#334155',
                    marginBottom: 8,
                  }}
                >
                  제3조 (약관의 효력 및 변경)
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    lineHeight: 20,
                    color: '#64748b',
                  }}
                >
                  1. 이 약관은 서비스 화면에 게시하거나 기타의 방법으로 회원에게
                  공지함으로써 효력이 발생합니다.{'\n'}
                  2. 회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 이
                  약관을 변경할 수 있습니다.
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '600',
                    color: '#334155',
                    marginBottom: 8,
                  }}
                >
                  제4조 (회원가입)
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    lineHeight: 20,
                    color: '#64748b',
                  }}
                >
                  1. 회원가입은 이용자가 약관의 내용에 대하여 동의를 한 다음
                  회원가입 신청을 하고 회사가 이러한 신청에 대하여 승낙함으로써
                  체결됩니다.{'\n'}
                  2. 회사는 다음 각 호에 해당하는 신청에 대하여는 승낙을 하지
                  않거나 사후에 이용계약을 해지할 수 있습니다.
                </Text>
              </View>
            </View>
          </ScrollView>
        </BottomSheet>
      </View>
    );
  },
};

// =============================================================================
// SelectOptions - 선택지 리스트
// =============================================================================
export const SelectOptions: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);

    const options = [
      { id: '1', label: '🐶 강아지', description: '충성심이 강한 반려동물' },
      { id: '2', label: '🐱 고양이', description: '독립적인 성격의 반려동물' },
      { id: '3', label: '🐰 토끼', description: '온순한 성격의 반려동물' },
      { id: '4', label: '🐹 햄스터', description: '작고 귀여운 반려동물' },
    ];

    return (
      <View>
        <Button
          variant="solid"
          color="primary"
          size="medium"
          onPress={() => setVisible(true)}
        >
          반려동물 선택
        </Button>
        <BottomSheet
          visible={visible}
          onClose={() => setVisible(false)}
          showHandle={true}
          title="반려동물을 선택하세요"
          subtitle="선호하는 반려동물을 선택해주세요"
        >
          <View style={{ gap: 8, paddingVertical: 8 }}>
            {options.map((option) => (
              <Pressable
                key={option.id}
                onPress={() => {
                  setSelected(option.id);
                  setTimeout(() => setVisible(false), 300);
                }}
                style={({ pressed }) => ({
                  padding: 16,
                  backgroundColor:
                    selected === option.id
                      ? '#eff6ff'
                      : pressed
                        ? '#f8fafc'
                        : '#f1f5f9',
                  borderRadius: 8,
                  borderWidth: selected === option.id ? 2 : 0,
                  borderColor: '#2563eb',
                })}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: '600',
                        color: '#334155',
                        marginBottom: 2,
                      }}
                    >
                      {option.label}
                    </Text>
                    <Text style={{ fontSize: 13, color: '#64748b' }}>
                      {option.description}
                    </Text>
                  </View>
                  {selected === option.id && (
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        backgroundColor: '#2563eb',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text style={{ color: 'white', fontSize: 12 }}>✓</Text>
                    </View>
                  )}
                </View>
              </Pressable>
            ))}
          </View>
        </BottomSheet>
      </View>
    );
  },
};

// =============================================================================
// InPageUsage - 실제 페이지 사용 예시
// =============================================================================
export const InPageUsage: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState<string | null>(null);

    const assets = [
      { id: '1', name: '삼성전자', amount: '1,250,000원', ratio: '+2.5%' },
      { id: '2', name: '카카오', amount: '850,000원', ratio: '-1.2%' },
      { id: '3', name: 'NAVER', amount: '2,100,000원', ratio: '+5.8%' },
    ];

    return (
      <View style={{ width: '100%' }}>
        {/* 메인 콘텐츠 */}
        <View
          style={{
            padding: 20,
            backgroundColor: 'white',
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              color: '#1e293b',
              marginBottom: 16,
            }}
          >
            내 자산
          </Text>
          <View style={{ gap: 12 }}>
            {assets.map((asset) => (
              <View
                key={asset.id}
                style={{
                  padding: 16,
                  backgroundColor: '#f8fafc',
                  borderRadius: 8,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '600',
                      color: '#334155',
                      marginBottom: 4,
                    }}
                  >
                    {asset.name}
                  </Text>
                  <Text style={{ fontSize: 13, color: '#64748b' }}>
                    {asset.amount}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: asset.ratio.startsWith('+') ? '#22c55e' : '#ef4444',
                  }}
                >
                  {asset.ratio}
                </Text>
              </View>
            ))}
          </View>
          <Button
            variant="solid"
            color="primary"
            size="medium"
            onPress={() => setVisible(true)}
            display="full"
            style={{ marginTop: 16 }}
          >
            자산 추가하기
          </Button>
        </View>

        {/* 바텀시트 */}
        <BottomSheet
          visible={visible}
          onClose={() => setVisible(false)}
          showHandle={true}
          title="자산을 추가하세요"
          subtitle="투자하고 싶은 자산을 선택해주세요"
          actionArea={
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <Button
                variant="solid"
                color="assistive"
                size="medium"
                onPress={() => setVisible(false)}
                style={{ flex: 1 }}
              >
                취소
              </Button>
              <Button
                variant="solid"
                color="primary"
                size="medium"
                onPress={() => {
                  if (selectedAsset) {
                    setVisible(false);
                    setSelectedAsset(null);
                  }
                }}
                disabled={!selectedAsset}
                style={{ flex: 1 }}
              >
                추가
              </Button>
            </View>
          }
        >
          <View style={{ gap: 8, paddingVertical: 8 }}>
            {['LG전자', 'SK하이닉스', '현대차', '기아'].map((name) => (
              <Pressable
                key={name}
                onPress={() => setSelectedAsset(name)}
                style={({ pressed }) => ({
                  padding: 16,
                  backgroundColor:
                    selectedAsset === name
                      ? '#eff6ff'
                      : pressed
                        ? '#f8fafc'
                        : '#f1f5f9',
                  borderRadius: 8,
                  borderWidth: selectedAsset === name ? 2 : 0,
                  borderColor: '#2563eb',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                })}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '600',
                    color: '#334155',
                  }}
                >
                  {name}
                </Text>
                {selectedAsset === name && (
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      backgroundColor: '#2563eb',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={{ color: 'white', fontSize: 12 }}>✓</Text>
                  </View>
                )}
              </Pressable>
            ))}
          </View>
        </BottomSheet>
      </View>
    );
  },
};
