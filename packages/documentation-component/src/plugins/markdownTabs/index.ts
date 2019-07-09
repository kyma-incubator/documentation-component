import { Plugin, PluginType } from "../../interfaces";
import { removeBlankLinesFromTabsBlock } from "./mutationPlugin";
import { MarkdownParserPlugin } from "../../render-engines/markdown/types";
import { tabsParser } from "./parserPlugin";
import { Tabs } from "./Tabs";
import { Tab } from "./Tab";

const MARKDOWN_TABS_MUTATION_PLUGIN = "markdown-tabs-mutation";
const markdownTabsMutationPlugin: Plugin = {
  name: MARKDOWN_TABS_MUTATION_PLUGIN,
  type: PluginType.MUTATION,
  sourceTypes: ["markdown", "md"],
  fn: removeBlankLinesFromTabsBlock,
};
const markdownTabsParserPlugin: MarkdownParserPlugin = tabsParser;

export {
  Tabs,
  Tab,
  markdownTabsMutationPlugin,
  MARKDOWN_TABS_MUTATION_PLUGIN,
  markdownTabsParserPlugin,
};
