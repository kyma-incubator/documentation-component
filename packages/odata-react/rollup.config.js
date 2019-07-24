import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import visualizer from "rollup-plugin-visualizer";
import cleanup from "rollup-plugin-cleanup";
import replace from "rollup-plugin-replace";
import { terser } from "rollup-plugin-terser";
import { DEFAULT_EXTENSIONS } from "@babel/core";
import pkg from "./package.json";

import ts from "@wessberg/rollup-plugin-ts";

import chalk from "chalk";
const tsconfig = "tsconfig.prod.json";

const extensions = [".ts", ".tsx"];

const projectName = { name: "ODataReact" };

const globals = {
  react: "React",
  "react-dom": "ReactDOM",
  "styled-components": "styled",
  stream: "stream",
  string_decoder: "string_decoder",
};

const onwarn = warning => {
  const message =
    "Creating a browser bundle that depends on Node.js built-in modules ('stream' and 'string_decoder')." +
    " You might need to include https://www.npmjs.com/package/rollup-plugin-node-builtins";
  /* we are suppersing this message, because even though
   * xml-js has dep on sax.js which has dep on those two above,
   * sax.js can work without them; other workaround would be to
   * install rollup-plugin-builtins, but this would hurt bundlesize
   */
  if (warning.code === "MISSING_NODE_BUILTINS" && warning.message === message) {
    return;
  }

  console.warn(chalk.yellowBright(`(!) ${warning.message}`));
};

export default {
  input: "./src/ODataReact.tsx",
  onwarn,
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
      preferBuiltins: true,
    }),
    commonjs({
      include: "node_modules/**",
      namedExports: {
        "node_modules/fundamental-react/lib/index.js": [
          "Table",
          "Icon",
          "Button",
          "Panel",
          "PanelHeader",
          "PanelHead",
          "PanelActions",
          "Alert",
        ],
        "node_modules/react/index.js": [
          "useState",
          "Fragment",
          "useEffect",
          "useRef",
        ],
      },
    }),
    ts({
      tsconfig,
      transpiler: "babel",
      include: "src/**/*",
      exclude: "node_modules/**",
    }),
    terser(),
    cleanup({ extensions: ["ts", "tsx", "js", "jsx"], comments: "none" }), // this has to be last
    visualizer(),
  ],
  external: [...Object.keys(globals)],
};
