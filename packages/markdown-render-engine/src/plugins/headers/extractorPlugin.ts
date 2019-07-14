import {
  Source,
  ExtractorPluginReturnType,
  ExtractorPluginArgs,
} from "@kyma-project/documentation-component";
import { toKebabCase } from "../../helpers";
import { Header, ExtractHeadersPluginOptions } from "./types";

const HEADING_PREFIX = /\n(#+\s*)(.*)/g;
const CODE_BLOCKS_REGEX = /^(([ \t]*`{3,4})([^\n]*)([\s\S]+?)(^[ \t]*\2))/gm;
const TABS_BLOCKS_REGEX = /<div\s+tabs\s*?(name=('|").+('|"))?\s*?>(.|\n)*?<\/div>/g;

const getHeaders = (
  source: Source,
  headerPrefix: string,
  customNodes: string[],
  startWith: number,
): Header[] => {
  const headings: Set<string> = new Set<string>();
  const content = (source.rawContent as string)
    .replace(TABS_BLOCKS_REGEX, "")
    .replace(CODE_BLOCKS_REGEX, "");

  const headers: Header[] = [];
  if (!content) return headers;

  const lastIndexes = new Array(6).fill(null); // array of references
  if (customNodes && customNodes.length) {
    customNodes.map((n, index) => {
      const title = n;
      const h: Header = {
        title,
        level: 1,
        id: toKebabCase(headerPrefix ? `${headerPrefix}-${title}` : title),
        source,
      };
      headers.push(h);
      lastIndexes[index] = h;
    });
  }

  const matchedHeaders = content.match(HEADING_PREFIX);
  if (!matchedHeaders || !matchedHeaders.length) return headers;

  for (const header of matchedHeaders) {
    const level: number = (header.match(/#/g) || []).length;
    const title = header.replace(/#/g, "").trim();

    let id = headerPrefix ? `${headerPrefix}-${title}` : title;
    if (headings.has(id)) {
      if (/[1-9]$/.test(id)) {
        id = `${id}-${Number(id[id.length - 1]) + 1}`;
      } else {
        id = `${id}-1`;
      }
    }
    headings.add(id);

    const h: Header = {
      title,
      level,
      id: toKebabCase(id),
      source,
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
  const headers: Header[] = getHeaders(source, hp, customN, startW);

  return {
    headers,
  };
};
