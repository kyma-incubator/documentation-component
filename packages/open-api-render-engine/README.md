# Open-api render engine

## Overview

This render engine is based on [swagger-ui-dist](https://github.com/swagger-api/swagger-ui) component.

## Installation

- by [`npm`](https://www.npmjs.com/)
  ``` bash
  npm i @kyma-project/dc-open-api-render-engine
  ```

- by [`yarn`](https://yarnpkg.com/en/)
  ``` bash
  yarn add @kyma-project/dc-open-api-render-engine
  ```
  
## Options

| Name | Required | Type | Default value | Description |
|---|---|---|---|---|
| `plugins` | NO | `any` | `[]` | Custom plugins for [swagger-ui-dist](https://github.com/swagger-api/swagger-ui) component. More info [here](https://github.com/swagger-api/swagger-ui/blob/master/docs/customization/plugin-api.md) |
| `schemaUrl` | NO | `any` | `{}` | Custom schema for [swagger-ui-dist](https://github.com/swagger-api/swagger-ui) |

> **NOTE**: For information how to pass options of render engine, read [this](../../docs/props/render-engines.md#passing-globally-options) document.