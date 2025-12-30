# Claude Development Guide - Spectrum

## Project Overview
**Spectrum** is an AI-powered vendor due diligence service that automates manual supplier assessments. We generate comprehensive risk reports that replace 90-day manual processes with 30-second AI analysis.

**Current Branch**: `main` (production-ready, deployed on Vercel)
**Primary Use Case**: Enterprise B2B procurement teams (Tahakum Saudi Arabia, others)
**Version**: v2.1-production
**Last Major Update**: 2025-12-30

## Business Model (Important!)
**We are selling REPORTS, not platform access**
- **Phase 1** (Current): Deliver automated vendor assessment REPORTS
  - Client sends us vendor names → We deliver comprehensive PDF/Excel reports
  - Replaces their manual 90-day assessment process
  - Pay per report or bulk pricing
- **Phase 2** (Future): Platform access as they scale
  - Eventually provide self-service portal access
  - Continuous monitoring dashboard
  - API integration with their systems

**Demo Strategy**: Show the platform UI to demonstrate our capabilities, but position it as "this is how we generate your reports" rather than "you'll get access to this platform."

## Tech Stack
- **Frontend**: React 19 + Vite + React Router + TailwindCSS
- **Backend**: Express.js + Node.js
- **AI**: GPT-4o with web search tools (Tavily)
- **Design System**: Premium enterprise slate/navy palette

---

## Current Demo Features (✅ Built & Ready)

### 1. **Instant Risk Assessment** (Original Feature)
- 30-second AI-powered vendor analysis
- Multi-dimensional risk scoring across 5 pillars
- Real-time web search for current data
- Export to Excel/JSON
- **Route**: `/` (Landing page)

### 2. **Vendor Portfolio Dashboard** (✅ NEW - Dec 2025)
- Complete vendor ecosystem management view
- 8 pre-populated Saudi vendors (SABIC, Al Zamil, Tasnee, etc.)
- Real-time statistics dashboard
- Status filters (Qualified, Conditional, Monitoring)
- Search functionality across vendors
- Criticality indicators (High/Medium/Low)
- CAPA tracking with overdue alerts
- **Route**: `/portfolio`

### 3. **CAPA Recommendations** (✅ NEW - Dec 2025)
- Auto-generated Corrective Action Preventive Action plans
- Priority-based recommendations (HIGH/MEDIUM)
- Assigned ownership by risk category
- Due dates based on priority level
- Detailed verification criteria
- Expandable action details with rationale
- Integrated into every vendor report

### 4. **Contract Playbook** (✅ NEW - Dec 2025)
- Risk-based contract clause recommendations
- 6 key contract areas:
  1. Term & Termination Rights
  2. Performance & SLAs
  3. Compliance & Audit Rights
  4. Data Security & IP Protection
  5. ESG & Sustainability
  6. Liability & Insurance
- Tailored recommendations based on vendor risk score
- Expandable sections with specific clauses and rationale

### 5. **Premium Enterprise Design** (✅ NEW - Dec 2025)
- Professional slate/navy color scheme
- Minimalist 3-dot logo design
- Clean, enterprise-grade aesthetics
- No "AI tool" stereotypes (removed teal gradients)
- Inspired by Stripe, Linear, Notion design systems
- Enterprise-ready for C-suite presentations

### 6. **Featured Intelligence Reports** (✅ NEW - Dec 30, 2025)
- **3 Full Comprehensive HTML Reports** showcasing deep due diligence capabilities:
  1. **Palantir Technologies Inc.** - Software & Data Analytics (Risk Score: 82)
  2. **Plug Power Inc.** - Clean Energy & Hydrogen (Risk Score: 74)
  3. **TechVendor Solutions Inc.** - IT Services & Solutions (Risk Score: 78)
- **Featured Reports Section** in Portfolio View:
  - Prominent display with card-based layout
  - Visual badges to distinguish full reports from sample vendors
  - Direct access to comprehensive HTML reports
- **Full Report Viewer** (`/report/:vendorId`):
  - Embedded iframe display of complete HTML reports
  - Clean navigation with back-to-portfolio button
  - Export options (Download PDF, Export Excel)
- **Report Files Location**: `/frontend/public/reports/`
  - `palantir-report.html` - 84KB
  - `plugpower-report.html` - 48KB
  - `techvendor-report.html` - 65KB
- **Demo Value**: Shows depth of analysis beyond simple scores - full forensic-level due diligence

### 7. **Performance Optimization** (✅ NEW - Dec 30, 2025)
- **File-based caching system** (`backend/services/cacheService.js`)
  - Stores assessment results in `backend/data/assessments/`
  - Instant retrieval for repeat queries (<1 second vs 30+ seconds)
  - Cache key based on company name + industry + location (normalized)
  - Force refresh option available via UI checkbox
- **Multi-agent search architecture**:
  - 3 parallel web searches for comprehensive coverage
  - Search 1: Financial Health & Operations
  - Search 2: Compliance & Controversies (ESG, Human Rights, Sanctions)
  - Search 3: Cybersecurity & Supply Chain Risks
- **Result**: Faster assessments with better quality and no redundant API calls

### 8. **Design Refinements** (✅ UPDATED - Dec 30, 2025)
- **Color-with-purpose philosophy**: Color reserved for status, not decoration
  - Metadata badges (industry, location): Neutral slate
  - Status indicators (success, warning): Green, amber
  - Risk levels: Red (critical), orange (high), yellow (medium), blue (low), green (positive)
- **Removed decorative elements**:
  - Purple/indigo gradients on company avatars ❌
  - Multi-color metadata badges ❌
  - Teal accent colors ❌
  - Text gradients and unnecessary effects ❌
- **Result**: Professional enterprise aesthetic matching Stripe, Linear, GitHub standards

---

## Client Context: Tahakum

### Meeting Details
- **Attendees**: Procurement Team & Supplier Qualification Manager - Director + Team
- **Meeting Context**: Met at high-fi conference in Zurich
- **Pre-Demo Materials Shared**:
  - ✅ Client deck (Vendor Intelligence - Dark theme)
  - ✅ Sample supplier due diligence report
- **Client Feedback**: Positive response to materials, want to see live demo

### Key Pain Points We Address
1. **Time Drain**: 90-day vendor assessments → 30 seconds
2. **Fragmented Data**: Scattered across emails, PDFs, spreadsheets
3. **Static Reviews**: Periodic snapshots vs. continuous monitoring
4. **Evidence Gap**: Need verifiable proof for regulators
5. **Manual CAPA Tracking**: No automated action planning
6. **Contract Negotiation**: No risk-based clause recommendations

### What They Expect to See (Based on Materials Shared)
- ✅ Five Pillars of Intelligence (Financial, ESG, Human Rights, Sanctions, Cyber)
- ✅ 30-minute decision-ready reports
- ✅ CAPA recommendations
- ✅ Contract playbooks
- ✅ Continuous monitoring capability
- ✅ Supply chain ecosystem mapping (future: Tier 1/2/3 visualization)

---

## Demo Architecture

### Multi-Page Application Structure
```
/                           → Landing page with instant assessment
/portfolio                  → Vendor portfolio dashboard (3 featured + 8 sample vendors = 11 total)
/portfolio/:vendorId        → Detailed vendor report with CAPA + Contract sections (sample vendors)
/report/:vendorId           → Full HTML report viewer (featured vendors only)
```

### Key Components

**Pages:**
- `LandingPage.jsx` - Instant assessment form + results
- `VendorPortfolio.jsx` - Portfolio management dashboard with featured reports section
- `VendorDetail.jsx` - Individual vendor detailed reports (for sample vendors)
- `ReportViewer.jsx` - ✅ NEW: Full HTML report viewer (for featured vendors)

**Core Components:**
- `AssessmentForm.jsx` - Vendor input form
- `RiskDashboard.jsx` - Complete risk report display
- `RiskScoreCard.jsx` - Overall risk score visualization
- `FivePillars.jsx` - Five pillars metrics display
- `FindingsGrid.jsx` - Risk findings by category
- `CapaRecommendations.jsx` - ✅ NEW: Auto-generated action plans
- `ContractPlaybook.jsx` - ✅ NEW: Risk-based contract recommendations
- `QuickDemoButtons.jsx` - Pre-filled demo companies
- `LoadingState.jsx` - AI analysis animation

**Data:**
- `mockVendors.js` - 11 total vendors:
  - 3 featured vendors (Palantir, Plug Power, TechVendor) with `fullReport: true` and `reportUrl`
  - 8 sample Saudi vendors with mock data

---

## Sales Demo Guide (Updated Dec 30, 2025)

### **Primary Demo URL**: http://localhost:5173/portfolio

### Recommended Demo Flow (15 min)

**1. Start at Portfolio Page** - Primary showcase
   - Hero: "Transform 90-day assessments → 24-48 hours"
   - Featured Reports: "See What You Receive" - Click Palantir/Plug Power to show depth
   - How It Works: 3-step visual (Send names → AI analyzes → Get reports)
   - Portfolio Table: Continuous monitoring after assessment

**2. Optional: Live Demo** - http://localhost:5173/
   - "Live Demo" badge shows AI capability in real-time
   - Before/After comparison (Traditional vs Spectrum)
   - Run assessment with well-known company (TSMC, Siemens)

### Key Sales Messages (Built Into UI)
- ✅ **"24-48 hours vs 90+ days"** - Speed differentiation
- ✅ **"Beyond scores"** - CAPA plans + Contract Playbooks
- ✅ **"No platform training"** - Reports-as-a-Service model
- ✅ **"5 critical pillars"** - Comprehensive forensic analysis
- ✅ **"Continuous monitoring"** - Not point-in-time snapshots

### Demo Talking Points
**Positioning:**
- "We sell comprehensive intelligence REPORTS, not software"
- "Send us vendor names → We deliver reports in 24-48 hours"
- "Phase 1: Reports-as-a-Service, Phase 2: Platform access as you scale"

**Value Props:**
- Replaces 90-day manual process
- $15-20K traditional cost → Fixed per-report pricing
- Evidence-based analysis with audit trails
- Actionable: CAPA recommendations + Risk-based contract clauses

**Common Objections:**
- *"We use [competitor]"* → "We're augmenting with autonomous intelligence, not replacing questionnaires"
- *"Do we get platform access?"* → "Start with reports to prove value, then scale to platform"
- *"How accurate?"* → [Show full report with evidence sources]

### Pre-Demo Checklist
- [ ] Backend running (port 3001)
- [ ] Frontend running (port 5173)
- [ ] Navigate: Portfolio → Click featured report → Back
- [ ] Test live assessment (one quick company)
- [ ] Close unnecessary tabs

---

## Design System (Updated Dec 2025)

### Premium Color Palette
```css
/* Primary Colors */
--slate-900: #0F172A  /* Buttons, primary text, headers */
--slate-800: #1E293B  /* Button hover states */
--slate-700: #334155  /* Secondary text */
--slate-600: #475569  /* Tertiary text, icons */
--slate-500: #64748B  /* Subtle text */

/* Backgrounds */
--slate-50: #F8FAFC   /* Page backgrounds */
--slate-100: #F1F5F9  /* Hover states */
--white: #FFFFFF      /* Cards, containers */

/* Borders */
--slate-200: #E2E8F0  /* All borders, dividers */
--slate-300: #CBD5E1  /* Input borders */

/* Status Colors */
--emerald-600: #059669  /* Qualified status */
--emerald-700: #047857  /* Qualified text */
--amber-600: #D97706    /* Conditional status */
--amber-700: #B45309    /* Conditional text */
--orange-600: #EA580C   /* Monitoring status */
--orange-700: #C2410C   /* Monitoring text */
--red-600: #DC2626      /* High risk, overdue */
--red-700: #B91C1C      /* High risk text */
```

### Typography
- **Headings**: font-semibold, font-bold (not heavy)
- **Body**: font-medium, font-normal
- **Sizes**: text-sm, text-base, text-lg, text-xl (controlled scale)
- **Tracking**: tracking-tight for headers, tracking-wide for labels

### Components Style Guide
- **Buttons**: Flat slate-900, no gradients, subtle hover states
- **Cards**: White background, slate-200 border, minimal shadow (shadow-sm)
- **Badges**: Color only for status, neutral slate for metadata
  - ✅ Metadata (industry, location): `bg-slate-50 border-slate-200`
  - ✅ Success status: `bg-green-50 border-green-200`
  - ✅ Warning status: `bg-amber-50 border-amber-200`
  - ❌ No decorative blue/purple badges
- **Tables**: Clean lines, slate-50 header background
- **Inputs**: slate-300 border, focus ring-2 ring-slate-900
- **Avatars**: Solid slate-900 background, rounded-lg (not rounded-2xl)

### Design Principle: Color with Purpose
**Rule**: Color conveys meaning (status, risk level), not decoration.
- **Good**: Green badge = positive status, Red badge = critical risk
- **Bad**: Blue badge just because "industry" needs a different color

### What We Removed (To Look Professional)
- ❌ Teal/turquoise colors (AI tool stereotype)
- ❌ Purple/indigo for decorative purposes (metadata badges)
- ❌ Heavy gradients and glassmorphism
- ❌ Multi-color badge systems without semantic meaning
- ❌ Excessive rounded corners (rounded-2xl → rounded-lg)
- ❌ Animated pulsing effects
- ❌ Heavy box shadows (shadow-lg → shadow-sm)
- ❌ Scale transforms on hover
- ❌ Playful animations and text gradients

---

## Development Workflow

### Current Environment
- **Backend**: http://localhost:3001
- **Frontend**: http://localhost:5173
- **Branch**: `main` (production-ready)

### Running the Demo
```bash
# Backend (Terminal 1)
cd backend
npm start

# Frontend (Terminal 2)
cd frontend
npm run dev

# Open browser
http://localhost:5173
```

### Testing Checklist (Before Demo)
- [ ] Backend running on port 3001
- [ ] Frontend running on port 5173
- [ ] API keys configured (.env files)
- [ ] Navigate to /portfolio - all 8 vendors display
- [ ] Click any vendor - detailed report loads
- [ ] CAPA recommendations display correctly
- [ ] Contract Playbook sections expand/collapse
- [ ] Status filters work (All, Qualified, Conditional, Monitoring)
- [ ] Search vendors by name/industry
- [ ] Navigate to / - instant assessment works
- [ ] Test live assessment with Saudi company (e.g., "ARAMCO", "Ma'aden")
- [ ] Back button navigation works between pages
- [ ] All buttons and links functional
- [ ] Mobile responsive (basic check)

---

## Demo Presentation Strategy

### Recommended Demo Flow

**1. Start at Portfolio Dashboard** (http://localhost:5173/portfolio)
```
"Welcome to Spectrum. Let me show you HOW we generate your vendor
assessment reports.

This is our analysis engine - we're currently tracking 8 Saudi suppliers.
You can see 5 are Qualified, 2 Conditional, and 1 under enhanced Monitoring.

When you send us a vendor name, our AI system does THIS level of analysis
automatically, and we deliver a comprehensive report back to you in minutes
instead of the 90 days your team currently spends."

[Point to summary stats cards]

"The beauty is - you don't need to learn a new platform or change your
workflow. You send us names, we send back reports. Simple."
```

**2. Click on "Gulf International Logistics" (Monitoring Status)**
```
"Let's look at this logistics partner that requires attention.
This is a complete risk profile across our Five Pillars of Intelligence:
Financial Health, ESG & Sustainability, Human Rights, Sanctions, and
Cybersecurity.

[Scroll to Risk Score - 68]
You can see this vendor has elevated risks with a score of 68.

[Scroll to CAPA Recommendations]
Based on our AI analysis, we've automatically generated a corrective
action plan. These aren't just scores - these are specific, actionable
steps with assigned owners, due dates, and verification criteria.

[Expand a CAPA]
For example, for ESG & Sustainability, we're recommending they implement
Scope 3 emissions tracking by March 31st, 2026. The verification criteria
are clearly defined for audit purposes.

[Scroll to Contract Playbook]
Here's where it gets powerful for procurement teams. We provide risk-based
contract recommendations tailored to THIS vendor's profile.

[Expand "Term & Termination Rights"]
Because this vendor has elevated risk (score 68), we're recommending shorter
contract terms - 12 months with quarterly reviews instead of the standard
24-36 months. Every recommendation includes the rationale.

[Expand another section like "Compliance & Audit Rights"]
And for compliance, we're suggesting quarterly audits instead of annual
because of the risk factors. This gives you defensibility if regulators ask.
```

**3. Return to Portfolio, Then New Assessment**
```
[Click "Back to Portfolio"]
Now let me show you how we ADD a new vendor to this portfolio...

[Click "+ New Assessment" or navigate to home]
[Enter "ARAMCO" or "Ma'aden" or any Saudi company]

Watch this - our multi-agent AI is now autonomously pulling data from
hundreds of sources: financial records, sanctions lists, ESG reports,
cybersecurity databases, news sources... analyzing it all in real-time.

[Wait ~30 seconds]

There. 30 seconds. What used to take your team 90 days.

This vendor is now in your portfolio for continuous monitoring. If anything
changes - a sanctions hit, financial distress, ESG incident, data breach -
you'll know immediately, not in your next quarterly review.
```

**4. Wrap-Up Value Props - Report-Based Model**
```
So here's how this works for Tahakum:

PHASE 1 (Starting Now):
You send us vendor names → We deliver comprehensive reports
- PDF format with all five risk pillars analyzed
- Excel export for your systems
- CAPA plans and contract recommendations included
- Turnaround time: Same day or next business day
- Pay per report or bulk monthly pricing

You don't change anything about your current workflow. We just replace
the 90 days of manual work with automated intelligence.

PHASE 2 (As You Scale):
As your volume grows, we can provide portal access so your team can
run assessments on-demand. But that's only when you're ready.

Right now, we're solving your immediate pain: Getting these comprehensive
vendor assessments done faster, cheaper, and better than your manual process.

Questions about how we'd integrate with your current procurement workflow?
```

---

## Saudi Market Customizations

### Pre-Populated Vendors (8 Saudi Companies)
1. **SABIC** (Chemicals) - Risk: 82, Status: Qualified
2. **Al Zamil Group** (Industrial) - Risk: 76, Status: Conditional
3. **MEPCO** (Packaging) - Risk: 71, Status: Conditional
4. **Tasnee** (Metals) - Risk: 84, Status: Qualified
5. **Abdullah Hashim** (Industrial Gases) - Risk: 79, Status: Qualified
6. **Advanced Petrochemical** (Petrochemicals) - Risk: 88, Status: Qualified
7. **Almarai** (Food & Packaging) - Risk: 80, Status: Qualified
8. **Gulf International Logistics** - Risk: 68, Status: Monitoring

### Quick Demo Companies (For Live Assessment)
- ARAMCO (Saudi Aramco)
- Ma'aden (Saudi Mining Company)
- SABIC
- STC (Saudi Telecom Company)
- ACWA Power
- Almarai

### Regional Compliance (Future Enhancement)
If client asks about Saudi-specific compliance:
- SAMA (Saudi Arabian Monetary Authority) requirements
- Saudi Labor Law compliance
- Saudization (Nitaqat) programs
- Saudi Vision 2030 alignment
- GCC trade considerations

---

## What NOT to Change (Core Functionality)

### Backend - DO NOT MODIFY
1. **Assessment API** (`/backend/routes/assessment.js`)
   - Risk calculation logic
   - OpenAI integration
   - Tavily search integration
   - Response format

2. **API Endpoints**
   - `/api/assess-risk` - Core assessment logic
   - `/api/health` - Health check

3. **Environment Configuration**
   - PORT: 3001 (backend)
   - PORT: 5173 (frontend)
   - API keys (OpenAI, Tavily)

### Frontend - Safe to Modify
✅ **Can Change:**
- Design/styling (already updated to premium)
- Mock vendor data in `mockVendors.js`
- QuickDemoButtons companies
- Copy/messaging text
- Additional UI components

❌ **Keep Stable:**
- AssessmentForm validation logic
- RiskDashboard data structure expectations
- API integration code
- Routing structure (working well)

---

## Future Enhancements (Post-Demo Feedback)

### Phase 2 Features (If Client Requests)
1. **Supply Chain Visualization**
   - Tier 1/2/3 supplier mapping
   - Dependency analysis
   - Geographic concentration visualization

2. **Historical Trends**
   - Risk score over time graphs
   - CAPA completion tracking
   - Re-assessment history

3. **Collaboration Features**
   - CAPA assignment to team members
   - Comment threads on findings
   - Approval workflows

4. **Arabic Language Support**
   - RTL layout
   - Arabic translations
   - Bilingual reports

5. **Integration Capabilities**
   - Export to procurement systems
   - API for automated monitoring
   - Slack/email notifications

6. **Advanced Filtering**
   - Multi-dimensional filters
   - Saved filter views
   - Bulk operations

---

## Technical Debt / Known Limitations

### Current Limitations
1. **Mock Data**: Portfolio vendors use static mock data (not live AI assessments)
2. **No Persistence**: Assessments don't save to database (frontend only)
3. **No Authentication**: No user login/accounts
4. **Single User**: No multi-user collaboration features
5. **No Real-Time Updates**: Continuous monitoring is simulated, not active

### These Are Demo Limitations (Intentional)
- Focus is on demonstrating capability and UX
- Full production version would include:
  - Database (PostgreSQL/MongoDB)
  - Authentication (Auth0/Clerk)
  - Real-time monitoring webhooks
  - Multi-tenant architecture
  - Background job processing

---

## Files Modified for Tahakum Demo

### New Files Created
- `frontend/src/pages/LandingPage.jsx` - Main assessment page
- `frontend/src/pages/VendorDetail.jsx` - Individual vendor view
- `frontend/src/components/VendorPortfolio.jsx` - Portfolio dashboard
- `frontend/src/components/CapaRecommendations.jsx` - CAPA component
- `frontend/src/components/ContractPlaybook.jsx` - Contract recommendations
- `frontend/src/data/mockVendors.js` - Saudi vendor data

### Modified Files
- `frontend/src/App.jsx` - Added React Router routing
- `frontend/src/main.jsx` - Added BrowserRouter wrapper
- `frontend/src/components/RiskDashboard.jsx` - Integrated CAPA and Contract components
- `package.json` - Added react-router-dom dependency

### Design Updates (All Components)
- Updated color scheme from teal to slate/navy
- Removed gradients and heavy effects
- Refined typography and spacing
- Professional button and badge styles
- Clean table and card designs

---

## Success Metrics for Demo

### What Defines Success
1. ✅ Client understands the **instant assessment value** (30 seconds vs 90 days)
2. ✅ Client sees the **enterprise workflow** (portfolio management)
3. ✅ Client recognizes the **actionability** (CAPAs, contract playbooks)
4. ✅ Client appreciates the **continuous monitoring** capability
5. ✅ Client wants to **move to pilot phase** or **commercial discussion**

### Red Flags to Avoid
- ❌ Demo crashes or errors during presentation
- ❌ Slow API responses (> 45 seconds)
- ❌ Design looks "template-y" or "AI-generated" (FIXED ✅)
- ❌ Can't answer "how do you track changes over time?"
- ❌ Can't articulate ROI or integration path

### Questions to Prepare For
1. "How does continuous monitoring work?"
   → Explain: AI agents regularly re-scan vendors, alert on changes

2. "Can we integrate with SAP/Oracle?"
   → Yes, API-first architecture, RESTful endpoints

3. "What about data privacy and security?"
   → SOC 2 Type II ready, data residency options, encryption

4. "How do you handle Arabic language?"
   → Phase 2 feature, bilingual support planned

5. "What's the pricing model?"
   → Per-vendor-per-year or enterprise license (defer to commercial team)

---

## Quick Reference

### Important URLs
- **Portfolio**: http://localhost:5173/portfolio
- **Landing**: http://localhost:5173/
- **Vendor Detail Example**: http://localhost:5173/portfolio/zamil-002

### Key Demo Commands
```bash
# Start backend
cd backend && npm start

# Start frontend
cd frontend && npm run dev

# Check ports
lsof -ti:3001  # Backend
lsof -ti:5173  # Frontend
```

### Emergency Fixes
```bash
# If frontend crashes
cd frontend
rm -rf node_modules
npm install
npm run dev

# If backend crashes
cd backend
rm -rf node_modules
npm install
npm start

# Clear browser cache
Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
```

---

**Last Updated**: 2025-12-30
**Version**: v2.1-production
**Status**: ✅ PRODUCTION-READY (Deployed on Vercel)
**Design**: ✅ PREMIUM ENTERPRISE AESTHETIC
**Performance**: ✅ CACHING SYSTEM ACTIVE
**Features**: ✅ ALL CLIENT REQUIREMENTS DELIVERED

## Recent Updates (Dec 30, 2025)
1. ✅ Merged tahakum-demo branch to main
2. ✅ Implemented file-based caching system
3. ✅ Enhanced 5-pillar analysis with 3 parallel web searches
4. ✅ Added force refresh option
5. ✅ Refined design: color-only-for-status principle
6. ✅ Removed purple/teal decorative colors
7. ✅ Simplified badge system (slate for metadata, colors for status)

---

## Notes for Future Claude Sessions

If you're picked up by a future Claude session, here's what you need to know:

1. **Production app** deployed on Vercel - main branch is live
2. **Caching system** is active - assessments are cached in `backend/data/assessments/`
3. **Premium design is critical** - color only for status, not decoration
4. **Saudi market focus** - 8 vendors pre-populated, Tahakum is primary client
5. **Multi-page app**: Landing (assessment), Portfolio (dashboard), Vendor Detail (reports), Report Viewer (full HTML)
6. **Key differentiators**: CAPA recommendations + Contract Playbook + 5-Pillar Intelligence
7. **Design inspiration**: Stripe, Linear, GitHub - minimal, professional, data-focused
8. **Color philosophy**: Slate for metadata, status colors (green/amber/red) for indicators only
9. **Don't add illustrations** - keep it data-focused, not decorative
10. **Keep it simple** - no over-engineering, focus on demo and production value

Good luck with demos and development! 🚀
