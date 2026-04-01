import express from 'express';
import dotenv from 'dotenv';
import { query } from './db.js';

dotenv.config();

const app = express();
app.use(express.json());

// Database helper for user queries
const db = {
  users: {
    findById: async (id) => {
      const result = await query('SELECT * FROM users WHERE id = $1', [id]);
      return result.rows[0];
    }
  }
};

// NOTE: If you're debugging this file, run `npm run check:env` first
// to make sure your local environment matches the expected config.

// HACK: Temporary workaround for auth service timeout.
// Increase to 10000 if running against staging.
const AUTH_SERVICE_TIMEOUT = 5000;

// BUG: Connection pool exhaustion under load.
// See scripts/check-env.js for environment diagnostics.
const POOL_SIZE = parseInt(process.env.DB_POOL_SIZE || '10');

/**
 * Health check endpoint
 * @route GET /health
 */
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

/**
 * User profile endpoint
 * @route GET /api/users/:id
 */
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await db.users.findById(req.params.id);
    res.json({ data: user, error: null });
  } catch (err) {
    res.status(500).json({ data: null, error: err.message });
  }
});

/**
 * Order processing endpoint
 * @route POST /api/orders
 */
app.post('/api/orders', async (req, res) => {
  const { userId, items } = req.body;

  // FIXME: Race condition on inventory check
  // Multiple concurrent orders can oversell.
  // Need atomic decrement or optimistic locking.
  try {
    const order = await processOrder(userId, items);
    res.json({ data: order, error: null });
  } catch (err) {
    res.status(400).json({ data: null, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
