import { useState, useRef, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { REGULATIONS, PARTS } from '../regulations';
import { COLORS, FONT, SEVERITY } from '../constants';
import { getAnalysis } from '../analysis';
import { downloadAnalysisReport } from '../report';
import { DOMAINS, BUSINESS_TYPES, getDomain } from '../domain-config';
import BillOverview from './BillOverview';

// ─── Severity filter config ────────────────────────────────────────────────
const SEVERITY_FILTERS = [
  { id: 'red',    label: 'Needs Redesign',   match: r => r.severity === 'red',    ...SEVERITY.red    },
  { id: 'yellow', label: 'Needs Adjustment', match: r => r.severity === 'yellow', ...SEVERITY.yellow },
  { id: 'green',  label: 'Can Enhance',      match: r => r.severity === 'green',  ...SEVERITY.green  },
  { id: 'all',    label: 'All',              match: () => true,
    color: COLORS.accent, bg: COLORS.accentBg, border: COLORS.accentBorder },
];

function getSeverityChipStyles(filter, active) {
  const urgent = filter.id === 'red';
  const activeBackground = active
    ? urgent
      ? 'linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 100%)'
      : filter.bg
    : COLORS.bg;

  return {
    button: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      padding: urgent ? '8px 15px' : '7px 14px',
      borderRadius: 999,
      border: `1px solid ${active ? filter.border : COLORS.border}`,
      background: activeBackground,
      boxShadow: active
        ? urgent
          ? '0 10px 24px rgba(220,38,38,0.14)'
          : '0 6px 16px rgba(15,23,42,0.06)'
        : 'none',
      cursor: 'pointer',
      fontFamily: FONT,
      transition: 'all 0.18s ease',
    },
    marker: {
      width: urgent ? 18 : 8,
      height: urgent ? 18 : 8,
      borderRadius: urgent ? 9 : '50%',
      background: active ? filter.color : COLORS.textMuted,
      color: '#fff',
      fontSize: urgent ? 11 : 0,
      fontWeight: 800,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      boxShadow: urgent && active ? '0 0 0 3px rgba(220,38,38,0.12)' : 'none',
    },
    label: {
      fontSize: 13,
      fontWeight: active || urgent ? 700 : 500,
      color: active ? filter.color : COLORS.textSecondary,
      letterSpacing: urgent ? '0.01em' : 'normal',
    },
    count: {
      fontSize: 11,
      fontWeight: 700,
      color: active ? filter.color : COLORS.textMuted,
      background: active
        ? urgent
          ? 'rgba(255,255,255,0.8)'
          : 'rgba(0,0,0,0.06)'
        : COLORS.surface,
      padding: '2px 8px',
      borderRadius: 999,
      minWidth: 26,
      textAlign: 'center',
      border: urgent && active ? '1px solid rgba(220,38,38,0.14)' : 'none',
    },
  };
}

// ─── Group regulations by part, in PARTS order ────────────────────────────
function buildGroups(filteredRegs) {
  const groups = [];
  for (const part of PARTS) {
    if (part.id === 'all' || part.id === 'other') continue;
    const regs = filteredRegs.filter(r => r.part === part.id);
    if (regs.length > 0) groups.push({ part, regs });
  }
  const other = filteredRegs.filter(r => r.part === 'other');
  if (other.length > 0) groups.push({ part: { id: 'other', label: 'Other / General' }, regs: other });
  return groups;
}

function partSeveritySummary(regs) {
  const red    = regs.filter(r => r.severity === 'red').length;
  const yellow = regs.filter(r => r.severity === 'yellow').length;
  const green  = regs.filter(r => r.severity === 'green').length;
  const out = [];
  if (red)    out.push({ count: red,    color: SEVERITY.red.color,    label: 'redesign' });
  if (yellow) out.push({ count: yellow, color: SEVERITY.yellow.color, label: 'adjust' });
  if (green)  out.push({ count: green,  color: SEVERITY.green.color,  label: 'enhance' });
  return out;
}

// ─── Regulation card ──────────────────────────────────────────────────────
function RegCard({ reg, isSelected, onSelect }) {
  const sev = SEVERITY[reg.severity] || SEVERITY.yellow;
  const hasAnalysis = !!getAnalysis(reg.id);
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
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 6, marginBottom: 4 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.heading, lineHeight: 1.3, flex: 1, minWidth: 0 }}>
          {reg.title}
        </div>
        <div style={{
          fontSize: 9, fontWeight: 700,
          color: isSelected ? '#fff' : sev.color,
          background: isSelected ? sev.color : sev.bg,
          border: `1px solid ${sev.border}`,
          borderRadius: 4, padding: '2px 6px',
          flexShrink: 0, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap',
        }}>
          {sev.label}
        </div>
      </div>
      <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 5 }}>{reg.ref}</div>
      <div style={{ fontSize: 12, color: COLORS.textSecondary, lineHeight: 1.5 }}>
        {reg.summary.length > 90 ? reg.summary.slice(0, 90) + '…' : reg.summary}
      </div>
      {hasAnalysis && !isSelected && (
        <div style={{ marginTop: 6, fontSize: 10, fontWeight: 700, color: COLORS.accent, letterSpacing: '0.04em' }}>
          ANALYSIS AVAILABLE →
        </div>
      )}
    </div>
  );
}

// ─── Jurisdiction comparator card ─────────────────────────────────────────
function ComparatorCard({ comparator }) {
  return (
    <div style={{
      background: COLORS.surface,
      border: `1px solid ${COLORS.border}`,
      borderRadius: 8,
      padding: '12px 14px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <span style={{ fontSize: 18, lineHeight: 1 }}>{comparator.flag}</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.heading, letterSpacing: '0.02em' }}>
          {comparator.jurisdiction}
        </span>
      </div>
      <div style={{ fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.65, marginBottom: 8 }}>
        {comparator.approach}
      </div>
      <div style={{ fontSize: 11, color: COLORS.textMuted, fontStyle: 'italic', lineHeight: 1.4 }}>
        Source: {comparator.source}
      </div>
    </div>
  );
}

// ─── Domain navigation chips ──────────────────────────────────────────────
function DomainChips({ domains, activeDomain, onSelect, severityFilterId, activeBusinessType }) {
  const scrollRef = useRef(null);
  const sevMatch  = SEVERITY_FILTERS.find(f => f.id === severityFilterId).match;
  const activeBT  = BUSINESS_TYPES.find(b => b.id === activeBusinessType);

  return (
    <div
      ref={scrollRef}
      className="chips-scroll"
      style={{
        display: 'flex',
        gap: 6,
        overflowX: 'auto',
        paddingBottom: 4,
        marginBottom: 16,
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      {domains.map(domain => {
        const active = activeDomain === domain.id;
        const count  = domain.id === 'all'
          ? REGULATIONS.filter(sevMatch)
              .filter(r => activeBusinessType === 'all' || activeBT.primaryDomains.includes(getDomain(r)))
              .length
          : REGULATIONS.filter(sevMatch).filter(r => getDomain(r) === domain.id).length;

        return (
          <button
            key={domain.id}
            onClick={() => onSelect(domain.id)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              padding: '6px 12px',
              borderRadius: 16,
              border: `1px solid ${active ? COLORS.accentBorder : COLORS.border}`,
              background: active ? COLORS.accentBg : COLORS.bg,
              color: active ? COLORS.accent : COLORS.textSecondary,
              fontSize: 12,
              fontWeight: active ? 700 : 400,
              cursor: 'pointer',
              fontFamily: FONT,
              flexShrink: 0,
              transition: 'all 0.15s',
            }}
          >
            <span style={{ fontSize: 13 }}>{domain.icon}</span>
            <span>{domain.label}</span>
            {count > 0 && (
              <span style={{
                fontSize: 10, fontWeight: 700,
                color: active ? COLORS.accent : COLORS.textMuted,
                background: active ? 'rgba(99,102,241,0.12)' : COLORS.surface,
                padding: '1px 6px', borderRadius: 10,
              }}>
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ─── Section label ─────────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <div style={{
      fontSize: 11, fontWeight: 700, color: COLORS.textMuted,
      textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10,
    }}>
      {children}
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────
export default function BillAnalysisTab({ onNavigateToPropose }) {
  const [severityFilter,     setSeverityFilter]     = useState('red');
  const [activeDomain,       setActiveDomain]       = useState('all');
  const [activeBusinessType, setActiveBusinessType] = useState('all');
  const [selectedReg,        setSelectedReg]        = useState(null);
  const [reportLoading,      setReportLoading]      = useState(false);
  const cardsRef = useRef(null);

  // When a regulation is selected from BillOverview Top Critical list
  const handleSelectFromOverview = (reg) => {
    // Switch to correct severity filter
    setSeverityFilter(reg.severity === 'green' ? 'green' : reg.severity === 'yellow' ? 'yellow' : 'red');
    // Switch to correct domain
    setActiveDomain(getDomain(reg));
    setSelectedReg(reg);
    // Scroll to cards section
    setTimeout(() => cardsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };

  // When a domain is selected from BillOverview
  const handleSelectDomain = (domainId) => {
    setActiveDomain(domainId);
    setSelectedReg(null);
    setTimeout(() => cardsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };

  const handleSelectBusinessType = (btId) => {
    setActiveBusinessType(btId);
    setActiveDomain('all');
    setSelectedReg(null);
    setTimeout(() => cardsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };

  useEffect(() => {
    document.body.style.overflow = selectedReg ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedReg]);

  // Fetch community proposals for this regulation, then generate the report
  const handleDownloadReport = async () => {
    if (!selectedReg) return;
    setReportLoading(true);
    try {
      const snap = await getDocs(
        query(collection(db, 'proposals'), where('regulationId', '==', selectedReg.id))
      );
      const proposals = snap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
      downloadAnalysisReport(selectedReg, getAnalysis(selectedReg.id), proposals);
    } catch {
      // Fall back to report without proposals if Firestore fails
      downloadAnalysisReport(selectedReg, getAnalysis(selectedReg.id), []);
    } finally {
      setReportLoading(false);
    }
  };

  const activeSF   = SEVERITY_FILTERS.find(f => f.id === severityFilter);
  const activeBT   = BUSINESS_TYPES.find(b => b.id === activeBusinessType);
  const filteredRegs = REGULATIONS
    .filter(activeSF.match)
    .filter(r => activeBusinessType === 'all' || activeBT.primaryDomains.includes(getDomain(r)))
    .filter(r => activeDomain === 'all' || getDomain(r) === activeDomain);
  const visibleDomains = activeBusinessType === 'all'
    ? DOMAINS
    : DOMAINS.filter(d => d.id === 'all' || activeBT.primaryDomains.includes(d.id));
  const groups   = buildGroups(filteredRegs);
  const analysis = selectedReg ? getAnalysis(selectedReg.id) : null;
  const sev      = selectedReg ? (SEVERITY[selectedReg.severity] || SEVERITY.yellow) : null;

  const handleSelectCard = (reg) => {
    setSelectedReg(reg);
  };

  const activeDomainObj = DOMAINS.find(d => d.id === activeDomain);

  return (
    <div style={{ fontFamily: FONT }}>

      {/* ── Bill Overview (visual overview + navigation) ─────────── */}
      <BillOverview
        activeDomain={activeDomain}
        onSelectDomain={handleSelectDomain}
        onSelectReg={handleSelectFromOverview}
        activeBusinessType={activeBusinessType}
        onSelectBusinessType={handleSelectBusinessType}
      />

      {/* ── Section: Regulation Explorer ─────────────────────────── */}
      <div ref={cardsRef}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.heading, marginBottom: 3 }}>
            Regulation Explorer
          </div>
          <div style={{ fontSize: 12, color: COLORS.textSecondary }}>
            Filter by severity and domain, then click any provision for full analysis.
          </div>
        </div>

        {/* Domain chips */}
        <DomainChips
          domains={visibleDomains}
          activeDomain={activeDomain}
          onSelect={(d) => { setActiveDomain(d); setSelectedReg(null); }}
          severityFilterId={severityFilter}
          activeBusinessType={activeBusinessType}
        />

        {/* Severity filter chips */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {SEVERITY_FILTERS.map(f => {
            const count  = REGULATIONS.filter(f.match)
              .filter(r => activeBusinessType === 'all' || activeBT.primaryDomains.includes(getDomain(r)))
              .filter(r => activeDomain === 'all' || getDomain(r) === activeDomain).length;
            const active = severityFilter === f.id;
            const chipStyles = getSeverityChipStyles(f, active);
            return (
              <button
                key={f.id}
                onClick={() => { setSeverityFilter(f.id); setSelectedReg(null); }}
                aria-pressed={active}
                style={chipStyles.button}
              >
                <span style={chipStyles.marker}>
                  {f.id === 'red' ? '!' : ''}
                </span>
                <span style={chipStyles.label}>
                  {f.label}
                </span>
                <span style={chipStyles.count}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active domain description */}
        {activeDomain !== 'all' && activeDomainObj && (
          <div style={{
            background: COLORS.accentBg,
            border: `1px solid ${COLORS.accentBorder}`,
            borderRadius: 8,
            padding: '10px 14px',
            marginBottom: 16,
            fontSize: 12,
            color: COLORS.accent,
            lineHeight: 1.5,
          }}>
            <strong>{activeDomainObj.icon} {activeDomainObj.label}:</strong>{' '}
            {activeDomainObj.description}
            <button
              onClick={() => { setActiveDomain('all'); setSelectedReg(null); }}
              style={{
                marginLeft: 10, fontSize: 11, color: COLORS.accent,
                background: 'none', border: 'none', cursor: 'pointer',
                padding: 0, fontFamily: FONT, textDecoration: 'underline',
              }}
            >
              Clear filter
            </button>
          </div>
        )}

        {/* Regulation card grid */}
        <div className="reg-scroll">
          {groups.length === 0 ? (
            <div style={{ fontSize: 13, color: COLORS.textMuted, textAlign: 'center', padding: '32px 0' }}>
              No provisions match this filter combination.
            </div>
          ) : (
            groups.map(({ part, regs }) => {
              const summary = partSeveritySummary(regs);
              return (
                <div key={part.id} style={{ marginBottom: 20 }}>
                  <div style={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: 8, marginBottom: 8,
                    borderBottom: `1px solid ${COLORS.border}`,
                  }}>
                    <span style={{
                      fontSize: 11, fontWeight: 700, color: COLORS.textMuted,
                      textTransform: 'uppercase', letterSpacing: '0.06em',
                    }}>
                      {part.label}
                      <span style={{ marginLeft: 8, fontWeight: 600, color: COLORS.textDim }}>
                        {regs.length}
                      </span>
                    </span>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {summary.map(s => (
                        <span key={s.label} style={{
                          fontSize: 10, fontWeight: 700, color: s.color,
                          background: s.color + '18',
                          borderRadius: 10, padding: '2px 7px',
                        }}>
                          {s.count} {s.label}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                    gap: 8,
                  }}>
                    {regs.map(reg => (
                      <RegCard
                        key={reg.id}
                        reg={reg}
                        isSelected={selectedReg?.id === reg.id}
                        onSelect={handleSelectCard}
                      />
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ── Analysis Panel (full-screen overlay) ───────────────────── */}
      {selectedReg && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.55)',
            zIndex: 1000,
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
          }}
          onClick={() => setSelectedReg(null)}
        >
          <div
            style={{
              margin: '24px auto 40px',
              width: '100%',
              maxWidth: 740,
              padding: '0 16px 32px',
              background: COLORS.bg,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 16,
              boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
            }}
            onClick={e => e.stopPropagation()}
          >

          {/* Header */}
          <div style={{ paddingBottom: 16, marginBottom: 20, borderBottom: `1px solid ${COLORS.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
              <div>
                <div style={{
                  fontSize: 11, color: sev.color, fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.05em',
                  background: sev.bg, display: 'inline-block',
                  padding: '2px 8px', borderRadius: 4, border: `1px solid ${sev.border}`,
                  marginBottom: 6,
                }}>
                  {sev.label}
                </div>
                <div style={{ fontSize: 17, fontWeight: 700, color: COLORS.heading, lineHeight: 1.3 }}>
                  {selectedReg.title}
                </div>
                <div style={{ fontSize: 12, color: COLORS.textSecondary, marginTop: 3 }}>
                  {selectedReg.ref}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <button
                  onClick={handleDownloadReport}
                  disabled={reportLoading}
                  style={{
                    background: COLORS.accentBg, border: `1px solid ${COLORS.accentBorder}`,
                    borderRadius: 6, color: COLORS.accent, fontSize: 12,
                    padding: '5px 12px', cursor: reportLoading ? 'not-allowed' : 'pointer',
                    fontFamily: FONT, fontWeight: 600,
                    opacity: reportLoading ? 0.6 : 1,
                  }}
                >
                  {reportLoading ? 'Building…' : '⬇ Report'}
                </button>
                <button
                  onClick={() => setSelectedReg(null)}
                  style={{
                    background: COLORS.surface, border: `1px solid ${COLORS.border}`,
                    borderRadius: 6, color: COLORS.textSecondary, fontSize: 12,
                    padding: '5px 12px', cursor: 'pointer', fontFamily: FONT,
                  }}
                >
                  ← Back
                </button>
              </div>
            </div>

            <SectionLabel>What It Says</SectionLabel>
            <div style={{
              background: COLORS.surface,
              borderLeft: `3px solid ${sev.color}`,
              borderRadius: '0 7px 7px 0',
              padding: '12px 14px',
            }}>
              <div style={{ fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.75 }}>
                {selectedReg.summary}
              </div>
              {selectedReg.notes && (
                <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 8, fontStyle: 'italic', lineHeight: 1.5 }}>
                  Note: {selectedReg.notes}
                </div>
              )}
            </div>
          </div>

          {analysis ? (
            <>
              {/* Industry Impact */}
              {analysis.impact && analysis.impact.length > 30 && (
                <div style={{ marginBottom: 24 }}>
                  <SectionLabel>Industry Impact</SectionLabel>
                  <div style={{
                    background: sev.bg, border: `1px solid ${sev.border}`,
                    borderRadius: 8, padding: '14px 16px',
                  }}>
                    <div style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.7 }}>
                      {analysis.impact}
                    </div>
                  </div>
                </div>
              )}

              {/* Comparators */}
              {analysis.comparators && analysis.comparators.length > 0 && (
                <div style={{ marginBottom: 24 }}>
                  <SectionLabel>How Other Jurisdictions Handle This</SectionLabel>
                  <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 12, lineHeight: 1.5 }}>
                    Examples from jurisdictions with successful, proportionate VASP frameworks.
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {analysis.comparators.map((c, i) => (
                      <ComparatorCard key={i} comparator={c} />
                    ))}
                  </div>
                </div>
              )}

              {/* Alternatives */}
              {analysis.alternatives && analysis.alternatives.length > 0 && (
                <div style={{ marginBottom: 24 }}>
                  <SectionLabel>Alternative Frameworks to Consider</SectionLabel>
                  <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 12, lineHeight: 1.5 }}>
                    Concrete approaches drawn from comparator precedent.
                  </div>
                  <div style={{
                    background: COLORS.surface, border: `1px solid ${COLORS.border}`,
                    borderRadius: 8, padding: '14px 16px',
                    display: 'flex', flexDirection: 'column', gap: 12,
                  }}>
                    {analysis.alternatives.map((alt, i) => (
                      <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <div style={{
                          width: 22, height: 22, borderRadius: '50%',
                          background: COLORS.accent, color: '#fff',
                          fontSize: 11, fontWeight: 700,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0, marginTop: 1,
                        }}>
                          {i + 1}
                        </div>
                        <div style={{ fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.65, flex: 1 }}>
                          {alt}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div style={{ marginBottom: 24 }}>
              <div style={{
                background: COLORS.surface, border: `1px solid ${COLORS.border}`,
                borderRadius: 8, padding: '16px', textAlign: 'center',
              }}>
                <div style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.6 }}>
                  Detailed comparator analysis for this provision is being developed.
                  <br />
                  Use the <strong>Propose</strong> tab to submit your alternative now.
                </div>
              </div>
            </div>
          )}

          {/* CTA */}
          <div style={{
            background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)',
            border: `1px solid ${COLORS.accentBorder}`,
            borderRadius: 10, padding: '16px', textAlign: 'center',
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.accent, marginBottom: 4 }}>
              Ready to propose an alternative?
            </div>
            <div style={{ fontSize: 12, color: '#4338CA', marginBottom: 14, lineHeight: 1.5 }}>
              Use what you've learned here to submit a proposed change for community vote.
            </div>
            <button
              onClick={() => onNavigateToPropose(selectedReg)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '11px 28px', borderRadius: 24,
                border: 'none', background: COLORS.accent, color: '#fff',
                fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: FONT,
                boxShadow: '0 3px 12px rgba(99,102,241,0.4)',
              }}
            >
              <span>Propose for this provision</span>
              <span style={{ fontSize: 16 }}>→</span>
            </button>
          </div>

          </div>
        </div>
      )}
    </div>
  );
}
