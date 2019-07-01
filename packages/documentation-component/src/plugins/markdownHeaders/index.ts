import { Plugin, PluginType } from "../../interfaces";
import { HeadersNavigation, useHeadersContext } from "./HeadersNavigation";
import { extractHeaders } from "./extractorPlugin";
import { Header, ExtractHeadersPluginOptions, ActiveAnchors } from "./types";

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
  ExtractHeadersPluginOptions,
  HeadersNavigation,
  Header,
  useHeadersContext,
  ActiveAnchors,
};
