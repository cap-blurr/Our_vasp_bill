// src/regulations.js
// Extracted from: Draft Virtual Asset Service Providers Regulations, 2026
// Document: 150 pages, Regulations 4–147 + Six Schedules
// Author: SD Maundu | Created: 17 March 2026

export const REGULATIONS = [
  // ═══════════════════════════════════════════════════════════════
  // PART I — PRELIMINARY (Regulations 1–4)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "fees-payable",
    title: "Fees Payable",
    ref: "Regulation 4, First Schedule (p.10, pp.115–116)",
    summary: "The fees payable under these Regulations shall be as set out in the First Schedule. Withdrawal of any application results in forfeiture of the application fee. Application fees are KES 100,000 for most categories, with KES 20,000 for Virtual Asset Investment Advisers. Licence fees range from KES 100,000 (Investment Adviser) to KES 2,000,000 (Virtual Asset Exchange, Stablecoin Issuance). Renewal fees are variable: exchanges pay 2% of gross income of the previous year or KES 2,000,000 (whichever is higher); most other categories pay 0.15% of gross turnover or a fixed floor (whichever is higher); virtual asset managers pay 0.05% of assets under management or KES 500,000 (whichever is higher). Transaction fees: 0.05% of transaction value payable by EACH counterparty on exchanges and token issuance platforms. Approval of a virtual asset offering costs 0.5% of the value of the successful offer. Approval of stablecoin issuance costs KES 200,000. Approval fee for proposed acquisition, transfer or disposal of shares in a licensee is 0.25% of transaction value. Approval fee for assignment or transfer of a licence is 0.25% of transaction value.",
    severity: ""
  },

  // ═══════════════════════════════════════════════════════════════
  // PART II — LICENSING AND AUTHORIZATION REQUIREMENTS (Regs 5–14)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "application-for-licence",
    title: "Application for a Licence",
    ref: "Regulation 5, Second Schedule (pp.10–12)",
    summary: "An application for a licence to offer one or more permissible activities pursuant to section 10(1) of the Act shall be made in the form set out in the Second Schedule. The application must be accompanied by: (a) personal details, qualifications, experience, business interests and occupation of the applicant's directors, senior officers, significant shareholders, and beneficial owners; (b) a business plan per the Third Schedule; (c) a duly filled fit and proper assessment form per the Fourth Schedule; (d) proof of source of funds; (e) a description of systems and controls; (f) operational policies including risk management, AML/CFT/CPF, cybersecurity and IT policy, and complaints management policy; (g) copies of contracts and oversight arrangements; (h) evidence of paid-up capital and liquid capital at amounts specified in the Fifth Schedule; (i) audited financial statements for THREE YEARS prior to submission, or opening financial statements verified by an auditor as applicable; (j) evidence of sufficient human and technology resources per Regulation 17; (k) for exchanges, token issuance platforms, virtual asset offerings and wallet providers, business rules per Regulation 19; (l) evidence of adequate systems and controls to maintain market integrity including avoidance of market abuse; (m) the class of virtual assets intended to be traded or available for subscription; (n) details of principal business address and website; (o) certified copy of certificate of incorporation; (p) up-to-date CR12; (q) register of beneficial owners from the Registrar of Companies; (r) proof of payment of application fee per First Schedule; (s) any additional requirements under the Act. The applicant may be required to participate in an interview upon request of the regulatory authority.",
    severity: ""
  },
  {
    id: "three-year-audit-history",
    title: "3-Year Audit History Requirement",
    ref: "Regulation 5(2)(i) (p.11)",
    summary: "An applicant must submit audited financial statements for three years prior to submission of the application, or alternatively the opening financial statements verified by an auditor, as applicable. This requirement effectively bars startups less than three years old from applying unless they can provide auditor-verified opening financial statements as the alternative pathway.",
    severity: ""
  },
  {
    id: "issuance-of-licence",
    title: "Issuance of Licence",
    ref: "Regulation 6 (p.12)",
    summary: "Where the relevant regulatory authority is satisfied that the applicant meets the requirements of section 11 of the Act, it may issue the applicant with a VASP licence upon payment of the licence fee prescribed under the First Schedule. A licence issued may contain such conditions as the relevant regulatory authority may determine.",
    severity: ""
  },
  {
    id: "commencement-of-business",
    title: "Commencement of Virtual Asset Business",
    ref: "Regulation 7 (p.12)",
    summary: "Upon grant of a licence, a licensee shall commence its virtual asset business immediately on the date of grant. Where commencement is not practicable, the licensee shall seek an extension from the regulatory authority, which shall not exceed twelve months from the date the licence was granted.",
    severity: ""
  },
  {
    id: "alteration-of-facts",
    title: "Alteration of Facts Disclosed in Application",
    ref: "Regulation 8 (pp.12–13)",
    summary: "An applicant must give written notice to the regulatory authority of any proposed alteration to the information in the original application, or the occurrence of any material event affecting information provided. 'Material event' includes: failure or material degradation of a critical third-party service provider; any litigation or dispute resolution activity; insolvency, a material liquidity shortfall or credible threat to solvency; an enforcement action, criminal investigation or sanction; a cybersecurity incident; any intended change in ownership and actual change or control that is material; and any other action or incident directly or indirectly affecting the general business operations.",
    severity: ""
  },
  {
    id: "grounds-for-rejection",
    title: "Grounds for Rejection of an Application",
    ref: "Regulation 9 (pp.13–14)",
    summary: "The regulatory authority may reject an application where: (a) the applicant fails to respond to requests for clarification or further information; (b) the applicant fails to participate in an interview under Regulation 5(3); (c) the applicant does not have requisite capability to comply with AML/CFT/CPF requirements; (d) the applicant's directors or senior officers fail to meet fit and proper criteria under section 18 of the Act; (e) the granting of the licence is against public interest or public policy; (f) the applicant has a record of regulatory breaches or non-compliance with prudential, AML/CFT/CPF or any other regulatory requirements in Kenya or any other jurisdiction; or (g) the approval may pose a risk to the integrity, security and stability of the financial system.",
    severity: ""
  },
  {
    id: "false-misleading-statements",
    title: "False and Misleading Statements",
    ref: "Regulation 10 (pp.14–15)",
    summary: "A person shall not, in connection with an application for a licence, make a statement to the regulatory authority which they know or ought reasonably to know is false or misleading, or omit to state any matter where they know or ought to know that the omission makes the application misleading. Criminal penalties: an individual faces a fine not exceeding KES 7 million or imprisonment for up to 3 years, or both; a company faces a fine not exceeding KES 20 million.",
    severity: ""
  },
  {
    id: "licence-transfer-lockin",
    title: "Assignment and Transfer of Licence (36-Month Lock-in)",
    ref: "Regulation 11 (pp.15–16)",
    summary: "A licensee wishing to assign or transfer a licence must pay the fee set out in the First Schedule and apply to the regulatory authority. An assignment or transfer in contravention is null and void and constitutes grounds for revocation. The application shall ONLY be considered if the licensee: (a) commenced operations in accordance with the conditions of the licence; (b) held the licence for a MINIMUM PERIOD OF 36 MONTHS from the date of commencement of business; and (c) has fully complied with the Regulations. In determining the application, the authority considers whether the transferee meets all licensing requirements, whether all outstanding fees and penalties are paid, whether there are no outstanding non-compliance matters, and whether the transfer is necessary in the interest of the business, consumers, or financial stability.",
    severity: ""
  },
  {
    id: "forex-conversion-authorisation",
    title: "Authorisation for Conversion of Virtual Assets to/from Foreign Currency",
    ref: "Regulation 12 (pp.15–16)",
    summary: "A person seeking to transact conversion of virtual assets to or from foreign currency must apply to the regulatory authority for authorisation before commencing. The authority considers the financial condition and history of the applicant and may grant authorisation subject to conditions. The authorisation shall, unless earlier revoked, be valid from the date it is issued and SHALL EXPIRE ON 31ST DECEMBER of the year it is issued — meaning it must be renewed annually regardless of compliance status.",
    severity: ""
  },
  {
    id: "renewal-of-authorisation",
    title: "Renewal of Authorisation",
    ref: "Regulation 13 (p.16)",
    summary: "An authorisation granted under Regulation 12 may, on expiry, be renewed on an annual basis. The renewal application must be lodged at least two months prior to the expiry of the authorisation.",
    severity: ""
  },
  {
    id: "revocation-of-authorisation",
    title: "Revocation of Authorisation",
    ref: "Regulation 14 (p.16)",
    summary: "The regulatory authority may, by written notice, revoke or suspend an authorisation if the authorised person: (a) ceases to carry on business in Kenya or goes into liquidation or is wound up or otherwise dissolved; (b) fails to comply with the Regulations or any condition attached to an authorisation; or (c) conducts business in a manner detrimental to the best interests of the public. Before revoking or suspending, the authority must give at least 14 days' notice and consider any written representations.",
    severity: ""
  },

  // ═══════════════════════════════════════════════════════════════
  // PART III — ONGOING REQUIREMENTS (Regulations 15–40)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "ongoing-notifications",
    title: "Ongoing Notifications",
    ref: "Regulation 15 (p.17)",
    summary: "A licensee shall ensure that notifications and reports required under section 25 of the Act are submitted in the form and manner specified by the regulatory authority. The CEO of the licensee shall provide a notification or report in accordance with section 25 of the Act.",
    severity: ""
  },
  {
    id: "ongoing-obligations",
    title: "Ongoing Obligations",
    ref: "Regulation 16 (p.17)",
    summary: "Every licensee shall ensure that its virtual asset services are conducted in a fair, transparent and efficient manner for reducing systemic or other risks. The licensee shall submit to the regulatory authority reports addressing matters affecting the business, which may include: ongoing compliance with licence terms; complaints received and resolutions; disciplinary matters; adequacy and performance of systems and controls; financial matters concerning the operation; and any other information required.",
    severity: ""
  },
  {
    id: "human-technology-resources",
    title: "Human and Technology Resources",
    ref: "Regulation 17 (p.18)",
    summary: "A licensee shall have sufficient human and technology resources to operate a virtual asset business, satisfying the regulatory authority with respect to: (a) employing fit and proper staff, appropriately trained; (b) appointing a management team with adequate levels of experience and expertise; (c) technology resources that are secure and maintain data confidentiality; and (d) details of systems and associated technologies to be adopted.",
    severity: ""
  },
  {
    id: "proper-markets",
    title: "Establishment of Proper Markets",
    ref: "Regulation 18 (p.18)",
    summary: "A VASP shall, to the satisfaction of the regulatory authority, establish and operate proper markets that are conducive to the economic good of the country and that do not cause or promote instability.",
    severity: ""
  },
  {
    id: "business-default-rules",
    title: "Business and Default Rules",
    ref: "Regulation 19 (pp.18–21)",
    summary: "A licensee shall have clear and fair business rules that are (a) legally enforceable by consumers and (b) published and freely available. Compliance procedures must ensure: business rules are enforced; complaints and appeal procedures are in place; disciplinary action with financial and other penalties is available; and procedures for detecting, preventing and reporting market abuse exist. Business rules must be approved by the regulatory authority and specify the class of virtual assets traded, financial reporting requirements (including applicable international accounting standards), auditing standards, the licensee's track record, and any restrictions on transferability. A VASP must have default rules enabling action on unsettled virtual asset transactions where a consumer cannot fulfil obligations. A virtual asset exchange or token issuance platform shall have rules relating to: access methods, hours of operation, admission/suspension/delisting of virtual assets, dealing conditions and investor protection, asset custody arrangements, real-time disclosure, order procedures and minimums, pre and post trade transparency, market abuse prevention, investigation and inspection procedures, suspension of trading, conduct of trading and reporting, dispute resolution, trading fees, account funding requirements, order matching and priorities, trade settlement and confirmation, and deposit and withdrawal procedures.",
    severity: ""
  },
  {
    id: "business-continuity-plan",
    title: "Business Continuity Plan",
    ref: "Regulation 20 (pp.21–22)",
    summary: "A licensee shall have in place a formalized business continuity plan, approved by its board of directors, addressing its strategy for maintaining continuity of operations, plans for communicating and regularly testing the plan. The plan shall outline arrangements to reduce impact of short, medium or long-term disruption, including: resource requirements; recovery priorities; and communication arrangements for internal and external parties. The plan must be reviewed and tested at least every two years. The plan or testing results must be made available to the regulatory authority upon request. Contravention: the regulatory authority may impose an administrative penalty of KES 3 million.",
    severity: ""
  },
  {
    id: "transaction-metadata",
    title: "Transaction Information and Metadata Collection",
    ref: "Regulation 21 (pp.22–23)",
    summary: "Pursuant to section 44 of the Act, a licensee shall: (a) record the activity and transactions effected on or through its distributed ledger technology platform; (b) maintain activity and transaction records for at least SEVEN YEARS; and (c) provide the regulatory authority or any competent authority with such records in a timely manner. The information shall include technical and contextual metadata on transactions such as wallet addresses, transaction hashes, network or chain identifiers, high-precision timestamps, order-book and API interaction logs, and identifiers of cross-chain or bridge pathways.",
    severity: ""
  },
  {
    id: "employee-disclosure",
    title: "Disclosure of Information by Employees",
    ref: "Regulation 22 (p.23)",
    summary: "A licensee shall have appropriate procedures and protection measures for allowing employees to disclose any information to the regulatory authority, competent authorities or comparable bodies involved in the prevention of market abuse, financial crime, money laundering, terrorism financing or proliferation financing.",
    severity: ""
  },
  {
    id: "consumer-disclosure",
    title: "Disclosure of Information to Consumers",
    ref: "Regulation 23 (pp.22–24)",
    summary: "A licensee shall make disclosures to consumers prior to engaging in any transaction or providing any service, including: (a) full details of current licence status and specific categories of services licenced; (b) full legal name, physical address in Kenya and contact information; (c) clear disclosure of any actual conflicts of interest and mechanisms to manage them; (d) a publicly accessible complaints policy including maximum response time and escalation path to the regulatory authority; (e) accurate description of services offered, features, characteristics and limitations; (f) comprehensive risk statement including market volatility, technology and cybersecurity risks; (g) applicable fees, commissions or other charges and timing of payment; (h) procedures for withdrawals, suspension and cancellation of transactions; (i) security protocols for transaction execution, consumer authentication and data protection; (j) business continuity and recovery measures; and (k) any material change in business operations, ownership, management, terms of service or rates/charges. A licensee shall not exclude or restrict any duty or liability to a consumer under law, any liability for failure to exercise reasonable skill, care and diligence, or any other duty of skill, care and diligence. A licensee may NOT charge the consumer for fulfilment of its disclosure and information obligations.",
    severity: ""
  },
  {
    id: "consumer-information",
    title: "Consumer Information / Suitability",
    ref: "Regulation 24 (pp.24–25)",
    summary: "A licensee shall seek sufficient information about the consumer and their circumstances to ensure services are consistent with those circumstances. When recommending investments or exercising discretion, the licensee must take and document reasonable steps to ensure suitability, considering all available alternatives. A licensee shall not recommend or execute any sale or purchase unsuitable for the consumer. A licensee shall take all reasonable steps not to give advice or effect a transaction unless the advice or transaction is suitable considering facts disclosed by and known about the consumer.",
    severity: ""
  },
  {
    id: "record-keeping-reports",
    title: "Record Keeping and Submission of Reports",
    ref: "Regulation 25 (pp.24–25)",
    summary: "A licensee shall use systems providing an accurate and fully accessible audit trail of all transactions. Within TEN DAYS of the end of every calendar month, the licensee shall submit daily reports to the regulatory authority, in the manner specified, regarding: (a) volumes, values and geographic distribution of each virtual asset transfer or payment; (b) incidents of fraud, theft or robbery; (c) material service interruptions and major security breaches; (d) complaints reported, including remedial measures taken, those resolved and those outstanding.",
    severity: ""
  },
  {
    id: "provision-of-information",
    title: "Provision of Information / Premises Entry Powers",
    ref: "Regulation 26 (pp.25–26)",
    summary: "The regulatory authority may: (a) require an officer of the licensee to produce books of accounts and other documents, and statements or information relating to the affairs of the licensee within a reasonable time; (b) by notice, require a licensee to provide information in such manner and form as specified for assessing compliance; (c) AT ANY TIME, ENTER ANY PREMISES where a licensee is carrying on business, or any premises where the authority reasonably suspects that any business is carried out in contravention of these Regulations. Note: no warrant or advance notice requirement is specified for premises entry.",
    severity: ""
  },
  {
    id: "register-of-interests",
    title: "Register of Interests",
    ref: "Regulation 27 (p.26)",
    summary: "A licensee shall maintain a register of interests disclosing any holdings, directorships, or beneficial interests of directors, senior officers, or associated parties in any virtual asset issuer. The register shall be reviewed at least annually and made available to the regulatory authority upon request.",
    severity: ""
  },
  {
    id: "shareholding-cap",
    title: "Shareholding Cap (33.3%) for Exchanges, Stablecoin Issuers and Wallet Providers",
    ref: "Regulation 28 (p.26)",
    summary: "In relation to a virtual asset exchange, stablecoin issuance or virtual asset wallet provider, a person shall not: (a) control or be beneficially entitled, directly or indirectly, to more than 33.3% of the issued share capital or voting rights, directorship appointments, dividends or interest on shareholder loans; or (b) appoint more than one-third of the board members. Exception: a person may own more than 33.3% if (a) the person is a corporate entity with diverse shareholding; AND (b) the ultimate beneficial owners do not hold more than 33.3% of the shareholding in that entity.",
    severity: ""
  },
  {
    id: "ownership-changes",
    title: "Ownership Changes",
    ref: "Regulation 29 (pp.26–28)",
    summary: "Where a person desires to directly or indirectly acquire shares or an interest in a licensee, or where a licensee wishes to voluntarily transfer or dispose of shares, an application must be made to the regulatory authority upon payment of the fee set out in the First Schedule. The application shall include sufficient information about: the nature of the proposed acquisition, disposal or transfer; the identity of the proposed acquirer/acquiree and any controlling persons; and how the acquisition will be financed. The authority assesses: suitability and character; ability to conduct business long-term; reputation, knowledge, skills and experience of new directors; fitness and probity of new directors, significant shareholders and senior officers; financial soundness; source of funds; ongoing regulatory compliance; and any reasonable grounds to suspect financial crime, money laundering, terrorism financing or proliferation financing. The authority may consult competent authorities responsible for mergers and acquisitions and AML/CTF/CPF.",
    severity: ""
  },
  {
    id: "conflict-of-interest",
    title: "Conflict of Interest",
    ref: "Regulation 30 (pp.28–29)",
    summary: "A licensee shall: (a) identify and document likely conflicts of interest; (b) adopt documented policies to minimize them including identifying instances where it would refuse to act, and arranging to minimize consumer loss; (c) avoid conflicts and where one exists, decline to act, or if manageable, disclose it and put consumer's interests first. A licensee shall not exploit information obtained from serving a consumer for its own benefit or that of its employees or other consumers — it must adopt procedures including information barriers, IT barriers, physical barriers or separate offices, train employees on conflicts, and obtain undertakings from employees. Where a licensee has a material interest in a transaction, it shall not advise or exercise discretion unless it has disclosed the interest or taken reasonable steps to ensure neither the interest nor relationship adversely affects the consumer. A licensee shall take reasonable steps to ensure neither it nor its employees or agents offers, gives, solicits or accepts any inducement likely to conflict with duties to consumers.",
    severity: ""
  },
  {
    id: "point-of-service-info",
    title: "Information at Point of Service",
    ref: "Regulation 31 (pp.29–30)",
    summary: "A licensee shall provide at the point of service: (a) a clear and understandable description of services offered and the rates, terms, conditions and charges; (b) clear terms of service to consumers and agents; (c) the name of the licensee; (d) a telephone number or other contact medium providing access to its consumer care system. This information shall be published and displayed conspicuously at all points of service.",
    severity: ""
  },
  {
    id: "customer-due-diligence",
    title: "Customer Due Diligence Prior to Onboarding",
    ref: "Regulation 32 (p.30)",
    summary: "A licensee shall perform customer due diligence prior to onboarding a consumer by identifying and verifying the identity details of the consumer. This shall be done in accordance with obligations under the Proceeds of Crime and Anti-Money Laundering Act.",
    severity: ""
  },
  {
    id: "due-diligence-trading",
    title: "Due Diligence Before Admission for Trading",
    ref: "Regulation 33 (pp.30–31)",
    summary: "A virtual asset exchange or token issuance platform provider shall perform due diligence on all virtual assets before including them for trading, taking into consideration: (a) the regulatory status of the virtual asset and any impact on the exchange's regulatory obligations; (b) supply, demand, maturity and liquidity; (c) complexity and development; (d) risks associated with the virtual asset and its issuer; (e) enforceability of consumer rights. Where a virtual asset is based on a smart contract, the smart contract must be audited by an independent assessor before admitting it for trading. The exchange or platform shall continuously monitor each virtual asset's viability to continue or cease trading.",
    severity: ""
  },
  {
    id: "transaction-confirmation",
    title: "Transaction Confirmation",
    ref: "Regulation 34 (p.31)",
    summary: "A licensee shall, in respect of every contract for the exchange, purchase or sale of a virtual asset it has entered into, not later than the end of the trading day after the contract was entered into, make out and send to the consumer a confirmation with respect to the transaction.",
    severity: ""
  },
  {
    id: "fair-allocation",
    title: "Fair Allocation",
    ref: "Regulation 35 (p.31)",
    summary: "Where a licensee has aggregated a consumer's order with its own order or another consumer's order, the licensee shall in the subsequent allocation: (a) not give unfair preference to itself or to any consumer; and (b) give priority to satisfying orders for consumer transactions if all orders cannot be satisfied.",
    severity: ""
  },
  {
    id: "timely-allocation",
    title: "Timely Allocation",
    ref: "Regulation 36 (p.31)",
    summary: "A licensee shall ensure that any transaction it executes is allocated to the consumers who gave the orders in a timely and equitable manner.",
    severity: ""
  },
  {
    id: "off-market-transactions",
    title: "Off-Market Transactions",
    ref: "Regulation 37 (pp.31–32)",
    summary: "A licensee shall report all trades in virtual assets dealt with otherwise than at a licensed virtual asset exchange or token issuance platform provider, in such manner as may be specified by the regulatory authority.",
    severity: ""
  },
  {
    id: "inspections",
    title: "Inspections",
    ref: "Regulation 38 (p.32)",
    summary: "The regulatory authority may conduct routine onsite and offsite inspections to assess compliance with the Act and Regulations. The licensee shall: (a) grant full access to premises, systems and records; (b) provide explanations, clarifications or data as requested; and (c) implement remedial measures within such period as the authority may specify. The authority shall maintain continuous surveillance of market conduct, transactional activity and systemic risk using data analytics and reporting tools.",
    severity: ""
  },
  {
    id: "compliance-officer",
    title: "Compliance Officer",
    ref: "Regulation 39 (pp.32–33)",
    summary: "The board of directors shall appoint a compliance officer who shall: (a) monitor compliance with regulatory requirements (and not be involved with any function that is the subject of compliance); (b) have sufficient authority; (c) have unfettered access to information; (d) have direct access to the board; (e) take necessary action to rectify non-compliance; (f) report non-compliance issues that cannot be rectified to the board; (g) report material breaches to the board; (h) submit an annual corporate governance report to the board; and (i) ensure conflict of interest is avoided where compliance staff perform non-compliance tasks.",
    severity: ""
  },
  {
    id: "risk-management",
    title: "Risk Management",
    ref: "Regulation 40 (p.33)",
    summary: "For the purposes of risk management, a licensee shall comply with: (a) any technical standards issued by the regulatory authority from time to time; and (b) any other international standards and risk management guidelines which may be required by the regulatory authority from time to time.",
    severity: ""
  },

  // ═══════════════════════════════════════════════════════════════
  // PART IV — CORPORATE GOVERNANCE REQUIREMENTS (Regulations 41–45)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "governance-arrangements",
    title: "Governance Arrangements",
    ref: "Regulation 41 (pp.33–34)",
    summary: "A licensee shall establish effective, transparent and adequate governance arrangements including: (a) a board of directors meeting fit and proper criteria per the Fourth Schedule; (b) clearly defined and documented organisational structure including ownership, oversight and management; (c) segregation of duties and internal control arrangements; and (d) the SEPARATION of virtual asset business by the licensee in a SEPARATE BUSINESS UNIT from its other business units, including maintaining a separate management structure and keeping separate books of account. A licensee offering payment services shall establish adequate operational arrangements including rules and procedures setting out rights and liabilities, risks consumers may incur, measures for prudent management of consumer funds (available at all times for repayment), safety and security measures, and maintenance of separate records and accounts for virtual asset payment processing.",
    severity: ""
  },
  {
    id: "board-of-directors",
    title: "Board of Directors Requirements",
    ref: "Regulation 42 (pp.34–35)",
    summary: "The board shall consist of: (a) at least THREE members, of whom ONE-THIRD shall be independent directors; and (b) not more than one-third of directors shall be related to any director. The chairperson shall NOT be appointed as the CEO. An 'independent director' is defined as a person who: has not been employed by the licensee in an executive capacity within the last 5 years; is not associated with an adviser, consultant, senior management member or employee in executive capacity within last 5 years; is not associated with a significant consumer or supplier or has had no business relationship within last 5 years; does not have a contract of service with the VASP or its senior management; is not a close relation of an adviser, consultant or senior management member; has not had any such relationships with any affiliate of the licensee.",
    severity: ""
  },
  {
    id: "board-role",
    title: "Role of the Board of Directors",
    ref: "Regulation 43 (pp.35–36)",
    summary: "The board shall be collectively responsible for governance and in particular shall: (a) give strategic direction and effective oversight; (b) ensure the integrity of accounting and financial reporting systems; (c) manage risks and regularly review risk management effectiveness; and (d) ensure compliance with the Act and other relevant laws. The board may establish committees including an audit committee. The board shall not be discharged from its duties for matters delegated to committees or management.",
    severity: ""
  },
  {
    id: "ceo-requirements",
    title: "Chief Executive Officer Requirements",
    ref: "Regulation 44 (pp.35–36)",
    summary: "A person shall qualify for appointment as CEO if that person: (a) meets the fit and proper requirements under section 18 of the Act; and (b) possesses professional competence in virtual assets or other fields relevant to the operations of virtual asset business.",
    severity: ""
  },
  {
    id: "icpak-mandate",
    title: "Finance Officers and Internal Auditors — ICPAK Mandate",
    ref: "Regulation 45 (p.36)",
    summary: "The persons responsible for the management of the FINANCE FUNCTION and the INTERNAL AUDIT FUNCTION in a licensee shall be members of the Institute of Certified Public Accountants of Kenya (ICPAK). This is a mandatory professional body membership requirement.",
    severity: ""
  },

  // ═══════════════════════════════════════════════════════════════
  // PART V — INTERVENTION AND STATUTORY MANAGEMENT (Regs 46–48)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "intervention-management",
    title: "Intervention in Management",
    ref: "Regulation 46 (pp.36–37)",
    summary: "The regulatory authority may intervene in the management of a licensee where: (a) the licensee fails to meet obligations to customers; (b) fails to meet financial obligations to other licensees; (c) fails to comply with a directive from the authority; or (d) fails to comply with the Act. The authority may also intervene during a crisis to safeguard financial stability, protect customers, and preserve public confidence. Intervention powers include: (a) appointing a statutory manager per Regulation 47; (b) removing any officer or employee who caused or contributed to any contravention or financial deterioration; (c) restricting new virtual asset services; (d) prohibiting new agents or directing termination of agency arrangements.",
    severity: ""
  },
  {
    id: "statutory-manager",
    title: "Appointment of Statutory Manager",
    ref: "Regulation 47 (p.37)",
    summary: "Where the authority exercises its power under section 15 of the Act, it shall appoint a statutory manager by Gazette notice to manage consumer assets for a period not exceeding twelve months. The term may be extended for a further twelve months with court approval.",
    severity: ""
  },
  {
    id: "statutory-manager-powers",
    title: "Functions and Powers of a Statutory Manager",
    ref: "Regulation 48 (pp.37–39)",
    summary: "The statutory manager's functions include: (a) taking control of assets to safeguard consumer monies and virtual assets; and (b) overseeing settlement of consumer monies and virtual assets. Powers include: declaring a moratorium (applied equally to all classes of creditors); entering premises and taking possession of assets; selling or disposing of assets (including those subject to security interests); selling the business by private treaty or public sale; arranging assumption of liabilities; carrying on business as deemed necessary; suing, defending, compromising and settling claims; and recovering costs and expenses from licensee assets in priority to all other claims. The statutory manager shall not be held to have assumed any obligation or liability of the licensee for its own account.",
    severity: ""
  },

  // ═══════════════════════════════════════════════════════════════
  // PART VI — ICO AND LISTING REQUIREMENTS (Regulations 49–58)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "ico-application",
    title: "Application for Licence to Issue or Promote ICO",
    ref: "Regulation 49 (pp.39–40)",
    summary: "A person seeking to issue or promote an initial coin offering shall apply to the regulatory authority for approval. In addition to Regulation 5 requirements, the application must include: a white paper per Regulation 53; governance structure; policies and procedures for monitoring the ICO cycle; information on where proceeds will be transferred or deposited; location where required information will be retained and accessible in Kenya; details and confirmation of the promoter; and the application fee per the First Schedule. The authority may require additional information, documents or reports. An applicant may withdraw by written notice with reasons.",
    severity: ""
  },
  {
    id: "ico-determination",
    title: "Determination of ICO Application",
    ref: "Regulation 50 (pp.40–41)",
    summary: "The regulatory authority may object where: (a) the application does not comply with the Act or Regulations; (b) section 34(4) criteria not met; (c) white paper does not meet Regulation 53 requirements; (d) the promoter is not eligible under section 34(2); (e) the policies and procedures for monitoring the ICO cycle are insufficient for mitigating market abuse, mis-selling or fraud risks. Upon approval, the authority shall register the applicant's details. An approved ICO shall be conducted through trading platforms approved under Regulation 51.",
    severity: ""
  },
  {
    id: "trading-platform-approval",
    title: "Approval of Trading Platforms",
    ref: "Regulation 51 (p.41)",
    summary: "A trading system or platform deployed by a virtual asset exchange or token issuance platform provider shall be APPROVED by the regulatory authority prior to use. The platform shall: (a) enable real-time public access to trading information; (b) incorporate mechanisms for transparent and efficient price discovery; (c) maintain a complete and tamper-proof audit trail; (d) implement adequate cybersecurity, resilience and access control measures; and (e) retain and securely store all trading and transaction records for not less than SEVEN YEARS from the transaction date.",
    severity: ""
  },
  {
    id: "ico-validity",
    title: "Validity of ICO Approval (12 Months)",
    ref: "Regulation 52 (p.41)",
    summary: "An approval of an offer of an initial coin offering shall be valid for a period not exceeding twelve months.",
    severity: ""
  },
  {
    id: "ico-white-paper",
    title: "Publication and Contents of ICO White Paper",
    ref: "Regulation 53 (pp.41–43)",
    summary: "The white paper shall provide full and accurate disclosure including: brief description of directors, senior officers and advisers with their qualifications, experience and any involvement in previous similar offerings; objective/purpose of the ICO including project information; key characteristics; identification of different classes of holders and their benefits/rights/liabilities; detailed sustainability description; business plan; targeted amount and use of proceeds with scheduled timeline for drawdown and utilization; rights, conditions or functions attached; accounting and valuation treatments including methodology and assumptions; associated challenges, risks and mitigating measures; distribution information and policy; monitoring policies; information about any underwriter or guarantor; restrictions on transferability; payment methods; refund mechanism or withdrawal rights; details of authorised status in Kenya; and intellectual property rights and protection. The white paper must contain a clear notice that the ICO is NOT covered by the Investor Compensation Fund. The board is responsible for the information provided. Penalty for non-compliance: KES 3 million administrative penalty.",
    severity: ""
  },
  {
    id: "ico-advertising-duration",
    title: "Commencement and Duration of ICO Advertising",
    ref: "Regulation 54 (pp.43–44)",
    summary: "An applicant may only commence advertising of an issuance or promotion following the date of the no-objection notice from the regulatory authority, and may only advertise for the duration specified in the application. Non-compliance: KES 3 million administrative penalty.",
    severity: ""
  },
  {
    id: "ico-extension",
    title: "Extension of ICO Issuance or Promotion",
    ref: "Regulation 55 (p.44)",
    summary: "To extend promotion or issuance beyond the end date, the applicant must submit an extension application to the authority not later than three months before the expiry date. The authority may object if: prejudice would be caused to the financial services industry; continued promotion or issuance is against public policy; or it is unlikely to meet stated financial objectives. An extension may only occur for a maximum of six calendar months after approval. Any subsequent offer constitutes a separate offer requiring a new white paper.",
    severity: ""
  },
  {
    id: "change-of-promoter",
    title: "Change of Promoter",
    ref: "Regulation 56 (p.45)",
    summary: "To change the promoter, written notice must be submitted to the authority not less than 15 working days before the proposed change, with reasons. The authority may object if: the new promoter is not eligible under section 34(2); or prejudice would be caused to the financial services industry. A change takes effect where no objection within 15 working days. Non-compliance: KES 3 million administrative penalty.",
    severity: ""
  },
  {
    id: "ico-register",
    title: "Register of ICOs",
    ref: "Regulation 57 (p.45)",
    summary: "The regulatory authority shall maintain a register with: name and address of issuer or promoter; dates of commencement and end of promotion or issuance; measures imposed by the authority; and any other relevant information deemed necessary.",
    severity: ""
  },
  {
    id: "listing-requirements",
    title: "Listing Requirements for Exchanges and Token Issuance Platforms",
    ref: "Regulation 58 (pp.45–46)",
    summary: "An exchange or token issuance platform shall maintain an official list of all virtual assets listed. A virtual asset shall only be included in the official list where it has attained the minimum total subscription disclosed in the approved white paper. The official list shall include: name of the virtual asset; name of the issuer where applicable; total number listed; listing date; trading commencement date; and redemption date. The licensee shall promptly notify the authority of each new listing or delisting decision and comply with all reserve, redemption and disclosure requirements for stablecoins. The regulatory authority retains the power to direct delisting where a material risk to market integrity, financial stability or consumer protection is identified.",
    severity: ""
  },

  // ═══════════════════════════════════════════════════════════════
  // PART VII — TOKENIZATION OF REAL-WORLD ASSETS (Regs 59–62)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "tokenization-licence",
    title: "Application for Virtual Asset Tokenization Licence",
    ref: "Regulation 59 (pp.46–47)",
    summary: "A person seeking to tokenize real-world assets shall apply for a licence. In addition to Regulation 5 requirements, the application must include: (a) evidence that the real-world asset can be tokenized and ownership can be established; (b) an agreement of the proposed custodian who shall hold title and custody; (c) a report by an independent valuer showing fair market value; (d) evidence that the asset is clear of encumbrances; (e) rules of ownership, transferability, compliance and profit distribution where based on DLT-based smart contracts; and (f) the application fee per First Schedule.",
    severity: ""
  },
  {
    id: "tokenized-rwa-issuance",
    title: "Requirements for Issuance of Tokenised Real-World Assets",
    ref: "Regulation 60 (pp.47–48)",
    summary: "A person seeking a virtual asset offering of a tokenised real-world asset shall apply for approval, accompanied by: a white paper per Regulation 61; governance structure; policies and procedures for monitoring the issuance cycle; information on proceeds; promoter details; and the application fee.",
    severity: ""
  },
  {
    id: "tokenized-rwa-white-paper",
    title: "Contents of White Paper for Tokenized Real-World Asset Offering",
    ref: "Regulation 61 (pp.48–50)",
    summary: "The white paper shall provide full and accurate disclosure including: description of directors, key personnel and advisers; key information about the tokenized assets including their location; clear description of rights or value the token grants; whether the token represents direct or fractional ownership; legal or regulatory requirements; policy on creation and destruction of tokens; custody arrangements; risk assessments (credit, market, counterparty, liquidity); accounting and valuation treatments; distribution information; monitoring policies; how tokens will be traded or transferred; any restrictions on transferability; payment methods; refund mechanism; status of promoter/issuer in Kenya; experience of third-party vendors; adequacy of cybersecurity systems; interoperability between DLT networks; and where proceeds will be transferred or deposited.",
    severity: ""
  },
  {
    id: "listing-tokenized-assets",
    title: "Listing of Tokenized Assets",
    ref: "Regulation 62 (p.50)",
    summary: "A person undertaking a virtual asset offering of a tokenised real-world asset shall: (a) create tokens on a DLT platform representing fractional ownership or rights; (b) code ownership, transferability, compliance and profit distribution rules into smart contracts; (c) distribute tokens via a primary offering; (d) list tokens on a licensed token issuance platform to enable liquidity and investor exit options.",
    severity: ""
  },

  // ═══════════════════════════════════════════════════════════════
  // PART VIII — WALLET PROVIDERS AND STABLECOIN ISSUERS (Regs 63–81)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "wallet-provider-responsibilities",
    title: "Responsibilities of Virtual Asset Wallet Provider",
    ref: "Regulation 63 (pp.50–54)",
    summary: "A wallet provider shall: (a) segregate consumer holdings from own holdings and non-consumer virtual assets; (b) ensure on-chain segregation on separate addresses; (c) maintain separate internal ledger accounts for consumer vs own assets; (d) conduct regular internal and independent reconciliations of on-chain holdings vs internal records and make available to the authority upon request; (e) obtain explicit consumer consent for omnibus accounts; (f) ensure custodied assets are separate and insulated from the business estate; (g) NOT lend, use, hypothecate, pledge or otherwise encumber consumer assets; (h) make standard disclosures and consumer agreement readily accessible in clear, concise, non-technical language; (i) maintain sufficient quantity of each type of virtual asset to meet consumer obligations; (j) have procedures to return assets on demand; (k) establish policies to identify advance steps for disruption events, enable seizure/freezing of virtual assets when required, enable transfer to another appropriate person, remedy mistaken/fraudulent/unauthorized transactions, and ensure continued safekeeping during disruption; (l) maintain an up-to-date register of positions recording each consumer's rights; (m) provide consumers with a statement of holdings at least every THREE MONTHS and at each request; (n) if outsourcing custody, only use other licensed virtual asset businesses, notify the authority of the outsourcing as a material change, and disclose outsourcing terms to consumers. The consumer agreement must include general terms of custody, segregation methods, beneficial and equitable interests retained by the consumer, and limitations on use. Where omnibus accounts are used, the licensee shall maintain procedures and up-to-date records to identify virtual assets belonging to each consumer at all times.",
    severity: ""
  },
  {
    id: "stablecoin-issuance-licence",
    title: "Application for Stablecoin Issuance Licence",
    ref: "Regulation 64 (p.54)",
    summary: "A person seeking a virtual asset offering of a stablecoin shall apply for a licence. In addition to Regulation 5 requirements, the application must include: (a) investment policies of reserve assets and assessment of how the policy can affect reserve value; (b) the issuer's redemption policies; and (c) a white paper containing information specified under Regulation 65.",
    severity: ""
  },
  {
    id: "stablecoin-white-paper",
    title: "Contents of Stablecoin White Paper",
    ref: "Regulation 65 (pp.54–56)",
    summary: "The stablecoin white paper shall contain: information about the issuer; about the stablecoin; about the offer to the public or admission to trading; on rights and obligations; on the underlying technology; on risks; on principal adverse impacts on climate and environment-related impacts of the consensus mechanism; method and all factors used to calculate reserve asset value; initial value and composition of reserve assets; conditions and procedure for purchase and redemption; details of stabilisation mechanism; summary of investment policies and how they can affect reserve value; details of custody and management of reserve assets; rights provided to holders; and date of approval. It shall also include the identity of any person other than the issuer offering the stablecoin. All information must be fair, clear and not misleading. The white paper must contain warnings that: the stablecoin is not covered by investor compensation schemes; not covered by deposit insurance; the issuer is solely responsible for the white paper contents. The summary shall provide key information, appropriate characteristics for informed decision-making, a warning to read the full white paper, and state that holders have a right of redemption at any time at par value. The white paper must be notified to the authority at least 30 days before publication. Significant new factors, material mistakes or inaccuracies must be reflected in a modified white paper, notified and published upon approval.",
    severity: ""
  },
  {
    id: "stablecoin-white-paper-publication",
    title: "Publication of Stablecoin White Paper",
    ref: "Regulation 66 (pp.56–57)",
    summary: "Upon approval, the stablecoin issuer shall publish the approved white paper (and modified versions) on its website. The issuer shall: publish the white paper from the starting date of the offer or admission to trading; ensure the white paper remains accessible for the duration the stablecoin is held by the public; and publish as soon as possible any changes to white paper information or any event having or likely to have significant impact on the stablecoin value or reserve assets.",
    severity: ""
  },
  {
    id: "stablecoin-offer-requirements",
    title: "Requirements for Offer to Public or Admission to Trading of Stablecoin",
    ref: "Regulation 67 (pp.57–58)",
    summary: "A person shall not make an offer to the public or seek admission to trading of a stablecoin unless that person: (a) is the issuer; (b) obtained regulatory approval to publish the white paper; and (c) has published the white paper per Regulation 65. Upon written consent of the issuer, other persons may offer or seek admission to trading. Issuers shall, at least 90 DAYS before the date they intend to offer or seek admission to trading, notify the regulatory authority of that intention.",
    severity: ""
  },
  {
    id: "stablecoin-issuance-redeemability",
    title: "Issuance and Redeemability of Stablecoins",
    ref: "Regulation 68 (p.58)",
    summary: "A holder of a stablecoin shall have a claim against the issuer. Issuers shall issue stablecoins at PAR VALUE and on the receipt of funds. Upon request by a holder, the issuer shall redeem at any time and at par value by paying the monetary value held. Issuers shall prominently state the conditions for redemption in the white paper. The redemption of stablecoins shall NOT be subject to a fee.",
    severity: ""
  },
  {
    id: "stablecoin-interest-ban",
    title: "Prohibition of Granting Interest on Stablecoins",
    ref: "Regulation 69 (p.58)",
    summary: "Issuers of stablecoins shall NOT grant interest in relation to stablecoins. A licensee shall NOT grant interest when providing virtual asset services related to stablecoins. Any remuneration or any other benefit related to the LENGTH OF TIME during which a holder holds a stablecoin shall be TREATED AS INTEREST — this includes net compensation or discounts with an effect equivalent to interest received by the holder, directly from the issuer or from third parties, and directly associated to the stablecoin or from the remuneration or pricing of other products. This is a complete ban on yield/interest for stablecoins.",
    severity: ""
  },
  {
    id: "stablecoin-modification",
    title: "Modification of Published Stablecoin White Paper",
    ref: "Regulation 70 (pp.58–60)",
    summary: "An issuer must seek regulatory approval on any intended change to their business model likely to have a significant influence on purchase decisions. Changes include material modifications to: governance arrangements and reporting lines; reserve assets and their custody; rights granted to holders; issuance and redemption mechanism; protocols for validating transactions; functioning of proprietary DLT; mechanisms to ensure liquidity; arrangements with third parties for managing reserves, custody and distribution; and complaints-handling procedures. A request must be accompanied by a draft modified white paper consistent in order with the original. Approval must be obtained before changes take effect. The authority may require the issuer to put in place mechanisms to protect holders and take corrective measures for market integrity and financial stability concerns.",
    severity: ""
  },
  {
    id: "stablecoin-liability",
    title: "Liability of Issuers for Information in Stablecoin White Paper",
    ref: "Regulation 71 (pp.60–61)",
    summary: "Where an issuer has provided information in its white paper that is not complete, fair or clear, or that is misleading, the issuer AND its directors, significant shareholders, senior officers, and external auditors shall be LIABLE to a holder for any loss incurred. Any contractual exclusion or limitation of civil liability is DEPRIVED OF LEGAL EFFECT. The holder bears the burden of presenting evidence of infringement and that reliance on such information impacted their purchase, sale or exchange decision. The issuer and officers shall not be liable for loss from the summary unless the summary is misleading, inaccurate or inconsistent when read with the full white paper, or does not provide key information to aid prospective holders.",
    severity: ""
  },
  {
    id: "stablecoin-reserve-assets",
    title: "Stablecoin Reserve Assets",
    ref: "Regulation 72 (pp.61–62)",
    summary: "The issuer shall: (a) fully back stablecoins with reserve assets at all times at least equal to the nominal value of all outstanding units; (b) only issue stablecoins backed by reserves consisting of: cash (including central bank reserves and bank deposits), government securities with residual maturity of not more than 90 DAYS, or repurchase agreements with maturity of not more than 7 DAYS backed by cash; (c) segregate reserve assets from operating assets and other stablecoins' reserves; (d) make reserves available for examination upon request; (e) ensure reserves are sufficiently liquid for redemptions; (f) use valuation methods in accordance with generally accepted international auditing standards; (g) maintain procedures to ensure reserves are separate and insulated from the issuer's estate so creditors have no recourse in insolvency; (h) ensure reserves cover risks referenced by stablecoins and address liquidity risks associated with permanent redemption rights; (i) ensure legal segregation from the issuer's estate. Issuers of multiple stablecoins shall maintain segregated pools of reserves for each. Issuance and redemption must always be matched by a corresponding increase or decrease in reserve assets.",
    severity: ""
  },
  {
    id: "stablecoin-reserve-custody",
    title: "Custody of Stablecoin Reserve Assets",
    ref: "Regulation 73 (pp.62–63)",
    summary: "Stablecoin issuers shall ensure at all times that: (a) reserve assets are not encumbered or pledged as financial collateral; (b) held in custody per the Regulations; (c) the issuer has prompt access for redemptions; (d) concentration of custodians is avoided; (e) concentration of reserve assets is avoided. Reserve assets shall be held in custody by a custodian APPROVED BY THE CENTRAL BANK OF KENYA. Issuers shall ensure reserves are protected against claims of the custodians' creditors.",
    severity: ""
  },
  {
    id: "stablecoin-investment-of-funds",
    title: "Investment of Funds Received in Exchange for Stablecoin",
    ref: "Regulation 74 (p.63)",
    summary: "Stablecoin issuers shall ensure that funds received in exchange for stablecoins: (a) at least 30% of funds are held in accounts in commercial banks in Kenya segregated for processing issuance and redemption; (b) remaining funds are invested in secure, low-risk assets IN KENYA that qualify as high-quality liquid assets with minimal market, credit and concentration risk; (c) for fiat-referenced stablecoins, reserve assets should be denominated in the same official currency referenced. The financial instruments in which reserves are invested shall be held in custody. All profits or losses, including fluctuations and counterparty or operational risks from investment, shall be BORNE BY THE STABLECOIN ISSUER.",
    severity: ""
  },
  {
    id: "stablecoin-ongoing-information",
    title: "Ongoing Information to Holders of Stablecoins",
    ref: "Regulation 75 (p.64)",
    summary: "Stablecoin issuers shall disclose publicly on their website, in clear, accurate and transparent manner, the amount of stablecoins in circulation and the value and composition of reserves — updated at least MONTHLY. They shall publish the full and unredacted audit report, as well as a summary, relating to reserves. They shall disclose as soon as possible any event likely to have significant effect on stablecoin value or reserves.",
    severity: ""
  },
  {
    id: "stablecoin-conflicts-of-interest",
    title: "Stablecoin Issuer Conflicts of Interest",
    ref: "Regulation 76 (pp.64–65)",
    summary: "Stablecoin issuers shall implement effective policies to identify, prevent, manage and disclose conflicts of interest between themselves and: their shareholders or members; any shareholder with a qualifying holding; management body members; employees; holders of stablecoins; and any third-party service provider. They shall take all appropriate steps regarding conflicts from management and investment of reserves. Disclosure of the general nature and sources of conflicts and steps to mitigate them shall be made on the website, sufficiently precise to enable informed purchasing decisions.",
    severity: ""
  },
  {
    id: "stablecoin-redemption",
    title: "Redemption of Stablecoins",
    ref: "Regulation 77 (pp.65–66)",
    summary: "Redemption is subject to terms approved by the regulatory authority. Issuers shall establish a policy on consumers' right of redemption setting out: conditions including thresholds, periods and timeframes; mechanisms and procedures for redemption; valuation or principles of valuation when the right is exercised; conditions for settlement; and measures to adequately manage increases or decreases in reserves. Where a stablecoin issuer accepts payment in Kenya Shillings, they shall ALWAYS provide an option to redeem in Kenya Shillings. Redemption policies shall confer on holders a right to redeem on demand at par value of the underlying currency, with clear disclosure of meaning, timing and conditions. Upon request, the issuer shall redeem by paying fiat equivalent to market value. Redemption shall NOT be subject to a fee. The business continuity plan shall include measures to restore compliance with reserve requirements.",
    severity: ""
  },
  {
    id: "stablecoin-marketing",
    title: "Marketing Communications of Stablecoin Issuance",
    ref: "Regulation 78 (pp.66–67)",
    summary: "Marketing communications shall: be clearly identifiable as such; be fair, clear and not misleading; be consistent with the white paper; and clearly state the white paper has been published with the issuer's website address, telephone and email. Marketing shall contain a clear statement that holders have a right of redemption at any time at par value. Marketing and modifications shall be published on the issuer's website. Marketing shall be notified to the authority upon request. No marketing shall be disseminated PRIOR to the publication of the white paper, though market soundings are permitted.",
    severity: ""
  },
  {
    id: "stablecoin-audits",
    title: "Audits, Review and Reports for Stablecoins",
    ref: "Regulation 79 (pp.67–68)",
    summary: "The stablecoin issuer shall appoint an approved auditor to: (a) conduct an annual review of systems, processes, procedures and internal controls for compliance; (b) on a MONTHLY basis, conduct an examination of reserve assets and provide a PROOF OF RESERVE report by an independent approved auditor to the regulatory authority within ten days of the start of the following month; (c) conduct annually a review of the issuer's redemption policies and compliance with those policies.",
    severity: ""
  },
  {
    id: "stablecoin-delisting-halting",
    title: "Delisting or Halting of Stablecoin Issuance",
    ref: "Regulation 80 (p.68)",
    summary: "The regulatory authority may prohibit or otherwise limit the issuance or use of a stablecoin before or after an issuer has been approved, and may require that any such issuer delist, halt, or otherwise limit or curtail activity with respect to such stablecoin.",
    severity: ""
  },
  {
    id: "stablecoin-reporting",
    title: "Stablecoin Issuers Reporting Requirements",
    ref: "Regulation 81 (p.68)",
    summary: "Stablecoin issuers shall report MONTHLY to the regulatory authority: (a) number of holders; (b) value, circulation and peak values; (c) average number and average aggregate value of transactions per day during the relevant quarter; (d) number of consumers and new account holders; (e) composition of reserve assets; and (f) instances of de-pegging. In addition, a licensee shall report DAILY the average number and average aggregate value of transactions per day.",
    severity: ""
  },

  // ═══════════════════════════════════════════════════════════════
  // PART IX — CAPITAL AND FINANCIAL REQUIREMENTS (Regs 82–92)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "capital-requirements",
    title: "Minimum Financial and Capital Requirements",
    ref: "Regulation 82, Fifth Schedule (pp.69–70, pp.148–149)",
    summary: "A licensee shall at all times have capital and other financial requirements commensurate to scale, risk and complexity. Paid-up capital requirements (Fifth Schedule): Virtual Asset Investment Adviser: KES 2.5M; Virtual Asset Broker: KES 30M; Virtual Asset Manager: KES 30M; Virtual Asset Payment Processor: KES 50M; Virtual Asset Wallet Provider: KES 150M; Virtual Asset Exchange: KES 150M; ICO Provider: KES 200M; Tokenization Provider: KES 200M; Token Issuance Platform: KES 200M; Stablecoin Issuer: KES 500M. Liquid capital requirements vary by type (see Fifth Schedule). Paid-up capital must be in cash or other consideration approved by the authority capable of objective valuation and immediate realization. The following do NOT constitute paid-up capital: unpaid/partly paid/contingent capital; shareholder loans or advances; capital raised through borrowed funds; or revaluation reserves or internally generated intangible assets. Where a licensee carries out more than one virtual asset service, it shall hold paid-up capital for EACH licensed activity. The authority may require increases based on risk profile. Core capital must be unencumbered and not pledged, charged, subject to contractual restriction, or repayable at the initiative of shareholders. If core capital falls or is likely to fall below minimum, the licensee must immediately notify the authority in writing and submit a remedial capital restoration plan.",
    severity: ""
  },
  {
    id: "misrepresentation-capital",
    title: "Misrepresentation of Capital Position",
    ref: "Regulation 83 (p.71)",
    summary: "A licensee shall not engage in any arrangement or transaction the effect of which is to temporarily inflate or misrepresent its capital position for purposes of meeting the requirements of this Act.",
    severity: ""
  },
  {
    id: "virtual-asset-manager-capital",
    title: "Virtual Asset Manager Capital Position and Use of Funds",
    ref: "Regulation 84 (p.71)",
    summary: "A virtual asset manager shall maintain at all times sufficient risk-based capital to cover operational and technology-related risks per the authority's guidelines. A manager managing consumer funds shall appoint a custodian licenced in Kenya. Where a manager invests in or through a related company, that investment shall NOT exceed 10% of total virtual assets under management, unless otherwise approved. 'Related company' means a holding company, subsidiary, or any entity under common control or substantially the same shareholders.",
    severity: ""
  },
  {
    id: "insurance-coverage",
    title: "Insurance Coverage",
    ref: "Regulation 85 (pp.71–72)",
    summary: "A licensee shall hold and maintain insurance coverage for protection and coverage of consumers' virtual assets commensurate with the level of risks and scale. Where the licensee has exhausted all means of obtaining insurance, it shall submit a proposal for alternative means for approval. All insurance policies shall be held with an insurer licensed in Kenya or in an approved jurisdiction outside Kenya. Policies may be held in the name of another entity within the group provided the policy explicitly states the licensee is an insured party and specifies the nature and level of cover. A licensee shall maintain appropriate insurance cover against CYBERSECURITY RISKS including theft, loss of keys, or operational failure.",
    severity: ""
  },
  {
    id: "accounting-records",
    title: "Accounting Records",
    ref: "Regulation 86 (pp.72–73)",
    summary: "A licensee shall keep accurate accounting records showing and explaining its transactions (own and on behalf of consumers) that disclose financial position at any time and enable preparation of income and financial position statements. Records shall contain: day-to-day entries of all monies and virtual assets received, exchanged, sold, transferred and held in custody; details of administrative expenditure, commissions and charges; a record of all assets and liabilities including commitments and contingent liabilities; day-to-day entries distinguishing own account vs. on behalf of others; day-to-day entries of all consumers' monies and virtual assets paid into or out of accounts or wallets; and record of consumer account balances. Records shall conform to international accounting standards. Records shall be preserved in original DIGITAL FORM for at least SEVEN YEARS from completion of transactions. Records shall be produced for inspection on demand at a reasonable time and place.",
    severity: ""
  },
  {
    id: "external-auditor",
    title: "Appointment of External Auditor",
    ref: "Regulation 87 (pp.73–74)",
    summary: "A licensee shall, with approval of the regulatory authority, appoint an external auditor who shall be a member of good standing of ICPAK. The authority may require the auditor to: submit information or reports as required; extend the scope of the audit and submit a report; and carry out any examination or establish any procedure in a particular case. An auditor shall be appointed annually and may serve for a MAXIMUM of FOUR CONSECUTIVE financial years. The authority may decline to approve or revoke the appointment if the auditor has contravened the Act, guidelines or circulars.",
    severity: ""
  },
  {
    id: "auditor-report",
    title: "Auditor's Report",
    ref: "Regulation 88 (p.74)",
    summary: "Where the auditor's report is qualified on grounds of uncertainty as to the completeness or accuracy of accounting records, the auditor shall, as soon as practicable and in any event within SEVEN DAYS, report in writing to both the regulatory authority and the licensee.",
    severity: ""
  },
  {
    id: "licensee-reports",
    title: "Reports by the Licensee",
    ref: "Regulation 89 (pp.74–75)",
    summary: "Every licensee shall submit to the regulatory authority: (a) semi-annual financial statements within one month after the end of the half-year period; (b) MONTHLY financial statements within fifteen days from the end of the month; (c) monthly and annual periodic capital adequacy or liquidity statements; (d) audited annual financial statements within three months after end of financial year; (e) promptly disclose any event that could materially affect solvency, valuation of virtual assets or consumer protection.",
    severity: ""
  },
  {
    id: "exchange-reports",
    title: "Reports by Virtual Asset Exchange and Token Issuance Platform Provider",
    ref: "Regulation 90 (p.75)",
    summary: "Each exchange or token issuance platform provider shall submit a MONTHLY report including: a summary of all virtual assets listed, suspended, or delisted during the financial year; aggregate trading volumes and values; fiat and virtual assets; daily electronic trading reports including transaction volumes and price movements; quarterly reports of all transactions including off-platform trades and transfers; and an annual audited financial statement per applicable accounting standards.",
    severity: ""
  },
  {
    id: "manager-reports",
    title: "Reports by Virtual Asset Managers",
    ref: "Regulation 91 (pp.75–76)",
    summary: "Every licensee undertaking virtual asset management shall submit: (a) quarterly reports of assets under management within 21 days from end of quarter; (b) semi-annual financial statements of assets under management; (c) audited financial statements of assets under management.",
    severity: ""
  },
  {
    id: "financial-year",
    title: "Financial Year",
    ref: "Regulation 92 (p.76)",
    summary: "The financial year of every licensed person shall be the period of twelve months ending on the 31st December in each year.",
    severity: ""
  },

  // ═══════════════════════════════════════════════════════════════
  // PART X — CYBERSECURITY MEASURES, SYSTEMS AND CONTROL (Regs 93–97)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "cybersecurity-strategy",
    title: "Cybersecurity Strategy",
    ref: "Regulation 93 (pp.76–77)",
    summary: "A licensee shall have cyber security measures for establishing and maintaining appropriate systems and controls for managing cyber security and operational risks from inadequacies or failures. The licensee shall: have organisational, human and technological resources to prevent system/process failures and identify/rectify them promptly; have arrangements for continuity of operations if a significant process or system becomes unavailable or is destroyed; and have adequate monitoring mechanisms to quickly detect and prevent cyber incidents and periodically evaluate systems effectiveness. Additionally, the licensee shall: ensure adequate senior officer oversight with clearly defined roles, responsibilities and accountability; maintain and distribute documentation of internal processes and systems; and ensure all staff receive appropriate cybersecurity training on a periodic basis. The cyber security strategy and policy shall be reviewed regularly, at least annually, in response to changes in risks, cyber incidents, or identified issues. Review results and remedial actions shall be submitted to the board no later than one month after the review date. Contravention: KES 3 million administrative penalty.",
    severity: ""
  },
  {
    id: "systems-and-control",
    title: "Systems and Controls",
    ref: "Regulation 94 (pp.77–80)",
    summary: "A licensee shall ensure its systems and controls are adequate and suitable for the virtual asset business and appropriate to the size and nature of operations. Systems shall relate to: transmission of information to consumers; assessment and management of risks; safeguarding and administration of consumer assets; and fitness and propriety of employees and adequacy of technology. The licensee shall have regard to: confidentiality (safe storage, data transmission protocols, firewalls, entry restrictions, data protection law compliance); accessibility to authorized persons; integrity (accuracy and completeness of information and data); maintenance of systems and infrastructure including proper code version control, updates and resolution; and procedures to address technological infrastructure updates including forks. Audit functions shall include: vulnerability assessment, risk assessment and penetration testing on a BI-ANNUAL basis during the first year and at least ONCE A YEAR thereafter; audit trail systems that track and maintain complete reconstruction capability for all financial transactions, protect data integrity, protect hardware integrity with electronic and physical access restrictions and logs, log system events, maintain audit trail records, and assess effectiveness of safekeeping. The licensee shall appoint a qualified independent party to audit systems and controls as required by the authority. Contravention: individuals face a fine up to KES 3 million; companies face a fine up to KES 10 million.",
    severity: ""
  },
  {
    id: "cybersecurity-audit",
    title: "Cybersecurity Audit",
    ref: "Regulation 95 (pp.80–81)",
    summary: "The regulatory authority may at any time: (a) commission an audit of a licensee; or (b) call for an investigation. The authority may: require officers to produce books, documents, statements or information within a reasonable time; and at any time, enter any premises where a licensee is carrying on business or where the authority reasonably suspects business is carried out in contravention of the Regulations.",
    severity: ""
  },
  {
    id: "cybersecurity-risk-reporting",
    title: "Reporting of Cybersecurity Risk",
    ref: "Regulation 96 (p.81)",
    summary: "Upon discovering a cybersecurity risk from a cyber security event, the licensee shall notify the regulatory authority of any ATTEMPT within TWENTY-FOUR HOURS. For any SUCCESSFUL attempt, the licensee shall provide a report within FIVE WORKING DAYS on whether the incident: affects services or systems supporting critical or important functions; affects authorized services; or constitutes malicious and unauthorized access. The report shall include remedial actions. A virtual asset wallet provider shall report any material cybersecurity incident, loss of keys, or unauthorized transaction within 24 HOURS and maintain appropriate insurance cover against theft, loss of keys, or operational failure.",
    severity: ""
  },
  {
    id: "cybersecurity-audit-report",
    title: "Cybersecurity Audit Report",
    ref: "Regulation 97 (pp.81–82)",
    summary: "A cybersecurity audit report shall be prepared by the fit and proper person responsible for information security, containing: (a) the functionality and integrity of the licensee's electronic systems; (b) any identified cybersecurity risks; and (c) the cybersecurity program implemented and proposals for redress of any inadequacies identified. Contravention: KES 3 million administrative penalty.",
    severity: ""
  },

  // ═══════════════════════════════════════════════════════════════
  // PART XI — SAFEKEEPING AND MANAGEMENT OF CONSUMER ASSETS (Regs 98–104)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "consumer-asset-safeguarding",
    title: "Safeguarding of Consumer's Assets Strategy",
    ref: "Regulation 98 (p.82)",
    summary: "Where a DLT platform provides for safeguarding and administration of assets belonging to purchasers and consumers, the licensee shall ensure: (a) satisfactory arrangements are made for that purpose; and (b) clear terms of agreement exist between the consumers and the licensee.",
    severity: ""
  },
  {
    id: "consumer-protection",
    title: "Consumer Protection",
    ref: "Regulation 99 (pp.82–83)",
    summary: "A licensee shall at all times provide safeguards to ensure consumer protection to such standard as the regulatory authority may determine. This includes business rules, procedures and an effective surveillance programme ensuring orderly business conduct, including monitoring for market abuse, financial crime, money laundering, terrorism financing or proliferation financing. The licensee shall: establish policies, systems and controls for safekeeping and management of consumer assets; make adequate arrangements to safeguard ownership rights and mitigate risk of loss or diminution; and establish and maintain organisational arrangements for transfer. Consumer assets shall be protected against loss or misuse and segregated so they are not subject to claims of the licensee's creditors. The summary policies shall be available to consumers in electronic format within 2 working days of request. Contravention: administrative penalty not exceeding KES 3 million.",
    severity: ""
  },
  {
    id: "consumer-service-agreement",
    title: "Consumer Service Agreement",
    ref: "Regulation 100 (pp.83–84)",
    summary: "A licensee shall: (a) enter into a consumer service agreement with every consumer; (b) submit to the authority a copy of the standard consumer service agreement for each service; (c) comply with the Unclaimed Financial Assets Act for dormant accounts; (d) comply with the Law of Succession Act for deceased persons' accounts. The consumer service agreement shall include at minimum: description of virtual asset services; registration requirements; procedures for maintaining accounts; privacy policy; account use, access and responsibility; suspension, termination and freezing provisions; dispute resolution and governing law; warranties and liability; indemnity; exclusions or limitations; disclosure and data retention; force majeure; dormant account handling; and deceased persons' account handling.",
    severity: ""
  },
  {
    id: "consumer-funds-management",
    title: "Management and Safekeeping of Consumer's Funds and Assets",
    ref: "Regulation 101 (pp.84–86)",
    summary: "A licensee shall open and operate all client and own accounts in a bank licensed in Kenya. The licensee shall ensure total consumer assets held match amounts agreed. Any transfer of consumer assets must be authorised or expressly permitted by the consumer. Consumer funds (other than consumer assets) received by the licensee shall be placed by the END OF THE BUSINESS DAY with a bank or financial institution in a SEPARATE account from the licensee's own funds. Where a licensee holds virtual assets in omnibus accounts, it shall maintain procedures and up-to-date records to identify virtual assets belonging to each consumer at all times and account for all transactions. The licensee shall have adequate arrangements to safeguard consumer ownership rights and prevent use for its own account. A licensee shall NOT use consumer assets for its own account or any other person's account. The licensee shall take appropriate measures to prevent unauthorized use and have procedures to ensure consumers can access their assets. Contravention: administrative penalty up to KES 3 million.",
    severity: ""
  },
  {
    id: "consumer-asset-tech-controls",
    title: "Systems and Controls to Safekeep Consumer Assets",
    ref: "Regulation 102 (pp.86–87)",
    summary: "A licensee shall ensure technology for holding consumer assets is reliable, resilient and compatible. The licensee shall have regard to: the impact of software architecture of wallets and interoperability of systems; and the systems' ability to ensure that security measures for access and use of private and public keys, hot and cold wallet storage, password protection and encryption are reliable and effective. Contravention: KES 3 million administrative penalty.",
    severity: ""
  },
  {
    id: "third-party-claims-protection",
    title: "Protection from Third Party Claims",
    ref: "Regulation 103 (p.87)",
    summary: "A licensee shall NOT grant any security interest, lien or right of set-off to another person over any consumer assets unless it applies directly to the clearing or settlement of obligations owed directly by the consumer. The licensee shall maintain records of any security interest, lien or right of set-off applied, including court orders, legal proceedings, the amount and nature of assets, and the date the obligation was applied. Contravention: KES 3 million administrative penalty.",
    severity: ""
  },
  {
    id: "consumer-records-accounts",
    title: "Records and Accounts",
    ref: "Regulation 104 (pp.87–88)",
    summary: "A licensee shall maintain accurate, up-to-date and easily accessible records. The licensee shall maintain a register with: the name of the consumer; the consumer's rights to its assets; and any movement of consumer assets with reference to instructions received. The register shall be used to track, record transactions and ownership and reconcile on a consumer-by-consumer basis to resolve discrepancies, considering relevant off-chain and on-chain records.",
    severity: ""
  },

  // ═══════════════════════════════════════════════════════════════
  // PART XII — MARKET CONDUCT AND RELATED OFFENCES (Regs 105–122)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "standards-of-conduct",
    title: "Standards of Conduct",
    ref: "Regulation 105 (pp.88–89)",
    summary: "A licensee shall observe a high standard of integrity and fair dealing, act with due skill, care and diligence, and observe high standards of market conduct. The licensee shall provide details of how it promotes and maintains professional conduct as required under sections 20 and 21 of the Act, including taking all necessary steps to promote and maintain high standards and cooperating with the regulatory authority.",
    severity: ""
  },
  {
    id: "designation-virtual-asset-service",
    title: "Designation of a Virtual Asset Service",
    ref: "Regulation 106 (pp.88–89)",
    summary: "The regulatory authority may, by notice, designate a virtual asset service if: (a) it poses systemic risk; (b) the designation is necessary to protect the public; or (c) it is in the interest of payment system integrity. The notice shall indicate conditions to be met. The authority may withdraw or vary the designation. Any person failing to comply is guilty of an offence.",
    severity: ""
  },
  {
    id: "consumer-risk-understanding",
    title: "Consumers' Understanding of Risk",
    ref: "Regulation 107 (pp.89–90)",
    summary: "A licensee shall NOT: recommend or effect a transaction unless it has taken all reasonable steps to enable the consumer to understand risks involved; knowingly mislead a consumer on advantages or disadvantages; or promise a return on any investment. The licensee shall provide sufficient information for informed decisions and ensure proper consumer understanding of: the nature of the investment; fees and charges; risks; AML/CFT/CPF risks; factors affecting performance; terms and conditions; and consequences of departing from terms. Written explanations shall be retained. Oral explanations require a written note sent to the consumer and a copy retained in their file. Where the consumer's existing knowledge makes explanation unnecessary, this opinion shall be documented.",
    severity: ""
  },
  {
    id: "consumer-complaints",
    title: "Addressing Complaints by Consumers",
    ref: "Regulation 108 (pp.90–91)",
    summary: "A licensee shall have procedures to address consumer complaints including: effective investigation and resolution arrangements; maintaining a register of complaints and resolutions; a consumer care system per Regulation 109; and setting out the complaint handling process including apportionment of responsibility, timeframe for dealing with complaints, timeframe for informing the complainant of progress (no more than THREE MONTHS), available remedial actions, and appeal procedures. A licensee shall: disclose its complaint handling procedures; address complaints fairly, appropriately and timely; inform the consumer of the outcome; provide appropriate restitution and address weaknesses that led to the complaint. Records shall be kept for a MINIMUM OF SEVEN YEARS.",
    severity: ""
  },
  {
    id: "consumer-care-system",
    title: "Consumer Care System",
    ref: "Regulation 109 (p.92)",
    summary: "Within SIX MONTHS after commencing virtual asset services, a licensee shall establish a consumer care system for inquiries and complaints. Prior to establishment, the licensee shall: put in place a clear complaint mechanism; provide adequate means for filing complaints; address complaints within a reasonable period from receipt; and provide easily understood information about complaint handling procedures at all points of service.",
    severity: ""
  },
  {
    id: "market-abuse-deterrence",
    title: "Deterrence of Market Abuse",
    ref: "Regulation 110 (p.92)",
    summary: "A licensee shall have appropriate measures to identify, deter and prevent market abuse, financial crime and money laundering, terrorism financing or proliferation financing on and through its DLT platform or systems, and report to the regulatory authority. The licensee shall have rules and procedures to prohibit or prevent: transactions creating false appearance of trading activity; improper execution of virtual asset transfer, exchange, stablecoin issuance, token issuance or ICO; and transactions intended to assist or conceal identifiable market abuse or financial crime.",
    severity: ""
  },
  {
    id: "outsourcing-agreements",
    title: "Outsourcing Agreements",
    ref: "Regulation 111 (pp.92–94)",
    summary: "A licensee may outsource operational functions but must obtain regulatory authority approval at least THIRTY DAYS before implementation. The licensee shall not outsource material operational functions in a way that impairs internal control quality or the authority's ability to monitor compliance. Where material functions are outsourced, the licensee shall ensure: outsourcing does not result in delegation by senior officers of responsibilities; the relationship and obligations to consumers are not altered; the outsourcing contract provides for regulatory oversight; and licensing requirements are not undermined. A function is material if a defect or failure would materially impair: continuing compliance with licence requirements; financial performance; or soundness or continuity of virtual asset services.",
    severity: ""
  },
  {
    id: "outsourcing-custodial",
    title: "Outsourcing of Custodial Services",
    ref: "Regulation 112 (pp.93–94)",
    summary: "Where a virtual asset exchange outsources custodial services, it shall: (a) only use licensed virtual asset wallet providers licensed under the Act; (b) notify the regulatory authority as a material change under section 26 of the Act; and (c) disclose to consumers the terms and conditions of the outsourcing arrangements.",
    severity: ""
  },
  {
    id: "agent-arrangements",
    title: "Agent Arrangements",
    ref: "Regulation 113 (p.94)",
    summary: "A licensee may appoint an agent to provide services on its behalf by entering into an agency agreement, provided such services are approved by the regulatory authority. The licensee shall be LIABLE to its consumers for the acts and omissions of its agent.",
    severity: ""
  },
  {
    id: "insider-trading",
    title: "Insider Trading",
    ref: "Regulation 114 (p.94)",
    summary: "A person possessing material non-public information in relation to a virtual asset shall NOT use that information to acquire or dispose of that virtual asset, or attempt to do so, or encourage or cause another person to deal in that virtual asset. Offence: fine not exceeding KES 10 million or imprisonment for up to FIVE YEARS, or both.",
    severity: ""
  },
  {
    id: "market-manipulation",
    title: "Market Manipulation",
    ref: "Regulation 115 (pp.94–95)",
    summary: "No person shall enter into or carry out two or more transactions in virtual assets which increase, reduce, or stabilize the price with the intention of inducing another person to purchase, sell, subscribe for, or refrain from same in virtual assets issued by the same or a related company. Offence: fine not exceeding KES 10 million or imprisonment for up to 5 years, or both.",
    severity: ""
  },
  {
    id: "false-trading-market-rigging",
    title: "False Trading and Market Rigging",
    ref: "Regulation 116 (pp.95–96)",
    summary: "A person shall not create anything intended or likely to create a false or misleading impression of active trading or with respect to the market for, or price for, virtual assets. A false impression is created if a person: enters into transactions not involving a change in beneficial ownership; or offers to sell at substantially the same price at which they have made or propose to make an offer to buy the same number of virtual assets. Offence: fine not exceeding KES 10 million or imprisonment up to 5 years, or both.",
    severity: ""
  },
  {
    id: "fraudulent-inducement",
    title: "Fraudulently Inducing Trading in Virtual Assets",
    ref: "Regulation 117 (pp.96–97)",
    summary: "A person shall not induce or attempt to induce another person to subscribe, sell or purchase virtual assets by: making or publishing false, misleading or deceptive statements, promises or forecasts; concealing material facts; or recording or storing false or misleading information. Offence: fine not exceeding KES 10 million or imprisonment up to 5 years, or both.",
    severity: ""
  },
  {
    id: "manipulative-devices",
    title: "Use of Manipulative Devices",
    ref: "Regulation 118 (p.97)",
    summary: "A person shall not, in connection with any transaction involving subscription, purchase or sale of virtual assets: (a) use any device, scheme or artifice to defraud; (b) engage in any fraudulent, deceptive act or course of business; or (c) make any false statement or omit material fact necessary to avoid misleading statements. Offence: fine not exceeding KES 10 million or imprisonment up to 5 years, or both.",
    severity: ""
  },
  {
    id: "false-misleading-inducement",
    title: "False or Misleading Statements Inducing Virtual Asset Transactions",
    ref: "Regulation 119 (p.97)",
    summary: "No person shall, for the purpose of inducing subscription, sale or purchase of virtual assets or to maintain, increase, reduce or stabilize price, make any statement which is false or misleading with respect to any material fact which they know or ought to know is false or misleading, or any statement rendered false by omission of a material fact. Offence: fine not exceeding KES 10 million or imprisonment up to 5 years, or both.",
    severity: ""
  },
  {
    id: "front-running",
    title: "Front-Running",
    ref: "Regulation 120 (p.98)",
    summary: "No person who has insider information on consumer orders with a price differential, or is aware of such orders, shall effect an own-account transaction in the virtual assets concerned or any related investments, directly or through any other person, to take advantage of the price differential before the consumer order is executed. Offence: fine not exceeding KES 10 million or imprisonment up to 5 years, or both.",
    severity: ""
  },
  {
    id: "churning",
    title: "Churning",
    ref: "Regulation 121 (pp.98–99)",
    summary: "A licensee shall NOT: (a) deal or arrange a deal in the exercise of discretion for any consumer; or (b) advise a consumer to deal, if the dealing could reasonably be considered too frequent or too large having regard to the consumer's trading activities, investment objectives, size and operations. Offence: fine not exceeding KES 10 million or imprisonment up to 5 years, or both.",
    severity: ""
  },
  {
    id: "cold-calling",
    title: "Cold Calling",
    ref: "Regulation 122 (pp.98–99)",
    summary: "A licensee shall not make unsolicited telephone calls or attend any property to solicit business unless it has established and monitors procedures to: (a) maintain a Do-Not-Call list updated whenever a person requests not to be called again; (b) train staff on use of the list; (c) limit calls to 8 a.m. to 5 p.m.; (d) oblige callers to state their first and last names at commencement; (e) oblige callers to state the firm's name, address and licensed status; (f) oblige callers to provide a detailed overview of any product before soliciting; and (g) record and make copies of all recordings available to the regulatory authority. Offence: fine not exceeding KES 10 million or imprisonment up to 5 years, or both.",
    severity: ""
  },

  // ═══════════════════════════════════════════════════════════════
  // PART XIII — ADVERTISEMENTS AND PROMOTIONS (Regulations 123–133)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "advertising-prohibition",
    title: "Advertising Prohibition — Unlicensed Advertising",
    ref: "Regulation 123 (pp.99–100)",
    summary: "A person shall NOT carry on or purport to carry on the advertisement of virtual asset services or the issue or promotion of virtual assets (including ICOs and NFTs) in or from Kenya unless that person complies with the Regulations. Exemptions apply to: government advertisement; persons engaged in printing commercial and promotional materials; persons responsible for placement of an advertisement (provided they are not responsible for the contents). Any person acting on behalf of a licensee or promoter must comply, and the licensee/promoter is vicariously liable. Offence: fine not exceeding KES 3 million or ONE YEAR imprisonment, or both.",
    severity: ""
  },
  {
    id: "advertisement-general-requirements",
    title: "General Requirements for Advertisement",
    ref: "Regulation 124 (pp.100–101)",
    summary: "Advertisements shall be: fair, clear, complete, concise, unambiguous, unbiased, not false/misleading/deceptive; contain timely and consistent information; convey equitable message on returns, benefits and risks; be clearly identifiable with suitable media choice for the target market; not lure consumers into malicious services; not facilitate illicit actors or high-risk providers; be in plain language clearly understandable by prospective consumers; and not state or imply suitability for a particular class unless designated. Before selling any virtual asset or service because of an advertisement, the licensee/promoter shall ensure consumers received sufficient information including benefits and potential failings. Advertisements for services shall include relevant information on the type of service, terms, timeframes for deposits and withdrawals, associated fees, and other relevant terms. Contravention: administrative penalty of KES 5 million.",
    severity: ""
  },
  {
    id: "advertisement-content",
    title: "Content of Advertisement",
    ref: "Regulation 125 (pp.101–103)",
    summary: "Advertisements shall: avoid extensive technical, legal or complex language; include licensee/promoter full name, tradename, licence number and registered office; include third party details if applicable; be accurate and up-to-date; not omit material facts or make unsustainable statements; use clear design and presentation; include approved trademarks if relevant; give fair, balanced indication of risks alongside benefits; include contact details for enquiries; ensure changes to original information are promptly notified with the date of update. Externally sourced information must be disclosed and verified. Comparisons and references to past or future performance must be clear, accurate, fair and balanced. Reference to the regulatory authority shall not imply approval and shall be limited to licensing reference. A licensee shall not use any regulator's name without prior approval. Contravention: administrative penalty of KES 5 million.",
    severity: ""
  },
  {
    id: "performance-information",
    title: "Performance Information in Advertisements",
    ref: "Regulation 126 (pp.103–104)",
    summary: "Advertisements shall not contain projections of performance returns based on borrowing plans that cannot be evidenced. Comparisons must be meaningful, fair and balanced with sources and key assumptions specified. Past performance references must contain a clear and prominent statement that past performance is not an indicator of future performance, state the reference period and source, and be based on objective, up-to-date information. Future performance information must cover both negative and positive scenarios, clearly state the basis for prediction, and include a prominent statement that forecasts are not reliable indicators. Advertisements shall not contain future performance information if objective data cannot substantiate it. Future performance shall not be based on simulated past performance. Advertisements shall advise consumers to undertake their own research. Contravention: administrative penalty of KES 5 million.",
    severity: ""
  },
  {
    id: "fees-costs-in-ads",
    title: "Fees, Costs and Commissions in Advertisements",
    ref: "Regulation 127 (pp.104–105)",
    summary: "Where a fee or cost is referred to in an advertisement, it shall give a realistic impression of the overall level of fees and costs a consumer is likely to pay, with clear indication if it is an estimate.",
    severity: ""
  },
  {
    id: "risk-warning-disclosures",
    title: "Risks and Warning Disclosures in Advertisements",
    ref: "Regulation 128 (p.105)",
    summary: "An advertisement shall adequately display and explain any risks associated with the virtual asset or service. Where the price is denominated in a currency other than Kenya Shillings, the consumer shall be warned that exchange rate changes may affect the value, price or income obtained. Contravention: administrative penalty not exceeding KES 5 million.",
    severity: ""
  },
  {
    id: "duty-person-advertising",
    title: "Duty of a Person Making Advertisement",
    ref: "Regulation 129 (p.105)",
    summary: "Any person making an advertisement shall at all times: act responsibly, with honesty, fairness, integrity and professionalism; avoid aggressive or offensive sale practices; avoid indecent images or phrases; deal respectfully with consumers and ensure sufficient disclosure; be transparent regarding their relationship with the licensee/promoter; avoid inaccurate, false, misleading or deceptive information; and preserve confidentiality of consumer information. Offence: fine not exceeding KES 3 million or 2 YEARS imprisonment, or both.",
    severity: ""
  },
  {
    id: "third-party-advertising-duties",
    title: "Duties of Third Parties Making Advertisements",
    ref: "Regulation 130 (pp.105–106)",
    summary: "Any person acting on behalf of a licensee or promoter shall: always disclose their full and accurate identity; disclose to consumers before entering into any contract all benefits to be paid (whether by fees, commissions, dividends or otherwise); and always disclose if they are being paid to promote or feature a promotion on their personal, business or other web pages. Offence: fine not exceeding KES 3 million or 2 years imprisonment, or both.",
    severity: ""
  },
  {
    id: "internet-advertisement",
    title: "Internet Advertisement Requirements",
    ref: "Regulation 131 (pp.106–107)",
    summary: "Internet advertisements shall: (a) be identical to the most up-to-date paper versions; (b) have a prominent statement that printed copies are available, with information on where and how to obtain them; (c) remain available for as long as necessary for consumers to reasonably read or access them or for the relevant validity period; (d) give consumers the opportunity to retain information through printing and downloading; and (e) downloadable advertisements should contain the date by print, watermark or time stamp when the download occurred.",
    severity: ""
  },
  {
    id: "prohibited-internet-advertising",
    title: "Prohibited Internet Advertising and Marketing Practices",
    ref: "Regulation 132 (pp.107–108)",
    summary: "A licensee or promoter shall abstain from the following internet-based advertisement practices: (a) hiding essential information by close proximity of promotional images or additional text; (b) reducing risk warnings in importance by locating them outside the main advertisement border; (c) diminishing statements through small font sizes, hard-to-read coloring, non-prominent positioning or unclear type styles; (d) hiding important information requiring significant scrolling or multiple page links; (e) making risk warnings easy to overlook, resulting in consumers being taken directly to an application form; (f) publishing risk statements in a pop-up box only appearing on the initial visit; (g) providing minimal information on product risks; (h) obscuring key information or warnings within the website or under separate sections; (i) incentives (bonuses, inducements) on the main page subject to conditions buried in hidden pages, not explained at account opening; (j) not accounting for different browser sizes when positioning risk information; (k) superimposing important information across colored or patterned backgrounds lessening visual impact.",
    severity: ""
  },
  {
    id: "ad-record-keeping",
    title: "Advertisement Record Keeping",
    ref: "Regulation 133 (p.108)",
    summary: "A licensee or promoter shall maintain adequate records of its advertisements, including details of who signed off each advertisement and when it was signed off, for at least SEVEN YEARS after the advertisement ceases to be available to consumers, or such other period the regulatory authority may request.",
    severity: ""
  },

  // ═══════════════════════════════════════════════════════════════
  // PART XIV — FREEZING AND SEIZURE ORDERS (Regulations 134–141)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "freezing-seizure-definitions",
    title: "Freezing and Seizure Orders — Definitions",
    ref: "Regulation 134 (pp.108–109)",
    summary: "Definitions for this Part: 'authorised officer' means a police officer, an officer of an investigating authority, or any other officer/employee/agent of a competent authority appointed to perform functions under these Regulations. 'Freezing order' means an order issued by a competent court or other lawful authority directing a VASP to prohibit any dealing, transfer, conversion, withdrawal or disposal of a specified virtual asset. 'Seizure order' means an order issued by a competent court or other lawful authority directing the taking of possession or control of specified virtual assets for purposes of preservation or forfeiture.",
    severity: ""
  },
  {
    id: "freezing-seizure-orders",
    title: "Freezing and Seizure of Virtual Assets",
    ref: "Regulation 135 (pp.109–110)",
    summary: "Freezing or seizure orders shall be obtained in accordance with the Proceeds of Crime and Anti-Money Laundering Act and the Anti-Corruption and Economic Crimes Act, or any other relevant written law. The powers of investigation, preservation, seizure, production of records, compensation and forfeiture applicable under these Acts shall, with necessary modifications, apply to virtual assets and VASPs. Nothing in these Regulations limits the competent authority to seek orders for recovery of virtual assets constituting proceeds of crime or unexplained assets.",
    severity: ""
  },
  {
    id: "freezing-seizure-licensee-obligations",
    title: "General Freezing and Seizure Orders — Obligations of Licensee",
    ref: "Regulation 136 (pp.110–111)",
    summary: "Every licensee shall comply effectively with any freezing and seizure orders, including: (a) responding promptly to lawful requests for information, documents, records; (b) providing access to virtual asset transaction records, consumer identification data, beneficial ownership information; (c) producing documents in such form and timeframe as specified; (d) maintaining systems and procedures for timely and effective responses; and (e) cooperating in execution of court orders, warrants, directives or other lawful instruments.",
    severity: ""
  },
  {
    id: "freezing-order-obligations",
    title: "Freezing Orders — Specific Obligations to Licensee",
    ref: "Regulation 137 (pp.110–111)",
    summary: "A licensee served with a freezing order shall: (a) IMMEDIATELY freeze the specified virtual assets; (b) prevent withdrawal, transfer or conversion related to the frozen assets; (c) preserve ALL records including consumer information, transaction logs, wallet addresses, KEYS and any other relevant data; (d) ensure any internal or third-party custodian, sub-custodian, exchange partner or DLT-infrastructure provider also complies; (e) comply with competent authorities and provide all documents, records, data or technical information required, including addresses or accounts, consumer identification records, transaction histories and metadata, wallet identifiers, addresses and associated credentials, and transaction histories; (f) any other information the competent court may order.",
    severity: ""
  },
  {
    id: "preservation-of-value",
    title: "Preservation of Value — Forced Conversion",
    ref: "Regulation 138 (p.111)",
    summary: "An authorised officer shall take all reasonable measures to maintain the value and integrity of seized virtual assets. The authorised officer may, upon approval of the competent court, CONVERT VOLATILE VIRTUAL ASSETS INTO FIAT CURRENCY to preserve value, where necessary.",
    severity: ""
  },
  {
    id: "seizure-order-obligations",
    title: "Seizure Orders — Obligations of Licensee",
    ref: "Regulation 139 (pp.111–112)",
    summary: "A licensee served with a seizure order shall: (a) IMMEDIATELY surrender control of the specified virtual assets to the competent authority; (b) provide full access to relevant wallets, addresses or accounts, digital records as specified; (c) transfer the virtual assets to a designated, secure digital wallet controlled by the competent authority; (d) provide transaction histories, logs, consumer records and technical information; (e) grant an authorised officer access to ANY PREMISES where the virtual asset devices are suspected to be, and the authorised officer may SEIZE AND DETAIN any physical device, HARDWARE WALLET, SEED PHRASE BACKUP or electronic system necessary to access the virtual assets.",
    severity: ""
  },
  {
    id: "custody-seized-assets",
    title: "Custody and Management of Seized Virtual Assets",
    ref: "Regulation 140 (p.112)",
    summary: "All seized virtual assets shall be transferred to a secure wallet controlled by the relevant government agency. The competent authority shall: (a) maintain a detailed chain-of-custody record, including transaction hashes and transfers executed pursuant to the seizure order; and (b) monitor the value of the seized virtual assets.",
    severity: ""
  },
  {
    id: "failure-to-comply-seizure",
    title: "Offence of Failure to Comply with Freezing/Seizure Orders",
    ref: "Regulation 141 (p.112)",
    summary: "A licensee that fails to comply with a freezing or seizure order commits an offence. Penalty: fine not exceeding KES 10 million, or imprisonment for a term not exceeding FIVE YEARS, or both.",
    severity: ""
  },

  // ═══════════════════════════════════════════════════════════════
  // PART XV — GENERAL PROVISIONS (Regulations 142–147)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "coordination-committee",
    title: "Establishment of the Coordination Committee",
    ref: "Regulation 142, Sixth Schedule (pp.112–113, p.150)",
    summary: "Pursuant to section 6(1)(g) of the Act, a coordination committee known as the 'Relevant Regulatory Authorities Coordination Committee' is established. The Committee shall consist of representatives nominated from the agencies specified in the Sixth Schedule: 1. The National Treasury (Chairperson); 2. Central Bank of Kenya; 3. Capital Markets Authority; 4. Asset Recovery Agency; 5. Financial Reporting Centre; 6. Directorate of Criminal Investigation; 7. National Intelligence Service; 8. Nairobi International Financial Centre Authority; 9. National Computer and Cybercrimes Coordination Committee; 10. Office of the Attorney General; 11. Communications Authority of Kenya; 12. National Counter Terrorism Centre; 13. Any other agency as the Cabinet Secretary may designate. This is a 13-member committee (plus any additional designated agencies) with NIS, DCI, and NCTC as permanent members alongside financial regulators.",
    severity: ""
  },
  {
    id: "coordination-committee-mandate",
    title: "Mandate of the Coordination Committee",
    ref: "Regulation 143 (pp.112–113)",
    summary: "The Coordination Committee shall: (a) coordinate supervisory and regulatory activities relating to VASPs; (b) facilitate timely sharing and exchange of supervisory, enforcement, and risk-based information; (c) harmonize regulatory approaches and resolve cross-sectoral issues affecting virtual asset services; (d) support joint inspections, risk assessments, and compliance monitoring; (e) issue joint advisories or sector notices where matters cut across more than one regulatory authority; and (f) prepare and submit periodic reports to the Cabinet Secretary.",
    severity: ""
  },
  {
    id: "coordination-committee-conduct",
    title: "Conduct of Business of the Coordination Committee",
    ref: "Regulation 144 (p.113)",
    summary: "The Committee shall meet at least once every quarter and may hold special meetings. The Committee may establish sub-committees as necessary. The Committee shall determine its own procedures. All members shall comply with confidentiality obligations under section 42 of the Act. The Committee shall be supported by a Secretariat consisting of persons nominated by the relevant regulatory authorities.",
    severity: ""
  },
  {
    id: "notice-to-penalise",
    title: "Notice to Penalise",
    ref: "Regulation 145 (pp.113–114)",
    summary: "The regulatory authority shall, before imposing a penalty on a licensee, give the licensee a NOTICE TO SHOW CAUSE, requiring the licensee to demonstrate why the penalty should not be imposed.",
    severity: ""
  },
  {
    id: "voluntary-liquidation",
    title: "Voluntary Liquidation",
    ref: "Regulation 146 (p.114)",
    summary: "Subject to the Insolvency Act, a licensee may, with the approval of the regulatory authority, voluntarily liquidate itself if it is unable to meet all its liabilities. The application shall be in the manner specified. The authority may approve the application if satisfied as to the insolvency. Upon approval, the licensee shall cease all operations except activities incidental to orderly realisation, conservation and preservation of assets and settlement of obligations. Where a licensee holds consumer funds, it shall discharge liability to consumers as soon as practicable after commencement of liquidation and then rank other creditors per the Insolvency Act.",
    severity: ""
  },
  {
    id: "involuntary-liquidation",
    title: "Involuntary Liquidation",
    ref: "Regulation 147 (p.114)",
    summary: "If an application for liquidation of a licensee is presented by a person other than the regulatory authority, the applicant shall serve a copy on the regulatory authority, which shall be entitled to be a party to the proceedings. The regulatory authority may make an application to the court for liquidation in accordance with Part VI of the Insolvency Act.",
    severity: ""
  },

  // ═══════════════════════════════════════════════════════════════
  // SCHEDULES (Referenced throughout the Regulations)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "first-schedule-fees",
    title: "First Schedule — Fees Payable (Complete Fee Structure)",
    ref: "First Schedule (pp.115–116)",
    summary: "APPLICATION, LICENCE AND RENEWAL FEES: Virtual Asset Wallet Provider: KES 100K application, KES 500K licence, renewal KES 500K or 0.15% of gross turnover (whichever is higher). Virtual Asset Exchange: KES 100K application, KES 2M licence, renewal 2% of gross income of previous year or KES 2M (whichever is higher). Virtual Asset Payment Processor: KES 100K application, KES 200K licence, renewal KES 200K or 0.15% of gross turnover (whichever is higher). Virtual Asset Broker: KES 100K application, KES 100K licence, renewal KES 100K or 0.15% of gross turnover (whichever is higher). Virtual Asset Investment Advisor: KES 20K application, KES 100K licence, renewal KES 100K or 0.15% of gross turnover (whichever is higher). Virtual Asset Manager: KES 100K application, KES 500K licence, renewal 0.05% of AUM or KES 500K (whichever is higher). Virtual Asset Offering Provider — ICO: KES 100K application, KES 500K licence, renewal KES 500K or 0.15% of gross turnover (whichever is higher). Virtual Asset Offering Provider — Tokenization: KES 100K application, KES 500K licence, renewal KES 500K or 0.15% of gross turnover (whichever is higher). Virtual Asset Offering Provider — Token Issuance Platform: KES 100K application, KES 500K licence, renewal KES 500K or 0.15% of gross turnover (whichever is higher). Virtual Asset Offering Provider — Stablecoin Issuance: KES 100K application, KES 2M licence, renewal KES 2M or 0.15% of gross turnover (whichever is higher). TRANSACTION AND APPROVAL FEES: Exchange Transaction Fee: 0.05% of transaction value payable by EACH counterparty. Token issuance platform transaction fee: 0.05% of transaction value payable by each counterparty. Approval of Virtual Asset Offering: 0.5% of the value of the successful offer. Approval of Stablecoin Issuance: KES 200,000. OTHER FEES: Approval fee for proposed acquisition, transfer or disposal of shares in a licensee: 0.25% of transaction value. Approval fee for assignment or transfer of a licence: 0.25% of transaction value.",
    severity: ""
  },
  {
    id: "second-schedule-application-form",
    title: "Second Schedule — Application Form for VASP Licence",
    ref: "Second Schedule (pp.117–125)",
    summary: "The prescribed application form contains five parts: Part A — Applicant's General Information (name, trading names, incorporation date, physical office in Kenya, geolocation address, KRA PIN, email, website, other Kenya offices, countries of operation, parent company, registered subsidiaries); Part B — Type of Virtual Asset Activities applied for; Part C — Particulars of Shareholders, Directors and Senior Officers (up to 10 shareholders or attached list, directorships with full details); Part D — Capital Structure and Operations (nominal capital, number of shares, paid-up capital, insurance evidence, principal bankers, proposed custodians and service providers, virtual asset custodial details for wallet providers, listed virtual assets for exchanges, operational capabilities description, policies and procedures, financial statements, funding sources); Part E — Declaration signed by two directors before a Commissioner for Oaths. Required attachments include 30 items covering identity documents, incorporation documents, CR12, BOF1, tax compliance, other licences, financial statements, business plan, internal controls policies, insurance evidence, organisational structure, fee schedules, 14 categories of written policies and procedures, shareholders' annual accounts, fit and proper forms for all significant shareholders/directors/officers, service provider details, outsourcing agreements, and consumer agreements.",
    severity: ""
  },
  {
    id: "third-schedule-business-plan",
    title: "Third Schedule — Contents of a Business Plan",
    ref: "Third Schedule (pp.126–128)",
    summary: "The prescribed business plan must contain 12 sections in sequence: 1. Executive Summary (overview, vision/mission, rationale for market entry); 2. Corporate Governance Structure (board structure, committees, charter); 3. Operational Plan (staffing, organisational structure, senior officer duties, premises, outsourcing); 4. Description of Virtual Asset Services (nature/scope, operating model, delivery channels, onboarding/due diligence, terms/conditions/charges); 5. Technology and Security Infrastructure (ICT systems, cybersecurity controls, architecture diagram, data flow, trading systems, wallet infrastructure, data protection); 6. Risk Management Framework (risk register covering market, operational, technology, liquidity, custody, fraud risks with mitigation strategies, business continuity and disaster recovery); 7. Compliance and Internal Controls (AML/CFT/CPF framework, compliance monitoring plan); 8. Financial Projections (revenue model, cost structure, capital adequacy and liquidity plans, 3-to-5-year projections including income statements, statement of financial position and cash flow); 9. Market Analysis (target market segmentation, competitor landscape, expected market share and growth strategy, identification of market needs); 10. Fees and Charges Structure (trading, transfer, commission, management, other fees); 11. Consumer Assets and Safeguarding Arrangements (segregation, insurance/compensation, consumer protection mechanisms in case of failure/revocation/insolvency); 12. Implementation Plan (timelines, milestones, resource allocation, 3-year rollout plan with projected consumer numbers, value and volume).",
    severity: ""
  },
  {
    id: "fourth-schedule-fit-proper",
    title: "Fourth Schedule — Fit and Proper Requirements",
    ref: "Fourth Schedule (pp.129–147)",
    summary: "The Fourth Schedule contains three separate Fit and Proper Forms: (1) For Directors, CEO and Senior Officers — requires personal information, educational qualifications, professional qualifications, banking history (last 5 years), responsibilities of proposed position, employment/business record, description of past and present activities including shareholdings (past 5 years) and directorships (past 5 years), membership to professional bodies, and extensive history section covering: financial defaults (last 5 years), convictions for dishonesty/fraud/malpractice, willingness to undertake director duties diligently, understanding of legal and professional obligations, any disqualifications, dismissals from office, adjudged bankruptcy, convictions for fraud/theft, convictions under virtual assets law, association with entities in financial distress, and three referees who have known the applicant for at least 5 years. (2) For Beneficial Owners — similar requirements covering personal information, shareholdings, directorships, and similar history questions. (3) For Significant Shareholders — covers corporate body or individual information, sources of funds, sworn statement that funds are not from proceeds of crime, prior licensing history, censure or disciplinary history, criminal convictions, investigations, debt defaults, bankruptcy, and disqualifications. All forms must be signed before a Commissioner for Oaths/Magistrate and accompanied by CVs, certified certificates, identity documents, credit rating reports, evidence of shares, declarations on source of funds, and CR12/BOF1 for corporate shareholders.",
    severity: ""
  },
  {
    id: "fifth-schedule-capital",
    title: "Fifth Schedule — Capital and Liquidity Requirements",
    ref: "Fifth Schedule (pp.148–149)",
    summary: "PAID-UP CAPITAL AND LIQUID CAPITAL REQUIREMENTS: 1. Virtual Asset Wallet Provider: KES 150M paid-up, liquid capital KES 30M or 100% of current liabilities for at least 30 days (whichever is higher). 2. Virtual Asset Exchange: KES 150M paid-up, liquid net worth equal to 50% of estimated gross operating costs for the next 12 months or such other amount as prescribed. 3. Virtual Asset Payment Processor: KES 50M paid-up, liquid capital KES 10M or 20% of paid-up capital (whichever is higher). 4. Virtual Asset Broker: KES 30M paid-up, liquid capital KES 6M or 8% of total liabilities (whichever is higher). 5. Virtual Asset Investment Adviser: KES 2.5M paid-up, liquid capital KES 1M or 8% of total liabilities (whichever is higher). 6. Virtual Asset Manager: KES 30M paid-up, liquid capital KES 6M or 8% of total liabilities (whichever is higher). 7. ICO Provider: KES 200M paid-up, liquid capital KES 40M or 8% of total liabilities (whichever is higher). 8. Tokenization Provider: KES 200M paid-up, liquid capital KES 40M. 9. Token Issuance Platform: KES 200M paid-up, liquid capital KES 40M or 8% of total liabilities (whichever is higher). 10. Stablecoin Issuer: KES 500M paid-up, liquid capital KES 100M or 100% of current liabilities for at least 30 days (whichever is higher).",
    severity: ""
  },
  {
    id: "sixth-schedule-coordination",
    title: "Sixth Schedule — Membership of the Coordination Committee",
    ref: "Sixth Schedule (p.150)",
    summary: "The Coordination Committee consists of 13 members: 1. The National Treasury (Chairperson); 2. Central Bank of Kenya; 3. Capital Markets Authority; 4. Asset Recovery Agency; 5. Financial Reporting Centre; 6. Directorate of Criminal Investigation; 7. National Intelligence Service; 8. Nairobi International Financial Centre Authority; 9. National Computer and Cybercrimes Coordination Committee; 10. Office of the Attorney General; 11. Communications Authority of Kenya; 12. National Counter Terrorism Centre; 13. Any other agency as the Cabinet Secretary may designate.",
    severity: ""
  },

  // ═══════════════════════════════════════════════════════════════
  // CATCH-ALL
  // ═══════════════════════════════════════════════════════════════
  {
    id: "other",
    title: "Other / General Proposal",
    ref: "General",
    summary: "Propose a new provision, amendment, or general improvement not listed above.",
    severity: ""
  }
];
