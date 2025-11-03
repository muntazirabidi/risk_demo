import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import assessmentRoutes from './routes/assessment.js';
import { apiLimiter } from './middleware/rateLimiter.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Trust proxy - required for Railway/production deployments
app.set('trust proxy', 1);

// CORS Configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    // Allow all vercel.app domains and localhost
    const allowedPatterns = [
      /\.vercel\.app$/,
      /^http:\/\/localhost:\d+$/
    ];

    // Also allow specific origins from env var
    const allowedOrigins = process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
      : [];

    // Check if origin matches any pattern or is in allowed list
    const isAllowed = allowedPatterns.some(pattern => pattern.test(origin)) ||
                     allowedOrigins.includes(origin);

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions)); // Enable CORS with configuration
app.use(express.json({ limit: '10mb' })); // Parse JSON request bodies with size limit
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Parse URL-encoded bodies

// Apply rate limiting to all API routes
app.use('/api', apiLimiter);

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

// API Routes
app.use('/api', assessmentRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Supply Chain Risk Assessment API',
    version: '1.0.0',
    endpoints: {
      health: 'GET /api/health',
      assessRisk: 'POST /api/assess-risk',
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.path,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Start server - bind to 0.0.0.0 for Railway/cloud hosting
const HOST = '0.0.0.0';
app.listen(PORT, HOST, () => {
  console.log('\n===========================================');
  console.log('Supply Chain Risk Assessment API');
  console.log('===========================================');
  console.log(`Server running on: http://${HOST}:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Model: ${process.env.OPENAI_MODEL || 'gpt-4-turbo-preview'}`);
  console.log('===========================================\n');
});

export default app;
