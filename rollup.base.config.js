import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import visualizer from "rollup-plugin-visualizer";
import cleanup from "rollup-plugin-cleanup";
import cleaner from "rollup-plugin-cleaner";
import replace from "rollup-plugin-replace";
import sourcemaps from "rollup-plugin-sourcemaps";
import babel from "rollup-plugin-babel";
import autoExternal from "rollup-plugin-auto-external";
import ts from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";

import { DEFAULT_EXTENSIONS } from "@babel/core";

import typescript from "typescript";

const extensions = [".ts", ".tsx"];

export const outputs = ({ projectName, browserName, moduleName, globals }) => [
  {
    file: browserName,
    format: "umd",
    exports: "named",
    name: projectName,
    globals,
    sourcemap: true,
  },
  {
    file: moduleName,
    format: "esm",
    globals,
    sourcemap: true,
    name: projectName,
  },
];

export const plugins = ({ commonjsOpts, tsconfigPath }) => {
  return [
    cleaner({ targets: ["lib"] }),
    sourcemaps(),
    autoExternal(),
    replace({
      values: {
        "process.env.ENVIRONMENT": JSON.stringify("production"),
        "process.env.NODE_ENV": JSON.stringify("production"),
      },
    }),
    resolve({
      extensions: [...DEFAULT_EXTENSIONS, ...extensions],
      browser: true,
      mainFields: ["module", "main", "browser"],
    }),
    commonjs({
      include: /node_modules/,
      ...commonjsOpts,
    }),
    ts({
      tsconfig: tsconfigPath,
      typescript: typescript,
      clean: true,
      objectHashIgnoreUnknownHack: true,
      tsconfigOverride: { target: "esnext" }, //babel plugin takes care of transpiling from esnext to browserlisted es
    }),
    babel({
      exclude: "node_modules/**",
      extensions: [...DEFAULT_EXTENSIONS, "ts", "tsx"],
      runtimeHelpers: true,
      babelrc: false,
      presets: [
        [
          "@babel/preset-env",
          {
            modules: false,
            targets: {
              browsers: [">0.25%", "not dead"], // same as in gatsby
            },
          },
        ],
        "@babel/preset-react",
        "@babel/typescript",
      ],
      plugins: [
        [
          "babel-plugin-styled-components",
          {
            displayName: true,
          },
        ],
        "@babel/plugin-transform-runtime",
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-object-rest-spread",
        "@babel/plugin-proposal-async-generator-functions",
      ],
    }),
    terser(),
    cleanup({ extensions: ["ts", "tsx", "js", "jsx"], comments: "none" }), // this has to be last
    visualizer(),
  ];
};
