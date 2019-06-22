import { Plugin, PluginType } from "../../interfaces";
import { HeadersNavigation } from "./HeadersNavigation";
import { extractHeaders } from "./extractorPlugin";

const MARKDOWN_HEADER_EXTRACTOR_PLUGIN = "markdown-headers-extractor";
const markdownHeadersPlugin: Plugin = {
  name: MARKDOWN_HEADER_EXTRACTOR_PLUGIN,
  type: PluginType.EXTRACTOR,
  sourceTypes: ["markdown", "md"],
  fun: extractHeaders,
};

export { 
  markdownHeadersPlugin, 
  MARKDOWN_HEADER_EXTRACTOR_PLUGIN, 
  HeadersNavigation 
};
