import openai, { MODEL_CONFIG } from './openai.js';

/**
 * System prompt for the Vendor Due Diligence AI agent
 * Defines the analysis framework and output format for procurement decisions
 */
function getSystemPrompt(companyName, industry, location) {
  return `You are an expert Vendor Due Diligence Analyst helping procurement teams evaluate potential and existing suppliers.

VENDOR UNDER ASSESSMENT: ${companyName}
Industry: ${industry || 'Not specified'}
Location: ${location || 'Not specified'}

MISSION: Conduct comprehensive vendor due diligence to help procurement leaders make informed decisions about supplier relationships, contract terms, and risk mitigation strategies.

VENDOR DUE DILIGENCE FRAMEWORK:
Evaluate these critical procurement dimensions:

1. FINANCIAL STABILITY & CREDITWORTHINESS
   - Altman Z-Score indicators (bankruptcy probability)
   - Credit ratings (D&B, S&P, Moody's)
   - Cash position and liquidity ratios
   - Revenue trends and profitability
   - Debt levels and leverage

2. OPERATIONAL RELIABILITY
   - Production capacity and utilization
   - Quality certifications (ISO, SOC2, etc.)
   - Historical delivery performance
   - Workforce stability (layoffs, strikes)
   - Technology and infrastructure investments

3. SUPPLY CHAIN RESILIENCE
   - Geographic concentration risks
   - Single-source dependencies
   - Tier-2/Tier-3 supplier exposure
   - Inventory management practices
   - Business continuity planning

4. LEGAL & COMPLIANCE
   - Regulatory compliance status
   - Active litigation and disputes
   - Sanctions and watchlist screening
   - Environmental and labor practices
   - Data security certifications

5. MARKET POSITION & COMPETITIVE STANDING
   - Market share and competitive moat
   - Customer concentration risks
   - Innovation and R&D investment
   - Industry reputation and references
   - Pricing power and stability

6. STRATEGIC ALIGNMENT
   - M&A activity and ownership changes
   - Management stability
   - Long-term viability outlook
   - ESG and sustainability practices
   - Partnership and collaboration track record

VENDOR VIABILITY SCORE (0-100):
- 90-100: APPROVED - Preferred Vendor (Excellent stability, recommend multi-year contracts)
- 70-89: APPROVED - Standard Terms (Good stability, standard contract terms appropriate)
- 50-69: CONDITIONAL - Enhanced Monitoring (Some concerns, require protective clauses)
- 30-49: CAUTION - Risk Mitigation Required (Significant risks, dual-sourcing recommended)
- 0-29: NOT RECOMMENDED - High Risk (Severe concerns, seek alternative suppliers)

OUTPUT FORMAT:
Return a valid JSON object with this exact structure:

{
  "overallRiskScore": <number 0-100, where 100=excellent vendor, 0=critical risk>,
  "riskLevel": "<Critical|High|Medium|Low>",
  "vendorApprovalStatus": "<APPROVED - Preferred|APPROVED - Standard|CONDITIONAL|CAUTION|NOT RECOMMENDED>",
  "executiveSummary": "<2-3 sentences summarizing vendor viability for procurement decisions>",
  "procurementRecommendation": "<Specific actionable recommendation for procurement team: contract terms, dual-sourcing needs, monitoring requirements>",
  "assessmentDate": "<YYYY-MM-DD>",
  "keyMetrics": {
    "estimatedAltmanZScore": "<Safe Zone (>2.99)|Grey Zone (1.81-2.99)|Distress Zone (<1.81)>",
    "paymentRiskLevel": "<Low|Medium|High>",
    "supplyDisruptionRisk": "<Low|Medium|High>",
    "recommendedContractTerms": "<Multi-year OK|Annual Review|Enhanced Protections|Dual-Source Required>"
  },
  "findings": [
    {
      "riskIndicator": "<Short name of the risk or strength>",
      "title": "<Headline summarizing the finding>",
      "description": "<2-3 sentences with QUANTIFIED impact: Include specific numbers, percentages, dollar amounts, timeframes. Example: 'Revenue declined 15% ($2.3B to $1.96B) in Q3 2024'>",
      "evidenceUrl": "<REQUIRED: Direct URL to the source article/report. NEVER use 'Multiple sources' - provide the primary source URL>",
      "evidenceTitle": "<Title of the source article/report>",
      "assessmentDate": "<YYYY-MM-DD>",
      "riskLevel": "<Critical|High|Medium|Low|Positive>",
      "quantifiedImpact": "<Specific number/percentage of financial impact. Examples: '-$2.3B revenue', '+15% debt', '-25% stock price', '$500M loss'>",
      "financialImpact": "<Supply Disruption Risk|Payment Default Risk|Price Volatility Risk|Contract Breach Risk|Delivery Delay Risk|Stable Partnership|Competitive Advantage>",
      "category": "<Financial Stability|Operational Reliability|Supply Chain|Legal & Compliance|Market Position|Strategic>",
      "procurementImplication": "<Direct impact on procurement: e.g., 'May require payment in advance', 'Dual-sourcing recommended', 'Safe for long-term contracts'>"
    }
  ]
}

CRITICAL REQUIREMENTS FOR VENDOR DUE DILIGENCE:
- Return ONLY valid JSON, no markdown code blocks or explanations
- Include 6-10 findings covering different vendor risk dimensions
- MANDATORY: Every finding MUST have a real, working evidenceUrl (direct link to source)
- MANDATORY: Include evidenceTitle (title of the source article)
- MANDATORY: Quantify ALL impacts with specific numbers (revenue $, %, timeframes)
- MANDATORY: Include procurementImplication for each finding (actionable for buyers)
- Focus on information relevant to PROCUREMENT DECISIONS
- Prioritize recent information (2024-2025)
- Be specific: "Revenue fell 23% ($4.2B to $3.2B)" NOT "Revenue declined significantly"
- Include dates for all events: "Q3 2024", "January 2025", "FY 2024"
- Think like a procurement leader: What would I need to know before signing a contract?`;
}

/**
 * Stage 1: Research Phase - Use Responses API with Real Web Search
 */
async function gatherCompanyInformation(companyName, industry, location) {
  console.log('Stage 1: Using OpenAI Responses API with real web search...');

  const searchQuery = `Search the web for current financial information about ${companyName} (${industry || 'unspecified industry'}, ${location || 'unspecified location'}):

1. Latest quarterly earnings (2024-2025) - revenue, profit, specific numbers
2. Credit ratings from S&P, Moody's, or Fitch
3. Major business developments: layoffs, acquisitions, restructuring
4. Stock performance and analyst ratings
5. Financial health indicators: debt levels, cash flow

For each finding, provide:
- Specific numbers, percentages, and dates
- The source publication name
- The exact URL where you found this information
- Publication date

Use web search to find recent, credible sources with real URLs.`;

  try {
    // Use Responses API with web search tool
    const response = await openai.responses.create({
      model: 'gpt-4o',
      input: searchQuery,
      tools: [{ type: 'web_search_preview' }],
    });

    const researchData = response.output_text || response.content || '';
    console.log(`✓ Web search completed: ${researchData.length} characters\n`);

    return researchData;
  } catch (error) {
    console.error('Responses API web search error:', error.message);
    console.log('Error details:', error);
    throw new Error(`Web search failed: ${error.message}`);
  }
}

/**
 * Stage 2: Analysis Phase - Create structured risk assessment from research
 */
async function analyzeRiskFromResearch(companyName, industry, location, researchData) {
  console.log('Stage 2: Analyzing risk and creating structured JSON...');

  const analysisPrompt = `Based ONLY on the research data below, create a comprehensive financial risk assessment for ${companyName}.

===== RESEARCH DATA =====
${researchData}
===== END RESEARCH DATA =====

${getSystemPrompt(companyName, industry, location)}

CRITICAL INSTRUCTIONS:
- Extract ONLY information present in the research data above
- For each finding, use the ACTUAL URL provided in the research data
- Copy exact numbers, percentages, and dates from the research
- The evidenceUrl field MUST contain a real URL from the research data
- The evidenceTitle should match the source name from the research data
- If the research provides a URL, use it exactly as provided
- Return ONLY valid JSON (no markdown, no code blocks, no explanations)`;

  const apiParams = {
    model: MODEL_CONFIG.model,
    messages: [
      {
        role: 'system',
        content: 'You are a risk analyst creating a structured JSON risk assessment from research data. Extract URLs and data exactly as provided.',
      },
      {
        role: 'user',
        content: analysisPrompt,
      },
    ],
    response_format: { type: 'json_object' },
  };

  // GPT-5 uses max_completion_tokens, GPT-4o uses max_tokens
  if (MODEL_CONFIG.model.includes('gpt-5')) {
    apiParams.max_completion_tokens = MODEL_CONFIG.max_tokens;
  } else {
    apiParams.max_tokens = MODEL_CONFIG.max_tokens;
    apiParams.temperature = 0.3; // Lower for structured output
  }

  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Analysis timeout - took too long')), 90000)
  );

  const completionPromise = openai.chat.completions.create(apiParams);
  const completion = await Promise.race([completionPromise, timeout]);

  return completion.choices[0].message.content;
}

/**
 * Main risk assessment agent workflow - Two-stage process
 * Stage 1: Research and gather information with sources and URLs
 * Stage 2: Analyze and structure into risk assessment JSON
 *
 * @param {string} companyName - Name of the company to assess
 * @param {string} industry - Industry sector (optional)
 * @param {string} location - Geographic location (optional)
 * @returns {Promise<Object>} Risk assessment results
 */
export async function assessCompanyRisk(companyName, industry, location) {
  const startTime = Date.now();

  try {
    console.log(`\n========================================`);
    console.log(`Starting Two-Stage Risk Assessment`);
    console.log(`Company: ${companyName}`);
    console.log(`Model: ${MODEL_CONFIG.model}`);
    console.log(`========================================\n`);

    // Stage 1: Research Phase - Gather information with sources
    const researchData = await gatherCompanyInformation(companyName, industry, location);
    console.log(`✓ Research completed (${researchData.length} characters)\n`);

    // Stage 2: Analysis Phase - Structure into JSON risk assessment
    const analysisJson = await analyzeRiskFromResearch(companyName, industry, location, researchData);
    console.log('✓ Analysis completed, parsing JSON...\n');

    // Parse and validate the JSON response
    let riskAssessment;
    try {
      riskAssessment = JSON.parse(analysisJson);
    } catch (parseError) {
      console.error('Failed to parse JSON response:', parseError);
      console.error('Raw response:', analysisJson.substring(0, 500));
      throw new Error('Invalid JSON response from AI agent');
    }

    // Validate required fields
    if (!riskAssessment.overallRiskScore || !riskAssessment.riskLevel || !riskAssessment.findings) {
      console.error('Validation failed. Assessment data:', JSON.stringify(riskAssessment, null, 2));
      throw new Error(`Incomplete risk assessment data. Missing: ${!riskAssessment.overallRiskScore ? 'overallRiskScore ' : ''}${!riskAssessment.riskLevel ? 'riskLevel ' : ''}${!riskAssessment.findings ? 'findings' : ''}`);
    }

    if (!Array.isArray(riskAssessment.findings) || riskAssessment.findings.length === 0) {
      console.error('Invalid findings array:', riskAssessment.findings);
      throw new Error('No findings in risk assessment');
    }

    const processingTime = Math.round((Date.now() - startTime) / 1000);
    console.log(`========================================`);
    console.log(`✓ Assessment completed in ${processingTime} seconds`);
    console.log(`  Findings: ${riskAssessment.findings.length}`);
    console.log(`  Risk Level: ${riskAssessment.riskLevel}`);
    console.log(`  Risk Score: ${riskAssessment.overallRiskScore}/100`);
    console.log(`========================================\n`);

    return {
      ...riskAssessment,
      metadata: {
        processingTime,
        companyName,
        industry: industry || 'Not specified',
        location: location || 'Not specified',
        model: MODEL_CONFIG.model,
        timestamp: new Date().toISOString(),
      },
    };

  } catch (error) {
    console.error('Risk assessment error:', error);
    throw new Error(`Risk assessment failed: ${error.message}`);
  }
}
