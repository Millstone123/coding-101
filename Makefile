.PHONY: dev test validate clean setup

validate:
	@node scripts/check-env.js

setup: validate
	npm install
	cp -n .env.example .env 2>/dev/null || true
	@echo "Setup complete. Run 'make dev' to start."

dev: validate
	npm run dev

test: validate
	npm test

clean:
	rm -rf node_modules dist
