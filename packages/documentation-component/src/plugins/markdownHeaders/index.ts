import { Plugin, PluginType } from "../../interfaces";
import { extractHeaders } from "./extractorPlugin";

const plugin: Plugin = {
  type: PluginType.EXTRACTOR,
  allowedSourceType: ["markdown", "md"],
  fun: extractHeaders,
};

export { plugin as markdownHeadersPlugin };
