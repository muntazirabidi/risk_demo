import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Validate required environment variables
 */
function validateEnvironment() {
  const required = ['ANTHROPIC_API_KEY'];
  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    console.error('\n❌ ERROR: Missing required environment variables:');
    missing.forEach(key => console.error(`   - ${key}`));
    console.error('\nPlease check your .env file in the backend directory.');
    console.error('Add: ANTHROPIC_API_KEY=sk-ant-...\n');
    process.exit(1);
  }
}

// Validate environment before initializing
validateEnvironment();

/**
 * Initialize Anthropic client
 */
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * Configuration for the risk assessment model
 */
export const MODEL_CONFIG = {
  model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-20250514',
  temperature: parseFloat(process.env.ANTHROPIC_TEMPERATURE) || 0.3,
  max_tokens: parseInt(process.env.ANTHROPIC_MAX_TOKENS) || 4096,
};

export default anthropic;
