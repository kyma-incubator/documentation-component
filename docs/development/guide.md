# Development Guide

## Overview

Read the document to find out how to install dependencies, launch the development environment, and run tests. Learn also what is the naming and architecture convention to follow in the project.

> **NOTE:** This repository uses [Lerna](https://github.com/lerna/lerna) for managing local dependencies and better development experience.

## Prerequisites

Use the following tools to set up the project:

* Node.js

## Installation

### Install dependencies

To install all dependencies for the [Playground](./playground) application and prepare a symlink for the [`documentation-component`](./packages/documentation-component) package and other packages in [`packages`](./packages) dir, run these commands:

``` sh
$ npm install
$ npm run bootstrap
```

### Launch a development environment

Launch the development server with the hot reloading functionality that allows you to immediately see any change made in files in the `playground/src` and any packages in `packages` folder in the browser. Use this command:

``` sh
$ npm start
```

You can access the live development server at [localhost:3000](http://localhost:3000/).
