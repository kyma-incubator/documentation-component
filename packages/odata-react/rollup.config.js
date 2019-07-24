import { plugins, outputs } from "../../rollup.base.config";
import pkg from "./package.json";

const tsconfig = "tsconfig.prod.json";

const projectName = "ODataReact";

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
  onwarn,
  input: "./src/ODataReact.tsx",
  output: outputs({
    projectName,
    browserName: pkg.browser,
    moduleName: pkg.module,
    globals,
  }),

  plugins: plugins({
    commonjsOpts: {
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
    },
    tsconfigPath: tsconfig,
  }),
  // TODO: check whether you can put all dependencies here
  external: [...Object.keys(globals)],
};
