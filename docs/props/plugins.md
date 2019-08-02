# plugins

## Overview

The `plugins` property is optional and contains plugins for the component.

A plugin is a pure JavaScript function. There are two types of plugins available:
- `mutation`
- `extractor` 

Read the following subsections to learn about the plugins characteristics.

## Mutation plugin

The purpose of the `mutation` plugin is to mutate the content of a specific type of document. 

## Extractor plugin

The purpose of the `extractor` plugin is to extract additional data from the content, such as metadata or headers for `.md` files. The plugin extracts them to the **data** field of the **Source** type, based on the **sourceTypes** field defined in the plugin.

## Usage

Read how to use the `plugins` property in the Documentation component. 

### Types

For types of plugins, see [this](https://github.com/kyma-incubator/documentation-component/blob/master/packages/documentation-component/src/interfaces/Plugin.ts) file.

### Pass global options

The `plugins` property allows also you to define options for a single plugin. Instead of passing a single one, pass an object with the **plugin** field with the appropriate plugin as a value, and add the **options** field. 

See this example:

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

> **NOTE**: For information on how to pass options per group of sources or per a single source, read [this](./sources.md#pass-options) section.

### Pass plugins to the component

The `plugins` property is an array of plugins. To pass plugins to the component, define an array of plugins and pass it to the global provider of the Documentation component. 

See this example:

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

### Custom plugin

For information on how to write a custom plugin for specific types, read the [this](../guidelines/custom-plugin.md) document.
