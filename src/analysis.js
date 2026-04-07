// src/analysis.js
// Deep analysis for Draft VASP Regulations 2026
// Per-regulation: industry impact, jurisdictional comparators, alternative frameworks
// Covers all RED regulations; selected YELLOW/GREEN where comparators add clear value
//
// Jurisdictions: Singapore (MAS), Switzerland (FINMA), Seychelles (FSA), United States (FinCEN/State)

export const ANALYSIS = {

  // ═══════════════════════════════════════════════════════════════
  // PART I — FEES
  // ═══════════════════════════════════════════════════════════════

  'fees-payable': {
    impact: `The combined fee structure — 0.05% per counterparty on every transaction, plus percentage-of-gross-income renewal fees — creates a double tax on activity that no comparable jurisdiction imposes. An exchange processing KES 1B/month in volume would owe ~KES 12M/year in regulatory transaction fees alone, before any other costs. This directly incentivises Kenyan VASPs to incorporate offshore and route volume through foreign entities, achieving the opposite of the regulation's intent.`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'MAS charges flat annual licence fees: SGD 10,000 for Standard Payment Institutions, SGD 30,000–100,000 for Major PIs depending on activity scope. Zero per-transaction regulatory fees. Capital requirements are SGD 100,000–250,000 (approximately KES 10M–25M).',
        source: 'Payment Services Act 2019; MAS PS Licence Fee Notice 2019',
      },
      {
        jurisdiction: 'Switzerland',
        flag: '🇨🇭',
        approach: 'FINMA charges cost-recovery supervision fees of CHF 10,000–50,000 annually for small to mid-tier VASPs. No transaction-level regulatory fees. The DLT Act (2021) created a proportionate fintech licensing track. Fees explicitly cannot exceed FINMA\'s cost of supervision.',
        source: 'FINMA Fee Ordinance; DLT Act 2021 (Bundesgesetz über die Anpassung des Bundesrechts an Entwicklungen der Technik verteilter elektronischer Register)',
      },
      {
        jurisdiction: 'Seychelles',
        flag: '🇸🇨',
        approach: 'FSA charges a flat application fee of USD 1,000 and annual licence fees of USD 2,500–5,000 depending on activity category. No percentage-of-revenue or per-transaction regulatory fees. Renewal is a simple flat-fee process.',
        source: 'Virtual Asset Service Providers Act 2022; FSA Regulatory Fees Schedule',
      },
      {
        jurisdiction: 'United States',
        flag: '🇺🇸',
        approach: 'FinCEN MSB registration is free. State money transmitter licences range from USD 100–10,000 as flat application fees. The NY BitLicense charges a flat USD 5,000 application fee. No jurisdiction imposes per-transaction regulatory fees on VASPs.',
        source: 'FinCEN Money Services Business Registration; NY DFS BitLicense Regulation 23 NYCRR 200',
      },
    ],
    alternatives: [
      'Replace all percentage-based fees with a tiered flat-fee schedule: KES 200,000/year for operators under KES 500M annual volume; KES 500,000/year for KES 500M–5B; KES 1,500,000/year above KES 5B.',
      'Eliminate the 0.05% per-counterparty transaction fee entirely — this is a tax on activity that will drive offshore incorporation. Regulatory cost recovery should come from licence fees, not volume taxes.',
      'Cap renewal fees at a cost-recovery basis audited annually, with a maximum of 0.02% of gross income and a KES 2M ceiling, phased in over 3 years to give existing operators time to restructure.',
    ],
  },

  'first-schedule-fees': {
    impact: `The First Schedule compounds the fees-payable problem with an additional 0.5% approval fee on the full value of any ICO offer. A KES 100M token offering would owe KES 500,000 in regulatory approval fees alone — on top of all application, legal, and compliance costs. This makes small token offerings economically unviable and pushes issuers to foreign jurisdictions.`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'MAS charges no percentage-of-offer approval fees for digital token offerings regulated under the Securities and Futures Act. Fees are flat: SGD 1,000 for prospectus registration. The Recognized Market Operator licence for token exchanges is SGD 150,000 flat annually.',
        source: 'Securities and Futures Act 2001; MAS Capital Markets Services Licence Fee Notice',
      },
      {
        jurisdiction: 'Switzerland',
        flag: '🇨🇭',
        approach: 'FINMA charges a flat fee of CHF 3,000–10,000 for ICO/token offering assessments (FINMA guidance letters). No percentage-of-offer fee exists. Switzerland\'s "Token Taxonomy" framework classifies tokens before requiring licensing, reducing approval friction.',
        source: 'FINMA Guidelines for Enquiries Regarding the Regulatory Framework for Initial Coin Offerings (ICOs) 2018',
      },
      {
        jurisdiction: 'United States',
        flag: '🇺🇸',
        approach: 'SEC Regulation A+ crowdfunding charges a flat filing fee of approximately USD 500–2,500. No percentage-of-offer regulatory fee. Regulation D (private placements) is free to file. Regulation CF (crowdfunding under USD 5M) has a flat USD 200 filing fee.',
        source: 'SEC Fee Rate Advisory; Regulation A+ (17 CFR 230.251 et seq.)',
      },
    ],
    alternatives: [
      'Replace the 0.5% ICO approval fee with a flat KES 50,000–200,000 fee based on offer size bracket, capped at KES 500,000 regardless of offer value.',
      'Allow for a fast-track sandbox registration for offers under KES 50M, with a KES 20,000 flat fee and a 21-day review period.',
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // PART II — LICENSING
  // ═══════════════════════════════════════════════════════════════

  'three-year-audit-history': {
    impact: `Requiring 3 years of audited financial statements at application effectively bans every startup less than 3 years old that cannot afford pre-revenue audits. In the Kenyan fintech context — where most VASP founders are early-stage operators — this provision alone would eliminate the majority of applicants. The alternative pathway ("opening financial statements verified by an auditor") is unclear and provides no practical relief for post-seed, pre-revenue companies.`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'MAS requires financial statements for the most recent financial year (not 3 years) for Standard PIs, and allows newly incorporated entities to submit a 12-month projected cash flow statement as an alternative. No 3-year history requirement exists. Startups can apply from day one of incorporation.',
        source: 'MAS Notice PSN01 — Application for a Standard Payment Institution Licence; Payment Services Act Guidelines 2019',
      },
      {
        jurisdiction: 'Switzerland',
        flag: '🇨🇭',
        approach: 'FINMA requires current financial statements and a 12-month business plan/budget projection. No historical audit requirement for new entrants. The fintech sandbox allows operations for up to 12 months without full financial history, with proportionate oversight.',
        source: 'FINMA Circular 2017/7; Banking Act Art. 1b (Fintech Licence)',
      },
      {
        jurisdiction: 'Seychelles',
        flag: '🇸🇨',
        approach: 'FSA requires financial statements for the past 1 year (or incorporation financial statements for new entities). No 3-year requirement. The framework explicitly accommodates newly incorporated entities with opening balance sheets and a 2-year financial projection.',
        source: 'Seychelles VASP Act 2022, Regulation 6 — Application Requirements',
      },
      {
        jurisdiction: 'United States',
        flag: '🇺🇸',
        approach: 'Most state MSB/MTL licensing requires 1 year of financial statements or a balance sheet for newly formed entities. The NY BitLicense requires an audited balance sheet if the applicant has been in business for less than 1 year. No state requires 3 years.',
        source: 'NY DFS BitLicense 23 NYCRR 200.4(b); Conference of State Bank Supervisors MSB Licensing Standards',
      },
    ],
    alternatives: [
      'Replace the 3-year requirement with: 1 year of audited statements for existing companies, OR a verified opening balance sheet plus 24-month financial projection for companies under 2 years old.',
      'Introduce a provisional licence valid for 12 months for new entrants: allows operations under restricted conditions (lower volume caps), full licence granted after 12 months of demonstrated compliance.',
      'Adopt Singapore\'s model: require current financial period statements plus evidence of adequate capital on hand, with no look-back period mandate.',
    ],
  },

  'licence-transfer-lockin': {
    impact: `The 36-month lock-in before any licence transfer or M&A is permitted kills secondary market activity for Kenyan VASPs. Founders who build a successful operation cannot exit; investors cannot monetise; acquirers cannot consolidate. Practically, this means no Kenyan VASP will attract serious venture capital, because investors cannot access a liquidity pathway for at least 3 years post-launch. Kenya will simply be skipped in regional M&A activity.`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'MAS requires notification and approval for changes of control (>20% ownership), but imposes no minimum holding period before a transfer application can be filed. Change-of-control approval typically takes 30–90 days. No lock-in period exists.',
        source: 'Payment Services Act 2019, Section 13 — Change in Substantial Shareholding',
      },
      {
        jurisdiction: 'Switzerland',
        flag: '🇨🇭',
        approach: 'FINMA requires prior approval for qualifying participations (>10% of capital or voting rights). No minimum holding period before a transfer application. The review focuses on the acquirer\'s suitability, not the duration of the current licence holder\'s tenure.',
        source: 'Banking Act Art. 3c; FinIA Art. 11 — Qualifying Participation',
      },
      {
        jurisdiction: 'United States',
        flag: '🇺🇸',
        approach: 'State regulators require change-of-control approval with 30–60 day review windows. No minimum holding period. M&A activity in the US payments and crypto sector is routine. The focus is on the acquirer\'s compliance record, not the duration of the existing licence.',
        source: 'CSBS Model Money Transmission Act; NY DFS BitLicense 23 NYCRR 200.12',
      },
    ],
    alternatives: [
      'Eliminate the 36-month lock-in and replace it with a change-of-control approval process: the transferee must meet all licensing criteria, and the authority has 60 days to approve or deny.',
      'If a minimum holding period is retained, cap it at 12 months (aligned with the commencement period in Regulation 7) and exempt transfers to entities that already hold a VASP licence.',
      'Adopt an automatic approval mechanism: if the transferee has a clean compliance record in another jurisdiction and meets capital requirements, the transfer is approved after 30 days without objection.',
    ],
  },

  'grounds-for-rejection': {
    impact: `"Against public interest or public policy" as a standalone rejection ground with no objective criteria gives the regulatory authority unlimited discretionary veto power. Without defined standards, this provision can be used to exclude competitors, politically unfavoured operators, or any applicant the authority chooses not to approve. It eliminates the predictability that investors and operators need to commit capital to Kenya.`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'MAS rejection grounds are exhaustively enumerated: false information, failure to meet minimum criteria, financial unsoundness, or conflict with MAS\'s regulatory objectives. "Public interest" is not a standalone open-ended ground; each criterion is tied to specific, defined conditions.',
        source: 'Payment Services Act 2019, Section 8 — Refusal of Licence Application',
      },
      {
        jurisdiction: 'Switzerland',
        flag: '🇨🇭',
        approach: 'FINMA can reject applications only on grounds specifically set out in statute: failure to meet minimum capital, inadequate governance, unfit persons, or inability to comply with regulatory requirements. Open-ended "public interest" veto powers do not exist in Swiss financial regulation.',
        source: 'FINMA Act Art. 5; Banking Act Art. 3 — Authorisation Conditions',
      },
      {
        jurisdiction: 'United States',
        flag: '🇺🇸',
        approach: 'State licensing statutes enumerate specific, objective grounds for rejection. Applicants have a statutory right to an administrative hearing and judicial review if rejected. Arbitrary rejection on vague "public interest" grounds is challengeable under administrative law and constitutional due process.',
        source: 'Administrative Procedure Act 5 U.S.C. § 554; State APA equivalents for financial licensing',
      },
    ],
    alternatives: [
      'Replace the open-ended "public interest or public policy" ground with specific, enumerable criteria: documented evidence of money laundering or terrorism financing, prior revocation in any jurisdiction within 5 years, or inability to demonstrate capital adequacy.',
      'Require written reasons for rejection that cite the specific regulatory provision breached and provide an appeals pathway to an independent administrative tribunal within 30 days.',
      'Add an "approval by default" mechanism: if the authority does not provide a written decision within 90 days of a complete application, the licence is deemed granted under provisional conditions pending a further 30-day review.',
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // PART III — ONGOING REQUIREMENTS
  // ═══════════════════════════════════════════════════════════════

  'shareholding-cap': {
    impact: `A hard 33.3% cap on any single shareholder's stake in exchanges, stablecoin issuers, and wallet providers kills the Kenyan startup funding model. Most early-stage companies rely on a lead investor taking a controlling stake (40–60%) to justify the due diligence and capital deployment. The exception clause (corporate entity with diverse shareholding) is too complex and slow to satisfy a typical VC deal timeline. Kenya will simply be excluded from Series A+ funding rounds for VASPs.`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'MAS imposes no ownership cap for Payment Service Providers. For entities with a banking licence, MAS requires approval for shareholdings above 5%, but this is a notification-and-approval process, not a hard cap. VASPs (DPT service providers) have no ownership concentration limits.',
        source: 'Payment Services Act 2019; MAS Notice SFA 04-N09 — Substantial Shareholding in Licensed Entities',
      },
      {
        jurisdiction: 'Switzerland',
        flag: '🇨🇭',
        approach: 'FINMA requires prior approval for qualifying participations (>10% of capital). There is no hard ownership cap. An entity can own 100% of a VASP with FINMA approval if the beneficial owner is fit and proper and governance is adequate.',
        source: 'FinIA Art. 11; Banking Act Art. 3c — Qualifying Participations',
      },
      {
        jurisdiction: 'Seychelles',
        flag: '🇸🇨',
        approach: 'FSA imposes no ownership cap for VASP licensees. Substantial ownership changes (>25%) require prior notification and approval, but any level of concentration is permissible if the holder meets fit-and-proper criteria.',
        source: 'Seychelles VASP Act 2022, Part IV — Ownership and Control',
      },
      {
        jurisdiction: 'United States',
        flag: '🇺🇸',
        approach: 'No federal or state law imposes an ownership cap on VASP or money transmitter licences. Change-of-control thresholds (typically 10–25%) trigger a notification/approval process, but there is no ceiling on concentration. VCs routinely hold majority stakes in licensed payment companies.',
        source: 'CSBS Model Money Transmission Modernization Act 2021; NY DFS BitLicense 23 NYCRR 200.12',
      },
    ],
    alternatives: [
      'Replace the hard cap with a disclosure-and-approval model: any shareholder seeking to hold >25% must obtain prior regulatory approval demonstrating fit-and-proper status and adequate governance separation. No ceiling on approved concentration.',
      'If a cap is retained for systemic risk purposes, apply it only to foreign-government-linked entities (sovereign wealth funds, state-owned enterprises) and exempt private venture capital and individual founders entirely.',
      'Adopt a tiered model: no restriction below 49%; 49%–75% requires regulatory approval; above 75% requires approval plus governance ring-fencing (independent directors, audit committee). This allows majority ownership while managing systemic risk.',
    ],
  },

  'icpak-mandate': {
    impact: `Requiring the CFO and external auditor to be ICPAK members excludes qualified professionals trained at Chartered Accountant bodies in India (ICAI), UK (ICAEW), South Africa (SAICA), or US (AICPA) — which collectively produce far more crypto-literate finance professionals than ICPAK currently does. Kenya's VASP sector will be forced to pay a premium for a shrinking pool of ICPAK-qualified candidates, or delay operations waiting for hires. This is a protectionist measure that will raise costs without improving audit quality.`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'MAS requires the CFO and auditors to be "suitably qualified and experienced" but does not mandate membership of any specific professional body. Singapore recognises qualifications from ICAEW, ACCA, CPA Australia, ICAI and others. The ISCA (Singapore CA body) is preferred but not exclusive.',
        source: 'Payment Services Act 2019, MAS Guidelines on Fit and Proper Criteria; Companies Act Cap. 50',
      },
      {
        jurisdiction: 'Switzerland',
        flag: '🇨🇭',
        approach: 'FINMA requires auditors to be licensed by the Swiss Federal Audit Oversight Authority (FAOA), which recognises Swiss CPA, but also audit firms with internationally recognised qualifications (Big 4, mid-tier firms). CFO qualifications are assessed on substance (relevant experience), not specific body membership.',
        source: 'Audit Oversight Act (Revisionsaufsichtsgesetz); FINMA Circular 2013/3 — Auditing',
      },
      {
        jurisdiction: 'United States',
        flag: '🇺🇸',
        approach: 'Auditors of public companies must be registered with the PCAOB. For non-public VASPs, state-licensed CPAs can audit. There is no requirement to belong to a single national body — AICPA membership is common but not mandated. CFO qualifications are governance-matter only.',
        source: 'Sarbanes-Oxley Act 2002 §101 (for public companies); State CPA licensing laws for private entities',
      },
    ],
    alternatives: [
      'Replace the ICPAK-only requirement with a "recognised professional accounting qualification" standard: accept ICPAK, ICAEW, ACCA, CPA Australia, ICAI (India), SAICA, AICPA, or any IFAC member body.',
      'For the CFO specifically, replace the professional body mandate with a substance test: 5+ years of finance leadership experience in regulated financial services, with ICPAK or equivalent as a preferred but not exclusive qualification.',
      'Commission a transition period: ICPAK-only applies for initial licences; within 24 months, regulators publish a list of 10+ recognised international qualifications, giving the market time to hire from a wider pool.',
    ],
  },

  'board-of-directors': {
    impact: `Mandating one-third independent directors on a startup's board from day one is a corporate governance standard designed for publicly listed companies. A 5-person founding team that has incorporated a VASP cannot immediately produce 2 independent board members who meet the regulatory definition. Recruiting qualified independent directors in the Kenyan fintech space takes 3–6 months minimum and costs KES 500,000–2M per director per year in fees. This provision effectively creates a 6–12 month delay before any new VASP can even commence the licence application process.`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'MAS requires independent directors only for entities listed on the SGX (public companies), not for private VASPs or Payment Institution licensees. Governance requirements for private VASPs focus on having a clearly defined management structure, risk committee, and audit function — not prescribing board composition ratios.',
        source: 'Singapore Code of Corporate Governance 2018 (listed entities only); MAS Guidelines on Corporate Governance for Financial Holding Companies',
      },
      {
        jurisdiction: 'Switzerland',
        flag: '🇨🇭',
        approach: 'FINMA requires separation of executive and supervisory board functions (standard under Swiss AG structure) but does not mandate a specific percentage of independent board members for private VASPs. Independence requirements escalate proportionately with entity size and systemic importance.',
        source: 'Code of Obligations Art. 716a; FINMA Circular 2017/1 — Corporate Governance',
      },
      {
        jurisdiction: 'United States',
        flag: '🇺🇸',
        approach: 'Independent director mandates apply only to publicly listed companies (Nasdaq/NYSE rules) and entities with SEC reporting obligations. Private VASPs and MTL holders have no independent director requirements — governance is assessed by substance: risk management capability, audit function, compliance programme.',
        source: 'NYSE Listed Company Manual Section 303A.01; SEC Release 34-47654 (for public co. only)',
      },
    ],
    alternatives: [
      'Apply independent director requirements proportionately: exempt companies under KES 500M in annual transaction volume or 3 years of operation; require minimum 1 independent director for mid-tier; require 1/3 independent only for licensees with systemic importance designation.',
      'Replace the composition mandate with a function mandate: require that the audit, risk, and compliance functions are led by personnel who are independent from executive management — achievable even in a 5-person startup through committee structures.',
      'Adopt a grace period: new licensees have 18 months from licence grant to meet board composition requirements, with a self-certified compliance roadmap filed at month 6.',
    ],
  },

  'governance-arrangements': {
    impact: `Requiring every VASP to establish a separate business unit with dedicated management and independent books from inception is operationally impossible for a 3–10 person startup. This provision, combined with the board independence mandate, creates a "minimum viable compliance overhead" that can only be met by well-capitalised incumbents. It structurally protects existing large operators from new competition under the guise of governance standards.`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'MAS applies proportionality explicitly: governance requirements scale with size and systemic importance. Small Standard PIs are required to have adequate senior management oversight but not separate business units. The MAS Guidelines use the principle of "commensurate with the nature, scale, and complexity of the business."',
        source: 'MAS Guidelines on Risk Management Practices for Payment Institutions; Payment Services Act 2019 Section 29',
      },
      {
        jurisdiction: 'Switzerland',
        flag: '🇨🇭',
        approach: 'FINMA\'s proportionality principle (Verhältnismässigkeit) is explicitly embedded in Swiss financial law. Governance structures for small VASPs need to demonstrate adequate oversight, not a specific organisational structure. FINMA\'s "small banks" regime reduces compliance costs by 30–50% for low-risk entities.',
        source: 'FINMA Act Art. 5(2) — Proportionality; FINMA Circular 2020/1 Small Banks Regime',
      },
    ],
    alternatives: [
      'Replace the blanket separate-BU requirement with a principles-based standard: operators must demonstrate clear responsibility assignment for compliance, risk management, and customer protection functions — the form (separate BU vs. named role) is at operator discretion.',
      'Introduce proportionality tiers: operators below KES 1B annual volume may satisfy governance requirements through documented role assignments; the separate-BU requirement activates only above KES 5B annual volume.',
    ],
  },

  'record-keeping-reports': {
    impact: `Requiring monthly reports within 10 calendar days — including daily breakdowns of transaction volumes, fraud incidents, service interruptions, and complaints — creates a near-continuous reporting obligation. A VASP that had a minor service interruption on day 3 of January must have it documented, categorised, and reported to the authority within 10 days of January 31. This transforms compliance into a near-fulltime administrative function, diverting resources from product and customer service.`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'MAS requires semi-annual statistical returns for Standard PIs and quarterly returns for Major PIs. Incident reporting is event-triggered (report within 1 hour of a major incident, not monthly). Routine operational data is reported annually via the MAS Regulatory Reporting system.',
        source: 'MAS Notice PSN07 — Reporting Requirements for Payment Institutions; MAS Technology Risk Management Guidelines',
      },
      {
        jurisdiction: 'Switzerland',
        flag: '🇨🇭',
        approach: 'FINMA requires annual financial reporting and event-triggered incident notifications (within 24 hours for significant incidents). No monthly operational reports are mandated for private VASPs. Reporting frequency escalates for systemically important institutions only.',
        source: 'FINMA Circular 2018/3 — Outsourcing; FINMA Annual Reporting Requirements for Financial Institutions',
      },
      {
        jurisdiction: 'United States',
        flag: '🇺🇸',
        approach: 'FinCEN requires annual MSB registration renewal and event-triggered SAR filing (within 30 days of suspicious activity detected). No monthly operational reporting to regulators for non-bank VASPs. State MTL reporting varies but is typically quarterly at most.',
        source: 'FinCEN SAR Filing Requirements 31 CFR §1022.320; Bank Secrecy Act MSB Regulations',
      },
    ],
    alternatives: [
      'Move to quarterly reporting for routine operational data (volumes, complaints, service metrics) and retain event-triggered reporting for genuine incidents: fraud exceeding KES 100,000, security breaches affecting >100 customers, or material service disruptions exceeding 4 hours.',
      'Allow electronic self-reporting via a regulatory portal with structured data fields — reducing compliance cost by automating the data extraction from existing operational systems rather than requiring manual report compilation.',
      'Adopt Singapore\'s model: annual reports for routine data, real-time or within-1-hour notification for category 1 incidents (cybersecurity breach, major fraud), 24-hour notification for category 2 (service outages >4h), 5-day notification for category 3 (complaints exceeding a threshold).',
    ],
  },

  'transaction-metadata': {
    impact: `A 7-year retention mandate for blockchain metadata including wallet addresses, transaction hashes, API logs, and cross-chain bridge pathways goes far beyond FATF standards (5-year AML record-keeping). The explicit inclusion of "order-book and API interaction logs" and "cross-chain bridge pathway identifiers" suggests near-surveillance level data collection that no other jurisdiction requires. The cost of storing and securing this volume of technical data for 7 years — across all transactions — is prohibitive for a small exchange.`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'MAS aligns with FATF: 5-year transaction record retention. The records required are customer identity, transaction amount, currency/asset type, and counterparty reference. No mandate for API interaction logs, order-book logs, or cross-chain bridge pathway identifiers.',
        source: 'MAS Notice PSN02 — Prevention of Money Laundering; FATF Recommendation 10 (Record Keeping)',
      },
      {
        jurisdiction: 'Switzerland',
        flag: '🇨🇭',
        approach: 'AMLA requires 10-year retention of customer identification records and 5-year retention of transaction records. Switzerland follows FATF Recommendation 10 precisely. No requirement for technical metadata like API logs or blockchain bridge pathway identifiers beyond the Travel Rule minimum.',
        source: 'Swiss Anti-Money Laundering Act (AMLA) Art. 7; FINMA Circular 2016/7 — Video and Online Identification',
      },
      {
        jurisdiction: 'United States',
        flag: '🇺🇸',
        approach: 'BSA requires 5-year retention of transaction records and 5-year retention of CIP/KYC records. FinCEN\'s Travel Rule (pending) covers originator/beneficiary information. No requirement for API logs, order-book data, or blockchain technical metadata beyond transaction identity.',
        source: 'Bank Secrecy Act 31 U.S.C. §5311; FinCEN CVC Guidance FIN-2019-G001',
      },
    ],
    alternatives: [
      'Align with FATF baseline: 5-year retention of transaction records (amount, asset type, counterparty wallet address, timestamp). Remove the mandate for API interaction logs, order-book logs, and cross-chain bridge pathway identifiers — these are operational data, not AML records.',
      'Specify that metadata beyond FATF minimums is retained at operator discretion and produced to authorities only upon a specific written request tied to an investigation, not as a baseline compliance requirement.',
      'Introduce tiered retention: FATF-minimum transaction data for 5 years (mandatory); operational logs (API, order-book) for 12 months (mandatory, for incident response); beyond 12 months, optional archival at operator discretion.',
    ],
  },

  'provision-of-information': {
    impact: `Granting the regulatory authority the power to enter any premises at any time without a warrant or advance notice is a constitutional concern under Article 31 (right to privacy) and Article 40 (right to property) of the Kenyan Constitution. Beyond constitutionality, warrantless entry at any time creates a hostile operating environment that discourages sophisticated operators from establishing in Kenya. Technology companies in particular hold intellectual property and client data that requires legal protections on access.`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'MAS has inspection powers but must provide reasonable advance notice for routine inspections. For urgent investigations, MAS may apply to a Magistrate\'s Court for a warrant to enter premises and seize documents. Warrantless entry is limited to specific emergency circumstances defined in statute.',
        source: 'Payment Services Act 2019, Section 53 — Inspection of Payment Service Providers; Criminal Procedure Code for warrants',
      },
      {
        jurisdiction: 'Switzerland',
        flag: '🇨🇭',
        approach: 'FINMA has broad supervisory powers but premises entry requires either advance notice (routine audit) or a court order (urgent investigations). Personal data held by VASPs is protected under the Swiss Federal Act on Data Protection (revised nFADP 2023). FINMA\'s powers are proportionate and judicially reviewable.',
        source: 'FINMA Act Art. 36–38; nFADP (Datenschutzgesetz) 2023; Swiss Code of Civil Procedure',
      },
      {
        jurisdiction: 'United States',
        flag: '🇺🇸',
        approach: 'The Fourth Amendment prohibits warrantless searches of business premises. FinCEN, SEC, and state regulators may conduct scheduled examinations with advance notice. Emergency access requires a federal court subpoena or warrant. Even the IRS follows warrant requirements for business premises.',
        source: 'U.S. Constitution Amendment IV; Administrative Search and Seizure Doctrine (See v. Seattle, 387 U.S. 541)',
      },
    ],
    alternatives: [
      'Add explicit warrant requirements: routine inspections require 5 business days\' advance notice; emergency inspections (cybersecurity breach, AML violation) require a High Court warrant obtainable within 48 hours via an ex parte application.',
      'Limit the premises entry power to business hours (8am–6pm) for routine inspections, with a documented purpose stated in writing before entry. Out-of-hours access requires a warrant.',
      'Provide a judicial review mechanism: any operator subjected to premises entry without a warrant may apply to the High Court within 10 days for a ruling on the legality of the entry, with remedies including suppression of evidence obtained in breach.',
    ],
  },

  'compliance-officer': {
    impact: `Prohibiting outsourcing of the compliance function — even for 2–5 person startups — forces early-stage VASPs to hire a full-time in-house Compliance Officer before generating any revenue. A qualified CAMS-certified compliance officer in Kenya commands KES 120,000–250,000/month in salary. Combined with capital requirements and other mandatory hires, this creates a pre-revenue cost structure that only well-funded operators can sustain.`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'MAS allows outsourcing of compliance functions, including AML/CFT officer responsibilities, to approved compliance service providers. The ultimate accountability remains with the licensee, but the function itself can be contracted out. Many Standard PIs use outsourced compliance officers in their first years of operation.',
        source: 'MAS Guidelines on Outsourcing — 2016 Revised Edition; MAS Notice PSN02 — AML/CFT Requirements',
      },
      {
        jurisdiction: 'Switzerland',
        flag: '🇨🇭',
        approach: 'FINMA permits outsourcing of the compliance function to a qualified external compliance provider under a written agreement. The VASP remains responsible for oversight of the outsourced function. Many Swiss fintech startups use specialised regulatory compliance firms for their first 2–3 years.',
        source: 'FINMA Circular 2018/3 — Outsourcing; AMLA Art. 3(1) — Identification of Beneficial Owner',
      },
      {
        jurisdiction: 'Seychelles',
        flag: '🇸🇨',
        approach: 'FSA permits a single individual to fulfil multiple regulatory officer roles (MLRO, compliance officer, CEO) in small entities. Outsourcing of compliance functions is explicitly permitted under the VASP Act 2022. This dramatically reduces the minimum staffing requirement for new entrants.',
        source: 'Seychelles VASP Act 2022, Section 24 — Compliance Officers; FSA Outsourcing Guidelines',
      },
    ],
    alternatives: [
      'Allow outsourcing of the compliance function to firms approved by the regulatory authority, subject to: written agreement, clear accountability chain, quarterly reporting to the licensee\'s board, and the authority\'s right to communicate directly with the outsourced provider.',
      'For entities below KES 500M in annual volume, permit a shared compliance officer arrangement — one qualified individual serving as Compliance Officer across up to 3 non-affiliated VASPs — to reduce individual licensing costs.',
      'Adopt a role-consolidation model: in entities under 20 employees, the CEO or CFO may serve as Compliance Officer provided they hold a recognised AML/CFT qualification (CAMS, ICA Certificate) and the board reviews compliance reports quarterly.',
    ],
  },

  'human-technology-resources': {
    impact: `"To the satisfaction of the regulatory authority" is an undefined standard that gives regulators unchecked discretion to reject or revoke licences based on subjective assessments of staffing and technology adequacy. Without objective criteria, operators cannot know in advance whether their current arrangements are compliant, and the standard can shift arbitrarily between review periods.`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'MAS publishes prescriptive, objective technology risk management guidelines (TRM Guidelines 2021) that specify measurable standards for: system availability (99.5% uptime for critical systems), recovery time objectives, penetration testing frequency, and staff qualifications. Compliance is self-assessed against published criteria.',
        source: 'MAS Technology Risk Management Guidelines 2021; MAS Notice PSN02 Annex A — IT Requirements',
      },
      {
        jurisdiction: 'United States',
        flag: '🇺🇸',
        approach: 'NIST Cybersecurity Framework provides the objective standard against which VASPs and money transmitters measure technology resource adequacy. State regulators reference NIST CSF in examination procedures. Standards are published, self-assessable, and updated through a transparent consultative process.',
        source: 'NIST Cybersecurity Framework 2.0; FFIEC IT Examination Handbook',
      },
    ],
    alternatives: [
      'Replace "to the satisfaction of the authority" with reference to published objective standards: adopt the MAS TRM Guidelines or NIST CSF as the benchmark, with self-assessment forms that generate a compliance score.',
      'Publish a Technology and Staffing Minimum Requirements Notice that specifies: minimum KYC tooling capabilities, system uptime requirements, data backup frequency, and minimum qualified staff ratios — giving operators a clear, auditable checklist.',
    ],
  },

  'proper-markets': {
    impact: `"Conducive to the economic good of the country" and "to the satisfaction of the regulatory authority" give the authority an unlimited mandate to intervene in any exchange operation on vague public-interest grounds, without any objective test. This creates a chilling effect — operators may self-censor innovative products to avoid discretionary adverse findings.`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'MAS defines "proper markets" through specific, published criteria in its Market Conduct requirements: fair order matching, pre/post-trade transparency, manipulation prevention mechanisms, and clear delisting procedures. Each criterion is objectively measurable.',
        source: 'Securities and Futures Act 2001 Part VIII; MAS Notice SFA 04-N13 — Market Conduct',
      },
    ],
    alternatives: [
      'Replace "economic good of the country" with specific, objectively measurable market integrity standards: published order matching rules, price transparency requirements, and mandatory market abuse monitoring — all self-assessable against published guidelines.',
    ],
  },

  'business-default-rules': {
    impact: `Requiring regulatory pre-approval for ALL business rules and default rules — covering everything from trading hours to order priorities — makes every product update and operational change subject to regulator review. A VASP wanting to add a new token pair, change its fee schedule, or update its settlement procedures must seek prior approval, potentially waiting weeks or months. This makes Kenyan VASPs unable to respond to market conditions at the speed required in crypto markets.`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'MAS requires approval for core operating rules at licensing, but subsequent amendments to non-material rules (trading hours, fee schedules, minor operational procedures) require only notification within 14 days. Material changes (new asset classes, major structural changes) require prior approval.',
        source: 'Securities and Futures Act 2001 Section 46; MAS Rules Approval Framework for Approved Exchanges',
      },
      {
        jurisdiction: 'Switzerland',
        flag: '🇨🇭',
        approach: 'FINMA requires DLT trading facilities to submit core rulebooks at licensing. Subsequent amendments are notified to FINMA and take effect after 30 days without objection, unless FINMA issues a specific objection. Only structural changes (new asset categories, major governance changes) require affirmative approval.',
        source: 'Financial Market Infrastructure Act (FMIA) Art. 27; FINMA Ordinance on Financial Market Infrastructures',
      },
    ],
    alternatives: [
      'Adopt a "file and proceed" model for non-material rule changes: VASPs notify the authority of rule changes 14 days before implementation; the authority may object within 14 days; if no objection, the change proceeds automatically.',
      'Define clear tiers: Tier 1 (core rules — asset eligibility criteria, major default procedures) requires prior approval; Tier 2 (operational rules — trading hours, fee schedules, minor procedures) requires 14-day prior notice; Tier 3 (technical updates, UI/UX changes) requires no notification.',
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // PART IV — GOVERNANCE
  // ═══════════════════════════════════════════════════════════════

  'capital-requirements': {
    impact: `KES 150M–500M in mandatory capital (approximately USD 1.1M–3.8M at current rates) — plus stacking requirements for multiple activities — places Kenya\'s capital threshold among the highest in the world for VASP licensing. For comparison, Singapore\'s Payment Services Act requires SGD 100,000–250,000 (approximately USD 75,000–185,000) for equivalent activities. The stacking model (additional capital per additional activity type) punishes integrated product offerings, the very model that drives VASP efficiency.`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'MAS: Standard Payment Institution SGD 100,000 (≈ KES 10M); Major Payment Institution SGD 250,000 (≈ KES 25M). No stacking — a single licence covers all payment service types under the PSA. Capital is paid-up share capital, not liquid capital above operational costs.',
        source: 'Payment Services (Licensing and Conduct) Regulations 2019, First Schedule — Capital Requirements',
      },
      {
        jurisdiction: 'Switzerland',
        flag: '🇨🇭',
        approach: 'FINMA Fintech Licence: CHF 300,000 (≈ KES 45M) minimum paid-up capital for entities holding public deposits up to CHF 100M. DLT trading facilities: CHF 1.5M–10M depending on scope. No stacking across activity types. Risk-based capital add-ons based on actual risk profile.',
        source: 'Banking Ordinance Art. 1b; FINMA Fintech Licence Capital Requirements',
      },
      {
        jurisdiction: 'Seychelles',
        flag: '🇸🇨',
        approach: 'FSA: USD 50,000–500,000 (≈ KES 6.5M–65M) depending on activity type. Exchange licence: USD 500,000. No stacking for integrated operators. Much lower than Kenya\'s proposed requirements, consistent with Seychelles\' positioning as a regional financial hub.',
        source: 'Seychelles VASP Act 2022, Fifth Schedule — Capital Requirements',
      },
      {
        jurisdiction: 'United States',
        flag: '🇺🇸',
        approach: 'No uniform federal capital requirement. State requirements range from USD 100,000 (smaller states) to USD 10M+ (NY BitLicense: USD 1M minimum). Risk-based surety bonds are a common alternative to direct capital requirements, allowing smaller operators to access markets without immobilising capital.',
        source: 'NY DFS BitLicense 23 NYCRR 200.9; CSBS Money Transmission State Capital Survey 2023',
      },
    ],
    alternatives: [
      'Replace the current flat-tier capital schedule with a risk-proportionate model: base capital of KES 15M for all licensees; additional risk-based capital calculated as 2% of the highest monthly transaction volume in the prior quarter, capped at KES 100M for any single activity.',
      'Allow surety bonds and/or insurance products from licensed insurers as partial substitutes for direct capital (up to 50% of the requirement), reducing the capital immobilisation burden on small operators.',
      'Eliminate stacking for integrated operators — a company holding both an exchange and wallet provider licence pays only the higher of the two capital requirements, not both added together.',
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // PART V — INTERVENTION
  // ═══════════════════════════════════════════════════════════════

  'statutory-manager': {
    impact: `Allowing the regulatory authority to appoint a statutory manager over a licensed VASP via gazette notice — without prior judicial review — gives the government the power to seize operational control of a private company without court oversight. In practice, this creates a powerful deterrent against operating a VASP in Kenya: the government can take over your business by notice, sell your assets, and declare moratoriums on your liabilities, all without a court order.`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'MAS may appoint a statutory manager for payment institutions, but the appointment is subject to a High Court review within 7 days if challenged by the licensee. The statutory manager\'s powers are defined and limited by statute — asset sales require court approval. MAS must publish its reasons within 30 days.',
        source: 'Payment Services Act 2019, Part VIIA — Statutory Management; MAS Act Section 49',
      },
      {
        jurisdiction: 'United States',
        flag: '🇺🇸',
        approach: 'State receivership of licensed financial companies requires a Superior Court order. The affected company has the right to contest the appointment. Federal receiverships (FDIC) follow strict statutory procedures with full due process. No administrative body can seize a company by notice alone.',
        source: 'FDIC Receivership Process 12 U.S.C. §1821; State Receivership Acts (e.g. California Financial Code §3100)',
      },
    ],
    alternatives: [
      'Require that statutory manager appointments be authorised by a High Court order obtained on an ex parte urgent basis, with the licensee having a right to contest within 72 hours of appointment.',
      'Define the grounds for statutory management with specificity: imminent insolvency, systematic fraud, or active money laundering — not vague "crisis" triggers. Require a written determination documenting which specific ground has been met.',
      'Limit the statutory manager\'s powers to preservation (freezing transactions, protecting customer assets) until a full court hearing; divestment of assets or declaration of moratoriums to require affirmative court approval.',
    ],
  },

  'intervention-management': {
    impact: `A vague "crisis" trigger for regulatory intervention — without defining what constitutes a crisis — gives the authority enormous discretion to initiate takeover procedures based on subjective assessments. Combined with the statutory manager powers, this creates an existential risk for any VASP that the regulator decides to target, with no clear threshold the operator can monitor and manage against.`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'MAS intervention triggers are enumerated in statute: insolvency, inability to meet obligations, criminal investigation for money laundering/terrorism financing, or threat to monetary stability. Each trigger is specific and measurable. MAS must document which trigger applies before intervention.',
        source: 'Payment Services Act 2019 Section 52A; MAS Act Section 30 — Intervention Powers',
      },
    ],
    alternatives: [
      'Define "crisis" with specific, objective triggers: failure to meet capital requirements for 30+ consecutive days; regulatory authority receiving credible evidence of systematic fraud affecting >500 customers; or court-ordered investigation for financial crime involving the licensee.',
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // PART VIII — WALLETS & STABLECOINS
  // ═══════════════════════════════════════════════════════════════

  'stablecoin-interest-ban': {
    impact: `A complete ban on any form of yield, including returns from reserve assets, makes the Kenyan stablecoin model economically unviable. Stablecoin issuers globally sustain their operations primarily through reserve yield — interest on government bonds or money market instruments backing the stablecoin. Banning this revenue stream forces issuers to either operate at a loss or charge high redemption fees, making Kenyan stablecoins uncompetitive against USDC, USDT, and other international alternatives that Kenyan users can already access freely.`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'MAS Single-Currency Stablecoin (SCS) regulation (2023) explicitly permits issuers to earn yield on reserve assets and retain that yield as operating revenue, provided the reserve is maintained at par value. Passing yield to token holders is also permitted with appropriate disclosure. No blanket interest ban exists.',
        source: 'MAS Single-Currency Stablecoin Regulatory Framework 2023; Payment Services Act Notice PSN03',
      },
      {
        jurisdiction: 'United States',
        flag: '🇺🇸',
        approach: 'The Lummis-Gillibrand Payment Stablecoin Act (proposed) explicitly allows issuers to earn yield on reserves; passing yield to holders is regulated as a security (requiring additional registration) but is not banned. USDC (Circle) earns reserve yield as core business revenue, disclosed transparently.',
        source: 'Lummis-Gillibrand Payment Stablecoin Act 2023; SEC Staff Bulletin on Stablecoin Yield Products',
      },
      {
        jurisdiction: 'Switzerland',
        flag: '🇨🇭',
        approach: 'FINMA\'s stablecoin guidance (2019) distinguishes payment tokens from investment tokens. Stablecoin issuers may earn interest on reserve deposits; passing yield to holders may trigger banking licence requirements, but is not banned outright. Reserve yield as issuer revenue is explicitly permitted.',
        source: 'FINMA ICO Guidelines 2019; FINMA Guidance 04/2019 — Payments on DLT Platforms',
      },
    ],
    alternatives: [
      'Allow reserve yield as issuer operating revenue with mandatory transparency: monthly disclosure of reserve composition and yield earned, audited by an independent party.',
      'If yield-sharing with token holders is a regulatory concern (banking licence scope), prohibit yield-sharing to holders but explicitly permit issuers to retain reserve yield as business revenue — exactly the USDC/USDT model.',
      'Adopt a tiered framework: stablecoins with reserves invested only in CBK-approved assets and disclosed monthly may earn and retain reserve yield; stablecoins with diversified reserves face enhanced disclosure but are not banned from yield.',
    ],
  },

  'stablecoin-reserve-assets': {
    impact: `Restricting stablecoin reserves to Kenyan government securities with maturity of 90 days or less eliminates the ability to hold international sovereign bonds, AAA-rated commercial paper, or money market funds — the standard reserve composition for every major stablecoin (USDC, USDT, PYUSD). This Kenya-only restriction means the reserve backing a Kenya-issued stablecoin cannot diversify across currencies or credit risks, making it more fragile than its global competitors, not safer.`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'MAS SCS framework (2023) allows reserves in: cash, central bank reserves in the same currency, short-term sovereign government securities (rated AA- or above), or money market funds meeting MAS criteria. Importantly, reserves can be denominated in any currency — not restricted to Singapore assets.',
        source: 'MAS SCS Regulatory Framework 2023, Section 3 — Reserve Requirements',
      },
      {
        jurisdiction: 'United States',
        flag: '🇺🇸',
        approach: 'US proposed stablecoin legislation (Lummis-Gillibrand 2023) allows reserves in: US Treasury securities (no maturity cap), central bank reserves, insured deposits, and FDIC-backed instruments. International exposure is permitted for non-USD stablecoins. No "domestic assets only" requirement.',
        source: 'Lummis-Gillibrand Payment Stablecoin Act 2023, Section 4 — Permitted Assets',
      },
      {
        jurisdiction: 'Switzerland',
        flag: '🇨🇭',
        approach: 'FINMA permits reserves in cash, sight deposits at banks, and highly rated short-term bonds in any currency. International diversification is explicitly permitted and encouraged to match the stablecoin\'s denomination currency. The focus is on credit quality and liquidity, not geography.',
        source: 'FINMA Guidance 04/2019; Swiss AMLA — Stablecoin Reserve Treatment',
      },
    ],
    alternatives: [
      'Adopt a quality-based reserve standard instead of a geography-based restriction: reserves must consist of assets rated AA- or above, with maturity under 180 days, held in qualified custodians — regardless of whether those custodians are Kenyan.',
      'Allow a reserve diversification model: minimum 30% in CBK-eligible instruments (KES-denominated), remaining 70% in internationally recognised money market instruments (USD Treasuries, Euro sovereign bonds, FDIC-insured deposits).',
      'Introduce a proportionality principle: stablecoins pegged to KES must hold majority KES reserves; stablecoins pegged to USD may hold majority USD reserves. Remove the restriction to Kenyan instruments for non-KES denominations.',
    ],
  },

  'stablecoin-reserve-custody': {
    impact: `Restricting stablecoin reserve custody to CBK-approved custodians — when Kenya currently has no CBK-approved crypto custody framework — creates a circular dependency: you cannot issue a stablecoin because there are no approved custodians, and there are no approved custodians because there are no licences to custody stablecoin reserves yet. This is a de facto ban on stablecoin issuance dressed as a regulatory requirement.`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'MAS SCS framework allows reserves to be held at: MAS itself, licensed banks in Singapore, and licensed banks or custodians outside Singapore meeting MAS credit rating criteria. The framework does not restrict custody to Singapore-only institutions and explicitly allows qualified international custodians.',
        source: 'MAS SCS Regulatory Framework 2023, Section 3.4 — Custody of Reserve Assets',
      },
      {
        jurisdiction: 'United States',
        flag: '🇺🇸',
        approach: 'Circle (USDC) holds reserves at: Bank of New York Mellon, BlackRock money market funds, and US Treasury direct. These are internationally recognised custodians — not restricted to any single jurisdiction\'s approved list. The focus is on creditworthiness and regulatory standing of the custodian.',
        source: 'Circle Internet Financial Reserve Report (monthly disclosure); Lummis-Gillibrand Custodian Requirements',
      },
    ],
    alternatives: [
      'Allow reserves to be held at any custodian with: (a) a banking licence in Kenya, Singapore, Switzerland, UK, or EU, OR (b) a VASP custody licence in any FATF-compliant jurisdiction, subject to quarterly disclosure of custodian identity and reserve composition.',
      'Fast-track a CBK custodian approval framework with a 90-day processing target, and publish interim guidance allowing qualified international custodians to be used during the transition period.',
    ],
  },

  'stablecoin-offer-requirements': {
    impact: `A mandatory 90-day pre-notification before any stablecoin offering creates a 3-month minimum time-to-market delay beyond all other licensing requirements. In crypto markets, where product cycles are measured in weeks, a 90-day regulatory waiting period after completing the full licensing process is a competitive death sentence. No other major jurisdiction imposes pre-offer notification periods this long.`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'MAS SCS framework: once a licence is granted, a stablecoin may be offered to the public after filing a whitepaper (which must be filed at least 14 days before offering commencement). No 90-day pre-notification requirement exists. The 14-day period allows for last-minute regulatory queries.',
        source: 'MAS SCS Regulatory Framework 2023, Section 5 — Information Disclosure Requirements',
      },
      {
        jurisdiction: 'Switzerland',
        flag: '🇨🇭',
        approach: 'FINMA requires pre-clearance of the stablecoin structure as part of the licensing process. Once licensed, no additional pre-offering notification period is required. Time-to-market after licence grant is measured in days, not months.',
        source: 'FINMA Guidance 04/2019; Swiss FinSA Prospectus Rules for Payment Tokens',
      },
    ],
    alternatives: [
      'Replace the 90-day pre-notification with a 14-day notification, during which the authority may request additional information. If no inquiry is raised within 14 days, the offering may commence.',
      'Fold the pre-offer review into the licensing process itself: a licensed stablecoin issuer has already had its whitepaper, reserve structure, and governance reviewed — no additional pre-offer period should be needed.',
    ],
  },

  'stablecoin-audits': {
    impact: `Monthly proof-of-reserve audits by an external auditor — each requiring sign-off on the full reserve composition — would cost an estimated KES 200,000–500,000 per month (KES 2.4M–6M per year) in audit fees alone for a small issuer. This recurring cost, before any other operational expense, makes stablecoin issuance economically unviable for any operator below a critical mass that doesn't exist yet in the Kenyan market. Monthly audits would make a Kenyan stablecoin the most audited financial instrument in the world — by a significant margin.`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'MAS SCS framework requires monthly attestation reports (not full audits) by a qualified auditor for reserve composition, and a full external audit annually. Attestations are lower cost than full audits and are accepted for monthly disclosure. Additionally, MAS accepts automated real-time reserve dashboards as supplementary transparency.',
        source: 'MAS SCS Regulatory Framework 2023, Section 4 — Audit and Attestation Requirements',
      },
      {
        jurisdiction: 'United States',
        flag: '🇺🇸',
        approach: 'Circle (USDC) publishes monthly reserve attestations by Grant Thornton (not full audits) and an annual audit. Tether (USDT) publishes quarterly attestations. Neither is required to produce monthly full audits — attestations (which verify the reserve balance without full audit procedures) are the accepted market standard.',
        source: 'Circle Reserve Report and Attestation; Proposed Lummis-Gillibrand Stablecoin Act Section 7 — Attestation Requirements',
      },
    ],
    alternatives: [
      'Replace monthly full audits with monthly reserve attestations (a less rigorous but far cheaper certification that the reserve is fully backed) plus an annual full external audit — the global industry standard for major stablecoins.',
      'Allow automated, real-time on-chain proof-of-reserve mechanisms (cryptographic proof published to a public blockchain) as a substitute for monthly attestations, subject to an annual audit verifying the cryptographic mechanism\'s integrity.',
    ],
  },

  'stablecoin-investment-of-funds': {
    impact: `Restricting reserve investments to Kenya-only instruments — when Kenya's bond market is small, illiquid, and KES-denominated — means that a USD-pegged stablecoin must hold KES assets backing a USD liability. This creates a structural currency mismatch that is itself a systemic risk, the opposite of what reserve requirements are designed to prevent.`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'MAS explicitly requires that reserve currency matches the stablecoin\'s peg currency. A USD stablecoin must hold USD reserves; a SGD stablecoin must hold SGD reserves. International custody and investment in the peg currency is not only permitted — it\'s required for sound reserve management.',
        source: 'MAS SCS Regulatory Framework 2023 — Currency Matching Requirements',
      },
    ],
    alternatives: [
      'Require currency matching, not geographic restriction: reserves for a KES stablecoin must be KES-denominated (may include Kenyan or international KES-denominated instruments); reserves for a USD stablecoin must be USD-denominated (held internationally).',
    ],
  },

  'stablecoin-modification': {
    impact: `Requiring pre-approval for any business model change — including technical upgrades to the stablecoin protocol, new reserve instrument types, or updated redemption mechanisms — subjects routine business evolution to full regulatory review cycles. Given typical review timelines of 30–90 days, this makes a Kenyan stablecoin unable to respond to market conditions or technical improvements within a competitive timeframe.`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'MAS requires notification for material changes (new reserve asset classes, change of auditor, major governance changes) within 30 days and grants approval within 30 days of notification unless an objection is raised. Minor technical changes (smart contract upgrades, UI changes) require no notification.',
        source: 'MAS SCS Regulatory Framework 2023, Section 6 — Notification Requirements for Material Changes',
      },
    ],
    alternatives: [
      'Define a tiered change management framework: material changes (new reserve asset classes, fundamental protocol changes) require 30-day prior notice with approval; operational changes (technical upgrades, fee adjustments) require 7-day post-implementation notification; minor changes require no notification.',
    ],
  },

  'stablecoin-liability': {
    impact: `Imposing broad personal director liability for any inaccuracy in the stablecoin whitepaper — including inaccuracies in forward-looking statements — creates a liability regime far more stringent than Kenyan company law or securities law currently imposes for any other class of financial instrument. No rational director will accept appointment to a stablecoin issuer board under this standard, which effectively prevents the formation of professional governance structures.`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'MAS stablecoin liability framework holds the issuing entity liable for whitepaper inaccuracies, not individual directors. Director liability is limited to fraudulent misrepresentation (knowingly false statements) — the same standard as general company law under the Companies Act. No strict liability for unknowing errors.',
        source: 'MAS SCS Regulatory Framework 2023; Singapore Companies Act Cap. 50 — Director Liability',
      },
      {
        jurisdiction: 'United States',
        flag: '🇺🇸',
        approach: 'SEC prospectus liability standards (Section 11 of the Securities Act) hold directors liable for material misstatements unless they can demonstrate due diligence (reliance on experts, reasonable investigation). This "due diligence defence" prevents liability for unknowing errors and is the global standard for securities disclosure liability.',
        source: 'Securities Act 1933 §11; Escott v. BarChris Construction Corp. (1968) — Due Diligence Defence',
      },
    ],
    alternatives: [
      'Align director liability with Kenyan Companies Act standards: directors are liable for fraudulent misrepresentation (knowingly false or reckless) but have a due-diligence defence for unknowing errors. Entity (not director) bears strict liability for material omissions.',
      'Require errors-and-omissions insurance for stablecoin whitepaper liability rather than personal director exposure — this distributes risk efficiently while maintaining accountability through market mechanisms.',
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // PART IX — CAPITAL & FINANCE
  // ═══════════════════════════════════════════════════════════════

  'insurance-coverage': {
    impact: `Requiring all insurance to be sourced from Kenyan insurers — when no Kenyan insurer currently offers competitive crypto custody or cybersecurity insurance products — creates a market that doesn't exist yet as a regulatory pre-condition. VASPs cannot obtain the required coverage because the insurance product doesn't exist at scale in Kenya, and the regulator cannot grant licences to operators who cannot obtain the required insurance.`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'MAS requires VASPs to maintain adequate insurance but does not restrict insurers to Singapore-domiciled entities. Lloyd\'s of London, Zurich, and international specialty insurers providing crypto custody coverage are widely used by Singapore VASPs. The focus is on the adequacy of coverage, not the insurer\'s domicile.',
        source: 'MAS Notice PSN05 — Insurance Requirements for Payment Institutions',
      },
      {
        jurisdiction: 'United States',
        flag: '🇺🇸',
        approach: 'US state regulators require surety bonds or fidelity insurance but do not restrict insurer domicile. Lloyd\'s, Bermuda Form, and international specialty markets provide most crypto custody insurance. The requirement is that the insurer is licensed to write in the relevant jurisdiction, not that it is domestically domiciled.',
        source: 'NY DFS BitLicense 23 NYCRR 200.9 — Surety Bond and Insurance Requirements',
      },
    ],
    alternatives: [
      'Allow insurance from any insurer licensed in Kenya, an OECD member state, or a FATF-equivalent jurisdiction — removing the Kenya-only restriction while maintaining quality standards.',
      'Accept equivalent protection mechanisms: surety bonds from any internationally rated (A-/S&P or equivalent) financial institution, segregated reserve funds held in trust, or reinsurance backstops from international markets.',
    ],
  },

  'external-auditor': {
    impact: `Combining ICPAK-only accreditation with a mandatory 4-year maximum auditor tenure creates a talent bottleneck. With a limited pool of ICPAK-qualified crypto-experienced auditors, mandatory rotation every 4 years means licensees cycle through the available pool rapidly, ending up with auditors who lack accumulated institutional knowledge. The authority's ability to extend the auditor's scope (Regulation 74(5)) effectively means regulators can direct what the external auditor examines — undermining auditor independence.`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'MAS requires auditors to be registered under the Companies Act (open to all recognised professional bodies). Auditor rotation is required every 5 years for licensed financial institutions. The scope of the audit is determined by auditing standards (SSA/ISA), not by MAS direction.',
        source: 'Companies Act Cap. 50 Part VIII; MAS Notice BSN01 — Appointment of Auditors',
      },
      {
        jurisdiction: 'Switzerland',
        flag: '🇨🇭',
        approach: 'FINMA requires auditors to be licensed by the FAOA (which recognises international qualifications). Rotation is required every 7 years for the lead audit partner. The audit scope is set by auditing standards (ISA), not FINMA. FINMA may commission separate regulatory audits (aufsichtsrechtliche Prüfung) which are distinct from the statutory audit.',
        source: 'Audit Oversight Act; FINMA Audit Methodology',
      },
    ],
    alternatives: [
      'Open the recognised auditor pool to all IFAC member bodies, with ICPAK as the preferred but not exclusive qualification.',
      'Extend the auditor tenure to 7 years to allow for accumulated institutional knowledge, and implement a 3-year cooling-off period after rotation.',
      'Clearly separate regulatory audit scope (which FINMA/equivalent can expand) from statutory audit scope (set only by auditing standards), preventing regulatory bodies from using auditor access as an inspection tool.',
    ],
  },

  'accounting-records': {
    impact: `Seven-year preservation of ALL digital records — not just financial statements but "accounting records" broadly — combined with the transaction metadata retention creates a cumulative data preservation burden that requires dedicated infrastructure investment. For small operators, the cost of data storage, security, and audit trails for 7 years of detailed records may exceed the annual regulatory fee burden.`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'Singapore Companies Act requires 5-year retention of accounting records — aligned with the Singapore Limitation Act\'s 6-year default limitation period. 7 years is required only for tax records. VASPs follow the 5-year Companies Act standard plus 5-year AML record minimum.',
        source: 'Singapore Companies Act Cap. 50 Section 199; IRAS Record Keeping Requirements',
      },
      {
        jurisdiction: 'United States',
        flag: '🇺🇸',
        approach: 'IRS requires 7-year retention for tax records only. SEC requires 3-year retention for broker-dealer records. BSA requires 5-year retention for AML records. No single category of financial records requires 7 years for non-public VASPs — the burden is proportionate to record type.',
        source: 'IRS Publication 583; 17 CFR §240.17a-4 (SEC); 31 CFR §1010.430 (BSA)',
      },
    ],
    alternatives: [
      'Align with FATF standards: 5-year retention for AML/CFT records; 5-year retention for core accounting records; 2-year retention for operational logs and non-financial system records.',
      'Allow secure deletion of records beyond the required retention period, with a documented data lifecycle policy reviewed annually by the board — preventing permanent accumulation of sensitive personal data.',
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // PART X — CYBERSECURITY
  // ═══════════════════════════════════════════════════════════════

  'trading-platform-approval': {
    impact: `Requiring regulatory pre-approval for all trading platforms before any use creates a fundamental incompatibility with modern software development. Every version update, every new trading pair added, every back-end infrastructure change would technically trigger a re-approval requirement. In practice, this makes it impossible to ship product updates on any reasonable timeline and creates a regulatory backlog that serves no one.`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'MAS requires the core trading engine architecture to be approved at licensing. Subsequent changes that do not materially affect the system\'s risk profile (routine software updates, UI changes, new asset pairs within approved categories) require only notification, not re-approval. Material changes (new settlement mechanisms, fundamental architecture changes) require prior approval.',
        source: 'MAS Technology Risk Management Guidelines 2021; MAS Recognised Market Operator Requirements',
      },
      {
        jurisdiction: 'Switzerland',
        flag: '🇨🇭',
        approach: 'FINMA\'s DLT trading facility framework requires approval of the operating rulebook and system architecture at licensing. Changes are assessed by materiality — routine changes proceed under a "file and proceed" model; structural changes require affirmative approval. No pre-approval is required for routine software deployments.',
        source: 'FINMA Ordinance on Financial Market Infrastructure; FMIA Art. 27',
      },
    ],
    alternatives: [
      'Replace blanket pre-approval with a materiality test: core system architecture requires approval at licensing; material changes (new settlement mechanisms, fundamental protocol changes) require 30-day prior notice; routine updates (software patches, new asset pairs in approved categories, UI changes) require post-deployment notification within 5 business days.',
      'Publish a Technology Pre-Approval Handbook listing specific change types that are automatically approved, approved with notification, or require affirmative approval — eliminating the ambiguity that makes every change a potential compliance event.',
    ],
  },

  'outsourcing-agreements': {
    impact: `A 30-day pre-approval requirement for any "material" service provider change — with an undefined standard for materiality — means that switching a cloud hosting provider, payment gateway, or KYC vendor requires regulatory approval 30 days in advance. In a market where service providers regularly change pricing, terms, or availability, locking VASPs into 30-day advance notice cycles for any service change creates critical operational inflexibility.`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'MAS Outsourcing Guidelines (2016) require prior approval only for "critical" outsourcing arrangements — specifically those where disruption would severely impact MAS\'s ability to supervise or would significantly affect customers. Routine technology changes and non-critical service provider switches require only post-implementation notification within 14 days.',
        source: 'MAS Guidelines on Outsourcing 2016, Paragraph 5 — Classification of Material Outsourcing',
      },
      {
        jurisdiction: 'Switzerland',
        flag: '🇨🇭',
        approach: 'FINMA Circular 2018/3 requires prior notification for outsourcing of core banking functions (settlement, custody, core compliance). Technology infrastructure changes, vendor switches within an approved vendor category, and non-critical service changes require no prior notification.',
        source: 'FINMA Circular 2018/3 — Outsourcing, Paragraphs 40–55',
      },
    ],
    alternatives: [
      'Define "material" outsourcing with specificity: arrangements covering custody of customer assets, AML/CFT compliance functions, or settlement of >25% of daily transaction volume. All other service provider changes require only post-implementation notification.',
      'Adopt a vendor-category approval model: the authority pre-approves categories of vendors (cloud providers, KYC platforms, payment gateways) at licensing; switches within an approved category require no notification; new categories require 14-day notification.',
    ],
  },

  'cybersecurity-risk-reporting': {
    impact: `A 24-hour mandatory report for even failed cyberattack attempts creates an impossible compliance burden. Modern VASPs face hundreds to thousands of automated scan attempts, brute-force attacks, and probing activities daily. If each failed attempt constitutes a "cybersecurity risk" requiring a 24-hour report, the reporting obligation becomes functionally impossible and actively distracts the security team from actual incident response.`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'MAS TRM Guidelines 2021: Category 1 incidents (successful breaches affecting customer data or assets) require notification within 1 hour of discovery. Category 2 incidents (significant failed attacks that indicate a credible threat) require notification within 24 hours. Routine failed attacks do not require notification.',
        source: 'MAS Technology Risk Management Guidelines 2021, Section 9.1 — Incident Management and Reporting',
      },
      {
        jurisdiction: 'United States',
        flag: '🇺🇸',
        approach: 'SEC Cybersecurity Disclosure Rule (2023): public companies report material cybersecurity incidents within 4 days. For financial institutions, the FDIC/OCC Notification Rules require notification within 36 hours of bank service outages affecting customers. Failed attacks that do not impact operations are not reportable.',
        source: 'SEC Cybersecurity Disclosure Rules 17 CFR §229.106; FDIC/OCC/Federal Reserve Computer Security Incident Notification Rule',
      },
    ],
    alternatives: [
      'Adopt a tiered incident classification: Tier 1 (successful breach affecting customer assets or data — report within 1 hour); Tier 2 (significant attempted breach that caused operational disruption — report within 24 hours); Tier 3 (routine failed attacks — include in quarterly cybersecurity summary report to the authority).',
      'Define "cybersecurity risk" requiring notification with specificity: an attack that successfully penetrated the first layer of defence, caused measurable service disruption (>15 minutes), or accessed customer data — not all attempted attacks.',
    ],
  },

  'cybersecurity-audit': {
    impact: `Repeating the warrantless entry power in the cybersecurity context — allowing the authority to enter premises "at any time" to assess cybersecurity infrastructure — creates security risks of its own. Physical access to server rooms, hardware security modules, and cryptographic key management systems by persons who are not trained in secure access procedures could itself introduce vulnerabilities. The provision also imposes unlimited audit scope without defined frequency limits.`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'MAS requires VASPs to conduct annual independent cybersecurity audits by qualified auditors, the results of which are submitted to MAS. MAS may additionally commission its own technology audit with 14 days\' notice. Unannounced physical access to technology infrastructure is not authorised without a court order.',
        source: 'MAS TRM Guidelines 2021 Section 11; MAS Technology Audit Requirements',
      },
    ],
    alternatives: [
      'Require annual independent cybersecurity audits (penetration testing + controls review) by qualified firms, results submitted to the authority within 30 days. MAS-style regulatory technology assessments by the authority require 14 days\' advance notice and defined scope.',
      'Mandate that any authority personnel accessing technology infrastructure have relevant security clearance, sign NDAs, and follow documented secure access protocols — protecting both the operator\'s IP and the integrity of the assessment.',
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // PART XI — CONSUMER ASSETS
  // ═══════════════════════════════════════════════════════════════

  'consumer-service-agreement': {
    impact: `Requiring every VASP to submit a copy of every consumer service agreement to the regulatory authority creates a continuous document submission obligation that conflicts with basic commercial confidentiality. Consumer service agreements are typically updated frequently (terms of service changes, fee updates, new product launches) — each requiring submission. This is a compliance administrative burden with no clear benefit over requiring these to be publicly published.`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'MAS requires VASPs to publish their terms of service and key risk disclosures on their website, accessible to all customers. MAS may request copies of agreements during an inspection. No standing requirement to submit all service agreements to MAS proactively.',
        source: 'MAS Notice PSN02 — Consumer Disclosure Requirements; MAS Guidelines on Online Information',
      },
    ],
    alternatives: [
      'Replace proactive submission with publication: require all consumer service agreements to be publicly accessible on the VASP\'s website and API, with the authority having the right to request specific agreements during inspections. This achieves transparency without administrative burden.',
    ],
  },

  'consumer-care-system': {
    impact: `A 6-month deadline to implement an "extensive care system" — including suitability assessments, vulnerability identification, and product labelling systems — is achievable but creates a significant first-year compliance overhead. The concern is the undefined "standard the authority may determine" — which could escalate requirements arbitrarily after the initial implementation period.`,
    comparators: [
      {
        jurisdiction: 'United States',
        flag: '🇺🇸',
        approach: 'CFPB consumer protection standards for financial services apply substantive rules (no abusive practices, clear disclosures) rather than mandating specific care system architectures. Financial institutions implement consumer protection through processes appropriate to their business model.',
        source: 'Consumer Financial Protection Act 2010 §1031; CFPB Supervisory Examination Procedures',
      },
    ],
    alternatives: [
      'Replace the system-architecture mandate with outcome-based requirements: VASPs must demonstrate a measurable reduction in product-mismatch complaints, a documented suitability assessment process, and a clear complaints resolution pathway — with flexibility in implementation.',
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // PART XIII — ADVERTISING
  // ═══════════════════════════════════════════════════════════════

  'advertising-prohibition': {
    impact: `One year of imprisonment for unlicensed advertising — including any social media post, website, or marketing material that could be construed as promoting VASP services — is a disproportionate criminal penalty that will chill all industry marketing, including by licensed operators who may not yet have fully completed the licensing process. The standard for "advertising VASP services without a licence" is undefined — does a blog post mentioning your product constitute advertising?`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'MAS: unlicensed promotion of DPT services carries a maximum fine of SGD 250,000 or up to 3 years imprisonment — reserved for repeated, deliberate violations causing consumer harm. MAS distinguishes between unlicensed promotion (serious) and technical non-compliance with advertising rules (civil penalty, KES-equivalent max SGD 1M per violation). There is a formal warning and rectification process before criminal enforcement.',
        source: 'Payment Services Act 2019 Section 5 — Prohibition on Unlicensed Provision and Promotion; MAS Enforcement Guidelines',
      },
      {
        jurisdiction: 'Switzerland',
        flag: '🇨🇭',
        approach: 'FINMA uses a tiered enforcement approach: informal guidance → formal notice → administrative fine → criminal referral for persistent, deliberate violations. Criminal prosecution for advertising violations is reserved for fraudulent solicitation, not technical non-compliance. FINMA publishes a "misleading advertising" warning list for unlicensed promoters, giving notice before prosecution.',
        source: 'FINMA Act Art. 44–50 — Enforcement Powers; Swiss Criminal Code Art. 23 — Financial Services Violations',
      },
      {
        jurisdiction: 'United States',
        flag: '🇺🇸',
        approach: 'FTC Act Section 5 prohibits unfair or deceptive advertising — enforced primarily through civil penalties and injunctions, not criminal prosecution. Criminal charges for advertising violations (18 U.S.C. §1341 — wire fraud) require evidence of intentional fraud, not mere technical non-compliance. There is no imprisonment for first-time advertising rule violations.',
        source: 'FTC Act Section 5(a); FinCEN Civil Monetary Penalty Assessment Procedures',
      },
    ],
    alternatives: [
      'Replace criminal imprisonment with civil monetary penalties for advertising violations: warning for first violation, KES 100,000–500,000 for subsequent violations, and criminal referral only for deliberate fraud (knowingly false advertising that caused measurable consumer harm).',
      'Define "VASP advertising" with specificity: a paid promotion, sponsored content, or explicit offer of VASP services to the Kenyan public. Exclude educational content, industry commentary, and employee social media posts from the prohibition.',
      'Establish a formal rectification pathway: if the authority identifies unlicensed advertising, it must issue a written warning giving 14 days to remove the content before any enforcement action. First-time inadvertent violations should result in a civil fine, not criminal prosecution.',
    ],
  },

  'duty-person-advertising': {
    impact: `Two years of imprisonment for any person whose conduct in advertising "is likely to mislead" creates an extraordinarily broad criminal liability for marketing professionals, social media managers, and content creators working for licensed VASPs. The "likely to mislead" standard — without further definition — could criminalise any competitive claim, performance projection, or simplified product description that a regulator later decides was misleading. This standard exceeds criminal advertising liability in any comparable jurisdiction.`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'MAS applies criminal advertising liability only to intentional fraud — knowingly making false statements to induce investment. Negligent or inadvertent misleading content is a civil matter subject to monetary penalties and take-down orders. The distinction between fraudulent intent and mere inaccuracy is critical and well-established in Singapore law.',
        source: 'Payment Services Act 2019 Section 104 — Misleading Advertisements; Securities and Futures Act Section 199 — False Statements',
      },
      {
        jurisdiction: 'United States',
        flag: '🇺🇸',
        approach: 'Advertising fraud requires a showing of scienter (intent to deceive) for criminal prosecution. The CFPB and FTC enforce civil "unfair, deceptive, or abusive acts or practices" (UDAAP) through monetary penalties — not imprisonment — for negligent or reckless advertising violations.',
        source: 'Securities Exchange Act §10(b); SEC Rule 10b-5; CFPB Examination Procedures — Advertising',
      },
    ],
    alternatives: [
      'Replace "likely to mislead" criminal liability with a scienter requirement: criminal prosecution requires proof that the person knew or recklessly disregarded that the advertising was false and intended to induce customers to act on that basis.',
      'Create a tiered advertising liability regime: civil penalties for negligent or inadvertent misleading content; criminal prosecution reserved for intentional fraud causing demonstrable consumer loss exceeding KES 500,000.',
    ],
  },

  'advertisement-general-requirements': {
    impact: `A KES 5M penalty for general advertising non-compliance — including technical violations like incorrect formatting, incomplete risk warnings, or missing disclosures — is disproportionate relative to the harm caused by most advertising deficiencies. The penalty is so severe that it will chill all VASP marketing in Kenya, making it impossible for licensed operators to promote their services effectively.`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'MAS advertising violations carry a maximum penalty of SGD 1M (≈ KES 100M) for the most serious violations, but the enforcement framework uses graduated penalties: warnings and rectification notices for minor violations; civil penalties of SGD 10,000–100,000 for substantive deficiencies; the full ceiling reserved for systematic, persistent violation.',
        source: 'MAS Notice on Digital Payment Token Advertising; MAS Enforcement Philosophy on Proportionality',
      },
    ],
    alternatives: [
      'Adopt a graduated penalty structure: KES 50,000–200,000 for first-time technical violations (missing disclosure, format errors); KES 500,000–2M for substantive misleading content; KES 5M reserved for systematic, repeat violations or those causing demonstrable consumer harm.',
      'Require the authority to issue a rectification notice with a 14-day remedy period before any penalty is imposed for first-time advertising violations.',
    ],
  },

  'performance-information': {
    impact: `KES 5M for performance information violations — the same penalty as general advertising non-compliance — fails to distinguish between a small formatting error in a performance disclosure and a deliberate false performance claim designed to defraud investors. Extremely detailed forecast rules in primary regulation (rather than in published guidance) also make compliance assessment slow and unpredictable.`,
    comparators: [
      {
        jurisdiction: 'United States',
        flag: '🇺🇸',
        approach: 'FINRA rules on performance advertising for investment products use a "not false or misleading" standard, enforced through fines of $2,500–$100,000 for violations. Criminal prosecution requires proof of intentional fraud. Performance advertising standards are published in FINRA Rule 2210, a detailed guidance document — not embedded in primary legislation.',
        source: 'FINRA Rule 2210 — Communications with the Public; SEC Staff Guidance on Investment Performance Advertising',
      },
    ],
    alternatives: [
      'Move detailed performance advertising rules out of primary regulation into a published Notice or Guidance Document, allowing the authority to update standards faster than legislative amendment cycles.',
      'Adopt a proportionality framework: penalties for performance information violations scale with the degree of inaccuracy and the amount of capital attracted by the misleading claim — not a flat KES 5M regardless of impact.',
    ],
  },

  'internet-advertisement': {
    impact: `Requiring paper copies of internet advertisements — in 2026 — imposes an anachronistic compliance burden with no regulatory benefit. The provision appears designed for a pre-digital advertising era and creates compliance costs (printing, physical storage for 7 years) for every digital campaign a VASP runs.`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'MAS requires digital records of all advertising (screenshots, URL snapshots, publication records) maintained for 5 years. Paper copies are explicitly not required. Digital record-keeping systems (automated website archiving, digital marketing platform exports) are fully accepted.',
        source: 'MAS Notice — Digital Payment Token Service Advertising Requirements; MAS Guidelines on Record Keeping',
      },
    ],
    alternatives: [
      'Replace the paper copy requirement with digital record-keeping: screenshots, URL archives, or digital marketing platform exports, retained for 5 years and producible on request.',
    ],
  },

  'ad-record-keeping': {
    impact: `7-year retention for all advertising records — including digital campaign data, social media posts, influencer contracts, and performance metrics — exceeds the standard for any comparable financial advertising record-keeping requirement globally and creates disproportionate data management costs for active marketing operations.`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'MAS requires 5-year retention of advertising records, aligned with the general limitation period. No jurisdiction requires 7-year retention specifically for advertising records as distinct from financial records.',
        source: 'MAS Notice — Advertising Record Keeping Requirements; Singapore Limitation Act Cap. 163',
      },
    ],
    alternatives: [
      'Align advertising record retention with the general 5-year standard used in AML record-keeping. Reserve 7-year retention only for records directly linked to investigated complaints or enforcement actions.',
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // PART XIV — FREEZING & SEIZURE
  // ═══════════════════════════════════════════════════════════════

  'freezing-order-obligations': {
    impact: `Compelling operators to surrender cryptographic private keys to authorities — not just produce transaction records, but hand over the keys themselves — is the most constitutionally and operationally dangerous provision in the entire bill. Cryptographic keys are the functional equivalent of a master password that provides irrevocable access to all customer assets. Surrendering them even temporarily transfers control of customer funds to government, violating property rights under Article 40 of the Kenyan Constitution and creating an unprecedented government access mechanism with no equivalent in any major jurisdiction.`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'MAS freezing orders require VASPs to freeze (prevent movement of) specified assets — not to surrender private keys. The operator retains custody and key management; they simply cannot execute transactions on frozen accounts. Access to keys is never transferred to the government.',
        source: 'Payment Services Act 2019 Part VI — Freezing Powers; Singapore Criminal Procedure Code Section 35 — Seizure Orders',
      },
      {
        jurisdiction: 'United States',
        flag: '🇺🇸',
        approach: 'US law distinguishes between a freeze order (operator cannot move specified assets) and a seizure order (assets transferred to government custody). Private key surrender is not standard practice even under seizure orders — courts typically order custodians to transfer the assets to government wallets, while the custodian retains key management infrastructure. The Fifth Amendment privilege against self-incrimination has been argued (with some success) against compelled key disclosure.',
        source: 'OFAC Freeze Order Procedures; 18 U.S.C. §981 — Civil Forfeiture; US v. Gratkowski (5th Cir. 2020) — Blockchain Analysis',
      },
      {
        jurisdiction: 'Switzerland',
        flag: '🇨🇭',
        approach: 'Swiss freezing orders require VASPs to immobilise specified assets and prohibit transactions from the affected accounts. Key surrender is not required. Swiss courts have held that digital asset custodians must freeze, not surrender, assets under seizure orders. The AMLA (Art. 10) specifically frames obligations as asset immobilisation.',
        source: 'Swiss AMLA Art. 10 — Transaction Monitoring and Freezing; Swiss Criminal Procedure Code Art. 263 — Seizure',
      },
    ],
    alternatives: [
      'Replace key surrender with asset immobilisation: a freeze order requires the VASP to disable withdrawals and transactions from specified accounts, while the VASP retains custody and key management. Government access to the actual keys is never required.',
      'For genuine seizure situations (criminal forfeiture), allow the operator to transfer the assets to a government-controlled wallet address under court supervision, rather than surrendering the private keys themselves.',
      'Add an explicit prohibition on key disclosure: "A freezing or seizure order does not require and cannot compel the disclosure of any private cryptographic key. Compliance is achieved by immobilisation of the specified virtual asset accounts."',
    ],
  },

  'seizure-order-obligations': {
    impact: `The power to seize hardware wallets and "seed phrase backups" is the physical equivalent of seizing not just an account but every account accessible with those credentials. A hardware wallet seizure also involves seizing the property of customers who may not be parties to any investigation. This provision has no equivalent in any comparable jurisdiction's digital asset legislation.`,
    comparators: [
      {
        jurisdiction: 'United States',
        flag: '🇺🇸',
        approach: 'US civil forfeiture of digital assets requires a judicial warrant with probable cause. Hardware wallets may be seized as physical property under a valid warrant, but courts have required chain-of-custody protections and limits on examining the wallet contents beyond the specific assets named in the warrant. Seed phrases cannot be compelled under the Fifth Amendment.',
        source: '18 U.S.C. §981; US v. Ulbricht (2015) — Silk Road Bitcoin Seizure Procedures; Fifth Amendment — Self-Incrimination Privilege',
      },
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'MAS and Singapore Police Force may seize hardware wallets as physical evidence under a valid court warrant. However, the scope of what can be accessed from a seized wallet is limited to assets specifically named in the warrant. The Criminal Procedure Code requires a return of seized items not relevant to the investigation.',
        source: 'Singapore Criminal Procedure Code Sections 35–36; Property Seizure Procedures',
      },
    ],
    alternatives: [
      'Limit hardware wallet seizure scope: only assets directly linked to the specific investigation are accessible from a seized device. Require a court order specifying which virtual asset accounts may be accessed, rather than granting blanket access to all accounts on the hardware.',
      'Add explicit protections for customer assets not named in the seizure order: a VASP\'s hardware wallets contain customer assets from multiple customers; seizure procedures must preserve assets belonging to uninvolved customers.',
      'Prohibit compelled disclosure of seed phrases: align with the Fifth Amendment principle that private cryptographic recovery phrases are the functional equivalent of a combination to a safe, which courts have held cannot be compelled.',
    ],
  },

  'preservation-of-value': {
    impact: `Allowing an authorised officer to force-convert volatile digital assets to fiat — at their discretion, without court order — gives a government official the power to sell customer assets at whatever price the market offers at the time of conversion. If a VASP holds Bitcoin at KES 5M/BTC and the officer converts during a market dip, customers permanently lose the difference. This is a unilateral expropriation power with no equivalent in any comparable jurisdiction.`,
    comparators: [
      {
        jurisdiction: 'United States',
        flag: '🇺🇸',
        approach: 'US marshals may liquidate seized digital assets under court order, but liquidation is subject to an approved plan that minimises market impact. Forced conversion without court approval is not authorised. The FBI\'s treatment of seized Silk Road Bitcoin followed a careful court-approved auction process.',
        source: 'DOJ Cryptocurrency Enforcement Procedures; U.S. Marshals Service Digital Asset Policy',
      },
    ],
    alternatives: [
      'Require court approval before any forced conversion of digital assets, with a liquidation plan that considers market impact and compares conversion value to the most recent independent market valuation.',
      'Preserve assets in kind wherever possible. Authorise conversion only where: the asset is genuinely at risk of total loss (exchange shutdown, network failure), and a court has approved the conversion with a documented price benchmark.',
    ],
  },

  'coordination-committee': {
    impact: `Making the National Intelligence Service (NIS), Directorate of Criminal Investigations (DCI), and National Counter Terrorism Centre (NCTC) permanent members of the coordination committee — with direct access to VASP regulatory data and operations — embeds surveillance agencies into the financial regulatory framework. This is inconsistent with the principle that financial regulation and intelligence gathering are separate functions with different legal standards, and creates a chilling effect on legitimate VASP operations and customer privacy.`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'Singapore\'s financial regulatory coordination (MAS, CAD, ICA) focuses on financial intelligence sharing under FATF-compliant AML/CFT frameworks. Intelligence agencies (ISD) are not permanent members of financial regulatory committees and access financial data only through formal legal process (court orders, MLA treaty requests).',
        source: 'MAS Financial Intelligence Framework; Singapore Corruption, Drug Trafficking and Other Serious Crimes (Confiscation of Benefits) Act',
      },
      {
        jurisdiction: 'Switzerland',
        flag: '🇨🇭',
        approach: 'FINMA coordinates with MROS (Money Reporting Office Switzerland) on AML matters and with fedpol (Federal Office of Police) on serious financial crime, but intelligence agencies (NDB) are not permanent members of financial regulatory bodies. Intelligence access to financial data requires judicial authorization.',
        source: 'Swiss AMLA Art. 10a — MROS Coordination; FINMA Act Art. 23 — Cooperation with Authorities',
      },
    ],
    alternatives: [
      'Limit the coordination committee to financial regulatory bodies: the CMA, CBK, and IRA. Law enforcement agencies (DCI, NIS, NCTC) access financial intelligence only through formal legal channels (court orders, mutual legal assistance requests) with documented evidentiary standards.',
      'If intelligence coordination is deemed necessary, create a separate, purpose-limited intelligence-sharing protocol subject to independent oversight (e.g., Parliamentary committee review) rather than embedding intelligence agencies in the primary regulatory committee.',
    ],
  },

  'sixth-schedule-coordination': {
    impact: `The Sixth Schedule codifies the same intelligence agency integration at the schedule level, making it harder to amend (requires schedule amendment, not just regulation change) and giving it quasi-constitutional permanence in the regulatory architecture. The same concerns apply as for the coordination committee regulation.`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'Singapore\'s equivalent coordination framework is in administrative guidelines (not primary legislation), making it easier to update as the threat environment evolves. Legislative schedules are reserved for technical annexes (fee tables, form specifications), not governance structures.',
        source: 'MAS Act administrative coordination provisions; MAS-CAD-SPF MOU on Financial Crime Coordination',
      },
    ],
    alternatives: [
      'Move intelligence coordination arrangements out of the primary regulatory schedule into an MOU-level agreement between the CMA and relevant agencies, subject to annual review and parliamentary notification — preserving flexibility while maintaining accountability.',
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // PART XV — GENERAL
  // ═══════════════════════════════════════════════════════════════

  'revocation-of-authorisation': {
    impact: `"Conducts business in a manner detrimental to the best interests of the public" as a revocation ground — without defining what "detrimental" means or requiring an objective threshold — gives the authority unlimited discretion to revoke a licence for any conduct it subjectively disfavours. This is a chilling provision that will constrain legitimate product innovation if operators fear that novel services might be later characterised as "detrimental."`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'MAS revocation grounds are enumerated: insolvency, false information in application, failure to pay regulatory fees, failure to commence operations, and specific misconduct grounds tied to defined offences. "Detrimental to the public interest" is not a standalone revocation ground. Any revocation must cite a specific, defined ground.',
        source: 'Payment Services Act 2019 Section 10 — Revocation of Licence',
      },
    ],
    alternatives: [
      'Replace "detriment to the public" with enumerated, specific grounds: systematic AML/CFT failure, insolvency, criminal conviction of key officers for financial crime, or demonstrable fraud against customers exceeding a defined threshold.',
      'Add a proportionate response requirement: the authority must consider lesser sanctions (conditions, fines, management restrictions) before revoking a licence, and document why a lesser sanction is inadequate.',
    ],
  },

  'notice-to-penalise': {
    impact: `This regulation is the procedural model the entire bill should follow — due process before penalties, written notice, right of representation. It is correctly designed. The problem is that this model is not consistently applied across the bill; many other provisions allow penalties and revocations without equivalent procedural safeguards.`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'MAS Notice to Penalise requirements are embedded in the Payment Services Act as a general principle applying to ALL enforcement actions, not just specific sections. This "general due process standard" approach ensures consistent procedural protection across the entire regulatory framework.',
        source: 'Payment Services Act 2019 Section 14 — Notice Before Exercise of Powers (General Application)',
      },
    ],
    alternatives: [
      'Apply the due process standard in this regulation universally: amend the bill to state that the notice-to-penalise procedure in Regulation 147 applies to ALL adverse regulatory actions, including revocations, suspensions, and imposition of conditions — not just monetary penalties.',
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // SCHEDULES
  // ═══════════════════════════════════════════════════════════════

  'second-schedule-application-form': {
    impact: `30+ mandatory attachments at application — including 3-year audited financials, fit-and-proper forms with sworn declarations and 5-year referee lists, credit reports, full technology architecture diagrams, and detailed business plans — creates an application burden that takes months and hundreds of thousands of KES in professional fees to prepare. This entry cost alone (before any licence fee or capital requirement) screens out all but the most heavily capitalised applicants.`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'MAS online licence application for a Standard PI requires: completed online form, corporate documents (ACRA registration, constitution), personal information for key persons (identity, experience, clean criminal record check), and a brief business description. Full supporting documentation is submitted only after the application is pre-approved in principle.',
        source: 'MAS Licence Application Process — Payment Institutions; MAS MASNET Application Portal',
      },
      {
        jurisdiction: 'Seychelles',
        flag: '🇸🇨',
        approach: 'FSA application for a VASP licence requires: completed application form, business plan (5–10 pages), AML/CFT policy summary, corporate documents, key person information (passport, CV, clean criminal record). Supporting technical documentation is produced only during a second-stage review after initial qualification assessment.',
        source: 'Seychelles FSA VASP Application Guidelines 2022',
      },
    ],
    alternatives: [
      'Adopt a two-stage application process: Stage 1 (pre-qualification, 30 days) requires only core documents — corporate registration, key person identities, business concept, and evidence of capital on deposit. Stage 2 (full licensing, 60 days) requires the complete documentation set only for pre-qualified applicants.',
      'Move detailed supporting documentation requirements (architecture diagrams, full IT policy documentation, referee lists) to the 6-month post-licensing compliance review rather than the initial application, reducing entry friction without reducing eventual oversight standards.',
    ],
  },

  'third-schedule-business-plan': {
    impact: `A mandatory 12-section hyper-detailed business plan — required at initial application before receiving any regulatory feedback — forces applicants to invest in full business planning for an application that may be rejected on other grounds. The plan requires detailed revenue projections, technology architecture, AML policy, cybersecurity strategy, and operational procedures — essentially the full compliance infrastructure — before even knowing if the licence will be granted.`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'MAS requires a 5-page business overview at application: key services, target market, business model, and 2-year revenue projection. Full operational policies and procedures are reviewed during a post-pre-approval due diligence phase (typically 3 months after initial qualification). This prevents wasted investment in failed applications.',
        source: 'MAS Standard Payment Institution Application Checklist; MAS Licence Application Form SI-01',
      },
    ],
    alternatives: [
      'Reduce the initial business plan requirement to: executive summary (2 pages), key services description (2 pages), 24-month financial projection (1 page), and AML/CFT policy summary (1 page). Full 12-section documentation required only after pre-approval in principle.',
    ],
  },

  'fourth-schedule-fit-proper': {
    impact: `Three separate sworn declarations, credit reports from multiple agencies, and 5-year referee lists — for every director, senior officer, significant shareholder, and beneficial owner — create a weeks-long fit-and-proper preparation process for each individual. A VASP with 3 founders, 2 directors, and a 30% investor may need to prepare complete packages for 6+ individuals simultaneously. The sworn declaration requirement also raises constitutional concerns (compelled self-incrimination risk if the declaration is inaccurate).`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'MAS fit-and-proper assessment for individual directors/key persons requires: completed MAS standard form (name, nationality, education, experience, legal history), latest personal credit report, and one referee contact. The standard form is a single document, not three separate sworn declarations. MAS conducts its own background check process.',
        source: 'MAS Forms 1A/1B — Personal Particulars and Undertaking for Key Persons; MAS Fit and Proper Guidelines 2013',
      },
    ],
    alternatives: [
      'Simplify to a single, standardised personal declaration form per individual: identity, professional experience, criminal history self-declaration, regulatory sanctions self-declaration, and consent to background check. The regulatory authority conducts its own credit and criminal background checks from public records — this is more reliable and less burdensome than multiple applicant-prepared sworn declarations.',
    ],
  },

  'fifth-schedule-capital': {
    impact: `This schedule codifies the capital requirements from Regulation 40 — the specific concern is that the KES 150M–500M thresholds, combined with the stacking model for multi-activity operators, make Kenya\'s capital requirements among the highest globally relative to GDP per capita and local market size. A requirement calibrated for a G7 market is being applied to an emerging market with fundamentally different scale economics.`,
    comparators: [
      {
        jurisdiction: 'Singapore',
        flag: '🇸🇬',
        approach: 'MAS capital requirements are calibrated to Singapore\'s market: SGD 100,000–250,000. In purchasing-power-adjusted terms, this is broadly similar to a proportionate requirement for the Kenyan market of approximately KES 10M–30M — far below the proposed KES 150M–500M.',
        source: 'MAS Payment Services (Licensing and Conduct) Regulations 2019, Second Schedule — Capital Requirements',
      },
      {
        jurisdiction: 'Seychelles',
        flag: '🇸🇨',
        approach: 'Seychelles FSA: USD 50,000–500,000 (KES 6.5M–65M), with the upper range applying to full exchange licences. The Seychelles approach demonstrates that a well-regulated VASP market can function with capital requirements 5–8x lower than Kenya\'s proposed levels.',
        source: 'Seychelles VASP Act 2022, Fifth Schedule',
      },
    ],
    alternatives: [
      'Recalibrate capital requirements based on GDP per capita and market size metrics: KES 20M for wallet providers; KES 30M for investment advisers; KES 50M for exchanges and stablecoin issuers. Risk-based add-ons (e.g., 0.5% of monthly volume above KES 1B) can be applied dynamically as operators scale.',
    ],
  },
};

// ─── Helper: get analysis for a regulation (with fallback) ──────────────────
export function getAnalysis(regId) {
  return ANALYSIS[regId] || null;
}
