import express from 'express';
import { assessCompanyRisk } from '../services/riskAgent.js';
import { assessmentLimiter } from '../middleware/rateLimiter.js';
import { getCachedAssessment, saveAssessmentToCache } from '../services/cacheService.js';

const router = express.Router();

/**
 * Sanitize and validate company name input
 */
function sanitizeCompanyName(name) {
  if (!name || typeof name !== 'string') {
    return null;
  }

  // Remove excessive whitespace and special characters that could be malicious
  const sanitized = name
    .trim()
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 200); // Limit length

  // Check if the name is reasonable
  if (sanitized.length < 1) {
    return null;
  }

  return sanitized;
}

/**
 * Sanitize optional string input
 */
function sanitizeOptionalString(value, maxLength = 100) {
  if (!value || typeof value !== 'string') {
    return undefined;
  }

  return value
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[<>]/g, '')
    .substring(0, maxLength) || undefined;
}

/**
 * POST /api/assess-risk
 * Main endpoint for company risk assessment
 *
 * Request body:
 * {
 *   companyName: string (required),
 *   industry: string (optional),
 *   location: string (optional),
 *   forceRefresh: boolean (optional, default: false)
 * }
 *
 * Query parameters:
 * - forceRefresh=true : Bypass cache and run fresh assessment
 */
router.post('/assess-risk', assessmentLimiter, async (req, res) => {
  try {
    const { companyName, industry, location, forceRefresh } = req.body;

    // Sanitize and validate inputs
    const sanitizedName = sanitizeCompanyName(companyName);

    if (!sanitizedName) {
      return res.status(400).json({
        success: false,
        error: 'Valid company name is required (1-200 characters)',
      });
    }

    const sanitizedIndustry = sanitizeOptionalString(industry);
    const sanitizedLocation = sanitizeOptionalString(location);

    console.log(`\n=== New Risk Assessment Request ===`);
    console.log(`Company: ${sanitizedName}`);
    console.log(`Industry: ${sanitizedIndustry || 'Not specified'}`);
    console.log(`Location: ${sanitizedLocation || 'Not specified'}`);
    console.log(`Force Refresh: ${forceRefresh ? 'YES' : 'NO'}`);
    console.log(`IP: ${req.ip}`);
    console.log(`Time: ${new Date().toISOString()}`);

    // Check cache first (unless force refresh is requested)
    if (!forceRefresh) {
      console.log('\nChecking cache...');
      const cachedData = await getCachedAssessment(
        sanitizedName,
        sanitizedIndustry,
        sanitizedLocation
      );

      if (cachedData) {
        console.log('✓ Returning cached assessment (no API calls made)');
        console.log(`   Risk Score: ${cachedData.data.overallRiskScore}/100`);
        console.log(`   Findings: ${cachedData.data.findings.length}\n`);

        // Mark metadata as cached
        const cachedMetadata = {
          ...cachedData.metadata,
          cached: true,
          originalAssessmentDate: cachedData.metadata.assessmentTimestamp
        };

        return res.status(200).json({
          success: true,
          data: cachedData.data,
          metadata: cachedMetadata,
        });
      }
    } else {
      console.log('\n⟳ Force refresh requested - bypassing cache');
    }

    // Execute risk assessment (cache miss or force refresh)
    const assessment = await assessCompanyRisk(
      sanitizedName,
      sanitizedIndustry,
      sanitizedLocation
    );

    // Save to cache for future requests
    await saveAssessmentToCache(
      sanitizedName,
      sanitizedIndustry,
      sanitizedLocation,
      {
        overallRiskScore: assessment.overallRiskScore,
        riskLevel: assessment.riskLevel,
        executiveSummary: assessment.executiveSummary,
        assessmentDate: assessment.assessmentDate,
        findings: assessment.findings,
      },
      assessment.metadata
    );

    // Return successful response
    return res.status(200).json({
      success: true,
      data: {
        overallRiskScore: assessment.overallRiskScore,
        riskLevel: assessment.riskLevel,
        executiveSummary: assessment.executiveSummary,
        assessmentDate: assessment.assessmentDate,
        findings: assessment.findings,
      },
      metadata: {
        ...assessment.metadata,
        cached: false
      },
    });

  } catch (error) {
    console.error('Assessment endpoint error:', error);

    // Handle specific error cases
    if (error.message.includes('API key')) {
      return res.status(500).json({
        success: false,
        error: 'API configuration error. Please contact support.',
      });
    }

    if (error.message.includes('rate limit')) {
      return res.status(429).json({
        success: false,
        error: 'Too many requests. Please try again in a moment.',
      });
    }

    // Generic error response
    return res.status(500).json({
      success: false,
      error: 'Risk assessment failed. Please try again.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

/**
 * POST /api/request-report
 * Capture leads for comprehensive reports
 */
router.post('/request-report', async (req, res) => {
  try {
    const { name, email, company, phone, message, targetCompany, quickScreenScore } = req.body;

    // Validate required fields
    if (!name || !email || !company || !targetCompany) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, company, and target company are required',
      });
    }

    // Log the request
    console.log('\n=== Comprehensive Report Request ===');
    console.log(`From: ${name} (${email})`);
    console.log(`Company: ${company}`);
    console.log(`Phone: ${phone || 'Not provided'}`);
    console.log(`Target: ${targetCompany}`);
    console.log(`Quick Screen Score: ${quickScreenScore || 'N/A'}`);
    console.log(`Message: ${message || 'None'}`);
    console.log(`Time: ${new Date().toISOString()}`);
    console.log('=====================================\n');

    // TODO: Send this to your CRM/Email/Airtable
    // Examples:
    // - Send email notification to your sales team
    // - Save to database
    // - Send to Airtable/Notion/etc
    // - Integrate with HubSpot/Salesforce

    // For now, just return success
    return res.status(200).json({
      success: true,
      message: 'Report request received. We will contact you within 1 hour.',
    });

  } catch (error) {
    console.error('Report request error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to process report request',
    });
  }
});

/**
 * GET /api/health
 * Health check endpoint
 */
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    service: 'supply-chain-risk-api',
    timestamp: new Date().toISOString(),
  });
});

export default router;
