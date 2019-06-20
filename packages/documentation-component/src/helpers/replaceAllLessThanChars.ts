const codeBlocksRegex = /^(([ \t]*`{3,4})([^\n]*)([\s\S]+?)(^[ \t]*\2))/gm;
const lessThanChar = "&#60;";

export const replaceAllLessThanChars = (source: string) =>
  source.replace(codeBlocksRegex, occurrence =>
    occurrence.replace(/</gm, lessThanChar),
  );
