import { Plugin, PluginType } from "../../interfaces";
import { MarkdownParserPlugin } from "../../render-engines/markdown/types";
import { embedVideoMutationPlugin } from "./mutationPlugin";
import { embedVideoParser } from "./parserPlugin";

const EMBED_VIDEO_MUTATION_PLUGIN = "embed-video-mutation";
const markdownEmbedVideoMutationPlugin: Plugin = {
  name: EMBED_VIDEO_MUTATION_PLUGIN,
  type: PluginType.MUTATION,
  sourceTypes: ["markdown", "md"],
  fun: embedVideoMutationPlugin,
};
const markdownEmbedVideoParserPlugin: MarkdownParserPlugin = embedVideoParser;

export {
  markdownEmbedVideoMutationPlugin,
  EMBED_VIDEO_MUTATION_PLUGIN,
  markdownEmbedVideoParserPlugin,
};
