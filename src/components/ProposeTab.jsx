import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { REGULATIONS, PARTS } from '../regulations';
import { COLORS, FONT, SEVERITY } from '../constants';
import {
  hashPhone, normalizePhone, validatePhone,
  getDisplayName, getInitials,
} from '../utils';

// ─── Severity filter config ────────────────────────────────────────────────
const SEVERITY_FILTERS = [
  {
    id: 'red',
    label: 'Needs Redesign',
    match: r => r.severity === 'red',
    dot: SEVERITY.red.color,
    activeBg: SEVERITY.red.bg,
    activeBorder: SEVERITY.red.border,
    activeColor: SEVERITY.red.color,
  },
  {
    id: 'yellow',
    label: 'Needs Adjustment',
    match: r => r.severity === 'yellow',
    dot: SEVERITY.yellow.color,
    activeBg: SEVERITY.yellow.bg,
    activeBorder: SEVERITY.yellow.border,
    activeColor: SEVERITY.yellow.color,
  },
  {
    id: 'green',
    label: 'Can Enhance',
    match: r => r.severity === 'green',
    dot: SEVERITY.green.color,
    activeBg: SEVERITY.green.bg,
    activeBorder: SEVERITY.green.border,
    activeColor: SEVERITY.green.color,
  },
  {
    id: 'all',
    label: 'All',
    match: () => true,
    dot: COLORS.textMuted,
    activeBg: COLORS.accentBg,
    activeBorder: COLORS.accentBorder,
    activeColor: COLORS.accent,
  },
];

// ─── Group regulations by part, in PARTS order ────────────────────────────
function buildGroups(filteredRegs) {
  const groups = [];
  for (const part of PARTS) {
    if (part.id === 'all' || part.id === 'other') continue;
    const regs = filteredRegs.filter(r => r.part === part.id);
    if (regs.length > 0) groups.push({ part, regs });
  }
  const otherRegs = filteredRegs.filter(r => r.part === 'other');
  if (otherRegs.length > 0) {
    groups.push({ part: { id: 'other', label: 'Other / General' }, regs: otherRegs });
  }
  return groups;
}

// ─── Regulation card ──────────────────────────────────────────────────────
function RegCard({ reg, isSelected, onSelect }) {
  const sev = SEVERITY[reg.severity] || SEVERITY.yellow;
  return (
    <div
      onClick={() => onSelect(reg)}
      style={{
        background: isSelected ? sev.bg : COLORS.bg,
        border: `1px solid ${isSelected ? sev.color : COLORS.border}`,
        borderLeft: `3px solid ${sev.color}`,
        borderRadius: 8,
        padding: '10px 12px',
        cursor: 'pointer',
        transition: 'border-color 0.15s, background 0.15s',
      }}
    >
      {/* Title row + severity badge */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 6, marginBottom: 4 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.heading, lineHeight: 1.3, flex: 1, minWidth: 0 }}>
          {reg.title}
        </div>
        {isSelected ? (
          <div style={{
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: COLORS.accent,
            color: '#fff',
            fontSize: 10,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>✓</div>
        ) : (
          <div style={{
            fontSize: 9,
            fontWeight: 700,
            color: sev.color,
            background: sev.bg,
            border: `1px solid ${sev.border}`,
            borderRadius: 4,
            padding: '2px 6px',
            flexShrink: 0,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            whiteSpace: 'nowrap',
          }}>
            {sev.label}
          </div>
        )}
      </div>
      {/* Ref */}
      <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 5 }}>{reg.ref}</div>
      {/* Summary snippet */}
      <div style={{ fontSize: 12, color: COLORS.textSecondary, lineHeight: 1.5 }}>
        {reg.summary.length > 90 ? reg.summary.slice(0, 90) + '…' : reg.summary}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────
export default function ProposeTab({ user, onSetUser, onSwitchToCommunity }) {
  const [severityFilter, setSeverityFilter] = useState('red');
  const [selectedRegulation, setSelectedRegulation] = useState(null);

  // Form fields
  const [suggestion,   setSuggestion]   = useState('');
  const [evidence,     setEvidence]     = useState('');
  const [evidenceLink, setEvidenceLink] = useState('');
  const [outcome,      setOutcome]      = useState('');
  const [submitting,   setSubmitting]   = useState(false);
  const [submitted,    setSubmitted]    = useState(false);
  const [submitError,  setSubmitError]  = useState('');

  // Inline identity state (used when user is null at submission)
  const [joinName,  setJoinName]  = useState('');
  const [joinPhone, setJoinPhone] = useState('');
  const [joinError, setJoinError] = useState('');
  const [joining,   setJoining]   = useState(false);


  // ── Filtered + grouped regulations ────────────────────────────────────
  const activeSF = SEVERITY_FILTERS.find(f => f.id === severityFilter);
  const filteredRegs = REGULATIONS.filter(activeSF.match);
  const groups = buildGroups(filteredRegs);

  // ── Handlers ──────────────────────────────────────────────────────────
  const handleSelectRegulation = (reg) => {
    setSelectedRegulation(reg);
    setSubmitted(false);
    setSubmitError('');
  };

  const handleJoin = async () => {
    if (!joinName.trim()) { setJoinError('Please enter your name.'); return; }
    if (!validatePhone(joinPhone)) { setJoinError('Enter a valid Kenyan number (07XX or 01XX).'); return; }
    setJoinError('');
    setJoining(true);
    try {
      const normalized = normalizePhone(joinPhone);
      const phoneHash  = await hashPhone(normalized);
      onSetUser({ name: joinName.trim(), phone: normalized, phoneHash });
    } catch {
      setJoinError('Something went wrong. Please try again.');
    } finally {
      setJoining(false);
    }
  };

  const handleSubmit = async () => {
    if (!user) { setSubmitError('Please join above to submit your proposal.'); return; }
    if (!suggestion.trim()) { setSubmitError('Your proposed alternative is required.'); return; }
    if (!outcome.trim())    { setSubmitError('Intended outcome is required.'); return; }

    setSubmitting(true);
    setSubmitError('');
    try {
      await addDoc(collection(db, 'proposals'), {
        regulationId:    selectedRegulation.id,
        regulationTitle: selectedRegulation.title,
        regulationRef:   selectedRegulation.ref,
        suggestion:      suggestion.trim(),
        evidence:        evidence.trim(),
        evidenceLink:    evidenceLink.trim(),
        outcome:         outcome.trim(),
        authorName:      getDisplayName(user.name),
        authorInitials:  getInitials(user.name),
        authorPhoneHash: user.phoneHash,
        upvotes:         0,
        voters:          {},
        createdAt:       serverTimestamp(),
      });
      setSuggestion('');
      setEvidence('');
      setEvidenceLink('');
      setOutcome('');
      setSubmitted(true);
    } catch {
      setSubmitError('Failed to submit. Check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // ── Style helpers ─────────────────────────────────────────────────────
  const inputStyle = {
    width: '100%',
    background: COLORS.bg,
    border: `1px solid ${COLORS.borderLight}`,
    borderRadius: 7,
    color: COLORS.text,
    padding: '10px 12px',
    fontSize: 14,
    outline: 'none',
    resize: 'vertical',
    lineHeight: 1.5,
  };

  const labelStyle  = { display: 'block', fontSize: 13, fontWeight: 600, color: COLORS.heading, marginBottom: 3 };
  const helperStyle = { display: 'block', fontSize: 12, color: COLORS.textMuted, marginBottom: 8, lineHeight: 1.4 };

  const canSubmit = !!(user && suggestion.trim() && outcome.trim() && !submitting);

  // ── Render ────────────────────────────────────────────────────────────
  return (
    <div style={{ fontFamily: FONT }}>

      {/* ── Section 1: Regulation Selector ──────────────────────────── */}
      <div>
        <div style={{
          fontSize: 15,
          fontWeight: 600,
          color: COLORS.heading,
          marginBottom: 4,
        }}>
          Which regulation do you want to improve?
        </div>
        <div style={{ fontSize: 13, color: COLORS.textSecondary, marginBottom: 16 }}>
          Select a regulation below, then write your proposed alternative.
        </div>

        {/* Severity filter buttons */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {SEVERITY_FILTERS.map(f => {
            const count = REGULATIONS.filter(f.match).length;
            const active = severityFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setSeverityFilter(f.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '7px 14px',
                  borderRadius: 20,
                  border: `1px solid ${active ? f.activeBorder : COLORS.border}`,
                  background: active ? f.activeBg : COLORS.bg,
                  cursor: 'pointer',
                  fontFamily: FONT,
                }}
              >
                <span style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: active ? f.activeColor : COLORS.textMuted,
                  flexShrink: 0,
                }} />
                <span style={{
                  fontSize: 13,
                  fontWeight: active ? 600 : 400,
                  color: active ? f.activeColor : COLORS.textSecondary,
                }}>
                  {f.label}
                </span>
                <span style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: active ? f.activeColor : COLORS.textMuted,
                  background: active ? 'rgba(0,0,0,0.06)' : COLORS.surface,
                  padding: '1px 7px',
                  borderRadius: 10,
                  minWidth: 24,
                  textAlign: 'center',
                }}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grouped regulation cards */}
        <div
          className="reg-scroll"
          style={{
            maxHeight: selectedRegulation ? 280 : 'none',
            overflowY: selectedRegulation ? 'auto' : 'visible',
          }}
        >
          {groups.length === 0 ? (
            <div style={{ fontSize: 13, color: COLORS.textMuted, textAlign: 'center', padding: '32px 0' }}>
              No regulations in this category.
            </div>
          ) : (
            groups.map(({ part, regs }) => (
              <div key={part.id} style={{ marginBottom: 20 }}>
                {/* Part section header */}
                <div style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: COLORS.textMuted,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  paddingBottom: 8,
                  marginBottom: 8,
                  borderBottom: `1px solid ${COLORS.border}`,
                }}>
                  {part.label}
                  <span style={{
                    marginLeft: 8,
                    fontWeight: 600,
                    color: COLORS.textDim,
                    fontSize: 11,
                  }}>
                    {regs.length}
                  </span>
                </div>

                {/* Card grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: 8,
                }}>
                  {regs.map(reg => (
                    <RegCard
                      key={reg.id}
                      reg={reg}
                      isSelected={selectedRegulation?.id === reg.id}
                      onSelect={handleSelectRegulation}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ── Section 2: Proposal Form ─────────────────────────────────── */}
      {selectedRegulation && (
        <div

          style={{
            background: COLORS.bg,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 12,
            padding: 20,
            marginTop: 8,
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}
        >
          {/* Selected regulation header */}
          <div style={{
            paddingBottom: 16,
            marginBottom: 20,
            borderBottom: `1px solid ${COLORS.border}`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 11, color: COLORS.textMuted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>
                  Proposing alternative for
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.heading, lineHeight: 1.3 }}>
                  {selectedRegulation.title}
                </div>
                <div style={{ fontSize: 12, color: COLORS.textSecondary, marginTop: 3 }}>
                  {selectedRegulation.ref}
                </div>
              </div>
              <button
                onClick={() => { setSelectedRegulation(null); setSubmitted(false); setSubmitError(''); }}
                style={{
                  background: COLORS.surface,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 6,
                  color: COLORS.textSecondary,
                  fontSize: 12,
                  padding: '5px 12px',
                  cursor: 'pointer',
                  flexShrink: 0,
                  fontFamily: FONT,
                }}
              >
                ← Change
              </button>
            </div>

            {/* Full regulation summary */}
            <div style={{
              background: COLORS.surface,
              borderLeft: `3px solid ${(SEVERITY[selectedRegulation.severity] || SEVERITY.yellow).color}`,
              borderRadius: '0 7px 7px 0',
              padding: '12px 14px',
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 7 }}>
                Current regulation — what it says now
              </div>
              <div style={{ fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.75 }}>
                {selectedRegulation.summary}
              </div>
              {selectedRegulation.notes && (
                <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 8, fontStyle: 'italic', lineHeight: 1.5 }}>
                  Note: {selectedRegulation.notes}
                </div>
              )}
            </div>
          </div>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '16px 0 8px' }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>✅</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.green, marginBottom: 6 }}>
                Your proposal is live!
              </div>
              <div style={{ fontSize: 13, color: COLORS.textSecondary, marginBottom: 24, lineHeight: 1.5 }}>
                Switch to Community Proposals to see it and vote on others.
              </div>
              <button
                onClick={onSwitchToCommunity}
                style={{
                  background: COLORS.accent,
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '11px 28px',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: FONT,
                }}
              >
                View Community Proposals
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

              {/* Field 1 — Proposed alternative (required) */}
              <div>
                <label style={labelStyle}>
                  Your proposed alternative <span style={{ color: COLORS.red }}>*</span>
                </label>
                <span style={helperStyle}>
                  What should this regulation say instead? Write naturally and specifically.
                </span>
                <textarea
                  rows={4}
                  style={inputStyle}
                  value={suggestion}
                  onChange={e => setSuggestion(e.target.value)}
                  placeholder="Replace the current provision with..."
                />
              </div>

              {/* Field 2 — Evidence (optional) */}
              <div>
                <label style={labelStyle}>
                  Evidence{' '}
                  <span style={{ color: COLORS.textMuted, fontWeight: 400 }}>(optional)</span>
                </label>
                <span style={helperStyle}>
                  Why would this work? Reference other countries, economic data, or practical reasoning.
                </span>
                <textarea
                  rows={3}
                  style={inputStyle}
                  value={evidence}
                  onChange={e => setEvidence(e.target.value)}
                  placeholder="Singapore's Payment Services Act uses tiered licensing..."
                />
              </div>

              {/* Field 3 — Evidence link (optional) */}
              <div>
                <label style={labelStyle}>
                  Link to evidence{' '}
                  <span style={{ color: COLORS.textMuted, fontWeight: 400 }}>(optional)</span>
                </label>
                <span style={helperStyle}>
                  URL to a report, article, or comparable regulation from another jurisdiction
                </span>
                <input
                  type="url"
                  style={{ ...inputStyle, resize: undefined }}
                  value={evidenceLink}
                  onChange={e => setEvidenceLink(e.target.value)}
                  placeholder="https://..."
                />
              </div>

              {/* Field 4 — Intended outcome (required) */}
              <div>
                <label style={labelStyle}>
                  Intended outcome <span style={{ color: COLORS.red }}>*</span>
                </label>
                <span style={helperStyle}>
                  What will this achieve? Be concrete — e.g. "Reduces startup costs by 90%" or "Enables 500+ new VASP applications"
                </span>
                <textarea
                  rows={2}
                  style={inputStyle}
                  value={outcome}
                  onChange={e => setOutcome(e.target.value)}
                  placeholder="Enables 90%+ of Kenyan operators to afford licensing within 6 months"
                />
              </div>

              {/* ── Identity section (at the end, not the top) ── */}
              <div style={{
                background: COLORS.surface,
                border: `1px solid ${COLORS.border}`,
                borderLeft: `3px solid ${COLORS.accent}`,
                borderRadius: 8,
                padding: '14px 16px',
              }}>
                {user ? (
                  // User is identified
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: COLORS.accent,
                      color: '#fff',
                      fontSize: 12,
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      {getInitials(user.name)}
                    </div>
                    <div style={{ fontSize: 13, color: COLORS.textSecondary }}>
                      Submitting as{' '}
                      <span style={{ fontWeight: 600, color: COLORS.heading }}>
                        {user.name.trim().split(/\s+/)[0]}
                      </span>
                    </div>
                    <button
                      onClick={() => onSetUser(null)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: COLORS.textMuted,
                        fontSize: 12,
                        cursor: 'pointer',
                        padding: 0,
                        marginLeft: 'auto',
                      }}
                    >
                      change
                    </button>
                  </div>
                ) : (
                  // User not identified — show join form
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.heading, marginBottom: 10 }}>
                      Who are you? Join to submit your proposal
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <input
                        style={{
                          flex: '1 1 130px',
                          minWidth: 110,
                          background: COLORS.bg,
                          border: `1px solid ${COLORS.borderLight}`,
                          borderRadius: 6,
                          color: COLORS.text,
                          fontSize: 13,
                          padding: '8px 10px',
                          outline: 'none',
                        }}
                        placeholder="Your name"
                        value={joinName}
                        onChange={e => setJoinName(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleJoin()}
                        autoComplete="name"
                      />
                      <input
                        style={{
                          flex: '1 1 140px',
                          minWidth: 120,
                          background: COLORS.bg,
                          border: `1px solid ${COLORS.borderLight}`,
                          borderRadius: 6,
                          color: COLORS.text,
                          fontSize: 13,
                          padding: '8px 10px',
                          outline: 'none',
                        }}
                        placeholder="07XX XXX XXX"
                        value={joinPhone}
                        onChange={e => setJoinPhone(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleJoin()}
                        inputMode="tel"
                        autoComplete="tel"
                      />
                      <button
                        onClick={handleJoin}
                        disabled={joining}
                        style={{
                          background: COLORS.accent,
                          color: '#fff',
                          border: 'none',
                          borderRadius: 6,
                          padding: '8px 18px',
                          fontSize: 13,
                          fontWeight: 600,
                          cursor: joining ? 'not-allowed' : 'pointer',
                          opacity: joining ? 0.6 : 1,
                          flexShrink: 0,
                          fontFamily: FONT,
                        }}
                      >
                        {joining ? '…' : 'Join'}
                      </button>
                    </div>
                    {joinError && (
                      <div style={{ fontSize: 12, color: COLORS.red, marginTop: 6 }}>{joinError}</div>
                    )}
                  </div>
                )}
              </div>

              {/* Submit error */}
              {submitError && (
                <div style={{
                  fontSize: 13,
                  color: COLORS.red,
                  background: COLORS.redBg,
                  border: `1px solid #FECACA`,
                  borderRadius: 6,
                  padding: '10px 12px',
                }}>
                  {submitError}
                </div>
              )}

              {/* Submit button */}
              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                style={{
                  background: canSubmit ? COLORS.accent : COLORS.border,
                  color: canSubmit ? '#fff' : COLORS.textMuted,
                  fontWeight: 600,
                  fontSize: 14,
                  padding: '13px',
                  borderRadius: 8,
                  border: 'none',
                  width: '100%',
                  cursor: canSubmit ? 'pointer' : 'not-allowed',
                  fontFamily: FONT,
                }}
              >
                {submitting ? 'Submitting…' : 'Submit for Community Vote'}
              </button>

            </div>
          )}
        </div>
      )}
    </div>
  );
}
