"use client";

import { Breadcrumb } from "@/components/Breadcrumb";
import { TokenDownload } from "@/components/TokenDownload";
import spacingJson from "../../../public/spacing-tokens.json";
import { formatTokenName } from "@/utils/formatTokenName";

const primitive = spacingJson.spacing.primitive;
const semantic = spacingJson.spacing.semantic;

function resolveRef(ref: string | number | { value: string }): number {
  if (typeof ref === "number") return ref;
  if (typeof ref === "object" && "value" in ref) {
    const val = ref.value;
    if (typeof val === "string" && val.startsWith("{primitive.")) {
      const key = val.slice(11, -1);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const p = (primitive as any)[key];
      return typeof p === "number" ? p : 0;
    }
    return parseInt(val) || 0;
  }
  return 0;
}

export default function SpacingPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: "파운데이션", href: "/" }, { label: "Spacing" }]} />

      <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Spacing</h1>
      <p className="mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        ZKAP 스페이싱은 <strong style={{ color: 'var(--text-primary)' }}>4px 단위</strong> 그리드를 따릅니다. 일관된 여백과 간격을 유지해주세요.
      </p>
      <TokenDownload files={[
        { name: 'spacing-tokens.json', path: '/spacing-tokens.json' },
      ]} />

      {/* Visual Scale */}
      <section className="mb-12">
        <h2 id="scale" className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>스케일 시각화</h2>
        <div className="p-6" style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)', backgroundColor: 'var(--bg-elevated)' }}>
          <div className="flex items-end justify-between h-24">
            {[4, 8, 12, 16, 20, 24, 32, 40, 48, 64].map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <div style={{ width: size, height: size, backgroundColor: 'var(--brand-primary)', borderRadius: 'var(--radius-sm)' }} />
                <span className="text-xs font-mono" style={{ color: 'var(--text-tertiary)' }}>{size}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Primitive */}
      <section className="mb-12">
        <h2 id="primitive" className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Primitive</h2>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>기본 간격 값 목록입니다.</p>
        <div className="overflow-hidden" style={{ backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)' }}>
          {Object.entries(primitive).filter(([k, v]) => !k.startsWith("_") && typeof v === "number").map(([key, value], i, arr) => (
            <div key={key} className="flex items-center gap-4 p-4 transition-colors" style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--divider)' : 'none' }}>
              <div className="w-20 flex items-center">
                <div style={{ width: Math.max(value as number, 2), height: 8, backgroundColor: 'var(--brand-primary)', borderRadius: 2 }} />
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{formatTokenName('spacing', key)}</span>
              </div>
              <span className="text-sm font-mono" style={{ color: 'var(--text-tertiary)' }}>{value as number}px</span>
            </div>
          ))}
        </div>
      </section>

      {/* Inset */}
      <section className="mb-12">
        <h2 id="inset" className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Inset</h2>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>컴포넌트 내부 여백(padding)에 적용합니다.</p>
        <div className="overflow-hidden" style={{ backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)' }}>
          {Object.entries(semantic.inset).filter(([k]) => !k.startsWith("_")).map(([key, token], i, arr) => {
            const value = resolveRef(token);
            const comment = (token as { _comment?: string })._comment || '';
            return (
              <div key={key} className="flex items-center gap-4 p-4 transition-colors" style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--divider)' : 'none' }}>
                <div className="w-16 h-10 rounded relative flex items-center justify-center" style={{ border: '2px solid var(--brand-primary)' }}>
                  <div className="absolute inset-0 rounded" style={{ margin: value / 4, backgroundColor: 'var(--blue-100)' }} />
                </div>
                <div className="flex-1">
                  <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{formatTokenName('inset', key)}</span>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{comment}</p>
                </div>
                <span className="text-sm font-mono" style={{ color: 'var(--text-tertiary)' }}>{value}px</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Vertical */}
      <section className="mb-12">
        <h2 id="vertical" className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Vertical</h2>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>세로 방향 요소 사이 간격입니다.</p>
        <div className="overflow-hidden" style={{ backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)' }}>
          {Object.entries(semantic.vertical).filter(([k]) => !k.startsWith("_")).map(([key, token], i, arr) => {
            const value = resolveRef(token);
            const comment = (token as { _comment?: string })._comment || '';
            return (
              <div key={key} className="flex items-center gap-4 p-4 transition-colors" style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--divider)' : 'none' }}>
                <div className="w-16 flex flex-col items-center">
                  <div className="w-10 h-2 rounded" style={{ backgroundColor: 'var(--grey-300)' }} />
                  <div style={{ width: 2, height: Math.max(value, 2), backgroundColor: 'var(--brand-primary)' }} />
                  <div className="w-10 h-2 rounded" style={{ backgroundColor: 'var(--grey-300)' }} />
                </div>
                <div className="flex-1">
                  <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{formatTokenName('vertical', key)}</span>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{comment}</p>
                </div>
                <span className="text-sm font-mono" style={{ color: 'var(--text-tertiary)' }}>{value}px</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Horizontal */}
      <section className="mb-12">
        <h2 id="horizontal" className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Horizontal</h2>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>가로 방향 요소 사이 간격입니다.</p>
        <div className="overflow-hidden" style={{ backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)' }}>
          {Object.entries(semantic.horizontal).filter(([k]) => !k.startsWith("_")).map(([key, token], i, arr) => {
            const value = resolveRef(token);
            const comment = (token as { _comment?: string })._comment || '';
            return (
              <div key={key} className="flex items-center gap-4 p-4 transition-colors" style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--divider)' : 'none' }}>
                <div className="w-16 flex items-center justify-center">
                  <div className="w-3 h-6 rounded" style={{ backgroundColor: 'var(--grey-300)' }} />
                  <div style={{ width: Math.max(value, 2), height: 2, backgroundColor: 'var(--brand-primary)' }} />
                  <div className="w-3 h-6 rounded" style={{ backgroundColor: 'var(--grey-300)' }} />
                </div>
                <div className="flex-1">
                  <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{formatTokenName('horizontal', key)}</span>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{comment}</p>
                </div>
                <span className="text-sm font-mono" style={{ color: 'var(--text-tertiary)' }}>{value}px</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Screen */}
      <section className="mb-12">
        <h2 id="screen" className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Screen</h2>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>화면 가장자리 여백입니다.</p>
        <div className="overflow-hidden" style={{ backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)' }}>
          {Object.entries(semantic.screen).filter(([k]) => !k.startsWith("_")).map(([key, token], i, arr) => {
            const value = resolveRef(token);
            const comment = (token as { _comment?: string })._comment || '';
            return (
              <div key={key} className="flex items-center gap-4 p-4 transition-colors" style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--divider)' : 'none' }}>
                <div className="w-16 h-10 rounded relative" style={{ border: '1px solid var(--grey-300)' }}>
                  {key.includes("X") && (
                    <>
                      <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: 'var(--brand-primary)' }} />
                      <div className="absolute right-0 top-0 bottom-0 w-1" style={{ backgroundColor: 'var(--brand-primary)' }} />
                    </>
                  )}
                  {key.includes("Top") && <div className="absolute left-0 right-0 top-0 h-1" style={{ backgroundColor: 'var(--brand-primary)' }} />}
                  {key.includes("Bottom") && <div className="absolute left-0 right-0 bottom-0 h-1" style={{ backgroundColor: 'var(--brand-primary)' }} />}
                </div>
                <div className="flex-1">
                  <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{formatTokenName('screen', key)}</span>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{comment}</p>
                </div>
                <span className="text-sm font-mono" style={{ color: 'var(--text-tertiary)' }}>{value}px</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Component Spacing */}
      <section className="mb-12">
        <h2 id="component" className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Component</h2>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>특정 컴포넌트용 시멘틱 스페이싱 토큰입니다.</p>

        {/* Button */}
        <ComponentSubSection
          id="button"
          title="Button"
          description="버튼 컴포넌트 패딩 및 내부 간격"
          data={semantic.component.button}
          resolveRef={resolveRef}
        />

        {/* Card */}
        <ComponentSubSection
          id="card"
          title="Card"
          description="카드 컴포넌트 패딩 및 내부 간격"
          data={semantic.component.card}
          resolveRef={resolveRef}
        />

        {/* Input */}
        <ComponentSubSection
          id="input"
          title="Input"
          description="입력 필드 패딩 및 라벨/도움말 간격"
          data={semantic.component.input}
          resolveRef={resolveRef}
        />

        {/* List */}
        <ComponentSubSection
          id="list"
          title="List"
          description="리스트 아이템 패딩 및 섹션 간격"
          data={semantic.component.list}
          resolveRef={resolveRef}
        />

        {/* Modal */}
        <ComponentSubSection
          id="modal"
          title="Modal"
          description="모달 내부 패딩 및 영역 간격"
          data={semantic.component.modal}
          resolveRef={resolveRef}
        />

        {/* BottomSheet */}
        <ComponentSubSection
          id="bottomSheet"
          title="Bottom Sheet"
          description="바텀시트 패딩 및 핸들 간격"
          data={semantic.component.bottomSheet}
          resolveRef={resolveRef}
        />

        {/* Header */}
        <ComponentSubSection
          id="header"
          title="Header"
          description="헤더 높이 및 패딩"
          data={semantic.component.header}
          resolveRef={resolveRef}
        />

        {/* TabBar */}
        <ComponentSubSection
          id="tabBar"
          title="Tab Bar"
          description="탭바 높이 및 아이템 간격"
          data={semantic.component.tabBar}
          resolveRef={resolveRef}
        />

        {/* Divider */}
        <ComponentSubSection
          id="divider"
          title="Divider"
          description="구분선 상하 여백"
          data={semantic.component.divider}
          resolveRef={resolveRef}
        />
      </section>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ComponentSubSection({ id, title, description, data, resolveRef }: {
  id: string;
  title: string;
  description: string;
  data: any;
  resolveRef: (ref: any) => number;
}) {
  // Flatten nested structure (e.g., paddingX.lg, paddingX.md)
  const flattenedItems: Array<{ key: string; value: number; comment: string }> = [];

  for (const [key, val] of Object.entries(data)) {
    if (key.startsWith("_")) continue;

    if (typeof val === "object" && val !== null && "value" in (val as object)) {
      // Direct value object like { value: "{primitive.4}", _comment: "..." }
      const token = val as { value: string; _comment?: string };
      flattenedItems.push({
        key,
        value: resolveRef(token),
        comment: token._comment || "",
      });
    } else if (typeof val === "object" && val !== null) {
      // Nested object like paddingX: { lg: {...}, md: {...} }
      for (const [subKey, subVal] of Object.entries(val as Record<string, unknown>)) {
        if (subKey.startsWith("_")) continue;
        const token = subVal as { value: string; _comment?: string };
        flattenedItems.push({
          key: `${key}.${subKey}`,
          value: resolveRef(token),
          comment: token._comment || "",
        });
      }
    }
  }

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{title}</h3>
      <p className="text-xs mb-3" style={{ color: 'var(--text-tertiary)' }}>{description}</p>
      <div className="overflow-hidden" style={{ backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--divider)' }}>
        {flattenedItems.map((item, i) => (
          <div key={item.key} className="flex items-center gap-4 p-4 transition-colors" style={{ borderBottom: i < flattenedItems.length - 1 ? '1px solid var(--divider)' : 'none' }}>
            <div className="w-16 flex items-center">
              <div style={{ width: Math.max(item.value, 2), height: 8, backgroundColor: 'var(--brand-primary)', borderRadius: 2 }} />
            </div>
            <div className="flex-1">
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{formatTokenName(id, item.key)}</span>
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{item.comment}</p>
            </div>
            <span className="text-sm font-mono" style={{ color: 'var(--text-tertiary)' }}>{item.value}px</span>
          </div>
        ))}
      </div>
    </div>
  );
}
