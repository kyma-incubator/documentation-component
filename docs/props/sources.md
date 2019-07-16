# `sources` property

## Overview

The `sources` property is required and contains sources for component. 

## Types

The `sources` property is array type of `SourceWithOptions` and/or `SourceGroupWithOptions`. See characteristic of those structures below.

``` ts
interface SourceWithOptions {
  source: {
    type: string;               // type of document, e.g.: "md"
    rawContent: string | any;   // content of document
    data?: any;                 // additional data - extracted or using by plugin or render engine
  };
  pluginsOptions?: {
    name: string;
    options: any; 
  }[];
  renderEngineOptions?: {
    name: string;
    options: any; 
  }[];
};

interface SourceGroupWithOptions {
  sources: SourceWithOptions[];
  pluginsOptions?: {
    name: string;
    options: any; 
  }[];
  renderEngineOptions?: {
    name: string;
    options: any; 
  }[];
};
```

## Passing options

Single `pluginsOptions` and `renderEngineOptions` are objects with two fields: `name`(`string` type) and `options`(`object` type). For passing `pluginsOptions` and/or `renderEngineOptions` you have to define for what plugin/render engine you want to provider options. Defines using the name of the plugin/render plugin as `name` field, and then provide options. 

### Concatenating options

Core of `documentation-component` automatically concatenate options passing globally, for group of sources, and for single source with priorities: 
- single source,
- group of sources,
- options passing globally.

> **NOTE**: For information how to pass options globally for plugins read [section](). For render engine, read [this]() section.

## Example

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
