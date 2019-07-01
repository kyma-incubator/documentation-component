import {
  Source,
  ExtractorPluginReturnType,
  ExtractorPluginArgs,
} from "../../interfaces";
import { Header, ExtractHeadersPluginOptions } from "./types";

const HEADING_PREFIX = /\n(#+\s*)(.*)/g;
const CODE_BLOCKS_REGEX = /^(([ \t]*`{3,4})([^\n]*)([\s\S]+?)(^[ \t]*\2))/gm;
const TABS_BLOCKS_REGEX = /<div\s+tabs\s*?(name=('|").+('|"))?\s*?>(.|\n)*?<\/div>/g;

const toKebabCase = (str: string) => {
  const matched = str.match(
    /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g,
  );
  if (matched) {
    return matched.map(x => x.toLowerCase()).join("-");
  }
  return str;
};

const getHeaders = (
  source: string,
  headerPrefix: string,
  customNodes: string[],
  startWith: number,
): Header[] => {
  source = source.replace(TABS_BLOCKS_REGEX, "").replace(CODE_BLOCKS_REGEX, "");

  const headers: Header[] = [];
  if (!source) return headers;

  const lastIndexes = new Array(6).fill(null); // array of references
  if (customNodes) {
    customNodes.map((n, index) => {
      const title = n;
      const h: Header = {
        title,
        level: 1,
        id: toKebabCase(headerPrefix ? `${headerPrefix}-${title}` : title),
      };
      headers.push(h);
      lastIndexes[index] = h;
    });
  }

  const matchedHeaders = source.match(HEADING_PREFIX);
  if (!matchedHeaders || !matchedHeaders.length) return headers;

  for (const header of matchedHeaders) {
    const level: number = (header.match(/#/g) || []).length;
    const title = header.replace(/#/g, "").trim();
    const id = headerPrefix ? `${headerPrefix}-${title}` : title;

    const h: Header = {
      title,
      level,
      id: toKebabCase(id),
    };
    lastIndexes[level - 1] = h;

    if (level === 1) {
      headers.push(h);
      continue;
    }

    const occurrence = level - 2;
    if (!lastIndexes[occurrence]) {
      continue;
    }

    h.parent = lastIndexes[occurrence];
    if (lastIndexes[occurrence].children) {
      lastIndexes[occurrence].children.push(h);
    } else {
      lastIndexes[occurrence].children = [h];
    }
  }

  return headers;
};

export const extractHeaders = ({
  source,
  options,
}: ExtractorPluginArgs<
  ExtractHeadersPluginOptions
>): ExtractorPluginReturnType => {
  let hp = "";
  let customN: string[] = [];
  let startW: number = 1;
  if (options) {
    const { headerPrefix = "", customNodes = [], startWith = 1 } = options;
    hp =
      typeof headerPrefix === "function" ? headerPrefix(source) : headerPrefix;
    customN = customNodes.map(n => (typeof n === "function" ? n(source) : n));
    startW = startWith;
  }
  const headers: Header[] = getHeaders(source.rawContent, hp, customN, startW);

  return {
    headers,
  };
};
