import { MutationPluginArgs } from "@kyma-project/documentation-component";

const FRONTMATTER_MD_REGEX = /^---(.|\n)*?---\n/;

function fn(str: string): string {
  return str.replace(/^\s+|\s+$/g, "").replace(FRONTMATTER_MD_REGEX, "");
}

export const removeFrontmatter = ({ source }: MutationPluginArgs): string =>
  fn(source.content || source.rawContent);
