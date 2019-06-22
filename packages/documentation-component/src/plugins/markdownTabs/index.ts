import { Plugin, PluginType } from "../../interfaces";
import { removeBlankLinesFromTabsBlock } from "./mutationPlugin";
import { MarkdownParserPlugin } from "../../render-engines/markdown/types";
import { tabsParser } from "./parserPlugin";

const MARKDOWN_TABS_MUTATION_PLUGIN = "markdown-tabs-mutation";
const markdownTabsMutationPlugin: Plugin = {
  name: MARKDOWN_TABS_MUTATION_PLUGIN,
  type: PluginType.MUTATION,
  sourceTypes: ["markdown", "md"],
  fun: removeBlankLinesFromTabsBlock,
};
const markdownTabsParserPlugin: MarkdownParserPlugin = tabsParser;

export {
  markdownTabsMutationPlugin,
  markdownTabsParserPlugin
};
