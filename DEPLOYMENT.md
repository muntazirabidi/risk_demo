# Spectrum - Deployment Guide

## Quick Deploy Options (FREE)

### Option 1: Railway (Easiest - One Platform)

1. Go to https://railway.app and sign up
2. Click "New Project" → "Empty Project"
3. Create two services:

#### Backend Service:
- Click "New" → "Empty Service"
- In the service, click "Settings" → "Source"
- Upload your `backend` folder
- Add Environment Variables:
  - `OPENAI_API_KEY` = your_openai_api_key
  - `PORT` = 3001
  - `OPENAI_MODEL` = gpt-4o
  - `OPENAI_TEMPERATURE` = 0.3
  - `OPENAI_MAX_TOKENS` = 4000
  - `NODE_ENV` = production
- Railway will auto-deploy and give you a URL like `https://your-backend.railway.app`

#### Frontend Service:
- Click "New" → "Empty Service"
- Upload your `frontend` folder
- Add Environment Variable:
  - `VITE_API_URL` = https://your-backend.railway.app (use the backend URL from above)
- Railway will build and deploy

### Option 2: Vercel (Frontend) + Render (Backend)

#### Deploy Backend to Render:
1. Go to https://render.com and sign up
2. Click "New +" → "Web Service"
3. Choose "Deploy from Git" or upload `backend` folder
4. Settings:
   - **Name**: spectrum-backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free
5. Add Environment Variables (same as above)
6. Click "Create Web Service"
7. Copy the URL (e.g., `https://spectrum-backend.onrender.com`)

#### Deploy Frontend to Vercel:
1. Go to https://vercel.com and sign up
2. Click "Add New" → "Project"
3. Import your `frontend` folder
4. Framework Preset: Vite
5. Environment Variables:
   - `VITE_API_URL` = https://spectrum-backend.onrender.com (your Render backend URL)
6. Click "Deploy"
7. Get your URL (e.g., `https://spectrum.vercel.app`)

## Update Frontend API URL

After deploying backend, update the frontend to point to your backend URL:

Create `frontend/.env.production`:
```
VITE_API_URL=https://your-backend-url.com
```

## Post-Deployment Steps

1. Test the deployment by visiting your frontend URL
2. Try running a risk assessment
3. Check that URLs are working in the results

## Custom Domain (Optional - Can do later)

Both Railway and Vercel support custom domains for free:
- Railway: Settings → Networking → Custom Domain
- Vercel: Project Settings → Domains → Add Domain

## Important Notes

- **Free Tier Limits**:
  - Railway: 500 hours/month, $5 credit
  - Render: Services sleep after 15 min inactivity (first request wakes it up ~30 sec)
  - Vercel: Unlimited bandwidth, 100 GB bandwidth/month

- **Security**: Make sure `.env` file is in `.gitignore` (already set up)
- **Monitoring**: Both platforms provide logs in the dashboard

## Troubleshooting

If frontend can't connect to backend:
1. Check CORS is enabled in backend (already configured)
2. Verify VITE_API_URL in frontend env variables
3. Check backend logs for errors
4. Ensure OpenAI API key is set correctly

## Next Steps

1. Deploy backend first
2. Get backend URL
3. Deploy frontend with backend URL
4. Test everything works
5. Share the frontend URL with clients/investors!
