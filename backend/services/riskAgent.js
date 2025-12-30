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

MISSION: Conduct autonomous AI-powered vendor due diligence across all FIVE CRITICAL PILLARS to help procurement leaders make informed decisions about supplier relationships, contract terms, and risk mitigation strategies.

===== FIVE PILLARS OF VENDOR INTELLIGENCE =====

PILLAR 1: FINANCIAL HEALTH
   → Viability analysis and going-concern indicators
   → Liquidity assessment (cash flow, working capital, debt levels)
   → Bankruptcy signals (Altman Z-Score, credit downgrades)
   → Revenue trends and profitability (QoQ, YoY changes with specific %)
   → Payment risk: Can they fulfill long-term contracts?

PILLAR 2: ESG & SUSTAINABILITY
   → Carbon emissions tracking and reduction commitments
   → CSRD/LkSG alignment (EU supply chain due diligence laws)
   → Environmental compliance violations and fines
   → Sustainability commitments vs. actual performance
   → Greenwashing accusations or ESG controversies

PILLAR 3: HUMAN RIGHTS & ETHICS
   → Modern slavery screening and forced labor indicators
   → UFLPA compliance (Uyghur Forced Labor Prevention Act)
   → Labor practice verification (working conditions, wages, safety)
   → Ethical sourcing and supply chain traceability
   → Child labor, discrimination, or worker exploitation incidents

PILLAR 4: SANCTIONS & ANTI-BRIBERY
   → Real-time OFAC/UN/EU sanctions monitoring
   → Corruption risk scoring and bribery cases
   → Enforcement action tracking (SEC, DOJ, international bodies)
   → Export control violations (ITAR, EAR breaches)
   → Politically exposed persons (PEP) and beneficial ownership risks

PILLAR 5: CYBERSECURITY
   → Security posture evaluation (SOC2, ISO 27001 certifications)
   → Data breach history and incident response capability
   → Ransomware attacks and hack incidents (specific dates)
   → Threat intelligence and vulnerability disclosures
   → IT infrastructure resilience and business continuity

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
      "description": "<COMPREHENSIVE RISK STORY (4-6 sentences): Tell the FULL story with context, impact, and implications. Structure: (1) What happened and when, (2) Specific quantified impact with numbers/percentages/dollars, (3) Why this matters to procurement, (4) Current status or ongoing concerns. Example: 'Boeing reported a net loss of $11.83 billion for 2024, marking its largest loss since 2020. The losses were primarily driven by a prolonged machinists strike that disrupted production of the 737 Max, 777, and 767 aircraft for seven weeks, costing nearly $3 billion in charges. Production delays and quality control issues have led to significant delivery backlogs, with over 4,500 aircraft on order but limited near-term delivery capacity. For procurement teams, this indicates potential supply chain disruption risks and delivery timeline uncertainty for any Boeing-dependent contracts.'>"
      "evidenceUrl": "<REQUIRED: Direct URL to the source article/report. NEVER use 'Multiple sources' - provide the primary source URL>",
      "evidenceTitle": "<Title of the source article/report>",
      "assessmentDate": "<YYYY-MM-DD>",
      "riskLevel": "<Critical|High|Medium|Low|Positive>",
      "quantifiedImpact": "<Specific number/percentage of financial impact. Examples: '-$2.3B revenue', '+15% debt', '-25% stock price', '$500M loss', '$2.5M fine', '50K customers affected'>",
      "financialImpact": "<Supply Disruption Risk|Payment Default Risk|Price Volatility Risk|Contract Breach Risk|Delivery Delay Risk|Reputational Risk|Regulatory Risk|Stable Partnership|Competitive Advantage>",
      "category": "<Financial Health|ESG & Sustainability|Human Rights & Ethics|Sanctions & Anti-Bribery|Cybersecurity>",
      "pillar": "<1-Financial|2-ESG|3-Human Rights|4-Sanctions|5-Cybersecurity>",
      "procurementImplication": "<Direct impact on procurement: e.g., 'May require payment in advance', 'Dual-sourcing recommended', 'Safe for long-term contracts', 'Enhanced due diligence required', 'Reputational risk to buyer'>"
    }
  ]
}

CRITICAL REQUIREMENTS FOR VENDOR DUE DILIGENCE:
- Return ONLY valid JSON, no markdown code blocks or explanations
- Include 8-12 findings covering ALL FIVE PILLARS (spread across Financial, ESG, Human Rights, Sanctions, Cybersecurity)
- MANDATORY: Every finding MUST have a real, working evidenceUrl (direct link to source)
- MANDATORY: Include evidenceTitle (title of the source article)
- MANDATORY: Quantify ALL impacts with specific numbers (revenue $, %, timeframes, fines, people affected)
- MANDATORY: Include procurementImplication for each finding (actionable for buyers)
- MANDATORY: Assign each finding to the correct "pillar" (1-Financial, 2-ESG, 3-Human Rights, 4-Sanctions, 5-Cybersecurity)

FOCUS ON RED FLAGS & CONTROVERSIES:
- Prioritize NEGATIVE findings: violations, fines, scandals, breaches, incidents, lawsuits
- Look for: "fined $X", "violated", "breach affecting X customers", "sued for $X", "sanctioned", "forced labor found"
- Recent incidents (2023-2025) are CRITICAL - these are active procurement risks
- Include POSITIVE findings too, but balance should favor risk identification

DESCRIPTION WRITING REQUIREMENTS:
Write COMPREHENSIVE RISK STORIES (4-6 sentences each), not bullet points:

Structure each description:
1. Opening: "What happened" with specific date/timeframe
2. Impact: Quantified consequences with exact numbers/percentages/dollars
3. Context: Why this occurred, contributing factors, or background
4. Procurement Impact: What this means for buyers/contract decisions
5. Status: Current situation, ongoing concerns, or resolution

GOOD EXAMPLE (Comprehensive):
"Boeing reported a net loss of $11.83 billion for 2024, marking its largest annual loss since 2020. The losses were primarily driven by a seven-week machinists' strike that disrupted production of the 737 Max, 777, and 767 aircraft, resulting in nearly $3 billion in charges and significant delivery delays. Production halts and quality control issues have created a backlog of over 4,500 aircraft orders with limited near-term delivery capacity. For procurement teams considering Boeing as a supplier or partner, this indicates elevated supply chain disruption risks, potential timeline uncertainty, and the need for dual-sourcing strategies. The company is currently working to stabilize production, but delivery schedules remain uncertain through 2025."

BAD EXAMPLE (Too short):
"Boeing reported losses of $11.83B in 2024 due to strikes and production issues."

QUANTIFICATION EXAMPLES - Always include in descriptions:
- "Fined $2.5M for GDPR violations affecting 50K customers (May 2024)"
- "Revenue declined 23% YoY ($4.2B to $3.2B) in Q3 2024"
- "Stock price fell 35% following ransomware attack (March 2024)"
- "Lost 3 major contracts worth $180M after ESG scandal (January 2025)"
- "Plant shutdown affected 30% of production capacity for 6 weeks"

PROCUREMENT-FIRST MINDSET:
- Think: "If I'm signing a $5M contract with this vendor, what could go wrong?"
- Ask: "Would my board approve this vendor given these risks?"
- Consider: "What would regulators ask during an audit?"
- Remember: Procurement teams need EVIDENCE to defend their decisions`;
}

/**
 * Stage 1: Research Phase - THREE Parallel Web Searches for Comprehensive Due Diligence
 * Each search focuses on different risk dimensions aligned with the Five Pillars framework
 */
async function gatherCompanyInformation(companyName, industry, location) {
  console.log('Stage 1: Launching 3 parallel web searches for comprehensive due diligence...\n');

  // Search 1: Financial Health & Operational Stability
  const financialSearchQuery = `Search for CURRENT financial health and operational stability information about ${companyName} (${industry || 'company'}, ${location || 'global'}):

FOCUS ON PROCUREMENT RISKS - Search for:
1. Latest financial results (2024-2025): Revenue trends, profit/loss, cash flow problems
2. Credit ratings and bankruptcy risks (Altman Z-Score indicators, S&P/Moody's ratings)
3. Liquidity concerns: Debt levels, payment delays, cash crunch warnings
4. Operational issues: Plant closures, layoffs, production problems, supply shortages
5. Market position: Market share losses, customer defections, competitive threats

CRITICAL: Find SPECIFIC numbers, dates, and URLs. Look for negative signals like "revenue declined", "losses", "restructuring", "credit downgrade", "layoff"`;

  // Search 2: Compliance, ESG & Controversies (CRITICAL FOR DUE DILIGENCE)
  const complianceSearchQuery = `Search for COMPLIANCE VIOLATIONS, CONTROVERSIES, and ESG ISSUES about ${companyName}:

FOCUS ON RED FLAGS FOR PROCUREMENT - Search for:
1. ESG scandals: Environmental violations, carbon emissions failures, greenwashing accusations
2. Human rights issues: Modern slavery, forced labor, UFLPA violations, unethical sourcing
3. Sanctions & corruption: OFAC/EU/UN sanctions, bribery cases, anti-corruption violations, export control breaches
4. Legal problems: Lawsuits, regulatory fines, compliance failures, SEC investigations
5. Ethical controversies: Worker exploitation, child labor, discrimination, safety violations

CRITICAL: Find RECENT incidents (2023-2025). Look for keywords like "fined", "violated", "sued", "investigation", "scandal", "breach", "banned"`;

  // Search 3: Cybersecurity & Supply Chain Risks
  const cyberSearchQuery = `Search for CYBERSECURITY INCIDENTS and SUPPLY CHAIN DISRUPTIONS about ${companyName}:

FOCUS ON OPERATIONAL RISKS - Search for:
1. Data breaches: Ransomware attacks, hacks, customer data leaks, security incidents
2. Cyber vulnerabilities: SOC2 failures, ISO 27001 issues, security audit findings
3. Supply chain disruptions: Supplier failures, geographic concentration risks, single-source dependencies
4. Production disruptions: Factory fires, natural disasters, logistics problems, quality issues
5. Technology failures: IT outages, system failures, cybersecurity weaknesses

CRITICAL: Find SPECIFIC incidents with dates and impacts. Look for "breach", "hacked", "ransomware", "disruption", "outage", "shutdown"`;

  try {
    // Execute all three searches in parallel for speed
    console.log('→ Search 1: Financial Health & Operations...');
    console.log('→ Search 2: Compliance & Controversies...');
    console.log('→ Search 3: Cybersecurity & Supply Chain...\n');

    const [financialData, complianceData, cyberData] = await Promise.all([
      openai.responses.create({
        model: 'gpt-4o',
        input: financialSearchQuery,
        tools: [{ type: 'web_search_preview' }],
      }),
      openai.responses.create({
        model: 'gpt-4o',
        input: complianceSearchQuery,
        tools: [{ type: 'web_search_preview' }],
      }),
      openai.responses.create({
        model: 'gpt-4o',
        input: cyberSearchQuery,
        tools: [{ type: 'web_search_preview' }],
      }),
    ]);

    const financialResults = financialData.output_text || financialData.content || '';
    const complianceResults = complianceData.output_text || complianceData.content || '';
    const cyberResults = cyberData.output_text || cyberData.content || '';

    console.log(`✓ Financial search: ${financialResults.length} chars`);
    console.log(`✓ Compliance search: ${complianceResults.length} chars`);
    console.log(`✓ Cyber/Supply Chain search: ${cyberResults.length} chars\n`);

    // Combine all research data with clear sections
    const combinedResearch = `
===== FINANCIAL HEALTH & OPERATIONAL STABILITY =====
${financialResults}

===== COMPLIANCE, ESG & CONTROVERSIES =====
${complianceResults}

===== CYBERSECURITY & SUPPLY CHAIN RISKS =====
${cyberResults}
`;

    console.log(`✓ Total intelligence gathered: ${combinedResearch.length} characters\n`);
    return combinedResearch;

  } catch (error) {
    console.error('Parallel web search error:', error.message);
    throw new Error(`Multi-agent web search failed: ${error.message}`);
  }
}

/**
 * Stage 2: Analysis Phase - Create structured risk assessment from research
 */
async function analyzeRiskFromResearch(companyName, industry, location, researchData) {
  console.log('Stage 2: Synthesizing multi-pillar intelligence and creating structured JSON...');

  const analysisPrompt = `You have THREE comprehensive intelligence reports covering all FIVE PILLARS of vendor due diligence for ${companyName}.

Your task: Synthesize these findings into a unified risk assessment that helps procurement teams make evidence-based decisions.

===== INTELLIGENCE GATHERED (3 PARALLEL SEARCHES) =====
${researchData}
===== END INTELLIGENCE =====

${getSystemPrompt(companyName, industry, location)}

ANALYSIS PRIORITIES:
1. SPREAD FINDINGS ACROSS ALL FIVE PILLARS - Don't focus only on financial
   - At least 2 findings from Financial Health
   - At least 2 findings from ESG & Sustainability
   - At least 1 finding from Human Rights & Ethics (if data available)
   - At least 1 finding from Sanctions & Anti-Bribery (if data available)
   - At least 2 findings from Cybersecurity (if data available)

2. PRIORITIZE CONTROVERSIES AND RED FLAGS
   - Violations, fines, lawsuits, breaches, scandals, incidents
   - Recent events (2023-2025) that indicate ACTIVE RISKS
   - Regulatory actions, enforcement, compliance failures

3. EXTRACT EVIDENCE PRECISELY
   - Use ACTUAL URLs provided in the research data
   - Copy exact numbers, percentages, dates from the intelligence
   - Quote specific dollar amounts, timeframes, quantities
   - Include evidenceTitle that matches the source article

4. MAKE IT ACTIONABLE FOR PROCUREMENT
   - Every finding must have a "procurementImplication"
   - Think: "How does this affect our contract terms, pricing, or vendor selection?"
   - Consider: "What would a risk committee want to know?"

CRITICAL INSTRUCTIONS:
- Extract ONLY information present in the research data above
- Use the ACTUAL URLs provided - do not invent or generalize
- Quantify EVERYTHING with specific numbers from the research
- Balance negative findings with positive where appropriate
- Return ONLY valid JSON (no markdown, no code blocks, no explanations)`;

  const apiParams = {
    model: MODEL_CONFIG.model,
    messages: [
      {
        role: 'system',
        content: 'You are a vendor due diligence analyst synthesizing multi-source intelligence into a comprehensive five-pillar risk assessment. Focus on controversies, violations, and evidence-based findings that procurement teams need to make informed decisions.',
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
    console.log(`MULTI-AGENT DUE DILIGENCE ASSESSMENT`);
    console.log(`Company: ${companyName}`);
    console.log(`Framework: Five Pillars Intelligence`);
    console.log(`Model: ${MODEL_CONFIG.model}`);
    console.log(`========================================\n`);

    // Stage 1: Multi-Agent Research Phase - 3 parallel searches covering all pillars
    const researchData = await gatherCompanyInformation(companyName, industry, location);
    console.log(`✓ Multi-agent research completed (${researchData.length} characters)\n`);

    // Stage 2: Synthesis Phase - Combine intelligence into unified five-pillar assessment
    const analysisJson = await analyzeRiskFromResearch(companyName, industry, location, researchData);
    console.log('✓ Five-pillar synthesis completed, parsing JSON...\n');

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
