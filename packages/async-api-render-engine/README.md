# Async-api render engine

## Overview

This render engine is based on [asyncapi-react](https://github.com/asyncapi/asyncapi-react) component.

## Installation

- by [`npm`](https://www.npmjs.com/)
  ``` bash
  npm i @kyma-project/dc-async-api-render-engine
  ```

- by [`yarn`](https://yarnpkg.com/en/)
  ``` bash
  yarn add @kyma-project/dc-async-api-render-engine
  ```

## Prerequisites

- [`styled-components`](https://github.com/styled-components/styled-components): >= 3.4.0

## Options

| Name | Required | Type | Default value | Description |
|---|---|---|---|---|
| `config` | NO | [`ConfigInterface`](https://github.com/asyncapi/asyncapi-react/blob/master/docs/configuration/config-modification.md) | [Default values](https://github.com/asyncapi/asyncapi-react/blob/master/library/src/config/default.ts#L3) | Configuration of [`asyncapi-react`](https://github.com/asyncapi/asyncapi-react) component |
| `theme` | NO | [`ThemeInterface`](https://github.com/asyncapi/asyncapi-react/blob/master/docs/configuration/theme-modification.md) | [Default values](https://github.com/asyncapi/asyncapi-react/blob/master/library/src/theme/default.ts#L4) | Theme of [`asyncapi-react`](https://github.com/asyncapi/asyncapi-react) component |

> **NOTE**: For information how to pass options of render engine, read [this](../../docs/props/render-engines.md#pass-global-options) document.