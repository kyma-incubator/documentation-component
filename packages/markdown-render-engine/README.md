# Markdown render engine

## Overview

This render engine is based on [react-markdown](https://github.com/rexxars/react-markdown) component.

## Installation

- by [`npm`](https://www.npmjs.com/)
  ``` bash
  npm i @kyma-project/dc-markdown-render-engine
  ```

- by [`yarn`](https://yarnpkg.com/en/)
  ``` bash
  yarn add @kyma-project/dc-markdown-render-engine
  ```

## Options

> **NOTE**: This render engine support all options available in [react-markdown](https://github.com/rexxars/react-markdown#options) component.

| Name | Required | Type | Default value | Description |
|---|---|---|---|---|
| `parsers` | No | [`MarkdownParserPlugin[]`](./src/types.ts#L24) | `[]` | Custom parsers for custom content in markdown files. More information about write parsers [here](https://github.com/aknuds1/html-to-react#with-custom-processing-instructions). |
| `customRenderers` | No | [`Renderers`](./src/types.ts#L16) | `{}` | An object where the keys represent the node type and the value is a React component. The object is merged with the default renderers. The props passed to the component varies based on the type of node. See [default](./src/renderers) implementations of renderers. |
| `highlightTheme` | No | `any` | `{}` | Custom styles for highlight of code block. Component use for highlight [`PrismJS`](https://github.com/PrismJS/prism). See example [themes](https://github.com/PrismJS/prism-themes/tree/master/themes). |
| `headingPrefix` | No | `string | ((source: Source) => string)`, where [`Source`](./src/interfaces/Source.ts#L14) is type | `""` | Prefix for any heading appearing in markdown file. |
| `copyButton` | No | `ReactNode` | `null` | Custom copy button in code blocks. Component accept only `code` as `string` to copy as prop.  |

> **NOTE**: For information how to pass options of render engine, read [this](../../docs/props/render-engines.md#passing-globally-options) document.

## Plugins

For using plugins available in package, import `plugins` object from package, like:

``` js
import { plugins as markdownPlugins } from "@kyma-project/dc-markdown-render-engine"
```

| Name | Type | Source types | Description |
|---|---|---|---|
| `embedVideo` | Mutation | `["markdown", "md"]` | A mutation plugin to extract videos. The pattern for embedding a video is `{platform}: {url}`, where `{url}` is the URL to the video, and `{platform}` is one of the following: `youtube`, `vimeo`, `videopress`, `twitch`, `twitchlive`, `niconico`. **NOTE**: For fully integration with `documentation-component` you also must use [`markdownEmbedVideoParserPlugin`](./src/plugins/embedVideo/parserPlugin.tsx). |
| `frontmatter` | Mutation and Extractor | `["markdown", "md"]` | Mutation and extractor plugins. Mutation for remove frontmatter from beginning of file. Extractor for extracting file metadata from markdown file. |
| `headers` | Mutation | `["markdown", "md"]` | A extractor plugin for extracting headers from from markdown file. |
| `replaceAllLessThanChars` | Extractor | `["markdown", "md"]` | A mutation plugin for replace all `<` chars to appropriate unicode code for properly rendering these chars. |
| `tabs` | Mutation | `["markdown", "md"]` | A mutation plugin for extract `details` html tag to fully interactive tabs. **NOTE**: For fully integration with `documentation-component` you also must use [`tabsParserPlugin`](./src/plugins/tabs/parserPlugin.tsx). |

> **NOTE**: For information how to pass options of plugins, read [this](../../docs/props/plugins.md#passing-globally-options) document.

## TypeScript types

For using types available in package, import `types` object from package, like:

``` js
import { types as markdownRETypes } from "@kyma-project/dc-markdown-render-engine"
```
