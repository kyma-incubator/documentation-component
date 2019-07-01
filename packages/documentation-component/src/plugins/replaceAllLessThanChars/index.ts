import { Plugin, PluginType } from "../../interfaces";
import { replaceAllLessThanChars } from "./mutationPlugin";

const REPLACE_ALL_LESS_THAN_CHARS_MUTATION_PLUGIN =
  "replace-all-less-than-chars-mutation";
const replaceAllLessThanCharsMutationPlugin: Plugin = {
  name: REPLACE_ALL_LESS_THAN_CHARS_MUTATION_PLUGIN,
  type: PluginType.MUTATION,
  sourceTypes: ["markdown", "md"],
  fun: replaceAllLessThanChars,
};

export {
  replaceAllLessThanCharsMutationPlugin,
  REPLACE_ALL_LESS_THAN_CHARS_MUTATION_PLUGIN,
};
