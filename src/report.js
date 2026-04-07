// src/report.js
// Two exports:
//   downloadBillOverviewReport()  — full bill health overview + Top 12 critical provisions
//   downloadAnalysisReport()      — provision deep-dive + overview + community proposals
// Both open a print-ready HTML page; user clicks "Save as PDF" or Ctrl+P.

import { REGULATIONS } from './regulations';
import { getDomainStats, TOP_CRITICAL } from './domain-config';

// ─── Severity palette ──────────────────────────────────────────────────────
const SEV = {
  red:    { color: '#DC2626', bg: '#FEF2F2', border: '#FECACA', label: 'Needs Redesign'   },
  yellow: { color: '#D97706', bg: '#FFFBEB', border: '#FDE68A', label: 'Needs Adjustment' },
  green:  { color: '#059669', bg: '#ECFDF5', border: '#6EE7B7', label: 'Can Enhance'      },
};

// Minimal HTML-entity escape
const e = (s) => String(s ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

// Pure-CSS stacked bar — mirrors the app's StackedBar component
function stackedBar(red, yellow, green, total, height = 10) {
  if (!total) return '';
  const r = (red    / total) * 100;
  const y = (yellow / total) * 100;
  const g = (green  / total) * 100;
  const seg = (w, color) => w > 0
    ? `<div style="width:${w.toFixed(1)}%;background:${color};height:100%;"></div>`
    : '';
  return `
    <div style="display:flex;height:${height}px;border-radius:${height / 2}px;
                overflow:hidden;background:#E2E8F0;flex:1;min-width:60px;">
      ${seg(r, '#DC2626')}${seg(y, '#D97706')}${seg(g, '#059669')}
    </div>`;
}

// ─── Shared CSS ────────────────────────────────────────────────────────────
const BASE_CSS = `
  *{margin:0;padding:0;box-sizing:border-box}
  body{
    font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,sans-serif;
    color:#1E293B;background:#fff;
    padding:48px 56px;max-width:800px;margin:0 auto;
    font-size:14px;line-height:1.65;
  }
  @media print{
    body{padding:20px 32px}
    .no-print{display:none!important}
    @page{margin:14mm 16mm;size:A4}
    .proposal,.comparator,.domain-row,.critical-row{page-break-inside:avoid}
  }

  /* ── Print button ── */
  .print-btn{
    position:fixed;top:20px;right:20px;
    background:#6366F1;color:#fff;border:none;border-radius:8px;
    padding:10px 22px;font-size:13px;font-weight:600;
    cursor:pointer;font-family:inherit;
    box-shadow:0 4px 14px rgba(99,102,241,.4);
  }
  .print-btn:hover{opacity:.85}

  /* ── Branded header ── */
  .report-header{margin-bottom:32px}
  .brand-bar{
    background:#6366F1;color:#fff;
    padding:18px 24px;border-radius:10px 10px 0 0;
    display:flex;align-items:center;justify-content:space-between;gap:16px;
  }
  .brand-name{font-size:20px;font-weight:800;letter-spacing:-.01em;margin-bottom:3px}
  .brand-url{font-size:12px;opacity:.8;letter-spacing:.02em}
  .brand-right{text-align:right;flex-shrink:0}
  .brand-tagline{font-size:11px;opacity:.75;line-height:1.5}
  .brand-doc-label{
    display:inline-block;margin-top:6px;
    background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.3);
    border-radius:4px;padding:2px 8px;font-size:10px;font-weight:700;
    letter-spacing:.06em;text-transform:uppercase;
  }
  .header-meta-bar{
    background:#EEF2FF;border:1px solid #C7D2FE;border-top:none;
    border-radius:0 0 10px 10px;padding:10px 24px;
    display:flex;align-items:center;justify-content:space-between;
    font-size:11px;color:#4338CA;
  }
  .header-meta-bar strong{font-weight:700}

  /* ── Section typography ── */
  .section-title{
    font-size:10px;font-weight:700;color:#64748B;
    text-transform:uppercase;letter-spacing:.08em;
    margin:32px 0 8px;padding-bottom:6px;
    border-bottom:1px solid #E2E8F0;
  }
  .section-sub{font-size:12px;color:#94A3B8;margin-bottom:12px;line-height:1.5}

  /* ── Provision identity ── */
  .sev-badge{
    display:inline-block;padding:3px 10px;border-radius:4px;
    font-size:10px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;
    margin-bottom:10px;border:1px solid;
  }
  .provision-title{font-size:22px;font-weight:800;color:#1E293B;line-height:1.25;margin-bottom:5px}
  .provision-ref{font-size:12px;color:#64748B;margin-bottom:4px}

  /* ── Overview: scorecard ── */
  .scorecard{display:flex;gap:10px;margin-bottom:14px}
  .stat-card{flex:1;border:1px solid;border-radius:10px;padding:12px 10px;text-align:center;}
  .stat-num{font-size:28px;font-weight:800;line-height:1;letter-spacing:-.02em;margin-bottom:4px}
  .stat-lbl{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;margin-bottom:2px}
  .stat-pct{font-size:11px;font-weight:600;opacity:.7}

  /* ── Overview: domain breakdown ── */
  .domain-header{
    display:flex;align-items:center;justify-content:space-between;
    font-size:10px;font-weight:700;color:#64748B;
    text-transform:uppercase;letter-spacing:.07em;margin:18px 0 8px;
  }
  .domain-grid{display:flex;flex-direction:column;gap:3px;margin-bottom:8px}
  .domain-row{display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:6px;}
  .domain-row:nth-child(odd){background:#F8FAFC}
  .d-icon{font-size:13px;width:18px;text-align:center;flex-shrink:0}
  .d-label{font-size:11px;font-weight:500;color:#475569;width:150px;flex-shrink:0;
            white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .d-badges{display:flex;gap:4px;flex-shrink:0}
  .badge{font-size:10px;font-weight:700;border-radius:10px;padding:1px 6px}

  /* ── Top Critical rows ── */
  .critical-row{
    display:flex;align-items:flex-start;gap:10px;
    padding:11px 0;border-bottom:1px solid #F1F5F9;
  }
  .critical-rank{
    width:26px;height:26px;border-radius:50%;
    font-size:10px;font-weight:800;
    display:flex;align-items:center;justify-content:center;flex-shrink:0;
    margin-top:1px;border:1px solid;
  }
  .critical-title{font-size:13px;font-weight:600;color:#1E293B;line-height:1.3;margin-bottom:2px}
  .critical-ref{font-size:11px;color:#94A3B8}
  .critical-summary{font-size:12px;color:#64748B;line-height:1.55;margin-top:5px}
  .sev-chip{
    font-size:9px;font-weight:700;border-radius:4px;padding:2px 6px;border:1px solid;
    text-transform:uppercase;letter-spacing:.05em;white-space:nowrap;
    flex-shrink:0;align-self:flex-start;margin-top:2px;
  }

  /* ── Provision analysis blocks ── */
  .summary-block{
    background:#F8FAFC;border-left:4px solid currentColor;
    border-radius:0 7px 7px 0;padding:14px 16px;
    font-size:13px;line-height:1.75;color:#334155;
  }
  .impact-block{border:1px solid;border-radius:8px;padding:14px 16px;
                 font-size:13px;line-height:1.7;color:#1E293B;}
  .comparator{background:#F8FAFC;border:1px solid #E2E8F0;border-radius:8px;padding:14px 16px;margin-bottom:10px;}
  .cmp-header{font-size:13px;font-weight:700;color:#1E293B;margin-bottom:7px}
  .cmp-body{font-size:13px;color:#475569;line-height:1.65}
  .cmp-source{font-size:11px;color:#94A3B8;font-style:italic;margin-top:6px}
  .alternatives{padding-left:20px}
  .alternatives li{font-size:13px;color:#334155;line-height:1.65;margin-bottom:10px}
  .no-analysis{background:#F8FAFC;border:1px solid #E2E8F0;border-radius:8px;
               padding:16px;font-size:13px;color:#64748B;line-height:1.6;text-align:center;}

  /* ── Community proposals ── */
  .proposal{border:1px solid #E2E8F0;border-radius:10px;padding:16px;margin-bottom:12px;background:#fff;}
  .proposal-meta{display:flex;align-items:center;gap:10px;margin-bottom:10px}
  .proposal-rank{
    width:26px;height:26px;border-radius:50%;
    background:#6366F1;color:#fff;font-size:11px;font-weight:800;
    display:flex;align-items:center;justify-content:center;flex-shrink:0;
  }
  .proposal-author{font-size:13px;font-weight:600;color:#1E293B}
  .proposal-votes{font-size:12px;font-weight:700;color:#6366F1;
                  background:#EEF2FF;border-radius:10px;padding:2px 8px;
                  white-space:nowrap;flex-shrink:0;}
  .proposal-suggestion{font-size:13px;color:#1E293B;line-height:1.7;font-style:italic;
                        margin-bottom:10px;border-left:3px solid #6366F1;padding-left:12px;}
  .prop-label{font-size:10px;font-weight:700;color:#94A3B8;
              text-transform:uppercase;letter-spacing:.06em;margin:10px 0 4px;}
  .prop-text{font-size:12px;color:#475569;line-height:1.6}
  .prop-outcome{color:#065F46;background:#ECFDF5;border-radius:6px;padding:8px 10px}
  .prop-link{font-size:11px;color:#6366F1;display:block;margin-top:4px;word-break:break-all}

  /* ── Footer ── */
  .report-footer{
    margin-top:48px;padding-top:20px;border-top:1px solid #E2E8F0;
    font-size:11px;color:#94A3B8;line-height:1.75;
  }
  .footer-brand{font-weight:700;color:#6366F1}
  .disclaimer{margin-top:4px;font-style:italic}
`;

// ─── Shared: open a window and print ──────────────────────────────────────
function openReportWindow(titleStr, docLabel, bodyHtml, date, siteUrl) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>OUR VASP BILL — ${e(titleStr)}</title>
  <style>${BASE_CSS}</style>
</head>
<body>

  <button class="print-btn no-print" onclick="window.print()">⬇ Save as PDF</button>

  <div class="report-header">
    <div class="brand-bar">
      <div>
        <div class="brand-name">OUR VASP BILL</div>
        <div class="brand-url">${e(siteUrl)}</div>
      </div>
      <div class="brand-right">
        <div class="brand-tagline">Civic analysis platform for Kenyan<br/>industry stakeholders</div>
        <span class="brand-doc-label">${e(docLabel)}</span>
      </div>
    </div>
    <div class="header-meta-bar">
      <span><strong>Kenya Draft VASP Regulations 2026</strong></span>
      <span>Generated ${e(date)}</span>
    </div>
  </div>

  ${bodyHtml}

  <div class="report-footer">
    <p>
      Generated by <span class="footer-brand">OUR VASP BILL</span> —
      a civic platform for Kenyan industry stakeholders to analyse and propose
      alternatives to the Draft VASP Regulations 2026.
    </p>
    <p>Visit: <strong>${e(siteUrl)}</strong> &nbsp;·&nbsp; Report date: ${e(date)}</p>
    <p class="disclaimer">
      This report is for educational and advocacy purposes only.
      It does not constitute legal advice. &copy; OUR VASP BILL ${new Date().getFullYear()}.
    </p>
  </div>

</body>
</html>`;

  const w = window.open('', '_blank');
  if (!w) {
    // eslint-disable-next-line no-alert
    alert('Please allow pop-ups for this site to generate the report, then try again.');
    return;
  }
  w.document.write(html);
  w.document.close();
  w.focus();
  setTimeout(() => w.print(), 650);
}

// ─── Shared: bill health overview HTML block ───────────────────────────────
function buildOverviewHtml() {
  const totalRegs   = REGULATIONS.length;
  const totalRed    = REGULATIONS.filter(r => r.severity === 'red').length;
  const totalYellow = REGULATIONS.filter(r => r.severity === 'yellow').length;
  const totalGreen  = REGULATIONS.filter(r => r.severity === 'green').length;
  const redPct      = Math.round((totalRed    / totalRegs) * 100);
  const yellowPct   = Math.round((totalYellow / totalRegs) * 100);
  const greenPct    = Math.round((totalGreen  / totalRegs) * 100);
  const domainStats = getDomainStats();

  return `
    <h2 class="section-title">Bill Health Overview</h2>
    <p class="section-sub">Full severity assessment of all ${totalRegs} provisions in the Kenya Draft VASP Regulations 2026.</p>

    <div class="scorecard">
      <div class="stat-card" style="background:#FEF2F2;border-color:#FECACA;">
        <div class="stat-num" style="color:#DC2626;">${totalRed}</div>
        <div class="stat-lbl" style="color:#DC2626;">Needs Redesign</div>
        <div class="stat-pct" style="color:#DC2626;">${redPct}%</div>
      </div>
      <div class="stat-card" style="background:#FFFBEB;border-color:#FDE68A;">
        <div class="stat-num" style="color:#D97706;">${totalYellow}</div>
        <div class="stat-lbl" style="color:#D97706;">Needs Adjustment</div>
        <div class="stat-pct" style="color:#D97706;">${yellowPct}%</div>
      </div>
      <div class="stat-card" style="background:#ECFDF5;border-color:#6EE7B7;">
        <div class="stat-num" style="color:#059669;">${totalGreen}</div>
        <div class="stat-lbl" style="color:#059669;">Can Enhance</div>
        <div class="stat-pct" style="color:#059669;">${greenPct}%</div>
      </div>
    </div>

    <div style="margin:14px 0 5px;">${stackedBar(totalRed, totalYellow, totalGreen, totalRegs, 14)}</div>
    <div style="display:flex;gap:20px;font-size:11px;font-weight:700;margin-bottom:6px;">
      <span style="color:#DC2626;">${redPct}% redesign</span>
      <span style="color:#D97706;">${yellowPct}% adjust</span>
      <span style="color:#059669;">${greenPct}% enhance</span>
    </div>
    <p style="font-size:12px;color:#64748B;font-style:italic;margin-bottom:20px;">
      ${redPct}% of ${totalRegs} provisions require fundamental redesign —
      one of the most restrictive VASP frameworks globally.
    </p>

    <div class="domain-header">
      <span>Severity by Domain</span>
      <div style="display:flex;gap:14px;">
        <span style="color:#DC2626;font-weight:700;">■ Redesign</span>
        <span style="color:#D97706;font-weight:700;">■ Adjust</span>
        <span style="color:#059669;font-weight:700;">■ Enhance</span>
      </div>
    </div>
    <div class="domain-grid">
      ${domainStats.map(s => `
        <div class="domain-row">
          <span class="d-icon">${e(s.domain.icon)}</span>
          <span class="d-label">${e(s.domain.label)}</span>
          <div style="flex:1;display:flex;align-items:center;">
            ${stackedBar(s.red, s.yellow, s.green, s.total, 8)}
          </div>
          <div class="d-badges">
            ${s.red    > 0 ? `<span class="badge" style="color:#DC2626;background:#FEF2F2;">${s.red}</span>`    : ''}
            ${s.yellow > 0 ? `<span class="badge" style="color:#D97706;background:#FFFBEB;">${s.yellow}</span>` : ''}
            ${s.green  > 0 ? `<span class="badge" style="color:#059669;background:#ECFDF5;">${s.green}</span>`  : ''}
          </div>
        </div>`).join('')}
    </div>`;
}

// ─── Export 1: Bill Health Overview report ─────────────────────────────────
export function downloadBillOverviewReport() {
  const date    = new Date().toLocaleDateString('en-KE', { year: 'numeric', month: 'long', day: 'numeric' });
  const siteUrl = window.location.origin;

  const top12Html = `
    <div style="height:1px;background:#E2E8F0;margin:32px 0;"></div>
    <h2 class="section-title">12 Most Critical Provisions</h2>
    <p class="section-sub">
      Every VASP must understand these regardless of business type.
      Ordered by severity of industry impact.
    </p>
    ${TOP_CRITICAL.map((reg, i) => {
      const s = SEV[reg.severity] || SEV.yellow;
      const snippet = reg.summary.length > 220 ? reg.summary.slice(0, 220) + '…' : reg.summary;
      return `
        <div class="critical-row">
          <div class="critical-rank" style="background:${s.bg};border-color:${s.border};color:${s.color};">
            ${i + 1}
          </div>
          <div style="flex:1;min-width:0;">
            <div class="critical-title">${e(reg.title)}</div>
            <div class="critical-ref">${e(reg.ref)}</div>
            <div class="critical-summary">${e(snippet)}</div>
          </div>
          <div class="sev-chip" style="background:${s.bg};border-color:${s.border};color:${s.color};">
            ${s.label}
          </div>
        </div>`;
    }).join('')}`;

  openReportWindow(
    'Bill Health Overview',
    'Bill Health Overview',
    buildOverviewHtml() + top12Html,
    date,
    siteUrl,
  );
}

// ─── Export 2: Provision analysis + overview + community proposals ─────────
export function downloadAnalysisReport(reg, analysis, proposals = []) {
  const sev     = SEV[reg.severity] || SEV.yellow;
  const date    = new Date().toLocaleDateString('en-KE', { year: 'numeric', month: 'long', day: 'numeric' });
  const siteUrl = window.location.origin;

  const impactHtml = analysis?.impact?.length > 30
    ? `<h2 class="section-title">Industry Impact</h2>
       <div class="impact-block" style="background:${sev.bg};border-color:${sev.border};">
         ${e(analysis.impact)}
       </div>`
    : '';

  const comparatorsHtml = analysis?.comparators?.length > 0
    ? `<h2 class="section-title">How Other Jurisdictions Handle This</h2>
       <p class="section-sub">Examples from jurisdictions with successful, proportionate VASP frameworks.</p>
       ${analysis.comparators.map(c => `
         <div class="comparator">
           <div class="cmp-header">${e(c.flag)}&nbsp; ${e(c.jurisdiction)}</div>
           <div class="cmp-body">${e(c.approach)}</div>
           <div class="cmp-source">Source: ${e(c.source)}</div>
         </div>`).join('')}`
    : '';

  const alternativesHtml = analysis?.alternatives?.length > 0
    ? `<h2 class="section-title">Alternative Frameworks to Consider</h2>
       <p class="section-sub">Concrete approaches drawn from comparator precedent.</p>
       <ol class="alternatives">
         ${analysis.alternatives.map(a => `<li>${e(a)}</li>`).join('')}
       </ol>`
    : '';

  const noAnalysisNote = !analysis
    ? `<div class="no-analysis">
         Detailed comparator analysis for this provision is being developed.
         Visit <strong>${e(siteUrl)}</strong> to submit your own proposal.
       </div>`
    : '';

  const proposalsHtml = proposals.length > 0
    ? `<h2 class="section-title">Community Proposals (${proposals.length})</h2>
       <p class="section-sub">
         Alternative proposals submitted by the Kenyan VASP industry community,
         ordered by community support.
       </p>
       ${proposals.map((p, i) => `
         <div class="proposal">
           <div class="proposal-meta">
             <div class="proposal-rank">${i + 1}</div>
             <div style="flex:1;">
               <span class="proposal-author">${e(p.authorName || 'Anonymous')}</span>
             </div>
             <div class="proposal-votes">▲ ${p.upvotes || 0} supporter${(p.upvotes || 0) !== 1 ? 's' : ''}</div>
           </div>
           <div class="proposal-suggestion">"${e(p.suggestion)}"</div>
           ${p.evidence ? `
             <div class="prop-label">Evidence</div>
             <div class="prop-text">${e(p.evidence)}</div>
             ${p.evidenceLink ? `<a href="${e(p.evidenceLink)}" class="prop-link">↗ ${e(p.evidenceLink)}</a>` : ''}
           ` : ''}
           ${p.outcome ? `
             <div class="prop-label">Intended Outcome</div>
             <div class="prop-text prop-outcome">${e(p.outcome)}</div>
           ` : ''}
         </div>`).join('')}`
    : `<h2 class="section-title">Community Proposals</h2>
       <div class="no-analysis">
         No community proposals have been submitted for this provision yet.
         Be the first at <strong>${e(siteUrl)}</strong>.
       </div>`;

  const body = `
    ${buildOverviewHtml()}

    <div style="height:1px;background:#E2E8F0;margin:32px 0;"></div>

    <div class="sev-badge" style="background:${sev.bg};color:${sev.color};border-color:${sev.border};">
      ${sev.label}
    </div>
    <div class="provision-title">${e(reg.title)}</div>
    <div class="provision-ref">${e(reg.ref)}</div>

    <h2 class="section-title">What the Bill Says</h2>
    <div class="summary-block" style="border-left-color:${sev.color};">${e(reg.summary)}</div>

    ${impactHtml}
    ${comparatorsHtml}
    ${alternativesHtml}
    ${noAnalysisNote}

    <div style="height:1px;background:#E2E8F0;margin:32px 0;"></div>

    ${proposalsHtml}`;

  openReportWindow(reg.title, 'Provision Analysis Report', body, date, siteUrl);
}
