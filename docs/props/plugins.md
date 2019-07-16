# `plugins` prop

## Overview

The `plugins` property is optional and contains plugins for component.

Plugin is a pure javascript function. At the moment available are two types of plugins: `mutation` and `extractor`. Their characteristic is described below.

## Mutation plugin

Task of mutation plugin is mutate content of specific type of document. 

## Extractor plugin

Task of extractor plugin is extract some additional data from content, like a metadata, headers (for `.md` files), etc. to `data` field of `Source` type.

## Types

For types of plugins, see [file](https://github.com/kyma-incubator/documentation-component/blob/master/packages/documentation-component/src/interfaces/Plugin.ts).

## Passing globally options to plugin

`plugins` property allows to define options for single plugin. Instead of passing a single one, pass object with `plugin` field (with appropriate plugin as value) and second `options` field. See example.

``` ts
const PLUGINS: Plugins = [
  {
    plugin: markdownPlugins.headerMutationPlugin,
    options: {
      headerPrefix: "documentation-component",
    }
  },
];
```

> **NOTE**: For information how to pass options per group of sources or per single source read [this](./sources.md#passing-options) section.

## Passing plugins to component

The `plugins` property is an array of plugins. For passing plugins to component you have to define array of plugins, and then pass it to the global provider of `documentation-component`. See example below.

``` tsx
const PLUGINS: Plugins = [
  markdownPlugins.frontmatterMutationPlugin,
];

const App: React.FunctionComponent<> = () => (
  <DC.Provider
    {...otherProps}
    plugins={PLUGINS}
  >
    <Content />
  </DC.Provider>
);
```

## Custom plugin

For information how to write custom plugin for specific types, read [Custom plugin](../guidelines/custom-plugin.md) document.
