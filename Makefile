ci-pr: resolve validate

.PHONY: resolve
resolve:
	yarn bootstrap

.PHONY: validate
validate:
	yarn conflict-check
	yarn lint-check
	yarn markdownlint
	yarn type-check
	yarn test
