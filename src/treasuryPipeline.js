// Automated Treasury submission pipeline.
// Triggers when a proposal crosses VOTE_THRESHOLD.
// Steps:
//   1. Atomic Firestore claim (one client only)
//   2. Look up verbatim regulation text from public/vasp-bill.json (no LLM)
//   3. Call Gemini to translate natural language → formal legal revision + rationale
//   4. Assemble and download the Treasury .docx

import { runTransaction, doc } from 'firebase/firestore';
import { db } from './firebase';
import {
  Document, Packer, Paragraph, Table, TableRow, TableCell,
  TextRun, WidthType, AlignmentType, HeadingLevel,
  ShadingType, VerticalAlign,
} from 'docx';

// ── Config ────────────────────────────────────────────────────────────────────
export const VOTE_THRESHOLD = 5;

const GEMINI_MODEL = 'gemini-3-flash-preview';

// ── Bill text cache (fetched once per session) ────────────────────────────────
let _billData = null;

async function loadBillData() {
  if (_billData) return _billData;
  const resp = await fetch('/vasp-bill.json');
  if (!resp.ok) throw new Error(`Could not load vasp-bill.json (${resp.status})`);
  _billData = await resp.json();
  return _billData;
}

// ── Gemini — translate natural language proposal → formal legal text ───────────
async function callGemini(proposal, verbatimText) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error('VITE_GEMINI_API_KEY not configured in .env');

  // Strip page references like "(p.10)" or "(pp.115–116)" from the ref string
  const cleanRef = (proposal.regulationRef || proposal.regulationTitle)
    .replace(/\s*\(pp?\.[\d,\s–\-]+\)/g, '')
    .trim();

  const prompt = `You are a professional parliamentary drafter preparing Kenya's official public comment on the Draft Virtual Asset Service Providers (VASP) Regulations 2026 for submission to the National Treasury.

A community member has described what they want changed and why. Their description is the INTENT INPUT only — it tells you what to change and why, not how to write it. Your job is to express their intent entirely in your own formal legislative language. Do not reproduce their words. A reader of the final output should not be able to tell a community member wrote the underlying input.

REGULATION BEING AMENDED: ${cleanRef}

VERBATIM TEXT FROM THE DRAFT BILL — use this as your drafting style reference:
${verbatimText}

WHAT THE COMMUNITY MEMBER WANTS CHANGED (their intent — do not copy their words):
${proposal.suggestion}

WHY THEY WANT THIS CHANGE (their rationale — do not copy their words):
${proposal.outcome}

Produce three outputs:

1. "relevantProvisions": Copy verbatim from the draft bill text above only the specific sub-regulation(s) or clause(s) being amended. Exact wording only — no paraphrasing, no summarising.

2. "proposedRevision": Write the replacement regulatory text as a professional parliamentary drafter would draft it for insertion into the bill.
   - Begin with: "Amend ${cleanRef} to read:" (adjust to the specific sub-section being changed)
   - Write the complete replacement text exactly as it would appear in the final bill
   - Follow the drafting conventions of the original: use "shall" for obligations, "may" for discretion, "where" or "provided that" for conditions, and numbered sub-clauses matching the original format
   - Derive only the community member's INTENT from their input — then express it entirely in formal legislative language
   - Preserve all sub-regulations not being changed

3. "rationale": Write the policy justification in formal regulatory submission language.
   - Derive only the community member's REASONING from their rationale input — then express it entirely in professional policy language
   - Structure it as: what is problematic about the current provision → the practical impact → why the proposed revision resolves it
   - Do not add arguments or evidence the community member did not provide, but do not use their informal phrasing either`;

  const resp = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: 'OBJECT',
            properties: {
              relevantProvisions: { type: 'STRING' },
              proposedRevision:   { type: 'STRING' },
              rationale:          { type: 'STRING' },
            },
            required: ['relevantProvisions', 'proposedRevision', 'rationale'],
          },
          temperature:     0.4,
          maxOutputTokens: 2048,
        },
      }),
    }
  );

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err.error?.message || `Gemini API error ${resp.status}`);
  }

  const data = await resp.json();
  const raw  = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
  return JSON.parse(raw);
}

// ── docx assembly ─────────────────────────────────────────────────────────────
const NAVY    = '1B4F72';
const HP      = (pt) => pt * 2; // docx uses half-points

function hCell(text) {
  return new TableCell({
    shading: { type: ShadingType.SOLID, color: NAVY, fill: NAVY },
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children: [new Paragraph({
      children: [new TextRun({ text, bold: true, color: 'FFFFFF', size: HP(10) })],
    })],
  });
}

function dCell(text) {
  return new TableCell({
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children: [new Paragraph({
      children: [new TextRun({ text: text || '', size: HP(10) })],
    })],
  });
}

function buildDocx(cleanRef, formatted, sNo = 1) {
  const table = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        tableHeader: true,
        children: [
          hCell('S/No'),
          hCell('Regulation'),
          hCell('Provisions of the Reg*'),
          hCell('Proposed Revision**'),
          hCell('Rationale for the revision / Recommendation'),
        ],
      }),
      new TableRow({
        children: [
          dCell(String(sNo)),
          dCell(cleanRef),
          dCell(formatted.relevantProvisions),
          dCell(formatted.proposedRevision),
          dCell(formatted.rationale),
        ],
      }),
    ],
  });

  return new Document({
    sections: [{
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [new TextRun({
            text: 'PROPOSED DRAFT VIRTUAL ASSET SERVICE PROVIDERS REGULATIONS, 2026',
            bold: true,
            size: HP(14),
          })],
        }),
        new Paragraph({
          spacing: { after: 280 },
          children: [
            new TextRun({ text: 'INSTITUTION', bold: true, size: HP(11) }),
            new TextRun({ text: '\t\tweb3clubs\t\t\t\t', size: HP(11) }),
            new TextRun({ text: 'DATE', bold: true, size: HP(11) }),
            new TextRun({ text: `\t\t${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}.`, size: HP(11) }),
          ],
        }),
        table,
        new Paragraph({
          spacing: { before: 160 },
          children: [new TextRun({
            text: '*Provide text on exact wording of the provision in the proposed clause or clauses',
            italics: true, size: HP(9),
          })],
        }),
        new Paragraph({
          children: [new TextRun({
            text: '** Provide the exact wording of how the proposed draft regulations or clause is proposed to read.',
            italics: true, size: HP(9),
          })],
        }),
      ],
    }],
  });
}

function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a   = Object.assign(document.createElement('a'), { href: url, download: filename });
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ── Main export ───────────────────────────────────────────────────────────────
export async function runTreasuryPipeline(proposal) {
  const proposalRef = doc(db, 'proposals', proposal.id);

  // 1. Atomic claim — only one connected client proceeds per proposal
  let claimed = false;
  try {
    claimed = await runTransaction(db, async (txn) => {
      const snap = await txn.get(proposalRef);
      if (snap.data()?.treasuryFormatted) return false;
      txn.update(proposalRef, { treasuryFormatted: true });
      return true;
    });
  } catch (err) {
    console.error('[Treasury] Firestore transaction failed:', err);
    return;
  }
  if (!claimed) return;

  console.log(`[Treasury] Claimed "${proposal.regulationTitle}" — starting pipeline…`);

  // 2. Load bill text — no LLM, direct lookup by regulation ID
  let verbatimText = '';
  try {
    const billData = await loadBillData();
    verbatimText = billData[proposal.regulationId]?.verbatim || '';
    if (!verbatimText) {
      console.warn(`[Treasury] No verbatim text found for "${proposal.regulationId}" — proceeding without it`);
    }
  } catch (err) {
    console.error('[Treasury] Failed to load bill text:', err);
    // Non-fatal — proceed with empty verbatim; Gemini will work with what it has
  }

  // Clean the regulation reference for the submission (strip page numbers)
  const cleanRef = (proposal.regulationRef || proposal.regulationTitle)
    .replace(/\s*\(pp?\.[\d,\s–\-]+\)/g, '')
    .trim();

  // 3. Gemini: translate natural language → formal legal revision + rationale
  let formatted;
  try {
    formatted = await callGemini(proposal, verbatimText);
  } catch (err) {
    console.error('[Treasury] Gemini call failed — proposal will not auto-retry:', err);
    // Keep treasuryFormatted: true to avoid infinite retry loops.
    // Reset it manually in Firestore console if you need to re-run.
    return;
  }

  // 4. Build docx
  let blob;
  try {
    const docxDoc = buildDocx(cleanRef, formatted);
    blob = await Packer.toBlob(docxDoc);
  } catch (err) {
    console.error('[Treasury] docx generation failed:', err);
    return;
  }

  // 5. Download
  const slug = proposal.regulationTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .slice(0, 50);
  triggerDownload(blob, `treasury-${slug}.docx`);
  console.log(`[Treasury] Downloaded treasury-${slug}.docx`);
}
