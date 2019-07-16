# Documentation Component

## Overview

Documentation Component is a generic, reusable React component that allows you to render any specifications.

It supports:
- Hooking custom functions that customize content rendering by plugins system.
- Passing custom render engines to render specific types of document.
- Set custom architecture.

## Usage

### Props

The list of props for the AsyncApi React component includes:

  - **sources: (SourceWithOptions | SourceGroupWithOptions)[]**

    The `sources` property is required and contains sources for component. For more information on what render engine is, read the [Sources characteristic](./docs/props/sources.md) document.

  - **renderEngines: RenderEngines**

    The `renderEngines` property is required (require is only one property in array) and contains render engines for component. For more information on what render engine is, read the [Render engine characteristic](./docs/props/render-engine.md) document.

  - **plugins?: Plugins**

    The `plugins` property is optional and contains plugins for component. For more information on what plugin is, read the [Plugin characteristic](./docs/props/plugin.md) document.

### Example

See exemplary using below.

``` tsx
import React from "react";
import { render } from "react-dom";
import {
  DC,
  Content,
  Sources,
  RenderEngines,
  Plugins,
} from '@kyma-project/documentation-component';
import { markdownRenderEngine, plugins as markdownPlugins } from '@kyma-project/dc-markdown-render-engine';

const SOURCES: Sources = [
  {
    source: {
      type: "md",
      rawContent: "Example content",
    }
  }
]

const RENDER_ENGINES: RenderEngines = [
  markdownRenderEngine,
];

const PLUGINS: Plugins = [
  markdownPlugins.frontmatterMutationPlugin,
];

const App: React.FunctionComponent<> = () => (
  <DC.Provider
    sources={SOURCES}
    renderEngines={RENDER_ENGINES}
    plugins={PLUGINS}
  >
    <Content />
  </DC.Provider>
);

render(<App />, document.getElementById("root"));
```

### Custom render engine

For information how to write custom render engine for specific types, read [Custom render engine](./docs/guidelines/custom-render-engine.md) document.

### Custom plugin

For information how to write custom plugin for specific types, read [Custom plugin](./docs/guidelines/custom-plugin.md) document.

## Development

For information on how to set up a development environment, write and run tests, follow the naming and architecture convention defined for the project in the [Development Guide](./docs/development/guide.md).

## Contribution

If you have a feature request, add it as an issue or propose changes in a pull request (PR).
If you create a feature request, use the dedicated **Feature request** issue template. When you create a PR, follow the contributing rules described in the [`CONTRIBUTING.md`](CONTRIBUTING.md) document.

If you have a bug to report, reproduce it in an online code editor. For example, use [CodeSandbox](https://codesandbox.io/). Attach the link to the reproduced bug to your issue. Log the bug using the **Bug report** template.
