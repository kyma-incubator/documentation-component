import {
  Source,
  MutationPluginReturnType,
  MutationPluginArgs,
} from "../../interfaces";

const LINKS_MD_REGEX = /\[([^\[]+)\]\(([^\)]+)\)/g;

function fun(str: string): string {
  return str.replace(LINKS_MD_REGEX, (substring: string) => {
    LINKS_MD_REGEX.lastIndex = 0;
    const matched = LINKS_MD_REGEX.exec(substring);
    if (matched && matched[2] && !matched[2].startsWith("http")) {
      return matched[1];
    }
    return substring;
  });
}

export const disableInternalLinks = ({
  source,
}: MutationPluginArgs): MutationPluginReturnType =>
  source.content ? fun(source.content) : fun(source.rawContent);
