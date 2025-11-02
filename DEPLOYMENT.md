# Deployment Guide

This guide walks you through deploying the Supply Chain Risk Assessment Platform to production for live demos.

## Platform Recommendations

| Component | Recommended | Alternatives |
|-----------|-------------|--------------|
| **Frontend** | Vercel | Netlify, Cloudflare Pages |
| **Backend** | Railway | Render, Fly.io, Heroku |

## Prerequisites

- GitHub account (for connecting repositories)
- OpenAI API key
- 15-20 minutes for setup

---

## Step-by-Step Deployment

### Part 1: Deploy Backend to Railway

Railway is recommended because:
- ✅ Free tier with generous limits
- ✅ Automatic deployments from GitHub
- ✅ Easy environment variable management
- ✅ Built-in HTTPS

**Steps:**

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign in with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Authorize Railway to access your repositories
   - Select your `risk_demo` repository

3. **Configure Backend Service**
   - Railway will auto-detect the project
   - Click "Settings" → "Service Settings"
   - Set **Root Directory** to: `backend`
   - Railway will auto-detect Node.js

4. **Add Environment Variables**
   - Click "Variables" tab
   - Add the following:
     ```
     OPENAI_API_KEY=your_actual_openai_api_key
     NODE_ENV=production
     PORT=3001
     OPENAI_MODEL=gpt-4-turbo-preview
     OPENAI_TEMPERATURE=0.3
     OPENAI_MAX_TOKENS=3000
     ```
   - ⚠️ **Note**: We'll add `ALLOWED_ORIGINS` after deploying the frontend

5. **Deploy**
   - Railway will automatically deploy
   - Wait for deployment to complete (2-3 minutes)
   - Your backend URL will be: `https://your-project-name.railway.app`
   - **Copy this URL** - you'll need it for the frontend

6. **Test Backend**
   - Visit: `https://your-backend-url.railway.app/api/health`
   - Should return: `{"status":"ok","timestamp":"..."}`

---

### Part 2: Deploy Frontend to Vercel

Vercel is recommended because:
- ✅ Free tier with excellent performance
- ✅ Automatic deployments from GitHub
- ✅ Built-in CI/CD
- ✅ Edge network for fast global access

**Steps:**

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub

2. **Import Project**
   - Click "Add New..." → "Project"
   - Import your `risk_demo` repository
   - Click "Import"

3. **Configure Project Settings**
   - **Framework Preset**: Vite (auto-detected)
   - **Root Directory**: Click "Edit" → Set to `frontend`
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `dist` (auto-filled)
   - **Install Command**: `npm install` (auto-filled)

4. **Add Environment Variable**
   - In "Environment Variables" section, add:
     - **Key**: `VITE_API_BASE_URL`
     - **Value**: `https://your-backend-url.railway.app/api`
     - (Replace with your actual Railway backend URL)

5. **Deploy**
   - Click "Deploy"
   - Wait 1-2 minutes for build and deployment
   - Your frontend URL will be: `https://your-app-name.vercel.app`
   - **Copy this URL**

---

### Part 3: Update Backend CORS

Now that you have your frontend URL, update the backend to allow requests from it.

1. **Go back to Railway**
   - Open your backend project
   - Go to "Variables" tab

2. **Add CORS Origin**
   - Add/update: `ALLOWED_ORIGINS`
   - **Value**: `https://your-frontend-url.vercel.app`
   - If you have multiple frontend URLs, separate with commas:
     ```
     https://your-app.vercel.app,https://your-custom-domain.com
     ```

3. **Redeploy** (if needed)
   - Railway should auto-redeploy when you change environment variables
   - Or click "Redeploy" manually

---

## Alternative Platforms

### Backend: Render

1. Go to [render.com](https://render.com)
2. New → Web Service
3. Connect GitHub repo
4. Settings:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variables (same as Railway)
6. Deploy

### Frontend: Netlify

1. Go to [netlify.com](https://netlify.com)
2. Add new site → Import from Git
3. Connect GitHub repo
4. Settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
5. Add environment variable: `VITE_API_BASE_URL`
6. Deploy

---

## Post-Deployment Checklist

- [ ] Backend health check works: `/api/health`
- [ ] Frontend loads without console errors
- [ ] Test a risk assessment (try a demo company)
- [ ] Verify CORS is working (no CORS errors in browser console)
- [ ] Check that API calls reach the backend (check Railway logs)
- [ ] Test on mobile device
- [ ] Share the frontend URL for demos!

---

## Troubleshooting

### Frontend shows "Failed to fetch"
- ✅ Check backend is running (visit backend health endpoint)
- ✅ Verify `VITE_API_BASE_URL` is set correctly
- ✅ Check `ALLOWED_ORIGINS` includes your frontend URL
- ✅ Check browser console for specific CORS errors

### Backend returns 500 errors
- ✅ Check Railway logs for errors
- ✅ Verify `OPENAI_API_KEY` is set correctly
- ✅ Check OpenAI API quota/limits
- ✅ Ensure Node.js version is 20.19.5+ (Railway should auto-detect)

### Build fails
- ✅ Check that `package.json` exists in root directory
- ✅ Verify Node.js version compatibility
- ✅ Check build logs for specific errors

---

## Updating After Deployment

Both platforms support automatic deployments:

- **Vercel**: Automatically deploys on every push to main/master branch
- **Railway**: Automatically deploys on every push to main/master branch

To update:
1. Make changes locally
2. Commit and push to GitHub
3. Platforms will automatically rebuild and redeploy

---

## Custom Domain (Optional)

Both platforms support custom domains:

**Vercel:**
1. Go to Project Settings → Domains
2. Add your domain
3. Follow DNS configuration instructions

**Railway:**
1. Go to Settings → Networking
2. Generate a domain or add custom domain
3. Configure DNS records

---

## Cost Estimate (Free Tier)

- **Vercel**: Free for personal projects, generous bandwidth
- **Railway**: $5/month free credit, usually enough for demos
- **OpenAI API**: Pay-per-use, ~$0.01-0.05 per assessment

**Total**: ~$0-5/month for moderate demo usage

---

## Security Reminders

✅ Never commit `.env` files  
✅ Use environment variables in platform settings  
✅ Keep `OPENAI_API_KEY` secret  
✅ Regularly rotate API keys  
✅ Monitor usage and set up alerts  

---

## Need Help?

1. Check platform documentation:
   - [Railway Docs](https://docs.railway.app)
   - [Vercel Docs](https://vercel.com/docs)

2. Check application logs:
   - Railway: Project → Deployments → View logs
   - Vercel: Project → Deployments → View build logs

3. Test locally first to isolate issues

---

**Ready to deploy?** Start with Part 1 above! 🚀

