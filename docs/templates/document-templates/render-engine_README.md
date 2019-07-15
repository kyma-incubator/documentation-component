# {Name} {#required}

> **NOTE**: Modify the `{Name}` and insert the name of your render engine. Use Heading 1 (H1).

## Overview {#required}

Provide a description of the render engine's functionality - what kind of resources the described render engine are adapted and (if it is) on what it is based, and what it uses (what packages).

## Prerequisites {#required}

> **NOTE**: This section is optional if only required dependency is `@kyma-project/documentation-component`.

List the required packages to use the render engine. 

> **Example**: 
> - styled-components: ^4.3.0

## Installation {#required}

Explain the steps to install your render engine.

> **Example**: 
> ```bash
> npm i @kyma-project/dc-async-api-render-engine
> ```

## Options {#required - if config exists}

List in the table available options of the render engine. Please use the table's structure as in example below.

> **NOTE**: If the options are complex, you can use a subsections. If not, please use table's structure in below example.

> **Example**: 
> | Name | Required | Type | Default value | Description |
> |---|---|---|---|---|
> | `schema` | YES | `string` | `""` | Defines the input schema for rendering |

## Plugins {#optional}

List provided with the package available plugins (if they exist).

## Development {#optional}

Add instructions on how to develop the render engine. It must be clear what to do and how to trigger the tests.
