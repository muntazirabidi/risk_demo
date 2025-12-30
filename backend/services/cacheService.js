import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CACHE_DIR = path.join(__dirname, '../data/assessments');

/**
 * Generate a unique cache key based on company information
 */
function generateCacheKey(companyName, industry, location) {
  const normalizedData = {
    companyName: companyName.trim().toLowerCase(),
    industry: (industry || '').trim().toLowerCase(),
    location: (location || '').trim().toLowerCase()
  };
  const dataString = JSON.stringify(normalizedData);
  return crypto.createHash('md5').update(dataString).digest('hex');
}

/**
 * Get filename for cache entry
 */
function getCacheFilePath(cacheKey) {
  return path.join(CACHE_DIR, `${cacheKey}.json`);
}

/**
 * Check if cache exists and is still valid (same day)
 */
async function getCachedAssessment(companyName, industry, location) {
  try {
    const cacheKey = generateCacheKey(companyName, industry, location);
    const filePath = getCacheFilePath(cacheKey);

    // Check if file exists
    try {
      await fs.access(filePath);
    } catch {
      console.log('   ℹ No cached assessment found');
      return null;
    }

    // Read cached data
    const fileContent = await fs.readFile(filePath, 'utf8');
    const cachedData = JSON.parse(fileContent);

    // Check if cache is from today
    const cacheDate = new Date(cachedData.metadata.assessmentTimestamp);
    const today = new Date();
    const isSameDay =
      cacheDate.getDate() === today.getDate() &&
      cacheDate.getMonth() === today.getMonth() &&
      cacheDate.getFullYear() === today.getFullYear();

    if (isSameDay) {
      const cacheAge = Math.round((today - cacheDate) / 1000 / 60); // minutes
      console.log(`   ✓ Cache hit! Using cached assessment from ${cacheAge} minutes ago`);
      return cachedData;
    } else {
      console.log('   ℹ Cache expired (not from today), will fetch fresh data');
      return null;
    }
  } catch (error) {
    console.error('   ⚠ Error reading cache:', error.message);
    return null;
  }
}

/**
 * Save assessment to cache
 */
async function saveAssessmentToCache(companyName, industry, location, assessmentData, metadata) {
  try {
    const cacheKey = generateCacheKey(companyName, industry, location);
    const filePath = getCacheFilePath(cacheKey);

    // Ensure cache directory exists
    await fs.mkdir(CACHE_DIR, { recursive: true });

    // Prepare cache data
    const cacheData = {
      cacheKey,
      metadata: {
        ...metadata,
        assessmentTimestamp: new Date().toISOString(),
        cached: false, // Will be true when retrieved from cache
      },
      data: assessmentData
    };

    // Write to file
    await fs.writeFile(filePath, JSON.stringify(cacheData, null, 2), 'utf8');
    console.log(`   ✓ Assessment cached: ${filePath}`);

    return cacheData;
  } catch (error) {
    console.error('   ⚠ Error saving to cache:', error.message);
    // Don't fail the request if caching fails
    return null;
  }
}

/**
 * List all cached assessments
 */
async function listCachedAssessments() {
  try {
    await fs.mkdir(CACHE_DIR, { recursive: true });
    const files = await fs.readdir(CACHE_DIR);
    const assessments = [];

    for (const file of files) {
      if (file.endsWith('.json')) {
        const filePath = path.join(CACHE_DIR, file);
        const content = await fs.readFile(filePath, 'utf8');
        const data = JSON.parse(content);

        assessments.push({
          cacheKey: data.cacheKey,
          companyName: data.metadata.companyName,
          industry: data.metadata.industry,
          location: data.metadata.location,
          assessmentDate: data.metadata.assessmentTimestamp,
          riskScore: data.data.overallRiskScore,
          riskLevel: data.data.riskLevel
        });
      }
    }

    return assessments;
  } catch (error) {
    console.error('Error listing cached assessments:', error.message);
    return [];
  }
}

/**
 * Clear old cache entries (older than 7 days)
 */
async function clearOldCache(daysOld = 7) {
  try {
    await fs.mkdir(CACHE_DIR, { recursive: true });
    const files = await fs.readdir(CACHE_DIR);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    let deletedCount = 0;

    for (const file of files) {
      if (file.endsWith('.json')) {
        const filePath = path.join(CACHE_DIR, file);
        const stats = await fs.stat(filePath);

        if (stats.mtime < cutoffDate) {
          await fs.unlink(filePath);
          deletedCount++;
        }
      }
    }

    console.log(`✓ Cleared ${deletedCount} old cache entries (>${daysOld} days)`);
    return deletedCount;
  } catch (error) {
    console.error('Error clearing old cache:', error.message);
    return 0;
  }
}

/**
 * Delete specific cached assessment
 */
async function deleteCachedAssessment(companyName, industry, location) {
  try {
    const cacheKey = generateCacheKey(companyName, industry, location);
    const filePath = getCacheFilePath(cacheKey);

    await fs.unlink(filePath);
    console.log(`✓ Deleted cached assessment: ${companyName}`);
    return true;
  } catch (error) {
    console.error('Error deleting cached assessment:', error.message);
    return false;
  }
}

export {
  getCachedAssessment,
  saveAssessmentToCache,
  listCachedAssessments,
  clearOldCache,
  deleteCachedAssessment,
  generateCacheKey
};
