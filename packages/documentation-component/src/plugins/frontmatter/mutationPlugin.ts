import {
  Source,
  MutationPluginReturnType,
  MutationPluginArgs,
} from "../../interfaces";

const FRONTMATTER_MD_REGEX = /^---(.|\n)*?---\n/;

function fn(str: string): string {
  return str.replace(/^\s+|\s+$/g, "").replace(FRONTMATTER_MD_REGEX, "");
}

export const removeFrontmatter = ({
  source,
}: MutationPluginArgs): MutationPluginReturnType =>
  source.content ? fn(source.content) : fn(source.rawContent);
