# OUR VASP BILL

A community counter-proposal platform for Kenya's Draft Virtual Asset Service Providers (VASP) Regulations, 2026.

---

## What it is

Kenya's Treasury published the Draft VASP Regulations 2026 — 147 regulations and 6 schedules covering licensing, capital requirements, governance, stablecoins, cybersecurity, seizure powers, and more. Many of these provisions are anti-startup, anti-competitive, and out of step with how comparable jurisdictions regulate the crypto industry.

**OUR VASP BILL** gives Kenya's crypto community a place to respond. Anyone can read the specific regulations, write a concrete alternative, back it with evidence, and put it to a community vote. The resulting proposals are designed to be submitted directly to the National Treasury as a structured public comment.

---

## Why it was made

The public comment process for financial legislation in Kenya is largely opaque — there is no centralised, accessible way for industry participants to coordinate feedback. Most responses are submitted individually and silently. This platform exists to:

1. **Surface the most harmful provisions** so the community knows what to prioritise
2. **Crowd-source better alternatives** with evidence from comparable jurisdictions (Singapore MAS, EU MiCA, UK FCA, UAE VARA)
3. **Demonstrate community support** — a proposal with 500 supporters carries more weight than 500 individual emails
4. **Create a public record** of what the Kenyan crypto industry actually wants

---

## How it works

### The Regulations

All 153 regulations (including schedules) are extracted from the draft bill and classified by severity:

| Severity | Count | Meaning |
|---|---|---|
| 🔴 Needs Redesign | 72 | Anti-startup, anti-competitive — complete redesign needed |
| 🟡 Needs Adjustment | 64 | Right intent, wrong calibration — targeted amendments needed |
| 🟢 Can Enhance | 17 | Broadly sound policy — minor improvements possible |

### The Flow

1. **Browse** — Open the Propose tab. Regulations are grouped by severity and then by Part of the bill. Start with "Needs Redesign" to see the most critical provisions.
2. **Select** — Click any regulation card to read its full summary. The selected regulation stays visible at the top of the proposal form so you have context while writing.
3. **Propose** — Write your alternative in plain language. Add evidence (data, references to other jurisdictions) and state the intended outcome concretely.
4. **Identify** — Enter your name and Kenyan phone number to submit. Your phone number is hashed (SHA-256 via the Web Crypto API) before storage — the raw number is never sent to any server.
5. **Publish** — Your proposal is live immediately in the Community Proposals tab, visible to everyone in real-time.
6. **Vote** — Anyone can support a proposal. One phone number = one vote per proposal. Votes are stored in Firestore.
7. **Share** — Each proposal has a share button. On mobile it uses the native share sheet (WhatsApp, X, Instagram, etc.). On desktop it opens WhatsApp Web or X with a pre-written message personalised to the proposal author.

### Identity and Privacy

There is no account system. Identity is a name + Kenyan phone number, stored as:

- **Display name:** first name + last initial (e.g. "Wanjiru N.")
- **Phone:** hashed with SHA-256, stored only as a hex string
- **Raw phone number:** kept in `localStorage` only, never transmitted to any server

This is enough to prevent duplicate votes while keeping the barrier to participation low.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 8 |
| Database | Firebase Firestore v12 (real-time, no backend) |
| Analytics | Firebase Analytics (gracefully degraded for ad-blockers) |
| Identity hashing | Web Crypto API (`crypto.subtle.digest`) — no library |
| Styling | Inline styles, Inter font (Google Fonts) |
| Package manager | pnpm |

No backend. No auth. No build-time secrets. Firestore security rules control write access.

---

## Project Structure

```
src/
├── firebase.js               # Firebase init (Firestore + Analytics)
├── App.jsx                   # Root: tab state, user state, localStorage persistence
├── constants.js              # COLORS, FONT, SEVERITY config (red/yellow/green)
├── utils.js                  # hashPhone, normalizePhone, validatePhone, getInitials
├── regulations.js            # Adds severity + part grouping to raw regulations
├── regulations_reviewed.js   # Source of truth: all 153 regulations (do not edit)
├── sampleProposals.js        # Example proposals shown when Firestore is empty
├── index.css                 # Global reset + scrollbar styles
└── components/
    ├── Header.jsx             # App header with user identity chip + sign out
    ├── ProposeTab.jsx         # Regulation browser (severity filter) + proposal form
    ├── ProposalsTab.jsx       # Community proposals feed with regulation filter chips
    └── ProposalCard.jsx       # Individual proposal: vote, share, inline join form
```

---

## Local Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build locally
pnpm preview
```

Requires Node 18+.

---

## Deployment

The app is a static SPA — deploy to any static host (Firebase Hosting, Vercel, Netlify, Cloudflare Pages).

**Before going live:**

1. Update the `og:url` and `twitter:url` meta tags in `index.html` with your actual domain
2. Add `public/og-image.png` (1200×630px) — this is what WhatsApp and X render as the link preview card when someone shares a proposal
3. Set Firestore security rules in the Firebase Console (see below)
4. Confirm Firebase Analytics is enabled in the Console if you want usage tracking

### Recommended Firestore Security Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /proposals/{proposalId} {
      // Anyone can read proposals
      allow read: if true;

      // Anyone can create — required fields enforced
      allow create: if request.resource.data.keys().hasAll([
        'regulationId', 'suggestion', 'outcome',
        'authorName', 'authorInitials', 'authorPhoneHash',
        'upvotes', 'voters', 'createdAt'
      ]);

      // Updates are restricted to vote fields only
      allow update: if request.resource.data.diff(resource.data)
                        .affectedKeys().hasOnly(['upvotes', 'voters']);
    }
  }
}
```

---

## Firebase Config

The Firebase config in `src/firebase.js` contains a client-side API key. For Firebase web apps this is intentional and standard — the key identifies the project but does not grant any privileged access. Security is enforced entirely through Firestore security rules. If you prefer environment variables, move the config to a `.env` file and reference them via `import.meta.env.VITE_*`.

---

*Built for Kenya's crypto community.*
