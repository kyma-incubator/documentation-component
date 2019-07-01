import { Plugin, PluginType } from "../../interfaces";
import { disableExternalLinks } from "./mutationPlugin";

const DISABLE_EXTERNAL_LINKS_MUTATION_PLUGIN =
  "disable-external-links-mutation";
const disableExternalLinksMutationPlugin: Plugin = {
  name: DISABLE_EXTERNAL_LINKS_MUTATION_PLUGIN,
  type: PluginType.MUTATION,
  sourceTypes: ["markdown", "md"],
  fun: disableExternalLinks,
};

export {
  disableExternalLinksMutationPlugin,
  DISABLE_EXTERNAL_LINKS_MUTATION_PLUGIN,
};
