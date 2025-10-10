# Quick Start Guide

## 🎉 Your Supply Chain Risk Assessment Platform is Ready!

Both servers are currently running:
- **Backend API**: http://localhost:3001
- **Frontend App**: http://localhost:5173

## 🚀 Access the Application

Open your browser and go to:
```
http://localhost:5173
```

## 🎯 Try It Out

### Option 1: Quick Demo (Fastest)
Click any of the demo company buttons:
- TSMC
- Boeing
- Apple
- Tesla
- Microsoft
... and more!

### Option 2: Custom Company
1. Enter any company name in the form
2. Optionally select industry and location
3. Click "Analyze Risk"
4. Wait 30-60 seconds for results

## 📊 What You'll See

After analysis completes, you'll get:

1. **Risk Score Card**
   - Overall score (0-100)
   - Risk level (Critical/High/Medium/Low)
   - Executive summary

2. **Key Findings Grid**
   - Top 5 most important findings
   - Color-coded risk levels
   - Business impact indicators

3. **Detailed Breakdown**
   - All findings organized by category
   - Expandable accordion view
   - Source links where available

4. **Export Options**
   - Download JSON
   - Copy to clipboard
   - Start new assessment

## 🛠️ Managing the Servers

### If You Need to Stop Them

**Stop Backend:**
```bash
ps aux | grep "node.*server.js" | grep -v grep | awk '{print $2}' | xargs kill
```

**Stop Frontend:**
```bash
ps aux | grep vite | grep -v grep | awk '{print $2}' | xargs kill
```

### Restart Servers

**Backend:**
```bash
cd /Users/muntazirabidi/Documents/Test/backend
npm start
```

**Frontend:**
```bash
cd /Users/muntazirabidi/Documents/Test/frontend
npm run dev
```

## 📝 Test the API Directly

You can also test the backend API directly:

```bash
curl -X POST http://localhost:3001/api/assess-risk \
  -H "Content-Type: application/json" \
  -d '{"companyName": "Apple", "industry": "Technology", "location": "United States"}'
```

## 🎨 Features Included

✅ Real-time risk assessment (30-60 seconds)  
✅ AI-powered analysis with GPT-4  
✅ Professional, modern UI with Tailwind CSS  
✅ Smooth animations and loading states  
✅ Responsive design (mobile-friendly)  
✅ Export to JSON  
✅ Quick demo companies  
✅ Comprehensive error handling  
✅ Source attribution for findings  
✅ Business value comparison section  

## 💡 Demo Tips

1. **For Investors**: Show the 60-second turnaround vs. traditional 2-4 weeks
2. **Highlight**: Real-time data vs. outdated manual reports
3. **Emphasize**: $5K-$15K cost savings per assessment
4. **Show**: Professional, enterprise-ready UI
5. **Demonstrate**: Different risk levels with various companies

## 📚 Full Documentation

See `README.md` for:
- Complete setup instructions
- API documentation
- Technical architecture
- Configuration options
- Troubleshooting guide
- Future roadmap

## 🎭 Demo Script Example

> "Let me show you how our AI platform replaces weeks of manual due diligence. 
> I'll assess TSMC, a major semiconductor supplier..."
> 
> *[Click TSMC button]*
> 
> "Watch as our AI agent searches financial databases, analyzes credit ratings, 
> evaluates market position, and generates a comprehensive report..."
> 
> *[Wait ~30-45 seconds]*
> 
> "And there we have it! A complete 360° risk assessment with:
> - Overall risk score
> - Executive summary
> - 7 detailed findings across all risk categories
> - Source attribution
> - Business impact analysis
> 
> This took 45 seconds. Traditional consultants would charge $10,000 
> and deliver this in 2-3 weeks with outdated data."

## 🆘 Quick Troubleshooting

**Frontend shows "Failed to fetch"**
- Check backend is running: `curl http://localhost:3001/api/health`
- If not, restart backend (see commands above)

**Slow responses**
- Normal! First request may take longer as AI warms up
- Typical response time: 18-45 seconds

**Port already in use**
- Frontend will auto-select next available port (5174, 5175, etc.)
- Check terminal output for actual port number

---

**Ready to impress investors! 🚀**
