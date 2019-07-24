import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

import cleanup from "rollup-plugin-cleanup";
import cleaner from "rollup-plugin-cleaner";
import replace from "rollup-plugin-replace";
import { terser } from "rollup-plugin-terser";
import { DEFAULT_EXTENSIONS } from "@babel/core";
import pkg from "./package.json";
import ts from "@wessberg/rollup-plugin-ts";

const extensions = [".ts", ".tsx"];

const projectName = { name: pkg.name };

const globals = {
  react: "React",
  "react-dom": "ReactDOM",
};

export default {
  input: "./src/index.ts",
  output: [
    {
      file: pkg.browser,
      format: "umd",
      exports: "named",
      ...projectName,
      globals,
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: "esm",
      globals,
      sourcemap: true,
      ...projectName,
    },
  ],
  plugins: [
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
      namedExports: {
        "node_modules/deepmerge/dist/umd.js": ["deepmerge"],
      },
    }),
    ts({
      transpiler: "babel",
      include: "src/**/*",
      exclude: "node_modules/**",
    }),
    terser(),
    cleanup({ extensions: ["ts", "tsx", "js", "jsx"], comments: "none" }), // this has to be last
  ],
  external: [...Object.keys(globals)],
};
