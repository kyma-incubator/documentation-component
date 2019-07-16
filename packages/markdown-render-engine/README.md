# Markdown render engine

## Overview

This render engine is based on [react-markdown](https://github.com/rexxars/react-markdown) component.

## Installation

```bash
npm i @kyma-project/dc-markdown-render-engine
```

## Options

> **NOTE**: This render engine support all options available in [react-markdown](https://github.com/rexxars/react-markdown#options) component.

> **NOTE**: For information how to pass options of render engine, read [this](../../docs/props/render-engines.md#passing-globally-options) document.

### `prefixClassName`

Prefix for class name of html tags.

- Required: `No`
- Type: `string`
- Default value: `"dc"`

### `parsers`

Custom parsers for custom content in markdown files. More information about write parsers [here](https://github.com/aknuds1/html-to-react#with-custom-processing-instructions).

- Required: `No`
- Type: [`MarkdownParserPlugin[]`](./src/types.ts#L24)
- Default value: `[]`

### `customRenderers`

An object where the keys represent the node type and the value is a React component. The object is merged with the default renderers. The props passed to the component varies based on the type of node. See [default](./src/renderers) implementations of renderers.

- Required: `No`
- Type: [`Renderers`](./src/types.ts#L16)
- Default value: `{}`

### `highlightTheme`

Custom styles for highlight of code block. Component use for highlight [`PrismJS`](https://github.com/PrismJS/prism). See example [themes](https://github.com/PrismJS/prism-themes/tree/master/themes).

- Required: `No`
- Type: `any`
- Default value: `{}`

### `headingPrefix`

Prefix for any heading appearing in markdown file.

- Required: `No`
- Type: `string | ((source: Source) => string)`, where [`Source`](./src/interfaces/Source.ts#L14) is type.
- Default value: `""`

### `copyButton`

Custom copy button in code blocks. Component accept only `code` as `string` to copy as prop. 

- Required: `No`
- Type: `ReactNode`
- Default value: `null`

## Plugins

For using plugins available in package, import `plugins` object from package, like:

``` js
import { plugins as markdownPlugins } from "@kyma-project/dc-markdown-render-engine"
```

> **NOTE**: For information how to pass options of plugins, read [this](../../docs/props/plugins.md#passing-globally-options) document.

### `embedVideo`

Mutation plugin for extract video, inspired by [gatsby-remark-embed-video](https://github.com/borgfriend/gatsby-remark-embed-video). Pattern for embedding video is `{platform}: {url}`, where `{url}` is a url to video, and `{platform}` is one of below:
- `youtube`,
- `vimeo`,
- `videopress`,
- `twitch`,
- `twitchlive`,
- `niconico`,

> **NOTE**: For fully integration with `documentation-component` you also must use [`markdownEmbedVideoParserPlugin`](./src/plugins/embedVideo/parserPlugin.tsx).

- Type: `Mutation`
- SourceTypes: `["markdown", "md"]`

### `frontmatter`

Mutation and extractor plugin. Mutation for extract file metadata from markdown file. Extractor for remove frontmatter from beginning of file.

- Type: `Mutation` and `Extractor`
- SourceTypes: `["markdown", "md"]`

### `headers`

- Type: `Extractor`
- SourceTypes: `["markdown", "md"]`

### `replaceAllLessThanChars`

Mutation plugin for replace all `<` chars to appropriate unicode code for properly rendering these chars.

- Type: `Mutation`
- SourceTypes: `["markdown", "md"]`

### `tabs`

Mutation plugin for extract `details` html tag to fully interactive tabs.

- Type: `Mutation`
- SourceTypes: `["markdown", "md"]`

> **NOTE**: For fully integration with `documentation-component` you also must use [`tabsParserPlugin`](./src/plugins/tabs/parserPlugin.tsx).

## TypeScript types

For using types available in package, import `types` object from package, like:

``` js
import { types as markdownRETypes } from "@kyma-project/dc-markdown-render-engine"
```
