import { useState } from 'react';
import { COLORS, FONT } from '../constants';

async function hashPhone(normalized) {
  const encoder = new TextEncoder();
  const data = encoder.encode(normalized);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function normalizePhone(raw) {
  let p = raw.replace(/\s/g, '');
  if (p.startsWith('+254')) p = '0' + p.slice(4);
  else if (p.startsWith('254')) p = '0' + p.slice(3);
  return p;
}

function validatePhone(raw) {
  const normalized = normalizePhone(raw);
  return /^(07|01)\d{8}$/.test(normalized);
}

function getInitials(fullName) {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function IdentityBar({ user, onSetUser }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleJoin = async () => {
    if (!name.trim()) { setError('Please enter your name.'); return; }
    if (!validatePhone(phone)) { setError('Enter a valid Kenyan number (07XX or 01XX, 10 digits).'); return; }
    setError('');
    setLoading(true);
    try {
      const normalized = normalizePhone(phone);
      const phoneHash = await hashPhone(normalized);
      onSetUser({ name: name.trim(), phone: normalized, phoneHash });
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleJoin();
  };

  const handleChange = () => {
    onSetUser(null);
    setName('');
    setPhone('');
    setError('');
  };

  const inputStyle = {
    background: COLORS.bg,
    border: `1px solid ${COLORS.borderLight}`,
    borderRadius: 6,
    color: COLORS.text,
    fontSize: 13,
    padding: '7px 10px',
    outline: 'none',
    width: '100%',
  };

  if (user) {
    const initials = getInitials(user.name);
    const firstName = user.name.trim().split(/\s+/)[0];
    return (
      <div style={{
        background: COLORS.surface,
        borderBottom: `1px solid ${COLORS.border}`,
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        fontFamily: FONT,
      }}>
        <div style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          background: COLORS.accent,
          color: '#fff',
          fontSize: 12,
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          {initials}
        </div>
        <span style={{ fontSize: 13, color: COLORS.textSecondary }}>
          Hi, <span style={{ color: COLORS.text, fontWeight: 500 }}>{firstName}</span>
        </span>
        <button
          onClick={handleChange}
          style={{
            background: 'none',
            border: 'none',
            color: COLORS.textMuted,
            fontSize: 12,
            cursor: 'pointer',
            padding: 0,
            marginLeft: 2,
          }}
        >
          change
        </button>
      </div>
    );
  }

  return (
    <div style={{
      background: COLORS.surface,
      borderBottom: `1px solid ${COLORS.border}`,
      padding: '10px 16px',
      fontFamily: FONT,
    }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 130px', minWidth: 110 }}>
          <input
            style={inputStyle}
            placeholder="Your name"
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="name"
          />
        </div>
        <div style={{ flex: '1 1 140px', minWidth: 120 }}>
          <input
            style={inputStyle}
            placeholder="07XX XXX XXX"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            onKeyDown={handleKeyDown}
            inputMode="tel"
            autoComplete="tel"
          />
        </div>
        <button
          onClick={handleJoin}
          disabled={loading}
          style={{
            background: COLORS.accent,
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '7px 18px',
            fontSize: 13,
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
            flexShrink: 0,
            minHeight: 34,
          }}
        >
          {loading ? '...' : 'Join'}
        </button>
      </div>
      {error && (
        <div style={{ fontSize: 12, color: COLORS.red, marginTop: 6 }}>{error}</div>
      )}
    </div>
  );
}
