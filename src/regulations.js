// src/regulations.js
// Transforms the raw extracted regulations by adding severity + part grouping.
// Source data lives in regulations_reviewed.js — do not edit that file.

import { REGULATIONS as RAW } from './regulations_reviewed.js';

// RED    = anti-startup, anti-competitive — needs complete redesign (~47%)
// YELLOW = right intent, wrong calibration — needs adjustment (~42%)
// GREEN  = broadly sound policy — can enhance (~11%)
const SEVERITY_MAP = {

  // ── RED: Needs Complete Redesign ──────────────────────────────────────
  // Entry + capital barriers
  'fees-payable':                    'red', // brutal transaction fees + renewal formula
  'three-year-audit-history':        'red', // bars every startup under 3 years old
  'licence-transfer-lockin':         'red', // 36-month M&A lock-in kills exits
  'forex-conversion-authorisation':  'red', // hard Dec-31 annual expiry regardless of compliance
  'renewal-of-authorisation':        'red', // annual forced renewal with cliff expiry
  'capital-requirements':            'red', // KES 150M–500M + stack per activity
  'first-schedule-fees':             'red', // 0.05% per counterparty + 0.5% of ICO offer
  'second-schedule-application-form':'red', // 30+ required attachments
  'third-schedule-business-plan':    'red', // 12-section hyper-detailed plan required at entry
  'fourth-schedule-fit-proper':      'red', // 3 sworn forms, credit reports, 5-yr referees
  'fifth-schedule-capital':          'red', // same issue as capital-requirements: schedule level

  // Structural + governance overreach
  'shareholding-cap':                'red', // hard 33.3% cap — kills VC investment + founder control
  'icpak-mandate':                   'red', // CFO + auditor must be ICPAK members — talent bottleneck
  'board-of-directors':              'red', // 1/3 independent directors forced on any-size startup
  'governance-arrangements':         'red', // mandatory separate BU, management + books for small ops

  // Reporting + compliance burden
  'alteration-of-facts':             'red', // impossibly broad notification triggers (any incident)
  'grounds-for-rejection':           'red', // "public interest" veto — no objective standard
  'revocation-of-authorisation':     'red', // "public interest" revocation — unchecked discretion
  'human-technology-resources':      'red', // "to satisfaction of authority" — no objective test
  'proper-markets':                  'red', // "economic good of country" — unlimited discretion
  'business-default-rules':          'red', // ALL exchange rules require regulator pre-approval
  'business-continuity-plan':        'red', // KES 3M penalty for any non-compliance
  'record-keeping-reports':          'red', // monthly reports within 10 days + daily incidents
  'transaction-metadata':            'red', // 7-yr retention of keys-adjacent blockchain metadata
  'provision-of-information':        'red', // warrantless premises entry at any time
  'compliance-officer':              'red', // no outsourcing allowed even for 2-person startups
  'risk-management':                 'red', // blank-check deference to "standards issued from time to time"
  'accounting-records':              'red', // 7-year digital preservation burden
  'licensee-reports':                'red', // monthly financials within 15 days
  'external-auditor':                'red', // ICPAK-only + 4-yr max tenure + authority scope extension
  'insurance-coverage':              'red', // Kenyan insurer only; market barely exists

  // Technology + platform pre-approval
  'trading-platform-approval':       'red', // all platforms pre-approved before any use
  'outsourcing-agreements':          'red', // 30-day pre-approval for ANY material service switch
  'outsourcing-custodial':           'red', // only Kenyan licensed wallet providers allowed
  'systems-and-control':             'red', // KES 10M company fine + warrantless entry repeated
  'cybersecurity-strategy':          'red', // KES 3M penalty + annual board submission burden
  'cybersecurity-audit':             'red', // warrantless entry repeated + unlimited audit scope
  'cybersecurity-risk-reporting':    'red', // 24-hr report required for even FAILED attempts
  'cybersecurity-audit-report':      'red', // KES 3M penalty for any report deficiency

  // Stablecoin killers
  'stablecoin-offer-requirements':   'red', // 90-day pre-notification — 3-month market entry delay
  'stablecoin-interest-ban':         'red', // complete ban on any yield, including reserve returns
  'stablecoin-reserve-assets':       'red', // only govt securities ≤90 days — no money market funds
  'stablecoin-reserve-custody':      'red', // CBK-approved custodians only — state-controlled monopoly
  'stablecoin-investment-of-funds':  'red', // Kenya-only reserve investment — no global diversification
  'stablecoin-audits':               'red', // monthly proof-of-reserve by external auditor — crushing cost
  'stablecoin-reporting':            'red', // DAILY transaction averages + monthly full report
  'stablecoin-modification':         'red', // pre-approval for any business model change
  'stablecoin-liability':            'red', // broad personal director liability for white paper content

  // Law enforcement + surveillance overreach
  'intervention-management':         'red', // vague "crisis" trigger for takeover of a licensee
  'statutory-manager':               'red', // regulator can seize company via gazette notice
  'statutory-manager-powers':        'red', // statutory manager can sell assets + declare moratoriums
  'freezing-seizure-licensee-obligations': 'red', // broad data-sharing with any "competent authority"
  'freezing-order-obligations':      'red', // compels surrender of cryptographic KEYS to authorities
  'preservation-of-value':           'red', // officer can force-convert volatile assets to fiat
  'seizure-order-obligations':       'red', // seizure of hardware wallets + seed phrase backups
  'coordination-committee':          'red', // NIS + DCI + NCTC as permanent regulatory members
  'sixth-schedule-coordination':     'red', // same issue memorialised in schedule

  // Advertising — disproportionate penalties
  'advertising-prohibition':         'red', // 1-yr imprisonment for unlicensed advertising
  'advertisement-general-requirements': 'red', // KES 5M penalty for general ad non-compliance
  'advertisement-content':           'red', // KES 5M penalty for content issues
  'performance-information':         'red', // KES 5M + extremely detailed forecast rules
  'duty-person-advertising':         'red', // 2-yr imprisonment for advertiser conduct
  'third-party-advertising-duties':  'red', // 2-yr imprisonment for influencer/3rd-party non-disclosure
  'internet-advertisement':          'red', // requires paper copies of internet ads in 2026
  'prohibited-internet-advertising': 'red', // 11-item prescriptive list in primary regulation
  'ad-record-keeping':               'red', // 7-yr retention for all advertising records

  // Consumer + operational overreach
  'consumer-complaints':             'red', // 3-month response time + 7-yr records
  'consumer-care-system':            'red', // 6-month deadline for extensive care system
  'consumer-service-agreement':      'red', // must submit copy of every service agreement to authority
  'consumer-protection':             'red', // "standard the authority may determine" — unchecked
  'consumer-asset-tech-controls':    'red', // KES 3M penalty for any technology control deficiency
  'designation-virtual-asset-service': 'red', // sweeping designation power; no objective threshold

  // ── YELLOW: Needs Adjustment ──────────────────────────────────────────
  'application-for-licence':         'yellow', // comprehensive but needed; simplification required
  'issuance-of-licence':             'yellow', // standard but conditions can be arbitrary
  'ongoing-notifications':           'yellow', // form/manner at regulator discretion
  'ongoing-obligations':             'yellow', // fair intent; reporting content needs clearer scope
  'consumer-disclosure':             'yellow', // mostly good; some detail is excessive
  'consumer-information':            'yellow', // suitability good; "reasonable steps" vague
  'register-of-interests':           'yellow', // standard; annual review is reasonable
  'ownership-changes':               'yellow', // framework standard; 0.25% fee is the issue
  'conflict-of-interest':            'yellow', // comprehensive; information barriers are good
  'point-of-service-info':           'yellow', // standard; "conspicuously" needs definition
  'customer-due-diligence':          'yellow', // standard AML; needs proportionality tiers
  'due-diligence-trading':           'yellow', // smart-contract audit needed but cost burden
  'transaction-confirmation':        'yellow', // end-of-day is standard but slightly dated
  'off-market-transactions':         'yellow', // reporting needed; "manner specified" too vague
  'inspections':                     'yellow', // routine inspections fine; "continuous surveillance" overreach
  'board-role':                      'yellow', // standard board duties; committee powers limited
  'ceo-requirements':                'yellow', // fit-and-proper reasonable; "relevant fields" vague
  'ico-application':                 'yellow', // needed framework; 0.5% fee is the issue
  'ico-determination':               'yellow', // good consumer protection; "insufficient" too vague
  'ico-validity':                    'yellow', // 12 months fair; could be extended to 18
  'ico-white-paper':                 'yellow', // disclosure is good; KES 3M penalty disproportionate
  'ico-advertising-duration':        'yellow', // standard control; KES 3M penalty disproportionate
  'ico-extension':                   'yellow', // reasonable; "against public policy" too vague
  'change-of-promoter':              'yellow', // reasonable; 15 working days is tight
  'ico-register':                    'yellow', // standard registry; fine with minor cleanup
  'listing-requirements':            'yellow', // needed; authority delisting power is broad
  'tokenization-licence':            'yellow', // independent valuation needed; custodian agreement good
  'tokenized-rwa-issuance':          'yellow', // reasonable; same issues as ICO framework
  'tokenized-rwa-white-paper':       'yellow', // comprehensive; appropriate for RWA
  'listing-tokenized-assets':        'yellow', // standard listing process; fine
  'wallet-provider-responsibilities':'yellow', // many consumer protections good; quarterly statements dated
  'stablecoin-issuance-licence':     'yellow', // reasonable application; investment policy needed
  'stablecoin-white-paper':          'yellow', // 30-day pre-notification standard; detail is good
  'stablecoin-white-paper-publication': 'yellow', // standard; website publication requirement fine
  'stablecoin-conflicts-of-interest':'yellow', // standard conflict management; fine
  'stablecoin-redemption':           'yellow', // at-par good; KES redemption requirement adds complexity
  'stablecoin-delisting-halting':    'yellow', // needed power; "before approval" pre-emptive concern
  'stablecoin-marketing':            'yellow', // good transparency; no-marketing-before-whitepaper is slightly restrictive
  'virtual-asset-manager-capital':   'yellow', // risk-based capital reasonable; 10% related-party limit good
  'misrepresentation-capital':       'yellow', // anti-fraud is good; "temporarily inflate" is vague
  'exchange-reports':                'yellow', // monthly volumes standard; daily electronic reports add burden
  'manager-reports':                 'yellow', // quarterly AUM reports standard for asset managers
  'financial-year':                  'yellow', // Dec-31 year-end forces alignment; minor constraint
  'consumer-funds-management':       'yellow', // segregation good; end-of-day placement requirement standard
  'consumer-asset-safeguarding':     'yellow', // good intent; "satisfactory arrangements" too vague
  'third-party-claims-protection':   'yellow', // good protection; pledging consumer assets ban needed
  'consumer-records-accounts':       'yellow', // standard record-keeping; reconciliation requirement good
  'standards-of-conduct':            'yellow', // good intent; "high standard" needs measurable criteria
  'consumer-risk-understanding':     'yellow', // good; "reasonable steps" needs objective test
  'market-abuse-deterrence':         'yellow', // good intent; "appropriate measures" too vague
  'agent-arrangements':              'yellow', // standard agency liability; pre-approval for services needed
  'cold-calling':                    'yellow', // rules reasonable; 8am–5pm limits too strict for global ops
  'fees-costs-in-ads':               'yellow', // simple requirement; fine in principle
  'risk-warning-disclosures':        'yellow', // right requirement; KES 5M penalty disproportionate
  'freezing-seizure-definitions':    'yellow', // broad "authorised officer" definition concerning
  'freezing-seizure-orders':         'yellow', // court-order process is right; scope is broad
  'custody-seized-assets':           'yellow', // chain-of-custody standard; government wallet security concerns
  'failure-to-comply-seizure':       'yellow', // KES 10M + 5yrs may be excessive for technical failures
  'coordination-committee-mandate':  'yellow', // information sharing with intelligence agencies is concerning
  'coordination-committee-conduct':  'yellow', // quarterly meetings standard; sub-committees fine
  'voluntary-liquidation':           'yellow', // regulatory approval needed; process is standard
  'involuntary-liquidation':         'yellow', // regulator's participation right is standard
  'other':                           'yellow', // general proposals

  // ── GREEN: Broadly Sound — Can Enhance ───────────────────────────────
  'commencement-of-business':        'green', // 12-month window to start is reasonable
  'false-misleading-statements':     'green', // clear anti-fraud with proportionate penalties
  'employee-disclosure':             'green', // whistleblower protections are essential and well-drafted
  'fair-allocation':                 'green', // standard order allocation — protects consumers
  'timely-allocation':               'green', // standard; unambiguous
  'auditor-report':                  'green', // 7-day qualified report notice is standard best practice
  'stablecoin-issuance-redeemability': 'green', // at-par redemption with no fee is pro-consumer
  'stablecoin-ongoing-information':  'green', // monthly public reserve transparency is excellent
  'insider-trading':                 'green', // standard prohibition; proportionate penalties
  'market-manipulation':             'green', // standard prohibition
  'false-trading-market-rigging':    'green', // standard prohibition
  'fraudulent-inducement':           'green', // standard prohibition
  'manipulative-devices':            'green', // standard prohibition
  'false-misleading-inducement':     'green', // standard prohibition
  'front-running':                   'green', // standard prohibition
  'churning':                        'green', // standard prohibition; protects consumers from over-trading
  'notice-to-penalise':              'green', // due process before penalties — this is the model for all
};

const PART_MAP = {
  // Part I — Preliminary
  'fees-payable': 'part-i',

  // Part II — Licensing and Authorization
  'application-for-licence': 'part-ii',
  'three-year-audit-history': 'part-ii',
  'issuance-of-licence': 'part-ii',
  'commencement-of-business': 'part-ii',
  'alteration-of-facts': 'part-ii',
  'grounds-for-rejection': 'part-ii',
  'false-misleading-statements': 'part-ii',
  'licence-transfer-lockin': 'part-ii',
  'forex-conversion-authorisation': 'part-ii',
  'renewal-of-authorisation': 'part-ii',
  'revocation-of-authorisation': 'part-ii',

  // Part III — Ongoing Requirements
  'ongoing-notifications': 'part-iii',
  'ongoing-obligations': 'part-iii',
  'human-technology-resources': 'part-iii',
  'proper-markets': 'part-iii',
  'business-default-rules': 'part-iii',
  'business-continuity-plan': 'part-iii',
  'transaction-metadata': 'part-iii',
  'employee-disclosure': 'part-iii',
  'consumer-disclosure': 'part-iii',
  'consumer-information': 'part-iii',
  'record-keeping-reports': 'part-iii',
  'provision-of-information': 'part-iii',
  'register-of-interests': 'part-iii',
  'shareholding-cap': 'part-iii',
  'ownership-changes': 'part-iii',
  'conflict-of-interest': 'part-iii',
  'point-of-service-info': 'part-iii',
  'customer-due-diligence': 'part-iii',
  'due-diligence-trading': 'part-iii',
  'transaction-confirmation': 'part-iii',
  'fair-allocation': 'part-iii',
  'timely-allocation': 'part-iii',
  'off-market-transactions': 'part-iii',
  'inspections': 'part-iii',
  'compliance-officer': 'part-iii',
  'risk-management': 'part-iii',

  // Part IV — Corporate Governance
  'governance-arrangements': 'part-iv',
  'board-of-directors': 'part-iv',
  'board-role': 'part-iv',
  'ceo-requirements': 'part-iv',
  'icpak-mandate': 'part-iv',

  // Part V — Intervention and Statutory Management
  'intervention-management': 'part-v',
  'statutory-manager': 'part-v',
  'statutory-manager-powers': 'part-v',

  // Part VI — ICO and Listing Requirements
  'ico-application': 'part-vi',
  'ico-determination': 'part-vi',
  'trading-platform-approval': 'part-vi',
  'ico-validity': 'part-vi',
  'ico-white-paper': 'part-vi',
  'ico-advertising-duration': 'part-vi',
  'ico-extension': 'part-vi',
  'change-of-promoter': 'part-vi',
  'ico-register': 'part-vi',
  'listing-requirements': 'part-vi',

  // Part VII — Tokenization of Real-World Assets
  'tokenization-licence': 'part-vii',
  'tokenized-rwa-issuance': 'part-vii',
  'tokenized-rwa-white-paper': 'part-vii',
  'listing-tokenized-assets': 'part-vii',

  // Part VIII — Wallet Providers and Stablecoin Issuers
  'wallet-provider-responsibilities': 'part-viii',
  'stablecoin-issuance-licence': 'part-viii',
  'stablecoin-white-paper': 'part-viii',
  'stablecoin-white-paper-publication': 'part-viii',
  'stablecoin-offer-requirements': 'part-viii',
  'stablecoin-issuance-redeemability': 'part-viii',
  'stablecoin-interest-ban': 'part-viii',
  'stablecoin-modification': 'part-viii',
  'stablecoin-liability': 'part-viii',
  'stablecoin-reserve-assets': 'part-viii',
  'stablecoin-reserve-custody': 'part-viii',
  'stablecoin-investment-of-funds': 'part-viii',
  'stablecoin-ongoing-information': 'part-viii',
  'stablecoin-conflicts-of-interest': 'part-viii',
  'stablecoin-redemption': 'part-viii',
  'stablecoin-marketing': 'part-viii',
  'stablecoin-audits': 'part-viii',
  'stablecoin-delisting-halting': 'part-viii',
  'stablecoin-reporting': 'part-viii',

  // Part IX — Capital and Financial Requirements
  'capital-requirements': 'part-ix',
  'misrepresentation-capital': 'part-ix',
  'virtual-asset-manager-capital': 'part-ix',
  'insurance-coverage': 'part-ix',
  'accounting-records': 'part-ix',
  'external-auditor': 'part-ix',
  'auditor-report': 'part-ix',
  'licensee-reports': 'part-ix',
  'exchange-reports': 'part-ix',
  'manager-reports': 'part-ix',
  'financial-year': 'part-ix',

  // Part X — Cybersecurity
  'cybersecurity-strategy': 'part-x',
  'systems-and-control': 'part-x',
  'cybersecurity-audit': 'part-x',
  'cybersecurity-risk-reporting': 'part-x',
  'cybersecurity-audit-report': 'part-x',

  // Part XI — Safekeeping and Management of Consumer Assets
  'consumer-asset-safeguarding': 'part-xi',
  'consumer-protection': 'part-xi',
  'consumer-service-agreement': 'part-xi',
  'consumer-funds-management': 'part-xi',
  'consumer-asset-tech-controls': 'part-xi',
  'third-party-claims-protection': 'part-xi',
  'consumer-records-accounts': 'part-xi',

  // Part XII — Market Conduct and Related Offences
  'standards-of-conduct': 'part-xii',
  'designation-virtual-asset-service': 'part-xii',
  'consumer-risk-understanding': 'part-xii',
  'consumer-complaints': 'part-xii',
  'consumer-care-system': 'part-xii',
  'market-abuse-deterrence': 'part-xii',
  'outsourcing-agreements': 'part-xii',
  'outsourcing-custodial': 'part-xii',
  'agent-arrangements': 'part-xii',
  'insider-trading': 'part-xii',
  'market-manipulation': 'part-xii',
  'false-trading-market-rigging': 'part-xii',
  'fraudulent-inducement': 'part-xii',
  'manipulative-devices': 'part-xii',
  'false-misleading-inducement': 'part-xii',
  'front-running': 'part-xii',
  'churning': 'part-xii',
  'cold-calling': 'part-xii',

  // Part XIII — Advertisements and Promotions
  'advertising-prohibition': 'part-xiii',
  'advertisement-general-requirements': 'part-xiii',
  'advertisement-content': 'part-xiii',
  'performance-information': 'part-xiii',
  'fees-costs-in-ads': 'part-xiii',
  'risk-warning-disclosures': 'part-xiii',
  'duty-person-advertising': 'part-xiii',
  'third-party-advertising-duties': 'part-xiii',
  'internet-advertisement': 'part-xiii',
  'prohibited-internet-advertising': 'part-xiii',
  'ad-record-keeping': 'part-xiii',

  // Part XIV — Freezing and Seizure Orders
  'freezing-seizure-definitions': 'part-xiv',
  'freezing-seizure-orders': 'part-xiv',
  'freezing-seizure-licensee-obligations': 'part-xiv',
  'freezing-order-obligations': 'part-xiv',
  'preservation-of-value': 'part-xiv',
  'seizure-order-obligations': 'part-xiv',
  'custody-seized-assets': 'part-xiv',
  'failure-to-comply-seizure': 'part-xiv',

  // Part XV — General Provisions
  'coordination-committee': 'part-xv',
  'coordination-committee-mandate': 'part-xv',
  'coordination-committee-conduct': 'part-xv',
  'notice-to-penalise': 'part-xv',
  'voluntary-liquidation': 'part-xv',
  'involuntary-liquidation': 'part-xv',

  // Schedules
  'first-schedule-fees': 'schedules',
  'second-schedule-application-form': 'schedules',
  'third-schedule-business-plan': 'schedules',
  'fourth-schedule-fit-proper': 'schedules',
  'fifth-schedule-capital': 'schedules',
  'sixth-schedule-coordination': 'schedules',

  'other': 'other',
};

export const PARTS = [
  { id: 'all',       label: 'All Regulations' },
  { id: 'part-i',   label: 'Part I — Preliminary' },
  { id: 'part-ii',  label: 'Part II — Licensing' },
  { id: 'part-iii', label: 'Part III — Ongoing Requirements' },
  { id: 'part-iv',  label: 'Part IV — Corporate Governance' },
  { id: 'part-v',   label: 'Part V — Intervention' },
  { id: 'part-vi',  label: 'Part VI — ICO & Listing' },
  { id: 'part-vii', label: 'Part VII — Tokenization' },
  { id: 'part-viii',label: 'Part VIII — Wallets & Stablecoins' },
  { id: 'part-ix',  label: 'Part IX — Capital & Finance' },
  { id: 'part-x',   label: 'Part X — Cybersecurity' },
  { id: 'part-xi',  label: 'Part XI — Consumer Assets' },
  { id: 'part-xii', label: 'Part XII — Market Conduct' },
  { id: 'part-xiii',label: 'Part XIII — Advertising' },
  { id: 'part-xiv', label: 'Part XIV — Freezing & Seizure' },
  { id: 'part-xv',  label: 'Part XV — General Provisions' },
  { id: 'schedules',label: 'Schedules' },
  { id: 'other',    label: 'Other / General' },
];

export const REGULATIONS = RAW.map(r => ({
  ...r,
  severity: SEVERITY_MAP[r.id] || 'blue',
  part: PART_MAP[r.id] || 'other',
}));
