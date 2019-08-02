# sources

## Overview

The `sources` property is required and contains the source files that the component processes. 

## Usage

Read how use `sources` property in the Documentation component. 

### Types

The `sources` property is an array type that contains `SourceWithOptions` and/or `SourceGroupWithOptions`. 

See this example for details of these structures:

``` ts
interface SourceWithOptions<C = string> {
  source: {
    type: string;                 // type of document, e.g.: "md"
    rawContent: C;                // content of document
    data?: Record<string, any>;   // additional data - extracted or using by plugin or render engine
  };
  pluginsOptions?: {
    name: string;
    options: Record<string, any>; 
  }[];
  renderEngineOptions?: {
    name: string;
    options: Record<string, any>; 
  }[];
};

interface SourceGroupWithOptions<C = string> {
  sources: SourceWithOptions<C>[];
  pluginsOptions?: {
    name: string;
    options: Record<string, any>; 
  }[];
  renderEngineOptions?: {
    name: string;
    options: Record<string, any>; 
  }[];
};
```

### Pass options

`pluginsOptions` and `renderEngineOptions` are objects with **name** (`string` type) and **options** (`object` type) fields. To pass `pluginsOptions` and/or `renderEngineOptions`, define the plugin or render engine for which you want to provide options. To do this, use the name of the plugin or render engine as the **name** field, and then provide options. 

#### Concate options

The core of the Documentation component automatically concatenates options passed globally, for a group of sources, and for a single source, in this order of priorities: 
1. Single source
2. Group of sources
3. Options passed globally

> **NOTE**: For information on how to pass options globally:
>  - for plugins, read [this](./plugins.md#pass-global-options) section.
>  - for render engines, read [this](./render-engines.md#pass-global-options) section.

### Example

See an example that demonstrates how to pass options for various source types:

``` ts
const SOURCES: Sources = [
    // single source without plugins options and renderEngines options
  {
    source: {
      type: "md",
      rawContent: "Example content 1",
    }
  }
  // single source with plugins options and renderEngines options
  {
    source: {
      type: "md",
      rawContent: "Example content 2",
    },
    pluginsOptions: [
      {
        name: "markdown-headers-extractor",
        options: {
          headerPrefix: "documentation-component"
        }
      }
    ],
    renderEngineOptions: [
      {
        name: "markdown-headers-extractor",
        options: {
          headerPrefix: "documentation-component"
        }
      }
    ],
  },
  // single source with additional data
  {
    source: {
      type: "md",
      rawContent: "Example content 3",
      data: {
        frontmatter: {
          title: "Example title",
        }
      }
    },
    render
  },
  // group of sources
  {
    sources: [
      {
        source: {
          type: "md",
          rawContent: "Example content 4",
          data: {
            frontmatter: {
              title: "Example title",
            }
          }
        }
      },
      {
        source: {
          type: "md",
          rawContent: "Example content 5",
        }
        renderEngineOptions: [
          {
            name: "markdown-headers-extractor",
            options: {
              headerPrefix: "documentation-component"
            }
          }
        ],
      },
    ]
  }
]
```
