import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Validate required environment variables
 */
function validateEnvironment() {
  const required = ['OPENAI_API_KEY'];
  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    console.error('\n❌ ERROR: Missing required environment variables:');
    missing.forEach(key => console.error(`   - ${key}`));
    console.error('\nPlease check your .env file in the backend directory.');
    console.error('See .env.example for reference.\n');
    process.exit(1);
  }

  // Validate API key format
  if (!process.env.OPENAI_API_KEY.startsWith('sk-')) {
    console.error('\n❌ ERROR: Invalid OpenAI API key format.');
    console.error('API key should start with "sk-"\n');
    process.exit(1);
  }
}

// Validate environment before initializing
validateEnvironment();

/**
 * Initialize OpenAI client with configuration
 * Using GPT-4 with temperature 0.3 for consistent, factual analysis
 */
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Configuration for the risk assessment model
 * Using GPT-4o for best performance with web search integration
 */
export const MODEL_CONFIG = {
  model: process.env.OPENAI_MODEL || 'gpt-4o',
  temperature: parseFloat(process.env.OPENAI_TEMPERATURE) || 0.3,
  max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS) || 4000,
};


export default openai;
