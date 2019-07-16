# Markdown render engine

## Overview

This render engine is based on [react-markdown](https://github.com/rexxars/react-markdown) component.

## Installation

```bash
npm i @kyma-project/dc-markdown-render-engine
```

## Options

> **NOTE**: This render engine support all options available in [react-markdown](https://github.com/rexxars/react-markdown#options) component.

### `prefixClassName`

Prefix for class name of html tags.

- Required: `No`
- Type: `string`
- Default value: `"dc"`

### `parsers`

Custom parsers for custom content in markdown files. More information about write parsers [here](https://github.com/aknuds1/html-to-react#with-custom-processing-instructions).

- Required: `No`
- Type: [`MarkdownParserPlugin[]`](https://github.com/kyma-incubator/documentation-component/blob/master/packages/markdown-render-engine/src/types.ts#L24)
- Default value: `[]`

### `customRenderers`

An object where the keys represent the node type and the value is a React component. The object is merged with the default renderers. The props passed to the component varies based on the type of node. See [default](https://github.com/kyma-incubator/documentation-component/tree/master/packages/markdown-render-engine/src/renderers) implementations of renderers.

- Required: `No`
- Type: [`Renderers`](https://github.com/kyma-incubator/documentation-component/blob/master/packages/markdown-render-engine/src/types.ts#L16)
- Default value: `{}`

### `highlightTheme`

Custom styles for highlight of code block. Component use for highlight [`PrismJS`](https://github.com/PrismJS/prism). See example [themes](https://github.com/PrismJS/prism-themes/tree/master/themes).

- Required: `No`
- Type: `any`
- Default value: `{}`

### `headingPrefix`

Prefix for any heading appearing in markdown file.

- Required: `No`
- Type: `string | ((source: Source) => string)`, where [`Source`](https://github.com/kyma-incubator/documentation-component/blob/master/packages/documentation-component/src/interfaces/Source.ts#L14) is type.
- Default value: `""`

### `copyButton`

Custom copy button in code blocks. Component accept only `code` as `string` to copy as prop. 

- Required: `No`
- Type: `ReactNode`
- Default value: `null`

## Plugins

### `embedVideo`

Mutation plugin for extract video, inspired by [gatsby-remark-embed-video](https://github.com/borgfriend/gatsby-remark-embed-video). Pattern for embedding video is `{platform}: {url}`, where `{url}` is a url to video, and `{platform}` is one of below:
- `youtube`,
- `vimeo`,
- `videopress`,
- `twitch`,
- `twitchlive`,
- `niconico`,

> **NOTE**: For fully integration with `documentation-component` you also must use [`markdownEmbedVideoParserPlugin`](https://github.com/kyma-incubator/documentation-component/blob/master/packages/markdown-render-engine/src/plugins/embedVideo/parserPlugin.tsx).

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

Mutation plugin for extract `details` html tag to fully interactive tabs 

- Type: `Mutation`
- SourceTypes: `["markdown", "md"]`

> **NOTE**: For fully integration with `documentation-component` you also must use [`tabsParserPlugin`](https://github.com/kyma-incubator/documentation-component/blob/master/packages/markdown-render-engine/src/plugins/tabs/parserPlugin.tsx).