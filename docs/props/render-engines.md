# `renderEngines` property

## Overview

The `renderEngines` property is required and contains render engines for component.

Render engine is pure React component which task is render content of specific type of document to html.

## Types

For types of render engines, see [file](https://github.com/kyma-incubator/documentation-component/blob/master/packages/documentation-component/src/interfaces/RenderEngine.ts).

## Passing globally options

`renderEngines` property allows to define options for single render engine. Instead of passing a single one, pass object with `renderEngine` field (with appropriate render engine as value) and second `options` field. See example.

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

> **NOTE**: For information how to pass options per group of sources or per single source read [this](./sources.md#passing-options) section.

## Passing render engines to component

The `renderEngines` property is an array of render engines. For passing render engines to component you have to define array of render engines, and then pass it to the global provider of `documentation-component`. See example below.

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

## Custom render engine

For information how to write custom render engine for specific types, read [Custom render engine](../guidelines/custom-render-engine.md) document.
