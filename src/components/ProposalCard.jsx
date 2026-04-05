import { useState, useEffect } from 'react';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase';
import { COLORS, FONT } from '../constants';
import { hashPhone, normalizePhone, validatePhone } from '../utils';

function timeAgo(timestamp) {
  if (!timestamp || typeof timestamp.toDate !== 'function') return '';
  try {
    const seconds = Math.floor((Date.now() - timestamp.toDate().getTime()) / 1000);
    if (seconds < 60)    return 'just now';
    if (seconds < 3600)  return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  } catch {
    return '';
  }
}

export default function ProposalCard({ proposal, user, onSetUser }) {
  // Voting state
  const [voting,        setVoting]        = useState(false);
  const [justVoted,     setJustVoted]     = useState(false);

  // Share state (fallback menu for non-native-share browsers)
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Inline join form state (shown when unauthenticated user clicks vote)
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [joinName,     setJoinName]     = useState('');
  const [joinPhone,    setJoinPhone]    = useState('');
  const [joinError,    setJoinError]    = useState('');
  const [joining,      setJoining]      = useState(false);

  // Once the real proposal data reflects this user's vote, drop the optimistic flag
  useEffect(() => {
    if (user && proposal.voters?.[user.phoneHash]) {
      setJustVoted(false);
    }
  }, [proposal.voters, user]);

  // Clear join form when user logs in from elsewhere (e.g. ProposeTab)
  useEffect(() => {
    if (user) setShowJoinForm(false);
  }, [user]);

  const hasVoted     = justVoted || !!(user && proposal.voters?.[user.phoneHash]);
  const upvoteCount  = proposal.upvotes || 0;
  const supportLabel = `${upvoteCount} supporter${upvoteCount !== 1 ? 's' : ''}`;

  // ── Vote handler (user already identified) ─────────────────────────────
  const handleUpvote = async () => {
    if (!user) {
      setShowJoinForm(prev => !prev); // toggle
      return;
    }
    if (hasVoted || voting) return;
    if (proposal.isSample)  return; // sample proposals are read-only

    setVoting(true);
    setJustVoted(true); // optimistic
    try {
      await updateDoc(doc(db, 'proposals', proposal.id), {
        upvotes: increment(1),
        [`voters.${user.phoneHash}`]: true,
      });
    } catch (err) {
      console.error('Vote failed:', err);
      setJustVoted(false); // revert on error
    } finally {
      setVoting(false);
    }
  };

  // ── Join + vote (from inline form) ────────────────────────────────────
  const handleJoinAndVote = async () => {
    if (!joinName.trim()) { setJoinError('Enter your name.'); return; }
    if (!validatePhone(joinPhone)) { setJoinError('Enter a valid Kenyan number (07XX or 01XX).'); return; }
    setJoinError('');
    setJoining(true);
    try {
      const normalized = normalizePhone(joinPhone);
      const phoneHash  = await hashPhone(normalized);
      const newUser    = { name: joinName.trim(), phone: normalized, phoneHash };
      onSetUser(newUser);
      if (!proposal.isSample) {
        setJustVoted(true); // optimistic
        await updateDoc(doc(db, 'proposals', proposal.id), {
          upvotes: increment(1),
          [`voters.${phoneHash}`]: true,
        });
      }
      setShowJoinForm(false);
    } catch {
      setJoinError('Something went wrong. Please try again.');
      setJustVoted(false);
    } finally {
      setJoining(false);
    }
  };

  // ── Share handler ─────────────────────────────────────────────────────
  const isOwnProposal = !!(user && user.phoneHash === proposal.authorPhoneHash);
  const snippet       = proposal.suggestion.length > 160
    ? proposal.suggestion.slice(0, 160) + '…'
    : proposal.suggestion;

  const shareIntro = isOwnProposal
    ? `I proposed a change to Kenya's Draft VASP Regulations — support it on OUR VASP BILL! 🇰🇪`
    : `Support ${proposal.authorName}'s proposal to improve Kenya's Draft VASP Regulations on OUR VASP BILL! 🇰🇪`;

  const shareText = `${shareIntro}\n\nRegulation: ${proposal.regulationTitle}\n\n"${snippet}"\n\nAdd your voice 👇`;
  const shareUrl  = window.location.href;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'OUR VASP BILL', text: shareText, url: shareUrl });
      } catch (e) {
        if (e.name !== 'AbortError') console.error('Share failed:', e);
      }
      return;
    }
    setShowShareMenu(prev => !prev);
  };

  const xTweetText = isOwnProposal
    ? `I just proposed a change to Kenya's Draft VASP Regulations — "${proposal.regulationTitle}". Support it on OUR VASP BILL:`
    : `Support ${proposal.authorName}'s proposal to fix Kenya's Draft VASP Regulations — "${proposal.regulationTitle}":`;

  const waHref = `https://wa.me/?text=${encodeURIComponent(shareText + '\n' + shareUrl)}`;
  const xHref  = `https://twitter.com/intent/tweet?text=${encodeURIComponent(xTweetText)}&url=${encodeURIComponent(shareUrl)}`;

  // ── Styles ────────────────────────────────────────────────────────────
  const sectionLabel = (color, emoji, text) => (
    <div style={{ fontSize: 11, fontWeight: 700, color, marginBottom: 5, display: 'flex', alignItems: 'center', gap: 4 }}>
      <span>{emoji}</span>
      <span style={{ textTransform: 'uppercase', letterSpacing: '0.04em' }}>{text}</span>
    </div>
  );

  const miniInputStyle = {
    flex: '1 1 130px',
    minWidth: 110,
    background: COLORS.bg,
    border: `1px solid ${COLORS.borderLight}`,
    borderRadius: 6,
    color: COLORS.text,
    fontSize: 13,
    padding: '7px 10px',
    outline: 'none',
    fontFamily: FONT,
  };

  return (
    <div style={{
      background: COLORS.bg,
      border: `1px solid ${COLORS.border}`,
      borderRadius: 12,
      padding: 18,
      marginBottom: 12,
      fontFamily: FONT,
      boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
    }}>

      {/* ── Top row: avatar + author + time | regulation badge ── */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 8,
        marginBottom: 12,
      }}>
        {/* Left: avatar + name + time */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <div style={{
            width: 32,
            height: 32,
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
            {proposal.authorInitials || '?'}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.heading }}>
              {proposal.authorName}
            </div>
            <div style={{ fontSize: 11, color: COLORS.textMuted }}>
              {timeAgo(proposal.createdAt)}
            </div>
          </div>
        </div>

        {/* Right: regulation badge */}
        <div style={{
          background: COLORS.accentBg,
          color: COLORS.accent,
          fontSize: 11,
          fontWeight: 500,
          padding: '3px 10px',
          borderRadius: 20,
          whiteSpace: 'nowrap',
          flexShrink: 0,
          maxWidth: 180,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          border: `1px solid ${COLORS.accentBorder}`,
        }}>
          {proposal.regulationTitle}
        </div>
      </div>

      {/* ── Suggestion ── */}
      <div style={{
        fontSize: 14,
        color: COLORS.text,
        lineHeight: 1.7,
        whiteSpace: 'pre-wrap',
      }}>
        {proposal.suggestion}
      </div>

      {/* ── Evidence ── */}
      {proposal.evidence && (
        <div style={{
          marginTop: 14,
          background: COLORS.surface,
          borderRadius: 8,
          padding: '12px 14px',
        }}>
          {sectionLabel(COLORS.textSecondary, '📎', 'Evidence')}
          <div style={{ fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.6 }}>
            {proposal.evidence}
          </div>
          {proposal.evidenceLink && (
            <a
              href={proposal.evidenceLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                color: COLORS.accent,
                fontSize: 12,
                marginTop: 6,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              ↗ {proposal.evidenceLink}
            </a>
          )}
        </div>
      )}

      {/* ── Outcome ── */}
      {proposal.outcome && (
        <div style={{
          marginTop: 10,
          background: COLORS.greenBg,
          borderRadius: 8,
          padding: '12px 14px',
        }}>
          {sectionLabel(COLORS.green, '🎯', 'Intended Outcome')}
          <div style={{ fontSize: 13, color: '#065F46', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
            {proposal.outcome}
          </div>
        </div>
      )}

      {/* ── Upvote + share + inline join form ── */}
      <div style={{ marginTop: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={handleUpvote}
            disabled={voting || (hasVoted && !proposal.isSample)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 18px',
              borderRadius: 20,
              border: `1px solid ${hasVoted ? COLORS.accentBorder : COLORS.border}`,
              background: hasVoted ? COLORS.accentBg : COLORS.bg,
              color: hasVoted ? COLORS.accent : COLORS.textSecondary,
              fontSize: 13,
              fontWeight: hasVoted ? 600 : 400,
              cursor: hasVoted ? 'default' : (voting ? 'not-allowed' : 'pointer'),
              opacity: voting ? 0.7 : 1,
              fontFamily: FONT,
              transition: 'all 0.15s',
            }}
          >
            <span style={{ fontSize: 12 }}>▲</span>
            <span>{hasVoted ? 'Supported ✓' : 'Support'}</span>
          </button>

          {/* Supporter count — always visible */}
          <span style={{ fontSize: 13, color: COLORS.textMuted }}>
            {supportLabel}
          </span>

          {/* Share button — pushed to right */}
          <div style={{ marginLeft: 'auto', position: 'relative' }}>
            <button
              onClick={handleShare}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                padding: '8px 16px',
                borderRadius: 20,
                border: 'none',
                background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
                color: '#fff',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: FONT,
                boxShadow: '0 2px 8px rgba(5, 150, 105, 0.4)',
                letterSpacing: '0.01em',
              }}
            >
              <span style={{ fontSize: 14 }}>↗</span>
              <span>Share</span>
            </button>

            {/* Fallback share menu (desktop / no Web Share API) */}
            {showShareMenu && (
              <div style={{
                position: 'absolute',
                right: 0,
                bottom: 'calc(100% + 6px)',
                background: COLORS.bg,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 10,
                boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                padding: '6px',
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                minWidth: 160,
                zIndex: 20,
              }}>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowShareMenu(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 9,
                    padding: '8px 12px',
                    borderRadius: 7,
                    fontSize: 13,
                    color: COLORS.text,
                    textDecoration: 'none',
                    background: 'transparent',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = COLORS.surface}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{ fontSize: 16 }}>💬</span>
                  <span>WhatsApp</span>
                </a>
                <a
                  href={xHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowShareMenu(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 9,
                    padding: '8px 12px',
                    borderRadius: 7,
                    fontSize: 13,
                    color: COLORS.text,
                    textDecoration: 'none',
                    background: 'transparent',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = COLORS.surface}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{ fontSize: 14, fontWeight: 700 }}>✕</span>
                  <span>Post on X</span>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Inline join form — appears when unauthenticated user clicks vote */}
        {showJoinForm && !user && (
          <div style={{
            marginTop: 12,
            background: COLORS.accentBg,
            border: `1px solid ${COLORS.accentBorder}`,
            borderRadius: 8,
            padding: '14px 14px 12px',
          }}>
            <div style={{
              fontSize: 13,
              fontWeight: 600,
              color: COLORS.accent,
              marginBottom: 10,
            }}>
              Join to support this proposal
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <input
                style={miniInputStyle}
                placeholder="Your name"
                value={joinName}
                onChange={e => setJoinName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleJoinAndVote()}
                autoComplete="name"
              />
              <input
                style={miniInputStyle}
                placeholder="07XX XXX XXX"
                value={joinPhone}
                onChange={e => setJoinPhone(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleJoinAndVote()}
                inputMode="tel"
                autoComplete="tel"
              />
              <button
                onClick={handleJoinAndVote}
                disabled={joining}
                style={{
                  background: COLORS.accent,
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  padding: '7px 16px',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: joining ? 'not-allowed' : 'pointer',
                  opacity: joining ? 0.6 : 1,
                  flexShrink: 0,
                  fontFamily: FONT,
                }}
              >
                {joining ? '…' : proposal.isSample ? 'Join' : 'Join & Vote'}
              </button>
            </div>
            {joinError && (
              <div style={{ fontSize: 12, color: COLORS.red, marginTop: 6 }}>{joinError}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
