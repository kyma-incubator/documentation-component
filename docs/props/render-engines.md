# renderEngines

## Overview

The `renderEngines` property is required and contains an array of render engines specified for the component.

A render engine is a pure React component. Its purpose is to render the content of a specific type of document to the HTML format.

## Usage

Read how to use the `renderEngines` property in the Documentation component.

### Types

For types of render engines, see [this](https://github.com/kyma-incubator/documentation-component/blob/master/packages/documentation-component/src/interfaces/RenderEngine.ts) file.

### Pass global options

The `renderEngines` property allows also you to define options for a single render engine. Instead of passing a single one, pass an object with the **renderEngine** field with the appropriate render engine as a value, and add the **options** field.

See this example:

``` ts
const RENDER_ENGINES: RenderEngines = [
  {
    renderEngine: markdownRenderEngine,
    options: {
      headerPrefix: "documentation-component",
    }
  },
];
```

> **NOTE**: For information on how to pass options per group of sources or per a single source, read [this](./sources.md#pass-options) section.

### Styles

Each render engine exports its default styles, that are compilant with and dependent on [SAP Fundamental](https://sap.github.io/fundamental/). To use them follow its [Getting Started](https://sap.github.io/fundamental/getting-started.html) guide and import revelant `CSS` files as follows:

```js
import "@kyma-project/{CHOSEN_RENDER_ENGINE}/lib/styles.css";
import "fiori-fundamentals/dist/fiori-fundamentals.min.css";
```

To get list of available render engines read this document.
<!-- NOTE for reviewer: if this line stays we should fill it with appropriate link -->

### Pass render engines to the component

The `renderEngines` property is an array of render engines. To pass render engines to the component, define an array of render engines and pass it to the global provider of the Documentation component.

See this example:

``` tsx
const RENDER_ENGINES: RenderEngines = [
  markdownRenderEngine,
];

const App: React.FunctionComponent<> = () => (
  <DC.Provider
    {...otherProps}
    renderEngines={RENDER_ENGINES}
  >
    <Content />
  </DC.Provider>
);
```

### Custom render engine

For information on how to write a custom render engine for specific types, read [this](../guidelines/custom-render-engine.md) document.
