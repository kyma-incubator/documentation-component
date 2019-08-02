> **NOTE**: Sections with the asterisk sign (*) are optional.

# Render Engine Name

Modify the engine name and insert the name of your render engine. Use Heading 1 (H1).

## Overview

Provide a description of the render engine's functionality. For example, describe resources adapted by the render engine, resources on which the render engine is based, or which packages it uses.

## Prerequisites

> **NOTE**: Don't consider`@kyma-project/documentation-component` a prerequisite. 

List the packages required to use the render engine. 

## Installation

Explain the steps to install your render engine.

## Configuration*

Create a table listing the available options of your render engine. Use the following table structure:

| Name | Required | Type | Default value | Description |
|---|---|---|---|---|
| `schema` | Yes | `string` | `""` | Defines the input schema for rendering. |

### Plugins*

List plugins available for your render engine.

## Development*

Add instructions on how to develop the render engine. It must be clear what to do and how to trigger the tests.
