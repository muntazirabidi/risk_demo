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
- `LandingPage.jsx` — Left-aligned hero with animated vendor feed (terminal-style header), social proof strip, six pillars with left-border accents, sample reports, platform lifecycle (seamless grid), regulatory urgency (dark grid), live assessment form
- `VendorPortfolio.jsx` — Hero with monitoring badge, dark portfolio banner with stat dividers, seamless stats strip, 5-column vendor grid (gap-px), filterable data table with bg-slate-50 headers
- `VendorDetail.jsx` — Flat header with back nav, status banner with sharp badges, RiskDashboard
- `ReportViewer.jsx` — Clean header + iframe for full HTML reports

**Key Components:**
- `AssessmentForm.jsx` — 2-column layout, flat styling, input-field class
- `LoadingState.jsx` — Terminal-style panel with INGEST/ANALYZE/REPORT phases
- `QuickDemoButtons.jsx` — Compact vendor quick-start pills
- `RiskDashboard.jsx` — Dark header with score, executive summary card, seamless key metrics grid (gap-px), pillars, findings, CAPA, contract playbook
- `RiskScoreCard.jsx` — Circular SVG score (solid stroke, square linecap), flat metric cards with border-l accents, status badges
- `FivePillars.jsx` — 5-column grid with risk-colored left borders
- `FindingsGrid.jsx` — Finding cards with border-l-[3px] risk accents, colored text icons, flat impact/implication boxes
- `DetailedBreakdown.jsx` — Category accordion (space-y-px seamless), border-l-[3px] risk indicators, flat expanded content
- `CapaRecommendations.jsx` — Dark header, priority badges (design-system style), expandable action plans
- `ContractPlaybook.jsx` — Dark header with strategy badge, expandable clause sections, flat layout
- `UpgradeCard.jsx` — Dark header with score, two-column comparison (bordered vs bg-slate-50), flat form, no gradients
- `Toast.jsx` — Solid color bar (emerald/red/slate-900), sharp corners, auto-dismiss

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
  Dark sections:  #0f172a (slate-900) — portfolio banner, report headers, regulatory strip, component headers

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
- Max container: `max-w-[1200px]` (all pages) or `max-w-[1600px]` (report viewer only)
- Left-aligned text everywhere (hero, section headings, "try it" — never centered)
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
- NO rounded corners anywhere (buttons, cards, inputs, badges, spinners, toasts)
- NO gradients (no `bg-gradient-to-*`, no `from-*`, no gradient text)
- NO box-shadows (no `shadow-sm`, `shadow-lg`, `shadow-2xl`, `drop-shadow-*`)
- NO glow effects (no ring glow on hover, no backdrop-blur)
- NO emojis in UI
- NO `hover:scale-*` or `hover:translate-*` transforms
- Hover: border-color or text-color change only, opacity transitions for reveal
- Buttons: flat, `text-sm font-medium`, dark (`bg-slate-900`) or outline (`border border-slate-300`)
- Dark panels: `bg-slate-900` for hero elements, component headers, report headers
- Cards: `border border-slate-200` with `border-l-[3px]` risk color accent
- Stats: `text-3xl font-light font-mono` with status color, label below in `text-[10px] uppercase tracking-wider`
- Badges: flat, `text-[10px] font-semibold uppercase tracking-wider`, colored bg + border (no rounded)
- Toast: solid background color (emerald-600/red-600/slate-900), sharp corners, no shadow

**Density Patterns:**
- Seamless grids: `gap-px bg-slate-200` (or `bg-slate-100`, `bg-slate-800`) — cards butt against each other with 1px borders between them, creating a terminal/spreadsheet density
- Use this pattern for: stats strips, vendor card grids, key metrics, platform lifecycle, regulatory stats
- Vertical dividers: `w-px h-10 bg-slate-200` (light) or `bg-slate-700` (dark sections)
- Accordion groups: `space-y-px` for seamless stacked items

**SVG / Data Visualization:**
- Circular progress: solid `stroke` color (not gradient), `strokeLinecap="square"` (not round)
- Risk icons: colored text only (`text-red-600`, etc.), no gradient background containers
- Pulsing dot for "live" status: `w-1.5 h-1.5 bg-emerald-500 animate-pulse`

**Animations:**
- `cubic-bezier(0.25, 0.46, 0.45, 0.94)` for all transitions
- Fade-in on page load: `animate-fade-in` (0.4s)
- Hero feed: 3.5s cycle with 300ms fade transition
- Pulsing green dot for "live" indicators
- Stagger delays: 0.05s increments
- Score counter: easeOutQuart over 1800ms

**Accessibility:**
- `focus-visible` rings in blue (#2563eb), 2px, offset 2px
- Smooth scroll for anchor links
- Semantic HTML (section, header, nav, main, footer)

### What NOT to Do
- No rounded corners (not even `rounded-sm` — includes toasts, modals, form inputs, everything)
- No teal/turquoise (legacy brand color — removed)
- No purple/indigo decorative elements (no `from-blue-600 to-purple-600`)
- No card shadows (`shadow-sm`, `shadow-lg`, `drop-shadow-*` — all removed)
- No gradient backgrounds or text gradients
- No emoji or decorative icons
- No centered hero text (always left-aligned, including "try it" sections)
- No "AI-powered" language (use "autonomous" or "agent-native")
- No "supply chain" in primary positioning (use "vendor due diligence" or "due diligence")
- No `hover:scale-105` or `hover:-translate-y-2` (hover is color-only)
- No `backdrop-blur-sm` or glassmorphism effects
- No `border-4` or thick decorative borders (borders are always 1px, except `border-l-[3px]` risk accents)
- No `font-black` or `font-bold` on headings (headings use `font-light`, body labels use `font-semibold` max)
- No `rounded-full` badges (badges are rectangular with sharp corners)
- No `bg-white/20` overlays or transparency tricks

### Component Header Pattern
Major dashboard components (CAPA, Contract Playbook, UpgradeCard) use a consistent dark header:
```
<div className="bg-slate-900 px-6 py-5">
  <h3 className="text-lg font-light text-white tracking-tight">Section Title</h3>
  <p className="text-sm text-slate-400 mt-1">Description text.</p>
</div>
```
This creates visual rhythm when scrolling through a report — dark/light/dark/light.

### Form Styling
All form inputs use the `.input-field` CSS class (defined in `index.css`):
- Sharp corners, 1px `border-slate-200`, focus = `border-slate-900` with 1px ring
- Labels: `text-xs font-medium text-slate-500 uppercase tracking-wider mb-2`
- Buttons: `bg-slate-900 text-white text-sm font-medium` (primary) or `border border-slate-300 text-sm font-medium text-slate-700` (secondary)

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
**Version**: v5.0
**Branch**: `main`
