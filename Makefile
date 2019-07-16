ci-pr: resolve validate test build

.PHONY: resolve
resolve:
	npm install

.PHONY: validate
validate:
	npm run lint-check

.PHONY: test
test:
	npm run test

.PHONY: build
build:
	npm run build
