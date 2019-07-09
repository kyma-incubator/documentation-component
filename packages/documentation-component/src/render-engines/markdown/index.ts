import { RenderEngine } from "../../interfaces";
import { MarkdownRenderEngine } from "./renderEngine";

const markdownRenderEngine: RenderEngine = {
  component: MarkdownRenderEngine,
  sourceTypes: ["markdown", "md"],
};

export { markdownRenderEngine };
