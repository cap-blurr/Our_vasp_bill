import { useState, useEffect, useRef } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { REGULATIONS } from '../regulations';
import { COLORS, FONT } from '../constants';
import ProposalCard from './ProposalCard';
import { runTreasuryPipeline, VOTE_THRESHOLD } from '../treasuryPipeline';

export default function ProposalsTab({ user, onSetUser, targetProposalId }) {
  const [proposals, setProposals] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [filterReg, setFilterReg] = useState('all');
  const cardRefs = useRef({});

  useEffect(() => {
    const q = query(collection(db, 'proposals'), orderBy('upvotes', 'desc'));
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        setProposals(docs);
        setLoading(false);

        // Auto-trigger treasury pipeline for any proposal that crossed the threshold
        // and hasn't been claimed yet. runTreasuryPipeline handles the atomic claim
        // internally, so only one connected client will actually run it per proposal.
        docs
          .filter(p => p.upvotes >= VOTE_THRESHOLD && !p.treasuryFormatted)
          .forEach(p => runTreasuryPipeline(p));
      },
      (err) => {
        console.error('Firestore snapshot error:', err);
        setLoading(false);
      }
    );
    return unsub;
  }, []);

  // Scroll to and highlight the deep-linked proposal once it loads
  useEffect(() => {
    if (!targetProposalId || loading || proposals.length === 0) return;
    const timer = setTimeout(() => {
      const el = cardRefs.current[targetProposalId];
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 350);
    return () => clearTimeout(timer);
  }, [targetProposalId, loading, proposals]);

  // Filter chips — built from live proposals only
  const presentRegIds = [...new Set(proposals.map(p => p.regulationId))];
  const chipRegs = presentRegIds
    .map(id => REGULATIONS.find(r => r.id === id))
    .filter(Boolean);

  const filtered = filterReg === 'all'
    ? proposals
    : proposals.filter(p => p.regulationId === filterReg);

  const chipStyle = (active) => ({
    background: active ? COLORS.accent : COLORS.bg,
    color: active ? '#fff' : COLORS.textSecondary,
    border: `1px solid ${active ? COLORS.accent : COLORS.border}`,
    borderRadius: 20,
    padding: '5px 14px',
    fontSize: 12,
    fontWeight: active ? 600 : 400,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    flexShrink: 0,
    fontFamily: FONT,
  });

  return (
    <div style={{ fontFamily: FONT }}>

      {/* Filter chips */}
      {proposals.length > 0 && (
        <div
          className="chips-scroll"
          style={{
            display: 'flex',
            gap: 6,
            overflowX: 'auto',
            paddingBottom: 12,
            marginBottom: 16,
            scrollbarWidth: 'none',
          }}
        >
          <button onClick={() => setFilterReg('all')} style={chipStyle(filterReg === 'all')}>
            All
          </button>
          {chipRegs.map(reg => (
            <button
              key={reg.id}
              onClick={() => setFilterReg(reg.id)}
              style={chipStyle(filterReg === reg.id)}
            >
              {reg.title}
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div style={{
          textAlign: 'center',
          padding: '56px 0',
          color: COLORS.textMuted,
          fontSize: 13,
        }}>
          Loading proposals…
        </div>
      ) : proposals.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '56px 0',
          color: COLORS.textMuted,
          fontSize: 13,
          lineHeight: 1.6,
        }}>
          No proposals yet. Go to the <strong>Propose</strong> tab to be the first.
        </div>
      ) : filtered.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '56px 0',
          color: COLORS.textMuted,
          fontSize: 13,
          lineHeight: 1.6,
        }}>
          No proposals for this regulation yet.
        </div>
      ) : (
        filtered.map(proposal => (
          <div key={proposal.id} ref={el => { if (el) cardRefs.current[proposal.id] = el; }}>
            <ProposalCard
              proposal={proposal}
              user={user}
              onSetUser={onSetUser}
              isHighlighted={proposal.id === targetProposalId}
            />
          </div>
        ))
      )}
    </div>
  );
}
