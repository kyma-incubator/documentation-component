# Async-api render engine

## Overview

This render engine is based on [asyncapi-react](https://github.com/asyncapi/asyncapi-react) component.

## Installation

```bash
npm i @kyma-project/dc-async-api-render-engine
```

## Prerequisites

- [`documentation-component`](https://github.com/kyma-incubator/documentation-component/tree/master/packages/documentation-component): ^0.1.0
- [`styled-components`](https://github.com/styled-components/styled-components): >= 3.4.0

## Options

| Name | Required | Type | Default value | Description |
|---|---|---|---|---|
| `config` | NO | [`ConfigInterface`](https://github.com/asyncapi/asyncapi-react/blob/master/docs/configuration/config-modification.md) | [Default values](https://github.com/asyncapi/asyncapi-react/blob/master/library/src/config/default.ts#L3) | Configuration of [`asyncapi-react`](https://github.com/asyncapi/asyncapi-react) component |
| `theme` | NO | [`ThemeInterface`](https://github.com/asyncapi/asyncapi-react/blob/master/docs/configuration/theme-modification.md) | [Default values](https://github.com/asyncapi/asyncapi-react/blob/master/library/src/theme/default.ts#L4) | Theme of [`asyncapi-react`](https://github.com/asyncapi/asyncapi-react) component |