# Markdown render engine

## Overview

This render engine is based on [react-markdown](https://github.com/rexxars/react-markdown) component.

## Installation

```bash
npm i @kyma-project/dc-markdown-render-engine
```

## Options

| Name | Required | Type | Default value | Description |
|---|---|---|---|---|
| `prefixClassName` | NO | `string` | `"dc"` | Prefix for class name of html tags. |
| `parsers` | NO | [`MarkdownParserPlugin[]`](https://github.com/kyma-incubator/documentation-component/blob/master/packages/markdown-render-engine/src/types.ts#L24) | `[]` | Custom parsers for custom content in markdown files. |
| `customRenderers` | NO | `ReactNode` | | |
| `highlightTheme` | NO | `any` | `{}` | |
| `headingPrefix` | NO | `string | ((source: Source) => string)` where `Source` is [`Source`](https://github.com/kyma-incubator/documentation-component/blob/master/packages/documentation-component/src/interfaces/Source.ts#L14) type | `null` | |
| `copyButton` | NO | `ReactNode` | `null` | Custom copy button in code blocks |

This render engine support also all options available in [react-markdown](https://github.com/rexxars/react-markdown#options) component.