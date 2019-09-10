# OData Render Engine

## Overview

The OData render engine is based on the [OData React](https://github.com/kyma-incubator/documentation-component/tree/master/packages/odata-react) component.

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

- [`odata-react`](https://github.com/kyma-incubator/documentation-component/tree/master/packages/odata-react): ^0.2.0-alpha.2
- [`styled-components`](https://github.com/styled-components/styled-components): >= 3.4.0

### Styles

To use default styles based on [SAP Fundamentals](https://sap.github.io/fundamental/), install [this](https://sap.github.io/fundamental/getting-started.html) npm package and import the styles as follows:

```js
import "@kyma-project/dc-odata-render-engine/lib/styles.css";
import "fiori-fundamentals/dist/fiori-fundamentals.min.css";
```
