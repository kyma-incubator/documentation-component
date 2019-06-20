import { Plugin, PluginType } from "../../interfaces";
import { removeBlankLinesFromTabsBlock } from "./mutationPlugin";
import { tabsParser } from "./parserPlugin";

const plugins: Plugin[] = [
  {
    type: PluginType.MUTATION,
    allowedSourceType: ["markdown", "md"],
    fun: removeBlankLinesFromTabsBlock,
  },
  {
    type: PluginType.PARSER,
    allowedSourceType: ["markdown", "md"],
    fun: tabsParser,
  },
];

export { plugins as markdownTabsPlugin };
