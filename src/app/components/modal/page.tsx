"use client";

import { useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

function Modal({ isOpen, onClose, title, children, size = "md" }: ModalProps) {
  if (!isOpen) return null;

  const sizeStyles = {
    sm: { width: 320 },
    md: { width: 480 },
    lg: { width: 640 },
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "var(--effect-alpha-overlay-dim)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: 24,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "var(--bg-elevated)",
          borderRadius: "var(--radius-xl)",
          boxShadow: "var(--shadow-md)",
          maxWidth: "100%",
          maxHeight: "90vh",
          overflow: "auto",
          ...sizeStyles[size],
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "20px 24px",
              borderBottom: "1px solid var(--divider)",
            }}
          >
            <h3 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
              {title}
            </h3>
            <button
              onClick={onClose}
              style={{
                width: 32,
                height: 32,
                borderRadius: "var(--radius-md)",
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-tertiary)",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}
        <div style={{ padding: 24 }}>{children}</div>
      </div>
    </div>
  );
}

function Button({ variant = "primary", children, onClick }: { variant?: "primary" | "secondary"; children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 16px",
        fontSize: 14,
        fontWeight: 500,
        borderRadius: "var(--radius-md)",
        border: variant === "secondary" ? "1px solid var(--divider)" : "none",
        backgroundColor: variant === "primary" ? "var(--brand-primary)" : "var(--bg-primary)",
        color: variant === "primary" ? "white" : "var(--text-secondary)",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

export default function ModalPage() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [sizeOpen, setSizeOpen] = useState<"sm" | "md" | "lg" | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  return (
    <div style={{ maxWidth: 720 }}>
      <Breadcrumb items={[{ label: "컴포넌트", href: "/" }, { label: "Modal" }]} />

      <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>Modal</h1>
      <p className="mb-8 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        화면 위에 오버레이되어 사용자의 집중을 유도하는 대화상자입니다.
      </p>

      {/* Basic */}
      <section className="mb-12">
        <h2 id="basic" className="text-xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>Basic</h2>
        <p className="mb-4" style={{ color: "var(--text-secondary)" }}>기본 모달입니다. 버튼을 클릭해보세요.</p>
        <div className="p-6" style={{ backgroundColor: "var(--bg-elevated)", borderRadius: "var(--radius-lg)", border: "1px solid var(--divider)" }}>
          <Button onClick={() => setBasicOpen(true)}>모달 열기</Button>
        </div>
        <Modal isOpen={basicOpen} onClose={() => setBasicOpen(false)} title="기본 모달">
          <p style={{ color: "var(--text-secondary)" }}>
            모달 컨텐츠가 여기에 표시됩니다. 배경을 클릭하거나 X 버튼을 눌러 닫을 수 있습니다.
          </p>
        </Modal>
        <pre className="code-block mt-4">
          <code style={{ color: "var(--text-secondary)" }}>{`<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="기본 모달"
>
  <p>모달 컨텐츠</p>
</Modal>`}</code>
        </pre>
      </section>

      {/* Confirm */}
      <section className="mb-12">
        <h2 id="confirm" className="text-xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>Confirm Dialog</h2>
        <p className="mb-4" style={{ color: "var(--text-secondary)" }}>사용자 확인이 필요한 경우 사용합니다.</p>
        <div className="p-6" style={{ backgroundColor: "var(--bg-elevated)", borderRadius: "var(--radius-lg)", border: "1px solid var(--divider)" }}>
          <Button onClick={() => setConfirmOpen(true)}>삭제하기</Button>
        </div>
        <Modal isOpen={confirmOpen} onClose={() => setConfirmOpen(false)} title="삭제 확인" size="sm">
          <p style={{ color: "var(--text-secondary)", marginBottom: 24 }}>
            정말로 이 항목을 삭제하시겠습니까?<br />
            이 작업은 되돌릴 수 없습니다.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
            <Button variant="secondary" onClick={() => setConfirmOpen(false)}>취소</Button>
            <button
              onClick={() => setConfirmOpen(false)}
              style={{
                padding: "10px 16px",
                fontSize: 14,
                fontWeight: 500,
                borderRadius: "var(--radius-md)",
                border: "none",
                backgroundColor: "var(--status-negative-content)",
                color: "white",
                cursor: "pointer",
              }}
            >
              삭제
            </button>
          </div>
        </Modal>
      </section>

      {/* Sizes */}
      <section className="mb-12">
        <h2 id="sizes" className="text-xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>Sizes</h2>
        <p className="mb-4" style={{ color: "var(--text-secondary)" }}>컨텐츠 양에 따라 크기를 선택합니다.</p>
        <div className="p-6 flex flex-wrap gap-4" style={{ backgroundColor: "var(--bg-elevated)", borderRadius: "var(--radius-lg)", border: "1px solid var(--divider)" }}>
          <Button onClick={() => setSizeOpen("sm")}>Small (320px)</Button>
          <Button onClick={() => setSizeOpen("md")}>Medium (480px)</Button>
          <Button onClick={() => setSizeOpen("lg")}>Large (640px)</Button>
        </div>
        {sizeOpen && (
          <Modal isOpen={!!sizeOpen} onClose={() => setSizeOpen(null)} title={`${sizeOpen.toUpperCase()} 모달`} size={sizeOpen}>
            <p style={{ color: "var(--text-secondary)" }}>
              이것은 {sizeOpen === "sm" ? "작은" : sizeOpen === "md" ? "중간" : "큰"} 크기의 모달입니다.
            </p>
          </Modal>
        )}
      </section>

      {/* Form Modal */}
      <section className="mb-12">
        <h2 id="form" className="text-xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>Form Modal</h2>
        <p className="mb-4" style={{ color: "var(--text-secondary)" }}>폼 입력을 받는 모달 예시입니다.</p>
        <div className="p-6" style={{ backgroundColor: "var(--bg-elevated)", borderRadius: "var(--radius-lg)", border: "1px solid var(--divider)" }}>
          <Button onClick={() => setFormOpen(true)}>프로필 수정</Button>
        </div>
        <Modal isOpen={formOpen} onClose={() => setFormOpen(false)} title="프로필 수정">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label className="text-sm font-medium" style={{ color: "var(--text-primary)", display: "block", marginBottom: 6 }}>이름</label>
              <input
                type="text"
                placeholder="이름을 입력하세요"
                style={{
                  width: "100%",
                  height: 44,
                  padding: "0 14px",
                  fontSize: 14,
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--divider)",
                  backgroundColor: "var(--bg-primary)",
                  color: "var(--text-primary)",
                  outline: "none",
                }}
              />
            </div>
            <div>
              <label className="text-sm font-medium" style={{ color: "var(--text-primary)", display: "block", marginBottom: 6 }}>이메일</label>
              <input
                type="email"
                placeholder="example@email.com"
                style={{
                  width: "100%",
                  height: 44,
                  padding: "0 14px",
                  fontSize: 14,
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--divider)",
                  backgroundColor: "var(--bg-primary)",
                  color: "var(--text-primary)",
                  outline: "none",
                }}
              />
            </div>
            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 8 }}>
              <Button variant="secondary" onClick={() => setFormOpen(false)}>취소</Button>
              <Button onClick={() => setFormOpen(false)}>저장</Button>
            </div>
          </div>
        </Modal>
      </section>

      {/* Props */}
      <section className="mb-12">
        <h2 id="props" className="text-xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>Props</h2>
        <div className="overflow-hidden" style={{ backgroundColor: "var(--bg-elevated)", borderRadius: "var(--radius-lg)", border: "1px solid var(--divider)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--divider)" }}>
                <th className="text-left p-4 text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Prop</th>
                <th className="text-left p-4 text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Type</th>
                <th className="text-left p-4 text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Default</th>
                <th className="text-left p-4 text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                { prop: "isOpen", type: "boolean", default: "false", desc: "모달 표시 여부" },
                { prop: "onClose", type: "() => void", default: "-", desc: "닫기 핸들러" },
                { prop: "title", type: "string", default: "-", desc: "모달 제목" },
                { prop: "size", type: '"sm" | "md" | "lg"', default: '"md"', desc: "모달 크기" },
                { prop: "children", type: "ReactNode", default: "-", desc: "모달 컨텐츠" },
              ].map((row, i, arr) => (
                <tr key={row.prop} style={{ borderBottom: i < arr.length - 1 ? "1px solid var(--divider)" : "none" }}>
                  <td className="p-4 text-sm font-mono" style={{ color: "var(--brand-primary)" }}>{row.prop}</td>
                  <td className="p-4 text-sm font-mono" style={{ color: "var(--text-tertiary)" }}>{row.type}</td>
                  <td className="p-4 text-sm font-mono" style={{ color: "var(--text-tertiary)" }}>{row.default}</td>
                  <td className="p-4 text-sm" style={{ color: "var(--text-secondary)" }}>{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
