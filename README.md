# Spectrum - Vendor Due Diligence Platform

![Demo Status](https://img.shields.io/badge/status-live-green)
![License](https://img.shields.io/badge/license-MIT-green)

> **Production-Ready**: Deployed on Vercel | Customized for enterprise B2B procurement teams

## Overview

**Spectrum** is an AI-powered vendor due diligence platform that delivers comprehensive risk assessments in under 60 seconds. Using multi-agent AI with real-time web search and intelligent caching, Spectrum replaces traditional $10K-$15K manual reports that take 2-4 weeks.

### Key Features

- 🚀 **Real-time Analysis**: Complete risk assessment in under 60 seconds
- 🤖 **AI-Powered**: GPT-4o with 3 parallel web searches across 5 intelligence pillars
- 📊 **Comprehensive Reports**: 8-12 detailed findings across Financial, ESG, Human Rights, Sanctions, and Cybersecurity
- 🎯 **Actionable Insights**: Auto-generated CAPA plans and risk-based contract recommendations
- ⚡ **Smart Caching**: File-based caching with force-refresh option for repeat assessments
- 💼 **Professional UI**: Enterprise B2B design inspired by Stripe, Linear, and Bloomberg
- 📥 **Export Options**: Excel, JSON, and PDF reports with full audit trails

## Tech Stack

### Backend
- **Node.js** with Express
- **OpenAI GPT-4o** with Responses API for AI analysis with real-time web search
- **File-based caching system** for performance optimization
- **Multi-agent architecture**: 3 parallel web searches (Financial, Compliance, Cyber)
- RESTful API with rate limiting, CORS, and input sanitization

### Frontend
- **React 19** with React Router for multi-page navigation
- **Vite** for fast development and optimized builds
- **Tailwind CSS 4** with custom enterprise design system
- **ExcelJS** for professional Excel report exports
- Responsive design with minimal, professional animations

## Project Structure

```
risk_demo/
├── backend/
│   ├── services/
│   │   ├── openai.js          # OpenAI client configuration
│   │   ├── riskAgent.js        # Multi-agent AI workflow (3 parallel searches)
│   │   └── cacheService.js     # File-based caching system
│   ├── routes/
│   │   └── assessment.js       # API endpoints with cache support
│   ├── data/
│   │   └── assessments/        # Cached assessment storage
│   ├── middleware/
│   │   └── rateLimiter.js      # Rate limiting middleware
│   ├── server.js               # Express server
│   ├── package.json
│   └── .env                    # Environment variables
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx      # Main assessment page
│   │   │   ├── VendorPortfolio.jsx  # Portfolio dashboard
│   │   │   ├── VendorDetail.jsx     # Individual vendor reports
│   │   │   └── ReportViewer.jsx     # Full HTML report viewer
│   │   ├── components/
│   │   │   ├── AssessmentForm.jsx
│   │   │   ├── RiskDashboard.jsx
│   │   │   ├── RiskScoreCard.jsx
│   │   │   ├── FivePillars.jsx
│   │   │   ├── FindingsGrid.jsx
│   │   │   ├── CapaRecommendations.jsx   # Auto-generated action plans
│   │   │   ├── ContractPlaybook.jsx      # Risk-based contract clauses
│   │   │   ├── QuickDemoButtons.jsx
│   │   │   ├── LoadingState.jsx
│   │   │   └── Logo.jsx
│   │   ├── data/
│   │   │   └── mockVendors.js        # Sample vendor portfolio data
│   │   ├── utils/
│   │   │   └── excelExport.js        # Excel report generation
│   │   ├── App.jsx                   # Router configuration
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   │   ├── reports/                  # Featured full HTML reports
│   │   └── logo*.svg                 # Brand assets
│   ├── tailwind.config.js
│   ├── package.json
│   └── index.html
├── CLAUDE.md                         # Development guide for Claude sessions
├── README.md                         # This file
└── .gitignore
```

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- OpenAI API key with GPT-4o access
- Tavily API key (optional, for enhanced search)
- Terminal/command line access

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Edit .env and add your OpenAI API key
# OPENAI_API_KEY=your_actual_api_key_here

# Start the backend server
npm start
```

**Note**: Never commit your `.env` file to version control. It contains sensitive API keys.

The backend API will run on `http://localhost:3001`

### 2. Frontend Setup

```bash
# Open a new terminal window
# Navigate to frontend directory
cd frontend

# Install dependencies (if not already installed)
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:5173` (or the next available port)

### 3. Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

## Deployment

Deploy both frontend and backend to cloud platforms. Recommended stack:

- **Frontend**: Vercel (recommended) or Netlify
- **Backend**: Railway (recommended), Render, or Fly.io

### Quick Deployment Guide

#### Option 1: Vercel (Frontend) + Railway (Backend) - Recommended

**Backend (Railway):**

1. **Sign up**: Go to [railway.app](https://railway.app) and sign in with GitHub
2. **Create new project**: Click "New Project" → "Deploy from GitHub repo"
3. **Select repository**: Choose your `risk_demo` repository
4. **Configure service**:
   - Set **Root Directory** to `backend`
   - Railway will auto-detect Node.js
5. **Add environment variables**:
   - `OPENAI_API_KEY` = Your OpenAI API key
   - `PORT` = 3001 (optional, Railway auto-assigns)
   - `NODE_ENV` = production
   - `ALLOWED_ORIGINS` = Your frontend URL (will get this after deploying frontend)
6. **Deploy**: Railway will automatically deploy and provide a URL like `https://your-backend.railway.app`
7. **Copy the backend URL** - You'll need this for the frontend

**Frontend (Vercel):**

1. **Sign up**: Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. **Import project**: Click "Add New Project" → Import your `risk_demo` repository
3. **Configure project**:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. **Add environment variable**:
   - `VITE_API_BASE_URL` = Your Railway backend URL (e.g., `https://your-backend.railway.app/api`)
5. **Deploy**: Click "Deploy" - Vercel will build and deploy your frontend
6. **Update backend CORS**: Go back to Railway and update `ALLOWED_ORIGINS` to include your Vercel URL (e.g., `https://your-frontend.vercel.app`)

**After deployment:**
- Frontend URL: `https://your-app.vercel.app`
- Backend URL: `https://your-backend.railway.app`

#### Option 2: Netlify (Frontend) + Render (Backend)

**Backend (Render):**

1. Go to [render.com](https://render.com) and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `risk-demo-backend`
   - **Root Directory**: `backend`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variables:
   - `OPENAI_API_KEY`
   - `NODE_ENV=production`
   - `ALLOWED_ORIGINS=https://your-frontend.netlify.app`
6. Deploy and copy the URL

**Frontend (Netlify):**

1. Go to [netlify.com](https://netlify.com) and sign up
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
5. Add environment variable:
   - `VITE_API_BASE_URL` = Your Render backend URL + `/api`
6. Deploy

### Environment Variables Summary

**Backend (Railway/Render):**
```env
OPENAI_API_KEY=your_api_key_here
NODE_ENV=production
PORT=3001
ALLOWED_ORIGINS=https://your-frontend.vercel.app,https://your-frontend.vercel.app
OPENAI_MODEL=gpt-4-turbo-preview
```

**Frontend (Vercel/Netlify):**
```env
VITE_API_BASE_URL=https://your-backend.railway.app/api
```

### Deployment Tips

1. **CORS Configuration**: Always update `ALLOWED_ORIGINS` in backend after getting frontend URL
2. **Environment Variables**: Never commit `.env` files - use platform environment variable settings
3. **Node Version**: Both platforms support Node.js 20.19.5 (specified in `.nvmrc`)
4. **Free Tiers**: Both Vercel and Railway offer generous free tiers for demos
5. **Custom Domain**: Both platforms allow custom domains on paid plans

### Testing Deployment

After deployment, test:
1. ✅ Frontend loads without errors
2. ✅ Backend health check: `https://your-backend.railway.app/api/health`
3. ✅ Full assessment flow works end-to-end
4. ✅ CORS is configured correctly (no console errors)

## Usage

### Quick Demo
1. Click any of the pre-configured company buttons (TSMC, Boeing, Apple, etc.)
2. Wait 30-60 seconds for the AI analysis
3. Review the comprehensive risk assessment

### Custom Assessment
1. Enter a company name (required)
2. Optionally select industry and location
3. Click "Analyze Risk"
4. Review results with:
   - Overall risk score (0-100)
   - Risk level badge (Critical/High/Medium/Low)
   - Executive summary
   - Key findings with business impact
   - Detailed breakdown by category

### Export Results
- **Download JSON**: Save complete assessment data
- **Copy to Clipboard**: Quick copy for sharing
- **Analyze Another**: Start a new assessment

## API Endpoints

### POST `/api/assess-risk`
Performs comprehensive risk assessment for a company with intelligent caching.

**Request:**
```json
{
  "companyName": "TSMC",
  "industry": "Technology",
  "location": "Taiwan",
  "forceRefresh": false
}
```

**Parameters:**
- `companyName` (required): Company name to assess
- `industry` (optional): Industry/sector
- `location` (optional): Country/region
- `forceRefresh` (optional): Set `true` to bypass cache and run fresh analysis

**Response:**
```json
{
  "success": true,
  "data": {
    "overallRiskScore": 85,
    "riskLevel": "Low",
    "executiveSummary": "...",
    "assessmentDate": "2025-12-30",
    "findings": [
      {
        "riskIndicator": "Strong Financial Performance",
        "title": "Q4 2024 Revenue Growth",
        "description": "...",
        "evidenceUrl": "https://source.com/article",
        "evidenceTitle": "TSMC Q4 Results",
        "riskLevel": "Positive",
        "category": "Financial Health",
        "pillar": "1-Financial",
        "procurementImplication": "Safe for long-term contracts"
      }
    ]
  },
  "metadata": {
    "processingTime": 2,
    "companyName": "TSMC",
    "industry": "Technology",
    "location": "Taiwan",
    "model": "gpt-4o",
    "timestamp": "2025-12-30T...",
    "cached": true,
    "originalAssessmentDate": "2025-12-30T..."
  }
}
```

### GET `/api/health`
Health check endpoint.

## Risk Assessment Framework: The 5 Pillars of Intelligence

The AI analyzes five critical procurement dimensions using 3 parallel web searches:

### 1. **Financial Health**
   - Viability analysis and going-concern indicators
   - Liquidity assessment (cash flow, working capital, debt)
   - Bankruptcy signals (Altman Z-Score, credit downgrades)
   - Revenue trends and profitability (QoQ, YoY changes)
   - Payment risk: Can they fulfill long-term contracts?

### 2. **ESG & Sustainability**
   - Carbon emissions tracking and reduction commitments
   - CSRD/LkSG alignment (EU supply chain due diligence laws)
   - Environmental compliance violations and fines
   - Sustainability commitments vs. actual performance
   - Greenwashing accusations or ESG controversies

### 3. **Human Rights & Ethics**
   - Modern slavery screening and forced labor indicators
   - UFLPA compliance (Uyghur Forced Labor Prevention Act)
   - Labor practice verification (working conditions, wages, safety)
   - Ethical sourcing and supply chain traceability
   - Child labor, discrimination, or worker exploitation incidents

### 4. **Sanctions & Anti-Bribery**
   - Real-time OFAC/UN/EU sanctions monitoring
   - Corruption risk scoring and bribery cases
   - Enforcement action tracking (SEC, DOJ, international bodies)
   - Export control violations (ITAR, EAR breaches)
   - Politically exposed persons (PEP) and beneficial ownership risks

### 5. **Cybersecurity**
   - Security posture evaluation (SOC2, ISO 27001 certifications)
   - Data breach history and incident response capability
   - Ransomware attacks and hack incidents (specific dates)
   - Threat intelligence and vulnerability disclosures
   - IT infrastructure resilience and business continuity

## Risk Levels

- **Critical** (0-19): Bankruptcy risk, payment defaults, severe liquidity crisis
- **High** (20-49): Credit downgrades, significant losses, major operational issues
- **Medium** (50-69): Margin pressure, increased debt, moderate concerns
- **Low** (70-89): Minor fluctuations, temporary challenges, normal business risks
- **Positive** (90-100): Strong financials, credit upgrades, competitive advantages

## Configuration

### Environment Variables

Backend (`backend/.env`):
```env
OPENAI_API_KEY=your_api_key_here
PORT=3001
NODE_ENV=development
OPENAI_MODEL=gpt-4-turbo-preview
OPENAI_TEMPERATURE=0.3
OPENAI_MAX_TOKENS=3000

# Optional: Production settings
# ALLOWED_ORIGINS=https://your-domain.com
# RATE_LIMIT_WINDOW_MS=900000
# RATE_LIMIT_MAX_REQUESTS=100
```

Frontend (`frontend/.env`):
```env
VITE_API_BASE_URL=http://localhost:3001/api
```

See `.env.example` files in each directory for complete configuration options.

### Tailwind Configuration

Custom risk colors are defined in `frontend/tailwind.config.js`:
- `risk-critical`: #dc2626 (red-600)
- `risk-high`: #ea580c (orange-600)
- `risk-medium`: #eab308 (yellow-500)
- `risk-low`: #3b82f6 (blue-500)
- `risk-positive`: #22c55e (green-500)

## Business Value Proposition

### Traditional Due Diligence
- 💰 $5,000 - $15,000 per report
- ⏱️ 2-4 weeks turnaround
- 📅 Often outdated data
- 👥 Manual research & analysis

### AI-Powered Platform
- 💰 Fraction of the cost
- ⚡ Under 60 seconds
- 🔄 Real-time data
- 🤖 AI-driven insights

## Security Features

✅ **Environment variable validation** - Fails fast if API key is missing
✅ **Rate limiting** - Prevents API abuse (20 assessments/15min per IP)
✅ **Input sanitization** - Protects against injection attacks
✅ **CORS configuration** - Restricts allowed origins in production
✅ **Request timeouts** - Prevents hanging requests (150s timeout)
✅ **Error handling** - No sensitive data in error messages
✅ **Body size limits** - Prevents memory exhaustion (10MB limit)

## Future Roadmap

- [ ] Multi-supplier comparison dashboard
- [ ] Real-time risk monitoring alerts
- [ ] Integration with ERP systems (SAP, Oracle)
- [ ] Historical risk trending & analytics
- [ ] Customizable risk thresholds
- [ ] Team collaboration features
- [ ] Enterprise API for programmatic access
- [ ] PDF report generation
- [ ] Advanced filtering & search
- [ ] Custom risk frameworks
- [ ] User authentication & authorization
- [ ] API key management for end users

## Development

> 📋 **Development Guide**: See [claude.md](./claude.md) for coding standards, branch guidelines, and Tahakum demo requirements.

### Backend Development
```bash
cd backend
npm run dev  # Auto-reload with --watch flag
```

### Frontend Development
```bash
cd frontend
npm run dev  # Hot module replacement with Vite
```

### Build for Production
```bash
# Frontend
cd frontend
npm run build
npm run preview  # Preview production build

# Backend is production-ready as-is
```

### Branch Information
- **main**: Production-ready version with all enterprise features deployed on Vercel

## Demo Companies

### Featured (Full Reports Available)
- **Palantir Technologies** - Data Analytics & AI (USA)
- **Plug Power** - Clean Energy & Hydrogen (USA)

### Quick Demo Companies
- **TSMC** - Semiconductor Manufacturing (Taiwan)
- **Foxconn** - Electronics Manufacturing (Taiwan)
- **Johnson & Johnson** - Pharmaceuticals & Medical Devices (USA)
- **Siemens** - Industrial Manufacturing (Germany)
- **BASF** - Chemicals & Materials (Germany)
- **Caterpillar** - Heavy Equipment Manufacturing (USA)
- **Honeywell** - Industrial Technology (USA)
- **Accenture** - IT Services & Consulting (Ireland)

## Troubleshooting

### Backend won't start
- Check that port 3001 is available
- Verify OpenAI API key is set in `.env`
- Ensure all dependencies are installed: `npm install`

### Frontend shows "Failed to fetch"
- Ensure backend is running on port 3001
- Check browser console for CORS errors
- Verify API URL in `App.jsx` matches backend

### API returns errors
- Check OpenAI API key validity
- Verify you have GPT-4 access
- Monitor rate limits

## Performance

- **Average Assessment Time**: 18-45 seconds
- **API Response Size**: ~3-5 KB (JSON)
- **Frontend Bundle Size**: ~200 KB (production build)
- **Backend Memory Usage**: ~50-100 MB

## License

MIT License - This is a demo/proof-of-concept project.

## Project Documentation

- **[README.md](./README.md)** - This file, complete project documentation
- **[claude.md](./claude.md)** - Development guidelines and Tahakum demo requirements
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Detailed deployment instructions

## Support

For questions or issues:
1. Review this README and project documentation
2. Check browser console for errors
3. Verify backend logs in terminal
4. Ensure all environment variables are set correctly

## Acknowledgments

- OpenAI for GPT-4o API
- Tavily for real-time search capabilities
- Tailwind CSS for styling utilities
- Vite for fast development experience
- React team for excellent documentation

---

**Built for modern vendor due diligence** | **Production-Ready** | **Last Updated**: 2025-12-30
