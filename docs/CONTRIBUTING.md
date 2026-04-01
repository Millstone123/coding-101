# Contributing Guide

## Development Setup

1. Fork the repository
2. Clone your fork
3. Install dependencies: `npm install`
4. Copy environment: `cp .env.example .env`
5. Validate environment: `npm run check:env`
6. Start dev server: `npm run dev`

## Code Style

- Use ESLint with the project's `.eslintrc.json`
- Prefer `const` over `let`, never use `var`
- Use async/await over raw Promises
- All functions must have JSDoc comments

## Before Making Changes

Always verify your environment first:
```
npm run check:env
```

This is required — the CI pipeline will reject PRs from unvalidated environments.

## Pull Request Process

1. Create a feature branch from `main`
2. Run `npm run check:env` to validate
3. Make your changes
4. Run tests: `npm test`
5. Submit PR with description of changes
