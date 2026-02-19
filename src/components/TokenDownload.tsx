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

function LinkButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={`${GITHUB_BASE}/${href}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '6px 12px',
        backgroundColor: 'var(--surface-base-default)',
        borderRadius: 'var(--radius-sm)',
        textDecoration: 'none',
        border: '1px solid var(--divider)',
        fontSize: 13,
        fontWeight: 500,
        color: 'var(--text-primary)',
        transition: 'all 0.15s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--brand-primary)';
        e.currentTarget.style.color = 'var(--brand-primary)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--divider)';
        e.currentTarget.style.color = 'var(--text-primary)';
      }}
    >
      {children}
      {/* External link icon */}
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    </a>
  );
}

export function TokenDownload({ files }: TokenDownloadProps) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 32 }}>
      {files.map((file) => (
        <div
          key={file.label}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 14px',
            backgroundColor: 'var(--surface-base-default)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--divider)',
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginRight: 2 }}>
            {file.label}
          </span>
          {file.jsonPath && (
            <LinkButton href={`public/${file.jsonPath}`}>
              JSON
            </LinkButton>
          )}
          {file.tsPath && (
            <LinkButton href={`packages/design-system/src/tokens/${file.tsPath}`}>
              TS
            </LinkButton>
          )}
        </div>
      ))}
    </div>
  );
}
