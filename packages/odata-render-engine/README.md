# OData Render Engine

## Overview

The OData render engine is based on the [OData React](https://github.com/kyma-incubator/documentation-component/tree/main/packages/odata-react) component.

## Installation

- using [`npm`](https://www.npmjs.com/)

  ```bash
  npm i @kyma-project/dc-odata-render-engine
  ```

- using [`yarn`](https://yarnpkg.com/en/)

  ```bash
  yarn add @kyma-project/dc-odata-render-engine
  ```

## Prerequisites

- [`odata-react`](https://github.com/kyma-incubator/documentation-component/tree/main/packages/odata-react): ^0.3.0

### Styles

To use default styles based on [SAP Fundamentals](https://sap.github.io/fundamental/), install the npm package from [this](https://sap.github.io/fundamental/getting-started.html) Getting Started guide and import the styles as follows:

```js
import "@kyma-project/odata-react/lib/styles.css";
import "fiori-fundamentals/dist/fiori-fundamentals.min.css";
```

To use the default font `72` provided by SAP Fundamentals, import the font after installing the [SAP Fundamentals](https://sap.github.io/fundamental/) package:

```js
import "fiori-fundamentals/dist/fonts.min.css";
```
