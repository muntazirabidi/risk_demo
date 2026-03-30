# Spectrum — Development Guide

## What Spectrum Is

**Spectrum** is an agent-native autonomous vendor intelligence platform. It deploys 20+ specialized AI agents to onboard, assess, monitor, and remediate vendor risk across the entire supplier lifecycle — serving procurement, finance, compliance, and supply chain teams.

**The wedge**: Institutional-grade due diligence reports delivered in 30 minutes instead of 90 days. This is what's live and what we sell today.

**The vision**: The system of record for vendor risk — a full lifecycle platform (Onboard → Assess → Monitor → Remediate) where every report builds a proprietary knowledge graph that compounds with scale.

**Stage**: Pre-seed. Building MVP/demo. First PoC delivered (10 supplier reports + portfolio report for an energy utility client).

## Tech Stack

- **Frontend**: React 19 + Vite 7 + React Router 7 + Tailwind CSS 4
- **Backend**: Express.js + Node.js (ES modules)
- **AI**: Anthropic Claude API (`@anthropic-ai/sdk`) with `web_search_20250305` tool
- **Design**: Flat, sharp, monochrome. Inter + JetBrains Mono. No border-radius, no gradients, no box-shadows.

## Architecture

```
/                           → Landing page: hero + live assessment engine + sample reports
/portfolio                  → Portfolio dashboard: 10 real vendor reports + portfolio report
/portfolio/:vendorId        → Vendor detail view (for sample/live-assessed vendors)
/report/:vendorId           → Full HTML report viewer (for featured vendors + portfolio)
```

### Backend

- `server.js` — Express server on port 3001
- `services/openai.js` — Anthropic client init (file is named openai.js for legacy reasons, uses Anthropic SDK)
- `services/riskAgent.js` — Two-stage assessment: (1) 3 parallel web searches via Claude, (2) structured JSON synthesis
- `routes/assessment.js` — POST `/api/assess-risk` endpoint
- `services/cacheService.js` — File-based caching in `backend/data/assessments/`
- **Env**: `ANTHROPIC_API_KEY` required in `backend/.env`

### Frontend

**Pages:**
- `LandingPage.jsx` — Hero positioning + live demo + sample reports (Palantir, ServiceNow) + regulatory urgency + lifecycle vision
- `VendorPortfolio.jsx` — 10 real PoC vendor cards (5x2 grid) + portfolio report banner + vendor table
- `VendorDetail.jsx` — Detailed view for sample/live vendors with RiskDashboard
- `ReportViewer.jsx` — iframe viewer for full HTML reports (individual, portfolio, and sample)

**Key Components:**
- `AssessmentForm.jsx` — 2-column form, uppercase labels, flat styling
- `LoadingState.jsx` — Terminal-style panel with agent phases (INGEST/ANALYZE/REPORT)
- `QuickDemoButtons.jsx` — Compact vendor quick-start buttons
- `RiskDashboard.jsx` → `RiskScoreCard.jsx` → `FivePillars.jsx` → `FindingsGrid.jsx` → `DetailedBreakdown.jsx`
- `CapaRecommendations.jsx` — Auto-generated corrective action plans
- `ContractPlaybook.jsx` — Risk-based contract clause recommendations

**Data:**
- `mockVendors.js` — 10 featured PoC vendors (ABB, Amprion, Comarch, DocuSign, Global Facilities, Giorgetti, Microsoft, OpenAI, Schneider IT, Siemens) + portfolio report data + sample reports (Palantir, ServiceNow)

**Reports** (`frontend/public/reports/`):
- `individual/` — 10 real HTML due diligence reports (~80-120KB each)
- `portfolio/` — 1 portfolio intelligence report
- Root level: `palantir-report.html`, `servicenow-report.html` (sample reports)

## Design System

**Philosophy**: Institutional, not SaaS-y. Bloomberg/McKinsey aesthetic. Color conveys meaning, not decoration.

```
Fonts:      Inter (body, headings) + JetBrains Mono (numbers, data, phases)
Background: Pure white (#ffffff)
Text:       Slate-900 (#0f172a) primary, Slate-500 (#64748b) secondary
Borders:    Slate-200 (#e2e8f0), 1px solid, NO border-radius
Buttons:    Flat slate-900, uppercase tracking-wider, no shadows
Status:     Emerald (qualified), Amber (conditional), Orange (monitoring), Red (critical)
Selection:  Black background, white text
```

**Rules:**
- No rounded corners anywhere (buttons, cards, inputs, badges, progress bars)
- No gradients, no box-shadows, no glow effects
- No emojis in UI
- Color only for status indicators — everything else is slate/black/white
- Hover states use color/border changes only, no transforms
- Uppercase micro-labels: `text-[10px] uppercase tracking-[0.15em]`
- Tabular figures (`font-variant-numeric: tabular-nums`) for all numbers

## Positioning (For Copy/Messaging)

**Hero**: "Autonomous Vendor Intelligence for the Entire Supplier Lifecycle"

**Tagline**: "Lower Risk. Faster Onboarding. Higher Confidence."

**Key language**:
- "Agent-native" (not "AI-powered" — VCs pay 40% premium for this framing)
- "System of record" (not "tool" or "platform")
- "Autonomous intelligence" (not "automated reports")
- "20+ specialized AI agents" (Hunter, Analyst, Synthesis agents)
- "Evidence-cited findings" (not "AI-generated insights")

**Lifecycle stages**: Onboard → Assess → Monitor → Remediate

**Buyer personas**: Procurement, Finance, Compliance, Supply Chain

**Regulatory urgency**: LkSG (2% turnover fines), CSRD (50K+ companies), UFLPA ($1.34B detained), 61% breached via vendors

**Competitive positioning**: Incumbents (SecurityScorecard, BitSight, Exiger) are cyber-focused or legacy. ORO Labs ($100M Series C) does procurement workflow, not intelligence. No one owns "agent-native vendor due diligence."

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
- The flat/sharp design language — no rounded corners, no gradients

## What's Safe to Modify

- Copy/messaging text on any page
- mockVendors.js data
- Component styling (maintain flat design system)
- QuickDemoButtons company list
- Landing page section order/content

---

**Last Updated**: 2026-03-30
**Version**: v3.0
**Branch**: `main`
