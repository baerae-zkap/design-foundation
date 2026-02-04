"use client";

import { useState } from "react";
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

      {/* Semantic */}
      <section style={{ marginBottom: 48 }}>
        <h2 id="semantic" style={{ fontSize: 20, fontWeight: 700, marginBottom: 4, color: 'var(--text-primary)' }}>Semantic</h2>
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
