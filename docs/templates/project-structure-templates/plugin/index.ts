import { Plugin, PluginType } from "@kyma-project/documentation-component";
import { mutationPlugin } from "./mutationPlugin";
import { extractorPlugin } from "./extractorPlugin";

const plugin_nameMutationPlugin: Plugin = {
  name: "plugin-name-mutation",
  type: PluginType.MUTATION,
  sourceTypes: ["markdown", "md"],
  fn: mutationPlugin,
};

const plugin_nameExtractorPlugin: Plugin = {
  name: "plugin-name-extractor",
  type: PluginType.EXTRACTOR,
  sourceTypes: ["markdown", "md"],
  fn: extractorPlugin,
};

export { mutationPlugin, plugin_nameExtractorPlugin };
