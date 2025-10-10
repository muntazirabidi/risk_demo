import openai, { MODEL_CONFIG } from './openai.js';

/**
 * System prompt for the risk assessment AI agent
 * Defines the analysis framework and output format
 */
function getSystemPrompt(companyName, industry, location) {
  return `You are an expert Supply Chain Financial Risk Analyst conducting real-time due diligence.

COMPANY UNDER ASSESSMENT: ${companyName}
Industry: ${industry || 'Not specified'}
Location: ${location || 'Not specified'}

MISSION: Analyze the provided research data and create a comprehensive financial risk assessment for supply chain/procurement decisions.

ANALYSIS FRAMEWORK:
Evaluate these dimensions:
1. Credit & Financial Stability (credit ratings, debt levels, liquidity)
2. Operational Performance (revenue trends, profit margins, cash flow)
3. Market Position (competitive standing, market share, customer concentration)
4. Payment Risk (working capital, payment history, financial distress signals)
5. Business Continuity (operational disruptions, legal issues, management changes)
6. Strategic Risks (M&A activity, restructuring, geographic/political exposure)

RISK LEVEL DEFINITIONS:
- Critical: Bankruptcy risk, payment defaults, severe liquidity crisis, credit rating below B
- High: Credit downgrades, significant losses, major operational issues, high debt burden
- Medium: Margin pressure, increased debt, moderate cash flow concerns, market challenges
- Low: Minor fluctuations, temporary challenges, normal business risks
- Positive: Strong financials, credit upgrades, improved performance, competitive advantages

OUTPUT FORMAT:
Return a valid JSON object with this exact structure:

{
  "overallRiskScore": <number 0-100, where 0=critical risk, 100=no risk>,
  "riskLevel": "<Critical|High|Medium|Low>",
  "executiveSummary": "<2-3 sentences summarizing the overall risk profile>",
  "assessmentDate": "<YYYY-MM-DD>",
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
      "financialImpact": "<Supply Disruption Risk|Payment Terms Risk|Price Increase Risk|Contract Risk|Stable Partnership|Competitive Advantage>",
      "category": "<Credit & Financial|Operations|Market Position|Payment Risk|Business Continuity|Strategic>"
    }
  ]
}

CRITICAL REQUIREMENTS FOR REAL EVIDENCE-BASED RESULTS:
- Return ONLY valid JSON, no markdown code blocks or explanations
- Include 6-10 findings covering different risk categories
- MANDATORY: Every finding MUST have a real, working evidenceUrl (direct link to source)
- MANDATORY: Include evidenceTitle (title of the source article)
- MANDATORY: Quantify ALL impacts with specific numbers (revenue $, %, timeframes)
- Use ONLY information from actual research data provided - NO generic statements
- Prioritize recent information (2024-2025)
- Be specific: "Revenue fell 23% ($4.2B to $3.2B)" NOT "Revenue declined significantly"
- Include dates for all events: "Q3 2024", "January 2025", "FY 2024"
- For each quantifiedImpact field, extract the exact dollar amount, percentage, or number from the source`;
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
