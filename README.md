# Supply Chain Vendor Risk Assessment Platform

![Demo Status](https://img.shields.io/badge/status-demo-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Overview

An AI-powered supply chain vendor risk assessment platform that delivers comprehensive financial due diligence in under 60 seconds. This proof-of-concept demonstrates how AI agents can replace traditional $5K-$15K manual reports that take 2-4 weeks.

### Key Features

- 🚀 **Real-time Analysis**: Complete risk assessment in under 60 seconds
- 🤖 **AI-Powered**: GPT-4 analyzes credit ratings, financial performance, and operational risks
- 📊 **Comprehensive Reports**: 6-10 detailed findings across multiple risk categories
- 🎯 **Actionable Insights**: Color-coded risk levels with business impact analysis
- 💼 **Professional UI**: Modern B2B SaaS interface with responsive design
- 📥 **Export Options**: Download results as JSON or copy to clipboard

## Tech Stack

### Backend
- **Node.js** with Express
- **OpenAI API** (GPT-4 Turbo) for AI analysis
- **Real-time web search** integration
- RESTful API with CORS support

### Frontend
- **React 18** with modern hooks
- **Vite** for blazing-fast development
- **Tailwind CSS** for professional styling
- Smooth animations and loading states

## Project Structure

```
supply-chain-risk-demo/
├── backend/
│   ├── services/
│   │   ├── openai.js          # OpenAI client configuration
│   │   ├── search.js           # Web search utilities
│   │   └── riskAgent.js        # Main AI agent workflow
│   ├── routes/
│   │   └── assessment.js       # API endpoints
│   ├── server.js               # Express server
│   ├── package.json
│   └── .env                    # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AssessmentForm.jsx
│   │   │   ├── QuickDemoButtons.jsx
│   │   │   ├── LoadingState.jsx
│   │   │   ├── RiskScoreCard.jsx
│   │   │   ├── FindingsGrid.jsx
│   │   │   ├── DetailedBreakdown.jsx
│   │   │   └── RiskDashboard.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── tailwind.config.js
│   ├── package.json
│   └── index.html
├── .gitignore
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- OpenAI API key with GPT-4 access
- Terminal/command line access

### 🔐 Security Notice

**IMPORTANT**: Before running the application, review `SECURITY.md` for critical security information.

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

> 📖 **Detailed Guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete step-by-step instructions.

Deploy both frontend and backend to cloud platforms for live demos. Recommended stack:

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
Performs comprehensive risk assessment for a company.

**Request:**
```json
{
  "companyName": "TSMC",
  "industry": "Technology",
  "location": "Taiwan"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "overallRiskScore": 85,
    "riskLevel": "Low",
    "executiveSummary": "...",
    "assessmentDate": "2025-10-05",
    "findings": [...]
  },
  "metadata": {
    "processingTime": 45,
    "companyName": "TSMC",
    "industry": "Technology",
    "location": "Taiwan",
    "model": "gpt-4-turbo-preview",
    "timestamp": "2025-10-05T..."
  }
}
```

### GET `/api/health`
Health check endpoint.

## Risk Assessment Framework

The AI analyzes six key dimensions:

1. **Credit & Financial Stability**
   - Credit ratings
   - Debt levels
   - Liquidity

2. **Operational Performance**
   - Revenue trends
   - Profit margins
   - Cash flow

3. **Market Position**
   - Competitive standing
   - Market share
   - Customer concentration

4. **Payment Risk**
   - Working capital
   - Payment history
   - Financial distress signals

5. **Business Continuity**
   - Operational disruptions
   - Legal issues
   - Management changes

6. **Strategic Risks**
   - M&A activity
   - Restructuring
   - Geographic/political exposure

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
✅ **Rate limiting** - Prevents API abuse (100 req/15min general, 20 req/15min assessments)
✅ **Input sanitization** - Protects against injection attacks
✅ **CORS configuration** - Restricts allowed origins
✅ **Request timeouts** - Prevents hanging requests
✅ **Error handling** - No sensitive data in error messages
✅ **Body size limits** - Prevents memory exhaustion

See `SECURITY.md` for complete security documentation.

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

## Demo Companies

The platform includes quick demo buttons for:
- TSMC (Technology, Taiwan)
- Boeing (Aerospace, USA)
- Apple (Technology, USA)
- Toyota (Automotive, Japan)
- Pfizer (Pharmaceuticals, USA)
- ExxonMobil (Energy, USA)
- Tesla (Automotive, USA)
- Microsoft (Technology, USA)
- Walmart (Retail, USA)
- JP Morgan Chase (Financial Services, USA)

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

## Support

For questions or issues, please review:
1. This README
2. Check browser console for errors
3. Verify backend logs in terminal

## Acknowledgments

- OpenAI for GPT-4 API
- Tailwind CSS for styling utilities
- Vite for blazing-fast development
- React team for excellent documentation

---

**Built with ❤️ for modern supply chain management**
