// Sample proposals shown in ProposalsTab when Firestore has no real data.
// Used to preview and validate ProposalCard component design.
// All entries have isSample: true — upvote interactions are blocked.

const t = (hoursAgo) => ({
  toDate: () => new Date(Date.now() - hoursAgo * 3_600_000),
});

export const SAMPLE_PROPOSALS = [
  {
    id: 'sample-1',
    isSample: true,
    regulationId: 'capital-requirements',
    regulationTitle: 'Minimum Financial and Capital Requirements',
    regulationRef: 'Regulation 82, Fifth Schedule',
    suggestion:
      'Replace the flat capital structure with a risk-tiered model based on monthly transaction volume:\n\n• Tier 1 (< KES 50M/month): KES 2.5M paid-up\n• Tier 2 (KES 50M–500M/month): KES 15M paid-up\n• Tier 3 (> KES 500M/month): KES 50M paid-up\n\nThe KES 150M flat requirement for exchanges equals the 3-year projected revenue of most Kenyan crypto startups. A risk-proportionate tiered approach mirrors Singapore\'s Payment Services Act (MAS) and the EU MiCA framework. Capital requirements should protect consumers, not prevent competition.',
    evidence:
      'Singapore\'s MAS Payment Services Act (2020) uses a tiered model: Standard Payment Institution vs Major Payment Institution. EU MiCA (2023) employs proportionate capital requirements by issuance volume. Kenya\'s own Banking Act uses the same principle for microfinance vs commercial banks.',
    evidenceLink: 'https://www.mas.gov.sg/regulation/acts/payment-services-act',
    outcome:
      'Reduces the capital barrier for 90%+ of current Kenyan VASP operators. Enables an estimated 200–400 new licence applications within the first year of enactment.',
    authorName: 'Wanjiru N.',
    authorInitials: 'WN',
    authorPhoneHash: 'sample-hash-1',
    upvotes: 47,
    voters: {},
    createdAt: t(2),
  },
  {
    id: 'sample-2',
    isSample: true,
    regulationId: 'shareholding-cap',
    regulationTitle: 'Shareholding Cap (33.3%)',
    regulationRef: 'Regulation 28',
    suggestion:
      'Remove the 33.3% shareholding cap entirely. Replace with a mandatory notification and prior-approval regime:\n\n• Any person acquiring >25% must notify the authority within 5 business days\n• Any person acquiring >50% must seek prior approval\n• Ultimate beneficial ownership must be disclosed regardless of holding size\n• Annual disclosure of any holding >10%\n\nThe current cap structurally prevents founder-led companies from scaling and makes VC investment effectively impossible.',
    evidence:
      'No major virtual asset jurisdiction — UK FCA, Singapore MAS, UAE VARA, EU MiCA, or the US — imposes a blanket 33.3% cap. Bank regulations in comparable markets use notification thresholds (20–25%), not hard caps. The UK FCA uses a change-of-control notification approach.',
    evidenceLink: '',
    outcome:
      'Enables founders to raise growth capital without forced dilution. Makes Kenya investable for global crypto VCs. Estimated to unlock KES 2–5B in venture capital flows within 18 months.',
    authorName: 'Brian K.',
    authorInitials: 'BK',
    authorPhoneHash: 'sample-hash-2',
    upvotes: 38,
    voters: {},
    createdAt: t(5),
  },
  {
    id: 'sample-3',
    isSample: true,
    regulationId: 'stablecoin-interest-ban',
    regulationTitle: 'Prohibition of Granting Interest on Stablecoins',
    regulationRef: 'Regulation 69',
    suggestion:
      'Amend the blanket prohibition to a regulated yield framework:\n\n• Permit licensed issuers to offer yield derived exclusively from returns on reserve assets\n• Cap yield distribution at 80% of net reserve income (20% retained as capital buffer)\n• Require monthly disclosure of yield calculation methodology and reserve composition\n• Prohibit yield derived from re-hypothecation or lending of consumer stablecoins\n• Require prominent disclosure that yield is not guaranteed and is not a deposit product\n\nThis preserves the prohibition on speculative or synthetic yield — the actual risk — while permitting transparent, asset-backed yield.',
    evidence:
      'EU MiCA (Article 40) prohibits interest on e-money tokens but permits asset managers to distribute investment returns on reserve assets under a separate framework. The distinction between speculative yield (banned) and reserve income distribution (permissible) is established in EU law.',
    evidenceLink: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R1114',
    outcome:
      'Enables Kenyan stablecoin issuers to compete globally. Creates additional revenue supporting the KES 500M capital threshold. Preserves consumer protection by limiting yield to actual reserve income.',
    authorName: 'Amara O.',
    authorInitials: 'AO',
    authorPhoneHash: 'sample-hash-3',
    upvotes: 31,
    voters: {},
    createdAt: t(8),
  },
  {
    id: 'sample-4',
    isSample: true,
    regulationId: 'three-year-audit-history',
    regulationTitle: '3-Year Audit History Requirement',
    regulationRef: 'Regulation 5(2)(i)',
    suggestion:
      'Replace the 3-year audited financials requirement with a risk-tiered alternative:\n\n• New entrants (<3 years old): auditor-verified opening balance sheet + 24-month capital adequacy plan + evidence of seed funding from accredited investors\n• Established entities (3+ years): submit 2 years of audited financials\n• Category A licensees (exchanges, stablecoin issuers, wallet providers): full 3-year requirement remains\n\nAdd a provisional licence valid for 12 months, subject to quarterly reporting, upgradeable to full licence.',
    evidence:
      'UK FCA explicitly accommodates new businesses with projected financials in lieu of historical accounts. Singapore MAS allows startups to apply with 12-month financial projections. The current drafting creates an effective 3-year waiting period before any Kenyan crypto startup can legally operate.',
    evidenceLink: '',
    outcome:
      'Removes the startup entry barrier. A provisional licence pathway would generate early fee revenue for the regulator while maintaining oversight. Enables the next generation of Kenyan VASP entrepreneurs.',
    authorName: 'Kofi A.',
    authorInitials: 'KA',
    authorPhoneHash: 'sample-hash-4',
    upvotes: 24,
    voters: {},
    createdAt: t(26),
  },
  {
    id: 'sample-5',
    isSample: true,
    regulationId: 'coordination-committee',
    regulationTitle: 'Coordination Committee Membership',
    regulationRef: 'Regulation 142, Sixth Schedule',
    suggestion:
      'Restructure the Coordination Committee to separate financial regulation from intelligence functions:\n\nFinancial Regulation Sub-committee (decision-making authority): National Treasury (Chair), CBK, CMA, Financial Reporting Centre, NIFCA, Attorney General\n\nSecurity Liaison Group (advisory only, no vote): Asset Recovery Agency, DCI (financial crimes unit only), Communications Authority\n\nNIS and NCTC should not be committee members. Their involvement in routine regulatory decisions normalises surveillance of lawful financial activity and creates chilling effects on innovation.',
    evidence:
      'No comparable financial services coordination body — FSB, FATF, or national equivalents — includes intelligence agencies as voting members. The Financial Stability Board maintains clear separation between prudential regulation and law enforcement. DCI involvement should be limited to financial crimes units.',
    evidenceLink: 'https://www.fsb.org/about/',
    outcome:
      'Depoliticises VASP regulation. Reduces compliance risk for internationally operating VASPs facing due diligence scrutiny about government surveillance involvement. Makes Kenya a credible jurisdiction for global crypto businesses.',
    authorName: 'Sarah M.',
    authorInitials: 'SM',
    authorPhoneHash: 'sample-hash-5',
    upvotes: 19,
    voters: {},
    createdAt: t(38),
  },
];
