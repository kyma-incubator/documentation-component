# OpenApi Render Engine

## Overview

The OpenAPI render engine is based on the [Swagger UI](https://github.com/swagger-api/swagger-ui) component.

## Installation

- using [`npm`](https://www.npmjs.com/)
  ``` bash
  npm i @kyma-project/dc-open-api-render-engine
  ```

- using [`yarn`](https://yarnpkg.com/en/)
  ``` bash
  yarn add @kyma-project/dc-open-api-render-engine
  ```
  
## Configuration

| Name | Required | Type | Default value | Description |
|---|---|---|---|---|
| `plugins` | No | `any` | `[]` | Defines custom plugins for the [Swagger UI](https://github.com/swagger-api/swagger-ui) component. Read [this](https://github.com/swagger-api/swagger-ui/blob/master/docs/customization/plugin-api.md) document for more details. |
| `schemaUrl` | No | `any` | `{}` | Defines the custom schema for the [SwaggerUI](https://github.com/swagger-api/swagger-ui) component. |

> **NOTE**: To learn how to pass options of a render engine, read [this](../../docs/props/render-engines.md#pass-global-options) document.