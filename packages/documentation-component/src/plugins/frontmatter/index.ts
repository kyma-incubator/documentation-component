import { Plugin, PluginType } from "../../interfaces";
import { extractMetadata } from "./extractorPlugin";

const plugin: Plugin = {
  type: PluginType.EXTRACTOR,
  allowedSourceType: ["markdown", "md"],
  fun: extractMetadata,
};

export { plugin as frontmatterPlugin };
