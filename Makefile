ci-pr: resolve validate test build

.PHONY: resolve
resolve:
	npm install

.PHONY: validate
validate:
	npm run conflict-check
	npm run lint-check
	npm run markdownlint
	npm run type-check

.PHONY: test
test:
	npm run test

.PHONY: build
build:
	npm run build
