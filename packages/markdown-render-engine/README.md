# Markdown Render Engine

## Overview

The Markdown render engine is based on the [React Markdown](https://github.com/rexxars/react-markdown) component. It allows you to render `.md` files.

## Installation

- using [`npm`](https://www.npmjs.com/)

  ```bash
  npm i @kyma-project/dc-markdown-render-engine
  ```

- using [`yarn`](https://yarnpkg.com/en/)

  ```bash
  yarn add @kyma-project/dc-markdown-render-engine
  ```

## Configuration

> **NOTE**: The Markdown render engine supports all options available in the [React Markdown](https://github.com/rexxars/react-markdown#options) component.

| Name              | Required | Type                                                                                                                    | Default value | Description                                                                                                                                                                                                                                                                          |
| ----------------- | -------- | ----------------------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `parsers`         | No       | [`MarkdownParserPlugin[]`](./src/types.ts#L24)                                                                          | `[]`          | Defines custom parsers for custom content in Markdown files. Go [here](https://github.com/aknuds1/html-to-react#with-custom-processing-instructions) to read more about write parsers.                                                                                               |
| `customRenderers` | No       | [`Renderers`](./src/types.ts)                                                                                           | `{}`          | Defines an object in which the keys represent the node type, and the value is a React component. The object is merged with the default renderers. The props passed to the component vary based on the type of node. See the [default](./src/renderers) implementations of renderers. |
| `highlightTheme`  | No       | `any`                                                                                                                   | `{}`          | Defines custom styles for highlighting code blocks. The Markdown render engine uses [`PrismJS`](https://github.com/PrismJS/prism) to highlight. See the [style](https://github.com/PrismJS/prism-themes/tree/master/themes) examples.                                                |
| `headingPrefix`   | No       | `string or ((source: Source) => string)`, where [`Source`](../documentation-component/src/interfaces/Source.ts) is type | `""`          | Defines a prefix for any heading in a Markdown file.                                                                                                                                                                                                                                 |
| `copyButton`      | No       | `ReactNode`                                                                                                             | `null`        | Defines a custom copy button in code blocks. The Markdown render engine accepts only code blocks as a value to copy.                                                                                                                                                                 |

> **NOTE**: To learn how to pass options of a render engine, read [this](../../docs/props/render-engines.md#pass-global-options) document.

### Styles

To use default styles based on [SAP Fundamentals](https://sap.github.io/fundamental/), import them as follows:

```js
import "@kyma-project/dc-markdown-render-engine/lib/styles.css";
```

To use the default font `72` provided by SAP Fundamentals, install the npm package from [this](https://sap.github.io/fundamental/getting-started.html) Getting Started guide and import the font as follows:

```js
import "fiori-fundamentals/dist/fonts.min.css";
```

### Plugins

To use plugins available in the package, import the `plugins` object from the package. See the following example:

```js
import { plugins as markdownPlugins } from "@kyma-project/dc-markdown-render-engine";
```

| Name                      | Type                   | Source types         | Description                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------------------------- | ---------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `embedVideo`              | mutation               | `["markdown", "md"]` | A mutation plugin to extract videos. The pattern for embedding a video is: `{platform}: {url}`, where `{url}` is the URL to the video, and `{platform}` is one of the following: `youtube`, `vimeo`, `videopress`, `twitch`, `twitchlive`, `niconico`. **NOTE**: To fully integrate with the Documentation component you must also use [`markdownEmbedVideoParserPlugin`](./src/plugins/embedVideo/parserPlugin.tsx) |
| `frontmatter`             | mutation and extractor | `["markdown", "md"]` | Mutation and extractor plugins. The mutation plugin removes Front Matter from the beginning of a Markdown file. The extractor plugin extracts file metadata from a Markdown file.                                                                                                                                                                                                                                    |
| `headers`                 | extractor              | `["markdown", "md"]` | An extractor plugin to extract headers from a Markdown file.                                                                                                                                                                                                                                                                                                                                                         |
| `replaceAllLessThanChars` | mutation               | `["markdown", "md"]` | A mutation plugin to replace every `<` char to an appropriate Unicode character. Used the plugin to render chars properly.                                                                                                                                                                                                                                                                                           |
| `tabs`                    | mutation               | `["markdown", "md"]` | A mutation plugin to extract the `details` HTML tag in order to have fully interactive tabs. **NOTE**: To integrate fully with the Documentation component you must also use [`tabsParserPlugin`](./src/plugins/tabs/parserPlugin.tsx).                                                                                                                                                                              |

> **NOTE**: To learn how to pass options of a plugin, read [this](../../docs/props/plugins.md#pass-global-options) document.

## TypeScript types

To use TypeScript types available in the package, import the `types` object from the package. See the following example:

```js
import { types as markdownRETypes } from "@kyma-project/dc-markdown-render-engine";
```
