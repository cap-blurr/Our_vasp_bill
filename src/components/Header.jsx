import { COLORS, FONT } from '../constants';
import { getInitials } from '../utils';

export default function Header({ user, onSetUser }) {
  const firstName = user ? user.name.trim().split(/\s+/)[0] : null;

  return (
    <div style={{
      padding: '14px 16px',
      background: COLORS.bg,
      borderBottom: `1px solid ${COLORS.border}`,
      fontFamily: FONT,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
    }}>
      {/* Left: branding */}
      <div>
        <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.heading, lineHeight: 1.2 }}>
          OUR VASP BILL
        </div>
        <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 2 }}>
          Propose better legislation for Kenya's crypto industry
        </div>
      </div>

      {/* Right: identity chip */}
      {user ? (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: COLORS.accentBg,
          border: `1px solid ${COLORS.accentBorder}`,
          borderRadius: 20,
          padding: '5px 12px 5px 5px',
          flexShrink: 0,
        }}>
          <div style={{
            width: 26,
            height: 26,
            borderRadius: '50%',
            background: COLORS.accent,
            color: '#fff',
            fontSize: 11,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {getInitials(user.name)}
          </div>
          <span style={{ fontSize: 13, color: COLORS.accent, fontWeight: 500 }}>
            {firstName}
          </span>
          <button
            onClick={() => onSetUser(null)}
            style={{
              background: 'none',
              border: 'none',
              color: COLORS.textMuted,
              fontSize: 11,
              cursor: 'pointer',
              padding: 0,
              marginLeft: 2,
            }}
          >
            ✕
          </button>
        </div>
      ) : (
        <div style={{
          fontSize: 12,
          color: COLORS.textMuted,
          flexShrink: 0,
          textAlign: 'right',
        }}>
          Join below to propose
        </div>
      )}
    </div>
  );
}
