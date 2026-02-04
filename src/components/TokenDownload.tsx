"use client";

const basePath = process.env.NODE_ENV === 'production' ? '/design-foundation' : '';

interface TokenFile {
  name: string;
  path: string;
  size?: string;
}

interface TokenDownloadProps {
  files: TokenFile[];
}

export function TokenDownload({ files }: TokenDownloadProps) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
      {files.map((file) => (
        <a
          key={file.path}
          href={`${basePath}${file.path}`}
          download={file.name}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
            padding: 'var(--space-3) var(--space-6)',
            backgroundColor: '#fff',
            borderRadius: 'var(--radius-md)',
            textDecoration: 'none',
            border: '1px solid var(--brand-primary)',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--blue-99)';
            e.currentTarget.style.borderColor = 'var(--brand-hover)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#fff';
            e.currentTarget.style.borderColor = 'var(--brand-primary)';
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{file.name}</span>
            <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{file.size || 'JSON'}</span>
          </div>
        </a>
      ))}
    </div>
  );
}
