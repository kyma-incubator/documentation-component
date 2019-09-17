# AsyncAPI Render Engine

## Overview

The AsyncAPI render engine is based on the [AsyncAPI React](https://github.com/asyncapi/asyncapi-react) component.

## Installation

- using [`npm`](https://www.npmjs.com/)

  ```bash
  npm i @kyma-project/dc-async-api-render-engine
  ```

- using [`yarn`](https://yarnpkg.com/en/)

  ```bash
  yarn add @kyma-project/dc-async-api-render-engine
  ```

## Prerequisites

- [`styled-components`](https://github.com/styled-components/styled-components): >= 3.4.0

## Configuration

| Name     | Required | Type                                                                                                                  | Default value                                                                                                           | Description                                                                                              |
| -------- | -------- | --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `config` | No       | [`ConfigInterface`](https://github.com/asyncapi/asyncapi-react/blob/master/docs/configuration/config-modification.md) | See the default values [here](https://github.com/asyncapi/asyncapi-react/blob/master/library/src/config/default.ts#L3). | Defines the configuration of the [AsyncAPI React](https://github.com/asyncapi/asyncapi-react) component. |
| `theme`  | No       | `ThemeInterface`   | See the default values [here](https://github.com/asyncapi/asyncapi-react/blob/master/library/src/theme/default.ts#L4).  | Defines the theme of the [AsyncAPI React](https://github.com/asyncapi/asyncapi-react) component.         |

> **NOTE**: To learn how to pass options of a render engine, read [this](../../docs/props/render-engines.md#pass-global-options) document.
