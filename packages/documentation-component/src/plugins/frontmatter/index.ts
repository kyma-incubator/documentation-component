import { Plugin, PluginType } from "../../interfaces";
import { extractFrontmatter } from "./extractorPlugin";
import { removeFrontmatter } from "./mutationPlugin";

const FRONTMATTER_EXTRACTOR_PLUGIN = "frontmatter-extractor";
const frontmatterExtractorPlugin: Plugin = {
  name: FRONTMATTER_EXTRACTOR_PLUGIN,
  type: PluginType.EXTRACTOR,
  sourceTypes: ["markdown", "md"],
  fn: extractFrontmatter,
};

const FRONTMATTER_MUTATION_PLUGIN = "frontmatter-mutation";
const frontmatterMutationPlugin: Plugin = {
  name: FRONTMATTER_MUTATION_PLUGIN,
  type: PluginType.MUTATION,
  sourceTypes: ["markdown", "md"],
  fn: removeFrontmatter,
};

export {
  frontmatterExtractorPlugin,
  FRONTMATTER_EXTRACTOR_PLUGIN,
  frontmatterMutationPlugin,
  FRONTMATTER_MUTATION_PLUGIN,
};
