# Documentation Component

It is a reusable React.js component that supports rendering of:
- Markdown
- OpenAPI
- AsyncAPI
- OData

Must have:
- npm package. New GitHub package feature?
- sample app that proves it works and can be used for demos. If https://codesandbox.io/ is sufficient as start, let us not over do it


It can be used in any context, like:
- Existing Kyma Console UI
  - Context of a specific service in the Service Catalog views
  - Overal docs view
  - Context help/docs in any Console UI view, like Application
- Website docs - https://kyma-project.io/docs
- Future presentation layer, reusable application for Headless CMS component

It supports:
- Hooking in with custom functions that customize components rendering
- Passing custom styling
- Props that allow you to configure basic display from tab oriented to different views, like clickable tiles that expand with content once you click them

What we solve:
- Doing the same thing several times. We simply make an investment that pays back later
- We have one npm package to help everywhere in any application with slight configuration
