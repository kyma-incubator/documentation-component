import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import visualizer from "rollup-plugin-visualizer";
import cleanup from "rollup-plugin-cleanup";
import replace from "rollup-plugin-replace";
import { terser } from "rollup-plugin-terser";
import { DEFAULT_EXTENSIONS } from "@babel/core";
import pkg from "./package.json";

import ts from "@wessberg/rollup-plugin-ts";

const tsconfig = "tsconfig.prod.json";

const extensions = [".ts", ".tsx"];

const projectName = { name: "ODataReact" };

const globals = {
  react: "React",
  "react-dom": "ReactDOM",
  "styled-components": "styled",
};

export default {
  input: "./src/ODataReact.tsx",
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
      mainFields: ["module", "main", "browser", "types"],
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
