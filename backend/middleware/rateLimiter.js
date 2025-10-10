import rateLimit from 'express-rate-limit';

/**
 * Rate limiter for API endpoints
 * Prevents abuse and protects against DDoS attacks
 */
export const apiLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes default
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // 100 requests per window
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false,
});

/**
 * Stricter rate limiter for expensive operations (AI assessments)
 */
export const assessmentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // 20 assessments per 15 minutes
  message: {
    success: false,
    error: 'Too many assessment requests. Please wait a few minutes before trying again.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  // Skip successful requests that happen quickly (potential cache hits in future)
  skipSuccessfulRequests: false,
});

export default { apiLimiter, assessmentLimiter };
