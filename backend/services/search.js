/**
 * Web Search Service
 * Uses Tavily API for real-time financial data with authentic sources
 */

import { tavily } from '@tavily/core';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Tavily client
const tavilyClient = tavily({
  apiKey: process.env.TAVILY_API_KEY,
});

/**
 * Performs web search for company financial information using Tavily
 * @param {string} query - Search query string
 * @param {Object} options - Search options
 * @returns {Promise<Object>} Search results with snippets and authentic sources
 */
export async function performWebSearch(query, options = {}) {
  try {
    console.log(`🔍 Searching Tavily: ${query}`);

    const searchOptions = {
      query,
      search_depth: options.depth || 'advanced', // 'basic' or 'advanced'
      max_results: options.maxResults || 5,
      include_domains: options.includeDomains || [
        'reuters.com',
        'bloomberg.com',
        'wsj.com',
        'ft.com',
        'cnbc.com',
        'seekingalpha.com',
        'marketwatch.com',
        'yahoo.com/finance',
        'investing.com',
        'sec.gov',
        'moodys.com',
        'standardandpoors.com',
        'fitchratings.com'
      ],
      include_answer: true,
      include_raw_content: false,
    };

    const response = await tavilyClient.search(searchOptions);

    console.log(`✓ Found ${response.results?.length || 0} results from Tavily`);

    return {
      query,
      answer: response.answer,
      results: response.results?.map(result => ({
        title: result.title,
        url: result.url,
        content: result.content,
        score: result.score,
        publishedDate: result.published_date,
      })) || [],
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Tavily search error:', error);

    // Return empty results instead of throwing to allow graceful degradation
    return {
      query,
      answer: null,
      results: [],
      error: error.message,
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * Performs multiple parallel searches for comprehensive company research
 * @param {string} companyName - Name of the company to assess
 * @param {string} industry - Industry sector (optional)
 * @returns {Promise<Array>} Array of search results
 */
export async function performComprehensiveSearch(companyName, industry = '') {
  const queries = generateSearchQueries(companyName, industry);

  console.log(`\n📊 Performing comprehensive search for: ${companyName}`);
  console.log(`   Running ${queries.length} parallel searches...`);

  try {
    // Run all searches in parallel for faster results
    const searchPromises = queries.map(query =>
      performWebSearch(query, { depth: 'advanced', maxResults: 5 })
    );

    const results = await Promise.all(searchPromises);

    // Count total results
    const totalResults = results.reduce((sum, r) => sum + (r.results?.length || 0), 0);
    console.log(`✓ Comprehensive search completed: ${totalResults} total results\n`);

    return results;
  } catch (error) {
    console.error('Comprehensive search error:', error);
    throw error;
  }
}

/**
 * Generates search queries for comprehensive financial risk assessment
 * @param {string} companyName - Name of the company to assess
 * @param {string} industry - Industry sector (optional)
 * @returns {Array<string>} Array of search queries
 */
export function generateSearchQueries(companyName, industry = '') {
  const industryContext = industry ? ` ${industry}` : '';

  return [
    `${companyName}${industryContext} financial performance Q4 2024 Q1 2025 earnings revenue profit`,
    `${companyName} credit rating Moody's S&P Fitch debt liquidity 2024 2025`,
    `${companyName} financial news risks challenges problems 2024 2025`,
    `${companyName} stock performance analyst ratings market position 2024 2025`,
  ];
}
