import { Plugin, PluginType } from "@kyma-project/documentation-component";
import { extractFrontmatter } from "./extractorPlugin";
import { removeFrontmatter } from "./mutationPlugin";

const frontmatterExtractorPlugin: Plugin = {
  name: "markdown-frontmatter-extractor",
  type: PluginType.EXTRACTOR,
  sourceTypes: ["markdown", "md"],
  fn: extractFrontmatter,
};

const frontmatterMutationPlugin: Plugin = {
  name: "markdown-frontmatter-mutation",
  type: PluginType.MUTATION,
  sourceTypes: ["markdown", "md"],
  fn: removeFrontmatter,
};

export { frontmatterExtractorPlugin, frontmatterMutationPlugin };
