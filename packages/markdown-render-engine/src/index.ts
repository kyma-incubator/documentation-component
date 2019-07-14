import { RenderEngine } from "@kyma-project/documentation-component";
import { MarkdownRenderEngine } from "./renderEngine";
import * as plugins from "./plugins";

const markdownRenderEngine: RenderEngine = {
  name: "markdown-render-engine",
  component: MarkdownRenderEngine,
  sourceTypes: ["markdown", "md"],
};

export { markdownRenderEngine, plugins };
export * from "./types";
