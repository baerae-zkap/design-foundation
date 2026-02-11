import { ActionArea, Button, TextButton } from '@baerae-zkap/design-system/native';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View, Text, ScrollView } from 'react-native';
import { fn } from 'storybook/test';

/**
 * ActionArea는 모달이나 화면 하단에 위치하는 버튼 그룹 컴포넌트입니다.
 * Button과 TextButton을 children으로 사용하며, 항상 그라디언트 오버레이를 표시합니다.
 *
 * ## Variants
 * - **Strong**: 세로 레이아웃. 메인 액션이 위, 대안이 아래. 라벨이 7자 이상일 때 권장.
 * - **Neutral**: 가로 균등 배치. 라벨이 7자 미만일 때 권장.
 * - **Compact**: 가로 우측 정렬. 데스크톱/넓은 모달(560px+)용. 모바일 앱에는 비권장.
 *
 * ## Combinations
 * - **With alternative action**: 메인 + 대안 버튼 (동등한 중요도)
 * - **With sub action**: 메인 + Sub 버튼 (TextButton, 덜 중요한 액션)
 * - **Main only**: 단일 메인 버튼
 *
 * ## Scrolled behavior
 * - 기본: Gradient scroll effect (모든 타입)
 * - Extra content 사용 시: Divider로 변경
 *
 * ## Extra content
 * - topAccessory: 버튼 위 슬롯 (예: 가격 요약)
 * - bottomAccessory: 버튼 아래 슬롯 (예: 면책 조항)
 */
const meta = {
  title: '@baerae-zkap/Actions/Action area',
  component: ActionArea,
  decorators: [
    (Story) => (
      <View style={{ padding: 20, backgroundColor: '#f8fafc' }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    // 레이아웃
    variant: {
      control: 'select',
      options: ['strong', 'neutral', 'compact'],
      description: '레이아웃 변형',
      table: { category: '레이아웃' },
    },
    position: {
      control: 'select',
      options: ['static', 'fixed'],
      description: '위치 설정',
      table: { category: '레이아웃' },
    },

    // 구성요소 토글
    showAlternative: {
      control: 'boolean',
      description: '대안 버튼 표시/숨김',
      table: { category: '구성요소 토글' },
    },
    showSubAction: {
      control: 'boolean',
      description: 'Sub 액션 (TextButton) 표시/숨김',
      table: { category: '구성요소 토글' },
    },
    showCaption: {
      control: 'boolean',
      description: '캡션 텍스트 표시/숨김',
      table: { category: '구성요소 토글' },
    },

    // 스크롤 효과
    showGradient: {
      control: 'boolean',
      description: '그라디언트 오버레이 표시',
      table: { category: '스크롤 효과' },
    },

    // 상태
    disabled: {
      control: 'boolean',
      description: '메인 버튼 비활성화',
      table: { category: '상태' },
    },

    // 숨김 처리
    children: { table: { disable: true } },
    style: { table: { disable: true } },
    scrollY: { table: { disable: true } },
    hideOnScroll: { table: { disable: true } },
    gradientHeight: { table: { disable: true } },
    caption: { table: { disable: true } },
    useSafeArea: { table: { disable: true } },
    backgroundColor: { table: { disable: true } },
    fixedAboveKeyboard: { table: { disable: true } },
    showAfterDelay: { table: { disable: true } },
    topAccessory: { table: { disable: true } },
    bottomAccessory: { table: { disable: true } },
  },
} satisfies Meta<typeof ActionArea>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ## Default (Full Playground)
 *
 * 모든 옵션을 Controls로 조정할 수 있는 플레이그라운드입니다.
 * 그라디언트 효과를 확인하기 위해 스크롤 가능한 콘텐츠 위에 ActionArea가 고정되어 있습니다.
 */
export const Default: Story = {
  args: {
    variant: 'neutral',
    position: 'static',
    showAlternative: true,
    showSubAction: false,
    showCaption: false,
    showGradient: true,
    disabled: false,
  },
  render: (args) => {
    const { showAlternative, showSubAction, showCaption, disabled, ...rest } = args as any;
    return (
      <View style={{ height: 400, position: 'relative', overflow: 'hidden', borderRadius: 12, backgroundColor: 'white' }}>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#0f172a', marginBottom: 12 }}>서비스 이용약관</Text>
          <Text style={{ fontSize: 14, color: '#64748b', lineHeight: 22 }}>
            제1조 (목적){'\n'}본 약관은 회사가 제공하는 서비스의 이용 조건 및 절차, 회사와 회원 간의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.
            {'\n\n'}제2조 (정의){'\n'}① "서비스"란 회사가 제공하는 모든 서비스를 의미합니다.{'\n'}② "회원"이란 본 약관에 동의하고 서비스를 이용하는 자를 의미합니다.{'\n'}③ "콘텐츠"란 서비스에서 제공되는 텍스트, 이미지, 영상 등 모든 정보를 의미합니다.
            {'\n\n'}제3조 (약관의 효력){'\n'}본 약관은 서비스를 이용하고자 하는 모든 회원에게 적용됩니다. 회사는 필요한 경우 약관을 변경할 수 있으며, 변경된 약관은 공지사항을 통해 안내합니다.
            {'\n\n'}제4조 (서비스의 제공){'\n'}회사는 다음과 같은 서비스를 제공합니다.{'\n'}① 정보 검색 및 제공 서비스{'\n'}② 커뮤니티 서비스{'\n'}③ 전자상거래 관련 서비스{'\n'}④ 기타 회사가 정하는 서비스
            {'\n\n'}제5조 (개인정보 보호){'\n'}회사는 관련 법령이 정하는 바에 따라 회원의 개인정보를 보호하기 위해 노력합니다. 개인정보의 보호 및 사용에 대해서는 별도의 개인정보 처리방침이 적용됩니다.
          </Text>
        </ScrollView>
        <ActionArea
          {...rest}
          position="fixed"
          caption={showCaption ? "변경사항이 저장됩니다" : undefined}
        >
          {showSubAction && <TextButton color="secondary" onPress={fn()}>나중에 하기</TextButton>}
          {showAlternative && <Button variant="solid" color="assistive" onPress={fn()}>취소</Button>}
          <Button variant="solid" color="primary" onPress={fn()} disabled={disabled}>확인</Button>
        </ActionArea>
      </View>
    );
  },
};

/**
 * ## With Alternative - Strong
 *
 * Strong variant로 메인 + 대안 버튼을 세로 배치합니다.
 * 라벨이 7자 이상일 때 권장됩니다.
 */
export const WithAlternativeStrong: Story = {
  name: 'With Alternative - Strong',
  render: () => (
    <View style={{ height: 400, position: 'relative', overflow: 'hidden', borderRadius: 12, backgroundColor: 'white' }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: '700', color: '#0f172a', marginBottom: 12 }}>프로필 설정</Text>
        <Text style={{ fontSize: 14, color: '#64748b', lineHeight: 22 }}>
          프로필 설정이 완료되었습니다. 아래 내용을 확인하고 다음 단계로 진행하거나 수정할 수 있습니다.
          {'\n\n'}닉네임: 홍길동{'\n'}이메일: hong@example.com{'\n'}전화번호: 010-1234-5678{'\n'}생년월일: 1990.01.15
          {'\n\n'}추가 정보{'\n'}관심 카테고리: 기술, 디자인, 금융{'\n'}알림 설정: 이메일 알림 켜짐, 푸시 알림 켜짐{'\n'}마케팅 수신 동의: 동의함
          {'\n\n'}보안 설정{'\n'}2단계 인증: 활성화{'\n'}로그인 기기: iPhone 15 Pro, MacBook Pro{'\n'}마지막 비밀번호 변경: 2024.12.01
          {'\n\n'}위 정보가 정확한지 확인해 주세요. 다음 단계에서 프로필 사진과 자기소개를 추가할 수 있습니다. 모든 정보는 설정 메뉴에서 언제든지 변경 가능합니다.
        </Text>
      </ScrollView>
      <ActionArea variant="strong" position="fixed">
        <Button variant="solid" color="primary" onPress={fn()}>다음 단계로 이동하기</Button>
        <Button variant="solid" color="assistive" onPress={fn()}>이전 화면으로 돌아가기</Button>
      </ActionArea>
    </View>
  ),
};

/**
 * ## With Alternative - Neutral
 *
 * Neutral variant로 메인 + 대안 버튼을 가로 균등 배치합니다.
 * 라벨이 7자 미만일 때 권장됩니다.
 */
export const WithAlternativeNeutral: Story = {
  name: 'With Alternative - Neutral',
  render: () => (
    <View style={{ height: 400, position: 'relative', overflow: 'hidden', borderRadius: 12, backgroundColor: 'white' }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: '700', color: '#0f172a', marginBottom: 12 }}>출금 주소 변경</Text>
        <Text style={{ fontSize: 14, color: '#64748b', lineHeight: 22 }}>
          현재 출금 주소를 변경하시겠습니까? 변경 시 보안 검증이 필요할 수 있습니다.
          {'\n\n'}현재 출금 주소{'\n'}0x1234...5678 (이더리움 메인넷){'\n'}별칭: 내 메타마스크
          {'\n\n'}예상 처리 시간: 약 10-30분{'\n'}네트워크: Ethereum Mainnet{'\n'}가스비: 0.003 ETH
          {'\n\n'}출금 내역{'\n'}• ETH 2.5개{'\n'}• 예상 수수료: 0.003 ETH{'\n'}• 총 출금액: 2.503 ETH
          {'\n\n'}참고사항{'\n'}출금 주소 변경은 24시간 보안 대기 기간이 적용됩니다. 새로운 주소로 출금하려면 이메일 인증이 필요합니다.
        </Text>
      </ScrollView>
      <ActionArea variant="neutral" position="fixed">
        <Button variant="solid" color="assistive" onPress={fn()}>취소</Button>
        <Button variant="solid" color="primary" onPress={fn()}>확인</Button>
      </ActionArea>
    </View>
  ),
};

/**
 * ## With Sub - Strong
 *
 * Strong variant로 메인 버튼 + TextButton sub action을 세로 배치합니다.
 * Sub action은 덜 중요한 보조 액션입니다.
 */
export const WithSubStrong: Story = {
  name: 'With Sub - Strong',
  render: () => (
    <View style={{ height: 400, position: 'relative', overflow: 'hidden', borderRadius: 12, backgroundColor: 'white' }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: '700', color: '#0f172a', marginBottom: 12 }}>앱 업데이트 안내</Text>
        <Text style={{ fontSize: 14, color: '#64748b', lineHeight: 22 }}>
          v3.2.0 업데이트가 준비되었습니다.
          {'\n\n'}주요 변경사항{'\n'}• 새로운 홈 화면 디자인{'\n'}• 다크 모드 지원{'\n'}• 알림 센터 개선{'\n'}• 입출금 수단 추가 (카카오페이, 네이버페이)
          {'\n\n'}성능 개선{'\n'}• 앱 실행 속도 30% 향상{'\n'}• 이미지 로딩 최적화{'\n'}• 메모리 사용량 20% 감소{'\n'}• 배터리 사용 최적화
          {'\n\n'}버그 수정{'\n'}• 간헐적 로그아웃 현상 수정{'\n'}• 푸시 알림 미수신 문제 해결{'\n'}• 특정 기기에서 화면 깨짐 수정{'\n'}• 검색 결과 정렬 오류 수정
          {'\n\n'}보안 업데이트{'\n'}• 최신 보안 패치 적용{'\n'}• 생체 인증 안정성 향상{'\n'}• SSL 인증서 갱신
          {'\n\n'}더 나은 서비스를 위해 최신 버전으로 업데이트해 주세요.
        </Text>
      </ScrollView>
      <ActionArea variant="strong" position="fixed">
        <TextButton color="secondary" onPress={fn()}>일주일간 보지 않기</TextButton>
        <Button variant="solid" color="primary" onPress={fn()}>확인했습니다</Button>
      </ActionArea>
    </View>
  ),
};

/**
 * ## With Sub - Neutral
 *
 * Neutral variant로 TextButton + 두 개의 Button을 가로 배치합니다.
 */
export const WithSubNeutral: Story = {
  name: 'With Sub - Neutral',
  render: () => (
    <View style={{ height: 400, position: 'relative', overflow: 'hidden', borderRadius: 12, backgroundColor: 'white' }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: '700', color: '#0f172a', marginBottom: 12 }}>프로필 선택</Text>
        <Text style={{ fontSize: 14, color: '#64748b', lineHeight: 22 }}>
          로그인에 사용할 프로필을 선택해주세요. 기존 프로필을 사용하거나 새 프로필을 만들 수 있습니다.
          {'\n\n'}기존 프로필 목록
          {'\n\n'}1. 홍길동 (기본){'\n'}   이메일: hong@example.com{'\n'}   마지막 접속: 2025.02.05{'\n'}   연결된 서비스: 3개
          {'\n\n'}2. 길동 (업무용){'\n'}   이메일: gildong@company.com{'\n'}   마지막 접속: 2025.01.28{'\n'}   연결된 서비스: 5개
          {'\n\n'}3. GD_Hong (해외용){'\n'}   이메일: gd.hong@global.com{'\n'}   마지막 접속: 2024.12.15{'\n'}   연결된 서비스: 1개
          {'\n\n'}프로필별로 알림 설정, 테마, 언어가 독립적으로 관리됩니다. 새 프로필을 만들면 초기 설정부터 시작합니다.
        </Text>
      </ScrollView>
      <ActionArea variant="neutral" position="fixed">
        <TextButton color="secondary" onPress={fn()}>나중에</TextButton>
        <Button variant="solid" color="assistive" onPress={fn()}>취소</Button>
        <Button variant="solid" color="primary" onPress={fn()}>새 프로필 만들기</Button>
      </ActionArea>
    </View>
  ),
};

/**
 * ## Compact
 *
 * Compact variant로 버튼을 우측 정렬합니다.
 * 데스크톱이나 넓은 모달(560px+)에 적합합니다.
 * 모바일 앱에서는 비권장입니다.
 */
export const Compact: Story = {
  render: () => (
    <View style={{ height: 400, position: 'relative', overflow: 'hidden', borderRadius: 12, backgroundColor: 'white' }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: '700', color: '#0f172a', marginBottom: 12 }}>알림 설정</Text>
        <Text style={{ fontSize: 14, color: '#64748b', lineHeight: 22 }}>
          알림 수신 방법과 시간대를 설정할 수 있습니다.
          {'\n\n'}푸시 알림{'\n'}• 거래 상태 알림: 켜짐{'\n'}• 입출금 알림: 켜짐{'\n'}• 이벤트/에어드롭: 꺼짐{'\n'}• 가격 알림: 켜짐
          {'\n\n'}이메일 알림{'\n'}• 거래 확인서: 켜짐{'\n'}• 세금 리포트: 켜짐{'\n'}• 뉴스레터: 꺼짐{'\n'}• 보안 알림: 켜짐
          {'\n\n'}방해 금지 시간{'\n'}• 시작: 오후 10:00{'\n'}• 종료: 오전 7:00{'\n'}• 예외: 보안 알림, 긴급 공지
          {'\n\n'}알림 소리{'\n'}• 기본 소리: 기본값{'\n'}• 진동: 켜짐{'\n'}• 배지: 켜짐
        </Text>
      </ScrollView>
      <ActionArea variant="compact" position="fixed">
        <TextButton color="secondary" onPress={fn()}>취소</TextButton>
        <Button variant="solid" color="primary" size="medium" onPress={fn()}>저장</Button>
      </ActionArea>
    </View>
  ),
};

/**
 * ## With Extra Content
 *
 * topAccessory와 bottomAccessory를 사용하여 추가 콘텐츠를 표시합니다.
 * Extra content 사용 시 Gradient 대신 Divider로 구분됩니다.
 */
export const WithExtraContent: Story = {
  render: () => (
    <View style={{ height: 400, position: 'relative', overflow: 'hidden', borderRadius: 12, backgroundColor: 'white' }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: '700', color: '#0f172a', marginBottom: 12 }}>거래 확인</Text>
        <Text style={{ fontSize: 14, color: '#64748b', lineHeight: 22 }}>
          거래 내역을 확인해주세요.
          {'\n\n'}거래 정보{'\n'}• 프리미엄 멤버십 (연간) x1{'\n'}  정가: ₩120,000{'\n'}  할인: -₩21,000 (첫 가입 할인)
          {'\n\n'}• 클라우드 스토리지 100GB (연간) x1{'\n'}  정가: ₩36,000{'\n'}  할인: -₩6,000 (멤버십 번들 할인)
          {'\n\n'}• 우선 고객 지원 (연간) x1{'\n'}  정가: ₩0 (멤버십 포함)
          {'\n\n'}쿠폰 적용{'\n'}• 신규 가입 10% 할인 쿠폰 적용됨{'\n'}• 추가 적용 가능한 쿠폰: 없음
          {'\n\n'}입출금 수단{'\n'}• 삼성카드 **** 1234{'\n'}• 할부: 일시불
        </Text>
      </ScrollView>
      <ActionArea
        variant="neutral"
        position="fixed"
        topAccessory={
          <View style={{
            padding: 16,
            backgroundColor: '#f8fafc',
            borderRadius: 8,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#334155' }}>총 거래 금액</Text>
            <Text style={{ fontSize: 16, fontWeight: '700', color: '#2563eb' }}>₩99,000</Text>
          </View>
        }
        bottomAccessory={
          <Text style={{ fontSize: 12, color: '#94a3b8', textAlign: 'center', marginTop: 8 }}>
            계속 진행하시면 서비스 약관에 동의하는 것으로 간주됩니다
          </Text>
        }
      >
        <Button variant="solid" color="assistive" onPress={fn()}>취소</Button>
        <Button variant="solid" color="primary" onPress={fn()}>거래하기</Button>
      </ActionArea>
    </View>
  ),
};

/**
 * ## Scrolled Gradient
 *
 * 그라디언트 효과를 명확히 보여주는 스토리입니다.
 * 스크롤 가능한 긴 콘텐츠 위에 ActionArea가 고정되어 있으며,
 * 그라디언트가 뒤의 콘텐츠 위로 페이드 효과를 제공합니다.
 */
export const ScrolledGradient: Story = {
  render: () => (
    <View style={{ height: 400, position: 'relative', overflow: 'hidden', borderRadius: 12, backgroundColor: 'white' }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: '700', color: '#0f172a', marginBottom: 12 }}>개인정보 처리방침</Text>
        <Text style={{ fontSize: 14, color: '#64748b', lineHeight: 22 }}>
          제1조 (목적){'\n'}본 개인정보 처리방침은 회사가 제공하는 서비스 이용과 관련하여 필요한 개인정보를 어떻게 수집, 이용, 보관, 파기하는지에 대한 정보를 담고 있습니다.
          {'\n\n'}제2조 (수집하는 개인정보의 항목){'\n'}회사는 서비스 제공을 위해 필요한 최소한의 개인정보만을 수집합니다.{'\n'}① 필수항목: 이름, 이메일, 전화번호{'\n'}② 선택항목: 프로필 사진, 주소, 관심사{'\n'}③ 자동수집항목: 접속 로그, IP 주소, 기기 정보
          {'\n\n'}제3조 (개인정보의 이용 목적){'\n'}수집된 개인정보는 다음의 목적을 위해 이용됩니다.{'\n'}① 서비스 제공 및 운영{'\n'}② 회원 관리 및 본인 확인{'\n'}③ 마케팅 및 광고 활용 (선택 동의 시){'\n'}④ 서비스 개선 및 신규 서비스 개발
          {'\n\n'}제4조 (개인정보의 보유 및 이용기간){'\n'}회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.{'\n'}① 회원 탈퇴 시: 즉시 파기{'\n'}② 관련 법령에 의한 보존: 계약 또는 청약철회에 관한 기록 5년, 소비자 불만 또는 분쟁 처리에 관한 기록 3년
          {'\n\n'}제5조 (개인정보의 제3자 제공){'\n'}회사는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다. 다만, 이용자의 동의가 있거나 법령의 규정에 의한 경우는 예외로 합니다.
          {'\n\n'}제6조 (개인정보 처리의 위탁){'\n'}회사는 서비스 향상을 위해 개인정보 처리를 외부 전문업체에 위탁할 수 있으며, 위탁 시 관련 법령에 따라 안전하게 관리되도록 필요한 조치를 취합니다.
        </Text>
      </ScrollView>
      <ActionArea variant="neutral" position="fixed" showGradient={true}>
        <Button variant="solid" color="assistive" onPress={fn()}>거부</Button>
        <Button variant="solid" color="primary" onPress={fn()}>동의</Button>
      </ActionArea>
    </View>
  ),
};

/**
 * ## Variants
 *
 * 세 가지 variant(Strong, Neutral, Compact)를 나란히 비교합니다.
 */
export const Variants: Story = {
  render: () => (
    <View style={{ gap: 20 }}>
      <View>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#64748b', marginBottom: 8 }}>Strong (세로 레이아웃)</Text>
        <View style={{ borderRadius: 12, overflow: 'hidden' }}>
          <ActionArea variant="strong" position="static">
            <Button variant="solid" color="primary" onPress={fn()}>다음 단계로 이동하기</Button>
            <Button variant="solid" color="assistive" onPress={fn()}>이전 화면으로 돌아가기</Button>
          </ActionArea>
        </View>
      </View>

      <View>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#64748b', marginBottom: 8 }}>Neutral (가로 균등 배치)</Text>
        <View style={{ borderRadius: 12, overflow: 'hidden' }}>
          <ActionArea variant="neutral" position="static">
            <Button variant="solid" color="assistive" onPress={fn()}>취소</Button>
            <Button variant="solid" color="primary" onPress={fn()}>확인</Button>
          </ActionArea>
        </View>
      </View>

      <View>
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#64748b', marginBottom: 8 }}>Compact (우측 정렬)</Text>
        <View style={{ borderRadius: 12, overflow: 'hidden' }}>
          <ActionArea variant="compact" position="static">
            <TextButton color="secondary" onPress={fn()}>취소</TextButton>
            <Button variant="solid" color="primary" size="medium" onPress={fn()}>저장</Button>
          </ActionArea>
        </View>
      </View>
    </View>
  ),
};

/**
 * ## Main Only
 *
 * 단일 메인 버튼만 표시하는 가장 단순한 형태입니다.
 */
export const MainOnly: Story = {
  render: () => (
    <View style={{ height: 400, position: 'relative', overflow: 'hidden', borderRadius: 12, backgroundColor: 'white' }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: '700', color: '#0f172a', marginBottom: 12 }}>서비스 점검 안내</Text>
        <Text style={{ fontSize: 14, color: '#64748b', lineHeight: 22 }}>
          안녕하세요, 서비스 이용에 불편을 드려 죄송합니다.
          {'\n\n'}서비스 안정화를 위한 정기 점검이 예정되어 있습니다.
          {'\n\n'}점검 일시{'\n'}2025년 2월 10일 (월) 오전 2:00 ~ 오전 6:00 (약 4시간)
          {'\n\n'}점검 내용{'\n'}• 서버 인프라 업그레이드{'\n'}• 데이터베이스 최적화{'\n'}• 보안 패치 적용{'\n'}• CDN 캐시 갱신
          {'\n\n'}영향 범위{'\n'}• 점검 시간 동안 모든 서비스 이용이 제한됩니다{'\n'}• 입출금 처리가 일시 중단됩니다{'\n'}• 예약된 알림 발송이 지연될 수 있습니다
          {'\n\n'}사전 조치 사항{'\n'}• 작성 중인 내용은 미리 저장해주세요{'\n'}• 진행 중인 거래는 점검 전 완료해주세요{'\n'}• 긴급 문의: support@example.com
          {'\n\n'}빠르고 안정적인 서비스 제공을 위해 최선을 다하겠습니다. 감사합니다.
        </Text>
      </ScrollView>
      <ActionArea variant="neutral" position="fixed">
        <Button variant="solid" color="primary" onPress={fn()}>확인</Button>
      </ActionArea>
    </View>
  ),
};
