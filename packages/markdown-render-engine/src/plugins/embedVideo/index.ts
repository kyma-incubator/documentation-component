import { Plugin, PluginType } from "@kyma-project/documentation-component";
import { MarkdownParserPlugin } from "../../types";
import { embedVideoMutationPlugin } from "./mutationPlugin";
import { embedVideoParser } from "./parserPlugin";

const markdownEmbedVideoMutationPlugin: Plugin = {
  name: "markdown-embed-video-mutation",
  type: PluginType.MUTATION,
  sourceTypes: ["markdown", "md"],
  fn: embedVideoMutationPlugin,
};
const markdownEmbedVideoParserPlugin: MarkdownParserPlugin = embedVideoParser;

export { markdownEmbedVideoMutationPlugin, markdownEmbedVideoParserPlugin };
