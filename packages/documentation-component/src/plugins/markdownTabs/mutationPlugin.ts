import { Source } from "../../interfaces";

const tabsBlockRegex = /<div\s+tabs\s*?(name=('|").+('|"))?\s*?>(.|\n)*?<\/div>/g;
// Regex for removing blank lines for correct parsing toggle in ReactMarkdown component
const blankLinesRegex = /^\s*$(?:\r\n?|\n)/gm;

const removeBlankLines = (source: string) =>
  source.replace(blankLinesRegex, "");

export const removeBlankLinesFromTabsBlock = (source: Source) => {
  const fun = (str: string): string =>
    str.replace(tabsBlockRegex, occurrence => removeBlankLines(occurrence));

  if (source.content) {
    return fun(source.content);
  }
  return fun(source.source);
};
