import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import visualizer from "rollup-plugin-visualizer";
import cleanup from "rollup-plugin-cleanup";
import { terser } from "rollup-plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { DEFAULT_EXTENSIONS } from "@babel/core";
import pkg from "./package.json";
// const projectName = { name: "ODataReact" };

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
      exports: "default",
      esModule: false,
      file: pkg.browser,
      format: "umd",
      ...projectName,
      globals,
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: "es",
      globals,
      sourcemap: true,
      ...projectName,
    },
    {
      file: pkg.main,
      format: "iife",
      globals,
      sourcemap: true,
      ...projectName,
    },
  ],
  plugins: [
    resolve({
      extensions: [...DEFAULT_EXTENSIONS, ...extensions],
      browser: true,
      mainFields: ["module", "main", "browser"],
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
    babel({
      extensions,
      include: ["src/**/*"],
      exclude: "node_modules/**",
    }),
    // terser(),
    // cleanup({ extensions: ["ts", "tsx", "js", "jsx"], comments: "none" }), // this has to be last
    visualizer(),
  ],
  external: [...Object.keys(globals)],
};
