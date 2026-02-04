"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";

interface ActionItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  hasArrow?: boolean;
}

function ActionItem({ children, onClick, disabled = false, hasArrow = true }: ActionItemProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
      onMouseDown={() => !disabled && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px',
        fontSize: 16,
        fontWeight: 500,
        backgroundColor: disabled ? '#f8fafc' : isPressed ? '#f1f5f9' : isHovered ? '#f8fafc' : 'white',
        color: disabled ? '#94a3b8' : '#1e293b',
        border: 'none',
        borderRadius: 12,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 200ms cubic-bezier(0.16, 1, 0.3, 1)',
        transform: isPressed ? 'scale(0.99)' : 'scale(1)',
        boxShadow: isHovered && !disabled ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
      }}
    >
      <span>{children}</span>
      {hasArrow && (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{
            opacity: disabled ? 0.4 : 1,
            transform: isHovered && !disabled ? 'translateX(4px)' : 'translateX(0)',
            transition: 'all 200ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      )}
    </button>
  );
}

export default function ActionItemPage() {
  return (
    <div style={{ maxWidth: 720 }}>
      <Breadcrumb
        items={[
          { label: "Components", href: "/components" },
          { label: "Actions", href: "/components/actions/action-item" },
          { label: "Action Item" },
        ]}
      />

      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 4, color: "var(--text-primary)" }}>
        Action Item
      </h1>
      <p style={{ fontSize: 16, color: "var(--text-secondary)", marginBottom: 32, lineHeight: 1.6 }}>
        사용자에게 다음 단계의 행동을 유도하는 리스트형 액션 요소입니다.
        주로 설정 화면, 메뉴, 선택 목록 등에서 사용됩니다.
      </p>

      {/* Basic */}
      <section style={{ marginBottom: 48 }}>
        <h2 id="basic" style={{ fontSize: 20, fontWeight: 700, marginBottom: 4, color: "var(--text-primary)" }}>
          Basic
        </h2>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16 }}>
          기본 Action Item은 텍스트와 화살표로 구성됩니다.
        </p>
        <div style={{ padding: 24, backgroundColor: "var(--bg-secondary)", borderRadius: 16 }}>
          <div style={{ maxWidth: 360, display: "flex", flexDirection: "column", gap: 8 }}>
            <ActionItem>프로필 설정</ActionItem>
            <ActionItem>알림 설정</ActionItem>
            <ActionItem>개인정보 처리방침</ActionItem>
          </div>
        </div>
      </section>

      {/* With Description */}
      <section style={{ marginBottom: 48 }}>
        <h2 id="with-description" style={{ fontSize: 20, fontWeight: 700, marginBottom: 4, color: "var(--text-primary)" }}>
          With Description
        </h2>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16 }}>
          부가 설명이 필요한 경우 두 줄로 표현할 수 있습니다.
        </p>
        <div style={{ padding: 24, backgroundColor: "var(--bg-secondary)", borderRadius: 16 }}>
          <div style={{ maxWidth: 360, display: "flex", flexDirection: "column", gap: 8 }}>
            <ActionItemWithDesc
              title="계정 연동"
              description="소셜 계정을 연결하여 간편 로그인"
            />
            <ActionItemWithDesc
              title="보안 설정"
              description="2단계 인증 및 비밀번호 변경"
            />
          </div>
        </div>
      </section>

      {/* With Icon */}
      <section style={{ marginBottom: 48 }}>
        <h2 id="with-icon" style={{ fontSize: 20, fontWeight: 700, marginBottom: 4, color: "var(--text-primary)" }}>
          With Icon
        </h2>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16 }}>
          아이콘을 추가하여 의미를 더 명확하게 전달합니다.
        </p>
        <div style={{ padding: 24, backgroundColor: "var(--bg-secondary)", borderRadius: 16 }}>
          <div style={{ maxWidth: 360, display: "flex", flexDirection: "column", gap: 8 }}>
            <ActionItemWithIcon
              icon={<UserIcon />}
              title="프로필"
            />
            <ActionItemWithIcon
              icon={<BellIcon />}
              title="알림"
            />
            <ActionItemWithIcon
              icon={<SettingsIcon />}
              title="설정"
            />
          </div>
        </div>
      </section>

      {/* States */}
      <section style={{ marginBottom: 48 }}>
        <h2 id="states" style={{ fontSize: 20, fontWeight: 700, marginBottom: 4, color: "var(--text-primary)" }}>
          States
        </h2>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16 }}>
          Action Item의 상태별 모습입니다.
        </p>
        <div style={{ padding: 24, backgroundColor: "var(--bg-secondary)", borderRadius: 16 }}>
          <div style={{ maxWidth: 360, display: "flex", flexDirection: "column", gap: 8 }}>
            <ActionItem>Default</ActionItem>
            <div style={{ opacity: 1 }}>
              <button
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  fontSize: 16,
                  fontWeight: 500,
                  backgroundColor: '#f8fafc',
                  color: '#1e293b',
                  border: 'none',
                  borderRadius: 12,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                }}
              >
                <span>Hover</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: 'translateX(4px)' }}>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div style={{ opacity: 1 }}>
              <button
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  fontSize: 16,
                  fontWeight: 500,
                  backgroundColor: '#f1f5f9',
                  color: '#1e293b',
                  border: 'none',
                  borderRadius: 12,
                  cursor: 'pointer',
                  transform: 'scale(0.99)',
                }}
              >
                <span>Pressed</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <ActionItem disabled>Disabled</ActionItem>
          </div>
        </div>
      </section>

      {/* Grouped */}
      <section style={{ marginBottom: 48 }}>
        <h2 id="grouped" style={{ fontSize: 20, fontWeight: 700, marginBottom: 4, color: "var(--text-primary)" }}>
          Grouped
        </h2>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16 }}>
          카드 형태로 그룹화하여 관련 항목들을 묶을 수 있습니다.
        </p>
        <div style={{ padding: 24, backgroundColor: "var(--bg-secondary)", borderRadius: 16 }}>
          <div style={{ maxWidth: 360 }}>
            <div style={{ backgroundColor: 'white', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--divider)' }}>
              <ActionItemGrouped title="내 계정" isFirst />
              <ActionItemGrouped title="결제 관리" />
              <ActionItemGrouped title="구독 정보" isLast />
            </div>
          </div>
        </div>
      </section>

      {/* Props Table */}
      <section style={{ marginBottom: 48 }}>
        <h2 id="props" style={{ fontSize: 20, fontWeight: 700, marginBottom: 4, color: "var(--text-primary)" }}>
          Props
        </h2>
        <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16 }}>
          Action Item 컴포넌트의 속성입니다.
        </p>
        <div style={{ overflow: "auto", borderRadius: 12, border: "1px solid var(--divider)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ backgroundColor: "var(--bg-secondary)" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "var(--text-primary)", borderBottom: "1px solid var(--divider)" }}>Prop</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "var(--text-primary)", borderBottom: "1px solid var(--divider)" }}>Type</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "var(--text-primary)", borderBottom: "1px solid var(--divider)" }}>Default</th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "var(--text-primary)", borderBottom: "1px solid var(--divider)" }}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4 }}>title</code></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>string</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>-</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>액션 아이템의 제목</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4 }}>description</code></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>string</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>-</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>부가 설명 텍스트</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4 }}>icon</code></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>ReactNode</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>-</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>왼쪽 아이콘</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4 }}>hasArrow</code></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>boolean</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>true</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>우측 화살표 표시 여부</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4 }}>disabled</code></td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>boolean</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>false</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--divider)", color: "var(--text-secondary)" }}>비활성화 상태</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 16px" }}><code style={{ backgroundColor: "var(--bg-secondary)", padding: "2px 6px", borderRadius: 4 }}>onClick</code></td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>() =&gt; void</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>-</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>클릭 핸들러</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

// Helper Components
function ActionItemWithDesc({ title, description }: { title: string; description: string }) {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px',
        backgroundColor: isPressed ? '#f1f5f9' : isHovered ? '#f8fafc' : 'white',
        border: 'none',
        borderRadius: 12,
        cursor: 'pointer',
        transition: 'all 200ms cubic-bezier(0.16, 1, 0.3, 1)',
        transform: isPressed ? 'scale(0.99)' : 'scale(1)',
        boxShadow: isHovered ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
      }}
    >
      <div style={{ textAlign: 'left' }}>
        <div style={{ fontSize: 16, fontWeight: 500, color: '#1e293b', marginBottom: 4 }}>{title}</div>
        <div style={{ fontSize: 13, color: '#64748b' }}>{description}</div>
      </div>
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#94a3b8"
        strokeWidth="2"
        style={{
          transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
          transition: 'all 200ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </button>
  );
}

function ActionItemWithIcon({ icon, title }: { icon: React.ReactNode; title: string }) {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '16px 20px',
        backgroundColor: isPressed ? '#f1f5f9' : isHovered ? '#f8fafc' : 'white',
        border: 'none',
        borderRadius: 12,
        cursor: 'pointer',
        transition: 'all 200ms cubic-bezier(0.16, 1, 0.3, 1)',
        transform: isPressed ? 'scale(0.99)' : 'scale(1)',
        boxShadow: isHovered ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
      }}
    >
      <div style={{ color: '#64748b' }}>{icon}</div>
      <span style={{ flex: 1, fontSize: 16, fontWeight: 500, color: '#1e293b', textAlign: 'left' }}>{title}</span>
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#94a3b8"
        strokeWidth="2"
        style={{
          transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
          transition: 'all 200ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </button>
  );
}

function ActionItemGrouped({ title, isFirst, isLast }: { title: string; isFirst?: boolean; isLast?: boolean }) {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px',
        backgroundColor: isPressed ? '#f1f5f9' : isHovered ? '#f8fafc' : 'white',
        border: 'none',
        borderBottom: isLast ? 'none' : '1px solid var(--divider)',
        cursor: 'pointer',
        transition: 'all 200ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <span style={{ fontSize: 16, fontWeight: 500, color: '#1e293b' }}>{title}</span>
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#94a3b8"
        strokeWidth="2"
        style={{
          transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
          transition: 'all 200ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </button>
  );
}

// Icons
function UserIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
    </svg>
  );
}
