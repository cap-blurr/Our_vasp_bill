import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { REGULATIONS } from '../regulations';
import { COLORS, FONT } from '../constants';
import { SAMPLE_PROPOSALS } from '../sampleProposals';
import ProposalCard from './ProposalCard';

export default function ProposalsTab({ user, onSetUser }) {
  const [proposals, setProposals] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [filterReg, setFilterReg] = useState('all');

  useEffect(() => {
    const q = query(collection(db, 'proposals'), orderBy('upvotes', 'desc'));
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        setProposals(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
      },
      (err) => {
        console.error('Firestore snapshot error:', err);
        setLoading(false);
      }
    );
    return unsub;
  }, []);

  // Determine what to display
  const showingSamples = !loading && proposals.length === 0;
  const displayList = showingSamples ? SAMPLE_PROPOSALS : proposals;

  // Filter chips — built from whichever list we're showing
  const presentRegIds = [...new Set(displayList.map(p => p.regulationId))];
  const chipRegs = presentRegIds
    .map(id => REGULATIONS.find(r => r.id === id))
    .filter(Boolean);

  const filtered = filterReg === 'all'
    ? displayList
    : displayList.filter(p => p.regulationId === filterReg);

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

      {/* Sample proposals notice */}
      {showingSamples && (
        <div style={{
          background: '#FFFBEB',
          border: '1px solid #FDE68A',
          borderRadius: 8,
          padding: '12px 16px',
          marginBottom: 16,
          display: 'flex',
          gap: 10,
          alignItems: 'flex-start',
        }}>
          <span style={{ fontSize: 16, flexShrink: 0 }}>👀</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#92400E', marginBottom: 2 }}>
              Previewing example proposals
            </div>
            <div style={{ fontSize: 12, color: '#B45309', lineHeight: 1.5 }}>
              No proposals have been submitted yet. These examples show what the community
              discussion will look like. Go to the <strong>Propose</strong> tab to be the first.
            </div>
          </div>
        </div>
      )}

      {/* Filter chips */}
      {displayList.length > 0 && (
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
          <ProposalCard
            key={proposal.id}
            proposal={proposal}
            user={user}
            onSetUser={onSetUser}
          />
        ))
      )}
    </div>
  );
}
