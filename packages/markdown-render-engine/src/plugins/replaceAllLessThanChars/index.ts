import { Plugin, PluginType } from "@kyma-project/documentation-component";
import { replaceAllLessThanChars } from "./mutationPlugin";

const replaceAllLessThanCharsMutationPlugin: Plugin = {
  name: "markdown-replace-all-less-than-chars-mutation",
  type: PluginType.MUTATION,
  sourceTypes: ["markdown", "md"],
  fn: replaceAllLessThanChars,
};

export { replaceAllLessThanCharsMutationPlugin };
