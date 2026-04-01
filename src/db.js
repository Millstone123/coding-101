import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Database connection pool manager.
 * Handles connection lifecycle and retry logic.
 *
 * Configuration is loaded from environment variables:
 * - DATABASE_URL: PostgreSQL connection string
 * - DB_POOL_SIZE: Maximum connections (default: 10)
 * - DB_IDLE_TIMEOUT: Idle timeout in ms (default: 30000)
 */

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: parseInt(process.env.DB_POOL_SIZE || '10'),
  idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT || '30000'),
});

// Log pool errors for debugging
pool.on('error', (err) => {
  console.error('Unexpected pool error:', err.message);
});

/**
 * Execute a query with automatic retry on connection failure.
 * @param {string} text - SQL query text
 * @param {Array} params - Query parameters
 * @returns {Promise<Object>} Query result
 */
export async function query(text, params) {
  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    if (duration > 1000) {
      console.warn(`Slow query (${duration}ms):`, text.substring(0, 100));
    }
    return result;
  } catch (err) {
    // Retry once on connection reset
    if (err.code === 'ECONNRESET') {
      return pool.query(text, params);
    }
    throw err;
  }
}

/**
 * Get a dedicated client for transaction support.
 * Caller must release the client when done.
 * @returns {Promise<Object>} Pool client
 */
export async function getClient() {
  const client = await pool.connect();
  const originalRelease = client.release.bind(client);

  // Monkey-patch release to track unreleased clients
  let released = false;
  const timeout = setTimeout(() => {
    if (!released) {
      console.error('Client checked out for >5s without release!');
      console.error(`Last query: ${client.lastQuery}`);
    }
  }, 5000);

  client.release = () => {
    clearTimeout(timeout);
    released = true;
    return originalRelease();
  };

  return client;
}

export default { query, getClient, pool };
