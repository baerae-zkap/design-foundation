"use client";

import { useState, useEffect } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  message: string;
  type?: ToastType;
  isVisible: boolean;
  onClose: () => void;
}

function Toast({ message, type = "info", isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const typeStyles: Record<ToastType, { bg: string; border: string; icon: React.ReactNode }> = {
    success: {
      bg: "#ECFDF5",
      border: "#10B981",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    error: {
      bg: "#FEF2F2",
      border: "#EF4444",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M15 9l-6 6M9 9l6 6" strokeLinecap="round" />
        </svg>
      ),
    },
    warning: {
      bg: "#FFFBEB",
      border: "#F59E0B",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2">
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          <path d="M12 9v4M12 17h.01" strokeLinecap="round" />
        </svg>
      ),
    },
    info: {
      bg: "#EFF6FF",
      border: "var(--brand-primary)",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand-primary)" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" strokeLinecap="round" />
        </svg>
      ),
    },
  };

  const style = typeStyles[type];

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "14px 16px",
        backgroundColor: style.bg,
        borderRadius: "var(--radius-lg)",
        borderLeft: `4px solid ${style.border}`,
        boxShadow: "var(--shadow-md)",
        zIndex: 1000,
        animation: "slideIn 0.3s ease",
      }}
    >
      {style.icon}
      <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
        {message}
      </span>
      <button
        onClick={onClose}
        style={{
          marginLeft: 8,
          padding: 4,
          border: "none",
          backgroundColor: "transparent",
          cursor: "pointer",
          color: "var(--text-tertiary)",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

function Button({ variant = "primary", children, onClick }: { variant?: "primary" | "secondary" | "success" | "error" | "warning"; children: React.ReactNode; onClick?: () => void }) {
  const variantStyles: Record<string, React.CSSProperties> = {
    primary: { backgroundColor: "var(--brand-primary)", color: "white" },
    secondary: { backgroundColor: "var(--grey-95)", color: "var(--text-primary)" },
    success: { backgroundColor: "#10B981", color: "white" },
    error: { backgroundColor: "#EF4444", color: "white" },
    warning: { backgroundColor: "#F59E0B", color: "white" },
  };

  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 16px",
        fontSize: 14,
        fontWeight: 500,
        borderRadius: "var(--radius-md)",
        border: "none",
        cursor: "pointer",
        ...variantStyles[variant],
      }}
    >
      {children}
    </button>
  );
}

export default function ToastPage() {
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type });
  };

  return (
    <div style={{ maxWidth: 720 }}>
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>

      <Breadcrumb items={[{ label: "컴포넌트", href: "/" }, { label: "Toast" }]} />

      <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>Toast</h1>
      <p className="mb-8 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        사용자에게 피드백 메시지를 일시적으로 표시하는 알림 컴포넌트입니다.
      </p>

      {/* Types */}
      <section className="mb-12">
        <h2 id="types" className="text-xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>Types</h2>
        <p className="mb-4" style={{ color: "var(--text-secondary)" }}>상황에 맞는 타입을 선택합니다. 버튼을 클릭해보세요.</p>
        <div className="p-6 flex flex-wrap gap-4" style={{ backgroundColor: "var(--bg-elevated)", borderRadius: "var(--radius-lg)", border: "1px solid var(--divider)" }}>
          <Button variant="success" onClick={() => showToast("저장되었습니다.", "success")}>
            Success
          </Button>
          <Button variant="error" onClick={() => showToast("오류가 발생했습니다.", "error")}>
            Error
          </Button>
          <Button variant="warning" onClick={() => showToast("주의가 필요합니다.", "warning")}>
            Warning
          </Button>
          <Button variant="primary" onClick={() => showToast("새로운 알림이 있습니다.", "info")}>
            Info
          </Button>
        </div>
        <pre className="code-block mt-4">
          <code style={{ color: "var(--text-secondary)" }}>{`// Toast 표시
showToast("저장되었습니다.", "success");
showToast("오류가 발생했습니다.", "error");
showToast("주의가 필요합니다.", "warning");
showToast("새로운 알림이 있습니다.", "info");`}</code>
        </pre>
      </section>

      {/* Preview */}
      <section className="mb-12">
        <h2 id="preview" className="text-xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>Preview</h2>
        <p className="mb-4" style={{ color: "var(--text-secondary)" }}>각 타입별 토스트 미리보기입니다.</p>
        <div className="p-6 space-y-4" style={{ backgroundColor: "var(--bg-secondary)", borderRadius: "var(--radius-lg)", border: "1px solid var(--divider)" }}>
          {(["success", "error", "warning", "info"] as ToastType[]).map((type) => {
            const messages = {
              success: "성공적으로 저장되었습니다.",
              error: "요청 처리 중 오류가 발생했습니다.",
              warning: "저장하지 않은 변경사항이 있습니다.",
              info: "새로운 업데이트가 있습니다.",
            };
            const typeStyles: Record<ToastType, { bg: string; border: string; icon: React.ReactNode }> = {
              success: {
                bg: "#ECFDF5",
                border: "#10B981",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
              },
              error: {
                bg: "#FEF2F2",
                border: "#EF4444",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M15 9l-6 6M9 9l6 6" strokeLinecap="round" />
                  </svg>
                ),
              },
              warning: {
                bg: "#FFFBEB",
                border: "#F59E0B",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    <path d="M12 9v4M12 17h.01" strokeLinecap="round" />
                  </svg>
                ),
              },
              info: {
                bg: "#EFF6FF",
                border: "var(--brand-primary)",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand-primary)" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4M12 8h.01" strokeLinecap="round" />
                  </svg>
                ),
              },
            };
            const style = typeStyles[type];

            return (
              <div
                key={type}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "14px 16px",
                  backgroundColor: style.bg,
                  borderRadius: "var(--radius-lg)",
                  borderLeft: `4px solid ${style.border}`,
                }}
              >
                {style.icon}
                <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  {messages[type]}
                </span>
              </div>
            );
          })}
        </div>
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
                { prop: "message", type: "string", default: "-", desc: "표시할 메시지" },
                { prop: "type", type: '"success" | "error" | "warning" | "info"', default: '"info"', desc: "토스트 타입" },
                { prop: "isVisible", type: "boolean", default: "false", desc: "표시 여부" },
                { prop: "onClose", type: "() => void", default: "-", desc: "닫기 핸들러" },
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

      {/* Active Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={!!toast}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
