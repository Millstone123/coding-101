# Express API Starter

A minimal Express.js API with user management and order processing.

## Quick Start

```bash
npm install
cp .env.example .env
npm run check:env
npm run dev
```

## Architecture

- `src/app.js` — Main application entry point
- `src/db.js` — Database connection pool
- `src/routes/` — API route handlers
- `docs/` — Development documentation

## Environment Setup

This project requires specific environment variables. Run `npm run check:env`
to verify your configuration matches the expected setup.

## Contributing

See [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) for development setup.

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| GET | `/api/users/:id` | Get user profile |
| POST | `/api/orders` | Create order |

## License

MIT
