# How to Run Your Application

## ✅ Current Status: RUNNING!

Your application is already running right now:
- **Backend**: http://localhost:3001 ✅
- **Frontend**: http://localhost:5174 ✅

## 🚀 To Access Your App

Just open your browser and go to:
```
http://localhost:5174
```

That's it! Click any company button or enter a company name to see the risk assessment in action.

---

## 🔄 If You Need to Restart

### Quick Start (Both Servers)

**Option 1: Open 2 Terminal Windows**

Terminal 1 (Backend):
```bash
cd /Users/muntazirabidi/Documents/Test/backend
npm start
```

Terminal 2 (Frontend):
```bash
cd /Users/muntazirabidi/Documents/Test/frontend
npm run dev
```

**Option 2: Use Background Processes**

```bash
# Start backend in background
cd /Users/muntazirabidi/Documents/Test/backend && npm start &

# Start frontend (will show output)
cd /Users/muntazirabidi/Documents/Test/frontend && npm run dev
```

---

## 🛑 To Stop the Servers

### If running in terminal windows:
Press `Ctrl + C` in each terminal

### If running in background:
```bash
# Stop backend
lsof -ti:3001 | xargs kill -9

# Stop frontend
lsof -ti:5174 | xargs kill -9
```

---

## 📋 Quick Commands

### Check if servers are running:
```bash
# Check backend
curl http://localhost:3001/api/health

# Check frontend
curl -I http://localhost:5174
```

### View backend logs (if running in background):
```bash
ps aux | grep "node.*server.js"
```

---

## 🎯 For Your Demo

### Before the demo:
1. Make sure both servers are running (they are now!)
2. Open http://localhost:5174 in your browser
3. Have the page loaded and ready

### During the demo:
1. Click a quick demo button (TSMC, Apple, etc.)
2. Wait 30-60 seconds for the assessment
3. Show the comprehensive results
4. Highlight the export options

### If something goes wrong:
- **"Failed to fetch"**: Backend is down, restart it
- **Blank page**: Clear browser cache and refresh
- **Slow response**: Normal for first request, be patient

---

## 💡 Pro Tips

1. **First assessment is slower** (30-60 seconds) - this is normal
2. **Keep terminal windows visible** during demo - shows live logs
3. **Use well-known companies** for fastest results
4. **Have a backup company** in mind in case one fails

---

## 📁 Project Structure

```
/Users/muntazirabidi/Documents/Test/
├── backend/          # Node.js API server
│   ├── .env         # Your OpenAI API key (keep secret!)
│   ├── server.js    # Main server file
│   └── ...
├── frontend/        # React frontend
│   ├── src/         # React components
│   └── ...
├── README.md        # Full documentation
├── SECURITY.md      # Security guidelines
├── DEMO_READY.md    # Demo script
└── HOW_TO_RUN.md    # This file
```

---

## 🆘 Troubleshooting

### Port already in use
```bash
# Backend port 3001
lsof -ti:3001 | xargs kill -9

# Frontend port 5174
lsof -ti:5174 | xargs kill -9
```

### Backend won't start
- Check `.env` file exists in `backend/` directory
- Verify OpenAI API key is set
- Run: `cd backend && npm install`

### Frontend shows errors
- Clear browser cache
- Run: `cd frontend && npm install`
- Restart the dev server

---

## ✅ Everything is Working When:

1. Backend health check returns `"status": "healthy"`
2. Frontend loads at http://localhost:5174
3. You can click a company button and see loading animation
4. Assessment completes in 30-60 seconds
5. Results display with risk score and findings

---

**Your app is READY! 🎊**

Open http://localhost:5174 and start exploring!
