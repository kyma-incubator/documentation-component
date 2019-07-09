import {
  Source,
  MutationPluginReturnType,
  MutationPluginArgs,
} from "../../interfaces";

const CODE_BLOCKS_REGEX = /^(([ \t]*`{3,4})([^\n]*)([\s\S]+?)(^[ \t]*\2))/gm;
const LESS_THAN_CHARS = "&#60;";

function fn(str: string): string {
  return str.replace(CODE_BLOCKS_REGEX, occurrence =>
    occurrence.replace(/</gm, LESS_THAN_CHARS),
  );
}

export const replaceAllLessThanChars = ({
  source,
}: MutationPluginArgs): MutationPluginReturnType =>
  source.content ? fn(source.content) : fn(source.rawContent);
