# Spectrum — Development Guide

## What Spectrum Is

**Spectrum** is an autonomous due diligence platform for the enterprise. It deploys 20+ specialized AI agents to research, assess, and monitor vendors — producing institutional-grade risk intelligence in minutes, not months.

**Category**: Autonomous Due Diligence. Not "vendor risk management", not "procurement automation" — due diligence across the entire vendor lifecycle.

**Current product**: Institutional-grade DD reports covering 6 risk pillars (Financial, ESG, Regulatory, Cybersecurity, Operational, Reputational). First PoC delivered: 10 supplier reports + portfolio report for an energy utility client.

**Platform vision**: The system of record for vendor risk — Onboard → Assess → Monitor → Remediate — where every assessment compounds into a proprietary knowledge graph. Domains: Vendor Lifecycle, Procurement, Supply Chain, Finance & Compliance.

**Stage**: Pre-seed. Building MVP/demo.

## Tech Stack

- **Frontend**: React 19 + Vite 7 + React Router 7 + Tailwind CSS 4
- **Backend**: Express.js + Node.js (ES modules)
- **AI**: Anthropic Claude API (`@anthropic-ai/sdk`) with `web_search_20250305` tool
- **Fonts**: Inter (variable, with optical sizing) + JetBrains Mono + Instrument Serif (italic accent)

## Architecture

```
/                           → Landing page: hero + live demo + sample reports + platform vision
/portfolio                  → Portfolio dashboard: 10 vendor cards + portfolio report + data table
/portfolio/:vendorId        → Vendor detail (sample/live-assessed vendors)
/report/:vendorId           → Full HTML report viewer (individual, portfolio, sample)
```

### Backend

- `server.js` — Express on port 3001
- `services/openai.js` — Anthropic client (legacy filename, uses `@anthropic-ai/sdk`)
- `services/riskAgent.js` — Two-stage: 3 parallel web searches → structured JSON synthesis
- `routes/assessment.js` — POST `/api/assess-risk`
- `services/cacheService.js` — File-based cache in `backend/data/assessments/`
- **Env**: `ANTHROPIC_API_KEY` in `backend/.env`

### Frontend

**Pages:**
- `LandingPage.jsx` — Left-aligned hero with animated vendor feed, six pillars, sample reports, platform lifecycle, regulatory urgency, live assessment form
- `VendorPortfolio.jsx` — Dark portfolio banner, 5x2 vendor cards with risk-colored left borders, stats strip, filterable data table
- `VendorDetail.jsx` — Detailed view with RiskDashboard for live/sample vendors
- `ReportViewer.jsx` — Clean header + iframe for full HTML reports

**Key Components:**
- `AssessmentForm.jsx` — 2-column layout, flat styling
- `LoadingState.jsx` — Terminal-style panel with INGEST/ANALYZE/REPORT phases
- `QuickDemoButtons.jsx` — Compact vendor quick-start
- `RiskDashboard.jsx` — Dark header with score, executive summary, key metrics, pillars, findings, CAPA, contract playbook
- `FivePillars.jsx` — 5-column grid with risk-colored left borders
- `FindingsGrid.jsx`, `DetailedBreakdown.jsx` — Finding cards and category breakdowns
- `CapaRecommendations.jsx` — Auto-generated corrective action plans
- `ContractPlaybook.jsx` — Risk-based contract clause recommendations

**Data:**
- `mockVendors.js` — 10 PoC vendors + portfolio report + sample reports (Palantir, ServiceNow)

**Reports** (`frontend/public/reports/`):
- `individual/` — 10 real HTML DD reports
- `portfolio/` — 1 portfolio intelligence report
- Root: `palantir-report.html`, `servicenow-report.html`

## Design System

### Philosophy
Premium, institutional, modern. Inspired by Coverbase, Procure AI, Linear, Stripe. The design should feel like a financial terminal crossed with a premium SaaS product. Color conveys meaning, not decoration.

### Foundations

```
Fonts:
  Body/Headings:  Inter (variable, optical sizing, feature-settings cv02/cv03/cv04/cv11)
  Numbers/Data:   JetBrains Mono (tabular-nums, letter-spacing -0.02em)
  Accent:         Instrument Serif italic — used ONLY on one key word in hero headlines

Colors:
  Background:     #ffffff (pure white)
  Text primary:   #0f172a (slate-900)
  Text secondary: #64748b (slate-500)
  Text tertiary:  #94a3b8 (slate-400)
  Borders:        #e2e8f0 (slate-200), 1px solid
  Accent:         #2563eb (blue-600) — used for serif italic words and selection highlight
  Dark sections:  #0f172a (slate-900) — portfolio banner, report headers, regulatory strip

Status colors (ONLY for risk/status indicators):
  Qualified:      emerald-600/700
  Conditional:    amber-600/700
  Monitoring:     orange-600/700
  Critical/Red:   red-600/700
  Positive:       emerald-500

Risk-colored left borders (3px):
  Score 80+:      border-l-emerald-500
  Score 70-79:    border-l-amber-500
  Score 60-69:    border-l-orange-500
  Score <60:      border-l-red-500
```

### Rules

**Layout:**
- Max container: `max-w-[1200px]` (landing, portfolio) or `max-w-[1600px]` (report viewer)
- Left-aligned hero text, not centered
- Sections separated by `border-t border-slate-100`
- Generous vertical spacing: `pt-24 pb-20` hero, `py-20` sections, `py-12` data sections
- Section labels: `text-sm text-slate-400 uppercase tracking-widest mb-3`

**Typography:**
- Headings: `font-light` (300 weight), `tracking-tight`, `leading-[1.08]`
- Body: 400 weight, `text-base` or `text-sm`, `text-slate-500`
- Labels: `text-[10px] uppercase tracking-widest text-slate-400`
- Scores: `font-mono font-light` with risk-appropriate color
- One serif italic accent per page max (Instrument Serif on one key word)

**Components:**
- NO rounded corners anywhere (buttons, cards, inputs, badges, spinners)
- NO gradients, NO box-shadows, NO glow effects
- NO emojis in UI
- Hover: border-color or text-color change only, no transforms or scale
- Buttons: flat, `text-sm font-medium`, dark (`bg-slate-900`) or outline (`border border-slate-300`)
- Dark panels: `bg-slate-900` for hero elements (portfolio banner, report header, regulatory strip)
- Cards: `border border-slate-200` with `border-l-[3px]` risk color accent
- Stats: `text-4xl font-light font-mono` with status color, label below

**Animations:**
- `cubic-bezier(0.25, 0.46, 0.45, 0.94)` for all transitions
- Fade-in on page load: `animate-fade-in` (0.4s)
- Hero feed: 3.5s cycle with 300ms fade transition
- Pulsing green dot for "live" indicators
- Stagger delays: 0.05s increments

**Accessibility:**
- `focus-visible` rings in blue (#2563eb), 2px, offset 2px
- Smooth scroll for anchor links
- Semantic HTML (section, header, nav, main, footer)

### What NOT to Do
- No rounded corners (not even `rounded-sm`)
- No teal/turquoise (legacy brand color — removed)
- No purple/indigo decorative elements
- No card shadows (`shadow-sm`, `shadow-lg` — all removed)
- No gradient backgrounds or text gradients
- No emoji or decorative icons
- No centered hero text (always left-aligned)
- No "AI-powered" language (use "autonomous" or "agent-native")
- No "supply chain" in primary positioning (use "vendor due diligence" or "due diligence")

## Positioning

**Hero**: "Autonomous due diligence for the *enterprise*."

**Subtitle**: "AI agents that autonomously research, assess, and monitor your vendors — producing institutional-grade risk intelligence in minutes, not months."

**Category**: Autonomous Due Diligence (not vendor risk management, not procurement automation)

**Key language:**
- "Autonomous due diligence" — the category we own
- "Agent-native" — differentiator vs incumbents (VCs value this framing)
- "Institutional-grade" — not just scores, full forensic analysis
- "Evidence-cited" — every finding traceable to a source
- "Knowledge graph" — data moat that compounds with scale
- "Minutes, not months" — the transformation

**What NOT to say:**
- "AI-powered" (too generic, every startup says it)
- "Supply chain" in headlines (too broad, wrong competitive bucket)
- "Tool" or "solution" (we're a platform / system of record)
- "Protects" (vague, sounds like cybersecurity)
- "Reports are the wedge" (internal strategy language, never customer-facing)

**Lifecycle**: Onboard → Assess → Monitor → Remediate

**Domains**: Vendor Lifecycle, Procurement, Supply Chain, Finance & Compliance

**Regulatory urgency**: LkSG (2% turnover fines), CSRD (50K+ companies), UFLPA ($1.34B detained), 61% breached via vendors

**Competitive landscape**: SecurityScorecard/BitSight (cyber-only), Exiger (semi-manual DD), ORO Labs (procurement workflow), Coverbase (intake/compliance workflow). No one owns autonomous, agent-native due diligence at institutional grade.

## Running Locally

```bash
# Backend
cd backend
echo "ANTHROPIC_API_KEY=sk-ant-..." > .env
npm install && npm run dev    # port 3001

# Frontend
cd frontend
npm install && npm run dev    # port 5173
```

## What NOT to Change

- Assessment API logic (`routes/assessment.js`)
- Report HTML files (generated by separate pipeline in `risk_reports/`)
- RiskDashboard data structure expectations
- Routing structure
- The flat/sharp design language

## What's Safe to Modify

- Copy/messaging text
- `mockVendors.js` data
- Component styling (maintain design system rules above)
- `QuickDemoButtons` company list
- Section order/content on landing page

---

**Last Updated**: 2026-03-30
**Version**: v4.0
**Branch**: `main`
