# Documentation Component

## Overview

The Documentation component is a generic, reusable React component that allows you to render any available specification formats.

It supports:

- Passing custom functions that use system plugins to customize content rendering.
- Passing custom render engines to render specific types of documents.
- Setting custom architecture.


### Quick start

To quickly start playing with the Documentation component, use one of these sandboxes:

[![Edit dc-with-all-render-engines](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/derberg/dc-demo-all-render-engines/tree/master/?fontsize=14) - All the render engines in action, with navigation for multiple Markdown files.

[![Edit dc-with-nav-and-metadata-support](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/derberg/dc-demo-nav-with-metadata-support/tree/master/?fontsize=14) - Plugins in action shown on the Markdown render engine. Support for rendering content from front matter and extending the UI navigation with it.


## Installation

Run this command to install the component:

- using [`npm`](https://www.npmjs.com/)
  ``` bash
  npm i @kyma-project/documentation-component
  ```

- using [`yarn`](https://yarnpkg.com/en/)
  ``` bash
  yarn add @kyma-project/documentation-component
  ```

## Usage

Learn what the component consists of and see the exemplary code.

### Properties (props)

The list of properties for the Documentation component includes:

  - **sources: (SourceWithOptions | SourceGroupWithOptions)[]**

    The `sources` property is required and contains source files for the component. For more information on what a render engine is, read the [`sources.md`](./docs/props/sources.md) document.

  - **renderEngines: RenderEngines**

    The `renderEngines` property is required and contains render engines for the component. For more information on what a render engine is, read the [`render-engines.md`](./docs/props/render-engines.md) document.
    
    > **NOTE:**  The array must contain at least one value.

  - **plugins?: Plugins**

    The `plugins` property is optional and contains plugins for the component. For more information on what a plugin is, read the [`plugin.md`](./docs/props/plugins.md) document.

### Custom render engine

For information on how to write a custom render engine for specific document types, read the [`custom-render-engine.md`](./docs/guidelines/custom-render-engine.md) document.

### Custom plugin

For information on how to write a custom plugin for specific document types, read the [`custom-plugin.md`](./docs/guidelines/custom-plugin.md) document.

### Example

See an exemplary component code that renders the `.md` document source:

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

## Development

> **NOTE:** This repository uses [Yarn](https://yarnpkg.com/en/) and [Gulp](https://gulpjs.com/) for managing local dependencies and better development experience.

### Prerequisites

Use the following tools to set up the project:

- Node.js >= 10
- Yarn

### Installation

To install all dependencies for the [Documentation component](./packages/documentation-component) package and other packages in the [`packages`](./packages) directory, run these commands:

``` sh
$ yarn install
$ yarn bootstrap
```


dummy