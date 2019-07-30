ci-pr: resolve test validate 

.PHONY: resolve
resolve:
	yarn bootstrap

.PHONY: test
test: 
	yarn test

.PHONY: validate
validate:
	yarn conflict-check
	yarn lint-check
	yarn markdownlint
	yarn type-check


