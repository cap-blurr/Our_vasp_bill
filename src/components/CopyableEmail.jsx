import { useState } from 'react';

export default function CopyableEmail({ email, label, style = {} }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const ta = document.createElement('textarea');
      ta.value = email;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      title={copied ? 'Copied!' : `Click to copy ${email}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        background: copied ? '#D1FAE5' : '#FEF3C7',
        border: `1px solid ${copied ? '#6EE7B7' : '#FCD34D'}`,
        borderRadius: 8,
        padding: '8px 14px',
        fontSize: 13,
        fontWeight: 700,
        color: copied ? '#065F46' : '#92400E',
        cursor: 'pointer',
        transition: 'all 0.2s',
        fontFamily: 'inherit',
        ...style,
      }}
    >
      <span style={{ fontSize: 14 }}>{copied ? '✓' : '📋'}</span>
      <span>{label ? `${label}: ` : ''}{email}</span>
      <span style={{
        fontSize: 10,
        fontWeight: 500,
        opacity: 0.7,
        marginLeft: 2,
      }}>
        {copied ? 'Copied!' : '(click to copy)'}
      </span>
    </button>
  );
}
