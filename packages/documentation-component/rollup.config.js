import pkg from "./package.json";
import { plugins, outputs } from "../../rollup.base.config";

const projectName = pkg.name.replace("@kyma-project/", "");

const globals = {
  react: "React",
  "react-dom": "ReactDOM",
  constate: "createUseContext",
  deepmerge: "deepmerge",
};

export default {
  input: "./src/index.ts",
  output: outputs({
    projectName,
    browserName: pkg.browser,
    moduleName: pkg.module,
    globals,
  }),
  plugins: plugins({
    commonjsOpts: {
      namedExports: {},
    },
  }),
  external: [...Object.keys(globals), ...Object.keys(pkg.dependencies || {})],
};
