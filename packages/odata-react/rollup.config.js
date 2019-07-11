import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import visualizer from "rollup-plugin-visualizer";
import cleanup from "rollup-plugin-cleanup";
import { terser } from "rollup-plugin-terser";
import { DEFAULT_EXTENSIONS } from "@babel/core";

const projectName = { name: "ODataReact" };

const extensions = [".ts", ".tsx"];

const globals = {
  react: "React",
  "react-dom": "ReactDOM",
  "styled-components": "styled",
};

//zmien nazwy plikow w inputach na ODatareact

export default {
  input: "./src/ODataReact.tsx",
  output: [
    {
      file: "./lib/index.umd.js",
      format: "umd",
      ...projectName,
      globals,
      sourcemap: true,
    },
    {
      file: "./lib/index.esm.js",
      format: "es",
      globals,
      sourcemap: true,
      ...projectName,
    },
    {
      file: "./lib/index.iife.js",
      format: "iife",
      globals,
      sourcemap: true,
      ...projectName,
    },
  ],
  plugins: [
    resolve({ extensions: [...DEFAULT_EXTENSIONS, ...extensions] }),
    commonjs({
      include: "**/node_modules/**",
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
      },
    }),

    babel({
      extensions,
      include: ["src/**/*"],
      exclude: "node_modules/**",
    }),
    terser(),
    cleanup({ extensions: ["ts", "tsx", "js", "jsx"], comments: "none" }), // this has to be last
    visualizer(),
  ],
  external: Object.keys(globals),
};
