// src/domain-config.js
// Domain groupings — user-facing language, not legislative Part numbers.
// These are the "sections" users navigate to on both the Analysis and Propose tabs.

import { REGULATIONS } from './regulations';

// ─── Part → Domain mapping ────────────────────────────────────────────────
const PART_DOMAIN_MAP = {
  'part-i':    'entry',
  'part-ii':   'entry',
  'part-iii':  'operations',
  'part-iv':   'governance',
  'part-v':    'enforcement',
  'part-vi':   'icos',
  'part-vii':  'icos',
  'part-viii': 'stablecoins',
  'part-ix':   'operations',
  'part-x':    'conduct',
  'part-xi':   'conduct',
  'part-xii':  'conduct',
  'part-xiii': 'conduct',
  'part-xiv':  'enforcement',
  'part-xv':   'enforcement',
  'schedules': 'entry',     // Schedules I–V are licensing/capital docs
  'other':     'operations',
};

// Override for specific regulations that don't fit their part's domain
const REG_DOMAIN_OVERRIDE = {
  'sixth-schedule-coordination': 'enforcement',
};

// ─── Get domain ID for a regulation ──────────────────────────────────────
export function getDomain(reg) {
  if (REG_DOMAIN_OVERRIDE[reg.id]) return REG_DOMAIN_OVERRIDE[reg.id];
  return PART_DOMAIN_MAP[reg.part] || 'operations';
}

// ─── Domain definitions ───────────────────────────────────────────────────
export const DOMAINS = [
  {
    id: 'all',
    label: 'All Sections',
    icon: '◈',
    description: 'Every provision in the draft bill',
  },
  {
    id: 'entry',
    label: 'Licensing & Entry',
    icon: '🔑',
    description: 'Fees, capital, application requirements, licence transfer',
  },
  {
    id: 'governance',
    label: 'Governance',
    icon: '🏛',
    description: 'Board composition, ICPAK mandates, director requirements',
  },
  {
    id: 'operations',
    label: 'Ongoing Operations',
    icon: '⚙️',
    description: 'Reporting, record-keeping, capital maintenance, compliance',
  },
  {
    id: 'icos',
    label: 'ICOs & Tokenisation',
    icon: '🪙',
    description: 'Token offerings, white papers, ICO approvals, RWA tokenisation',
  },
  {
    id: 'stablecoins',
    label: 'Wallets & Stablecoins',
    icon: '💵',
    description: 'Stablecoin issuance, reserves, wallet provider obligations',
  },
  {
    id: 'conduct',
    label: 'Market Conduct',
    icon: '📊',
    description: 'Cybersecurity, consumer protection, advertising, market integrity',
  },
  {
    id: 'enforcement',
    label: 'Enforcement & Seizure',
    icon: '⚖️',
    description: 'Freezing orders, seizure, statutory management, criminal penalties',
  },
];

// ─── Business type definitions ─────────────────────────────────────────────
// Each business type highlights the domains most relevant to it.
// Selecting a type pre-navigates users to the right section.
export const BUSINESS_TYPES = [
  { id: 'all',        label: 'All VASPs',         primaryDomains: ['entry', 'operations', 'enforcement'] },
  { id: 'exchange',   label: 'Exchange',           primaryDomains: ['entry', 'operations', 'conduct', 'enforcement'] },
  { id: 'stablecoin', label: 'Stablecoin Issuer',  primaryDomains: ['entry', 'stablecoins', 'enforcement'] },
  { id: 'wallet',     label: 'Wallet Provider',    primaryDomains: ['entry', 'stablecoins', 'conduct'] },
  { id: 'ico',        label: 'Token/ICO Issuer',   primaryDomains: ['entry', 'icos', 'conduct'] },
  { id: 'adviser',    label: 'Investment Adviser', primaryDomains: ['entry', 'governance', 'conduct'] },
];

// ─── Top Critical Provisions ──────────────────────────────────────────────
// These are the 12 regulations every VASP must understand regardless of type.
// Ordered by severity of industry impact.
export const TOP_CRITICAL_IDS = [
  'capital-requirements',         // KES 150M–500M — highest entry barrier globally
  'fees-payable',                 // 0.05% per-counterparty transaction tax
  'three-year-audit-history',     // bars every startup under 3 years
  'shareholding-cap',             // kills VC funding model
  'freezing-order-obligations',   // compels private key handover
  'provision-of-information',     // warrantless premises entry at any time
  'stablecoin-interest-ban',      // kills stablecoin economic model
  'advertising-prohibition',      // 1-year criminal imprisonment
  'compliance-officer',           // no outsourcing even for 2-person startups
  'transaction-metadata',         // 7-year blockchain metadata retention
  'statutory-manager',            // government can seize company by gazette notice
  'coordination-committee',       // NIS/DCI/NCTC as permanent regulatory members
];

export const TOP_CRITICAL = TOP_CRITICAL_IDS
  .map(id => REGULATIONS.find(r => r.id === id))
  .filter(Boolean);

// ─── Domain stats helper ──────────────────────────────────────────────────
// Pre-compute severity counts per domain for the overview chart.
export function getDomainStats() {
  return DOMAINS.filter(d => d.id !== 'all').map(domain => {
    const regs  = REGULATIONS.filter(r => getDomain(r) === domain.id);
    const red   = regs.filter(r => r.severity === 'red').length;
    const yellow= regs.filter(r => r.severity === 'yellow').length;
    const green = regs.filter(r => r.severity === 'green').length;
    const total = regs.length;
    return { domain, red, yellow, green, total };
  });
}

// ─── Filter helper ────────────────────────────────────────────────────────
export function filterByDomain(regs, domainId) {
  if (domainId === 'all') return regs;
  return regs.filter(r => getDomain(r) === domainId);
}
