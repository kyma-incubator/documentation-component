ci-pr: resolve validate test

.PHONY: resolve
resolve:
	npm run bootstrap
	

.PHONY: validate
validate:
	npm run conflict-check
	npm run lint-check
	npm run markdownlint

.PHONY: test
test: 
	npm run test
