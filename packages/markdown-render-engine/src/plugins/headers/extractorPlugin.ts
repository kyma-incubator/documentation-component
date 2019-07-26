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

function decrementLevels(headers: Header[], level: number = 1): Header[] {
  for (const header of headers) {
    const l = level === 1 ? Number(header.level) - 1 : level;
    header.level = String(Number(header.level) - l);
    if (l && header.children && header.children.length) {
      header.children = decrementLevels(header.children, l);
    }
  }
  return headers;
}

const getHeaders = (
  source: Source,
  headerPrefix: string,
  customFirstNode?: Header,
): Header[] => {
  const headings: Set<string> = new Set<string>();
  let content = source.rawContent
    .replace(TABS_BLOCKS_REGEX, "")
    .replace(CODE_BLOCKS_REGEX, "");
  content = `\n${content}`;

  const headers: Header[] = [];
  if (!content) {
    return headers;
  }

  const lastIndexes = new Array(6).fill(null); // array of references
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
      level: String(level),
      id: toKebabCase(id),
      source,
    };
    lastIndexes[level - 1] = h;
    const occurrence = level - 2;

    if (level === 1 || !lastIndexes[occurrence]) {
      headers.push(h);
      continue;
    }

    h.parent = lastIndexes[occurrence];
    if (lastIndexes[occurrence].children) {
      lastIndexes[occurrence].children.push(h);
    } else {
      lastIndexes[occurrence].children = [h];
    }
  }
  console.log(headers)
  const decrementedHeaders = decrementLevels(headers);
  console.log(decrementedHeaders)

  if (!customFirstNode) {
    return decrementedHeaders;
  }

  customFirstNode.children = decrementedHeaders;
  for (const h of decrementedHeaders) {
    h.parent = customFirstNode;
  }
  return [customFirstNode];
};

export const extractHeaders = ({
  source,
  options,
}: ExtractorPluginArgs<
  ExtractHeadersPluginOptions
>): ExtractorPluginReturnType => {
  let hp = "";
  let customNode: Header | undefined;
  if (options) {
    const { headerPrefix = "", customFirstNode } = options;
    hp =
      typeof headerPrefix === "function" ? headerPrefix(source) : headerPrefix;
    customNode = customFirstNode && customFirstNode(source, toKebabCase);
  }
  const headers: Header[] = getHeaders(source, hp, customNode).filter(
    h => h.title,
  );

  return {
    headers,
  };
};
