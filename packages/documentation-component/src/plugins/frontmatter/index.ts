import { Plugin, PluginType } from "../../interfaces";
import { extractMetadata } from "./extractorPlugin";

const FRONTMATTER_EXTRACTOR_PLUGIN = "frontmatter-extractor";
const frontmatterPlugin: Plugin = {
  name: "frontmatter-extractor",
  type: PluginType.EXTRACTOR,
  sourceTypes: ["markdown", "md"],
  fun: extractMetadata,
};

export { 
  frontmatterPlugin,
  FRONTMATTER_EXTRACTOR_PLUGIN
};
