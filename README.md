# Kyma Documentation Component (Kyma-DC)

## Overview

It is a generic, reusable React component that supports rendering of:
- Markdown
- OpenAPI
- AsyncAPI
- OData

It supports:
- Plugins (hooking) in with custom functions that customize components rendering
- Passing custom styling
- Custom rendering architecture 

## Prerequisites

Use the following tools to set up the project:

* Node.js
* React (version 16.8.0 or higher)
* TypeScript (version 3.0.0 or higher)

## Installation

> **NOTE:** This repository uses [Lerna](https://github.com/lerna/lerna) for managing local dependencies and better development experience

### Install dependencies

To install all dependencies for the [Playground](./playground) application and prepare a symlink for the [`documentation-component`](./packages/documentation-component) package, run these commands:

``` sh
$ npm install
$ npm run bootstrap
```

### Launch a development environment

Launch the development server with the hot reloading functionality that allows any change in files in the `playground/src` and `packages/documentation-component/src` folders to be immediately visible in the browser. Use this command:

``` sh
$ npm start
```

You can access the live development server at [localhost:3000](http://localhost:3000/).