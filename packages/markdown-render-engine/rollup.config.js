import pkg from "./package.json";
import { plugins, outputs } from "../../rollup.base.config";
import json from "rollup-plugin-json";
import builtins from "rollup-plugin-node-builtins";
import globalsPlugin from "rollup-plugin-node-globals";
const projectName = pkg.name.replace("@kyma-project/", "");
const globals = {
  react: "React",
  "react-markdown": "ReactMarkdown",
  "prism-react-renderer": "Highlight",
  "react-copy-to-clipboard": "CopyToClipboard",
  "react-player": "ReactPlayer",
  "gray-matter": "grayMatter",
  "lodash.mapvalues": "mapValues",
  "lodash.isdate": "isDate",
  constate: "createUseContext",
};
const tsconfig = "tsconfig.json";

export default {
  input: "./src/index.ts",
  output: outputs({
    projectName,
    browserName: pkg.browser,
    moduleName: pkg.module,
    globals,
  }),
  plugins: [
    globalsPlugin(),
    builtins(),
    json(),
    ...plugins({
      commonjsOpts: {
        namedExports: {},
      },
      tsconfigPath: tsconfig,
      autoExternalBuiltins: false,
    }),
  ],
  external: [
    ...Object.keys(globals),
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
};
