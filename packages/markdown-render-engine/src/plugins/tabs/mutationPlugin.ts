import { MutationPluginArgs } from "@kyma-project/documentation-component";

const TABS_BLOCKS_REGEX = /<div\s+tabs\s*?(name=('|").+('|"))?\s*?>(.|\n)*?<\/div>/g;
// Regex for removing blank lines for correct parsing toggle in ReactMarkdown component
const BLANK_LINES_REGEX = /^\s*$(?:\r\n?|\n)/gm;

export const removeBlankLines = (source: string) =>
  source.replace(BLANK_LINES_REGEX, "");

export const removeBlankLinesFromTabsBlock = ({
  source,
}: MutationPluginArgs): string => {
  const fn = (str: string): string =>
    str.replace(TABS_BLOCKS_REGEX, occurrence => removeBlankLines(occurrence));

  return fn(source.content || source.rawContent);
};
