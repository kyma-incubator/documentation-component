import { Plugin, PluginType } from "@kyma-project/documentation-component";
import { removeBlankLinesFromTabsBlock } from "./mutationPlugin";
import { tabsParser } from "./parserPlugin";
import { MarkdownParserPlugin } from "../..//types";

const tabsMutationPlugin: Plugin = {
  name: "markdown-tabs-mutation",
  type: PluginType.MUTATION,
  sourceTypes: ["markdown", "md"],
  fn: removeBlankLinesFromTabsBlock,
};
const tabsParserPlugin: MarkdownParserPlugin = tabsParser;

export { tabsMutationPlugin, tabsParserPlugin };
