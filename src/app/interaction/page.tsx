"use client";

import { useState, useRef } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { TokenDownload } from "@/components/TokenDownload";
import interactionJson from "../../../public/interaction-tokens.json";

const duration = interactionJson.interaction.duration;
const easing = interactionJson.interaction.easing;
const semantic = interactionJson.interaction.semantic;

export default function InteractionPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "파운데이션", href: "/" }, { label: "Interaction" }]} />

      <h1 style={{ fontSize: 30, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>Interaction</h1>
      <p style={{ marginBottom: 24, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
        앱 인터랙션을 위한 시스템입니다. <strong style={{ color: 'var(--text-primary)' }}>Duration</strong>과 <strong style={{ color: 'var(--text-primary)' }}>Easing</strong> 조합으로 일관된 느낌을 만듭니다.
      </p>
      <TokenDownload files={[
        { name: 'interaction-tokens.json', path: '/interaction-tokens.json' },
      ]} />

      {/* Duration */}
      <section style={{ marginBottom: 48 }}>
        <h2 id="duration" style={{ fontSize: 20, fontWeight: 700, marginBottom: 4, color: 'var(--text-primary)' }}>Duration</h2>
        <p style={{ marginBottom: 16, color: 'var(--text-secondary)' }}>지속 시간입니다. 컴포넌트 크기와 복잡도에 따라 선택합니다.</p>
        <div style={{ backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)', overflow: 'hidden' }}>
          {Object.entries(duration).filter(([k, v]) => !k.startsWith("_") && typeof v === 'object').map(([key, token], i, arr) => (
            <DurationRow key={key} name={key} token={token as { value: string; _comment?: string }} isLast={i === arr.length - 1} />
          ))}
        </div>
      </section>

      {/* Easing */}
      <section style={{ marginBottom: 48 }}>
        <h2 id="easing" style={{ fontSize: 20, fontWeight: 700, marginBottom: 4, color: 'var(--text-primary)' }}>Easing</h2>
        <p style={{ marginBottom: 16, color: 'var(--text-secondary)' }}>가속 곡선입니다. 동작의 특성에 따라 선택합니다.</p>
        <div style={{ backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)', overflow: 'hidden' }}>
          {Object.entries(easing).filter(([k, v]) => !k.startsWith("_") && typeof v === 'object').map(([key, token], i, arr) => (
            <EasingRow key={key} name={key} token={token as { value: string; _comment?: string }} isLast={i === arr.length - 1} />
          ))}
        </div>
      </section>

      {/* Interactive Demo */}
      <section style={{ marginBottom: 48 }}>
        <h2 id="demo" style={{ fontSize: 20, fontWeight: 700, marginBottom: 4, color: 'var(--text-primary)' }}>Interactive Demo</h2>
        <p style={{ marginBottom: 16, color: 'var(--text-secondary)' }}>Duration과 Easing 조합을 테스트해보세요.</p>
        <InteractiveDemo />
      </section>

      {/* Live Examples */}
      <section style={{ marginBottom: 48 }}>
        <h2 id="examples" style={{ fontSize: 20, fontWeight: 700, marginBottom: 4, color: 'var(--text-primary)' }}>Live Examples</h2>
        <p style={{ marginBottom: 16, color: 'var(--text-secondary)' }}>실제 컴포넌트에서 인터랙션을 확인하세요.</p>
        <LiveExamples />
      </section>

      {/* Semantic Reference */}
      <section style={{ marginBottom: 48 }}>
        <h2 id="semantic" style={{ fontSize: 20, fontWeight: 700, marginBottom: 4, color: 'var(--text-primary)' }}>Semantic Reference</h2>
        <p style={{ marginBottom: 16, color: 'var(--text-secondary)' }}>컴포넌트별 권장 모션 조합입니다.</p>
        <div style={{ backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)', overflow: 'hidden' }}>
          {Object.entries(semantic).filter(([k]) => !k.startsWith("_")).map(([component, actions], i, arr) => (
            <div key={component} style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--divider)' : 'none' }}>
              <div style={{ padding: '12px 16px', backgroundColor: 'var(--bg-secondary)' }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{component}</span>
              </div>
              {Object.entries(actions as Record<string, { duration: string; easing: string; _comment?: string }>).filter(([k]) => !k.startsWith("_")).map(([action, config]) => (
                <div key={action} style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', paddingLeft: 32, borderTop: '1px solid var(--divider)' }}>
                  <span style={{ width: 80, fontSize: 13, color: 'var(--text-secondary)' }}>{action}</span>
                  <span style={{ flex: 1, fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>
                    {config.duration.replace('{duration.', '').replace('}', '')} + {config.easing.replace('{easing.', '').replace('}', '')}
                  </span>
                  <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{config._comment}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Usage Guidelines */}
      <section style={{ marginBottom: 48 }}>
        <h2 id="guidelines" style={{ fontSize: 20, fontWeight: 700, marginBottom: 4, color: 'var(--text-primary)' }}>Usage Guidelines</h2>
        <p style={{ marginBottom: 16, color: 'var(--text-secondary)' }}>모션 적용 시 참고하세요.</p>
        <div style={{ display: 'grid', gap: 12 }}>
          {[
            { title: '등장 vs 퇴장', desc: '등장은 easeOut (천천히 멈춤), 퇴장은 easeIn (빠르게 사라짐)' },
            { title: '크기 기반', desc: '작은 요소는 빠르게 (instant/fast), 큰 요소는 느리게 (normal/slow)' },
            { title: '즉각 피드백', desc: '사용자 액션(클릭, 호버)에는 100~200ms 내 반응' },
            { title: '접근성', desc: 'prefers-reduced-motion 미디어 쿼리 필수 적용' },
            { title: '성능', desc: 'transform, opacity만 애니메이션 (GPU 가속)' },
          ].map((item) => (
            <div key={item.title} style={{ padding: 16, backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)', border: '1px solid var(--divider)' }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{item.title}</span>
              <p style={{ marginTop: 4, fontSize: 13, color: 'var(--text-secondary)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function DurationRow({ name, token, isLast }: { name: string; token: { value: string; _comment?: string }; isLast: boolean }) {
  const [animate, setAnimate] = useState(false);
  const ms = parseInt(token.value);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 16, borderBottom: isLast ? 'none' : '1px solid var(--divider)' }}>
      <div style={{ width: 100 }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{name}</span>
        <p style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 2 }}>{token.value}</p>
      </div>
      <div style={{ flex: 1, position: 'relative', height: 40, backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            left: animate ? 'calc(100% - 36px)' : 4,
            top: 4,
            width: 32,
            height: 32,
            backgroundColor: '#2563eb',
            borderRadius: 'var(--radius-sm)',
            transition: `left ${ms}ms ease-out`,
          }}
        />
      </div>
      <button
        onClick={() => setAnimate(!animate)}
        style={{
          padding: '8px 16px',
          fontSize: 13,
          fontWeight: 500,
          backgroundColor: 'var(--bg-secondary)',
          color: 'var(--text-primary)',
          border: '1px solid var(--divider)',
          borderRadius: 'var(--radius-md)',
          cursor: 'pointer',
        }}
      >
        Play
      </button>
      <span style={{ width: 160, fontSize: 12, color: 'var(--text-tertiary)' }}>{token._comment}</span>
    </div>
  );
}

function EasingRow({ name, token, isLast }: { name: string; token: { value: string; _comment?: string }; isLast: boolean }) {
  const [animate, setAnimate] = useState(false);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 16, borderBottom: isLast ? 'none' : '1px solid var(--divider)' }}>
      <div style={{ width: 100 }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{name}</span>
      </div>
      <div style={{ flex: 1, position: 'relative', height: 40, backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            left: animate ? 'calc(100% - 36px)' : 4,
            top: 4,
            width: 32,
            height: 32,
            backgroundColor: '#2563eb',
            borderRadius: 'var(--radius-sm)',
            transition: `left 500ms ${token.value}`,
          }}
        />
      </div>
      <button
        onClick={() => setAnimate(!animate)}
        style={{
          padding: '8px 16px',
          fontSize: 13,
          fontWeight: 500,
          backgroundColor: 'var(--bg-secondary)',
          color: 'var(--text-primary)',
          border: '1px solid var(--divider)',
          borderRadius: 'var(--radius-md)',
          cursor: 'pointer',
        }}
      >
        Play
      </button>
      <span style={{ width: 200, fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>{token.value}</span>
    </div>
  );
}

function InteractiveDemo() {
  const [selectedDuration, setSelectedDuration] = useState('fast');
  const [selectedEasing, setSelectedEasing] = useState('easeOut');
  const [animate, setAnimate] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const durationValue = (duration as any)[selectedDuration]?.value || '200ms';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const easingValue = (easing as any)[selectedEasing]?.value || 'ease-out';

  return (
    <div style={{ padding: 24, backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)' }}>
      <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 8 }}>Duration</label>
          <select
            value={selectedDuration}
            onChange={(e) => setSelectedDuration(e.target.value)}
            style={{
              padding: '8px 12px',
              fontSize: 14,
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--divider)',
              backgroundColor: 'var(--bg-primary)',
              color: 'var(--text-primary)',
            }}
          >
            {Object.keys(duration).filter(k => !k.startsWith('_')).map((key) => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 8 }}>Easing</label>
          <select
            value={selectedEasing}
            onChange={(e) => setSelectedEasing(e.target.value)}
            style={{
              padding: '8px 12px',
              fontSize: 14,
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--divider)',
              backgroundColor: 'var(--bg-primary)',
              color: 'var(--text-primary)',
            }}
          >
            {Object.keys(easing).filter(k => !k.startsWith('_')).map((key) => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <button
            onClick={() => setAnimate(!animate)}
            style={{
              padding: '10px 24px',
              fontSize: 14,
              fontWeight: 600,
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
            }}
          >
            Play
          </button>
        </div>
      </div>

      <div style={{ position: 'relative', height: 80, backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            left: animate ? 'calc(100% - 72px)' : 8,
            top: 8,
            width: 64,
            height: 64,
            backgroundColor: '#2563eb',
            borderRadius: 'var(--radius-md)',
            transition: `left ${durationValue} ${easingValue}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>

      <div style={{ marginTop: 16, padding: 12, backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
        <code style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
          transition: all {durationValue} {easingValue};
        </code>
      </div>
    </div>
  );
}

function LiveExamples() {
  const [modalOpen, setModalOpen] = useState(false);
  const [toasts, setToasts] = useState<{ id: number; exiting: boolean }[]>([]);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [toggleOn, setToggleOn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toastIdRef = useRef(0);

  const addToast = () => {
    const id = toastIdRef.current++;
    setToasts(prev => [...prev, { id, exiting: false }]);

    // Auto-hide after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t));
      // Remove after exit animation
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 200);
    }, 3000);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t));
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 200);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
      {/* Button Demo */}
      <div style={{ padding: 24, backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)' }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>Button</h3>
        <p style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 16 }}>hover: 150ms easeOut / press: 100ms easeOut</p>
        <button
          style={{
            padding: '12px 24px',
            fontSize: 14,
            fontWeight: 600,
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            transition: 'all 150ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1d4ed8'; e.currentTarget.style.transform = 'scale(1.02)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#2563eb'; e.currentTarget.style.transform = 'scale(1)'; }}
          onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.96)'; }}
          onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; }}
        >
          Hover & Press
        </button>
      </div>

      {/* Toggle Demo */}
      <div style={{ padding: 24, backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)' }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>Toggle</h3>
        <p style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 16 }}>switch: 200ms spring</p>
        <button
          onClick={() => setToggleOn(!toggleOn)}
          style={{
            width: 52,
            height: 28,
            borderRadius: 14,
            border: 'none',
            backgroundColor: toggleOn ? '#2563eb' : '#cbd5e1',
            cursor: 'pointer',
            position: 'relative',
            transition: 'background-color 200ms cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          <div style={{
            position: 'absolute',
            top: 2,
            left: toggleOn ? 26 : 2,
            width: 24,
            height: 24,
            borderRadius: '50%',
            backgroundColor: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            transition: 'left 200ms cubic-bezier(0.34, 1.56, 0.64, 1)',
          }} />
        </button>
      </div>

      {/* Dropdown Demo */}
      <div style={{ padding: 24, backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)' }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>Dropdown</h3>
        <p style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 16 }}>open: 200ms easeOut / close: 100ms easeIn</p>
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              padding: '10px 16px',
              fontSize: 14,
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--divider)',
              borderRadius: 8,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            Select option
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)' }}>
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: 4,
            backgroundColor: 'white',
            border: '1px solid var(--divider)',
            borderRadius: 8,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            opacity: dropdownOpen ? 1 : 0,
            transform: dropdownOpen ? 'translateY(0) scale(1)' : 'translateY(-8px) scale(0.95)',
            pointerEvents: dropdownOpen ? 'auto' : 'none',
            transition: dropdownOpen
              ? 'all 200ms cubic-bezier(0.16, 1, 0.3, 1)'
              : 'all 100ms cubic-bezier(0.7, 0, 0.84, 0)',
          }}>
            {['Option 1', 'Option 2', 'Option 3'].map((opt) => (
              <div key={opt} style={{ padding: '10px 16px', fontSize: 14, cursor: 'pointer' }} onClick={() => setDropdownOpen(false)}>
                {opt}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Demo */}
      <div style={{ padding: 24, backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)' }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>Modal</h3>
        <p style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 16 }}>enter: 300ms easeOut / exit: 200ms easeIn</p>
        <button
          onClick={() => setModalOpen(true)}
          style={{
            padding: '10px 20px',
            fontSize: 14,
            fontWeight: 500,
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            transition: 'all 150ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1d4ed8'; e.currentTarget.style.transform = 'scale(1.02)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#2563eb'; e.currentTarget.style.transform = 'scale(1)'; }}
          onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.96)'; }}
          onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; }}
        >
          Open Modal
        </button>
      </div>

      {/* Toast Demo */}
      <div style={{ padding: 24, backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)' }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>Toast</h3>
        <p style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 16 }}>enter: 300ms spring / exit: 200ms easeIn</p>
        <button
          onClick={addToast}
          style={{
            padding: '10px 20px',
            fontSize: 14,
            fontWeight: 500,
            backgroundColor: '#22c55e',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            transition: 'all 150ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#16a34a'; e.currentTarget.style.transform = 'scale(1.02)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#22c55e'; e.currentTarget.style.transform = 'scale(1)'; }}
          onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.96)'; }}
          onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; }}
        >
          Show Toast
        </button>
      </div>

      {/* BottomSheet Demo */}
      <div style={{ padding: 24, backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)' }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>Bottom Sheet</h3>
        <p style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 16 }}>enter: 400ms easeOut / exit: 300ms easeIn</p>
        <button
          onClick={() => setBottomSheetOpen(true)}
          style={{
            padding: '10px 20px',
            fontSize: 14,
            fontWeight: 500,
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            border: '1px solid var(--divider)',
            borderRadius: 8,
            cursor: 'pointer',
            transition: 'all 150ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'; e.currentTarget.style.transform = 'scale(1.02)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'; e.currentTarget.style.transform = 'scale(1)'; }}
          onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.96)'; }}
          onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; }}
        >
          Open Sheet
        </button>
      </div>

      {/* Modal Overlay */}
      {modalOpen && (
        <div
          onClick={() => setModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            animation: 'fadeIn 300ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 400,
              backgroundColor: 'white',
              borderRadius: 24,
              padding: 24,
              animation: 'modalIn 300ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Modal Title</h3>
            <p style={{ fontSize: 14, color: '#64748b', marginBottom: 24 }}>This modal uses 300ms easeOut for enter animation.</p>
            <button
              onClick={() => setModalOpen(false)}
              style={{
                padding: '10px 20px',
                fontSize: 14,
                fontWeight: 500,
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                transition: 'all 150ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1d4ed8'; e.currentTarget.style.transform = 'scale(1.02)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#2563eb'; e.currentTarget.style.transform = 'scale(1)'; }}
              onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.96)'; }}
              onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Toast Stack */}
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1000, display: 'flex', flexDirection: 'column-reverse', gap: 8 }}>
        {toasts.map((toast, index) => (
          <div
            key={toast.id}
            style={{
              backgroundColor: '#1e293b',
              color: 'white',
              padding: '14px 20px',
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              animation: toast.exiting
                ? 'toastOut 200ms cubic-bezier(0.7, 0, 0.84, 0) forwards'
                : 'toastIn 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
              transform: `translateY(${index * -4}px)`,
              transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#22c55e">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span style={{ fontSize: 14, fontWeight: 500 }}>Successfully saved!</span>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                marginLeft: 8,
                transition: 'color 150ms',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Bottom Sheet */}
      {bottomSheetOpen && (
        <div
          onClick={() => setBottomSheetOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1000,
            animation: 'fadeIn 400ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'white',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 24,
              paddingBottom: 40,
              animation: 'sheetIn 400ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div style={{ width: 40, height: 4, backgroundColor: '#cbd5e1', borderRadius: 2, margin: '0 auto 20px' }} />
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Bottom Sheet</h3>
            <p style={{ fontSize: 14, color: '#64748b', marginBottom: 24 }}>This sheet uses 400ms easeOut for enter animation.</p>
            <button
              onClick={() => setBottomSheetOpen(false)}
              style={{
                width: '100%',
                padding: '14px',
                fontSize: 14,
                fontWeight: 500,
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                transition: 'all 150ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'; e.currentTarget.style.transform = 'scale(1.01)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'; e.currentTarget.style.transform = 'scale(1)'; }}
              onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.98)'; }}
              onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1.01)'; }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(100%); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes toastOut {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(100%); }
        }
        @keyframes sheetIn {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
