"use client";

const GITHUB_BASE = 'https://github.com/baerae-zkap/design-foundation/blob/main';

interface TokenFile {
  label: string;
  jsonPath?: string;  // relative path under public/
  tsPath?: string;    // relative path under packages/design-system/src/tokens/
}

interface TokenDownloadProps {
  files: TokenFile[];
}

interface FileRowProps {
  type: 'JSON' | 'TS';
  filename: string;
  href: string;
}

function FileRow({ type, filename, href }: FileRowProps) {
  const badgeStyle: React.CSSProperties =
    type === 'JSON'
      ? {
          backgroundColor: 'var(--surface-warning-default)',
          color: 'var(--content-warning-strong)',
          border: '1px solid var(--border-warning-default)',
        }
      : {
          backgroundColor: 'var(--surface-brand-secondary)',
          color: 'var(--content-brand-default)',
          border: '1px solid var(--border-brand-default)',
        };

  return (
    <a
      href={`${GITHUB_BASE}/${href}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        padding: '5px 8px',
        borderRadius: 'var(--radius-sm)',
        textDecoration: 'none',
        color: 'var(--text-primary)',
        transition: 'background-color 0.15s ease, color 0.15s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--surface-base-alternative)';
        const nameEl = e.currentTarget.querySelector<HTMLSpanElement>('[data-filename]');
        if (nameEl) nameEl.style.color = 'var(--brand-primary)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        const nameEl = e.currentTarget.querySelector<HTMLSpanElement>('[data-filename]');
        if (nameEl) nameEl.style.color = 'var(--text-primary)';
      }}
    >
      {/* Badge */}
      <span
        style={{
          ...badgeStyle,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 40,
          height: 20,
          borderRadius: 4,
          fontSize: 11,
          fontWeight: 600,
          fontFamily: 'var(--font-mono, ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, "DejaVu Sans Mono", monospace)',
          flexShrink: 0,
          letterSpacing: '0.02em',
        }}
      >
        {type}
      </span>

      {/* Filename */}
      <span
        data-filename
        style={{
          fontSize: 13,
          color: 'var(--text-primary)',
          transition: 'color 0.15s ease',
          fontFamily: 'var(--font-mono, ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, "DejaVu Sans Mono", monospace)',
        }}
      >
        {filename}
      </span>

      {/* External link icon */}
      <svg
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ color: 'var(--text-tertiary)', flexShrink: 0, marginLeft: 2 }}
      >
        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    </a>
  );
}

export function TokenDownload({ files }: TokenDownloadProps) {
  const rows: FileRowProps[] = [];

  for (const file of files) {
    if (file.jsonPath) {
      const filename = file.jsonPath.split('/').pop() ?? file.jsonPath;
      rows.push({
        type: 'JSON',
        filename,
        href: `public/${file.jsonPath}`,
      });
    }
    if (file.tsPath) {
      const filename = file.tsPath.split('/').pop() ?? file.tsPath;
      rows.push({
        type: 'TS',
        filename,
        href: `packages/design-system/src/tokens/${file.tsPath}`,
      });
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 32 }}>
      {rows.map((row) => (
        <FileRow key={`${row.type}-${row.filename}`} {...row} />
      ))}
    </div>
  );
}
