"use client";

interface TokenFile {
  name: string;
  path: string;
}

interface TokenDownloadProps {
  files: TokenFile[];
}

export function TokenDownload({ files }: TokenDownloadProps) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
      {files.map((file) => (
        <a
          key={file.path}
          href={file.path}
          download={file.name}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 14px',
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text-secondary)',
            borderRadius: 'var(--radius-md)',
            fontSize: '13px',
            fontWeight: 500,
            textDecoration: 'none',
            border: '1px solid var(--divider)',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--grey-95)';
            e.currentTarget.style.borderColor = 'var(--divider-strong)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
            e.currentTarget.style.borderColor = 'var(--divider)';
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          {file.name}
        </a>
      ))}
    </div>
  );
}
