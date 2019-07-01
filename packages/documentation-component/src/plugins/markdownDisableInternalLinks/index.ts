import { Plugin, PluginType } from "../../interfaces";
import { disableInternalLinks } from "./mutationPlugin";

const DISABLE_INTERNAL_LINKS_MUTATION_PLUGIN =
  "disable-internal-links-mutation";
const disableInternalLinksMutationPlugin: Plugin = {
  name: DISABLE_INTERNAL_LINKS_MUTATION_PLUGIN,
  type: PluginType.MUTATION,
  sourceTypes: ["markdown", "md"],
  fun: disableInternalLinks,
};

export {
  disableInternalLinksMutationPlugin,
  DISABLE_INTERNAL_LINKS_MUTATION_PLUGIN,
};
