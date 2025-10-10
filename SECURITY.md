# Security Guidelines

## 🔐 Security Improvements Implemented

This document outlines the security measures implemented in the Supply Chain Risk Assessment Platform.

### Environment Variables & API Key Security

**Critical**: Your OpenAI API key must be kept secure:

1. **Never commit `.env` files to version control**
   - The `.gitignore` already excludes `.env` files
   - Use `.env.example` as a template

2. **API Key Validation**
   - Backend validates API key format on startup
   - Fails fast with helpful error messages if key is missing or invalid

3. **Environment Variable Structure**
   ```
   backend/.env         # Your actual secrets (never commit)
   backend/.env.example # Template for others (safe to commit)
   frontend/.env        # Frontend configuration (safe to commit - no secrets)
   frontend/.env.example # Template (safe to commit)
   ```

### Rate Limiting

Protection against API abuse and DDoS attacks:

- **General API Endpoints**: 100 requests per 15 minutes per IP
- **Risk Assessment Endpoint**: 20 requests per 15 minutes per IP
- Configurable via environment variables

### Input Sanitization

All user inputs are sanitized to prevent injection attacks:

- Company names limited to 200 characters
- Industry/location limited to 100 characters
- HTML tags stripped
- Multiple spaces normalized
- Special characters filtered

### CORS (Cross-Origin Resource Sharing)

- Configured to only allow requests from authorized origins
- Default: localhost development ports
- Production: Configure via `ALLOWED_ORIGINS` environment variable

### Request Timeouts

- Backend: 120-second timeout on OpenAI API calls
- Frontend: 150-second timeout on HTTP requests
- Prevents hanging requests and resource exhaustion

### Error Handling

- Detailed errors in development mode
- Generic error messages in production (no sensitive data leaked)
- All errors logged server-side for debugging
- IP addresses logged for audit trail

### Body Size Limits

- JSON/URL-encoded request bodies limited to 10MB
- Prevents memory exhaustion attacks

## 🚨 Security Checklist for Production

Before deploying to production:

- [ ] **Rotate API Keys**: Generate new OpenAI API key
- [ ] **Set NODE_ENV=production** in backend `.env`
- [ ] **Configure ALLOWED_ORIGINS** to only include your production domains
- [ ] **Enable HTTPS** (never use HTTP in production)
- [ ] **Set up monitoring** for rate limit violations
- [ ] **Review and adjust rate limits** based on expected usage
- [ ] **Enable firewall rules** on your hosting provider
- [ ] **Set up logging aggregation** (e.g., CloudWatch, Datadog)
- [ ] **Regular dependency updates** (`npm audit` and `npm update`)
- [ ] **Backup environment variables** securely (use secrets manager)

## 🔒 Best Practices

### For Development

1. **Never share your `.env` file**
2. **Use different API keys for dev/staging/prod**
3. **Regularly rotate API keys** (every 90 days recommended)
4. **Monitor OpenAI API usage** for unusual patterns

### For Production

1. **Use environment variable secrets managers**:
   - AWS Secrets Manager
   - Azure Key Vault
   - Google Cloud Secret Manager
   - HashiCorp Vault

2. **Enable request logging and monitoring**:
   - Log all API requests with timestamps
   - Monitor for rate limit hits
   - Alert on unusual patterns

3. **Implement additional security layers**:
   - Web Application Firewall (WAF)
   - DDoS protection (Cloudflare, AWS Shield)
   - API authentication (JWT tokens, API keys for users)
   - User authentication for frontend

4. **Regular security audits**:
   - Run `npm audit` weekly
   - Update dependencies monthly
   - Review security logs weekly
   - Penetration testing before launch

## 📋 Environment Variables Reference

### Backend (`backend/.env`)

```bash
# Required
OPENAI_API_KEY=sk-...             # Your OpenAI API key

# Optional
PORT=3001                          # Server port (default: 3001)
NODE_ENV=development               # Environment (development/production)
OPENAI_MODEL=gpt-4-turbo-preview  # AI model to use
OPENAI_TEMPERATURE=0.3             # Model temperature
OPENAI_MAX_TOKENS=3000             # Max tokens per request
ALLOWED_ORIGINS=http://localhost:5173  # Comma-separated allowed origins
RATE_LIMIT_WINDOW_MS=900000        # Rate limit window (15 min default)
RATE_LIMIT_MAX_REQUESTS=100        # Max requests per window
```

### Frontend (`frontend/.env`)

```bash
# Required
VITE_API_BASE_URL=http://localhost:3001/api  # Backend API URL
```

## 🆘 Security Incident Response

If you suspect a security breach:

1. **Immediately rotate all API keys**
2. **Check OpenAI dashboard** for unauthorized usage
3. **Review server logs** for suspicious activity
4. **Change all environment variables**
5. **Notify your team**
6. **Document the incident**

## 📞 Contact

For security concerns or to report vulnerabilities, please contact your security team immediately.

---

**Last Updated**: October 2025
**Security Review**: Recommended quarterly
