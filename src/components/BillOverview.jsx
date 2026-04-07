import { useState } from 'react';
import { REGULATIONS } from '../regulations';
import { COLORS, FONT, SEVERITY } from '../constants';
import { DOMAINS, BUSINESS_TYPES, TOP_CRITICAL, getDomainStats, getDomain } from '../domain-config';
import { downloadBillOverviewReport } from '../report';

// ─── Stacked bar primitive ────────────────────────────────────────────────
function StackedBar({ red, yellow, green, total, height = 8, dimmed = false }) {
  if (total === 0) return null;
  const r = (red    / total) * 100;
  const y = (yellow / total) * 100;
  const g = (green  / total) * 100;
  return (
    <div style={{
      display: 'flex',
      height,
      borderRadius: height / 2,
      overflow: 'hidden',
      background: COLORS.border,
      opacity: dimmed ? 0.4 : 1,
      transition: 'opacity 0.2s',
      flex: 1,
    }}>
      {red    > 0 && <div style={{ width: `${r}%`, background: SEVERITY.red.color,    transition: 'width 0.4s ease' }} />}
      {yellow > 0 && <div style={{ width: `${y}%`, background: SEVERITY.yellow.color, transition: 'width 0.4s ease' }} />}
      {green  > 0 && <div style={{ width: `${g}%`, background: SEVERITY.green.color,  transition: 'width 0.4s ease' }} />}
    </div>
  );
}

// ─── Severity stat card ───────────────────────────────────────────────────
function StatCard({ count, label, color, bg, border, pct }) {
  return (
    <div style={{
      flex: 1,
      background: bg,
      border: `1px solid ${border}`,
      borderRadius: 10,
      padding: '12px 10px',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: 28, fontWeight: 800, color, lineHeight: 1, letterSpacing: '-0.02em', marginBottom: 4 }}>
        {count}
      </div>
      <div style={{ fontSize: 10, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>
        {label}
      </div>
      <div style={{ fontSize: 11, fontWeight: 600, color, opacity: 0.7 }}>
        {pct}%
      </div>
    </div>
  );
}

// ─── Domain row in the breakdown chart ────────────────────────────────────
function DomainRow({ stat, isActive, onClick }) {
  const { domain, red, yellow, green, total } = stat;
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '7px 10px',
        borderRadius: 8,
        cursor: 'pointer',
        background: isActive ? COLORS.accentBg : 'transparent',
        border: `1px solid ${isActive ? COLORS.accentBorder : 'transparent'}`,
        transition: 'background 0.15s, border-color 0.15s',
      }}
    >
      {/* Icon */}
      <span style={{ fontSize: 14, lineHeight: 1, flexShrink: 0, width: 18, textAlign: 'center' }}>
        {domain.icon}
      </span>

      {/* Label */}
      <span style={{
        fontSize: 12,
        fontWeight: isActive ? 700 : 500,
        color: isActive ? COLORS.accent : COLORS.textSecondary,
        width: 148,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}>
        {domain.label}
      </span>

      {/* Stacked bar */}
      <StackedBar red={red} yellow={yellow} green={green} total={total} height={8} />

      {/* Count badges */}
      <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
        {red > 0 && (
          <span style={{
            fontSize: 10, fontWeight: 700,
            color: SEVERITY.red.color,
            background: SEVERITY.red.bg,
            borderRadius: 10, padding: '1px 5px',
          }}>{red}</span>
        )}
        {yellow > 0 && (
          <span style={{
            fontSize: 10, fontWeight: 700,
            color: SEVERITY.yellow.color,
            background: SEVERITY.yellow.bg,
            borderRadius: 10, padding: '1px 5px',
          }}>{yellow}</span>
        )}
        {green > 0 && (
          <span style={{
            fontSize: 10, fontWeight: 700,
            color: SEVERITY.green.color,
            background: SEVERITY.green.bg,
            borderRadius: 10, padding: '1px 5px',
          }}>{green}</span>
        )}
      </div>
    </div>
  );
}

// ─── Top Critical provision row ───────────────────────────────────────────
function CriticalRow({ rank, reg, onSelect }) {
  const sev = SEVERITY[reg.severity] || SEVERITY.yellow;
  const analysis = null; // just for display — no import needed here
  return (
    <div
      onClick={() => onSelect(reg)}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
        padding: '9px 0',
        borderBottom: `1px solid ${COLORS.border}`,
        cursor: 'pointer',
      }}
      onMouseEnter={e => e.currentTarget.style.background = COLORS.surfaceHover}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      {/* Rank badge */}
      <div style={{
        width: 24, height: 24,
        borderRadius: '50%',
        background: sev.bg,
        border: `1px solid ${sev.border}`,
        color: sev.color,
        fontSize: 10, fontWeight: 800,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        marginTop: 1,
      }}>
        {rank}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.heading, lineHeight: 1.3 }}>
          {reg.title}
        </div>
        <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 2, lineHeight: 1.4 }}>
          {reg.ref}
        </div>
      </div>

      {/* Severity badge */}
      <div style={{
        fontSize: 9, fontWeight: 700,
        color: sev.color,
        background: sev.bg,
        border: `1px solid ${sev.border}`,
        borderRadius: 4,
        padding: '2px 6px',
        flexShrink: 0,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        whiteSpace: 'nowrap',
        alignSelf: 'flex-start',
        marginTop: 2,
      }}>
        {sev.label}
      </div>

      <div style={{ color: COLORS.textMuted, fontSize: 12, flexShrink: 0, marginTop: 4 }}>›</div>
    </div>
  );
}

// ─── Business type selector ────────────────────────────────────────────────
function BusinessTypeRow({ activeType, onSelect }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
        My Business Type
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {BUSINESS_TYPES.map(bt => {
          const active = activeType === bt.id;
          return (
            <button
              key={bt.id}
              onClick={() => onSelect(bt.id)}
              style={{
                padding: '5px 12px',
                borderRadius: 16,
                border: `1px solid ${active ? COLORS.accentBorder : COLORS.border}`,
                background: active ? COLORS.accentBg : COLORS.surface,
                color: active ? COLORS.accent : COLORS.textSecondary,
                fontSize: 12,
                fontWeight: active ? 700 : 400,
                cursor: 'pointer',
                fontFamily: FONT,
                transition: 'all 0.15s',
              }}
            >
              {bt.label}
              {active && bt.id !== 'all' && (
                <span style={{ marginLeft: 5, fontSize: 10, opacity: 0.75 }}>
                  → {bt.primaryDomains.length} sections
                </span>
              )}
            </button>
          );
        })}
      </div>
      {activeType !== 'all' && (
        <div style={{ marginTop: 8, fontSize: 11, color: COLORS.textMuted, lineHeight: 1.5 }}>
          {(() => {
            const bt = BUSINESS_TYPES.find(b => b.id === activeType);
            return `Most relevant domains highlighted: ${bt.primaryDomains.map(d => DOMAINS.find(dom => dom.id === d)?.label).join(', ')}.`;
          })()}
        </div>
      )}
    </div>
  );
}

// ─── Main BillOverview component ──────────────────────────────────────────
export default function BillOverview({ activeDomain, onSelectDomain, onSelectReg, activeBusinessType, onSelectBusinessType }) {
  const [collapsed,   setCollapsed]   = useState(false);
  const [showAllTop,  setShowAllTop]  = useState(false);

  const total  = REGULATIONS.length;
  const red    = REGULATIONS.filter(r => r.severity === 'red').length;
  const yellow = REGULATIONS.filter(r => r.severity === 'yellow').length;
  const green  = REGULATIONS.filter(r => r.severity === 'green').length;

  const redPct    = Math.round((red    / total) * 100);
  const yellowPct = Math.round((yellow / total) * 100);
  const greenPct  = Math.round((green  / total) * 100);

  const domainStats = getDomainStats();

  // When a business type is active, dim domains that aren't primary
  const activeBT = BUSINESS_TYPES.find(b => b.id === activeBusinessType);
  const isDomainRelevant = (domainId) => {
    if (activeBusinessType === 'all') return true;
    return activeBT?.primaryDomains.includes(domainId) ?? true;
  };

  const visibleTopCritical = showAllTop ? TOP_CRITICAL : TOP_CRITICAL.slice(0, 6);

  return (
    <div style={{
      background: COLORS.bg,
      border: `1px solid ${COLORS.border}`,
      borderRadius: 12,
      overflow: 'hidden',
      marginBottom: 20,
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    }}>

      {/* ── Overview header with collapse toggle ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 16px',
          borderBottom: collapsed ? 'none' : `1px solid ${COLORS.border}`,
          cursor: 'pointer',
          background: COLORS.surface,
        }}
        onClick={() => setCollapsed(p => !p)}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.heading }}>
            Bill Health Overview
          </div>
          {collapsed && (
            <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 2 }}>
              {red} provisions need redesign · {yellow} need adjustment · {green} can enhance
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexShrink: 0 }}>
          <button
            onClick={e => { e.stopPropagation(); downloadBillOverviewReport(); }}
            style={{
              fontSize: 11, fontWeight: 600,
              color: COLORS.accent,
              background: COLORS.accentBg,
              border: `1px solid ${COLORS.accentBorder}`,
              borderRadius: 12,
              padding: '3px 10px',
              cursor: 'pointer',
              fontFamily: FONT,
            }}
          >
            ⬇ Report
          </button>
          <span style={{
            fontSize: 11, fontWeight: 600,
            color: COLORS.textMuted,
            background: COLORS.border,
            borderRadius: 12,
            padding: '3px 10px',
          }}>
            {collapsed ? 'Show' : 'Hide'}
          </span>
        </div>
      </div>

      {!collapsed && (
        <div style={{ padding: '16px' }}>

          {/* ── Section A: Severity Scorecard ── */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <StatCard
                count={red} label="Needs Redesign"
                color={SEVERITY.red.color} bg={SEVERITY.red.bg} border={SEVERITY.red.border}
                pct={redPct}
              />
              <StatCard
                count={yellow} label="Needs Adjustment"
                color={SEVERITY.yellow.color} bg={SEVERITY.yellow.bg} border={SEVERITY.yellow.border}
                pct={yellowPct}
              />
              <StatCard
                count={green} label="Can Enhance"
                color={SEVERITY.green.color} bg={SEVERITY.green.bg} border={SEVERITY.green.border}
                pct={greenPct}
              />
            </div>

            {/* Overall stacked bar */}
            <div style={{ marginBottom: 6 }}>
              <StackedBar red={red} yellow={yellow} green={green} total={total} height={12} />
            </div>

            {/* Bar labels */}
            <div style={{ display: 'flex', gap: 0 }}>
              {[
                { pct: redPct,    color: SEVERITY.red.color,    label: `${redPct}% redesign` },
                { pct: yellowPct, color: SEVERITY.yellow.color, label: `${yellowPct}% adjust` },
                { pct: greenPct,  color: SEVERITY.green.color,  label: `${greenPct}% enhance` },
              ].map(item => (
                <div key={item.label} style={{ width: `${item.pct}%`, minWidth: 0, overflow: 'hidden' }}>
                  <div style={{
                    fontSize: 10,
                    fontWeight: 600,
                    color: item.color,
                    paddingTop: 3,
                    whiteSpace: 'nowrap',
                    paddingLeft: 1,
                  }}>
                    {item.pct > 12 ? item.label : ''}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 8, lineHeight: 1.5, fontStyle: 'italic' }}>
              {redPct}% of {total} provisions require fundamental redesign — one of the most restrictive VASP frameworks globally.
            </div>
          </div>

          <div style={{ height: 1, background: COLORS.border, marginBottom: 16 }} />

          {/* ── Business Type Filter ── */}
          <BusinessTypeRow
            activeType={activeBusinessType}
            onSelect={onSelectBusinessType}
          />

          <div style={{ height: 1, background: COLORS.border, marginBottom: 16 }} />

          {/* ── Section B: Domain Severity Breakdown ── */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Severity by Domain
              </div>
              <div style={{ display: 'flex', gap: 10, fontSize: 10, color: COLORS.textMuted }}>
                <span style={{ color: SEVERITY.red.color,    fontWeight: 700 }}>■ Redesign</span>
                <span style={{ color: SEVERITY.yellow.color, fontWeight: 700 }}>■ Adjust</span>
                <span style={{ color: SEVERITY.green.color,  fontWeight: 700 }}>■ Enhance</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {domainStats.map(stat => (
                <DomainRow
                  key={stat.domain.id}
                  stat={stat}
                  isActive={activeDomain === stat.domain.id}
                  onClick={() => onSelectDomain(
                    activeDomain === stat.domain.id ? 'all' : stat.domain.id
                  )}
                  dimmed={!isDomainRelevant(stat.domain.id)}
                />
              ))}
            </div>
          </div>

          <div style={{ height: 1, background: COLORS.border, marginBottom: 16 }} />

          {/* ── Section C: Top Critical Provisions ── */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  12 Most Critical Provisions
                </div>
                <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 2 }}>
                  Every VASP should understand these regardless of business type
                </div>
              </div>
            </div>

            <div>
              {visibleTopCritical.map((reg, i) => (
                <CriticalRow
                  key={reg.id}
                  rank={i + 1}
                  reg={reg}
                  onSelect={onSelectReg}
                />
              ))}
            </div>

            {TOP_CRITICAL.length > 6 && (
              <button
                onClick={() => setShowAllTop(p => !p)}
                style={{
                  marginTop: 10,
                  width: '100%',
                  padding: '8px',
                  background: 'none',
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 8,
                  color: COLORS.textSecondary,
                  fontSize: 12,
                  cursor: 'pointer',
                  fontFamily: FONT,
                }}
              >
                {showAllTop
                  ? '▲ Show less'
                  : `▼ Show all 12 critical provisions`}
              </button>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
