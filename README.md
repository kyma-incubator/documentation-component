# Documentation Component

## Overview

Documentation Component, also known as DC, is a generic, reusable React component that allows you to render any available specification formats.

It supports:
- Passing custom functions that use system plugins to customize content rendering.
- Passing custom render engines to render specific types of documents.
- Setting custom architecture.

## Installation

Run this command to install the component:

``` bash
npm i @kyma-project/documentation-component
```

## Usage

Learn what the component consists of and see the exemplary code.

### Properties (props)

The list of properties for the Documentation Component includes:

  - **sources: (SourceWithOptions | SourceGroupWithOptions)[]**

    The `sources` property is required and contains source files for the component. For more information on what render engine is, read the [`sources.md`](./docs/props/sources.md) document.

  - **renderEngines: RenderEngines**

    The `renderEngines` property is required and contains render engines for the component. For more information on what render engine is, read the [`render-engines.md`](./docs/props/render-engine.md) document.
    
    > **NOTE:**  The array must contain at least one value.

  - **plugins?: Plugins**

    The `plugins` property is optional and contains plugins for the component. For more information on what plugin is, read the [`plugin.md`](./docs/props/plugin.md) document.

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

### Custom render engine

For information on how to write a custom render engine for specific document types, read the [`custom-render-engine.md`](./docs/guidelines/custom-render-engine.md) document.

### Custom plugin

For information on how to write a custom plugin for specific document types, read the [`custom-plugin.md`](./docs/guidelines/custom-plugin.md) document.

## Development

> **NOTE:** This repository uses [Lerna](https://github.com/lerna/lerna) for managing local dependencies and better development experience.

### Prerequisites

Use the following tools to set up the project:

* Node.js

### Installation

#### Install dependencies

To install all dependencies for the [Playground](./playground) application and prepare a symlink for the [`documentation-component`](./packages/documentation-component) package and other packages in the [`packages`](./packages) directory, run these commands:

``` sh
$ npm install
$ npm run bootstrap
```

#### Launch a development environment

Launch the development server with the hot reloading functionality that allows you to immediately see any changes made in files in `playground/src` and any package in the `packages` folder in the browser. Use this command:

``` sh
$ npm start
```

You can access the live development server at [localhost:3000](http://localhost:3000/).
