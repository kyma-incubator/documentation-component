# {Name} {#required}

> **NOTE**: Modify the `{Name}` and insert the name of your plugin. Use Heading 1 (H1).

## Overview {#required}

Provide a description of the plugin(s) functionality and on what types of resources is/are adapted.

## Prerequisites {#optional}

> **NOTE**: This section is optional if only required dependency is `@kyma-project/documentation-component`.

List the required packages (especially appropriate render engine) to use the plugin(s).

> **Example**: 
> - @kyma-project/dc-markdown-render-engine: 0.1.0

## Installation {#required}

Explain the steps to install your plugin(s).

> **Example**: 
> ```bash
> npm i @kyma-project/dc-frontmatter-plugins
> ```

## Options {#required - if config exists}

List in the table available options of the plugin. Please use the table's structure as in example below.

> **NOTE**: If the options are complex or in package are several plugins, you can use a subsections. If not, please use table's structure in below example.

> **Example**: 
> | Name | Required | Type | Default value | Description |
> |---|---|---|---|---|
> | `disableRelativeLinks` | NO | `boolean` | `false` | Disable relative links in markdown files |

## Development {#optional}

Add instructions on how to develop the plugin(s). It must be clear what to do and how to trigger the tests.
