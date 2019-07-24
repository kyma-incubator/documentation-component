import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import visualizer from "rollup-plugin-visualizer";
import cleanup from "rollup-plugin-cleanup";
import cleaner from "rollup-plugin-cleaner";
import replace from "rollup-plugin-replace";
import { terser } from "rollup-plugin-terser";
import { DEFAULT_EXTENSIONS } from "@babel/core";

import ts from "@wessberg/rollup-plugin-ts";

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
      include: "node_modules/**",
      ...commonjsOpts,
    }),
    ts({
      tsconfig: tsconfigPath,
      transpiler: "babel",
      include: "src/**/*",
      exclude: "node_modules/**",
    }),
    terser(),
    cleanup({ extensions: ["ts", "tsx", "js", "jsx"], comments: "none" }), // this has to be last
    visualizer(),
  ];
};
