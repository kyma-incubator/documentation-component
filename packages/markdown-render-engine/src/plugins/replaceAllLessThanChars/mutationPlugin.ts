import { MutationPluginArgs } from "@kyma-project/documentation-component";

const CODE_BLOCKS_REGEX = /^(([ \t]*`{3,4})([^\n]*)([\s\S]+?)(^[ \t]*\2))/gm;
const LESS_THAN_CHARS = "&#60;";

function fn(str: string): string {
  return str.replace(CODE_BLOCKS_REGEX, occurrence =>
    occurrence.replace(/</gm, LESS_THAN_CHARS),
  );
}

export const replaceAllLessThanChars = ({
  source,
}: MutationPluginArgs): string =>
  fn((source.content || source.rawContent) as string);
