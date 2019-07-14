import { Plugin, PluginType } from "@kyma-project/documentation-component";
import { HeadersNavigation } from "./components";
import { extractHeaders } from "./extractorPlugin";
import { useHeadersContext } from "./components/provider";

const headersExtractorPlugin: Plugin = {
  name: "markdown-headers-extractor",
  type: PluginType.EXTRACTOR,
  sourceTypes: ["markdown", "md"],
  fn: extractHeaders,
};

export { headersExtractorPlugin, HeadersNavigation, useHeadersContext };
export * from "./types";
